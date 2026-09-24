import pieChartCode from "../../../../packages/core/src/components/PieChart/PieChart.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React from "react";
import { PageToolbar } from "../components/PageToolbar";
import { PieChart, Card } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";
import { pieChartTocItems } from "../tocData";

const browserData = [
  { browser: "Chrome", visitors: 400 },
  { browser: "Safari", visitors: 300 },
  { browser: "Firefox", visitors: 300 },
  { browser: "Edge", visitors: 200 },
];

const deviceData = [
  { device: "Mobile", visitors: 2800 },
  { device: "Desktop", visitors: 1200 },
  { device: "Tablet", visitors: 500 },
];

const trafficData = [
  { source: "Organic (4,500)", value: 4500 },
  { source: "Direct (3,200)", value: 3200 },
  { source: "Referral (2,100)", value: 2100 },
  { source: "Social (1,400)", value: 1400 },
];

const storageData = [
  { category: "Documents (42 GB)", usage: 42 },
  { category: "Media (28 GB)", usage: 28 },
  { category: "Apps (18 GB)", usage: 18 },
  { category: "Other (12 GB)", usage: 12 },
];

const nestedData = [
  { label: "Group A", group1: 400, group2: 2400 },
  { label: "Group B", group1: 300, group2: 4567 },
  { label: "Group C", group1: 300, group2: 1398 },
  { label: "Group D", group1: 200, group2: 9800 },
];

