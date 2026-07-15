const fs = require('fs');
const path = require('path');

const htmlFiles = [
  'cart.html', 'checkout.html', 'product.html', 'index.html',
  'shop.html', 'about.html', 'shipping.html', 'returns.html',
  'faq.html', 'privacy.html', 'terms.html', 'story.html',
  'account.html', 'login.html', 'register.html'
];

const hardcodedChinese = [];

htmlFiles.forEach(file => {
  const filePath = path.join('D:/WB/beauty-platform', file);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  // Find Chinese text not wrapped in t() or data-i18n
  const chineseRegex = /[\u4e00-\u9fa5]+/g;

  lines.forEach((line, idx) => {
    // Skip comments, scripts with t() calls, and data-i18n attributes
    if (line.includes('data-i18n=')) return;
    if (line.includes("t('") || line.includes('t("')) return;
    if (line.trim().startsWith('//') || line.trim().startsWith('/*')) return;

    const matches = line.match(chineseRegex);
    if (matches && matches.length > 0) {
      // Check if it's inside a script tag with i18n handling
      if (line.includes('${t(') || line.includes('`${t(')) return;

      hardcodedChinese.push({
        file,
        line: idx + 1,
        text: matches.join(' '),
        snippet: line.trim().substring(0, 100)
      });
    }
  });
});

console.log(`Found ${hardcodedChinese.length} lines with potential hardcoded Chinese:\n`);

// Group by file
const byFile = {};
hardcodedChinese.forEach(item => {
  if (!byFile[item.file]) byFile[item.file] = [];
  byFile[item.file].push(item);
});

Object.entries(byFile).forEach(([file, items]) => {
  console.log(`\n${file} (${items.length} lines):`);
  items.slice(0, 5).forEach(item => {
    console.log(`  L${item.line}: ${item.text}`);
  });
  if (items.length > 5) {
    console.log(`  ... and ${items.length - 5} more`);
  }
});

// Save report
fs.writeFileSync('D:/WB/beauty-platform/_hardcoded_chinese.json', JSON.stringify(hardcodedChinese, null, 2));
console.log(`\nFull report saved to _hardcoded_chinese.json`);
