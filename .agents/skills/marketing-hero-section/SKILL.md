---
name: marketing-hero-section
description: Maintain the additive HeroSection and StartupPilot composition APIs and their branded website workflow.
---

# Branded hero and startup page blueprint

Read `../hudbird-startup-pilot/SKILL.md` for the user workflow. The approved direction for this pilot is clean and calm, with decorative glass, blur, and elaborate motion opt-in. User-owned brand assets are allowed.

- Core primitives provide controls and macro layout. Blocks group product content. HeroSection is a swappable section. StartupPage is a composition of those sections.
- BrandProfile, HeroContent, HeroSectionConfig, PageComposition, and StartupPageContent live in packages/schemas/src/composition.ts. Keep shared hero copy separate from variant media.
- HeroSection supports centered, split, slideshow, video, and interactive. Never rename or replace the existing Hero API.
- BrandScope scopes tokens, mode, typography, density, radius, and accessible accent foregrounds. Keep page-local anchors working inside HashRouter previews.
- ProductDemo uses core Tabs and actual tab panels, with sample data labels. Slideshow is manual. Video starts paused and provides poster, play/pause, and failure fallback.
- New source files and dependencies must survive CLI registry transformation. Install StartupPilot from a packed CLI in a separate Vite/Tailwind v4 fixture and typecheck/build it.
- Update the documentation workbench, workflow skill, and behavior tests together. Compare both brands, both modes, all hero types, and 375/768/1024/1440 widths. Use scripts/verify-startup-pilot.mjs for browser checks.


## Theme and font follow-up

The documentation workbench follows the website theme by default and offers explicit light/dark preview overrides. Preserve that choice when switching brand presets. Explicit light blocks must exclude dark ancestor styles through the Tailwind dark variant's `data-hb-theme` boundary. The font selector must use core `Select` and `SelectItem`, reusing the existing typography catalog. Selected Google Fonts are carried in optional `BrandProfile.googleFont` plus a fallback `fontFamily`; BrandScope loads a family once in the rendering document, including iframe previews. Keep core Section/Container/Grid layouts and Card/CardHeader/CardBody surfaces. Run `tests/pilot-core.test.ts`, `tests/pilot-theme.test.tsx`, and `scripts/verify-pilot-theme.mjs` when changing this behavior.


HeroImage supports optional darkSrc, selected by the enclosing BrandScope for images, slideshow slides, and video posters. Keep bundled demo artwork theme-aware, and preserve single-source customer media unchanged. Run scripts/verify-pilot-artwork.mjs when changing asset selection.
