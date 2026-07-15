// ============================================
// F&J Beauty — Site Configuration
// 集中管理所有全局設定，部署時只需修改此文件
// ============================================
window.FJ_CONFIG = {
  // ---- WhatsApp 客服 ----
  whatsapp: {
    // 你的 WhatsApp 號码（國際格式，不帶 + 號）
    number: '5511999999999',   // ← 替換為真實號码
    name: 'F&J Support',
    greeting: "Hi there! 👋\nHow can we help you today? We typically reply within a few minutes.",
    defaultMsg: "Hi! I have a question about my order / a product 😊"
  },

  // ---- 支付配置 ----
  payments: {
    // PayPal: 在 https://developer.paypal.com/ 創建 App 獲取 Client ID
    paypalClientId: 'test',                  // ← 生產環境替換
    paypalCurrency: 'USD',
    // Stripe: 在 https://dashboard.stripe.com/ 獲取密鑰
    stripePublishableKey: 'pk_test_placeholder'  // ← 生產環境替換
  },

  // ---- 站點信息 ----
  site: {
    name: 'F&J Beauty',
    tagline: 'Curated Asian Beauty',
    url: window.location.origin,
    email: 'hello@fjbeauty.com',           // ← 替換為真實郵箱
    address: '123 Beauty St, Seoul, South Korea',  // ← 替換為真實地址
    // 社交媒體（留空則隱藏圖標）
    social: {
      instagram: '',    // 例如 'https://instagram.com/fjbeauty'
      facebook: '',     // 例如 'https://facebook.com/fjbeauty'
      tiktok: '',       // 例如 'https://tiktok.com/@fjbeauty'
      youtube: ''       // 例如 'https://youtube.com/@fjbeauty'
    }
  }
};
