// ========================================
// F&J - Product & Brand Data
// ========================================

const BRANDS = [
  { id: 'laneige', name: 'Laneige', nameZh: '蘭芝', origin: 'South Korea', emoji: '💧', desc: 'Water science skincare from Korea, famous for hydrating innovations.', descZh: '來自韓國的水科學技術護膚品牌，以保濕創新闻名。' },
  { id: 'innisfree', name: 'Innisfree', nameZh: '悅詩風吟', origin: 'South Korea', emoji: '🌿', desc: 'Natural ingredients from Jeju Island. Clean, green beauty.', descZh: '濟州島天然成分，純淨綠色美妝。' },
  { id: 'cosrx', name: 'COSRX', nameZh: 'COSRX', origin: 'South Korea', emoji: '🧪', desc: 'Science-driven skincare with gentle, effective formulas.', descZh: '科學驅動的護膚品牌，配方溫和高效。' },
  { id: 'shiseido', name: 'Shiseido', nameZh: '資生堂', origin: 'Japan', emoji: '🌸', desc: 'Over 140 years of Japanese beauty heritage and innovation.', descZh: '超過140年的日本美妝傳承與創新。' },
  { id: 'skii', name: 'SK-II', nameZh: 'SK-II', origin: 'Japan', emoji: '✨', desc: 'Luxury skincare powered by the legendary Pitera essence.', descZh: '傳奇Pitera精華驅動的奢華護膚。' },
  { id: 'hada-labo', name: 'Hada Labo', nameZh: '肌研', origin: 'Japan', emoji: '💙', desc: 'Perfect x simple: Japanese hyaluronic acid expertise.', descZh: '完美簡約：日本透明質酸專家。' },
  { id: 'sulwhasoo', name: 'Sulwhasoo', nameZh: '雪花秀', origin: 'South Korea', emoji: '🍃', desc: 'Luxury Korean herbal medicine skincare rooted in tradition.', descZh: '源於傳統的奢華韓方草本護膚。' },
  { id: 'beauty-of-joseon', name: 'Beauty of Joseon', nameZh: '朝鮮美妝', origin: 'South Korea', emoji: '🏯', desc: 'Traditional Korean Hanbang ingredients for modern skincare.', descZh: '傳統韓國韓方成分，打造現代護膚。' },
  { id: 'romand', name: 'Rom&nd', nameZh: 'Rom&nd', origin: 'South Korea', emoji: '💄', desc: 'Trendsetting K-beauty makeup with incredible color payoff.', descZh: '引領潮流的韓妝彩妝，顯色度驚人。' },
  { id: 'clio', name: 'CLIO', nameZh: 'CLIO', origin: 'South Korea', emoji: '👁️', desc: 'Professional K-beauty makeup loved by makeup artists worldwide.', descZh: '全球化妝師摯愛的專業韓妝彩妝。' },
  { id: 'dear-klairs', name: 'Dear, Klairs', nameZh: 'Dear, Klairs', origin: 'South Korea', emoji: '🐻', desc: 'Gentle, vegan-friendly skincare for sensitive skin.', descZh: '專為敏感肌設計的溫和純素護膚。' },
  { id: 'anessa', name: 'Anessa', nameZh: '安耐曬', origin: 'Japan', emoji: '☀️', desc: 'Japan\'s #1 sunscreen brand with unbeatable UV protection.', descZh: '日本排名第一的防曬品牌，無與倫比的紫外線防護。' },
  { id: 'etude-house', name: 'Etude House', nameZh: '伊蒂之屋', origin: 'South Korea', emoji: '🎀', desc: 'Playful K-beauty with irresistible charm and trending color cosmetics.', descZh: '俏皮韓妝，甜美誘人，引領潮流彩妝。' },
  { id: 'dr-jart', name: 'Dr.Jart+', nameZh: '蒂佳婷', origin: 'South Korea', emoji: '🔬', desc: 'Derma skincare innovation fusing Korean beauty with clinical science.', descZh: '融合韓妝與臨床科學的皮膚科學護膚創新。' }
];

