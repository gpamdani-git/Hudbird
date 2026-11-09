# 008 — MorphingIsland: Add initial scale 0.95 to Pure-Fade Entries

- **Status**: TODO
- **Commit**: 135bb7a
- **Severity**: MEDIUM
- **Category**: Physicality & origin
- **Estimated scope**: 1 file (MorphingIsland.tsx)

## Problem

`packages/marketing/src/components/SignatureBlocks/MorphingIsland.tsx` uses `initial={{ opacity: 0 }}, animate={{ opacity: 1 }}` in multiple `motion.div` entries — pure fade with no initial transform. Per AUDIT.md §3 and transitions-dev: "Never `scale(0)` — nothing in the real world appears from nothing. Target: `scale(0.9–0.97)` + `opacity: 0`." Pure fade entrances feel floaty and lack physical weight.

## Target

Add `scale: 0.95` to `initial` so entries scale up slightly while fading in:

```tsx
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
```

Keep `CONTENT_TRANSITION` (duration 0.18s, ease `[0.16, 1, 0.3, 1]`) unchanged.

## Repo conventions to follow

- AUDIT.md §3: "Never `scale(0)`. Target: `scale(0.9–0.97)` + `opacity: 0`."
- transitions-dev: "Physicality & origin — start from scale(0.9–0.97)."
- `CONTENT_TRANSITION` is the repo's content crossfade curve — reuse it.

## Steps

1. Open `packages/marketing/src/components/SignatureBlocks/MorphingIsland.tsx`.
2. Find all `motion.div` with `initial={{ opacity: 0 }}, animate={{ opacity: 1 }}` and `transition={CONTENT_TRANSITION}`.
3. Change each to `initial={{ opacity: 0, scale: 0.95 }}, animate={{ opacity: 1, scale: 1 }}`.
4. Verify no other `initial={{ opacity: 0 }}` without `scale` remains.
5. Save and run typecheck.

## Boundaries

- Do NOT change `CONTENT_TRANSITION` values.
- Do NOT touch `ISLAND_MORPH_SPRING` or `layoutId` animations (those are shell morphs, already using springs).
- Do NOT touch AgentArtifactCanvas.tsx or InteractiveBentoShowcase.tsx.

## Verification

- **Mechanical**: `pnpm --filter @hudbird/marketing run typecheck` passes.
- **Feel check**: Open MorphingIsland, switch presentations. Content should pop in with a slight scale-up — physical, not a flat fade.
- **Done when**: All pure-fade entries include `scale: 0.95` on `initial` and `scale: 1` on `animate`.

---
