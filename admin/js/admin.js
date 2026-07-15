// F&J Admin JS — Auth & API (dual mode: real backend + mock fallback)
const ADMIN_API_BASE = (typeof window !== 'undefined' && window.location.origin.includes('codebuddy.work'))
  ? ''  // CloudStudio: same origin, relative path
  : 'http://localhost:3001'; // Local dev
const ADMIN_API = ADMIN_API_BASE + '/api/admin';
const AUTH_API = ADMIN_API_BASE + '/api/auth';
const MOCK_TOKEN = 'mock-jwt-fjadmin';

// Clear old incompatible tokens (but keep real JWTs and mock token)
const oldToken = localStorage.getItem('fj_admin_token');
if (oldToken && oldToken !== MOCK_TOKEN && oldToken.split('.').length !== 3) {
  localStorage.removeItem('fj_admin_token');
  localStorage.removeItem('fj_admin_user');
}

// === Mock Data ===
const MOCK_PRODUCTS = [
  { id: 1, product_slug: 'laneige-sleeping-mask', name: 'Water Sleeping Mask EX', name_zh: '水酷睡眠面膜EX', brand: 'Laneige', category: 'masks', price: 32.00, original_price: 38.00, stock: 120, badge: 'best', rating: 4.8, reviews: 1243, description: 'An overnight hydrating mask that deeply moisturizes and revitalizes tired skin.', description_zh: '夜間補水修護面膜，深度滋潤。', sizes: JSON.stringify(['60ml','25ml']), featured: 1, is_active: 1 },
  { id: 2, product_slug: 'cosrx-snail-essence', name: 'Advanced Snail 96 Mucin Power Essence', name_zh: '高級蝸牛96粘蛋白精華液', brand: 'COSRX', category: 'serums', price: 25.00, original_price: null, stock: 200, badge: 'best', rating: 4.9, reviews: 2156, description: 'With 96% snail secretion filtrate, repairs damaged skin.', description_zh: '含有96%蝸牛分泌物濾液，修復受損肌膚。', sizes: JSON.stringify(['100ml','30ml']), featured: 1, is_active: 1 },
  { id: 3, product_slug: 'skii-treatment-essence', name: 'Facial Treatment Essence (Pitera)', name_zh: '護膚精華露（神仙水）', brand: 'SK-II', category: 'toners', price: 99.00, original_price: null, stock: 45, badge: 'new', rating: 4.7, reviews: 892, description: 'The iconic essence with over 90% Pitera.', description_zh: '蘊含超過90% Pitera的傳奇精華水。', sizes: JSON.stringify(['230ml','160ml','75ml']), featured: 1, is_active: 1 },
  { id: 4, product_slug: 'innisfree-green-tea-serum', name: 'Green Tea Seed Hyaluronic Serum', name_zh: '綠茶籽透明質酸精華', brand: 'Innisfree', category: 'serums', price: 28.00, original_price: 35.00, stock: 80, badge: 'sale', rating: 4.6, reviews: 967, description: 'Infused with Beauty Green Tea from Jeju Island.', description_zh: '蘊含濟州島美肌綠茶。', sizes: JSON.stringify(['50ml','30ml']), featured: 1, is_active: 1 },
  { id: 5, product_slug: 'hada-labo-lotion', name: 'Gokujyun Premium Hyaluronic Acid Lotion', name_zh: '極潤 premium 透明質酸化妝水', brand: 'Hada Labo', category: 'toners', price: 19.50, original_price: null, stock: 150, badge: 'best', rating: 4.7, reviews: 1534, description: 'Japan\'s best-selling lotion with 7 types of hyaluronic acid.', description_zh: '日本銷量第一的化妝水，含7種透明質酸。', sizes: JSON.stringify(['170ml','100ml']), featured: 1, is_active: 1 },
  { id: 6, product_slug: 'sulwhasoo-first-care', name: 'First Care Activating Serum VI', name_zh: '潤致焕活肌底精華露VI', brand: 'Sulwhasoo', category: 'serums', price: 89.00, original_price: 105.00, stock: 30, badge: 'sale', rating: 4.8, reviews: 567, description: 'The ritual begins here. Luxury activating serum.', description_zh: '護膚儀式由此開始。奢華导入精華。', sizes: JSON.stringify(['90ml','60ml','30ml']), featured: 0, is_active: 1 },
  { id: 7, product_slug: 'romand-juicy-tint', name: 'Juicy Lasting Tint', name_zh: '果汁持久唇釉', brand: 'Rom&nd', category: 'makeup', price: 12.90, original_price: null, stock: 300, badge: 'best', rating: 4.6, reviews: 3201, description: 'The viral K-beauty lip tint.', description_zh: '風靡全球的韩妝染唇液。', sizes: JSON.stringify(['5.5g']), featured: 1, is_active: 1 },
  { id: 8, product_slug: 'anessa-milk-sunscreen', name: 'Perfect UV Sunscreen Milk SPF50+', name_zh: '安耐晒金瓶防晒乳 SPF50+', brand: 'Anessa', category: 'sunscreen', price: 35.00, original_price: null, stock: 90, badge: 'best', rating: 4.8, reviews: 1876, description: 'Japan\'s ultimate sunscreen.', description_zh: '日本終極防晒。', sizes: JSON.stringify(['60ml','20ml']), featured: 1, is_active: 1 },
  { id: 9, product_slug: 'beauty-of-joseon-serum', name: 'Glow Serum: Propolis + Niacinamide', name_zh: '蜂膠煙醯胺光彩精華', brand: 'Beauty of Joseon', category: 'serums', price: 17.00, original_price: 22.00, stock: 110, badge: 'sale', rating: 4.7, reviews: 2134, description: 'Honey-like propolis extract with niacinamide.', description_zh: '蜂蜜般蜂膠提取物搭配煙醯胺。', sizes: JSON.stringify(['30ml']), featured: 0, is_active: 1 },
  { id: 10, product_slug: 'clio-kill-liner', name: 'Superproof Brush Liner', name_zh: '防水眼線液笔', brand: 'CLIO', category: 'makeup', price: 16.50, original_price: 19.00, stock: 75, badge: 'sale', rating: 4.7, reviews: 2891, description: 'The eyeliner that survived K-pop dance practices.', description_zh: '經K-pop舞蹈練習考验的眼線笔。', sizes: JSON.stringify(['0.55g']), featured: 0, is_active: 1 },
  { id: 11, product_slug: 'cosrx-pimple-patches', name: 'Acne Pimple Master Patch (24 Pack)', name_zh: '痘痘貼（24片装）', brand: 'COSRX', category: 'body', price: 6.00, original_price: null, stock: 500, badge: 'best', rating: 4.8, reviews: 4521, description: 'Hydrocolloid patches that absorb gunk and protect blemishes.', description_zh: '水膠體貼片，吸收痘痘分泌物並保護患处。', sizes: JSON.stringify(['24 patches']), featured: 1, is_active: 1 },
  { id: 12, product_slug: 'dr-jart-cicapair', name: 'Cicapair Tiger Grass Color Correcting Treatment', name_zh: '积雪草修色霜', brand: 'Dr.Jart+', category: 'moisturizers', price: 52.00, original_price: null, stock: 60, badge: 'new', rating: 4.6, reviews: 1876, description: 'The color-correcting cream that neutralizes redness.', description_zh: '修色面霜，中和泛紅。', sizes: JSON.stringify(['50ml','15ml']), featured: 1, is_active: 1 }
];

