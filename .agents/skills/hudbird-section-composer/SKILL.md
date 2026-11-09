---
name: hudbird-section-composer
description: Compose or refine one reusable Hudbird marketing block or section—such as Hero, CTA, FAQ, Features, Pricing, Logo Cloud, or Testimonials—from `@hudbird/ui` core components. Use when translating a supplied UI image or visual reference into faithful, mobile-first React code; do not use for full-page assembly or new core primitives.
---

# Hudbird Section Composer

Translate one clear content job and one visual direction into a reusable Hudbird block or section. Preserve the reference's design logic without copying unrelated branding or adding generic AI decoration.

## Cheap context

1. Read `docs/PROJECT_CONTEXT.md` and only the Marketing/Core rows of `docs/ARCHITECTURE_MAP.md`.
2. Inspect the nearest existing section of the same type, its shared layout helper, public export, and focused tests.
3. Inspect only the core component APIs required by the proposed composition.
4. Do not load the full catalog, `DESIGN.md`, PRD, BRD, ERD, Graphify, or every section variant.

## Route by task

- Always read [references/section-contract.md](references/section-contract.md).
- When an image, screenshot, mockup, or visual URL is supplied, also read [references/image-reference.md](references/image-reference.md).
- For every implementation, read [references/mobile-first.md](references/mobile-first.md).

Do not load image guidance when no visual reference exists.

## Scope

A normal iteration delivers one block or section under `packages/marketing`, its local/public export, and focused behavior or architecture tests. One to three variants are acceptable when the user asks; variants must change layout or content emphasis, not merely color.

Documentation, registry CLI, full landing pages, screenshots, broad browser matrices, schema expansion, and migration of old sections are separate slices unless explicitly requested. New core behavior belongs in `$hudbird-core-component`, not inside a marketing section.

## Hudbird composition rules

- Macro layout uses Hudbird `Section`, `Container`, and `Grid` or the existing shared Hudbird layout frame.
- Controls, typography, surfaces, media wrappers, and disclosure patterns come from `@hudbird/ui` where available.
- Native semantic content elements are allowed when they carry real document meaning; raw ad-hoc layout and raw interactive controls are not.
- Content, brand, media, and layout configuration remain separable. Do not bury editable copy inside layout logic.
- Use semantic theme tokens and verify light/dark behavior. Hardcoded colors require a deliberate reference-driven reason and a paired accessible mode.
- Motion is restrained and optional. Use Hudbird Motion primitives, transform/opacity only, and reduced-motion support.

## Anti-slop gate

- Reproduce hierarchy, rhythm, proportion, alignment, and interaction—not superficial glow or decoration.
- Avoid repeated equal cards, nested cards, excessive pills, fake dashboards, rainbow icon tiles, generic gradient orbs, and ornamental glass.
- Do not invent testimonials, customer logos, statistics, pricing claims, or product capabilities. Use clearly labeled sample content when necessary.
- Every wrapper, variant, badge, icon, and animation must serve comprehension or interaction.
- Prefer one strong focal relationship over many small competing elements.

## Verification

Run `pnpm --filter @hudbird/marketing lint` and the focused test file. During a normal iteration, inspect one representative mobile and desktop width only when layout behavior requires visual confirmation. Full breakpoint/theme matrices belong to finalization.

Report the section produced, reference decisions retained, deliberate adaptations, files changed, and focused verification. Stop after the requested section works.
