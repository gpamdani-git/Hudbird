# 006 — Button: Stop `transition-all`, Use Scoped Transition with Token

- **Status**: TODO
- **Commit**: 135bb7a
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 1 file

## Problem

`packages/core/src/components/Button/Button.tsx:45` uses `transition-all` in the button's `cva` className:

```tsx
"inline-flex items-center justify-center font-medium tracking-tight whitespace-nowrap select-none transition-all duration-150 ease-out hover:-translate-y-[0.5px] active:translate-y-0 active:scale-[0.97] ...";
```

Per transitions-dev escalation trigger: "`transition: all` (unbounded property animation)" — always a finding. `transition-all` animates layout properties (width, height, margin, etc.) off-GPU, causing jank, especially on button hover/active states where only `transform` and `opacity` should animate.

## Target

Replace `transition-all` with property-scoped transition using the repo's `quietEase` token:

```tsx
"inline-flex items-center justify-center font-medium tracking-tight whitespace-nowrap select-none [transition-property:transform,opacity] [transition-duration:150ms] [transition-timing-function:var(--ease-out,var(--ease-custom))]" ...
```

Or, since the repo uses arbitrary Tailwind values, we can use:

```tsx
"inline-flex items-center justify-center font-medium tracking-tight whitespace-nowrap select-none [transition-property:transform,opacity] [transition-duration:150ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]" ...
```

The `150ms` duration is within the button press feedback budget (AUDIT.md §2: 100–160ms).

## Repo conventions to follow

- transitions-dev: "`transition: all` is an escalation trigger — always a finding."
- AUDIT.md §5: "Don't animate layout properties — animate `transform` and `opacity` only."
- AUDIT.md §2: Button press feedback 100–160ms; 150ms is within budget.
- Plan 001: `quietEase` is now exported and reusable.

## Steps

1. Open `packages/core/src/components/Button/Button.tsx`.
2. On line 45, replace `transition-all duration-150 ease-out` with `[transition-property:transform,opacity] [transition-duration:150ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]`.
3. Save and run typecheck/lint.

## Boundaries

- Do NOT change any variant definitions inside `buttonVariants` object — only the base className string.
- Do NOT remove the `duration-150` semantic; preserve the 150ms duration via `[transition-duration:150ms]`.
- Do NOT touch `isLoading` spinner or other Button internals.

## Verification

- **Mechanical**: `pnpm --filter @hudbird/ui run lint` and `tsc --noEmit` pass.
- **Feel check**: Hover and click a Button. The `-translate-y-[0.5px]` lift and `scale-[0.97]` press should feel crisp and instant, not sluggish from animating irrelevant properties.
- **Done when**: Button className no longer contains `transition-all`, and DevTools Animations panel shows only `transform` and `opacity` keyframes on hover/active.

---
