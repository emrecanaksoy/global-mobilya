/**
 * Global Kapak Mobilya — Genel İçerik Yükleyici
 * _data/ayarlar/genel.json dosyasından navbar, topbar,
 * hakkımızda resmi ve diğer sabit içerikleri dinamik yükler.
 */
(async function () {

  // ── CSS: Navbar aktif/hover link rengi garantili düzelt ─────────────────
  // tema.js inline style eklediği için !important gerekiyor
  const fixCSS = document.createElement('style');
  fixCSS.id = 'navbar-fix-css';
  fixCSS.textContent = `
    .nav-menu a:hover,
    .nav-menu a.active {
      background: var(--navy) !important;
      color: #ffffff !important;
    }
    .nav-menu a {
      color: var(--navy) !important;
    }
  `;
  document.head.appendChild(fixCSS);

  // ── genel.json yükle ───────────────────────────────────────────────────
  let genel = {};
  // Netlify'da _data klasörü public değil, GitHub API ile okuyoruz
  const REPO = 'emrecanaksoyea34-a11y/global-kapak-mobilyaa';
  const paths = [
    '_data/ayarlar/genel.json',
    '/_data/ayarlar/genel.json'
  ];
  for (const p of paths) {
    try {
      const res = await fetch(p);
      if (res.ok) { genel = await res.json(); break; }
    } catch(e) {}
  }
  // Hiç çalışmazsa GitHub raw API ile dene
  if (!genel.firma) {
    try {
      const raw = await fetch(`https://raw.githubusercontent.com/${REPO}/main/_data/ayarlar/genel.json`);
      if (raw.ok) genel = await raw.json();
    } catch(e) {}
  }

  const firma    = genel.firma    || {};
  const iletisim = genel.iletisim || {};
  const sosyal   = genel.sosyal_medya || {};
  const topbarD  = genel.topbar   || {};
  const footerD  = genel.footer   || {};

  // ── TOPBAR ────────────────────────────────────────────────────────────
  const topbar = document.querySelector('.topbar');
  if (topbar) {
    if (topbarD.aktif === false) {
      topbar.style.display = 'none';
    } else {
      // Sol metin
      const leftSpan = topbar.querySelector('.topbar-left') || topbar.firstElementChild;
      if (leftSpan && topbarD.metin) {
        leftSpan.textContent = topbarD.metin;
      }
      // Sağ iletişim linkleri
      const tel   = iletisim.telefon  || '';
      const email = iletisim.email    || '';
      const wa    = iletisim.whatsapp || '';
      const rightEl = topbar.querySelector('.topbar-right');
      if (rightEl) {
        rightEl.innerHTML =
          (tel   ? `<a href="tel:${tel.replace(/\s/g,'')}">📞 ${tel}</a>` : '') +
          (email ? `<a href="mailto:${email}">✉️ ${email}</a>` : '');
      }
    }
  }

  // ── NAVBAR: Logo ──────────────────────────────────────────────────────
  if (firma.logo) {
    document.querySelectorAll('.nav-logo img').forEach(img => {
      img.src = firma.logo;
      img.alt = firma.ad || 'Global Kapak Mobilya';
    });
  }

  // ── NAVBAR: CTA Butonu ────────────────────────────────────────────────
  const navCta = genel.nav_cta || {};
  document.querySelectorAll('.nav-cta').forEach(btn => {
    if (navCta.yazi)  btn.textContent = navCta.yazi;
    if (navCta.link)  btn.href = navCta.link;
  });

  // ── ANASAYFADAKİ HAKKIMIZDA RESMİ ────────────────────────────────────
  // index.html about-img bölümü - id ile bul, class ile fallback
  const aboutImg = document.getElementById('about-main-img') || document.querySelector('.about-img');
  const aboutData = genel.anasayfa_hakkimizda || {};
  if (aboutImg && aboutData.resim) {
    aboutImg.style.backgroundImage = `url('${aboutData.resim}')`;
  }
  if (aboutData.etiket) {
    const tag = document.querySelector('.about-text .sec-tag');
    if (tag) tag.textContent = aboutData.etiket;
  }
  if (aboutData.baslik_1 || aboutData.baslik_2) {
    const h2 = document.querySelector('.about-text h2');
    if (h2 && aboutData.baslik_1) {
      h2.innerHTML = `${aboutData.baslik_1} <span>${aboutData.baslik_2 || ''}</span>`;
    }
  }
  if (aboutData.paragraf_1) {
    const paragraphs = document.querySelectorAll('.about-text p');
    const texts = [aboutData.paragraf_1, aboutData.paragraf_2, aboutData.paragraf_3].filter(Boolean);
    paragraphs.forEach((p, i) => { if (texts[i]) p.textContent = texts[i]; });
  }
  if (aboutData.buton_yazi) {
    const aboutBtn = document.querySelector('.about-btn');
    if (aboutBtn) {
      aboutBtn.textContent = aboutData.buton_yazi + ' →';
      if (aboutData.buton_link) aboutBtn.href = aboutData.buton_link;
    }
  }

  // ── STATS BAR ────────────────────────────────────────────────────────
  const stats = genel.stats || [];
  if (stats.length > 0) {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, i) => {
      if (stats[i]) {
        const n = item.querySelector('.stat-n');
        const l = item.querySelector('.stat-l');
        if (n) n.textContent = stats[i].sayi;
        if (l) l.textContent = stats[i].etiket;
      }
    });
  }

  // ── HAKKIMIZDA SAYFASI RESMİ ──────────────────────────────────────────
  const aboutBig = document.querySelector('.about-img-big');
  const hakkiData = genel.hakkimizda_resim || {};
  if (aboutBig && hakkiData.resim) {
    aboutBig.style.backgroundImage = `url('${hakkiData.resim}')`;
    aboutBig.style.backgroundSize  = hakkiData.mod || 'contain';
    aboutBig.style.backgroundRepeat = 'no-repeat';
    aboutBig.style.backgroundPosition = 'center';
    aboutBig.style.backgroundColor = '#fff';
  }

  // ── PAGE HERO BAŞLIKLARI ─────────────────────────────────────────────
  // Her sayfanın kendi page-hero başlığı ilgili ayarlar JSON'undan
  // (zaten dinamik yükleniyor, buraya ekstra hook yok)

  // ── FOOTER: footer.js ile çakışmasın, sadece brand metnini güncelle ──
  // footer.js zaten çalışıyor, genel.json'daki tanitim_metni oraya geçiyor
  // Ama footer.js statik metin kullanıyor — onu da güncelle
  setTimeout(() => {
    const footerBrandP = document.querySelector('footer .footer-brand p');
    if (footerBrandP && footerD.tanitim_metni) {
      footerBrandP.textContent = footerD.tanitim_metni;
    }
    const footerBrandName = document.querySelector('footer .f-brand-name');
    if (footerBrandName && firma.ad) {
      footerBrandName.textContent = firma.ad;
    }
    // Footer iletişim linklerini güncelle
    const footerLinks = document.querySelectorAll('footer .footer-col a');
    footerLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('tel:') && iletisim.telefon) {
        link.href = 'tel:' + iletisim.telefon.replace(/\s/g,'');
        link.textContent = '📞 ' + iletisim.telefon;
      }
      if (href.startsWith('mailto:') && iletisim.email) {
        link.href = 'mailto:' + iletisim.email;
        link.textContent = '✉️ ' + iletisim.email;
      }
    });

    // Sosyal medya linkleri
    const socials = document.querySelectorAll('footer .f-socials a');
    const sosyalMap = {instagram: sosyal.instagram, facebook: sosyal.facebook, whatsapp: wa ? 'https://wa.me/'+wa : null};
    const wa2 = iletisim.whatsapp;
    if (socials[2] && wa2) socials[2].href = 'https://wa.me/' + wa2;
    if (socials[0] && sosyal.instagram) socials[0].href = sosyal.instagram;
    if (socials[1] && sosyal.facebook)  socials[1].href = sosyal.facebook;

  }, 500); // footer.js'in render etmesini bekle

  // ── NAVBAR AKTİF CSS'İ GÜÇLENDIR ────────────────────────────────────
  // tema.js renk değiştirince CSS variable güncellenir ama
  // !important ile üstüne yazılan stil bunu da yakalar
  document.querySelectorAll('.nav-menu a').forEach(a => {
    a.addEventListener('mouseenter', function() {
      this.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--navy').trim();
      this.style.color = '#ffffff';
    });
    a.addEventListener('mouseleave', function() {
      if (!this.classList.contains('active')) {
        this.style.backgroundColor = '';
        this.style.color = getComputedStyle(document.documentElement).getPropertyValue('--navy').trim();
      }
    });
  });

  // Aktif linki de düzelt
  document.querySelectorAll('.nav-menu a.active').forEach(a => {
    a.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--navy').trim();
    a.style.color = '#ffffff';
  });

})();
