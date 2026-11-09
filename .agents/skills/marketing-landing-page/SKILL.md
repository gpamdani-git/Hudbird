---
name: marketing-landing-page
description: Maintain the SaaS landing composition, catalog, builder exports, and source installation.
---

# SaaS landing composition blueprint

Read `../hudbird-landing-sections/SKILL.md`. Source lives in `packages/marketing/src/components/LandingPage` and the documentation's LandingBuilderDoc/LandingSectionsDoc.

- Maintain 12 section types and 27 primary layouts; existing slideshow/video heroes remain additional choices. Hero reuses HeroSection.
- LandingPageConfig version 1 stores brand, auto/light/dark mode, and typed selections independently from LandingSectionContent. Validate saved configuration before rendering.
- Keep navbar first and footer last. Other sections reorder using immutable up/down changes. All sections may hide. Keep one accessible H1 and valid local navigation even with hidden targets.
- Reuse LandingShared for Section/Container cadence, core Grid, brand mode and navigation. All section controls/surfaces use Hudbird core.
- Persist configuration locally and export equivalent React/JSON. Keep the live preview viewport isolated so responsive breakpoints match its canvas.
- Exported React imports source installed with the CLI, with schema and skill dependencies included. Until publication, verify the locally packed CLI.
- Run LandingPage behavior tests, registry closure tests, verify-landing-builder.mjs and verify-landing-install.mjs. The last script must test the actual React file exported by the builder.
