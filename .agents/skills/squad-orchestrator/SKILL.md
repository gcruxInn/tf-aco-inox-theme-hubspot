---
name: squad-orchestrator
description: Skill de governança usada pelo Full Stack Ops para auditar o fluxo de vida da feature, integridade da HubSpot UI, Vibe Cloning e checagem de regras de DevOps.
---

# Squad Orchestrator Bridge

## Objetivo
Esta skill garante que nenhuma "feature pronta" ou deploy seja liberado no projeto TFAHUB251 sem que os pilares do **Autonomic Computing**, **Vibe Cloning Industrial** e da **Experiência DND HubSpot** estejam 100% validados pelas pessoas corretas do Squad.

## Pipeline do Squad (A Sequência de Checagens)

Toda feature cruza os domínios de 4 instâncias antes do CEO aplicar o Carimbo Final. Siga esta lista de verificação para inspecionar a thread:

1.  **Auditoria de Conteúdo (Head-Mkt Check):**
    *   A estrutura tem campos HubSpot amigáveis (Repeater, Images, RichText)?
    *   A edição bloqueia idiotices do usuário final? (Schema JSON-LD e SEO exigidos no backend do módulo?)
2.  **Harmonia Vibe & Física (UX/UI & GSAP Dev Check):**
    *   O GSAP Dev elaborou o *Blueprint da Timeline* mapeando as matrizes e delays?
    *   O visual estático validado reflete a paleta Dark/Silver (ex: Prata, Inércia metálica do Lenis)?
3.  **Blindagem do Código Nativo (CTO-Front Check):**
    *   O CTO-Front evitou dilaceração de tags HubL (ex: sem espaços `{%include%}` quebrados)?
    *   O "Peace Protocol" foi inserido no topo (Ex: `if(document.body.classList.contains('hs-edit-mode')) return;`) para não bugar o editor visual da CRM?
4.  **Integração e Orquestração (Full Stack Ops Check):**
    *   Nenhum atalho proibido (Integrações que não sejam Serverless da própria HubSpot) foi aplicado na core-logic?
    *   Todo teste ou verificação de logs no terminal rodou obrigatoriamente sob o contexto Bash WSL (`/mnt/c/...`)?

**Ação Punitiva/Corretiva:**
Se qualquer pilar for violado ou pulado durante o desenvolvimento, use sua autoridade para barrar o avanço, devolvendo a feature ao dev ou designer respectivo para arrumar o gap. Só dê passagem se o Pipeline acima for completado com perfeição sistêmica.
