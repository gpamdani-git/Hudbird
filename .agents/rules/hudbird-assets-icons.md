# Rule: Asset, Icon & Zero Unsplash Slop Directives for Hudbird Nexus

> **CRITICAL DIRECTIVE:** Assets, imagery, and iconography define the perceived value of a digital template. Unsplash corporate placeholders and naked SVG icons immediately signal low-effort AI output and are strictly forbidden.

---

## 1. No Naked Icons (Mandatory `<IconBox />`)

**FORBIDDEN PATTERN:**
```tsx
// ❌ REJECTED: Naked SVG sitting unprotected on top of a card
<div>
  <svg className="w-6 h-6 text-brand-500">...</svg>
  <h3>Feature Title</h3>
</div>
```

**MANDATORY ICONBOX PATTERN:**
Every icon must be enclosed in an engineered `<IconBox />` container featuring:
- A tactile squircle shell (`rounded-2xl`).
- A subtle specular top rim highlight.
- Hover backlight glow that responds to card hover states.
- Uniform stroke weight of exactly `strokeWidth={1.5}` across all icons.

```tsx
// ✅ REQUIRED: Precision IconBox
export function IconBox({ icon: Icon, className = "" }: { icon: any; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/[0.05] border border-zinc-200/90 dark:border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] group-hover:border-brand-500/50 group-hover:bg-brand-500/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}>
      {/* Specular backlight glow */}
      <div className="absolute inset-0 rounded-2xl bg-brand-500/0 group-hover:bg-brand-500/20 blur-md transition-all duration-500 pointer-events-none" />
      <Icon className="relative z-10 w-5 h-5 text-zinc-800 dark:text-zinc-200 group-hover:text-brand-500 dark:group-hover:text-brand-300 transition-colors" strokeWidth={1.5} />
    </div>
  );
}
```

---

## 2. Code-Over-Stock for Bento & SaaS Features

**FORBIDDEN PATTERN:**
- ❌ Do not drop stock PNG/JPG screenshots into technical feature blocks or bento grids.

**MANDATORY CODE-DRIVEN MICRO-UI:**
Every technical feature must be represented by a live, interactive HTML/SVG Micro-UI component:
1. **Interactive Mini-Charts:** SVG sparklines and responsive bar charts that grow or highlight on card hover.
2. **Pulsing Telemetry Status Pills:** Micro-badges with glowing green pulses indicating active system health (`99.99% Uptime`, `12ms Response`).
3. **Engineered Code Terminals:** Dark mode mini-shells with syntax-highlighted snippets, copy buttons, and command prompts.
4. **Adaptive Dark/Light Contrast:** Micro-UIs must automatically adapt their canvas, borders, and accents to the active theme.

---

## 3. Curated Editorial Photography (`<EditorialImage />`)

When showcasing client case studies, editorial portfolio projects, or creative hero media:
1. **Optical Color Grading:**
   Every image must be processed with studio-grade optical balance:
   `contrast-[1.04] saturate-[0.88]`
2. **Double Inset Protection:**
   The image must be protected by an inner `1px` ring:
   `ring-1 ring-inset ring-black/10 dark:ring-white/10`
3. **Slow Hover Zoom:**
   Hovering the parent group triggers a slow, deliberate cinematic scale:
   `transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]`
4. **No Stock Stereotypes:**
   Never use generic stock photos of people in business suits pointing at whiteboards or shaking hands. Use architectural, typography-led, or high-fashion editorial imagery.

---

## 4. Monochrome Client Logos

For trust proof strips, logo clouds, and client marquees:
1. All client logos must be clean, inline SVG elements.
2. Apply `fill="currentColor"` so logos naturally inherit theme typography color.
3. Default state must be subtle and refined:
   `opacity-45 hover:opacity-100 transition-opacity duration-300`
4. Avoid loud rainbow logos that break visual hierarchy.
