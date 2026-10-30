import lineChartCode from "../../../../packages/core/src/components/LineChart/LineChart.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React from "react";
import { PageToolbar } from "../components/PageToolbar";
import { LineChart, Card } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";
import { lineChartTocItems } from "../tocData";

const dummyData = [
  { date: "Jan", Desktop: 100, Mobile: 120 },
  { date: "Feb", Desktop: 150, Mobile: 140 },
  { date: "Mar", Desktop: 120, Mobile: 180 },
  { date: "Apr", Desktop: 200, Mobile: 170 },
  { date: "May", Desktop: 250, Mobile: 190 },
  { date: "Jun", Desktop: null, Mobile: 210 },
  { date: "Jul", Desktop: 300, Mobile: 250 },
  { date: "Aug", Desktop: 350, Mobile: 280 },
  { date: "Sep", Desktop: 320, Mobile: 310 },
  { date: "Oct", Desktop: 400, Mobile: 340 },
  { date: "Nov", Desktop: 450, Mobile: 380 },
  { date: "Dec", Desktop: 500, Mobile: 420 },
];

export default function LineChartDoc() {
  const apiRows: ApiPropRow[] = [
    {
      prop: "data",
      type: "any[]",
      default: "[]",
      description: "Array of objects containing the data to render.",
    },
    {
      prop: "index",
      type: "string",
      default: "undefined",
      description: "The key in the data objects to map to the X-axis.",
      required: true,
    },
    {
      prop: "categories",
      type: "string[]",
      default: "[]",
      description: "Array of keys to map to the Y-axis.",
      required: true,
    },
    {
      prop: "colors",
      type: "string[]",
      default: "defaultColors",
      description: "Array of colors to be used sequentially.",
    },
    {
      prop: "valueFormatter",
      type: "(value: number) => string",
      default: "(value) => value.toString()",
      description: "Function to format the values on the Y-axis and Tooltip.",
    },
    {
      prop: "showXAxis",
      type: "boolean",
      default: "true",
      description: "Whether to display the X-axis.",
    },
    {
      prop: "showYAxis",
      type: "boolean",
      default: "true",
      description: "Whether to display the Y-axis.",
    },
    {
      prop: "showGridLines",
      type: "boolean",
      default: "true",
      description: "Whether to display grid lines in the background.",
    },
    {
      prop: "showLegend",
      type: "boolean",
      default: "true",
      description: "Whether to display the chart legend.",
    },
    {
      prop: "showTooltip",
      type: "boolean",
      default: "true",
      description: "Whether to display the tooltip on hover.",
    },
    {
      prop: "curveType",
      type: '"linear" | "natural" | "monotone" | "step"',
      default: '"monotone"',
      description: "The type of curve to render.",
    },
    {
      prop: "connectNulls",
      type: "boolean",
      default: "false",
      description: "Whether to connect data points across null values.",
    },
    {
      prop: "strokeWidth",
      type: "number",
      default: "2",
      description: "The width of the lines in pixels.",
    },
    {
      prop: "showDots",
      type: "boolean",
      default: "true",
      description: "Whether to show dots on data points.",
    },
    {
      prop: "customDot",
      type: "React.ReactElement | function",
      default: "undefined",
      description: "Custom component to render the dots.",
    },
    {
      prop: "customTooltip",
      type: "React.ReactElement | function",
      default: "undefined",
      description: "Custom component to render the tooltip.",
    },
  ];

  return (
    <div className="flex w-full max-w-6xl flex-col lg:flex-row lg:items-start lg:gap-12">
      <div className="min-w-0 flex-1">
        <div className="flex flex-col items-start justify-between gap-4 pb-8 sm:flex-row sm:items-center">
          <div className="w-full min-w-0 flex-1 pr-4">
            <div className="mb-3 flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                Line Chart
              </h1>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                New
              </span>
              <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                Component
              </span>
            </div>
            <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
              A chart that displays information as a series of data points connected by straight
              line segments.
            </p>
          </div>
          <PageToolbar />
        </div>

        <section id="installation" className="mb-12 scroll-mt-20">
          <InstallationTabs
            componentName="line-chart"
            dependencies="recharts clsx tailwind-merge"
            manualCode={lineChartCode}
          />
        </section>

        <section id="anatomy" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Anatomy</h2>
          <CodeBlock
            language="tsx"
            code={`import { LineChart } from "@hudbird/ui";

export default function App() {
  return (
    <LineChart
      data={dummyData}
      index="date"
      categories={["Desktop", "Mobile"]}
    />
  );
}`}
          />
        </section>

        <section id="basic" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Basic</h2>
          <ComponentPreview>
            <Card className="w-full p-6">
              <LineChart data={dummyData} index="date" categories={["Mobile"]} />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Card className="p-6">
  <LineChart
    data={dummyData}
    index="date"
    categories={["Mobile"]}
  />
</Card>`}
          />
        </section>

        <section id="step" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Step</h2>
          <ComponentPreview>
            <Card className="w-full p-6">
              <LineChart data={dummyData} index="date" categories={["Mobile"]} curveType="step" />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Card className="p-6">
  <LineChart
    data={dummyData}
    index="date"
    categories={["Mobile"]}
    curveType="step"
  />
</Card>`}
          />
        </section>

        <section id="multi-line" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Multi Line</h2>
          <ComponentPreview>
            <Card className="w-full p-6">
              <LineChart data={dummyData} index="date" categories={["Desktop", "Mobile"]} />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Card className="p-6">
  <LineChart
    data={dummyData}
    index="date"
    categories={["Desktop", "Mobile"]}
  />
</Card>`}
          />
        </section>

        <section id="dashed-comparison" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Dashed Comparison
          </h2>
          <ComponentPreview>
            <Card className="w-full p-6">
              <LineChart
                data={dummyData}
                index="date"
                categories={["Desktop", "Mobile"]}
                strokeDasharray={["0", "5 5"]}
              />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Card className="p-6">
  <LineChart
    data={dummyData}
    index="date"
    categories={["Desktop", "Mobile"]}
    strokeDasharray={["0", "5 5"]}
  />
</Card>`}
          />
        </section>

        <section id="kpi-with-chart" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            KPI With Chart
          </h2>
          <ComponentPreview>
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="w-full p-6">
                <div className="mb-4">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Revenue</p>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">$45,231</p>
                </div>
                <LineChart
                  data={dummyData}
                  index="date"
                  categories={["Desktop"]}
                  variant="sparkline"
                />
              </Card>
            </div>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Card className="p-6 w-full max-w-sm">
  <div className="mb-4">
    <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Revenue</p>
    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">$45,231</p>
  </div>
  <LineChart
    data={dummyData}
    index="date"
    categories={["Desktop"]}
    variant="sparkline"
  />
