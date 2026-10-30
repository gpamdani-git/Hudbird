---
name: Hudbird UI Kinetic (Stitch Editorial Standard)
colors:
  surface: "#161618"
  surface-dim: "#111113"
  surface-bright: "#202124"
  surface-container-lowest: "#161618"
  surface-container-low: "#1c1c1f"
  surface-container: "#242428"
  surface-container-high: "#2c2c31"
  surface-container-highest: "#38383e"
  on-surface: "#ffffff"
  on-surface-variant: "#828282"
  inverse-surface: "#ffffff"
  inverse-on-surface: "#161618"
  outline: "#2e2f33"
  outline-variant: "#3e3f44"
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
  background: "#161618"
  on-background: "#ffffff"
  surface-variant: "#202124"
typography:
  display-lg:
    fontFamily: Outfit, sans-serif
    fontSize: 72px
    fontWeight: "500"
    lineHeight: 86.4px
    letterSpacing: -1.8px
  headline-md:
    fontFamily: Outfit, sans-serif
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
    letterSpacing: -0.3px
  body-base:
    fontFamily: Plus Jakarta Sans, sans-serif
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 27.2px
    letterSpacing: -0.16px
  body-bold:
    fontFamily: Plus Jakarta Sans, sans-serif
    fontSize: 16px
    fontWeight: "600"
    lineHeight: 27.2px
    letterSpacing: -0.16px
  label-caps:
    fontFamily: Plus Jakarta Sans, sans-serif
    fontSize: 14px
    fontWeight: "800"
    lineHeight: 20px
    letterSpacing: 1.4px
  code-mono:
    fontFamily: JetBrains Mono, monospace
    fontSize: 13.6px
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

# Design System: Hudbird UI (Stitch Editorial Standard)

**Project ID:** `projects/hudbird-ui-kinetic`

---

## 1. Visual Theme & Atmosphere

A restrained, high-agency editorial interface directly calibrated from the Google Stitch official documentation system (`stitch.withgoogle.com`). Combines architectural editorial calm, extreme typographic control, deep charcoal canvas surfaces, and physical kinetic micro-motion.

- **Density Spectrum (4/10 — Gallery Airy & Editorial Calm):** Generous breathing room, isolated reading channels, uncrowded margins, and strict visual pacing.
- **Variance Spectrum (8/10 — Offset Asymmetric):** Rejects uniform 3-card templates. Favors asymmetric editorial split layouts, 5-to-7 column bento compositions, staggered narrative blocks, and dynamic optical balancing.
- **Motion Spectrum (8/10 — Cinematic Kinetic Physics):** Powered by hardware-accelerated spring dynamics (`stiffness: 100, damping: 20`). Interactive surfaces react with tactile magnetic pull, tactile depression, and perpetual micro-interaction states.

---

## 2. Color Palette & Roles

Hudbird UI uses a carefully calibrated OKLCH & Hex palette constrained below 80% saturation. Pure black (`#000000`) and oversaturated "AI neon glows" are strictly prohibited.

### 2.1 Neutral Base & Surfaces (Google Stitch Dark Canvas)

- **Obsidian Charcoal** (`#161618`) — Primary background canvas in dark mode (derived directly from Stitch docs computed style `rgb(22, 22, 24)`). Soft, deep neutral eliminating OLED clipping. Never pure `#000000`.
- **Elevated Surface** (`#202124`) — Cards, floating pill search bars, sidebars, headers, and modal dialogs.
- **Border & Divider** (`#2E2F33`) — 1px hairline container borders and section dividing rules.
- **Primary Text** (`#FFFFFF`) — High-contrast display headlines and section titles.
- **Editorial Prose** (`#E5E5E5`) — High-legibility body paragraph text (`rgb(229, 229, 229)`).
- **Muted Subtitle & Metadata** (`#828282`) — Subtitles, section numbers, keyboard shortcut glyphs, and secondary captions (`rgb(130, 130, 130)`).
- **Canvas Light (Alternative Mode)** (`#F9FAFB`) — Clean, warm off-white surface for light mode canvas.

