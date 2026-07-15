// ========================================
// F&J — Age Verification Gate
// i18n-aware: reads current language from i18n.js
// ========================================

(function() {
  'use strict';

  const AGE_VERIFIED_KEY = 'fj_age_verified';

  // Already verified this session
  if (sessionStorage.getItem(AGE_VERIFIED_KEY) === 'true') return;

  // Always show age verification in English, regardless of site language
  function getText(key, fallback) {
    // Use I18N.en directly — forces English for age gate
    if (typeof I18N !== 'undefined' && I18N.en && I18N.en[key]) {
      return I18N.en[key];
    }
    return fallback;
  }

  // Build HTML with translated text
  const overlayHTML = `
    <div id="age-gate" style="
      position: fixed; inset: 0; z-index: 99999;
      background: rgba(26,18,18,0.92);
      backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    ">
      <div style="
        background: #FAF7F4; border-radius: 16px;
        padding: 3rem 2.5rem; max-width: 440px; width: 90%;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      ">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔞</div>
        <h2 id="age-title" style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.75rem; margin-bottom: 0.75rem; color: #1A1212;">
          ${getText('age.title', 'Age Verification')}
        </h2>
        <p id="age-body" style="color: #7A6E6E; margin-bottom: 1.5rem; font-size: 0.95rem; line-height: 1.6;">
          ${getText('age.body', 'You must be <strong>18 years or older</strong> to access this store. By confirming, you declare you are of legal age.')}
        </p>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <button id="age-confirm" style="
            background: #1A1212; color: white; border: none;
            padding: 0.875rem; border-radius: 8px;
            font-size: 1rem; font-weight: 600; cursor: pointer;
            transition: background 0.2s;
          ">${getText('age.confirm', 'Yes, I am 18 or older')}</button>
          <button id="age-deny" style="
            background: transparent; color: #7A6E6E; border: 1.5px solid #E8E0DC;
            padding: 0.875rem; border-radius: 8px;
            font-size: 0.9rem; cursor: pointer;
            transition: all 0.2s;
          ">${getText('age.deny', 'I am not 18')}</button>
        </div>
        <p id="age-terms" style="font-size: 0.75rem; color: #B0A5A5; margin-top: 1.25rem;">
          ${getText('age.terms', 'By clicking "Yes", you also agree to our <a href="terms.html" style="color: #8B3A4A;">Terms of Service</a> and <a href="privacy.html" style="color: #8B3A4A;">Privacy Policy</a>.')}
        </p>
      </div>
    </div>

    <div id="age-deny-message" style="
      position: fixed; inset: 0; z-index: 100000;
      background: rgba(26,18,18,0.95);
      backdrop-filter: blur(8px);
      display: none; align-items: center; justify-content: center;
      font-family: 'Inter', sans-serif;
    ">
      <div style="text-align: center; color: white; max-width: 400px; padding: 2rem;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">🚫</div>
        <h2 id="age-restricted-title" style="color: white; font-family: 'Playfair Display', serif; font-size: 1.75rem; margin-bottom: 1rem;">
          ${getText('age.restricted_title', 'Access Restricted')}
        </h2>
        <p id="age-restricted-body" style="opacity: 0.8; line-height: 1.6; margin-bottom: 1.5rem;">
          ${getText('age.restricted_body', 'Sorry, you must be 18 or older to access our cosmetic store.')}
        </p>
        <p id="age-redirect" style="font-size: 0.8rem; opacity: 0.5;">
          ${getText('age.redirect', 'You will be redirected in <span id="age-countdown">10</span> seconds...')}
        </p>
      </div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = overlayHTML;
  document.body.appendChild(container);

  // Confirm age
  document.getElementById('age-confirm').addEventListener('click', () => {
    sessionStorage.setItem(AGE_VERIFIED_KEY, 'true');
    document.getElementById('age-gate').style.opacity = '0';
    document.getElementById('age-gate').style.transition = 'opacity 0.3s';
    setTimeout(() => { document.getElementById('age-gate').remove(); }, 350);
  });

  // Deny age
  document.getElementById('age-deny').addEventListener('click', () => {
    document.getElementById('age-gate').style.display = 'none';
    const denyMsg = document.getElementById('age-deny-message');
    denyMsg.style.display = 'flex';

    let count = 10;
    const countdownEl = document.getElementById('age-countdown');
    const interval = setInterval(() => {
      count--;
      countdownEl.textContent = count;
      if (count <= 0) {
        clearInterval(interval);
        window.location.href = 'https://www.google.com';
      }
    }, 1000);
  });

})();
