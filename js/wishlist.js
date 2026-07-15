// ========================================
// F&J - Wishlist System
// 收藏功能：localStorage 持久化 + UI 同步
// ========================================

const WISHLIST_KEY = 'fj_wishlist';

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
  } catch { return []; }
}

function saveWishlist(items) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  updateWishlistUI();
}

function toggleWishlist(productId) {
  const items = getWishlist();
  const idx = items.indexOf(productId);
  let added;
  if (idx > -1) {
    items.splice(idx, 1);
    added = false;
  } else {
    items.push(productId);
    added = true;
  }
  saveWishlist(items);

  // 更新所有该產品的按钮狀態
  document.querySelectorAll(`[data-wishlist="${productId}"]`).forEach(btn => {
    btn.classList.toggle('active', added);
    btn.textContent = added ? '♥' : '♡';
  });

  showToast(added
    ? (typeof t === 'function' ? t('wishlist.added') : 'Added to wishlist')
    : (typeof t === 'function' ? t('wishlist.removed') : 'Removed from wishlist')
  );
  return added;
}

function isWishlisted(productId) {
  return getWishlist().includes(productId);
}

function wishlistCount() {
  return getWishlist().length;
}

function updateWishlistUI() {
  const count = wishlistCount();
  document.querySelectorAll('.wishlist-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });

  // 更新所有 wishlist 按钮狀態
  document.querySelectorAll('[data-wishlist]').forEach(btn => {
    const pid = btn.dataset.wishlist;
    const active = isWishlisted(pid);
    btn.classList.toggle('active', active);
    btn.textContent = active ? '♥' : '♡';
  });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  updateWishlistUI();
});
