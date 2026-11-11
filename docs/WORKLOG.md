# Hudbird Worklog

Keep this file short. Update it at the end of a meaningful iteration; do not record routine commands.

## Current milestone

Build a distinctive, clean Hudbird homepage and prove that Hudbird sections can be composed and customized through AI while remaining entirely based on Hudbird primitives and layout systems.

## New marketing sections — 2026-11-11

- Upgraded Section Selection / Transition Effect to Professional AI Studio Aesthetics:
  - Eliminated harsh 3px blue outline (`rgb(99 102 241)`) and diffuse blue box-shadow in `IframePreview.tsx`.
  - Implemented lightweight, hardware-accelerated AI-style transition:
    - **Luminous Laser Shimmer Beam**: A 2px gradient beam (`linear-gradient(90deg, transparent, rgba(var(--hb-ai-focus-rgb), 0.95), transparent)`) sweeps from left-to-right across the top edge with `hb-ai-beam-sweep` (1.25s `cubic-bezier(0.16, 1, 0.3, 1)`).
    - **Precision Keyline & Ambient Glow**: Replaced thick borders with a subtle 1px precision keyline and soft luminescence (`hb-ai-focus-pulse`) that automatically adapts tone: crisp silver-white (`255, 255, 255`) on dark sections/dark mode, and sleek graphite (`24, 24, 27`) on light sections.
    - **Zero Load Burden**: 100% pure CSS keyframes (`transform`, `opacity`, `box-shadow`) with zero external JS dependencies, automatic DOM cleanup after 1.5s, and zero layout thrashing.
  - Verification: Tested in Chromium headless via Playwright — verified `outline: none`, active `hb-ai-focus-active` animation with adaptive RGB, and clean automatic teardown. All 83 test suites passed (342/342 tests).

- Refined Hero Video Background per user design direction:
  - Secondary button: Updated text color to dark (`oklch(0.141 0.005 285.823)` / `text-zinc-950`) on a clean white pill surface (`!bg-white !text-zinc-950 hover:!bg-zinc-100 !border-white font-medium`) for high-contrast legibility over the dark video scrim.
  - Controls: Removed the "Pause background video" / "Play background video" button entirely for a clean, uninterrupted cinematic layout.
  - Viewport Height: Set section to full 100vh (`min-h-[100dvh]` / `100vh`) with vertically centered copy and 100% edge-to-edge video coverage. Integrated `--hb-viewport-h` in `IframePreview.tsx` to lock viewport calculations to parent window height and prevent recursive iframe resize loops.
  - Verification: Live verified via Playwright (hero measures exact 900px height on 1440×900 viewport, secondary button displays dark text on white pill, pause button removed). All 83 test suites passed (342/342 tests).

- Resolved Video Hero playback and display issue ("videonya gak ada"):
  - Root cause 1: `.hb-pilot .hb-section > div` forced `position: relative` with high specificity over `.hb-section`'s direct children, overriding Tailwind's `.absolute` utility on `.hb-video-media-wrap` and causing its rendered bounding box to collapse to `height: 0px`. All children (`<video>`, `<img>`, scrim) consequently collapsed to `0px` height.
  - Root cause 2: `.hb-pilot .hb-section` painted a solid white `var(--hb-bg)` (`#ffffff`) background over non-navbar/non-footer sections, obscuring dark video media underneath.
  - Root cause 3: Heavy 85% black gradient scrim washed out subtle video luminance, reducing contrast of architectural footage.
  - Fix: Scoped `.hb-pilot .hb-section:not([data-hero-variant="video"]):not(.hb-video-section) > div` in `landing.css`, added explicit `.hb-video-media-wrap` absolute positioning rules with inline styles and `!important` fallbacks, set dark section background `#09090b` for video hero, calibrated scrim gradient (`from-black/75 via-black/35 to-black/55`), and strengthened programmatic muted autoplay in React `useEffect`.
  - Added dual-stream fallback with bundled local video `/assets/hero-video/animate_hero_agency720p.mp4` alongside Pexels CDN loop.
  - Verified live in headless Chromium via Playwright: video renders with full 1014×640px dimensions, plays actively (`currentTime > 2s`, `readyState: 4`, `paused: false`), and displays the 2-font editorial headline with AAA legibility. All 83 test suites passed (342/342 tests).

