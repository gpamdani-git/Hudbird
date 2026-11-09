---
name: hudbird-ui
description: Build modern, accessible, and high-performance React web interfaces, SaaS landing pages, interactive dashboards, and design systems using Hudbird UI (@hudbird/ui, @hudbird/marketing, @hudbird/theme) and the hudbird-ui CLI. Use whenever the user asks to create UI, design web components, build marketing pages, construct dashboards, or integrate Hudbird UI components.
---

# Hudbird UI — AI Engineering & Design Skill

Hudbird UI is a premier, accessible, and motion-enhanced React UI ecosystem built with **Tailwind CSS (v3 & v4)**, **Framer Motion**, **Class Variance Authority (CVA)**, and **Radix UI** primitives.

This skill equips any AI model with comprehensive knowledge of all 60+ components, the official `hudbird-ui` CLI, design tokens, compound component APIs, and ready-to-run UI recipes.

---

## 1. Core Principles & Design Language

1. **Codebase Ownership (Copy-Paste / Registry Model)**:
   * Components live directly inside the user's project (typically under `@/components/hudbird-ui/` or `@/components/ui/`), giving full control over markup, styling, and behavior.
   * Installed and scaffolded using the official CLI: `npx hudbird-ui add [component]`.
2. **Glassmorphism & Architectural Depth**:
   * Subtle borders (`border-zinc-200/80 dark:border-white/[0.08]`), backdrop blurs (`backdrop-blur-md`, `backdrop-blur-xl`), and translucent layered surfaces (`bg-white/80 dark:bg-zinc-950/80`).
   * Architectural touches like dual-tier chassis cards with crosshairs (`DoubleBezelCard`).
3. **Mandatory Dark Mode Pairing**:
   * Every component and layout **MUST** pair light and dark classes. Never use one without the other:
     * Backgrounds: `bg-white dark:bg-zinc-950` or `bg-zinc-50 dark:bg-zinc-900`
     * Text: `text-zinc-900 dark:text-zinc-50`, secondary: `text-zinc-500 dark:text-zinc-400`
     * Borders: `border-zinc-200 dark:border-zinc-800`
4. **Fluid Motion & Micro-Interactions**:
   * Use Framer Motion for scroll reveals, layout springs, and tactile buttons (`KineticButton`, `SplitTextReveal`, `StickyStack`).
5. **Lucide Icons Standard**:
   * Always use `lucide-react` for iconography (`size={16}` for inline controls, `size={20}` for headers).
6. **Mandatory 100% Core Component Consumption**:
   * Every marketing block, dashboard page, template showcase, and docs page **MUST** consume `@hudbird/ui` core components directly (`<Button>`, `<Card>`, `<Badge>`, `<Avatar>`, `<Section>`, `<Container>`, `<Grid>`, `<GridItem>`, `<Input>`, `<Switch>`, etc.). Raw HTML elements like `<button>`, raw `<section>`, or ad-hoc `<div className="grid">` are strictly banned.
   * Do not destroy theme tokens with excessive hardcoded `cn` overrides; all components must react dynamically to the Hudbird Theme Editor.
7. **Pexels-Only Photography Standard**:
   * All placeholder and editorial photography for marketing blocks, templates, and showcases must originate from **Pexels** (`images.pexels.com`). Unsplash and uncurated URLs are banned.

---

## 1.1 Cognitive Architecture & Optical Physics (Stitch & UX Laws)

Every component generated or styled with Hudbird UI must adhere to human cognitive psychology and optical mechanics:

1. **Optical Alignment vs. Bounding-Box Centering:**
   - **Play Icon Offset:** Triangles have asymmetric center of mass. In circular buttons, nudge right-pointing arrows/triangles by `+1px` to `+2px` horizontally (`translate-x-[1px]`).
   - **Cap-Height Icon Alignment:** Align inline icons to the uppercase cap-height of adjacent text, applying `-mt-px` or `translate-y-[-0.5px]` if vertical padding feels heavy on the baseline.
   - **Concentric Radii Formula:** Inner cards must follow `R_inner = R_outer - padding` (e.g., `rounded-[28px]` outer with `p-1.5` (6px) requires `rounded-[22px]` inner).
   - **Capsule Radial Equilibrium & Inline-Flex Framing:** Single-row capsules bookended by circular/pill primitives (`Avatar radius="full"`, `Badge`, `CircularProgress`, `Button radius="full"`) must use `Card radius="capsule"` (`rounded-full`) + `CardBody padding="capsule"` (`p-2.5`), while rounded-square thumbnails (`Avatar radius="md"`) use `Card radius="full"` (`24px`) + `CardBody padding="compact"` (`px-4 py-3`). Every `<div>` / `<motion.div>` wrapping an `inline-flex` primitive must apply `flex shrink-0 items-center justify-center leading-none` to eliminate descender baseline shifts. Showcase block docs must present 1 block per vertical `<MarketingPreview>` section scrolling downward without duplicate views.
