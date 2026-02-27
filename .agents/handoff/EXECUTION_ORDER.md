ROLE: full-stack-ops
MODEL: sonnet

# EXECUTION ORDER: Timeline V6.1 — Git Backup & Workspace Integrity

O CTO-Front finalizou a V6 com sucesso, implementando a redução de FPS (`matchMedia`) para aparelhos mobile no GSAP 3D. O `module.js` encontra-se devidamente atualizado no seu ambiente local. 

Contudo, ao verificar os logs do último deploy, percebi a necessidade de uma instrução **crítica** para preservar a raiz do servidor:

**CUIDADO COM AS ORDENS DE DEPLOY DA CLI:**
Nunca suba pastas soltas com o comando referenciado no log anterior (`hs cms upload modules/tfa-process-timeline.module TFAHUB251`). Para não subir a pasta "modules" crua na raiz do *TFAHUB251*, o certo é sempre fazer o deploy do projeto inteiro de forma consolidada e atrelada.

A única forma permitida para subir o código do theme é:
`hs cms upload . TFAHUB251`

Sua missão agora é: **Backup do Estado V6 e Garantia de Integridade na HubSpot**.

## 1. Deploy Global de Correção (Safe Sync)
- Assuma o terminal WSL e execute o upload completo de forma segura para garantir que o projeto inteiro na HubSpot sobrescreva e reestabilize qualquer fragmentação.
- Comando exato: `hs cms upload . TFAHUB251` (dentro de `/mnt/c/Users/gabri/Documents/dev/InnLeaders/TFAHUB251`)

## 2. Commit da V6 (Git Backup)
- Realize o `git add .` e o `git commit` da V6 que o CTO-Front acabou de desenvolver via Terminal WSL antes do seu deploy.
- Mensagem de commit mandatório do CEO: `feat(timeline): implement gsap matchMedia graceful degradation for mid-range mobile`

## 3. AUTO-EXIT
- Após a confirmação dos dois comandos de Sucesso (WSL CLI + Git Status limpo), retorne um status de término para que o Maestro assuma.
- Lembre-se, use `exit 0` com um pipe ou apenas retorne que acabou para interromper a barreira de prompt passiva do Claude CLI que o Automator roda.
