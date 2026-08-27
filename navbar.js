/**
 * NIC Info — Global Mobile Navigation & Header Controller
 * Adheres to WCAG 2.1 AA accessibility standards and GEMINI.md UI/UX specifications.
 */
(function () {
  'use strict';

  function initNav() {
    var mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    var mobileNavDrawer = document.getElementById('mobile-nav-drawer');
    var mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
    var mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (!mobileMenuToggle || !mobileNavDrawer) return;

    // Avoid double-binding if already initialized
    if (mobileMenuToggle.dataset.navBound === 'true') return;
    mobileMenuToggle.dataset.navBound = 'true';

    function openMobileMenu() {
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
      mobileNavDrawer.classList.add('open');
      mobileNavDrawer.setAttribute('aria-hidden', 'false');
      if (mobileNavBackdrop) {
        mobileNavBackdrop.classList.add('open');
        mobileNavBackdrop.setAttribute('aria-hidden', 'false');
      }
      document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileNavDrawer.classList.remove('open');
      mobileNavDrawer.setAttribute('aria-hidden', 'true');
      if (mobileNavBackdrop) {
        mobileNavBackdrop.classList.remove('open');
        mobileNavBackdrop.setAttribute('aria-hidden', 'true');
      }
      document.body.style.overflow = '';
    }

    mobileMenuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = mobileNavDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (mobileNavBackdrop) {
      mobileNavBackdrop.addEventListener('click', function (e) {
        e.stopPropagation();
        closeMobileMenu();
      });
    }

    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMobileMenu();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNavDrawer.classList.contains('open')) {
        closeMobileMenu();
        mobileMenuToggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && mobileNavDrawer.classList.contains('open')) {
        closeMobileMenu();
      }
    }, { passive: true });

    // ── Mobile Share Platform Links ──────────────────────────
    var shareUrl = encodeURIComponent(window.location.href);
    var shareTitle = encodeURIComponent(document.title || 'NIC Info — Sri Lanka NIC Decoder & Tools');
    var shareText = encodeURIComponent('Check out NIC Info: ');

    var mobileWaBtn = document.querySelector('.mobile-share-btn[data-share-platform="whatsapp"]');
    var mobileFbBtn = document.querySelector('.mobile-share-btn[data-share-platform="facebook"]');
    var mobileXBtn = document.querySelector('.mobile-share-btn[data-share-platform="x"]');
    var mobileCopyBtn = document.getElementById('mobile-share-copy-btn');
    var mobileCopyText = document.getElementById('mobile-share-copy-text');

    if (mobileWaBtn) mobileWaBtn.href = "https://api.whatsapp.com/send?text=" + shareText + shareUrl;
    if (mobileFbBtn) mobileFbBtn.href = "https://www.facebook.com/sharer/sharer.php?u=" + shareUrl;
    if (mobileXBtn) mobileXBtn.href = "https://twitter.com/intent/tweet?text=" + shareText + "&url=" + shareUrl;

    if (mobileCopyBtn && !mobileCopyBtn.dataset.copyBound) {
      mobileCopyBtn.dataset.copyBound = 'true';
      mobileCopyBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var targetUrl = window.location.href;
        function markCopied() {
          var originalText = mobileCopyText ? mobileCopyText.innerText : 'Copy Link';
          if (mobileCopyText) mobileCopyText.innerText = 'Copied!';
          mobileCopyBtn.classList.add('copied');
          setTimeout(function () {
            if (mobileCopyText) mobileCopyText.innerText = originalText;
            mobileCopyBtn.classList.remove('copied');
          }, 2000);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(targetUrl).then(markCopied).catch(function () {
            fallbackCopy(targetUrl, markCopied);
          });
        } else {
          fallbackCopy(targetUrl, markCopied);
        }
      });
    }

    function fallbackCopy(text, callback) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
        callback();
      } catch (err) {
        console.warn('Copy fallback failed', err);
      }
      document.body.removeChild(textarea);
    }

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
