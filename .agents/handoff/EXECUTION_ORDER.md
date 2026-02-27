ROLE: qa-engineer
MODEL: haiku

# Finalizing Home Hero Cinematic Scrolltelling & QA Audit

This plan addresses the user's request to finalize the Home Hero section using the provided Veo 3.1 video context, and perform a QA Audit using the MCP Web-Scraper tool.

## Proposed Changes

### `tfa-hero-industrial.module`

#### [NEW] `module.js`
Create the GSAP animation logic matching the Veo 3.1 aesthetic ("Hyper-realistic industrial luxury", "Molecular Precision").
- **Peace Protocol:** Implement `if (window.hsInEditor || document.body.classList.contains('hs-edit-mode')) return;`
- **Dependency:** Wait for GSAP and SplitType to load.
- **Animation Sequence:**
  - Initial `opacity: 0` and Y-translation for the hero content.
  - Apply `SplitType` to `.hero-headline` for character/word staggered reveal.
  - Use `power4.out` casing for heavy, metallic inertia.
  - Scale down the video slightly (e.g., from 1.1 to 1.0) on scroll (scrubbed) to simulate the "Seamless continuous flow".

#### [MODIFY] [module.css](file:///c:/Users/gabri/Documents/dev/InnLeaders/TFAHUB251/modules/tfa-hero-industrial.module/module.css)
- Ensure performance optimizations for the video (e.g., `will-change: transform`).
- Base states for the animated elements so they're hidden before JS executes but visible safely in the editor.

## User Review Required

> [!IMPORTANT]
> To execute the **QA Visual Audit & Performance Check (Timeline V7)** using the Web-Scraper MCP, I need the exact **HubSpot Preview URL** for the Home page.
> Please provide the preview link so I can evaluate the 60FPS metrics and screenshot the DOM.

## Verification Plan

### Automated Tests
- N/A for this module context.

### QA Script (Using Web-Scraper)
- Use `web-scraper` evaluate script to check `document.body.classList.contains('hs-edit-mode')`.
- Measure frame rates (FPS) via requestAnimationFrame timings during scroll.