const CATEGORIES = [
  { id: 'cleansers', name: 'Cleansers', nameZh: '潔面', emoji: '🧼' },
  { id: 'toners', name: 'Toners & Mists', nameZh: '爽膚水 & 噴霧', emoji: '💦' },
  { id: 'serums', name: 'Serums & Ampoules', nameZh: '精華液 & 安瓶', emoji: '💉' },
  { id: 'moisturizers', name: 'Moisturizers', nameZh: '面霜', emoji: '🧴' },
  { id: 'sunscreen', name: 'Sunscreen', nameZh: '防曬', emoji: '☀️' },
  { id: 'masks', name: 'Sheet Masks', nameZh: '面膜', emoji: '😷' },
  { id: 'makeup', name: 'Makeup', nameZh: '彩妝', emoji: '💄' },
  { id: 'body', name: 'Body Care', nameZh: '身體護理', emoji: '🤲' }
];

const PRODUCTS = [
  {
    id: 'laneige-sleeping-mask',
    image: 'images/products/laneige-sleeping-mask.png',
    name: 'Water Sleeping Mask EX',
    nameZh: '水酷睡眠面膜EX',
    brand: 'laneige',
    category: 'masks',
    price: 32.00,
    originalPrice: 38.00,
    rating: 4.8,
    reviews: 1243,
    badge: 'bestseller',
    desc: 'An overnight hydrating mask that deeply moisturizes and revitalizes tired, dull-looking skin while you sleep. The probiotic lysate complex strengthens the skin barrier for a radiant glow.',
    descZh: '夜間補水修護面膜，深度滋潤，喚醒疲憊暗沉肌膚。益生菌溶胞複合物強化肌膚屏障，煥發亮澤光彩。',
    sizes: ['60ml', '25ml'],
    featured: true
  },
  {
    id: 'cosrx-snail-essence',
    image: 'images/products/cosrx-snail-essence.png',
    name: 'Advanced Snail 96 Mucin Power Essence',
    nameZh: '高級蝸牛96粘蛋白精華液',
    brand: 'cosrx',
    category: 'serums',
    price: 25.00,
    originalPrice: null,
    rating: 4.9,
    reviews: 2156,
    badge: 'bestseller',
    desc: 'With 96% snail secretion filtrate, this lightweight essence repairs damaged skin, reduces redness, and improves skin elasticity. The holy grail for glass skin.',
    descZh: '含有96%蝸牛分泌物濾液，輕盈精華修復受損肌膚，減退泛紅，提升肌膚彈性。打造玻璃肌的聖品。',
    sizes: ['100ml', '30ml'],
    featured: true
  },
  {
    id: 'skii-treatment-essence',
    image: 'images/products/skii-treatment-essence.png',
    name: 'Facial Treatment Essence (Pitera Essence)',
    nameZh: '護膚精華露（神仙水）',
    brand: 'skii',
    category: 'toners',
    price: 99.00,
    originalPrice: null,
    rating: 4.7,
    reviews: 892,
    badge: 'luxury',
    desc: 'The iconic essence with over 90% Pitera. Transforms skin texture, reduces pores, and delivers a crystal-clear complexion adored by celebrities worldwide.',
    descZh: '蘊含超過90% Pitera的傳奇精華水。改善膚質，細緻毛孔，呈現全球名流追捧的晶瑩剔透美肌。',
    sizes: ['230ml', '160ml', '75ml'],
    featured: true
  },
  {
    id: 'innisfree-green-tea-serum',
    image: 'images/products/innisfree-green-tea-serum.png',
    name: 'Green Tea Seed Hyaluronic Serum',
    nameZh: '綠茶籽透明質酸精華',
    brand: 'innisfree',
    category: 'serums',
    price: 28.00,
    originalPrice: 35.00,
    rating: 4.6,
    reviews: 967,
    badge: 'sale',
    desc: 'Infused with Beauty Green Tea from Jeju Island, this serum floods skin with lasting hydration while strengthening the moisture barrier.',
    descZh: '蘊含濟州島美肌綠茶，為肌膚注入持久水潤，同時強化保濕屏障。',
    sizes: ['50ml', '30ml'],
    featured: true
  },
  {
    id: 'hada-labo-lotion',
    image: 'images/products/hada-labo-lotion.png',
    name: 'Gokujyun Premium Hyaluronic Acid Lotion',
    nameZh: '極潤 premium 透明質酸化妝水',
    brand: 'hada-labo',
    category: 'toners',
    price: 19.50,
    originalPrice: null,
    rating: 4.7,
    reviews: 1534,
    badge: 'bestseller',
    desc: 'Japan\'s best-selling lotion with 7 types of hyaluronic acid. One bottle for the ultimate plump, dewy skin that lasts all day.',
    descZh: '日本銷量第一的化妝水，含7種透明質酸。一瓶實現全天飽滿水潤肌膚。',
    sizes: ['170ml', '100ml'],
    featured: true
  },
  {
    id: 'sulwhasoo-first-care',
    image: 'images/products/sulwhasoo-first-care.png',
    name: 'First Care Activating Serum VI',
    nameZh: '潤緻煥活肌底精華露VI',
    brand: 'sulwhasoo',
    category: 'serums',
    price: 89.00,
    originalPrice: 105.00,
    rating: 4.8,
    reviews: 567,
    badge: 'sale',
    desc: 'The ritual begins here. This luxury activating serum with JAUM Balancing Complex preps skin to absorb all subsequent products 3x better.',
    descZh: '護膚儀式由此開始。含JAUM平衡複合物的奢華導入精華，讓後續產品吸收率提升3倍。',
    sizes: ['90ml', '60ml', '30ml'],
    featured: false
  },
  {
    id: 'romand-juicy-tint',
    image: 'images/products/romand-juicy-tint.png',
    name: 'Juicy Lasting Tint',
    nameZh: '果汁持久唇釉',
    brand: 'romand',
    category: 'makeup',
    price: 12.90,
    originalPrice: null,
    rating: 4.6,
    reviews: 3201,
    badge: 'bestseller',
    desc: 'The viral K-beauty lip tint that glides on like gloss but stains like a tint. Juicy, glossy finish with incredible staying power.',
    descZh: '風靡全球的韓妝染唇液，如唇彩般順滑，如染唇液般持久。水潤光澤妝效，持色力驚人。',
    sizes: ['5.5g'],
    featured: true
  },
  {
    id: 'anessa-milk-sunscreen',
    image: 'images/products/anessa-milk-sunscreen.png',
    name: 'Perfect UV Sunscreen Mild Milk SPF50+',
    nameZh: '安耐曬金瓶防曬乳SPF50+',
    brand: 'anessa',
    category: 'sunscreen',
    price: 35.00,
    originalPrice: null,
    rating: 4.8,
    reviews: 1876,
    badge: 'bestseller',
    desc: 'Japan\'s ultimate sunscreen. Aqua Booster technology makes UV protection stronger when it meets sweat or water. Ultra-light milk texture.',
    descZh: '日本終極防曬。水能Boost技術遇汗遇水防曬力更強。超輕薄乳液質地。',
    sizes: ['60ml', '20ml'],
    featured: true
  },
  {
    id: 'beauty-of-joseon-serum',
    image: 'images/products/beauty-of-joseon-serum.png',
    name: 'Glow Serum: Propolis + Niacinamide',
    nameZh: '蜂膠菸鹼胺光彩精華',
    brand: 'beauty-of-joseon',
    category: 'serums',
    price: 17.00,
    originalPrice: 22.00,
    rating: 4.7,
    reviews: 2134,
    badge: 'sale',
    desc: 'Honey-like propolis extract (60%) combined with 2% niacinamide. Calms inflammation, controls sebum, and gives that coveted honey skin glow.',
    descZh: '蜂蜜般蜂膠提取物（60%）搭配2%菸鹼胺。舒緩炎症，控油並帶來令人嚮往的蜂蜜光澤肌。',
    sizes: ['30ml'],
    featured: false
  },
  {
    id: 'clio-kill-liner',
    image: 'images/products/clio-kill-liner.png',
    name: 'Superproof Brush Liner',
    nameZh: '防水眼線液筆',
    brand: 'clio',
    category: 'makeup',
    price: 16.50,
    originalPrice: 19.00,
    rating: 4.7,
    reviews: 2891,
    badge: 'sale',
    desc: 'The eyeliner that survived K-pop dance practices. Ultra-fine brush tip, intense black pigment, and genuinely waterproof — all day, all night.',
    descZh: '經K-pop舞蹈練習考驗的眼線筆。超細刷頭，深邃黑色，真正全天候防水。',
    sizes: ['0.55g'],
    featured: false
  },
  {
    id: 'cosrx-pimple-patches',
    image: 'images/products/cosrx-pimple-patches.png',
    name: 'Acne Pimple Master Patch (24 Pack)',
    nameZh: '痘痘貼（24片裝）',
    brand: 'cosrx',
    category: 'masks',
    price: 6.00,
    originalPrice: null,
    rating: 4.5,
    reviews: 4521,
    badge: 'bestseller',
    desc: 'The cult-favorite acne patch that flattens pimples overnight. Hydrocolloid dressing absorbs impurities while protecting against bacteria.',
    descZh: '一夜撫平痘痘的經典痘痘貼。水膠體敷料吸收分泌物同時隔離細菌。',
    sizes: ['24 patches'],
    featured: true
  },
  {
    id: 'dear-klairs-toner',
    image: 'images/products/dear-klairs-toner.png',
    name: 'Supple Preparation Unscented Toner',
    nameZh: '溫和舒緩無香化妝水',
    brand: 'dear-klairs',
    category: 'toners',
    price: 22.00,
    originalPrice: null,
    rating: 4.6,
    reviews: 1765,
    badge: null,
    desc: 'The gentle giant of Korean toners. Viscous, deeply hydrating, and completely fragrance-free. Perfect for the 7-skin method.',
    descZh: '韓國化妝水中的溫和之王。粘稠質地，深層補水，完全無香。完美適配七層護膚法。',
    sizes: ['180ml'],
    featured: false
  },
  {
    id: 'shiseido-cream',
    image: 'images/products/shiseido-cream.png',
    name: 'Essential Energy Moisturizing Cream',
    nameZh: '肌源煥活精粹面霜',
    brand: 'shiseido',
    category: 'moisturizers',
    price: 58.00,
    originalPrice: null,
    rating: 4.5,
    reviews: 432,
    badge: null,
    desc: 'Awakens skin\'s inner energy with ReNeura Technology. This rich cream deeply hydrates, smoothes fine lines, and restores radiance.',
    descZh: '以ReNeura科技喚醒肌膚內在能量。豐潤面霜深層滋養，平滑細紋，恢復光彩。',
    sizes: ['50ml', '30ml'],
    featured: false
  },
  {
    id: 'beauty-of-joseon-dynasty-cream',
    image: 'images/products/beauty-of-joseon-dynasty-cream.png',
    name: 'Dynasty Cream',
    nameZh: '王朝面霜',
    brand: 'beauty-of-joseon',
    category: 'moisturizers',
    price: 25.00,
    originalPrice: 30.00,
    rating: 4.6,
    reviews: 982,
    badge: 'sale',
    desc: 'Inspired by Joseon Dynasty beauty rituals. Rice bran water + ginseng + niacinamide create a lightweight cream that brightens and nourishes.',
    descZh: '靈感源自朝鮮王朝美顏秘方。米糠水+人參+菸鹼胺打造輕盈提亮滋養面霜。',
    sizes: ['50ml'],
    featured: false
  },
  {
    id: 'innisfree-volcanic-mask',
    image: 'images/products/innisfree-volcanic-mask.png',
    name: 'Super Volcanic Pore Clay Mask 2X',
    nameZh: '超級火山泥毛孔清潔面膜2X',
    brand: 'innisfree',
    category: 'masks',
    price: 16.00,
    originalPrice: null,
    rating: 4.4,
    reviews: 1342,
    badge: null,
    desc: 'Jeju volcanic cluster capsules absorb excess sebum and deep-clean pores. Cooling sensation leaves skin refreshed and tightened.',
    descZh: '濟州火山岩泥膠囊吸附多餘油脂，深層清潔毛孔。清涼膚感，肌膚清爽緊緻。',
    sizes: ['100ml'],
    featured: false
  },
  {
    id: 'hada-labo-cleanser',
    image: 'images/products/hada-labo-cleanser.png',
    name: 'Gokujyun Hyaluronic Acid Foaming Cleanser',
    nameZh: '極潤透明質酸泡沫潔面乳',
    brand: 'hada-labo',
    category: 'cleansers',
    price: 14.50,
    originalPrice: null,
    rating: 4.5,
    reviews: 876,
    badge: null,
    desc: 'Super gentle, super foamy. This cleanser removes impurities while preserving the skin\'s natural moisture with hyaluronic acid.',
    descZh: '超溫和超綿密。含透明質酸的潔面乳，清除污垢同時鎖住肌膚天然水分。',
    sizes: ['160ml', '100ml'],
    featured: false
  },
  {
    id: 'anessa-gel-sunscreen',
    image: 'images/products/anessa-gel-sunscreen.png',
    name: 'Perfect UV Sunscreen Mild Gel SPF35+',
    nameZh: '安耐曬溫和防曬啫喱SPF35+',
    brand: 'anessa',
    category: 'sunscreen',
    price: 28.00,
    originalPrice: null,
    rating: 4.5,
    reviews: 654,
    badge: null,
    desc: 'Gentle milky gel formula perfect for sensitive skin and daily use. Non-sticky, non-whitening with 50% skincare ingredients.',
    descZh: '適合敏感肌和日常使用的溫和乳液啫喱配方。不粘腻不泛白，含50%護膚成分。',
    sizes: ['90g'],
    featured: false
  },
  {
    id: 'romand-palette',
    image: 'images/products/romand-palette.png',
    name: 'Better Than Eyes Eyeshadow Palette',
    nameZh: '四色眼影盤',
    brand: 'romand',
    category: 'makeup',
    price: 19.90,
    originalPrice: 24.00,
    rating: 4.7,
    reviews: 2678,
    badge: 'sale',
    desc: 'Four perfectly curated shades for the dreamiest eye looks. Buttery-soft texture blends like a dream with minimal fallout.',
    descZh: '四款精心搭配的色調，打造夢幻眼妝。如黃油般柔滑質地，輕鬆暈染，飛粉極少。',
    sizes: ['7.4g'],
    featured: false
  },
  {
    id: 'shiseido-cleanser',
    image: 'images/products/shiseido-cleanser.png',
    name: 'Perfect Whip Cleansing Foam',
    nameZh: '洗顏專科泡沫潔面乳',
    brand: 'shiseido',
    category: 'cleansers',
    price: 12.00,
    originalPrice: 15.00,
    rating: 4.4,
    reviews: 2103,
    badge: 'sale',
    desc: 'Japan\'s most loved cleanser. Rich, dense micro-foam removes impurities while being gentle enough for daily use. That satisfying squeaky-clean feel.',
    descZh: '日本最受歡迎的潔面產品。綿密微米泡沫清除污垢，日常使用溫和不刺激。令人滿足的清爽潔淨感。',
    sizes: ['120g'],
    featured: false
  },
  {
    id: 'sulwhasoo-overnight-mask',
    image: 'images/products/sulwhasoo-overnight-mask.png',
    name: 'Overnight Vitalizing Mask EX',
    nameZh: '與潤修護睡眠面膜EX',
    brand: 'sulwhasoo',
    category: 'masks',
    price: 52.00,
    originalPrice: null,
    rating: 4.6,
    reviews: 456,
    badge: null,
    desc: 'Nutritious overnight treatment with Korean red pine and walnut extract. Wake up to skin that feels nourished, bouncy, and visibly brighter.',
    descZh: '含韓國赤松與核桃提取物的滋養夜間護理。醒來肌膚潤澤彈嫩，明顯更亮白。',
    sizes: ['120ml'],
    featured: false
  },
  {
    id: 'etude-drawing-brow',
    image: 'images/products/etude-drawing-brow.png',
    name: 'Drawing Eye Brow Pencil',
    nameZh: '雙頭旋轉眉筆',
    brand: 'etude-house',
    category: 'makeup',
    price: 6.90,
    originalPrice: null,
    rating: 4.5,
    reviews: 5230,
    badge: 'bestseller',
    desc: 'Korea\'s #1 eyebrow pencil. Triangular auto-liner glides on smoothly, defines natural-looking brows in seconds. Long-lasting and smudge-proof.',
    descZh: '韓國銷量第一的眉筆。三角自動筆芯順滑描繪，秒速打造自然眉形。持久不暈染。',
    sizes: ['0.25g'],
    featured: true
  },
  {
    id: 'dr-jart-cicapair',
    image: 'images/products/dr-jart-cicapair.png',
    name: 'Cicapair Tiger Grass Color Correcting Treatment SPF30',
    nameZh: '積雪草修護綠色隔離霜 SPF30',
    brand: 'dr-jart',
    category: 'moisturizers',
    price: 52.00,
    originalPrice: null,
    rating: 4.7,
    reviews: 1834,
    badge: 'bestseller',
    desc: 'The viral green-to-beige cream that neutralizes redness, calms sensitive skin, and protects with SPF. A K-beauty legend reborn.',
    descZh: '風靡全球的綠轉米色修護霜，中和泛紅、舒緩敏感肌、SPF防護。韓妝傳奇，煥新歸來。',
    sizes: ['50ml', '15ml'],
    featured: true
  },
  {
    id: 'etude-moist-collagen',
    image: 'images/products/etude-moist-collagen.png',
    name: 'Moistfull Collagen Cream',
    nameZh: '膠原蛋白水潤面霜',
    brand: 'etude-house',
    category: 'moisturizers',
    price: 22.00,
    originalPrice: 27.00,
    rating: 4.6,
    reviews: 3421,
    badge: 'sale',
    desc: 'Super collagen water particles deliver deep, lasting hydration. Lightweight jelly texture absorbs instantly for bouncy, plump skin.',
    descZh: '超級膠原水粒子深層持久保濕。輕盈果凍質地瞬間吸收，肌膚彈潤飽滿。',
    sizes: ['75ml'],
    featured: false
  },
  {
    id: 'dr-jart-cryo-mask',
    image: 'images/products/dr-jart-cryo-mask.png',
    name: 'Cryo Rubber Moisturizing Face Mask',
    nameZh: '冷凍橡膠保濕面膜',
    brand: 'dr-jart',
    category: 'masks',
    price: 14.00,
    originalPrice: null,
    rating: 4.5,
    reviews: 867,
    badge: null,
    desc: 'Two-step cooling rubber mask that locks in an ampoule of moisture. Inspired by cryotherapy, for instantly refreshed and hydrated skin.',
    descZh: '兩步式冷卻橡膠面膜，鎖住安瓶級保濕精華。靈感源自冷凍疗法，肌膚即刻煥活水潤。',
    sizes: ['1 mask'],
    featured: false
  }
];

