/**
 * F&J Blog Data — articles across K-Beauty guides, ingredient deep-dives and routines.
 * Languages: pt-BR, en, zhHK (Traditional Chinese / Cantonese), es.
 */

const BLOG_CATEGORIES = {
  "k-beauty-101": {
    slug: `k-beauty-101`,
    coverIcon: `K`,
    "pt-BR": {
      name: `K-Beauty 101`,
      desc: `Guia para iniciantes no universo da beleza coreana`
    },
    en: {
      name: `K-Beauty 101`,
      desc: `Beginner guides to Korean beauty`
    },
    es: {
      name: `K-Beauty 101`,
      desc: `Guía para principiantes en la belleza coreana`
    },
    zhHK: {
      name: `K-Beauty 入門`,
      desc: `韓妝基礎入門指南`
    }
  },
  "guia-de-ingredientes": {
    slug: `guia-de-ingredientes`,
    coverIcon: `I`,
    "pt-BR": {
      name: `Guia de Ingredientes`,
      desc: `Tudo sobre os ativos da beleza coreana`
    },
    en: {
      name: `Ingredient Guide`,
      desc: `Deep dives into K-beauty ingredients`
    },
    es: {
      name: `Guía de Ingredientes`,
      desc: `Todo sobre los activos de la belleza coreana`
    },
    zhHK: {
      name: `成分指南`,
      desc: `韓妝核心成分深度解析`
    }
  },
  rotinas: {
    slug: `rotinas`,
    coverIcon: `R`,
    "pt-BR": {
      name: `Rotinas`,
      desc: `Passo a passo de skincare por tipo de pele`
    },
    en: {
      name: `Routines`,
      desc: `Step-by-step routines for every skin type`
    },
    es: {
      name: `Rutinas`,
      desc: `Rutinas de cuidado paso a paso por tipo de piel`
    },
    zhHK: {
      name: `護膚流程`,
      desc: `不同膚質的韓妝護膚流程`
    }
  }
};

