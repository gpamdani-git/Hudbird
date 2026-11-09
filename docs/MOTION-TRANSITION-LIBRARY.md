# Motion & Transition Library — Hudbird DX Documentation

## Introduction

This documentation covers the **Hudbird Motion & Transition Library**, a collection of reusable motion components and transitions built following Emil Kowalski's animation philosophy and the `transitions.dev` motion-token scale.

The library consists of two parts:

1. **Motion Components** — Reusable React components (`MotionReveal`, `MotionStagger`, etc.) living in `packages/core/src/components/Motion/`
2. **Transition Patterns** — Reusable transition effects (notifications, dropdowns, modals, etc.) following the `transitions.dev` tokenized animation scale

---

## Part 1: Motion Components

### Available Components

| Component         | Description                            | Key Props                       | Standards compliance                                                          |
| ----------------- | -------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------- |
| `MotionReveal`    | Entrance animation on scroll intersect | `distance`, `once`, `className` | AUDIT.md §2 (300ms), §5 (transform+opacity)                                   |
| `MotionStagger`   | Group entrance with staggered delay    | `children`, `zIndex`            | transitions-dev: tokenized stagger delays                                     |
| `MotionCrossfade` | Crossfade between two children         | `transitionKey`, `children`     | transitions-dev: interruptibility (`mode="wait"`)                             |
| `MotionTicker`    | Continuous scrolling marquee           | `items`, `duration`, `paused`   | transitions-dev: hardware-accelerated transform (v13 → full transform string) |
| `MotionSlideshow` | Horizontal slideshow with prev/next    | `slides`, `label`               | AUDIT.md §4 (interruptibility)                                                |

### Token: `quietEase`

All motion components use the shared easing token:

```css
--ease-out: cubic-bezier(0.22, 1, 0.36, 1); /* quietEase */
```

- Import: `import { quietEase } from "@hudbird/ui";` or `import { quietEase } from "../Motion";`
- Used for: all UI entrances/exits, not marketing/explainer animations (those can exceed 300ms)

### Duration Budgets (AUDIT.md §2)

| Element                  | Max Duration  |
| ------------------------ | ------------- |
| Button press feedback    | 160ms         |
| Tooltips, small popovers | 200ms         |
| Dropdowns, selects       | 250ms         |
| Modals, drawers          | 500ms         |
| Marketing / explanatory  | Can be longer |

**Rule**: Core UI components (reveal, stagger, crossfade) must stay under 300ms.

---

## Part 2: Transition Patterns (transitions.dev)

The `transitions.dev` library provides a tokenized scale for consistent, production-ready transitions. Hudbird integrates these tokens via the `quietEase` and duration conventions.

### Motion-Token Scale (transitions.dev)

| Token             | Value | When to Use                 |
| ----------------- | ----- | --------------------------- |
| `duration.xfast`  | 100ms | Spinners, quick toggles     |
| `duration.fast`   | 150ms | Tooltips, inline feedback   |
| `duration.medium` | 200ms | Dropdowns, popovers         |
| `duration.slow`   | 400ms | Modals, drawers             |
| `duration.xslow`  | 800ms | Marketing pages, onboarding |

| Easing        | When to Use                                         |
| ------------- | --------------------------------------------------- |
| `ease-out`    | Entering/exiting UI — starts fast, feels responsive |
| `ease-in-out` | Moving/morphing on screen                           |
| `linear`      | Constant motion (marquee, progress bars)            |

### Common Transition Patterns

#### 1. Notification Badge Transition

```tsx
// Badge appears with scale + fade
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.2, ease: quietEase }}
>
  <span>+1</span>
</motion.div>
```

- **Duration**: `medium` (200ms) — within popover dropdown budget
- **Easing**: `quietEase` — strong custom curve, not `ease-in`
- **Physicality**: `scale from 0.95` — nothing appears from nothing (AUDIT.md §3)

#### 2. Dropdown/Popover Transition

```tsx
// Dropdown scales from its trigger, not center
.popover {
  transform-origin: var(--transform-origin); /* Base UI pattern */
  transition: transform 0.2s var(--ease-out), opacity 0.2s var(--ease-out);
}
```

- **Origin**: Scales from trigger element, not `center` (modals are exempt — AUDIT.md §3)
- **Duration**: `medium` (200ms) — 150–250ms budget
- **Interruptibility**: Use CSS transitions, not keyframes (transitions-dev: "CSS transitions can be interrupted and retargeted mid-animation")

#### 3. Page Transition (Route Change)

```tsx
// Using AnimatePresence with mode="crossfade"
<AnimatePresence mode="crossfade">
  <motion.div key={path} initial="enter" animate="exit" exit="true">
    <CurrentPage />
  </motion.div>
  <motion.div key={nextPath} initial="exit" animate="enter" enter="true">
    <NextPage />
  </motion.div>
</AnimatePresence>
```

