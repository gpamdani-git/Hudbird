---
name: hudbird-core-component
description: Create or refine one reusable component in Hudbird's `@hudbird/ui` core package with focused accessibility, API, styling, tests, and export work. Use for core primitives and layout components; do not use for marketing sections, templates, or full pages.
---

# Hudbird Core Component

Build the smallest complete core primitive that fits Hudbird's existing system. Preserve user scope and public compatibility.

## Cheap context first

1. Read `docs/PROJECT_CONTEXT.md` and only the core-package sections of `docs/ARCHITECTURE_MAP.md`.
2. Inspect the requested component directory, its public export, and one nearest existing analogue.
3. Search only direct callers when changing an existing public API.
4. Do not load the full `DESIGN.md`, PRD, BRD, ERD, component inventory, or Graphify output by default. Open a precise section only when the compact context and nearby implementation cannot answer a decision.

## Scope contract

A normal iteration includes:

- one component under `packages/core/src/components/<Name>`;
- its local barrel export and `packages/core/src/index.ts` export when new;
- focused behavior tests;
- `pnpm --filter @hudbird/ui lint` and the focused test file.

Documentation, CLI registry, screenshots, broad browser matrices, package builds, migration aliases, and monorepo-wide tests are separate work unless explicitly requested or named as finalization. If more than one package must change, state the slices and implement only the approved slice.

## Component standard

- Prefer native semantics and platform behavior. Add ARIA only where native semantics are insufficient.
- Support ref forwarding when consumers reasonably need the underlying element.
- Extend the appropriate React element attributes; omit only conflicting native props.
- Use controlled and uncontrolled behavior consistently with the nearest Hudbird analogue.
- Use `cva` for meaningful variants and `cn` for composition. Avoid variant matrices with no real product need.
- Use semantic theme tokens first. Pair intentional fixed light colors with a dark equivalent.
- Keep touch targets, focus visibility, disabled state, keyboard behavior, labels, errors, and status announcements explicit.
- Preserve `className`, event handlers, data attributes, and consumer-provided ARIA attributes.
- Add `"use client"` only when the component needs client behavior or matches the package's required runtime boundary.
- Export useful public types. Do not expose internal styling or implementation details without a consumer need.
- Reuse existing Hudbird components when they reduce duplicated behavior; do not create circular dependencies or turn a primitive into a marketing block.

## Anti-slop gate

- Every variant must represent a distinct user need, not decoration for its own sake.
- No generic glow, gratuitous glass, rainbow icon tile, fake data, oversized empty shell, nested-card ornament, or perpetual animation.
- Visual hierarchy comes from typography, spacing, contrast, and state—not extra wrappers.
- Motion is optional. When justified, use Hudbird Motion primitives, transform/opacity only, short duration, and reduced-motion support.
- Copy and labels in examples must be direct and realistic. Never invent product claims or endorsements.
- Do not rewrite a sound existing API merely to make the implementation look newer.

## Verification

Test observable behavior rather than implementation wording:

- semantic role/name and keyboard operation;
- controlled/uncontrolled state where applicable;
- disabled, invalid, loading, or empty states that the API exposes;
- ref and event propagation when relevant;
- variant defaults and one meaningful alternate;
- regressions from the user's reported problem.

Use browser inspection only when visual or responsive behavior cannot be established through focused tests. Check one representative mobile and desktop width during iteration; exhaustive themes and breakpoints belong to finalization.

For stateful composite controls, overlays, focus management, or form-field relationships, read [references/interactive-contract.md](references/interactive-contract.md) before implementation.

## Handoff

Report the outcome, files changed, focused verification, and one next optional slice. Stop after the requested component works.
