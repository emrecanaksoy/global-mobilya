/**
 * Global Kapak Mobilya — Mobil Swipe Slider
 * Hero slider ve ürün slider'ı için touch/swipe desteği ekler.
 * Tüm sayfalarda kullanılabilir, sayfa bazlı çalışır.
 */

(function () {

  // ── YARDIMCI: Touch/Swipe dinleyicisi ekle ──────────────────────────────
  function addSwipe(element, onLeft, onRight, threshold) {
    threshold = threshold || 50;
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    element.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = true;
    }, { passive: true });

    element.addEventListener('touchend', function (e) {
      if (!isDragging) return;
      isDragging = false;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      // Yalnızca yatay swipe (dikey kaydırma değil)
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
        if (dx < 0) onLeft();   // Sola kaydır → ileri
        else onRight();          // Sağa kaydır → geri
      }
    }, { passive: true });

    // Mouse drag desteği (desktop test için)
    element.addEventListener('mousedown', function (e) {
      startX = e.clientX;
      isDragging = true;
    });
    element.addEventListener('mouseup', function (e) {
      if (!isDragging) return;
      isDragging = false;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > threshold) {
        if (dx < 0) onLeft();
        else onRight();
      }
    });
  }

  // ── HERO SLIDER (index.html) ─────────────────────────────────────────────
  function initHeroSwipe() {
    // Hero slider'ın mevcut next/prev butonlarını bul
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const prevBtn = heroSection.querySelector('.hero-arrow.prev');
    const nextBtn = heroSection.querySelector('.hero-arrow.next');
    if (!prevBtn || !nextBtn) return;

    addSwipe(
      heroSection,
      function () { nextBtn.click(); }, // sola → ileri
      function () { prevBtn.click(); }  // sağa → geri
    );
  }

  // ── ÜRÜN SLIDER (index.html'deki prod-track) ────────────────────────────
  function initProdSwipe() {
    const prodSlider = document.querySelector('.prod-slider');
    if (!prodSlider) return;

    const prevBtn = prodSlider.querySelector('.prod-arrow.prev');
    const nextBtn = prodSlider.querySelector('.prod-arrow.next');
    if (!prevBtn || !nextBtn) return;

    addSwipe(
      prodSlider,
      function () { nextBtn.click(); },
      function () { prevBtn.click(); }
    );
  }

  // ── GALERİ SWIPE (galeri.html — lightbox) ───────────────────────────────
  function initLightboxSwipe() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    // Lightbox'taki prev/next butonlarını bul
    const prevBtn = lightbox.querySelector('.lb-prev') || lightbox.querySelector('[onclick*="prev"]') || lightbox.querySelector('[onclick*="Prev"]');
    const nextBtn = lightbox.querySelector('.lb-next') || lightbox.querySelector('[onclick*="next"]') || lightbox.querySelector('[onclick*="Next"]');

    if (prevBtn && nextBtn) {
      addSwipe(
        lightbox,
        function () { nextBtn.click(); },
        function () { prevBtn.click(); }
      );
    }

    // Klavye desteği (zaten varsa çakışmaz)
    document.addEventListener('keydown', function (e) {
      if (!lightbox.style.display || lightbox.style.display === 'none') return;
      if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
      if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
      if (e.key === 'Escape') {
        const closeBtn = lightbox.querySelector('.lb-close') || lightbox.querySelector('[onclick*="close"]');
        if (closeBtn) closeBtn.click();
      }
    });
  }

  // ── MOBİL NAV DIŞINA TIKLANINCA KAPANSIN ────────────────────────────────
  function initMobileNavClose() {
    const navMenu = document.getElementById('nm');
    if (!navMenu) return;

    document.addEventListener('click', function (e) {
      if (!navMenu.classList.contains('open')) return;
      const hamburger = document.querySelector('.hamburger');
      if (!navMenu.contains(e.target) && e.target !== hamburger) {
        navMenu.classList.remove('open');
      }
    });
  }

  // ── SAYFA YÜKLENİNCE BAŞLAT ─────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    initHeroSwipe();
    initProdSwipe();
    initLightboxSwipe();
    initMobileNavClose();
  });

  // DOMContentLoaded zaten geçtiyse hemen çalıştır
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initHeroSwipe();
    initProdSwipe();
    initLightboxSwipe();
    initMobileNavClose();
  }

})();
