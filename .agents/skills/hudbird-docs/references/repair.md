# Docs Repair

Use this reference only for a reported Docs error or regression.

## Diagnosis order

1. Reproduce or inspect the exact error.
2. Read the failing file and direct import, route, asset, or component boundary.
3. Confirm the referenced path, export, runtime assumption, and case sensitivity.
4. Search direct callers only if the local cause is unclear.
5. Consult broader routing or Graphify only when targeted inspection cannot establish impact.

Prefer correcting the source of truth over hiding errors. Do not disable Vite overlays, TypeScript checks, accessibility behavior, or warnings merely to make the symptom disappear.

## Common boundaries

- Import failure: verify the actual file and whether it belongs in source assets or the configured Vite public directory.
- Undefined component: compare named/default exports at the component barrel and package entrypoint.
- Missing route: verify lazy import, route path, navigation entry, and TOC mapping without rewriting unrelated navigation.
- Theme regression: use the existing docs theme manager and semantic tokens; do not add a second theme state.
- Preview-only issue: fix the preview or fixture unless the reusable component itself demonstrably fails.
- Console/accessibility issue: repair semantics and state announcement rather than suppressing the message.

## Verification

Run `pnpm --filter docs build`. Add a focused test when the failure involves reusable logic. Use one direct browser check only when the defect is visual, responsive, or interaction-specific. Do not start a full breakpoint/theme matrix during a repair iteration.