2. **Cognitive UX Laws (The 10 Laws):**
   - **Proximity:** Micro gaps (`4px–8px`), Meso gaps (`16px–24px`), Macro section gaps (`80px–128px` / `space-y-24 sm:space-y-32`).
   - **Fitts's Law:** Touch targets $\ge 44\text{px}$ on mobile (`h-11`) and $\ge 36\text{px}$ on desktop (`h-9`).
   - **Von Restorff Effect:** Reserve Electric Indigo (`#4F46E5`) exclusively for the single primary CTA. Secondary controls remain neutral (`variant="outline"`).
   - **Hick's Law:** Limit default choices; tuck deep complexity into progressive disclosures.
   - **Miller's Law:** Group information into 5–7 digestible items.
3. **Architecting Intuition:**
   - **Tactile Feedback:** Instant $-2\%$ micro-compression on click (`active:scale-[0.98]`).
   - **Luxury Spring Physics:** `duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`.
   - **Spatial Constancy:** Seamless transitions with `layoutId` and directional entries (`y: 12px -> 0px`).
4. **Anti-Patterns Forbidden:**
   - ❌ Emojis in production UI (use Lucide SVG).
   - ❌ Rainbow icon badge squares next to section headings.
   - ❌ Pure black backgrounds (`#000000`).
   - ❌ Generic 3-equal card rows (use asymmetric Bento Grids).

---

## 2. CLI & Setup Workflow

When helping a user initialize or add Hudbird UI components to their project, follow these commands:

### Initializing a Project
```bash
npx hudbird-ui@latest init
```
This automatically:
- Generates `components.json`
- Injects Tailwind directives or `@theme` CSS tokens
- Scaffolds `@/components/hudbird-ui/utils/cn.ts`
- Installs peer dependencies: `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`

### Installing Components
```bash
# Single component
npx hudbird-ui add Button

# Common UI batch
npx hudbird-ui add Section Container Grid Button Card Dialog Form Input Dropdown Table

# Signature interactive & marketing components
npx hudbird-ui add DoubleBezelCard KineticButton SplitTextReveal StickyStack BentoGrid Hero Testimonials Pricing

# Charts bundle
npx hudbird-ui add AreaChart BarChart LineChart PieChart

# Install entire catalog
npx hudbird-ui add --all
```

### Configuration: `components.json`
```json
{
  "$schema": "https://hudbird.vercel.app/schema.json",
  "style": "default",
  "tailwind": {
    "version": 4,
    "css": "src/index.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components/hudbird-ui",
    "utils": "@/components/hudbird-ui/utils"
  }
}
```

---

## 3. Exhaustive Component Inventory (All 66+ Items)

