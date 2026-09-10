---
name: marketing-testimonials
description: Architectural blueprint and implementation rules for the Testimonials marketing section. Covers CSS Columns Masonry layout, Flat Layouts, and Marquee animations.
---

# Marketing Testimonials Blueprint

This skill serves as the permanent blueprint for creating and modifying the Testimonials section within `packages/marketing`.

## Architecture & Variants
The Testimonials section is built using `@hudbird/ui` core components and is available in three distinct layout variants:

1. **`Testimonials` (Masonry)**
   - Uses **CSS Columns** (`columns-1 md:columns-2 lg:columns-3`) for robust, gapless rendering across breakpoints.
   - Cards use `break-inside-avoid` to ensure they don't split across columns.
   - Flow order is Top-to-Bottom, Left-to-Right.

2. **`TestimonialsFlat`**
   - A standardized Grid layout (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
   - Cards are identical but placed in standard, evenly aligned rows without staggered masonry behavior.

3. **`TestimonialsMarquee`**
   - An infinite scrolling marquee for displaying testimonials dynamically.
   - Utilizes `inline <style>` with CSS `@keyframes` (marquee-left/right) for extremely performant, jank-free scrolling compared to JS-based animations.
   - Uses two rows sliding in opposite directions, duplicated for a seamless infinite loop.

## Component Makeup
- **`TestimonialCard`**: Extracted into a shared internal component. Supports regular cards (glassmorphism via `backdrop-blur-xl`) and `featured` cards (full bleed image backgrounds with gradients).
- **`Card` & `Avatar`**: Rely heavily on `@hudbird/ui`.

## Interaction Design (Motion)
- **Staggered Entrance**: (Masonry & Flat variants) The grid is wrapped in a `motion.div` using `staggerChildren: 0.1`.
- **Spring Animations**: Cards appear with snappy spring animations (`type: "spring", stiffness: 100, damping: 15`), scaling up from `y: 20` to `y: 0`.
- **Marquee Interaction**: Hovering over the Marquee container pauses the animation via `animation-play-state: paused` so users can read the cards.

## Implementation Rules
1. **Responsive Flow**: The layout MUST strictly follow: 1 column (mobile) -> 2 columns (tablet) -> 3 columns (desktop).
2. **Horizontal Scrolling Bugs**: Avoid using massive fixed-width absolute blobs (`w-[800px]`) without `max-w-[100vw]` clamping, as they cause horizontal scroll thrashing on Mobile Safari.
3. **Shared Source of Truth**: All variants should consume the same `DEFAULT_TESTIMONIALS` list and `TestimonialCard` component to prevent design drift.
