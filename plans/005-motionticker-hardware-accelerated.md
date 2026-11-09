# 005 — MotionTicker: Use Full transform String for Hardware Acceleration

- **Status**: TODO
- **Commit**: 135bb7a
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 1 file

## Problem

`packages/core/src/components/Motion/Motion.tsx:126-127` uses Motion shorthand `x`/`y` for the ticker:

```tsx
animate={running ? { x: ["0%", "-50%"] } : undefined}
transition={{ duration, ease: "linear", repeat: Infinity }}
```

Per transitions-dev skill: "Before `motion` 14.2, `x`/`y`/`scale` shorthands are not hardware-accelerated — they run on the main thread and drop frames under load." The project uses Framer Motion v13.2.0 (confirmed earlier), so this is a performance risk for a continuously running ticker.

## Target

```tsx
animate={running ? { transform: ["translateX(0%)", "translateX(-50%)"] } : undefined}
```

Full `transform` string is hardware-accelerated in all Framer Motion versions (AUDIT.md §5, STANDARDS.md §118).

## Repo conventions to follow

- transitions-dev: "Motion shorthands are hardware-accelerated from `motion` 14.2. Before 14.2, use the full transform string."
- AUDIT.md §5: "Only animate `transform` and `opacity` — they skip layout/paint and run on the GPU."
- STANDARDS.md §118: `<motion.div animate={{ x: 100 }} />` // motion 14.2+; `<motion.div animate={{ transform: "translateX(100px)" }} />` // hardware accelerated in every version.

## Steps

1. Open `packages/core/src/components/Motion/Motion.tsx`.
2. On line 126, change `animate={running ? { x: ["0%", "-50%"] } : undefined}` to `animate={running ? { transform: ["translateX(0%)", "translateX(-50%)"] } : undefined}`.
3. Save and run typecheck.

## Boundaries

- Do NOT change `duration`, `ease: "linear"`, or `repeat: Infinity`.
- Do NOT touch `MotionReveal`, `MotionStagger`, `MotionCrossfade`, or `MotionSlideshow` in this plan.

## Verification

- **Mechanical**: `pnpm --filter @hudbird/ui run typecheck` passes.
- **Feel check**: Page with MotionTicker should scroll smoothly; in DevTools Performance, the ticker should be on the compositor thread (transform), not main thread.
- **Done when**: `animate` uses full `transform` string.

---
