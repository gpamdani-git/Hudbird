import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MorphingIsland,
  type MorphingIslandMode,
  type DynamicIslandPresentation,
} from "@hudbird/marketing";
import {
  Section,
  Container,
  Grid,
  DoubleBezelCard,
  Tabs,
  Tab,
  Slider,
  Button,
  Code,
  Divider,
  Text,
  type LiquidGlassMode,
  type LiquidGlassSpecular,
  type LiquidGlassStageWallpaper,
} from "@hudbird/ui";
import { RotateCcw } from "lucide-react";
import { DocHeader } from "../../components/DocHeader";
import { InstallationTabs } from "../../components/InstallationTabs";
import { MarketingPreview } from "../../components/MarketingPreview";
import { ApiTable, type ApiPropRow } from "../../components/ApiTable";
import morphingIslandCode from "../../../../../packages/marketing/src/components/SignatureBlocks/MorphingIsland.tsx?raw";
import skillContent from "../../../../../.agents/skills/marketing-signature-blocks/SKILL.md?raw";

interface IslandSectionSpec {
  id: MorphingIslandMode;
  previewTitle: string;
  previewSubtitle: string;
  componentName: string;
}

const ISLAND_SECTIONS: readonly IslandSectionSpec[] = [
  {
    id: "spotify",
    previewTitle: "1. Spotify Live Audio Capsule",
    previewSubtitle:
      "Concentric album cover and tabular clock flanking the TrueDepth sensor, morphing into a 4-region expanded playback island with emerald keyline tint.",
    componentName: "SpotifyDynamicIsland",
  },
  {
    id: "music",
    previewTitle: "2. Music Player & Scrubber",
    previewSubtitle:
      "ContainerRelativeShape lossless player with 16px concentric cover art inside 20pt margins, interactive timeline slider, and 44pt transport controls.",
    componentName: "MusicPlayerIsland",
  },
  {
    id: "record",
    previewTitle: "3. Screen & Mic Capture",
    previewSubtitle:
      "Live capture indicator with rose keyline tint, monospaced session timer, input gain progress bar, and tactile pause or stop controls.",
    componentName: "ScreenCaptureIsland",
  },
  {
    id: "sport",
    previewTitle: "4. Live Sports Scoreboard",
    previewSubtitle:
      "Club crests and live score flanking the sensor in Compact view, expanding into an unobstructed center scoreboard and possession bar.",
    componentName: "LiveSportIsland",
  },
  {
    id: "call",
    previewTitle: "5. Incoming & Active Audio Call",
    previewSubtitle:
      "Macro-tappable caller capsule in Compact and Minimal states that opens into 44pt ergonomic mute, accept, and end call actions.",
    componentName: "AudioCallIsland",
  },
  {
    id: "timer",
    previewTitle: "6. Countdown Timer",
    previewSubtitle:
      "Circular progress ring and monospaced countdown flanking the TrueDepth sensor, expanding into display typography and amber keyline tint.",
    componentName: "CountdownTimerIsland",
  },
  {
    id: "navigation",
    previewTitle: "7. Turn-by-Turn Navigation",
    previewSubtitle:
      "Glanceable maneuver distance and street token in Compact mode that expands into full turn guidance and route progress.",
    componentName: "NavigationIsland",
  },
  {
    id: "airdrop",
    previewTitle: "8. AirDrop Photo Transfer",
    previewSubtitle:
      "Sender avatar and live transfer percentage flanking the sensor, expanding into a circular completion ring and replay action.",
    componentName: "AirDropTransferIsland",
  },
  {
    id: "flight",
    previewTitle: "9. Flight Boarding & Corridor Tracker",
    previewSubtitle:
      "Airport code and gate badge flanking the TrueDepth cutout that opens into SFO to HND corridor progress and phase switching.",
    componentName: "FlightTrackerIsland",
  },
  {
    id: "delivery",
    previewTitle: "10. Live Ride & Pickup Tracker",
    previewSubtitle:
      "Curbside pickup ETA and vehicle avatar pill that expands into license plate telemetry, pickup progress, and stage advancement.",
    componentName: "RidePickupIsland",
  },
  {
    id: "airpods",
    previewTitle: "11. AirPods Pro & Spatial Audio HUD",
    previewSubtitle:
      "Hardware battery ring capsule that morphs into Noise Cancel, Adaptive, and Transparency controls within inset 20pt margins.",
    componentName: "AirPodsSpatialIsland",
  },
];

