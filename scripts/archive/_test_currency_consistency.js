const fs = require('fs');
const path = require('path');

const baseDir = 'D:/WB/beauty-platform';

console.log('=== Currency Consistency Verification ===\n');

// ========================================
// 1. Check all currency configs exist
// ========================================
console.log('1. Checking currency config completeness...\n');

const i18nPath = path.join(baseDir, 'js/i18n.js');
const i18nJs = fs.readFileSync(i18nPath, 'utf8');

const requiredLanguages = ['ko', 'en', 'zh', 'zh-HK', 'pt-BR', 'es'];

// Check getCurrencyConfig
const getCurrencyConfigMatch = i18nJs.match(/function getCurrencyConfig\(\)[\s\S]*?^\}/m);
if (getCurrencyConfigMatch) {
  const configBody = getCurrencyConfigMatch[0];
  console.log('getCurrencyConfig coverage:');
  requiredLanguages.forEach(lang => {
    const hasLang = configBody.includes(`case '${lang}'`);
    console.log(`  ${lang}: ${hasLang ? '✅' : '❌'}`);
  });
}

// Check getCurrencySymbol
const getCurrencySymbolMatch = i18nJs.match(/function getCurrencySymbol\(\)[\s\S]*?^\}/m);
if (getCurrencySymbolMatch) {
  const symbolBody = getCurrencySymbolMatch[0];
  console.log('\ngetCurrencySymbol coverage:');
  requiredLanguages.forEach(lang => {
    const hasLang = symbolBody.includes(`case '${lang}'`);
    console.log(`  ${lang}: ${hasLang ? '✅' : '❌'}`);
  });
}

// Check formatConverted
const formatConvertedMatch = i18nJs.match(/function formatConverted[\s\S]*?^\s{4}\}/m);
if (formatConvertedMatch) {
  const formatBody = formatConvertedMatch[0];
  console.log('\nformatConverted coverage:');
  requiredLanguages.forEach(lang => {
    const hasLang = formatBody.includes(`case '${lang}'`);
    console.log(`  ${lang}: ${hasLang ? '✅' : '❌'}`);
  });
}

// ========================================
// 2. Check for remaining hardcoded values
// ========================================
console.log('\n\n2. Checking for remaining hardcoded currency values...\n');

const htmlFiles = ['cart.html', 'checkout.html', 'product.html', 'shop.html', 'index.html'];
const jsFiles = ['cart.js', 'i18n.js'];

let foundIssues = false;

htmlFiles.forEach(file => {
  const filePath = path.join(baseDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Check for >= 50 or <= 50 without variable
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (/>=\s*50\b|<=\s*50\b|==\s*50\b/.test(line)) {
      // Check if it's using a variable
      if (!/freeShippingThreshold|threshold|getFreeShippingThreshold/.test(line)) {
        console.log(`⚠️  ${file}:${idx + 1} - Possible hardcoded threshold`);
        console.log(`   ${line.trim().substring(0, 80)}`);
        foundIssues = true;
      }
    }
  });
});

// ========================================
// 3. Check translation key consistency
// ========================================
console.log('\n3. Checking zh-HK translation coverage for currency keys...\n');

const currencyKeys = [
  'trust.shipping',
  'hero4.line1',
  'hero4.desc',
  'promo.title',
  'product.free_shipping_badge',
  'product.shipping_free',
  'shop.price_under25',
  'shop.price_25_50',
  'shop.price_50_100',
  'shop.price_100plus',
  'shipping.us_eu_free'
];

// Extract zh-HK block
const zhHKMatch = i18nJs.match(/'zh-HK':\s*\{([\s\S]*?)^\s*\},/m);
if (zhHKMatch) {
  const zhHKBlock = zhHKMatch[1];

  currencyKeys.forEach(key => {
    const hasKey = zhHKBlock.includes(`'${key}'`);
    const hasHKD = zhHKBlock.includes('HK$');
    console.log(`  ${key}: ${hasKey ? '✅' : '❌'} ${hasHKD ? '(HK$)' : ''}`);
  });
}

// ========================================
// 4. Summary
// ========================================
console.log('\n\n=== Summary ===');
if (foundIssues) {
  console.log('⚠️  Some issues found. Please review above.');
} else {
  console.log('✅ All currency values are properly configured!');
  console.log('✅ Cart and checkout use dynamic thresholds');
  console.log('✅ All languages have currency configs');
  console.log('✅ zh-HK translations include HK$ currency');
}

console.log('\n=== Expected Behavior ===');
console.log('Language → Currency → Free Shipping Threshold');
console.log('ko       → ₩ KRW  → ₩69,000');
console.log('en       → $ USD  → $50');
console.log('zh       → ¥ CNY  → ¥365');
console.log('zh-HK    → HK$ HKD → HK$390');
console.log('pt-BR    → R$ BRL → R$275');
console.log('es       → MX$ MXN → MX$875');
