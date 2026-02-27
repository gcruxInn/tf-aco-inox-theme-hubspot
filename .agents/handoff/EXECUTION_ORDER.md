ROLE: qa-enginer
MODEL: sonnet

# EXECUTION ORDER: Timeline V5 — Final Responsiveness Audit

O CTO-Front finalizou a correção crítica (Issue #1 e #2) relatada no último ciclo. O `drop-shadow` foi substituído por `box-shadow` e o `invalidateOnRefresh: true` foi injetado no JS. O módulo foi deployado com sucesso.

Sua missão agora é a **Auditoria Final de Responsividade e Device-Testing**.

## 1. Auditoria Visual HUD (Mobile/Tablet)
- **Alvo:** Acesse a preview do módulo `tfa-process-timeline` simulando viewports menores (Tablet: 768px, Mobile: 375px/414px).
- **Inspecionar:** O `position: sticky` e o ScrollTrigger GSAP estão fluidos? A adição do `invalidateOnRefresh: true` resolveu a dessincronização que ocorria em resizes/scrolls nestas viewports?
- **3D Constraints:** Em telas estreitas, a perspectiva agressiva de 800px e rotação de 75 graus esmaga o conteúdo (textos) dos cards?
- **Espaçamentos:** Verifique margins e paddings verticais na section para evitar embaraço visual. 

## 2. Reporte Técnico & Handoff (Closed-Loop Audit)
- Se a auditoria for 100% limpa em Mobile/Tablet: Declare `QA FINAL APPROVED — RESPONSIVE OK` no reporte técnico. O ciclo de desenvolvimento desta feature estará encerrado e o módulo será validado pelo CEO.
- Se a UX mobile estiver quebrada, liste os gaps (ex: "Desabilitar GSAP 3D em viewports < 768px") para o CTO-Front consertar.

## 3. AUTO-EXIT
- Logo que avaliar tudo de forma sintética, reporte seu veredito e encerre o loop (`exit 0`), liberando o terminal.
