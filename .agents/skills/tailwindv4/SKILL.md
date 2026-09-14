---
name: tailwindv4
description: This skill should be used when the user asks about "tailwind v4", "tailwindcss 4", "tailwind css v4", "@theme", "css-first config", "tailwind css variables", "oklch colors", "tailwind upgrade", "migrate to tailwind 4", or mentions Tailwind CSS v4 configuration, new syntax, or migration from v3.
version: 0.1.9
---

# Tailwind CSS v4
Configure and use Tailwind CSS v4 with its CSS-first configuration and new features.

## Key Changes in v4

### CSS-First Configuration
No more `tailwind.config.js` — configure directly in CSS:
```css
@import "tailwindcss";

@theme {
  --font-display: "Satoshi", sans-serif;
  --color-brand: oklch(0.7 0.15 200);
  --breakpoint-3xl: 1920px;
}
```

### New Import Syntax
```css
/* v3 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* v4 */
@import "tailwindcss";
```

### CSS Variable Syntax Change
```html
<!-- v3: Square brackets -->
<div class="bg-[--brand-color]"></div>

<!-- v4: Parentheses -->
<div class="bg-(--brand-color)"></div>
```

### theme() Function Replacement
```css
/* v3: */
.my-class { background-color: theme(colors.red.500); }

/* v4: Use CSS variables */
.my-class { background-color: var(--color-red-500); }
```

## Installation

### Vite Configuration
```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite"
export default defineConfig({ plugins: [tailwindcss()] })
```

## @theme Block
```css
@theme {
  /* OKLCH colors (recommended) */
  --color-brand-50:  oklch(0.98 0.02 200);
  --color-brand-500: oklch(0.7  0.15 200);
  --color-brand-900: oklch(0.3  0.1  200);

  /* Typography */
  --font-sans:    "Inter", system-ui, sans-serif;
  --font-display: "Satoshi", sans-serif;

  /* Spacing / Breakpoints */
  --spacing-128:    32rem;
  --breakpoint-3xl: 1920px;
}
```

## IMPORTANT: @theme is Frozen at Build Time

> **Critical:** `@theme` tokens are compiled ONCE at build/startup. Overriding a raw token like `--primary` via JavaScript will NOT update derived `--color-primary` utilities at runtime.
>
> **Correct runtime theming:** Directly set `--color-*` CSS variables on `document.documentElement.style`:
> ```js
> document.documentElement.style.setProperty('--color-emerald-600', 'oklch(0.55 0.2 150)');
> ```
> This makes ALL `bg-emerald-600`, `text-emerald-600`, `border-emerald-600` utilities update instantly.

## OKLCH Color Format
```css
/* Format: oklch(Lightness Chroma Hue) */
/* L: 0-1   C: 0-0.4   H: 0-360 */

--color-blue-50:  oklch(0.97 0.02 240);
--color-blue-500: oklch(0.60 0.18 240);
--color-blue-900: oklch(0.25 0.08 240);
```

## Runtime Theming Pattern (BlankUI Theme Editor)
The correct approach when components must respond to runtime color changes:

| Semantic Role | Tailwind Scale | Override Variable   |
|---------------|---------------|---------------------|
| `success`     | `emerald`     | `--color-emerald-*` |
| `warning`     | `amber`       | `--color-amber-*`   |
| `danger`      | `rose`        | `--color-rose-*`    |
| `info`        | `sky`         | `--color-sky-*`     |
| `primary`     | custom        | `--color-primary-*` |

**Components use standard Tailwind classes** (`bg-emerald-600`, `text-emerald-700`, etc.).
**Theme Editor overrides** `--color-emerald-*` CSS variables directly at runtime.

```ts
// ThemeEditorContext pattern:
const injectTailwindScale = (scaleName: string, oklchStr: string) => {
  const scale = generateOklchScale(c, h);
  for (const [k, v] of Object.entries(scale)) {
    root.style.setProperty(`--color-${scaleName}-${k}`, `oklch(${v})`);
  }
};

injectTailwindScale("emerald", successColor);  // success = emerald
injectTailwindScale("amber", warningColor);    // warning = amber
injectTailwindScale("rose", destructiveColor); // danger  = rose
injectTailwindScale("sky", infoColor);         // info    = sky
```

## Removed / Changed Features

| v3                                   | v4                      |
|--------------------------------------|-------------------------|
| `tailwind.config.js`                 | `@theme` in CSS         |
| `bg-[--var]`                         | `bg-(--var)`            |
| `theme(colors.x)`                    | `var(--color-x)`        |
| `@tailwind base/components/utilities`| `@import "tailwindcss"` |
| `autoprefixer` required              | Built-in                |
| `purge/content` config               | Auto-detected           |

## Container Queries (Native in v4)
```html
<div class="@container">
  <div class="@lg:flex @lg:gap-4">Content</div>
</div>
```

## Resources
- Tailwind v4 docs: https://tailwindcss.com/docs
- Upgrade guide: https://tailwindcss.com/docs/upgrade-guide
- OKLCH color picker: https://oklch.com
- Color palette reference: https://tailwindcss.com/docs/colors
