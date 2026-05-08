/**
 * Global Kapak Mobilya — Dinamik Footer
 * Tüm sayfalarda bu dosya include edilir, footer otomatik eklenir.
 * Footer içeriğini değiştirmek için SADECE bu dosyayı düzenlemeniz yeterli.
 */

(function () {
  const FOOTER_HTML = `
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <img src="resim/logo.png" alt="Global Kapak Mobilya" style="height:90px;margin-bottom:12px;background:#fff;padding:5px;border-radius:4px;">
      <div class="f-brand-name">Global Kapak Mobilya</div>
      <p>Membran kapak üretiminde uzman kadromuzla kalite ve estetiği bir arada sunuyoruz.</p>
      <div class="f-socials">
        <a href="https://instagram.com" target="_blank" aria-label="Instagram">
          <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
        </a>
        <a href="https://facebook.com" target="_blank" aria-label="Facebook">
          <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="https://wa.me/905050151035" target="_blank" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Sayfalar</h4>
      <a href="index.html">Anasayfa</a>
      <a href="urunler.html">Ürünlerimiz</a>
      <a href="hakkimizda.html">Hakkımızda</a>
      <a href="galeri.html">Galeri</a>
      <a href="tedarikcilerimiz.html">Tedarikçilerimiz</a>
      <a href="blog.html">Blog</a>
      <a href="iletisim.html">İletişim</a>
    </div>
    <div class="footer-col">
      <h4>Ürünler</h4>
      <a href="urunler.html">Düz Membran Kapak</a>
      <a href="urunler.html">Çerçeveli Membran Kapak</a>
      <a href="urunler.html">Ölçüye Özel Kapak</a>
    </div>
    <div class="footer-col">
      <h4>İletişim</h4>
      <a href="tel:05050151035">📞 0 (505) 015 1035</a>
      <a href="mailto:info@globalkapakmobilya.com">✉️ info@globalkapakmobilya.com</a>
      <a href="iletisim.html">📍 Yalçın Koreş Cad. Bağlar Mah. No:6B<br>Bağcılar / İstanbul, Türkiye</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 Global Kapak Mobilya — Tüm hakları saklıdır. | <a href="kvkk.html" style="color:rgba(255,255,255,.4)">KVKK</a></p>
    <div class="socials" style="display:none"></div>
  </div>
</footer>
`;

  const FOOTER_CSS = `
<style id="footer-dynamic-css">
footer{background:#060E22;padding:50px 40px 24px;}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;max-width:1100px;margin:0 auto 40px;}
.f-brand-name{font-family:'Montserrat',sans-serif;color:#fff;font-size:15px;font-weight:700;margin-bottom:10px;}
.footer-brand p{font-size:13px;color:rgba(255,255,255,.4);line-height:1.8;margin-bottom:16px;}
.f-socials{display:flex;gap:10px;margin-top:4px;}
.f-socials a{width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.4);transition:all .2s;}
.f-socials a:hover{border-color:#C8A96E;color:#C8A96E;}
.f-socials svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.8;}
.footer-col h4{font-family:'Montserrat',sans-serif;font-size:11px;font-weight:700;color:#C8A96E;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;}
.footer-col a{display:block;font-size:13px;color:rgba(255,255,255,.45);margin-bottom:9px;transition:color .2s;text-decoration:none;}
.footer-col a:hover{color:#C8A96E;}
.footer-bottom{border-top:1px solid rgba(255,255,255,.06);padding-top:20px;display:flex;justify-content:space-between;align-items:center;max-width:1100px;margin:0 auto;flex-wrap:wrap;gap:12px;}
.footer-bottom p{font-size:12px;color:rgba(255,255,255,.25);}
@media(max-width:1024px){.footer-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:600px){footer{padding:30px 20px 16px;}.footer-grid{grid-template-columns:1fr;gap:28px;}}
</style>
`;

  // CSS'i head'e ekle (eğer sayfada footer CSS yoksa)
  if (!document.getElementById('footer-dynamic-css')) {
    document.head.insertAdjacentHTML('beforeend', FOOTER_CSS);
  }

  // Mevcut footer varsa değiştir, yoksa body sonuna ekle
  const existing = document.querySelector('footer');
  if (existing) {
    existing.outerHTML = FOOTER_HTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
  }

  // Aktif sayfayı footer linklerinde işaretle
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('footer .footer-col a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.style.color = '#C8A96E';
    }
  });
})();
