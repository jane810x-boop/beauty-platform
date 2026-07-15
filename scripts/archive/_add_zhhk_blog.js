const fs = require('fs');

const blogPath = 'D:/WB/beauty-platform/js/blog-data.js';
let content = fs.readFileSync(blogPath, 'utf8');

// 简繁转换表
const zhToHK = {
  '入门': '入門', '基础': '基礎', '深度': '深度', '解析': '解析',
  '核心': '核心', '成分': '成分', '护肤': '護膚', '流程': '流程',
  '步骤': '步驟', '不同肤质': '不同膚質',
  '文章': '文章', '完整': '完整', '阅读': '閱讀', '时间': '時間',
  '分钟': '分鐘', '韩妆': '韓妝', '韩国': '韓國', '亚洲': '亞洲',
  '美妆': '美妝', '产品': '產品', '品牌': '品牌', '购买': '購買',
  '价格': '價格', '适合': '適合', '类型': '類型', '肤质': '膚質',
  '解决': '解決', '方法': '方法', '使用': '使用', '正确': '正確',
  '方式': '方式', '详细': '詳細', '介绍': '介紹', '好处': '好處',
  '效果': '效果', '推荐': '推薦', '选择': '選擇', '必买': '必買',
  '清单': '清單', '分享': '分享', '经验': '經驗', '技巧': '技巧',
  '秘诀': '秘訣', '教程': '教學', '必备': '必備', '知识': '知識',
  '了解': '了解', '发现': '發現', '探索': '探索', '趋势': '趨勢',
  '流行': '流行', '热门': '熱門', '最佳': '最佳', '顶级': '頂級',
  '精华': '精華', '化妆水': '化妝水', '面膜': '面膜', '防晒': '防曬',
  '洁面': '潔面', '卸妆': '卸妝', '化妆': '化妝', '口红': '口紅',
  '眼影': '眼影', '腮红': '胭脂', '清洁': '清潔', '补水': '補水',
  '保湿': '保濕', '滋润': '滋潤', '控油': '控油', '抗皱': '抗皺',
  '紧致': '緊緻', '细致': '細緻', '黑头': '黑頭', '痘痘': '痘痘',
  '舒缓': '舒緩', '修复': '修復', '镇定': '鎮定', '泛红': '泛紅',
  '干燥': '乾燥', '油腻': '油膩', '混合': '混合', '中性': '中性',
  '干性': '乾性', '油性': '油性', '光泽': '光澤', '亮白': '亮白',
  '均匀': '均勻', '肤色': '膚色', '暗沉': '暗沉', '色斑': '色斑',
  '黑眼圈': '黑眼圈', '眼袋': '眼袋', '细纹': '細紋', '皱纹': '皺紋',
  '老化': '老化', '年龄': '年齡', '岁月': '歲月', '年轻': '年輕',
  '敏感': '敏感', '痘印': '痘印', '痤疮': '痤瘡', '胎盘': '胎盤',
  '烟酰胺': '菸鹼胺', '维生素': '維生素', '精华液': '精華液',
  '睡眠面膜': '睡眠面膜', '晚霜': '晚霜', '眼霜': '眼霜',
  '颈霜': '頸霜', '护手霜': '護手霜', '身体乳': '身體乳',
  '沐浴露': '沐浴露', '洗发水': '洗髮水', '护发素': '護髮素',
  '发膜': '髮膜', '精油': '精油', '喷雾': '噴霧', '唇膏': '唇膏',
  '唇彩': '唇彩', '睫毛膏': '睫毛膏', '眼线': '眼線', '眉笔': '眉筆',
  '粉饼': '粉餅', '散粉': '散粉', '隔离': '隔離', '妆前': '妝前',
  '定妆': '定妝', '卸妆油': '卸妝油', '卸妆膏': '卸妝膏',
  '凝胶': '凝膠', '乳状': '乳狀', '霜状': '霜狀', '膏状': '膏狀',
  '水状': '水狀', '油状': '油狀', '提拉': '提拉', '瘦脸': '瘦臉',
  '瘦身': '瘦身', '塑形': '塑形', '美体': '美體', '美发': '美髮',
  '护发': '護髮', '染发': '染髮', '烫发': '燙髮', '造型': '造型',
  '定型': '定型', '蓬松': '蓬鬆', '顺滑': '順滑', '亮泽': '亮澤',
  '去屑': '去屑', '止痒': '止癢', '防脱': '防脫', '生发': '生髮',
  '唇部': '唇部', '眼周': '眼周', '唇周': '唇周', '法令纹': '法令紋',
  '川字纹': '川字紋', '鱼尾纹': '魚尾紋', '抬头纹': '抬頭紋',
  '颈纹': '頸紋', '妊娠纹': '妊娠紋', '肥胖纹': '肥胖紋',
  '生长纹': '生長紋',
};

