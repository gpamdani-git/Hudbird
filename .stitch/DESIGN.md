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
- **Size:** `13px` (`0.8125rem`)
- **Weight:** `800` (Ultra-Bold)
- **Line-Height:** `18px`
- **Tracking (Letter-Spacing):** `+1.6px` (`tracking-widest` uppercase).
- **Color:** Electric Indigo (`#6366F1` / `#818CF8` in dark mode, `#4F46E5` in light mode).
- **Bottom Spacing (Law of Proximity):** Strictly `24px` to `32px` (`mb-6 sm:mb-8`) breathing room above the main title.

### 3.2 Display Hero Title (`display-lg` / `h1`)

- **Role:** Primary page title.
- **Font:** `Outfit` or `Google Sans Display`, sans-serif
- **Size:** `clamp(2.75rem, 6vw, 4.5rem)` (`44px` mobile, `64px - 72px` desktop).
- **Weight:** Strictly `500` (`font-medium` — creates majestic editorial calm; NEVER chunky bold `700`).
- **Line-Height:** `1.12` (`leading-[1.12]`).
- **Tracking (Letter-Spacing):** `-1.8px` to `-2.2px` (tight optical kerning closing loose gaps between glyphs).
- **Word-Spacing:** `0px`.
- **Color:** `#FFFFFF` (`rgb(255, 255, 255)`).
- **Bottom Spacing:** Strictly `28px` to `36px` (`mb-7 sm:mb-9`) before the subtitle.
- **Desktop Wrap Rule:** Never wrap beyond 3 lines on desktop viewports.

### 3.3 Lead Subtitle (`subtitle`)

- **Role:** Contextual summary under the main title.
- **Font:** `Plus Jakarta Sans` or `Google Sans Text`, sans-serif
- **Size:** `20px` to `24px` (`text-xl sm:text-2xl`)
- **Weight:** `400` (`font-normal`)
- **Line-Height:** `36px` to `38.4px` (`1.6` ratio).
- **Tracking:** `-0.16px`.
- **Color:** Muted Neutral (`#828282` / `rgb(130, 130, 130)`).
- **Max-Width:** Strictly constrained to `768px` (`max-w-3xl`) for effortless sentence scanability.
- **Bottom Spacing (Header-to-Content Isolation):** Strictly `80px` to `112px` (`mb-20 sm:mb-28`) monumental whitespace before content sections.

### 3.4 Content Headings (`headline-md` / `h2` & `h3`)

- **Section Heading (`h2`):**
  - **Size:** `32px` to `36px` (`2rem` - `2.25rem` / `text-3xl sm:text-4xl`).
  - **Weight:** `500` (`font-medium` — refined editorial weight matching Google Stitch).
  - **Line-Height:** `1.22` (`leading-tight`).
  - **Tracking:** `-0.8px` (`-0.02em`).
  - **Color:** `#FFFFFF` (`rgb(255, 255, 255)`).
  - **Top Spacing (Section-to-Section Gap):** Strictly `80px` to `128px` (`mt-20 sm:mt-32` / `space-y-24 sm:space-y-32`).
  - **Bottom Spacing to Prose:** Strictly `24px` to `32px` (`mb-6 sm:mb-8`).
  - **Anti-Slop Rule:** Strictly NO colorful rounded icon badge squares next to headings. Headings stand with pure typographic authority.
- **Sub-Section Heading (`h3`):**
  - **Size:** `22px` to `24px` (`text-xl sm:text-2xl`), Weight: `500` (`font-medium`), Line-Height: `1.33`, Tracking: `-0.4px`.
  - **Top Spacing:** `48px` to `64px` (`mt-12 sm:mt-16`), Bottom Spacing: `16px` to `20px` (`mb-4 sm:mb-5`).

### 3.5 Editorial Body Paragraphs (`body-base` / `p`)

- **Role:** Standard explanatory documentation prose.
- **Font:** `Plus Jakarta Sans` (or `Geist Sans`), sans-serif
- **Size:** `17px` to `18px` (`text-[17px] sm:text-lg`).
- **Weight:** `400` (`font-normal`).
- **Line-Height:** `29.75px` to `31.5px` (`1.75` ratio / `leading-[1.75]`). Generous vertical clearance.
- **Tracking (Letter-Spacing):** `-0.16px` (`-0.01em`).
- **Concept Lead Anchor:** Begin key sentences with bold lead concepts (e.g. `<strong>Step 1.</strong>`, `<strong>Ideate.</strong>`).
- **Paragraph Spacing:** Strictly `28px` to `36px` (`mb-7 sm:mb-9`) before codeblocks or next blocks.
- **Color:** Soft Off-White (`#E5E5E5` / `rgb(229, 229, 229)`).
- **Line-Length Limit:** Maximum 65 characters per line (`max-w-[65ch]`).

### 3.6 Precision Monospace & Inline Code (`code-mono`)

- **Font:** `JetBrains Mono` or `Google Sans Mono`, monospace
- **Size:** `13.6px` (`0.85rem`)
- **Weight:** `500` (Medium)
- **Background:** Charcoal Badge (`#323232` / `rgb(50, 50, 50)`).
- **Padding:** `2px 6px` (`py-0.5 px-1.5`).
- **Radius:** `6px` (`rounded-md`).
- **CodeBlock Margins:** `my-8 sm:my-10` (`32px` to `40px` vertical clearance). Internal block padding `p-6 sm:p-8`.
- **Tracking:** `-0.01em`.

---

## 4. Component Stylings

### 4.1 Buttons & Interactive Controls (Cognitive-Ergonomic & Gestalt Standard)

The Button architecture is governed by strict visual perception science, Gestalt psychology, Fitts's Law ergonomics, tactile feedback, and explicit geometric tokens extracted directly from `hudbird-skill-ui.md` and `Button.tsx`:

- **Safe Editing Mandate (No Full Rewrite):**
  - All modifications to button primitives must be strictly **surgical**.
  - Mass replacements are prohibited; working logic, 20+ color tokens, Radix Slot delegation (`asChild`), anchor link handling (`href`), and full ARIA compatibility must be preserved without exception.

