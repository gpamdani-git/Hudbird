import barChartCode from "../../../../packages/core/src/components/BarChart/BarChart.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React from "react";
import { PageToolbar } from "../components/PageToolbar";
import { BarChart, Card, Tabs, Tab } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const barChartTocItems = [
  { id: "installation", title: "Installation" },
  { id: "anatomy", title: "Anatomy" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "horizontal-stacked", title: "Horizontal Stacked" },
      { id: "stacked", title: "Stacked" },
      { id: "grouped", title: "Grouped" },
      { id: "custom-tooltip", title: "Custom Tooltip" },
      { id: "time-aggregation", title: "Time Aggregation (Day/Week/Month/Year)" },
    ],
  },
  { id: "css-classes", title: "CSS Classes" },
  { id: "element-classes", title: "Element Classes" },
  { id: "recharts-theming", title: "Recharts Theming" },
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

const horizontalStackedData = [
  { day: "Mon", Low: 120, Medium: 250, High: 150 },
  { day: "Tue", Low: 150, Medium: 280, High: 180 },
  { day: "Wed", Low: 180, Medium: 220, High: 120 },
  { day: "Thu", Low: 140, Medium: 260, High: 160 },
  { day: "Fri", Low: 160, Medium: 240, High: 150 },
  { day: "Sat", Low: 130, Medium: 200, High: 180 },
  { day: "Sun", Low: 170, Medium: 270, High: 200 },
];

const stackedData = [
  { quarter: "Q1", Starter: 4000, Pro: 12000, Enterprise: 24000 },
  { quarter: "Q2", Starter: 5000, Pro: 15000, Enterprise: 30000 },
  { quarter: "Q3", Starter: 6000, Pro: 18000, Enterprise: 36000 },
  { quarter: "Q4", Starter: 7000, Pro: 21000, Enterprise: 42000 },
];

const groupedData = [
  { month: "Jan", Online: 4000, Retail: 3200, Direct: 3800 },
  { month: "Feb", Online: 5800, Retail: 4000, Direct: 4800 },
  { month: "Mar", Online: 4800, Retail: 3600, Direct: 4500 },
  { month: "Apr", Online: 7200, Retail: 4200, Direct: 5200 },
  { month: "May", Online: 6000, Retail: 4500, Direct: 5500 },
  { month: "Jun", Online: 8500, Retail: 5000, Direct: 5800 },
];

const apiRows: ApiPropRow[] = [
  {
    prop: "data",
    type: "any[]",
    default: "-",
    description: "The data array to display in the chart.",
  },
  {
    prop: "index",
    type: "string",
    default: "-",
    description: "The object key mapped to the X-axis (or Y-axis in horizontal layout).",
  },
  {
    prop: "categories",
    type: "string[]",
    default: "-",
    description: "Array of object keys mapped to the plotted bar series.",
  },
  {
    prop: "colors",
    type: "string[]",
    default: "defaultColors",
    description: "Array of CSS colors (hex, rgb, or CSS variables) to use for the categories.",
  },
  {
    prop: "valueFormatter",
    type: "(value: number) => string",
    default: "value.toString()",
    description: "A function to format values on the axes and tooltips.",
  },
  {
    prop: "showXAxis",
    type: "boolean",
    default: "true",
    description: "Whether to show the X-axis.",
  },
  {
    prop: "showYAxis",
    type: "boolean",
    default: "true",
    description: "Whether to show the Y-axis.",
  },
  {
    prop: "showGridLines",
    type: "boolean",
    default: "true",
    description: "Whether to show the cartesian grid.",
  },
  {
    prop: "showLegend",
    type: "boolean",
    default: "true",
    description: "Whether to show the legend.",
  },
  {
    prop: "showTooltip",
    type: "boolean",
    default: "true",
    description: "Whether to show the tooltip.",
  },
  {
    prop: "type",
    type: `"default" | "stacked" | "percent"`,
    default: `"default"`,
    description: "The stacking behavior of the bars.",
  },
  {
    prop: "variant",
    type: `"default" | "sparkline"`,
    default: `"default"`,
    description: "If sparkline, height is reduced and axes/grids are hidden.",
  },
  {
    prop: "layout",
    type: `"horizontal" | "vertical"`,
    default: `"horizontal"`,
    description: "The layout of the bar chart.",
  },
  {
    prop: "barRadius",
    type: "number | [number, number, number, number]",
    default: "4",
    description: "The radius of the bar corners.",
  },
  {
    prop: "customTooltip",
    type: "React.ReactElement | Function",
    default: "-",
    description: "Custom component to render the tooltip.",
  },
];