| Category | Component Name | Subcomponents & Compound Elements | Primary Props & Variants |
| :--- | :--- | :--- | :--- |
| **Macro Layout** | `Section` | Self-contained | `spacing`: none, xs, sm, md, lg, xl<br/>`variant`: default, muted, card, inverted, obsidian<br/>`fullHeight`: boolean (100dvh safe dynamic viewport)<br/>`bordered`: boolean, top, bottom, both |
| **Macro Layout** | `Container` | Self-contained | `size`: sm, md, prose (65ch reading channel), lg, xl, 2xl, fluid<br/>`gutter`: none, sm, md, lg (monumental Stitch)<br/>`centered`: boolean |
| **Macro Layout** | `Grid` | `Grid`, `GridItem` | `cols`: 1-6, 12, auto-fit, auto-fill<br/>`layout`: default, bento-2-1, bento-1-2, bento-split<br/>`gap`: none, xs, sm, md, lg, xl<br/>`animate`: boolean (Google Stitch waterfall)<br/>`staggerDelay`: number |
| **Primitives** | `Button` | Self-contained, `asChild` via Slot | `variant`: solid, bordered, flat, soft, light, ghost, outline, plain<br/>`color`: primary, secondary, success, warning, danger, zinc, dark/zinc<br/>`size`: sm, md, lg<br/>`isLoading`, `startContent`, `endContent`, `isIconOnly`, `href` |
| **Primitives** | `Badge` | Self-contained | `variant`: solid, flat, outline, soft<br/>`color`: primary, secondary, success, warning, danger, zinc |
| **Primitives** | `Avatar` | `Avatar`, `AvatarImage`, `AvatarFallback` | `size`: sm, md, lg, xl<br/>`src`, `alt`, `ringColor` |
| **Primitives** | `Card` | `Card`, `CardHeader`, `CardBody`, `CardFooter` | `variant`: default, flat, bordered, shadow |
| **Primitives** | `Heading` | Self-contained | `as`: h1, h2, h3, h4, h5, h6<br/>`size`: xs, sm, md, lg, xl, 2xl, 3xl |
| **Primitives** | `Text` | Self-contained | `as`: p, span, div<br/>`size`: xs, sm, base, lg<br/>`variant`: default, muted, subtle |
| **Primitives** | `Divider` | Self-contained | `orientation`: horizontal, vertical |
| **Primitives** | `Skeleton` | Self-contained | `className` for width, height, rounded |
| **Primitives** | `Slot` | `Slot`, `Slottable` | For Radix-style `asChild` composition |
| **Signature** | `DoubleBezelCard` | `DoubleBezelCard`, `CornerCrosshair` | `variant`: default, glass, solid, highlight<br/>`padding`: none, sm, md, lg<br/>`showCrosshairs`: boolean or array of positions<br/>`isHoverable`: boolean |
| **Signature** | `LiquidGlass` | `LiquidGlass`, `LiquidGlassHeader`, `LiquidGlassBody`, `LiquidGlassFooter`, `LiquidGlassStage` | `mode`: glass, dark, light<br/>`blur`: none, sm, md, golden-gate (22px), lg, xl, or number (0-64)<br/>`intensity`: number (8-92 frost opacity)<br/>`saturation`: number (100-220)<br/>`specular`: none, subtle, crisp, refractive<br/>`tint`: neutral, warm-gold, cool-mist, obsidian<br/>`radius`: none, md, lg, full, capsule |
| **Signature** | `KineticButton` | Self-contained with animated rolling text | `variant`: primary, brand, secondary, outline, ghost<br/>`size`: sm, md, lg<br/>`showArrow`: boolean<br/>`arrowPosition`: right, left<br/>`href`: string |
| **Signature** | `SplitTextReveal` | Self-contained with Framer Motion scroll | `text`: string<br/>`as`: h1, h2, h3, p, span<br/>`by`: words, characters<br/>`baseOpacity`: number (default 0.2)<br/>`scrollOffset`: [start, end] |
| **Signature** | `StickyStack` | `StickyStack`, `StickyStackItem` | `baseTop`: string (e.g. "6rem")<br/>`offsetStep`: string (e.g. "1.5rem")<br/>`scaleStep`: number |
| **Signature** | `IconBox` | Self-contained | `variant`: solid, soft, outline, glass<br/>`color`: primary, success, warning, danger |
| **Signature** | `EditorialImage` | Self-contained | `src`, `alt`, `aspectRatio`, `caption` |
| **Signature Blocks** | `MorphingIsland` | Self-contained (`@hudbird/marketing`) | `defaultMode`: idle, deploy, command, verified<br/>`autoCycle`: boolean<br/>`cycleIntervalMs`: number |
| **Signature Blocks** | `AgentArtifactCanvas` | Self-contained (`@hudbird/marketing`) | `defaultScenario`: edge-cluster, revenue-model, zero-trust<br/>`scenario`, `onScenarioChange` |
| **Signature Blocks** | `InteractiveBentoShowcase` | Self-contained (`@hudbird/marketing`) | `defaultTrafficMillions`: number<br/>`badgeText`, `title`, `description` |
| **Forms** | `Input` | Self-contained | `type`, `startContent`, `endContent`, `isClearable`, `isInvalid`, `errorMessage`, `label`, `description` |
| **Forms** | `InputOTP` | `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator` | `maxLength`: number (default 6)<br/>`value`, `onChange` |
| **Forms** | `Textarea` | Self-contained | `rows`, `minRows`, `maxRows`, `isInvalid`, `label` |
| **Forms** | `Checkbox` | Self-contained | `isSelected`, `onValueChange`, `color`, `size` |
| **Forms** | `RadioGroup` | `RadioGroup`, `RadioGroupItem` | `value`, `onValueChange`, `orientation` |
| **Forms** | `Switch` | Self-contained | `isSelected`, `onValueChange`, `color`, `size` |
| **Forms** | `Slider` | Self-contained | `value`, `minValue`, `maxValue`, `step`, `showSteps` |
| **Forms** | `Select` | `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel` | Accessible dropdown menu select |
| **Forms** | `ComboBox` | `ComboBox`, `ComboBoxInput`, `ComboBoxList`, `ComboBoxItem` | Searchable fuzzy-filter dropdown |
| **Forms** | `Fieldset` | `Fieldset`, `Legend`, `FieldLabel`, `FieldDescription`, `FieldError` | Accessible semantic form grouping |
| **Forms** | `Form` | `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage` | React Hook Form native integration |
| **Navigation** | `Navbar` | `Navbar`, `NavbarBrand`, `NavbarContent`, `NavbarItem`, `NavbarMenuToggle`, `NavbarMenu`, `NavbarMenuItem` | Glassmorphic floating navigation header with mobile drawer |
| **Navigation** | `Sidebar` | `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton` | Collapsible dashboard navigation |
| **Navigation** | `Tabs` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | Animated sliding active indicator pill |
| **Navigation** | `Breadcrumbs` | `Breadcrumbs`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator`, `BreadcrumbPage` | Hierarchical trail navigation |
| **Navigation** | `Pagination` | `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationNext`, `PaginationPrevious`, `PaginationEllipsis` | Page index switcher |
| **Navigation** | `Command` | `Command`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandShortcut`, `CommandSeparator` | Spotlight / Cmd+K fuzzy-search palette |
| **Navigation** | `Accordion` | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | Collapsible FAQ disclosure panel |
| **Overlays** | `Dialog` | `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose` | Accessible modal overlay with backdrop blur |
| **Overlays** | `Sheet` | `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter` | Slide-out side drawer (left, right, top, bottom) |
| **Overlays** | `Dropdown` | `Dropdown`, `DropdownTrigger`, `DropdownMenu`, `DropdownItem`, `DropdownSection` | Contextual action popup menu |
| **Overlays** | `Popover` | `Popover`, `PopoverTrigger`, `PopoverContent` | Floating panel anchored to trigger |
| **Feedback** | `Alert` | `Alert`, `AlertTitle`, `AlertDescription` | `variant`: solid, flat, bordered<br/>`color`: primary, success, warning, danger |
| **Feedback** | `Toast` | `Toast`, `ToastAction`, `ToastClose`, `ToastTitle`, `ToastDescription`, `ToastProvider`, `ToastViewport` | Transient notification banner with queue |
| **Feedback** | `Tooltip` | `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` | Hover tooltip with arrow indicator |
| **Feedback** | `Progress` | Self-contained | `value`: 0-100, `color`: primary, success, warning, danger |
| **Feedback** | `InfiniteScroll` | Self-contained | `hasMore`, `next`, `loader`, `endMessage` |
| **Data Display** | `Table` | `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption` | Data table with borders, striped rows, and selection |
| **Charts** | `AreaChart` | Self-contained (Recharts + Motion) | `data`, `categories`, `index`, `colors`, `className` |
| **Charts** | `BarChart` | Self-contained (Recharts + Motion) | `data`, `categories`, `index`, `colors`, `layout` |
| **Charts** | `LineChart` | Self-contained (Recharts + Motion) | `data`, `categories`, `index`, `colors` |
| **Charts** | `PieChart` | Self-contained (Recharts + Motion) | `data`, `category`, `index`, `colors` |
| **Charts** | `RadarChart` | Self-contained (Recharts + Motion) | `data`, `categories`, `index`, `colors` |
| **Charts** | `RadialChart` | Self-contained (Recharts + Motion) | `data`, `category`, `index`, `colors` |
| **Charts** | `ComposedChart` | Self-contained (Recharts + Motion) | Mixed bar, line, and area charts |
| **Charts** | `ChartTooltip` | `ChartTooltip`, `ChartTooltipContent` | Styled tooltip popover for Recharts |
| **Marketing** | `Hero` | `Hero`, `HeroHeader`, `HeroBody`, `HeroContent`, `HeroMedia`, `HeroBackground`, `HeroBadge`, `HeroTitle`, `HeroDescription`, `HeroActions` | `size`: full, auto, fixed<br/>`withBlobs`: boolean<br/>`HeroBody variant`: centered, split |
| **Marketing** | `BentoGrid` | `BentoGrid`, `BentoCard`, `BentoCardBackground`, `BentoCardContent`, `BentoCardHeader`, `BentoCardBody`, `BentoCardFooter` | Auto-rows grid with Framer Motion hover scale and layered content |
| **Marketing** | `FeatureSection` | `Feature`, `FeatureGlass` | Grid of feature cards with icons and descriptions |
| **Marketing** | `Testimonials` | `Testimonials`, `TestimonialsMarquee`, `TestimonialsFlat`, `TestimonialGlass`, `TestimonialsGlobe`, `TestimonialsSideBySide` | Infinite marquee or masonry testimonial cards |
| **Marketing** | `Pricing` | `PricingSection`, `PricingHeader`, `PricingGrid`, `PricingCard` | Tier cards with monthly/yearly billing toggle |
| **Marketing** | `Faq` | `Faq`, `FaqGlass`, `FaqCategorized`, `FaqWithIllustration` | Expandable question list with category tabs |
| **Marketing** | `Cta` | `CtaCentered`, `CtaGlass`, `CtaSplit` | Full-width high-converting call to action |
| **Marketing** | `Footer` | `FooterSimple`, `FooterGlass`, `FooterMega` | Multi-column footer with social links and legal |
| **Marketing** | `LogoCloud` | `LogoCloud`, `LogoCloudMarquee` | Client/partner brand logo ticker |
| **Marketing** | `Globe` | Self-contained (Cobe Canvas) | Interactive 3D WebGL globe |
| **Marketing** | `ParticleSphere` | Self-contained (Three.js/Canvas) | Animated 3D particle sphere |
| **Marketing** | `BlurRevealText` | Self-contained (Framer Motion) | Cinematic text blur reveal |
| **Marketing** | `CustomCursor` | Self-contained (Framer Motion) | Magnetic custom cursor follower |

