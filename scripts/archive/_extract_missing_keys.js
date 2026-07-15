const fs = require('fs');
const content = fs.readFileSync('D:/WB/beauty-platform/js/i18n.js', 'utf8');

// Extract all keys and values from zh block
const extractKeyValuePairs = (startPattern) => {
  const regex = new RegExp(startPattern);
  const match = content.match(regex);
  if (!match) return {};

  const startIdx = match.index + match[0].length;
  let braceCount = 1;
  let endIdx = startIdx;
  for (let i = startIdx; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
    if (braceCount === 0) {
      endIdx = i;
      break;
    }
  }

  const block = content.substring(startIdx, endIdx);
  const pairs = {};
  const lineRegex = /['"]([\w.]+)['"]:\s*['"“]([^'"”\n]+)['"”],?/g;
  let lineMatch;
  while ((lineMatch = lineRegex.exec(block)) !== null) {
    pairs[lineMatch[1]] = lineMatch[2];
  }
  return pairs;
};

// Get zh and zh-HK key-value pairs
const zhPairs = extractKeyValuePairs('zh:\\s*\\{');
const zhHKPairs = extractKeyValuePairs("['\"]zh-HK['\"]:\\s*\\{");

console.log(`zh keys: ${Object.keys(zhPairs).length}`);
console.log(`zh-HK keys: ${Object.keys(zhHKPairs).length}`);

// Find missing keys
const missing = Object.keys(zhPairs).filter(k => !zhHKPairs[k]);
console.log(`\nMissing in zh-HK: ${missing.length} keys`);

// Group by category
const categories = {};
missing.forEach(k => {
  const cat = k.split('.')[0];
  if (!categories[cat]) categories[cat] = [];
  categories[cat].push({ key: k, zh: zhPairs[k] });
});

console.log('\nMissing by category:');
Object.entries(categories).sort((a,b) => b[1].length - a[1].length).forEach(([cat, items]) => {
  console.log(`  ${cat}: ${items.length}`);
});

// Save for translation
const output = {
  total: missing.length,
  categories,
  all: missing.map(k => ({ key: k, zh: zhPairs[k] }))
};

fs.writeFileSync('D:/WB/beauty-platform/_missing_zhHK.json', JSON.stringify(output, null, 2));
console.log('\nSaved to _missing_zhHK.json');
