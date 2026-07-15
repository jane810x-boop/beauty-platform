require('dotenv').config();
try {
  const db = require('./db');
  const t = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name IN ('reviews','email_logs','abandoned_carts')").all();
  console.log('Tables created:', t.map(x => x.name).join(', '));
} catch (e) {
  console.log('DB check error:', e.message);
}

try {
  require('./routes/reviews');
  require('./mailer');
  require('./routes/orders');
  require('./routes/auth');
  console.log('All modules loaded OK');
} catch (e) {
  console.log('Module load error:', e.message);
}