---

## 4. Vertical Niche Marketing Blocks (`@hudbird/marketing/blocks`)

When building entire industry websites, Hudbird UI provides ready-to-use prebuilt niche blocks under `packages/marketing/src/blocks`:

1. **`SaaS`**: High-conversion software landing page (`SaaSHero`, `SaaSBentoGrid`, `SaaSPricing`, `SaaSFeatureGrid`, `SaaSTestimonials`, `SaaSFaq`, `SaaSCta`, `SaaSFooter`).
2. **`ModernApp`**: Futuristic consumer app layout (`Meetings`, `Network`, `Radar`, `Reflect`, `Grid`).
3. **`Fintech`**: High-trust banking & crypto protocol styling with dark metallic glass and currency matrices.
4. **`Agency`**: Bold brutalist editorial design for creative agencies and studios.
5. **`Ecommerce`**: Product spotlights, cart drawers, and category carousels.
6. **`Hospitality`**: Luxury resort, dining, and hotel booking showcase.
7. **`AiStartup`**: Neon accents, particle canvas backgrounds, and prompt demo playgrounds.
8. **`AdminCms`**: Complete enterprise dashboard with sidebar, stats grid, and data tables.

---

## 5. End-to-End Production Recipes

### Recipe 1: Modern SaaS Landing Page
```tsx
import React from "react";
import {
  Hero,
  HeroHeader,
  HeroBody,
  HeroContent,
  HeroBadge,
  HeroTitle,
  HeroDescription,
  HeroActions,
} from "@/components/hudbird-ui/Hero";
import { KineticButton } from "@/components/hudbird-ui/KineticButton";
import { Button } from "@/components/hudbird-ui/Button";
import { BentoGrid, BentoCard, BentoCardContent } from "@/components/hudbird-ui/BentoGrid";
import { DoubleBezelCard } from "@/components/hudbird-ui/DoubleBezelCard";
import { SplitTextReveal } from "@/components/hudbird-ui/SplitTextReveal";
import { CtaGlass } from "@/components/hudbird-ui/Cta";
import { FooterGlass } from "@/components/hudbird-ui/Footer";
import { ShieldCheck, Zap, Layers, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-indigo-500 selection:text-white dark:bg-zinc-950 dark:text-zinc-100">
      {/* 1. Hero Section */}
      <Hero size="full" withBlobs>
        <HeroHeader
          logo={<div className="text-xl font-bold tracking-tight">Hudbird<span className="text-indigo-500">UI</span></div>}
          links={[
            { label: "Features", href: "#features" },
            { label: "Bento", href: "#bento" },
            { label: "Pricing", href: "#pricing" },
          ]}
          action={<Button variant="solid" color="primary">Sign In</Button>}
        />
        <HeroBody variant="centered">
          <HeroContent align="center">
            <HeroBadge>✨ Powered by Hudbird UI 1.5</HeroBadge>
            <HeroTitle>Next-Gen Software Requires Next-Gen Design</HeroTitle>
            <HeroDescription>
              Stop shipping generic websites. Craft memorable interfaces using architectural double-bezel cards, kinetic animations, and responsive bento grids.
            </HeroDescription>
            <HeroActions>
              <KineticButton variant="primary" size="lg" href="#start">
                Start Building Now
              </KineticButton>
              <Button variant="outline" size="lg">
                View Component Showcase
              </Button>
            </HeroActions>
          </HeroContent>
        </HeroBody>
      </Hero>

      {/* 2. Kinetic Section Header */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <SplitTextReveal
          as="h2"
          text="Built for designers who write code and developers who care about design."
          className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white"
        />
      </section>

      {/* 3. Bento Features Grid */}
      <section id="bento" className="py-16 px-6 max-w-7xl mx-auto">
        <BentoGrid>
          <BentoCard className="md:col-span-2">
            <BentoCardContent className="p-8">
              <DoubleBezelCard variant="glass" showCrosshairs className="h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-2xl font-bold">Instant Motion Physics</h3>
                <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                  Hardware-accelerated CSS & Framer Motion springs configured right out of the box.
                </p>
              </DoubleBezelCard>
            </BentoCardContent>
          </BentoCard>

          <BentoCard>
            <BentoCardContent className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold">Enterprise A11y</h3>
              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                WCAG compliant ARIA roles and seamless keyboard navigation.
              </p>
            </BentoCardContent>
          </BentoCard>

          <BentoCard>
            <BentoCardContent className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold">Tailwind v4 Native</h3>
              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                Pure `@theme` token integration with zero runtime CSS bloat.
              </p>
            </BentoCardContent>
          </BentoCard>

          <BentoCard className="md:col-span-2">
            <BentoCardContent className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-2xl font-bold">60+ Production Blocks</h3>
              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                From Hero blocks to interactive charts and accessible forms.
              </p>
            </BentoCardContent>
          </BentoCard>
        </BentoGrid>
      </section>

      {/* 4. Glass CTA */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <CtaGlass
          title="Ready to transform your UI?"
          description="Initialize your project with a single command and launch in hours, not weeks."
          primaryAction={
            <KineticButton variant="primary" size="lg">
              Get Started for Free
            </KineticButton>
          }
        />
      </section>

      {/* 5. Footer */}
      <FooterGlass />
    </div>
  );
}
```

