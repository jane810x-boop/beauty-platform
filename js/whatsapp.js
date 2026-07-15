// ========================================
// F&J Beauty - WhatsApp Customer Service Widget
// Set window.WA_NUMBER in your page before including this script
// ========================================

(function () {
  // ---- Config ----
  // Priority: FJ_CONFIG > window globals > defaults
  var cfg  = (window.FJ_CONFIG && window.FJ_CONFIG.whatsapp) || {};
  var WA_NUMBER = cfg.number   || window.WA_NUMBER || '';
  var WA_NAME   = cfg.name     || window.WA_NAME   || 'F&J Support';
  var WA_MSG    = cfg.defaultMsg || window.WA_MSG  || "Hi! I have a question about my order / a product 😊";
  var GREETING  = cfg.greeting || window.WA_GREETING || "Hi there! 👋\nHow can we help you today? We typically reply within a few minutes.";

  // ---- Build HTML ----
  var now = new Date();
  var timeStr = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');

  var waStyles = `
<style>
.whatsapp-btn{
  position:fixed;bottom:28px;right:28px;z-index:9999;
  display:flex;align-items:center;gap:0.6rem;
  cursor:pointer;
  transition:all 0.3s ease;
}
.whatsapp-btn .wa-icon-wrap{
  width:52px;height:52px;
  background:#25D366;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 16px rgba(37,211,102,0.4);
  position:relative;
  transition:transform 0.3s ease,box-shadow 0.3s ease;
}
.whatsapp-btn:hover .wa-icon-wrap{transform:scale(1.1);box-shadow:0 6px 24px rgba(37,211,102,0.5);}
.whatsapp-btn .wa-icon-wrap svg{width:28px;height:28px;fill:#fff;}
.whatsapp-btn .wa-online-dot{
  position:absolute;top:3px;right:3px;
  width:12px;height:12px;background:#4CAF50;
  border-radius:50%;border:2px solid #fff;
  animation:waOnlinePulse 2s ease infinite;
}
.whatsapp-btn .wa-badge{
  background:#E5342B;color:#fff;
  font-size:0.7rem;font-weight:700;
  padding:0.15rem 0.5rem;border-radius:10px;
  position:absolute;top:-4px;right:-4px;
  min-width:18px;text-align:center;
  box-shadow:0 2px 8px rgba(229,52,43,0.4);
}
.whatsapp-btn .wa-label{
  background:#fff;color:#333;
  padding:0.5rem 1rem;border-radius:25px;
  font-size:0.82rem;font-weight:700;
  box-shadow:0 2px 12px rgba(0,0,0,0.15);
  white-space:nowrap;opacity:0;transform:translateX(10px);
  transition:all 0.3s ease;pointer-events:none;
  border:1px solid #f0f0f0;
}
.whatsapp-btn:hover .wa-label{opacity:1;transform:translateX(0);}
.whatsapp-btn .wa-icon{position:relative;}
@keyframes waOnlinePulse{0%{box-shadow:0 0 0 0 rgba(76,175,80,0.4)}70%{box-shadow:0 0 0 8px rgba(76,175,80,0)}100%{box-shadow:0 0 0 0 rgba(76,175,80,0)}}
.whatsapp-popup{ /* existing styles live in css/style.css */ }
</style>
`;

  document.head.insertAdjacentHTML('beforeend', waStyles);

  var waHTML = `
    <!-- WhatsApp Popup -->
    <div class="whatsapp-popup" id="wa-popup">
      <div class="wa-popup-header">
        <div class="wa-popup-avatar">💬</div>
        <div class="wa-popup-info">
          <h4>${WA_NAME}</h4>
          <p>🟢 Online · <span data-i18n="whatsapp.reply_time">Usually replies in minutes</span></p>
        </div>
        <span class="wa-popup-close" onclick="waClose()">✕</span>
      </div>
      <div class="wa-popup-body">
        <div class="wa-bubble">
          ${GREETING.replace(/\n/g, '<br>')}
          <time>${timeStr}</time>
        </div>
      </div>
      <div class="wa-popup-footer">
        <a href="https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}" target="_blank" rel="noopener">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.374 0 0 5.373 0 12c0 2.117.549 4.099 1.508 5.826L.057 23.886A1 1 0 001.1 25.03l6.322-1.642A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.955 9.955 0 01-5.093-1.39l-.364-.215-3.775.98.999-3.662-.238-.375A9.959 9.959 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
          <span data-i18n="whatsapp.open_chat">Chat on WhatsApp</span>
        </a>
      </div>
    </div>

    <!-- WhatsApp Floating Button -->
    <div class="whatsapp-btn" id="wa-btn" onclick="waToggle()">
      <div class="wa-label" data-i18n="whatsapp.open_btn">Chat with us 💬</div>
      <div class="wa-icon-wrap">
        <div class="wa-badge">1</div>
        <div class="wa-icon">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.374 0 0 5.373 0 12c0 2.117.549 4.099 1.508 5.826L.057 23.886A1 1 0 001.1 25.03l6.322-1.642A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.955 9.955 0 01-5.093-1.39l-.364-.215-3.775.98.999-3.662-.238-.375A9.959 9.959 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </div>
        <div class="wa-online-dot"></div>
      </div>
    </div>
  `;

  document.addEventListener('DOMContentLoaded', function () {
    document.body.insertAdjacentHTML('beforeend', waHTML);
  });

  // ---- Toggle / Close ----
  window.waToggle = function () {
    var popup = document.getElementById('wa-popup');
    if (popup) popup.classList.toggle('open');
  };

  window.waClose = function () {
    var popup = document.getElementById('wa-popup');
    if (popup) popup.classList.remove('open');
  };

  // Close on outside click
  document.addEventListener('click', function (e) {
    var popup = document.getElementById('wa-popup');
    var btn   = document.getElementById('wa-btn');
    if (!popup || !btn) return;
    if (!popup.contains(e.target) && !btn.contains(e.target)) {
      popup.classList.remove('open');
    }
  });
})();
