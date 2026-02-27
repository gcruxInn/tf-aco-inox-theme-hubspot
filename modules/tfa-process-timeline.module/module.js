/**
 * TFA Process Timeline — GSAP Scroll Reveal (V6)
 * 3D Ironhill Forge Effect — Lateral Inclined Entry
 * + Graceful Degradation Mobile via gsap.matchMedia()
 *
 * Rules:
 *  - NO PINNING under any circumstances.
 *  - Isolated IIFE: does not pollute global scope.
 *  - Editor Guard (Peace Protocol): all animations disabled inside
 *    HubSpot Drop-and-Drop editor contexts.
 *  - matchMedia scopes contain all ScrollTriggers to prevent memory leaks.
 *  - Desktop metrics (>= 768px) remain untouched.
 *  - Mobile (< 768px) uses reduced rotation/offset for FPS preservation.
 */
(function () {
  'use strict';

  // ============================================================
  // EDITOR GUARD (Peace Protocol)
  // Abort immediately if running inside the HubSpot content editor
  // to prevent layout breakages and animation conflicts.
  // ============================================================
  if (
    document.body.classList.contains('hs-edit-mode') ||
    document.body.classList.contains('hs-inline-edit') ||
    document.querySelector('.hs-inline-edit') !== null
  ) {
    return;
  }

  // ============================================================
  // DEPENDENCY CHECK
  // Graceful degradation: if GSAP / ScrollTrigger are unavailable,
  // cards remain visible (opacity:1 fallback via CSS Editor Guard rules).
  // ============================================================
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[TFA Timeline V6] GSAP or ScrollTrigger not loaded. Animations skipped.');
    document.querySelectorAll('[data-timeline-card]').forEach(function (card) {
      card.style.opacity = '1';
      card.style.transform = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ============================================================
  // RESPONSIVE ANIMATION via gsap.matchMedia()
  // All ScrollTrigger instances live inside their respective scopes.
  // GSAP handles cleanup automatically when breakpoints switch,
  // preventing memory leaks from orphaned ScrollTrigger instances.
  // ============================================================
  var mm = gsap.matchMedia();

  // ----------------------------------------------------------
  // SCOPE 1: DESKTOP (>= 768px)
  // Full 3D Ironhill Forge effect — heavy metallic inertia intact.
  // ----------------------------------------------------------
  mm.add('(min-width: 768px)', function () {
    var section = document.querySelector('.tfa-timeline-section');
    if (section) {
      gsap.set(section, { perspective: 800 });
    }

    var header = document.querySelector('.tfa-timeline-section .timeline-header');
    if (header) {
      gsap.fromTo(
        header,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    var cards = document.querySelectorAll('[data-timeline-card]');
    cards.forEach(function (card) {
      var isLeft  = card.dataset.direction === 'left';
      var rotateY = isLeft ?  75 : -75;
      var xOffset = isLeft ? -80 :  80;

      gsap.fromTo(
        card,
        {
          rotateY: rotateY,
          x: xOffset,
          opacity: 0,
          transformOrigin: isLeft ? 'left center' : 'right center'
        },
        {
          rotateY: 0,
          x: 0,
          opacity: 1,
          duration: 0.92,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 84%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true
          }
        }
      );
    });
  });

  // ----------------------------------------------------------
  // SCOPE 2: MOBILE (< 768px)
  // Reduced 3D depth for FPS preservation on mid-range devices.
  // rotateY: 75° -> 40° | x: 80px -> 40px | duration: 0.92 -> 0.75
  // ----------------------------------------------------------
  mm.add('(max-width: 767px)', function () {
    var section = document.querySelector('.tfa-timeline-section');
    if (section) {
      gsap.set(section, { perspective: 600 });
    }

    var header = document.querySelector('.tfa-timeline-section .timeline-header');
    if (header) {
      gsap.fromTo(
        header,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    var cards = document.querySelectorAll('[data-timeline-card]');
    cards.forEach(function (card) {
      var isLeft  = card.dataset.direction === 'left';
      var rotateY = isLeft ?  40 : -40;
      var xOffset = isLeft ? -40 :  40;

      gsap.fromTo(
        card,
        {
          rotateY: rotateY,
          x: xOffset,
          opacity: 0,
          transformOrigin: isLeft ? 'left center' : 'right center'
        },
        {
          rotateY: 0,
          x: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 84%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true
          }
        }
      );
    });
  });

})();
