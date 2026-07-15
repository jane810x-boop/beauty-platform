// ========================================
// F&J - API Client Layer
// 自動檢測後端是否可用：有後端走API，無後端走本地數據
// ========================================

const API = (() => {
  // 檢測後端是否可用（同源時 /api/health 可達）
  let _backendAvailable = null;
  let _checking = false;

  async function checkBackend() {
    if (_backendAvailable !== null) return _backendAvailable;
    if (_checking) {
      // 等待正在進行的檢查
      while (_checking) await new Promise(r => setTimeout(r, 50));
      return _backendAvailable;
    }
    _checking = true;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const res = await fetch('/api/health', { signal: controller.signal });
      clearTimeout(timeoutId);
      _backendAvailable = res.ok;
    } catch (e) {
      _backendAvailable = false;
    }
    _checking = false;
    return _backendAvailable;
  }

  // 通用請求方法
  async function request(method, url, body = null, auth = false) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth) {
      const token = localStorage.getItem('fj_token');
      if (token) headers['Authorization'] = 'Bearer ' + token;
    }
    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(url, opts);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  }

  // ---- Products API ----
  const productsAPI = {
    async list(params = {}) {
      const useBackend = await checkBackend();
      if (useBackend) {
        const qs = new URLSearchParams(params).toString();
        const data = await request('GET', '/api/products' + (qs ? '?' + qs : ''));
        return data;
      }
      // Fallback: 從 products.js 的 PRODUCTS 數組篩選
      let items = [...PRODUCTS];
      if (params.category && params.category !== 'all') {
        items = items.filter(p => p.category === params.category);
      }
      if (params.brand && params.brand !== 'all') {
        items = items.filter(p => p.brand === params.brand);
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        items = items.filter(p =>
          p.name.toLowerCase().includes(q) ||
          (p.nameZh && p.nameZh.includes(q)) ||
          p.brand.toLowerCase().includes(q) ||
          (p.desc && p.desc.toLowerCase().includes(q))
        );
      }
      if (params.sort === 'price_asc') items.sort((a, b) => a.price - b.price);
      else if (params.sort === 'price_desc') items.sort((a, b) => b.price - a.price);
      else if (params.sort === 'rating') items.sort((a, b) => b.rating - a.rating);
      else if (params.sort === 'bestselling') items.sort((a, b) => b.reviews - a.reviews);
      else items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

      const total = items.length;
      const offset = parseInt(params.offset || 0);
      const limit = params.limit ? parseInt(params.limit) : items.length;
      items = items.slice(offset, offset + limit);

      return { products: items, total };
    },

    async get(slug) {
      const useBackend = await checkBackend();
      if (useBackend) {
        return request('GET', '/api/products/' + slug);
      }
      // Fallback
      const product = PRODUCTS.find(p => p.id === slug);
      return product ? { product } : null;
    },

    async getRelated(slug, limit = 4) {
      const useBackend = await checkBackend();
      if (useBackend) {
        try {
          return await request('GET', `/api/products/${slug}/related?limit=${limit}`);
        } catch (e) {
          // 後端可能沒有此接口，降級
        }
      }
      // Fallback: 同分類
      const product = PRODUCTS.find(p => p.id === slug);
      if (!product) return { products: [] };
      const related = PRODUCTS.filter(p => p.category === product.category && p.id !== slug).slice(0, limit);
      return { products: related };
    }
  };

  // ---- Auth API ----
  const authAPI = {
    async register(email, password, name, country) {
      const useBackend = await checkBackend();
      if (useBackend) {
        return request('POST', '/api/auth/register', { email, password, name, country });
      }
      return null; // 降級到 mock
    },

    async login(email, password) {
      const useBackend = await checkBackend();
      if (useBackend) {
        return request('POST', '/api/auth/login', { email, password });
      }
      return null;
    },

    async me() {
      const useBackend = await checkBackend();
      if (useBackend) {
        return request('GET', '/api/auth/me', null, true);
      }
      return null;
    },

    async updateProfile(fields) {
      const useBackend = await checkBackend();
      if (useBackend) {
        return request('PUT', '/api/auth/profile', fields, true);
      }
      return null;
    }
  };

  // ---- Orders API ----
  const ordersAPI = {
    async create(orderData) {
      const useBackend = await checkBackend();
      if (useBackend) {
        return request('POST', '/api/orders', orderData, false);
      }
      return null;
    },

    async myOrders() {
      const useBackend = await checkBackend();
      if (useBackend) {
        return request('GET', '/api/orders/my', null, true);
      }
      return null;
    },

    async getById(id) {
      const useBackend = await checkBackend();
      if (useBackend) {
        return request('GET', '/api/orders/' + id, null, true);
      }
      return null;
    }
  };

  // ---- Reviews API ----
  const reviewsAPI = {
    async list(productSlug) {
      const useBackend = await checkBackend();
      if (useBackend) {
        try {
          return await request('GET', `/api/reviews/${productSlug}`);
        } catch (e) {
          // 後端可能沒有此接口
        }
      }
      // Fallback: 從 localStorage 讀取
      const all = JSON.parse(localStorage.getItem('fj_reviews') || '{}');
      return { reviews: all[productSlug] || [] };
    },

    async add(productSlug, review) {
      const useBackend = await checkBackend();
      if (useBackend) {
        try {
          return await request('POST', `/api/reviews/${productSlug}`, review, true);
        } catch (e) {
          // 降級到本地
        }
      }
      // Fallback: 存入 localStorage
      const all = JSON.parse(localStorage.getItem('fj_reviews') || '{}');
      if (!all[productSlug]) all[productSlug] = [];
      const newReview = {
        id: 'r-' + Date.now(),
        productSlug,
        ...review,
        createdAt: new Date().toISOString()
      };
      all[productSlug].unshift(newReview);
      localStorage.setItem('fj_reviews', JSON.stringify(all));
      return { review: newReview };
    }
  };

  // ---- Wishlist API ----
  const wishlistAPI = {
    // Wishlist 始終本地存儲（無需後端）
    get() {
      try {
        return JSON.parse(localStorage.getItem('fj_wishlist') || '[]');
      } catch { return []; }
    },
    save(items) {
      localStorage.setItem('fj_wishlist', JSON.stringify(items));
    },
    toggle(productId) {
      const items = this.get();
      const idx = items.indexOf(productId);
      if (idx > -1) {
        items.splice(idx, 1);
        return { added: false, items };
      } else {
        items.push(productId);
        return { added: true, items };
      }
    },
    has(productId) {
      return this.get().includes(productId);
    },
    count() {
      return this.get().length;
    }
  };

  return {
    checkBackend,
    products: productsAPI,
    auth: authAPI,
    orders: ordersAPI,
    reviews: reviewsAPI,
    wishlist: wishlistAPI
  };
})();
