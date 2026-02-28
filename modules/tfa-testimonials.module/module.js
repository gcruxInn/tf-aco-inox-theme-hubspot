/**
 * TFA Testimonials — GSAP Scroll Reveal & Parallax
 * Placed in IIFE to avoid global pollution
 */
(function initTestimonialsAnim() {
    'use strict';

    // ============================================================
    // PEACE PROTOCOL — Editor Guard
    // Abort immediately if running inside the HubSpot CMS editor
    // to prevent layout breakages and JS conflicts.
    // ============================================================
    if (
        document.body.classList.contains('hs-edit-mode') ||
        document.querySelector('.hs-inline-edit') ||
        window.location.href.includes('hs-edit-mode')
    ) {
        console.log('[TFAHUB251] HubSpot Editor detected. Testimonials GSAP disabled.');
        return;
    }

    function run() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('[TFAHUB251] GSAP or ScrollTrigger not found.');
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const section = document.querySelector('.tfa-testimonials-section');
        if (!section) return;

        // 1. SplitType Text Reveal (Header)
        if (typeof SplitType !== 'undefined') {
            const splitTexts = section.querySelectorAll('[data-split-text]');
            splitTexts.forEach(text => {
                const split = new SplitType(text, { types: 'lines, words' });
                split.lines.forEach(line => line.style.overflow = 'hidden');

                gsap.from(split.words, {
                    scrollTrigger: {
                        trigger: text,
                        start: "top 85%",
                        once: true
                    },
                    y: "100%",
                    opacity: 0,
                    duration: 1.0,
                    stagger: 0.02,
                    ease: "power4.out"
                });
            });
        }

        // 2. Cinematic Fly-Through Coreography (Z-Axis)
        // Defeat HubSpot's wrapper overflow issues native to DND
        let parent = section.parentElement;
        while (parent && parent.tagName !== 'BODY' && parent.tagName !== 'HTML') {
            const style = window.getComputedStyle(parent);
            if (style.overflow === 'hidden' || style.overflowX === 'hidden' || style.overflowY === 'hidden') {
                parent.style.setProperty('overflow', 'visible', 'important');
                parent.style.setProperty('overflow-x', 'visible', 'important');
                parent.style.setProperty('overflow-y', 'visible', 'important');
            }
            parent = parent.parentElement;
        }

        const stage = section.querySelector('.testimonials-fly-stage');
        const cards = gsap.utils.toArray(section.querySelectorAll('.testimonial-card'));

        if (stage && cards.length > 0) {
            // Master Timeline tied to scroll duration based on card count
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    start: "top top",
                    end: () => "+=" + (cards.length * 250) + "vh", // Slower scrolling (250vh per card)
                    scrub: 1.5, // buttery smooth scrub
                    anticipatePin: 1
                }
            });

            cards.forEach((card, index) => {
                const isLast = index === cards.length - 1;

                // Keep them centered, minimal rotation for dynamism
                const rOffset = (index % 2 === 0 ? 1 : -1) * gsap.utils.random(2, 6);

                // Initial State: Deep in the background
                gsap.set(card, {
                    scale: 0.1,
                    opacity: 0,
                    filter: "blur(30px)",
                    z: -1000,
                    rotation: rOffset,
                    xPercent: -50,
                    yPercent: -50,
                    transformOrigin: "center center"
                });

                // Overlap timing: the next card starts its journey earlier
                const startTime = index * 0.7;

                tl.addLabel(`card-${index}`, startTime);

                // Phase A: Enter and focus (0 to 0.4 of its unit)
                tl.to(card, {
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    z: 0,
                    rotation: 0,
                    ease: "power2.out",
                    duration: 0.4
                }, `card-${index}`);

                // Phase B: Pause for reading (0.4 to 0.75 of its unit), drifting slightly (breathing)
                tl.to(card, {
                    scale: 1.05,
                    z: 50,
                    ease: "none",
                    duration: 0.35
                }, `card-${index}+=0.4`);

                // Phase C: Fly Out / Swallow Camera (0.75 to 1.0 of its unit)
                if (!isLast) {
                    tl.to(card, {
                        scale: 6,
                        opacity: 0,
                        filter: "blur(40px)",
                        z: 600,
                        ease: "power4.in",
                        duration: 0.25
                    }, `card-${index}+=0.75`);
                } else {
                    // For the last card, we just let it fade out at the very end so it unpins smoothly
                    tl.to(card, {
                        opacity: 0,
                        scale: 1.5,
                        filter: "blur(20px)",
                        duration: 0.25
                    }, `card-${index}+=0.75`);
                }
            });

            // Animate the Massive Background Text along the whole timeline
            const massiveText = section.querySelector('.massive-bg-text');
            if (massiveText) {
                // start small, end huge
                tl.fromTo(massiveText, { scale: 0.8, opacity: 0.1 }, {
                    scale: 1.4,
                    opacity: 0.8, // Frost Glass will overlay on top anyway
                    duration: tl.duration(),
                    ease: "none"
                }, 0);
            }

            // 3. Ambient Parallax (Mouse move tracking)
            const techGrid = section.querySelector('.tech-grid');
            const glow = section.querySelector('.ambient-glow');

            if (techGrid && glow) {
                // Background smoke tied to Scroll
                gsap.to(techGrid, {
                    backgroundPositionY: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });

                // Interactive Mouse tracking
                section.addEventListener('mousemove', (e) => {
                    const xProgress = (e.clientX / window.innerWidth) - 0.5;
                    const yProgress = (e.clientY / window.innerHeight) - 0.5;

                    gsap.to(techGrid, {
                        x: xProgress * -30,
                        y: yProgress * -30,
                        duration: 1,
                        ease: "power2.out"
                    });

                    gsap.to(glow, {
                        xPercent: xProgress * 20,
                        yPercent: yProgress * 20,
                        duration: 1.5,
                        ease: "power2.out"
                    });
                });
            }
        }



        ScrollTrigger.refresh();
    }

    if (document.readyState === 'complete') {
        run();
    } else {
        window.addEventListener('load', run);
    }
})();