- Added `hero/editorial-photo` (Obsidian 02-03 Hero Editorial dengan Foto Penuh) and upgraded `hero/video` with monochrome styling:
  - Reference Asset for Hero Editorial Photo: Pexels monochrome room (`https://www.pexels.com/photo/lamp-over-table-and-chairs-in-room-21529967/`, ID 21529967) with keyword **"monochrome room"** conceptually aligned with the title _"Make 'room' for your next idea"_.
  - Implemented `HeroEditorialPhoto` (`packages/marketing/src/components/HeroSection/HeroEditorialPhoto.tsx` and `hero-editorial-photo.css`):
    - Strict DOM order: H1, summary text, primary CTA, secondary CTA, optional photo credit link. Single DOM structure ensures WCAG compliance and zero duplicate H1 elements.
    - Responsive layout: mobile (<640px) solid copy panel (16px gutter, 40px vertical padding) above full-width 4:5 photo; tablet (640–1023px) 3:2 photo with bottom-left floating solid panel (max 460px, 24px inset, 24px padding); desktop (≥1024px) 16:9 photo (max height 720px) with 6/12 col floating panel (48px inset, 32px padding, 16px radius).
    - Contrast: Solid surface panel (`bg-background` light, `bg-card` dark) ensures flawless legibility regardless of photo brightness or composition.
    - Fallback: Gracefully renders clean text-only mode (max 680px) with standard section spacing when media is missing.
    - Accessibility: Gracefully switches panel into document flow at 200% zoom or constrained viewport heights, keyboard accessible credit link.
  - Upgraded Hero Video Background (`VideoHero` in `HeroSection.tsx` and `demo-video.ts`):
    - High-definition monochrome loop from Pexels (`https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4`) and tech network loop (`https://videos.pexels.com/video-files/3129671/...`).
    - Added dual-source support: automatically detects YouTube video URLs and renders seamless monochrome iframe loops with muted autoplay and hidden controls, while maintaining native `<video>` support for direct MP4 sources.
    - Applied high-end monochrome filters (`grayscale contrast-115 brightness-80`) with dark/light gradient scrims for AAA contrast.
    - Accessible user playback controls with "Play background video" / "Pause background video" toggle button and graceful poster fallback upon blocked autoplay or network failures.
  - Verification: 5 new unit tests in `HeroEditorialPhoto.test.tsx`, all 83 workspace test suites passed (342/342 unit tests), `@hudbird/schemas` build succeeded, `@hudbird/marketing` tsup build succeeded, and `apps/docs` Vite production build succeeded.

