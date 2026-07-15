require('dotenv').config();
const http = require('http');
// Boot server in same process via require (it auto-listens)
process.env.PORT = '3099';
require('./server');
setTimeout(() => {
  http.get('http://localhost:3099/api/reviews', (res) => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => {
      try {
        const json = JSON.parse(body);
        console.log('GET /api/reviews ->', res.statusCode, '| reviews:', json.reviews.length, '| stats.avg:', json.stats.avg);
      } catch (e) {
        console.log('GET /api/reviews ->', res.statusCode, '| raw:', body.slice(0, 120));
      }
      process.exit(0);
    });
  }).on('error', e => { console.log('request error', e.message); process.exit(1); });
}, 1200);
