// ========================================
// F&J — LGPD Cookie Consent Banner
// Brazil LGPD (Lei 13.709/2018) Compliant
// ========================================

(function() {
  'use strict';

  const COOKIE_CONSENT_KEY = 'fj_cookie_consent';

  // Check if consent already given
  const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (savedConsent) {
    // Apply saved preferences
    applyConsent(JSON.parse(savedConsent));
    return;
  }

  // Inject banner HTML
  const bannerHTML = `
    <div id="lgpd-banner" style="
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;
      background: #1A1212; color: rgba(255,255,255,0.9);
      padding: 1.25rem 2rem;
      display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
      gap: 1rem;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.2);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 0.875rem;
      line-height: 1.6;
      transform: translateY(100%);
      transition: transform 0.4s ease;
    ">
      <div style="flex: 1; min-width: 280px; max-width: 700px;">
        <p style="margin: 0;">
          <strong>🍪 Este site usa cookies</strong><br>
          Utilizamos cookies essenciais para o funcionamento do site e cookies de análise para melhorar sua experiência. 
          Com seu consentimento, também podemos usar cookies de marketing. 
          Veja nossa <a href="privacy.html" style="color: #C4A35A; text-decoration: underline;">Política de Privacidade</a>.
        </p>
      </div>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button id="lgpd-preferences" style="
          background: transparent; border: 1px solid rgba(255,255,255,0.3); color: white;
          padding: 0.6rem 1.25rem; border-radius: 6px; font-size: 0.85rem; cursor: pointer;
          white-space: nowrap; transition: border-color 0.2s;
        ">Preferências</button>
        <button id="lgpd-reject" style="
          background: transparent; border: 1px solid rgba(255,255,255,0.3); color: white;
          padding: 0.6rem 1.25rem; border-radius: 6px; font-size: 0.85rem; cursor: pointer;
          white-space: nowrap; transition: border-color 0.2s;
        ">Rejeitar</button>
        <button id="lgpd-accept" style="
          background: #C4A35A; border: none; color: #1A1212;
          padding: 0.6rem 1.5rem; border-radius: 6px; font-size: 0.85rem; font-weight: 600;
          cursor: pointer; white-space: nowrap; transition: background 0.2s;
        ">Aceitar Todos</button>
      </div>
    </div>

    <div id="lgpd-preferences-panel" style="
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 10000;
      background: #1A1212; color: rgba(255,255,255,0.9);
      padding: 2rem;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.25);
      font-family: 'Inter', sans-serif;
      font-size: 0.875rem;
      display: none;
    ">
      <h3 style="color: white; margin-bottom: 1rem; font-family: 'Playfair Display', serif;">Preferências de Cookies</h3>
      <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
        <label style="display: flex; align-items: flex-start; gap: 0.75rem; opacity: 0.7; cursor: not-allowed;">
          <input type="checkbox" checked disabled style="margin-top: 3px; accent-color: #C4A35A;">
          <div>
            <strong style="color: white;">Essenciais</strong>
            <p style="margin: 0.25rem 0 0; font-size: 0.8rem; opacity: 0.7;">Necessários para o funcionamento do site (carrinho, checkout, segurança). Sempre ativos.</p>
          </div>
        </label>
        <label style="display: flex; align-items: flex-start; gap: 0.75rem; cursor: pointer;">
          <input type="checkbox" id="lgpd-analytics" style="margin-top: 3px; accent-color: #C4A35A;">
          <div>
            <strong style="color: white;">Análise</strong>
            <p style="margin: 0.25rem 0 0; font-size: 0.8rem; opacity: 0.7;">Ajudam-nos a entender como você usa o site para melhorá-lo (Google Analytics, etc).</p>
          </div>
        </label>
        <label style="display: flex; align-items: flex-start; gap: 0.75rem; cursor: pointer;">
          <input type="checkbox" id="lgpd-marketing" style="margin-top: 3px; accent-color: #C4A35A;">
          <div>
            <strong style="color: white;">Marketing</strong>
            <p style="margin: 0.25rem 0 0; font-size: 0.8rem; opacity: 0.7;">Usados para personalizar anúncios e ofertas com base nos seus interesses.</p>
          </div>
        </label>
      </div>
      <div style="display: flex; gap: 0.5rem;">
        <button id="lgpd-save-preferences" style="
          background: #C4A35A; border: none; color: #1A1212;
          padding: 0.6rem 1.5rem; border-radius: 6px; font-size: 0.85rem; font-weight: 600;
          cursor: pointer;
        ">Salvar Preferências</button>
        <button id="lgpd-close-preferences" style="
          background: transparent; border: 1px solid rgba(255,255,255,0.3); color: white;
          padding: 0.6rem 1.25rem; border-radius: 6px; font-size: 0.85rem; cursor: pointer;
        ">Cancelar</button>
      </div>
    </div>
  `;

  // Inject into DOM
  const container = document.createElement('div');
  container.innerHTML = bannerHTML;
  document.body.appendChild(container);

  const banner = document.getElementById('lgpd-banner');
  const preferencesPanel = document.getElementById('lgpd-preferences-panel');

  // Animate banner in
  setTimeout(() => { banner.style.transform = 'translateY(0)'; }, 300);

  // Button handlers
  document.getElementById('lgpd-accept').addEventListener('click', () => {
    saveConsent({ essential: true, analytics: true, marketing: true });
    hideBanner();
  });

  document.getElementById('lgpd-reject').addEventListener('click', () => {
    saveConsent({ essential: true, analytics: false, marketing: false });
    hideBanner();
  });

  document.getElementById('lgpd-preferences').addEventListener('click', () => {
    banner.style.display = 'none';
    preferencesPanel.style.display = 'block';
  });

  document.getElementById('lgpd-save-preferences').addEventListener('click', () => {
    const analytics = document.getElementById('lgpd-analytics').checked;
    const marketing = document.getElementById('lgpd-marketing').checked;
    saveConsent({ essential: true, analytics: analytics, marketing: marketing });
    hideBanner();
    preferencesPanel.style.display = 'none';
  });

  document.getElementById('lgpd-close-preferences').addEventListener('click', () => {
    preferencesPanel.style.display = 'none';
    banner.style.display = 'flex';
  });

  function saveConsent(consent) {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    applyConsent(consent);
  }

  function hideBanner() {
    banner.style.transform = 'translateY(100%)';
    setTimeout(() => { banner.remove(); }, 500);
  }

  function applyConsent(consent) {
    // Essential cookies: always active
    // Analytics: only if consented
    if (consent.analytics) {
      // Initialize analytics (placeholder — replace with real GA4/gtag)
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX', { 'anonymize_ip': true });
    }
    // Marketing: only if consented
    if (consent.marketing) {
      // Initialize marketing pixels (placeholder)
      console.log('[LGPD] Marketing cookies enabled');
    }
    // Dispatch event for other scripts
    window.dispatchEvent(new CustomEvent('cookieConsent', { detail: consent }));
  }

  // Expose function to reopen preferences
  window.openCookiePreferences = function() {
    // Re-inject if banner was removed
    if (!document.getElementById('lgpd-preferences-panel')) {
      container.innerHTML = bannerHTML;
      document.body.appendChild(container);
    }
    document.getElementById('lgpd-preferences-panel').style.display = 'block';
  };

})();
