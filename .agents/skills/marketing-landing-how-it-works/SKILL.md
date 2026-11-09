---
name: marketing-landing-how-it-works
description: Maintain the LandingHowItWorks SaaS landing section and its horizontal / vertical layouts.
---

# LandingHowItWorks blueprint

Read `../hudbird-landing-sections/SKILL.md` for the approved workflow and collection boundaries.

- Source: `packages/marketing/src/components/LandingHowItWorks/index.tsx`.
- Variants: horizontal / vertical. Content comes from the corresponding `LandingSectionContent` entry; layout changes must retain content and brand.
- Macro layout uses `LandingFrame` (core Section + Container) and core Grid. Controls, typography, and surfaces consume Hudbird core; semantic content/media wrappers are allowed.
- Use semantic brand tokens and shared spacing. Follow website mode unless explicitly overridden. Decorative glass and motion stay opt-in.
- Use an ordered sequence with shared or per-step artwork. Preserve meaningful step order across responsive layouts.
- Keep catalog metadata, source registry dependencies, section preview, behavior tests, and the builder in sync. Check two brands, both themes, and 375/768/1024/1440 px using `scripts/verify-landing-sections.mjs`.
