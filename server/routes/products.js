const express = require('express');
const db = require('../db');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/products - List products
router.get('/', (req, res) => {
  try {
    const { category, brand, search, sort, limit, offset } = req.query;
    let sql = 'SELECT * FROM products WHERE is_active = 1';
    const params = [];

    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }
    if (brand) {
      sql += ' AND brand = ?';
      params.push(brand);
    }
    if (search) {
      sql += ' AND (name LIKE ? OR description LIKE ? OR brand LIKE ?)';
      const q = `%${search}%`;
      params.push(q, q, q);
    }

    switch (sort) {
      case 'price_asc': sql += ' ORDER BY price ASC'; break;
      case 'price_desc': sql += ' ORDER BY price DESC'; break;
      case 'rating': sql += ' ORDER BY rating DESC'; break;
      case 'newest': sql += ' ORDER BY created_at DESC'; break;
      default: sql += ' ORDER BY featured DESC, id DESC';
    }

    // Use parameterized queries for LIMIT/OFFSET to prevent SQL injection
    if (limit) {
      const limitVal = parseInt(limit, 10);
      params.push(limitVal);
      sql += ` LIMIT ?`;
      if (offset) {
        const offsetVal = parseInt(offset, 10);
        params.push(offsetVal);
        sql += ` OFFSET ?`;
      }
    }

    const products = db.prepare(sql).all(...params);
    // Parse JSON fields for each product
    products.forEach(p => {
      p.sizes = JSON.parse(p.sizes || '[]');
      p.images = JSON.parse(p.images || '[]');
    });
    const totalParams = [];
    let totalSql = 'SELECT COUNT(*) as count FROM products WHERE is_active = 1';
    if (category) { totalSql += ' AND category = ?'; totalParams.push(category); }
    if (brand) { totalSql += ' AND brand = ?'; totalParams.push(brand); }
    if (search) {
      totalSql += ' AND (name LIKE ? OR description LIKE ? OR brand LIKE ?)';
      const sq = `%${search}%`;
      totalParams.push(sq, sq, sq);
    }
    const total = db.prepare(totalSql).get(...totalParams);

    res.json({ products, total: total.count });
  } catch (err) {
    console.error('Fetch products error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:slug
router.get('/:slug', (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE product_slug = ? AND is_active = 1')
      .get(req.params.slug);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    product.sizes = JSON.parse(product.sizes || '[]');
    product.images = JSON.parse(product.images || '[]');
    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;
