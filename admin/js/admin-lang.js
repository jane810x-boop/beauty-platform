// F&J Admin — Multilingual Support (EN / 繁體中文)
const AdminLang = {
  current: localStorage.getItem('fj_admin_lang') || 'zhHK',

  translations: {
    zhHK: {
      // Sidebar
      'Dashboard': '儀表盤',
      'Products': '商品管理',
      'Orders': '訂單管理',
      'View Store →': '查看商城 →',
      'F&J Admin': 'F&J 後台管理',
      'Admin': '管理員',

      // Login
      'Sign in to manage your store': '登錄以管理您的店鋪',
      'Email': '郵箱',
      'Password': '密碼',
      'Enter password': '輸入密碼',
      'Sign In': '登錄',
      'Default:': '默認賬號：',
      'Invalid email or password': '郵箱或密碼無效',

      // Dashboard
      'Total Orders': '總訂單數',
      'Total Revenue': '總營收',
      'Active Products': '在售商品',
      'Registered Users': '註冊用戶',
      'Pending Orders': '待處理訂單',
      'Recent Orders': '最近訂單',
      'Loading dashboard...': '正在加載儀表盤...',
      'No orders yet.': '暫無訂單。',
      'Failed to load:': '加載失敗：',
      'Logout': '退出登錄',

      // Dashboard table
      'Order #': '訂單號',
      'Customer': '客戶',
      'Total': '金額',
      'Status': '狀態',
      'Date': '日期',
      'N/A': '暫無',

      // Products
      '+ Add Product': '+ 添加商品',
      'Search products...': '搜索商品...',
      'Loading products...': '正在加載商品...',
      'No products found.': '未找到商品。',
      'Add Product': '添加商品',
      'Edit Product': '編輯商品',
      'Save Product': '保存商品',
      'Cancel': '取消',
      'Product Slug *': '商品標識 *',
      'Name *': '名稱 *',
      'Name (Chinese)': '中文名稱',
      'Brand *': '品牌 *',
      'Category *': '分類 *',
      'Price *': '價格 *',
      'Original Price': '原價',
      'Stock': '庫存',
      'Badge': '標籤',
      'Rating': '評分',
      'Reviews': '評價數',
      'Description': '描述',
      'Description (Chinese)': '中文描述',
      'Sizes (comma-separated)': '規格（逗號分隔）',
      'Featured Product': '精選商品',
      'None': '無',
      'Slug': '標識',
      'Name': '名稱',
      'Brand': '品牌',
      'Price': '價格',
      'Actions': '操作',
      'Edit': '編輯',
      'Enable': '啟用',
      'Disable': '禁用',
      'Active': '在售',
      'Inactive': '下架',
      'Product updated!': '商品已更新！',
      'Product created!': '商品已創建！',
      'Product enabled': '商品已啟用',
      'Product disabled': '商品已下架',

      // Categories
      'skincare': '護膚',
      'serums': '精華',
      'moisturizers': '面霜/乳液',
      'cleansers': '潔面',
      'sunscreen': '防曬',
      'masks': '面膜',
      'makeup': '彩妝',

      // Orders
      'All Status': '全部狀態',
      'Search by order #, name or email...': '搜索訂單號、姓名或郵箱...',
      'Loading orders...': '正在加載訂單...',
      'No orders found.': '未找到訂單。',
      'Order Details': '訂單詳情',
      'Close': '關閉',
      'Mark Shipped': '標記已發貨',
      'Mark Delivered': '標記已送達',
      'Cancel': '取消訂單',
      'Cancelled': '已取消',
      'Details': '詳情',
      'Customer Info': '客戶信息',
      'Items': '商品明細',
      'Product': '商品',
      'Qty': '數量',
      'Payment': '支付方式',
      'Payment ID': '支付編號',
      'Order status updated to': '訂單狀態已更新為',

      // Status badges
      'paid': '已付款',
      'shipped': '已發貨',
      'delivered': '已送達',
      'cancelled': '已取消',
      'pending': '待處理',

      // Articles
      'Articles': '文章管理',
      'Article Management': '文章管理',
      'Search articles...': '搜索文章...',
      'All Categories': '全部分類',
      'Title': '標題',
      'Category': '分類',
      'Read': '閱讀',
      'Published': '已發佈',
      'Draft': '草稿',
      'Click to toggle': '點擊切換狀態',
      'Delete': '刪除',
      'Loading articles...': '正在加載文章...',
      'No articles found.': '未找到文章。',
      'Article status updated (display only)': '文章狀態已更新（僅展示）',
      'Edit not implemented (static data)': '編輯功能未實現（靜態數據）',
      'Delete not implemented (static data)': '刪除功能未實現（靜態數據）',
      'Delete this article? (display only)': '刪除這篇文章？（僅展示）',
      'Failed to load:': '加載失敗：',

      // Data
      'Failed to load': '加載失敗',
    },

    en: {
      // Auto-generated — keys are English, values are the same
    }
  },

  init() {
    this.current = localStorage.getItem('fj_admin_lang') || 'zhHK';
    this.apply();
  },

  toggle() {
    this.current = this.current === 'zhHK' ? 'en' : 'zhHK';
    localStorage.setItem('fj_admin_lang', this.current);
    this.apply();
    return this.current;
  },

  t(key) {
    if (this.current === 'en') return key;
    return this.translations.zhHK[key] || key;
  },

  apply() {
    document.querySelectorAll('[data-al]').forEach(el => {
      const key = el.getAttribute('data-al');
      el.textContent = this.t(key);
    });

    document.querySelectorAll('[data-al-placeholder]').forEach(el => {
      const key = el.getAttribute('data-al-placeholder');
      el.placeholder = this.t(key);
    });

    document.querySelectorAll('[data-al-value]').forEach(el => {
      const key = el.getAttribute('data-al-value');
      el.value = this.t(key);
    });

    document.querySelectorAll('[data-al-title]').forEach(el => {
      const key = el.getAttribute('data-al-title');
      el.title = this.t(key);
    });

    // Update the lang toggle button text
    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
      toggleBtn.textContent = this.current === 'zhHK' ? 'EN' : '繁體中文';
    }

    // Update status badges
    document.querySelectorAll('.badge').forEach(badge => {
      const status = ['paid', 'shipped', 'delivered', 'cancelled', 'pending'].find(s => badge.classList.contains(s));
      if (status && this.current === 'zhHK') {
        badge.textContent = this.t(status);
      }
    });

    // Update select options text
    document.querySelectorAll('select option').forEach(opt => {
      const key = opt.getAttribute('data-al');
      if (key) opt.textContent = this.t(key);
    });

    // Dispatch event for dynamic content re-render
    window.dispatchEvent(new CustomEvent('admin-lang-changed', { detail: { lang: this.current } }));
  }
};

// Auto-init when script loads
document.addEventListener('DOMContentLoaded', () => AdminLang.init());
