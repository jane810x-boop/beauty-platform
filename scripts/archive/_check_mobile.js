const fs = require('fs');
const html = fs.readFileSync('D:/WB/beauty-platform/cart.html', 'utf8');
const lines = html.split('\n');
const mobileLine = lines[76];
const match = mobileLine.match(/title="([^"]+)"/);
if (match) {
    fs.writeFileSync('D:/WB/beauty-platform/_mobile_title.txt', JSON.stringify(match[1]));
    const chars = [];
    for (const c of match[1]) chars.push(c.charCodeAt(0).toString(16));
    fs.appendFileSync('D:/WB/beauty-platform/_mobile_title.txt', '\n' + chars.join(' '));
}
