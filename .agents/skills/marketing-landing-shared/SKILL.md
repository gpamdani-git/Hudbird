---
name: marketing-landing-shared
description: Maintain shared layout, navigation, theme, and action rules across SaaS landing sections.
---

# Shared landing foundation

- Source: `packages/marketing/src/components/LandingShared`. Read `../hudbird-landing-sections/SKILL.md`.
- LandingFrame wraps core Section and Container; sections use core Grid instead of raw macro layout.
- Re-export BrandScope from HeroSection so independently installed sections receive brand CSS/theme registration.
- useLandingMode follows the root website dark class and supplies a stable SSR light snapshot.
- LandingNavigationContext filters hidden targets and resolves actions. Standalone previews resolve links within their scope.
- Keep CSS limited to shared semantic treatments. Do not duplicate core controls or hardcode brand colors.
- Verify independent source dependency closure, theme boundaries, and responsive behavior before changing this shared layer.
