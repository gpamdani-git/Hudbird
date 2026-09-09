---
name: marketing-hero
description: Implementation plan and blueprint for building a light-mode Marketing Hero component matching Tailwind UI exactly.
---

# Redesign Hero Component

We have completely redesigned the `Hero` component and its documentation example to match the clean, light-mode aesthetic from Tailwind UI, using compound components and aesthetic CSS blobs.

## Proposed Changes

---

### 1. `apps/docs/tailwind.config.js`
- **CRITICAL**: Added `'../../packages/marketing/src/**/*.{js,ts,jsx,tsx}'` to the `content` array. This ensures that Tailwind compiles all the marketing-specific utility classes (like `blur-3xl`, `text-7xl`, `py-32`) used inside `packages/marketing`.

### 2. `packages/marketing/src/components/Hero/Hero.tsx`
- **`<Hero>`**:
  - Removed the static background image and white glassmorphic overlay to match the pure white background of the reference.
  - Restored the top and bottom aesthetic gradient blobs (`bg-linear-to-tr from-[#ff80b5] to-[#9089fc]`) using `clip-path` polygons.
- **`<HeroHeader>`**:
  - Ensured navigation text and links use `text-zinc-900` and `hover:text-zinc-600` for the light theme.
- **`<HeroTitle>` & `<HeroDescription>`**:
  - Maintained `text-zinc-900` for the title and `text-zinc-600` for the description.
  - Removed `max-w-xl mx-auto` from the description to allow it to span naturally within the `max-w-2xl` body container.
- **`<HeroBadge>`**:
  - Updated styles for a clean light theme pill (`text-zinc-600 ring-zinc-900/10 hover:ring-zinc-900/20`), without any background blur.

### 3. `apps/docs/src/pages/marketing/HeroDoc.tsx`
- **Docs Layout**:
  - Added breadcrumbs (`UI Blocks > Marketing > Page Sections`) and a descriptive `h1` before the `MarketingPreview` component.
  - Reverted the placeholder Indonesian text back to the professional English marketing copy ("Data to enrich your online business").
- **Marketing Preview**:
  - Updated `MarketingPreview.tsx` to handle light/dark mode for the code block gracefully.
  - Added a framework dropdown (`React`, `HTML`, `Vue`) and fixed the clipboard copy function to work across all tabs.

### 4. `apps/docs/src/App.tsx`
- Kept the standard Left Sidebar layout for `/marketing/*` routes but hid the Right Table of Contents (`aside`) to allow the preview content area to expand to `max-w-5xl`.

## Verification Plan
1. Restart the Vite server (`pnpm dev`).
2. Navigate to `/marketing/hero` in the docs app.
3. Verify that the hero is full width within the preview container, uses the clean white background with aesthetic blobs, and renders all typography correctly.
4. Verify the sidebars and breadcrumbs appear as intended.
