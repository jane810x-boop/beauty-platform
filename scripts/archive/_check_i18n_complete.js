const fs = require('fs');

const i18nPath = 'D:/WB/beauty-platform/js/i18n.js';
const content = fs.readFileSync(i18nPath, 'utf8');

// Extract all keys from ko (reference) and zh-HK
const extractKeys = (langBlock) => {
  const keys = [];
  const regex = /['"]([\w.]+)['"]:\s*['"]/g;
  let match;
  while ((match = regex.exec(langBlock)) !== null) {
    keys.push(match[1]);
  }
  return keys;
};

// Get language blocks
const getLangBlock = (lang) => {
  // Try both 'zh-HK' and zhHK formats
  const patterns = [
    new RegExp(`['"]${lang}['"]\\s*:\\s*\\{([\\s\\S]*?)\\n\\s*\\},?\\s*(?:['"]\\w+['"]\\s*:|\\})`, 'm'),
    new RegExp(`const\\s+${lang}\\s*=\\s*\\{([\\s\\S]*?)\\n\\};`, 'm')
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Get reference keys (from ko or zh)
const koBlock = getLangBlock('ko');
const zhBlock = getLangBlock('zh');
const zhHKBlock = getLangBlock('zh-HK');

const refKeys = extractKeys(koBlock || zhBlock || '');
const zhHKKeys = extractKeys(zhHKBlock || '');

console.log('=== i18n Key Coverage Report ===\n');
console.log(`Reference (ko/zh) keys: ${refKeys.length}`);
console.log(`zh-HK keys: ${zhHKKeys.length}`);
console.log(`Coverage: ${Math.round(zhHKKeys.length / refKeys.length * 100)}%`);

// Find missing keys
const missing = refKeys.filter(k => !zhHKKeys.includes(k));
console.log(`\nMissing keys in zh-HK: ${missing.length}`);

if (missing.length > 0 && missing.length <= 50) {
  console.log('\nMissing keys:');
  missing.forEach(k => console.log(`  - ${k}`));
} else if (missing.length > 50) {
  console.log('\nFirst 30 missing keys:');
  missing.slice(0, 30).forEach(k => console.log(`  - ${k}`));
  console.log(`  ... and ${missing.length - 30} more`);
}

// Categorize missing keys
const categories = {};
missing.forEach(k => {
  const cat = k.split('.')[0];
  categories[cat] = (categories[cat] || 0) + 1;
});

console.log('\nMissing by category:');
Object.entries(categories).sort((a,b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}`);
});

// Save report
fs.writeFileSync('D:/WB/beauty-platform/_i18n_missing.json', JSON.stringify(missing, null, 2));
console.log('\nFull list saved to _i18n_missing.json');
