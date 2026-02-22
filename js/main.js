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
  console.log('TF Master Theme: Cinematic Engine Loaded. Smooth Scroll & Split Typography Active.');
});

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

  // Process Timeline - Draw the connecting line dynamically on scroll
  const timelineLine = document.querySelector('.timeline-line');
  const tfaProcess = document.querySelector('.tfa-process-timeline');
  if (timelineLine && tfaProcess) {
    gsap.from(timelineLine, {
      scaleY: 0,
      transformOrigin: "top center",
      ease: "none",
      scrollTrigger: {
        trigger: tfaProcess,
        start: "top center",
        end: "bottom center",
        scrub: 1 // 1 second smoothing on the scrub
      }
    });
  }

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
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  // [data-animate="fade-left"]
  gsap.utils.toArray('[data-animate="fade-left"]').forEach(el => {
    gsap.from(el, {
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // [data-animate="fade-right"]
  gsap.utils.toArray('[data-animate="fade-right"]').forEach(el => {
    gsap.from(el, {
      x: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // [data-animate="scale-in"]
  gsap.utils.toArray('[data-animate="scale-in"]').forEach(el => {
    gsap.from(el, {
      scale: 0.9,
      opacity: 0,
      duration: 0.7,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  // [data-animate="stagger-children"]
  gsap.utils.toArray('[data-animate="stagger-children"]').forEach(parent => {
    const children = parent.children;
    gsap.from(children, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: parent,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });
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
