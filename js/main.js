/* ============================================
   ATLAS BOUWGROEP — Main JavaScript
   Scroll animations, navigation, counter, modal
   ============================================ */

(function () {
  'use strict';

  // --- Project Data (for modal) ---
  var projectData = [
    {
      title: 'Kantoorcomplex De Horizon',
      category: 'Nieuwbouw',
      location: 'Amsterdam',
      year: '2023',
      services: 'Ontwerp, nieuwbouw, afwerking',
      description: 'Een modern kantoorcomplex van 12.000m² in het hart van Amsterdam Zuidas. Het gebouw combineert duurzame materialen met een tijdloos ontwerp en beschikt over een BREEAM Excellent certificering.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80'
    },
    {
      title: 'Villa Duinzicht',
      category: 'Nieuwbouw',
      location: 'Wassenaar',
      year: '2024',
      services: 'Ontwerp, nieuwbouw, tuinaanleg',
      description: 'Een exclusieve villa met panoramisch uitzicht over de duinen. Gebouwd met de hoogste kwaliteit materialen, inclusief vloerverwarming, domotica en een geïntegreerd zwembad.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
    },
    {
      title: 'Appartementencomplex Riviera',
      category: 'Projectontwikkeling',
      location: 'Rotterdam',
      year: '2023',
      services: 'Projectontwikkeling, bouw, oplevering',
      description: 'Een complex van 64 luxe appartementen aan de Maas. Elk appartement is voorzien van een ruim balkon en hoogwaardige afwerking. Het project werd binnen de gestelde termijn opgeleverd.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80'
    },
    {
      title: 'Herenhuis aan de Gracht',
      category: 'Renovatie',
      location: 'Utrecht',
      year: '2022',
      services: 'Renovatie, restauratie, interieur',
      description: 'Een monumentaal herenhuis uit 1890, volledig gerenoveerd met behoud van authentieke details. Moderne voorzieningen zijn naadloos geïntegreerd in het historische karakter van het pand.',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80'
    },
    {
      title: 'Residentie Parkview',
      category: 'Nieuwbouw',
      location: 'Den Haag',
      year: '2024',
      services: 'Ontwerp, nieuwbouw, landschapsarchitectuur',
      description: 'Een prestigieus wooncomplex grenzend aan het Zuiderpark. 28 ruime woningen met privétuinen, ondergrondse parkeergarage en gemeenschappelijke daktuin met uitzicht over de stad.',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80'
    },
    {
      title: 'Bedrijfspand Innovate',
      category: 'Zakelijk',
      location: 'Eindhoven',
      year: '2023',
      services: 'Nieuwbouw, inrichting, technische installaties',
      description: 'Een state-of-the-art bedrijfspand op Strijp-S voor een toonaangevend techbedrijf. Het gebouw beschikt over flexibele werkruimtes, een eigen auditorium en energieneutraal ontwerp.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80'
    }
  ];

  // --- Check reduced motion preference ---
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Navigation ---
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function handleNavScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  // Mobile toggle
  navToggle.addEventListener('click', function () {
    var isActive = navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isActive);
    navToggle.setAttribute('aria-label', isActive ? 'Menu sluiten' : 'Menu openen');
    document.body.classList.toggle('menu-open', isActive);
  });

  // Close menu on link click
  navLinks.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Menu openen');
      document.body.classList.remove('menu-open');
    });
  });

  // --- Scroll Reveal (IntersectionObserver) ---
  function initReveal() {
    var reveals = document.querySelectorAll('.reveal');

    if (prefersReducedMotion) {
      reveals.forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

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
      reveals.forEach(function (el) {
        el.classList.add('revealed');
      });
    }
  }

  // --- Animated Counter ---
  function animateCounters() {
    var counters = document.querySelectorAll('[data-count]');

    if (prefersReducedMotion) {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute('data-count');
      });
      return;
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var el = entry.target;
              var target = parseInt(el.getAttribute('data-count'), 10);
              var duration = 2000;
              var startTime = null;

              function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
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
    } else {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute('data-count');
      });
    }
  }

  // --- Project Modal ---
  var modal = document.getElementById('projectModal');
  var modalBackdrop = document.getElementById('modalBackdrop');
  var modalClose = document.getElementById('modalClose');
  var modalImage = document.getElementById('modalImage');
  var modalCategory = document.getElementById('modalCategory');
  var modalTitle = document.getElementById('modalTitle');
  var modalLocation = document.getElementById('modalLocation');
  var modalYear = document.getElementById('modalYear');
  var modalServices = document.getElementById('modalServices');
  var modalDescription = document.getElementById('modalDescription');
  var lastFocusedElement = null;

  function openModal(index) {
    var project = projectData[index];
    if (!project) return;

    lastFocusedElement = document.activeElement;

    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalCategory.textContent = project.category;
    modalTitle.textContent = project.title;
    modalLocation.textContent = project.location;
    modalYear.textContent = project.year;
    modalServices.textContent = project.services;
    modalDescription.textContent = project.description;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  // Project card click handlers
  document.querySelectorAll('.project-card[data-project]').forEach(function (card) {
    card.addEventListener('click', function () {
      var index = parseInt(this.getAttribute('data-project'), 10);
      openModal(index);
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var index = parseInt(this.getAttribute('data-project'), 10);
        openModal(index);
      }
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  // Close modal with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Trap focus inside modal
  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var focusable = modal.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // --- Smooth Scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

  // --- Parallax on hero image ---
  var heroImage = document.querySelector('.hero__image');
  function handleParallax() {
    if (window.innerWidth < 768 || prefersReducedMotion) return;
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
