const fs = require('fs');
const i18nPath = 'D:/WB/beauty-platform/js/i18n.js';
const content = fs.readFileSync(i18nPath, 'utf8');

// Check language blocks
const languages = ['ko', 'en', 'zh', 'zhHK', 'ptBR', 'es'];
const langKeys = {};

languages.forEach(lang => {
  const regex = new RegExp(`const\\s+${lang}\\s*=\\s*\\{([\\s\\S]*?)\\n\\};`, 'm');
  const match = content.match(regex);
  if (match) {
    const keys = match[1].match(/['"][\w.]+['"]:/g) || [];
    langKeys[lang] = keys.length;
  } else {
    langKeys[lang] = 0;
  }
});

console.log('=== i18n Dictionary Key Counts ===');
Object.entries(langKeys).forEach(([lang, count]) => {
  const status = count > 0 ? '✓' : '✗ MISSING';
  console.log(`${lang}: ${count} keys ${status}`);
});

// Check if zh-HK has full translations
const zhHKBlock = content.match(/const\s+zhHK\s*=\s*\{([\s\S]*?)\n\};/m);
if (zhHKBlock) {
  const zhHKContent = zhHKBlock[1];

  // Check key categories
  const categories = [
    'nav\\.', 'cart\\.', 'checkout\\.', 'product\\.', 'urgency\\.',
    'shipping\\.', 'review\\.', 'trust\\.', 'email\\.', 'steps\\.'
  ];

  console.log('\n=== zh-HK Category Coverage ===');
  categories.forEach(cat => {
    const hasCat = zhHKContent.includes(cat.replace('\\', ''));
    console.log(`${cat.replace('\\', '')}: ${hasCat ? '✓' : '✗ MISSING'}`);
  });
}

// Save report
fs.writeFileSync('D:/WB/beauty-platform/_i18n_report.txt', JSON.stringify(langKeys, null, 2));
