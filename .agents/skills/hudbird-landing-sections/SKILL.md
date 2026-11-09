---
name: hudbird-landing-sections
description: Assemble and customize a branded SaaS landing page with Hudbird's 12 section types, 27 layouts, and typed React/JSON exports.
---

# Hudbird SaaS landing sections

Use this skill when building a promotional SaaS page, choosing section variants, or continuing a page exported from the Hudbird builder. Guide setup for users who may not know React.

## Start with the brief

Collect the product, audience, goal, logo, primary color, reference, and approved content. Translate references into spacing, typography, and hierarchy choices rather than copying their identity. Offer two compositions before building a new page and wait for a selection. Never invent customer endorsements or business metrics.

## Install and compose

The collection is source-distributed. In a React/Vite/Tailwind v4 project, install `LandingPage` with the locally packed Hudbird CLI until the updated registry is published. After release the command is `npx hudbird-ui add LandingPage`. Respect components.json aliases; the default location is `src/components/hudbird-ui`.

The installer adds the shared schema, core dependency closure, brand CSS/theme registration, demo media, and this skill. Each section can also be installed independently by its component name, such as `LandingBenefits` or `LandingPricing`. HeroSection and LandingShared provide brand scope and layout helpers.

Import `SaasLandingPage`, `formaLandingContent`, and `createLandingPageConfig` from the installed LandingPage folder. A LandingPageConfig stores version 1, the brand, the theme mode, and one selection for each of 12 section types. A selection contains its type, variant, and enabled flag. Keep navbar first and footer last; other sections can move. Content stays separate in LandingSectionContent.

The documentation catalog is `/#/marketing/landing-sections`, the builder is `/#/marketing/landing-builder`, and full previews use `/#/templates/saas-landing`. The builder offers variant selection, visibility, up/down ordering, brand controls, local saving, reset, and React/JSON downloads. It is not a content editor or a hosted site builder.

## Keep the design coherent

All layouts use core Section, Container, and Grid. All controls and surfaces use Hudbird primitives. Use the existing typography, neutral surfaces, shared gutter, and section cadence. Decorative glass and expressive motion are opt-in, and section variants change composition rather than just colors.

Follow website mode by default. Explicit light/dark previews are supported, and the mode stays live in exported pages. Google Fonts use BrandProfile.googleFont plus a fallback fontFamily. HeroImage.darkSrc supplies optional dark artwork; preserve customer images when they have no dark asset.

The 27 primary layouts cover Navbar 2, Hero 3, Logo Cloud 3, Benefits 2, Feature Showcase 3, How It Works 2, Integrations 2, Testimonials 2, Pricing 2, FAQ 2, CTA 2, and Footer 2. Existing slideshow/video heroes remain available outside this count.

## Verify and hand over

Forma, logo marks, quotations, prices, and integration concepts are clearly labeled examples. Replace them before publishing. Integrations do not connect to live services, and pricing does not perform checkout. Keep navigation targets consistent with visible sections.

Review 375, 768, 1024, and 1440 px in both modes and two brands. Test menus, Escape/focus restoration, tabs, accordion previews, FAQ, ordering, hiding, reset, persistence, downloads, and export equivalence. Ensure no clipped headings or horizontal document overflow. Pricing tables may scroll inside a clearly labeled region on mobile.

Run relevant unit/architecture tests, package type checks/builds, and a packed CLI install into a separate Vite project. Test the actual exported React page. Do not imply the package has been published or a backend is connected. Record owner feedback and remaining limitations.
