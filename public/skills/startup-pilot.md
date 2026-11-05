---
name: hudbird-startup-pilot
description: Build a branded promotional website with Hudbird, compare compositions, swap hero layouts, and make UI touch ups through Codex.
---

# Hudbird startup website workflow

Use this workflow when someone wants a branded promotional website, asks to swap a hero, or asks for UI touch ups. The user may not know how to code. Guide setup yourself and explain choices in ordinary language.

## 1. Interview

Collect the business, visitor, page goal, logo file, primary color, reference URL, and available content. Ask what they like about a reference if its intent is unclear. Inspect the reference when accessible; say when it cannot be inspected. A reference is inspiration, not a request to copy it.

Do not invent customers, reviews, revenue, certifications, or product claims. Missing content must be requested or visibly marked as demo/placeholder. Confirm destination links before publishing. Keep user-owned assets; the library's stock photography policy does not prohibit a user's own media.

## 2. Offer two compositions before building

Use `pilotCompositions` as starting points: `story-first` explains benefits before the demo; `product-first` leads with the product. Prepare preview links or screenshots for both, using the available brand assets. Explain the hierarchy difference briefly and wait for the user's selection. Do not treat elapsed time as a choice.

Local previews: `/#/templates/startup-pilot?composition=story-first` and `/#/templates/startup-pilot?composition=product-first`. The interactive catalog is `/#/marketing/hero-pilot`. These built-in URLs show fixture content; create brand-specific previews when making a real site.

## 3. Set up and assemble

Start with React/Vite and Tailwind v4 for this pilot. Use the project's existing package manager. Install the library source with `npx hudbird-ui add StartupPilot` (or the locally packed CLI during development). Do not overwrite existing components without reviewing local changes.

Import `StartupPage`, `pilotCompositions`, `pilotHeroes`, and `startupContent` from the installed StartupPilot directory. The default directory is `src/components/hudbird-ui`; respect `components.json` aliases. The CLI includes schemas, CSS, media, and core dependencies. Ensure the app CSS imports Tailwind and scans the installed source directory. No unpublished workspace packages should remain in consumer imports.

Create a typed `BrandProfile`, a selected `PageComposition`, and `StartupPageContent`. Replace fixture copy with the approved content. Primary colors use six-digit hex; the scope chooses black or white button text for contrast. Brand typography, radius, density, and mode are scoped to the page. References are brief metadata, not automatically scraped by components.

Preserve the public APIs of existing components. Prefer core primitives, semantic tokens, and page composition changes. Keep the default clean and calm. Decorative blur, glass, autoplay, and elaborate motion need an explicit user purpose. Check changes against the existing tests before editing core components.

## 4. Touch up without losing content

Change only `composition.hero` to select `centered`, `split`, `slideshow`, `video`, or `interactive`. Keep `content.hero` and `brand` intact. Replace media in the chosen config with user-owned assets. Do not overwrite the user's other hero configs. Reorder or replace a content section without rebuilding the page.

Slideshow is manual. Background video starts paused, is muted, has a poster, play/pause controls, and a failure fallback. Interactive demo uses local sample data and is visibly labeled. Do not imply it is connected to a backend.

## 5. Review and hand over

Run the app and inspect 375, 768, 1024, and 1440 px widths in light and dark mode. Check keyboard access, visible focus, text contrast, media fallback, reduced motion, and all links. Test slideshow controls, video play/pause, and demo tabs. Confirm there are no horizontal overflows, clipped text, or overlapping controls. Fix issues found, then run relevant tests, type checks, and build.

Show the finished preview and explain how to request future changes. Record where the user needed help, which change requests were successful, and their visual feedback. Human usability and willingness to pay remain unverified until real people try the workflow. Do not claim that automated checks prove visual quality or market demand.


## Theme and font follow-up

The documentation workbench follows the website theme by default and offers explicit light/dark preview overrides. Preserve that choice when switching brand presets. Explicit light blocks must exclude dark ancestor styles through the Tailwind dark variant's `data-hb-theme` boundary. The font selector must use core `Select` and `SelectItem`, reusing the existing typography catalog. Selected Google Fonts are carried in optional `BrandProfile.googleFont` plus a fallback `fontFamily`; BrandScope loads a family once in the rendering document, including iframe previews. Keep core Section/Container/Grid layouts and Card/CardHeader/CardBody surfaces. Run `tests/pilot-core.test.ts`, `tests/pilot-theme.test.tsx`, and `scripts/verify-pilot-theme.mjs` when changing this behavior.
