---
name: blankui-ui-ux-design
description: Enforces the UI/UX design language for the BlankUI project. Focuses on minimal aesthetics, dark mode support, token usage, and accessibility.
---

# BlankUI UI/UX Design Guidelines

This skill defines the visual identity and structural standards of BlankUI. Whenever you are tasked with creating or modifying a UI component, you **MUST** adhere to the following principles.

## 1. Visual Aesthetics & "Glassmorphism"
BlankUI components should look premium, lightweight, and modern.
- **Glassmorphism**: Use translucent backgrounds (`bg-white/80`, `bg-zinc-950/80`) combined with `backdrop-blur-md` or `backdrop-blur-xl` for sticky headers, dropdowns, and overlays.
- **Clean and Featherweight**: Avoid heavy drop shadows unless necessary for depth (e.g., modals). Use subtle borders (`border-zinc-200/50`, `dark:border-zinc-800/50`) to separate content cleanly.
- **Corner Radius**: Use generous rounding (`rounded-xl`, `rounded-2xl`, or `rounded-full`) to match the soft aesthetic of the brand.

## 2. Mandatory Dark Mode Support
Every single component must support both Light and Dark modes.
- BlankUI uses Tailwind's CSS-native dark mode selector.
- You must always pair a light class with its corresponding dark class (e.g., `bg-white dark:bg-zinc-950`, `text-zinc-900 dark:text-zinc-50`).
- **Never use hardcoded hex colors**. Rely exclusively on the semantic palette defined in Tailwind.

## 3. Theme Tokens & Color Palette
We strictly adhere to the `@hudbird/theme` definitions.
- **Neutral/Base**: Use the `zinc` palette for text, borders, and backgrounds (`zinc-50` through `zinc-950`).
- **Primary Accents**: Use `indigo` (e.g., `indigo-600` for light mode, `indigo-500` for dark mode) as the primary brand color for active states, primary buttons, and focus rings.
- **Success/Secondary**: Use `emerald` (e.g., `emerald-500`) for success states and badges.
- **Destructive**: Use `rose` (e.g., `rose-600`) for destructive actions.

## 4. Typography & Icons
- **Fonts**: Rely on clean, modern sans-serif fonts. Text should be legible and well-spaced. Use `tracking-tight` for headings (`h1`, `h2`).
- **Icons**: Use the `lucide-react` library exclusively for icons. Do not use SVGs manually unless strictly necessary (e.g., complex brand logos). Keep icon sizes consistent (usually `size={16}` or `size={20}` depending on context).

## 5. Accessibility (A11y)
- **Focus States**: All interactive elements (buttons, inputs, links) must have clear focus states (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`).
- **ARIA Attributes**: Ensure custom compound components (like Dropdowns or Dialogs) utilize proper ARIA roles (`role="menu"`, `aria-expanded`, `aria-label`).

## Workflow Rules
1. Before styling a new component, check if a similar component already exists to reuse its layout tokens.
2. If the user asks for a "clean" or "modern" look, default to the Glassmorphism patterns outlined above.
