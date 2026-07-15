// ========================================
// F&J - Cart Management
// ========================================

// ---- Currency-aware shipping helpers ----
function getFreeShippingThreshold() {
  const cfg = typeof getCurrencyConfig === 'function' ? getCurrencyConfig() : { rate: 1 };
  return 50 * cfg.rate; // $50 USD base threshold
}

function getBaseShippingCost() {
  const cfg = typeof getCurrencyConfig === 'function' ? getCurrencyConfig() : { rate: 1 };
  return 5.99 * cfg.rate; // $5.99 USD base shipping
}

const CART_KEY = 'fj_cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function cartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function cartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

function addToCart(productId, size, qty) {
  const cart = getCart();
  const key = productId + (size ? '_' + size : '');
  const existing = cart.find(item => (item.productId + '_' + (item.size || '')) === key);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ productId, size, qty });
  }

  saveCart(cart);
  updateCartUI();
  showToast(t('cart.added_toast'));

  // Analytics: track add to cart
  if (window.FJAnalytics) {
    const product = (typeof getProduct === 'function') ? getProduct(productId) : null;
    if (product) {
      FJAnalytics.addToCart({ id: product.id, name: product.name, brand: product.brand, category: product.category, price: product.price }, qty || 1);
    } else {
      FJAnalytics.addToCart({ id: productId, name: productId, brand: '', category: '', price: 0 }, qty || 1);
    }
  }
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCartUI();
  if (typeof renderCart === 'function') renderCart();
}

function updateQty(index, qty) {
  if (qty < 1) return;
  const cart = getCart();
  cart[index].qty = qty;
  saveCart(cart);
  updateCartUI();
  if (typeof renderCart === 'function') renderCart();
}

function clearCart() {
  saveCart([]);
  updateCartUI();
  if (typeof renderCart === 'function') renderCart();
}

function updateCartUI() {
  const count = cartCount();
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2500);
}

// Initialize cart UI on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
});
