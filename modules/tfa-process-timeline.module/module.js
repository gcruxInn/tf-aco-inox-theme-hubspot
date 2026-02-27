/**
 * TFA Process Timeline — Cinematic Fly-In Cards (V7)
 * Pinned Section + Horizontal Fly-In/Exit + Observer Drag/Swipe
 *
 * Architecture:
 *  - Section is PINNED via ScrollTrigger (pin: true, scrub: 1)
 *  - Cards fly in from alternating sides (left/right) with heavy inertia
 *  - Each card lands center, then exits opposite side on continued scroll
 *  - Observer plugin enables touch/drag lateral navigation
 *  - Peace Protocol: all animations disabled inside HubSpot editor
 *
 * GSAP Plugins required: ScrollTrigger, Observer
 */
/**
 * TFA Process Timeline — Cinematic Fly-In Cards (V7)
 * Pinned Section + Horizontal Fly-In/Exit + Observer Drag/Swipe
 *
 * Architecture:
 *  - Section is PINNED via ScrollTrigger (pin: true, scrub: 1)
 *  - Cards fly in from alternating sides (left/right) with heavy inertia
 *  - Each card lands center, then exits opposite side on continued scroll
 *  - Observer plugin enables touch/drag lateral navigation
 *  - Peace Protocol: all animations disabled inside HubSpot editor
 *
 * GSAP Plugins required: ScrollTrigger, Observer
 */
(function () {
  'use strict';

  // ============================================================
  // PEACE PROTOCOL — Editor Guard
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
  // ============================================================
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[TFA Timeline V7] GSAP or ScrollTrigger not loaded. Animations skipped.');
    document.querySelectorAll('[data-timeline-card]').forEach(function (card) {
      card.style.opacity = '1';
      card.style.transform = 'none';
      card.style.position = 'relative';
      card.style.pointerEvents = 'auto';
    });
    var stack = document.querySelector('.process-timeline-stack');
    if (stack) {
      stack.style.height = 'auto';
      stack.style.display = 'flex';
      stack.style.flexDirection = 'column';
      stack.style.gap = '2rem';
    }
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Register Observer if available (touch/drag support)
  var hasObserver = typeof Observer !== 'undefined';
  if (hasObserver) {
    gsap.registerPlugin(Observer);
  }

  // ============================================================
  // CONFIGURATION
  // ============================================================
  var section = document.querySelector('.tfa-timeline-section');
  var stackContainer = document.querySelector('.process-timeline-stack');
  var cards = gsap.utils.toArray('[data-timeline-card]');
  var header = document.querySelector('.tfa-timeline-section .timeline-header');

  if (!section || !stackContainer || cards.length === 0) return;

  var totalCards = cards.length;
  // Each card gets 2 phases: fly-in (land) + fly-out (exit) = 2 segments per card
  // Last card only lands (no exit), so: (totalCards * 2 - 1) segments
  var totalSegments = totalCards * 2 - 1;

  // ============================================================
  // HEADER ANIMATION — plays once on scroll
  // ============================================================
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
  // INITIAL CARD SETUP — position off-screen
  // ============================================================
  cards.forEach(function (card, i) {
    var isOdd = i % 2 === 0; // 0-indexed: even index = odd card (flies from left)
    var xStart = isOdd ? '-120vw' : '120vw';
    var rotateZ = isOdd ? -12 : 12;
    var rotateY = isOdd ? 25 : -25;

    gsap.set(card, {
      x: xStart,
      rotateZ: rotateZ,
      rotateY: rotateY,
      opacity: 0,
      scale: 0.85,
      transformOrigin: 'center center'
    });
  });

  // ============================================================
  // MASTER TIMELINE — scrubbed by ScrollTrigger
  // ============================================================
  var masterTL = gsap.timeline();

  cards.forEach(function (card, i) {
    var isOdd = i % 2 === 0;
    var exitX = isOdd ? '120vw' : '-120vw'; // Exit to opposite side

    // Phase 1: FLY IN (land at center)
    masterTL.to(card, {
      x: 0,
      rotateZ: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power4.out',
      onStart: function () {
        card.classList.add('is-active');
      }
    });

    // Phase 2: FLY OUT (exit to opposite side) — skip for last card
    if (i < totalCards - 1) {
      masterTL.to(card, {
        x: exitX,
        rotateZ: isOdd ? 8 : -8,
        rotateY: isOdd ? -20 : 20,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.in',
        onStart: function () {
          card.classList.remove('is-active');
        }
      });
    }
  });

  // ============================================================
  // PIN THE SECTION + SCRUB THE MASTER TIMELINE
  // ============================================================
  ScrollTrigger.create({
    trigger: section,
    pin: true,
    scrub: 1,
    start: 'top top',
    end: '+=' + (totalSegments * 100) + '%',
    animation: masterTL,
    invalidateOnRefresh: true,
    anticipatePin: 1
  });

  // ============================================================
  // OBSERVER — Touch / Drag / Swipe lateral navigation
  // Maps horizontal drag to scroll progress for mobile UX
  // ============================================================
  if (hasObserver) {
    var isDragging = false;
    var dragSensitivity = 2.5; // px-to-scroll multiplier

    Observer.create({
      target: section,
      type: 'touch,pointer',
      dragMinimum: 10,
      onDragStart: function () {
        isDragging = true;
      },
      onDrag: function (self) {
        if (!isDragging) return;
        // Convert horizontal drag delta to vertical scroll movement
        var delta = -self.deltaX * dragSensitivity;
        window.scrollBy(0, delta);
      },
      onDragEnd: function () {
        isDragging = false;
      },
      tolerance: 10,
      preventDefault: true
    });
  }

})();
