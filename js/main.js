/**
 * TF Aço Inox - Ultra-Premium Cinematic Engine
 * Powered by GSAP ScrollTrigger, Lenis (Smooth Scroll), and SplitType
 */

window.addEventListener('load', () => {
  initStickyHeader();

  // Initialize the Cinematic Engine if libraries are loaded
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && typeof Lenis !== 'undefined') {
    initLenis();
    initCinematicText();
    initGSAPAnimations();
  } else {
    // Fallback for browsers blocking CDN scripts
    initFallbackAnimations();
  }

  initCountUp();
  initInoxMouseReflection();
  initServiceCards3DTilt();
  console.log('TF Master Theme: Cinematic Engine Loaded. Smooth Scroll & Split Typography Active.');
});

/* ============================================
   Inox Chrome — Dynamic Mouse Reflection
   Feeds CSS custom properties (--mouse-x, --mouse-y, --mouse-angle)
   to the .btn-hero-secondary so its metallic shine
   reacts in real-time to the cursor like polished steel.
   ============================================ */
function initInoxMouseReflection() {
  var btns = document.querySelectorAll('.btn-hero-secondary');
  if (!btns.length) return;

  var DAMPING = 0.08; // Lower = smoother/slower catch-up (0.05–0.15 sweet spot)

  btns.forEach(function (btn) {
    // Target values (where the mouse IS right now)
    var targetX = 50, targetY = 50, targetAngle = 0;
    // Current interpolated values (what CSS sees — glides toward target)
    var currentX = 50, currentY = 50, currentAngle = 0;
    var isHovering = false;
    var rafId = null;

    function lerp(current, target, factor) {
      return current + (target - current) * factor;
    }

    // Shortest-path angle interpolation (avoids 359° → 1° jump)
    function lerpAngle(current, target, factor) {
      var diff = target - current;
      // Normalize to [-180, 180]
      while (diff > 180) diff -= 360;
      while (diff < -180) diff += 360;
      return current + diff * factor;
    }

    function tick() {
      currentX = lerp(currentX, targetX, DAMPING);
      currentY = lerp(currentY, targetY, DAMPING);
      currentAngle = lerpAngle(currentAngle, targetAngle, DAMPING);

      btn.style.setProperty('--mouse-x', currentX.toFixed(1));
      btn.style.setProperty('--mouse-y', currentY.toFixed(1));
      btn.style.setProperty('--mouse-angle', currentAngle.toFixed(1));

      // Keep the loop alive while hovering OR while still catching up after leave
      var settled = Math.abs(currentX - targetX) < 0.1 &&
        Math.abs(currentY - targetY) < 0.1 &&
        Math.abs(currentAngle - targetAngle) < 0.5;

      if (isHovering || !settled) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();

      // Raw percentage position of cursor within the button (0–100)
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;

      // Angle from center of button (degrees, 0–360)
      var cx = e.clientX - rect.left - rect.width / 2;
      var cy = e.clientY - rect.top - rect.height / 2;
      targetAngle = Math.atan2(cy, cx) * (180 / Math.PI) + 180;

      if (!isHovering) {
        isHovering = true;
        if (!rafId) rafId = requestAnimationFrame(tick);
      }
    });

    btn.addEventListener('mouseleave', function () {
      isHovering = false;
      // Glide back to center instead of snapping
      targetX = 50;
      targetY = 50;
      targetAngle = 0;
      if (!rafId) rafId = requestAnimationFrame(tick);
    });
  });
}

/* ============================================
   Service Cards — 3D Perspective Tilt
   Interactive card tilt that follows cursor with
   smooth damped interpolation. Pure 3D, no glow.
   ============================================ */
function initServiceCards3DTilt() {
  var cards = document.querySelectorAll('.service-card, .timeline-glass-panel');
  if (!cards.length) return;

  var DAMPING = 0.08;
  var MAX_TILT = 8;
  var SCALE_HOVER = 1.03;

  cards.forEach(function (card) {
    var targetTiltX = 0, targetTiltY = 0, targetScale = 1;
    var currentTiltX = 0, currentTiltY = 0, currentScale = 1;
    var isHovering = false;
    var rafId = null;

    function lerp(a, b, f) { return a + (b - a) * f; }

    function tick() {
      currentTiltX = lerp(currentTiltX, targetTiltX, DAMPING);
      currentTiltY = lerp(currentTiltY, targetTiltY, DAMPING);
      currentScale = lerp(currentScale, targetScale, DAMPING);

      card.style.transform =
        'perspective(1200px)' +
        ' rotateX(' + currentTiltX.toFixed(2) + 'deg)' +
        ' rotateY(' + currentTiltY.toFixed(2) + 'deg)' +
        ' scale3d(' + currentScale.toFixed(3) + ',' + currentScale.toFixed(3) + ',1)';

      var settled = Math.abs(currentTiltX - targetTiltX) < 0.05 &&
        Math.abs(currentTiltY - targetTiltY) < 0.05 &&
        Math.abs(currentScale - targetScale) < 0.001;

      if (isHovering || !settled) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var px = ((e.clientX - rect.left) / rect.width) * 100;
      var py = ((e.clientY - rect.top) / rect.height) * 100;

      var normX = (px / 100) * 2 - 1;
      var normY = (py / 100) * 2 - 1;
      targetTiltX = -normY * MAX_TILT;
      targetTiltY = normX * MAX_TILT;
      targetScale = SCALE_HOVER;

      if (!isHovering) {
        isHovering = true;
        if (!rafId) rafId = requestAnimationFrame(tick);
      }
    });

    card.addEventListener('mouseleave', function () {
      isHovering = false;
      targetTiltX = 0;
      targetTiltY = 0;
      targetScale = 1;
      if (!rafId) rafId = requestAnimationFrame(tick);
    });
  });
}

