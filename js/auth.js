// F&J Auth Module - Frontend Authentication
// 優先調用後端 API，無後端時自動降級到 localStorage Mock 模式

const MOCK_USERS_KEY = 'fj_mock_users';
const MOCK_ORDERS_KEY = 'fj_mock_orders';

// Secure hash using Web Crypto API (SHA-256)
async function secureHash(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '_fj_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Seed demo user on first load
async function _seedMockUsers() {
  const existing = localStorage.getItem(MOCK_USERS_KEY);
  if (existing) return;
  const demoHash = await secureHash('demo123');
  const seed = [{
    id: 'user-demo-001',
    email: 'demo@fjbeauty.com',
    passwordHash: demoHash,
    name: 'Demo User',
    country: 'US',
    createdAt: new Date().toISOString()
  }];
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(seed));
}
_seedMockUsers();

const Auth = {
  // Get stored token
  getToken() {
    return localStorage.getItem('fj_token');
  },

  // Get stored user
  getUser() {
    try {
      const u = localStorage.getItem('fj_user');
      return u ? JSON.parse(u) : null;
    } catch { return null; }
  },

  // Check if logged in
  isLoggedIn() {
    return !!this.getToken();
  },

  // Save auth data
  saveAuth(user, token) {
    const safeUser = { ...user };
    delete safeUser.password;
    localStorage.setItem('fj_token', token);
    localStorage.setItem('fj_user', JSON.stringify(safeUser));
  },

  // Clear auth data
  logout() {
    localStorage.removeItem('fj_token');
    localStorage.removeItem('fj_user');
  },

  // Register — tries API first, falls back to mock
  async register(email, password, name, country) {
    // Try real backend API
    if (typeof API !== 'undefined') {
      try {
        const data = await API.auth.register(email, password, name, country);
        if (data) {
          this.saveAuth(data.user, data.token);
          return { user: data.user, token: data.token };
        }
      } catch (err) {
        // Backend returned an error (e.g. email exists) — propagate it
        throw err;
      }
    }

    // Fallback: mock mode
    await new Promise(r => setTimeout(r, 400));
    const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error(t('auth.register.exists') || 'An account with this email already exists');
    }
    const user = {
      id: 'user-' + Date.now(),
      email, name, country,
      passwordHash: await secureHash(password),
      createdAt: new Date().toISOString()
    };
    users.push(user);
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
    const token = 'mock-jwt-' + Date.now();
    this.saveAuth(user, token);
    return { user, token };
  },

  // Login — tries API first, falls back to mock
  async login(email, password) {
    // Try real backend API
    if (typeof API !== 'undefined') {
      try {
        const data = await API.auth.login(email, password);
        if (data) {
          this.saveAuth(data.user, data.token);
          return { user: data.user, token: data.token };
        }
      } catch (err) {
        throw err;
      }
    }

    // Fallback: mock mode
    await new Promise(r => setTimeout(r, 400));
    const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error(t('auth.login.invalid') || 'Invalid email or password');
    }
    const inputHash = await secureHash(password);
    if (user.passwordHash !== inputHash) {
      throw new Error(t('auth.login.invalid') || 'Invalid email or password');
    }
    const token = 'mock-jwt-' + Date.now();
    this.saveAuth(user, token);
    return { user, token };
  },

  // Get current user profile
  async fetchProfile() {
    if (typeof API !== 'undefined') {
      try {
        const data = await API.auth.me();
        if (data) return data;
      } catch (err) {
        // Token might be invalid/expired
        if (err.message.includes('not found') || err.message.includes('Unauthorized')) {
          this.logout();
        }
      }
    }
    await new Promise(r => setTimeout(r, 200));
    return { user: this.getUser() };
  },

  // Update profile
  async updateProfile(fields) {
    if (typeof API !== 'undefined') {
      try {
        const data = await API.auth.updateProfile(fields);
        if (data) {
          const user = { ...this.getUser(), ...fields };
          localStorage.setItem('fj_user', JSON.stringify(user));
          return user;
        }
      } catch (err) {
        throw err;
      }
    }

    // Fallback: mock mode
    await new Promise(r => setTimeout(r, 300));
    const user = this.getUser();
    if (!user) throw new Error('Not logged in');
    const updated = { ...user, ...fields };
    localStorage.setItem('fj_user', JSON.stringify(updated));
    const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...fields };
      localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
    }
    return updated;
  },

  // Get user orders
  async getOrders() {
    if (typeof API !== 'undefined') {
      try {
        const data = await API.orders.myOrders();
        if (data) return data;
      } catch (err) {
        // fall through to mock
      }
    }
    await new Promise(r => setTimeout(r, 200));
    const allOrders = JSON.parse(localStorage.getItem(MOCK_ORDERS_KEY) || '[]');
    const user = this.getUser();
    if (!user) return { orders: [] };
    return { orders: allOrders.filter(o => o.user_id === user.id) };
  },

  // Create order
  async createOrder(orderData) {
    if (typeof API !== 'undefined') {
      try {
        const data = await API.orders.create(orderData);
        if (data) return data;
      } catch (err) {
        throw err;
      }
    }

    // Fallback: mock mode
    await new Promise(r => setTimeout(r, 600));
    const user = this.getUser();
    const orderNumber = 'FJ' + Date.now().toString().slice(-8);
    const order = {
      ...orderData,
      id: 'order-' + Date.now(),
      order_number: orderNumber,
      user_id: user ? user.id : 'guest',
      status: 'paid',
      created_at: new Date().toISOString()
    };
    const allOrders = JSON.parse(localStorage.getItem(MOCK_ORDERS_KEY) || '[]');
    allOrders.push(order);
    localStorage.setItem(MOCK_ORDERS_KEY, JSON.stringify(allOrders));
    return { order };
  },

  // Update header UI
  updateHeaderUI() {
    const user = this.getUser();
    const loginBtn = document.getElementById('header-login-btn');
    const userMenu = document.getElementById('header-user-menu');
    const userName = document.getElementById('header-user-name');

    if (!loginBtn) return;

    if (user) {
      loginBtn.style.display = 'none';
      if (userMenu) {
        userMenu.style.display = 'flex';
        if (userName) userName.textContent = user.name;
      }
    } else {
      loginBtn.style.display = '';
      if (userMenu) userMenu.style.display = 'none';
    }
  },

  // Initialize header
  initHeader() {
    this.updateHeaderUI();

    const logoutLink = document.getElementById('header-logout');
    if (logoutLink) {
      logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.logout();
        this.updateHeaderUI();
        window.location.reload();
      });
    }
  }
};

// Auto-init on page load
document.addEventListener('DOMContentLoaded', () => {
  Auth.initHeader();
});