export default function BarChartDoc() {
  const [activeTab, setActiveTab] = React.useState<"day" | "week" | "month" | "year">("day");

  const activeData = React.useMemo(() => {
    switch (activeTab) {
      case "day":
        return dataDay;
      case "week":
        return dataWeek;
      case "month":
        return dataMonth;
      case "year":
        return dataYear;
    }
  }, [activeTab]);

  return (
    <div className="flex w-full max-w-6xl flex-col lg:flex-row lg:items-start lg:gap-12">
      <div className="min-w-0 flex-1">
        <div className="flex flex-col items-start justify-between gap-4 pb-8 sm:flex-row sm:items-center">
          <div className="w-full min-w-0 flex-1 pr-4">
            <div className="mb-3 flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                Bar Chart
              </h1>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                New
              </span>
              <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                Component
              </span>
            </div>
            <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
              A chart that displays information as rectangular bars with lengths proportional to the
              values they represent.
            </p>
          </div>
          <PageToolbar />
        </div>

        <section id="installation" className="mb-12 scroll-mt-20">
          <InstallationTabs
            componentName="bar-chart"
            dependencies="recharts clsx tailwind-merge"
            manualCode={barChartCode}
          />
        </section>

        <section id="anatomy" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Anatomy</h2>
          <CodeBlock
            language="tsx"
            code={`import { BarChart } from "@hudbird/ui";

export default function App() {
  return (
    <BarChart 
      data={data}
      index="month"
      categories={["revenue", "expenses"]}
      colors={["#3b82f6", "#ef4444"]}
    />
  );
}`}
          />
        </section>

        <section id="examples" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Examples</h2>

          {/* Horizontal Stacked */}
          <div id="horizontal-stacked" className="mb-10 scroll-mt-24">
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Horizontal Stacked
            </h3>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              A horizontal bar chart with stacked series, often used to display breakdowns across
              categories.
            </p>
            <ComponentPreview>
              <Card className="mx-auto w-full max-w-2xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Avg. Energy Activity
                  </h4>
                  <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                    580/280 <span className="text-sm font-normal text-zinc-500">kcal</span>
                  </p>
                </div>
                <BarChart
                  data={horizontalStackedData}
                  index="day"
                  categories={["Low", "Medium", "High"]}
                  layout="vertical"
                  type="stacked"
                  colors={["#0032a8", "#0066f5", "#42a5f5"]}
                  className="h-[300px]"
                />
              </Card>
            </ComponentPreview>
            <CodeBlock
              code={`import { BarChart, Card } from "@hudbird/ui";

const data = [ { day: "Mon", Low: 120, Medium: 250, High: 150 }, /* ... */ ];

export function HorizontalStackedExample() {
  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="mb-4">
        <h4 className="text-sm font-medium">Avg. Energy Activity</h4>
        <p className="text-2xl font-bold mt-1">
          580/280 <span className="text-sm font-normal text-zinc-500">kcal</span>
        </p>
      </div>
      <BarChart
        data={data}
        index="day"
        categories={["Low", "Medium", "High"]}
        layout="vertical"
        type="stacked"
        colors={["#0032a8", "#0066f5", "#42a5f5"]}
        className="h-[300px]"
      />
    </Card>
  );
}`}
            />
          </div>

          {/* Stacked */}
          <div id="stacked" className="mb-10 scroll-mt-24">
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Stacked</h3>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              Vertical stacked bar chart for showing part-to-whole relationships over time.
            </p>
            <ComponentPreview>
              <Card className="mx-auto w-full max-w-2xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    Revenue by Plan
                  </h4>
                </div>
                <BarChart
                  data={stackedData}
                  index="quarter"
                  categories={["Enterprise", "Pro", "Starter"]}
                  type="stacked"
                  colors={["#42a5f5", "#0066f5", "#0032a8"]}
                  valueFormatter={(v) => `$${v / 1000}k`}
                  className="h-[300px]"
                />
              </Card>
            </ComponentPreview>
            <CodeBlock
              code={`import { BarChart, Card } from "@hudbird/ui";

const data = [ { quarter: "Q1", Starter: 4000, Pro: 12000, Enterprise: 24000 }, /* ... */ ];

export function StackedExample() {
  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <h4 className="text-lg font-semibold mb-4">Revenue by Plan</h4>
      <BarChart
        data={data}
        index="quarter"
        categories={["Enterprise", "Pro", "Starter"]}
        type="stacked"
        colors={["#42a5f5", "#0066f5", "#0032a8"]}
        valueFormatter={(v) => \`$$${v / 1000}k\`}
        className="h-[300px]"
      />
    </Card>
  );
}`}
            />
          </div>

          {/* Grouped */}
          <div id="grouped" className="mb-10 scroll-mt-24">
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Grouped</h3>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              Standard grouped bar chart for comparing multiple categories side by side.
            </p>
            <ComponentPreview>
              <Card className="mx-auto w-full max-w-2xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    Revenue by Channel
                  </h4>
                </div>
                <BarChart
                  data={groupedData}
                  index="month"
                  categories={["Online", "Retail", "Direct"]}
                  colors={["#42a5f5", "#0066f5", "#0032a8"]}
                  valueFormatter={(v) => `$${v / 1000}k`}
                  className="h-[300px]"
                />
              </Card>
            </ComponentPreview>
            <CodeBlock
              code={`import { BarChart, Card } from "@hudbird/ui";

const data = [ { month: "Jan", Online: 4000, Retail: 3200, Direct: 3800 }, /* ... */ ];

export function GroupedExample() {
  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <h4 className="text-lg font-semibold mb-4">Revenue by Channel</h4>
      <BarChart
        data={data}
        index="month"
        categories={["Online", "Retail", "Direct"]}
        colors={["#42a5f5", "#0066f5", "#0032a8"]}
        valueFormatter={(v) => \`$$${v / 1000}k\`}
        className="h-[300px]"
      />
    </Card>
  );
}`}
            />
          </div>

          {/* Custom Tooltip */}
          <div id="custom-tooltip" className="mb-10 scroll-mt-24">
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Custom Tooltip
            </h3>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              Override the default Recharts tooltip by passing a custom React component to{" "}
              <code>customTooltip</code>.
            </p>
            <ComponentPreview>
              <Card className="mx-auto w-full max-w-2xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    Revenue by Channel
                  </h4>
                </div>
                <BarChart
                  data={groupedData}
                  index="month"
                  categories={["Online", "Retail", "Direct"]}
                  colors={["#42a5f5", "#0066f5", "#0032a8"]}
                  valueFormatter={(v) => `$${v / 1000}k`}
                  className="h-[300px]"
                  customTooltip={({ active, payload, label }: any) => {
                    if (active && payload && payload.length) {
                      const total = payload.reduce((acc: number, curr: any) => acc + curr.value, 0);

                      return (
                        <div className="w-48 rounded-xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
                          <p className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            {label}
                          </p>
                          <div className="space-y-2">
                            {payload.map((item: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div
                                    className="h-2 w-2 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                  />
                                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                    {item.name}
                                  </span>
                                </div>
                                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                  ${item.value.toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 flex items-center justify-between border-t border-zinc-200 pt-3 dark:border-zinc-800">
                            <span className="text-sm text-zinc-600 dark:text-zinc-400">Total</span>
                            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                              ${total.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </Card>
            </ComponentPreview>
            <CodeBlock
              code={`import { BarChart, Card } from "@hudbird/ui";

const data = [ { month: "Jan", Online: 4000, Retail: 3200, Direct: 3800 }, /* ... */ ];

export function CustomTooltipExample() {
  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <h4 className="text-lg font-semibold mb-4">Revenue by Channel</h4>
      <BarChart
        data={data}
        index="month"
        categories={["Online", "Retail", "Direct"]}
        colors={["#42a5f5", "#0066f5", "#0032a8"]}
        valueFormatter={(v) => \`$$${v / 1000}k\`}
        className="h-[300px]"
        customTooltip={({ active, payload, label }: any) => {
          if (active && payload && payload.length) {
            const total = payload.reduce((acc, curr) => acc + curr.value, 0);
            return (
              <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 w-48">
                <p className="mb-3 text-sm font-semibold">{label}</p>
                <div className="space-y-2">
                  {payload.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-zinc-600">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">${item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 border-t border-zinc-200 pt-3 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">Total</span>
                  <span className="text-sm font-bold">${total.toLocaleString()}</span>
                </div>
              </div>
            );
          }
          return null;
        }}
      />
    </Card>
  );
}`}
            />
          </div>

          {/* Time Aggregation */}
          <div id="time-aggregation" className="mb-10 scroll-mt-24">
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Time Aggregation (Day/Week/Month/Year)
            </h3>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              Use a <code>Tabs</code> component to switch between different data sets for dynamic
              views.
            </p>
            <ComponentPreview>
              <Card className="border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
                <div className="mb-6 flex items-center justify-between pr-4">
                  <div>
                    <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      Traffic Overview
                    </h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Showing page views across different timeframes.
                    </p>
                  </div>
                  <Tabs
                    selectedKey={activeTab}
                    onSelectionChange={(val: any) => setActiveTab(val)}
                    className="w-[270px]"
                  >
                    <Tab key="day" title="Day" />
                    <Tab key="week" title="Week" />
                    <Tab key="month" title="Month" />
                    <Tab key="year" title="Year" />
                  </Tabs>
                </div>
                <BarChart
                  key={activeTab}
                  data={activeData}
                  index="time"
                  categories={["value"]}
                  colors={["#a855f7"]}
                  valueFormatter={(value) => `${value} views`}
                />
              </Card>
            </ComponentPreview>
            <CodeBlock
              code={`import * as React from "react";
import { BarChart, Card, Tabs, Tab } from "@hudbird/ui";

const dataDay = [ { time: "00:00", value: 120 }, { time: "04:00", value: 180 }, /* ... */ ];
const dataWeek = [ { time: "Mon", value: 400 }, { time: "Tue", value: 500 }, /* ... */ ];
const dataMonth = [ { time: "Week 1", value: 2000 }, { time: "Week 2", value: 2500 }, /* ... */ ];
const dataYear = [ { time: "Jan", value: 8000 }, { time: "Feb", value: 9500 }, /* ... */ ];

export function TimeAggregationExample() {
  const [activeTab, setActiveTab] = React.useState<"day" | "week" | "month" | "year">("day");

  const activeData = React.useMemo(() => {
    switch (activeTab) {
      case "day": return dataDay;
      case "week": return dataWeek;
      case "month": return dataMonth;
      case "year": return dataYear;
    }
  }, [activeTab]);

  return (
    <Card className="p-6 border border-zinc-200 shadow-sm dark:border-zinc-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Traffic Overview</h4>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Showing page views across different timeframes.</p>
        </div>
        <Tabs selectedKey={activeTab} onSelectionChange={(val: any) => setActiveTab(val)} className="w-[300px]">
          <Tab key="day" title="Day" />
          <Tab key="week" title="Week" />
          <Tab key="month" title="Month" />
          <Tab key="year" title="Year" />
        </Tabs>
      </div>
      <BarChart
        key={activeTab}
        data={activeData}
        index="time"
        categories={["value"]}
        colors={["#a855f7"]}
        valueFormatter={(value) => \`${value} views\`}
      />
    </Card>
  );
}`}
            />
          </div>
        </section>

        <section id="css-classes" className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">CSS Classes</h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            You can override the styles of the wrapper using the <code>className</code> prop. By
            default, the <code>variant="sparkline"</code> sets the height to 120px, and the default
            variant sets it to 350px.
          </p>
        </section>

        <section id="element-classes" className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Element Classes
          </h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            Recharts components expose specific class names that you can target with global CSS if
            you need to override the SVG styles. For example, <code>.recharts-bar-rectangle</code>,{" "}
            <code>.recharts-cartesian-axis-tick-value</code>, etc.
          </p>
        </section>

        <section id="recharts-theming" className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Recharts Theming
          </h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            This component maps nicely to Tailwind dark mode (<code>dark:text-zinc-400</code>,
            etc.). You can pass standard hex colors, or use CSS variables defined in your global CSS
            to automatically adapt to dark/light themes.
          </p>
        </section>

        <section id="advanced-customization" className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Advanced Customization
          </h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            You can inject custom SVG gradients via <code>children</code> and use completely custom
            tooltips with images.
          </p>
          <ComponentPreview>
            <Card className="mx-auto w-full max-w-2xl p-4">
              <BarChart
                data={dataMonth}
                index="time"
                categories={["value"]}
                colors={["url(#custom-gradient-bar)"]}
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
                        <p className="text-lg font-bold text-emerald-400">${value}</p>
                      </div>
                    </div>
                  );
                }}
              >
                <defs>
                  <linearGradient id="custom-gradient-bar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
              </BarChart>
            </Card>
          </ComponentPreview>
          <CodeBlock
            code={`<BarChart
  data={dataMonth}
  index="time"
  categories={["value"]}
  colors={["url(#custom-gradient-bar)"]}
  customTooltip={(props: any) => {
    if (!props.active || !props.payload || props.payload.length === 0) return null;
    const { value } = props.payload[0];
    return (
      <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-xl">
        <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Avatar" className="h-10 w-10 rounded-full" />
        <div>
          <p className="text-sm font-medium text-zinc-300">Revenue</p>
          <p className="text-lg font-bold text-emerald-400">$${value}</p>
        </div>
      </div>
    );
  }}
>
  <defs>
    <linearGradient id="custom-gradient-bar" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
    </linearGradient>
  </defs>
</BarChart>`}
          />
        </section>

        <section id="component-api" className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Component API
          </h2>
          <ApiTable rows={apiRows} />
          <h3 className="mt-8 mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            API Reference
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            ref : (
            <a
              href="https://recharts.org/en-US/api/BarChart"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              https://recharts.org/en-US/api/BarChart
            </a>
            )
          </p>
        </section>
      </div>
    </div>
  );
}
