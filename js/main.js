/**
 * TF Aço Inox - Main Interaction Script
 * Handles scroll animations, sticky headers, and mobile menu.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initStickyHeader();
  console.log('TF Master Theme: Modernized & Ready 🚀');
});

/**
 * Initializes IntersectionObserver for fade-up animations.
 * Targets elements with class .animate-fade-up
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Run once
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('.animate-fade-up');
  elements.forEach(el => observer.observe(el));
}

/**
 * Toggles a class on the body when scrolled past threshold.
 * Used for Sticky Header transitions.
 */
function initStickyHeader() {
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      document.body.classList.add('header-scrolled');
    } else {
      document.body.classList.remove('header-scrolled');
    }
  }, { passive: true });
}
