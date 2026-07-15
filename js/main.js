// ========================================
// F&J - Main UI Functions
// Enhanced: Live Search, Wishlist, Pagination
// ========================================

// --- Mobile Menu ---
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.mobile-nav');
  if (!btn || !nav) return;

  // Create backdrop element
  var backdrop = document.querySelector('.mobile-nav-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'mobile-nav-backdrop';
    document.body.appendChild(backdrop);
  }

  function closeNav() {
    nav.classList.remove('open');
    btn.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  function openNav() {
    nav.classList.add('open');
    btn.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  btn.addEventListener('click', function() {
    if (nav.classList.contains('open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Close on backdrop click
  backdrop.addEventListener('click', closeNav);

  // Close on nav link click (except dropdown toggle)
  nav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      // Don't close if it's a dropdown toggle
      if (!link.classList.contains('mobile-nav-dropdown-toggle')) {
        closeNav();
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeNav();
    }
  });
}

// --- Mobile Learn Dropdown Toggle ---
function initMobileDropdown() {
  document.querySelectorAll('.mobile-nav-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = this.closest('.mobile-nav-dropdown');
      if (parent) parent.classList.toggle('open');
    });
  });
}

// --- Star Rating Renderer ---
function renderStars(rating) {
  const s = getStars(rating);
  return '★'.repeat(s.full) + (s.half ? '½' : '') + '☆'.repeat(s.empty);
}

// --- Render Product Card (Olive Young style) ---
function renderProductCard(product) {
  const brand = getBrand(product.brand);
  const isZh = typeof getLang === 'function' && getLang() === 'zhHK';
  const productName = isZh && product.nameZh ? product.nameZh : product.name;
  const safeProductName = escapeHtml(productName);
  const safeBrandName = escapeHtml(brand.name);
  const safeBrandEmoji = escapeHtml(brand.emoji);

  // Badge with readable text
  let badgeHTML = '';
  if (product.badge) {
    const badgeLabels = { bestseller: t('badge.bestseller'), sale: t('badge.sale'), new: t('badge.new'), luxury: t('badge.luxury') };
    const badgeLabel = badgeLabels[product.badge] || product.badge.toUpperCase();
    badgeHTML = `<span class="product-badge ${product.badge}">${badgeLabel}</span>`;
  }

  // Price with discount %
  let priceHTML = '';
  if (product.originalPrice && product.originalPrice > product.price) {
    const discount = Math.round((1 - product.price / product.originalPrice) * 100);
    priceHTML = `<span class="price-discount">${discount}%</span>
       <span class="price-current">${formatPrice(product.price)}</span>
       <span class="price-original">${formatPrice(product.originalPrice)}</span>`;
  } else {
    priceHTML = `<span class="price-current">${formatPrice(product.price)}</span>`;
  }

  // Star rating: ★★★★★ with count
  const stars = getStars(product.rating);
  const starsHTML = '★'.repeat(stars.full) + (stars.half ? '½' : '') + '☆'.repeat(stars.empty);

  // Wishlist state
  const wished = typeof isWishlisted === 'function' && isWishlisted(product.id);
  const heartIcon = wished ? '♥' : '♡';

  return `
    <div class="product-card" onclick="window.location.href='product.html?id=${encodeURIComponent(product.id)}'">
      <div class="product-img-wrap">
        ${product.image
          ? `<img src="${escapeHtml(product.image)}" alt="${safeProductName}" class="product-img" loading="lazy" onerror="this.style.display='none';this.parentElement.querySelector('.product-img-placeholder').style.display='flex'">`
          : ''}
        <div class="product-img-placeholder" style="${product.image ? 'display:none' : ''}">${safeBrandEmoji}</div>
        ${badgeHTML}
        <div class="product-actions">
          <button class="product-action-btn" onclick="event.stopPropagation(); quickAdd('${escapeHtml(product.id)}')" title="" data-title-i18n="quick_add">🛒</button>
          <button class="product-action-btn wishlist-btn ${wished ? 'active' : ''}" data-wishlist="${escapeHtml(product.id)}" onclick="event.stopPropagation(); toggleWishlist('${escapeHtml(product.id)}')" title="" data-title-i18n="wishlist">${heartIcon}</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-brand">${safeBrandName}</div>
        <div class="product-name">${safeProductName}</div>
        <div class="product-rating">
          <span class="stars">${starsHTML}</span>
          <span class="count">${product.rating} (${(product.reviews || 0).toLocaleString()})</span>
        </div>
        <div class="product-price">${priceHTML}</div>
      </div>
    </div>
  `;
}

