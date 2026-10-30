export const DEFAULT_DESIGN_MD_CONTENT = `---
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

**Project ID:** \`projects/hudbird-ui-kinetic\`

---

## 1. Visual Theme & Atmosphere

A restrained, high-agency editorial interface directly calibrated from the Google Stitch official documentation system (\`stitch.withgoogle.com\`). Combines architectural editorial calm, extreme typographic control, deep charcoal canvas surfaces, and physical kinetic micro-motion.

- **Density Spectrum (4/10 — Gallery Airy & Editorial Calm):** Generous breathing room, isolated reading channels, uncrowded margins, and strict visual pacing.
- **Variance Spectrum (8/10 — Offset Asymmetric):** Rejects uniform 3-card templates. Favors asymmetric editorial split layouts, 5-to-7 column bento compositions, staggered narrative blocks, and dynamic optical balancing.
- **Motion Spectrum (8/10 — Cinematic Kinetic Physics):** Powered by hardware-accelerated spring dynamics (\`stiffness: 100, damping: 20\`). Interactive surfaces react with tactile magnetic pull, tactile depression, and perpetual micro-interaction states.

---

## 2. Color Palette & Roles

Hudbird UI uses a carefully calibrated OKLCH & Hex palette constrained below 80% saturation. Pure black (\`#000000\`) and oversaturated "AI neon glows" are strictly prohibited.

### 2.1 Neutral Base & Surfaces (Google Stitch Dark Canvas)

- **Obsidian Charcoal** (\`#161618\`) — Primary background canvas in dark mode (derived directly from Stitch docs computed style \`rgb(22, 22, 24)\`). Soft, deep neutral eliminating OLED clipping. Never pure \`#000000\`.
- **Elevated Surface** (\`#202124\`) — Cards, floating pill search bars, sidebars, headers, and modal dialogs.
- **Border & Divider** (\`#2E2F33\`) — 1px hairline container borders and section dividing rules.
- **Primary Text** (\`#FFFFFF\`) — High-contrast display headlines and section titles.
- **Editorial Prose** (\`#E5E5E5\`) — High-legibility body paragraph text (\`rgb(229, 229, 229)\`).
- **Muted Subtitle & Metadata** (\`#828282\`) — Subtitles, section numbers, keyboard shortcut glyphs, and secondary captions (\`rgb(130, 130, 130)\`).
- **Canvas Light (Alternative Mode)** (\`#F9FAFB\`) — Clean, warm off-white surface for light mode canvas.

### 2.2 Brand & Kinetic Accents

- **Electric Indigo** (\`#4F46E5\` / \`#6366F1\`) — Primary signature brand color for Hudbird UI. Applied to category eyebrow tags, primary call-to-actions, active tab indicators, and keyboard focus rings.
- **Kinetic Cyan** (\`#06B6D4\`) — Secondary kinetic brand accent. Used for velocity indicators, micro-badges, and real-time state badges.
- **Emerald Vitality** (\`#10B981\`) — Semantic success state, operational indicators, verified badges, and positive metric deltas.
- **Amber Warning** (\`#F59E0B\`) — Semantic caution state, pending queues, rate limit warnings, and non-blocking notifications.
- **Rose Danger** (\`#F43F5E\`) — Destructive actions, validation error outlines, network disconnection indicators, and high-urgency alerts.

---

## 3. Typography Architecture & Micro-Spacing (Editorial Standard)

Every element in the typographic hierarchy is calibrated with exact optical tracking, line-height ratios, and paragraph pacing to achieve signature editorial elegance.

### 3.1 Category Eyebrow Tag (\`label-caps\`)

- **Role:** Chapter / Category anchor (e.g., \`ESSENTIALS\`, \`GETTING STARTED\`).
- **Font:** \`Plus Jakarta Sans\` or \`Google Sans Text\`
- **Size:** \`13px\` (\`0.8125rem\`)
- **Weight:** \`800\` (Ultra-Bold)
- **Line-Height:** \`18px\`
- **Tracking (Letter-Spacing):** \`+1.6px\` (\`tracking-widest\` uppercase).
- **Color:** Electric Indigo (\`#6366F1\` / \`#818CF8\` in dark mode, \`#4F46E5\` in light mode).
- **Bottom Spacing (Law of Proximity):** Strictly \`24px\` to \`32px\` (\`mb-6 sm:mb-8\`) breathing room above the main title.

### 3.2 Display Hero Title (\`display-lg\` / \`h1\`)

- **Role:** Primary page title.
- **Font:** \`Outfit\` or \`Google Sans Display\`, sans-serif
- **Size:** \`clamp(2.75rem, 6vw, 4.5rem)\` (\`44px\` mobile, \`64px - 72px\` desktop).
- **Weight:** Strictly \`500\` (\`font-medium\` — creates majestic editorial calm; NEVER chunky bold \`700\`).
- **Line-Height:** \`1.12\` (\`leading-[1.12]\`).
- **Tracking (Letter-Spacing):** \`-1.8px\` to \`-2.2px\` (tight optical kerning closing loose gaps between glyphs).
- **Word-Spacing:** \`0px\`.
- **Color:** \`#FFFFFF\` (\`rgb(255, 255, 255)\`).
- **Bottom Spacing:** Strictly \`28px\` to \`36px\` (\`mb-7 sm:mb-9\`) before the subtitle.
- **Desktop Wrap Rule:** Never wrap beyond 3 lines on desktop viewports.

### 3.3 Lead Subtitle (\`subtitle\`)

- **Role:** Contextual summary under the main title.
- **Font:** \`Plus Jakarta Sans\` or \`Google Sans Text\`, sans-serif
- **Size:** \`20px\` to \`24px\` (\`text-xl sm:text-2xl\`)
- **Weight:** \`400\` (\`font-normal\`)
- **Line-Height:** \`36px\` to \`38.4px\` (\`1.6\` ratio).
- **Tracking:** \`-0.16px\`.
- **Color:** Muted Neutral (\`#828282\` / \`rgb(130, 130, 130)\`).
- **Max-Width:** Strictly constrained to \`768px\` (\`max-w-3xl\`) for effortless sentence scanability.
- **Bottom Spacing (Header-to-Content Isolation):** Strictly \`80px\` to \`112px\` (\`mb-20 sm:mb-28\`) monumental whitespace before content sections.

### 3.4 Content Headings (\`headline-md\` / \`h2\` & \`h3\`)

- **Section Heading (\`h2\`):**
  - **Size:** \`32px\` to \`36px\` (\`2rem\` - \`2.25rem\` / \`text-3xl sm:text-4xl\`).
  - **Weight:** \`500\` (\`font-medium\` — refined editorial weight matching Google Stitch).
  - **Line-Height:** \`1.22\` (\`leading-tight\`).
  - **Tracking:** \`-0.8px\` (\`-0.02em\`).
  - **Color:** \`#FFFFFF\` (\`rgb(255, 255, 255)\`).
  - **Top Spacing (Section-to-Section Gap):** Strictly \`80px\` to \`128px\` (\`mt-20 sm:mt-32\` / \`space-y-24 sm:space-y-32\`).
  - **Bottom Spacing to Prose:** Strictly \`24px\` to \`32px\` (\`mb-6 sm:mb-8\`).
  - **Anti-Slop Rule:** Strictly NO colorful rounded icon badge squares next to headings. Headings stand with pure typographic authority.
- **Sub-Section Heading (\`h3\`):**
  - **Size:** \`22px\` to \`24px\` (\`text-xl sm:text-2xl\`), Weight: \`500\` (\`font-medium\`), Line-Height: \`1.33\`, Tracking: \`-0.4px\`.
  - **Top Spacing:** \`48px\` to \`64px\` (\`mt-12 sm:mt-16\`), Bottom Spacing: \`16px\` to \`20px\` (\`mb-4 sm:mb-5\`).

### 3.5 Editorial Body Paragraphs (\`body-base\` / \`p\`)

- **Role:** Standard explanatory documentation prose.
- **Font:** \`Plus Jakarta Sans\` (or \`Geist Sans\`), sans-serif
- **Size:** \`17px\` to \`18px\` (\`text-[17px] sm:text-lg\`).
- **Weight:** \`400\` (\`font-normal\`).
- **Line-Height:** \`29.75px\` to \`31.5px\` (\`1.75\` ratio / \`leading-[1.75]\`). Generous vertical clearance.
- **Tracking (Letter-Spacing):** \`-0.16px\` (\`-0.01em\`).
- **Concept Lead Anchor:** Begin key sentences with bold lead concepts (e.g. \`<strong>Step 1.</strong>\`, \`<strong>Ideate.</strong>\`).
- **Paragraph Spacing:** Strictly \`28px\` to \`36px\` (\`mb-7 sm:mb-9\`) before codeblocks or next blocks.
- **Color:** Soft Off-White (\`#E5E5E5\` / \`rgb(229, 229, 229)\`).
- **Line-Length Limit:** Maximum 65 characters per line (\`max-w-[65ch]\`).

### 3.6 Precision Monospace & Inline Code (\`code-mono\`)

- **Font:** \`JetBrains Mono\` or \`Google Sans Mono\`, monospace
- **Size:** \`13.6px\` (\`0.85rem\`)
- **Weight:** \`500\` (Medium)
- **Background:** Charcoal Badge (\`#323232\` / \`rgb(50, 50, 50)\`).
- **Padding:** \`2px 6px\` (\`py-0.5 px-1.5\`).
- **Radius:** \`6px\` (\`rounded-md\`).
- **CodeBlock Margins:** \`my-8 sm:my-10\` (\`32px\` to \`40px\` vertical clearance). Internal block padding \`p-6 sm:p-8\`.
- **Tracking:** \`-0.01em\`.

---

## 4. Component Stylings

### 4.1 Buttons & Interactive Controls (Derived from packages/core/src/components/Button)

The Button architecture is governed by strict tactile feedback and explicit geometric tokens extracted directly from \`Button.tsx\` and \`KineticButton.tsx\`:

- **Variants Architecture:**
  - **Solid (\`variant="solid"\`):** Solid opaque background with crisp contrast text (\`text-primary-foreground\`), high-agency active press feedback, and micro-elevation (\`shadow-xs\`).
  - **Bordered (\`variant="bordered"\`):** Transparent background framed by a structured 2px high-contrast stroke (\`border-2\`).
  - **Flat & Soft (\`variant="flat" | "soft"\`):** Borderless container with translucent tint fill for secondary actions.
  - **Outline (\`variant="outline"\`):** Hairline 1px border (\`border-zinc-950/10\` light / \`border-white/15\` dark) with gentle hover wash.
  - **Light & Ghost (\`variant="light" | "ghost"\`):** Borderless text button with surface-tinted hover state (\`hover:bg-zinc-100\` / \`hover:bg-zinc-800\`).
  - **Plain (\`variant="plain"\`):** Zero background or border, used exclusively for inline links or tertiary triggers.
- **Dimensional Scales & Touch Targets:**
  - **Small (\`size="sm"\`):** Height \`32px\` (\`h-8\`), horizontal padding \`12px\` (\`px-3\`), font size \`12px\` (\`text-xs\`), icon gap \`6px\` (\`gap-1.5\`).
  - **Medium (\`size="md"\`):** Height \`36px\` (\`h-9\`), horizontal padding \`16px\` (\`px-4\`), font size \`14px\` (\`text-sm\`), icon gap \`8px\` (\`gap-2\`). Default standard control.
  - **Large (\`size="lg"\`):** Height \`44px\` (\`h-11\`), horizontal padding \`20px\` (\`px-5\`), font size \`16px\` (\`text-base\`), icon gap \`10px\` (\`gap-2.5\`). Satisfies mobile accessibility target.
- **Corner Radius Mapping:**
  - **Sharp (\`radius="none"\`):** Squared edges (\`0px\` / \`rounded-none\`).
  - **Medium (\`radius="md"\`):** Generously rounded (\`12px\` / \`rounded-xl\`).
  - **Large (\`radius="lg"\`):** Fluid organic corners (\`16px\` / \`rounded-2xl\`).
  - **Full Capsule (\`radius="full"\`):** Pill shape (\`9999px\` / \`rounded-full\`) with optical compensation padding (\`px-3.5\` for sm, \`px-5\` for md, \`px-6\` for lg).
- **Icon-Only Precision (\`isIconOnly={true}\`):**
  - Strictly locked to 1:1 square aspect ratios (\`w-8 h-8\`, \`w-9 h-9\`, \`w-11 h-11\`) with zero horizontal padding (\`p-0\`).
- **Tactile Micro-Interactions & Focus:**
  - Active state: Tactile \`-2%\` scale compression (\`active:scale-[0.98]\`) with \`200ms\` duration.
  - Focus state: \`2px\` focus ring with \`2px\` offset (\`focus-visible:ring-2 focus-visible:ring-offset-2\`).
  - Kinetic spring easing: \`ease-[cubic-bezier(0.16,1,0.3,1)]\` for smooth physical velocity.
- **Enforced Restrictions:**
  - Banned: High-saturation neon outer drop-shadows and non-standard cursor pointers.

### 4.2 Cards & Double-Bezel Containers

- **DoubleBezelCard:** Signature Hudbird container styling. Composed of an outer 1px border (\`rgba(255, 255, 255, 0.08)\`), an inner surface fill (\`#161618\` / \`#202124\`), and an interior 1px highlight perimeter (\`rgba(255, 255, 255, 0.04)\`), creating tangible bevel depth without heavy shadows.
- **Corner Roundness:** Generous \`1.25rem\` (20px) to \`1.75rem\` (28px).
- **Elevation & Shadow:** Zero heavy drop shadows. Layering is conveyed through subtle tone shifts and translucent borders.

### 4.3 Form Inputs & Controls

- **Structure:** Label positioned strictly above the input (\`text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5\`).
- **Input Field:** Solid background (\`rgba(255,255,255,0.03)\` dark / \`#FFFFFF\` light), 1px Whisper Border.
- **Focus State:** 2px ring in Electric Indigo (\`#4F46E5\`) with zero pixel blur offset. No floating animated placeholders.
- **Validation:** Inline warning/error message rendered immediately below the input field with accompanying status icon.

### 4.4 Skeletons & Empty States

- **Skeletal Loaders:** Geometric shimmer masks reflecting the exact layout and aspect ratio of destination components. Never use generic circular spinners for content cards.
- **Empty States:** Composed architectural blueprints with contextual actionable primary buttons, not isolated "No data found" text strings.

---

## 5. Layout Principles & Spatial Whitespace Strategy

Google Stitch achieves its premium feel through uncrowded, deliberate spatial rhythms:

- **Vertical Section Rhythm (Whitespace Strategy):**
  - Section-to-section gap: \`clamp(5rem, 8vw, 8rem)\` (\`80px\` to \`128px\` / \`space-y-24 sm:space-y-32\`). Delivers monumental, uncrowded breathing room between major conceptual shifts.
  - Title-to-Content gap: \`48px\` (\`mt-12\`).
  - Paragraph-to-Paragraph gap: \`24px\` (\`mb-6\`).
  - Headline-to-Paragraph gap: \`16px\` (\`mb-4\`).
- **Channel Containment:**
  - Prose reading channel: Capped at \`768px\` (\`max-w-3xl\`) or \`65ch\` to prevent eye fatigue.
  - Full layout canvas: Constrained to \`1280px\` (\`max-w-7xl\`) or \`1440px\` centered with auto margins (\`mx-auto\`).
  - Outer page gutter padding: \`px-6 sm:px-8 lg:px-12\`.
- **Sidebar & On-This-Page TOC Rails:**
  - Left Navigation: \`280px\` fixed width with pill-shaped active state containers (\`rounded-full\` or \`rounded-xl\`).
  - Right TOC Rail: \`220px\` sticky column with \`14px\` font size and subtle \`8px\` item gaps.
- **Safe Viewport Heights:**
  - Full-height sections must use \`min-h-[100dvh]\` to eliminate iOS Safari viewport jumps. Never use \`h-screen\`.

---

## 6. Motion & Kinetic Interaction (Stitch Generation Guidance)

- **Spring Physics Baseline:**
  - Default spring config: \`type: "spring", stiffness: 100, damping: 20, mass: 1\`.
  - Snappy UI toggles: \`stiffness: 300, damping: 30\`.
  - Continuous kinetic drag: \`stiffness: 400, damping: 25\`.
- **Waterfall Orchestration:**
  - Lists and card grids must enter through staggered cascades (\`staggerChildren: 0.06\`, delay \`0.05s\`).
  - Motion elements reveal upwards by \`y: 12px\` to \`y: 0px\` while transitioning opacity from \`0\` to \`1\`.
- **Perpetual Micro-Interactions:**
  - Floating telemetry pills: Subtle infinite hover loop (\`y: [0, -4, 0]\`, ease \`easeInOut\`, duration 4s).
  - Live status nodes: Subtle 2-second ambient pulse ring (\`scale: [1, 1.4, 1]\`, \`opacity: [0.8, 0, 0.8]\`).
- **Performance Rules:**
  - Animations must animate **only** \`transform\` (\`x\`, \`y\`, \`scale\`, \`rotate\`) and \`opacity\`.
  - Never animate layout triggers: \`height\`, \`width\`, \`margin\`, \`top\`, or \`padding\`.

---

## 7. Anti-Patterns (Banned AI Clichés)

To preserve human agency and elite design execution, the following patterns are explicitly forbidden across all Hudbird implementations:

1. ❌ **No Emojis in Production UI:** Never use emojis (🚀, 💡, 🔥, ✨) in button labels, navbar items, or feature headlines. Use geometric Lucide SVG icons instead.
2. ❌ **No Pure Black Backgrounds:** Absolute \`#000000\` is banned. Use Obsidian Charcoal (\`#161618\`) or Deep Void Slate (\`#090D16\`).
3. ❌ **No AI Neon Glows:** Over-saturated purple/magenta blur spheres and cyan radial under-glows behind cards are banned.
4. ❌ **No 3-Equal Cards Feature Rows:** Generic 3-card horizontal rows are banned. Use asymmetric bento grids or alternating 2-column layouts.
5. ❌ **No Over-Saturated Accents:** Accent saturation must remain under 80%.
6. ❌ **No \`Inter\` as Brand Identity:** Inter is banned as the primary display heading typeface.
7. ❌ **No AI Copywriting Clichés:** Banned words: _"Elevate"_, _"Seamless"_, _"Unleash"_, _"Supercharge"_, _"Next-Gen"_, _"Empower"_. Write direct, concrete technical explanations.
8. ❌ **No Generic Placeholder Names:** Never use _"John Doe"_, _"Acme Corp"_, or _"Company Inc"_. Use realistic personas and specific technical domains.
9. ❌ **No Filler UI Prompts:** Never add _"Scroll to explore"_, _"Swipe down"_, or animated bouncing down chevrons.
10. ❌ **No Layout Shifts on Mobile:** Multi-column grids must cleanly collapse to a single column below \`768px\` with zero horizontal overflow.
11. ❌ **No Rainbow Icon Badge Squares Next to Headings (UI Slop):** Strictly forbidden to prefix section headings with multi-colored rounded icon badge squares (e.g. green sparkles in green box, orange file in amber box, purple layers in purple box). Headings must assert visual dominance through scale, weight, and negative space alone.
12. ❌ **No Claustrophobic Section Spacing (Violation of the Law of Proximity):** Sections must never sit closer than 80px apart (\`mt-20 sm:mt-28\`). Compressing vertical gaps below 64px collapses visual grouping and causes severe cognitive fatigue.

---

## 8. UX Psychology Blueprint (Cognitive Architecture)

All components, layouts, and interactive workflows in Hudbird UI are bound by human cognitive psychology principles to eliminate cognitive overload, reduce error rates, and deliver effortless high-agency usability:

### 8.1 Law of Proximity (Gestalt)
- **Principle:** Elements positioned close to one another are cognitively perceived as belonging to the same functional cluster.
- **Rule:**
  - Micro-spacing (\`4px\` to \`8px\` / \`gap-1\` to \`gap-2\`): Connect closely coupled items (e.g. form label to input, icon to accompanying button text).
  - Meso-spacing (\`16px\` to \`24px\` / \`gap-4\` to \`gap-6\`): Differentiate sibling cards, controls, or list items within the same parent section.
  - Macro-spacing (\`80px\` to \`128px\` / \`mt-20 sm:mt-32\` / \`space-y-24 sm:space-y-32\`): Separate distinct thematic sections. Vertical gaps smaller than 64px violate proximity and cause cognitive fatigue.

### 8.2 Law of Common Region (Gestalt)
- **Principle:** Elements enclosed within a clearly defined visual boundary are perceived as sharing a single unified purpose.
- **Rule:**
  - Enclose related data, code previews, or form groups inside explicit perimeter containers (e.g. \`DoubleBezelCard\` or 1px hairline border \`border-zinc-200 dark:border-white/10\`).
  - **Anti-Nesting Rule:** Strictly ban gratuitous nested frames ("cards inside cards inside cards"). A container must have distinct informational boundary purpose, not redundant decorative framing.

### 8.3 Law of Similarity (Gestalt)
- **Principle:** Elements sharing visual characteristics (color, shape, typography) are perceived to perform the same function.
- **Rule:**
  - Headings at each hierarchy tier (\`h1\`, \`h2\`, \`h3\`) must strictly share the same typeface, weight (\`500\`), letter-spacing, and line-height across every page.
  - Banned: Arbitrary rainbow badge styling where each section or card invents a unique accent color. Color must signal functional states (system status, primary intent), not arbitrary cosmetic variety.

### 8.4 Aesthetic-Usability Effect
- **Principle:** Users perceive visually balanced, polished, and clutter-free interfaces as significantly more intuitive, tolerant of minor friction, and credible.
- **Rule:**
  - Prioritize generous negative space, deliberate typography, and subdued surfaces over visual noise, emojis, or neon effects. Software that looks clean feels faster, safer, and more reliable.

### 8.5 Fitts's Law
- **Principle:** The time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target.
- **Rule:**
  - **Minimum Touch Targets:** Interactive targets must measure at least \`44px × 44px\` on mobile/touch viewports (\`h-11\`) and \`36px × 36px\` on desktop viewports (\`h-9\`).
  - Icon-only interactive buttons must never drop below \`32px\` (\`w-8 h-8\`) and must provide ample surrounding tap margin.
  - Primary call-to-actions must be positioned along primary natural focal paths (top-right or bottom-left terminal anchor).

### 8.6 Hick's Law
- **Principle:** The time required to make a decision increases logarithmically with the number and complexity of choices presented.
- **Rule:**
  - Limit the number of primary options: strictly one primary button (\`variant="solid"\`) per view or card cluster.
  - Employ progressive disclosure: bury advanced configurations, detailed filters, or verbose telemetry behind expandable disclosures or modal steps rather than overwhelming the default viewport.

### 8.7 Miller's Law (Cognitive Chunking)
- **Principle:** The average human working memory can hold only 7 (± 2) discrete chunks of information simultaneously.
- **Rule:**
  - Group navigation links, form fields, and telemetry metrics into digestible clusters of 5 to 7 items.
  - Bento grids and dashboard summaries must limit active primary blocks to 3–5 high-signal widgets per view. Long lists must use categorical headings and dividers.

### 8.8 Jakob's Law
- **Principle:** Users spend most of their time using other digital products; they expect your system to operate according to well-established mental models.
- **Rule:**
  - Preserve familiar architectural conventions: left-hand navigation sidebar, top-right utility actions/search (\`Cmd+K\`), right-hand "On this page" TOC, standard form inputs (labels on top, error message below).
  - Never invert or obscure universal interaction standards (e.g. standard ESC to dismiss modals, Tab to navigate form fields).

### 8.9 Von Restorff Effect (Isolation Effect)
- **Principle:** When multiple similar objects are present, the item that visually differs from the rest is the most memorable and most likely to receive action.
- **Rule:**
  - Reserve the high-contrast Electric Indigo (\`#4F46E5\` / \`#6366F1\`) brand accent exclusively for the primary intended user action.
  - Subordinate all supporting secondary actions to neutral surfaces (\`variant="outline"\`, \`variant="ghost"\`). If every button or card is highlighted, visual hierarchy collapses.

### 8.10 Zeigarnik Effect & Goal Gradient Effect
- **Principle:** Incomplete tasks generate cognitive tension that motivates completion, and user momentum accelerates as they perceive proximity to their goal.
- **Rule:**
  - Multi-step configurations, setup wizards, and documentation walkthroughs must render clear, linear step indicators (e.g. \`Step 1 of 4\` or subtle progress track).
  - Display tangible completion milestones rather than open-ended sequences, without resorting to bulky or distracting visual badges.

---

## 9. Optical Alignment & Visual Physics (Mathematical vs. Visual Perception)

Digital layouts frequently look unbalanced when aligned strictly by bounding-box coordinates. Hudbird UI mandates optical compensation rules so interfaces feel balanced to human eyes:

### 9.1 Mathematical vs. Visual Center (Center of Mass Compensation)
- **Principle:** Symmetrical geometric bounding boxes do not account for asymmetric mass distribution. For example, a right-pointing triangle (\`Play\` icon) has more visual mass on its left vertical base than on its right apex point.
- **Rule:**
  - In circular or square containers, right-pointing play icons must be optically nudged by \`+1px\` to \`+2px\` horizontally (\`translate-x-[1px]\` or \`translate-x-[1.5px]\`).
  - Asymmetric icons (e.g. magnifying glass, diagonal arrows) must be optically centered based on their visual centroid, not purely by CSS \`flex justify-center items-center\`.

### 9.2 Cap-Height & Baseline Alignment
- **Principle:** Font bounding boxes contain whitespace for ascenders and descenders (e.g. \`p\`, \`y\`, \`d\`, \`h\`), which often causes inline icons and adjacent badges to look vertically misaligned.
- **Rule:**
  - Inline icons next to text must align to the text’s **Cap-Height** (the height of capital letters), not the arbitrary line-height wrapper.
  - When pairing \`16px\` icons with \`14px\` or \`16px\` text in buttons, apply an optical offset (\`-mt-px\` or \`translate-y-[-0.5px]\`) if vertical centering leaves an awkward gap beneath baseline.

### 9.3 Concentric Radii Formula (Nested Corner Continuity)
- **Principle:** When an inner card sits inside an outer card or bezel container, using identical corner radii makes the inner corners appear sharp, pinched, or distorted.
- **Rule:**
  - All nested surfaces must satisfy the concentric radius formula: \`R_inner = R_outer - padding\`.
  - **Example:** For an outer container with \`rounded-[28px]\` and padding of \`6px\` (\`p-1.5\`), the inner core must strictly use \`rounded-[22px]\` (28 - 6 = 22).

### 9.4 Visual Weight & Density Balancing
- **Principle:** Solid (filled) shapes appear 20% to 30% larger and heavier than stroked (outlined) shapes of the exact same pixel dimensions.
- **Rule:**
  - In icon-text pairs or split-action groups, filled icons must be sized down slightly (e.g. \`14px\` filled vs. \`16px\` outline) or paired with slightly wider spacing to avoid dominating visual hierarchy.
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
  - Tactile depth is conveyed through subtle 1px specular highlights (\`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]\`) and hairline whisper borders, not cartoonish gradients or drop shadows.
  - Interactive components must visibly shift state on hover: slight surface luminosity shift (+4% lightness) and tactile compression on click (\`active:scale-[0.98]\`).

### 10.2 Zero-Latency Feedback Loops
- **Principle:** Any delay greater than 100ms breaks the perception of immediate physical causation, increasing user cognitive friction.
- **Rule:**
  - Button presses and toggle switches must provide instantaneous visual feedback within 16ms (1 frame).
  - High-agency physics: Always use the signature Hudbird spring curve \`duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]\` for fluid positional shifts. Never use browser default \`ease\` or linear timers.

### 10.3 Spatial Constancy & Motion Continuity
- **Principle:** Sudden layout shifts and jumping elements destroy spatial orientation and force users to re-scan the screen.
- **Rule:**
  - Dialogs, popovers, and menus must reveal from their triggering origin point or slide upwards smoothly (\`y: 12px -> 0px\`).
  - Animated layout transitions must use Framer Motion layout animations (\`layoutId\`) to morph between active tabs or selection pills seamlessly.

### 10.4 Progressive Disclosure & Contextual Scaffolding
- **Principle:** Present only the vital decisions required for the current task; reserve secondary complexity for deliberate inquiry.
- **Rule:**
  - High-density data tables and component configuration forms must present the primary 3–5 controls by default.
  - Deep options (advanced filters, custom SQL overrides, raw JSON telemetry) must be tucked within explicit expanders, drawers, or modal drawers with clear visual cues.
`;
