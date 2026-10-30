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
npx hudbird-ui add Button Card Dialog Form Input Dropdown Table

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

## 3. Complete Component Catalog & API Reference

### A. Primitives & Foundation
* **`Button`**:
  * **Variants**: `solid` (default), `bordered`, `flat`, `soft`, `light`, `ghost`, `outline`, `plain`
  * **Colors**: `primary` (indigo), `secondary`, `success` (emerald), `warning` (amber), `danger` (rose), `info` (sky), `dark`, `zinc`, `white`, `light`, `dark/zinc`, `dark/white`
  * **Sizes**: `sm` (h-8), `md` (h-9), `lg` (h-11)
  * **Props**: `startContent`, `endContent`, `isLoading`, `isIconOnly`, `asChild`, `href`
  ```tsx
  import { Button } from "@/components/hudbird-ui/Button";
  import { ArrowRight, Loader2 } from "lucide-react";

  <Button variant="solid" color="primary" endContent={<ArrowRight className="h-4 w-4" />}>
    Get Started
  </Button>
  ```
* **`Badge`**: Status indicators (`variant="solid|flat|outline"`, `color="primary|success|warning|danger|zinc"`).
* **`Avatar`**: User pictures with fallback initials and ring colors.
* **`Card`**, **`CardHeader`**, **`CardBody`**, **`CardFooter`**: Clean, bordered, rounded containers.
* **`Heading`** & **`Text`**: Typographic hierarchy components with preset tracking and weights.
* **`Divider`**, **`Skeleton`**, **`Slot`**.

---

### B. Signature Interactive & Motion Components
* **`DoubleBezelCard`**: Architectural dual-chassis card with corner crosshairs and inner core.
  * **Props**: `variant="default" | "glass" | "solid" | "highlight"`, `padding="none" | "sm" | "md" | "lg"`, `isHoverable={true|false}`, `showCrosshairs={true | ["top-left", "bottom-right"]}`.
  ```tsx
  import { DoubleBezelCard } from "@/components/hudbird-ui/DoubleBezelCard";

  <DoubleBezelCard variant="glass" showCrosshairs isHoverable padding="lg">
    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Enterprise Engine</h3>
    <p className="mt-2 text-zinc-500 dark:text-zinc-400">Ultra-fast edge compilation.</p>
  </DoubleBezelCard>
  ```
* **`KineticButton`**: High-end interactive CTA featuring rolling duplicate text and dual-diagonal sliding arrows.
  * **Props**: `variant="primary" | "brand" | "secondary" | "outline" | "ghost"`, `size="sm" | "md" | "lg"`, `showArrow={true}`, `arrowPosition="right" | "left"`, `href="/pricing"`.
  ```tsx
  import { KineticButton } from "@/components/hudbird-ui/KineticButton";

  <KineticButton variant="primary" size="lg" href="/dashboard">
    Launch Platform
  </KineticButton>
  ```
* **`SplitTextReveal`**: Scroll-driven kinetic typography reveal using Framer Motion scroll progress.
  * **Props**: `text: string`, `as="h1" | "h2" | "p"`, `by="words" | "characters"`, `baseOpacity={0.2}`.
  ```tsx
  import { SplitTextReveal } from "@/components/hudbird-ui/SplitTextReveal";

  <SplitTextReveal
    as="h2"
    text="Designed for speed. Engineered for absolute precision."
    className="text-4xl sm:text-6xl font-extrabold text-zinc-900 dark:text-white"
  />
  ```
* **`StickyStack` & `StickyStackItem`**: Stacking cards that lock and scale progressively on scroll.
  ```tsx
  import { StickyStack, StickyStackItem } from "@/components/hudbird-ui/StickyStack";

  <StickyStack baseTop="6rem" offsetStep="1.5rem">
    {items.map((item, index) => (
      <StickyStackItem key={index} index={index}>
        <DoubleBezelCard variant="solid">
          <h4>{item.title}</h4>
        </DoubleBezelCard>
      </StickyStackItem>
    ))}
  </StickyStack>
  ```
* **`BlurRevealText`**, **`ParticleSphere`**, **`Globe`**, **`CustomCursor`**.

---

