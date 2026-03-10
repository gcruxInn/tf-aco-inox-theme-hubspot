# 🚀 EXECUTION ORDER (Next Session)

## STATUS ATUAL: DEV CONCLUÍDO (Header Refactor & Icon Harmonization)
O componente **Global Header** foi totalmente refatorado com mobile drawer, animações GSAP e integração 100% com o CMS. Além disso, foi concluída a **esterilização de iconografia** em todo o site, substituindo emojis e ícones antigos por SVGs Lucide industriais (1.25px stroke) conforme o `vibe-blueprint.json`.

## 🎯 PRÓXIMAS AÇÕES (MANDATÓRIAS) PARA A PRÓXIMA SESSÃO:
A próxima sessão deve focar na validação visual final de todos os módulos afetados e auditoria de performance das novas animações.

### 1️⃣ Auditoria de Iconografia & Layout
- **Role:** QA-Engineer / UX-UI Designer
- **Ação:** Verificar se todos os módulos estão exibindo os ícones industriais silver corretamente e se não há quebras de layout no mobile após a troca de emojis por SVGs.
- **Módulos Críticos:**
  - `tfa-menu-header` (Drawer Mobile)
  - `tfa-differentiators` (SVGs Lucide)
  - `tfa-global-footer` (Social & Contact)
  - `tfa-stats-row` (Skip Button)

### 2️⃣ Auditoria de Código (HubSpot Validator)
- **Role:** Full Stack Ops
- **Ação:** Executar `hs validate` para garantir que as novas referências de SVGs e os campos do `fields.json` do Header estão íntegros.

### 3️⃣ Teste de Performance Lenis/GSAP
- **Role:** GSAP Creative Dev
- **Ação:** Validar se o scroll lock do mobile drawer não está conflitando com o Lenis Scroll global.

---
*Gerado automaticamente na conclusão da Sprint "Testimonials Cinematic". Repositório local encontra-se blindado (git status limpo).*