### 2.2 Brand & Kinetic Accents

- **Electric Indigo** (`#4F46E5` / `#6366F1`) — Primary signature brand color for Hudbird UI. Applied to category eyebrow tags, primary call-to-actions, active tab indicators, and keyboard focus rings.
- **Kinetic Cyan** (`#06B6D4`) — Secondary kinetic brand accent. Used for velocity indicators, micro-badges, and real-time state badges.
- **Emerald Vitality** (`#10B981`) — Semantic success state, operational indicators, verified badges, and positive metric deltas.
- **Amber Warning** (`#F59E0B`) — Semantic caution state, pending queues, rate limit warnings, and non-blocking notifications.
- **Rose Danger** (`#F43F5E`) — Destructive actions, validation error outlines, network disconnection indicators, and high-urgency alerts.

---

## 3. Typography Architecture & Micro-Spacing (Editorial Standard)

Every element in the typographic hierarchy is calibrated with exact optical tracking, line-height ratios, and paragraph pacing to achieve signature editorial elegance.

### 3.1 Category Eyebrow Tag (`label-caps`)

- **Role:** Chapter / Category anchor (e.g., `ESSENTIALS`, `GETTING STARTED`).
- **Font:** `Plus Jakarta Sans` or `Google Sans Text`
- **Size:** `14px` (`0.875rem`)
- **Weight:** `800` (Ultra-Bold)
- **Line-Height:** `20px` (`leading-5`)
- **Tracking (Letter-Spacing):** `+1.4px` (`+0.1em` / `tracking-widest` uppercase).
- **Color:** Electric Indigo (`#6366F1` / `#818CF8` in dark mode, `#4F46E5` in light mode).
- **Bottom Spacing:** Strictly `16px` padding below the tag before the main title.

### 3.2 Display Hero Title (`display-lg` / `h1`)

- **Role:** Primary page title.
- **Font:** `Outfit` or `Google Sans Display`, sans-serif
- **Size:** `72px` (`4.5rem` / `clamp(2.5rem, 5.5vw, 4.5rem)`)
- **Weight:** `500` (Medium weight — creates refined elegance instead of heavy shouting bold).
- **Line-Height:** `86.4px` (`1.2` ratio / `leading-[1.2]`).
- **Tracking (Letter-Spacing):** `-1.8px` (`-0.025em` / `tracking-tight`). Closes loose gaps between large glyphs.
- **Word-Spacing:** `0px` (optical tracking prevents uneven word drift).
- **Color:** `#FFFFFF` (`rgb(255, 255, 255)`).
- **Desktop Wrap Rule:** Never wrap beyond 3 lines on desktop viewports.

### 3.3 Lead Subtitle (`subtitle`)

- **Role:** Contextual summary under the main title.
- **Font:** `Plus Jakarta Sans` or `Google Sans Text`, sans-serif
- **Size:** `20px` (`1.25rem` / `text-xl`)
- **Weight:** `400` (Regular)
- **Line-Height:** `32.5px` (`1.625` ratio / `leading-relaxed`).
- **Tracking:** `normal` (`0px`).
- **Color:** Muted Neutral (`#828282` / `rgb(130, 130, 130)`).
- **Max-Width:** Strictly constrained to `768px` (`max-w-3xl`) for optimal sentence scanability.
- **Spacing:** `8px` top padding from H1, followed by `48px` to `64px` bottom whitespace before content sections.

### 3.4 Content Headings (`headline-md` / `h2` & `h3`)

- **Section Heading (`h2`):**
  - Size: `24px` (`1.5rem`), Weight: `600` (Semi-Bold), Line-Height: `32px` (`1.33` ratio), Tracking: `-0.3px` (`-0.015em`).
  - Spacing: `48px` margin-top (`mt-12`), `16px` margin-bottom (`mb-4`).
