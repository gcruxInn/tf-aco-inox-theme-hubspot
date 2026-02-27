/**
 * TFA Process Timeline — GSAP Scroll Reveal (V2)
 * Dynamic Construction Reveal — Horizontal Directional Entry
 *
 * Rules:
 *  - NO PINNING under any circumstances.
 *  - Isolated IIFE: does not pollute global scope.
 *  - Editor Guard (Peace Protocol): all animations disabled inside
 *    HubSpot Drop-and-Drop editor contexts.
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
    console.warn('[TFA Timeline V2] GSAP or ScrollTrigger not loaded. Animations skipped.');
    // Ensure cards are visible without JS
    document.querySelectorAll('[data-timeline-card]').forEach(function (card) {
      card.style.opacity = '1';
      card.style.transform = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ============================================================
  // HEADER FADE-IN
  // ============================================================
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

  // ============================================================
  // CARD SCROLL REVEAL — Horizontal Stagger, Alternating Direction
  //
  // Left cards  (data-direction="left"):  x: -80 → 0
  // Right cards (data-direction="right"): x:  80 → 0
  //
  // NO PINNING — pure scroll-triggered entry animation.
  // ============================================================
  var cards = document.querySelectorAll('[data-timeline-card]');

  cards.forEach(function (card, index) {
    var isLeft  = card.dataset.direction === 'left';
    var xOffset = isLeft ? -80 : 80;

    gsap.fromTo(
      card,
      { x: xOffset, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.88,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 84%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

})();