---

### Recipe 2: Metric Dashboard with Charts & DoubleBezelCard
```tsx
import React from "react";
import { DoubleBezelCard } from "@/components/hudbird-ui/DoubleBezelCard";
import { AreaChart } from "@/components/hudbird-ui/AreaChart";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/hudbird-ui/Table";
import { Badge } from "@/components/hudbird-ui/Badge";
import { Button } from "@/components/hudbird-ui/Button";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

export default function AnalyticsDashboard() {
  const chartData = [
    { month: "Jan", revenue: 4200, users: 1200 },
    { month: "Feb", revenue: 5800, users: 1800 },
    { month: "Mar", revenue: 7900, users: 2400 },
    { month: "Apr", revenue: 11200, users: 3800 },
    { month: "May", revenue: 14500, users: 4900 },
  ];

  return (
    <div className="min-h-screen bg-zinc-100 p-8 dark:bg-[#0c0c0f]">
      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Revenue", val: "$142,850", change: "+18.2%", icon: DollarSign },
          { label: "Active Users", val: "24,520", change: "+9.4%", icon: Users },
          { label: "Conversion Rate", val: "3.84%", change: "+1.2%", icon: TrendingUp },
          { label: "System Uptime", val: "99.98%", change: "+0.02%", icon: Activity },
        ].map((stat, i) => (
          <DoubleBezelCard key={i} variant="glass" showCrosshairs isHoverable padding="sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {stat.label}
              </span>
              <stat.icon className="h-4 w-4 text-zinc-400" />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {stat.val}
              </span>
              <Badge variant="flat" color="success">
                {stat.change}
              </Badge>
            </div>
          </DoubleBezelCard>
        ))}
      </div>

      {/* Main Chart Area */}
      <div className="mt-8">
        <DoubleBezelCard variant="default" padding="lg">
          <div className="flex items-center justify-between pb-6">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Revenue Growth</h3>
              <p className="text-sm text-zinc-500">Monthly gross volume and active platform users</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Weekly</Button>
              <Button size="sm" variant="solid" color="primary">Monthly</Button>
            </div>
          </div>

          <AreaChart
            data={chartData}
            categories={["revenue"]}
            index="month"
            colors={["indigo"]}
            className="h-80 w-full"
          />
        </DoubleBezelCard>
      </div>
    </div>
  );
}
```

