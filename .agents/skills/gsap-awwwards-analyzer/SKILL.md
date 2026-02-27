---
name: gsap-awwwards-analyzer
description: Skill de engenharia reversa para dissecação e planejamento arquitetural de animações front-end AWWWARDS-level usando GSAP ScrollTrigger, Timelines e 3D Transforms.
---

# GSAP Awwwards Analyzer

## Objetivo
Você utilizará esta skill na atuação como *GSAP Creative Dev* para quebrar referências audiovisuais avançadas (ex: sites premiados como ironhill.au) e transformar a leitura visual em um manifesto técnico sequencial, mastigado para que o CTO-Front aplique o código perfeitamente.

## Metodologia de Engenharia Reversa
Quando solicitado a analisar uma referência e desenhar a timeline de animação, você deve usar estritamente o seguinte esqueleto de "Arquitetura e Sequência" como output primário:

### 1. Arquitetura Geral (Setup)
*   **Container Principal:** Definir a tipologia da "caixa" (ex: section com `height: 100vh` fixada via `ScrollTrigger`).
*   **Pinning & Scrubbing:** O scroll trava até que a sub-timeline termine? Defina o comportamento exato do pinning (start/end points).
*   **Aparatos Visuais (Plugins):** Relacionar o stack necessário (GSAP Core, ScrollTrigger, SplitType/SplitText, Lenis).

### 2. Sequência de Animações (Timeline Frame-by-Frame)
Detalhe a cronologia passo a passo, baseada em progressão de scroll ou timing relativo:
*   **Passo 1 (Text Reveal / Setup):** Exemplo de comportamento dos caracteres (stagger, opacity, translateY). Forneça "Dicas GSAP" com as propriedades ideais. Ex: `gsap.from(".char", {opacity:0, stagger:0.02})`
*   **Passo 2 (Entrance - 3D/Eixo Espacial):** Como os blocos/cards entram? Eles possuem matriz de `perspective`? Giram sobre o `rotateY/X`? Aterrissam com profundidade `translate3d(...)`? Exija os estados iniciais no CSS e os estados ativos do JS.
*   **Passo X (Handoff Flow de Elementos):** Se há transição sobreposta, relate como o anterior sai (ex: `-90deg, opacity: 0`) em sincronia absoluta com o próximo entrando com offset espacial (diferencial orgânico).

### 3. Detalhes Técnicos Críticos
*   **Perspectiva 3D:** Exija e detalhe a propriedade `perspective: 1000px` (ou medida calculada) no container PAI para não achatar os eixos Z e Y.
*   **Transform Origin:** Onde a dobra acontece? (`center right`, `0% 50%`, etc).
*   **Cursor Customizado:** Se percebido o rastro "Explore", documente a injeção via `gsap.quickTo(x, y)` com amortecimento.
*   **Looping Video:** Oriente manter a tag autoplay, muted e loop no HTML e isentar o controle via JS.

Sempre entregue o **Blueprint GSAP Frame-by-Frame** baseado nessa matriz antes do CTO-Front codar. Isso previne quebras de viewport e garante a maestria das premiações AWWWARDS.
