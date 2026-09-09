---
name: blankui-marketing-engineering
description: Specific rules for building and documenting components within the packages/marketing library. Covers core component composition, semantic HTML, and skill-tracking per marketing block.
---

# BlankUI Marketing Engineering

This skill defines the specific rules for developing the "Marketing Sections" (`packages/marketing`) package. While global BlankUI skills apply, building marketing components has unique constraints.

## 1. Do NOT Modify Core Components
The `packages/core` library is the single source of truth for primitives. 
- You must **NEVER** modify a core component (e.g., `packages/core/src/components/Button/Button.tsx`) just to accommodate a specific marketing design.
- **Override via `className` (Composition)**: All core components use `tailwind-merge`. If a marketing block requires specific styling (e.g., a larger padding or unique gradient), import the core component and pass the overriding Tailwind classes via the `className` prop.

## 2. Semantic HTML & SEO
Marketing sections are public-facing and highly indexed by search engines.
- You must strictly utilize semantic tags like `<header>`, `<section>`, `<article>`, `<aside>`, and `<nav>`.
- Avoid using `<div>` when a semantic tag is more appropriate.

## 3. Marketing Documentation Structure
Whenever creating a new marketing component documentation page (e.g., `HeroDoc.tsx` in `apps/docs/src/pages/marketing/`), you must provide the layout structured as follows:
- **Breadcrumbs**: ALWAYS use a sticky breadcrumb header at the top of the page. Example:
  ```tsx
  <div className="sticky top-14 z-30 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md py-4 px-4 sm:px-6 lg:px-8 transition-all border-b border-zinc-200/50 dark:border-zinc-800/50 mb-8">
    <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
      {onOpenSidebar && (
        <button onClick={onOpenSidebar} className="p-1.5 -ml-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors" aria-label="Open Navigation">
          <Menu size={18} />
        </button>
      )}
      <span>Marketing section</span>
      <ChevronRight size={14} className="text-zinc-400" />
      <span className="text-zinc-900 dark:text-zinc-100">Bento Grid</span>
    </div>
  </div>
  ```
- **Dark & Light Mode Support**: EVERY marketing section and component MUST fully support both dark and light mode. Use Tailwind's `dark:` variant for all colors, backgrounds, and typography. Test both modes extensively in the preview.
- **Title & Precise Description**.
- **Component Preview**: Minimalist bordered canvas with live interactive rendering using the `<MarketingPreview>` wrapper.
- **Code Export**: You MUST always provide the full export code for React, HTML, and Vue using the `code`, `codeHtml`, and `codeVue` props on `<MarketingPreview>`.
- **Placeholder Images**: Whenever selecting placeholder images from Unsplash, ALWAYS use the keyword/category `photography minimal` (e.g. `?auto=format&fit=crop&q=80&w=1200&keywords=photography,minimal`).
- **Component API**: ALWAYS use the `<ApiTable>` component from `apps/docs/src/components/ApiTable` with `Prop | Type | Default | Description` columns.
- **Examples & Usage**: Showcase basic and advanced implementations.

## 4. Marketing Skill Tracking Rules
Because marketing blocks (like Heros, Feature Sections, Pricing Tables) are complex, their architectural decisions must be preserved.
- For every new Marketing section built, its structural blueprint MUST be saved as a permanent skill.
- Save the blueprint as `.agents/skills/marketing-[component-name]/SKILL.md` (e.g., `.agents/skills/marketing-pricing/SKILL.md`) in the workspace root.

## 5. Polymorphic Components
Where appropriate in marketing layouts, support the `asChild` prop (using `@radix-ui/react-slot`) to allow consumers to change the underlying DOM element (e.g., rendering a Button as an `<a>` tag for SEO links) without wrapping it in extra divs.
