// ========================================
// F&J Beauty - Email Automation
// ========================================
const nodemailer = require('nodemailer');

// Load from .env
const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = process.env.SMTP_PORT || 587;
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_NAME = process.env.EMAIL_FROM_NAME || 'F&J Beauty';
const FROM_EMAIL = process.env.EMAIL_FROM || 'no-reply@fjbeauty.com';

let transporter = null;

function getTransporter() {
  if (!transporter && SMTP_HOST && SMTP_USER && SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS }
    });
  }
  return transporter;
}

// ---- Email Templates ----
function orderConfirmationHTML(order, items) {
  const itemsHTML = items.map(item => `
    <tr>
      <td style="padding:0.75rem;border-bottom:1px solid #f0f0f0;">
        <strong>${item.product_name}</strong>
        <div style="font-size:0.8rem;color:#777;">${item.brand_name} × ${item.quantity}</div>
      </td>
      <td style="padding:0.75rem;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:600;">
        $${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;padding:2rem;color:#222;">
  <div style="text-align:center;margin-bottom:2rem;">
    <h1 style="color:#E5342B;font-size:1.8rem;">F<span style="color:#222;">&</span>J Beauty</h1>
    <div style="font-size:2.5rem;margin-top:1rem;">🎉</div>
    <h2 style="margin-top:1rem;">Order Confirmed!</h2>
    <p style="color:#777;">Order #${order.order_number}</p>
  </div>
  <div style="background:#FFF8E1;border-radius:10px;padding:1rem;margin-bottom:1.5rem;font-size:0.9rem;">
    <strong>Thank you for your order! ✨</strong><br>
    We're preparing your package with love from Seoul. You'll receive a shipping notification once it's on its way!
  </div>
  <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem;">
    ${itemsHTML}
  </table>
  <div style="border-top:2px solid #f0f0f0;padding-top:1rem;">
    <div style="display:flex;justify-content:space-between;margin-bottom:0.4rem;"><span>Subtotal</span><span>$${order.subtotal.toFixed(2)}</span></div>
    <div style="display:flex;justify-content:space-between;margin-bottom:0.4rem;"><span>Shipping</span><span>${order.shipping === 0 ? 'FREE' : '$' + order.shipping.toFixed(2)}</span></div>
    <div style="display:flex;justify-content:space-between;margin-bottom:0.4rem;"><span>Tax</span><span>$${(order.tax || 0).toFixed(2)}</span></div>
    <div style="display:flex;justify-content:space-between;font-size:1.2rem;font-weight:800;margin-top:0.75rem;border-top:2px solid #E5342B;padding-top:0.75rem;">
      <span>Total</span><span style="color:#E5342B;">$${order.total.toFixed(2)}</span>
    </div>
  </div>
  <div style="margin-top:2rem;padding:1rem;background:#f9f9f9;border-radius:8px;font-size:0.85rem;color:#666;">
    <strong>Shipping to:</strong><br>
    ${order.shipping_name}<br>
    ${order.shipping_address}, ${order.shipping_city}, ${order.shipping_state} ${order.shipping_zip}<br>
    ${order.shipping_country}
  </div>
  <div style="margin-top:2rem;text-align:center;font-size:0.8rem;color:#999;">
    Questions? Reply to this email or chat with us on WhatsApp.<br>
    F&J Beauty · Seoul, Korea · <a href="https://fjbeauty.com">fjbeauty.com</a>
  </div>
</body></html>`;
}

function shippingNotificationHTML(order) {
  return `
<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;padding:2rem;color:#222;">
  <div style="text-align:center;margin-bottom:2rem;">
    <h1 style="color:#E5342B;">F<span style="color:#222;">&</span>J Beauty</h1>
    <div style="font-size:2.5rem;margin-top:1rem;">📦</div>
    <h2 style="margin-top:1rem;">Your Order is On Its Way!</h2>
    <p style="color:#777;">Order #${order.order_number}</p>
  </div>
  <div style="background:#E8F5E9;border-radius:10px;padding:1rem;margin-bottom:1.5rem;font-size:0.9rem;">
    🎉 Great news! Your package has been shipped and is on its way to you!
  </div>
  <div style="margin-top:2rem;text-align:center;font-size:0.8rem;color:#999;">
    F&J Beauty · Seoul, Korea · <a href="https://fjbeauty.com">fjbeauty.com</a>
  </div>
</body></html>`;
}

function welcomeEmailHTML(name, email) {
  return `
<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;padding:2rem;color:#222;">
  <div style="text-align:center;margin-bottom:2rem;">
    <h1 style="color:#E5342B;font-size:1.8rem;">F<span style="color:#222;">&</span>J Beauty</h1>
    <div style="font-size:2.5rem;margin-top:1rem;">💕</div>
    <h2 style="margin-top:1rem;">Welcome to F&J, ${name}!</h2>
    <p style="color:#777;">Your beauty journey starts now.</p>
  </div>
  <div style="background:#FFF8E1;border-radius:10px;padding:1rem;margin-bottom:1.5rem;font-size:0.9rem;">
    🎁 <strong>Welcome Gift:</strong> Use code <strong>FJFIRST</strong> at checkout for 10% off your first order!
  </div>
  <div style="margin-top:2rem;text-align:center;font-size:0.8rem;color:#999;">
    F&J Beauty · Seoul, Korea · <a href="https://fjbeauty.com">fjbeauty.com</a>
  </div>
</body></html>`;
}

function cartAbandonmentHTML(items) {
  const itemsHTML = items.slice(0, 3).map(item => `
    <div style="background:#f9f9f9;border-radius:8px;padding:1rem;margin-bottom:0.75rem;text-align:center;">
      <div style="font-size:1.5rem;margin-bottom:0.5rem;">${item.emoji || '💄'}</div>
      <div style="font-weight:600;">${item.name}</div>
      <div style="color:#E5342B;font-weight:700;">$${item.price}</div>
    </div>
  `).join('');

  return `
<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;padding:2rem;color:#222;">
  <div style="text-align:center;margin-bottom:2rem;">
    <h1 style="color:#E5342B;">F<span style="color:#222;">&</span>J Beauty</h1>
    <div style="font-size:2.5rem;margin-top:1rem;">😢</div>
    <h2 style="margin-top:1rem;">You left something behind...</h2>
  </div>
  <div style="margin-bottom:1.5rem;">
    ${itemsHTML}
  </div>
  <div style="text-align:center;margin-bottom:1.5rem;">
    <a href="https://fjbeauty.com/cart.html" style="display:inline-block;background:#E5342B;color:#fff;padding:0.875rem 2rem;border-radius:8px;font-weight:700;text-decoration:none;">
      Complete Your Order →
    </a>
  </div>
  <div style="background:#FFF8E1;border-radius:10px;padding:1rem;font-size:0.85rem;color:#666;text-align:center;">
    🎁 Don't forget — use code <strong>FJFIRST</strong> for 10% off your first order!
  </div>
  <div style="margin-top:2rem;text-align:center;font-size:0.8rem;color:#999;">
    F&J Beauty · Seoul, Korea
  </div>
</body></html>`;
}

function passwordResetHTML(name, resetUrl) {
  return `
<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;padding:2rem;color:#222;">
  <div style="text-align:center;margin-bottom:2rem;">
    <h1 style="color:#E5342B;font-size:1.8rem;">F<span style="color:#222;">&</span>J Beauty</h1>
    <div style="font-size:2.5rem;margin-top:1rem;">🔑</div>
    <h2 style="margin-top:1rem;">Reset Your Password</h2>
  </div>
  <div style="background:#FFF8E1;border-radius:10px;padding:1rem;margin-bottom:1.5rem;font-size:0.9rem;">
    Hi ${name},<br><br>
    We received a request to reset your F&J Beauty account password. Click the button below to set a new password:
  </div>
  <div style="text-align:center;margin-bottom:1.5rem;">
    <a href="${resetUrl}" style="display:inline-block;background:#E5342B;color:#fff;padding:0.875rem 2rem;border-radius:8px;font-weight:700;text-decoration:none;">
      Reset Password →
    </a>
  </div>
  <div style="font-size:0.8rem;color:#999;text-align:center;">
    This link expires in 1 hour. If you didn't request a password reset, you can safely ignore this email.
  </div>
  <div style="margin-top:2rem;text-align:center;font-size:0.8rem;color:#999;">
    F&J Beauty · Seoul, Korea · <a href="https://fjbeauty.com">fjbeauty.com</a>
  </div>
</body></html>`;
}

// ---- Send Functions ----
async function sendOrderConfirmation(order, items) {
  const t = getTransporter();
  if (!t) { console.log('[Mailer] SMTP not configured, skipping order email'); return; }
  try {
    await t.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: order.shipping_email,
      subject: `🎉 Order #${order.order_number} Confirmed — F&J Beauty`,
      html: orderConfirmationHTML(order, items)
    });
    console.log(`[Mailer] Order confirmation sent to ${order.shipping_email}`);
  } catch (err) {
    console.error('[Mailer] Failed to send order confirmation:', err.message);
  }
}

