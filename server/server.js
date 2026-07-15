require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require('./db'); // Initialize database

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');
const reviewRoutes = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT || 3001;
const DOMAIN = process.env.DOMAIN || 'http://localhost:3001';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads', 'products');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage config for product images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = 'prod_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8) + ext;
    cb(null, name);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: (req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|webp|gif|avif)$/i;
    if (allowed.test(path.extname(file.originalname))) cb(null, true);
    else cb(new Error('Only image files (jpg, png, webp, gif) are allowed'));
  }
});

// CORS - restrict in production
const corsOrigin = NODE_ENV === 'production'
  ? [DOMAIN, 'https://fjbeauty.com', 'https://www.fjbeauty.com']
  : '*';

app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());

// Simple rate limiting with periodic cleanup
const rateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const clients = new Map();
  // Clean up expired entries every 5 minutes to prevent memory leak
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, timestamps] of clients) {
      const valid = timestamps.filter(t => now - t < windowMs);
      if (valid.length === 0) {
        clients.delete(key);
      } else {
        clients.set(key, valid);
      }
    }
  }, 5 * 60 * 1000);
  // Prevent the interval from keeping the process alive
  cleanupInterval.unref();

  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    if (!clients.has(key)) clients.set(key, []);
    const timestamps = clients.get(key).filter(t => now - t < windowMs);
    if (timestamps.length >= maxRequests) {
      return res.status(429).json({ error: 'Too many requests, please try again later.' });
    }
    timestamps.push(now);
    clients.set(key, timestamps);
    next();
  };
};

// Apply rate limiting to API routes
app.use('/api', rateLimit(200, 15 * 60 * 1000));
app.use('/api/auth', rateLimit(20, 15 * 60 * 1000));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);

// Serve static frontend files (exclude server/ and sensitive files)
app.use(express.static(path.join(__dirname, '..'), {
  setHeaders: (res, filePath) => {
    // Deny direct access to server directory and dot files
    if (filePath.includes(path.sep + 'server' + path.sep) ||
        filePath.includes(path.sep + 'node_modules' + path.sep)) {
      res.status(403).send('Forbidden');
    }
  }
}));

// Serve admin panel
app.use('/admin', express.static(path.join(__dirname, '..', 'admin')));

// API health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    env: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// SPA fallback for frontend routing
app.get('*', (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  // Deny access to server files
  if (req.path.includes('/server/') || req.path.includes('/node_modules/')) {
    return res.status(403).send('Forbidden');
  }
  // If the request looks like an HTML page request
  if (req.path.endsWith('.html') || req.path === '/') {
    const filePath = req.path === '/' ? '/index.html' : req.path;
    return res.sendFile(path.join(__dirname, '..', filePath));
  }
  // Default to index.html
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`F&J Beauty Server running at http://localhost:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
  console.log(`API: http://localhost:${PORT}/api`);
});
