/**
 * TFA Testimonials — Sophisticated Reveal JS
 */
(function initTestimonialsAnim() {
    'use strict';

    if (
        document.body.classList.contains('hs-edit-mode') ||
        document.querySelector('.hs-inline-edit') ||
        window.location.href.includes('hs-edit-mode')
    ) return;

    function run() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        gsap.registerPlugin(ScrollTrigger);

        const section = document.querySelector('.tfa-testimonials-section');
        if (!section) return;

        const stage = section.querySelector('.testimonials-sticky-stage');
        const items = gsap.utils.toArray(section.querySelectorAll('.writing-item'));
        const header = section.querySelector('.testimonials-header');

        if (!items.length) return;

        // Base scroll depth: 200vh per testimonial to allow slow "writing"
        const scrollVH = items.length * 200;
        section.style.height = (scrollVH + 100) + 'vh';

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.2, // Smooth cinematic resistance
                anticipatePin: 1
            }
        });

        // 1. Initial fade-out of the header
        tl.to(header, {
            opacity: 0,
            y: -50,
            duration: 1
        }, 0);

        items.forEach((item, index) => {
            const quote = item.querySelector('.testimonial-quote');
            const info = item.querySelector('.client-info-reveal');
            
            // Initial positioning for all items
            gsap.set(item, { y: 20, opacity: 0, visibility: 'hidden' });

            const startPos = index * 4; // Virtual timeline seconds
            
            // FASE: Show Item
            tl.to(item, {
                opacity: 1,
                visibility: 'visible',
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }, startPos);

            // "Writing" effect for cursive (using SplitType if available, or simple blur/opacity reveal)
            if (typeof SplitType !== 'undefined') {
                const split = new SplitType(quote, { types: 'words,chars' });
                tl.from(split.chars, {
                    opacity: 0,
                    filter: "blur(10px)",
                    y: 10,
                    stagger: 0.02,
                    duration: 2,
                    ease: "none"
                }, startPos + 0.2);
            } else {
                tl.from(quote, {
                    opacity: 0,
                    filter: "blur(20px)",
                    duration: 1.5,
                    ease: "none"
                }, startPos + 0.2);
            }

            // Reveal client info after quote
            tl.from(info, {
                opacity: 0,
                y: 20,
                duration: 0.5
            }, startPos + 2.5);

            // Stay visible for a moment
            tl.to({}, { duration: 1.5 });

            // FASE: Hide Item (except the last one)
            if (index < items.length - 1) {
                tl.to(item, {
                    opacity: 0,
                    y: -30,
                    filter: "blur(20px)",
                    duration: 0.8,
                    ease: "power2.in"
                }, startPos + 4);
            }
        });

        // --- SKIP SCENE BUTTON LOGIC ---
        const skipBtn = section.querySelector('.tfa-skip-scene-btn');
        if (skipBtn) {
            gsap.to(skipBtn, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 10%',
                    end: 'bottom 90%',
                    toggleActions: 'play reverse play reverse'
                },
                opacity: 1,
                visibility: 'visible',
                y: 0,
                duration: 0.6
            });

            skipBtn.addEventListener('click', function() {
                gsap.to(skipBtn, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
                const dest = section.offsetTop + section.offsetHeight;
                if (window.lenis) {
                    window.lenis.scrollTo(dest, { duration: 2.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                } else {
                    window.scrollTo({ top: dest, behavior: 'smooth' });
                }
                gsap.to(skipBtn, { opacity: 0, y: 10, duration: 0.4 });
            });
        }

        // --- BACK SCENE BUTTON LOGIC ---
        const backBtn = section.querySelector('.tfa-back-scene-btn');
        if (backBtn) {
            gsap.to(backBtn, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 10%',
                    end: 'bottom 90%',
                    toggleActions: 'play reverse play reverse'
                },
                opacity: 1,
                visibility: 'visible',
                y: 0,
                duration: 0.6,
                ease: 'power3.out'
            });

            backBtn.addEventListener('click', function() {
                gsap.to(backBtn, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });

                // Scroll to TOP of this section (not previous section)
                var targetScroll = section.offsetTop;

                if (window.lenis) {
                    window.lenis.scrollTo(targetScroll, {
                        duration: 2.0,
                        easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }
                    });
                } else {
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }

                gsap.to(backBtn, { opacity: 0, y: 10, duration: 0.4 });
            });
        }
    }

    if (document.readyState === 'complete') {
        run();
    } else {
        window.addEventListener('load', run);
    }
})();