- **Mode**: `crossfade` — subtle blur mask during transition (transitions-dev: "When a crossfade shows two overlapping states, add subtle `filter: blur(2px)`")
- **Duration**: `slow` (400ms) — marketing/explainer budget allows longer
- **Masking**: `filter: blur(2px)` during crossfade (keep blur < 20px, especially Safari)

#### 4. Plus-to-Menu Morph (FAB pattern)

```tsx
// Icon morphs into a menu grid
<motion.div
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.15, ease: quietEase }}
>
  {/* Plus icon or menu grid */}
</motion.div>
```

- **Duration**: `fast` (150ms) — quick interactive feedback
- **Easing**: `quietEase`
- **Touch feedback**: `whileTap={{ scale: 0.95 }}` — press feedback (AUDIT.md §5: `transform: scale(0.97)` on `:active`)

#### 5. Toast Transition

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3, ease: quietEase }}
  className="toast"
>
  Message content
</motion.div>
```

- **Duration**: `medium` (300ms) — within UI budget
- **Interruptibility**: CSS transitions (not keyframes) — toasts may be rapidly added/removed
- **Accessibility**: Honor `prefers-reduced-motion` — drop `y` transform, keep opacity fade

### Tokenized Animation Workflow

1. **Scan** your codebase for ad-hoc transitions (skill: `transitions-dev` command: `scan for ad-hoc transitions`)
2. **Tokenize** all numeric values: durations → `duration.*` scale, easings → `quietEase` / `ease-out` / `ease-in-out`, distances → `scale-*` or `translate-*`
3. **Replace** hardcoded values with token references
4. **Polish** using `transitions-polish` skill: refine timing, easing, stagger offsets, and intent delays
5. **Verify** with `review-animations` against the 10 non-negotiable standards

### Hudbird + transitions.dev Integration Examples

#### Example 1: Badge from Notification

Transisi dari notification tidak ada menjadi ada dengan badge bertransisi menjadi bullet 1 dan lonceng icon bergoyang memiliki sound.

```tsx
// Notification badge slide-in + bell shake
<motion.div className="relative inline-block">
  {/* Bell icon with subtle shake on new notification */}
  <motion.svg
    className="bell-icon"
    whileTap={{ x: -4 }}
    transition={{ duration: 0.1, ease: quietEase }}
  >
    <path d="M12 2c-5.523 0-10 4.477-10 10v2a10 10 0 0 0 10-10h-2z" />
    <path d="M12 4v16M4.93 4.93l2.83 2.83" />
  </motion.svg>

  {/* Badge with slide-in */}
  <motion.div
    className="badge"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.2, ease: quietEase }}
  >
    <span>1</span>
  </motion.div>
</motion.div>
```

#### Example 2: Dropdown Slide

```tsx
// Dropdown slides from trigger with correct transform-origin
<motion.div
  className="dropdown"
  whileInView={{ y: 0, opacity: 1 }}
  whileExit={{ y: 10, opacity: 0 }}
  transition={{ duration: 0.2, ease: quietEase }}
  transformOrigin="var(--trigger-transform-origin)"
>
  <ul className="dropdown-menu">
    <li>Option 1</li>
    <li>Option 2</li>
  </ul>
</motion.div>
```

---

## Implementation Guidelines

### When to Use `transitions.dev` Tokens vs. Custom Values

| Use `transitions.dev` tokens when:                 | Use custom values when:                   |
| -------------------------------------------------- | ----------------------------------------- |
| Standard UI patterns (tooltips, dropdowns, modals) | Unique branding animations                |
| Team consistency is a priority                     | Experimental motion not in spec           |
| Need predictable behavior across projects          | Performance-critical, proprietary effects |

### Checklist Before Shipping Motion/Transition

- [ ] Duration ≤ 300ms for UI (AUDIT.md §2)
- [ ] Easing is `quietEase` or `ease-out` — not `ease-in` on UI (transitions-dev)
- [ ] Only `transform` and `opacity` animated — no `width`/`height`/`margin` (AUDIT.md §5)
- [ ] Interruptible: CSS transitions, not keyframes for dynamic UI (transitions-dev §4)
- [ ] `transform-origin` correct: scales from trigger, not center (AUDIT.md §3, exempt modals)
- [ ] `prefers-reduced-motion` gated: drop transform, keep opacity/color (AUDIT.md §8)
- [ ] No `transition: all` — scoped to animated properties (transitions-dev escalation)
- [ ] Stagger delays consistent and documented (transitions-dev: "tokenize my animations")

### Getting Help

- Review each plan in `plans/` folder for detailed file:line instructions
- Run `pnpm lint` + `tsc --noEmit` to verify type safety
- Use `review-animations` skill for high-craft bar review
- Reference `transitions-dev` and `transitions-polish` skill descriptions for token tuning

---
