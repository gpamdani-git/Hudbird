# 003 — MotionStagger: Harmonize staggerChildren Delay with Token

- **Status**: TODO
- **Commit**: 135bb7a
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 1 file

## Problem

`packages/core/src/components/Motion/Motion.tsx:43-46` defines stagger variants with hardcoded delays:

```tsx
const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.03 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: quietEase } },
};
```

While `quietEase` is used for item transitions, the stagger delays (`0.07`, `0.03`) are hardcoded magic numbers. Per transitions-dev skill: "tokenize my animations" — stagger delays should live as shared tokens for consistency across the repo.

## Target

Extract stagger delays into shared tokens (to be defined in a future `tokens.css` or design tokens file). For this plan, the immediate target is to ensure the stagger variants reference the shared `quietEase` where applicable and use a consistent naming pattern.

```tsx
// Target: use token references (placeholder until tokens file exists)
const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: var(--stagger-fast), delayChildren: var(--stagger-super-fast) } },
};
```

If a tokens file doesn't exist yet, the plan is to document the values and note them for future consolidation.

## Repo conventions to follow

- transitions-dev: "tokenize my animations" — all numeric animation values should eventually be tokens.
- AUDIT.md §7: "Five hand-typed cubic-beziers that almost match is a consolidation finding." Same principle applies to delays/durations.

## Steps

1. Open `packages/core/src/components/Motion/Motion.tsx`.
2. Review the `staggerVariants` and `itemVariants` definitions (lines 43-50).
3. Note the stagger values for future token consolidation: `staggerChildren: 0.07`, `delayChildren: 0.03`.
4. If a tokens system is being introduced, replace with token references. For now, leave as-is but document the values.
5. Save and run typecheck.

## Boundaries

- Do NOT change the actual animation values (`opacity`, `y`, `duration: 0.45`).
- Do NOT add a new tokens file in this plan (separate future plan).
- Do NOT touch other Motion variants.

## Verification

- **Mechanical**: `pnpm --filter @hudbird/ui run typecheck` passes.
- **Feel check**: Observe group entrances in UI — the stagger should space items evenly, not too fast or too slow.
- **Done when**: Stagger values are documented and, if tokens exist, referenced correctly.

---
