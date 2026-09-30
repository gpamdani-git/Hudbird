# docs

## 0.1.9

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
- Updated dependencies
  - @hudbird/ui@1.4.1
  - @hudbird/marketing@1.4.1

## 0.1.8

### Patch Changes

- Updated dependencies
  - @hudbird/marketing@1.4.0
  - @hudbird/ui@1.4.0

## 0.1.7

### Patch Changes

- Updated dependencies
  - @hudbird/ui@1.3.0
  - @hudbird/marketing@1.3.0

## 0.1.6

### Patch Changes

- 66f18cb: Refactor the root landing page by extracting the monolithic AiStartupTemplate into modular components within app/landingpage. Decoupled the landing page from the docs layout, restored missing UI/marketing helper components, and resolved all runtime ReferenceErrors to ensure a stable production build.
- Updated dependencies [66f18cb]
  - @hudbird/marketing@1.2.5
  - @hudbird/ui@1.2.5

## 0.1.5

### Patch Changes

- **Smart CLI v2**: Introduced automatic resolution of nested components and on-the-fly installation of required NPM dependencies. Overhauled the Getting Started documentation with a robust new setup guide, implemented auto-generation of index exports, and resolved critical bugs.
  - @hudbird/ui@1.2.4
  - @hudbird/marketing@1.2.4

## 0.1.4

### Patch Changes

- 363f555: ### 🚀 Smart CLI Upgrades & Enhanced Documentation

  - **Intelligent Dependency Resolution:** The CLI now automatically detects and installs required sub-components and missing NPM packages on the fly for a completely frictionless experience.
  - **Automated Exports:** Automatically generates and updates `index.ts` when adding new components, keeping your imports perfectly clean and organized.
  - **Precision Docs Formatting:** Component installation commands are now strictly formatted in PascalCase across the documentation, eliminating typos and ensuring a perfectly smooth installation flow.
  - @hudbird/ui@1.2.3
  - @hudbird/marketing@1.2.3

## 0.1.3

### Patch Changes

- Updated dependencies
  - @hudbird/ui@1.2.2
  - @hudbird/marketing@1.2.2

## 0.1.2

### Patch Changes

- @hudbird/ui@1.2.1
- @hudbird/marketing@1.2.1

## 0.1.1

### Patch Changes

- Updated dependencies
  - @hudbird/ui@0.2.0
  - @hudbird/marketing@0.2.0
