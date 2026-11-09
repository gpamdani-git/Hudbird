# 001 — Export quietEase as Shared Token (Foundation for All Plans)

- **Status**: TODO
- **Commit**: 135bb7a
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 1 file

## Problem

`packages/core/src/components/Motion/Motion.tsx:14` defines `quietEase = [0.22, 1, 0.36, 1] as const` but does not export it. Other components hardcode `"easeOut"` or inline cubic-beziers instead of reusing this curve. Per AUDIT.md §7 and transitions-dev skill: "Curves and durations should live as shared tokens. Five hand-typed cubic-beziers that almost match is a consolidation finding."

## Target

Export `quietEase` from `Motion.tsx` so it can be imported by any component in the repo:

```tsx
export const quietEase = [0.22, 1, 0.36, 1] as const;
```

Then update `index.ts` to re-export it if needed.

## Repo conventions to follow

- AUDIT.md §7: "Curves and durations should live as shared tokens."
- transitions-dev skill: "tokenize my animations" — start with easing tokens.
- This is the foundational plan: all subsequent plans that use `quietEase` should import from this file.

## Steps

1. Open `packages/core/src/components/Motion/Motion.tsx`.
2. On line 14, change `const quietEase = [0.22, 1, 0.36, 1] as const;` to `export const quietEase = [0.22, 1, 0.36, 1] as const;`.
3. Check `packages/core/src/components/Motion/index.ts` — it uses `export * from "./Motion"`, so `quietEase` will be automatically available.
4. Run `pnpm lint` to verify no type errors.
5. Save and verify: `import { quietEase } from "@hudbird/ui"` should work in a test file.

## Boundaries

- Do NOT change the `quietEase` value `[0.22, 1, 0.36, 1]`.
- Do NOT modify any component that uses easing in this plan (that's separate plans).
- Do NOT add new dependencies.

## Verification

- **Mechanical**: `pnpm --filter @hudbird/ui run typecheck` passes.
- **Done when**: `quietEase` can be imported from `@hudbird/ui` or `../Motion` without errors.

---
