const express = require('express');
const db = require('../db');
const { requireAuth, optionalAuth } = require('../middleware/auth');
const { sendOrderConfirmation } = require('../mailer');

const router = express.Router();

// POST /api/orders/create-payment-intent - Create Stripe PaymentIntent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey || stripeKey === 'sk_test_placeholder') {
      // Demo mode: return a mock client secret
      return res.json({
        clientSecret: 'pi_demo_secret_' + Date.now(),
        demoMode: true
      });
    }

    const stripe = require('stripe')(stripeKey);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe uses cents
      currency: (currency || 'USD').toLowerCase(),
      metadata: { platform: 'FJ Beauty' }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('PaymentIntent creation error:', err);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Generate order number
function generateOrderNumber() {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = (now.getMonth() + 1).toString().padStart(2, '0');
  const d = now.getDate().toString().padStart(2, '0');
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `FJ${y}${m}${d}${rand}`;
}

// POST /api/orders - Create order
router.post('/', optionalAuth, (req, res) => {
  try {
    const { items, shipping, subtotal, tax, total, currency, payment_method, payment_id, shipping_name, shipping_email, shipping_phone, shipping_address, shipping_city, shipping_state, shipping_zip, shipping_country, notes } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: 'Order must have at least one item' });
    }

    const orderNumber = generateOrderNumber();
    const userId = req.user ? req.user.id : null;

    // Determine initial status based on payment method
    // PIX orders start as 'pending' (awaiting payment confirmation)
    // PayPal/Stripe orders start as 'pending' and are updated to 'paid' via webhook or payment confirmation
    const initialStatus = 'pending';

    // Check inventory and create order in a transaction
    const insertOrder = db.prepare(`
      INSERT INTO orders (user_id, order_number, status, subtotal, shipping, tax, total, currency, payment_method, payment_id, shipping_name, shipping_email, shipping_phone, shipping_address, shipping_city, shipping_state, shipping_zip, shipping_country, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertItem = db.prepare(
      'INSERT INTO order_items (order_id, product_id, product_name, brand_name, price, quantity) VALUES (?, ?, ?, ?, ?, ?)'
    );

    const deductStock = db.prepare(
      'UPDATE products SET stock = stock - ? WHERE product_slug = ? AND stock >= ?'
    );

    const getProductStock = db.prepare(
      'SELECT stock FROM products WHERE product_slug = ?'
    );

    // Use transaction: insert order + items + deduct inventory atomically
    const createOrderTx = db.transaction(() => {
      const result = insertOrder.run(
        userId, orderNumber, initialStatus,
        subtotal || total, shipping || 0, tax || 0, total, currency || 'USD',
        payment_method || null, payment_id || null,
        shipping_name || '', shipping_email || '', shipping_phone || '',
        shipping_address || '', shipping_city || '', shipping_state || '',
        shipping_zip || '', shipping_country || 'US', notes || ''
      );

      const orderId = result.lastInsertRowid;

      for (const item of items) {
        insertItem.run(orderId, item.id, item.name, item.brand || '', item.price, item.quantity || 1);

        // Deduct inventory if product exists in DB
        const productRow = getProductStock.get(item.id);
        if (productRow) {
          const qty = item.quantity || 1;
          const deductResult = deductStock.run(qty, item.id, qty);
          if (deductResult.changes === 0) {
            throw new Error(`Insufficient stock for product: ${item.id}`);
          }
        }
      }

      return orderId;
    });

    const orderId = createOrderTx();

    // Build order object for email
    const createdOrder = {
      order_number: orderNumber,
      subtotal: subtotal || total,
      shipping: shipping || 0,
      tax: tax || 0,
      total,
      shipping_name: shipping_name || '',
      shipping_email: shipping_email || '',
      shipping_address: shipping_address || '',
      shipping_city: shipping_city || '',
      shipping_state: shipping_state || '',
      shipping_zip: shipping_zip || '',
      shipping_country: shipping_country || 'US'
    };
    const createdItems = items.map(item => ({
      product_name: item.name || item.product_name,
      brand_name: item.brand || item.brand_name || '',
      price: item.price,
      quantity: item.quantity || 1
    }));

    // Send order confirmation email (non-blocking)
    sendOrderConfirmation(createdOrder, createdItems).catch(err => console.error('Order email failed:', err.message));

    res.status(201).json({
      order: {
        id: orderId,
        order_number: orderNumber,
        status: initialStatus,
        total,
        currency: currency || 'USD'
      }
    });
  } catch (err) {
    console.error('Create order error:', err);
    if (err.message && err.message.includes('Insufficient stock')) {
      return res.status(409).json({ error: err.message });
    }
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// GET /api/orders/my - User's orders
router.get('/my', requireAuth, (req, res) => {
  try {
    const orders = db.prepare(`
      SELECT id, order_number, status, total, currency, payment_method, created_at
      FROM orders WHERE user_id = ? ORDER BY created_at DESC
    `).all(req.user.id);

    // Get items for each order
    const ordersWithItems = orders.map(order => {
      const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
      return { ...order, items };
    });

    res.json({ orders: ordersWithItems });
  } catch (err) {
    console.error('Fetch orders error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:id - Order detail
router.get('/:id', requireAuth, (req, res) => {
  try {
    const order = db.prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?')
      .get(req.params.id, req.user.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
    res.json({ order: { ...order, items } });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// PATCH /api/orders/:id/status - Update order status (for payment confirmation)
router.patch('/:id/status', (req, res) => {
  try {
    const { status, payment_id } = req.body;
    const validStatuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = db.prepare('SELECT id FROM orders WHERE id = ?').get(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    db.prepare('UPDATE orders SET status = ?, payment_id = COALESCE(?, payment_id), updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(status, payment_id || null, req.params.id);

    res.json({ message: 'Order status updated', status });
  } catch (err) {
    console.error('Update order status error:', err);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// POST /api/orders/webhook - Stripe webhook for payment confirmation
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '');
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  let event;
  try {
    if (endpointSecret) {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } else {
      event = JSON.parse(req.body);
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      // Find order by payment_id and update status to 'paid'
      const order = db.prepare('SELECT id FROM orders WHERE payment_id = ?').get(paymentIntent.id);
      if (order) {
        db.prepare("UPDATE orders SET status = 'paid', updated_at = CURRENT_TIMESTAMP WHERE id = ?")
          .run(order.id);
        console.log(`Order ${order.id} marked as paid via webhook`);
      }
      break;
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      const order = db.prepare('SELECT id FROM orders WHERE payment_id = ?').get(paymentIntent.id);
      if (order) {
        db.prepare("UPDATE orders SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP WHERE id = ?")
          .run(order.id);
        console.log(`Order ${order.id} cancelled due to payment failure`);
      }
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;
