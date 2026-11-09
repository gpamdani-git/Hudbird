# Hudbird Project Context

Read this file before the BRD, PRD, ERD, `DESIGN.md`, or Graphify output. Open those sources only when a task needs details not recorded here.

## Product

Hudbird is a commercial React 19 and Tailwind CSS v4 UI ecosystem that gives developers and AI a consistent system for building websites and web applications. Its product hierarchy is:

1. Core: accessible controls and layout primitives.
2. Block: grouped product content and interactions.
3. Section: replaceable page units.
4. Template: ordered page compositions.

Primary users are frontend developers, product builders, agencies, and people using AI to build branded sites with little manual coding. The central promise is source ownership: users install editable source through the Hudbird CLI, apply brand tokens, and touch up the result.

## Current direction

- First validated use case: promotional SaaS and product-launch websites.
- Demo brand/product: Hudbird, using the workspace/product example established by the pilot.
- Visual reference: Linear for restrained hierarchy, spacing, typography, and product proof; do not copy its identity or structure.
- Hero pilot: centered image, split image, slideshow, video, and interactive product demo.
- SaaS collection: 12 section types and 27 primary layouts. Shared content and brand must survive variant changes.
- Builder: select variants, reorder, show/hide, change brand, save locally, and export React plus JSON.
- Dashboard and chatbot kits, payments, publication, and full legacy-catalog migration are later work.

## Non-negotiable architecture

- `@hudbird/ui` is the canonical primitive layer.
- Marketing macro layouts use Hudbird `Section`, `Container`, and `Grid` through shared composition helpers.
- Controls use Hudbird primitives rather than new raw controls.
- Brand and theme use semantic tokens; light and dark modes must both work.
- Content is independent from layout configuration so sections can be exchanged safely.
- Public TypeScript APIs remain compatible unless a breaking change is explicitly approved.
- Tailwind v4 is CSS-first. Do not add a Tailwind configuration file or legacy directives.
- Motion uses Hudbird Motion primitives, animates transform/opacity, and respects reduced motion.
- Accessibility baseline: keyboard operation, visible focus, ARIA semantics, WCAG AA contrast, and no color-only state.

## Design shorthand

- Calm, editorial, product-led, and deliberately spaced.
- Outfit for display and Plus Jakarta Sans for body where the homepage direction applies.
- Prefer clear reading channels and asymmetric/alternating layouts over repeated equal cards.
- Avoid AI glow fields, excessive glass, nested cards, generic copy, perpetual decoration, and horizontal overflow.
- Glass and expressive motion are opt-in, not defaults for the branded pilot or SaaS collection.
- Claims, customer logos, statistics, testimonials, and endorsements require a verified source.
- User-owned media is allowed. Demo content and sample data must be labeled.

## Source-of-truth priority

When sources disagree, use this order:

1. The user's latest explicit decision.
2. Task-specific approved plan or focused design document.
3. Current public types and tested implementation.
4. `DESIGN.md`.
5. PRD, BRD, and ERD.
6. README and generated Graphify output.

Some BRD/PRD claims describe ambitions rather than verified current inventory. Do not repeat quantities such as component/template counts as current facts without checking the repository.

## Focused references

- Global visual and engineering rules: `DESIGN.md`
- Business intent: `BRD_Hudbird_UI_Pro.md`
- Product requirements: `PRD_Hudbird_UI_Pro.md`
- Conceptual relationships: `ERD_Hudbird_UI_Pro.md`
- Homepage exception rules: `docs/HOMEPAGE-DESIGN.md`
- SaaS collection status: `docs/HUDBIRD-LANDING-SECTIONS.md`
- Pilot scope: `docs/HUDBIRD-PILOT.md`
- Marketing consolidation plan: `docs/HUDBIRD-MARKETING-UNIFICATION-PLAN.md`
- Repository relationship index: `graphify-out/graph.json`

## Working rule

One iteration should deliver one bounded outcome. Implementation, documentation, registry distribution, broad QA, and audit are separate slices unless the user asks for finalization.
