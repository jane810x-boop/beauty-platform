const fs = require('fs');

const i18nPath = 'D:/WB/beauty-platform/js/i18n.js';
const content = fs.readFileSync(i18nPath, 'utf8');

// Find zh-HK block
const zhHKMatch = content.match(/'zh-HK':\s*\{[\s\S]*?^\s*\},/m);
if (!zhHKMatch) {
  console.log('zh-HK block not found');
  process.exit(1);
}

const zhHKBlock = zhHKMatch[0];
const lines = zhHKBlock.split('\n');

console.log('=== Currency-related lines in zh-HK block ===\n');

lines.forEach((line, idx) => {
  if (/\$|€|£|¥|R\$|USD|BRL|EUR|金额|货币|价格/.test(line)) {
    console.log(`L${idx + 1}: ${line}`);
  }
});

// Also check zh block for comparison
const zhMatch = content.match(/\bzh:\s*\{[\s\S]*?^\s*\},/m);
if (zhMatch) {
  const zhBlock = zhMatch[0];
  const zhLines = zhBlock.split('\n');

  console.log('\n=== Currency-related lines in zh block ===\n');

  zhLines.forEach((line, idx) => {
    if (/\$|€|£|¥|R\$|USD|BRL|EUR/.test(line)) {
      console.log(`L${idx + 1}: ${line}`);
    }
  });
}
