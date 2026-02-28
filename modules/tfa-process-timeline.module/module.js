/**
 * TFA Process Timeline — Cinematic Fly-In Cards (V7)
 * Pinned Section + Horizontal Fly-In/Exit + Observer Drag/Swipe
 *
 * Architecture:
 *  - Section is PINNED via ScrollTrigger (pin: true, scrub: 1)
 *  - Cards fly in from alternating sides (left/right) with heavy inertia
 *  - Each card lands center, then exits opposite side on continued scroll
 *  - Observer plugin enables touch/drag lateral navigation
 *  - Peace Protocol: all animations disabled inside HubSpot editor
 *
 * GSAP Plugins required: ScrollTrigger, Observer
 */
/**
 * TFA Process Timeline — Cinematic Fly-In Cards (V7)
 * Pinned Section + Horizontal Fly-In/Exit + Observer Drag/Swipe
 *
 * Architecture:
 *  - Section is PINNED via ScrollTrigger (pin: true, scrub: 1)
 *  - Cards fly in from alternating sides (left/right) with heavy inertia
 *  - Each card lands center, then exits opposite side on continued scroll
 *  - Observer plugin enables touch/drag lateral navigation
 *  - Peace Protocol: all animations disabled inside HubSpot editor
 *
 * GSAP Plugins required: ScrollTrigger, Observer
 */
