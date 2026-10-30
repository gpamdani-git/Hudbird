import React from "react";
import { RadialChart, Card } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { InstallationTabs } from "../components/InstallationTabs";
import { DocHeader } from "../components/DocHeader";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

import { radialChartTocItems } from "../tocData";

const data = [
  { name: "18-24", uv: 31.47, pv: 2400, fill: "var(--color-primary-500, #3b82f6)" },
  { name: "25-29", uv: 26.69, pv: 4567, fill: "var(--color-secondary-500, #a855f7)" },
  { name: "30-34", uv: 15.69, pv: 1398, fill: "var(--color-success-500, #22c55e)" },
  { name: "35-39", uv: 8.22, pv: 9800, fill: "var(--color-warning-500, #eab308)" },
];

const dataSingle = [{ name: "Score", value: 85, fill: "var(--color-primary-500, #3b82f6)" }];

const apiProps: ApiPropRow[] = [
  {
    prop: "data",
    type: "any[]",
    defaultVal: "-",
    description: "Array of objects containing the data.",
  },
  {
    prop: "index",
    type: "string",
    defaultVal: "-",
    description: "The key to map to the legend names.",
  },
  {
    prop: "categories",
    type: "string[]",
    defaultVal: "-",
    description: "The keys mapping to the radial bars (usually just one, e.g. ['value']).",
  },
  {
    prop: "colors",
    type: "string[]",
    defaultVal: "-",
    description: "Array of valid CSS colors, applies if fill is absent from data.",
  },
  {
    prop: "valueFormatter",
    type: "(value: number) => string",
    defaultVal: "-",
    description: "Function to format tooltip and legend values.",
  },
  {
    prop: "innerRadius",
    type: "string | number",
    defaultVal: '"10%"',
    description: "Inner radius of the chart.",
  },
  {
    prop: "outerRadius",
    type: "string | number",
    defaultVal: '"100%"',
    description: "Outer radius of the chart.",
  },
  { prop: "startAngle", type: "number", defaultVal: "90", description: "Start angle of the bars." },
  { prop: "endAngle", type: "number", defaultVal: "-270", description: "End angle of the bars." },
  { prop: "showLegend", type: "boolean", defaultVal: "true", description: "Toggle the legend." },
  { prop: "showTooltip", type: "boolean", defaultVal: "true", description: "Toggle the tooltip." },
  {
    prop: "customTooltip",
    type: "ReactElement | Function",
    defaultVal: "-",
    description: "Custom component for the tooltip.",
  },
];

