const express = require('express');
const db = require('../db');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/reviews/:slug - List reviews for a product
router.get('/:slug', (req, res) => {
  try {
    const reviews = db.prepare(
      'SELECT id, user_name, rating, title, body, verified, created_at FROM reviews WHERE product_slug = ? ORDER BY created_at DESC'
    ).all(req.params.slug);

    const avgRow = db.prepare(
      'SELECT AVG(rating) as avg_rating, COUNT(*) as count FROM reviews WHERE product_slug = ?'
    ).get(req.params.slug);

    res.json({
      reviews,
      average: avgRow.avg_rating ? Math.round(avgRow.avg_rating * 10) / 10 : 0,
      count: avgRow.count
    });
  } catch (err) {
    console.error('Fetch reviews error:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST /api/reviews/:slug - Add a review (auth optional, but encouraged)
router.post('/:slug', optionalAuth, (req, res) => {
  try {
    const { rating, title, text } = req.body;
    const name = req.body.name || (req.user ? req.user.name : 'Anonymous');

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Review text is required' });
    }

    const result = db.prepare(
      'INSERT INTO reviews (product_slug, user_id, user_name, rating, title, body, verified) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(
      req.params.slug,
      req.user ? req.user.id : null,
      name,
      rating,
      title || '',
      text.trim(),
      req.user ? 1 : 0
    );

    const review = db.prepare(
      'SELECT id, user_name, rating, title, body, verified, created_at FROM reviews WHERE id = ?'
    ).get(result.lastInsertRowid);

    res.status(201).json({ review });
  } catch (err) {
    console.error('Create review error:', err);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

module.exports = router;
