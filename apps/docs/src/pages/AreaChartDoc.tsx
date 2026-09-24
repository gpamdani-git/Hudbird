// apps/docs/src/pages/AreaChartDoc.tsx
import areaChartCode from "../../../../packages/core/src/components/AreaChart/AreaChart.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { PageToolbar } from "../components/PageToolbar";
import { AreaChart, Card, Tabs, Tab } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const areaChartTocItems = [
  { id: "installation", title: "Installation" },
  { id: "anatomy", title: "Anatomy" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-usage", title: "Basic Area Chart" },
      { id: "custom-tooltip", title: "Custom Tooltip" },
      { id: "time-aggregation", title: "Time Aggregation (Day/Week/Month/Year)" },
      { id: "kpi-area-chart", title: "KPI With Area Chart" },
      { id: "stacked", title: "Stacked Area Chart" },
      { id: "sparkline", title: "Sparkline Variant" },
    ],
  },
  { id: "css-classes", title: "CSS Classes" },
  { id: "element-classes", title: "Element Classes" },
  { id: "recharts-theming", title: "Recharts Theming" },
];

const chartData = [
  { month: "Jan", revenue: 2890, expenses: 2390 },
  { month: "Feb", revenue: 2756, expenses: 1398 },
  { month: "Mar", revenue: 3322, expenses: 9800 },
  { month: "Apr", revenue: 3478, expenses: 3908 },
  { month: "May", revenue: 3890, expenses: 4800 },
  { month: "Jun", revenue: 3390, expenses: 3800 },
  { month: "Jul", revenue: 4490, expenses: 4300 },
];

const dataDay = [
  { time: "00:00", value: 120 },
  { time: "04:00", value: 180 },
  { time: "08:00", value: 250 },
  { time: "12:00", value: 400 },
  { time: "16:00", value: 380 },
  { time: "20:00", value: 210 },
];
const dataWeek = [
  { time: "Mon", value: 400 },
  { time: "Tue", value: 500 },
  { time: "Wed", value: 450 },
  { time: "Thu", value: 600 },
  { time: "Fri", value: 750 },
  { time: "Sat", value: 300 },
  { time: "Sun", value: 250 },
];
const dataMonth = [
  { time: "Week 1", value: 2000 },
  { time: "Week 2", value: 2500 },
  { time: "Week 3", value: 2200 },
  { time: "Week 4", value: 3000 },
];
const dataYear = [
  { time: "Jan", value: 8000 },
  { time: "Feb", value: 9500 },
  { time: "Mar", value: 8200 },
  { time: "Apr", value: 11000 },
  { time: "May", value: 10500 },
  { time: "Jun", value: 12000 },
  { time: "Jul", value: 11500 },
  { time: "Aug", value: 13000 },
  { time: "Sep", value: 12500 },
  { time: "Oct", value: 14000 },
  { time: "Nov", value: 13500 },
  { time: "Dec", value: 15000 },
];

const kpiData1 = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 135 },
  { day: "Wed", value: 110 },
  { day: "Thu", value: 160 },
  { day: "Fri", value: 180 },
  { day: "Sat", value: 155 },
  { day: "Sun", value: 190 },
];

const kpiData2 = [
  { day: "Mon", value: 85 },
  { day: "Tue", value: 92 },
  { day: "Wed", value: 98 },
  { day: "Thu", value: 95 },
  { day: "Fri", value: 88 },
  { day: "Sat", value: 75 },
  { day: "Sun", value: 72 },
];

const kpiData3 = [
  { day: "Mon", value: 20 },
  { day: "Tue", value: 25 },
  { day: "Wed", value: 32 },
  { day: "Thu", value: 38 },
  { day: "Fri", value: 45 },
  { day: "Sat", value: 50 },
  { day: "Sun", value: 55 },
];