function toHK(text) {
  let result = text;
  const keys = Object.keys(zhToHK).sort((a, b) => b.length - a.length);
  for (const zh of keys) {
    const hk = zhToHK[zh];
    if (zh !== hk && result.includes(zh)) {
      result = result.split(zh).join(hk);
    }
  }
  return result;
}

// Find 'zh': 'value' patterns (single line, in content/author/tags etc)
const singleValueRegex = /'zh':\s*'((?:[^'\\]|\\.)*)'/g;
let singleMatch;
let singleInserts = 0;

const singleReplacements = [];
while ((singleMatch = singleValueRegex.exec(content)) !== null) {
  const value = singleMatch[1];
  if (!/[\u4e00-\u9fff]/.test(value)) continue;

  const hkValue = toHK(value);
  if (hkValue === value) continue;

  singleReplacements.push({
    start: singleMatch.index,
    end: singleMatch.index + singleMatch[0].length,
    oldText: singleMatch[0],
    newText: `'zh': '${value}',\n    'zh-HK': '${hkValue}'`
  });
  singleInserts++;
}

console.log(`Found ${singleInserts} 'zh' string values to convert`);

// Find 'zh': [...] array patterns
const arrayRegex = /'zh':\s*\[([^\]]+)\]/g;
let arrayMatch;
const arrayReplacements = [];

while ((arrayMatch = arrayRegex.exec(content)) !== null) {
  const itemsStr = arrayMatch[1];
  if (!/[\u4e00-\u9fff]/.test(itemsStr)) continue;

  // Extract all string items
  const items = [];
  const itemRegex = /'((?:[^'\\]|\\.)*)'/g;
  let itemMatch;
  while ((itemMatch = itemRegex.exec(itemsStr)) !== null) {
    items.push(itemMatch[1]);
  }

  const hkItems = items.map(i => /[\u4e00-\u9fff]/.test(i) ? toHK(i) : i);
  if (JSON.stringify(hkItems) === JSON.stringify(items)) continue;

  const zhArray = items.map(i => `'${i}'`).join(', ');
  const hkArray = hkItems.map(i => `'${i}'`).join(', ');

  arrayReplacements.push({
    start: arrayMatch.index,
    end: arrayMatch.index + arrayMatch[0].length,
    oldText: arrayMatch[0],
    newText: `'zh': [${zhArray}],\n    'zh-HK': [${hkArray}]`
  });
}

console.log(`Found ${arrayReplacements.length} 'zh' array values to convert`);

// Apply all replacements in reverse order (to maintain indices)
const allReplacements = [...singleReplacements, ...arrayReplacements].sort((a, b) => b.start - a.start);

let newContent = content;
for (const rep of allReplacements) {
  newContent = newContent.substring(0, rep.start) + rep.newText + newContent.substring(rep.end);
}

const totalInserts = singleInserts + arrayReplacements.length;
console.log(`\nTotal: ${totalInserts} inserts`);

if (totalInserts > 0) {
  fs.writeFileSync(blogPath, newContent, 'utf8');
  console.log('✅ File updated');
}