---

## 6. Rules for AI Code Generation

When generating UI with Hudbird UI, always enforce these rules:

1. **Never Invent Non-Existent Props**:
   * For `Button`: Use valid variants (`solid`, `bordered`, `flat`, `soft`, `light`, `ghost`, `outline`, `plain`) and colors (`primary`, `secondary`, `success`, `warning`, `danger`, `zinc`, etc.).
   * For `DoubleBezelCard`: Use `variant="default" | "glass" | "solid" | "highlight"`, `padding="sm" | "md" | "lg"`, `showCrosshairs`.
   * For `KineticButton`: Use `variant="primary" | "brand" | "secondary" | "outline" | "ghost"`, `showArrow`, `href`.
2. **Always Pair Tailwind Dark Classes**:
   * Ensure dark mode support on all text, borders, backgrounds, and cards.
3. **Use the Right Import Aliases**:
   * Refer to `components.json`: default alias is `@/components/hudbird-ui/...`.
   * When using the monorepo packages directly, import from `@hudbird/ui` and `@hudbird/marketing`.
4. **Prefer Semantic Composition**:
   * Group related components with compound subcomponents (`CardHeader`, `CardBody`, `CardFooter`, `HeroTitle`, `HeroDescription`, etc.).
5. **Add CLI Guidance When Relevant**:
   * Whenever creating a new layout for the user, include the short CLI install command at the top so the user can easily install any missing components:
     ```bash
     npx hudbird-ui add [ComponentName]
     ```
