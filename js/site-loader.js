// ════════════════════════════════════════════════
// GLOBAL KAPAK MOBILYA - DİNAMİK SİTE YÜKLEYİCİ
// ════════════════════════════════════════════════
// Her sayfada çalışır, _data/ayarlar/genel.json'dan
// header, topbar, footer ve genel ayarları yükler.
// ════════════════════════════════════════════════

(function() {
  'use strict';
  
  const REPO_API = 'https://api.github.com/repos/emrecanaksoyea34-a11y/global-kapak-mobilyaa/contents/_data';
  
  // Cache mekanizması (sayfa yenilemede daha hızlı)
  const cache = {};
  
  async function loadJson(path) {
    if (cache[path]) return cache[path];
    try {
      const res = await fetch(path + '?t=' + Date.now()); // Cache-bust
      if (res.ok) {
        const data = await res.json();
        cache[path] = data;
        return data;
      }
    } catch(e) { console.log('Yükleme hatası:', path, e); }
    return null;
  }
  
  // Genel ayarları (tüm sayfalarda kullanılan) yükle ve uygula
  async function loadGenelAyarlar() {
    const genel = await loadJson('_data/ayarlar/genel.json') || 
                  await loadJson('/_data/ayarlar/genel.json');
    if (!genel) return null;
    
    // 1. LOGO (tüm img.logo-img elementlerini güncelle)
    if (genel.firma && genel.firma.logo) {
      document.querySelectorAll('[data-bind="logo"]').forEach(el => {
        if (el.tagName === 'IMG') el.src = genel.firma.logo;
        else el.style.backgroundImage = `url('${genel.firma.logo}')`;
      });
    }
    
    // 2. FİRMA ADI / SLOGAN
    setText('[data-bind="firma-ad"]', genel.firma?.ad);
    setText('[data-bind="firma-slogan"]', genel.firma?.slogan);
    setText('[data-bind="firma-tagline"]', genel.firma?.tagline);
    
    // 3. İLETİŞİM
    setText('[data-bind="telefon"]', genel.iletisim?.telefon);
    setText('[data-bind="email"]', genel.iletisim?.email);
    setText('[data-bind="adres"]', genel.iletisim?.adres);
    setText('[data-bind="calisma-saatleri"]', genel.iletisim?.calisma_saatleri);
    
    // 4. WHATSAPP LİNKLERİ (tüm wa.me linklerini güncelle)
    const wa = genel.iletisim?.whatsapp;
    if (wa) {
      document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
        const text = a.href.split('?text=')[1] || '';
        a.href = `https://wa.me/${wa}${text ? '?text=' + text : ''}`;
      });
    }
    
    // 5. SOSYAL MEDYA LİNKLERİ
    if (genel.sosyal_medya) {
      setHref('[data-bind="instagram"]', genel.sosyal_medya.instagram);
      setHref('[data-bind="facebook"]', genel.sosyal_medya.facebook);
      setHref('[data-bind="twitter"]', genel.sosyal_medya.twitter);
      setHref('[data-bind="linkedin"]', genel.sosyal_medya.linkedin);
      setHref('[data-bind="youtube"]', genel.sosyal_medya.youtube);
    }
    
    // 6. FOOTER METİNLERİ
    setText('[data-bind="footer-tanitim"]', genel.footer?.tanitim_metni);
    setText('[data-bind="footer-alt"]', genel.footer?.alt_metin);
    
    // 7. TOPBAR
    if (genel.topbar) {
      const topbar = document.querySelector('[data-bind="topbar"]');
      if (topbar) {
        if (genel.topbar.aktif) {
          setText('[data-bind="topbar-metin"]', genel.topbar.metin);
          topbar.style.display = '';
        } else {
          topbar.style.display = 'none';
        }
      }
    }
    
    return genel;
  }
  
  // Yardımcı: Belirli elementlerin metnini ayarla
  function setText(selector, text) {
    if (!text) return;
    document.querySelectorAll(selector).forEach(el => {
      el.textContent = text;
    });
  }
  
  function setHref(selector, url) {
    if (!url) {
      document.querySelectorAll(selector).forEach(el => el.style.display = 'none');
      return;
    }
    document.querySelectorAll(selector).forEach(el => {
      el.href = url;
      el.style.display = '';
    });
  }
  
  // Genel API
  window.SiteLoader = {
    loadJson,
    loadGenelAyarlar,
    setText,
    setHref,
    
    // GitHub API ile klasördeki tüm dosyaları getir
    async listFolder(folder) {
      try {
        const res = await fetch(`${REPO_API}/${folder}`);
        if (res.ok) {
          const files = await res.json();
          return files
            .filter(f => f.name.endsWith('.json'))
            .map(f => f.name.replace('.json', ''));
        }
      } catch(e) {}
      return [];
    },
    
    // Markdown -> HTML
    markdown(md) {
      if (!md) return '';
      let html = md;
      html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
      html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
      html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
      html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
      html = html.replace(/^>\s+(.+)$/gim, '<blockquote>$1</blockquote>');
      html = html.replace(/^\s*-\s+(.+)$/gim, '<li>$1</li>');
      html = html.replace(/(<li>[\s\S]*?<\/li>)/g, m => `<ul>${m}</ul>`);
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
      
      const blocks = html.split(/\n\n+/);
      html = blocks.map(b => {
        b = b.trim();
        if (!b) return '';
        if (b.startsWith('<h') || b.startsWith('<ul') || b.startsWith('<ol') || b.startsWith('<bl')) return b;
        return `<p>${b.replace(/\n/g, '<br>')}</p>`;
      }).join('\n');
      
      return html;
    }
  };
  
  // Sayfa yüklenince otomatik genel ayarları yükle
  document.addEventListener('DOMContentLoaded', () => {
    loadGenelAyarlar();
  });
  
})();