- **Cognitive Foundations & Spacing Theories:**
  - **Teori Persepsi Anisotropik (_Anisotropic Vision_):** Human vision perceives vertical differences with far higher sensitivity than horizontal differences. To prevent buttons from appearing cramped or compressed at the sides, **horizontal padding ($X$) must always exceed vertical padding ($Y$) with an optical ratio between 1.5 : 1 and 2 : 1**.
  - **Teori Gestalt (_Law of Common Region_ & _Figure-Ground_):** The button perimeter functions as the container (_ground_), while internal typography and icons represent the foreground (_figure_). Generous white space prevents cognitive crowding (_perceptual clutter_).
  - **Hukum Kedekatan (_Law of Proximity_):** The internal gap between icon and text must be **significantly smaller than the outer padding** (ratio of at least 1 : 2.5) so that the icon and label fuse into a singular interactive unit.
  - **Hukum Fitts (_Fitts’s Law_) & Touch Ergonomics:** Standard buttons provide a minimum 40px – 44px target, while large buttons provide a 48px – 56px spacious target, drastically minimizing touch/click acquisition errors.

- **Variants Architecture:**
  - **Solid (`variant="solid"`):** Solid opaque background with crisp contrast text (`text-primary-foreground`), high-agency active press feedback, and micro-elevation (`shadow-xs`).
  - **Bordered (`variant="bordered"`):** Transparent background framed by a structured 2px stroke (`border-2`).
  - **Flat & Soft (`variant="flat" | "soft"`):** Borderless container with translucent tint fill for secondary actions.
  - **Outline (`variant="outline"`):** Hairline 1px border (`border-zinc-950/10` light / `border-white/15` dark) with gentle hover wash.
  - **Light & Ghost (`variant="light" | "ghost"`):** Borderless text button with surface-tinted hover state (`hover:bg-zinc-100` / `hover:bg-zinc-800`).
  - **Plain (`variant="plain"`):** Zero background or border, used exclusively for inline links or tertiary triggers.

- **8-Point Spatial Grid Dimensions & Touch Targets (Spacious Maximum):**
  - **Small (`size="sm"`):** Height `36px` (`h-9`), horizontal padding `16px` (`px-4`), font size `12px` (`text-xs`), icon gap `6px` (`gap-1.5`).
  - **Medium (`size="md"`):** Height `44px` (`h-11`), horizontal padding `24px` (`px-6`), font size `14px` (`text-sm`), icon gap `8px` (`gap-2`). Apple HIG standard 44px touch target with ideal 2:1 anisotropic ratio.
  - **Large (`size="lg"`):** Height `52px` (`h-13`), horizontal padding `32px` (`px-8`), font size `16px` (`text-base`), icon gap `10px` (`gap-2.5`). Spacious luxury control.
  - **Extra Large (`size="xl"`):** Height `60px` (`h-15`), horizontal padding `40px` (`px-10`), font size `18px` (`text-lg`), icon gap `12px` (`gap-3`). High-conversion hero call-to-action standard.

- **Corner Radius Mapping & Capsule Compensation:**
  - **Sharp (`radius="none"`):** Squared edges (`0px` / `rounded-none`).
  - **Medium (`radius="md"`):** Generously rounded (`12px` / `rounded-xl`).
  - **Large (`radius="lg"`):** Fluid organic corners (`16px` / `rounded-2xl`).
  - **Full Capsule (`radius="full"`):** Pill shape (`9999px` / `rounded-full`) with optical compensation padding: `px-5` (sm), `px-7` (md), `px-9` (lg), `px-11` (xl).

- **Optical Icon Alignment & Fixed Wrappers:**
  - Fixed transparent optical frames: `16×16 px` (`w-4 h-4`) for sm, `20×20 px` (`w-5 h-5`) for md and lg, `24×24 px` (`w-6 h-6`) for xl.
  - Icon-only precision (`isIconOnly={true}`): Locked to 1:1 square aspect ratios (`w-9 h-9`, `w-11 h-11`, `w-13 h-13`, `w-15 h-15`).
  - Banned: Manual margins (`ml-1.5`, `mr-1.5`) when flex `gap` is active.

- **Tactile Micro-Interactions & Focus:**
  - Active state: Tactile `-3%` scale compression (`active:scale-[0.97]`) with `150ms` duration.
  - Focus state: `2px` focus ring with `2px` offset (`focus-visible:ring-2 focus-visible:ring-offset-2`).
  - Kinetic spring easing: `ease-[cubic-bezier(0.16,1,0.3,1)]`.

### 4.2 Input & Textarea

- **Standard 44px Touch Baseline:** All primary inputs conform strictly to `h-11` (44px) standard height (`h-9` for compact sm, `h-13` for spacious lg) with minimum Apple HIG 44px touch targets.
- **Anisotropic Input Padding:** Horizontal padding strictly exceeds vertical clearance: `px-4` (16px) for md, `px-3` (12px) for sm, and `px-5` (20px) for lg.
- **Optical Icon Frames:** Fixed `w-5 h-5` bounding wrappers for `startContent` (prefix) and `endContent` (suffix) icons, eliminating layout jitter when icons are present.
- **Obsidian Dark Surfaces:** Dark mode input fields use Obsidian `#161618` canvas with hairline specular borders (`border-black/[0.08] dark:border-white/[0.08]`).
- **Specular Focus Physics:** 2px ring in Electric Indigo (`focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-transparent`) with zero layout shift. Calibrated error states project glowing rose aura (`!border-rose-500/80 !ring-rose-500/20`).
- **Textarea Elevation:** Multi-line textareas enforce a `min-h-[120px]` reading channel with anisotropic padding `py-3 px-4` (12px Y, 16px X) and concentric `rounded-xl` corners.

### 4.3 InputOTP (One-Time Password)

- **Discrete Cell Geometry:** Individual slot cells conform to `w-11 h-12` (44px × 48px) with concentric `rounded-xl` corners and centered tabular-nums typography (`text-lg font-semibold`).
- **Gestalt Law of Proximity:** Cell gaps strictly set to `gap-2` to `gap-3`; group separators (dots or dashes) are framed with optical vertical center alignment.
- **Active Focus Ring:** Active slot displays a vibrant specular border and glow without any dimensional displacement.
- **Obsidian Dark Fill:** Cell backgrounds use Obsidian `#161618` with hairline specular borders (`border-black/[0.08] dark:border-white/[0.08]`).

### 4.4 Switch & Checkbox

- **Switch Fluid Physics:** Apple iOS fluid track `w-11 h-6` (44px × 24px) paired with a concentric sliding thumb `w-5 h-5` (20px) on a 2px track inset. Spring physics `ease-[cubic-bezier(0.16,1,0.3,1)]`.
- **Checkbox Geometry:** `w-5 h-5` (20px × 20px) control box with concentric `rounded-md` (6px) corners. Centered optical checkmark with micro-scale spring entrance (`scale: [0, 1]`).
- **Ergonomic Touch Targets:** Outer interactive hit area padded to minimum `44px × 44px` via transparent flex wrapper or pseudo-elements to comply with Fitts's Law.
- **Dark Mode Fill:** Inactive track/box uses Obsidian `#202124` with hairline specular border; active state illuminates in vibrant primary accent.

