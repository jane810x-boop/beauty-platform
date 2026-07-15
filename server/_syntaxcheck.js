const fs = require('fs');
const vm = require('vm');
const path = require('path');

const files = [
  'cart.html', 'checkout.html', 'product.html',
  'js/whatsapp.js', 'js/analytics.js'
];

function checkFile(file) {
  const full = path.join('..', file);
  const code = fs.readFileSync(full, 'utf8');
  let blocks = [];

  if (file.endsWith('.html')) {
    // Extract inline <script> blocks without src and without json-ld type
    const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
    let m;
    while ((m = re.exec(code)) !== null) {
      const attrs = m[1] || '';
      if (/\bsrc\s*=/.test(attrs)) continue;            // external
      if (/application\/ld\+json/.test(attrs)) continue; // JSON-LD
      blocks.push({ label: 'inline', code: m[2] });
    }
  } else {
    blocks.push({ label: 'file', code });
  }

  let ok = true;
  blocks.forEach((b, i) => {
    try {
      new vm.Script(b.code, { filename: file + '#' + i });
    } catch (e) {
      ok = false;
      console.log(`  SYNTAX ERROR in ${file} [block ${i}]: ${e.message}`);
    }
  });
  console.log((ok ? 'OK  ' : 'FAIL') + ' ' + file + ` (${blocks.length} block(s))`);
}

files.forEach(checkFile);