// Utility functions
function getBrand(brandId) {
  const brand = BRANDS.find(b => b.id === brandId || b.name === brandId);
  const lang = typeof getLang === 'function' ? getLang() : 'en';
  if (brand) {
    return {
      ...brand,
      name: (lang === 'zhHK') && brand.nameZh ? brand.nameZh : brand.name,
      desc: (lang === 'zhHK') && brand.descZh ? brand.descZh : brand.desc
    };
  }
  // 沒在 BRANDS 數組中找到的品牌，直接顯示品牌名
  return { id: brandId, name: brandId, nameZh: brandId, emoji: '🧴', desc: '' };
}

function getCategory(catId) {
  const cat = CATEGORIES.find(c => c.id === catId);
  const lang = typeof getLang === 'function' ? getLang() : 'en';
  if (cat) {
    return {
      ...cat,
      name: (lang === 'zhHK') && cat.nameZh ? cat.nameZh : cat.name
    };
  }
  // 沒在 CATEGORIES 中的分類，直接顯示分類名
  return { id: catId, name: catId, nameZh: catId, emoji: '' };
}

function getProduct(productId) {
  // 優先從動態數據中查找（支持後台新增的產品）
  if (allProducts) return allProducts.find(p => p.id === productId);
  return PRODUCTS.find(p => p.id === productId);
}

