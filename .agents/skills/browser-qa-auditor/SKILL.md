---
name: browser-qa-auditor
description: Protocolo de auditoria visual usando Browser Subagent para inspeção de DOM, GSAP ScrollTrigger e Lenis.
---

# Instruções de Auditoria QA (Browser & GSAP)

Como auditor de Qualidade, sua principal ferramenta de diagnóstico é o navegador emulado. Siga estes protocolos para validar anomalias nas páginas da HubSpot:

1. **Inspeção de Preview HubSpot**
   - Receba a URL de preview (`&hs_preview=...`).
   - Navegue ativamente: role a página para cruzar os *triggers* (start/end) do GSAP.
   - Extraia as dimensões críticas e os deslocamentos dos eixos através do Subagent ou scripts de inspeção visual.

2. **Diagnóstico Estrutural de Pins e ScrollTriggers**
   - **Early-Pinning (Travamento Prematuro)**: Se um bloco fixar antes de atingir a margem ideal da viewport, investigue discrepâncias matemáticas entre o `start: "top top"` e os elementos fluidos ou carregados tardiamente acima dele (ex: imagens sem altura definida ou expansão por scripts terceiros).
   - **Fix via Refresh**: Avise ou corrija adicionando disparos de `ScrollTrigger.refresh()` ou ajustes no listener nativo de redimensionamento caso o componente sofra repintura.
   - Compare componentes quebrados com os "Gold Standards" da própria página (ex: um componente diferente que faz o pinning perfeito). Compare a matemática (`end`, `scrub`, wrappers).

3. **Verificação da Inércia (Lenis)**
   - O ScrollTrigger pode competir se não houver conformidade ou `requestAnimationFrame` em sincronia com o Lenis. Assegure que não há falhas na inércia *Industrial Premium*.

4. **Tratativa e Correção Local**
   - Identificou o erro visualmente? Localize o arquivo JS/CSS correspondente via WSL.
   - Refatore a métrica, ajuste a classe de `overflow` ou calibre o gatilho (`trigger`, `start`, `end`).
   - Finalize rodando o validador do CLI, submeta as alterações no banco de Source Control sem subir à Cloud.
