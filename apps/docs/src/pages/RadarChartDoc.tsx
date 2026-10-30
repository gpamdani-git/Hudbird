import React from "react";
import { RadarChart, Card } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { InstallationTabs } from "../components/InstallationTabs";
import { DocHeader } from "../components/DocHeader";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

import { radarChartTocItems } from "../tocData";

const data = [
  { subject: "Math", A: 120, B: 110, fullMark: 150 },
  { subject: "Chinese", A: 98, B: 130, fullMark: 150 },
  { subject: "English", A: 86, B: 130, fullMark: 150 },
  { subject: "Geography", A: 99, B: 100, fullMark: 150 },
  { subject: "Physics", A: 85, B: 90, fullMark: 150 },
  { subject: "History", A: 65, B: 85, fullMark: 150 },
];

const apiProps: ApiPropRow[] = [
  {
    prop: "data",
    type: "any[]",
    defaultVal: "-",
    description: "Array of objects containing the data to render.",
  },
  {
    prop: "index",
    type: "string",
    defaultVal: "-",
    description: "The key to map to the axis labels.",
  },
  {
    prop: "categories",
    type: "string[]",
    defaultVal: "-",
    description: "The keys mapping to each radar layer.",
  },
  { prop: "colors", type: "string[]", defaultVal: "-", description: "Array of valid CSS colors." },
  {
    prop: "valueFormatter",
    type: "(value: number) => string",
    defaultVal: "-",
    description: "Function to format values.",
  },
  {
    prop: "showGridLines",
    type: "boolean",
    defaultVal: "true",
    description: "Toggle grid lines on or off.",
  },
  { prop: "showLegend", type: "boolean", defaultVal: "true", description: "Toggle the legend." },
  { prop: "showTooltip", type: "boolean", defaultVal: "true", description: "Toggle the tooltip." },
  {
    prop: "gridType",
    type: '"polygon" | "circle"',
    defaultVal: '"polygon"',
    description: "The shape of the background grid.",
  },
  {
    prop: "showRadiusAxis",
    type: "boolean",
    defaultVal: "false",
    description: "Toggle the radius axis.",
  },
  {
    prop: "customTooltip",
    type: "ReactElement | Function",
    defaultVal: "-",
    description: "Custom component for the tooltip.",
  },
  {
    prop: "fillOpacity",
    type: "number",
    defaultVal: "0.5",
    description: "Opacity for the filled areas.",
  },
];

export default function RadarChartDoc() {
  return (
    <div className="space-y-24 sm:space-y-32 pb-32">
      <DocHeader
        category="CHARTS"
        title="Radar Chart"
        badge="Component"
        description="A radar chart for comparing multiple quantitative performance variables across spider web dimensions."
      />

      <section id="installation" className="scroll-mt-24 space-y-6">
        <InstallationTabs
          componentName="radar-chart"
          dependencies="recharts clsx tailwind-merge"
        />
      </section>

      <section id="anatomy" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          Anatomy
        </h2>
        <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
          <strong>Abstracted layer.</strong> Radar chart abstracts polygon geometries from <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">recharts</code> with automated polar angle calculations and theme tokens:
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <CodeBlock
            code={`import { RadarChart } from "@hudbird/ui";

export default function App() {
  return (
    <RadarChart
      data={data}
      index="subject"
      categories={["A"]}
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
        <ApiTable title="RadarChart Props" rows={apiProps} />
      </section>

      <section id="examples" className="scroll-mt-24 space-y-16">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          Examples
        </h2>

          <div id="basic" className="mb-10 scroll-mt-20">
            <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Basic Radar Chart
            </h3>
            <ComponentPreview>
              <Card className="mx-auto w-full max-w-xl p-4">
                <RadarChart data={data} index="subject" categories={["A"]} />
              </Card>
            </ComponentPreview>
            <CodeBlock
              code={`<Card className="p-4 w-full max-w-xl mx-auto">
  <RadarChart
    data={data}
    index="subject"
    categories={["A"]}
  />
</Card>`}
            />
          </div>

          <div id="multiple" className="mb-10 scroll-mt-20">
            <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Multiple Categories & Circle Grid
            </h3>
            <ComponentPreview>
              <Card className="mx-auto w-full max-w-xl p-4">
                <RadarChart
                  data={data}
                  index="subject"
                  categories={["A", "B"]}
                  gridType="circle"
                  colors={["#3b82f6", "#ef4444"]}
                />
              </Card>
            </ComponentPreview>
            <CodeBlock
              code={`<RadarChart
  data={data}
  index="subject"
  categories={["A", "B"]}
  gridType="circle"
  colors={["#3b82f6", "#ef4444"]}
/>`}
            />
          </div>

          <div id="custom-tooltip" className="mb-10 scroll-mt-20">
            <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Custom Tooltip
            </h3>
            <ComponentPreview>
              <Card className="mx-auto w-full max-w-xl p-4">
                <RadarChart
                  data={data}
                  index="subject"
                  categories={["A", "B"]}
                  customTooltip={(props: any) => {
                    if (!props.active || !props.payload || props.payload.length === 0) return null;
                    const { payload, label } = props;
                    return (
                      <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-md dark:border-zinc-800 dark:bg-zinc-950">
                        <p className="mb-2 font-medium text-zinc-900 dark:text-zinc-100">{label}</p>
                        {payload.map((entry: any, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-zinc-600 dark:text-zinc-400">
                              {entry.name}: {entry.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                />
              </Card>
            </ComponentPreview>
            <CodeBlock
              code={`<RadarChart
  data={data}
  index="subject"
  categories={["A", "B"]}
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
              Inject SVG gradients or definitions using the <code>children</code> prop and map them
              with <code>colors</code>.
            </p>
            <ComponentPreview>
              <Card className="mx-auto w-full max-w-xl p-4">
                <RadarChart
                  data={data}
                  index="subject"
                  categories={["A"]}
                  colors={["url(#radar-gradient)"]}
                  fillOpacity={0.8}
                >
                  <defs>
                    <linearGradient id="radar-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                </RadarChart>
              </Card>
            </ComponentPreview>
            <CodeBlock
              code={`<RadarChart
  data={data}
  index="subject"
  categories={["A"]}
  colors={["url(#radar-gradient)"]}
  fillOpacity={0.8}
>
  <defs>
    <linearGradient id="radar-gradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
    </linearGradient>
  </defs>
</RadarChart>`}
            />
          </div>
        </section>

      <section id="css-classes" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          CSS Classes
        </h2>
        <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
          <strong>Root container customization.</strong> The RadarChart component accepts standard Tailwind classes for height and width, and renders inside a standard wrapper that accepts a <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">className</code> prop:
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <CodeBlock
            code={`<RadarChart
  className="w-full max-w-xl mx-auto h-[350px]"
  data={data}
  index="subject"
  categories={["A", "B"]}
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
          <strong>SVG element targeting.</strong> Target specific Recharts internal SVG nodes via standard class names for global styling overrides (e.g. <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">.recharts-polar-grid-angle</code> or <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">.recharts-radar-polygon</code>):
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <CodeBlock
            code={`/* In your global.css */
.recharts-polar-grid-angle line {
  stroke: var(--color-zinc-200);
}

.dark .recharts-polar-grid-angle line {
  stroke: var(--color-zinc-800);
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
          <strong>Autonomous theme synchronization.</strong> RadarChart automatically adapts to light and dark themes using Tailwind's <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">dark:</code> scheme and standard semantic variables (<code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">var(--color-primary-500)</code>).
        </p>
      </section>
    </div>
  );
}
