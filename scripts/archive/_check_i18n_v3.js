const fs = require('fs');
const content = fs.readFileSync('D:/WB/beauty-platform/js/i18n.js', 'utf8');

// Language blocks can be: ko: { or 'zh-HK': {
const langs = [
  { name: 'ko', pattern: 'ko:\\s*\\{' },
  { name: 'en', pattern: 'en:\\s*\\{' },
  { name: 'zh', pattern: 'zh:\\s*\\{' },
  { name: 'zh-HK', pattern: "['\"]zh-HK['\"]:\\s*\\{" },
  { name: 'pt-BR', pattern: "['\"]pt-BR['\"]:\\s*\\{" },
  { name: 'es', pattern: 'es:\\s*\\{' }
];

const keyCounts = {};

langs.forEach(({name, pattern}) => {
  const regex = new RegExp(pattern);
  const match = content.match(regex);
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
    keyCounts[name] = keys.length;
  } else {
    keyCounts[name] = 0;
  }
});

console.log('=== i18n Key Counts ===');
Object.entries(keyCounts).forEach(([lang, count]) => {
  const status = count > 0 ? '✓' : '✗';
  console.log(`${lang.padEnd(6)}: ${String(count).padStart(4)} keys ${status}`);
});

// Coverage analysis
const refCount = keyCounts['zh'] || keyCounts['ko'] || 0;
const zhHKCount = keyCounts['zh-HK'] || 0;

if (refCount > 0) {
  const coverage = Math.round(zhHKCount / refCount * 100);
  console.log(`\nzh-HK coverage: ${coverage}% (${zhHKCount}/${refCount} keys)`);

  if (coverage < 100) {
    console.log(`⚠️  Missing ${refCount - zhHKCount} keys in zh-HK`);
  } else {
    console.log('✅ zh-HK has full coverage');
  }
}
