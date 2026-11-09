# Hudbird SaaS Landing Collection

Implemented locally on 2026-11-04. This extends the branded startup pilot with a reusable SaaS section collection. Linear informs spacing, hierarchy, and restraint; the layouts retain Hudbird's components and brand tokens.

## Try it

- Catalog: `http://127.0.0.1:3010/#/marketing/landing-sections`
- Builder: `http://127.0.0.1:3010/#/marketing/landing-builder`
- Full page: `http://127.0.0.1:3010/#/templates/saas-landing`

The catalog has one page per section, live previews, source examples, API tables, and core-component provenance. The builder selects variants, moves sections up/down, toggles visibility, changes brand, saves locally, resets, and exports React/JSON. Navbar remains first and footer last; either can hide. Preview breakpoints follow the preview canvas through an iframe.

## Collection

| Section          | Primary layouts              |
| ---------------- | ---------------------------- |
| Navbar           | Simple, mega menu            |
| Hero             | Centered, split, interactive |
| Logo Cloud       | Row, introduction/grid       |
| Benefits         | Columns, visual/list         |
| Feature Showcase | Tabs, accordion, split rows  |
| How It Works     | Horizontal, visual steps     |
| Integrations     | Grid, workflow groups        |
| Testimonials     | Featured, collection         |
| Pricing          | Cards, comparison table      |
| FAQ              | Single list, grouped         |
| CTA              | Centered, split              |
| Footer           | Simple, columns              |

There are 27 primary layouts across 12 types. The existing slideshow and video heroes remain additional builder options outside that count. Existing Hero, HeroSection, and StartupPage APIs remain available.

All new sections consume core Section/Container/Grid through LandingFrame and use Hudbird core controls, typography, and surfaces. Semantic lists, quotation wrappers, navigation landmarks, and media elements supply content structure. A source architecture test guards against duplicate raw controls and macro layouts.

## Configuration and export

`packages/schemas/src/composition.ts` defines LandingVariantMap, LandingSectionSelection, LandingPageConfig, and LandingSectionContent. Version 1 configuration stores brand, theme preference, order, visibility, and variant selection. Shared product content remains separate. Invalid/stale stored configurations fall back to defaults with visible feedback.

Theme defaults to `auto`, following the website root dark class. Explicit light/dark overrides remain available. BrandScope applies color, font, radius, density, and optional Google Fonts. Images support optional darkSrc. User media with a single source stays unchanged.

React exports import SaasLandingPage and the editable Forma fixture from source installed by the CLI. JSON exports contain the same configuration shown in the preview. Content is edited in the source content object or through Codex; this version has no visual content editor, drag-and-drop, or ZIP export.

The CLI registry includes LandingPage and each section independently, with their core/schema/theme dependencies and `hudbird-landing-sections` skill. This registry is **not yet published to npm**. Verify using a packed local CLI; the documented `npx hudbird-ui add LandingPage` command applies after release.

## Verification recorded

- 254 tests passed across 66 files, including all primary layouts, configuration validation, ordering, variant/content preservation, hidden targets, theme behavior, interactive feature views, registry dependency closure, and core composition rules.
- Browser layout checks: 432 combinations = 27 primary variants × two brands × light/dark × 375/768/1024/1440 px. These check document overflow, heading bounds, selected variant, brand, and mode.
- Builder browser checks cover selection, movement, hiding, persistence, reset, JSON/React parity and downloads, plus tab/accordion preview updates, menu keyboard navigation and focus restoration, and focusable comparison-table scrolling.
- The actual builder-exported App.tsx was installed using a packed CLI into a temporary React/Vite/Tailwind v4 consumer, then typechecked, built, and checked at all four widths with matching section order and feature interactions.
- The standalone consumer reuses installed dependency versions through a node_modules symlink. A fresh network dependency installation and the future published npm artifact have not been tested.
- Schema and marketing package type checks/builds pass. The documentation Vite production build passes. Root/docs type checks still report existing template/API errors outside the new collection; these checks are not globally clean.
- Browser reports and screenshots are generated under `output/playwright/landing-sections` (ignored artifacts). Reproduce with the three verify-landing scripts in `scripts`; run the builder check before the install check to produce the actual export.

Automated layout checks do not replace owner visual/usability review. Owner validation through Codex without manually editing source, and feedback from prospective buyers, remain pending.

## Boundaries

Forma is a consistent demonstration product. Logo names, prices, quotes, and integrations are labeled examples. There is no live integration, checkout, authentication, or backend. Reference URLs are brief metadata, not automatically imported websites.

This work adds a focused collection; it does not certify or migrate the entire legacy catalog. Dashboard/chatbot kits, payments, publication, customer validation, and broader catalog cleanup remain separate work.
