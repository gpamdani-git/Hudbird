# 002 — MotionReveal: Reduce Duration to 300ms, Use quietEase

- **Status**: TODO
- **Commit**: 135bb7a
- **Severity**: LOW
- **Category**: Easing & duration
- **Estimated scope**: 1 file

## Problem

`packages/core/src/components/Motion/Motion.tsx:32` sets `MotionReveal` entrance duration to 0.55s:

```tsx
transition={{ duration: 0.55, ease: quietEase }}
```

Per AUDIT.md §2 and transitions-dev duration budgets: "UI animations stay under 300ms." While AUDIT.md notes "Marketing / explanatory — can be longer," `MotionReveal` is a core UI primitive used across the product, not a one-off marketing animation. 550ms exceeds the UI budget and feels sluggish for repeated reveals.

## Target

```tsx
transition={{ duration: 0.3, ease: quietEase }}
```

Duration reduced from 0.55s to 0.3s (300ms, the upper bound of the UI budget). `quietEase` is already referenced — keep using the shared token.

## Repo conventions to follow

- AUDIT.md §2: UI animations under 300ms.
- transitions-dev skill: "replace hardcoded durations with motion tokens."
- `quietEase` is the repo's shared easing token (Plan 001).

## Steps

1. Open `packages/core/src/components/Motion/Motion.tsx`.
2. On line 32, change `duration: 0.55` to `duration: 0.3`.
3. Save and run typecheck.

## Boundaries

- Do NOT change `ease: quietEase`.
- Do NOT change `initial`, `whileInView`, or `viewport` values.
- Do NOT touch `MotionStagger`, `MotionCrossfade`, `MotionTicker`, or `MotionSlideshow` in this plan.

## Verification

- **Mechanical**: `pnpm --filter @hudbird/ui run typecheck` passes.
- **Feel check**: Scroll a page using `MotionReveal`. Elements should reveal within ~300ms — quick enough to feel responsive.
- **Done when**: `duration` is `0.3` on `MotionReveal`'s transition.

---
