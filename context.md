# Project Manifest: TF Aço e Inox (TFAHUB251)

## Role & Objective
Role: Senior Full-Stack Engineer & Autonomic Systems Architect.
Goal: Build a high-performance, "Enterprise Grade" B2B website.
Target: HubSpot CMS (Theme: TFAHUB251 - Root Structure).

## Technical Stack
- **Framework:** HubSpot CMS (HubL).
- **Styling Strategy:** "CSS Cascade Hierarchy". Module-first CSS targeting HubSpot wrappers `.hs_cos_wrapper_type_*`. Design System in `theme.css` (40+ CSS variables).
- **Editor Experience:** Custom `editor_css` configured in `theme.json` to ensure WYSIWYG accuracy.
- **Icons:** Lucide-React (converted to SVGs).
- **Grid System:** HubSpot 12-column responsive grid with automatic positioning (Fixed macros for Editor).

## Current Architecture

### Layout Strategy
**Header:**
- **Top Bar:** Full-width (`dnd_area` with no `max_width`) for announcements
- **Main Header:** Contained at 1200px (`dnd_section` with `max_width=1200`)
  - 4-column grid: Logo (3) + Menu (6) + Search (2) + Language (1) = 12 cols
  - Columns wrapped in `dnd_row` for proper HubSpot grid distribution

**CSS Approach:**
- Global design tokens in `css/theme.css`
- Component styles in `css/components/_header.hubl.css`, `_footer.hubl.css`
- **Correction (Feb 2026):** Restored correct HubL syntax in `main.hubl.css` and `_layout.hubl.css` to fix grid compilation.

### HubSpot Grid Rules (Learned)
1. `dnd_column` tags **MUST** be inside `dnd_row`, not directly in `dnd_section`
2. HubSpot auto-calculates column positions when siblings in a row - **do not use manual `offset`**
3. HubL syntax inside CSS files (`{% ... %}`) must be meticulously formatted; spaces inside tags (`{ %`) break the compiler.

## Autonomic Principles (ESTABLISHED)
1. **Self-Configuration:** Config via `fields.json`.
2. **Self-Healing:** 
   - [COMPLETED] Hero Module: Video Background auto-heals to Image Poster on network failure.
   - [NEXT] Services Module: Must handle missing icons gracefully.
3. **Set-and-Forget:** Zero maintenance code.

## Current UI State & Roadmap
- [DONE] **Feature:** Theme Consolidation (Root Structure - Phase 5).
- [DONE] **Global Partials:** Header & Footer (Schema, ARIA, DnD - Phase 7).
- [DONE] **Flexible Header:** Full DnD architecture with Top Bar + Main Header (Phase 10).
- [DONE] **Hero Module (`tfa-hero-industrial`):** Refactored. CSS extracted. Self-healing active.
- [DONE] **Phase 12: Brand Research & Project Audit:**
  - ✅ Instagram deep scraping (@tfacoeinox - 127 posts, 12.8K followers)
  - ✅ Brand guide creation (colors: Navy Blue #1A2B4A, Vibrant Orange #FF6B00, Gold #FFB800)
- [DONE] **Phase 13: Layout Stabilization (Feb 2026):**
  - ✅ **Home V2 Template (`home_v2.hubl.html`):** Created with optimized section structure.
  - ✅ **Grid System Repair:** Fixed `_layout.hubl.css` to resolve vertical stacking in Editor.
  - ✅ **Editor Styles:** Configured `theme.json` to load CSS in the editor.
  - ✅ **Syntax Audit:** Fixed broken HubL tags in all CSS files.

- [PENDING] **Next Steps** (User decision required):
  - **Option A:** Hero overlay implementation with navy blue gradient + "spark wire" CTA borders
  - **Option B:** Content page creation (Sobre Nós, Serviços, Portfólio, Contato) using Instagram captions

## Module Inventory (10 Total - All Validated)
1. `tfa-client-logos` (image fields)
2. `tfa-cta-footer` (text fields)
3. `tfa-differentiators` (4 value props - new)
4. `tfa-feature-grid` (text fields)
5. `tfa-hero-industrial` (self-healing video/image)
6. `tfa-portfolio-grid` (6 projects - new)
7. `tfa-process-timeline` (8-step timeline - new)
8. `tfa-services-grid` (6 services - new)
9. `tfa-stats-row` (4 statistics)
10. `tfa-testimonials` (carousel - new)

## Deployment Notes
- **Upload Command:** `hs cms upload . TFAHUB251`
- **Remote Cleanup:** Delete old `TF Master Theme HubSpot` from Design Manager
- **Browser Tool Status:** UNSTABLE (manual validation required)

## Next Priorities
1. **CTA Design Finalization:** Choose "spark wire" border effect for hero CTA (navy blue bg + orange borders)
2. **Implementation Path Decision:**
   - **Path A:** Hero overlay (measure header height, update CSS, apply Instagram brand colors)
   - **Path B:** Content pages (Sobre/Serviços/Portfólio/Contato with Instagram messaging)
3. **Post-Implementation:** Visual validation, accessibility testing, mobile responsiveness
