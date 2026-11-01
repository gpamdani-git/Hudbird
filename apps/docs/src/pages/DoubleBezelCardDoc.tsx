// apps/docs/src/pages/DoubleBezelCardDoc.tsx
import React, { useState } from "react";
import doubleBezelCardCode from "../../../../packages/core/src/components/DoubleBezelCard/DoubleBezelCard.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import { DocHeader } from "../components/DocHeader";
import { DoubleBezelCard, Button, Badge } from "@hudbird/ui";
import {
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Layers,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const doubleBezelCardTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "interactive-playground", title: "Interactive Chassis Playground" },
      { id: "all-variants", title: "Surface Variants" },
      { id: "metric-card", title: "Architectural Metric Card" },
      { id: "concentric-geometry", title: "Concentric Radii Geometry" },
    ],
  },
];

export default function DoubleBezelCardDoc() {
  const [selectedVariant, setSelectedVariant] = useState<
    "default" | "glass" | "solid" | "highlight"
  >("default");
  const [selectedPadding, setSelectedPadding] = useState<"none" | "sm" | "md" | "lg">("md");
  const [showCrosshairs, setShowCrosshairs] = useState(true);
  const [isHoverable, setIsHoverable] = useState(true);

  const apiRows: ApiPropRow[] = [
    {
      prop: "variant",
      type: '"default" | "glass" | "solid" | "highlight"',
      defaultVal: '"default"',
      description: "Visual styling of outer chassis and inner core surface.",
    },
    {
      prop: "padding",
      type: '"none" | "sm" | "md" | "lg"',
      defaultVal: '"md"',
      description: "Inner padding scale applied to the internal core container.",
    },
    {
      prop: "showCrosshairs",
      type: "boolean | CornerCrosshairPosition[]",
      defaultVal: "false",
      description: "Renders architectural Swiss-style alignment crosshairs on corner vertices.",
    },
    {
      prop: "isHoverable",
      type: "boolean",
      defaultVal: "false",
      description: "Enables tactile hover lift (-translate-y-1) and soft elevated drop shadow.",
    },
    {
      prop: "classNames",
      type: "{ chassis?: string; core?: string; glow?: string }",
      defaultVal: "undefined",
      description: "Granular slot-level class overrides for the outer chassis and inner core.",
    },
  ];

  return (
    <div className="space-y-24 pb-24 sm:space-y-32">
      {/* Title & Introduction */}
      <DocHeader
        category="Components"
        title="Double Bezel Card"
        badge="Signature"
        description="Dual-tier chassis card engineered with mathematically concentric outer and inner corner radii, precision Swiss crosshairs, and layered frosted glass depth."
      />

      {/* Hero Interactive Playground */}
      <section id="interactive-playground" className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Interactive Chassis Playground
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            Customize the chassis variant, inner padding, hover elevation, and corner registration
            marks in real time.
          </p>
        </div>

        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-3 sm:p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
              Variant:
            </span>
            {(["default", "glass", "solid", "highlight"] as const).map((v) => (
              <Button
                key={v}
                size="sm"
                variant={selectedVariant === v ? "solid" : "flat"}
                color={selectedVariant === v ? "primary" : "secondary"}
                onClick={() => setSelectedVariant(v)}
                className="capitalize"
              >
                {v}
              </Button>
            ))}
          </div>

          <div className="h-4 w-px bg-zinc-200 dark:bg-white/10" />

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
              Padding:
            </span>
            {(["sm", "md", "lg"] as const).map((p) => (
              <Button
                key={p}
                size="sm"
                variant={selectedPadding === p ? "solid" : "flat"}
                color={selectedPadding === p ? "primary" : "secondary"}
                onClick={() => setSelectedPadding(p)}
                className="uppercase"
              >
                {p}
              </Button>
            ))}
          </div>

          <div className="h-4 w-px bg-zinc-200 dark:bg-white/10" />

          <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={showCrosshairs}
              onChange={(e) => setShowCrosshairs(e.target.checked)}
              className="rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-700"
            />
            Crosshairs
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={isHoverable}
              onChange={(e) => setIsHoverable(e.target.checked)}
              className="rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-700"
            />
            Hover Lift
          </label>
        </div>

        <ComponentPreview>
          <div className="flex w-full items-center justify-center p-4 sm:p-12">
            <DoubleBezelCard
              variant={selectedVariant}
              padding={selectedPadding}
              showCrosshairs={showCrosshairs}
              isHoverable={isHoverable}
              className="w-full max-w-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Quantum Engine Core
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Precision Architecture
                      </p>
                    </div>
                  </div>
                  <Badge variant="soft" color="success" size="sm">
                    Online
                  </Badge>
                </div>

                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Engineered with an outer chassis radius of 28px and an inner core radius of 22px,
                  maintaining strict curvature parallelism across both optical boundaries.
                </p>

                <div className="flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-white/5">
                  <span className="font-mono text-[11px] text-zinc-400">CONCENTRIC-R28-R22</span>
                  <Button
                    size="sm"
                    variant="flat"
                    color="indigo"
                    endContent={<ArrowUpRight className="h-3.5 w-3.5" />}
                  >
                    Inspect Spec
                  </Button>
                </div>
              </div>
            </DoubleBezelCard>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { DoubleBezelCard, Button, Badge } from "@hudbird/ui";
import { Cpu, ArrowUpRight } from "lucide-react";

export default function Demo() {
  return (
    <DoubleBezelCard
      variant="${selectedVariant}"
      padding="${selectedPadding}"
      showCrosshairs={${showCrosshairs}}
      isHoverable={${isHoverable}}
      className="max-w-md"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Cpu className="h-4 w-4 text-indigo-500" />
            <div>
              <h4 className="text-sm font-semibold">Quantum Engine Core</h4>
              <p className="text-xs text-zinc-500">Precision Architecture</p>
            </div>
          </div>
          <Badge variant="soft" color="success">Online</Badge>
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Engineered with an outer chassis radius of 28px and an inner core radius of 22px.
        </p>

        <div className="flex items-center justify-between border-t pt-3 border-zinc-100 dark:border-white/5">
          <span className="font-mono text-xs text-zinc-400">CONCENTRIC-R28-R22</span>
          <Button size="sm" variant="flat" color="indigo">Inspect</Button>
        </div>
      </div>
    </DoubleBezelCard>
  );
}`}
        />
      </section>

      {/* Installation */}
      <section id="installation" className="scroll-mt-24 space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Installation
        </h2>
        <InstallationTabs componentName="DoubleBezelCard" manualCode={doubleBezelCardCode} />
      </section>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Component API
        </h2>
        <ApiTable
          rows={apiRows}
          note="DoubleBezelCard automatically nests the inner core div with concentric radius calculation to ensure zero optical curvature pinch."
        />
      </section>

      {/* Surface Variants */}
      <section id="all-variants" className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Surface Variants
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            Four deliberate treatments calibrated for dark mode Obsidian surfaces and high-contrast
            light mode.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Default */}
          <DoubleBezelCard variant="default" showCrosshairs isHoverable>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  Variant
                </span>
                <Badge size="sm" variant="outline">
                  default
                </Badge>
              </div>
              <h4 className="font-semibold text-zinc-900 dark:text-white">
                Industrial Neutral Chassis
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Subtle outer zinc border with Obsidian #161618 chassis and crisp #202124 core in
                dark mode.
              </p>
            </div>
          </DoubleBezelCard>

          {/* Glass */}
          <DoubleBezelCard variant="glass" showCrosshairs isHoverable>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  Variant
                </span>
                <Badge size="sm" variant="soft" color="secondary">
                  glass
                </Badge>
              </div>
              <h4 className="font-semibold text-zinc-900 dark:text-white">Layered Frosted Glass</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Double backdrop-blur with diffuse ambient glow and high-translucency glass chassis.
              </p>
            </div>
          </DoubleBezelCard>

          {/* Solid */}
          <DoubleBezelCard variant="solid" showCrosshairs isHoverable>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  Variant
                </span>
                <Badge size="sm" variant="solid" color="zinc">
                  solid
                </Badge>
              </div>
              <h4 className="font-semibold text-zinc-900 dark:text-white">
                High-Opaque Structural
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Clean, flat opaque chassis ideal for high-density dashboards and data grids.
              </p>
            </div>
          </DoubleBezelCard>

          {/* Highlight */}
          <DoubleBezelCard variant="highlight" showCrosshairs isHoverable>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">
                  Variant
                </span>
                <Badge size="sm" variant="solid" color="primary">
                  highlight
                </Badge>
              </div>
              <h4 className="font-semibold text-zinc-900 dark:text-white">Primary Indigo Accent</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Glow rim border with radial indigo illumination, perfect for recommended SaaS tiers.
              </p>
            </div>
          </DoubleBezelCard>
        </div>
      </section>

      {/* Metric Card Example */}
      <section id="metric-card" className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Architectural Metric Card
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            Combine registration crosshairs with key KPI metrics for high-end developer and fintech
            dashboards.
          </p>
        </div>

        <ComponentPreview>
          <div className="grid w-full grid-cols-1 gap-6 p-4 sm:grid-cols-3 sm:p-8">
            <DoubleBezelCard variant="default" showCrosshairs isHoverable padding="sm">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>Gross Volume</span>
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  $184,290
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  <span>+18.4%</span>
                  <span className="text-zinc-400">vs last month</span>
                </div>
              </div>
            </DoubleBezelCard>

            <DoubleBezelCard variant="highlight" showCrosshairs isHoverable padding="sm">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>API Reliability</span>
                  <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
                </div>
                <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  99.992%
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                  <span>Sub-12ms</span>
                  <span className="text-zinc-400">p99 latency</span>
                </div>
              </div>
            </DoubleBezelCard>

            <DoubleBezelCard variant="glass" showCrosshairs isHoverable padding="sm">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>Active Nodes</span>
                  <Activity className="h-3.5 w-3.5 text-sky-500" />
                </div>
                <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  1,482
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-sky-600 dark:text-sky-400">
                  <span>Global edge</span>
                  <span className="text-zinc-400">distributed</span>
                </div>
              </div>
            </DoubleBezelCard>
          </div>
        </ComponentPreview>
      </section>

      {/* Concentric Radii Geometry */}
      <section id="concentric-geometry" className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Concentric Radii Geometry
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            Why ordinary nested cards look warped, and how DoubleBezelCard enforces optical
            concentricity.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.02]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/10 text-xs font-bold text-rose-600">
                  ✕
                </div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Naive Nested Radii (Optical Warping)
                </h4>
              </div>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                When an outer box and inner box both use identical border-radius (e.g. both
                `rounded-2xl`), the distance between the two curves compresses at the 45° corner
                diagonal. The visual border appears uneven and "pinched".
              </p>
              <div className="rounded-2xl border-4 border-rose-500/40 bg-rose-500/5 p-3">
                <div className="rounded-2xl border border-rose-500/30 p-4 text-center font-mono text-xs text-rose-600">
                  Outer R=16px + Inner R=16px → Pinched Corners
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600">
                  ✓
                </div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Concentric Radius Formula (Harmonious)
                </h4>
              </div>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                DoubleBezelCard calculates the inner curve via `R_inner = R_outer -
                bezel_thickness`. Outer `28px` minus `6px` padding equals inner `22px`, ensuring the
                corner clearance remains exactly constant around the full arc.
              </p>
              <div className="rounded-[28px] border-4 border-emerald-500/40 bg-emerald-500/5 p-1.5">
                <div className="rounded-[22px] border border-emerald-500/30 p-4 text-center font-mono text-xs text-emerald-600">
                  Outer R=28px - Gap 6px = Inner R=22px
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