export default function RadialChartDoc() {
  return (
    <div className="space-y-24 sm:space-y-32 pb-32">
      <DocHeader
        category="CHARTS"
        title="Radial Chart"
        badge="Component"
        description="A radial bar chart suitable for visualizing activity goals, progress gauges, and hierarchical circular metrics."
      />

      <section id="installation" className="scroll-mt-24 space-y-6">
        <InstallationTabs
          componentName="radial-chart"
          dependencies="recharts clsx tailwind-merge"
        />
      </section>

      <section id="anatomy" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          Anatomy
        </h2>
        <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
          <strong>Abstracted layer.</strong> Radial chart provides a streamlined API over <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">recharts</code> for multi-ring and circular gauge presentations:
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <CodeBlock
            code={`import { RadialChart } from "@hudbird/ui";

export default function App() {
  return (
    <RadialChart
      data={data}
      index="name"
      categories={["value"]}
    />
  );
}`}
          />
        </div>
      </section>

      <section id="component-api" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          Component API
        </h2>
        <ApiTable title="RadialChart Props" rows={apiProps} />
      </section>

      <section id="examples" className="scroll-mt-24 space-y-16">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          Examples
        </h2>

          <div id="basic" className="mb-10 scroll-mt-20">
            <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Basic Radial Chart
            </h3>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              Useful for plotting multiple data points on concentric rings (e.g., Activity rings).
            </p>
            <ComponentPreview>
              <Card className="mx-auto w-full max-w-xl p-4">
                <RadialChart data={data} index="name" categories={["uv"]} />
              </Card>
            </ComponentPreview>
            <CodeBlock
              code={`<Card className="p-4 w-full max-w-xl mx-auto">
  <RadialChart
    data={data}
    index="name"
    categories={["uv"]}
  />
</Card>`}
            />
          </div>

          <div id="semi-circle" className="mb-10 scroll-mt-20">
            <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Semi-Circle / Gauge
            </h3>
            <ComponentPreview>
              <Card className="mx-auto w-full max-w-xl p-4">
                <RadialChart
                  data={dataSingle}
                  index="name"
                  categories={["value"]}
                  startAngle={180}
                  endAngle={0}
                  innerRadius="70%"
                />
              </Card>
            </ComponentPreview>
            <CodeBlock
              code={`<RadialChart
  data={dataSingle}
  index="name"
  categories={["value"]}
  startAngle={180}
  endAngle={0}
  innerRadius="70%"
/>`}
            />
          </div>

          <div id="custom-tooltip" className="mb-10 scroll-mt-20">
            <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Custom Tooltip
            </h3>
            <ComponentPreview>
              <Card className="mx-auto w-full max-w-xl p-4">
                <RadialChart
                  data={data}
                  index="name"
                  categories={["uv"]}
                  customTooltip={(props: any) => {
                    if (!props.active || !props.payload || props.payload.length === 0) return null;
                    const { payload } = props;
                    return (
                      <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-md dark:border-zinc-800 dark:bg-zinc-950">
                        {payload.map((entry: any, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: entry.payload.fill }}
                            />
                            <span className="font-medium text-zinc-600 dark:text-zinc-400">
                              {entry.payload.name}
                            </span>
                            <span className="text-zinc-900 dark:text-zinc-100">{entry.value}</span>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                />
              </Card>
            </ComponentPreview>
            <CodeBlock
              code={`<RadialChart
  data={data}
  index="name"
  categories={["uv"]}
  customTooltip={(props: any) => {
    // Custom JSX return
  }}
/>`}
            />
          </div>

          <div id="advanced-customization" className="mb-10 scroll-mt-20">
            <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Advanced Customization
            </h3>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              Inject SVG gradients or definitions using the <code>children</code> prop.
            </p>
            <ComponentPreview>
              <Card className="mx-auto w-full max-w-xl p-4">
                <RadialChart
                  data={[{ name: "Usage", value: 80, fill: "url(#radial-gradient)" }]}
                  index="name"
                  categories={["value"]}
                  innerRadius="60%"
                  outerRadius="100%"
                >
                  <defs>
                    <linearGradient id="radial-gradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={1} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                </RadialChart>
              </Card>
            </ComponentPreview>
            <CodeBlock
              code={`<RadialChart
  data={[{ name: "Usage", value: 80, fill: "url(#radial-gradient)" }]}
  index="name"
  categories={["value"]}
  innerRadius="60%"
  outerRadius="100%"
>
  <defs>
    <linearGradient id="radial-gradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={1} />
      <stop offset="95%" stopColor="#3b82f6" stopOpacity={1} />
    </linearGradient>
  </defs>
</RadialChart>`}
            />
          </div>
        </section>

      <section id="css-classes" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          CSS Classes
        </h2>
        <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
          <strong>Root container customization.</strong> The RadialChart component accepts standard Tailwind classes for height and width, and renders inside a standard wrapper that accepts a <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">className</code> prop:
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <CodeBlock
            code={`<RadialChart
  className="w-full max-w-xl mx-auto h-[350px]"
  data={data}
  index="name"
  categories={["uv"]}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section id="element-classes" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          Element Classes
        </h2>
        <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
          <strong>SVG element targeting.</strong> Target specific Recharts internal SVG nodes via standard class names if global styling adjustments are required (e.g. <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">.recharts-radial-bar-background-sector</code>):
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <CodeBlock
            code={`/* In your global.css */
.recharts-radial-bar-background-sector {
  fill: var(--color-zinc-100);
}

.dark .recharts-radial-bar-background-sector {
  fill: var(--color-zinc-800);
}`}
            language="css"
          />
        </div>
      </section>

      <section id="recharts-theming" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          Recharts Theming
        </h2>
        <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
          <strong>Autonomous theme synchronization.</strong> RadialChart automatically adapts to light and dark themes using Tailwind's <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">dark:</code> scheme and standard OKLCH CSS variables.
        </p>
      </section>
    </div>
  );
}
