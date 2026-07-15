const express = require('express');
const db = require('../db');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

// All admin routes require admin auth
router.use(requireAdmin);

// --- Image Upload ---
router.post('/upload', (req, res) => {
  // This endpoint uses multer middleware injected in server.js via app.use
  // Actually we need multer here. Let's require it.
  const multer = require('multer');
  const path = require('path');
  const fs = require('fs');

  const uploadsDir = path.join(__dirname, '..', '..', 'uploads', 'products');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

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
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const allowed = /\.(jpg|jpeg|png|webp|gif|avif)$/i;
      if (allowed.test(path.extname(file.originalname))) cb(null, true);
      else cb(new Error('Only image files (jpg, png, webp, gif) are allowed'));
    }
  }).array('images', 10);

  upload(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    const files = req.files.map(f => '/uploads/products/' + f.filename);
    res.json({ files, message: 'Upload successful' });
  });
});

// --- Dashboard Stats ---
router.get('/stats', (req, res) => {
  try {
    const totalOrders = db.prepare('SELECT COUNT(*) as count FROM orders').get().count;
    const totalRevenue = db.prepare('SELECT COALESCE(SUM(total), 0) as total FROM orders WHERE status != ?').get('cancelled').total;
    const totalProducts = db.prepare('SELECT COUNT(*) as count FROM products WHERE is_active = 1').get().count;
    const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    const pendingOrders = db.prepare('SELECT COUNT(*) as count FROM orders WHERE status = ?').get('paid').count;

    const recentOrders = db.prepare(`
      SELECT id, order_number, status, total, currency, shipping_name, created_at
      FROM orders ORDER BY created_at DESC LIMIT 10
    `).all();

    res.json({ stats: { totalOrders, totalRevenue, totalProducts, totalUsers, pendingOrders }, recentOrders });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// --- Product Management ---
router.get('/products', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products ORDER BY id DESC').all();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.post('/products', (req, res) => {
  try {
    const { product_slug, name, name_zh, brand, category, price, original_price, stock, rating, reviews, badge, description, description_zh, sizes, featured, image, images, ingredients, how_to_use, shipping_info, detail_html } = req.body;

    if (!product_slug || !name || !price) {
      return res.status(400).json({ error: 'Slug, name and price are required' });
    }

    const existing = db.prepare('SELECT id FROM products WHERE product_slug = ?').get(product_slug);
    if (existing) return res.status(409).json({ error: 'Product slug already exists' });

    db.prepare(`
      INSERT INTO products (product_slug, name, name_zh, brand, category, price, original_price, stock, rating, reviews, badge, description, description_zh, sizes, featured, image, images, ingredients, how_to_use, shipping_info, detail_html)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      product_slug, name, name_zh || '', brand || '', category || 'skincare', price, original_price || null,
      stock || 100, rating || 0, reviews || 0, badge || '', description || '', description_zh || '',
      JSON.stringify(sizes || []), featured || 0,
      image || '', JSON.stringify(images || []), ingredients || '', how_to_use || '', shipping_info || '', detail_html || ''
    );

    res.status(201).json({ message: 'Product created' });
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

router.put('/products/:id', (req, res) => {
  try {
    const { name, name_zh, brand, category, price, original_price, stock, badge, description, description_zh, sizes, featured, is_active, rating, reviews, image, images, ingredients, how_to_use, shipping_info, detail_html } = req.body;

    db.prepare(`
      UPDATE products SET
        name = COALESCE(?, name), name_zh = COALESCE(?, name_zh),
        brand = COALESCE(?, brand), category = COALESCE(?, category),
        price = COALESCE(?, price), original_price = ?,
        stock = COALESCE(?, stock), badge = COALESCE(?, badge),
        rating = COALESCE(?, rating), reviews = COALESCE(?, reviews),
        description = COALESCE(?, description), description_zh = COALESCE(?, description_zh),
        sizes = COALESCE(?, sizes), featured = COALESCE(?, featured),
        is_active = COALESCE(?, is_active),
        image = COALESCE(?, image), images = COALESCE(?, images),
        ingredients = COALESCE(?, ingredients), how_to_use = COALESCE(?, how_to_use),
        shipping_info = COALESCE(?, shipping_info), detail_html = COALESCE(?, detail_html),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      name || null, name_zh || null, brand || null, category || null,
      price || null, original_price !== undefined ? original_price : null,
      stock !== undefined ? stock : undefined, badge !== undefined ? badge : undefined,
      rating !== undefined ? rating : undefined, reviews !== undefined ? reviews : undefined,
      description !== undefined ? description : undefined, description_zh !== undefined ? description_zh : undefined,
      sizes ? JSON.stringify(sizes) : null,
      featured !== undefined ? featured : undefined,
      is_active !== undefined ? is_active : undefined,
      image !== undefined ? image : undefined,
      images !== undefined ? JSON.stringify(images) : undefined,
      ingredients !== undefined ? ingredients : undefined,
      how_to_use !== undefined ? how_to_use : undefined,
      shipping_info !== undefined ? shipping_info : undefined,
      detail_html !== undefined ? detail_html : undefined,
      req.params.id
    );

    res.json({ message: 'Product updated' });
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

router.delete('/products/:id', (req, res) => {
  try {
    db.prepare('UPDATE products SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(req.params.id);
    res.json({ message: 'Product deactivated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// --- AI Action Stub ---
// This endpoint is ready for future AI integration.
// Currently returns stub data. When AI service is connected,
// replace the logic with actual AI API calls.
router.post('/ai/action', (req, res) => {
  const { action, productId, params } = req.body;

  const actions = {
    generate_description: {
      status: 'stub',
      message: 'AI description generation is ready. Connect an AI service to activate.',
      data: { description: '', description_zh: '' }
    },
    generate_ingredients: {
      status: 'stub',
      message: 'AI ingredients generation is ready. Connect an AI service to activate.',
      data: { ingredients: '' }
    },
    generate_howto: {
      status: 'stub',
      message: 'AI how-to-use generation is ready. Connect an AI service to activate.',
      data: { how_to_use: '' }
    },
    generate_images: {
      status: 'stub',
      message: 'AI image generation is ready. Connect an AI service to activate.',
      data: { images: [] }
    },
    auto_fill: {
      status: 'stub',
      message: 'AI auto-fill is ready. Connect an AI service to activate.',
      data: {}
    },
    batch_optimize: {
      status: 'stub',
      message: 'AI batch optimization is ready. Connect an AI service to activate.',
      data: {}
    }
  };

  const result = actions[action] || { status: 'error', message: 'Unknown action: ' + action };
  res.json(result);
});

// --- Order Management ---
router.get('/orders', (req, res) => {
  try {
    const { status, search } = req.query;
    let sql = 'SELECT * FROM orders';
    const conditions = [];
    const params = [];

    if (status && status !== 'all') {
      conditions.push('status = ?');
      params.push(status);
    }
    if (search) {
      conditions.push('(order_number LIKE ? OR shipping_name LIKE ? OR shipping_email LIKE ?)');
      const q = `%${search}%`;
      params.push(q, q, q);
    }

    if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
    sql += ' ORDER BY created_at DESC LIMIT 200';

    const orders = db.prepare(sql).all(...params);

    const ordersWithItems = orders.map(order => {
      const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
      return { ...order, items };
    });

    res.json({ orders: ordersWithItems, total: orders.length });
  } catch (err) {
    console.error('Admin fetch orders error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.put('/orders/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'paid', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    db.prepare('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(status, req.params.id);
    res.json({ message: 'Order status updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

module.exports = router;
