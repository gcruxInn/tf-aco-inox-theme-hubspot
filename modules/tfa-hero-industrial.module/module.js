// ===== TFA Hero Industrial - GSAP Cinematic Scrolltelling =====
// Peace Protocol: Disable in HubSpot Editor
if (window.hsInEditor || document.body.classList.contains('hs-edit-mode')) {
  return;
}

// ===== Dependency Check & Initialization Loop =====
(function initHeroAnimation() {
  if (typeof gsap === 'undefined' || typeof SplitType === 'undefined') {
    setTimeout(initHeroAnimation, 100);
    return;
  }

  // Register ScrollTrigger plugin
  if (gsap.registerPlugin && !gsap.plugins.ScrollTrigger) {
    console.warn('ScrollTrigger plugin not available. Video scale animation skipped.');
  }

  // ===== ELEMENT SELECTION =====
  const heroSection = document.querySelector('.tfa-hero-section');
  const heroVideo = document.querySelector('.hero-bg-video');
  const heroHeadline = document.querySelector('.hero-headline');
  const heroSubheadline = document.querySelector('.hero-subheadline');
  const heroCtaWrapper = document.querySelector('.hero-cta-wrapper');
  const heroBadges = document.querySelector('.hero-trust-badges');
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');

  if (!heroSection) return;

  // ===== HERO CONTENT INITIAL STATE ANIMATION =====
  // Staggered entrance of headline, subheadline, CTAs, and badges
  gsap.set([heroHeadline, heroSubheadline, heroCtaWrapper, heroBadges, scrollIndicator], {
    opacity: 0,
    y: 40
  });

  // Apply SplitType to headline for character-level reveal
  if (heroHeadline && typeof SplitType !== 'undefined') {
    const split = new SplitType(heroHeadline, { types: 'chars, words' });

    gsap.from(split.chars, {
      duration: 1.2,
      opacity: 0,
      y: 20,
      stagger: 0.05,
      ease: 'power4.out',
      delay: 0.2
    });
  } else {
    // Fallback: animate headline without SplitType
    gsap.to(heroHeadline, {
      duration: 1,
      opacity: 1,
      y: 0,
      ease: 'power4.out',
      delay: 0.2
    });
  }

  // Staggered animation for supporting elements
  gsap.to([heroSubheadline, heroCtaWrapper, heroBadges], {
    duration: 0.8,
    opacity: 1,
    y: 0,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.8
  });

  // Scroll indicator animation (continuous bounce)
  gsap.to(scrollIndicator, {
    duration: 0.8,
    opacity: 1,
    y: 0,
    ease: 'power3.out',
    delay: 1.4
  });

  // ===== VIDEO SCALE ANIMATION ON SCROLL =====
  // Scrubbed: Scale down from 1.1 to 1.0 as user scrolls into the hero section
  if (heroVideo && typeof gsap !== 'undefined' && gsap.plugins && gsap.plugins.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(heroVideo, {
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1, // Smooth scrubbing: 1 = smooth follow
        markers: false
      },
      scale: 1,
      duration: 1,
      ease: 'power2.inOut'
    });

    // Initial scale state for the video (starts at 1.1)
    gsap.set(heroVideo, { scale: 1.1 });
  }

  // ===== HERO BUTTON HOVER EFFECTS (Metallic mouse tracking for secondary CTA) =====
  const secondaryCta = document.querySelector('.btn-hero-secondary');
  if (secondaryCta) {
    secondaryCta.addEventListener('mousemove', (e) => {
      const rect = secondaryCta.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const angle = Math.atan2(e.clientY - rect.top - rect.height / 2, e.clientX - rect.left - rect.width / 2) * (180 / Math.PI);

      secondaryCta.style.setProperty('--mouse-x', x);
      secondaryCta.style.setProperty('--mouse-y', y);
      secondaryCta.style.setProperty('--mouse-angle', angle);
    });

    secondaryCta.addEventListener('mouseleave', () => {
      secondaryCta.style.setProperty('--mouse-x', 50);
      secondaryCta.style.setProperty('--mouse-y', 50);
      secondaryCta.style.setProperty('--mouse-angle', 0);
    });
  }
})();
