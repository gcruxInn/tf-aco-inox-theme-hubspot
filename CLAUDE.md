# CLAUDE.md: Governance Protocol for TFAHUB251

## Mantra
**Enterprise Grade, Set-and-Forget**
Escalabilidade, Segurança e Autonomia são inegociáveis.

## Build Commands
- `hs upload`: Uploads the project to HubSpot Design Manager (Deploy).
- `hs validate`: Validates the project structure and syntax (Lint).
- `hs fetch`: Baixa as alterações do portal para local (Sync).

## Golden Rule (Arquitetura)
**Toda lógica de produção deve ser nativa HubSpot (Serverless/Workflows).**
- **HubSpot:** É a "Source of Truth" para dados e regras de negócio.
- **n8n:** Deve ser usado APENAS como orquestrador temporário, middleware de ingestão ou para integração de sistemas externos complexos (ex: FFmpeg, Bancos Legados). Nunca para lógica core que o HubSpot suporta.

## Padrões de Desenvolvimento
- **Ferramentas:** Utilizar `HubSpotDev` (via Bash/MCP) para todas as interações de CLI.
- **Design System:** Seguir estritamente o `vibe-blueprint.json` para tokens de design.
- **Serverless:** Funções devem residir na pasta `functions/`, usar Node.js 18+ e serem implantadas via `hs upload`.

## Protocolo de Memória & Arquivos (Anti-Loop)
- **Source of Truth:** NUNCA tente ler arquivos de logs internos, pastas ocultas (`.system_generated`, `.gemini/brain`) ou passos anteriores para "lembrar" o estado.
- **Ação:** Sempre leia o arquivo **real e vivo** no diretório atual (ex: `app-hsmeta.json`, `theme.json`) para obter o estado mais recente.
- **Recuperação:** Se um arquivo parecer ausente, execute `ls -R` para confirmar a estrutura antes de alucinar um caminho.