async function sendShippingNotification(order) {
  const t = getTransporter();
  if (!t) return;
  try {
    await t.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: order.shipping_email,
      subject: `📦 Your F&J Order #${order.order_number} Has Shipped!`,
      html: shippingNotificationHTML(order)
    });
  } catch (err) {
    console.error('[Mailer] Failed to send shipping notification:', err.message);
  }
}

async function sendWelcomeEmail(name, email) {
  const t = getTransporter();
  if (!t) return;
  try {
    await t.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: email,
      subject: `💕 Welcome to F&J Beauty! Here's your 10% off code 🎁`,
      html: welcomeEmailHTML(name, email)
    });
  } catch (err) {
    console.error('[Mailer] Failed to send welcome email:', err.message);
  }
}

async function sendPasswordResetEmail(name, email, resetUrl) {
  const t = getTransporter();
  if (!t) { console.log('[Mailer] SMTP not configured, skipping password reset email'); return false; }
  try {
    await t.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: email,
      subject: 'Reset Your F&J Beauty Password',
      html: passwordResetHTML(name, resetUrl)
    });
    console.log(`[Mailer] Password reset email sent to ${email}`);
    return true;
  } catch (err) {
    console.error('[Mailer] Failed to send password reset email:', err.message);
    return false;
  }
}

async function sendCartAbandonment(email, items) {
  const t = getTransporter();
  if (!t) return;
  try {
    await t.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: email,
      subject: `😢 Your cart is waiting... Here's 10% off to help!`,
      html: cartAbandonmentHTML(items)
    });
  } catch (err) {
    console.error('[Mailer] Failed to send cart abandonment email:', err.message);
  }
}

module.exports = { sendOrderConfirmation, sendShippingNotification, sendWelcomeEmail, sendCartAbandonment, sendPasswordResetEmail };