/* ============================================
   Lenis — Smooth Scrolling
   ============================================ */
let lenis;
function initLenis() {
  lenis = new Lenis({
    lerp: 0.1, // controls the fluidity/smoothness
    smoothWheel: true,
  });

  // Sync GSAP ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

/* ============================================
   SplitType — Cinematic Text Reveals
   ============================================ */
function initCinematicText() {
  if (typeof SplitType === 'undefined') return;

  // Select major headings that deserve the "Steel & Inox" precision reveal
  const splitElements = document.querySelectorAll('.hero-headline, h2.display-5');

  splitElements.forEach(el => {
    // Split the text into lines, words, and characters
    const text = new SplitType(el, { types: 'lines, words, chars' });

    // We animate each character rising up slightly tilted, like mechanical assembly
    gsap.from(text.chars, {
      y: '100%',
      opacity: 0,
      rotationZ: 2,
      duration: 0.8,
      stagger: 0.015,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });
}

/* ============================================
   GSAP ScrollTrigger — Core Animations & Parallax
   ============================================ */
function initGSAPAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Parallax Images (Backgrounds and Portfolio cards)
  // Image moves slightly inside its container as user scrolls
  gsap.utils.toArray('.hero-bg-overlay, .portfolio-card img').forEach(img => {
    // Ensure parent has overflow hidden for parallax to work correctly
    if (img.parentElement) {
      img.parentElement.style.overflow = 'hidden';
    }
    gsap.fromTo(img,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
  });



  // Extreme Mechanics: Horizontal Scroll Pinning for Differentiators
  const diffOuterWrapper = document.querySelector('.diff-super-gsap-wrapper');
  const diffWrapper = document.querySelector('.tfa-differentiators');
  const diffTrack = document.querySelector('.differentiators-track');

  if (diffOuterWrapper && diffWrapper && diffTrack) {
    // Force opacity to 1 bypassing any fallback scripts
    const cards = document.querySelectorAll('.tfa-differentiators .diff-card');
    cards.forEach(card => card.style.opacity = 1);

    function getScrollAmount() {
      let trackWidth = diffTrack.scrollWidth;
      // Calculate how much track is hidden outside the 1024px container (or current wrapper width)
      return -(trackWidth - diffWrapper.offsetWidth);
    }

    // Ensure it only pins if the track is actually wider than the screen
    if (getScrollAmount() < 0) {
      const tween = gsap.to(diffTrack, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: diffOuterWrapper, // Pin the full-width outer wrapper to prevent GSAP margin-auto bugs
        start: "center center",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
      });
    }
  }

  // [data-animate="fade-up"] 
  gsap.utils.toArray('[data-animate="fade-up"]').forEach((el) => {
    // Skip if it's already animated by SplitType (h2)
    if (el.tagName === 'H2' && document.querySelector('h2.display-5')) {
      if (el.classList.contains('display-5')) return;
    }

    const delay = parseFloat(el.dataset.delay || 0) / 1000;
    gsap.fromTo(el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      });
  });

  // [data-animate="fade-left"]
  gsap.utils.toArray('[data-animate="fade-left"]').forEach(el => {
    gsap.fromTo(el,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
  });

  // [data-animate="fade-right"]
  gsap.utils.toArray('[data-animate="fade-right"]').forEach(el => {
    gsap.fromTo(el,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
  });

  // [data-animate="scale-in"]
  gsap.utils.toArray('[data-animate="scale-in"]').forEach(el => {
    gsap.fromTo(el,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      });
  });

  // [data-animate="stagger-children"]
  gsap.utils.toArray('[data-animate="stagger-children"]').forEach(parent => {
    const children = parent.children;
    gsap.fromTo(children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: parent,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
  });

  // Safety net: Refresh ScrollTrigger after a short delay to catch
  // elements already in viewport on initial page load
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 300);
}

/* ============================================
   CountUp — Animate Numbers on Scroll
   ============================================ */
function initCountUp() {
  const counters = document.querySelectorAll('[data-countup]');
  if (!counters.length) return;

  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.3 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const raw = el.dataset.countup;
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';

        const target = parseFloat(raw.replace(/[^0-9.]/g, ''));
        const hasPlus = raw.includes('+');
        const duration = 2000;
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);

          el.textContent = prefix + current.toLocaleString('pt-BR') + (hasPlus && progress >= 1 ? '+' : '') + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          }
        }

        requestAnimationFrame(updateCount);
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  counters.forEach(el => observer.observe(el));
}

/* ============================================
   Fallback Animations (No GSAP)
   ============================================ */
function initFallbackAnimations() {
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('[data-animate], .animate-fade-up');
  elements.forEach(el => observer.observe(el));
}

/* ============================================
   Sticky Header with Glassmorphism
   ============================================ */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const scrollThreshold = 80;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}