function createPresentationMap(
  value: DynamicIslandPresentation
): Record<MorphingIslandMode, DynamicIslandPresentation> {
  return {
    spotify: value,
    music: value,
    record: value,
    sport: value,
    call: value,
    timer: value,
    navigation: value,
    airdrop: value,
    flight: value,
    delivery: value,
    airpods: value,
  };
}

function buildStandaloneSnippet(
  componentName: string,
  mode: MorphingIslandMode,
  presentation: DynamicIslandPresentation,
  enableKeylineTint: boolean,
  surfaceMode: LiquidGlassMode,
  blur: number,
  intensity: number,
  specular: LiquidGlassSpecular
): string {
  return `import { MorphingIsland } from "@hudbird/marketing";

export function ${componentName}() {
  return (
    <MorphingIsland
      defaultMode="${mode}"
      defaultPresentation="${presentation}"
      enableKeylineTint={${enableKeylineTint}}
      defaultSurfaceMode="${surfaceMode}"
      defaultBlur={${blur}}
      defaultIntensity={${intensity}}
      specular="${specular}"
      standalone
    />
  );
}`;
}

const apiRows: ApiPropRow[] = [
  {
    prop: "defaultMode / mode",
    type: '"spotify" | "music" | "record" | "sport" | "call" | "timer" | "navigation" | "airdrop" | "flight" | "delivery" | "airpods"',
    defaultVal: '"spotify"',
    description: "Initial or controlled Dynamic Island Live Activity rendered in the stage.",
  },
  {
    prop: "defaultPresentation / presentation",
    type: '"compact" | "minimal" | "expanded"',
    defaultVal: '"expanded"',
    description:
      "Official Apple WidgetKit DynamicIsland presentation: Compact (flanking TrueDepth sensor), Minimal (attached pill + detached 44pt concurrent bubble), or Expanded (leading, trailing, center, bottom).",
  },
  {
    prop: "enableKeylineTint",
    type: "boolean",
    defaultVal: "false",
    description:
      "Applies WidgetKit .keylineTint(_:) semantic 1px perimeter border tint per Live Activity.",
  },
  {
    prop: "defaultSurfaceMode / surfaceMode",
    type: '"glass" | "dark" | "light"',
    defaultVal: '"glass"',
    description:
      "Selects macOS Golden Gate refractive Liquid Glass, Obsidian dark, or Daylight light mode.",
  },
  {
    prop: "defaultBlur / blur",
    type: "number",
    defaultVal: "22",
    description:
      "Optical backdrop blur radius in pixels (0 to 64) passed to the @hudbird/ui LiquidGlass primitive.",
  },
  {
    prop: "defaultIntensity / intensity",
    type: "number",
    defaultVal: "56",
    description:
      "Liquid Glass frost opacity percentage (8 to 92) calibrated with a WCAG 2.2 AA/AAA legibility floor.",
  },
  {
    prop: "specular",
    type: '"none" | "subtle" | "crisp" | "refractive"',
    defaultVal: '"crisp"',
    description: "Controls the 1px top specular highlight bevel and physical outer edge contrast.",
  },
  {
    prop: "wallpaper",
    type: '"golden-gate" | "coastal-dusk" | "architectural" | "none"',
    defaultVal: '"golden-gate"',
    description:
      "Ambient backdrop displayed inside LiquidGlassStage when surfaceMode is set to glass.",
  },
  {
    prop: "showGlassControls",
    type: "boolean",
    defaultVal: "false",
    description:
      "Starts with the inline Golden Gate optical blur and frost opacity sliders expanded.",
  },
  {
    prop: "standalone",
    type: "boolean",
    defaultVal: "false",
    description:
      "Renders a dedicated single-activity island section without the multi-mode tab bar.",
  },
  {
    prop: "defaultExpanded",
    type: "boolean",
    defaultVal: "true",
    description:
      "Backward-compatible shorthand for starting in Expanded vs Compact presentation when defaultPresentation is omitted.",
  },
];

