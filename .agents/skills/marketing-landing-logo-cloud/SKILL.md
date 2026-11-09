---
name: marketing-landing-logo-cloud
description: Maintain the LandingLogoCloud SaaS landing section and its row / intro-grid layouts.
---

# LandingLogoCloud blueprint

Read `../hudbird-landing-sections/SKILL.md` for the approved workflow and collection boundaries.

- Source: `packages/marketing/src/components/LandingLogoCloud/index.tsx`.
- Variants: row / intro-grid. Content comes from the corresponding `LandingSectionContent` entry; layout changes must retain content and brand.
- Macro layout uses `LandingFrame` (core Section + Container) and core Grid. Controls, typography, and surfaces consume Hudbird core; semantic content/media wrappers are allowed.
- Use semantic brand tokens and shared spacing. Follow website mode unless explicitly overridden. Decorative glass and motion stay opt-in.
- Treat logo names as labeled demo placeholders until real logos are provided. Preserve each logo's accessible name.
- Keep catalog metadata, source registry dependencies, section preview, behavior tests, and the builder in sync. Check two brands, both themes, and 375/768/1024/1440 px using `scripts/verify-landing-sections.mjs`.
