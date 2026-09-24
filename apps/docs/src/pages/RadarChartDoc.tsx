import React from "react";
import { RadarChart, Card } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { InstallationTabs } from "../components/InstallationTabs";
import { ArrowUp, ArrowDown } from "lucide-react";
import { PageToolbar } from "../components/PageToolbar";
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
    <div className="pb-24">
      {/* Title & Subtitle */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Radar Chart
            </h1>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              New
            </span>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
            A chart for comparing multiple quantitative variables. Built on top of Recharts.
          </p>
        </div>
      </div>

      <PageToolbar breadcrumbs={[{ label: "Charts", href: "/charts" }, { label: "Radar Chart" }]} />

      <div className="mt-8">
        <section id="installation" className="mb-12 scroll-mt-20">
          <InstallationTabs
            componentName="radar-chart"
            dependencies="recharts clsx tailwind-merge"
          />
        </section>

        <section id="anatomy" className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Anatomy</h2>
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
        </section>

        <section id="component-api" className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Component API
          </h2>
          <ApiTable title="RadarChart Props" rows={apiProps} />
        </section>

        <section id="examples" className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Examples</h2>

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

        <section id="css-classes" className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">CSS Classes</h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            The RadarChart component applies standard Tailwind classes for height and width, and
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
            required (e.g. <code>.recharts-polar-grid-angle</code> or{" "}
            <code>.recharts-radar-polygon</code>).
          </p>
        </section>

        <section id="recharts-theming" className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Recharts Theming
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            This component automatically adapts to light and dark themes using Tailwind's{" "}
            <code>dark:</code> scheme or standard CSS variables (
            <code>var(--color-primary-500)</code>).
          </p>
        </section>
      </div>
    </div>
  );
}
