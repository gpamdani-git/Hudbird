// apps/docs/src/pages/ProgressDoc.tsx
import progressCode from "../../../../packages/core/src/components/Progress/Progress.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { PageToolbar } from "../components/PageToolbar";
import { Progress, CircularProgress, Button } from "@hudbird/ui";
import { Sparkles, Play, RotateCcw } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const progressTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-progress", title: "Basic progress bar" },
      { id: "progress-colors", title: "Color variants" },
      { id: "progress-sizes", title: "Size variations" },
      { id: "striped-indeterminate", title: "Striped & Indeterminate" },
      { id: "circular-progress", title: "Circular Progress" },
    ],
  },
];

export default function ProgressDoc() {
  const [val, setVal] = useState(65);

  const apiRows: ApiPropRow[] = [
    {
      prop: "value",
      defaultVal: "0",
      description: "Current numeric completion value between min and max.",
    },
    {
      prop: "min / max",
      defaultVal: "0 / 100",
      description: "Bounds for calculating the completion percentage.",
    },
    {
      prop: "color",
      defaultVal: '"primary"',
      description: '"default" | "primary" | "secondary" | "success" | "warning" | "danger"',
    },
    {
      prop: "size",
      defaultVal: '"md"',
      description: '"sm" | "md" | "lg" for bar height or circle diameter.',
    },
    {
      prop: "radius",
      defaultVal: '"full"',
      description: '"none" | "sm" | "md" | "lg" | "full" for corner rounding.',
    },
    {
      prop: "isIndeterminate",
      defaultVal: "false",
      description: "Displays an animated continuous loading state.",
    },
    {
      prop: "isStriped",
      defaultVal: "false",
      description: "Adds diagonal striped styling across the fill bar.",
    },
    {
      prop: "showValueLabel",
      defaultVal: "false",
      description: "Displays the formatted percentage text above the bar.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
              Progress
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-500">
              <Sparkles className="h-3 w-3" />
              New in v1.5
            </span>
          </div>
          <p className="text-muted-foreground text-base">
            Linear and circular progress indicators communicating real-time operation status and
            percentage completion.
          </p>
        </div>
        <div className="flex w-full shrink-0 justify-end sm:w-auto">
          <PageToolbar />
        </div>
      </div>

      {/* Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">Installation</h2>
        <InstallationTabs componentName="Progress" code={progressCode} fileName="Progress.tsx" />
      </section>

      {/* Interactive Controller */}
      <div className="border-border bg-card flex flex-wrap items-center gap-3 rounded-2xl border p-4 shadow-2xs">
        <span className="text-foreground text-sm font-medium">Simulate Progress: {val}%</span>
        <Button size="sm" variant="outline" onClick={() => setVal((v) => Math.min(100, v + 15))}>
          <Play className="mr-1.5 h-3.5 w-3.5" /> +15%
        </Button>
        <Button size="sm" variant="outline" onClick={() => setVal((v) => Math.max(0, v - 15))}>
          -15%
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setVal(0)}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </div>

      {/* Basic Progress */}
      <section id="basic-progress" className="space-y-4">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">Basic Progress</h2>
        <ComponentPreview>
          <div className="w-full max-w-md space-y-6">
            <Progress value={val} label="Storage Used" showValueLabel />
            <Progress value={val} color="primary" />
          </div>
        </ComponentPreview>
        <CodeBlock
          language="tsx"
          code={`<Progress value={${val}} label="Storage Used" showValueLabel />`}
        />
      </section>

      {/* Color Variants */}
      <section id="progress-colors" className="space-y-4">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">Color Variants</h2>
        <ComponentPreview>
          <div className="w-full max-w-md space-y-4">
            <Progress value={75} color="primary" label="Primary (75%)" showValueLabel />
            <Progress value={60} color="secondary" label="Secondary (60%)" showValueLabel />
            <Progress value={90} color="success" label="Success (90%)" showValueLabel />
            <Progress value={45} color="warning" label="Warning (45%)" showValueLabel />
            <Progress value={30} color="danger" label="Danger (30%)" showValueLabel />
          </div>
        </ComponentPreview>
      </section>

      {/* Sizes */}
      <section id="progress-sizes" className="space-y-4">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">Size Variations</h2>
        <ComponentPreview>
          <div className="w-full max-w-md space-y-4">
            <Progress size="sm" value={60} label="Small (sm)" />
            <Progress size="md" value={60} label="Medium (md)" />
            <Progress size="lg" value={60} label="Large (lg)" />
          </div>
        </ComponentPreview>
      </section>

      {/* Striped & Indeterminate */}
      <section id="striped-indeterminate" className="space-y-4">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">
          Striped & Indeterminate
        </h2>
        <ComponentPreview>
          <div className="w-full max-w-md space-y-6">
            <Progress value={70} color="primary" isStriped label="Striped Bar" />
            <Progress isIndeterminate color="primary" label="Indeterminate (Loading...)" />
          </div>
        </ComponentPreview>
      </section>

      {/* Circular Progress */}
      <section id="circular-progress" className="space-y-4">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">Circular Progress</h2>
        <ComponentPreview>
          <div className="flex flex-wrap items-center justify-around gap-8">
            <CircularProgress value={val} size="sm" showValueLabel />
            <CircularProgress value={val} size="md" color="success" showValueLabel />
            <CircularProgress value={val} size="lg" color="secondary" showValueLabel />
            <CircularProgress isIndeterminate size="md" color="primary" />
          </div>
        </ComponentPreview>
        <CodeBlock
          language="tsx"
          code={`<CircularProgress value={${val}} size="md" color="success" showValueLabel />
<CircularProgress isIndeterminate size="md" color="primary" />`}
        />
      </section>

      {/* Component API */}
      <section id="component-api" className="space-y-4">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">Component API</h2>
        <ApiTable rows={apiRows} />
      </section>
    </div>
  );
}