### 4.5 RadioGroup & Radio

- **Radio Disc Anatomy:** Outer ring `w-5 h-5` (20px) with concentric inner indicator dot `w-2.5 h-2.5` (10px).
- **Obsidian Base:** Inactive state utilizes Obsidian `#161618` with hairline specular border. Active indicator expands smoothly via spring animation.
- **Gestalt Proximity Spacing:** Internal distance between radio indicator and text label is locked to `gap-3` (12px), while list rows maintain `space-y-3` (12px) separation.

### 4.6 Slider

- **Micro-Groove Track:** Subtle optical bevel groove track `h-2 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] dark:bg-[#202124]`.
- **Active Progress Fill:** Vibrant primary gradient fill indicating current value smoothly across the track.
- **Tactile Thumb Disc:** Tactile specular disc `w-5 h-5` (20px) with `shadow-md border border-white/20`. Grab feedback expands thumb by 25% (`active:scale-125`) for tactile confirmation.

### 4.7 Select

- **Trigger Baseline:** Conforms strictly to `h-11` (44px) Apple HIG touch target with anisotropic padding `px-4` and fixed `w-5 h-5` Chevron frame.
- **Apple Frosted Glass Popover:** Dropdown list floats in `backdrop-blur-2xl bg-white/95 dark:bg-[#161618]/95 border border-black/[0.08] dark:border-white/[0.08] shadow-2xl rounded-2xl p-1.5`.
- **Option Hierarchy:** Items feature anisotropic padding `py-2.5 px-3.5`, concentric `rounded-xl`, specular hover highlight, and optical checkmark placement.

### 4.8 ComboBox (Autocomplete Search & Select)

- **Search-Enabled Trigger:** 44px height baseline with integrated search input and fixed `w-5 h-5` magnifying glass icon.
- **Floating Panel:** Frosted floating Obsidian panel with keyboard up/down focus highlight and instant zero-latency filtering.
- **Empty & Loading States:** Dedicated micro-copy with comfortable anisotropic padding `py-4 px-3`.

### 4.9 Calendar & DatePicker

- **Container Architecture:** Obsidian `#161618` card surface with hairline specular border and `rounded-2xl` corners.
- **Touch Navigation Chevrons:** Minimum 40px touch navigation targets for previous/next month triggers with optical center compensation.
- **Day Cell Targets:** Minimum `w-10 h-10` (40px × 40px) date cells with concentric `rounded-xl` hover wells.
- **Range Selection Pill:** Apple fluid capsule pill highlight spanning selected date clusters with seamless boundary radiuses.

### 4.10 Card & DoubleBezelCard

- **Signature Double Bezel:** Composed of an outer 1px hairline border (`border-black/[0.08] dark:border-white/[0.08]`), inner surface fill (`#161618` / `#202124`), and interior 1px highlight perimeter, creating tangible bevel depth without heavy shadows.
- **Concentric Radii Formula:**
  $$R_{\text{inner}} = R_{\text{outer}} - \text{padding}$$
  Outer cards: `rounded-2xl` (20px) or `rounded-3xl` (24px) paired with nested items `rounded-xl` (12px).
- **Anisotropic Card Padding:** Vertical `py-5 sm:py-6` (20px–24px) paired with horizontal `px-6 sm:px-8` (24px–32px) for expansive, relaxed reading channels.

### 4.11 Fieldset & Form

- **Section Spacing:** Generous whitespace rhythm `space-y-6 sm:space-y-8` (24px–32px) between logical form groups.
- **Field Spacing:** Consistent `space-y-5 sm:space-y-6` between individual input rows to prevent visual crowding.
- **Legend Hierarchy:** Clean uppercase typography with tracking `tracking-wider text-xs font-semibold text-zinc-400`.

### 4.12 DescriptionList

- **Apple System Preferences Layout:** Alternating or hairline-divided rows with minimum `44px` vertical clearance.
- **Anisotropic Cell Padding:** `py-3.5 px-4` (14px Y, 16px X).
- **Key-Value Balance:** Balanced grid layout (35% label / 65% value) for clear reading scans.

### 4.13 Dialog (Modal)

- **Backdrop Diffusion:** Heavy ambient blur `backdrop-blur-md bg-black/60`.
- **Frosted Modal Surface:** `backdrop-blur-2xl bg-white/95 dark:bg-[#161618]/95 border border-black/[0.08] dark:border-white/[0.08] shadow-2xl rounded-2xl`.
- **Concentric Inner Padding:** `p-6 sm:p-8` providing ample cognitive separation.
- **Tactile Close Trigger:** Fixed in `w-8 h-8` optical frame with tactile press feedback `active:scale-90`.

### 4.14 Sheet (Drawer / Slide-Over)

- **Kinetic Slide Transition:** Fluid spring slide-in from screen edge `ease-[cubic-bezier(0.16,1,0.3,1)]`.
- **Frosted Obsidian Canvas:** Full-height panel with hairline specular boundary border and deep diffused shadow.
- **Spacious Content Padding:** `p-6 sm:p-8` with dedicated header and footer action bars.

### 4.15 Dropdown (DropdownMenu)

- **Frosted Glass Floating Menu:** `backdrop-blur-2xl bg-white/95 dark:bg-[#161618]/95 border border-black/[0.08] dark:border-white/[0.08] shadow-xl rounded-2xl p-1.5`.
- **Anisotropic Item Padding:** `py-2.5 px-3.5` (10px Y, 14px X) with concentric `rounded-xl`.
- **Micro-Press Feedback:** `hover:bg-zinc-100 dark:hover:bg-[#202124] active:scale-[0.98]`.
- **Hairline Separators:** `h-px bg-zinc-200 dark:bg-white/[0.06] my-1.5`.

### 4.16 Popover

- **Floating Inset Surface:** Anchored to trigger element, padded with `p-4 sm:p-5`, featuring hairline specular border and diffused shadow.

### 4.17 Command (Palette / Spotlight Search)

- **Command Dialog Frame:** `max-w-2xl w-full backdrop-blur-2xl bg-white/95 dark:bg-[#161618]/95 rounded-2xl shadow-2xl border border-black/[0.08] dark:border-white/[0.08]`.
- **Search Header:** `h-14 px-4` with fixed `w-5 h-5` search icon and subtle `<Kbd>` Esc badge.
- **Group Labels:** `px-3 py-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider`.
- **Item Ergonomics:** `py-3 px-3.5 rounded-xl` with smooth keyboard arrow highlight.

