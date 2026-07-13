/* ================================================================
   script.js — Bhoomika Hegde CV v2
   Handles: custom cursor, scroll-reveal, mobile nav, active nav link,
   project filter chips, footer year.
   Pure vanilla JS, no dependencies.
   ================================================================ */

(function () {
  'use strict';
  /* ── Page loader ─────────────────────────────────────────── */
  var loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('hidden');
      }, 1300);
    });
  }

  /* ── Footer year ─────────────────────────────────────────────── */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Custom cursor (desktop / fine-pointer only) ───────────────
     Mirrors the CSS media query — JS skips all work on touch devices
     so there's zero overhead and no stray dots on mobile. */
  var supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (supportsHover) {
    var dot = document.getElementById('cursor-dot');
    var ring = document.getElementById('cursor-ring');

    if (dot && ring) {
      var mouseX = -100, mouseY = -100;
      var ringX = -100, ringY = -100;

      document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
      });

      function animateRing() {
        // gentle lag/ease so the ring trails the dot — kept subtle
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
      }
      animateRing();

      // Grow the ring over interactive elements
      var hoverTargets = document.querySelectorAll('a, button, .card, .filter-chip');
      hoverTargets.forEach(function (el) {
        el.addEventListener('mouseenter', function () {
          document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', function () {
          document.body.classList.remove('cursor-hover');
        });
      });

      document.addEventListener('mouseleave', function () {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
      });
      document.addEventListener('mouseenter', function () {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      });
    }
  }

  /* ── Mobile menu toggle ───────────────────────────────────────── */
  var btn = document.querySelector('.nav-menu-btn');
  var menu = document.getElementById('mobile-menu');

  if (btn && menu) {
    btn.addEventListener('click', function () {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      menu.hidden = isOpen;
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        btn.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) {
        btn.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
        document.body.style.overflow = '';
        btn.focus();
      }
    });
  }

  /* ── Active nav link on scroll ───────────────────────────────── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && navLinks.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
            var match = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
            if (match) match.setAttribute('aria-current', 'page');
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ── Scroll reveal ────────────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ── Project filter chips ────────────────────────────────────── */
  var filterChips = document.querySelectorAll('.filter-chip');
  var projectItems = document.querySelectorAll('.card-grid > li');
  var emptyState = document.querySelector('.filter-empty');

  if (filterChips.length && projectItems.length) {
    filterChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        filterChips.forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');

        var filter = chip.getAttribute('data-filter');
        var visibleCount = 0;

        projectItems.forEach(function (item) {
          var categories = (item.getAttribute('data-category') || '').split(' ');
          var show = filter === 'all' || categories.indexOf(filter) !== -1;
          item.hidden = !show;
          if (show) visibleCount++;
        });

        if (emptyState) emptyState.hidden = visibleCount > 0;
      });
    });
  }

})();