</Card>`}
          />
        </section>

        <section id="multi-line-chart-colors" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Multi Line Chart Colors
          </h2>
          <ComponentPreview>
            <Card className="w-full p-6">
              <LineChart
                data={dummyData}
                index="date"
                categories={["Desktop", "Mobile"]}
                colors={["var(--color-warning-500, #eab308)", "var(--color-danger-500, #ef4444)"]}
              />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Card className="p-6">
  <LineChart
    data={dummyData}
    index="date"
    categories={["Desktop", "Mobile"]}
    colors={["var(--color-warning-500, #eab308)", "var(--color-danger-500, #ef4444)"]}
  />
</Card>`}
          />
        </section>

        <section id="portfolio" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Portfolio</h2>
          <ComponentPreview>
            <Card className="w-full p-6">
              <div className="mb-6 flex flex-col gap-1">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  Portfolio Value
                </h3>
                <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">$12,450.00</p>
                <p className="text-success-500 text-sm">+2.5% from last month</p>
              </div>
              <LineChart
                data={dummyData}
                index="date"
                categories={["Desktop"]}
                colors={["var(--color-success-500, #22c55e)"]}
                showGridLines={false}
                showYAxis={false}
                showXAxis={false}
              />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Card className="p-6">
  <div className="mb-6 flex flex-col gap-1">
    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Portfolio Value</h3>
    <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">$12,450.00</p>
    <p className="text-sm text-success-500">+2.5% from last month</p>
  </div>
  <LineChart
    data={dummyData}
    index="date"
    categories={["Desktop"]}
    colors={["var(--color-success-500, #22c55e)"]}
    showGridLines={false}
    showYAxis={false}
    showXAxis={false}
  />
</Card>`}
          />
        </section>

        <section id="sparkline" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Sparkline</h2>
          <ComponentPreview>
            <Card className="w-72 p-6">
              <LineChart
                data={dummyData}
                index="date"
                categories={["Desktop"]}
                variant="sparkline"
              />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Card className="p-6 w-72">
  <LineChart
    data={dummyData}
    index="date"
    categories={["Desktop"]}
    variant="sparkline"
  />
</Card>`}
          />
        </section>

        <section id="stats-with-chart" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Stats With Chart
          </h2>
          <ComponentPreview>
            <Card className="w-full p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Total Users
                  </h3>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">1,234</p>
                </div>
                <div className="w-32">
                  <LineChart
                    data={dummyData}
                    index="date"
                    categories={["Desktop"]}
                    variant="sparkline"
                    showTooltip={false}
                  />
                </div>
              </div>
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Card className="p-6">
  <div className="flex items-center justify-between mb-4">
    <div>
      <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Users</h3>
      <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">1,234</p>
    </div>
    <div className="w-32">
      <LineChart
        data={dummyData}
        index="date"
        categories={["Desktop"]}
        variant="sparkline"
        showTooltip={false}
      />
    </div>
  </div>
