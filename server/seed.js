// Seed script: import products from frontend data + create admin user
const bcrypt = require('bcryptjs');
const db = require('./db');

console.log('Seeding database...');

// Create admin user
const adminEmail = 'admin@fjbeauty.com';
const adminPassword = 'FJAdmin2026!';
const existingAdmin = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);

if (!existingAdmin) {
  const hash = bcrypt.hashSync(adminPassword, 10);
  db.prepare('INSERT INTO users (email, password_hash, name, is_admin) VALUES (?, ?, ?, 1)')
    .run(adminEmail, hash, 'F&J Admin');
  console.log('Admin user created: admin@fjbeauty.com / FJAdmin2026!');
} else {
  console.log('Admin user already exists');
}

// Import products from frontend data
const fs = require('fs');
const path = require('path');

// Read products.js and extract data using VM
const vm = require('vm');
let productsJs = fs.readFileSync(path.join(__dirname, '..', 'js', 'products.js'), 'utf8');

// Transform const → remove declaration so it assigns to context
productsJs = productsJs.replace(/^const (BRANDS|PRODUCTS) = /gm, '$1 = ');

const sandbox = { BRANDS: [], PRODUCTS: [], console };
vm.createContext(sandbox);
vm.runInContext(productsJs, sandbox);

const BRANDS = sandbox.BRANDS;
const PRODUCTS = sandbox.PRODUCTS;

const insertProduct = db.prepare(`
  INSERT OR REPLACE INTO products (product_slug, name, name_zh, brand, category, price, original_price, stock, rating, reviews, badge, description, description_zh, sizes, featured)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const upsertAll = db.transaction(() => {
  let count = 0;
  for (const p of PRODUCTS) {
    const brand = BRANDS.find(b => b.id === p.brand);
    insertProduct.run(
      p.id,
      p.name,
      p.nameZh || '',
      brand ? brand.name : p.brand,
      p.category || 'skincare',
      p.price,
      p.originalPrice || null,
      Math.floor(Math.random() * 200) + 20, // random stock
      p.rating || 0,
      p.reviews || 0,
      p.badge || '',
      p.desc || '',
      p.descZh || '',
      JSON.stringify(p.sizes || []),
      p.featured ? 1 : 0
    );
    count++;
  }
  return count;
});

const count = upsertAll();
console.log(`${count} products imported to database`);

// Create demo user
const demoEmail = 'demo@fjbeauty.com';
const existingDemo = db.prepare('SELECT id FROM users WHERE email = ?').get(demoEmail);
if (!existingDemo) {
  const hash = bcrypt.hashSync('demo123', 10);
  db.prepare('INSERT INTO users (email, password_hash, name, country) VALUES (?, ?, ?, ?)')
    .run(demoEmail, hash, 'Demo User', 'US');
  console.log('Demo user created: demo@fjbeauty.com / demo123');
}

console.log('Seeding complete!');