export default function PieChartDoc() {
  const apiRows: ApiPropRow[] = [
    {
      prop: "data",
      type: "any[]",
      default: "[]",
      description: "Array of objects containing the data to render.",
    },
    {
      prop: "category",
      type: "string",
      default: "undefined",
      description: "The key in the data objects to map to the slice values.",
    },
    {
      prop: "categories",
      type: "string[]",
      default: "[]",
      description: "Array of keys for rendering nested donut charts.",
    },
    {
      prop: "index",
      type: "string",
      default: "undefined",
      description: "The key in the data objects to map to the slice names.",
      required: true,
    },
    {
      prop: "colors",
      type: "string[]",
      default: "defaultColors",
      description: "Array of colors to be used sequentially.",
    },
    {
      prop: "variant",
      type: '"pie" | "donut"',
      default: '"pie"',
      description: "Visual variant of the pie chart.",
    },
    {
      prop: "donutContent",
      type: "React.ReactNode",
      default: "undefined",
      description: "Content to render inside the donut hole.",
    },
    {
      prop: "innerRadius",
      type: "number | string",
      default: 'donut ? "60%" : 0',
      description: "Inner radius of the pie.",
    },
    {
      prop: "outerRadius",
      type: "number | string",
      default: '"80%"',
      description: "Outer radius of the pie.",
    },
    {
      prop: "showLabel",
      type: "boolean",
      default: "false",
      description: "Whether to display labels on the pie slices.",
    },
  ];

  return (
    <div className="flex w-full max-w-6xl flex-col lg:flex-row lg:items-start lg:gap-12">
      <div className="min-w-0 flex-1">
        <div className="flex flex-col items-start justify-between gap-4 pb-8 sm:flex-row sm:items-center">
          <div className="w-full min-w-0 flex-1 pr-4">
            <div className="mb-3 flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                Pie Chart
              </h1>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                New
              </span>
              <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                Component
              </span>
            </div>
            <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
              A chart that displays information as slices of a circle, typically illustrating
              numerical proportions.
            </p>
          </div>
          <PageToolbar />
        </div>

        <section id="installation" className="mb-12 scroll-mt-20">
          <InstallationTabs
            componentName="pie-chart"
            dependencies="recharts clsx tailwind-merge"
            manualCode={pieChartCode}
          />
        </section>

        <section id="anatomy" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Anatomy</h2>
          <CodeBlock
            language="tsx"
            code={`import { PieChart } from "@hudbird/ui";

export default function App() {
  return (
    <PieChart
      data={data}
      index="browser"
      category="visitors"
    />
  );
}`}
          />
        </section>

        <section id="usage" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Usage</h2>
          <ComponentPreview>
            <Card className="w-full max-w-md p-6">
              <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Browser Usage
              </h3>
              <PieChart data={browserData} index="browser" category="visitors" />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Card className="max-w-md p-6">
  <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">Browser Usage</h3>
  <PieChart
    data={browserData}
    index="browser"
    category="visitors"
  />
</Card>`}
          />
        </section>

        <section id="custom-tooltip" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Custom Tooltip
          </h2>
          <ComponentPreview>
            <Card className="w-full max-w-md p-6">
              <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Market Share
              </h3>
              <PieChart
                data={browserData}
                index="browser"
                category="visitors"
                customTooltip={({ payload, active }: any) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    const total = browserData.reduce((acc, curr) => acc + curr.visitors, 0);
                    const percentage = ((data.visitors / total) * 100).toFixed(1);
                    return (
                      <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: payload[0].payload.fill }}
                        />
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                          {data.browser}
                        </span>
                        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                          {percentage}%
                        </span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Card className="max-w-md p-6">
  <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">Market Share</h3>
  <PieChart
    data={browserData}
    index="browser"
    category="visitors"
    customTooltip={({ payload, active }: any) => {
      if (active && payload && payload.length) {
        const data = payload[0].payload;
        const total = browserData.reduce((acc, curr) => acc + curr.visitors, 0);
        const percentage = ((data.visitors / total) * 100).toFixed(1);
        return (
          <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: payload[0].payload.fill }} />
            <span className="text-sm text-zinc-500 dark:text-zinc-400">{data.browser}</span>
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{percentage}%</span>
          </div>
        );
      }
      return null;
    }}
  />
</Card>`}
          />
        </section>

        <section id="donut" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Donut</h2>
          <ComponentPreview>
            <Card className="w-full max-w-md p-6">
              <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Traffic Sources
              </h3>
              <PieChart data={trafficData} index="source" category="value" variant="donut" />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Card className="max-w-md p-6">
  <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">Traffic Sources</h3>
  <PieChart
    data={trafficData}
    index="source"
    category="value"
    variant="donut"
  />
</Card>`}
          />
        </section>

        <section id="donut-with-content" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Donut With Content
          </h2>
          <ComponentPreview>
            <Card className="w-full max-w-md p-6">
              <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Connected Devices
              </h3>
              <PieChart
                data={deviceData}
                index="device"
                category="visitors"
                variant="donut"
                donutContent={
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">4.5K</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">Devices</span>
                  </div>
                }
              />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Card className="max-w-md p-6">
  <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">Connected Devices</h3>
  <PieChart
    data={deviceData}
    index="device"
    category="visitors"
    variant="donut"
    donutContent={
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">4.5K</span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">Devices</span>
      </div>
    }
  />
</Card>`}
          />
        </section>

        <section id="donut-with-label" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Donut With Label
          </h2>
          <ComponentPreview>
            <Card className="w-full max-w-md p-6">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Storage Usage
                </h3>
                <p className="text-sm text-zinc-500">100 GB of 128 GB used</p>
              </div>
              <PieChart
                data={storageData}
                index="category"
                category="usage"
                variant="donut"
                donutContent={
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">100</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">GB used</span>
                  </div>
                }
              />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Card className="max-w-md p-6">
  <div className="mb-4">
    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Storage Usage</h3>
    <p className="text-sm text-zinc-500">100 GB of 128 GB used</p>
  </div>
  <PieChart
    data={storageData}
    index="category"
    category="usage"
    variant="donut"
    donutContent={
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">100</span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">GB used</span>
      </div>
    }
  />
