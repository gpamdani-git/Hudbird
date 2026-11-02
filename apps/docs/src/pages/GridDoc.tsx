// apps/docs/src/pages/GridDoc.tsx
import React, { useState } from "react";
import gridCode from "../../../../packages/core/src/components/Grid/Grid.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import { DocHeader } from "../components/DocHeader";
import {
  Grid,
  GridItem,
  type GridCols,
  type GridLayout,
  type GridGap,
  Button,
  Badge,
  cn,
} from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";
import { LayoutGrid, RotateCw, Layers, Check } from "lucide-react";

export const gridTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "uniform-columns", title: "Uniform Columns & 8-point Gaps" },
      { id: "bento-presets", title: "Asymmetric Bento Presets (Anti-Slop)" },
      { id: "granular-spans", title: "12-Column Granular Spans" },
      { id: "waterfall-motion", title: "Google Stitch Waterfall Animation" },
    ],
  },
];

export default function GridDoc() {
  const [cols, setCols] = useState<GridCols>(3);
  const [gap, setGap] = useState<GridGap>("md");
  const [bentoLayout, setBentoLayout] = useState<GridLayout>("bento-2-1");
  const [animKey, setAnimKey] = useState<number>(0);

  const gridApiRows: ApiPropRow[] = [
    {
      prop: "cols",
      defaultVal: "1",
      description:
        '1 | 2 | 3 | 4 | 5 | 6 | 12 | "auto-fit" | "auto-fill" responsive column tracks.',
    },
    {
      prop: "layout",
      defaultVal: '"default"',
      description: 'Asymmetric presets: "default" | "bento-2-1" | "bento-1-2" | "bento-split".',
    },
    {
      prop: "gap",
      defaultVal: '"md"',
      description:
        '8-point gap: "none" (0px) | "xs" (8px) | "sm" (12-16px) | "md" (16-32px) | "lg" (24-40px) | "xl" (32-64px).',
    },
    {
      prop: "align",
      defaultVal: '"stretch"',
      description: '"start" | "center" | "end" | "stretch" vertical item alignment.',
    },
    {
      prop: "animate",
      defaultVal: "false",
      description: "Enables Google Stitch staggered spring waterfall entrance animation.",
    },
    {
      prop: "staggerDelay",
      defaultVal: "0.06",
      description: "Delay in seconds between sequential child item reveals.",
    },
    {
      prop: "as",
      defaultVal: '"div"',
      description: "Semantic HTML element tag when animate is false.",
    },
  ];

  const gridItemApiRows: ApiPropRow[] = [
    {
      prop: "colSpan",
      defaultVal: "undefined",
      description: '1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full".',
    },
    {
      prop: "rowSpan",
      defaultVal: "undefined",
      description: '1 | 2 | 3 | 4 | 5 | 6 | "full".',
    },
    {
      prop: "colStart",
      defaultVal: "undefined",
      description: "Starting column track index (1 to 12).",
    },
    {
      prop: "animate",
      defaultVal: "false",
      description: "Spring physics reveal matching the parent Grid stagger.",
    },
    {
      prop: "as",
      defaultVal: '"div"',
      description: "Semantic HTML element tag when animate is false.",
    },
  ];

  return (
    <div className="space-y-24 pb-32 sm:space-y-32">
      {/* Header */}
      <DocHeader
        category="Layouts"
        title="Grid"
        badge="Macro Primitive"
        description="Responsive multi-column grid primitive enforcing strict 8-point spatial gaps, asymmetric Bento presets, and Google Stitch staggered waterfall entrance physics."
      />

      {/* Installation */}
      <section id="installation" className="scroll-mt-24 space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Installation
        </h2>
        <InstallationTabs componentName="grid" manualCode={gridCode} />
      </section>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-8">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Component API
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Props reference for{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">Grid</code>{" "}
            and{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              GridItem
            </code>
            .
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-zinc-900 dark:text-white">Grid Props</h3>
          <ApiTable rows={gridApiRows} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-zinc-900 dark:text-white">GridItem Props</h3>
          <ApiTable rows={gridItemApiRows} />
        </div>
      </section>

      {/* Examples */}
      <section id="examples" className="scroll-mt-24 space-y-20 sm:space-y-28">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Examples
          </h2>
        </div>

        {/* 1. Uniform Columns & 8-point Gaps */}
        <div id="uniform-columns" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Uniform Columns & 8-point Gaps
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Test responsive column distribution with strictly locked 8-point proportional gutter
            spacing:
          </p>

          <ComponentPreview>
            <div className="w-full space-y-6">
              {/* Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                    Columns:
                  </span>
                  <div className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-zinc-200/80 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-[#161618]">
                    {([1, 2, 3, 4, 6, 12, "auto-fit"] as const).map((c) => {
                      const isActive = cols === c;
                      return (
                        <Button
                          key={String(c)}
                          size="xs"
                          variant={isActive ? "solid" : "light"}
                          color={isActive ? "white" : "zinc"}
                          onClick={() => setCols(c)}
                          className={cn(
                            "min-w-8 cursor-pointer text-xs font-medium",
                            isActive
                              ? "bg-white font-semibold text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white"
                              : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                          )}
                        >
                          {String(c)}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                    Gap:
                  </span>
                  <div className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-zinc-200/80 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-[#161618]">
                    {(["none", "xs", "sm", "md", "lg", "xl"] as const).map((g) => {
                      const isActive = gap === g;
                      return (
                        <Button
                          key={g}
                          size="xs"
                          variant={isActive ? "solid" : "light"}
                          color={isActive ? "white" : "zinc"}
                          onClick={() => setGap(g)}
                          className={cn(
                            "cursor-pointer text-xs font-medium",
                            isActive
                              ? "bg-white font-semibold text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white"
                              : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                          )}
                        >
                          {g}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Grid Preview */}
              <Grid cols={cols} gap={gap} className="w-full">
                {Array.from({ length: cols === 12 ? 12 : cols === 6 ? 6 : 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex h-20 items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 font-mono text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400"
                  >
                    Item {idx + 1}
                  </div>
                ))}
              </Grid>
            </div>
          </ComponentPreview>

          <CodeBlock
            language="tsx"
            code={`import { Grid } from "@hudbird/ui";

export function ColumnGridExample() {
  return (
    <Grid cols={${typeof cols === "number" ? cols : `"${cols}"`}} gap="${gap}">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Grid>
  );
}`}
          />
        </div>

        {/* 2. Asymmetric Bento Presets */}
        <div id="bento-presets" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Asymmetric Bento Presets (Anti-Slop)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Rule-enforced layouts designed to ban monotonous 3-equal card layouts in favor of
            editorial hierarchy:
          </p>

          <ComponentPreview>
            <div className="w-full space-y-6">
              <div className="flex flex-wrap items-center gap-3 border-b border-zinc-200 pb-4 dark:border-zinc-800">
                <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  Preset Layout:
                </span>
                <div className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-zinc-200/80 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-[#161618]">
                  {(["bento-2-1", "bento-1-2", "bento-split"] as const).map((l) => {
                    const isActive = bentoLayout === l;
                    return (
                      <Button
                        key={l}
                        size="xs"
                        variant={isActive ? "solid" : "light"}
                        color={isActive ? "white" : "zinc"}
                        onClick={() => setBentoLayout(l)}
                        className={cn(
                          "cursor-pointer px-3 text-xs font-medium",
                          isActive
                            ? "bg-white font-semibold text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white"
                            : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                        )}
                      >
                        {l}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <Grid layout={bentoLayout} gap="md" className="w-full">
                <div className="flex min-h-[160px] flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="flex items-center gap-2">
                    <Badge variant="soft" color="primary" size="sm">
                      Primary Anchor (2/3)
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    Dominant editorial block capturing visual hierarchy and immediate user focus
                  </p>
                </div>
                <div className="flex min-h-[160px] flex-col justify-between rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" color="zinc" size="sm">
                      Secondary (1/3)
                    </Badge>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Supporting metric or micro-preview
                  </p>
                </div>
              </Grid>
            </div>
          </ComponentPreview>

          <CodeBlock
            language="tsx"
            code={`import { Grid } from "@hudbird/ui";

export function BentoLayout() {
  return (
    <Grid layout="${bentoLayout}" gap="md">
      <div className="p-6 rounded-2xl bg-zinc-900 text-white">
        <h3>Primary Hero Anchor</h3>
      </div>
      <div className="p-6 rounded-2xl bg-zinc-800 text-zinc-300">
        <h3>Supporting Metric</h3>
      </div>
    </Grid>
  );
}`}
          />
        </div>

        {/* 3. 12-Column Granular Spans */}
        <div id="granular-spans" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            12-Column Granular Spans
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Combine{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              Grid cols={12}
            </code>{" "}
            with{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              GridItem
            </code>{" "}
            for precision editorial magazine designs:
          </p>

          <ComponentPreview>
            <Grid cols={12} gap="sm" className="w-full">
              <GridItem
                colSpan={8}
                className="rounded-xl border border-zinc-200 bg-zinc-100 p-4 text-center font-mono text-xs dark:border-zinc-800 dark:bg-zinc-900"
              >
                colSpan=8 (Primary Content)
              </GridItem>
              <GridItem
                colSpan={4}
                className="rounded-xl border border-zinc-200 bg-zinc-100 p-4 text-center font-mono text-xs dark:border-zinc-800 dark:bg-zinc-900"
              >
                colSpan=4 (Sidebar)
              </GridItem>
              <GridItem
                colSpan={4}
                className="rounded-xl border border-zinc-200 bg-zinc-100 p-4 text-center font-mono text-xs dark:border-zinc-800 dark:bg-zinc-900"
              >
                colSpan=4
              </GridItem>
              <GridItem
                colSpan={4}
                className="rounded-xl border border-zinc-200 bg-zinc-100 p-4 text-center font-mono text-xs dark:border-zinc-800 dark:bg-zinc-900"
              >
                colSpan=4
              </GridItem>
              <GridItem
                colSpan={4}
                className="rounded-xl border border-zinc-200 bg-zinc-100 p-4 text-center font-mono text-xs dark:border-zinc-800 dark:bg-zinc-900"
              >
                colSpan=4
              </GridItem>
              <GridItem
                colSpan="full"
                className="rounded-xl border border-zinc-200 bg-zinc-100 p-4 text-center font-mono text-xs dark:border-zinc-800 dark:bg-zinc-900"
              >
                colSpan="full" (Span 12 Columns)
              </GridItem>
            </Grid>
          </ComponentPreview>

          <CodeBlock
            language="tsx"
            code={`import { Grid, GridItem } from "@hudbird/ui";

export function GranularMagazineGrid() {
  return (
    <Grid cols={12} gap="sm">
      <GridItem colSpan={8}>Main Article</GridItem>
      <GridItem colSpan={4}>Sidebar</GridItem>
      <GridItem colSpan="full">Full Width Banner</GridItem>
    </Grid>
  );
}`}
          />
        </div>

        {/* 4. Google Stitch Waterfall Animation */}
        <div id="waterfall-motion" className="scroll-mt-24 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
                Google Stitch Waterfall Entrance Animation
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Hardware-accelerated Framer Motion staggered entrance with spring dynamics
                (stiffness: 100, damping: 20):
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setAnimKey((k) => k + 1)}
              className="gap-2"
            >
              <RotateCw className="size-3.5" /> Replay
            </Button>
          </div>

          <ComponentPreview>
            <Grid key={animKey} animate staggerDelay={0.08} cols={3} gap="md" className="w-full">
              {[
                { title: "Fluid Scale", desc: "No breakpoint jumps" },
                { title: "8-Point Cadence", desc: "Harmonic vertical rhythm" },
                { title: "Waterfall Stagger", desc: "Hardware-accelerated spring physics" },
                { title: "Obsidian Surface", desc: "Specular border hairlines" },
                { title: "Safe 100dvh", desc: "Dynamic viewport resilience" },
                { title: "Prose Channel", desc: "Miller's law 65ch measure" },
              ].map((card, i) => (
                <GridItem
                  key={i}
                  animate
                  className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs dark:border-zinc-800/80 dark:bg-zinc-900/60"
                >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-100 font-mono text-xs font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-white">
                    0{i + 1}
                  </div>
                  <h4 className="mt-3 text-sm font-semibold text-zinc-900 dark:text-white">
                    {card.title}
                  </h4>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{card.desc}</p>
                </GridItem>
              ))}
            </Grid>
          </ComponentPreview>

          <CodeBlock
            language="tsx"
            code={`import { Grid, GridItem } from "@hudbird/ui";

export function AnimatedStitchGrid() {
  return (
    <Grid animate staggerDelay={0.08} cols={3} gap="md">
      <GridItem animate className="p-5 rounded-2xl bg-zinc-900">
        Item 1
      </GridItem>
      <GridItem animate className="p-5 rounded-2xl bg-zinc-900">
        Item 2
      </GridItem>
      <GridItem animate className="p-5 rounded-2xl bg-zinc-900">
        Item 3
      </GridItem>
    </Grid>
  );
}`}
          />
        </div>
      </section>
    </div>
  );
}
