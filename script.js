document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar shadow on scroll ---------- */
  var nav = document.getElementById('mainNav');
  var backToTop = document.getElementById('backToTop');
  function onScroll() {
    var scrolled = window.scrollY > 40;
    if (nav) nav.classList.toggle('scrolled', scrolled);
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Collapse mobile nav after link click ---------- */
  var navMenu = document.getElementById('navMenu');
  document.querySelectorAll('#navMenu .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navMenu.classList.contains('show') && window.bootstrap) {
        var bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(navMenu);
        bsCollapse.hide();
      }
    });
  });

  /* ---------- Menu filter tabs ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var menuItems = document.querySelectorAll('.menu-item');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      menuItems.forEach(function (item) {
        var cat = item.getAttribute('data-cat');
        var show = (filter === 'all') || (cat === filter);
        item.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- WhatsApp chat widget ---------- */
  var waFab = document.getElementById('waFab');
  var waPanel = document.getElementById('waPanel');
  var waClose = document.getElementById('waClose');

  if (waFab && waPanel) {
    waFab.addEventListener('click', function () {
      waPanel.classList.toggle('open');
    });
  }
  if (waClose && waPanel) {
    waClose.addEventListener('click', function () {
      waPanel.classList.remove('open');
    });
  }
  document.addEventListener('click', function (e) {
    if (waPanel && waPanel.classList.contains('open')) {
      if (!waPanel.contains(e.target) && !waFab.contains(e.target)) {
        waPanel.classList.remove('open');
      }
    }
  });

  /* Auto-pop the WhatsApp chat once, after a short delay, to invite the visitor */
  setTimeout(function () {
    if (waPanel && !waPanel.classList.contains('open')) {
      waPanel.classList.add('open');
    }
  }, 4000);

});