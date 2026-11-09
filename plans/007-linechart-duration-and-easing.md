# 007 — LineChart: Reduce Entrance Duration to 300ms, Use quietEase

- **Status**: TODO
- **Commit**: 135bb7a
- **Severity**: HIGH
- **Category**: Easing & duration
- **Estimated scope**: 1 file

## Problem

`packages/core/src/components/LineChart/LineChart.tsx:88` wraps the chart in a `motion.div` with 500ms entrance:

```tsx
<motion.div
  ref={ref}
  className={cn("w-full", heightClass, className)}
  {...props}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
```

Per AUDIT.md §2 and transitions-dev: "UI animations stay under 300ms." 500ms exceeds the budget. Additionally, `easeOut` is a built-in CSS easing that transitions-dev calls "too weak for deliberate motion." The repo has `quietEase` as a strong custom cubic-bezier.

## Target

```tsx
transition={{ duration: 0.3, ease: quietEase }}
```

Duration reduced from 0.5s to 0.3s (300ms upper bound). Easing changed from `"easeOut"` to `quietEase` imported from `../Motion`.

## Repo conventions to follow

- AUDIT.md §2: UI animations under 300ms.
- transitions-dev: "replace hardcoded durations with motion tokens" and "use strong custom curves."
- Plan 001: `quietEase` is now exported.

## Steps

1. Open `packages/core/src/components/LineChart/LineChart.tsx`.
2. Add `import { quietEase } from "../Motion";` to the imports (line 15 area).
3. On line 88, change `transition={{ duration: 0.5, ease: "easeOut" }}` to `transition={{ duration: 0.3, ease: quietEase }}`.
4. Save and run typecheck.

## Boundaries

- Do NOT change chart data, categories, colors, or Recharts configuration.
- Do NOT change `initial`/`animate` values (`opacity: 0, y: 10` → `opacity: 1, y: 0`) — only `transition`.
- Do NOT touch other chart components (BarChart, AreaChart) in this plan.

## Verification

- **Mechanical**: `pnpm --filter @hudbird/ui run typecheck` passes.
- **Feel check**: Load a page with LineChart (e.g. LineChartDoc). The chart should fade/slide in within ~300ms, starting fast (ease-out feel) and settling quickly — not a slow 500ms drift.
- **Done when**: `duration` is `0.3` and `ease` is `quietEase` on LineChart's motion wrapper.

---
