---
name: blankui-tailwind-engineering
description: Rules for TailwindCSS usage, utility class optimization, dynamic component styling, and CSS variables in the BlankUI project.
---

# BlankUI Tailwind Engineering

This skill defines the technical approach to writing, structuring, and optimizing TailwindCSS classes within the BlankUI repository. Because the project utilizes Tailwind v4 (CSS-native configuration via `@tailwindcss/vite`), standard configuration file patterns do not apply.

## 1. Class Variance Authority (CVA)
**Mandatory Pattern:** Do not use long inline template literals with ternary operators for component variants. Use `class-variance-authority` (CVA).
- Group variants logically (e.g., `variant`, `size`, `align`).
- Provide sensible `defaultVariants`.
- **Example:**
  ```tsx
  const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
    {
      variants: {
        variant: {
          default: "bg-indigo-600 text-white hover:bg-indigo-700",
          outline: "border border-zinc-200 bg-transparent hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800",
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 rounded-md px-3",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  );
  ```

## 2. Dynamic Class Merging (The `cn` Utility)
**Mandatory Pattern:** Always merge custom `className` props with your base component styles using the `cn` utility (a wrapper around `clsx` and `tailwind-merge`).
- Import path: `import { cn } from "../../utils/cn";` (Adjust path relative to your package).
- This ensures that consumer overrides (e.g., passing `className="bg-red-500"`) properly override the default CVA classes without conflict.

## 3. Tailwind v4 and CSS-Native Variables
BlankUI relies on Tailwind v4. Do not attempt to modify a `tailwind.config.js` file.
- Custom theme values, fonts, and base variables are injected via pure CSS utilizing the `@theme` directive (e.g., in `packages/theme/src/index.css`).
- Leverage semantic CSS variables for consistency if needed, but prefer standard utility classes.

## 4. Responsive Design (Mobile First)
- All components must be built mobile-first.
- Use `sm:`, `md:`, `lg:`, and `xl:` breakpoints.
- Avoid forcing explicit `h-screen` classes that break mobile Safari due to address bars; prefer `min-h-[100dvh]` or structural flex solutions (`flex-1`, `flex-col`) that naturally fill parent containers.

## Workflow Rules
1. Never hardcode colors outside of the Tailwind utility class system (e.g., avoid `style={{ color: '#ff0000' }}`).
2. Always wrap your component's root element className with `cn(variantFunction({ ... }), className)`.
