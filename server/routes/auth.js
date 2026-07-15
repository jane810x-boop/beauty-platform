const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const db = require('../db');
const { generateToken, requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register
router.post('/register', (req, res) => {
  try {
    const { email, password, name, country } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password and name are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hash = bcrypt.hashSync(password, 10);
    const result = db.prepare(
      'INSERT INTO users (email, password_hash, name, country) VALUES (?, ?, ?, ?)'
    ).run(email, hash, name, country || 'US');

    const user = { id: result.lastInsertRowid, email, name, is_admin: 0 };
    const token = generateToken(user);

    // Send welcome email (non-blocking)
    const { sendWelcomeEmail } = require('../mailer');
    sendWelcomeEmail(name, email).catch(err => console.error('Welcome email failed:', err.message));

    res.status(201).json({ user: { id: user.id, email, name, country }, token });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({
      user: { id: user.id, email: user.email, name: user.name, country: user.country, is_admin: !!user.is_admin },
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
  try {
    const user = db.prepare('SELECT id, email, name, phone, country, created_at, is_admin FROM users WHERE id = ?').get(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user: { ...user, is_admin: !!user.is_admin } });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// PUT /api/auth/profile
router.put('/profile', requireAuth, (req, res) => {
  try {
    const { name, phone, country } = req.body;
    db.prepare('UPDATE users SET name = COALESCE(?, name), phone = COALESCE(?, phone), country = COALESCE(?, country) WHERE id = ?')
      .run(name || null, phone || null, country || null, req.user.id);
    res.json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// POST /api/auth/forgot-password - Request password reset
router.post('/forgot-password', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = db.prepare('SELECT id, name, email FROM users WHERE email = ?').get(email);
    // Always return success to prevent email enumeration
    if (!user) {
      return res.json({ message: 'If an account exists, a reset link has been sent.' });
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

    // Invalidate old tokens for this user
    db.prepare('UPDATE password_reset_tokens SET used = 1 WHERE user_id = ?').run(user.id);
    // Insert new token
    db.prepare('INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)')
      .run(user.id, token, expiresAt);

    // Build reset URL
    const domain = process.env.DOMAIN || 'http://localhost:3001';
    const resetUrl = `${domain}/forgot-password.html?token=${token}`;

    // Send email
    const { sendPasswordResetEmail } = require('../mailer');
    sendPasswordResetEmail(user.name, user.email, resetUrl).catch(err =>
      console.error('Password reset email failed:', err.message)
    );

    res.json({ message: 'If an account exists, a reset link has been sent.' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// POST /api/auth/reset-password - Reset password with token
router.post('/reset-password', (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ error: 'Token and new password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Find valid token
    const resetRecord = db.prepare(`
      SELECT prt.*, u.email, u.name FROM password_reset_tokens prt
      JOIN users u ON u.id = prt.user_id
      WHERE prt.token = ? AND prt.used = 0 AND prt.expires_at > datetime('now')
    `).get(token);

    if (!resetRecord) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    // Hash new password and update
    const hash = bcrypt.hashSync(password, 10);
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hash, resetRecord.user_id);

    // Mark token as used
    db.prepare('UPDATE password_reset_tokens SET used = 1 WHERE id = ?').run(resetRecord.id);

    res.json({ message: 'Password reset successfully. You can now log in with your new password.' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

// POST /api/auth/verify-email - Request email verification
router.post('/verify-email/request', requireAuth, (req, res) => {
  try {
    const user = db.prepare('SELECT email, name FROM users WHERE id = ?').get(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours

    // Store verification token (reuse password_reset_tokens table with a flag)
    db.prepare('INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)')
      .run(req.user.id, 'verify_' + token, expiresAt);

    const domain = process.env.DOMAIN || 'http://localhost:3001';
    const verifyUrl = `${domain}/verify-email.html?token=${token}`;

    // Send email (reuse mailer, just with different content)
    const { sendPasswordResetEmail } = require('../mailer');
    sendPasswordResetEmail(user.name, user.email, verifyUrl).catch(err =>
      console.error('Verification email failed:', err.message)
    );

    res.json({ message: 'Verification email sent.' });
  } catch (err) {
    console.error('Email verification request error:', err);
    res.status(500).json({ error: 'Failed to send verification email' });
  }
});

module.exports = router;
