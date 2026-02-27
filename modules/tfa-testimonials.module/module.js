/**
 * TFA Testimonials — GSAP Scroll Reveal
 * Stagger entrance: y:40 → y:0, opacity:0 → 1
 * Power3.out easing | ScrollTrigger once:true
 *
 * Rules:
 *  - Peace Protocol: no animations inside HubSpot content editor.
 *  - Graceful degradation: if GSAP unavailable, content remains fully visible.
 *  - Isolated IIFE: does not pollute global scope.
 *  - Waits for GSAP via polling loop before registering plugins.
 */
(function () {
  'use strict';

  // ============================================================
  // PEACE PROTOCOL — Editor Guard
  // Abort immediately if running inside the HubSpot CMS editor
  // to prevent layout breakages and JS conflicts.
  // ============================================================
  if (
    document.body.classList.contains('hs-edit-mode') ||
    document.body.classList.contains('hs-inline-edit') ||
    document.querySelector('.hs-inline-edit') !== null
  ) {
    return;
  }

  // ============================================================
  // INIT — Poll until GSAP + ScrollTrigger are available
  // ============================================================
  function initTestimonialsAnim() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return setTimeout(initTestimonialsAnim, 100);
    }

    gsap.registerPlugin(ScrollTrigger);

    var section = document.querySelector('.tfa-testimonials-section');
    if (!section) return;

    // ----------------------------------------------------------
    // 1. HEADER — fade-up reveal
    // ----------------------------------------------------------
    var header = section.querySelector('.testimonials-header');
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
            start: 'top 85%',
            once: true
          }
        }
      );
    }

    // ----------------------------------------------------------
    // 2. CARDS — stagger reveal from y:40
    // Triggered by the grid container entering the viewport.
    // ----------------------------------------------------------
    var grid  = section.querySelector('.testimonials-grid');
    var cards = section.querySelectorAll('.testimonial-card');

    if (grid && cards.length > 0) {
      gsap.set(cards, { y: 40, opacity: 0 });
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          once: true
        }
      });
    }
  }

  initTestimonialsAnim();

})();
