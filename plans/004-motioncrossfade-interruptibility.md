# 004 — MotionCrossfade: Ensure Interruptibility with `mode="wait"`

- **Status**: TODO
- **Commit**: 135bb7a
- **Severity**: MEDIUM
- **Category**: Interruptibility
- **Estimated scope**: 1 file

## Problem

`packages/core/src/components/Motion/Motion.tsx:81-98` defines `MotionCrossfade`:

```tsx
export const MotionCrossfade = React.forwardRef<HTMLDivElement, MotionCrossfadeProps>(
  ({ transitionKey, children, className, ...props }, ref) => {
    const reduce = useReducedMotion();
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={transitionKey}
            initial={reduce ? false : { opacity: 0.01, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.24, ease: quietEase }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
);
```

Per transitions-dev skill: "Interruptibility. CSS transitions can be interrupted and retargeted mid-animation; keyframes restart from zero." The `mode="wait"` on `AnimatePresence` is correct for preventing simultaneous enter/exit animations, but we must verify the `transition` config supports interruption.

Currently `transition={{ duration: 0.24, ease: quietEase }}` uses a CSS transition under the hood (Framer Motion). This is interruptible — if a new component mounts while one is fading out, it can retarget from the current state.

## Target

Ensure `MotionCrossfade` uses interruptible transition semantics. The current config is already good, but the plan is to document why `mode="wait"` + CSS transition = interruptible, and verify no keyframes are used.

## Repo conventions to follow

- transitions-dev: "CSS transitions can be interrupted and retargeted mid-animation; keyframes restart from zero."
- AUDIT.md §4: "Interruptibility. Entry without JS: `@starting-style` (legacy fallback)."

## Steps

1. Open `packages/core/src/components/Motion/Motion.tsx`.
2. Review the `MotionCrossfade` component (lines 81-100).
3. Verify `mode="wait"` is preserved on `AnimatePresence` — this is the key interruptibility pattern.
4. Verify `transition` uses `quietEase` (already done via Plan 001) and not keyframes.
5. Add a JSDoc comment above the component explaining the interruptibility pattern:
   ```tsx
   * @summary Fades child in/out with interruptible CSS transitions.
   * @mode="wait" prevents simultaneous enter/exit animations.
   * Transition retargets from current state — safe for rapid toggling.
   ```
6. Save and run typecheck.

## Boundaries

- Do NOT change `duration: 0.24` or `ease: quietEase`.
- Do NOT change `initial`/`animate`/`exit` values unless verifying interruptibility.
- Do NOT touch other AnimatePresence usages in this plan.

## Verification

- **Mechanical**: `pnpm --filter @hudbird/ui run typecheck` passes.
- **Feel check**: Rapidly toggle a component that uses `MotionCrossfade` (if such a component exists in the codebase); the fade should retarget smoothly, not restart from zero.
- **Done when**: `mode="wait"` is intact and transition uses CSS-based (not keyframe) easing.

---
