/* ============================================
   ATLAS BOUWGROEP — Main JavaScript
   Scroll animations, navigation, counter
   ============================================ */

(function () {
  'use strict';

  // --- Navigation ---
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Scroll state
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = scrollY;
  }

  // Mobile toggle
  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // --- Scroll Reveal (IntersectionObserver) ---
  function initReveal() {
    var reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      reveals.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: show all
      reveals.forEach(function (el) {
        el.classList.add('revealed');
      });
    }
  }

  // --- Animated Counter ---
  function animateCounters() {
    var counters = document.querySelectorAll('[data-count]');

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var el = entry.target;
              var target = parseInt(el.getAttribute('data-count'), 10);
              var duration = 2000;
              var start = 0;
              var startTime = null;

              function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                // Ease out cubic
                var eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target);
                if (progress < 1) {
                  requestAnimationFrame(step);
                } else {
                  el.textContent = target;
                }
              }

              requestAnimationFrame(step);
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.5 }
      );

      counters.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  // --- Smooth Scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80; // nav height
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- Parallax on hero image ---
  var heroImage = document.querySelector('.hero__image');
  function handleParallax() {
    if (window.innerWidth < 768) return;
    var scrollY = window.scrollY;
    var heroHeight = window.innerHeight;
    if (scrollY < heroHeight) {
      heroImage.style.transform = 'scale(' + (1.05 - scrollY * 0.00005) + ') translateY(' + scrollY * 0.3 + 'px)';
    }
  }

  // --- Event Listeners ---
  window.addEventListener('scroll', function () {
    handleNavScroll();
    handleParallax();
  }, { passive: true });

  // --- Init ---
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    animateCounters();
    handleNavScroll();
  });
})();
