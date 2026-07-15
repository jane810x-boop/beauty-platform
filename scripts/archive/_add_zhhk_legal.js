const fs = require('fs');

// 简繁转换表
const zhToHK = {
  '条款': '條款', '服务': '服務', '隐私': '隱私', '政策': '政策',
  '欢迎': '歡迎', '访问': '訪問', '使用': '使用', '平台': '平台',
  '同意': '同意', '接受': '接受', '阅读': '閱讀', '理解': '理解',
  '如果不': '如果不', '请': '請', '我们': '我們', '网站': '網站',
  '进行': '進行', '购买': '購買', '必须': '必須', '至少': '至少',
  '年龄': '年齡', '拥有': '擁有', '能力': '能力', '法律': '法律',
  '提供': '提供', '信息': '信息', '真实': '真實', '准确': '準確',
  '完整': '完整', '有效': '有效', '文档': '文檔', '识别': '識別',
  '注册': '註冊', '账户': '賬戶', '密码': '密碼', '安全': '安全',
  '责任': '責任', '保护': '保護', '机密': '機密', '活动': '活動',
  '通知': '通知', '立即': '立即', '怀疑': '懷疑', '未经授权': '未經授權',
  '商品': '商品', '价格': '價格', '变更': '變更', '调整': '調整',
  '支付': '支付', '方式': '方式', '信用卡': '信用卡', '借记卡': '借記卡',
  '处理': '處理', '安全': '安全', '保证': '保證', '订单': '訂單',
  '配送': '配送', '时间': '時間', '地址': '地址', '准确': '準確',
  '退货': '退貨', '退款': '退款', '条件': '條件', '详细': '詳細',
  '知识产权': '知識產權', '内容': '內容', '版权': '版權', '商标': '商標',
  '禁止': '禁止', '复制': '複製', '分发': '分發', '修改': '修改',
  '限制': '限制', '责任': '責任', '损害': '損害', '损失': '損失',
  '争议': '爭議', '解决': '解決', '仲裁': '仲裁', '法律': '法律',
  '管辖': '管轄', '变更': '變更', '更新': '更新', '发布': '發佈',
  '联系': '聯繫', '问题': '問題', '邮箱': '郵箱', '邮件': '郵件',
  '权利': '權利', '个人': '個人', '数据': '數據', '收集': '收集',
  '目的': '目的', '共享': '共享', '第三方': '第三方', '保护': '保護',
  'Cookie': 'Cookie', '技术': '技術', '安全': '安全', '措施': '措施',
  '链接': '鏈接', '外部': '外部', '控制': '控制', '承担': '承擔',
  '儿童': '兒童', '未满': '未滿', '监护人': '監護人', '同意': '同意',
  '更新': '更新', '发布': '發佈', '定期': '定期', '查看': '查看',
  '最新': '最新', '版本': '版本', '继续': '繼續', '视为': '視為',
  '产品': '產品', '质量': '質量', '保证': '保證', '正品': '正品',
  '包装': '包裝', '原封': '原封', '破损': '破損', '影响': '影響',
  '申请': '申請', '说明': '說明', '理由': '理由', '审核': '審核',
  '工作日': '工作日', '收到': '收到', '确认': '確認', '原路': '原路',
  '退还': '退還', '特殊情况': '特殊情況', '协商': '協商', '方案': '方案',
  '状况': '狀況', '使用': '使用', '证据': '證據', '图片': '圖片',
  '验证': '驗證', '成功': '成功', '通知': '通知', '拒绝': '拒絕',
  '风险': '風險', '自行': '自行', '承担': '承擔', '详情': '詳情',
  '页面': '頁面', '浏览': '瀏覽', '帮助': '幫助', '中心': '中心',
  '客服': '客服', '在线': '在線', '随时': '隨時', '咨询': '諮詢',
};

function toHK(text) {
  let result = text;
  const keys = Object.keys(zhToHK).sort((a, b) => b.length - a.length);
  for (const zh of keys) {
    if (result.includes(zh)) {
      result = result.split(zh).join(zhToHK[zh]);
    }
  }
  return result;
}

// Process terms.html, privacy.html, returns.html
const files = ['terms.html', 'privacy.html', 'returns.html'];
const baseDir = 'D:/WB/beauty-platform';

for (const file of files) {
  const filePath = `${baseDir}/${file}`;
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add zh-HK button to lang-tabs
  // Find: <button class="lang-tab" onclick="switchLegalLang('zh')">中文</button>
  // Add after: <button class="lang-tab" onclick="switchLegalLang('zh-HK')">粵語 (HK)</button>
  if (!content.includes("switchLegalLang('zh-HK')")) {
    content = content.replace(
      /<button class="lang-tab" onclick="switchLegalLang\('zh'\)">中文<\/button>/,
      '<button class="lang-tab" onclick="switchLegalLang(\'zh\')">中文</button>\n      <button class="lang-tab" onclick="switchLegalLang(\'zh-HK\')">粵語 (HK)</button>'
    );
  }

  // 2. Find zh block and add zh-HK block after
  // Pattern: <div class="legal-lang" data-lang="zh">...</div>
  const zhBlockMatch = content.match(/<div class="legal-lang" data-lang="zh">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
  if (zhBlockMatch && !content.includes('data-lang="zh-HK"')) {
    const zhBlock = zhBlockMatch[0];
    // Convert to HK
    let hkBlock = zhBlock
      .replace(/data-lang="zh"/g, 'data-lang="zh-HK"')
      .replace(/[\u4e00-\u9fff]+/g, (match) => toHK(match));

    // Insert after zh block
    content = content.replace(zhBlock, zhBlock + '\n\n    ' + hkBlock);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
}

console.log('\nDone!');