- User selected the Obsidian plan plus existing Hudbird core styling/motion, with a separate collection preserving legacy presets. First approved slice: `02-01 Hero Split Product`; the remaining categories and config migration are later slices.
- Added `hero/split-product` to the builder's additional variants, public HeroSection renderer and thumbnail. Uses Section/Container/Grid/GridItem, Heading/Text/Button and MotionReveal. Copy and media remain immediately visible; only a decoded image's decorative border reveals. Motion off and OS reduced-motion suppress positional feedback.
- Added `hero/center-canvas` (Obsidian 02-02 Hero Tengah dengan Product Canvas) to additional hero variants, public HeroSection renderer, catalog, data, and SectionWireframeSvg thumbnail. Uses Section/Container, Heading/Text/Button, responsive `<picture>` art direction (mobile crop vs desktop 16:10), tactile double-bezel concentric chassis (24px radius, 16px internal padding, 12px inner media), R01 caption reveal (240ms cubic-bezier(.23,1,.32,1) triggered on 30% viewport intersection), and graceful missing-media/error fallbacks.
- Enhanced `hero/center-canvas` with an interactive video walkthrough popup trigger (Play overlay with +1.5px optical compensation, tactile hover/active spring physics). Upgraded `FullscreenVideoPlayer` with YouTube embed parser (supporting direct URLs like https://youtu.be/blxEtDtn31U) and accessible modal lifecycle.
- Renamed section variant to **Hero Center Video** (`center-video` with backward-compatible `center-canvas` alias). Updated catalog labels, docs previews, and dedicated wireframe SVG.
- Fixed container height: set chassis padding to zero and overflow hidden so the 16:9 thumbnail fits edge-to-edge flush top and bottom with zero vertical gaps.
- Refined `footer/contact-action` (Obsidian 18-04) and global footer links:
  - Removed artificial max-width clamp on `.hb-contact-action-panel`, making the contact consultation card cleanly span 100% of the container width (`Container size="xl"`).
  - Synchronized spacing rhythm: gap between the card and the footer navigation row is mathematically identical to the top padding (`--hb-contact-footer-space`: 3.5rem mobile / 4.75rem desktop).
  - Expanded navigation links to 5 complete, rich sitemap groups (Product, Solutions, Resources, Company, Legal & Trust) with no external links that could trigger errors (all safe in-page anchors and protocol channels).
  - Replaced button components across all footer variants (`simple`, `columns`, `centered`, `locale-status`, `contact-action`) with `.hb-footer-nav-link`: subtle, sweet underline on hover (`underline-offset-4 decoration-current/40`) with transparent background and no button box styles.
  - Refined `simple` and `centered` footer presets to retain compact, focused navigation (6 core product links) rather than dumping all multi-category links.
  - Re-architected `columns` preset layout using nested Hudbird `Grid` (`cols={12}` outer with `cols={3}` inner subgrid): brand signature stays isolated on the left (`lg:col-span-4`), while navigation columns on row 2 start directly aligned under column 1 of the navigation grid (never wrapping underneath the logo and description).
- Verification: 13 focused LandingFooter unit tests passed, all 82 workspace test suites passed (337/337 unit tests), @hudbird/marketing build succeeded (CJS/ESM/DTS), and apps/docs Vite production build succeeded.
- Verification: 31 focused Hero/LandingPage unit tests passed across 4 test suites, @hudbird/schemas tsup build succeeded, @hudbird/marketing tsup CJS/ESM/DTS builds succeeded, and apps/docs Vite production build succeeded.
- The new preset supports 5/7 desktop composition, stacked mobile content, light/dark artwork, sourced proof, missing-media text-only mode and load-failure fallback. Uses existing labeled Hudbird Page Builder screenshots. Existing content maps can omit the new preset and render its text-only fallback; v1 configs retain their 12 types.
- Verification: 23 focused Hero/LandingPage tests passed, schema typecheck passed, Vite production build passed. Marketing typecheck reports 10 errors in unchanged Navbar presets and FullscreenVideoPlayer. Browser review was blocked by dev-server listen EPERM; viewport/theme visual review remains outstanding. CLI distribution and exported standalone consumer verification were not run; consumers need the referenced image assets.

## Completed decisions

- SaaS/product-launch is the first complete landing-page use case.
- Linear informs restraint, layout rhythm, typography, and product presentation.
- Motion is calm: short one-time reveals, controlled transitions, reduced-motion support.
- Legacy duplicate marketing entries should eventually converge into the SaaS section collection while compatibility aliases remain temporarily.
- The Page Builder is a primary docs destination with its own focused sidebar experience.
- Users receive editable source through the Hudbird CLI; React and JSON exports represent the same configuration.
- The public homepage uses the same Hudbird logo assets as the docs application.

## Work in progress — paused

Homepage revamp and its audit fixes are present in the working tree but final verification was intentionally paused to save the user's usage limit.

Selected audit findings authorized for repair:

1. Prevent duplicate `h1` in the mini builder.
2. Make the selected-preview live announcement concise.
3. Replace generated product-proof artwork with actual Page Builder captures.
4. Keep homepage demo payload out of the public CLI block.

Implementation for these items has been started. Do not redo discovery. On explicit resume, inspect the current diff and run focused verification before making additional changes. Findings 4, 6, and 7 remain unapproved and must not be fixed automatically.

## Known boundaries

- The working tree contains substantial user and prior-agent changes; never discard unrelated changes.
- Root/docs type checks have previously included unrelated existing errors. Prefer package-targeted checks.
- Registry source, generated registry, docs, and skills can drift; synchronize them only when the requested slice affects distribution.
- Broad visual matrices and packed CLI consumer checks are expensive and reserved for finalization.

## Next suggested iteration

Resume and verify only audit fixes 1, 2, 3, and 5. Do not start a wider homepage redesign or full delivery gate unless requested.
