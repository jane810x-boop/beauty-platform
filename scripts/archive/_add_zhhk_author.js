const fs = require('fs');

const blogPath = 'D:/WB/beauty-platform/js/blog-data.js';
let content = fs.readFileSync(blogPath, 'utf8');

// 简繁转换
const zhToHK = {
  '团队': '團隊', '玻璃肌': '玻璃肌', '韩妆': '韓妝', '护肤': '護膚',
  '保湿': '保濕', '补': '補', '补水': '補水', '洁面': '潔面',
  '卸妆': '卸妝', '防晒': '防曬', '化妆': '化妝', '化妆水': '化妝水',
  '精华': '精華', '眼影': '眼影', '腮红': '胭脂', '精华液': '精華液',
  '气垫': '氣墊', '韩式': '韓式', '韩方': '韓方', '人参': '人蔘',
  '传统医学': '傳統醫學', '蜗牛': '蝸牛', '粘液': '粘液',
  '积雪草': '積雪草', '敏感肌': '敏感肌', '舒缓': '舒緩',
  '玻尿酸': '玻尿酸', '烟酰胺': '菸鹼胺',
};

function toHK(text) {
  let result = text;
  for (const zh of Object.keys(zhToHK).sort((a, b) => b.length - a.length)) {
    if (result.includes(zh)) {
      result = result.split(zh).join(zhToHK[zh]);
    }
  }
  return result;
}

// Fix author objects like: zh: 'F&J 团队'
// Pattern: zh: '...' inside author: { ... }
// We need to find author blocks and add zh-HK

const authorRegex = /author:\s*\{([^}]+)\}/g;
let match;
let inserts = 0;

const replacements = [];

while ((match = authorRegex.exec(content)) !== null) {
  const block = match[1];

  // Check if it has zh: '...'
  const zhMatch = block.match(/zh:\s*'([^']+)'/);
  if (!zhMatch) continue;

  const zhValue = zhMatch[1];
  if (!/[\u4e00-\u9fff]/.test(zhValue)) continue;

  // Check if zh-HK already exists
  if (block.includes("'zh-HK'")) continue;

  const hkValue = toHK(zhValue);

  // Insert zh-HK after zh
  const newBlock = block.replace(
    /zh:\s*'([^']+)'/,
    `zh: '${zhValue}', 'zh-HK': '${hkValue}'`
  );

  replacements.push({
    start: match.index,
    end: match.index + match[0].length,
    oldText: match[0],
    newText: `author: {${newBlock}}`
  });
  inserts++;
}

console.log(`Found ${inserts} author blocks to fix`);

// Apply in reverse
let newContent = content;
for (const rep of replacements.sort((a, b) => b.start - a.start)) {
  newContent = newContent.substring(0, rep.start) + rep.newText + newContent.substring(rep.end);
}

if (inserts > 0) {
  fs.writeFileSync(blogPath, newContent, 'utf8');
  console.log('File updated');
}
