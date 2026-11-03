---
name: marketing-signature-blocks
description: Architectural blueprint and implementation rules for Hudbird Signature Blocks (MorphingIsland, AgentArtifactCanvas, InteractiveBentoShowcase). Enforces 100% original @hudbird/ui primitive composition with zero cn() overrides, calibrated Framer Motion spring physics, and zero dead screenshots.
---

# Signature Blocks Blueprint

This skill serves as the canonical blueprint for creating, customizing, and extending **Signature Blocks** inside `@hudbird/marketing` (`packages/marketing/src/components/SignatureBlocks/`).

## Core Philosophy: 100% Original `@hudbird/ui` Primitives (Zero `cn` Overrides)
Every **Signature Block** is a live, keyboard-accessible flagship experience composed **100% from original `@hudbird/ui` CVA props**:
- **Zero `cn()` Imports or Surface Overrides**: Never import `cn` or override `DoubleBezelCard` / `Card` surfaces with manual `bg-...`, `border-...`, or `rounded-...` classes. Rely strictly on native variants (`variant="default" | "solid" | "flat" | "bordered" | "inset-grouped"`).
- **Zero Raw Typography or Dividers**: Always use `<Heading>`, `<Lead>`, `<Text>`, `<Code>`, `<Kbd>`, `<Divider>`, `<Alert>`, `<DescriptionList>`, and `<Fieldset>` instead of raw `<p>`, `<h3>`, `<span>`, or `border-t` divs.
- **Native Asymmetric Grid Layouts**: Use `<Grid layout="bento-split">`, `<Grid layout="bento-2-1">`, and `<Grid layout="bento-1-2">` instead of manual `lg:col-span-*` overrides.
- **Ergonomic Touch Targets (`hudbird-skill-ui`)**: Action buttons use `size="sm"` (`36px`) or `size="md"` (`44px`) to satisfy Apple HIG & Fitts's Law.
- **Strict Optical Alignment & 1-Section Vertical Rhythm**:
  - Single-row capsules with circular/pill bookends use `<Card radius="capsule">` + `<CardBody padding="capsule">`; bars with `Avatar radius="md"` use `<Card radius="full">` + `<CardBody padding="compact">`.
  - Every `<motion.div>` or `<div>` wrapping `Avatar`, `Badge`, `Code`, or `CircularProgress` must include `flex shrink-0 items-center justify-center leading-none` so zero baseline ghost-space misaligns vertical centers.
  - Lock `<Badge>` headers onto `<Heading>` cap-height (`flex items-center justify-between`), nudge `<Play />` icons inside circular buttons by `translate-x-[1px]`, and present each block as **1 vertical section scrolling downward** without duplicated previews.
- **Human-Experience Accessibility & Macro Layout Standard**:
  - Enforce W3C WCAG 2.2 AA/AAA contrast (`>= 4.5:1` text, `>= 7.0:1` on `LiquidGlass`, `>= 3.0:1` translucent tracks), Apple HIG Clarity/Deference/Depth (scrimmed backdrops and scrimmed helper pills, never raw captions over photos), Jakob Nielsen system status & reset controls, ISO 9241-112 luminance discriminability, and Don Norman tactile signifiers.
  - Compose all section, stage, and tuner layouts strictly with `<Section>`, `<Container>`, and `<Grid>` from `@hudbird/ui`.
- **Official Apple Live Activities & `WidgetKit.DynamicIsland` Architecture**:
  - Implement all 3 canonical presentations: **`compact`** (`compactLeading` + `<LiquidGlassSensor size="compact" />` + `compactTrailing` via `LiquidGlassIslandCompact`), **`minimal`** (attached minimal pill + detached `44×44px` circular bubble via `padding="minimal"` for concurrent activities), and **`expanded`** (`LiquidGlass radius="island"` `36px` + `padding="island"` `20pt` margin + `LiquidGlassIslandExpanded` `leading`, `trailing`, `center` below sensor, and `bottom`).
  - Enforce Macro-Tap discipline in `compact` and `minimal` (zero micro-buttons), `44pt` ergonomic controls in `expanded` `.bottom`, `ContainerRelativeShape` concentricity ($36 - 20 = 16\text{px}$ `Avatar radius="lg"`), inset-only `<Divider />` (zero full-bleed into curved walls), semantic `keylineTint`, and `tabularNums` on all live metrics.

## Included Flagship Blocks

### 1. `MorphingIsland`
- **Experience**: Eleven Apple Live Activity & `WidgetKit.DynamicIsland` blocks (`spotify`, `music`, `record`, `sport`, `call`, `timer`, `navigation`, `airdrop`, `flight`, `delivery`, `airpods`) transitioning across `compact`, `minimal` (concurrent detached bubble), and `expanded` presentations in `glass` (macOS Golden Gate refractive Liquid Glass), `dark` (Obsidian), and `light` (Daylight) modes with semantic `.keylineTint(_:)` and Golden Gate blur tuning.
- **Core Primitives Used**: `Section`, `Container`, `Grid`, `DoubleBezelCard`, `LiquidGlass`, `LiquidGlassBody`, `LiquidGlassStage`, `LiquidGlassSensor`, `LiquidGlassIslandCompact`, `LiquidGlassIslandExpanded`, `Divider`, `Tabs`, `Tab`, `Badge`, `Avatar`, `Slider`, `Progress`, `CircularProgress`, `Button`, `IconBox`, `Heading`, `Text`, `Lead`, `Code`.

### 2. `AgentArtifactCanvas`
- **Core Primitives Used**: `Section`, `Container`, `Grid` (`layout="bento-split"`), `DoubleBezelCard`, `Card`, `CardHeader`, `CardBody`, `Alert`, `Divider`, `Accordion`, `AccordionItem`, `Tabs`, `Tab`, `AreaChart`, `BarChart`, `Skeleton`, `Progress`, `Badge`, `Avatar`, `Button`, `KineticButton`, `IconBox`, `Heading`, `Text`, `Lead`, `Code`.

### 3. `InteractiveBentoShowcase`
- **Core Primitives Used**: `Section`, `Container`, `Grid` (`layout="bento-2-1"` & `layout="bento-1-2"`), `DoubleBezelCard`, `Card`, `CardBody`, `Alert`, `Divider`, `DescriptionList`, `Fieldset` (`variant="inset-grouped"`), `Command`, `Slider`, `BarChart`, `InputOTP`, `RadarChart`, `Switch`, `Badge`, `Button`, `IconBox`, `Heading`, `Text`, `Lead`.
