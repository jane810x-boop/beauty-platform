const fs = require('fs');

const i18nPath = 'D:/WB/beauty-platform/js/i18n.js';
let content = fs.readFileSync(i18nPath, 'utf8');

// Find zh-HK block
const zhHKMatch = content.match(/'zh-HK':\s*\{([\s\S]*?)^\s*\},/m);
if (!zhHKMatch) {
  console.log('zh-HK block not found');
  process.exit(1);
}

let zhHKBlock = zhHKMatch[1];

// Currency conversions (USD to HKD, rate ~7.8)
const currencyReplacements = [
  // Free shipping threshold: $50 USD -> HK$390
  [/\$50/g, 'HK$390'],
  [/满\$50/g, '滿 HK$390'],
  [/滿\$50/g, '滿 HK$390'],
  [/满 \$50/g, '滿 HK$390'],
  [/滿 \$50/g, '滿 HK$390'],

  // Price ranges
  [/\$25/g, 'HK$195'],
  [/\$100/g, 'HK$780'],

  // Brazilian Real should stay as is (not applicable to HK)
  // R$250, R$500, R$49.90 etc - keep for Brazilian users
];

let updates = 0;
for (const [pattern, replacement] of currencyReplacements) {
  const before = zhHKBlock;
  zhHKBlock = zhHKBlock.replace(pattern, replacement);
  if (zhHKBlock !== before) {
    updates++;
  }
}

// Replace back
content = content.replace(zhHKMatch[1], zhHKBlock);

fs.writeFileSync(i18nPath, content, 'utf8');
console.log(`Updated ${updates} currency patterns in zh-HK block`);

// Show sample
const sampleLines = zhHKBlock.split('\n').filter(l => /HK\$|currency|shipping|免運費/.test(l)).slice(0, 15);
console.log('\nSample updated lines:');
sampleLines.forEach(l => console.log('  ' + l.trim()));
