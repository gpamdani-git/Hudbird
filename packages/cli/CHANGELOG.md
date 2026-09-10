# hudbird-ui

## 1.2.4

### Patch Changes

- **Smart CLI v2**: Introduced automatic resolution of nested components and on-the-fly installation of required NPM dependencies. Overhauled the Getting Started documentation with a robust new setup guide, implemented auto-generation of index exports, and resolved critical bugs.

## 1.2.3

### Patch Changes

- 363f555: ### 🚀 Smart CLI Upgrades & Enhanced Documentation

  - **Intelligent Dependency Resolution:** The CLI now automatically detects and installs required sub-components and missing NPM packages on the fly for a completely frictionless experience.
  - **Automated Exports:** Automatically generates and updates `index.ts` when adding new components, keeping your imports perfectly clean and organized.
  - **Precision Docs Formatting:** Component installation commands are now strictly formatted in PascalCase across the documentation, eliminating typos and ensuring a perfectly smooth installation flow.

## 1.2.2

### Patch Changes

- fix: resolve partial publish issue

## 1.2.1

### Patch Changes

- - **Navigation & Layout Fixes**: Resolved duplicate hamburger menu issues across all documentation pages and unified the mobile layout.
  - **Global Search Optimization**: Fixed horizontal scroll overflow bugs in the search modal for small screens by enforcing flexible text wrapping.
  - **Nested Mobile Menus**: Upgraded the mobile header dropdown to support nested sub-menus, specifically bringing full GitHub tracking links to mobile users.
  - **Automated Changelog System**: Implemented a zero-runtime build script (`sync-changelog`) that automatically parses Changesets to keep the Docs version badges and Changelog page perfectly in sync.
  - **Monorepo Publish Configs**: Enforced `fixed` versioning across all packages and added `publishConfig` to resolve NPM unscoped access errors.

## 1.2.0

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