function quickAdd(productId) {
  const dataSource = allProducts || PRODUCTS;
  const product = dataSource.find(p => p.id === productId) || getProduct(productId);
  if (!product) return;
  const size = (Array.isArray(product.sizes) && product.sizes.length > 0) ? product.sizes[0] : '';
  addToCart(productId, size, 1);
}

// --- Render Featured Products Grid ---
function renderProductGrid(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = products.map(renderProductCard).join('');
  // 更新 wishlist 按钮狀態
  if (typeof updateWishlistUI === 'function') updateWishlistUI();
}

// --- Live Search ---
function initLiveSearch() {
  const inputs = document.querySelectorAll('#header-search, .search-input');
  inputs.forEach(input => {
    if (input.dataset.searchInit) return;
    input.dataset.searchInit = '1';

    let dropdown = null;
    let debounceTimer = null;

    function createDropdown() {
      if (dropdown) return;
      dropdown = document.createElement('div');
      dropdown.className = 'search-dropdown';
      input.parentElement.appendChild(dropdown);
    }

    function showDropdown(html) {
      createDropdown();
      dropdown.innerHTML = html;
      dropdown.classList.add('show');
    }

    function hideDropdown() {
      if (dropdown) dropdown.classList.remove('show');
    }

    input.addEventListener('input', function() {
      const q = this.value.trim();
      clearTimeout(debounceTimer);

      if (q.length < 2) { hideDropdown(); return; }

      debounceTimer = setTimeout(() => {
        // Analytics: track search
        if (window.FJAnalytics) { FJAnalytics.search(q); }

        const dataSource = allProducts || PRODUCTS;
        const qLower = q.toLowerCase();
        const results = dataSource.filter(p => {
          const brand = getBrand(p.brand);
          const isZh = typeof getLang === 'function' && getLang() === 'zhHK';
          const name = isZh && p.nameZh ? p.nameZh : p.name;
          return name.toLowerCase().includes(qLower) ||
                 (brand && brand.name.toLowerCase().includes(qLower)) ||
                 (p.desc && p.desc.toLowerCase().includes(qLower));
        }).slice(0, 6);
        if (results.length === 0) {
          showDropdown(`<div class="search-no-results">No products found for "${escapeSearchHtml(q)}"</div>`);
          return;
        }

        const itemsHTML = results.map(p => {
          const brand = getBrand(p.brand);
          const isZh = typeof getLang === 'function' && getLang() === 'zhHK';
          const name = isZh && p.nameZh ? p.nameZh : p.name;
          const priceHTML = p.originalPrice
            ? `<span class="search-price">${formatPrice(p.price)}</span> <span class="search-price-old">${formatPrice(p.originalPrice)}</span>`
            : `<span class="search-price">${formatPrice(p.price)}</span>`;
          return `
            <a href="product.html?id=${encodeURIComponent(p.id)}" class="search-result-item">
              <div class="search-result-img">${escapeHtml(brand.emoji)}</div>
              <div class="search-result-info">
                <div class="search-result-brand">${escapeHtml(brand.name)}</div>
                <div class="search-result-name">${escapeHtml(name)}</div>
              </div>
              <div class="search-result-price">${priceHTML}</div>
            </a>`;
        }).join('');

        showDropdown(`
          <div class="search-dropdown-header">Products</div>
          ${itemsHTML}
          <a href="shop.html?search=${encodeURIComponent(q)}" class="search-view-all">View all results →</a>
        `);
      }, 200);
    });

    // 鍵盤导航
    input.addEventListener('keydown', function(e) {
      if (!dropdown || !dropdown.classList.contains('show')) return;
      const items = dropdown.querySelectorAll('.search-result-item');
      let currentIdx = -1;
      items.forEach((item, i) => { if (item.classList.contains('active')) currentIdx = i; });

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentIdx < items.length - 1) {
          if (currentIdx >= 0) items[currentIdx].classList.remove('active');
          items[currentIdx + 1].classList.add('active');
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentIdx > 0) {
          items[currentIdx].classList.remove('active');
          items[currentIdx - 1].classList.add('active');
        }
      } else if (e.key === 'Enter') {
        if (currentIdx >= 0 && items[currentIdx]) {
          e.preventDefault();
          window.location.href = items[currentIdx].href;
        }
      } else if (e.key === 'Escape') {
        hideDropdown();
      }
    });

    // 點擊外部關閉
    document.addEventListener('click', function(e) {
      if (!input.parentElement.contains(e.target)) hideDropdown();
    });
  });
}

function escapeSearchHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Escape HTML for any dynamic content injected via innerHTML
function escapeHtml(str) {
  if (str == null) return '';
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

// --- Pagination ---
function renderPagination(container, currentPage, totalPages, onPageChange) {
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let pages = [];
  // 邏輯：首頁 + 末頁 + 當前頁前後2頁
  const range = 2;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - range && i <= currentPage + range)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  const html = pages.map(p => {
    if (p === '...') return '<span class="pagination-ellipsis">...</span>';
    return `<button class="pagination-btn ${p === currentPage ? 'active' : ''}" onclick="${onPageChange}(${p})">${p}</button>`;
  }).join('');

  container.innerHTML = `
    <div class="pagination">
      <button class="pagination-btn pagination-prev ${currentPage === 1 ? 'disabled' : ''}" ${currentPage === 1 ? 'disabled' : ''} onclick="${onPageChange}(${currentPage - 1})">‹</button>
      ${html}
      <button class="pagination-btn pagination-next ${currentPage === totalPages ? 'disabled' : ''}" ${currentPage === totalPages ? 'disabled' : ''} onclick="${onPageChange}(${currentPage + 1})">›</button>
    </div>`;
}

// --- Update Footer Social Links from FJ_CONFIG ---
function updateFooterSocial() {
  try {
    var social = (window.FJ_CONFIG && window.FJ_CONFIG.site && window.FJ_CONFIG.site.social) || {};
    var container = document.querySelector('.footer-social');
    if (!container) return;

    var links = [
      { key: 'instagram', icon: '📸', label: 'Instagram' },
      { key: 'facebook', icon: '📘', label: 'Facebook' },
      { key: 'tiktok', icon: '🎵', label: 'TikTok' },
      { key: 'youtube', icon: '▶️', label: 'YouTube' }
    ];

    var html = '';
    links.forEach(function(item) {
      var url = social[item.key];
      if (url) {
        html += '<a href="' + url + '" target="_blank" rel="noopener" title="' + item.label + '">' + item.icon + '</a>';
      }
    });
    if (!html) {
      container.style.display = 'none';
    } else {
      container.innerHTML = html;
    }
  } catch(e) {}
}

// --- Initialize Page ---
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initMobileDropdown();
  updateCartUI();
  updateFooterSocial();
  initLiveSearch();
  initBackToTop();
  initHeaderScroll();
  initMobileSearch();
});

// --- Back to Top Button ---
function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.innerHTML = '↑';
  btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
}

// --- Header Scroll Shadow ---
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// --- Mobile Search Toggle ---
function initMobileSearch() {
  // Add mobile search button to header actions
  const headerActions = document.querySelector('.header-actions');
  if (!headerActions) return;

  // Check if already added
  if (document.querySelector('.mobile-search-btn')) return;

  const mobileBtn = document.createElement('button');
  mobileBtn.className = 'mobile-search-btn icon-btn';
  mobileBtn.innerHTML = '🔍';
  mobileBtn.onclick = () => {
    let bar = document.querySelector('.mobile-search-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'mobile-search-bar';
      bar.innerHTML = `
        <div class="header-search" style="width:100%">
          <input type="text" class="search-input" placeholder="Search products..." data-i18n-placeholder="search.placeholder"
            onkeydown="if(event.key==='Enter'){const q=this.value.trim();if(q)window.location.href='shop.html?search='+encodeURIComponent(q);}">
          <button class="search-btn" onclick="const q=this.parentElement.querySelector('.search-input').value.trim();if(q)window.location.href='shop.html?search='+encodeURIComponent(q);">🔍</button>
        </div>`;
      headerActions.parentElement.insertAdjacentElement('afterend', bar);
    }
    bar.classList.toggle('open');
  };

  // Insert before cart icon on mobile
  const cartIcon = headerActions.querySelector('.icon-btn[href="cart.html"]');
  if (cartIcon) {
    headerActions.insertBefore(mobileBtn, cartIcon);
  } else {
    headerActions.appendChild(mobileBtn);
  }
}
