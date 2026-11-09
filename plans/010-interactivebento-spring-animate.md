# 010 — InteractiveBentoShowcase: Spring-Animate Slider Label on Value Change

- **Status**: TODO
- **Commit**: 135bb7a
- **Severity**: LOW
- **Category**: Missed opportunities
- **Estimated scope**: 1 file

## Problem

`packages/marketing/src/components/SignatureBlocks/InteractiveBentoShowcase.tsx` has a "Monthly requests" slider that updates the displayed value instantly without animation when the user drags it. Per transitions-dev: "Constant motion (marquee, progress) → `linear`" is valid for ticker-like motion, but for value updates that happen on interaction, a subtle spring animation improves feel without blocking interaction.

## Target

Add a `useMotionValue` + `useSpring` pattern to animate the numeric label when the slider value changes, using a subtle spring that carries velocity:

```tsx
const trafficMillions = useState<number>(defaultTrafficMillions);
// ...
const trafficMillionValue = useMotionValue(trafficMillions);
//
// In the onChange of Slider:
setTrafficMillions(val);
trafficMillionValue.set(val); // spring carry
//
// Display:
<span className="text-base leading-none">{trafficMillionValue.get()}M / mo</span>;
```

Or, simpler: use a CSS transition on the label container with a fixed duration.

But the transitions-dev-preferred approach is spring-based for interruptibility.

## Repo conventions to follow

- transitions-dev: "Spring configs, Apple-style (recommended): `{ type: "spring", duration: 0.5, bounce: 0.2 }`. Keep bounce subtle (0.1–0.3)."
- AUDIT.md §4: "Gesture-driven motion should use springs — they carry velocity when interrupted."
- This is a LOW severity "missed opportunity" — not a bug, but a polish improvement.

## Steps

1. Open `packages/marketing/src/components/SignatureBlocks/InteractiveBentoShowcase.tsx`.
2. Import `useMotionValue`, `useSpring` from `framer-motion` (or check if already imported).
3. Add a `useMotionValue` hook for the trafficMillions value.
4. In the Slider's `onChange`, call both `setTrafficMillions(val)` and `trafficMillionValue.set(val)`.
5. Update the display span to use `trafficMillionValue.get()` instead of `trafficMillions`.
6. Save and run typecheck.

## Boundaries

- Do NOT change the slider's visual design (track, thumb, colors).
- Do NOT change the ROI chart or radar chart in this plan.
- Do NOT add new dependencies beyond what framer-motion provides.

## Verification

- **Mechanical**: `pnpm --filter @hudbird/marketing run typecheck` passes.
- **Feel check**: Drag the "Monthly requests" slider. The numeric label should animate smoothly with a slight spring, not jump instantly.
- **Done when**: Slider drag updates the number with a visible spring animation.

---
