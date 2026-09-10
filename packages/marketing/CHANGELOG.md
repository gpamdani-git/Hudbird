# @hudbird/marketing

## 1.2.4

### Patch Changes

- @hudbird/ui@1.2.4
- @hudbird/theme@1.2.4

## 1.2.3

### Patch Changes

- @hudbird/ui@1.2.3
- @hudbird/theme@1.2.3

## 1.2.2

### Patch Changes

- fix: resolve partial publish issue
- Updated dependencies
  - @hudbird/ui@1.2.2
  - @hudbird/theme@1.2.2

## 1.2.1

### Patch Changes

- @hudbird/ui@1.2.1
- @hudbird/theme@1.2.1

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

### Patch Changes

- Updated dependencies
  - @hudbird/ui@0.2.0
  - @hudbird/theme@0.2.0
