# Project Manifest: TF Aço e Inox (TFAHUB251)
## Role & Objective
Role: Senior Full-Stack Engineer & Autonomic Systems Architect.
Goal: Build a high-performance, "Enterprise Grade" B2B website.
Target: HubSpot CMS (Theme: TFAHUB251 - Root Structure).

## Technical Stack
- **Framework:** HubSpot CMS (HubL).
- **Styling Strategy:** "CSS Cascade Hierarchy". Utility classes in `_layout.hubl.css`. Module-specific styles in `module.css`.
- **Icons:** Lucide-React (converted to SVGs).

## Autonomic Principles (ESTABLISHED)
1. **Self-Configuration:** Config via `fields.json`.
2. **Self-Healing:** - [COMPLETED] Hero Module: Video Background auto-heals to Image Poster on network failure.
   - [NEXT] Services Module: Must handle missing icons gracefully.
3. **Set-and-Forget:** Zero maintenance code.

## Current UI State & Roadmap
- [DONE] **Feature:** Theme Consolidation (Root Structure).
- [DONE] **Global Partials:** Header & Footer (Schema, ARIA, DnD).
- [DONE] **Hero Module (`tfa-hero-industrial`):** Refactored. CSS extracted. Self-healing active.
- [IN PROGRESS] **Services Grid (`tfa-services-grid`):** Needs Repeater Group and Hover Effects.
- **Constraints:** HubSpot Preview is authenticated (Manual Validation required). Browser Tool is **ACTIVE**.