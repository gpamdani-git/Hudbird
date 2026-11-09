---
name: marketing-landing-pricing
description: Maintain the LandingPricing SaaS landing section and its cards / comparison layouts.
---

# LandingPricing blueprint

Read `../hudbird-landing-sections/SKILL.md` for the approved workflow and collection boundaries.

- Source: `packages/marketing/src/components/LandingPricing/index.tsx`.
- Variants: cards / comparison. Content comes from the corresponding `LandingSectionContent` entry; layout changes must retain content and brand.
- Macro layout uses `LandingFrame` (core Section + Container) and core Grid. Controls, typography, and surfaces consume Hudbird core; semantic content/media wrappers are allowed.
- Use semantic brand tokens and shared spacing. Follow website mode unless explicitly overridden. Decorative glass and motion stay opt-in.
- Use core Card/Button and Table. Comparison is an internally scrollable, focusable, labeled region on mobile. Prices are examples without checkout.
- Keep catalog metadata, source registry dependencies, section preview, behavior tests, and the builder in sync. Check two brands, both themes, and 375/768/1024/1440 px using `scripts/verify-landing-sections.mjs`.
