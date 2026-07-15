const fs = require('fs');

const i18nPath = 'D:/WB/beauty-platform/js/i18n.js';
const content = fs.readFileSync(i18nPath, 'utf8');
const translations = JSON.parse(fs.readFileSync('D:/WB/beauty-platform/_zhHK_translations.json', 'utf8'));

// Find zh-HK block
const zhHKStart = content.indexOf("'zh-HK': {");
if (zhHKStart === -1) {
  console.log('Cannot find zh-HK block');
  process.exit(1);
}

// Find the closing brace of zh-HK block
let braceCount = 0;
let zhHKEnd = zhHKStart;
let started = false;
for (let i = zhHKStart; i < content.length; i++) {
  if (content[i] === '{') {
    braceCount++;
    started = true;
  } else if (content[i] === '}') {
    braceCount--;
    if (started && braceCount === 0) {
      zhHKEnd = i;
      break;
    }
  }
}

// Extract existing zh-HK keys
const zhHKBlock = content.substring(zhHKStart, zhHKEnd + 1);
const existingKeys = new Set();
const keyRegex = /['"]([\w.]+)['"]:/g;
let match;
while ((match = keyRegex.exec(zhHKBlock)) !== null) {
  existingKeys.add(match[1]);
}

console.log(`Existing zh-HK keys: ${existingKeys.size}`);

// Generate new key-value pairs
const newPairs = translations
  .filter(t => !existingKeys.has(t.key))
  .map(t => `    '${t.key}': '${t.hk.replace(/'/g, "\\'")}',`);

console.log(`New keys to add: ${newPairs.length}`);

if (newPairs.length === 0) {
  console.log('No new keys to add');
  process.exit(0);
}

// Insert new keys before the closing brace
const insertPosition = zhHKEnd;
const newContent =
  content.substring(0, insertPosition) +
  '\n' + newPairs.join('\n') + '\n  ' +
  content.substring(insertPosition);

// Write back
fs.writeFileSync(i18nPath, newContent, 'utf8');
console.log(`✅ Updated i18n.js with ${newPairs.length} new zh-HK translations`);
