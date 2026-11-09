# Mobile-First Section Contract

Build the base layout for 375px before adding larger-screen arrangements.

## Base behavior

- Use a single readable column by default; introduce columns at the smallest width where content remains comfortable.
- Keep source order meaningful: heading, explanation, actions, then supporting media unless the task requires a different reading priority.
- Use Hudbird `Section` spacing and `Container` gutters rather than page-specific horizontal padding.
- Use `Grid` and responsive Grid options rather than raw layout grids.
- Actions stack or wrap without clipping. Interactive targets remain at least 44px on touch layouts.
- Long headings wrap naturally; avoid fixed heights, forced line breaks, and absolute positioning for primary content.
- Media uses an aspect ratio, bounded width, and `object-fit`; it must not create document-level horizontal overflow.
- Tables or wide comparisons scroll inside a labeled focusable region rather than widening the document.

## Larger screens

- Add columns, order changes, or wider media progressively at `sm`, `md`, or `lg` only when supported by the content.
- Cap prose around a readable measure and avoid stretching descriptions across the full canvas.
- Preserve alignment relationships from the reference without compressing the center column or CTA group.

## Responsive states

- Hover is enhancement, never the only way to reveal essential content.
- Menus, tabs, accordions, video controls, and carousels remain operable by keyboard and touch.
- Reduced motion keeps content visible and state changes understandable.
- Verify no clipping or horizontal document overflow at 375px and one representative desktop width during iteration.