(function () {
  'use strict';

  window.addEventListener('load', function () {
    // ============================================================
    // PEACE PROTOCOL — Editor Guard
    // ============================================================
    if (
      document.body.classList.contains('hs-edit-mode') ||
      document.body.classList.contains('hs-inline-edit') ||
      document.querySelector('.hs-inline-edit') !== null
    ) {
      return;
    }

    // ============================================================
    // DEPENDENCY CHECK
    // ============================================================
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('[TFA Timeline V7] GSAP or ScrollTrigger not loaded. Animations skipped.');
      var track = document.querySelector('.process-timeline-track');
      if (track) {
        track.style.transform = 'none';
        track.style.display = 'flex';
        track.style.flexWrap = 'wrap';
        track.style.justifyContent = 'center';
        track.style.padding = '0';
      }
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Register Observer if available (touch/drag support)
    var hasObserver = typeof Observer !== 'undefined';
    if (hasObserver) {
      gsap.registerPlugin(Observer);
    }

    // ============================================================
    // CONFIGURATION
    // ============================================================
    var section = document.querySelector('.tfa-timeline-section');
    var track = document.querySelector('.process-timeline-track');
    var cards = gsap.utils.toArray('[data-timeline-card]');
    var header = document.querySelector('.tfa-timeline-section .timeline-header');

    if (!section || !track || cards.length === 0) return;

    // ============================================================
    // GSAP DEBUGER VISION BROWSER
    // ============================================================
    var DEBUG_VISION = false; // Desativado para focar no módulo de Stats

    function logVision(msg) {
      if (!DEBUG_VISION) return;
      var hud = document.getElementById('gsap-vision-hud');
      var hudBody = document.getElementById('gsap-vision-hud-body');

      if (!hud) {
        hud = document.createElement('div');
        hud.id = 'gsap-vision-hud';
        hud.style.cssText = 'position:fixed;top:10px;right:10px;width:350px;height:400px;background:rgba(0,0,0,0.85);backdrop-filter:blur(5px);border:1px solid #00ff00;color:#00ff00;font-family:monospace;font-size:11px;z-index:99999;box-shadow:0 0 20px rgba(0,255,0,0.2);display:flex;flex-direction:column;';

        // Header (Fixo) com Botão de Copiar
        var header = document.createElement('div');
        header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #00ff00;padding:10px;pointer-events:auto;flex-shrink:0;';
        header.innerHTML = '<strong style="color:#fff;font-size:13px;">[ GSAP DEBUG VISION ]</strong>';

        var copyBtn = document.createElement('button');
        copyBtn.innerText = 'COPY LOGS';
        copyBtn.style.cssText = 'background:#00ff00;color:#000;border:none;padding:3px 8px;font-size:10px;cursor:pointer;font-weight:bold;';
        copyBtn.onclick = function () {
          var logsText = Array.from(document.getElementById('gsap-vision-hud-body').children).map(e => e.innerText).join('\\n');
          navigator.clipboard.writeText(logsText).then(() => alert('Logs Copiados para a Área de Transferência!'));
        };
        header.appendChild(copyBtn);

        // Body (Scrollable onde os logs caem)
        hudBody = document.createElement('div');
        hudBody.id = 'gsap-vision-hud-body';
        hudBody.style.cssText = 'flex-grow:1;overflow-y:auto;padding:10px;pointer-events:none;';

        hud.appendChild(header);
        hud.appendChild(hudBody);
        document.body.appendChild(hud);
      }

      var line = document.createElement('div');
      line.style.borderBottom = '1px solid rgba(0,255,0,0.2)';
      line.style.padding = '2px 0';
      line.innerText = '> ' + msg;

      hudBody.appendChild(line);
      hudBody.scrollTop = hudBody.scrollHeight;

      // Mantém uma janela de contexto gigante para log pesado (1000 eventos)
      if (hudBody.childNodes.length > 1000) {
        hudBody.removeChild(hudBody.firstChild);
      }
    }

    if (DEBUG_VISION) {
      logVision('System Vision Initialized.');
      logVision('Track ScrollWidth: ' + track.scrollWidth + 'px');
      logVision('Total Cards: ' + cards.length);
    }

    // ============================================================
    // HEADER ANIMATION — plays once on scroll
    // ============================================================
    if (header) {
      gsap.fromTo(
        header,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // ============================================================
    // MASTER TIMELINE — HORIZONTAL SCROLL (Ironhill Architecture)
    // ============================================================

    function getScrollAmount() {
      return -(track.scrollWidth - window.innerWidth);
    }

    var masterTL = gsap.timeline();

    // 1. O Track principal dos cards move horizontalmente fluido e contínuo, 
    // com um corte fino e suave (a inércia vem do scrub do ScrollTrigger).
    masterTL.to(track, {
      x: getScrollAmount,
      ease: 'none',
      duration: 10 // Virtual base duration
    }, 0);

    // Recupera a duração virtual da timeline base
    var totalMasterDur = masterTL.duration();


    // 2. Parallax agressivo no BG gigante "O PROCESSO" + Text "Fill" Reveal
    var hugeBg = document.querySelector('.tfa-timeline-huge-bg');
    var hugeBgText = document.querySelector('.huge-text-inner');
    if (hugeBg && hugeBgText) {
      // Parallax Movement cobrindo a vida global em sync com os degraus
      masterTL.to(hugeBg, {
        x: () => -(track.scrollWidth * 0.2),
        ease: 'none',
        duration: totalMasterDur
      }, 0);

      // Efeito Fill: A linha de clip-path metálica corta o fundo
      masterTL.to(hugeBgText, {
        "--fill": "100%",
        ease: 'none',
        duration: totalMasterDur
      }, 0);
    }

    var particles = document.querySelector('.tfa-timeline-particles');
    if (particles) {
      masterTL.to(particles, {
        x: () => (window.innerWidth * 0.1),
        ease: 'none',
        duration: totalMasterDur
      }, 0);
    }

    // Controle dos Pontos de Progresso (Pill) e Faíscas
    var progressDots = gsap.utils.toArray('.tfa-dot');
    var progressContainer = document.querySelector('.timeline-progress-dots');

    function createDotSpark(dot) {
      if (!progressContainer) return;

      // Dispara múltiplas faíscas pra criar um efeito de solda/usinagem
      var sparkCount = 8 + Math.floor(Math.random() * 12); // 8 a 20 faíscas por dot

      for (let i = 0; i < sparkCount; i++) {
        var spark = document.createElement('span');
        spark.className = 'particle particle--spark-blue';
        spark.style.position = 'absolute';
        spark.style.left = (dot.offsetLeft + dot.offsetWidth / 2) + 'px';
        spark.style.top = '10px';

        // Alterna entre riscos longos (riscos de esmeril) e pequenos pontos redondos
        var isLine = Math.random() > 0.3; // 70% chance de ser linha riscada
        if (isLine) {
          spark.style.width = Math.random() < 0.5 ? '1px' : '2px';
          spark.style.height = (8 + Math.random() * 20) + 'px';
          spark.style.borderRadius = '1px';
        } else {
          var size = 2 + Math.random() * 3;
          spark.style.width = size + 'px';
          spark.style.height = size + 'px';
          spark.style.borderRadius = '50%'; // Ponto redondo
        }

        spark.style.zIndex = '-1';
        spark.style.background = Math.random() > 0.5 ? '#fff' : '#00ffd5'; // Quente/Platina misturado
        spark.style.boxShadow = '0 0 8px #00ffd5, 0 0 15px rgba(0, 255, 213, 0.4)';

        progressContainer.appendChild(spark);

        var angle = (Math.random() - 0.5) * Math.PI * 1.5; // Espalhamento de chafariz 
        var force = 50 + Math.random() * 150;
        var travelX = Math.sin(angle) * force;
        var travelY = -Math.cos(angle) * force - 30; // Sempre pra cima predominante
        var rotationAngle = (Math.random() - 0.5) * 180;

        // Dispara pra cima como se estivesse usinando aço pesadamente
        gsap.fromTo(spark,
          { y: 0, opacity: 1, x: 0, rotationZ: isLine ? rotationAngle : 0 },
          {
            y: travelY,
            x: travelX,
            rotationZ: isLine ? rotationAngle + (Math.random() * 90) : 0,
            opacity: 0,
            duration: 0.6 + Math.random() * 0.8,
            ease: "power3.out", // Explosão rápida da faísca e depois desacelera suave no ar
            onComplete: function () { this.targets()[0].remove(); }
          }
        );
      }
    }

    function activateDot(index) {
      if (!progressDots.length) return;
      progressDots.forEach((dot, i) => {
        if (i === index) {
          if (!dot.classList.contains('active')) {
            dot.classList.add('active');
            createDotSpark(dot); // Dispara faísca na hora de transitar pro ativo
          }
        } else {
          dot.classList.remove('active');
        }
      });
    }

    // 3. Efeito Cinematográfico "Gigante para Fixo" (Referência Ironhill - EGGS)
    // Usamos UMA master Timeline por card guiada com exatidão da direita (100%) até a esquerda (0%)
    cards.forEach((card, index) => {
      // Começa invisível, gigante, inclinado e fora de foco (como uma lente macro antes de focar)
      gsap.set(card, { opacity: 0, scale: 1.8, rotationZ: 10, filter: "grayscale(100%) blur(12px)", transformOrigin: "center center" });

      // O ScrollTrigger abrange exatemente a jornada matemática do card na tela:
      // Início: Borda esquerda do Card cruza Borda direita da Tela (entra na tela).
      // Fim: Borda direita do Card cruza Borda esquerda da Tela (sai da tela).
      // Desta forma, o meio matemático Exato (progress = 0.5) será o "Center Center"!
      var cardTL = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          containerAnimation: masterTL,
          start: "left right",
          end: "right left",
          scrub: true,
          onUpdate: (self) => {
            // Opcional: Feedback apenas próximo do meio (+- 0.5%)
            if (DEBUG_VISION && (self.progress > 0.49 && self.progress < 0.51)) {
              logVision(`[${index}] CENTERED p:${self.progress.toFixed(2)}`);
              // Se ativou o meio, o dot engaja!
              activateDot(index);
            }
          }
        }
      });

      // PRIMEIRA METADE (Progresso 0 até 0.5): Pouso Triunfal no Centro
      // Duração 1 segundo lógico
      cardTL.to(card, {
        opacity: 1,
        scale: 1,
        rotationZ: 0,
        filter: "grayscale(0%) blur(0px)",
        ease: "power2.out", // Desacelera a inércia enquanto "pousa" no foco
        duration: 1
      });

      // SEGUNDA METADE (Progresso 0.5 até 1): Abandonando o Palco
      // Duração 1 segundo lógico
      cardTL.to(card, {
        opacity: 0,
        scale: 0.8,
        rotationZ: -5,
        filter: "grayscale(100%) blur(8px)",
        ease: "power2.in", // Acelera o recuo para escurecer (Some da memória visual)
        duration: 1
      });
    });

    // ============================================================
    // PIN THE SECTION + SCRUB THE MASTER TIMELINE
    // ============================================================
    ScrollTrigger.create({
      trigger: section,
      pin: true,
      scrub: 1, // Smoothness delay
      start: 'top top',
      end: () => `+=${track.scrollWidth}`, // Duração atrelada ao tamanho do track
      animation: masterTL,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (DEBUG_VISION) {
          logVision(`MASTER SCRUB: ${(self.progress * 100).toFixed(1)}%`);
        }
      }
    });

    // ============================================================
    // OBSERVER — Touch / Drag / Swipe lateral navigation
    // ============================================================
    if (hasObserver) {
      var isDragging = false;
      var dragSensitivity = 2.5;

      Observer.create({
        target: section,
        type: 'touch,pointer',
        dragMinimum: 10,
        onDragStart: function () {
          isDragging = true;
        },
        onDrag: function (self) {
          if (!isDragging) return;
          var delta = -self.deltaX * dragSensitivity;
          if (window.lenis) {
            window.lenis.scrollTo(window.scrollY + delta, { immediate: true });
          } else {
            window.scrollBy(0, delta);
          }
        },
        onDragEnd: function () {
          isDragging = false;
        },
        tolerance: 10,
        preventDefault: true
      });
    }
  });

})();