### 4.18 Tooltip

- **Apple HUD Dark Frosted Capsule:** `backdrop-blur-xl bg-zinc-900/95 dark:bg-[#161618]/95 border border-white/10 text-white dark:text-zinc-100 shadow-xl shadow-black/20`.
- **2:1 Anisotropic Padding:** `py-1.5 px-3` (6px Y, 12px X) with `rounded-lg` (8px).

### 4.19 Alert

- **Prohibition of Heavy Borders:** Raw `border-2` is strictly prohibited.
- **Specular Hairline & Translucent Fill:** Hairline border `border border-black/[0.08] dark:border-white/[0.08]` with calibrated translucent status tint.
- **Anisotropic Container Padding:** `py-4 px-5` (16px Y, 20px X).
- **Non-Shrinking Icon Frame:** Fixed `w-5 h-5 shrink-0 mt-0.5` wrapper ensuring icon geometry never distorts.
- **Tactile Close Trigger:** `w-7 h-7 rounded-lg active:scale-90`.

### 4.20 Toast & Toaster

- **Apple Dynamic Island Floating Architecture:** `backdrop-blur-2xl bg-white/95 dark:bg-[#161618]/95 border border-black/[0.08] dark:border-white/[0.08] shadow-2xl rounded-2xl`.
- **Anisotropic Content Padding:** `py-3.5 px-5`.
- **Tactile Action Button:** Compact high-contrast action button with micro-press `active:scale-95`.

### 4.21 Progress

- **Micro-Groove Optical Bevel Track:** `h-2.5 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)] dark:bg-[#202124]`.
- **Smooth Kinetic Indicator:** Fluid spring physics `duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]` without abrupt step jumps.

### 4.22 Skeleton

- **Obsidian Shimmer Base:** Obsidian base `#1a1a1c` with animated shimmer wave linear gradient `from-transparent via-white/10 to-transparent`.
- **Shape Fidelity:** Geometric mirrors of exact component shapes (no generic circles for cards or tables).

### 4.23 Heading & Display Typography

- **Negative Tracking Kerning:** Negative kerning `-0.8px` to `-1.8px` (`tracking-tight` to `tracking-tighter`) for display titles.
- **Editorial Medium Weight:** Strictly `font-medium` (500) to `font-semibold` (600) — avoiding overly blocky heavy bold.

### 4.24 Text & Micro-Primitives (Kbd, Blockquote, Mark, Code)

- **Prose Breathing Room:** `leading-[1.75]` line-height, capped at `65ch` width.
- **`<Kbd>` Anatomy:** Keycap pill with 3D bottom bevel `border border-b-2 border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[11px] font-mono`.
- **`<Blockquote>` Styling:** Left specular hairline accent `border-l-2 border-primary/60 pl-4 py-1 italic`.
- **`<Mark>` Accent:** High-contrast translucent highlight with rounded edges `px-1 py-0.5 rounded bg-primary/15 text-primary`.

### 4.25 Badge

- **Micro-Capsule Metrics:** Optical letter-spacing (`tracking-wider text-[11px] font-semibold uppercase`).
- **3:1 Anisotropic Padding:** `py-1 px-3` (4px Y, 12px X).
- **Status Dot Frame:** `w-1.5 h-1.5 rounded-full mr-1.5`.

### 4.26 Avatar & AvatarGroup

- **Standard Dimensions:** `sm` (32px), `md` (40px), `lg` (48px), `xl` (56px).
- **Specular Group Rings:** `ring-2 ring-background` in groups with `-space-x-3` overlap.
- **Status Presence Dot:** `w-3 h-3 ring-2 ring-background` positioned in lower-right quadrant.

### 4.27 Table

- **Density Modes:** Compact `py-2.5 px-4`, Normal `py-4 px-6`, Relaxed `py-5 px-8` (anisotropic cell ratio $\ge 1.5:1$).
- **Hairline Row Dividers:** `border-b border-zinc-200 dark:border-white/[0.06]`.
- **Zebra Striping:** Subtle `#1a1a1d` dark fill on alternating rows.
- **Hover Wash:** Specular row wash `hover:bg-zinc-500/5 dark:hover:bg-white/[0.03]`.

### 4.28 Tabs

- **Segmented Control Well:** Inset track `bg-zinc-100 dark:bg-[#161618] p-1 rounded-xl border border-black/[0.05] dark:border-white/[0.05]`.
- **Concentric Active Thumb:** Concentric `rounded-lg bg-white dark:bg-[#28292d] shadow-sm text-foreground` with spring slide layout animation (`layoutId="activeTab"`).
- **Anisotropic Tab Padding:** `py-2 px-4`.

### 4.29 Breadcrumbs

- **Chevron Optical Compensation:** Subtle optical shift `translate-x-[0.5px] text-zinc-400`.
- **Touch Target Channels:** Minimum 40px touch channel on touch screens.

### 4.30 Pagination

- **Page Button Targets:** Conforming to Button tokens `h-10 min-w-10 px-3 text-sm rounded-xl` with minimum 40px touch targets.
- **Active Page Accent:** Solid or frosted highlight well with tactile press feedback.

### 4.31 Accordion

- **Trigger Row Clearance:** `h-13 px-5` (52px minimum touch clearance) with spring rotating chevron `duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`.
- **Panel Anisotropic Padding:** `pt-2 pb-5 px-5`.

### 4.32 Navbar

- **Height Clearance:** `h-16 sm:h-18` (64px–72px).
- **Frosted Glass Header:** `backdrop-blur-xl bg-white/80 dark:bg-[#161618]/80 border-b border-black/[0.08] dark:border-white/[0.08] sticky top-0 z-50`.
- **Channel Padding:** `px-6 sm:px-8 lg:px-12`.

### 4.33 Sidebar & Dock Systems

- **Multi-Position Layout:** Supports `position="left"` (standard rail), `position="right"` (inspector, properties, or AI assistant panel), and `position="bottom"` (macOS-style floating dock).
- **Surface Variants:** `flat` (frosted glass), `bordered` (crisp hairline border), `floating` (inset rounded-3xl floating card), and `dock` (macOS floating capsule with ambient backdrop blur).
- **Navigation Geometry:** 40px–44px height, anisotropic padding `py-2.5 px-4`, concentric `rounded-xl`.
- **Directional Tooltips:** Auto-aligns floating tooltips to the opposite edge: rightwards for left sidebar, leftwards for right sidebar, and upwards for bottom dock.

### 4.34 Divider

