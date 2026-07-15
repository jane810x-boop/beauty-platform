const fs = require('fs');

const i18nPath = 'D:/WB/beauty-platform/js/i18n.js';
const content = fs.readFileSync(i18nPath, 'utf8');

// Find zh-HK block
const zhHKMatch = content.match(/'zh-HK':\s*\{([\s\S]*?)^\s*\},/m);
if (!zhHKMatch) {
  console.log('zh-HK block not found');
  process.exit(1);
}

const zhHKBlock = zhHKMatch[1];
const lines = zhHKBlock.split('\n');

console.log('=== Lines with currency symbols in zh-HK ===\n');

let found = 0;
lines.forEach((line, idx) => {
  if (/\$|€|£|¥|R\$/.test(line)) {
    console.log(`L${idx + 1}: ${line.trim()}`);
    found++;
  }
});

console.log(`\n=== Total: ${found} lines ===`);

// Check for formatting issues
console.log('\n=== Potential formatting issues ===\n');

lines.forEach((line, idx) => {
  // Missing space before currency
  if (/\w\$\d/.test(line) && !/HK\$|R\$/.test(line)) {
    console.log(`Missing space: L${idx + 1}: ${line.trim()}`);
  }
  // Double currency symbols
  if (/HK\$.*HK\$|R\$.*R\$/.test(line)) {
    console.log(`Double symbol: L${idx + 1}: ${line.trim()}`);
  }
});
