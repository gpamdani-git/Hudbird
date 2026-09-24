import React from "react";
import { RadialChart, Card } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { InstallationTabs } from "../components/InstallationTabs";
import { ArrowUp, ArrowDown } from "lucide-react";
import { PageToolbar } from "../components/PageToolbar";
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
    <div className="pb-24">
      {/* Title & Subtitle */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Radial Chart
            </h1>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              New
            </span>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
            A radial bar chart suitable for showing progress or hierarchical categorical data.
          </p>
        </div>
      </div>

      <PageToolbar
        breadcrumbs={[{ label: "Charts", href: "/charts" }, { label: "Radial Chart" }]}
      />

      <div className="mt-8">
        <section id="installation" className="mb-12 scroll-mt-20">
          <InstallationTabs
            componentName="radial-chart"
            dependencies="recharts clsx tailwind-merge"
          />
        </section>

        <section id="anatomy" className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Anatomy</h2>
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
        </section>

        <section id="component-api" className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Component API
          </h2>
          <ApiTable title="RadialChart Props" rows={apiProps} />
        </section>

        <section id="examples" className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Examples</h2>

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

        <section id="css-classes" className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">CSS Classes</h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            The RadialChart component applies standard Tailwind classes for height and width, and
            renders inside a standard <code>div</code> wrapper that accepts any generic{" "}
            <code>className</code>.
          </p>
        </section>

        <section id="element-classes" className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Element Classes
          </h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            You can target specific Recharts internal SVG nodes via standard Recharts classnames if
            required (e.g. <code>.recharts-radial-bar-background-sector</code>).
          </p>
        </section>

        <section id="recharts-theming" className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Recharts Theming
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            This component automatically adapts to light and dark themes using Tailwind's{" "}
            <code>dark:</code> scheme or standard CSS variables.
          </p>
        </section>
      </div>
    </div>
  );
}
