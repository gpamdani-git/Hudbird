# Rule: Anti-AI UI Craft Standards for Hudbird Nexus

> **CRITICAL DIRECTIVE:** Every component, section, and interface generated in the Hudbird Nexus ecosystem must strictly adhere to human-crafted, tactile, and high-end agency visual standards. Generic, flat AI-hallucinated UI is strictly forbidden.

---

## 1. No Flat AI Cards (Mandatory `<DoubleBezelCard />`)

**FORBIDDEN PATTERN:**
```tsx
// ❌ REJECTED: Flat single-layer AI card
<div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6 border border-zinc-200">
  ...
</div>
```

**MANDATORY DOUBLE-BEZEL PATTERN:**
Every card, module, and container must use a tactile, two-layer chassis structure:

```tsx
// ✅ REQUIRED: Double Bezel Tactile Chassis
<div className="group relative p-1.5 sm:p-2 rounded-[28px] bg-zinc-200/55 dark:bg-white/[0.03] border border-zinc-300/70 dark:border-white/[0.07] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-brand-500/40">
  <div className="rounded-[22px] bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-white/[0.06] p-6 sm:p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
    {children}
  </div>
</div>
```

- **Outer Chassis:** `rounded-[28px]` with subtle translucent backdrop filter and fine border.
- **Inner Core:** `rounded-[22px]` with high-contrast background and specular inset top reflection (`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]`).

---

## 2. Architectural Grid & Corner Crosshairs (`+`)

To evoke precision engineering:
1. Use crisp `1px` structural borders between columns and rows:
   `border-zinc-200/70 dark:border-white/[0.06]`
2. Place SVG corner crosshairs (`+`) measuring `12x12px` at the intersection coordinates of main hero cards, feature grids, and pricing tiers:

```tsx
export function CornerCrosshair({ position = "top-left" }: { position: string }) {
  const posClasses = {
    "top-left": "-top-1.5 -left-1.5",
    "top-right": "-top-1.5 -right-1.5",
    "bottom-left": "-bottom-1.5 -left-1.5",
    "bottom-right": "-bottom-1.5 -right-1.5",
  }[position];

  return (
    <svg
      className={`absolute ${posClasses} w-3 h-3 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none z-10`}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M6 1v10M1 6h10" strokeLinecap="round" />
    </svg>
  );
}
```

---

## 3. Typographic Tension & Editorial Contrast

Generic templates use one font weight and size across headings. Hudbird Nexus commands visual attention through **typographic tension**:

1. **Heading Tightness:**
   - All `H1` and `H2` display headings must strictly apply:
     `tracking-[-0.035em] leading-[1.03]`
2. **Editorial Serif Accent Pairing:**
   - Pair an authoritative geometric Sans-Serif (`Plus Jakarta Sans` or `Space Grotesk`) with **1 accent word or phrase** in an elegant *Italic Serif* (`Instrument Serif` or `Butler`) or styled as an inline pill:
   ```tsx
   <h1 class="text-5xl sm:text-7xl font-extrabold tracking-[-0.035em] leading-[1.03]">
     Engineering digital products with <span class="font-serif italic font-normal text-brand-400">uncompromising</span> craft.
   </h1>
   ```
3. **Monospaced Data Anchors:**
   - Every index number (`01`, `02`), metric, price, and status badge must strictly use:
     `font-mono tabular-nums uppercase tracking-wider text-[11px]`

---

## 4. Signature Micro-Interactions & Physics Easing

1. **Mandatory `<KineticButton />`:**
   All primary call-to-actions must feature:
   - A dual-layer vertical text roll upon hover (current text rolls up, duplicate text rolls in from below).
   - A circular 45-degree diagonal arrow icon that flies up-right on hover and is seamlessly replaced by an arriving arrow from bottom-left.

2. **Strictly Forbidden Easing:**
   - ❌ Never use generic `transition-all duration-300` or browser default `ease`.
3. **Mandatory Physics Easing Curve:**
   - ✅ Always use the custom luxury spring curve:
     `duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`
