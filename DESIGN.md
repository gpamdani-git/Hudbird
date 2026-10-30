---
name: Hudbird UI Kinetic
colors:
  surface: "#f9fafb"
  surface-dim: "#f0f2f5"
  surface-bright: "#ffffff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f8fafc"
  surface-container: "#f1f5f9"
  surface-container-high: "#e2e8f0"
  surface-container-highest: "#cbd5e1"
  on-surface: "#0f172a"
  on-surface-variant: "#64748b"
  inverse-surface: "#090d16"
  inverse-on-surface: "#f8fafc"
  outline: "#e2e8f0"
  outline-variant: "#cbd5e1"
  surface-tint: "#4f46e5"
  primary: "#4f46e5"
  on-primary: "#ffffff"
  primary-container: "#eef2ff"
  on-primary-container: "#3730a3"
  inverse-primary: "#818cf8"
  secondary: "#06b6d4"
  on-secondary: "#ffffff"
  secondary-container: "#ecfeff"
  on-secondary-container: "#0e7490"
  tertiary: "#10b981"
  on-tertiary: "#ffffff"
  tertiary-container: "#ecfdf5"
  on-tertiary-container: "#065f46"
  error: "#f43f5e"
  on-error: "#ffffff"
  error-container: "#fff1f2"
  on-error-container: "#9f1239"
  background: "#f9fafb"
  on-background: "#0f172a"
  surface-variant: "#f1f5f9"
typography:
  display-lg:
    fontFamily: Outfit, sans-serif
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 56px
    letterSpacing: -0.035em
  headline-md:
    fontFamily: Outfit, sans-serif
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
    letterSpacing: -0.025em
  body-base:
    fontFamily: Plus Jakarta Sans, sans-serif
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 26px
    letterSpacing: "0"
  body-bold:
    fontFamily: Plus Jakarta Sans, sans-serif
    fontSize: 16px
    fontWeight: "600"
    lineHeight: 26px
    letterSpacing: "0"
  label-caps:
    fontFamily: Plus Jakarta Sans, sans-serif
    fontSize: 12px
    fontWeight: "600"
    lineHeight: 16px
    letterSpacing: 0.05em
  code-mono:
    fontFamily: JetBrains Mono, monospace
    fontSize: 13px
    fontWeight: "500"
    lineHeight: 20px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.25rem
  2xl: 1.75rem
  3xl: 2rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

# Design System: Hudbird UI (Kinetic System)

**Project ID:** `projects/hudbird-ui-kinetic`

---

## 1. Visual Theme & Atmosphere

A restrained, high-agency kinetic interface combining architectural editorial precision with weighted physical micro-motion. The visual tone is technical, confident, and anti-generic — evoking the clarity of a high-end aerospace telemetry terminal crossed with contemporary Swiss publication craft.

- **Density Spectrum (5/10 — Balanced SaaS & Marketing):** Generous internal element breathing room paired with compact, high-precision typography and tabular numeric readouts.
- **Variance Spectrum (8/10 — Offset Asymmetric):** Rejects templated centering. Favors asymmetric editorial split layouts, 5-to-7 column bento compositions, staggered narrative blocks, and dynamic optical balancing.
- **Motion Spectrum (8/10 — Cinematic Kinetic Physics):** Powered by hardware-accelerated spring dynamics (`stiffness: 100, damping: 20`). Interactive surfaces react with tactile magnetic pull, tactile depression, and perpetual micro-interaction states.

---

## 2. Color Palette & Roles

Hudbird UI uses a carefully calibrated OKLCH & Hex palette constrained below 80% saturation. Pure black (`#000000`) and oversaturated "AI neon glows" are strictly prohibited.

### 2.1 Neutral Base & Surfaces

- **Canvas Light** (`#F9FAFB`) — Primary background canvas in light mode. Clean, warm off-white surface that eliminates eye fatigue.
- **Pure Surface Light** (`#FFFFFF`) — Card containers, elevated modals, dialogs, and popovers in light mode.
- **Deep Void Slate** (`#090D16`) — Primary background canvas in dark mode. A deep, oceanic off-black with subtle cool undertones. Never pure `#000000`.
- **Surface Dark** (`#0F172A`) — Elevated cards, sidebars, headers, and floating toolbars in dark mode.
- **Charcoal Ink** (`#0F172A`) — Primary high-contrast typography, headings, and active iconography in light mode.
- **Luminous Silver** (`#F8FAFC`) — Primary high-contrast text and prominent accents in dark mode.
- **Muted Steel** (`#64748B`) — Secondary body copy, descriptive subtitles, metadata labels, and disabled states.
- **Whisper Border Light** (`rgba(226, 232, 240, 0.8)`) — 1px structural dividing lines and subtle card outlines in light mode.
- **Whisper Border Dark** (`rgba(255, 255, 255, 0.08)`) — Glass card borders, hairline dividers, and inner-glow bezel lines in dark mode.

