---
name: gsap-motion-scraper
description: Skill de extração e engenharia reversa de timelines GSAP a partir de referências live (ex: ironhill.au).
---

# GSAP Motion Scraper Protocol

## Objetivo
Esta skill permite ao *Full Stack Ops* ou *CTO-Front* extrair a "assinatura técnica" de animações complexas via Browser Subagent. O foco é decodificar o sistema de `ScrollTrigger`, `Timeline` e transformações 3D para replicar a experiência *Premium*.

## Protocolo de Extração

1. **Navegação & Monitoramento (Browser Subagent)**
   - Navegar para a URL de referência.
   - Ativar o console e monitorar registros do GSAP (se disponíveis).
   - Inserir via `evaluate` scripts para capturar o estado dos `ScrollTriggers` ativos:
     ```javascript
     ScrollTrigger.getAll().forEach((st, i) => {
       console.log(`ST ${i}:`, st.trigger, st.start, st.end, st.scrub, st.pin);
     });
     ```

2. **Deseclonamento de Timelines**
   - Identificar o container com `pin: true`.
   - Analisar a progressão das propriedades CSS durante o scroll (opacity, translate3d, rotateY).
   - Mapear o `stagger` dos elementos de texto (SplitType).

3. **Geração do Blueprint Técnico**
   O resultado deve ser um documento técnico contendo:
   - **Setup CSS:** Perspectiva, transform-origin e estados iniciais.
   - **Timeline Mapping:** Sequência frame-by-frame (ex: 0-20% scroll, 20-50%).
   - **GSAP Snippet:** Exemplo funcional das propriedades e valores de `ease`.

## Referência "Ironhill" Case
- **Efeito:** Frame-by-frame 3D Flip Cards.
- **Técnica:** `pin: true` + `scrub: true`.
- **Valores Críticos:** `perspective: 1000px`, `rotateY: 90deg -> 0deg`.

Utilize esta skill sempre que o usuário fornecer um site de referência e pedir "faça igual".
