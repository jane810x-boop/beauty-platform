# F&J Beauty Platform — 深度分析报告

> 分析日期：2026-07-14
> 项目路径：D:\WB\beauty-platform

---

## 一、项目概况

| 维度 | 详情 |
|------|------|
| 架构 | MPA（多页面应用）+ Node.js/Express 后端 |
| 前端框架 | 无框架，纯 Vanilla HTML/CSS/JS |
| 后端 | Express 4 + SQLite (better-sqlite3, WAL模式) |
| 认证 | JWT + bcryptjs |
| 支付 | Stripe + PayPal（均为测试/占位状态）+ PIX（巴西） |
| 国际化 | 自建 i18n 系统，6种语言 (ko/en/pt-BR/es/zh/zhHK) |
| 页面数 | 20 前端页面 + 5 管理后台页面 |
| 品牌数 | 14 个（韩妆+日妆为主） |
| 产品数 | 24 个 |
| 博客 | 12 篇文章，5种语言版本 |

---

## 二、亮点（做得好的地方）

### 1. 双层数据架构设计合理
前端 `products.js` 内嵌静态数据 + 后端 SQLite 数据库，`api.js` 自动检测后端可用性并降级。这意味着：
- 无后端时也能完整运行（纯静态部署）
- 有后端时自动使用 API 数据（支持动态管理）

### 2. 国际化系统非常完整
190KB 的 i18n.js 覆盖 6 种语言，包括韩语、英语、葡萄牙语、西班牙语、中文简体和繁体。页面所有文案均有翻译键。

### 3. 合规意识强
- LGPD Cookie 同意横幅（巴西 GDPR 等价法规）
- 年龄验证门
- 完整的政策页面（隐私/条款/退货/配送/FAQ）

### 4. 后端安全基础扎实
- JWT 认证 + bcrypt 密码哈希
- 参数化 SQL 查询（防注入）
- API rate limiting
- 文件上传限制（5MB + 图片类型白名单）
- server/ 目录禁止外部访问

### 5. 功能覆盖面广
从首页到结账、从博客到管理后台，基本覆盖了电商核心流程。管理后台支持产品 CRUD、订单管理、图片上传。

---

## 三、关键问题（按优先级排序）

### P0 — 必须立即修复（安全/数据正确性）

#### 1. 订单状态硬编码为 'paid'
- **文件**: `server/routes/orders.js:32`
- **问题**: 订单创建时直接写入 `status = 'paid'`，但支付可能尚未完成
- **影响**: 用户可能未付款但订单显示已付款
- **修复**: 先创建为 `pending`，支付确认 webhook 回调后更新为 `paid`

#### 2. Mock 认证使用 Base64 编码代替密码哈希
- **文件**: `js/auth.js:15, 81, 110`
- **问题**: 后端不可用时，前端用 `btoa(password)` 存储"密码哈希"
- **影响**: Base64 是编码不是加密，密码可被直接逆向
- **修复**: Mock 模式应明确提示"仅用于演示"，或使用 Web Crypto API 的 SubtleCrypto 做前端哈希

#### 3. 搜索结果 XSS 风险
- **文件**: `js/main.js:158-173`
- **问题**: 搜索下拉框中产品名和品牌名直接通过模板字符串注入 HTML，未做转义
- **影响**: 如果管理员在后台输入含 HTML 标签的产品名，可能导致 XSS
- **修复**: 对所有动态注入 HTML 的文本做 `escapeHtml()` 处理

### P1 — 上线前必须解决（功能完整性）

#### 4. 支付流程未完成
- **Stripe**: `checkout.html` 仅创建 payment method，注释写着 "In production, you'd call stripe.confirmCardPayment()"
- **PIX**: 点击只调用 `processOrder('pix')`，没有生成真实 QR 码
- **Webhook**: 无 Stripe webhook 端点，无法处理异步支付通知
- **修复**: 完成 Stripe PaymentIntent 全流程、添加 webhook 路由、PIX 接入真实 QR 生成 API

#### 5. 商品详情页 SEO 缺失
- **文件**: `product.html:8`
- **问题**: meta description 是静态的 "Product detail page"，OG 标签也是通用的
- **影响**: 搜索引擎无法正确索引商品页面
- **修复**: JS 动态更新 meta description / OG tags / canonical URL；添加 Product JSON-LD structured data

#### 6. 库存不扣减
- **问题**: 数据库有 `stock` 字段，但下单时不扣减，前端不显示库存状态
- **影响**: 可能超卖
- **修复**: 下单时事务性扣减库存，库存为 0 时显示 "Sold out"

#### 7. 无密码重置 / 邮箱验证
- **问题**: 用户忘记密码无法找回，注册后不验证邮箱
- **修复**: 实现忘记密码流程（发送重置链接邮件）、注册后发送验证邮件

### P2 — 代码质量问题（应尽快改善）

