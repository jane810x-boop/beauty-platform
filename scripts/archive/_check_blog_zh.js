const fs = require('fs');
const c = fs.readFileSync('D:/WB/beauty-platform/js/blog-data.js', 'utf8');
const lines = c.split('\n');
lines.forEach((l, i) => {
  if (l.includes("'zh'")) {
    console.log((i + 1) + ': ' + l);
  }
});
