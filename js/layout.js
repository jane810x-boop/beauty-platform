// ========================================
// F&J Layout Component
// Single source of truth for header + mobile-nav + footer
// Replaces ~133 KB of hardcoded markup across 18 pages
// ========================================
(function () {
  'use strict';

  // ---- Language buttons (shared) ----
  var LANG_BTNS =
    '<button class="lang-flag-btn active" onclick="setLang(\'ko\')" title="한국어">🇰🇷</button>' +
    '<button class="lang-flag-btn" onclick="setLang(\'en\')" title="English">🇺🇸</button>' +
    '<button class="lang-flag-btn" onclick="setLang(\'pt-BR\')" title="Português (BR)">🇧🇷</button>' +
    '<button class="lang-flag-btn" onclick="setLang(\'es\')" title="Español">🇲🇽</button>' +
    '<button class="lang-flag-btn" onclick="setLang(\'zhHK\')" title="粵語">🇭🇰</button>';

  // ---- Build desktop nav links ----
  function navLinks(active) {
    function link(href, key, en, zh, nav) {
      var cls = active === nav ? ' class="active"' : '';
      return '<a href="' + href + '"' + cls + ' data-i18n="' + key + '" data-i18n-en="' + en + '">' + zh + '</a>';
    }
    return (
      link('index.html', 'nav.home', 'Home', '首頁', 'home') +
      link('shop.html', 'nav.shop', 'Shop', '全部商品', 'shop') +
      link('brands.html', 'nav.brands', 'Brands', '品牌', 'brands') +
      '<div class="nav-dropdown">' +
        '<span class="nav-dropdown-toggle" data-i18n="nav.learn" data-i18n-en="Learn">美妝學堂</span>' +
        '<div class="nav-dropdown-menu">' +
          '<a href="blog.html?cat=reviews" data-i18n="nav.reviews" data-i18n-en="Reviews">產品測評</a>' +
          '<a href="blog.html?cat=ingredients" data-i18n="nav.ingredients" data-i18n-en="Ingredients 101">成分科普</a>' +
          '<a href="blog.html?cat=routines" data-i18n="nav.routines" data-i18n-en="Routines & Tips">護膚步驟</a>' +
        '</div>' +
      '</div>' +
      link('story.html', 'nav.story', 'Brand Story', '品牌故事', 'story') +
      link('about.html', 'nav.about', 'About', '關於我們', 'about')
    );
  }

  // ---- Build mobile nav ----
  function mobileNavHTML(active) {
    function link(href, key, en, zh, nav) {
      var cls = active === nav ? ' class="active"' : '';
      return '<a href="' + href + '"' + cls + ' data-i18n="' + key + '" data-i18n-en="' + en + '">' + zh + '</a>';
    }
    return (
      '<nav class="mobile-nav">' +
        link('index.html', 'nav.home', 'Home', '首頁', 'home') +
        link('shop.html', 'nav.shop', 'Shop', '全部商品', 'shop') +
        link('brands.html', 'nav.brands', 'Brands', '品牌', 'brands') +
        '<div class="mobile-nav-dropdown">' +
          '<span class="mobile-nav-dropdown-toggle" data-i18n="nav.learn" data-i18n-en="Learn">美妝學堂</span>' +
          '<div class="mobile-nav-dropdown-menu">' +
            '<a href="blog.html?cat=reviews" data-i18n="nav.reviews" data-i18n-en="Reviews">產品測評</a>' +
            '<a href="blog.html?cat=ingredients" data-i18n="nav.ingredients" data-i18n-en="Ingredients 101">成分科普</a>' +
            '<a href="blog.html?cat=routines" data-i18n="nav.routines" data-i18n-en="Routines & Tips">護膚步驟</a>' +
          '</div>' +
        '</div>' +
        link('story.html', 'nav.story', 'Brand Story', '品牌故事', 'story') +
        link('about.html', 'nav.about', 'About', '關於我們', 'about') +
        '<a href="cart.html" data-i18n="nav.cart" data-i18n-en="Cart">購物車</a>' +
        '<div class="lang-switcher" style="margin-top:0.6rem;justify-content:center;">' +
          '<span class="lang-label" data-i18n="nav.language" data-i18n-en="Language">語言</span>' +
          LANG_BTNS +
        '</div>' +
      '</nav>'
    );
  }

  // ---- Build full header ----
  function headerHTML(active) {
    return (
      '<header class="header">' +
        '<div class="header-inner">' +
          '<a href="index.html" class="logo">F<span>&amp;</span>J</a>' +
          '<nav class="nav">' + navLinks(active) + '</nav>' +
          '<div class="header-actions">' +
            '<div class="header-search">' +
              '<input type="text" class="search-input" id="header-search" placeholder="Search products..." data-i18n-placeholder="search.placeholder" onkeydown="if(event.key===\'Enter\'){const q=this.value.trim();if(q)window.location.href=\'shop.html?search=\'+encodeURIComponent(q);}">' +
              '<button class="search-btn" onclick="const q=document.getElementById(\'header-search\').value.trim();if(q)window.location.href=\'shop.html?search=\'+encodeURIComponent(q);">🔍</button>' +
            '</div>' +
            '<button class="mobile-search-btn" onclick="var b=this.parentElement.parentElement.parentElement.querySelector(\'.mobile-search-bar\');if(b)b.classList.toggle(\'open\');" aria-label="Search">🔍</button>' +
            '<div class="lang-switcher">' +
              '<span class="lang-label" data-i18n="nav.language" data-i18n-en="Language">語言</span>' +
              LANG_BTNS +
            '</div>' +
            '<a href="login.html" class="user-menu-link" id="header-login-btn" data-i18n="nav.signin">👤 <span class="user-menu-text">Sign In</span></a>' +
            '<a href="account.html" class="user-menu-link" id="header-user-menu" style="display:none;">👤 <span class="user-menu-text"><span id="header-user-name"></span></span></a>' +
            '<a href="cart.html" class="icon-btn">🛒<span class="cart-count" style="display:none">0</span></a>' +
            '<button class="mobile-menu-btn icon-btn">☰</button>' +
          '</div>' +
        '</div>' +
        '<div class="mobile-search-bar">' +
          '<div class="header-search">' +
            '<input type="text" class="search-input" id="mobile-search-input" placeholder="Search products..." data-i18n-placeholder="search.placeholder" onkeydown="if(event.key===\'Enter\'){const q=this.value.trim();if(q)window.location.href=\'shop.html?search=\'+encodeURIComponent(q);}">' +
            '<button class="search-btn" onclick="const q=document.getElementById(\'mobile-search-input\').value.trim();if(q)window.location.href=\'shop.html?search=\'+encodeURIComponent(q);">🔍</button>' +
          '</div>' +
        '</div>' +
      '</header>'
    );
  }

  // ---- Build minimal header (logo only) ----
  function minimalHeaderHTML() {
    return (
      '<header class="header">' +
        '<div class="header-inner">' +
          '<a href="index.html" class="logo">F<span>&amp;</span>J</a>' +
        '</div>' +
      '</header>'
    );
  }

  // ---- Build footer ----
  function footerHTML(showTrust) {
    var trust = showTrust
      ? '<div class="footer-trust">' +
          '<span data-i18n="footer.badge_ssl">🔒 SSL/TLS Encrypted</span>' +
          '<span data-i18n="footer.badge_pci">💳 PCI-DSS Compliant</span>' +
          '<span data-i18n="footer.badge_gdpr">🛡️ LGPD / GDPR</span>' +
          '<span data-i18n="footer.badge_tracking">📦 Global Tracking</span>' +
          '<span data-i18n="footer.badge_anvisa">🏥 ANVISA Regulated</span>' +
        '</div>'
      : '';

    return (
      '<footer class="footer">' +
        '<div class="container">' +
          '<div class="footer-grid">' +
            '<div>' +
              '<div class="footer-logo">F<span>&amp;</span>J</div>' +
              '<p class="footer-desc" data-i18n="footer.tagline" data-i18n-en="Bringing the best of K-Beauty and Asian beauty to the world. Authentic products, thoughtfully curated.">把亞洲最好的美妝帶給世界。正品保障，精心策展，用心送達。</p>' +
            '</div>' +
            '<div>' +
              '<h4 data-i18n="footer.shop" data-i18n-en="Shop">購物</h4>' +
              '<a href="shop.html?cat=serums" data-i18n="footer.serums" data-i18n-en="Serums">精華液</a>' +
              '<a href="shop.html?cat=moisturizers" data-i18n="footer.moisturizers" data-i18n-en="Moisturizers">面霜</a>' +
              '<a href="shop.html?cat=sunscreen" data-i18n="footer.sunscreen" data-i18n-en="Sunscreen">防曬</a>' +
              '<a href="shop.html?cat=makeup" data-i18n="footer.makeup" data-i18n-en="Makeup">彩妝</a>' +
              '<a href="shop.html" data-i18n="footer.all" data-i18n-en="All Products">全部商品</a>' +
            '</div>' +
            '<div>' +
              '<h4 data-i18n="footer.help" data-i18n-en="Help">幫助</h4>' +
              '<a href="about.html" data-i18n="footer.about" data-i18n-en="About Us">關於我們</a>' +
              '<a href="story.html" data-i18n="footer.story" data-i18n-en="Our Story">品牌故事</a>' +
              '<a href="blog.html" data-i18n="footer.learn" data-i18n-en="Learn">美妝學堂</a>' +
              '<a href="shipping.html" data-i18n="footer.shipping" data-i18n-en="Shipping Info">配送資訊</a>' +
              '<a href="returns.html" data-i18n="footer.returns" data-i18n-en="Returns Policy">退換政策</a>' +
              '<a href="faq.html" data-i18n="footer.faq" data-i18n-en="FAQ">常見問題</a>' +
              '<a href="about.html" data-i18n="footer.contact" data-i18n-en="Contact">聯繫我們</a>' +
            '</div>' +
            '<div>' +
              '<h4 data-i18n="footer.legal" data-i18n-en="Legal">法律</h4>' +
              '<a href="privacy.html" data-i18n="footer.privacy" data-i18n-en="Privacy Policy">隱私政策</a>' +
              '<a href="terms.html" data-i18n="footer.terms" data-i18n-en="Terms of Service">服務條款</a>' +
              '<a href="returns.html" data-i18n="footer.auth" data-i18n-en="Authenticity Guarantee">正品保證</a>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<span data-i18n="footer.copyright" data-i18n-en="© 2026 F&amp;J. All rights reserved.">© 2026 F&amp;J. 保留所有權利。</span>' +
            '<div class="footer-social">' +
              '<a href="#">📸</a><a href="#">📹</a><a href="#">🐦</a><a href="#">📌</a>' +
            '</div>' +
          '</div>' +
          trust +
        '</div>' +
      '</footer>'
    );
  }

  // ---- Inject into mount points ----
  function inject() {
    // Header
    var headerMount = document.getElementById('header-mount');
    if (headerMount) {
      var nav = headerMount.getAttribute('data-nav') || '';
      var minimal = headerMount.getAttribute('data-minimal') === 'true';

      if (minimal) {
        headerMount.outerHTML = minimalHeaderHTML();
      } else {
        headerMount.outerHTML = headerHTML(nav) + mobileNavHTML(nav);
      }
    }

    // Footer
    var footerMount = document.getElementById('footer-mount');
    if (footerMount) {
      var trust = footerMount.getAttribute('data-trust') === 'true';
      footerMount.outerHTML = footerHTML(trust);
    }
  }

  // Run when DOM is ready. Since layout.js is loaded first (in <head>
  // before i18n.js, main.js, etc.), its DOMContentLoaded listener
  // registers first and fires before other scripts' handlers — so
  // the injected header/footer elements are already in the DOM when
  // main.js, auth.js, cart.js, and i18n.js run their init code.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
