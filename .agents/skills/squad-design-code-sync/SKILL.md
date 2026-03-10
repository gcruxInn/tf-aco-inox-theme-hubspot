---
name: squad-design-code-sync
description: Skill de intermediação entre UX/UI Designer e CTO-Front para garantir sincronia absoluta entre blueprint e código.
---

# Squad Design-Code Sync Protocol

## Objetivo
Atuar como a ponte (`Full Stack Ops`) entre a visão artística do *UX/UI Designer* e a implementação robusta do *CTO-Front*. Garante que nenhum pixel ou token de animação se perca no processo.

## Funções de Intermediação

1. **Token Validation (Vibe Mapping)**
   - Validar se as variáveis CSS e tokens no `vibe-blueprint.json` estão sendo consumidos corretamente no `index.css` e módulos.
   - Auditar o uso de cores, tipografia (Google Fonts) e gradientes.

2. **Handoff de Animação**
   - Converter o "Blueprint GSAP" gerado pelo *GSAP Motion Scraper* em tarefas acionáveis para o *CTO-Front*.
   - Definir pontos de controle de performance (FPS) e suavidade de scroll (Lenis).

3. **Auditoria de Fidelidade (Vibe Cloning)**
   - Comparar o resultado final com a referência visual original.
   - Ajustar micro-animações, hover effects e transições para atingir o nível "AWWWARDS".

## Regras de Governança
- **Set-and-Forget:** A intermediação deve resultar em código autogerenciável dentro do ecossistema HubSpot.
- **Single Source of Truth:** O `vibe-blueprint.json` é a verdade absoluta para design; qualquer alteração deve ser sincronizada ali primeiro.

Utilize esta skill para coordenar tarefas complexas que envolvam múltiplos papéis da squad.