#### 8. 根目录散落 48 个临时脚本
- **问题**: `_*.js`、`_*.py`、`_*.ps1` 共 48 个一次性脚本污染项目根目录
- **影响**: 项目结构混乱，新成员难以理解
- **修复**: 移到 `scripts/archive/` 或直接删除

#### 9. Header/Footer 未组件化
- **问题**: 每个 HTML 页面都硬编码相同的 header/footer（约 50-80 行）
- **影响**: 修改导航需要逐页更改，容易遗漏
- **修复**: 用 JS 动态注入 header/footer，或迁移到 SSR/SSG 框架

#### 10. Rate limiter 内存泄漏
- **文件**: `server/server.js:54-68`
- **问题**: 内存 Map 存储请求时间戳，从不清理过期 IP 条目
- **修复**: 添加定期清理逻辑，或使用 express-rate-limit 中间件

#### 11. i18n.js 全量加载（190KB）
- **问题**: 每次页面加载都全量下载 6 种语言的翻译
- **修复**: 按语言拆分文件，按需加载当前语言的翻译

#### 12. 痘痘贴分类错误
- **文件**: `js/products.js:210`
- **问题**: `cosrx-pimple-patches` 归类为 `body`（身体护理），应为 `masks` 或新增 `treatment`

### P3 — 缺失功能（长期路线图）

| 功能 | 说明 |
|------|------|
| 优惠券系统 | 代码提到 FJFIRST 折扣码但无验证逻辑 |
| 订单跟踪 | 无物流追踪集成 |
| 社交登录 | 无 Google/Facebook/Kakao 登录 |
| 商品多图 | 数据库支持 images 数组但前端只显示单图 |
| 商品变体 | 不支持颜色/款式选择 |
| 购物车同步 | 仅 localStorage，登录用户跨设备不同步 |
| 自动化测试 | 无单元/集成/E2E 测试 |
| CI/CD | 无部署流水线 |
| CSRF 保护 | 表单无 CSRF token |
| 图片优化 | 无 WebP/srcset/CDN |
| PWA | 无 Service Worker / 离线支持 |

---

## 四、硬编码值清单（部署前必须替换）

| 文件 | 行号 | 当前值 | 需替换为 |
|------|------|--------|----------|
| `js/site-config.js` | 9 | `5511999999999` | 真实 WhatsApp 号码 |
| `js/site-config.js` | 18 | `'test'` | PayPal Client ID |
| `js/site-config.js` | 21 | `'pk_test_placeholder'` | Stripe Publishable Key |
| `js/site-config.js` | 29 | `hello@fjbeauty.com` | 真实客服邮箱 |
| `js/site-config.js` | 30 | `123 Beauty St, Seoul` | 真实地址 |
| `server/.env` | — | JWT_SECRET 等占位值 | 生产环境密钥 |
| `server/seed.js` | 9 | `FJAdmin2026!` | 管理员密码（不应硬编码） |
| `js/analytics.js` | 8-9 | GA4/GTM 占位 ID | 真实分析 ID |
| `js/cart.js` | 8, 13 | $50 免运费 / $5.99 运费 | 可配置化 |
| 多个 HTML | — | `https://fjbeauty.com/` canonical | 动态生成 |

---

## 五、架构建议

### 短期（1-2周）：修 P0 + P1，准备上线
1. 修复 3 个 P0 安全问题
2. 完成 Stripe 支付全流程 + webhook
3. 商品详情页动态 SEO + JSON-LD
4. 库存扣减逻辑
5. 清理 48 个临时脚本
6. 替换所有硬编码占位值

### 中期（1-2月）：改善代码质量 + 补核心功能
1. Header/Footer 组件化（或迁移到 Next.js/Astro）
2. i18n 按需加载
3. 密码重置 + 邮箱验证
4. 优惠券系统
5. 商品多图展示
6. 购物车同步到后端
7. 添加基础测试

### 长期（3-6月）：规模化
1. 迁移到 SSG/SSR 框架（推荐 Astro 或 Next.js）
2. 数据库迁移到 PostgreSQL
3. 接入物流追踪 API
4. 社交登录
5. CI/CD + 自动化测试
6. PWA + 图片 CDN

---

## 六、总体评价

这是一个**完成度很高的电商原型/Demo**。从功能覆盖面来看，已经超越了大多数 MVP 级别的项目——20个页面、14个品牌、24个产品、6种语言、管理后台、博客系统、合规组件一应俱全。

双层数据架构（静态JS + SQLite后端 + 自动降级）是整个项目最巧妙的设计，使得项目既可以纯静态部署快速验证，也可以接入后端支撑真实交易。

当前最大的短板是**支付流程未真正打通**和**几个安全问题**。这些不解决就无法真正上线收款。代码质量方面，48个临时脚本和未组件化的 header/footer 是最影响可维护性的问题。

如果目标是在 1-2 周内上线，重点应该放在：修 P0 安全问题 → 完成 Stripe 支付 → 替换硬编码值 → 清理临时文件。
