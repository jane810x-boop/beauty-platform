const fs = require('fs');
const html = fs.readFileSync('D:/WB/beauty-platform/cart.html', 'utf8');
const match = html.match(/zh-HK[^<]*<\/button>/);
fs.writeFileSync('D:/WB/beauty-platform/_node_out.txt', JSON.stringify(match ? match[0] : 'not found'));
