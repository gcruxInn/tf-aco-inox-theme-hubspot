/**
 * TFA Process Timeline — GSAP Scroll Reveal (V5)
 * 3D Ironhill Forge Effect — Lateral Inclined Entry
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
    console.warn('[TFA Timeline V5] GSAP or ScrollTrigger not loaded. Animations skipped.');
    document.querySelectorAll('[data-timeline-card]').forEach(function (card) {
      card.style.opacity = '1';
      card.style.transform = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ============================================================
  // PERSPECTIVE — 3D Ironhill Forge spatial depth
  // Applied to the section container so all card transforms
  // share the same vanishing point.
  // ============================================================
  var section = document.querySelector('.tfa-timeline-section');
  if (section) {
    gsap.set(section, { perspective: 800 });
  }

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
  // CARD SCROLL REVEAL — 3D Lateral Inclined Entry
  //
  // Left cards  (data-direction="left"):  rotateY(55deg) + translateX(-80px)
  // Right cards (data-direction="right"): rotateY(-55deg) + translateX(80px)
  //
  // The rotateY + translate3d simulates a metal plate swinging
  // into place from the side — "Ironhill Forge" encaixe metálico.
  // ease: power4.out gives the heavy metallic snap feel.
  //
  // NO PINNING — pure scroll-triggered 3D entry animation.
  // ============================================================
  var cards = document.querySelectorAll('[data-timeline-card]');

  cards.forEach(function (card) {
    var isLeft   = card.dataset.direction === 'left';
    var rotateY  = isLeft ?  75 : -75;
    var xOffset  = isLeft ? -80 :  80;

    gsap.fromTo(
      card,
      {
        rotateY:  rotateY,
        x:        xOffset,
        opacity:  0,
        transformOrigin: isLeft ? 'left center' : 'right center'
      },
      {
        rotateY:  0,
        x:        0,
        opacity:  1,
        duration: 0.92,
        ease:     'expo.out',
        scrollTrigger: {
          trigger: card,
          start:   'top 84%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true
        }
      }
    );
  });

})();
