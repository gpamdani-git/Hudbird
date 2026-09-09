---
name: marketing-bento-grid
description: Architectural blueprint and implementation rules for the BentoGrid marketing section. Covers Framer Motion usage, structural composition, and image hover styling.
---

# Marketing Bento Grid Blueprint

This skill serves as the permanent blueprint for creating and modifying the `BentoGrid` section within `packages/marketing`.

## Architecture
The Bento Grid is built strictly via **Compound Components**:
- **`BentoGrid`**: The outer `<section>`. Uses pure CSS Grid (`grid-cols-1 md:grid-cols-3 xl:grid-cols-4`, `auto-rows-[...rem]`).
- **`BentoCard`**: The individual interactive `<article>`. It wraps `@hudbird/ui`'s `Card` inside a `motion.div`.
- **`BentoCardBackground`**: A `z-0` absolute layer for backgrounds (image or gradients).
- **`BentoCardContent`**: A `z-10` relative container, inside which the standard `BentoCardHeader`, `BentoCardBody`, and `BentoCardFooter` are rendered.

## Interaction Design (Motion)
- **Hover Scale**: `BentoCard` scales down slightly on hover (`scale: 0.98`) using a snappy spring `transition={{ type: "spring", stiffness: 400, damping: 30 }}` to feel physical and responsive, avoiding cheap linear easing.
- **Image Zoom**: Images inside `BentoCardBackground` scale up (`scale-105`) over a slow duration (`duration-500 ease-out`) to create a parallax-like reveal.

## Implementation Rules
1. **Col/Row Span via Utility Classes**: Do NOT use custom props for spans. Developers must pass `className="md:col-span-2 row-span-2"` to `BentoCard` for maximum responsive flexibility.
2. **Glassmorphism Footer**: To achieve the "Artfolio" look, pass `isBlurred={true}` to `BentoCardFooter`.
3. **No Redundant Dependencies**: `BentoCard` imports the `Card` from `packages/core` directly. Do not duplicate logic.
