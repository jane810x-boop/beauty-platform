// ========================================
// F&J Beauty - Analytics (GA4 + GTM)
// ========================================

(function () {
  // ---- Config ----
  var cfg = (window.FJ_CONFIG && window.FJ_CONFIG.analytics) || {};
  var GA_ID = cfg.ga4Id || 'G-XXXXXXXXXX'; // Replace with real GA4 ID
  var GTM_ID = cfg.gtmId || 'GTM-XXXXXXX'; // Replace with real GTM ID
  var USE_GTM = cfg.useGTM || false;

  // ---- GTM Load (if enabled) ----
  if (USE_GTM && GTM_ID !== 'GTM-XXXXXXX') {
    var gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    document.head.appendChild(gtmScript);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  }

  // ---- GA4 Load ----
  if (GA_ID !== 'G-XXXXXXXXXX') {
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(gaScript);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID, { send_page_view: true });
  }

  // ---- Ecommerce Events ----
  window.FJAnalytics = {
    // Track product view
    viewItem: function (product) {
      gtag('event', 'view_item', {
        currency: 'USD',
        value: product.price,
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_brand: product.brand,
          item_category: product.category,
          price: product.price,
          quantity: 1
        }]
      });
    },

    // Track add to cart
    addToCart: function (product, qty) {
      gtag('event', 'add_to_cart', {
        currency: 'USD',
        value: product.price * qty,
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_brand: product.brand,
          item_category: product.category,
          price: product.price,
          quantity: qty
        }]
      });
    },

    // Track checkout step
    beginCheckout: function (cartTotal) {
      gtag('event', 'begin_checkout', {
        currency: 'USD',
        value: cartTotal
      });
    },

    // Track checkout step progression (GTM Ecommerce)
    checkoutStep: function (step, option) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'checkout_progress',
        ecommerce: {
          checkout: {
            actionField: { step: step, option: option }
          }
        }
      });
    },

    // Track purchase
    purchase: function (orderData) {
      gtag('event', 'purchase', {
        transaction_id: orderData.order_number,
        value: orderData.total,
        currency: orderData.currency || 'USD',
        tax: orderData.tax || 0,
        shipping: orderData.shipping || 0,
        items: (orderData.items || []).map(function (item) {
          return {
            item_id: item.product_id,
            item_name: item.product_name,
            item_brand: item.brand_name,
            price: item.price,
            quantity: item.quantity
          };
        })
      });
    },

    // Track search
    search: function (searchTerm) {
      gtag('event', 'search', { search_term: searchTerm });
    },

    // Track page view (SPA support)
    pageView: function (title, path) {
      if (typeof gtag === 'function') {
        gtag('event', 'page_view', { page_title: title, page_location: path });
      }
    }
  };

  // Auto-track page views
  var origPushState = history.pushState;
  history.pushState = function () {
    origPushState.apply(this, arguments);
    if (window.FJAnalytics && typeof window.FJAnalytics.pageView === 'function') {
      setTimeout(function () {
        window.FJAnalytics.pageView(document.title, window.location.pathname);
      }, 100);
    }
  };

})();
