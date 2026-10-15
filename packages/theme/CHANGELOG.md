# @hudbird/theme

## 1.5.0

### Patch Changes

- 71a7cf3: ### Modern CLI & Developer Experience

  - **Interactive Multi-select (`add`)**: Enhanced batch installation with interactive checklist, search filtering, and automatic dependency resolution.
  - **Component Status Inspector (`list` / `ls`)**: Real-time project scanning detecting Installed, Missing, Outdated, and Modified components.
  - **Unified Diff Engine (`diff`)**: Zero-dependency LCS diff comparing local components against the upstream registry with colorized additions and deletions.

  ### Component & UX Hardening
  - **Form Component**: Added `noValidate` boundary isolation to ensure accessible form errors without HTML5 native tooltip conflicts or adjacent form cross-talk.
  - **Input OTP**: Full keyboard navigation, auto-advance, numeric-only pattern enforcement, and backspace cursor recovery.
  - **Command & Global Search**: Recursive JSX text node extraction allowing seamless search filtering through icons, badges, and nested spans.
  - **Dropdown**: Refined chevron icon spacing and flex alignment across item variants.

  ### Design Token Sync & Export Studio
  - **Tailwind v4 `@theme` Exporter**: One-click generation of native `@theme` directives with continuous OKLCH scales.
  - **Figma Tokens Studio DTCG JSON**: Direct export and download of W3C DTCG-compliant `hudbird-tokens.json`.
  - **Themes Quick Bar**: Live interactive palette, radius, and base color switcher with 100% two-way sync across canvas mockups.
  - **Playwright E2E Test Suite**: Expanded comprehensive browser testing covering 29 end-to-end scenarios with 100% pass rate.

## 1.4.1

### Patch Changes

- **Architecture Refactoring**:
  - Deconstructed large monolithic template components (Hospitality, SaaS, Digital Agency) into fully modular, independent, and reusable `blocks/`.
  - Introduced new scalable file structure (`Hero`, `About`, `Highlights`, `Experiences`, etc.) isolated by domain.
- **Scroll & Stacking Engine**:
  - Developed and integrated `SmoothStackingWrapper` across template sections.
  - Re-engineered GPU-accelerated scroll tracking using high-tension `framer-motion` springs (`stiffness: 400, damping: 40`), eliminating native 1-frame scroll desync and jitter.
- **UI & Layout Optimizations**:
  - Perfected overlapping `liquid mask` transitions by enforcing `bg-transparent` across stacking wrappers.
  - Increased bottom padding (`pb-[35vh]`) on tall stacking sections to ensure Overview UI remains fully accessible before overlap.
  - Finalized precise `z-index` layering (`10` to `40`) for continuous stacking behaviors.

## 1.4.0

### Minor Changes

- - Added futuristic minimalist Matrix hover effects for navigation elements
  - Optimized Framer Motion animations with `whileInView` for 60fps scrolling performance
  - Improved light mode beam effect visibility with subtle organic colors
  - Added continuous Cyber Light glowing borders for seamless section transitions

## 1.3.0

### Minor Changes

- Refactored component import architecture to CLI-based local ownership. Removed barrel files to solve circular dependencies and improve tree-shaking.

## 1.2.5

## 1.2.4

## 1.2.3

## 1.2.2

### Patch Changes

- fix: resolve partial publish issue

## 1.2.1

## 0.2.0

### Minor Changes

- Major dependency upgrades and new FAQ marketing components.

  - Upgraded React to 19.3, TypeScript to 6.x, Vite to 8, Motion/Framer Motion to 13
  - Added three new FAQ variants: `Faq`, `FaqCategorized`, `FaqWithIllustration`
  - `FaqWithIllustration`: includes a procedurally animated SVG illustration using Framer Motion looping animations (no external assets)
  - Added Testimonials section with Marquee, Flat, and SideBySide variants
  - ESLint fixes: replaced all `@ts-ignore` with `@ts-expect-error` per new typescript-eslint strict rules
  - Fixed missing `Github` icon export in lucide-react by using an inline SVG component
  - Replaced `__dirname` with `import.meta.dirname` in vite.config.ts for Vite 8 native config loader compatibility
  - Added `title` prop to `ApiTable` component for improved developer experience
  - Updated all marketing documentation pages with full API tables
