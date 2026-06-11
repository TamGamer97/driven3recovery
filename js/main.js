(function () {
  'use strict';

  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav__link');
  const yearEl = document.getElementById('year');
  const phoneLink = document.getElementById('phone-link');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function closeNav() {
    nav.classList.remove('nav--open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('nav-open');
  }

  function openNav() {
    nav.classList.add('nav--open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('nav-open');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const isOpen = nav.classList.contains('nav--open');
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeNav();
    }
  });

  const hero = document.getElementById('hero');

  function updateHeader() {
    if (!header) return;

    const pastHero = hero
      ? window.scrollY > hero.offsetHeight - 120
      : window.scrollY > 80;

    header.classList.toggle('header--light', pastHero);
    header.classList.toggle('header--scrolled', !pastHero && window.scrollY > 20);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', targetId);
    });
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add('visible');
      });
    }
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  if (phoneLink && window.matchMedia('(hover: hover)').matches) {
    phoneLink.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey) return;

      const number = this.textContent.trim();
      if (navigator.clipboard && number.includes('0000')) {
        e.preventDefault();
        navigator.clipboard.writeText(number).then(function () {
          const original = phoneLink.textContent;
          phoneLink.textContent = 'Copied!';
          setTimeout(function () {
            phoneLink.textContent = original;
          }, 1500);
        });
      }
    });
  }
})();