### C. Forms & Data Input
* **`Input`**: Text input with `startContent`, `endContent`, `isClearable`, error states.
* **`InputOTP`**: Segmented one-time-password input with auto-focus and clipboard paste.
* **`Textarea`**: Auto-resizing textarea with character count support.
* **`Checkbox`**, **`RadioGroup`**, **`Switch`**, **`Slider`**.
* **`Select`** & **`ComboBox`**: Accessible dropdown selectors with search filtering.
* **`Form`**: React Hook Form integration wrapper (`FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`).
  ```tsx
  import { useForm } from "react-hook-form";
  import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/hudbird-ui/Form";
  import { Input } from "@/components/hudbird-ui/Input";
  import { Button } from "@/components/hudbird-ui/Button";

  const form = useForm({ defaultValues: { email: "" } });
  // Pass form to <Form {...form}>...
  ```

---

### D. Navigation, Overlays & Feedback
* **`Navbar`**: Floating glassmorphic navbar with mobile menu toggle and active pill indicator.
* **`Sidebar`**: Collapsible dashboard navigation bar with group sections and badge counts.
* **`Dialog`**: Modal overlay with focus trap, backdrop blur, and exit transitions.
* **`Sheet`**: Slide-out drawer panel from left, right, top, or bottom.
* **`Dropdown`**: Menu popover with nested sub-menus, keyboard arrows, and checkable items.
* **`Command`**: Spotlight / Cmd+K fuzzy-search command palette.
* **`Tabs`**: Segmented tab control with animated sliding active indicator.
* **`Accordion`**: Expandable FAQ / detail panels.
* **`Toast`**: Transient notifications (success, warning, error, info).
* **`Table`**: Data table with striped rows, sorting headers, and selection checkboxes.

---

### E. Charts (Recharts + Animated Motion)
* **`AreaChart`**, **`BarChart`**, **`LineChart`**, **`PieChart`**, **`RadarChart`**, **`RadialChart`**, **`ComposedChart`**:
  * Clean, theme-integrated SVG charts with smooth Framer Motion mounting animations.
  * Standardized tooltip: `<ChartTooltip />`.
  ```tsx
  import { AreaChart } from "@/components/hudbird-ui/AreaChart";

  <AreaChart
    data={analyticsData}
    categories={["revenue", "expenses"]}
    index="month"
    colors={["indigo", "emerald"]}
    className="h-72 w-full"
  />
  ```

---

### F. Marketing & Section Blocks (`@hudbird/marketing`)
* **`Hero`**:
  ```tsx
  import {
    Hero,
    HeroHeader,
    HeroBody,
    HeroContent,
    HeroBadge,
    HeroTitle,
    HeroDescription,
    HeroActions,
    HeroMedia,
  } from "@/components/hudbird-ui/Hero";
  import { KineticButton } from "@/components/hudbird-ui/KineticButton";
  import { Button } from "@/components/hudbird-ui/Button";

  <Hero size="full" withBlobs>
    <HeroHeader logo={<span className="font-bold text-xl">Hudbird</span>} />
    <HeroBody variant="centered">
      <HeroContent align="center">
        <HeroBadge>Introducing Hudbird 1.5</HeroBadge>
        <HeroTitle>Build AI-native interfaces at lightspeed</HeroTitle>
        <HeroDescription>
          60+ production-grade components engineered for high conversion and effortless styling.
        </HeroDescription>
        <HeroActions>
          <KineticButton variant="primary" size="lg">Get Started Free</KineticButton>
          <Button variant="outline" size="lg">Explore Docs</Button>
        </HeroActions>
      </HeroContent>
    </HeroBody>
  </Hero>
  ```
* **`BentoGrid` & `BentoCard`**:
  ```tsx
  import { BentoGrid, BentoCard, BentoCardContent } from "@/components/hudbird-ui/BentoGrid";

  <BentoGrid>
    <BentoCard className="md:col-span-2">
      <BentoCardContent>
        <h4 className="text-xl font-bold">Fast Performance</h4>
        <p className="text-zinc-500">Sub-millisecond hydration with React 19.</p>
      </BentoCardContent>
    </BentoCard>
    <BentoCard>
      <BentoCardContent>
        <h4 className="text-xl font-bold">Encrypted Data</h4>
      </BentoCardContent>
    </BentoCard>
  </BentoGrid>
  ```
* **`Testimonials`** (`TestimonialsMarquee`, `TestimonialsFlat`, `TestimonialGlass`).
* **`Pricing`** (`PricingSection`, `PricingHeader`, `PricingGrid`, `PricingCard`).
* **`Faq`** (`Faq`, `FaqGlass`, `FaqCategorized`).
* **`Cta`** (`CtaCentered`, `CtaGlass`, `CtaSplit`).
* **`Footer`** (`FooterSimple`, `FooterGlass`, `FooterMega`).

---

## 4. End-to-End Production Recipes

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
import { Table } from "@/components/hudbird-ui/Table";
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

## 5. Rules for AI Code Generation

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