export default function MorphingIslandDoc() {
  const [masterPresentation, setMasterPresentation] =
    useState<DynamicIslandPresentation>("expanded");
  const [blockPresentations, setBlockPresentations] = useState<
    Record<MorphingIslandMode, DynamicIslandPresentation>
  >(() => createPresentationMap("expanded"));
  const [enableKeylineTint, setEnableKeylineTint] = useState<boolean>(false);
  const [surfaceMode, setSurfaceMode] = useState<LiquidGlassMode>("glass");
  const [blur, setBlur] = useState<number>(22);
  const [intensity, setIntensity] = useState<number>(56);
  const [specular, setSpecular] = useState<LiquidGlassSpecular>("crisp");
  const [wallpaper, setWallpaper] = useState<LiquidGlassStageWallpaper>("golden-gate");

  const handleMasterPresentationChange = (next: DynamicIslandPresentation) => {
    setMasterPresentation(next);
    setBlockPresentations(createPresentationMap(next));
  };

  const handleResetAppearance = () => {
    setMasterPresentation("expanded");
    setBlockPresentations(createPresentationMap("expanded"));
    setEnableKeylineTint(false);
    setSurfaceMode("glass");
    setBlur(22);
    setIntensity(56);
    setSpecular("crisp");
    setWallpaper("golden-gate");
  };

  return (
    <div className="space-y-24 pb-24 sm:space-y-32">
      <DocHeader
        category="Signature Blocks"
        title="Morphing Island"
        description="Eleven Apple Live Activity & WidgetKit DynamicIsland blocks powered by @hudbird/ui LiquidGlass across Compact, Minimal (concurrent detached bubble), and Expanded 4-region presentations."
      />

      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="morphing-island" manualCode={morphingIslandCode} />
      </div>

      <Section id="examples" spacing="none" className="scroll-mt-24 space-y-16">
        <Container size="fluid" gutter="none" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
                Dynamic Island Blocks (11 Live Activities)
              </h2>
              <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                Powered by the{" "}
                <Link
                  to="/liquid-glass"
                  className="font-medium text-indigo-600 underline underline-offset-4 dark:text-indigo-400"
                >
                  LiquidGlass
                </Link>{" "}
                core primitive and Apple HIG Live Activity geometry. Switch between Compact,
                Minimal, and Expanded presentations or tune Golden Gate refraction across all 11
                blocks below.
              </p>
            </div>

            <Button size="sm" variant="outline" radius="full" onClick={handleResetAppearance}>
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Golden Gate Preset
            </Button>
          </div>

          {/* Master macOS Golden Gate & WidgetKit Presentation Bar */}
          <DoubleBezelCard variant="default" padding="sm">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Text as="span" variant="subtle">
                    Presentation
                  </Text>
                  <Tabs
                    size="sm"
                    variant="solid"
                    radius="lg"
                    selectedKey={masterPresentation}
                    onSelectionChange={(k) =>
                      handleMasterPresentationChange(k as DynamicIslandPresentation)
                    }
                  >
                    <Tab tabKey="compact" title="Compact" />
                    <Tab tabKey="minimal" title="Minimal" />
                    <Tab tabKey="expanded" title="Expanded" />
                  </Tabs>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Text as="span" variant="subtle">
                    Surface Mode
                  </Text>
                  <Tabs
                    size="sm"
                    variant="solid"
                    radius="lg"
                    selectedKey={surfaceMode}
                    onSelectionChange={(k) => setSurfaceMode(k as LiquidGlassMode)}
                  >
                    <Tab tabKey="glass" title="Glassmorphic" />
                    <Tab tabKey="dark" title="Dark" />
                    <Tab tabKey="light" title="Light" />
                  </Tabs>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Text as="span" variant="subtle">
                    Keyline Tint
                  </Text>
                  <Tabs
                    size="sm"
                    variant="solid"
                    radius="lg"
                    selectedKey={enableKeylineTint ? "on" : "off"}
                    onSelectionChange={(k) => setEnableKeylineTint(k === "on")}
                  >
                    <Tab tabKey="on" title="Active" />
                    <Tab tabKey="off" title="Neutral" />
                  </Tabs>
                </div>
              </div>

              <Divider variant="solid" />

              <div className="flex flex-wrap items-center justify-between gap-4">
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
                    <Tab tabKey="subtle" title="Subtle" />
                    <Tab tabKey="crisp" title="Crisp" />
                    <Tab tabKey="refractive" title="Refractive" />
                  </Tabs>
                </div>

                {surfaceMode === "glass" && (
                  <div className="flex flex-wrap items-center gap-3">
                    <Text as="span" variant="subtle">
                      Stage
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
                      <Tab tabKey="architectural" title="Horizon" />
                    </Tabs>
                  </div>
                )}
              </div>

              <Divider variant="solid" />

              <Grid cols={2} gap="md">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Text as="span" variant="small" weight="semibold">
                      Golden Gate Optical Blur
                    </Text>
                    <Code>{blur}px</Code>
                  </div>
                  <Slider
                    size="sm"
                    color="primary"
                    aria-label="Global Golden Gate optical blur"
                    min={0}
                    max={48}
                    value={blur}
                    onChange={setBlur}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Text as="span" variant="small" weight="semibold">
                      Liquid Glass Frost Opacity
                    </Text>
                    <Code>{intensity}%</Code>
                  </div>
                  <Slider
                    size="sm"
                    color="primary"
                    aria-label="Global Liquid Glass frost opacity"
                    min={10}
                    max={90}
                    value={intensity}
                    onChange={setIntensity}
                  />
                </div>
              </Grid>
            </div>
          </DoubleBezelCard>
        </Container>

        <div className="space-y-20">
          {ISLAND_SECTIONS.map((item) => (
            <div key={item.id} id={item.id} className="scroll-mt-24">
              <MarketingPreview
                title={item.previewTitle}
                subtitle={item.previewSubtitle}
                code={buildStandaloneSnippet(
                  item.componentName,
                  item.id,
                  blockPresentations[item.id],
                  enableKeylineTint,
                  surfaceMode,
                  blur,
                  intensity,
                  specular
                )}
                skill={skillContent}
                minHeight={580}
              >
                <MorphingIsland
                  defaultMode={item.id}
                  presentation={blockPresentations[item.id]}
                  onPresentationChange={(next) =>
                    setBlockPresentations((prev) => ({ ...prev, [item.id]: next }))
                  }
                  enableKeylineTint={enableKeylineTint}
                  surfaceMode={surfaceMode}
                  onSurfaceModeChange={setSurfaceMode}
                  blur={blur}
                  onBlurChange={setBlur}
                  intensity={intensity}
                  onIntensityChange={setIntensity}
                  specular={specular}
                  wallpaper={wallpaper}
                  standalone
                />
              </MarketingPreview>
            </div>
          ))}
        </div>
      </Section>

      <Section id="component-api" spacing="none" className="scroll-mt-24 space-y-8">
        <div>
          <h2 className="font-outfit mb-4 text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Component API
          </h2>
          <ApiTable title="MorphingIsland Props" rows={apiRows} />
        </div>
      </Section>
    </div>
  );
}
