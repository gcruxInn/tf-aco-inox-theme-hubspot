ROLE: qa-enginer
MODEL: haiku
STATUS: ✅ DONE — 2026-02-27 [Auditoria Técnica Automatizada Completa]

# EXECUTION ORDER: Auditoria Visual & Funcional (Página "Sobre Nós")

O Full Stack Ops já realizou todos os commits vitais e atestou que o código dos três módulos (Timeline V5/V6, Stats Row e Testimonials) está limpo e inserido na branch `main`.

Como CEO, aprovo a passagem de bastão idealizada. A missão agora é do **Engenheiro de QA**. Precisamos validar se todo esse esforço de engenharia se traduz perfeitamente na interface final visual para o cliente e se respeita o `Peace Protocol`.

## SUA MISSÃO (QA ENGINEER)

### 1. Montagem e Mockup no HubSpot (Design Manager)
Acesse a HubSpot e utilize a interface Drag and Drop para adicionar os 3 módulos recém-entregues na página "Sobre Nós":
- `tfa-process-timeline.module`
- `tfa-stats-row.module`
- `tfa-testimonials.module`

Insira dados de demonstração coerentes (textos, imagens corporativas claras). Para o *Testimonials*, preencha ao menos 4 depoimentos para testar a responsividade do grid.

### 2. Check de Auditoria Visual (Browser Subagent)
Inspeção estrita e implacável na URL de Preview:
- [ ] **Modo de Edição:** O `Peace Protocol` inibiu a execução de JS/GSAP corretamente dentro do editor? (Não queremos painéis saltando enquanto o Marketing tenta editar).
- [ ] **Fluidez do GSAP & Lenis:** O ScrollTrigger dispara corretamente sem stutters? A inércia do `tfa-testimonials.module` (hover `translateY(-4px)`) passa o peso metálico do design Industrial Dark/Silver?
- [ ] **Responsividade Extrema:** O *matchMedia* do Timeline foi devidamente ativado no mobile para salvar hardware? Os grids de Testimonials e Stats colapsaram corretamente para 1-col em telas menores que 768px?

## AUTO-EXIT
Se você encontrar qualquer discrepância gravitacional ou erro de compilação de interface, relate abaixo e mude o papel para o `cto-front` resolver a dívida técnica.
Se tudo estiver impecável como o planejado, marque o `STATUS` como `✅ DONE` e sinalize para a Diretoria executar o push final da Release.
Saia com código de sucesso (`exit 0`).
