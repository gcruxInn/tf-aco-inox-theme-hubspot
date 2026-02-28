# 🎬 GSAP Cinematic Coordinates & Vibe Blueprint

> **Status:** Ativo
> **Objetivo:** Orquestrar com precisão cirúrgica todas as animações GSAP (ScrollTrigger, Parallax, Observer, Lenis) do projeto TFAHUB251, alinhando a equipe de Engenharia (CTO-Front), Design (UX/UI) e Animação (GSAP Creative Dev).

---

## 🧭 1. A Física "Industrial Dark/Silver" (The Ironhill Pace)

A movimentação no TFAHUB251 não é "feliz e saltitante". Ela é pesada, magnética e industrial. 

*   **Inércia (Lenis + GSAP Scrub):** 
    *   Sempre utilizar `scrub: 1` ou `1.5` em timelines "vivas" atreladas ao scroll para gerar a sensação de maquinário pesado arrastando o layout.
*   **Easings Permitidos:**
    *   `ease: "none"`: OBRIGATÓRIO para timelines de scroll horizontal contínuo (Ironhill scroll track) para evitar arrastos "chicotes" e quebra de pacing.
    *   `ease: "power4.out"`: Para transições de impacto inicial (Hero).
    *   `ease: "power2.out"`: Para `data-animate="stagger-children"`.
*   **Pinning (Travamento de Tela):**
    *   Sessões de leitura profunda ou fluxo horizontal **devem** ser pinadas (`pin: true`).
    *   Sempre utilizar `anticipatePin: 1` para telas grandes a fim de evitar cintilação ('flicker') no cálculo inicial do DOM.

---

## 📍 2. Mapa de Coordenadas (Data Attributes Globais)

Para o CTO-Front não precisar escrever JS para cada novo módulo criado na HubSpot, utilizamos um sistema universal de "gatilhos" no HTML:

| Atributo (HTML) | Comportamento Reativo (main.js) | Uso Ideal |
| :--- | :--- | :--- |
| `data-animate="fade-up"` | Sobe 40px, Opacidade 0 -> 1 (`power3.out`) | Títulos de seção, parágrafos isolados. |
| `data-animate="fade-left/right"` | Deliza 60px no eixo X | Imagens laterais buscando centro. |
| `data-animate="scale-in"` | Zoom in 0.9 -> 1.0 (`back.out(1.2)`) | Ícones de destaque, botões primários. |
| `data-animate="stagger-children"`| Cascata sequencial nos filhos (`delay: 0.12s`) | Grids (Serviços, Portfólio, Footer Links). |
| `data-timeline-card="true"` | Gatilho reservado para o Módulo Timeline | Cards do scroll horizontal Ironhill. |

---

## 🚫 3. O 'Peace Protocol' (Editor Guard Inegociável)

**TODA** e qualquer lógica GSAP ou Transformação 3D/Z-Index complexa que manipule posicionamento de colunas *obrigatoriamente* deve ser ignorada dentro do Editor Drag n' Drop da HubSpot.

**Script Shield (Inserir no topo de lógicas modulares JS):**
```javascript
if (
  document.body.classList.contains('hs-edit-mode') || 
  document.querySelector('.hs-inline-edit')
) return;
```

**CSS Shield (Inserir no fundo do module.css/module.html):**
```css
.hs-edit-mode [sua-classe-gsap],
.hs-inline-edit [sua-classe-gsap] {
   transform: none !important;
   position: relative !important;
   /* Destruir os tracks horizontais transformando em colunas verticais simples */
}
```

---

## 🗺️ 4. Trilha Cinematográfica: Próximos Alvos

**(A preencher conforme novos módulos forem sendo concebidos)**

1.  [x] **Hero Cinematic V1:** SplitText de aço, Inox Chrome Ray (mouse reativo).
2.  [x] **Process Timeline (Ironhill V1):** Background Lock "O PROCESSO" com Scrub horizontal Flexbox.
3.  [x] **Stats Row (Fly-Through V1):** 2D Scaling + Native Sticky (Big WOW Numbers).
4.  [x] **Footer Stagger Vibe:** Dark gradient / Fade em cascata.
5.  [ ] **[PRÓXIMA SESSÃO]** (Definir target)

---
## 🚀 5. Padrão: Stats Fly-Through (UAU GRANDE)

Para números de impacto que precisam "atravessar" a tela:

*   **HTML Structure:** Massive Container + Number Stage + Elements.
*   **Sticky Logic:** Usar `position: sticky` nativo no container interno e `height: (items * 75vh)` na seção pai.
*   **Animation Strategy:**
    *   **Entrada:** `scale: 0.1` -> `scale: 1` + `opacity: 1` (Vindo do fundo).
    *   **Permanência:** `Count-up` progressivo via GSAP `snap` ou `interpolate`.
    *   **Saída:** `scale: 5` + `opacity: 0` (Voando em direção à câmera).
*   **Cross-Browser Buffer:** Evitar `translateZ` extremo em Safari/Chrome Mobile; o `scale` 2D é o 'Gold Standard' de performance.

---
*Assinado: CEO / Full Stack Ops - TFAHUB251*
