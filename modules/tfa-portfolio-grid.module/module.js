/**
 * TFAHUB251 - Portfolio Grid JS
 * GSAP + SplitType + Lenis Smooth Scroll
 * Vibe: Industrial Dark/Silver
 */

(function initPortfolioGrid() {
    // 1. Editor Guard (MANDATÓRIO)
    // Desativa animações no HubSpot Editor para proteger o Drag-and-Drop
    if (
        document.body.classList.contains('hs-edit-mode') ||
        document.querySelector('.hs-inline-edit') ||
        window.location.href.includes('hs-edit-mode')
    ) {
        console.log('[TFAHUB251] HubSpot Editor detected. Lenis and GSAP disabled.');
        return;
    }

    // Aguarda o carregamento do DOM para inicializar
    function run() {
        // Verifica se as dependências existem antes de inicializar
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Lenis === 'undefined') {
            console.warn('[TFAHUB251] GSAP, ScrollTrigger or Lenis not found.');
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        // Lenis instances should NOT be created here. It belongs to main.js
        // GSAP Ticker and ScrollTrigger updating are also handled globally.

        // 3. SplitType + GSAP: Reveal Vertical com Máscara
        if (typeof SplitType !== 'undefined') {
            const splitTexts = document.querySelectorAll('[data-split-text]');

            splitTexts.forEach(text => {
                const split = new SplitType(text, { types: 'lines, words' });

                // Overflow hidden nas linhas para efeito de máscara vertical
                split.lines.forEach(line => {
                    line.style.overflow = 'hidden';
                });

                gsap.from(split.words, {
                    scrollTrigger: {
                        trigger: text,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: "100%",
                    opacity: 0,
                    duration: 1.2,
                    stagger: 0.03,
                    ease: "power4.out"
                });
            });
        }

        // 4. Stagger de Cards: Fade + TranslateY
        const cards = gsap.utils.toArray('.portfolio-card-v2');

        if (cards.length > 0) {
            // Set initial state
            gsap.set(cards, { opacity: 0, y: 60 });

            // Usa ScrollTrigger batch para cadenciar conforme entram na viewport
            ScrollTrigger.batch(cards, {
                onEnter: batch => {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        stagger: { each: 0.15 },
                        ease: "power3.out",
                        overwrite: true
                    });
                },
                onLeaveBack: batch => {
                    gsap.set(batch, { opacity: 0, y: 60, overwrite: true });
                },
                start: "top 85%",
            });
        }

        // Resize Observer para lidar com reflows e re-calcular GSAP
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 250);
        });

        ScrollTrigger.refresh();
    }

    if (document.readyState === 'complete') {
        run();
    } else {
        window.addEventListener('load', run);
    }
})();