</Card>`}
          />
        </section>

        <section id="nested-donut" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Nested Donut</h2>
          <ComponentPreview>
            <Card className="w-full max-w-md p-6">
              <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Engagement Metrics
              </h3>
              <PieChart data={nestedData} index="label" categories={["group1", "group2"]} />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Card className="max-w-md p-6">
  <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">Engagement Metrics</h3>
  <PieChart
    data={nestedData}
    index="label"
    categories={["group1", "group2"]}
  />
</Card>`}
          />
        </section>

        <section id="donut-with-breakdown" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Donut With Breakdown
          </h2>
          <ComponentPreview>
            <Card className="w-full max-w-md p-6">
              <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Traffic Source
              </h3>
              <PieChart
                data={trafficData}
                index="source"
                category="value"
                variant="donut"
                innerRadius="75%"
              />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Card className="max-w-md p-6">
  <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">Traffic Source</h3>
  <PieChart
    data={trafficData}
    index="source"
    category="value"
    variant="donut"
    innerRadius="75%"
  />
</Card>`}
          />
        </section>

        <section id="css-classes" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">CSS Classes</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            The PieChart component applies standard Tailwind classes for height and width, and
            renders an SVG element under the hood via Recharts. You can customize the container's
            appearance using the <code>className</code> prop.
          </p>
        </section>

        <section id="advanced-customization" className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Advanced Customization
          </h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            You can inject custom SVG definitions via <code>children</code>, change stroke styles,
            and use completely custom tooltips with images.
          </p>
          <ComponentPreview>
            <Card className="mx-auto w-full max-w-2xl p-4">
              <PieChart
                data={browserData}
                index="browser"
                category="visitors"
                colors={[
                  "url(#custom-gradient-pie-1)",
                  "url(#custom-gradient-pie-2)",
                  "url(#custom-gradient-pie-3)",
                  "url(#custom-gradient-pie-4)",
                  "url(#custom-gradient-pie-5)",
                ]}
                customTooltip={(props: any) => {
                  if (!props.active || !props.payload || props.payload.length === 0) return null;
                  const { name, value } = props.payload[0];
                  return (
                    <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-xl">
                      <img
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                        alt="Avatar"
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-zinc-300">{name}</p>
                        <p className="text-lg font-bold text-sky-400">{value} visitors</p>
                      </div>
                    </div>
                  );
                }}
              >
                <defs>
                  <linearGradient id="custom-gradient-pie-1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                  <linearGradient id="custom-gradient-pie-2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#be185d" />
                  </linearGradient>
                  <linearGradient id="custom-gradient-pie-3" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="custom-gradient-pie-4" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                  <linearGradient id="custom-gradient-pie-5" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#6d28d9" />
                  </linearGradient>
                </defs>
              </PieChart>
            </Card>
          </ComponentPreview>
          <CodeBlock
            code={`<PieChart
  data={browserData}
  index="browser"
  category="visitors"
  colors={[
    "url(#custom-gradient-pie-1)", 
    "url(#custom-gradient-pie-2)", 
    "url(#custom-gradient-pie-3)", 
    "url(#custom-gradient-pie-4)", 
    "url(#custom-gradient-pie-5)"
  ]}
  customTooltip={(props: any) => {
    if (!props.active || !props.payload || props.payload.length === 0) return null;
    const { name, value } = props.payload[0];
    return (
      <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-xl">
        <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Avatar" className="h-10 w-10 rounded-full" />
        <div>
          <p className="text-sm font-medium text-zinc-300">{name}</p>
          <p className="text-lg font-bold text-sky-400">{value} visitors</p>
        </div>
      </div>
    );
  }}
>
  <defs>
    {/* ... gradients 1 to 5 ... */}
  </defs>
</PieChart>`}
          />
        </section>

        <section id="component-api" className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            API Reference
          </h2>
          <ApiTable rows={apiRows} />
          <h3 className="mt-8 mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Recharts API Reference
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            ref : (
            <a
              href="https://recharts.github.io/en-US/api/PieChart/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              https://recharts.github.io/en-US/api/PieChart/
            </a>
            )
          </p>
        </section>
      </div>
    </div>
  );
}
