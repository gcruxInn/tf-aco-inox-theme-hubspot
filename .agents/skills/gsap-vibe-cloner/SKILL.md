---
name: gsap-vibe-cloner
description: Skill especializada para implementação e manutenção da identidade visual Industrial Dark/Silver no projeto TFAHUB251, utilizando GSAP, SplitType e Lenis.
---

# Instruções GSAP + Vibe Cloning (Dark/Silver)

Sempre que for requisitado criar ou modificar a UI/UX de um módulo (ex: Hero, Portfolio, Services), aplique a essência textual e arquitetural a seguir:

1. **A Estética (Vibe Blueprint)**
   - Tema arrojado, chão de fábrica "high-tech", opaco, metálico e imponente (Dark/Silver).
   - Use as variáveis CSS nativas do `theme.css`.

2. **GSAP + SplitType**
   - Os títulos devem possuir animações dramáticas usando a combinação de GSAP e `SplitType`.
   - Utilize transições que simulem "reveal vertical" ou "overflow desmascarando as linhas" via `ScrollTrigger`.
   - Stagger (Efeito cascata): Múltiplos elementos repetidos (como cards de portfólio) devem despontar com `fade` e `translateY`, seguindo um intervalo rítmico.

3. **Smooth Scroll (Lenis)**
   - Instancie o Lenis com peso/inércia (ex: `lerp: 0.05` ou `duration: 1.5`), transmitindo robustez.

4. **HubSpot Editor Guard (MANDATÓRIO)**
   - O código JavaScript de animação **NÃO DEVE RODA R** se a página estiver no editor de conteúdo da HubSpot.
   - Sempre adicione o guard: 
     ```javascript
     if (document.body.classList.contains('hs-edit-mode') || document.querySelector('.hs-inline-edit')) {
         return; // Disable animations in editor
     }
     ```
