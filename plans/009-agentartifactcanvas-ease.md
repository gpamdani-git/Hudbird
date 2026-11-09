# 009 — AgentArtifactCanvas: Replace easeOut with quietEase Token

- **Status**: TODO
- **Commit**: 135bb7a
- **Severity**: MEDIUM
- **Category**: Easing & duration
- **Estimated scope**: 1 file

## Problem

`packages/marketing/src/components/SignatureBlocks/AgentArtifactCanvas.tsx:484` uses the CSS keyword `easeOut`:

```tsx
transition={{ duration: 0.2, ease: "easeOut" }}
```

Per transitions-dev: "Built-in CSS easings are too weak for deliberate motion. Use strong custom curves:" — specifically `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` or the repo's `quietEase = [0.22, 1, 0.36, 1]`.

## Target

```tsx
transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
```

Duration 0.2s (200ms) is within the dropdown/popover budget (150–250ms). Only the easing changes from `"easeOut"` to `quietEase` for cohesion.

## Repo conventions to follow

- transitions-dev: "Use strong custom cubic-beziers; never `ease-in` on UI."
- AUDIT.md §2: Duration budgets — 200ms is within popover dropdown budget (150–250ms).
- Plan 001: `quietEase` is the shared token.

## Steps

1. Open `packages/marketing/src/components/SignatureBlocks/AgentArtifactCanvas.tsx`.
2. On line 484, change `ease: "easeOut"` to `ease: [0.22, 1, 0.36, 1] as const`.
3. Save and run typecheck.

## Boundaries

- Do NOT change `duration: 0.2`, `initial`, `animate`, or `exit` values.
- Do NOT touch MorphingIsland.tsx or InteractiveBentoShowcase.tsx.

## Verification

- **Mechanical**: `pnpm --filter @hudbird/marketing run typecheck` passes.
- **Feel check**: Switch tabs in AgentArtifactCanvas (telemetry ↔ spec ↔ summary). The crossfade/slide should start fast and settle crisply — not a lazy CSS `easeOut`.
- **Done when**: Line 484 uses `[0.22, 1, 0.36, 1]` instead of `"easeOut"`.

---
