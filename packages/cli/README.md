# hudbird-ui

> The official CLI for initializing, scaffolding, listing, and diffing components, signature blocks, and templates in Hudbird UI.

Hudbird UI is a modern, accessible React UI component library built with Tailwind CSS, CVA, and Framer Motion. This CLI tool helps you set up your project, customize paths with `components.json`, and manage **123+ official components, sections, signature blocks, and complete niche templates** with zero friction.

## 🚀 Quick Start

Run directly via `npx` (no global installation required):

```bash
npx hudbird-ui@latest init
```

## 🛠 Commands

### `init`

Initializes Hudbird UI in your current React + Tailwind project (supports Tailwind v3 and Tailwind v4 `@theme`):

- Generates `components.json` with your custom path aliases (`@/components/hudbird-ui`, etc.)
- Injects Tailwind directives or `@theme` CSS variables
- Installs base dependencies (`framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`)
- Scaffolds `utils/cn.ts`

```bash
npx hudbird-ui init
```

### `add [components...]`

Installs one or more components directly into your codebase with automatic dependency resolution:

```bash
# Interactive multi-select menu
npx hudbird-ui add

# UI Primitives & Layout
npx hudbird-ui add Button Card Dialog Form InputOTP KineticButton StickyStack

# Signature Blocks
npx hudbird-ui add morphing-island agent-artifact-canvas interactive-bento

# Marketing Sections & Fullscreen Video Player
npx hudbird-ui add hero-section landing-testimonials video-player

# Complete Niche Industry Templates
npx hudbird-ui add template-saas
npx hudbird-ui add template-ai
npx hudbird-ui add template-fintech
npx hudbird-ui add template-ecommerce
npx hudbird-ui add template-agency
npx hudbird-ui add template-hospitality
npx hudbird-ui add template-admin
npx hudbird-ui add template-modern

# Install all available components in registry
npx hudbird-ui add --all

# Skip overwrite confirmation prompts
npx hudbird-ui add Button --overwrite
```

### `list` (or `ls`)

Displays all 123 official items categorized into 8 domains along with your project's local installation status:

```bash
npx hudbird-ui list
```

#### Available Categories:

- **🧩 Primitives & Layout** (20 items): Button, Card, Container, Section, Grid, GoldenGateGlass, DoubleBezelCard, EditorialImage, HudbirdIcon, IconBox, KineticButton, LiquidGlass, Text, Heading, Divider, Avatar, Skeleton, Slot, Provider, Badge.
- **📝 Form & Verification** (11 items): Input, Form, InputOTP, Checkbox, RadioGroup, Select, ComboBox, Slider, Switch, Textarea, Fieldset.
- **🪟 Overlays & Navigation** (12 items): Accordion, Breadcrumbs, Command, Dialog, Dropdown, Navbar, NavigationMenu, Pagination, Popover, Sheet, Sidebar, Tabs.
- **⚡ Feedback & Motion** (13 items): Alert, Toast, Progress, Tooltip, InfiniteScroll, Motion, SplitTextReveal, StickyStack, CustomCursor, Magnetic, MouseGlow, SmoothStackingWrapper, StackingWrapper.
- **📋 Data Display** (3 items): Calendar, DescriptionList, Table.
- **📊 Charts & Visualizations** (8 items): AreaChart, BarChart, ChartTooltip, ComposedChart, LineChart, PieChart, RadarChart, RadialChart.
- **🌐 Marketing Sections** (26 items): BentoGrid, BlueprintStudio, BlurRevealText, Cta, Faq, FeatureSection, Footer, Globe, Hero, HeroSection, LandingBenefits, LandingBuilderShowcase, LandingCta, LandingFaq, LandingFeatureShowcase, LandingFooter, LandingHeroShowcase, LandingHowItWorks, LandingIntegrations, LandingLogoCloud, LandingNavbar (13 presets), LandingPricing, LandingShared, LandingTestimonials, LogoCloud, ParticleSphere, Pricing, Testimonials, FullscreenVideoPlayer.
- **💎 Signature Blocks** (4 items): SignatureBlocks, MorphingIsland, AgentArtifactCanvas, InteractiveBentoShowcase.
- **🚀 Complete Niche Templates** (8 full templates + aliases): SaaS, Fintech, Ecommerce, AI Startup, Digital Agency, Luxury Hospitality, Enterprise Admin CMS, Modern App.

### `diff [component]`

Compares your local installed component files against upstream registry releases using an interactive colored unified diff:

```bash
# Check single component for updates or local changes
npx hudbird-ui diff Button

# Scan all installed components in your project
npx hudbird-ui diff
```

## ⚙️ Configuration (`components.json`)

Customize your project structure by editing `components.json`:

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

## 📖 Documentation

For live component previews, interactive page builder, and API documentation:

👉 **[https://hudbird.vercel.app](https://hudbird.vercel.app)**

## 📄 License

MIT © Dani Akbar