6. **Mandatory `antislop-ui`, `antislop-copywriting`, & Pure `@hudbird/ui` Composition (Zero `cn` Overrides)**:
   * **Always Active (`DURING` mode)**: Every UI component, marketing block, and documentation page in this monorepo must strictly pass `antislop-ui` and `antislop-copywriting` rules during generation.
   * **Zero `cn()` Surface Overrides**: In `@hudbird/marketing` blocks (especially `SignatureBlocks`), never import `cn` or pass `classNames={{ core: "..." }}` to override `DoubleBezelCard` or `Card` surfaces. Compose 100% from native `@hudbird/ui` CVA variants (`Section`, `Container`, `Grid` with `layout="bento-split" | "bento-2-1" | "bento-1-2"`, `DoubleBezelCard`, `Card`, `Fieldset` with `variant="inset-grouped"`, `DescriptionList`, `Alert`, `Divider`, `Heading`, `Lead`, `Text`, `Code`, `Kbd`).
   * **No Cards-inside-Cards-inside-Cards**: Never wrap charts or metrics in extra `<Card>` borders inside a `DoubleBezelCard`.
   * **No Eyebrow Pill Badge + Sparkles Above H1 (`R-04`, `R-09`)**: Let `<Heading>` and `<Lead>` stand on their own without decorative `<Sparkles />` pills above the headline.
   * **Prevent Text Truncation & Mid-Word Wrapping**: Pass plain, concise strings to `AccordionItem`'s `title` and `subtitle` (never nest `<div>` + `<Badge>` inside `title` or `<IconBox>` inside `startContent`). In 1-column bento cards, stack headers vertically without decorative icons and use `DescriptionList orientation="vertical"`.
   * **Clean Human Copywriting (`R-02`, `R-16`, `R-18`, `R-36`)**: Never use em-dashes, AI buzzwords (*seamlessly morphs, elevate, unleash, autonomous, zero-trust, multi-modal, cryptographic receipt*), or fabricated operator personas/avatars (*Marcus Vance*, *Sarah Chen*). Every chart must state the specific question/comparison it answers (`C-3`), and non-navigation `KineticButton` actions must set `showArrow={false}` (`R-08`).