- **Sub-Section Heading (`h3`):**
  - Size: `20px` (`1.25rem`), Weight: `500` (Medium), Line-Height: `28px` (`1.4` ratio), Tracking: `-0.3px`.
  - Spacing: `32px` margin-top (`mt-8`), `12px` margin-bottom (`mb-3`).

### 3.5 Editorial Body Paragraphs (`body-base` / `p`)

- **Role:** Standard explanatory documentation prose.
- **Font:** `Plus Jakarta Sans` (or `Geist Sans`), sans-serif
- **Size:** `16px` (`1rem`)
- **Weight:** `400` (Regular)
- **Line-Height:** `27.2px` (`1.7` ratio / `leading-[1.7]`). Generous vertical line clearance eliminates line colliding.
- **Tracking (Letter-Spacing):** `-0.16px` (`-0.01em`). Tightens word flow slightly for effortless horizontal eye sweeps.
- **Paragraph Margin-Bottom:** `24px` (`mb-6`). Provides clean breathing space between thoughts.
- **Color:** Soft Off-White (`#E5E5E5` / `rgb(229, 229, 229)`).
- **Line-Length Limit:** Maximum 65 characters per line (`max-w-[65ch]`).

### 3.6 Precision Monospace & Inline Code (`code-mono`)

- **Font:** `JetBrains Mono` or `Google Sans Mono`, monospace
- **Size:** `13.6px` (`0.85rem`)
- **Weight:** `500` (Medium)
- **Background:** Charcoal Badge (`#323232` / `rgb(50, 50, 50)`).
- **Padding:** `1px 5px` (`py-0.5 px-1.5`).
- **Radius:** `4px` (`rounded`).
- **Tracking:** `-0.01em`.

---

## 4. Component Stylings

### 4.1 Buttons & Interactive Controls (Derived from packages/core/src/components/Button)

The Button architecture is governed by strict tactile feedback and explicit geometric tokens extracted directly from `Button.tsx` and `KineticButton.tsx`:

- **Variants Architecture:**
  - **Solid (`variant="solid"`):** Solid opaque background with crisp contrast text (`text-primary-foreground`), high-agency active press feedback, and micro-elevation (`shadow-xs`).
  - **Bordered (`variant="bordered"`):** Transparent background framed by a structured 2px high-contrast stroke (`border-2`).
  - **Flat & Soft (`variant="flat" | "soft"`):** Borderless container with translucent tint fill for secondary actions.
  - **Outline (`variant="outline"`):** Hairline 1px border (`border-zinc-950/10` light / `border-white/15` dark) with gentle hover wash.
  - **Light & Ghost (`variant="light" | "ghost"`):** Borderless text button with surface-tinted hover state (`hover:bg-zinc-100` / `hover:bg-zinc-800`).
  - **Plain (`variant="plain"`):** Zero background or border, used exclusively for inline links or tertiary triggers.
- **Dimensional Scales & Touch Targets:**
  - **Small (`size="sm"`):** Height `32px` (`h-8`), horizontal padding `12px` (`px-3`), font size `12px` (`text-xs`), icon gap `6px` (`gap-1.5`).
  - **Medium (`size="md"`):** Height `36px` (`h-9`), horizontal padding `16px` (`px-4`), font size `14px` (`text-sm`), icon gap `8px` (`gap-2`). Default standard control.
  - **Large (`size="lg"`):** Height `44px` (`h-11`), horizontal padding `20px` (`px-5`), font size `16px` (`text-base`), icon gap `10px` (`gap-2.5`). Satisfies mobile accessibility target.
- **Corner Radius Mapping:**
  - **Sharp (`radius="none"`):** Squared edges (`0px` / `rounded-none`).
  - **Medium (`radius="md"`):** Generously rounded (`12px` / `rounded-xl`).
  - **Large (`radius="lg"`):** Fluid organic corners (`16px` / `rounded-2xl`).
  - **Full Capsule (`radius="full"`):** Pill shape (`9999px` / `rounded-full`) with optical compensation padding (`px-3.5` for sm, `px-5` for md, `px-6` for lg).
