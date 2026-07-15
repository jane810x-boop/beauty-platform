const fs = require('fs');
const content = fs.readFileSync('D:/WB/beauty-platform/js/i18n.js', 'utf8');

// Find I18N object
const i18nMatch = content.match(/const\s+I18N\s*=\s*\{/);
if (!i18nMatch) {
  console.log('Cannot find I18N object');
  process.exit(1);
}

// Find all language blocks
const langs = ['ko', 'en', 'zh', 'zh-HK', 'pt-BR', 'es'];
const keyCounts = {};

langs.forEach(lang => {
  const pattern = new RegExp(`['"]${lang}['"]\\s*:\\s*\\{`);
  const match = content.match(pattern);
  if (match) {
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
    const keys = block.match(/['"][\w.]+['"]:/g) || [];
    keyCounts[lang] = keys.length;
  } else {
    keyCounts[lang] = 0;
  }
});

console.log('=== i18n Key Counts ===');
Object.entries(keyCounts).forEach(([lang, count]) => {
  console.log(`${lang}: ${count} keys`);
});

// Compare zh vs zh-HK
if (keyCounts['zh'] > 0 && keyCounts['zh-HK'] > 0) {
  const coverage = Math.round(keyCounts['zh-HK'] / keyCounts['zh'] * 100);
  console.log(`\nzh-HK coverage vs zh: ${coverage}%`);
  console.log(`Missing: ${keyCounts['zh'] - keyCounts['zh-HK']} keys`);
}
