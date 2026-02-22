/**
 * TF Aço Inox - Main Interaction Script
 * Enterprise-grade scroll animations with GSAP ScrollTrigger,
 * CountUp numbers, sticky header, and smooth reveal effects.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initGSAPAnimations();
  initCountUp();
  console.log('TF Master Theme: Enterprise Ready');
});

/* ============================================
   GSAP ScrollTrigger — Scroll-Telling Engine
   ============================================ */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // Fallback: use IntersectionObserver if GSAP not loaded
    initFallbackAnimations();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // [data-animate="fade-up"] — Cards, sections, generic elements
  gsap.utils.toArray('[data-animate="fade-up"]').forEach((el, i) => {
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

  // [data-animate="fade-left"] — Slide in from left
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

  // [data-animate="fade-right"] — Slide in from right
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

  // [data-animate="scale-in"] — Portfolio items, images
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

  // [data-animate="stagger-children"] — Parent that staggers children
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

  // Hero headline reveal
  const heroHeadline = document.querySelector('.hero-headline');
  if (heroHeadline) {
    gsap.from(heroHeadline, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
      delay: 0.3
    });
  }

  const heroSub = document.querySelector('.hero-subheadline');
  if (heroSub) {
    gsap.from(heroSub, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.6
    });
  }

  const heroCTA = document.querySelector('.hero-cta-wrapper');
  if (heroCTA) {
    gsap.from(heroCTA, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.9
    });
  }
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

        // Parse the target number (handle "500+", "10K", etc.)
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
