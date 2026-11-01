import React, { useState } from "react";
import { DocHeader } from "../components/DocHeader";
import {
  Card,
  Button,
  Input,
  Badge,
  Tabs,
  Tab,
  Select,
  SelectItem,
  Switch,
  Checkbox,
  Divider,
} from "@hudbird/ui";
import { Palette, Layers, Type, Sliders, Check } from "lucide-react";
import { ThemeSyncBar } from "../components/theme-editor/ThemeSyncBar";

export default function ThemesDoc() {
  const [tab, setTab] = useState("components");
  const [switchState, setSwitchState] = useState(true);
  const [checkboxState, setCheckboxState] = useState(true);

  return (
    <div className="space-y-16 pb-24">
      <DocHeader
        category="CUSTOMIZATION"
        title="Theme Builder"
        description="Customize and calibrate your design tokens in real time. Adjust primary hues, neutral base tones, typography scales, and concentric border radiuses, and export production-ready Tailwind v4 @theme directives or Figma Tokens Studio DTCG JSON."
      />

      <div className="w-full space-y-8">
        {/* Interactive Theme Token Sync & Exporter Bar */}
        <ThemeSyncBar />

        {/* Live Token & Component Preview Workbench */}
        <div data-theme-preview className="w-full">
          <div className="bg-background text-foreground border-border/60 flex min-h-[500px] flex-col overflow-hidden rounded-2xl border shadow-sm">
            {/* Header / Sub-bar */}
            <header className="border-border/60 flex h-14 items-center justify-between border-b px-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex h-7 w-7 items-center justify-center rounded-lg">
                  <Palette className="h-4 w-4" />
                </div>
                <span className="text-sm font-semibold tracking-tight">
                  Design Token Live Workbench
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="soft" color="primary" size="sm">
                  Live Token Binding
                </Badge>
              </div>
            </header>

            {/* Workbench Navigation */}
            <main className="flex-1 p-6 md:p-8">
              <Tabs
                variant="solid"
                size="sm"
                radius="md"
                selectedKey={tab}
                onSelectionChange={setTab}
                className="mb-8"
              >
                <Tab tabKey="components" title="Core Components" />
                <Tab tabKey="typography" title="Typography & Readability" />
                <Tab tabKey="surfaces" title="Surfaces & Radius" />
              </Tabs>

              {/* Tab 1: Core Components */}
              {tab === "components" && (
                <div className="animate-in fade-in space-y-8 duration-200">
                  {/* Buttons Section */}
                  <div className="space-y-3">
                    <h3 className="font-outfit text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                      Button Variants & State Styles
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="solid" color="primary">
                        Primary Solid
                      </Button>
                      <Button variant="bordered" color="secondary">
                        Secondary Bordered
                      </Button>
                      <Button variant="flat" color="primary">
                        Flat Soft
                      </Button>
                      <Button variant="light" color="secondary">
                        Light Ghost
                      </Button>
                      <Button variant="solid" color="primary" isDisabled>
                        Disabled
                      </Button>
                    </div>
                  </div>

                  <Divider />

                  {/* Form Controls Section */}
                  <div className="space-y-4">
                    <h3 className="font-outfit text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                      Interactive Form Primitives
                    </h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <label className="text-foreground text-sm font-semibold">Input Field</label>
                        <Input
                          placeholder="Your organization name..."
                          size="md"
                          radius="md"
                          aria-label="Organization name"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-foreground text-sm font-semibold">
                          Dropdown Selection
                        </label>
                        <Select
                          placeholder="Select component category"
                          aria-label="Component category"
                        >
                          <SelectItem value="primitives">Primitives</SelectItem>
                          <SelectItem value="forms">Form Controls</SelectItem>
                          <SelectItem value="overlays">Overlays & Modals</SelectItem>
                        </Select>
                      </div>

                      <div className="space-y-3 pt-1">
                        <label className="text-foreground text-sm font-semibold">
                          Toggles & Checkboxes
                        </label>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={switchState}
                              onChange={(e) => setSwitchState(e.target.checked)}
                              aria-label="Live theme toggle"
                            />
                            <span className="text-muted-foreground text-sm">Live Active</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={checkboxState}
                              onChange={(e) => setCheckboxState(e.target.checked)}
                              aria-label="Concentric border test"
                            />
                            <span className="text-muted-foreground text-sm">Inherit Radius</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Divider />

                  {/* Badge & Status Indicators */}
                  <div className="space-y-3">
                    <h3 className="font-outfit text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                      Status & Semantic Badges
                    </h3>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Badge variant="solid" color="primary">
                        Primary Solid
                      </Badge>
                      <Badge variant="soft" color="primary">
                        Primary Soft
                      </Badge>
                      <Badge variant="bordered" color="secondary">
                        Secondary Bordered
                      </Badge>
                      <Badge variant="soft" color="success">
                        Verified
                      </Badge>
                      <Badge variant="soft" color="warning">
                        Review Needed
                      </Badge>
                      <Badge variant="soft" color="danger">
                        Critical
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Typography & Readability */}
              {tab === "typography" && (
                <div className="animate-in fade-in space-y-6 duration-200">
                  <div className="space-y-1">
                    <span className="text-muted-foreground font-mono text-xs">
                      Display Title (Outfit / --theme-font-heading)
                    </span>
                    <h1 className="font-heading text-foreground text-3xl font-bold tracking-tight md:text-4xl">
                      Architectural interfaces with deliberate typographic rhythm.
                    </h1>
                  </div>

                  <div className="space-y-1">
                    <span className="text-muted-foreground font-mono text-xs">
                      Subheading & Section Title
                    </span>
                    <h2 className="font-heading text-foreground text-xl font-semibold">
                      Engineered for high-agency developer tools and production systems.
                    </h2>
                  </div>

                  <div className="space-y-1">
                    <span className="text-muted-foreground font-mono text-xs">
                      Body Paragraph (Inter / --theme-font-sans)
                    </span>
                    <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed sm:text-base">
                      Every interface element derives its visual weight from typographic hierarchy
                      rather than arbitrary decoration. Proportional line-heights and controlled
                      tracking preserve legibility across diverse screen resolutions and both light
                      and dark color schemes.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-muted-foreground font-mono text-xs">
                      Code & Telemetry (JetBrains Mono)
                    </span>
                    <pre className="border-border/60 bg-muted/30 text-foreground overflow-x-auto rounded-xl border p-4 font-mono text-xs sm:text-sm">
                      <code>{`@theme {
  --color-primary: var(--theme-primary, oklch(0.53 0.26 276));
  --radius: var(--theme-radius, 0.5rem);
  --font-heading: var(--theme-font-heading, "Outfit");
}`}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Tab 3: Surfaces & Radius */}
              {tab === "surfaces" && (
                <div className="animate-in fade-in space-y-6 duration-200">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card className="p-6">
                      <div className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
                        Card Surface 1
                      </div>
                      <h4 className="font-heading text-foreground text-base font-semibold">
                        Standard Card Surface
                      </h4>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                        Uses computed{" "}
                        <code className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-xs">
                          --radius
                        </code>{" "}
                        with hairline border for crisp tactile boundaries.
                      </p>
                    </Card>

                    <Card className="p-6">
                      <div className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
                        Card Surface 2
                      </div>
                      <h4 className="font-heading text-foreground text-base font-semibold">
                        Concentric Padding
                      </h4>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                        Internal child components follow R_inner = R_outer - padding, eliminating
                        awkward visual corner bunching.
                      </p>
                    </Card>

                    <Card className="p-6">
                      <div className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
                        Card Surface 3
                      </div>
                      <h4 className="font-heading text-foreground text-base font-semibold">
                        High-Contrast Surface
                      </h4>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                        Optimized for Obsidian #161618 canvas in dark mode and clean off-white in
                        light mode.
                      </p>
                    </Card>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
