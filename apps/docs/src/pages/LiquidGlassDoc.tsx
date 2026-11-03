import React, { useState } from "react";
import liquidGlassCode from "../../../../packages/core/src/components/LiquidGlass/LiquidGlass.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import { DocHeader } from "../components/DocHeader";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";
import {
  Section,
  Container,
  Grid,
  LiquidGlass,
  LiquidGlassHeader,
  LiquidGlassBody,
  LiquidGlassFooter,
  LiquidGlassStage,
  LiquidGlassIslandCompact,
  type LiquidGlassMode,
  type LiquidGlassSpecular,
  type LiquidGlassTint,
  type LiquidGlassStageWallpaper,
  DoubleBezelCard,
  Avatar,
  Badge,
  Button,
  CircularProgress,
  Code,
  Divider,
  Heading,
  IconBox,
  Progress,
  Slider,
  Tabs,
  Tab,
  Text,
} from "@hudbird/ui";
import { Headphones, Play, Pause, RotateCcw, Sun, Volume2, Wifi, Plane } from "lucide-react";

const CALLER_AVATAR =
  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400";

export default function LiquidGlassDoc() {
  const [mode, setMode] = useState<LiquidGlassMode>("glass");
  const [blur, setBlur] = useState<number>(22);
  const [intensity, setIntensity] = useState<number>(56);
  const [saturation, setSaturation] = useState<number>(175);
  const [specular, setSpecular] = useState<LiquidGlassSpecular>("crisp");
  const [tint, setTint] = useState<LiquidGlassTint>("neutral");
  const [wallpaper, setWallpaper] = useState<LiquidGlassStageWallpaper>("golden-gate");

  // Interactive HUD demo states
  const [displayBrightness, setDisplayBrightness] = useState<number>(82);
  const [outputVolume, setOutputVolume] = useState<number>(64);
  const [hudPlaying, setHudPlaying] = useState<boolean>(true);

  const liquidGlassPropsRows: ApiPropRow[] = [
    {
      prop: "mode",
      type: '"glass" | "dark" | "light"',
      defaultVal: '"glass"',
      description:
        "Selects refractive Golden Gate Liquid Glass, Obsidian dark surface, or Daylight light surface.",
    },
    {
      prop: "blur",
      type: '"none" | "sm" | "md" | "golden-gate" | "lg" | "xl" | number',
      defaultVal: '"golden-gate" (22px)',
      description: "Optical backdrop blur preset or exact pixel value clamped between 0 and 64.",
    },
    {
      prop: "intensity",
      type: "number",
      defaultVal: "56 (glass) / 92 (dark) / 94 (light)",
      description:
        "Frost opacity percentage (8 to 92 in glass mode) calibrated with a WCAG 2.2 AA/AAA optical legibility floor.",
    },
    {
      prop: "saturation",
      type: "number",
      defaultVal: "175",
      description:
        "Backdrop color diffusion saturation percentage (100 to 220) to prevent muddy grey refraction.",
    },
    {
      prop: "specular",
      type: '"none" | "subtle" | "crisp" | "refractive"',
      defaultVal: '"crisp"',
      description:
        "Controls the 1px top specular highlight bevel and luminous perimeter separation.",
    },
    {
      prop: "tint",
      type: '"neutral" | "warm-gold" | "cool-mist" | "obsidian"',
      defaultVal: '"neutral"',
      description:
        "Applies a restrained chromatic tint to the refractive surface when mode is set to glass.",
    },
    {
      prop: "keylineTint",
      type: '"none" | "emerald" | "indigo" | "amber" | "rose" | "sky" | "purple"',
      defaultVal: '"none"',
      description:
        "WidgetKit .keylineTint(_:) semantic 1px outer perimeter border tint for Live Activities.",
    },
    {
      prop: "tone",
      type: '"auto" | "dark" | "light"',
      defaultVal: '"auto"',
      description: "Overrides foreground typography contrast inside the glass container.",
    },
    {
      prop: "radius",
      type: '"none" | "md" | "lg" | "full" | "island" | "capsule"',
      defaultVal: '"lg"',
      description:
        "Corner curvature including island (36px ContainerRelativeShape for 20pt padding) and capsule (rounded-full).",
    },
    {
      prop: "isHoverable",
      type: "boolean",
      defaultVal: "false",
      description: "Adds subtle elevation lift on pointer hover.",
    },
    {
      prop: "isPressable",
      type: "boolean",
      defaultVal: "false",
      description:
        "Enables tactile active scale feedback, button semantics, and Enter/Space keyboard activation.",
    },
  ];

  const stagePropsRows: ApiPropRow[] = [
    {
      prop: "mode",
      type: '"glass" | "dark" | "light"',
      defaultVal: '"glass"',
      description: "Synchronizes the stage surface with the active LiquidGlass mode.",
    },
    {
      prop: "wallpaper",
      type: '"golden-gate" | "coastal-dusk" | "architectural" | "none"',
      defaultVal: '"golden-gate"',
      description:
        "Ambient Pexels backdrop rendered with an Apple HIG deference scrim behind glass elements.",
    },
    {
      prop: "wallpaperUrl",
      type: "string",
      defaultVal: "undefined",
      description: "Optional custom backdrop image URL when mode is glass.",
    },
    {
      prop: "padding",
      type: '"sm" | "md" | "lg"',
      defaultVal: '"lg"',
      description: "Internal spatial clearance inside the stage container.",
    },
    {
      prop: "containerSize",
      type: '"sm" | "md" | "prose" | "lg" | "xl" | "2xl" | "fluid"',
      defaultVal: '"fluid"',
      description:
        "Composes @hudbird/ui Container inside the stage for responsive reading and HUD width constraints.",
    },
  ];

  const handleResetGoldenGate = () => {
    setMode("glass");
    setBlur(22);
    setIntensity(56);
    setSaturation(175);
    setSpecular("crisp");
    setTint("neutral");
    setWallpaper("golden-gate");
  };

  return (
    <div className="space-y-24 pb-24 sm:space-y-32">
      <DocHeader
        category="Components"
        title="Liquid Glass"
        badge="macOS Golden Gate"
        description="Refractive glassmorphic surface primitive modeled on macOS Golden Gate. Tune optical blur radius, frost opacity, color diffusion saturation, and specular edge separation across Glassmorphic, Dark, and Light modes."
      />

      {/* Interactive Golden Gate Appearance Playground */}
      <Section id="interactive-playground" spacing="none" className="scroll-mt-24 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Golden Gate Appearance Playground
            </h2>
            <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
              Adjust optical blur, Liquid Glass frost opacity, saturation, and specular bevels in
              real time.
            </p>
          </div>

          <Button size="sm" variant="outline" radius="full" onClick={handleResetGoldenGate}>
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Golden Gate Preset
          </Button>
        </div>

        {/* Control Matrix */}
        <DoubleBezelCard variant="default" padding="sm">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Text as="span" variant="subtle">
                  Mode
                </Text>
                <Tabs
                  size="sm"
                  variant="solid"
                  radius="lg"
                  selectedKey={mode}
                  onSelectionChange={(k) => setMode(k as LiquidGlassMode)}
                >
                  <Tab tabKey="glass" title="Glassmorphic" />
                  <Tab tabKey="dark" title="Dark" />
                  <Tab tabKey="light" title="Light" />
                </Tabs>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Text as="span" variant="subtle">
                  Specular Rim
                </Text>
                <Tabs
                  size="sm"
                  variant="solid"
                  radius="lg"
                  selectedKey={specular}
                  onSelectionChange={(k) => setSpecular(k as LiquidGlassSpecular)}
                >
                  <Tab tabKey="none" title="None" />
                  <Tab tabKey="subtle" title="Subtle" />
                  <Tab tabKey="crisp" title="Crisp" />
                  <Tab tabKey="refractive" title="Refractive" />
                </Tabs>
              </div>
            </div>

            <Divider variant="solid" />

            <Grid cols={3} gap="md">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Text as="span" variant="small" weight="semibold">
                    Optical Blur Radius
                  </Text>
                  <Code>{blur}px</Code>
                </div>
                <Slider
                  size="sm"
                  color="primary"
                  aria-label="Optical blur radius"
                  min={0}
                  max={48}
                  value={blur}
                  onChange={setBlur}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Text as="span" variant="small" weight="semibold">
                    Liquid Glass Opacity
                  </Text>
                  <Code>{intensity}%</Code>
                </div>
                <Slider
                  size="sm"
                  color="primary"
                  aria-label="Liquid Glass opacity"
                  min={10}
                  max={90}
                  value={intensity}
                  onChange={setIntensity}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Text as="span" variant="small" weight="semibold">
                    Color Diffusion Saturation
                  </Text>
                  <Code>{saturation}%</Code>
                </div>
                <Slider
                  size="sm"
                  color="primary"
                  aria-label="Color diffusion saturation"
                  min={100}
                  max={220}
                  value={saturation}
                  onChange={setSaturation}
                />
              </div>
            </Grid>

            {mode === "glass" && (
              <>
                <Divider variant="solid" />
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Text as="span" variant="subtle">
                      Glass Tint
                    </Text>
                    <Tabs
                      size="sm"
                      variant="solid"
                      radius="lg"
                      selectedKey={tint}
                      onSelectionChange={(k) => setTint(k as LiquidGlassTint)}
                    >
                      <Tab tabKey="neutral" title="Neutral" />
                      <Tab tabKey="warm-gold" title="Warm Gold" />
                      <Tab tabKey="cool-mist" title="Cool Mist" />
                      <Tab tabKey="obsidian" title="Obsidian" />
                    </Tabs>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Text as="span" variant="subtle">
                      Backdrop
                    </Text>
                    <Tabs
                      size="sm"
                      variant="solid"
                      radius="lg"
                      selectedKey={wallpaper}
                      onSelectionChange={(k) => setWallpaper(k as LiquidGlassStageWallpaper)}
                    >
                      <Tab tabKey="golden-gate" title="Golden Gate" />
                      <Tab tabKey="coastal-dusk" title="Coastal Mist" />
                      <Tab tabKey="architectural" title="Horizon Gradient" />
                    </Tabs>
                  </div>
                </div>
              </>
            )}
          </div>
        </DoubleBezelCard>

        <ComponentPreview>
          <Container size="fluid" gutter="none" className="p-2 sm:p-4">
            <DoubleBezelCard variant="default" padding="none">
              <LiquidGlassStage mode={mode} wallpaper={wallpaper} padding="lg" containerSize="sm">
                <div className="flex min-h-[260px] items-center justify-center">
                  <LiquidGlass
                    mode={mode}
                    blur={blur}
                    intensity={intensity}
                    saturation={saturation}
                    specular={specular}
                    tint={tint}
                    radius="full"
                    className="w-full"
                  >
                    <LiquidGlassHeader>
                      <div className="flex items-center gap-3">
                        <IconBox size="sm" variant="glass" showGlow={false} icon={Plane} />
                        <div className="flex flex-col justify-center gap-0.5 leading-tight">
                          <Heading as="h3" size="h5">
                            ANA NH107 · Golden Gate Departure
                          </Heading>
                          <Text variant="small">San Francisco (SFO) to Tokyo Haneda (HND)</Text>
                        </div>
                      </div>
                      <Badge variant="soft" color="success" size="md">
                        Gate G9
                      </Badge>
                    </LiquidGlassHeader>

                    <LiquidGlassBody>
                      <Progress
                        size="sm"
                        radius="full"
                        color="primary"
                        value={68}
                        label="Pacific flight corridor · 3h 48m remaining"
                        showValueLabel
                      />
                    </LiquidGlassBody>

                    <Divider variant="solid" />

                    <LiquidGlassFooter>
                      <Code>Seat 4A · Priority</Code>
                      <Badge variant="soft" color="primary" size="md">
                        {mode.toUpperCase()} · {blur}px Blur
                      </Badge>
                    </LiquidGlassFooter>
                  </LiquidGlass>
                </div>
              </LiquidGlassStage>
            </DoubleBezelCard>
          </Container>
        </ComponentPreview>

        <CodeBlock
          code={`import {
  LiquidGlass,
  LiquidGlassHeader,
  LiquidGlassBody,
  LiquidGlassFooter,
  LiquidGlassStage,
  Badge,
  Code,
  Divider,
  Heading,
  IconBox,
  Progress,
  Text,
} from "@hudbird/ui";
import { Plane } from "lucide-react";

export function GoldenGateCardDemo() {
  return (
    <LiquidGlassStage mode="${mode}" wallpaper="${wallpaper}" containerSize="sm">
      <LiquidGlass
        mode="${mode}"
        blur={${blur}}
        intensity={${intensity}}
        saturation={${saturation}}
        specular="${specular}"
        tint="${tint}"
        radius="full"
      >
        <LiquidGlassHeader>
          <div className="flex items-center gap-3">
            <IconBox size="sm" variant="glass" showGlow={false} icon={Plane} />
            <div className="flex flex-col justify-center gap-0.5 leading-tight">
              <Heading as="h3" size="h5">ANA NH107 · Golden Gate Departure</Heading>
              <Text variant="small">San Francisco (SFO) to Tokyo Haneda (HND)</Text>
            </div>
          </div>
          <Badge variant="soft" color="success" size="md">Gate G9</Badge>
        </LiquidGlassHeader>

        <LiquidGlassBody>
          <Progress
            size="sm"
            radius="full"
            color="primary"
            value={68}
            label="Pacific flight corridor · 3h 48m remaining"
            showValueLabel
          />
        </LiquidGlassBody>

        <Divider variant="solid" />

        <LiquidGlassFooter>
          <Code>Seat 4A · Priority</Code>
          <Badge variant="soft" color="primary" size="md">On Schedule</Badge>
        </LiquidGlassFooter>
      </LiquidGlass>
    </LiquidGlassStage>
  );
}`}
        />
      </Section>

      {/* Installation */}
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="liquid-glass" manualCode={liquidGlassCode} />
      </div>

      {/* Component API */}
      <Section id="component-api" spacing="none" className="scroll-mt-24 space-y-8">
        <div>
          <h2 className="font-outfit mb-4 text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Component API
          </h2>
          <div className="space-y-8">
            <ApiTable title="LiquidGlass Props" rows={liquidGlassPropsRows} />
            <ApiTable title="LiquidGlassStage Props" rows={stagePropsRows} />
          </div>
        </div>
      </Section>

      {/* Examples */}
      <div id="examples" className="scroll-mt-24 space-y-20">
        {/* 1. Surface Modes */}
        <Section id="surface-modes" spacing="none" className="scroll-mt-24 space-y-6">
          <div>
            <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
              Surface Modes: Glassmorphic, Dark, and Light
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Every LiquidGlass primitive switches cleanly between refractive Golden Gate glass,
              Obsidian dark, and Daylight light while preserving WCAG 2.2 AA/AAA contrast
              automatically.
            </p>
          </div>

          <ComponentPreview>
            <Grid cols={3} gap="md" className="p-2">
              {(["glass", "dark", "light"] as const).map((surfaceMode) => (
                <LiquidGlassStage
                  key={surfaceMode}
                  mode={surfaceMode}
                  wallpaper="golden-gate"
                  padding="sm"
                >
                  <LiquidGlass mode={surfaceMode} blur="golden-gate" specular="crisp" radius="lg">
                    <LiquidGlassHeader>
                      <Heading as="h4" size="h5" className="capitalize">
                        {surfaceMode} Surface
                      </Heading>
                      <Badge variant="soft" color="success" size="sm">
                        Active
                      </Badge>
                    </LiquidGlassHeader>
                    <LiquidGlassBody>
                      <Text variant="small">
                        Calibrated 1px specular bevel with automatic typography contrast for{" "}
                        {surfaceMode} environments.
                      </Text>
                    </LiquidGlassBody>
                  </LiquidGlass>
                </LiquidGlassStage>
              ))}
            </Grid>
          </ComponentPreview>
        </Section>

        {/* 2. Concentric Capsules */}
        <Section id="concentric-capsules" spacing="none" className="scroll-mt-24 space-y-6">
          <div>
            <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
              WidgetKit DynamicIsland Compact & Minimal Capsules
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Combine LiquidGlassIslandCompact, semantic keylineTint, and LiquidGlassBody
              padding=&quot;compactPill&quot; or padding=&quot;minimal&quot; to flank the centered
              TrueDepth sensor and render detached 44pt concurrent Live Activity bubbles.
            </p>
          </div>

          <ComponentPreview>
            <Container size="fluid" gutter="none" className="p-2">
              <LiquidGlassStage
                mode="glass"
                wallpaper="coastal-dusk"
                padding="md"
                containerSize="sm"
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <LiquidGlass
                    mode="glass"
                    blur={24}
                    intensity={56}
                    specular="refractive"
                    keylineTint="emerald"
                    radius="capsule"
                    className="w-full max-w-[320px]"
                  >
                    <LiquidGlassBody padding="compactPill">
                      <LiquidGlassIslandCompact
                        leading={
                          <Avatar
                            src={CALLER_AVATAR}
                            alt="Tania Castillo"
                            size="sm"
                            radius="full"
                          />
                        }
                        trailing={
                          <Badge variant="soft" color="success" size="sm">
                            00:14
                          </Badge>
                        }
                      />
                    </LiquidGlassBody>
                  </LiquidGlass>

                  <div className="flex items-center justify-center gap-2.5">
                    <LiquidGlass
                      mode="glass"
                      blur={24}
                      intensity={56}
                      specular="refractive"
                      keylineTint="emerald"
                      radius="capsule"
                    >
                      <LiquidGlassBody padding="compactPill">
                        <LiquidGlassIslandCompact
                          leading={
                            <div className="flex items-center gap-1.5 pl-1">
                              <Headphones className="h-4 w-4 shrink-0" />
                              <Text
                                as="span"
                                variant="strong"
                                tabularNums
                                className="text-xs leading-none"
                              >
                                94%
                              </Text>
                            </div>
                          }
                        />
                      </LiquidGlassBody>
                    </LiquidGlass>

                    <LiquidGlass
                      mode="glass"
                      blur={24}
                      intensity={56}
                      specular="refractive"
                      keylineTint="amber"
                      radius="capsule"
                    >
                      <LiquidGlassBody padding="minimal">
                        <CircularProgress size="sm" color="warning" value={68} />
                      </LiquidGlassBody>
                    </LiquidGlass>
                  </div>
                </div>
              </LiquidGlassStage>
            </Container>
          </ComponentPreview>
        </Section>

        {/* 3. Control Center HUD */}
        <Section id="control-toolbar" spacing="none" className="scroll-mt-24 space-y-6">
          <div>
            <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
              macOS Golden Gate Control Center Module
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Compose LiquidGlass with Hudbird sliders, icon boxes, and tactile buttons for system
              overlays and floating desktop inspectors.
            </p>
          </div>

          <ComponentPreview>
            <Container size="fluid" gutter="none" className="p-2">
              <LiquidGlassStage
                mode="glass"
                wallpaper="golden-gate"
                padding="lg"
                containerSize="sm"
              >
                <LiquidGlass
                  mode="glass"
                  blur={26}
                  intensity={58}
                  specular="refractive"
                  tint="warm-gold"
                  radius="full"
                >
                  <LiquidGlassHeader>
                    <div className="flex items-center gap-3">
                      <IconBox size="sm" variant="glass" showGlow={false} icon={Wifi} />
                      <div className="flex flex-col justify-center gap-0.5 leading-tight">
                        <Heading as="h4" size="h5">
                          Studio Display & Audio
                        </Heading>
                        <Text variant="small">Wi-Fi 7 · 6 GHz Connected</Text>
                      </div>
                    </div>

                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      color="primary"
                      radius="full"
                      aria-label={hudPlaying ? "Pause audio" : "Play audio"}
                      onClick={() => setHudPlaying((prev) => !prev)}
                    >
                      {hudPlaying ? (
                        <Pause className="h-3.5 w-3.5" />
                      ) : (
                        <Play className="h-3.5 w-3.5 translate-x-[1px]" />
                      )}
                    </Button>
                  </LiquidGlassHeader>

                  <LiquidGlassBody>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4 shrink-0" />
                            <Text
                              as="span"
                              variant="small"
                              weight="medium"
                              className="leading-none"
                            >
                              Display Brightness
                            </Text>
                          </div>
                          <Code>{displayBrightness}%</Code>
                        </div>
                        <Slider
                          size="sm"
                          color="primary"
                          aria-label="Display brightness"
                          min={10}
                          max={100}
                          value={displayBrightness}
                          onChange={setDisplayBrightness}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Volume2 className="h-4 w-4 shrink-0" />
                            <Text
                              as="span"
                              variant="small"
                              weight="medium"
                              className="leading-none"
                            >
                              Output Volume
                            </Text>
                          </div>
                          <Code>{outputVolume}%</Code>
                        </div>
                        <Slider
                          size="sm"
                          color="primary"
                          aria-label="Output volume"
                          min={0}
                          max={100}
                          value={outputVolume}
                          onChange={setOutputVolume}
                        />
                      </div>
                    </div>
                  </LiquidGlassBody>
                </LiquidGlass>
              </LiquidGlassStage>
            </Container>
          </ComponentPreview>
        </Section>
      </div>
    </div>
  );
}