### 2.2 Brand & Kinetic Accents

- **Electric Indigo** (`#4F46E5` / `#6366F1`) — Primary interactive brand color. Applied to primary call-to-actions, active tab indicators, and keyboard focus rings.
- **Kinetic Cyan** (`#06B6D4`) — Secondary kinetic accent. Used for velocity indicators, micro-badges, gradient endpoints, and real-time state badges.
- **Emerald Vitality** (`#10B981`) — Semantic success state, operational indicators, verified badges, and positive metric deltas.
- **Amber Warning** (`#F59E0B`) — Semantic caution state, pending queues, rate limit warnings, and non-blocking notifications.
- **Rose Danger** (`#F43F5E`) — Destructive actions, validation error outlines, network disconnection indicators, and high-urgency alerts.

---

## 3. Typography Architecture

Hierarchy is enforced strictly through weight contrast, tracking adjustments, and spatial rhythm rather than oversized shouting font sizes.

- **Display & Headline Font:** `Outfit`, sans-serif
  - **Scale:** `clamp(2rem, 5vw, 4.25rem)` for hero displays; `1.75rem` to `2.25rem` for section titles.
  - **Tracking & Weight:** Track-tight (`letter-spacing: -0.035em`), weight 600 (Semi-Bold) to 700 (Bold).
  - **Rule:** Never wrap beyond 3 lines on desktop. Banned from using rainbow gradient text on full paragraphs.
- **Body & UI Font:** `Plus Jakarta Sans`, sans-serif (or `Geist Sans`)
  - **Scale:** `0.875rem` (14px) for dense UI controls; `1rem` (16px) for standard editorial body; `1.125rem` (18px) for lead intros.
  - **Leading & Line-Length:** Relaxed leading (`line-height: 1.65`), strictly capped at 65 characters per line (`max-w-[65ch]`).
  - **Color:** Muted Steel (`#64748B` / `#94A3B8`) to allow headlines and interactive affordances to anchor visual weight.
- **Monospace Font:** `JetBrains Mono` (`font-mono`)
  - **Role:** Precision tabular numbers, terminal commands, CLI arguments, code blocks, keyboard shortcut keys (`<kbd>`), and git commit hashes.
  - **Tracking:** Normal (`letter-spacing: -0.01em`), font-size `0.8125rem` (13px).
- **Banned Fonts:** `Inter` is prohibited for unique brand identity. Generic web-safe serifs (`Times New Roman`, `Georgia`, `Palatino`) are banned in software and dashboard views.

---

## 4. Component Stylings

### 4.1 Buttons

- **Shape:** Subtly rounded corners (`border-radius: 0.5rem` / `8px`) for standard controls; pill shape (`rounded-full`) exclusively for search bars and notification pills.
- **Primary Variant:** Solid Electric Indigo (`#4F46E5`) fill, pure white text, hairline inset ring (`inset 0 1px 0 rgba(255,255,255,0.15)`).
- **Secondary / Outline Variant:** Translucent background (`rgba(255,255,255,0.04)` dark / `rgba(0,0,0,0.02)` light) with 1px Whisper Border.
- **Kinetic Interaction:**
  - Active state: `-1px` vertical translation (`translate-y-[1px]`), scale compression (`scale: 0.98`), spring duration 0.15s.
  - Hover state: Ambient lift with soft diffused tinted shadow (`box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.2)`).
  - Banned: No high-saturation neon outer drop-shadows. No custom non-standard cursor pointers.

### 4.2 Cards & Double-Bezel Containers

- **DoubleBezelCard:** Signature Hudbird container styling. Composed of an outer 1px border (`rgba(255, 255, 255, 0.08)`), an inner surface fill (`#0F172A` / `#FFFFFF`), and an interior 1px highlight perimeter (`rgba(255, 255, 255, 0.04)`), creating tangible bevel depth without heavy shadows.
- **Corner Roundness:** Generous `1.25rem` (20px) to `1.75rem` (28px).
- **Elevation & Shadow:** Zero heavy drop shadows. Layering is conveyed through subtle tone shifts and translucent borders.

### 4.3 Form Inputs & Controls

