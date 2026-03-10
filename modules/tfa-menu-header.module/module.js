/**
 * TFA Menu Header - Interactive Logic
 * Engine: GSAP / Native JS
 * Principle: Set-and-Forget / Awwwards UX
 */

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.tfa-header-main');
    const toggle = document.querySelector('.tfa-mobile-toggle');
    const drawer = document.querySelector('.tfa-mobile-drawer');
    const menuItems = document.querySelectorAll('.tfa-nav-mobile li a');
    const isStickyEnabled = header.getAttribute('data-sticky') === 'true';
    
    let isMenuOpen = false;

    // --- Mobile Drawer Logic (GSAP) ---
    const menuTl = gsap.timeline({ paused: true });

    // Setup Drawer Animation
    menuTl.to(drawer, {
        right: 0,
        duration: 0.6,
        ease: "power4.inOut"
    })
    .to(menuItems, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.3");

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        toggle.setAttribute('aria-expanded', isMenuOpen);
        
        if (isMenuOpen) {
            drawer.classList.add('is-active');
            menuTl.play();
            document.body.style.overflow = 'hidden'; // Lock Scroll
        } else {
            menuTl.reverse().then(() => {
                drawer.classList.remove('is-active');
            });
            document.body.style.overflow = ''; // Unlock Scroll
        }
    }

    if (toggle) {
        toggle.addEventListener('click', toggleMenu);
    }

    // Close menu on link click
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
             if (isMenuOpen) toggleMenu();
        });
    });

    // --- Sticky Header Logic ---
    if (isStickyEnabled) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                header.classList.add('sticky-scrolled');
            } else {
                header.classList.remove('sticky-scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // --- Initial Header Style Check ---
    // If the page starts scrolled, apply sticky class
    if (window.pageYOffset > 50 && isStickyEnabled) {
        header.classList.add('sticky-scrolled');
    }
});