7. **International Human-Experience Standards (WCAG 2.2, Nielsen, ISO 9241, Apple HIG, Don Norman) & Macro Layout Mandate**:
   * **W3C / WCAG 2.2 AA & AAA**: Normal and small text (`Text variant="small" | "muted" | "subtle"`, `Badge`, `Code`, `Progress` value labels) must achieve **`>= 4.5:1`** contrast (**`>= 7.0:1` AAA** on refractive `LiquidGlass` surfaces). Non-text tracks, progress rings, and sliders (`WCAG 1.4.11`) must achieve **`>= 3.0:1`** and use translucent luminous tracks (`bg-white/24`, `stroke-white/25`) over dark glass instead of opaque dark bars.
   * **Apple HIG (Clarity, Deference, Depth) & Surface vs. Theme Boundary**: `LiquidGlass` enforces an optical legibility floor (`alpha >= 0.56` dark glass, `alpha >= 0.72` light glass) paired with an Apple HIG deference scrim inside `LiquidGlassStage` and scrimmed helper capsules (never raw grey text over busy photos). Keep `LiquidGlass` as a **Core Surface Component** for transient/elevated HUD layers (Dynamic Island, Control Center, floating toolbars, max 1 to 2 per viewport) rather than a full-page global Theme (`/themes` handles global OKLCH color, font, and radius tokens).
   * **Jakob Nielsen, ISO 9241-112 & Don Norman**: Ensure continuous visibility of system status, explicit collapse/reset controls, unambiguous luminance polarity across `glass`/`dark`/`light` modes, clear interactive signifiers (1px top specular bevel), and immediate tactile feedback (`active:scale-[0.985]`).
   * **Mandatory Macro Layouts (`Section`, `Container`, `Grid`)**: Always structure component stages (`LiquidGlassStage`), marketing blocks, and documentation pages with `@hudbird/ui`'s `<Section>`, `<Container>`, and `<Grid>` primitives instead of raw `<section>`, `max-w-*`, or `grid-cols-*` divs.
8. **Official Apple Live Activities & `WidgetKit.DynamicIsland` Rules**:
   * **Three Canonical Presentations (`compact`, `minimal`, `expanded`)**: Support `compact` (`LiquidGlassIslandCompact` flanking centered `<LiquidGlassSensor size="compact" />` via `grid-cols-[1fr_auto_1fr]`), `minimal` (attached sensor pill + detached `44×44px` circular `padding="minimal"` bubble for concurrent Live Activities), and `expanded` (`LiquidGlass radius="island"` `36px` + `LiquidGlassBody padding="island"` `20pt` margin + `LiquidGlassIslandExpanded` `leading`, `trailing`, unobstructed `center` below sensor, and `bottom`).
   * **Macro-Tap vs. `44pt` Controls, Concentricity, `.keylineTint(_:)` & `tabularNums`**: Never place micro-buttons inside `compact` or `minimal` capsules (macro-tap `isPressable` only); place interactive buttons (`size="md"` `44px` / `size="sm"`) exclusively in `expanded` `.bottom`. Keep internal `<Divider />` inset inside `padding="island"` (never bleeding edge-to-edge into curved outer walls), match `ContainerRelativeShape` concentricity ($36 - 20 = 16\text{px}$ `Avatar radius="lg"`), apply semantic `keylineTint`, and set `tabularNums` on live clocks, countdowns, scores, and counters.


## Branded website pilot: approved product direction

For the additive `HeroSection` and `StartupPilot` APIs, read `../hudbird-startup-pilot/SKILL.md` before implementation. The approved pilot direction is clean and calm: blur, glass, and expressive motion are optional rather than defaults. Brand-owned media is permitted. Keep existing component APIs intact. The pilot has its own shared schema, scoped tokens, two compositions, and five interchangeable hero types. It does not imply that the entire existing template catalog meets the pilot acceptance criteria.

For the SaaS section collection and page builder, read `../hudbird-landing-sections/SKILL.md`. The collection adds 12 section types with 27 primary layouts, existing slideshow/video options, and React/configuration/recipe exports. Use each `marketing-landing-*` blueprint when changing a section. Until publication, use a packed local CLI for the new registry.