</Card>`}
          />
        </section>

        <section id="with-custom-tooltip" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            With Custom Tooltip
          </h2>
          <ComponentPreview>
            <Card className="w-full p-6">
              <LineChart
                data={dummyData}
                index="date"
                categories={["Desktop"]}
                customTooltip={({ payload, label, active }: any) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                        <p className="mb-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {label}
                        </p>
                        {payload.map((entry: any, index: number) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-zinc-500 dark:text-zinc-400">{entry.name}:</span>
                            <span className="font-medium text-zinc-900 dark:text-zinc-50">
                              {entry.value}
                            </span>
                          </div>
                        ))}
                        <div className="mt-2 text-xs text-indigo-500">Custom Tooltip Demo</div>
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
            code={`<Card className="p-6">
  <LineChart
    data={dummyData}
    index="date"
    categories={["Desktop"]}
    customTooltip={({ payload, label, active }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <p className="mb-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">{label}</p>
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-zinc-500 dark:text-zinc-400">{entry.name}:</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-50">{entry.value}</span>
              </div>
            ))}
            <div className="mt-2 text-xs text-indigo-500">Custom Tooltip Demo</div>
          </div>
        );
      }
      return null;
    }}
  />
</Card>`}
          />
        </section>

        <section id="traffic-source" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Traffic Source (No Dots)
          </h2>
          <ComponentPreview>
            <Card className="w-full p-6">
              <LineChart
                data={dummyData}
                index="date"
                categories={["Desktop", "Mobile"]}
                showDots={false}
              />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Card className="p-6">
  <LineChart
    data={dummyData}
    index="date"
    categories={["Desktop", "Mobile"]}
    showDots={false}
  />
</Card>`}
          />
        </section>

        <section id="connecting-nulls" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Connecting Nulls
          </h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            When <code>connectNulls</code> is set to true, the chart connects data points skipping
            any missing/null values, as demonstrated with the missing <code>June</code> data point
            in the Desktop category.
          </p>
          <ComponentPreview>
            <Card className="w-full p-6">
              <LineChart
                data={dummyData}
                index="date"
                categories={["Desktop"]}
                connectNulls={true}
              />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Card className="p-6">
  <LineChart
    data={dummyData}
    index="date"
    categories={["Desktop"]}
    connectNulls={true}
  />
</Card>`}
          />
        </section>

        <section id="css-classes" className="scroll-mt-24 space-y-6">
          <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
            CSS Classes
          </h2>
          <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
            <strong>Responsive scaling.</strong> The LineChart component applies standard Tailwind classes for dark mode and dimensions. Internal Recharts components accept specific utility classes via the <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">className</code> prop to ensure responsive container scaling.
          </p>
        </section>

        <section id="advanced-customization" className="scroll-mt-24 space-y-6">
          <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
            Advanced Customization
          </h2>
          <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
            <strong>Custom SVG &amp; tooltips.</strong> Inject custom SVG definitions via <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">children</code>, configure stroke styles, and render rich custom tooltips with live trend metrics.
          </p>
          <ComponentPreview>
            <Card className="mx-auto w-full max-w-2xl p-4">
              <LineChart
                data={dummyData}
                index="date"
                categories={["Desktop"]}
                colors={["url(#custom-gradient-line)"]}
                strokeDasharray="5 5"
                strokeWidth={3}
                customTooltip={(props: any) => {
                  if (!props.active || !props.payload || props.payload.length === 0) return null;
                  const { value } = props.payload[0];
                  return (
                    <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-xl">
                      <img
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                        alt="Avatar"
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-zinc-300">Revenue</p>
                        <p className="text-lg font-bold text-purple-400">${value}</p>
                      </div>
                    </div>
                  );
                }}
              >
                <defs>
                  <linearGradient id="custom-gradient-line" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </LineChart>
            </Card>
          </ComponentPreview>
          <CodeBlock
            code={`<LineChart
  data={dummyData}
  index="date"
  categories={["Desktop"]}
  colors={["url(#custom-gradient-line)"]}
  strokeDasharray="5 5"
  strokeWidth={3}
  customTooltip={(props: any) => {
    if (!props.active || !props.payload || props.payload.length === 0) return null;
    const { value } = props.payload[0];
    return (
      <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-xl">
        <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Avatar" className="h-10 w-10 rounded-full" />
        <div>
          <p className="text-sm font-medium text-zinc-300">Revenue</p>
          <p className="text-lg font-bold text-purple-400">$\${value}</p>
        </div>
      </div>
    );
  }}
>
  <defs>
    <linearGradient id="custom-gradient-line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#a855f7" />
      <stop offset="100%" stopColor="#ec4899" />
    </linearGradient>
  </defs>
</LineChart>`}
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
              href="https://recharts.github.io/en-US/api/LineChart/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              https://recharts.github.io/en-US/api/LineChart/
            </a>
            )
          </p>
        </section>
      </div>
    </div>
  );
}