- **Icon-Only Precision (`isIconOnly={true}`):**
  - Strictly locked to 1:1 square aspect ratios (`w-8 h-8`, `w-9 h-9`, `w-11 h-11`) with zero horizontal padding (`p-0`).
- **Tactile Micro-Interactions & Focus:**
  - Active state: Tactile `-2%` scale compression (`active:scale-[0.98]`) with `200ms` duration.
  - Focus state: `2px` focus ring with `2px` offset (`focus-visible:ring-2 focus-visible:ring-offset-2`).
  - Kinetic spring easing: `ease-[cubic-bezier(0.16,1,0.3,1)]` for smooth physical velocity.
- **Enforced Restrictions:**
  - Banned: High-saturation neon outer drop-shadows and non-standard cursor pointers.

### 4.2 Cards & Double-Bezel Containers

- **DoubleBezelCard:** Signature Hudbird container styling. Composed of an outer 1px border (`rgba(255, 255, 255, 0.08)`), an inner surface fill (`#161618` / `#202124`), and an interior 1px highlight perimeter (`rgba(255, 255, 255, 0.04)`), creating tangible bevel depth without heavy shadows.
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

## 5. Layout Principles & Spatial Whitespace Strategy

Google Stitch achieves its premium feel through uncrowded, deliberate spatial rhythms:

- **Vertical Section Rhythm (Whitespace Strategy):**
  - Section-to-section gap: `clamp(3.5rem, 7vw, 6rem)` (`56px` to `96px`). Gives users breathing room between key conceptual shifts.
  - Title-to-Content gap: `48px` (`mt-12`).
  - Paragraph-to-Paragraph gap: `24px` (`mb-6`).
  - Headline-to-Paragraph gap: `16px` (`mb-4`).
- **Channel Containment:**
  - Prose reading channel: Capped at `768px` (`max-w-3xl`) or `65ch` to prevent eye fatigue.
  - Full layout canvas: Constrained to `1280px` (`max-w-7xl`) or `1440px` centered with auto margins (`mx-auto`).
  - Outer page gutter padding: `px-6 sm:px-8 lg:px-12`.
- **Sidebar & On-This-Page TOC Rails:**
  - Left Navigation: `280px` fixed width with pill-shaped active state containers (`rounded-full` or `rounded-xl`).
  - Right TOC Rail: `220px` sticky column with `14px` font size and subtle `8px` item gaps.
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
2. ❌ **No Pure Black Backgrounds:** Absolute `#000000` is banned. Use Obsidian Charcoal (`#161618`) or Deep Void Slate (`#090D16`).
3. ❌ **No AI Neon Glows:** Over-saturated purple/magenta blur spheres and cyan radial under-glows behind cards are banned.
4. ❌ **No 3-Equal Cards Feature Rows:** Generic 3-card horizontal rows are banned. Use asymmetric bento grids or alternating 2-column layouts.
5. ❌ **No Over-Saturated Accents:** Accent saturation must remain under 80%.
6. ❌ **No `Inter` as Brand Identity:** Inter is banned as the primary display heading typeface.
7. ❌ **No AI Copywriting Clichés:** Banned words: _"Elevate"_, _"Seamless"_, _"Unleash"_, _"Supercharge"_, _"Next-Gen"_, _"Empower"_. Write direct, concrete technical explanations.
8. ❌ **No Generic Placeholder Names:** Never use _"John Doe"_, _"Acme Corp"_, or _"Company Inc"_. Use realistic personas and specific technical domains.
9. ❌ **No Filler UI Prompts:** Never add _"Scroll to explore"_, _"Swipe down"_, or animated bouncing down chevrons.
10. ❌ **No Layout Shifts on Mobile:** Multi-column grids must cleanly collapse to a single column below `768px` with zero horizontal overflow.
