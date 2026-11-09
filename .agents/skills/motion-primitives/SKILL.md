---
name: motion-primitives
description: Maintain Hudbird's reusable reveal, stagger, ticker, slideshow, and scroll-progress components.
---

# Hudbird motion primitives

Source lives in `packages/core/src/components/Motion`. Documentation lives at `/#/motion`.

- Keep motion calm and functional. Prefer opacity and transform. Avoid layout-property animation.
- Every primitive must honor reduced motion. Tickers pause on hover and focus; slideshows retain manual controls and announced position.
- Marketing sections consume these primitives rather than defining a separate reveal or ticker implementation.
- Preserve ref forwarding and standard HTML attributes on primitive roots.
- Verify keyboard interaction, reduced motion, initial content visibility without IntersectionObserver, and rendering inside iframe previews.
- Update core exports, CLI registry dependencies, docs examples, and focused behavior tests together.
