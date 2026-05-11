/**
 * Global Kapak Mobilya — Tema Motoru
 * _data/ayarlar/tema.json dosyasını okur ve tüm siteye uygular.
 * Her sayfada footer.js ile birlikte yüklenir.
 */
(async function () {
  try {
    const res = await fetch('/_data/ayarlar/tema.json');
    if (!res.ok) return;
    const t = await res.json();
    const r = document.documentElement.style;

    // ── RENKLER ──────────────────────────────────────────────────────────
    if (t.renkler) {
      const c = t.renkler;
      if (c.ana_renk)       r.setProperty('--navy',  c.ana_renk);
      if (c.ana_renk_2)     r.setProperty('--navy2', c.ana_renk_2);
      if (c.ana_renk_3)     r.setProperty('--navy3', c.ana_renk_3);
      if (c.vurgu_renk)     r.setProperty('--gold',  c.vurgu_renk);
      if (c.arkaplan)       r.setProperty('--gray',  c.arkaplan);
      if (c.metin)          r.setProperty('--text',  c.metin);
      if (c.soluk_metin)    r.setProperty('--muted', c.soluk_metin);
      if (c.sinir)          r.setProperty('--border',c.sinir);
      if (c.footer_bg) {
        document.querySelectorAll('footer').forEach(f => f.style.background = c.footer_bg);
      }
    }

    // ── TIPOGRAFI ─────────────────────────────────────────────────────────
    if (t.tipografi) {
      const tp = t.tipografi;
      if (tp.baslik_font) {
        // Google Fonts yükle
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(tp.baslik_font)}:wght@400;600;700;800&display=swap`;
        document.head.appendChild(link);
        r.setProperty('--font-baslik', `'${tp.baslik_font}', sans-serif`);
        document.querySelectorAll('.nav-logo .logo-text, h1, h2, h3, .sec-head h2, .hero h1, .feat h3, .prod-body h3, .blog-body h3, .footer-col h4, .hero-tag, .sec-tag, .nav-cta, .btn-g, .about-btn, .form-submit').forEach(el => {
          el.style.fontFamily = `'${tp.baslik_font}', sans-serif`;
        });
      }
      if (tp.govde_font) {
        const link2 = document.createElement('link');
        link2.rel = 'stylesheet';
        link2.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(tp.govde_font)}:wght@300;400;600&display=swap`;
        document.head.appendChild(link2);
        document.body.style.fontFamily = `'${tp.govde_font}', sans-serif`;
      }
      if (tp.govde_boyut)  document.body.style.fontSize = tp.govde_boyut;
    }

    // ── NAV ───────────────────────────────────────────────────────────────
    if (t.nav) {
      const nav = document.querySelector('nav');
      const n = t.nav;
      if (nav) {
        if (n.arkaplan)   nav.style.background = n.arkaplan;
        if (n.yukseklik)  nav.style.height = n.yukseklik;
        if (n.golge === false) nav.style.boxShadow = 'none';
      }
      if (n.logo_yukseklik) {
        document.querySelectorAll('.nav-logo img').forEach(img => img.style.height = n.logo_yukseklik);
      }
      if (n.link_renk) {
        document.querySelectorAll('.nav-menu a').forEach(a => a.style.color = n.link_renk);
      }
      if (n.link_boyut) {
        document.querySelectorAll('.nav-menu a').forEach(a => a.style.fontSize = n.link_boyut);
      }
      if (n.cta_arkaplan) {
        document.querySelectorAll('.nav-cta').forEach(b => b.style.background = n.cta_arkaplan);
      }
      if (n.cta_renk) {
        document.querySelectorAll('.nav-cta').forEach(b => b.style.color = n.cta_renk);
      }
    }

    // ── TOPBAR ────────────────────────────────────────────────────────────
    if (t.topbar) {
      const tb = document.querySelector('.topbar');
      const tp = t.topbar;
      if (tb) {
        if (tp.arkaplan) tb.style.background = tp.arkaplan;
        if (tp.renk)     tb.style.color = tp.renk;
        if (tp.boyut)    tb.style.fontSize = tp.boyut;
        if (tp.goster === false) tb.style.display = 'none';
      }
    }

    // ── HERO ──────────────────────────────────────────────────────────────
    if (t.hero) {
      const h = t.hero;
      if (h.min_yukseklik) {
        document.querySelectorAll('.hero').forEach(el => el.style.minHeight = h.min_yukseklik);
      }
      if (h.overlay_opakligi) {
        document.querySelectorAll('.hero-overlay').forEach(el => el.style.background = `linear-gradient(90deg,rgba(11,31,75,${h.overlay_opakligi}) 0%,rgba(11,31,75,${parseFloat(h.overlay_opakligi)-0.17}) 50%,rgba(11,31,75,.15) 100%)`);
      }
      if (h.baslik_boyut) {
        document.querySelectorAll('.hero h1').forEach(el => el.style.fontSize = h.baslik_boyut);
      }
      if (h.altyazi_boyut) {
        document.querySelectorAll('.hero p').forEach(el => el.style.fontSize = h.altyazi_boyut);
      }
      if (h.tag_arkaplan) {
        document.querySelectorAll('.hero-tag').forEach(el => el.style.background = h.tag_arkaplan);
      }
      if (h.tag_renk) {
        document.querySelectorAll('.hero-tag').forEach(el => el.style.color = h.tag_renk);
      }
      if (h.buton_birincil_arkaplan) {
        document.querySelectorAll('.btn-g').forEach(el => el.style.background = h.buton_birincil_arkaplan);
      }
      if (h.buton_birincil_renk) {
        document.querySelectorAll('.btn-g').forEach(el => el.style.color = h.buton_birincil_renk);
      }
    }

    // ── İSTATİSTİK BARI ───────────────────────────────────────────────────
    if (t.stats_bar) {
      const sb = document.querySelector('.stats-bar');
      const s = t.stats_bar;
      if (sb) {
        if (s.arkaplan)   sb.style.background = s.arkaplan;
        if (s.sayi_renk)  document.querySelectorAll('.stat-n').forEach(el => el.style.color = s.sayi_renk);
        if (s.etiket_renk) document.querySelectorAll('.stat-l').forEach(el => el.style.color = s.etiket_renk);
        if (s.sayi_boyut) document.querySelectorAll('.stat-n').forEach(el => el.style.fontSize = s.sayi_boyut);
      }
    }

    // ── BÖLÜM BAŞLIKLARI ──────────────────────────────────────────────────
    if (t.bolum_basligi) {
      const bb = t.bolum_basligi;
      if (bb.baslik_renk)  document.querySelectorAll('.sec-head h2').forEach(el => el.style.color = bb.baslik_renk);
      if (bb.baslik_boyut) document.querySelectorAll('.sec-head h2').forEach(el => el.style.fontSize = bb.baslik_boyut);
      if (bb.tag_renk)     document.querySelectorAll('.sec-tag').forEach(el => el.style.color = bb.tag_renk);
      if (bb.cizgi_renk)   document.querySelectorAll('.sec-line').forEach(el => el.style.background = bb.cizgi_renk);
      if (bb.cizgi_genislik) document.querySelectorAll('.sec-line').forEach(el => el.style.width = bb.cizgi_genislik);
    }

    // ── ÜRÜN KARTI ────────────────────────────────────────────────────────
    if (t.urun_karti) {
      const uk = t.urun_karti;
      document.querySelectorAll('.prod-card').forEach(el => {
        if (uk.sinir_radius) el.style.borderRadius = uk.sinir_radius;
        if (uk.sinir_renk)   el.style.borderColor = uk.sinir_renk;
        if (uk.arkaplan)     el.style.background = uk.arkaplan;
      });
      if (uk.baslik_renk)  document.querySelectorAll('.prod-body h3').forEach(el => el.style.color = uk.baslik_renk);
      if (uk.baslik_boyut) document.querySelectorAll('.prod-body h3').forEach(el => el.style.fontSize = uk.baslik_boyut);
      if (uk.aciklama_renk) document.querySelectorAll('.prod-body p').forEach(el => el.style.color = uk.aciklama_renk);
      if (uk.resim_yukseklik) document.querySelectorAll('.prod-img').forEach(el => el.style.height = uk.resim_yukseklik);
      if (uk.badge_arkaplan) document.querySelectorAll('.prod-badge').forEach(el => el.style.background = uk.badge_arkaplan);
      if (uk.badge_renk)    document.querySelectorAll('.prod-badge').forEach(el => el.style.color = uk.badge_renk);
    }

    // ── ÖZELLİKLER BÖLÜMÜ (features) ─────────────────────────────────────
    if (t.ozellikler_bolumu) {
      const ob = t.ozellikler_bolumu;
      const featSection = document.querySelector('.features');
      if (featSection && ob.arkaplan) featSection.style.background = ob.arkaplan;
      if (ob.ikon_arkaplan) document.querySelectorAll('.feat-ico').forEach(el => el.style.background = ob.ikon_arkaplan);
      if (ob.ikon_renk)     document.querySelectorAll('.feat-ico svg').forEach(el => el.style.stroke = ob.ikon_renk);
      if (ob.baslik_renk)   document.querySelectorAll('.feat h3').forEach(el => el.style.color = ob.baslik_renk);
      if (ob.metin_renk)    document.querySelectorAll('.feat p').forEach(el => el.style.color = ob.metin_renk);
    }

    // ── GALERİ ────────────────────────────────────────────────────────────
    if (t.galeri) {
      const g = t.galeri;
      if (g.item_yukseklik) document.querySelectorAll('.gallery-item').forEach(el => el.style.height = g.item_yukseklik);
      if (g.arkaplan)       document.querySelectorAll('.gallery-section').forEach(el => el.style.background = g.arkaplan);
    }

    // ── BLOG ──────────────────────────────────────────────────────────────
    if (t.blog) {
      const b = t.blog;
      document.querySelectorAll('.blog-card').forEach(el => {
        if (b.sinir_radius) el.style.borderRadius = b.sinir_radius;
        if (b.arkaplan)     el.style.background = b.arkaplan;
      });
      if (b.baslik_renk)  document.querySelectorAll('.blog-body h3').forEach(el => el.style.color = b.baslik_renk);
      if (b.baslik_boyut) document.querySelectorAll('.blog-body h3').forEach(el => el.style.fontSize = b.baslik_boyut);
      if (b.resim_yukseklik) document.querySelectorAll('.blog-img').forEach(el => el.style.height = b.resim_yukseklik);
    }

    // ── BUTONLAR ──────────────────────────────────────────────────────────
    if (t.butonlar) {
      const btn = t.butonlar;
      if (btn.birincil_arkaplan) document.querySelectorAll('.btn-g, .form-submit, .about-btn').forEach(el => el.style.background = btn.birincil_arkaplan);
      if (btn.birincil_renk)     document.querySelectorAll('.btn-g, .form-submit, .about-btn').forEach(el => el.style.color = btn.birincil_renk);
      if (btn.radius)            document.querySelectorAll('.btn-g, .btn-w, .form-submit, .about-btn, .nav-cta').forEach(el => el.style.borderRadius = btn.radius);
      if (btn.boyut)             document.querySelectorAll('.btn-g, .btn-w, .form-submit').forEach(el => el.style.fontSize = btn.boyut);
    }

    // ── FOOTER ────────────────────────────────────────────────────────────
    if (t.footer) {
      const ft = t.footer;
      const footer = document.querySelector('footer');
      if (footer) {
        if (ft.arkaplan)   footer.style.background = ft.arkaplan;
        if (ft.metin_renk) footer.style.color = ft.metin_renk;
      }
      if (ft.baslik_renk) document.querySelectorAll('.footer-col h4').forEach(el => el.style.color = ft.baslik_renk);
      if (ft.link_renk)   document.querySelectorAll('.footer-col a').forEach(el => el.style.color = ft.link_renk);
      if (ft.alt_cizgi_renk) document.querySelectorAll('.footer-bottom').forEach(el => el.style.borderTopColor = ft.alt_cizgi_renk);
    }

    // ── FORM ──────────────────────────────────────────────────────────────
    if (t.form) {
      const fm = t.form;
      document.querySelectorAll('.form-field input, .form-field textarea, .form-field select').forEach(el => {
        if (fm.sinir_renk)  el.style.borderColor = fm.sinir_renk;
        if (fm.arkaplan)    el.style.background = fm.arkaplan;
        if (fm.metin_renk)  el.style.color = fm.metin_renk;
        if (fm.radius)      el.style.borderRadius = fm.radius;
      });
    }

    // ── GENEL BOŞLUKLAR ───────────────────────────────────────────────────
    if (t.bosluklar) {
      const bs = t.bosluklar;
      if (bs.bolum_ust_alt) {
        document.querySelectorAll('.products-section, .about-section, .features, .gallery-section, .blog-section, .contact-section').forEach(el => {
          el.style.paddingTop = bs.bolum_ust_alt;
          el.style.paddingBottom = bs.bolum_ust_alt;
        });
      }
    }

  } catch (e) {
    // tema.json yoksa sessizce geç
  }
})();