export default function AreaChartDoc() {
  const apiRows: ApiPropRow[] = [
    {
      prop: "data",
      defaultVal: "[]",
      type: "any[]",
      desc: "The data array to render in the chart.",
    },
    {
      prop: "index",
      defaultVal: "-",
      type: "string",
      desc: "The key to map to the x-axis.",
    },
    {
      prop: "categories",
      defaultVal: "[]",
      type: "string[]",
      desc: "The keys to map to the areas on the y-axis.",
    },
    {
      prop: "colors",
      defaultVal: "defaultColors",
      type: "string[]",
      desc: "Array of colors for the areas.",
    },
    {
      prop: "type",
      defaultVal: "'default'",
      type: "'default' | 'stacked' | 'percent'",
      desc: "The style of the area chart.",
    },
    {
      prop: "variant",
      defaultVal: "'default'",
      type: "'default' | 'sparkline'",
      desc: "Visual variant of the chart.",
    },
    {
      prop: "customTooltip",
      defaultVal: "-",
      type: "React.ReactElement | Function",
      desc: "A custom React component to render as the tooltip.",
    },
  ];

  return (
    <div className="pb-24">
      {/* Title & Subtitle */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Area Chart
            </h1>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              New
            </span>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
            An area chart for visualizing trends with gradient fills, stacked series, and sparkline
            variants.
          </p>
        </div>
        <PageToolbar />
      </div>

      <section id="installation" className="mb-12 scroll-mt-20">
        <InstallationTabs
          componentName="area-chart"
          dependencies="recharts clsx tailwind-merge"
          manualCode={areaChartCode}
        />
      </section>

      <section id="anatomy" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Anatomy</h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          Area chart is built on top of the <code>recharts</code> library. It abstracts away the
          complexity of configuring multiple components.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <CodeBlock
            code={`import { AreaChart } from "@hudbird/ui";

export default function App() {
  return (
    <AreaChart 
      data={chartData}
      index="month"
      categories={["revenue"]}
    />
  );
}`}
            language="tsx"
          />
        </div>
      </section>

      <section id="examples" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Examples</h2>

        {/* Basic Usage */}
        <div id="basic-usage" className="mb-10 scroll-mt-24">
          <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Basic Area Chart
          </h3>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            The default AreaChart renders gradient fills for all categories mapped on the chart.
          </p>
          <ComponentPreview>
            <Card className="mx-auto w-full max-w-4xl p-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  Revenue Metrics
                </h3>
                <p className="text-sm text-zinc-500">Monthly revenue overview</p>
              </div>
              <AreaChart
                data={chartData}
                index="month"
                categories={["revenue"]}
                valueFormatter={(v) => `$${v}`}
              />
            </Card>
          </ComponentPreview>
          <CodeBlock
            code={`<Card className="p-6">
  <div className="mb-4">
    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Revenue Metrics</h3>
    <p className="text-sm text-zinc-500">Monthly revenue overview</p>
  </div>
  <AreaChart
    data={chartData}
    index="month"
    categories={["revenue"]}
    valueFormatter={(v) => \`$\${v}\`}
  />
</Card>`}
          />
        </div>

        {/* Custom Tooltip */}
        <div id="custom-tooltip" className="mb-10 scroll-mt-24">
          <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Custom Tooltip
          </h3>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            You can override the default tooltip by passing a <code>customTooltip</code> prop.
          </p>
          <ComponentPreview>
            <Card className="mx-auto w-full max-w-4xl p-6">
              <AreaChart
                data={chartData}
                index="month"
                categories={["revenue", "expenses"]}
                customTooltip={({ active, payload, label }: any) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="min-w-32 rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-white shadow-xl">
                        <p className="mb-2 border-b border-zinc-700 pb-2 text-sm font-bold">
                          {label}
                        </p>
                        {payload.map((item: any, i: number) => (
                          <div
                            key={i}
                            className="mt-1 flex items-center justify-between gap-4 text-sm"
                          >
                            <span style={{ color: item.color }}>{item.name}</span>
                            <span className="font-mono">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </Card>
          </ComponentPreview>
          <CodeBlock
            code={`const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 text-white p-3 rounded-lg shadow-xl border border-zinc-800 min-w-32">
        <p className="font-bold border-b border-zinc-700 pb-2 mb-2 text-sm">{label}</p>
        {payload.map((item: any, i: number) => (
          <div key={i} className="flex justify-between items-center gap-4 text-sm mt-1">
            <span style={{ color: item.color }}>{item.name}</span>
            <span className="font-mono">{item.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

<Card className="p-6">
  <AreaChart
    data={chartData}
    index="month"
    categories={["revenue", "expenses"]}
    customTooltip={CustomTooltip}
  />
</Card>`}
          />
        </div>

        {/* Time Aggregation */}
        <div id="time-aggregation" className="mb-10 scroll-mt-24">
          <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Time Aggregation (Day, Week, Month, Year)
          </h3>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            You can dynamically change the data source to aggregate metrics by different time
            intervals.
          </p>
          <ComponentPreview>
            <Card className="mx-auto w-full max-w-4xl p-4">
              <Tabs fullWidth defaultSelectedKey="day">
                <Tab key="day" title="Day">
                  <div className="mt-4">
                    <AreaChart
                      data={dataDay}
                      index="time"
                      categories={["value"]}
                      valueFormatter={(v) => `${v}`}
                      className="h-[300px]"
                    />
                  </div>
                </Tab>
                <Tab key="week" title="Week">
                  <div className="mt-4">
                    <AreaChart
                      data={dataWeek}
                      index="time"
                      categories={["value"]}
                      valueFormatter={(v) => `${v}`}
                      className="h-[300px]"
                    />
                  </div>
                </Tab>
                <Tab key="month" title="Month">
                  <div className="mt-4">
                    <AreaChart
                      data={dataMonth}
                      index="time"
                      categories={["value"]}
                      valueFormatter={(v) => `${v}`}
                      className="h-[300px]"
                    />
                  </div>
                </Tab>
                <Tab key="year" title="Year">
                  <div className="mt-4">
                    <AreaChart
                      data={dataYear}
                      index="time"
                      categories={["value"]}
                      valueFormatter={(v) => `${v}`}
                      className="h-[300px]"
                    />
                  </div>
                </Tab>
              </Tabs>
            </Card>
          </ComponentPreview>
          <CodeBlock
            code={`<Card className="p-4">
  <Tabs fullWidth defaultSelectedKey="day">
    <Tab key="day" title="Day">
      <div className="mt-4">
        <AreaChart
          data={dataDay}
          index="time"
          categories={["value"]}
          valueFormatter={(v) => \`$\${v}\`}
        />
      </div>
    </Tab>
    {/* ... Week, Month, Year Tabs ... */}
  </Tabs>
</Card>`}
          />
        </div>

        {/* KPI With Area Chart */}
        <div id="kpi-area-chart" className="mb-10 scroll-mt-24">
          <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            KPI With Area Chart
          </h3>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            Area charts are commonly used within small KPI cards. Here is how you can use the
            sparkline variant for metric dashboards.
          </p>
          <ComponentPreview>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              {/* Card 1 */}
              <Card className="border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Total Revenue
                    </div>
                    <div className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                      $228,451
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs">
                      <span className="flex items-center font-medium text-emerald-600 dark:text-emerald-500">
                        <ArrowUp className="mr-0.5 h-3 w-3" />
                        3.3%
                      </span>
                      <span className="text-zinc-500 dark:text-zinc-400">last 30d</span>
                    </div>
                  </div>
                  <div className="h-[72px] w-[140px]">
                    <AreaChart
                      data={kpiData1}
                      index="day"
                      categories={["value"]}
                      variant="sparkline"
                      colors={["#3b82f6"]}
                    />
                  </div>
                </div>
              </Card>

              {/* Card 2 */}
              <Card className="border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Bounce Rate
                    </div>
                    <div className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                      42.3%
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs">
                      <span className="flex items-center font-medium text-red-600 dark:text-red-500">
                        <ArrowDown className="mr-0.5 h-3 w-3" />
                        5.9%
                      </span>
                      <span className="text-zinc-500 dark:text-zinc-400">vs last 7d</span>
                    </div>
                  </div>
                  <div className="h-[72px] w-[140px]">
                    <AreaChart
                      data={kpiData2}
                      index="day"
                      categories={["value"]}
                      variant="sparkline"
                      colors={["#ef4444"]}
                    />
                  </div>
                </div>
              </Card>

              {/* Card 3 */}
              <Card className="border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Active Users
                    </div>
                    <div className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                      98K
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs">
                      <span className="flex items-center font-medium text-emerald-600 dark:text-emerald-500">
                        <ArrowUp className="mr-0.5 h-3 w-3" />
                        10.9%
                      </span>
                      <span className="text-zinc-500 dark:text-zinc-400">this month</span>
                    </div>
                  </div>
                  <div className="h-[72px] w-[140px]">
                    <AreaChart
                      data={kpiData3}
                      index="day"
                      categories={["value"]}
                      variant="sparkline"
                      colors={["#22c55e"]}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
  <Card className="p-4 border border-zinc-200 shadow-sm flex flex-col gap-4">
    <div className="flex justify-between items-center">
      <span className="text-zinc-500 font-medium text-sm">Total Revenue</span>
      <span className="text-green-500 text-xs font-semibold px-2 py-1 bg-green-100 rounded-md">+12.5%</span>
    </div>
    <div className="text-3xl font-bold">$229,401</div>
    <AreaChart data={kpiData1} index="day" categories={["value"]} variant="sparkline" colors={["#3b82f6"]} />
  </Card>
  
  <Card className="p-4 border border-zinc-200 shadow-sm flex flex-col gap-4">
    <div className="flex justify-between items-center">
      <span className="text-zinc-500 font-medium text-sm">Bounce Rate</span>
      <span className="text-red-500 text-xs font-semibold px-2 py-1 bg-red-100 rounded-md">+2.1%</span>
    </div>
    <div className="text-3xl font-bold">42.3%</div>
    <AreaChart data={kpiData2} index="day" categories={["value"]} variant="sparkline" colors={["#ef4444"]} />
  </Card>

  <Card className="p-4 border border-zinc-200 shadow-sm flex flex-col gap-4">
    <div className="flex justify-between items-center">
      <span className="text-zinc-500 font-medium text-sm">New Users</span>
      <span className="text-green-500 text-xs font-semibold px-2 py-1 bg-green-100 rounded-md">+5.2%</span>
    </div>
    <div className="text-3xl font-bold">98K</div>
    <AreaChart data={kpiData3} index="day" categories={["value"]} variant="sparkline" colors={["#22c55e"]} />
  </Card>
</div>`}
          />
        </div>

        {/* Stacked Series */}
        <div id="stacked" className="mb-10 scroll-mt-24">
          <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Stacked Series
          </h3>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            Use <code>type="stacked"</code> to stack areas on top of each other.
          </p>
          <ComponentPreview>
            <Card className="mx-auto w-full max-w-4xl p-6">
              <AreaChart
                data={chartData}
                index="month"
                categories={["revenue", "expenses"]}
                type="stacked"
                valueFormatter={(v) => `$${v}`}
              />
            </Card>
          </ComponentPreview>
          <CodeBlock
            code={`<Card className="p-6">
  <AreaChart
    data={chartData}
    index="month"
    categories={["revenue", "expenses"]}
    type="stacked"
    valueFormatter={(v) => \`$\${v}\`}
  />
</Card>`}
          />
        </div>

        {/* Sparkline Variant */}
        <div id="sparkline" className="mb-10 scroll-mt-24">
          <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Sparkline Variant
          </h3>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            Use <code>variant="sparkline"</code> to hide the axes and grid lines for a simplified
            visual.
          </p>
          <ComponentPreview>
            <Card className="w-72 p-4">
              <div className="mb-2">
                <h3 className="text-sm font-medium text-zinc-500">Total Revenue</h3>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">$45,231</p>
              </div>
              <AreaChart
                data={chartData}
                index="month"
                categories={["revenue"]}
                variant="sparkline"
                colors={["#22c55e"]}
              />
            </Card>
          </ComponentPreview>
          <CodeBlock
            code={`<Card className="p-4 w-72">
  <div className="mb-2">
    <h3 className="text-sm font-medium text-zinc-500">Total Revenue</h3>
    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">$45,231</p>
  </div>
  <AreaChart
    data={chartData}
    index="month"
    categories={["revenue"]}
    variant="sparkline"
    colors={["#22c55e"]}
  />
</Card>`}
          />
        </div>
      </section>

      <section id="css-classes" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">CSS Classes</h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          The chart components accept a <code>className</code> prop which is passed to the root
          wrapper.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <CodeBlock
            code={`<AreaChart 
  className="bg-zinc-50 rounded-lg p-2 border border-zinc-200"
  data={chartData}
  index="month"
  categories={["revenue"]}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section id="element-classes" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Element Classes
        </h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          Recharts generates specific SVG elements. You can style them globally by targeting classes
          like <code>.recharts-cartesian-grid-horizontal line</code> or{" "}
          <code>.recharts-tooltip-wrapper</code> in your global CSS.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <CodeBlock
            code={`/* In your global.css */
.recharts-cartesian-grid-horizontal line {
  stroke: var(--color-zinc-200);
}

.dark .recharts-cartesian-grid-horizontal line {
  stroke: var(--color-zinc-800);
}`}
            language="css"
          />
        </div>
      </section>

      <section id="recharts-theming" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Recharts Theming
        </h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          We configure Recharts to pick up your application's current theme variables automatically
          using Tailwind's <code>currentColor</code> or direct CSS variables.
        </p>
        <ul className="ml-6 list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
          <li>
            <code>stroke="currentColor"</code> is applied to grids to match dark/light mode borders.
          </li>
          <li>
            Labels are styled with <code>text-zinc-500 dark:text-zinc-400</code> for dynamic
            contrast.
          </li>
        </ul>
      </section>

      <section id="advanced-customization" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Advanced Customization
        </h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          You can inject custom SVG gradients via <code>children</code>, change stroke styles, and
          use completely custom tooltips with images.
        </p>
        <ComponentPreview>
          <Card className="mx-auto w-full max-w-2xl p-4">
            <AreaChart
              data={chartData}
              index="month"
              categories={["revenue"]}
              colors={["url(#custom-gradient-area)"]}
              strokeDasharray="4 4"
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
                      <p className="text-lg font-bold text-white">${value}</p>
                    </div>
                  </div>
                );
              }}
            >
              <defs>
                <linearGradient id="custom-gradient-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </Card>
        </ComponentPreview>
        <CodeBlock
          code={`<AreaChart
  data={chartData}
  index="month"
  categories={["revenue"]}
  colors={["url(#custom-gradient-area)"]}
  strokeDasharray="4 4"
  customTooltip={(props: any) => {
    if (!props.active || !props.payload || props.payload.length === 0) return null;
    const { value } = props.payload[0];
    return (
      <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-xl">
        <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Avatar" className="h-10 w-10 rounded-full" />
        <div>
          <p className="text-sm font-medium text-zinc-300">Revenue</p>
          <p className="text-lg font-bold text-white">$\${value}</p>
        </div>
      </div>
    );
  }}
>
  <defs>
    <linearGradient id="custom-gradient-area" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
    </linearGradient>
  </defs>
</AreaChart>`}
        />
      </section>

      <section id="component-api" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Component API</h2>
        <ApiTable rows={apiRows} />
        <h3 className="mt-8 mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
          API Reference
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          ref : (
          <a
            href="https://recharts.org/en-US/api/AreaChart"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            https://recharts.org/en-US/api/AreaChart
          </a>
          )
        </p>
      </section>
    </div>
  );
}