const blogArticles = [
  {
    slug: `k-beauty-101`,
    category: `k-beauty-101`,
    coverGradient: `linear-gradient(135deg, #e8d5db 0%, #d4b8c3 50%, #c9a5b3 100%)`,
    waterDrop: true,
    readTime: 6,
    date: `2026-07-01`,
    author: {
      "pt-BR": `Equipe F&J`,
      en: `F&J Team`,
      zhHK: `F&J 團隊`,
      es: `Equipo F&J`
    },
    tags: {
      "pt-BR": [
        `glass skin`,
        `k-beauty`,
        `hidratacao`,
        `rotina`
      ],
      en: [
        `glass skin`,
        `k-beauty`,
        `hydration`,
        `routine`
      ],
      zhHK: [
        `玻璃肌`,
        `韓妝`,
        `保濕`,
        `護膚流程`
      ],
      es: [
        `glass skin`,
        `k-beauty`,
        `hidratacion`,
        `rutina`
      ]
    },
    relatedProducts: [
      `cosrx-snail-essence`,
      `laneige-sleeping-mask`,
      `beauty-of-joseon-serum`
    ],
    content: {
      "pt-BR": {},
      en: {},
      zhHK: {
        title: `什麼是玻璃肌？完整指南`,
        excerpt: `韓國玻璃肌不是傳說。學習一步步打造透亮、均勻、水光感的肌膚 — 無需濾鏡。`,
        body: `<p>玻璃肌（Glass Skin）是韓妝美學中最讓人嚮往的膚質狀態——水潤、透亮、細膩平滑。這不是靠高光產品疊加出來的，而是通過層層護理養出來的健康肌膚。</p>

<h3>什麼是玻璃肌？</h3>
<p>真正的玻璃肌有三個特徵：<strong>均勻的光澤感</strong>、<strong>細膩平滑的觸感</strong>、<strong>健康的水潤通透感</strong>。和"水光妝"不同，玻璃肌來自護膚，而非彩妝。</p>

<h3>5步打造玻璃肌</h3>
<h4>1. 雙重清潔</h4>
<p>先用卸妝油或卸妝膏去除彩妝和防曬，再用潔面乳深層清潔。乾淨的皮膚才能讓後續活性成分充分吸收。</p>

<h4>2. 溫和去角質</h4>
<p>每週2-3次使用含 AHA 或 BHA 的爽膚水，溫和去除老廢角質。避免使用粗糙的物理去角質產品。</p>

<h4>3. 層層補水（核心秘訣）</h4>
<p>韓妝的精髓在於<strong>多道輕薄的補水層</strong>：爽膚水（拍2-3層）→ 精華水 → 精華液 → 乳液 → 面霜。</p>

<h4>4. 每週敷面膜</h4>
<p>韓國片狀面膜能在15-20分鐘內密集補充營養。最佳使用時機是爽膚水之後、精華液之前。</p>

<h4>5. 嚴格防曬</h4>
<p>紫外線是皮膚粗糙的最大元兇。每天使用 SPF 50+ 防曬霜，風雨無阻。</p>`
      },
      es: {}
    },
    faq: {}
  },
  {
    slug: `guia-de-ingredientes`,
    category: `k-beauty-101`,
    coverGradient: `linear-gradient(135deg, #dce8e6 0%, #c4d5d2 50%, #a8c0bc 100%)`,
    waterDrop: false,
    readTime: 8,
    date: `2026-07-01`,
    author: {
      "pt-BR": `Equipe F&J`,
      en: `F&J Team`,
      zhHK: `F&J 團隊`,
      es: `Equipo F&J`
    },
    tags: {
      "pt-BR": [
        `rotina coreana`,
        `10 passos`,
        `k-beauty`,
        `guia`
      ],
      en: [
        `korean routine`,
        `10 steps`,
        `k-beauty`,
        `guide`
      ],
      zhHK: [
        `韓式護膚`,
        `10步`,
        `韓妝`,
        `指南`
      ],
      es: [
        `rutina coreana`,
        `10 pasos`,
        `k-beauty`,
        `guia`
      ]
    },
    relatedProducts: [
      `hada-labo-lotion`,
      `cosrx-snail-essence`,
      `laneige-sleeping-mask`
    ],
    content: {
      "pt-BR": {},
      en: {},
      zhHK: {
        title: `韓國10步護膚流程：零基礎完全指南`,
        excerpt: `聞名世界的韓式10步護膚流程完整解析。從雙清到防曬，理解每一步的用意。`,
        body: `<p>韓式10步護膚流程名聲在外——也帶著"太複雜"的名聲。真相是：<strong>你不需要每天做滿10步</strong>。它更像一份菜單：根據當日皮膚狀態，挑選需要的步驟。</p>

<h3>為什麼是10步？</h3>
<p>韓式護膚哲學把護膚當作儀式而非任務。每一層都有獨特作用，層層疊加的輕薄水潤，是單一的面霜無法替代的。這就是 <strong>chok chok</strong> 的概念——那種水潤彈嫩的觸感。</p>

<h3>10步全解析</h3>
<h4>1. 卸妝油/卸妝膏</h4><p>以油溶油，卸除彩妝、防曬和多餘油脂。乾手乾臉按摩後加水乳化洗淨。</p>
<h4>2. 潔面乳</h4><p>雙重清潔第二步，洗去汗水和灰塵殘餘。選擇 pH 5.5 弱酸性配方，不破壞皮膚屏障。</p>
<h4>3. 去角質</h4><p>每週1-2次。化學去角質（AHA/BHA/PHA）比物理磨砂更溫和有效。</p>
<h4>4. 爽膚水</h4><p>韓式爽膚水並非收斂水，而是平衡 pH 值並啟動補水。用手輕拍上臉，不用化妝棉。可以拍2-3層。</p>
<h4>5. 精華水</h4><p>韓妝的靈魂產品。水狀的精華，富含發酵成分，促進細胞更新，為後續吸收鋪路。</p>
<h4>6. 精華液/安瓶</h4><p>高濃度活性成分：菸鹼胺淡斑、維C提亮、視黃醇抗老。這是流程裡最"對症下藥"的一步。</p>
<h4>7. 片狀面膜</h4><p>每週2-3次，封閉式滲透，15分鐘密集補充營養。</p>
<h4>8. 眼霜</h4><p>眼週皮膚更薄更脆弱，需專用產品防止乾燥和細紋。</p>
<h4>9. 面霜/乳液</h4><p>鎖住前面所有營養。早晨選清爽質地，晚上可用滋潤款。</p>
<h4>10. 防曬（日）/ 睡眠面膜（夜）</h4><p>白天 SPF 50+ 不可妥協，晚上睡眠面膜鎖水修護。</p>`
      },
      es: {}
    },
    faq: {}
  },
  {
    slug: `rotinas`,
    category: `k-beauty-101`,
    coverGradient: `linear-gradient(135deg, #ede0d8 0%, #e5d2c5 50%, #dac3b0 100%)`,
    waterDrop: false,
    readTime: 6,
    date: `2026-07-02`,
    author: {
      "pt-BR": `Equipe F&J`,
      en: `F&J Team`,
      zhHK: `F&J 團隊`,
      es: `Equipo F&J`
    },
    tags: {
      "pt-BR": [
        `cushion`,
        `maquiagem coreana`,
        `base`,
        `comparacao`
      ],
      en: [
        `cushion`,
        `korean makeup`,
        `foundation`,
        `comparison`
      ],
      zhHK: [
        `氣墊`,
        `韓妝彩妝`,
        `粉底`,
        `對比`
      ],
      es: [
        `cushion`,
        `maquillaje coreano`,
        `base`,
        `comparacion`
      ]
    },
    relatedProducts: [
      `romand-juicy-tint`,
      `innisfree-green-tea-serum`
    ],
    content: {
      "pt-BR": {},
      en: {},
      zhHK: {
        title: `氣墊 vs 傳統粉底：該怎麼選？`,
        excerpt: `韓式氣墊徹底改變了底妝。但它能取代傳統液狀粉底嗎？從質地、遮瑕、持久到便携性全面對比。`,
        body: `<p>如果有一項韓妝發明永遠改變了底妝，那就是<strong>氣墊粉底</strong>。2008年由爱茉莉太平洋發明，這種浸泡在海綿裡的粉底液已成為化妝包的必備品。</p>

<h3>什麼是氣墊？</h3>
<p>氣墊是浸泡了液狀粉底的海綿，裝在帶粉撲的粉盒裡。它能提供<strong>輕薄、均勻、可疊加</strong>的妝效——一層打造自然妝感，多層可疊加遮瑕度。</p>

<h3>氣墊 vs 液狀粉底：核心對比</h3>
<p><strong>質地</strong> — 氣墊輕薄水潤，液狀可選多樣。<br>
<strong>遮瑕</strong> — 氣墊輕-中度可疊加，液狀可選。<br>
<strong>上妝時間</strong> — 氣墊30秒，液狀1-2分鐘。<br>
<strong>妝效</strong> — 氣墊自然光澤，液狀多種可選。<br>
<strong>補妝</strong> — 氣墊自帶粉撲和鏡子極方便，液狀需額外携帶。<br>
<strong>性價比</strong> — 氣墊2-3個月，液狀6-12個月。<br>
<strong>防曬</strong> — 氣墊通常自帶 SPF30-50，液狀少見。</p>

<h3>選購建議</h3>
<p>日常通勤、快速補妝、自然妝感選氣墊。需要高遮瑕、長時間持妝的場合選液狀。熱帶潮濕氣候推薦半啞光氣墊，控油的同時保留韓妝自然光澤。</p>`
      },
      es: {}
    },
    faq: {}
  },
  {
    slug: `o-que-e-glass-skin`,
    category: `k-beauty-101`,
    coverGradient: `linear-gradient(135deg, #d4ccc5 0%, #c2b8af 50%, #afa191 100%)`,
    waterDrop: false,
    readTime: 7,
    date: `2026-07-02`,
    author: {
      "pt-BR": `Equipe F&J`,
      en: `F&J Team`,
      zhHK: `F&J 團隊`,
      es: `Equipo F&J`
    },
    tags: {
      "pt-BR": [
        `hanbang`,
        `medicina tradicional`,
        `ginseng`,
        `k-beauty`
      ],
      en: [
        `hanbang`,
        `traditional medicine`,
        `ginseng`,
        `k-beauty`
      ],
      zhHK: [
        `韓方`,
        `傳統醫學`,
        `人參`,
        `韓妝`
      ],
      es: [
        `hanbang`,
        `medicina tradicional`,
        `ginseng`,
        `k-beauty`
      ]
    },
    relatedProducts: [
      `sulwhasoo-first-care`,
      `dr-jart-cicapair`
    ],
    content: {
      "pt-BR": {
        title: `O Que é Glass Skin e Como Conseguir: Guia Completo`,
        excerpt: `A pele de vidro coreana não é um mito. Aprenda o passo a passo para conquistar uma pele luminosa, uniforme e translúcida — sem filtro necessário.`,
        body: `<p>Se você já navegou pelo Instagram ou Pinterest de beleza, com certeza já se deparou com o termo <strong>glass skin</strong> — aquele brilho úmido, uniforme e quase translúcido que virou a obsessão máxima da K-beauty. Mas o que significa glass skin na prática? É uma questão genética? Ou dá pra alcançar com os produtos certos?</p>

<p>A resposta curta: <strong>dá, sim</strong>. Mas não é sobre um produto milagroso. É sobre consistência, camadas e hidratação profunda.</p>

<h3>O que é glass skin?</h3>
<p>Glass skin descreve uma pele com três características principais:</p>
<ul>
  <li><strong>Luminosidade uniforme</strong> — sem pontos opacos ou áreas ressecadas</li>
  <li><strong>Textura lisa</strong> — poros minimizados e superfície aveludada</li>
  <li><strong>Translucidez</strong> — aquele aspecto "molhado" saudável, não oleoso</li>
</ul>

<p>Diferente da maquiagem "dewy", o glass skin vem do cuidado com a pele — não de iluminador.</p>

<h3>Os 5 passos para conquistar a glass skin</h3>
<h4>1. Double Cleansing (Limpeza Dupla)</h4>
<p>Comece com um cleansing oil ou balm para remover maquiagem e protetor solar. Depois, use um cleanser à base de água para limpar profundamente. Sem uma tela limpa, nenhum ativo penetra direito.</p>

<h4>2. Esfoliação Suave</h4>
<p>Use um tônico com AHA ou BHA 2-3 vezes por semana. A esfoliação remove células mortas e revela a pele fresca por baixo. A palavra-chave é <strong>suave</strong> — nada de esfoliantes físicos agressivos.</p>

<h4>3. Camadas de Hidratação (o segredo coreano)</h4>
<p>O coração da glass skin: aplique <strong>várias camadas finas</strong> de hidratantes. A ordem é:</p>
<ul>
  <li>Toner (2-3 camadas, aplicando com as mãos em vez de algodão)</li>
  <li>Essence (o produto-estrela da K-beauty)</li>
  <li>Sérum (com ativos como niacinamida ou ácido hialurônico)</li>
  <li>Emulsão ou loção leve</li>
  <li>Creme finalizador</li>
</ul>

<h4>4. Máscara em Sheet 2x por Semana</h4>
<p>As sheet masks coreanas entregam uma dose concentrada de ingredientes em 15-20 minutos. O segredo é usar <strong>após o toner e antes do sérum</strong>.</p>

<h4>5. Protetor Solar — Sempre</h4>
<p>Nenhuma rotina coreana termina sem protetor. O sol é o principal inimigo da textura uniforme. Use FPS 50+ todos os dias, faça chuva ou sol.</p>

<h3>Produtos que Recomendamos</h3>
<p>Para começar sua jornada glass skin, sugerimos começar com um sérum de mucina de caracol (hidratação profunda), uma essence leve e um bom FPS coreano. Veja os links dos produtos nesta página para conhecer nossas recomendações.</p>`
      },
      en: {
        title: `What Is Glass Skin and How to Achieve It: A Complete Guide`,
        excerpt: `Korean glass skin is not a myth. Learn the step-by-step routine to achieve luminous, even, and translucent skin — no filter needed.`,
        body: `<p>If you've browsed beauty Instagram or Pinterest, you've definitely encountered <strong>glass skin</strong> — that dewy, even, almost translucent glow that has become the ultimate K-beauty obsession. But what does glass skin actually mean? Is it genetic? Or can you achieve it with the right products?</p>

<p>The short answer: <strong>yes, you can</strong>. But it's not about one miracle product. It's about consistency, layering, and deep hydration.</p>

<h3>What Is Glass Skin?</h3>
<p>Glass skin describes skin with three key qualities:</p>
<ul>
  <li><strong>Even luminosity</strong> — no dull patches or dry spots</li>
  <li><strong>Smooth texture</strong> — minimized pores and a velvety surface</li>
  <li><strong>Translucency</strong> — that healthy "wet" look, not greasy</li>
</ul>

<p>Unlike "dewy" makeup, glass skin comes from skincare — not highlighter.</p>

<h3>5 Steps to Glass Skin</h3>
<h4>1. Double Cleansing</h4>
<p>Start with an oil-based cleanser or balm to remove makeup and sunscreen. Then use a water-based cleanser for a deep clean. Without a clean canvas, no active ingredients can penetrate properly.</p>

<h4>2. Gentle Exfoliation</h4>
<p>Use an AHA or BHA toner 2-3 times a week. Exfoliation removes dead cells and reveals fresh skin beneath. The keyword is <strong>gentle</strong> — no harsh physical scrubs.</p>

<h4>3. Hydration Layers (the Korean secret)</h4>
<p>Apply <strong>multiple thin layers</strong> of hydrating products in this order:</p>
<ul>
  <li>Toner (2-3 layers, patted in with hands)</li>
  <li>Essence (the star product of K-beauty)</li>
  <li>Serum (with actives like niacinamide or hyaluronic acid)</li>
  <li>Emulsion or light lotion</li>
  <li>Final moisturizer</li>
</ul>

<h4>4. Sheet Mask 2x a Week</h4>
<p>Korean sheet masks deliver a concentrated dose of ingredients in 15-20 minutes. Apply <strong>after toner and before serum</strong>.</p>

<h4>5. Sunscreen — Always</h4>
<p>No Korean routine ends without SPF. The sun is the main enemy of even skin texture. Use SPF 50+ every single day.</p>`
      },
      zhHK: {
        title: `韓方：千年草本智慧焕新現代護膚`,
        excerpt: `走進韓方（Hanbang）——以人蔘、發酵和藥用草本征服全球美妝界的韓國傳統醫學護膚理念。`,
        body: `<p><strong>韓方</strong>（한방）字面意思為"韓國方法"，是韓國傳承逾兩千年的傳統草本醫學體系。近年，這一古老智慧在高端韓妝的瓶中焕發新生。</p>

<h3>核心成分</h3>
<h4>高麗參</h4><p>富含皂苷（人蔘皂苷），促進微循環、刺激膠原蛋白生成，具有強大的抗衰老功效。雪花秀等品牌以此為核心構建了美妝帝國。</p>
<h4>發酵提取物</h4><p>韓國人將草本發酵數月甚至數年以增強活性。發酵將分子分解成更小尺寸，提升滲透吸收率。</p>
<h4>功能性菌菇</h4><p>靈芝和冬蟲夏草在韓國傳統醫學中應用千年，現代科學證實其具有抗炎和舒緩功效。</p>
<p>從一款人蔘精華水或精華液開始，是體驗韓方護膚的最簡單方式。質地偏豐潤，帶有淡淡的草本土壤氣息。</p>`
      },
      es: {
        title: `Qué es Glass Skin y Cómo Lograrla: Guía Completa`,
        excerpt: `La piel de vidrio coreana no es un mito. Aprende el paso a paso para lograr una piel luminosa, uniforme y translúcida — sin filtro.`,
        body: `<p>Si has navegado por el Instagram de belleza, seguro te has encontrado con el término <strong>glass skin</strong> — ese brillo húmedo, uniforme y casi translúcido que se ha convertido en la obsesión máxima de la K-beauty.</p>

<h3>Qué es glass skin?</h3>
<p>La glass skin describe una piel con tres cualidades: <strong>luminosidad uniforme</strong>, <strong>textura suave</strong> y <strong>translucidez saludable</strong>. No se trata de maquillaje — es el resultado del cuidado constante.</p>

<h3>5 pasos para lograrla</h3>
<h4>1. Doble limpieza</h4>
<p>Empieza con un limpiador a base de aceite para remover maquillaje y protector solar. Luego un limpiador a base de agua. Sin una base limpia, ningún activo penetra.</p>

<h4>2. Exfoliación suave</h4>
<p>Usa un tónico con AHA o BHA 2-3 veces por semana. La clave es la <strong>suavidad</strong> — nada de exfoliantes físicos agresivos.</p>

<h4>3. Capas de hidratación</h4>
<p>Aplica <strong>múltiples capas finas</strong>: tónico (2-3 capas), esencia, sérum, emulsión y crema final. Este es el verdadero secreto coreano.</p>

<h4>4. Mascarilla sheet 2x por semana</h4>
<p>Aplica después del tónico y antes del sérum. Entrega ingredientes concentrados en 15-20 minutos.</p>

<h4>5. Protector solar — siempre</h4>
<p>El sol es el principal enemigo de la textura uniforme. Usa FPS 50+ todos los días.</p>`
      }
    },
    faq: {}
  },
  {
    slug: `rotina-coreana-10-passos`,
    category: `guia-de-ingredientes`,
    coverGradient: `linear-gradient(135deg, #e8e4df 0%, #d9d3cc 50%, #c9c1b8 100%)`,
    waterDrop: false,
    readTime: 6,
    date: `2026-07-03`,
    author: {
      "pt-BR": `Equipe F&J`,
      en: `F&J Team`,
      zhHK: `F&J 團隊`,
      es: `Equipo F&J`
    },
    tags: {
      "pt-BR": [
        `mucina de caracol`,
        `hidratacao`,
        `cosrx`,
        `k-beauty`
      ],
      en: [
        `snail mucin`,
        `hydration`,
        `cosrx`,
        `k-beauty`
      ],
      zhHK: [
        `蝸牛粘液`,
        `補水保濕`,
        `cosrx`,
        `韓妝`
      ],
      es: [
        `mucina de caracol`,
        `hidratacion`,
        `cosrx`,
        `k-beauty`
      ]
    },
    relatedProducts: [
      `cosrx-snail-essence`
    ],
    content: {
      "pt-BR": {
        title: `Rotina Coreana de 10 Passos: Guia Definitivo para Iniciantes`,
        excerpt: `A famosa rotina de skincare coreana explicada passo a passo. Da limpeza dupla ao protetor solar, entenda cada etapa e por que ela importa.`,
        body: `<p>A rotina coreana de 10 passos ganhou fama mundial — e também a fama de ser complicada. A verdade é que você <strong>não precisa seguir todos os 10 passos todo dia</strong>. Pense nela como um cardápio: você escolhe o que sua pele precisa naquele momento.</p>

<h3>Por que 10 passos?</h3>
<p>A filosofia coreana trata o skincare como um ritual de autocuidado — não uma tarefa. Cada camada tem uma função específica, e a soma das camadas finas entrega resultados que um único creme não alcança. É o conceito de <strong>chok chok</strong> — aquele toque úmido e elástico da pele bem hidratada.</p>

<h3>Os 10 Passos</h3>
<h4>1. Cleansing Oil / Balm</h4>
<p>Remove maquiagem, protetor solar e excesso de oleosidade. Massageie suavemente no rosto seco, emulsione com água e enxágue. Produtos oil-based dissolvem impurezas oil-based — é química básica que funciona.</p>

<h4>2. Water-Based Cleanser</h4>
<p>O segundo passo da limpeza dupla. Remove resíduos de suor, poeira e o que sobrou do cleansing oil. Escolha um com pH baixo (5.5) para não agredir a barreira da pele.</p>

<h4>3. Esfoliante</h4>
<p>Use 1-2 vezes por semana. Prefira esfoliantes químicos (AHA, BHA, PHA) aos físicos. Eles dissolvem as células mortas sem causar microlesões.</p>

<h4>4. Toner</h4>
<p>O toner coreano <strong>não é adstringente</strong>. Ele equilibra o pH e começa a hidratação. Aplique com as mãos em movimentos de tapinhas, não com algodão. Muitas coreanas aplicam de 2 a 3 camadas — é o famoso "7 skin method".</p>

<h4>5. Essence</h4>
<p>O coração da K-beauty. A essence é um híbrido entre toner e sérum: fluida, cheia de ativos fermentados que aceleram a renovação celular e preparam a pele para absorver tudo o que vier depois.</p>

<h4>6. Sérum / Ampola</h4>
<p>Aqui entram os tratamentos específicos: niacinamida para manchas, vitamina C para luminosidade, retinol para antienvelhecimento. O sérum tem alta concentração de ativos — é o "remédio" da sua rotina.</p>

<h4>7. Sheet Mask</h4>
<p>Use 2-3 vezes por semana. A máscara cria uma barreira oclusiva que força os ingredientes a penetrar. Quinze minutos de puro mimo.</p>

<h4>8. Eye Cream</h4>
<p>A área dos olhos é mais fina e sensível. Um creme específico evita o ressecamento e previne linhas finas.</p>

<h4>9. Hidratante / Emulsão</h4>
<p>Sela todas as camadas anteriores. De manhã, escolha texturas leves (gel, loção). À noite, pode usar um creme mais rico.</p>

<h4>10. Protetor Solar (manhã) / Sleeping Mask (noite)</h4>
<p>Durante o dia: FPS 50+ é inegociável. À noite: uma sleeping mask sela tudo e potencializa a hidratação enquanto você dorme.</p>

<h3>Rotina Simplificada</h3>
<p>Se 10 passos parecem demais, comece com 5: cleansing oil → cleanser → toner → hidratante → FPS de dia / sleeping mask de noite. Aos poucos, vá adicionando os outros conforme sua pele pedir.</p>`
      },
      en: {
        title: `The Korean 10-Step Skincare Routine: Ultimate Beginner Guide`,
        excerpt: `The famous Korean skincare routine explained step by step. From double cleansing to sunscreen, understand each step and why it matters.`,
        body: `<p>The Korean 10-step routine has gained worldwide fame — along with a reputation for complexity. The truth is you <strong>don't need all 10 steps every day</strong>. Think of it as a menu: you pick what your skin needs at that moment.</p>

<h3>Why 10 Steps?</h3>
<p>Korean philosophy treats skincare as a self-care ritual, not a chore. Each layer serves a specific purpose, and the sum of thin layers delivers results a single cream cannot. It's the concept of <strong>chok chok</strong> — that moist, bouncy feel of well-hydrated skin.</p>

<h3>The 10 Steps</h3>
<h4>1. Oil Cleanser</h4><p>Removes makeup, sunscreen, and excess oil. Oil dissolves oil — basic chemistry that works beautifully.</p>
<h4>2. Water-Based Cleanser</h4><p>The second step of double cleansing. Removes sweat, dust, and residue. Choose a low-pH formula (5.5).</p>
<h4>3. Exfoliator</h4><p>Use 1-2 times weekly. Chemical exfoliants (AHA, BHA, PHA) are gentler and more effective than physical scrubs.</p>
<h4>4. Toner</h4><p>Korean toner balances pH and starts hydration. Pat it in with your hands, not cotton pads. Try 2-3 layers.</p>
<h4>5. Essence</h4><p>The heart of K-beauty. A fluid hybrid of toner and serum, packed with fermented ingredients that accelerate cell renewal.</p>
<h4>6. Serum / Ampoule</h4><p>Targeted treatments with high concentrations of actives: niacinamide for dark spots, vitamin C for glow, retinol for anti-aging.</p>
<h4>7. Sheet Mask</h4><p>Use 2-3 times weekly. Creates an occlusive barrier that forces ingredients into the skin.</p>
<h4>8. Eye Cream</h4><p>The eye area is thinner and more sensitive. A dedicated cream prevents dryness and fine lines.</p>
<h4>9. Moisturizer</h4><p>Seals all previous layers. Morning: light gel or lotion. Night: richer cream.</p>
<h4>10. SPF (AM) / Sleeping Mask (PM)</h4><p>SPF 50+ is non-negotiable during the day. At night, a sleeping mask seals and boosts hydration.</p>`
      },
      zhHK: {
        title: `蝸牛粘液：韓妝真正有效的明星成分`,
        excerpt: `蝸牛粘液是韓妝最具標誌性也最被誤解的成分之一。了解 COSRX 大熱產品背後的科學原理。`,
        body: `<p>蝸牛粘液含有尿囊素、甘醇酸、膠原蛋白和彈性蛋白——是修復和補水的完整組合。</p><h3>核心功效</h3><p>蝸牛粘液能夠<strong>修復皮膚屏障</strong>，加速細胞再生，提供深層補水而無厚重感。對痘肌、痘印和日晒受損皮膚尤其有效。</p><h3>使用方法</h3><p>在爽膚水之後使用蝸牛精華，早晚各一次。質地出乎意料的輕盈。持續使用4週以上見效。</p>`
      },
      es: {
        title: `Rutina Coreana de 10 Pasos: Guía Definitiva para Principiantes`,
        excerpt: `La famosa rutina coreana de cuidado explicada paso a paso. De la doble limpieza al protector solar, entiende cada etapa.`,
        body: `<p>La rutina coreana de 10 pasos tiene fama de complicada, pero la verdad es que <strong>no necesitas seguir los 10 pasos cada día</strong>. Úsala como un menú: elige lo que tu piel necesita.</p>

<h3>Los 10 Pasos</h3>
<h4>1. Limpiador Oil</h4><p>Elimina maquillaje, protector solar y exceso de grasa. El aceite disuelve el aceite.</p>
<h4>2. Limpiador Agua</h4><p>Segunda etapa de la doble limpieza. Elimina sudor, polvo y residuos.</p>
<h4>3. Exfoliante</h4><p>1-2 veces por semana. Los exfoliantes químicos (AHA, BHA) son más suaves.</p>
<h4>4. Tónico</h4><p>Equilibra el pH e inicia la hidratación. Aplícalo con las manos dando palmaditas.</p>
<h4>5. Esencia</h4><p>El corazón de la K-beauty. Ingredientes fermentados que aceleran la renovación celular.</p>
<h4>6. Sérum / Ampolla</h4><p>Tratamientos con alta concentración de activos para necesidades específicas.</p>
<h4>7. Mascarilla Sheet</h4><p>2-3 veces por semana. Barrera oclusiva que fuerza la penetración de ingredientes.</p>
<h4>8. Contorno de Ojos</h4><p>La zona de los ojos necesita un cuidado específico por ser más fina y sensible.</p>
<h4>9. Hidratante</h4><p>Sella todas las capas anteriores. Textura ligera de día, más rica de noche.</p>
<h4>10. FPS (día) / Mascarilla Nocturna (noche)</h4><p>FPS 50+ innegociable de día. La mascarilla nocturna sella e intensifica la hidratación.</p>`
      }
    },
    faq: {}
  },
  {
    slug: `cushion-vs-base-tradicional`,
    category: `guia-de-ingredientes`,
    coverGradient: `linear-gradient(135deg, #d5e8d4 0%, #bcd9ba 50%, #9ec49c 100%)`,
    waterDrop: false,
    readTime: 5,
    date: `2026-07-03`,
    author: {
      "pt-BR": `Equipe F&J`,
      en: `F&J Team`,
      zhHK: `F&J 團隊`,
      es: `Equipo F&J`
    },
    tags: {
      "pt-BR": [
        `centella asiatica`,
        `cica`,
        `pele sensivel`,
        `calmante`
      ],
      en: [
        `centella asiatica`,
        `cica`,
        `sensitive skin`,
        `soothing`
      ],
      zhHK: [
        `積雪草`,
        `cica`,
        `敏感肌`,
        `舒緩`
      ],
      es: [
        `centella asiatica`,
        `cica`,
        `piel sensible`,
        `calmante`
      ]
    },
    relatedProducts: [
      `cosrx-snail-essence`
    ],
    content: {
      "pt-BR": {
        title: `Cushion vs Base Tradicional: Qual Escolher?`,
        excerpt: `A cushion coreana revolucionou a maquiagem. Mas será que ela substitui a base líquida tradicional? Compare texturas, cobertura, duração e praticidade.`,
        body: `<p>Se tem uma invenção coreana que mudou a maquiagem para sempre, é a <strong>cushion foundation</strong>. Criada em 2008 pela Amorepacific, a almofadinha embebida em base virou item obrigatório em qualquer nécessaire — inclusive de marcas ocidentais que copiaram o formato.</p>

<h3>O que é uma cushion?</h3>
<p>Uma cushion é uma esponja saturada com base líquida, acondicionada em um compacto com um puff aplicador. Ela entrega uma camada <strong>fina, uniforme e construível</strong> — você pode aplicar uma camada para um acabamento natural, ou várias para mais cobertura.</p>

<h3>Cushion vs. Base Líquida: comparativo</h3>

<table>
<tr><th>Critério</th><th>Cushion</th><th>Base Líquida</th></tr>
<tr><td>Textura</td><td>Leve, fresca, aquosa</td><td>Variável (líquida, cremosa, matte)</td></tr>
<tr><td>Cobertura</td><td>Leve a média, construível</td><td>Leve a altíssima</td></tr>
<tr><td>Aplicação</td><td>Rápida (30 seg)</td><td>Demora mais (1-2 min)</td></tr>
<tr><td>Acabamento</td><td>Natural, glow, "pele de vidro"</td><td>Variável (matte, glow, natural)</td></tr>
<tr><td>Retoque</td><td>Fácil, já vem com puff e espelho</td><td>Precisa carregar pó ou base separada</td></tr>
<tr><td>Duração</td><td>2-3 meses (uso diário)</td><td>6-12 meses</td></tr>
<tr><td>FPS</td><td>Quase sempre incluso (30-50)</td><td>Raramente</td></tr>
</table>

<h3>Quando usar cada uma</h3>
<p><strong>Cushion:</strong> Ideal para o dia a dia, retoques rápidos, clima quente e úmido (a textura fresca é uma delícia no verão tropical), e para quem busca um visual natural de "sua pele, só que melhor".</p>

<p><strong>Base Líquida:</strong> Melhor para eventos, fotografia, quando você precisa de alta cobertura e duração máxima. Também é mais econômica a longo prazo.</p>

<h3>Dica F&J:</h3>
<p>Para o mercado brasileiro — com clima tropical e tendência à oleosidade em muitas regiões — sugerimos começar com uma cushion de acabamento semi-matte. Ela controla o brilho sem perder o glow natural que é a marca registrada da maquiagem coreana.</p>`
      },
      en: {
        title: `Cushion vs Traditional Foundation: Which One to Choose?`,
        excerpt: `Korean cushion foundation revolutionized makeup. But can it replace liquid foundation? Compare texture, coverage, longevity, and portability.`,
        body: `<p>If there's one Korean invention that changed makeup forever, it's the <strong>cushion foundation</strong>. Created in 2008 by Amorepacific, this sponge saturated with foundation became a must-have in every makeup bag.</p>

<h3>What Is a Cushion?</h3>
<p>A cushion is a sponge saturated with liquid foundation, housed in a compact with a puff applicator. It delivers a <strong>thin, even, buildable</strong> layer — one coat for natural finish, multiple for more coverage.</p>

<h3>Cushion vs Liquid: comparison</h3>
<p><strong>Texture</strong> — Cushion: light, fresh, watery. Liquid: variable.<br>
<strong>Coverage</strong> — Cushion: light to medium, buildable. Liquid: sheer to full.<br>
<strong>Application time</strong> — Cushion: 30 seconds. Liquid: 1-2 minutes.<br>
<strong>Finish</strong> — Cushion: natural glow. Liquid: any finish available.<br>
<strong>Touch-up</strong> — Cushion: effortless, built-in mirror. Liquid: needs separate powder.<br>
<strong>Value</strong> — Cushion lasts 2-3 months. Liquid lasts 6-12 months.<br>
<strong>SPF</strong> — Cushion: almost always SPF 30-50. Liquid: rarely.</p>

<h3>When to Use Each</h3>
<p><strong>Cushion:</strong> Daily wear, quick touch-ups, hot/humid climates (the cooling texture feels amazing), natural "your skin but better" looks.<br>
<strong>Liquid Foundation:</strong> Events, photography, when you need full coverage and maximum wear time. Also more cost-effective long-term.</p>

<p>For tropical climates, start with a semi-matte finish cushion — it controls shine while keeping that signature Korean natural glow.</p>`
      },
      zhHK: {
        title: `積雪草（Cica）：韓妝的修復奇跡草`,
        excerpt: `積雪草——又名 Cica——是敏感肌和受損肌的救星。了解它為何成為韓妝全線必備成分。`,
        body: `<p><strong>積雪草</strong>（又称 Cica、雷公根、老虎草）在亞洲傳統醫學中已使用數百年，在韓妝中爆紅。</p><h3>核心功效</h3><p>富含<strong>積雪草苷</strong>和羥基積雪草苷，強力抗炎、褪紅祛印、加速癒合。對玫瑰痤瘡、炎性痘痘和醫美術後敏感尤其友好。</p><h3>怎麼用</h3><p>積雪草產品適合作為舒緩爽膚水、精華或修復面霜使用。潔面後使用，夜間修復效果更佳。</p>`
      },
      es: {
        title: `Cushion vs Base Tradicional: Cuál Elegir?`,
        excerpt: `La cushion coreana revolucionó el maquillaje. Pero puede reemplazar la base líquida? Compara textura, cobertura, duración y practicidad.`,
        body: `<p>Si hay un invento coreano que cambió el maquillaje para siempre, es la <strong>cushion foundation</strong>. Creada en 2008 por Amorepacific, esta esponja saturada de base se volvió indispensable.</p>

<h3>Cushion vs Base Líquida</h3>
<p><strong>Textura</strong> — Cushion: ligera, fresca. Líquida: variable.<br>
<strong>Cobertura</strong> — Cushion: ligera a media, construible. Líquida: variable.<br>
<strong>Aplicación</strong> — Cushion: 30 segundos. Líquida: 1-2 minutos.<br>
<strong>Acabado</strong> — Cushion: glow natural. Líquida: variable.<br>
<strong>Retoque</strong> — Cushion: fácil, con espejo y puff incluidos.<br>
<strong>Duración</strong> — Cushion: 2-3 meses. Líquida: 6-12 meses.<br>
<strong>FPS</strong> — Cushion: casi siempre FPS 30-50. Líquida: raramente.</p>

<h3>Cuándo usar cada una</h3>
<p><strong>Cushion:</strong> uso diario, retoques, clima cálido, look natural.<br>
<strong>Base líquida:</strong> eventos, fotografía, cuando necesitas máxima cobertura y duración.</p>`
      }
    },
    faq: {}
  },
  {
    slug: `hanbang-sabedoria-herbal-coreana`,
    category: `guia-de-ingredientes`,
    coverGradient: `linear-gradient(135deg, #dceef5 0%, #c5dfea 50%, #a8d0df 100%)`,
    waterDrop: false,
    readTime: 5,
    date: `2026-07-04`,
    author: {
      "pt-BR": `Equipe F&J`,
      en: `F&J Team`,
      zhHK: `F&J 團隊`,
      es: `Equipo F&J`
    },
    tags: {
      "pt-BR": [
        `acido hialuronico`,
        `hidratacao`,
        `k-beauty`
      ],
      en: [
        `hyaluronic acid`,
        `hydration`
      ],
      zhHK: [
        `玻尿酸`,
        `補水`
      ],
      es: [
        `acido hialuronico`,
        `hidratacion`
      ]
    },
    relatedProducts: [
      `laneige-sleeping-mask`,
      `beauty-of-joseon-serum`
    ],
    content: {
      "pt-BR": {
        title: `Hanbang: A Sabedoria Herbal Coreana na Skincare Moderna`,
        excerpt: `Descubra o hanbang — a milenar medicina herbal coreana que está conquistando o mundo da beleza com ginseng, fermentados e ervas medicinais.`,
        body: `<p><strong>Hanbang</strong> (한방) significa literalmente "método coreano" e se refere ao sistema tradicional de medicina herbal praticado na Coreia há mais de 2.000 anos. Nos últimos anos, essa sabedoria ganhou uma nova vida nos frascos da K-beauty premium.</p>

<h3>O que torna o hanbang especial?</h3>
<p>Diferente da tendência de skincare "limpa" ocidental (que muitas vezes significa apenas "sem parabenos"), o hanbang se baseia em <strong>ingredientes funcionais complexos</strong> — muitas vezes fermentados — que trabalham em sinergia com a pele.</p>

<h3>Ingredientes-estrela do hanbang</h3>

<h4>Ginseng Coreano (Insam, 인삼)</h4>
<p>A estrela absoluta. Rico em saponinas (ginsenosídeos), o ginseng melhora a circulação, estimula a produção de colágeno e tem poderoso efeito antienvelhecimento. Marcas como Sulwhasoo e History of Whoo construíram seus impérios em cima dele.</p>

<h4>Extrato de Fermentado</h4>
<p>Os coreanos fermentam ervas medicinais por meses — até anos — para potencializar seus ativos. A fermentação quebra as moléculas em tamanhos menores, facilitando a penetração e tornando os ingredientes mais potentes.</p>

<h4>Cogumelos Funcionais (Reishi, Cordyceps)</h4>
<p>Usados na medicina tradicional coreana há milênios, hoje são estudados pela ciência moderna por suas propriedades anti-inflamatórias e calmantes.</p>

<h3>Como incorporar o hanbang na sua rotina</h3>
<p>Comece com uma essence ou sérum de ginseng — é o jeito mais fácil de sentir a diferença. A textura tende a ser mais rica e o aroma levemente herbal, quase terroso, que se transforma em uma experiência sensorial.</p>`
      },
      en: {
        title: `Hanbang: Korean Herbal Wisdom in Modern Skincare`,
        excerpt: `Discover hanbang — the ancient Korean herbal medicine that is conquering the beauty world with ginseng, fermented herbs, and medicinal ingredients.`,
        body: `<p><strong>Hanbang</strong> (한방) literally means "Korean method" and refers to the traditional herbal medicine system practiced in Korea for over 2,000 years. This ancient wisdom has found new life in premium K-beauty bottles.</p>

<h3>Star Ingredients</h3>
<h4>Korean Ginseng (Insam)</h4>
<p>Rich in saponins (ginsenosides), ginseng boosts circulation, stimulates collagen production, and has powerful anti-aging effects. Brands like Sulwhasoo built empires on it.</p>

<h4>Fermented Extracts</h4>
<p>Koreans ferment medicinal herbs for months — even years — to amplify their actives. Fermentation breaks down molecules into smaller sizes for better penetration.</p>

<h4>Functional Mushrooms</h4>
<p>Reishi and cordyceps have been used in Korean traditional medicine for millennia, now studied for their anti-inflammatory and calming properties.</p>

<p>Start with a ginseng essence or serum — it's the easiest way to experience the hanbang difference. The texture is richer, the scent slightly herbal and earthy.</p>`
      },
      zhHK: {
        title: `韓國玻尿酸：為什麼它不一樣`,
        excerpt: `並非所有玻尿酸都一樣。韓式配方使用多重分子量的玻尿酸，實現全天候分層補水。`,
        body: `<p>韓國實驗室使用<strong>多重分子量</strong>的玻尿酸：低分子量深入表皮深層，高分子量在表面形成水潤薄膜。兩者結合實現<strong>分層補水</strong>，持久不蒸發。</p><h3>最佳用法</h3><p>在<strong>微濕的皮膚</strong>上使用玻尿酸精華——它靠吸收環境水分來補水。使用後務必疊加面霜鎖水。</p>`
      },
      es: {
        title: `Hanbang: La Sabiduría Herbal Coreana en el Skincare Moderno`,
        excerpt: `Descubre el hanbang — la milenaria medicina herbal coreana que conquista el mundo beauty con ginseng y hierbas medicinales.`,
        body: `<p><strong>Hanbang</strong> (한방) significa "método coreano" y se refiere al sistema de medicina herbal tradicional practicado en Corea por más de 2,000 años.</p>

<h3>Ingredientes estrella</h3>
<h4>Ginseng Coreano</h4><p>Rico en saponinas, estimula colágeno y tiene efecto antiedad. Marcas como Sulwhasoo construyeron imperios con él.</p>
<h4>Extractos Fermentados</h4><p>La fermentación descompone moléculas para mejor absorción y potencia los activos.</p>
<h4>Hongos Funcionales</h4><p>Reishi y cordyceps, usados milenariamente, ofrecen propiedades antiinflamatorias.</p>
<p>Empieza con una esencia o sérum de ginseng para experimentar la diferencia del hanbang.</p>`
      }
    },
    faq: {}
  },
  {
    slug: `mucina-de-caracol-guia`,
    category: `guia-de-ingredientes`,
    coverGradient: `linear-gradient(135deg, #ede0c8 0%, #e5d3a8 50%, #dac38c 100%)`,
    waterDrop: false,
    readTime: 5,
    date: `2026-07-04`,
    author: {
      "pt-BR": `Equipe F&J`,
      en: `F&J Team`,
      zhHK: `F&J 團隊`,
      es: `Equipo F&J`
    },
    tags: {
      "pt-BR": [
        `propolis`,
        `antibacteriano`,
        `acne`,
        `brilho`
      ],
      en: [
        `propolis`,
        `antibacterial`,
        `acne`,
        `glow`
      ],
      zhHK: [
        `蜂膠`,
        `抗菌`,
        `痘痘`,
        `光澤`
      ],
      es: [
        `propolis`,
        `antibacteriano`,
        `acne`,
        `brillo`
      ]
    },
    relatedProducts: [
      `cosrx-snail-essence`,
      `innisfree-green-tea-serum`
    ],
    content: {
      "pt-BR": {
        title: `Mucina de Caracol: O Elixir da K-Beauty que Realmente Funciona`,
        excerpt: `A mucina de caracol é um dos ingredientes mais icônicos — e mais mal compreendidos — da beleza coreana. Entenda a ciência por trás do favorito da COSRX.`,
        body: `<p>Poucos ingredientes dividem opiniões como a <strong>mucina de caracol</strong>. Para os fãs, é o elixir da pele perfeita. Para os céticos, soa estranho. A verdade está nos dados: a mucina de caracol contém alantoína, ácido glicólico, colágeno e elastina — um combo de regeneração e hidratação.</p><h3>Benefícios comprovados</h3><p>A mucina de caracol <strong>repara a barreira da pele</strong>, acelera a regeneração celular e fornece hidratação profunda sem sensação pesada. É especialmente eficaz para peles com acne, cicatrizes e danos solares.</p><h3>Como usar</h3><p>Aplique o sérum de mucina após o toner, de manhã e à noite. A textura é surpreendentemente leve — nada daquela sensação pegajosa que você imagina. Para melhores resultados, use consistente por 4+ semanas.</p>`
      },
      en: {
        title: `Snail Mucin: The K-Beauty Elixir That Actually Works`,
        excerpt: `Snail mucin is one of the most iconic and misunderstood K-beauty ingredients. Understand the science behind COSRX's favorite.`,
        body: `<p>Few ingredients divide opinion like <strong>snail mucin</strong>. For fans, it's the elixir of perfect skin. For skeptics, it sounds weird. The truth is in the data: snail mucin contains allantoin, glycolic acid, collagen, and elastin — a regeneration and hydration powerhouse.</p><h3>Proven Benefits</h3><p>Snail mucin <strong>repairs the skin barrier</strong>, accelerates cell regeneration, and provides deep hydration without heaviness. It's especially effective for acne-prone, scarred, and sun-damaged skin.</p><h3>How to Use</h3><p>Apply snail mucin serum after toner, morning and night. The texture is surprisingly lightweight — none of that sticky feeling. For best results, use consistently for 4+ weeks.</p>`
      },
      zhHK: {
        title: `蜂膠護膚：韓式光澤的秘密武器`,
        excerpt: `蜂膠是韓式光澤的秘密成分——集抗菌、舒緩和提亮於一身。`,
        body: `<p><strong>蜂膠</strong>——蜜蜂用來保護蜂巢的樹脂——是韓妝中最被低估的成分之一。三大功效合一：<strong>抗菌</strong>、<strong>舒緩</strong>和自然<strong>光澤</strong>。</p><h3>適合誰</h3><p>痘肌（抗菌不拔幹）、敏感肌（褪紅）和暗沉肌（恢復活力）。皮膚狀態"不太對勁"時的救星。</p><h3>怎麼用</h3><p>爽膚水後使用蜂膠精華。質地微粘但吸收很快。早晨使用打造全天光澤感。</p>`
      },
      es: {
        title: `Mucina de Caracol: El Elixir K-Beauty que Realmente Funciona`,
        excerpt: `La mucina de caracol es uno de los ingredientes más icónicos de la K-beauty. Entiende la ciencia detrás del favorito de COSRX.`,
        body: `<p>La mucina de caracol contiene alantoína, ácido glicólico, colágeno y elastina — un combo de regeneración e hidratación.</p><h3>Beneficios</h3><p><strong>Repara la barrera cutánea</strong>, acelera la regeneración celular e hidrata profundamente. Excelente para piel con acné, cicatrices y daño solar.</p><h3>Cómo usar</h3><p>Aplica después del tónico, mañana y noche. La textura es sorprendentemente ligera. Usa por 4+ semanas para resultados.</p>`
      }
    },
    faq: {}
  },
  {
    slug: `centella-asiatica-pele`,
    category: `rotinas`,
    coverGradient: `linear-gradient(135deg, #e8f0d8 0%, #d5e4bc 50%, #bed89a 100%)`,
    waterDrop: false,
    readTime: 7,
    date: `2026-07-05`,
    author: {
      "pt-BR": `Equipe F&J`,
      en: `F&J Team`,
      zhHK: `F&J 團隊`,
      es: `Equipo F&J`
    },
    tags: {
      "pt-BR": [
        `pele oleosa`,
        `rotina`,
        `controle de oleosidade`,
        `k-beauty`
      ],
      en: [
        `oily skin`,
        `routine`,
        `oil control`
      ],
      zhHK: [
        `油性肌膚`,
        `護膚流程`,
        `控油`
      ],
      es: [
        `piel grasa`,
        `rutina`,
        `control de grasa`
      ]
    },
    relatedProducts: [
      `cosrx-snail-essence`,
      `cosrx-pimple-patches`
    ],
    content: {
      "pt-BR": {
        title: `Centella Asiática (Cica): A Erva Milagrosa da K-Beauty`,
        excerpt: `A centella asiática — ou cica — é o ingrediente favorito para peles sensíveis e irritadas. Descubra por que ela está em todo produto coreano de cuidado.`,
        body: `<p>A <strong>Centella Asiática</strong> (também chamada de Cica, Gotu Kola ou Tiger Grass) é uma erva usada há séculos na medicina tradicional asiática. Na K-beauty, ela virou febre absoluta — e por bons motivos.</p><h3>O que a cica faz pela pele</h3><p>Rica em <strong>asiaticosídeos</strong> e madecassosídeos, a centella é um potente anti-inflamatório que acalma vermelhidão, reduz irritação e acelera a cicatrização. É o ingrediente ideal para quem sofre com rosácea, acne inflamada ou sensibilidade pós-procedimento.</p><h3>Como incorporar na rotina</h3><p>Produtos com cica funcionam melhor na forma de toner calmante, sérum ou creme reparador. Aplique após a limpeza, especialmente à noite quando a pele está em modo de reparação.</p>`
      },
      en: {
        title: `Centella Asiatica (Cica): The Miracle Herb of K-Beauty`,
        excerpt: `Centella asiatica — or cica — is the go-to ingredient for sensitive and irritated skin. Discover why it's in every K-Beauty skincare product.`,
        body: `<p><strong>Centella Asiatica</strong> (also called Cica, Gotu Kola, or Tiger Grass) has been used for centuries in traditional Asian medicine. In K-beauty, it's become an absolute sensation.</p><h3>What Cica Does</h3><p>Rich in <strong>asiaticosides</strong> and madecassosides, centella is a powerful anti-inflammatory that calms redness, reduces irritation, and accelerates healing. Ideal for rosacea, inflamed acne, or post-procedure sensitivity.</p><h3>How to Use</h3><p>Cica products work best as calming toners, serums, or repair creams. Apply after cleansing, especially at night when skin is in repair mode.</p>`
      },
      zhHK: {
        title: `油性皮膚的韓式護膚流程`,
        excerpt: `油皮也需要補水——這是韓妝最大的啟蒙。搭建控油不傷膚的正確流程。`,
        body: `<p>油皮最大誤區？<strong>靠拔幹來控油</strong>。韓妝教的是反直覺的真相：充分補水的皮膚反而分泌更少油脂。</p><h3>推薦流程</h3><h4>晨間（5步）</h4><ol><li>弱酸性潔面啫喱</li><li>BHA 爽膚水——控油疏通毛孔</li><li>菸鹼胺精華——調節油脂</li><li>啫喱面霜——輕薄水基底</li><li>無油防曬 SPF 50</li></ol><h4>夜間（6步）</h4><ol><li>輕質卸妝油</li><li>潔面啫喱</li><li>BHA 爽膚水（或每週2次 AHA）</li><li>菸鹼胺精華</li><li>積雪草精華水</li><li>啫喱面霜收尾</li></ol>`
      },
      es: {
        title: `Centella Asiática (Cica): La Hierba Milagrosa K-Beauty`,
        excerpt: `La centella asiática es el ingrediente favorito para pieles sensibles. Descubre por qué está en todo producto coreano.`,
        body: `<p><strong>Centella Asiática</strong> (Cica, Gotu Kola) se ha usado por siglos en medicina asiática. En K-beauty, es furor absoluto.</p><h3>Beneficios</h3><p>Rica en <strong>asiaticósidos</strong>, es un potente antiinflamatorio que calma el enrojecimiento y acelera la curación. Ideal para rosácea y acné inflamado.</p><h3>Cómo usar</h3><p>En tónico, sérum o crema reparadora. Aplica tras la limpieza, preferiblemente de noche.</p>`
      }
    },
    faq: {}
  },
  {
    slug: `acido-hialuronico-coreano`,
    category: `rotinas`,
    coverGradient: `linear-gradient(135deg, #d5cce0 0%, #c0b4d0 50%, #a898bc 100%)`,
    waterDrop: false,
    readTime: 7,
    date: `2026-07-05`,
    author: {
      "pt-BR": `Equipe F&J`,
      en: `F&J Team`,
      zhHK: `F&J 團隊`,
      es: `Equipo F&J`
    },
    tags: {
      "pt-BR": [
        `anti-idade`,
        `rotina noturna`,
        `retinol`,
        `ginseng`
      ],
      en: [
        `anti-aging`,
        `night routine`,
        `retinol`,
        `ginseng`
      ],
      zhHK: [
        `抗老`,
        `夜間護膚`,
        `視黃醇`,
        `人蔘`
      ],
      es: [
        `antiedad`,
        `rutina nocturna`,
        `retinol`,
        `ginseng`
      ]
    },
    relatedProducts: [
      `sulwhasoo-first-care`,
      `beauty-of-joseon-serum`
    ],
    content: {
      "pt-BR": {
        title: `Ácido Hialurônico Coreano: Por Que Ele é Diferente`,
        excerpt: `Nem todo ácido hialurônico é igual. Entenda por que a versão coreana — com múltiplos pesos moleculares — entrega hidratação que dura o dia todo.`,
        body: `<p>O ácido hialurônico não é novidade. Mas a forma como os laboratórios coreanos o formulam é. Em vez de um único peso molecular, os produtos coreanos usam <strong>múltiplos tamanhos de molécula</strong> — umas penetram profundamente, outras hidratam a superfície.</p><h3>Por que isso importa</h3><p>O HA de baixo peso molecular penetra nas camadas profundas da epiderme. O de alto peso fica na superfície, formando um filme hidratante. A combinação dos dois cria uma hidratação <strong>multinível</strong> que dura mais e não evapora rápido.</p><h3>Melhor forma de usar</h3><p>Aplique o sérum de HA sobre a pele <strong>levemente úmida</strong> — o ácido hialurônico funciona puxando água do ambiente para a pele. Sem umidade, ele pode fazer o efeito contrário. Sele sempre com um hidratante por cima.</p>`
      },
      en: {
        title: `Korean Hyaluronic Acid: Why It's Different`,
        excerpt: `Not all hyaluronic acid is the same. Korean formulations use multiple molecular weights for all-day hydration.`,
        body: `<p>Korean labs use <strong>multiple molecular weights</strong> of HA — some penetrate deep, others hydrate the surface. Low-weight HA reaches deep epidermal layers. High-weight stays on the surface forming a hydrating film. The combination creates <strong>multi-level</strong> hydration that lasts.</p><h3>How to Use</h3><p>Apply HA serum on <strong>slightly damp skin</strong> — HA pulls water into the skin. Without moisture, it can backfire. Always seal with moisturizer.</p>`
      },
      zhHK: {
        title: `韓式夜間抗老儀式：真正有效的方案`,
        excerpt: `夜晚是皮膚的黃金修復期。用韓式護膚搭建真正能抗老的夜間流程。`,
        body: `<p>睡眠時皮膚在加速運轉：循環加快、細胞更新提速、屏障修復活躍。韓式夜間流程用正確的活性成分放大每一個自然過程。</p><h3>夜間抗老流程（7步）</h3><ol><li><strong>卸妝油</strong>——按摩1分鐘促進循環</li><li><strong>溫和潔面</strong>——低pH、無硫酸盐</li><li><strong>AHA/PHA爽膚水</strong>——每週2-3次溫和焕膚</li><li><strong>人蔘精華水</strong>——促進膠原蛋白和彈性</li><li><strong>視黃醇精華</strong>——從每週2次開始逐步建立耐受，抗老金標準</li><li><strong>勝肽眼霜</strong></li><li><strong>滋潤面霜或睡眠面膜</strong>——神經醯胺鎖水封層</li></ol><h3>黃金法則</h3><p>視黃醇和AHA不要同晚使用。交替：一晚焕膚（AHA），一晚再生（視黃醇）。第二天早上嚴格防曬。</p>`
      },
      es: {
        title: `Ácido Hialurónico Coreano: Por Qué Es Diferente`,
        excerpt: `No todo el ácido hialurónico es igual. Las fórmulas coreanas usan múltiples pesos moleculares.`,
        body: `<p>Los laboratorios coreanos usan <strong>múltiples pesos moleculares</strong> de HA para hidratación multinivel.</p><h3>Cómo usar</h3><p>Aplica sobre la piel <strong>ligeramente húmeda</strong>. El HA atrae agua hacia la piel. Sella siempre con hidratante.</p>`
      }
    },
    faq: {}
  },
  {
    slug: `propolis-skincare-beneficios`,
    category: `rotinas`,
    coverGradient: `linear-gradient(135deg, #fdeadb 0%, #fce0c8 50%, #fad4b0 100%)`,
    waterDrop: false,
    readTime: 6,
    date: `2026-07-06`,
    author: {
      "pt-BR": `Equipe F&J`,
      en: `F&J Team`,
      zhHK: `F&J 團隊`,
      es: `Equipo F&J`
    },
    tags: {
      "pt-BR": [
        `verao`,
        `clima tropical`,
        `protecao solar`,
        `skincare`
      ],
      en: [
        `summer`,
        `tropical`,
        `sun protection`
      ],
      zhHK: [
        `夏天`,
        `熱帶`,
        `防曬`
      ],
      es: [
        `verano`,
        `tropical`,
        `proteccion solar`
      ]
    },
    relatedProducts: [
      `anessa-milk-sunscreen`,
      `laneige-sleeping-mask`
    ],
    content: {
      "pt-BR": {
        title: `Própolis na Skincare: O Segredo do Brilho Coreano`,
        excerpt: `A própolis é o ingrediente secreto por trás do brilho saudável que você vê nas coreanas. Antibacteriano, calmante e iluminador.`,
        body: `<p>A <strong>própolis</strong> — a resina que as abelhas produzem para proteger a colmeia — é um dos ingredientes mais subestimados da K-beauty. Rica em flavonoides e compostos fenólicos, ela oferece três benefícios em um: ação <strong>antibacteriana</strong>, efeito <strong>calmante</strong> e um boost de <strong>luminosidade</strong> natural.</p><h3>Para quem serve</h3><p>A própolis é o ingrediente coringa: funciona para pele acneica (combate bactérias sem ressecar), pele sensível (reduz vermelhidão) e pele opaca (restaura a vitalidade). É o tipo de produto que você usa quando sua pele está "estranha" e precisa voltar ao normal.</p><h3>Como usar</h3><p>O sérum de própolis entra depois do toner. A textura é levemente viscosa mas absorve rápido. Use de manhã para aquele glow que dura o dia.</p>`
      },
      en: {
        title: `Propolis in Skincare: The Secret to Korean Glow`,
        excerpt: `Propolis is the secret ingredient behind that healthy Korean glow. Antibacterial, soothing, and brightening.`,
        body: `<p><strong>Propolis</strong> — the resin bees produce to protect the hive — is one of K-beauty's most underrated ingredients. It delivers three benefits in one: <strong>antibacterial</strong> action, <strong>soothing</strong> effect, and a natural <strong>glow</strong> boost.</p><h3>Who It's For</h3><p>Propolis is the MVP ingredient: acne-prone skin (fights bacteria without drying), sensitive skin (reduces redness), and dull skin (restores vitality).</p><h3>How to Use</h3><p>Apply propolis serum after toner. The texture is slightly viscous but absorbs quickly. Use in the morning for all-day glow.</p>`
      },
      zhHK: {
        title: `熱帶夏季護膚：生存指南`,
        excerpt: `高溫、潮濕、強紫外線——熱帶夏天對皮膚是嚴峻考驗。用韓式護膚方案度過最熱的季節。`,
        body: `<p>熱帶夏天讓任何護膚流程都面臨大考。韓妝比厚重的歐美產品更適合高溫環境。</p><h3>夏日調整</h3><h4>換質地</h4><p>面霜換啫喱，卸妝油換卸妝水。一切厚重質地都會在高溫中"融化"。</p><h4>冰鎮爽膚水</h4><p>把爽膚水放進冰箱。用手拍3層——冷热溫差收縮毛孔，層層補水防止出油。</p><h4>韓式防曬更好用</h4><p>新一代化學防曬劑（Tinosorb、Uvinul）更輕薄，不留白痕，汗水下更穩定。<strong>每2-3小時補塗</strong>。</p><h4>早晨精簡：精華水+防曬足夠</h4><p>柔和潔面→清涼精華水→防曬。層數越少越不容易"融化"。</p>`
      },
      es: {
        title: `Própolis en Skincare: El Secreto del Brillo Coreano`,
        excerpt: `La própolis es el ingrediente secreto del brillo coreano. Antibacteriano, calmante e iluminador.`,
        body: `<p><strong>Própolis</strong> — tres beneficios en uno: <strong>antibacteriano</strong>, <strong>calmante</strong> y potenciador de <strong>brillo</strong>.</p><h3>Para quién</h3><p>Piel con acné, piel sensible y piel apagada. Aplica el sérum después del tónico.</p>`
      }
    },
    faq: {}
  },
  {
    slug: `rotina-skincare-pele-oleosa`,
    category: `rotinas`,
    coverGradient: `linear-gradient(135deg, #e8e8e8 0%, #dbdbdb 50%, #cccccc 100%)`,
    waterDrop: false,
    readTime: 5,
    date: `2026-07-06`,
    author: {
      "pt-BR": `Equipe F&J`,
      en: `F&J Team`,
      zhHK: `F&J 團隊`,
      es: `Equipo F&J`
    },
    tags: {
      "pt-BR": [
        `minimalista`,
        `rotina simples`,
        `iniciante`,
        `k-beauty`
      ],
      en: [
        `minimalist`,
        `simple routine`,
        `beginner`
      ],
      zhHK: [
        `極簡`,
        `簡易流程`,
        `入門`
      ],
      es: [
        `minimalista`,
        `rutina simple`,
        `principiante`
      ]
    },
    relatedProducts: [
      `cosrx-snail-essence`,
      `beauty-of-joseon-serum`,
      `anessa-milk-sunscreen`
    ],
    content: {
      "pt-BR": {
        title: `Rotina de Skincare Coreana para Pele Oleosa`,
        excerpt: `Pele oleosa também precisa de hidratação — essa é a grande lição da K-beauty. Monte a rotina que controla a oleosidade sem agredir a pele.`,
        body: `<p>O maior erro que quem tem pele oleosa comete? <strong>Ressecar a pele para controlar o brilho</strong>. A K-beauty ensina o contrário: uma pele bem hidratada produz menos óleo, porque não precisa compensar o ressecamento.</p><h3>Rotina ideal para pele oleosa</h3><h4>Manhã (5 passos)</h4><ol><li>Cleanser em gel (pH baixo) — limpa sem desidratar</li><li>Toner com BHA — controla a oleosidade e desobstrui poros</li><li>Sérum de niacinamida — regula sebo e minimiza poros</li><li>Hidratante em gel — textura leve, água como base</li><li>Protetor solar oil-free FPS 50 — indispensável</li></ol><h4>Noite (6 passos)</h4><ol><li>Cleansing oil leve — dissolve protetor e maquiagem</li><li>Cleanser em gel</li><li>Toner com BHA (ou AHA 2x/semana)</li><li>Sérum de niacinamida</li><li>Essence leve com centella — acalma e hidrata</li><li>Gel hidratante final</li></ol><h3>Erro comum</h3><p>Pular o hidratante. Não pule. Escolha texturas em gel ou water-cream, que hidratam sem pesar. Sua pele vai agradecer com menos oleosidade ao longo do dia.</p>`
      },
      en: {
        title: `Korean Skincare Routine for Oily Skin`,
        excerpt: `Oily skin also needs hydration — that's the big K-beauty lesson. Build a routine that controls oil without stripping.`,
        body: `<p>The biggest mistake oily skin types make? <strong>Drying out the skin to control shine</strong>. K-beauty teaches the opposite: well-hydrated skin produces less oil.</p><h3>Ideal Routine</h3><h4>Morning (5 steps)</h4><ol><li>Gel cleanser (low pH)</li><li>BHA toner — controls oil, clears pores</li><li>Niacinamide serum — regulates sebum</li><li>Gel moisturizer — lightweight, water-based</li><li>Oil-free SPF 50 — non-negotiable</li></ol><h4>Night (6 steps)</h4><ol><li>Light cleansing oil</li><li>Gel cleanser</li><li>BHA toner (or AHA 2x/week)</li><li>Niacinamide serum</li><li>Light centella essence</li><li>Final gel moisturizer</li></ol>`
      },
      zhHK: {
        title: `韓式極簡護膚：5步見效`,
        excerpt: `沒時間做10步？精簡流程用正確產品，一半精力拿到80%效果。`,
        body: `<p>好消息：不需要10步也能拿到好結果。</p><h3>5步極簡法</h3><h4>晨間</h4><ol><li><strong>溫和潔面（或清水）</strong></li><li><strong>多功能精華</strong>——補水+抗氧合一</li><li><strong>防曬 SPF 50+</strong></li></ol><h4>夜間</h4><ol><li><strong>卸妝油</strong></li><li><strong>溫和潔面</strong></li><li><strong>精華水</strong>——替代爽膚水+精華</li><li><strong>清爽乳液</strong></li></ol><p>守住三大支柱：<strong>清潔、補水、防護</strong>。你真的在堅持的流程才是最好的流程。</p>`
      },
      es: {
        title: `Rutina Coreana para Piel Grasa`,
        excerpt: `La piel grasa también necesita hidratación. Construye una rutina que controle el brillo sin agredir.`,
        body: `<p>El mayor error: <strong>resecar la piel para controlar el brillo</strong>. La K-beauty enseña lo contrario: piel hidratada = menos producción de grasa.</p><h3>Rutina ideal</h3><h4>Mañana</h4><ol><li>Gel limpiador pH bajo</li><li>Tónico con BHA</li><li>Sérum de niacinamida</li><li>Hidratante en gel</li><li>FPS 50 oil-free</li></ol>`
      }
    },
    faq: {}
  },
  {
    slug: `ritual-noturno-anti-idade-coreano`,
    category: ``,
    coverGradient: ``,
    waterDrop: false,
    readTime: 5,
    date: ``,
    author: {
      "pt-BR": `Equipe F&J`,
      en: `F&J Team`,
      zhHK: `F&J 團隊`,
      es: `Equipo F&J`
    },
    tags: {
      "pt-BR": [],
      en: [],
      zhHK: [],
      es: []
    },
    relatedProducts: [],
    content: {
      "pt-BR": {
        title: `Ritual Noturno Anti-Idade Coreano: O Que Realmente Funciona`,
        excerpt: `A noite é quando a pele se regenera. Monte um ritual noturno com ativos coreanos que comprovadamente combatem os sinais do tempo.`,
        body: `<p>Enquanto você dorme, sua pele trabalha. A circulação aumenta, a renovação celular acelera e a barreira cutânea se reconstrói. O ritual noturno coreano potencializa cada um desses processos com os ativos certos.</p><h3>Rotina noturna anti-idade (7 passos)</h3><ol><li><strong>Cleansing Oil</strong> — massageie por 1 minuto para estimular a circulação</li><li><strong>Cleanser suave</strong> — pH baixo, sem sulfato</li><li><strong>Toner com AHA/PHA</strong> — 2-3x/semana, renovação celular suave</li><li><strong>Essence de ginseng</strong> — estimula colágeno, melhora elasticidade</li><li><strong>Sérum de retinol</strong> — comece 2x/semana, aumente gradualmente. O padrão ouro anti-idade.</li><li><strong>Creme para olhos com peptídeos</strong> — área mais fina precisa de ativos específicos</li><li><strong>Creme nutritivo ou sleeping mask</strong> — sela tudo com ceramidas e esqualano</li></ol><h3>Regra de ouro</h3><p>Retinol e AHA não devem ser usados na mesma noite. Alterne: uma noite com foco em renovação (AHA), outra em regeneração (retinol). Sempre finalize com protetor solar na manhã seguinte — ambos aumentam a fotossensibilidade.</p>`
      },
      en: {
        title: `Korean Anti-Aging Night Ritual: What Really Works`,
        excerpt: `Night is when skin regenerates. Build a Korean night ritual with proven actives that fight the signs of aging.`,
        body: `<p>While you sleep, your skin is working — circulation increases, cell turnover accelerates, the barrier rebuilds. The Korean night ritual amplifies each process with the right actives.</p><h3>Night anti-aging routine (7 steps)</h3><ol><li><strong>Cleansing Oil</strong> — massage 1 minute for circulation</li><li><strong>Gentle cleanser</strong> — low pH, sulfate-free</li><li><strong>AHA/PHA toner</strong> — 2-3x/week, gentle renewal</li><li><strong>Ginseng essence</strong> — boosts collagen and elasticity</li><li><strong>Retinol serum</strong> — start 2x/week, build up. Gold standard anti-aging.</li><li><strong>Peptide eye cream</strong></li><li><strong>Rich cream or sleeping mask</strong> — seal with ceramides</li></ol><h3>Golden rule</h3><p>Never use retinol and AHA on the same night. Alternate: one night renewal (AHA), next night regeneration (retinol). Always SPF the next morning.</p>`
      },
      zhHK: {
        title: `Korean Anti-Aging Night Ritual: What Really Works`,
        excerpt: `Night is when skin regenerates. Build a Korean night ritual with proven actives that fight the signs of aging.`,
        body: `<p>While you sleep, your skin is working — circulation increases, cell turnover accelerates, the barrier rebuilds. The Korean night ritual amplifies each process with the right actives.</p><h3>Night anti-aging routine (7 steps)</h3><ol><li><strong>Cleansing Oil</strong> — massage 1 minute for circulation</li><li><strong>Gentle cleanser</strong> — low pH, sulfate-free</li><li><strong>AHA/PHA toner</strong> — 2-3x/week, gentle renewal</li><li><strong>Ginseng essence</strong> — boosts collagen and elasticity</li><li><strong>Retinol serum</strong> — start 2x/week, build up. Gold standard anti-aging.</li><li><strong>Peptide eye cream</strong></li><li><strong>Rich cream or sleeping mask</strong> — seal with ceramides</li></ol><h3>Golden rule</h3><p>Never use retinol and AHA on the same night. Alternate: one night renewal (AHA), next night regeneration (retinol). Always SPF the next morning.</p>`
      },
      es: {
        title: `Ritual Nocturno Anti-Edad Coreano`,
        excerpt: `La noche es cuando la piel se regenera. Construye un ritual nocturno coreano que combata los signos del envejecimiento.`,
        body: `<p>Mientras duermes, tu piel trabaja. El ritual coreano potencia cada proceso con los activos correctos.</p><h3>Rutina nocturna (7 pasos)</h3><ol><li><strong>Aceite limpiador</strong></li><li><strong>Limpiador suave</strong></li><li><strong>Tónico AHA/PHA</strong> — 2-3x/semana</li><li><strong>Esencia de ginseng</strong></li><li><strong>Sérum de retinol</strong> — empieza 2x/semana</li><li><strong>Contorno de ojos con péptidos</strong></li><li><strong>Crema o mascarilla nocturna</strong></li></ol><p>No uses retinol y AHA la misma noche. Alterna y usa FPS al día siguiente.</p>`
      }
    },
    faq: {}
  },
  {
    slug: `skincare-verao-clima-tropical`,
    category: ``,
    coverGradient: ``,
    waterDrop: false,
    readTime: 5,
    date: ``,
    author: {
      "pt-BR": `Equipe F&J`,
      en: `F&J Team`,
      zhHK: `F&J 團隊`,
      es: `Equipo F&J`
    },
    tags: {
      "pt-BR": [],
      en: [],
      zhHK: [],
      es: []
    },
    relatedProducts: [],
    content: {
      "pt-BR": {
        title: `Skincare de Verão para Clima Tropical: Guia de Sobrevivência`,
        excerpt: `Calor, umidade, sol intenso — o verão tropical maltrata a pele. Adapte sua rotina coreana para brilhar (do jeito certo) na estação mais quente.`,
        body: `<p>O verão tropical — especialmente no Brasil — é um teste de resistência para qualquer rotina de skincare. A K-beauty tem soluções que funcionam melhor no calor do que qualquer fórmula pesada ocidental.</p><h3>Adaptações para o calor</h3><h4>Troque texturas</h4><p>Substitua cremes por géis. Substitua cleansing oil por cleansing water. Tudo que for pesado vai derreter no calor — e a sensação não é nada agradável.</p><h4>Refresque seu toner</h4><p>Guarde o toner na geladeira. Aplique em 3 camadas com as mãos — o choque térmico fecha poros e a hidratação em camadas evita que a pele produza óleo em excesso.</p><h4>Protetor solar coreano é superior</h4><p>Protetores coreanos usam filtros químicos de nova geração (como Tinosorb e Uvinul) que são mais leves, não deixam resíduo branco e resistem melhor ao suor. Para o verão tropical, <strong>re-aplique a cada 2-3 horas</strong>.</p><h4>Essence + FPS é suficiente de manhã</h4><p>No pico do verão, você pode simplificar a rotina matinal para: cleanser suave → essence refrescante → protetor solar. Menos camadas = menos chance de derreter.</p><h3>Não negligencie a noite</h3><p>Mesmo no calor, a noite pede reparação. Use um sérum de centella (acalma o calor acumulado) e um gel hidratante leve. Se tiver ar condicionado no quarto, não pule o hidratante — o ar seco resseca mais do que você imagina.</p>`
      },
      en: {
        title: `Summer Skincare for Tropical Climates: Survival Guide`,
        excerpt: `Heat, humidity, intense sun — tropical summers are brutal on skin. Adapt your Korean routine for the hottest season.`,
        body: `<p>Tropical summer puts any routine to the test. K-beauty has solutions that work far better in heat than heavy Western formulas.</p><h3>Heat adaptations</h3><h4>Switch textures</h4><p>Replace creams with gels. Replace cleansing oil with cleansing water. Heavy textures melt in heat.</p><h4>Chill your toner</h4><p>Keep toner in the fridge. Apply 3 layers with hands — thermal shock tightens pores, layered hydration prevents excess oil.</p><h4>Korean sunscreen is superior</h4><p>Next-gen chemical filters (Tinosorb, Uvinul) are lighter, leave no white cast, and resist sweat better. <strong>Reapply every 2-3 hours</strong>.</p><h4>Essence + SPF is enough for morning</h4><p>Simplify: gentle cleanser → cooling essence → SPF. Fewer layers = less melting.</p>`
      },
      zhHK: {
        title: `Summer Skincare for Tropical Climates: Survival Guide`,
        excerpt: `Heat, humidity, intense sun — tropical summers are brutal on skin. Adapt your Korean routine for the hottest season.`,
        body: `<p>Tropical summer puts any routine to the test. K-beauty has solutions that work far better in heat than heavy Western formulas.</p><h3>Heat adaptations</h3><h4>Switch textures</h4><p>Replace creams with gels. Replace cleansing oil with cleansing water. Heavy textures melt in heat.</p><h4>Chill your toner</h4><p>Keep toner in the fridge. Apply 3 layers with hands — thermal shock tightens pores, layered hydration prevents excess oil.</p><h4>Korean sunscreen is superior</h4><p>Next-gen chemical filters (Tinosorb, Uvinul) are lighter, leave no white cast, and resist sweat better. <strong>Reapply every 2-3 hours</strong>.</p><h4>Essence + SPF is enough for morning</h4><p>Simplify: gentle cleanser → cooling essence → SPF. Fewer layers = less melting.</p>`
      },
      es: {
        title: `Skincare de Verano en Clima Tropical: Guía de Supervivencia`,
        excerpt: `El verano tropical castiga la piel. Adapta tu rutina coreana para brillar correctamente en la estación más caliente.`,
        body: `<p>El verano tropical es una prueba para la piel. Las texturas coreanas funcionan mejor en calor que las fórmulas occidentales pesadas.</p><h3>Adaptaciones</h3><h4>Cambia texturas</h4><p>Cremas por geles. Aceite limpiador por agua limpiadora. Lo pesado se derrite.</p><h4>Tónico frío</h4><p>Guarda el tónico en la nevera. Aplica 3 capas — el choque térmico cierra poros.</p><h4>FPS coreano superior</h4><p>Filtros de nueva generación, más ligeros, sin residuo blanco. <strong>Reaplica cada 2-3h</strong>.</p>`
      }
    },
    faq: {}
  },
  {
    slug: `rotina-minimalista-5-passos`,
    category: ``,
    coverGradient: ``,
    waterDrop: false,
    readTime: 5,
    date: ``,
    author: {
      "pt-BR": `Equipe F&J`,
      en: `F&J Team`,
      zhHK: `F&J 團隊`,
      es: `Equipo F&J`
    },
    tags: {
      "pt-BR": [],
      en: [],
      zhHK: [],
      es: []
    },
    relatedProducts: [],
    content: {
      "pt-BR": {
        title: `Rotina Coreana Minimalista: Só 5 Passos que Funcionam`,
        excerpt: `Não tem tempo (ou paciência) para 10 passos? Esta rotina enxuta entrega 80% dos resultados com metade do esforço.`,
        body: `<p>Nem todo mundo quer — ou consegue — seguir 10 passos por dia. A boa notícia: você não precisa. Uma rotina enxuta com os produtos certos entrega resultados impressionantes.</p><h3>Os 5 passos essenciais</h3><h4>Manhã</h4><ol><li><strong>Cleanser suave (ou só água)</strong> — de manhã, água morna já é suficiente para a maioria das peles</li><li><strong>Sérum multifuncional</strong> — escolha um que una hidratação + antioxidante (ex: sérum de mucina com niacinamida)</li><li><strong>Protetor solar</strong> — FPS 50+, sempre, sem exceção</li></ol><h4>Noite</h4><ol><li><strong>Cleansing oil</strong> — remove tudo acumulado do dia</li><li><strong>Cleanser suave</strong></li><li><strong>Essence hidratante</strong> — camada fina que substitui toner + sérum</li><li><strong>Gel ou loção hidratante</strong></li><li><strong>Protetor labial</strong> — a área mais esquecida e a que mais denuncia a idade</li></ol><h3>Por que funciona</h3><p>Você mantém os três pilares: <strong>limpar, hidratar, proteger</strong> — enquanto reduz o número de produtos trocando por multifuncionais. Menos fricção na pele, menos chance de irritação, mais adesão à rotina. E rotina que você <em>realmente faz</em> é a que funciona.</p>`
      },
      en: {
        title: `Minimalist Korean Routine: Just 5 Steps That Work`,
        excerpt: `No time for 10 steps? This streamlined routine delivers 80% of results with half the effort.`,
        body: `<p>Not everyone wants — or can manage — 10 steps daily. Good news: you don't need to. A lean routine with the right products delivers impressive results.</p><h3>The 5 Essential Steps</h3><h4>Morning</h4><ol><li><strong>Gentle cleanser (or just water)</strong> — warm water is often enough</li><li><strong>Multifunctional serum</strong> — hydration + antioxidant in one</li><li><strong>Sunscreen</strong> — SPF 50+, always</li></ol><h4>Night</h4><ol><li><strong>Cleansing oil</strong></li><li><strong>Gentle cleanser</strong></li><li><strong>Hydrating essence</strong> — replaces toner + serum</li><li><strong>Gel or light lotion</strong></li></ol><p>You keep the three pillars: <strong>cleanse, hydrate, protect</strong>. Fewer products = less friction, less irritation, better adherence. The routine you <em>actually do</em> is the one that works.</p>`
      },
      zhHK: {
        title: `Minimalist Korean Routine: Just 5 Steps That Work`,
        excerpt: `No time for 10 steps? This streamlined routine delivers 80% of results with half the effort.`,
        body: `<p>Not everyone wants — or can manage — 10 steps daily. Good news: you don't need to. A lean routine with the right products delivers impressive results.</p><h3>The 5 Essential Steps</h3><h4>Morning</h4><ol><li><strong>Gentle cleanser (or just water)</strong> — warm water is often enough</li><li><strong>Multifunctional serum</strong> — hydration + antioxidant in one</li><li><strong>Sunscreen</strong> — SPF 50+, always</li></ol><h4>Night</h4><ol><li><strong>Cleansing oil</strong></li><li><strong>Gentle cleanser</strong></li><li><strong>Hydrating essence</strong> — replaces toner + serum</li><li><strong>Gel or light lotion</strong></li></ol><p>You keep the three pillars: <strong>cleanse, hydrate, protect</strong>. Fewer products = less friction, less irritation, better adherence. The routine you <em>actually do</em> is the one that works.</p>`
      },
      es: {
        title: `Rutina Coreana Minimalista: Solo 5 Pasos`,
        excerpt: `Sin tiempo para 10 pasos? Esta rutina simplificada da el 80% de resultados con la mitad del esfuerzo.`,
        body: `<p>No necesitas 10 pasos. Una rutina simplificada con buenos productos funciona.</p><h3>5 pasos</h3><h4>Mañana</h4><ol><li><strong>Limpiador suave</strong></li><li><strong>Sérum multifunción</strong></li><li><strong>FPS 50+</strong></li></ol><h4>Noche</h4><ol><li><strong>Aceite limpiador</strong></li><li><strong>Limpiador suave</strong></li><li><strong>Esencia hidratante</strong></li><li><strong>Gel o loción</strong></li></ol><p>Tres pilares: <strong>limpiar, hidratar, proteger</strong>. La rutina que realmente haces es la que funciona.</p>`
      }
    },
    faq: {}
  }
];

// Export for use in blog pages
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BLOG_CATEGORIES, blogArticles };
}