const MOCK_ORDERS = [
  { id: 1, order_number: 'FJ20260001', status: 'paid', total: 57.00, currency: 'USD', created_at: '2026-06-28T10:00:00Z', shipping_name: 'Sarah Kim', shipping_email: 'sarah@example.com', shipping_phone: '+1-555-0101', shipping_address: '123 Rose Lane', shipping_city: 'Los Angeles', shipping_state: 'CA', shipping_zip: '90001', shipping_country: 'USA', payment_method: 'stripe', payment_id: 'pi_1234567890', items: [{ product_name: 'Water Sleeping Mask EX', brand_name: 'Laneige', quantity: 1, price: 32.00 }, { product_name: 'Acne Pimple Master Patch', brand_name: 'COSRX', quantity: 1, price: 6.00 }] },
  { id: 2, order_number: 'FJ20260002', status: 'shipped', total: 111.90, currency: 'USD', created_at: '2026-06-27T14:30:00Z', shipping_name: 'Emily Chen', shipping_email: 'emily@example.com', shipping_phone: '+1-555-0102', shipping_address: '456 Beauty Blvd', shipping_city: 'New York', shipping_state: 'NY', shipping_zip: '10001', shipping_country: 'USA', payment_method: 'stripe', payment_id: 'pi_1234567891', items: [{ product_name: 'Facial Treatment Essence (Pitera)', brand_name: 'SK-II', quantity: 1, price: 99.00 }] },
  { id: 3, order_number: 'FJ20260003', status: 'delivered', total: 35.00, currency: 'USD', created_at: '2026-06-25T09:00:00Z', shipping_name: 'Maria Silva', shipping_email: 'maria@example.com', shipping_phone: '+55-11-5555-0103', shipping_address: 'Av. Paulista 1000', shipping_city: 'São Paulo', shipping_state: 'SP', shipping_zip: '01310-000', shipping_country: 'Brazil', payment_method: 'stripe', payment_id: 'pi_1234567892', items: [{ product_name: 'Perfect UV Sunscreen Milk SPF50+', brand_name: 'Anessa', quantity: 1, price: 35.00 }] },
  { id: 4, order_number: 'FJ20260004', status: 'paid', total: 89.00, currency: 'USD', created_at: '2026-06-24T16:00:00Z', shipping_name: 'Jessica Wong', shipping_email: 'jess@example.com', shipping_phone: '+44-20-5555-0104', shipping_address: '12 Oxford St', shipping_city: 'London', shipping_state: 'London', shipping_zip: 'W1D 1BS', shipping_country: 'UK', payment_method: 'stripe', payment_id: 'pi_1234567893', items: [{ product_name: 'First Care Activating Serum VI', brand_name: 'Sulwhasoo', quantity: 1, price: 89.00 }] },
  { id: 5, order_number: 'FJ20260005', status: 'cancelled', total: 28.00, currency: 'USD', created_at: '2026-06-23T11:00:00Z', shipping_name: 'Anna Lee', shipping_email: 'anna@example.com', shipping_phone: '+1-555-0105', shipping_address: '789 Maple Dr', shipping_city: 'Toronto', shipping_state: 'ON', shipping_zip: 'M5V 3A8', shipping_country: 'Canada', payment_method: 'stripe', payment_id: 'pi_1234567894', items: [{ product_name: 'Green Tea Seed Hyaluronic Serum', brand_name: 'Innisfree', quantity: 1, price: 28.00 }] },
];

