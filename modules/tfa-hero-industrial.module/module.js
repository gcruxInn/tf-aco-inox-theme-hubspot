// ===== TFA Hero Industrial - GSAP Cinematic Scrolltelling =====
// Peace Protocol: Disable in HubSpot Editor
if (window.hsInEditor || document.body.classList.contains('hs-edit-mode')) {
  return;
}

// ===== Dependency Check & Initialization Loop =====
window.addEventListener('load', function initHeroAnimation() {
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
  function initialContentAnim() {
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
  }

  // ===== CINEMATIC SCROLLTELLING ANIMATION =====
  const introContent = document.querySelector('.hero-intro-content');
  const scrollChapters = document.querySelectorAll('.hero-chapter');

  // ===== SCROLL INDICATOR CLICK EVENT =====
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', (e) => {
      e.preventDefault();

      const targetScroll = window.innerHeight * 0.8;

      // Use Lenis for native industrial heavy sliding if loaded
      if (typeof window.lenis !== 'undefined') {
        window.lenis.scrollTo(window.scrollY + targetScroll, {
          duration: 2.5, // Slow cinematic scroll
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Easing power4 out
        });
      } else {
        // Fallback smooth scroll
        window.scrollBy({
          top: targetScroll,
          behavior: 'smooth'
        });
      }
    });
  }

  if (typeof gsap !== 'undefined' && gsap.plugins && gsap.plugins.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    initialContentAnim(); // Call initial intro anims


    if (scrollChapters.length > 0) {
      // Create a master timeline that pins the hero section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: `+=${scrollChapters.length * 100}%`, // Scroll duration scales with chapters
          scrub: 1, // Smooth scrub
          pin: true,
          markers: false
        }
      });

      // 1. Video Scale Down slightly
      if (heroVideo) {
        gsap.set(heroVideo, { scale: 1.1 });
        tl.to(heroVideo, {
          scale: 1,
          duration: 1,
          ease: 'power2.inOut'
        }, 0); // Start at time 0 of timeline
      }

      // 2. Fade out intro content
      if (introContent) {
        tl.to(introContent, {
          opacity: 0,
          y: -50,
          duration: 0.5,
          ease: 'power2.inOut'
        }, 0.5);
      }

      // Also fade out the scroll indicator
      if (scrollIndicator) {
        tl.to(scrollIndicator, {
          opacity: 0,
          duration: 0.3
        }, 0.5);
      }

      // 3. Scrub through each scroll chapter
      scrollChapters.forEach((chapter, index) => {
        const headline = chapter.querySelector('.hero-chapter-headline');

        // Setup initial position
        gsap.set(chapter, { opacity: 0, y: "30%" });

        // Fade in the chapter
        tl.to(chapter, {
          opacity: 1,
          y: "0%",
          duration: 0.5,
          ease: 'power3.out'
        }, "+=0.2");

        if (headline) {
          gsap.set(headline, { scale: 0.9, opacity: 0.5 });
          tl.to(headline, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out'
          }, "<");
        }

        // Keep it visible for a moment
        tl.to(chapter, {
          opacity: 1,
          duration: 1
        });

        // Fade out if it's not the last one
        if (index !== scrollChapters.length - 1) {
          tl.to(chapter, {
            opacity: 0,
            y: "-30%",
            duration: 0.5,
            ease: 'power3.in'
          });
        }
      });
    } else {
      // Fallback: No chapters, just scale the video
      if (heroVideo) {
        gsap.to(heroVideo, {
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          },
          scale: 1,
          duration: 1,
          ease: 'power2.inOut'
        });
        gsap.set(heroVideo, { scale: 1.1 });
      }
    }
  }
});