- **Stroke Styles:** Supports `solid` (1px hairline), `dashed` (minimalist receipt voucher), `dotted` (precision technical micro-dots), and `gradient` (Apple specular linear fade from transparent to center highlight).
- **Content & Icon Slots:** Central label capsule with optional `icon` slot anchor (`icon={<Sparkles />}`) for elevated section partitioning.
- **Bi-Directional Support:** Native support for both `horizontal` and `vertical` orientations across all 4 stroke variants.

### 4.35 IconBox & HudbirdIcon

- **IconBox Optical Container:** 5 calibrated visual variants (`default`, `brand`, `glass`, `subtle`, `solid`) across 3 geometric scales (`sm`: 36px, `md`: 48px, `lg`: 56px).
- **Specular Backlight Halo:** Optional `showGlow={true}` illuminates a soft ambient blur halo upon hover.
- **HudbirdIcon Primitive:** Standardized SVG vector primitive rendering the signature bird/letter-h geometry at crisp vector viewBox scales (`w-5 h-5` to `w-10 h-10`).

### 4.36 Icons & Lucide React Directory

- **Iconography Standard:** Hudbird UI natively embraces **Lucide React** (ISC License) as its open-source iconography foundation, providing 1,400+ stroke-balanced, clean vector icons.
- **12 Functional Groupings:** Icons are categorized and filtered in-place across 12 practical application domains:
  1. _Navigation & Wayfinding:_ `Home`, `Compass`, `Menu`, `Layers`, `Grid`, `Map`, `Sidebar`, `PanelLeft`.
  2. _Actions & Controls:_ `Plus`, `Trash2`, `Edit3`, `Copy`, `Share2`, `Download`, `Filter`, `SlidersHorizontal`.
  3. _Arrows & Directions:_ `ArrowRight`, `ChevronDown`, `Move`, `Maximize2`, `ArrowUpRight`.
  4. _Communication & Messaging:_ `Mail`, `MessageSquare`, `Send`, `Bell`, `Phone`, `Inbox`.
  5. _Users, Accounts & Security:_ `User`, `Shield`, `Key`, `Fingerprint`, `Lock`, `Unlock`.
  6. _Commerce & Finance:_ `ShoppingCart`, `CreditCard`, `DollarSign`, `Wallet`, `Receipt`.
  7. _Files, Folders & Documents:_ `FileText`, `FolderKanban`, `Archive`, `Paperclip`, `BookOpen`.
  8. _Devices, System & Hardware:_ `Laptop`, `Cpu`, `Database`, `Server`, `Terminal`, `Wifi`.
  9. _Analytics & Data Metrics:_ `BarChart3`, `LineChart`, `Activity`, `TrendingUp`, `Gauge`.
  10. _Status, Alerts & Feedback:_ `CheckCircle2`, `AlertTriangle`, `Info`, `Eye`, `HelpCircle`.
  11. _Media & Multimedia:_ `Play`, `Volume2`, `Camera`, `Video`, `Image`, `Music`.
  12. _Delight, Accents & General:_ `Sparkles`, `Flame`, `Zap`, `Heart`, `Star`, `Award`.
- **Filtering & DX:** Interactive in-place category filtering (no route/hash navigation jumps), real-time cross-category search, 1-click React component snippet copy, and official Lucide React credit attribution.

### 4.37 Section (Macro Spatial Cadence & Viewport Boundary)

- **8-Point Vertical Rhythm:** Enforces calibrated vertical spacing cadences without layout jumps:
  - `spacing="none"`: `py-0`
  - `spacing="xs"`: `py-6 sm:py-8` (24px mobile, 32px desktop)
  - `spacing="sm"`: `py-8 sm:py-12` (32px mobile, 48px desktop)
  - `spacing="md"` (Default): `py-12 sm:py-16 lg:py-20` (48px mobile, 64px tablet, 80px desktop)
  - `spacing="lg"`: `py-16 sm:py-24 lg:py-32` (64px mobile, 96px tablet, 128px desktop monumental breathing room)
  - `spacing="xl"`: `py-20 sm:py-32 lg:py-40` (80px mobile, 128px tablet, 160px desktop)
- **Surfaces:** Monochromatic Obsidian palette (`default`, `muted`, `card`, `inverted`, `obsidian`).
- **Hairline Specular Borders:** `bordered={true | "top" | "bottom" | "both" | false}` applying fine `border-border` division rules.
- **Mobile-Safe Dynamic Viewport:** `fullHeight={true}` strictly applies `min-h-[100dvh]` to eliminate layout shifts (CLS) caused by dynamic browser chrome in iOS Safari and Android Chrome.
- **Polymorphism:** `as="section" | "main" | "article" | "header" | "footer"` for accessible semantic landmarks.

### 4.38 Container (Width Constraints & Miller's Reading Channel)

