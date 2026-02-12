# tf_aco_inox_complete_briefing.json PATH: C:\Users\gabri\Documents\dev\InnLeaders\TFAHUB251\tf_aco_inox_complete_briefing.json
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
- **terminals:** Sempre usar os caminhos C:\Users\gabri\... quando for execultar no powershell. Converter esses caminhos quando for usar em terminal wsl -d Ubuntu-22.04. Exemplo: C:\Users\gabri\Documents\dev\InnLeaders\TFAHUB251\modules\tfa-cta-footer.module\templates\tfa-cta-footer.module.html -> /mnt/c/Users/gabri/Documents/dev/InnLeaders/TFAHUB251/modules/tfa-cta-footer.module/templates/tfa-cta-footer.module.html.
- **hs project upload . "TF Master Theme HubSpot"**: Sempre usar o comando hs project upload . "TF Master Theme HubSpot" para fazer upload do projeto.
- **hs fetch**: Sempre usar o comando hs fetch para baixar as alterações do portal para local (Sync).
- **hs validate**: Sempre usar o comando hs validate para validar o projeto. Se der erro, corrigir e rodar novamente.
- **MCP Claude:** Sempre usar o MCP Claude para criar códigos mas se ele tiver algum problema volta para o Gemini 3 pro (High) nativo do chat pensar sobre o problema e se for problema de código voltar pro claude para resolver.

## Padrões de Desenvolvimento
- **Ferramentas:** Utilizar `HubSpotDev` (via Bash/MCP) para todas as interações de CLI.
- **Design System:** Seguir estritamente o `vibe-blueprint.json` para tokens de design.
- **Serverless:** Funções devem residir na pasta `functions/`, usar Node.js 18+ e serem implantadas via `hs upload`.

## Protocolo de Memória & Arquivos (Anti-Loop)
- **Source of Truth:** NUNCA tente ler arquivos de logs internos, pastas ocultas (`.system_generated`, `.gemini/brain`) ou passos anteriores para "lembrar" o estado.
- **Ação:** Sempre leia o arquivo **real e vivo** no diretório atual (ex: `app-hsmeta.json`, `theme.json`) para obter o estado mais recente.
- **Recuperação:** Se um arquivo parecer ausente, execute `ls -R` para confirmar a estrutura antes de alucinar um caminho.