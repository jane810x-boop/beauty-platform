const fs = require('fs');
const path = require('path');

const baseDir = 'D:/WB/beauty-platform';

// Files to check
const filesToCheck = [
  'cart.html',
  'checkout.html',
  'product.html',
  'shop.html',
  'index.html',
  'js/cart.js',
  'js/products.js',
  'js/main.js',
  'js/i18n.js'
];

console.log('=== Deep Currency Audit ===\n');

const issues = [];

filesToCheck.forEach(file => {
  const filePath = path.join(baseDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${file} not found`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // Check for hardcoded USD values
    if (/>= 50|>=50|< 50|<50|== 50|==50/.test(line) && !/HK\$|R\$|¥|₩|MX\$/.test(line)) {
      // Likely hardcoded threshold
      issues.push({
        file,
        line: lineNum,
        type: 'threshold',
        content: line.trim(),
        severity: 'HIGH'
      });
    }

    // Check for hardcoded shipping costs
    if (/\b5\.99\b|\b9\.99\b|\b4\.99\b/.test(line) && /shipping|Shipping/.test(line)) {
      issues.push({
        file,
        line: lineNum,
        format: 'shipping_cost',
        content: line.trim(),
        severity: 'MEDIUM'
      });
    }

    // Check for formatPrice calls without currency conversion
    if (/formatPrice\([^)]+\)/.test(line) && !/getCurrencyConfig|currentLang/.test(content.substring(Math.max(0, content.indexOf(line) - 500), content.indexOf(line) + 500))) {
      // formatPrice is used, need to ensure it handles currency
    }

    // Check for hardcoded dollar amounts in strings
    if (/\$\d+/.test(line) && !/HK\$|R\$|MX\$|data-i18n/.test(line)) {
      issues.push({
        file,
        line: lineNum,
        type: 'hardcoded_dollar',
        content: line.trim(),
        severity: 'LOW'
      });
    }
  });
});

console.log(`Found ${issues.length} potential issues:\n`);

// Group by severity
['HIGH', 'MEDIUM', 'LOW'].forEach(sev => {
  const sevIssues = issues.filter(i => i.severity === sev);
  if (sevIssues.length > 0) {
    console.log(`\n=== ${sev} Severity (${sevIssues.length}) ===`);
    sevIssues.forEach(i => {
      console.log(`\n${i.file}:${i.line}`);
      console.log(`  [${i.type}] ${i.content.substring(0, 100)}`);
    });
  }
});

// Write report
const reportPath = path.join(baseDir, '_currency_audit_report.json');
fs.writeFileSync(reportPath, JSON.stringify(issues, null, 2), 'utf8');
console.log(`\n\nFull report saved to: ${reportPath}`);