const MOCK_STATS = {
  totalOrders: 156,
  totalRevenue: 8423.50,
  totalProducts: 12,
  totalUsers: 89,
  pendingOrders: 8
};

// === Helper: detect if token is a real JWT (3 dot-separated base64 parts) ===
function _isRealJWT(token) {
  if (!token) return false;
  const parts = token.split('.');
  return parts.length === 3;
}

// === Admin Object ===
const Admin = {
  getToken() { return localStorage.getItem('fj_admin_token'); },
  setToken(t) { localStorage.setItem('fj_admin_token', t); },
  getUser() {
    try {
      const u = localStorage.getItem('fj_admin_user');
      return u ? JSON.parse(u) : null;
    } catch { return null; }
  },
  clearAuth() {
    localStorage.removeItem('fj_admin_token');
    localStorage.removeItem('fj_admin_user');
  },

  _(key) {
    return (typeof AdminLang !== 'undefined' && AdminLang.t) ? AdminLang.t(key) : key;
  },

  // Login: try real API first, fall back to mock credentials
  async login(email, password) {
    // Try real backend login
    try {
      const res = await fetch(`${AUTH_API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        // Check if user is admin
        if (!data.user.is_admin) {
          throw new Error(this._('Admin access required'));
        }
        this.setToken(data.token);
        localStorage.setItem('fj_admin_user', JSON.stringify(data.user));
        return { token: data.token, user: data.user };
      }
      // If API responded but login failed, throw the error message
      throw new Error(data.error || this._('Invalid email or password'));
    } catch (err) {
      // If the error is a network failure (API not available), fall back to mock
      // But if the API responded with an error message, propagate it
      if (err.message && !err.message.includes('Failed to fetch') && !err.message.includes('NetworkError')) {
        throw err;
      }
      // Network failure → mock mode
      if (email === 'admin@fjbeauty.com' && password === 'FJAdmin2026!') {
        const user = { id: 1, email: 'admin@fjbeauty.com', name: 'Admin', is_admin: true };
        this.setToken(MOCK_TOKEN);
        localStorage.setItem('fj_admin_user', JSON.stringify(user));
        return { token: MOCK_TOKEN, user };
      }
      throw new Error(this._('Invalid email or password'));
    }
  },

  // API call: use real API for JWT tokens, mock for mock tokens
  async api(method, path, body = null) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Unauthorized');
    }

    // Mock token → go straight to mock data (don't hit real API)
    if (token === MOCK_TOKEN) {
      return this._mockApi(method, path, body);
    }

    // Real JWT → call real API
    try {
      const headers = { 'Content-Type': 'application/json' };
      headers['Authorization'] = `Bearer ${token}`;
      const options = { method, headers };
      if (body) options.body = JSON.stringify(body);

      const res = await fetch(`${ADMIN_API}${path}`, options);
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          this.clearAuth();
          window.location.href = 'login.html';
        }
        throw new Error(data.error || 'Request failed');
      }
      return data;
    } catch (err) {
      // Network error with real JWT → don't fall back to mock (data mismatch)
      // Show error instead of silently using wrong data
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        throw new Error(this._('Cannot connect to server'));
      }
      throw err;
    }
  },

  checkAuth() {
    if (!this.getToken()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  // Upload files (FormData) — only works with real backend
  async apiUpload(formData) {
    const token = this.getToken();
    if (!token) throw new Error('Unauthorized');

    if (token === MOCK_TOKEN) {
      // Mock mode: convert files to object URLs for preview
      const files = formData.getAll('images');
      const urls = files.map(f => URL.createObjectURL(f));
      return { files: urls, message: 'Mock upload (local preview only)' };
    }

    const headers = {};
    headers['Authorization'] = `Bearer ${token}`;
    // Don't set Content-Type — browser will set it with boundary for FormData

    const res = await fetch(`${ADMIN_API}/upload`, {
      method: 'POST',
      headers,
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    return data;
  },

  showToast(msg, type) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.className = 'toast ' + (type || 'success');
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
  },

  statusLabel(status) {
    const map = {
      paid: 'paid', shipped: 'shipped', delivered: 'delivered',
      cancelled: 'cancelled', pending: 'pending'
    };
    return this._(map[status] || status);
  },

  _mockApi(method, path, body) {
    const token = this.getToken();
    if (!token || token !== MOCK_TOKEN) {
      throw new Error('Unauthorized');
    }

    const pathParts = path.split('?')[0].split('/').filter(p => p);

    // GET /stats
    if (method === 'GET' && pathParts[0] === 'stats') {
      return {
        stats: MOCK_STATS,
        recentOrders: MOCK_ORDERS.slice(0, 5)
      };
    }

    // GET /products
    if (method === 'GET' && pathParts[0] === 'products' && !pathParts[1]) {
      return { products: MOCK_PRODUCTS, total: MOCK_PRODUCTS.length };
    }

    // POST /products
    if (method === 'POST' && pathParts[0] === 'products' && !pathParts[1]) {
      const newProduct = { ...body, id: Date.now(), is_active: 1 };
      MOCK_PRODUCTS.push(newProduct);
      return { product: newProduct };
    }

    // PUT /products/:id
    if (method === 'PUT' && pathParts[0] === 'products' && pathParts[1]) {
      const id = parseInt(pathParts[1]);
      const idx = MOCK_PRODUCTS.findIndex(p => p.id === id);
      if (idx >= 0) {
        MOCK_PRODUCTS[idx] = { ...MOCK_PRODUCTS[idx], ...body };
        return { product: MOCK_PRODUCTS[idx] };
      }
      throw new Error('Product not found');
    }

    // GET /orders
    if (method === 'GET' && pathParts[0] === 'orders' && !pathParts[2]) {
      const url = new URL('http://localhost' + path);
      const status = url.searchParams.get('status');
      const search = url.searchParams.get('search');
      let orders = [...MOCK_ORDERS];
      if (status && status !== 'all') {
        orders = orders.filter(o => o.status === status);
      }
      if (search) {
        const q = search.toLowerCase();
        orders = orders.filter(o =>
          o.order_number.toLowerCase().includes(q) ||
          (o.shipping_name && o.shipping_name.toLowerCase().includes(q)) ||
          (o.shipping_email && o.shipping_email.toLowerCase().includes(q))
        );
      }
      return { orders, total: orders.length };
    }

    // PUT /orders/:id/status
    if (method === 'PUT' && pathParts[0] === 'orders' && pathParts[2] === 'status') {
      const id = parseInt(pathParts[1]);
      const order = MOCK_ORDERS.find(o => o.id === id);
      if (order) {
        order.status = body.status;
        return { order };
      }
      throw new Error('Order not found');
    }

    // GET /articles
    if (method === 'GET' && pathParts[0] === 'articles') {
      return { articles: [], total: 0 };
    }

    throw new Error('Not implemented: ' + method + ' ' + path);
  }
};