function getProductsByCategory(catId) {
  const source = allProducts || PRODUCTS;
  if (!catId || catId === 'all') return source;
  return source.filter(p => p.category === catId);
}

function getProductsByBrand(brandId) {
  const source = allProducts || PRODUCTS;
  if (!brandId) return source;
  return source.filter(p => p.brand === brandId);
}

function getFeaturedProducts(limit = 8) {
  const source = allProducts || PRODUCTS;
  return source.filter(p => p.featured).slice(0, limit);
}

function getBestsellers(limit = 8) {
  const source = allProducts || PRODUCTS;
  return [...source].sort((a, b) => b.reviews - a.reviews).slice(0, limit);
}

function searchProducts(query) {
  const q = query.toLowerCase();
  const lang = typeof getLang === 'function' ? getLang() : 'en';
  const source = allProducts || PRODUCTS;
  return source.filter(p => {
    const brand = getBrand(p.brand);
    const productName = (lang === 'zhHK') && p.nameZh ? p.nameZh : p.name;
    const productDesc = (lang === 'zhHK') && p.descZh ? p.descZh : p.desc;
    return productName.toLowerCase().includes(q) ||
           brand.name.toLowerCase().includes(q) ||
           productDesc.toLowerCase().includes(q);
  });
}

if (typeof formatPrice === 'undefined') {
  function formatPrice(price) {
    return '$' + price.toFixed(2);
  }
}

function getStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  return { full, half, empty: 5 - full - half };
}

// ========================================
// API Integration Layer
// 當後端可用時，從 API 加載產品數據；否則使用靜態 PRODUCTS 數組
// ========================================
const ProductAPI = {
  _loaded: false,
  _mergedProducts: null,
  isEnabled: false,

  // 加載並合並產品數據（API優先 + 靜態補充）
  async loadProducts() {
    if (this._loaded) return;
    try {
      const useBackend = await API.checkBackend();
      if (useBackend) {
        this.isEnabled = true;
        const data = await API.products.list({ limit: 200 });

        // 品牌：API返回全名（如"Dr.Jart+"），前端篩選用slug（如"dr-jart")
        // 需要將品牌全名映射回slug，確保篩選一緻
        const brandNameToSlug = {};
        BRANDS.forEach(b => {
          brandNameToSlug[b.name] = b.id;
          brandNameToSlug[b.nameZh] = b.id; // 中文名也能映射
          brandNameToSlug[b.id] = b.id;      // slug直接映射自己
        });

        const apiProducts = data.products.map(p => ({
          id: p.product_slug,
          name: p.name,
          nameZh: p.name_zh || p.name,
          brand: brandNameToSlug[p.brand] || p.brand, // 映射品牌全名→slug
          category: p.category,
          price: p.price,
          originalPrice: p.original_price || null,
          rating: p.rating || 4.5,
          reviews: p.reviews || 0,
          badge: p.badge || null,
          desc: p.description || '',
          descZh: p.description_zh || p.description || '',
          sizes: typeof p.sizes === 'string' ? JSON.parse(p.sizes) : (p.sizes || ['30ml', '50ml']),
          featured: !!p.featured,
          image: p.image || null,
          images: typeof p.images === 'string' ? JSON.parse(p.images) : (p.images || []),
          ingredients: p.ingredients || '',
          howToUse: p.how_to_use || '',
          shippingInfo: p.shipping_info || '',
          detailHtml: p.detail_html || '',
          _source: 'api'
        }));

        // 合並策略：API產品優先，但用靜態數據回補空字段（如image、desc、sizes等）
        // 對於API和靜態都有的產品，API字段為空時回退到靜態數據
        const staticMap = {};
        PRODUCTS.forEach(p => { staticMap[p.id] = p; });

        const mergedApiProducts = apiProducts.map(apiP => {
          const staticP = staticMap[apiP.id];
          if (!staticP) return apiP; // 純API新增產品，無靜態數據可回補
          return {
            ...apiP,
            // API字段為空時，回退到靜態數據
            image: apiP.image || staticP.image || null,
            images: (apiP.images && apiP.images.length > 0) ? apiP.images : (staticP.image ? [staticP.image] : []),
            desc: apiP.desc || staticP.desc || '',
            descZh: apiP.descZh || staticP.descZh || staticP.desc || '',
            nameZh: apiP.nameZh || staticP.nameZh || apiP.name,
            sizes: (apiP.sizes && apiP.sizes.length > 0) ? apiP.sizes : staticP.sizes || ['30ml'],
            featured: apiP.featured || staticP.featured || false,
            rating: apiP.rating || staticP.rating || 4.5,
            reviews: apiP.reviews || staticP.reviews || 0,
            badge: apiP.badge || staticP.badge || null,
            originalPrice: apiP.originalPrice || staticP.originalPrice || null,
          };
        });

        // 只添加API中完全沒有的純靜態產品
        const apiSlugs = new Set(apiProducts.map(p => p.id));
        const staticOnly = PRODUCTS.filter(p => !apiSlugs.has(p.id));
        this._mergedProducts = [...mergedApiProducts, ...staticOnly];
        console.log(`ProductAPI: ${apiProducts.length} from API + ${staticOnly.length} from static = ${this._mergedProducts.length} total`);
      }
    } catch (e) {
      console.log('ProductAPI: Using static data only (API unavailable)');
    }
    this._loaded = true;
  },

  // 獲取所有產品（合併後）
  async getAllProducts() {
    await this.loadProducts();
    return this._mergedProducts || PRODUCTS;
  },

  // 獲取單個產品（優先 API，含詳情字段）
  async getBySlug(slug) {
    await this.loadProducts();
    // 先從合並數據中找
    const merged = this._mergedProducts || PRODUCTS;
    const p = merged.find(x => x.id === slug);
    if (p) return { product: p };
    // 嘗試單獨從 API 獲取（可能是剛新增的）
    if (this.isEnabled) {
      try {
        const res = await fetch('/api/products/' + slug);
        if (res.ok) {
          const data = await res.json();
          return data;
        }
      } catch (e) { /* fall through */ }
    }
    return null;
  },

  // 獲取產品列表（帶篩選排序）
  async list(params = {}) {
    const all = await this.getAllProducts();
    let items = [...all];
    // Apply filters
    if (params.category && params.category !== 'all') items = items.filter(p => p.category === params.category);
    if (params.brand && params.brand !== 'all') items = items.filter(p => p.brand === params.brand);
    if (params.search) {
      const q = params.search.toLowerCase();
      items = items.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.nameZh && p.nameZh.includes(q)) ||
        p.brand.toLowerCase().includes(q) ||
        (p.desc && p.desc.toLowerCase().includes(q))
      );
    }
    // Sort
    if (params.sort === 'price_asc' || params.sort === 'price-low') items.sort((a, b) => a.price - b.price);
    else if (params.sort === 'price_desc' || params.sort === 'price-high') items.sort((a, b) => b.price - a.price);
    else if (params.sort === 'rating') items.sort((a, b) => b.rating - a.rating);
    else if (params.sort === 'bestselling') items.sort((a, b) => b.reviews - a.reviews);
    else if (params.sort === 'newest') items.sort((a, b) => {
      // API products with higher DB id come first
      if (a._source === 'api' && b._source !== 'api') return -1;
      if (b._source === 'api' && a._source !== 'api') return 1;
      return (b.id || '').localeCompare(a.id || '');
    });
    else items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return items;
  },

  // 強制刷新（後台新增產品後可調用）
  async refresh() {
    this._loaded = false;
    this._mergedProducts = null;
    return await this.getAllProducts();
  }
};

// 全局產品數據（頁面加載後由 ProductAPI 填充）
// 所有頁面用 allProducts 替代 PRODUCTS
let allProducts = null;