- **Structure:** Label positioned strictly above the input (`text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5`).
- **Input Field:** Solid background (`rgba(255,255,255,0.03)` dark / `#FFFFFF` light), 1px Whisper Border.
- **Focus State:** 2px ring in Electric Indigo (`#4F46E5`) with zero pixel blur offset. No floating animated placeholders.
- **Validation:** Inline warning/error message rendered immediately below the input field with accompanying status icon.

### 4.4 Skeletons & Empty States

- **Skeletal Loaders:** Geometric shimmer masks reflecting the exact layout and aspect ratio of destination components. Never use generic circular spinners for content cards.
- **Empty States:** Composed architectural blueprints with contextual actionable primary buttons, not isolated "No data found" text strings.

---

## 5. Layout Principles

- **Asymmetric Hero Section:**
  - Split-screen narrative with left-aligned typographic hierarchy (60% column width) and live interactive kinetic sandbox on the right (40% column width).
  - Banned: Centered hero titles with dual identical "Get Started / Learn More" buttons.
- **Bento Grid Architecture:**
  - Fluid asymmetric compositions (e.g. 8-column primary card accompanied by 4-column auxiliary telemetry widget).
  - The generic "3 equal cards horizontally" feature row is strictly BANNED.
- **Max-Width Containment:**
  - All public pages constrained to `max-w-7xl` (1280px) or `max-w-[1400px]` with auto horizontal margins (`mx-auto`).
  - Generous horizontal gutter padding (`px-4 sm:px-6 lg:px-8`).
- **Safe Viewport Heights:**
  - Full-height sections must use `min-h-[100dvh]` to eliminate iOS Safari viewport jumps. Never use `h-screen`.

---

## 6. Motion & Kinetic Interaction (Stitch Generation Guidance)

- **Spring Physics Baseline:**
  - Default spring config: `type: "spring", stiffness: 100, damping: 20, mass: 1`.
  - Snappy UI toggles: `stiffness: 300, damping: 30`.
  - Continuous kinetic drag: `stiffness: 400, damping: 25`.
- **Waterfall Orchestration:**
  - Lists and card grids must enter through staggered cascades (`staggerChildren: 0.06`, delay `0.05s`).
  - Motion elements reveal upwards by `y: 12px` to `y: 0px` while transitioning opacity from `0` to `1`.
- **Perpetual Micro-Interactions:**
  - Floating telemetry pills: Subtle infinite hover loop (`y: [0, -4, 0]`, ease `easeInOut`, duration 4s).
  - Live status nodes: Subtle 2-second ambient pulse ring (`scale: [1, 1.4, 1]`, `opacity: [0.8, 0, 0.8]`).
- **Performance Rules:**
  - Animations must animate **only** `transform` (`x`, `y`, `scale`, `rotate`) and `opacity`.
  - Never animate layout triggers: `height`, `width`, `margin`, `top`, or `padding`.

---

## 7. Anti-Patterns (Banned AI Clichés)

To preserve human agency and elite design execution, the following patterns are explicitly forbidden across all Hudbird implementations:

1. ❌ **No Emojis in Production UI:** Never use emojis (🚀, 💡, 🔥, ✨) in button labels, navbar items, or feature headlines. Use geometric Lucide SVG icons instead.
2. ❌ **No Pure Black Backgrounds:** Absolute `#000000` is banned. Use Deep Void Slate (`#090D16`) or Zinc-950 (`#09090B`).
3. ❌ **No AI Neon Glows:** Over-saturated purple/magenta blur spheres and cyan radial under-glows behind cards are banned.
4. ❌ **No 3-Equal Cards Feature Rows:** Generic 3-card horizontal rows are banned. Use asymmetric bento grids or alternating 2-column layouts.
5. ❌ **No Over-Saturated Accents:** Accent saturation must remain under 80%.
6. ❌ **No `Inter` as Brand Identity:** Inter is banned as the primary display heading typeface.
7. ❌ **No AI Copywriting Clichés:** Banned words: _"Elevate"_, _"Seamless"_, _"Unleash"_, _"Supercharge"_, _"Next-Gen"_, _"Empower"_. Write direct, concrete technical explanations.
8. ❌ **No Generic Placeholder Names:** Never use _"John Doe"_, _"Acme Corp"_, or _"Company Inc"_. Use realistic personas and specific technical domains.
9. ❌ **No Filler UI Prompts:** Never add _"Scroll to explore"_, _"Swipe down"_, or animated bouncing down chevrons.
10. ❌ **No Layout Shifts on Mobile:** Multi-column grids must cleanly collapse to a single column below `768px` with zero horizontal overflow.