- **Responsive Size Bounding:**
  - `size="sm"`: `max-w-screen-sm` (640px)
  - `size="md"`: `max-w-screen-md` (768px)
  - `size="prose"`: `max-w-3xl` (Capped at 65ch / 768px for optimal reading cadence eliminating eye-tracking fatigue per Miller's Law)
  - `size="lg"`: `max-w-screen-lg` (1024px)
  - `size="xl"` (Default): `max-w-7xl` (1280px standard canvas)
  - `size="2xl"`: `max-w-[1440px]` (Wide display canvas)
  - `size="fluid"`: `max-w-none` (100% full fluid width)
- **Responsive Anisotropic Gutters:**
  - `gutter="none"`: `px-0`
  - `gutter="sm"`: `px-4` (16px edge buffer)
  - `gutter="md"` (Default): `px-4 sm:px-6 lg:px-8` (16px mobile, 24px tablet, 32px desktop)
  - `gutter="lg"`: `px-6 sm:px-8 lg:px-12` (24px mobile, 32px tablet, 48px desktop monumental Stitch gutters)
- **Centering:** `centered={true}` (`mx-auto`).
- **Polymorphic Landmark Support:** `as="div" | "main" | "article" | "nav" | "header" | "footer"`.

### 4.39 Grid & GridItem (Bento Presets & Google Stitch Staggered Physics)

- **Mobile-First Responsive Tracks:** Multi-column grids must always collapse cleanly to 1 column on mobile viewports:
  - `cols={1}`: `grid-cols-1`
  - `cols={2}`: `grid-cols-1 md:grid-cols-2`
  - `cols={3}`: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
  - `cols={4}`: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
  - `cols={6}`: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-6`
  - `cols="auto-fit"`: `grid-cols-[repeat(auto-fit,minmax(280px,1fr))]`
- **Asymmetric Bento Presets (Anti-Slop):** Banning generic 3-equal card rows in favor of intentional hierarchy:
  - `layout="bento-2-1"`: `grid-cols-1 lg:grid-cols-3 [&>*:nth-child(1)]:lg:col-span-2`
  - `layout="bento-1-2"`: `grid-cols-1 lg:grid-cols-3 [&>*:nth-child(2)]:lg:col-span-2`
  - `layout="bento-split"`: `grid-cols-1 lg:grid-cols-12 [&>*:nth-child(1)]:lg:col-span-7 [&>*:nth-child(2)]:lg:col-span-5`
- **Strict 8-Point Gutter Rhythm:** `gap="none" | "xs" (8px) | "sm" (12-16px) | "md" (16-32px) | "lg" (24-40px) | "xl" (32-64px)`.
- **Google Stitch Waterfall Stagger:** When `animate={true}`, executes staggered entrance using Framer Motion spring physics (`stiffness: 100, damping: 20, mass: 1, staggerDelay: 0.06s`) with `whileInView` and `viewport={{ once: true, margin: "-40px" }}` for 60fps GPU acceleration.
- **Granular GridItem Primitives:** `<GridItem>` supports typed `colSpan` (1–12, "full"), `rowSpan` (1–6, "full"), `colStart` (1–12), and coordinated child spring reveal.

### 4.40 Strict Anti-Slop, CVA Integrity & Universal Cognitive Guardrails

To prevent regression into templated AI-slop, gaudy accents, and cramped layouts, all component implementations must strictly obey the following guardrails:

- **CVA Prop Integrity & Safe Aliases:**
  - **`Button`:** Officially supports `size="xs"` (28px height, `h-7 px-2.5 text-xs gap-1 rounded-lg`) specifically for segmented control wells and documentation preview switchers. Varian `"default"` is mapped as a safe alias for `"solid"`. Never pass arbitrary unmapped props.
  - **`Badge`:** Officially supports `color="zinc"` and `color="neutral"` alongside semantic colors (`primary`, `secondary`, `success`, `warning`, `danger`, `info`). `variant="solid"` has safe fallbacks to prevent invisible white-on-white text.
  - **`Heading`:** NEVER prefix headings with rainbow icon badge squares (`<Badge color="purple"><Sparkles /> ...</Badge>`). Headings must assert dominance purely through scale, weight, and negative space.
- **Segmented Control Inset Well for Documentation & Preview Toggles:**
  - Control bars (column switchers, gap toggles, theme selectors) in documentation previews MUST use the **Segmented Control Inset Well** consuming the `<Button>` core component:
    - **Well Inset Track:** `inline-flex flex-wrap items-center gap-1 rounded-xl border border-zinc-200/80 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-[#161618]`
    - **Active Pill:** `<Button size="xs" variant="solid" color="white" className="bg-white font-semibold text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white cursor-pointer">`
    - **Inactive Pill:** `<Button size="xs" variant="light" color="zinc" className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white cursor-pointer">`
  - **Global Button Reset:** Handled at `@layer base` in `index.css` via `appearance: none; -webkit-appearance: none; border-width: 0;` to eliminate native macOS/iOS Safari button chrome.
  - Banned: Raw `<button>` tags without styling and loose, cramped oval buttons floating without an inset well.
- **Banned Rainbow Slop & Multi-Colored Cards:**
  - Never apply arbitrary multicolored backgrounds (e.g. gold, yellow, neon purple, or bright cyan containers) to iconography cards or information panels without clear functional necessity.
  - Surfaces must stay grounded in the monochromatic Obsidian hierarchy: Obsidian Charcoal (`#161618`) in dark mode, crisp neutral (`white` / `zinc-50`) in light mode, with hairline specular borders (`border-zinc-200/80 dark:border-white/[0.08]`).
  - Reserve color strictly for purposeful, semantic indicators (e.g. Emerald for active status, Brand Indigo for primary callouts).
- **Banned Gratuitous AI & Sparkle Icons:**
  - Never inject `Sparkles`, `Wand2`, or `Bot` icons into banners, badges, or headers that do **not** involve generative AI or machine learning models.
  - Adhere to Jakob's Law (User Mental Models): represent open-source registries with their official brand SVG (e.g. Lucide vector mark), file systems with document icons, and CLI tools with terminal glyphs.
- **Channel Containment & Single-Column Reading Discipline:**
  - Never force a horizontal 2-column layout or stretched container when copy/description text is detailed or lengthy. Horizontal squeezing creates severe vertical line wraps that induce cognitive reading fatigue.
  - Lengthy explanatory text must flow naturally downward in a **single-column prose channel** capped at `65ch` / `768px` (`max-w-3xl`).
  - Structure hero/header metadata with clean vertical stacking: Title $\rightarrow$ License/Category Badge $\rightarrow$ Single-column description $\rightarrow$ Action row (CLI copy buttons, external links).
- **Enforced UX Law Fundamentals:**
  - **Fitts's Law:** Touch targets must maintain standard 44px baselines (`h-11` standard, `h-9` compact). Banned cramped `px-2` or `px-2.5` padding on buttons; anisotropic ratio $X:Y \ge 1.5:1$ is mandatory.
  - **Hick's Law:** Minimize decision fatigue. Provide clear, in-place functional category filters without disruptive page reloads or hash jumps.
  - **Gestalt Common Region & Proximity:** Keep inner icon-to-label gaps tight (`gap-1.5` to `gap-2`) relative to outer container bounds. Avoid the _cards-inside-cards-inside-cards_ nesting anti-pattern.

### 4.41 Mandatory 100% Core Component Consumption Across Ecosystem

- **Single Source of Truth:** `packages/core` (`@hudbird/ui`) is the canonical primitive library.
- **Zero Raw HTML Policy:**
  - Every block in `packages/marketing/src/blocks/` (SaaS, ModernApp, Fintech, Ecommerce, AiStartup, Agency, Hospitality, AdminCms) MUST consume `@hudbird/ui` core components directly: `<Button>`, `<Card>`, `<Badge>`, `<Avatar>`, `<Input>`, `<Switch>`, `<Accordion>`, `<Tabs>`, `<Section>`, `<Container>`, `<Grid>`, `<GridItem>`.
  - Every template in `apps/docs/src/components/templates/` and `apps/docs/src/app/landingpage/` MUST consume `@hudbird/ui` core components.
  - Every doc page in `apps/docs/src/pages/` MUST consume `@hudbird/ui` core components.
  - Strictly banned: Raw `<button>`, raw `<section>`, raw `<div className="max-w-...">`, raw `<div className="grid...">`, or unstyled ad-hoc HTML elements.
- **No Destructive `cn` Theme Overrides:**
  - Blocks and templates must respect dynamic theme tokens (`bg-background`, `text-foreground`, `border-border`, `bg-card`, `text-primary`, `bg-primary`) so that changes in the Theme Editor propagate seamlessly across all marketing sections. Do not hardcode static hex values or blanket `bg-zinc-900` / `text-white` when semantic theme tokens should be used.

### 4.42 Photography & Visual Asset Standard (Pexels-Only)

- **Curated High-Resolution Asset Source:** All photography across marketing sections, template blocks, hero imagery, and gallery previews **MUST originate exclusively from Pexels** (e.g. `images.pexels.com`).
- **Banned Sources:** Unsplash, Placeholder.com, and random uncurated external URLs are strictly banned from marketing and template packages.
- **Editorial Aesthetic:** Select minimal architectural, textured, editorial, high-contrast, and modern subjects matching the Swiss/Stitch design language.

### 4.43 Gallery & Showcase Page Display Typography

- **Monumental Display Titles:** Index, showcase, and gallery pages (e.g. `BlocksGalleryDoc.tsx`, `TemplatesDoc.tsx`) must lead with massive, standalone display typography:
  - Font: `font-outfit`
  - Scale: `text-4xl sm:text-5xl lg:text-6xl`
  - Weight: `font-medium` (500)
  - Kerning: `tracking-tight`
  - Subtitle: `text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl`
  - The gallery title must visibly assert monumental hierarchy over surrounding controls and cards.

### 4.44 Tailwind CSS v4 CSS-First Architecture Standard

- **CSS-First Configuration:** The repository operates strictly on **Tailwind CSS v4 CSS-First architecture**.
- **No `tailwind.config.ts`:** Never create or reintroduce `tailwind.config.ts`, `tailwind.config.js`, or legacy `@tailwind` directives.
- **`@theme` Single Source of Truth:** All design tokens, custom font definitions (`--font-outfit`, `--font-jakarta`), fluid spacing scales, and OKLCH color palettes live exclusively in `apps/docs/src/index.css` inside the `@theme` directive.

---

## 5. Layout Principles & Spatial Whitespace Strategy

Google Stitch achieves its premium feel through uncrowded, deliberate spatial rhythms:

- **Vertical Section Rhythm (Whitespace Strategy):**
  - Section-to-section gap: `clamp(5rem, 8vw, 8rem)` (`80px` to `128px` / `space-y-24 sm:space-y-32`). Delivers monumental, uncrowded breathing room between major conceptual shifts.
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
11. ❌ **No Rainbow Icon Badge Squares Next to Headings (UI Slop):** Strictly forbidden to prefix section headings with multi-colored rounded icon badge squares (e.g. green sparkles in green box, orange file in amber box, purple layers in purple box). Headings must assert visual dominance through scale, weight, and negative space alone.
12. ❌ **No Claustrophobic Section Spacing (Violation of the Law of Proximity):** Sections must never sit closer than 80px apart (`mt-20 sm:mt-28`). Compressing vertical gaps below 64px collapses visual grouping and causes severe cognitive fatigue.

---

## 8. UX Psychology Blueprint (Cognitive Architecture)

All components, layouts, and interactive workflows in Hudbird UI are bound by human cognitive psychology principles to eliminate cognitive overload, reduce error rates, and deliver effortless high-agency usability:

### 8.1 Law of Proximity (Gestalt)

- **Principle:** Elements positioned close to one another are cognitively perceived as belonging to the same functional cluster.
- **Rule:**
  - Micro-spacing (`4px` to `8px` / `gap-1` to `gap-2`): Connect closely coupled items (e.g. form label to input, icon to accompanying button text).
  - Meso-spacing (`16px` to `24px` / `gap-4` to `gap-6`): Differentiate sibling cards, controls, or list items within the same parent section.
  - Macro-spacing (`80px` to `128px` / `mt-20 sm:mt-32` / `space-y-24 sm:space-y-32`): Separate distinct thematic sections. Vertical gaps smaller than 64px violate proximity and cause cognitive fatigue.

### 8.2 Law of Common Region (Gestalt)

- **Principle:** Elements enclosed within a clearly defined visual boundary are perceived as sharing a single unified purpose.
- **Rule:**
  - Enclose related data, code previews, or form groups inside explicit perimeter containers (e.g. `DoubleBezelCard` or 1px hairline border `border-zinc-200 dark:border-white/10`).
  - **Anti-Nesting Rule:** Strictly ban gratuitous nested frames ("cards inside cards inside cards"). A container must have distinct informational boundary purpose, not redundant decorative framing.

### 8.3 Law of Similarity (Gestalt)

- **Principle:** Elements sharing visual characteristics (color, shape, typography) are perceived to perform the same function.
- **Rule:**
  - Headings at each hierarchy tier (`h1`, `h2`, `h3`) must strictly share the same typeface, weight (`500`), letter-spacing, and line-height across every page.
  - Banned: Arbitrary rainbow badge styling where each section or card invents a unique accent color. Color must signal functional states (system status, primary intent), not arbitrary cosmetic variety.

### 8.4 Aesthetic-Usability Effect

- **Principle:** Users perceive visually balanced, polished, and clutter-free interfaces as significantly more intuitive, tolerant of minor friction, and credible.
- **Rule:**
  - Prioritize generous negative space, deliberate typography, and subdued surfaces over visual noise, emojis, or neon effects. Software that looks clean feels faster, safer, and more reliable.

### 8.5 Fitts's Law

- **Principle:** The time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target.
- **Rule:**
  - **Minimum Touch Targets:** Interactive targets must measure at least `44px × 44px` on mobile/touch viewports (`h-11`) and `36px × 36px` on desktop viewports (`h-9`).
  - Icon-only interactive buttons must never drop below `32px` (`w-8 h-8`) and must provide ample surrounding tap margin.
  - Primary call-to-actions must be positioned along primary natural focal paths (top-right or bottom-left terminal anchor).

### 8.6 Hick's Law

- **Principle:** The time required to make a decision increases logarithmically with the number and complexity of choices presented.
- **Rule:**
  - Limit the number of primary options: strictly one primary button (`variant="solid"`) per view or card cluster.
  - Employ progressive disclosure: bury advanced configurations, detailed filters, or verbose telemetry behind expandable disclosures or modal steps rather than overwhelming the default viewport.

### 8.7 Miller's Law (Cognitive Chunking)

- **Principle:** The average human working memory can hold only 7 (± 2) discrete chunks of information simultaneously.
- **Rule:**
  - Group navigation links, form fields, and telemetry metrics into digestible clusters of 5 to 7 items.
  - Bento grids and dashboard summaries must limit active primary blocks to 3–5 high-signal widgets per view. Long lists must use categorical headings and dividers.

### 8.8 Jakob's Law

- **Principle:** Users spend most of their time using other digital products; they expect your system to operate according to well-established mental models.
- **Rule:**
  - Preserve familiar architectural conventions: left-hand navigation sidebar, top-right utility actions/search (`Cmd+K`), right-hand "On this page" TOC, standard form inputs (labels on top, error message below).
  - Never invert or obscure universal interaction standards (e.g. standard ESC to dismiss modals, Tab to navigate form fields).

### 8.9 Von Restorff Effect (Isolation Effect)

- **Principle:** When multiple similar objects are present, the item that visually differs from the rest is the most memorable and most likely to receive action.
- **Rule:**
  - Reserve the high-contrast Electric Indigo (`#4F46E5` / `#6366F1`) brand accent exclusively for the primary intended user action.
  - Subordinate all supporting secondary actions to neutral surfaces (`variant="outline"`, `variant="ghost"`). If every button or card is highlighted, visual hierarchy collapses.

### 8.10 Zeigarnik Effect & Goal Gradient Effect

- **Principle:** Incomplete tasks generate cognitive tension that motivates completion, and user momentum accelerates as they perceive proximity to their goal.
- **Rule:**
  - Multi-step configurations, setup wizards, and documentation walkthroughs must render clear, linear step indicators (e.g. `Step 1 of 4` or subtle progress track).
  - Display tangible completion milestones rather than open-ended sequences, without resorting to bulky or distracting visual badges.

---

## 9. Optical Alignment & Visual Physics (Mathematical vs. Visual Perception)

Digital layouts frequently look unbalanced when aligned strictly by bounding-box coordinates. Hudbird UI mandates optical compensation rules so interfaces feel balanced to human eyes:

### 9.1 Mathematical vs. Visual Center (Center of Mass Compensation)

- **Principle:** Symmetrical geometric bounding boxes do not account for asymmetric mass distribution. For example, a right-pointing triangle (`Play` icon) has more visual mass on its left vertical base than on its right apex point.
- **Rule:**
  - In circular or square containers, right-pointing play icons must be optically nudged by `+1px` to `+2px` horizontally (`translate-x-[1px]` or `translate-x-[1.5px]`).
  - Asymmetric icons (e.g. magnifying glass, diagonal arrows) must be optically centered based on their visual centroid, not purely by CSS `flex justify-center items-center`.

### 9.2 Cap-Height & Baseline Alignment

- **Principle:** Font bounding boxes contain whitespace for ascenders and descenders (e.g. `p`, `y`, `d`, `h`), which often causes inline icons and adjacent badges to look vertically misaligned.
- **Rule:**
  - Inline icons next to text must align to the text’s **Cap-Height** (the height of capital letters), not the arbitrary line-height wrapper.
  - When pairing `16px` icons with `14px` or `16px` text in buttons, apply an optical offset (`-mt-px` or `translate-y-[-0.5px]`) if vertical centering leaves an awkward gap beneath baseline.

### 9.3 Concentric Radii Formula (Nested Corner Continuity)

- **Principle:** When an inner card sits inside an outer card or bezel container, using identical corner radii makes the inner corners appear sharp, pinched, or distorted.
- **Rule:**
  - All nested surfaces must satisfy the concentric radius formula: `R_inner = R_outer - padding`.
  - **Example:** For an outer container with `rounded-[28px]` and padding of `6px` (`p-1.5`), the inner core must strictly use `rounded-[22px]` (28 - 6 = 22).

### 9.4 Visual Weight & Density Balancing

- **Principle:** Solid (filled) shapes appear 20% to 30% larger and heavier than stroked (outlined) shapes of the exact same pixel dimensions.
- **Rule:**
  - In icon-text pairs or split-action groups, filled icons must be sized down slightly (e.g. `14px` filled vs. `16px` outline) or paired with slightly wider spacing to avoid dominating visual hierarchy.
  - Circular badges beside rectangular buttons must be optically scaled so their perceived surface area matches the visual weight of the adjacent typography.

### 9.5 Overshoot & Optical Perimeter Balance

- **Principle:** Curved forms (circles, rounded pill containers) visually appear smaller than squares of the exact same pixel width because their corners do not fill the bounding box.
- **Rule:**
  - Circular avatar rings, status dots, and pill buttons must apply an optical overshoot (~1px to 2px extra clearance or dimension) when placed flush with crisp rectangular grids.

---

## 10. Architecting Intuition (Cognitive Interaction & Physical Affordances)

Intuition in user experience is the synthesis of cognitive psychology, tactile physics, and immediate causality:

### 10.1 Physical Affordances & Perceived Interactability

- **Principle:** Users should instantly intuit how an element behaves without reading instructions.
- **Rule:**
  - Tactile depth is conveyed through subtle 1px specular highlights (`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]`) and hairline whisper borders, not cartoonish gradients or drop shadows.
  - Interactive components must visibly shift state on hover: slight surface luminosity shift (+4% lightness) and tactile compression on click (`active:scale-[0.98]`).

### 10.2 Zero-Latency Feedback Loops

- **Principle:** Any delay greater than 100ms breaks the perception of immediate physical causation, increasing user cognitive friction.
- **Rule:**
  - Button presses and toggle switches must provide instantaneous visual feedback within 16ms (1 frame).
  - High-agency physics: Always use the signature Hudbird spring curve `duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]` for fluid positional shifts. Never use browser default `ease` or linear timers.

### 10.3 Spatial Constancy & Motion Continuity

- **Principle:** Sudden layout shifts and jumping elements destroy spatial orientation and force users to re-scan the screen.
- **Rule:**
  - Dialogs, popovers, and menus must reveal from their triggering origin point or slide upwards smoothly (`y: 12px -> 0px`).
  - Animated layout transitions must use Framer Motion layout animations (`layoutId`) to morph between active tabs or selection pills seamlessly.

### 10.4 Progressive Disclosure & Contextual Scaffolding

- **Principle:** Present only the vital decisions required for the current task; reserve secondary complexity for deliberate inquiry.
- **Rule:**
  - High-density data tables and component configuration forms must present the primary 3–5 controls by default.
  - Deep options (advanced filters, custom SQL overrides, raw JSON telemetry) must be tucked within explicit expanders, drawers, or modal drawers with clear visual cues.
