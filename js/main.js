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
 * Adds 'scrolled' class to header for enhanced glassmorphism effect.
 * Triggers at scroll threshold for smooth visual transition.
 */
function initStickyHeader() {
  const header = document.querySelector('.header');
  const scrollThreshold = 80;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}
