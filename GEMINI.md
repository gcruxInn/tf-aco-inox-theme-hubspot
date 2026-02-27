# tf_aco_inox_complete_briefing.json PATH: C:\Users\gabri\Documents\dev\InnLeaders\TFAHUB251\tf_aco_inox_complete_briefing.json
# CLAUDE.md: Governance Protocol for TFAHUB251

## Mantra
**Enterprise Grade, Set-and-Forget**
Escalabilidade, Segurança e Autonomia são inegociáveis.

## Build Commands
- `hs upload <src> <dest>`: Uploads the project (Deploy). NUNCA utilize `hs project upload` com espaços soltos no terminal; use estritamente `hs upload . TFAHUB251`.
- `hs validate`: Validates the project structure and syntax.
- `hs fetch`: Baixa as alterações do portal para local (Sync).

## Golden Architecture Rules
1. **HubSpot Native First:** Toda lógica de produção deve ser nativa HubSpot (Serverless Functions/Workflows/CRM Objects).
2. **Set-and-Forget (Autonomic Computing):** O desenvolvimento deve focar em arquiteturas 100% nativas, garantindo que o sistema seja robusto, escalável e autogerenciável. Proibido o uso de sistemas de integração externos para lógicas core.
3. **Single Source of Truth:** O HubSpot é a única fonte da verdade para dados, layout e regras de negócio.

## Workspace Structure & Reference
- **Main Project (Active):** `C:\Users\gabri\Documents\dev\InnLeaders\TFAHUB251`
- **Reference Project (Adaptable):** `C:\Users\gabri\Documents\dev\InnLeaders\ThemClean`
- **Usage:** Always use `ThemClean` as the "Gold Standard" for native HubSpot CSS/Grid behavior when auditing or refactoring `TFAHUB251`.

## Protocolo de Caminhos e Ambiente (WSL vs Windows) - [CRÍTICO]
O ambiente de desenvolvimento é híbrido e focado em WSL.
- **Terminal Mandatário:** Sempre use `wsl -d Ubuntu-22.04` para operações de CLI e manipulação de arquivos.
- **Root Path Linux:** `/mnt/c/Users/gabri/Documents/dev/InnLeaders/`
- **Caminhos em Ferramentas MCP:** Use **SEMPRE** o caminho Linux absoluto começando com `/mnt/c/...`.
- **Conversão de Contexto:** Se o usuário fornecer um caminho Windows, converta imediatamente:
    - `C:\Users\gabri\...` -> `/mnt/c/Users/gabri/...`

## Power Protocol (Databricks Concept)
Para extrair a máxima potência do stack MCP, utilize as ferramentas conforme suas especialidades:

1. **Investigação & Documentação (O "Consultor"):**
    - Use `HubSpotDev` e `web-scraper` para buscar a verdade absoluta na documentação oficial.
    - Antes de codar algo complexo, verifique a documentação para garantir que a abordagem é suportada.
    - Exemplo: "Como funciona `dnd_area` em parciais globais?" -> `search-docs` / `fetch-doc`.

2. **Engenharia de Código (O "Construtor"):**
    - Use `ClaudeCode` (via MCP) para escrever, refatorar e analisar código complexo. Ele roda no WSL, então **lembre-se da regra de caminhos**.
    - Use `openai-coder` como um par programador alternativo ou para gerar snippets isolados.

## Padrões de Desenvolvimento
- **Ferramentas:** Sempre priorize `HubSpotDev` (via Bash/MCP) para interações de CLI.
- **Design System:** Seguir estritamente o `vibe-blueprint.json` para tokens de design.
- **Serverless:** Funções devem residir na pasta `functions/`, usar Node.js 18+ e serem implantadas via `hs upload`.
- **(NEW) HubL Syntax:** AI must **NOT** fragment `{%` or `{{` tags with spaces or newlines. **ALWAYS** verify single line syntax for `include`, `macro` and `set`.


## Protocolo de Memória & Arquivos (Anti-Loop)
- **Source of Truth:** NUNCA tente ler arquivos de logs internos (`.system_generated`, `.gemini/brain`) para "lembrar" o estado.
- **Ação:** Sempre leia o arquivo **real e vivo** no diretório atual (ex: `theme.json`, css files) para obter o estado mais recente.
- **Recuperação:** Se um arquivo parecer ausente, execute `ls -R` (no terminal apropriado) para confirmar a estrutura antes de alucinar um caminho.