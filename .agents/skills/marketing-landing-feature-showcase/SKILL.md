---
name: marketing-landing-feature-showcase
description: Maintain the LandingFeatureShowcase SaaS landing section and its tabs / accordion / split layouts.
---

# LandingFeatureShowcase blueprint

Read `../hudbird-landing-sections/SKILL.md` for the approved workflow and collection boundaries.

- Source: `packages/marketing/src/components/LandingFeatureShowcase/index.tsx`.
- Variants: tabs / accordion / split. Content comes from the corresponding `LandingSectionContent` entry; layout changes must retain content and brand.
- Macro layout uses `LandingFrame` (core Section + Container) and core Grid. Controls, typography, and surfaces consume Hudbird core; semantic content/media wrappers are allowed.
- Use semantic brand tokens and shared spacing. Follow website mode unless explicitly overridden. Decorative glass and motion stay opt-in.
- Use core Tabs/TabPanel or Accordion for selection. Each selected feature changes both explanation and artwork. Preserve keyboard and selected/expanded semantics.
- Keep catalog metadata, source registry dependencies, section preview, behavior tests, and the builder in sync. Check two brands, both themes, and 375/768/1024/1440 px using `scripts/verify-landing-sections.mjs`.
