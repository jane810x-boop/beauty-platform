// ========================================
// F&J - Product Reviews System
// 評價系統：支持 API 後端 + localStorage 降級
// ========================================

const REVIEWS_KEY = 'fj_reviews';

// 從 localStorage 獲取評價
function getLocalReviews(productSlug) {
  try {
    const all = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '{}');
    return all[productSlug] || [];
  } catch { return []; }
}

// 保存評價到 localStorage
function saveLocalReview(productSlug, review) {
  const all = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '{}');
  if (!all[productSlug]) all[productSlug] = [];
  all[productSlug].unshift(review);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(all));
}

// 獲取評價（優先 API，降級 localStorage）
async function fetchReviews(productSlug) {
  try {
    const data = await API.reviews.list(productSlug);
    return data.reviews || [];
  } catch {
    return getLocalReviews(productSlug);
  }
}

// 提交評價（優先 API，降級 localStorage）
async function submitReview(productSlug, reviewData) {
  try {
    const data = await API.reviews.add(productSlug, reviewData);
    return data.review;
  } catch {
    const review = {
      id: 'r-' + Date.now(),
      productSlug,
      ...reviewData,
      createdAt: new Date().toISOString()
    };
    saveLocalReview(productSlug, review);
    return review;
  }
}

// 渲染評價列表
function renderReviews(reviews, container) {
  if (!reviews.length) {
    container.innerHTML = `
      <div class="reviews-empty">
        <div class="reviews-empty-icon">✍️</div>
        <p>${typeof t === 'function' ? t('reviews.empty') : 'No reviews yet. Be the first to share your thoughts!'}</p>
      </div>`;
    return;
  }

  // 评分分佈
  const distribution = [0, 0, 0, 0, 0]; // 1-5 stars
  reviews.forEach(r => {
    const score = Math.round(r.rating);
    if (score >= 1 && score <= 5) distribution[score - 1]++;
  });

  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const distHTML = distribution.map((count, i) => {
    const star = 5 - i;
    const pct = reviews.length ? (count / reviews.length * 100) : 0;
    return `
      <div class="review-dist-row">
        <span class="review-dist-label">${star}★</span>
        <div class="review-dist-bar"><div class="review-dist-fill" style="width:${pct}%"></div></div>
        <span class="review-dist-count">${count}</span>
      </div>`;
  }).join('');

  // 評價列表
  const listHTML = reviews.map(r => {
    const stars = '★'.repeat(Math.floor(r.rating)) + (r.rating % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(r.rating));
    const date = new Date(r.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    const initials = (r.name || 'A').charAt(0).toUpperCase();
    return `
      <div class="review-item">
        <div class="review-avatar">${initials}</div>
        <div class="review-body">
          <div class="review-header">
            <span class="review-name">${escapeHtml(r.name)}</span>
            <span class="review-stars">${stars}</span>
            <span class="review-date">${date}</span>
          </div>
          ${r.title ? `<div class="review-title">${escapeHtml(r.title)}</div>` : ''}
          <p class="review-text">${escapeHtml(r.text)}</p>
          ${r.verified ? '<span class="review-verified">✓ Verified Purchase</span>' : ''}
        </div>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="reviews-summary">
      <div class="reviews-summary-score">
        <div class="reviews-avg">${avgRating.toFixed(1)}</div>
        <div class="reviews-avg-stars">${'★'.repeat(Math.round(avgRating))}${'☆'.repeat(5 - Math.round(avgRating))}</div>
        <div class="reviews-total">${reviews.length} ${typeof t === 'function' ? t('reviews.count') : 'reviews'}</div>
      </div>
      <div class="reviews-distribution">${distHTML}</div>
    </div>
    <div class="reviews-list">${listHTML}</div>`;
}

// 渲染評價表單
function renderReviewForm(productSlug, container) {
  // 檢查是否已登入
  let user = null;
  try { user = Auth.getUser(); } catch(e) {} 
  const userName = user ? user.name : '';

  container.innerHTML = `
    <div class="review-form-wrap">
      <h4 class="review-form-title">${typeof t === 'function' ? t('reviews.write') : 'Write a Review'}</h4>
      <form id="review-form" onsubmit="submitReviewHandler(event, '${productSlug}')">
        <div class="review-form-row">
          <label class="review-form-label">${typeof t === 'function' ? t('reviews.your_name') : 'Your Name'}</label>
          <input type="text" id="review-name" class="review-form-input" value="${escapeHtml(userName)}" required placeholder="${typeof t === 'function' ? t('reviews.name_placeholder') : 'e.g. Sarah K.'}">
        </div>
        <div class="review-form-row">
          <label class="review-form-label">${typeof t === 'function' ? t('reviews.rating') : 'Rating'}</label>
          <div class="review-rating-select" id="review-rating-select">
            ${[5,4,3,2,1].map(n => `<button type="button" class="review-star-btn" data-rating="${n}" onclick="selectRating(${n})">${'★'.repeat(n)}${'☆'.repeat(5-n)}</button>`).join('')}
          </div>
          <input type="hidden" id="review-rating-value" value="0" required>
        </div>
        <div class="review-form-row">
          <label class="review-form-label">${typeof t === 'function' ? t('reviews.title') : 'Title (optional)'}</label>
          <input type="text" id="review-title" class="review-form-input" placeholder="${typeof t === 'function' ? t('reviews.title_placeholder') : 'Summarize your experience'}">
        </div>
        <div class="review-form-row">
          <label class="review-form-label">${typeof t === 'function' ? t('reviews.review') : 'Review'}</label>
          <textarea id="review-text" class="review-form-textarea" rows="4" required placeholder="${typeof t === 'function' ? t('reviews.text_placeholder') : 'What did you like or dislike? How did it work for your skin?'}"></textarea>
        </div>
        <button type="submit" class="btn btn-primary review-form-submit">${typeof t === 'function' ? t('reviews.submit') : 'Submit Review'}</button>
      </form>
    </div>`;
}

// 選擇评分
function selectRating(n) {
  document.getElementById('review-rating-value').value = n;
  document.querySelectorAll('.review-star-btn').forEach(btn => {
    btn.classList.toggle('selected', parseInt(btn.dataset.rating) === n);
  });
}

// 提交評價
async function submitReviewHandler(event, productSlug) {
  event.preventDefault();
  const name = document.getElementById('review-name').value.trim();
  const rating = parseInt(document.getElementById('review-rating-value').value);
  const title = document.getElementById('review-title').value.trim();
  const text = document.getElementById('review-text').value.trim();
  const submitBtn = event.target.querySelector('.review-form-submit');

  if (rating === 0) {
    showToast(typeof t === 'function' ? t('reviews.select_rating') : 'Please select a rating');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = '...';

  try {
    await submitReview(productSlug, { name, rating, title, text, verified: false });
    showToast(typeof t === 'function' ? t('reviews.submitted') : 'Review submitted! Thank you.');
    // 刷新評價列表
    const reviews = await fetchReviews(productSlug);
    renderReviews(reviews, document.getElementById('reviews-list'));
    // 清空表單
    document.getElementById('review-form').reset();
    selectRating(0);
  } catch (e) {
    showToast('Failed to submit review');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = typeof t === 'function' ? t('reviews.submit') : 'Submit Review';
  }
}

// HTML 轉義
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

// 初始化評價區域（在 product.html 中調用）
async function initReviews(productSlug) {
  const listContainer = document.getElementById('reviews-list');
  const formContainer = document.getElementById('review-form-container');
  if (!listContainer) return;

  // 顯示加載中
  listContainer.innerHTML = '<div class="reviews-loading">Loading reviews...</div>';

  // 加載評價
  const reviews = await fetchReviews(productSlug);
  renderReviews(reviews, listContainer);

  // 渲染表單
  if (formContainer) {
    renderReviewForm(productSlug, formContainer);
  }
}
