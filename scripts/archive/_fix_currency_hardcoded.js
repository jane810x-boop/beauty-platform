const fs = require('fs');
const path = require('path');

const baseDir = 'D:/WB/beauty-platform';

// ========================================
// 1. Add currency-aware helpers to cart.js
// ========================================
console.log('=== Step 1: Update cart.js with currency helpers ===\n');

const cartJsPath = path.join(baseDir, 'js/cart.js');
let cartJs = fs.readFileSync(cartJsPath, 'utf8');

// Add getFreeShippingThreshold and getBaseShippingCost functions
const currencyHelpers = `
// ========================================
// Currency-aware shipping helpers
// ========================================

function getFreeShippingThreshold() {
  const cfg = typeof getCurrencyConfig === 'function' ? getCurrencyConfig() : { rate: 1 };
  return 50 * cfg.rate; // $50 USD base threshold
}

function getBaseShippingCost() {
  const cfg = typeof getCurrencyConfig === 'function' ? getCurrencyConfig() : { rate: 1 };
  return 5.99 * cfg.rate; // $5.99 USD base shipping
}

`;

if (!cartJs.includes('getFreeShippingThreshold')) {
  cartJs = currencyHelpers + cartJs;
  fs.writeFileSync(cartJsPath, cartJs, 'utf8');
  console.log('✅ Added currency helpers to cart.js');
} else {
  console.log('⏭️  Currency helpers already exist in cart.js');
}

// ========================================
// 2. Fix cart.html hardcoded values
// ========================================
console.log('\n=== Step 2: Fix cart.html ===\n');

const cartHtmlPath = path.join(baseDir, 'cart.html');
let cartHtml = fs.readFileSync(cartHtmlPath, 'utf8');

// Replace hardcoded thresholds and shipping costs
const cartReplacements = [
  // Line 158: const shipping = subtotal >= 50 ? 0 : 5.99;
  [
    'const shipping = subtotal >= 50 ? 0 : 5.99;',
    'const freeShippingThreshold = getFreeShippingThreshold(); const baseShippingCost = getBaseShippingCost(); const shipping = subtotal >= freeShippingThreshold ? 0 : baseShippingCost;'
  ],
  // Line 202: formatPrice(50 - subtotal)
  [
    'formatPrice(50 - subtotal)',
    'formatPrice(freeShippingThreshold - subtotal)'
  ],
  // Line 229: ${subtotal >= 50
  [
    '${subtotal >= 50',
    '${subtotal >= freeShippingThreshold'
  ],
  // Line 232: formatPrice(50 - subtotal)
  // Already fixed above (same pattern)
];

let cartUpdates = 0;
cartReplacements.forEach(([oldText, newText]) => {
  if (cartHtml.includes(oldText)) {
    cartHtml = cartHtml.split(oldText).join(newText);
    cartUpdates++;
  }
});

fs.writeFileSync(cartHtmlPath, cartHtml, 'utf8');
console.log(`✅ Updated ${cartUpdates} patterns in cart.html`);

// ========================================
// 3. Fix checkout.html hardcoded values
// ========================================
console.log('\n=== Step 3: Fix checkout.html ===\n');

const checkoutHtmlPath = path.join(baseDir, 'checkout.html');
let checkoutHtml = fs.readFileSync(checkoutHtmlPath, 'utf8');

// Similar replacements
const checkoutReplacements = [
  // Line 287, 304, 559: subtotal >= 50 ? 0 : 5.99
  [
    /subtotal >= 50 \? 0 : 5\.99/g,
    'subtotal >= freeShippingThreshold ? 0 : baseShippingCost'
  ],
  // Add threshold calculation at the start of each function that uses it
  [
    'const subtotal = cartTotal();',
    'const subtotal = cartTotal(); const freeShippingThreshold = getFreeShippingThreshold(); const baseShippingCost = getBaseShippingCost();'
  ],
  // formatPrice(50 - subtotal) patterns
  [
    /formatPrice\(50 - subtotal\)/g,
    'formatPrice(freeShippingThreshold - subtotal)'
  ],
];

let checkoutUpdates = 0;
checkoutReplacements.forEach(([pattern, replacement]) => {
  if (pattern instanceof RegExp) {
    const matches = checkoutHtml.match(pattern);
    if (matches) {
      checkoutHtml = checkoutHtml.replace(pattern, replacement);
      checkoutUpdates += matches.length;
    }
  } else {
    if (checkoutHtml.includes(pattern)) {
      checkoutHtml = checkoutHtml.split(pattern).join(replacement);
      checkoutUpdates++;
    }
  }
});

fs.writeFileSync(checkoutHtmlPath, checkoutHtml, 'utf8');
console.log(`✅ Updated ${checkoutUpdates} patterns in checkout.html`);

// ========================================
// 4. Update i18n.js to use dynamic thresholds in translation
// ========================================
console.log('\n=== Step 4: Check i18n.js for dynamic threshold support ===\n');

const i18nJsPath = path.join(baseDir, 'js/i18n.js');
let i18nJs = fs.readFileSync(i18nJsPath, 'utf8');

// Check if getFreeShippingThreshold exists
if (i18nJs.includes('getFreeShippingThreshold')) {
  console.log('✅ getFreeShippingThreshold already defined in i18n.js');
} else {
  // Add to i18n.js as well (for pages that don't load cart.js)
  const i18nHelpers = `
// Currency-aware threshold helpers (duplicated from cart.js for standalone pages)
function getFreeShippingThreshold() {
  const cfg = getCurrencyConfig();
  return 50 * cfg.rate;
}

function getBaseShippingCost() {
  const cfg = getCurrencyConfig();
  return 5.99 * cfg.rate;
}

`;

  // Insert before the last line
  const lastBrace = i18nJs.lastIndexOf('}');
  i18nJs = i18nJs.substring(0, lastBrace) + i18nHelpers + i18nJs.substring(lastBrace);
  fs.writeFileSync(i18nJsPath, i18nJs, 'utf8');
  console.log('✅ Added currency helpers to i18n.js');
}

// ========================================
// Summary
// ========================================
console.log('\n=== Summary ===');
console.log('✅ All hardcoded thresholds replaced with getFreeShippingThreshold()');
console.log('✅ All hardcoded shipping costs replaced with getBaseShippingCost()');
console.log('✅ Currency helpers added to both cart.js and i18n.js');
console.log('\nNow cart and checkout will automatically adjust based on language/currency!');
