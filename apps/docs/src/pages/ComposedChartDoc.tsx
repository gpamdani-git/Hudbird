import composedChartCode from "../../../../packages/core/src/components/ComposedChart/ComposedChart.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React from "react";
import { DocHeader } from "../components/DocHeader";
import { ComposedChart, Card } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";
import { composedChartTocItems } from "../tocData";

const dummyData = [
  { date: "Jan", Desktop: 100, Mobile: 120 },
  { date: "Feb", Desktop: 150, Mobile: 140 },
  { date: "Mar", Desktop: 120, Mobile: 180 },
  { date: "Apr", Desktop: 200, Mobile: 170 },
  { date: "May", Desktop: 250, Mobile: 190 },
  { date: "Jun", Desktop: 220, Mobile: 210 },
  { date: "Jul", Desktop: 300, Mobile: 250 },
  { date: "Aug", Desktop: 350, Mobile: 280 },
  { date: "Sep", Desktop: 320, Mobile: 310 },
  { date: "Oct", Desktop: 400, Mobile: 340 },
  { date: "Nov", Desktop: 450, Mobile: 380 },
  { date: "Dec", Desktop: 500, Mobile: 420 },
];

export default function ComposedChartDoc() {
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
      prop: "series",
      type: "ComposedSeries[]",
      default: "[]",
      description: "Array mapping keys to 'line', 'bar', or 'area' representations.",
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
      prop: "customTooltip",
      type: "React.ReactElement | function",
      default: "undefined",
      description: "Custom component to render the tooltip.",
    },
    {
      prop: "barRadius",
      type: "number | [number, number, number, number]",
      default: "4",
      description: "Border radius for the bars in the chart.",
    },
    {
      prop: "layout",
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: "The layout of the chart.",
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-32">
      <DocHeader
        category="CHARTS"
        title="Composed Chart"
        badge="Component"
        description="A hybrid chart that unifies bars, lines, and areas within a single cohesive data visualization."
      />

      <section id="installation" className="scroll-mt-24 space-y-6">
        <InstallationTabs
          componentName="composed-chart"
          dependencies="recharts clsx tailwind-merge"
          manualCode={composedChartCode}
        />
      </section>

      <section id="anatomy" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          Anatomy
        </h2>
        <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
          <strong>Abstracted layer.</strong> Composed chart synchronizes multi-series geometries (bars, lines, areas) into an unified coordinate system:
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <CodeBlock
            language="tsx"
            code={`import { ComposedChart } from "@hudbird/ui";

export default function App() {
  return (
    <ComposedChart
      data={dummyData}
      index="date"
      series={[
        { category: "Desktop", type: "bar" },
        { category: "Mobile", type: "line" }
      ]}
    />
  );
}`}
          />
        </div>
      </section>

        <section id="stacked-bar-with-line" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Stacked Bar With Line
          </h2>
          <ComponentPreview>
            <Card className="w-full p-6">
              <ComposedChart
                data={dummyData}
                index="date"
                series={[
                  { category: "Desktop", type: "bar", stackId: "a" },
                  { category: "Mobile", type: "bar", stackId: "a" },
                  { category: "Desktop", type: "line" },
                ]}
              />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<ComposedChart
  data={dummyData}
  index="date"
  series={[
    { category: "Desktop", type: "bar", stackId: "a" },
    { category: "Mobile", type: "bar", stackId: "a" },
    { category: "Desktop", type: "line" }
  ]}
/>`}
          />
        </section>

        <section id="area-with-line" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Area with Line
          </h2>
          <ComponentPreview>
            <Card className="w-full p-6">
              <ComposedChart
                data={dummyData}
                index="date"
                series={[
                  { category: "Desktop", type: "area" },
                  { category: "Mobile", type: "line" },
                ]}
              />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<ComposedChart
  data={dummyData}
  index="date"
  series={[
    { category: "Desktop", type: "area" },
    { category: "Mobile", type: "line" }
  ]}
/>`}
          />
        </section>

        <section id="bar-with-area" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Bar With Area
          </h2>
          <ComponentPreview>
            <Card className="w-full p-6">
              <ComposedChart
                data={dummyData}
                index="date"
                series={[
                  { category: "Desktop", type: "bar" },
                  { category: "Mobile", type: "area" },
                ]}
              />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<ComposedChart
  data={dummyData}
  index="date"
  series={[
    { category: "Desktop", type: "bar" },
    { category: "Mobile", type: "area" }
  ]}
/>`}
          />
        </section>

        <section id="multi-type" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Multi-type</h2>
          <ComponentPreview>
            <Card className="w-full p-6">
              <ComposedChart
                data={dummyData}
                index="date"
                series={[
                  { category: "Desktop", type: "bar" },
                  { category: "Mobile", type: "area" },
                  { category: "Desktop", type: "line", color: "var(--color-warning-500, #eab308)" },
                ]}
              />
            </Card>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<ComposedChart
  data={dummyData}
  index="date"
  series={[
    { category: "Desktop", type: "bar" },
    { category: "Mobile", type: "area" },
    { category: "Desktop", type: "line", color: "var(--color-warning-500, #eab308)" }
  ]}
/>`}
          />
        </section>

      <section id="css-classes" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          CSS Classes
        </h2>
        <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
          <strong>Root container customization.</strong> The ComposedChart component applies standard Tailwind classes for height and width, and renders inside a standard wrapper that accepts a <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">className</code> prop:
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <CodeBlock
            code={`<ComposedChart
  className="h-[350px] w-full"
  data={dummyData}
  index="date"
  series={[
    { category: "Desktop", type: "bar" },
    { category: "Mobile", type: "line" }
  ]}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section id="advanced-customization" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          Advanced Customization
        </h2>
        <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
          <strong>SVG gradient injection.</strong> Inject custom SVG gradients via <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">children</code>, configure stroke styles, and render custom tooltips with avatars:
        </p>
        <ComponentPreview>
          <Card className="mx-auto w-full max-w-2xl p-4">
            <ComposedChart
              data={dummyData}
              index="date"
              series={[
                { category: "Desktop", type: "bar", color: "url(#custom-gradient-composed)" },
                { category: "Mobile", type: "line", color: "#facc15" },
              ]}
              customTooltip={(props: any) => {
                if (!props.active || !props.payload || props.payload.length === 0) return null;
                return (
                  <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-xl">
                    <img
                      src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                      alt="Avatar"
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-zinc-300">Total Visits</p>
                      {props.payload.map((item: any, i: number) => (
                        <div
                          key={i}
                          className="mt-1 flex items-center justify-between gap-4 text-sm"
                        >
                          <span style={{ color: item.color }}>{item.name}</span>
                          <span className="font-bold text-white">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }}
            >
              <defs>
                <linearGradient id="custom-gradient-composed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0.2} />
                </linearGradient>
              </defs>
            </ComposedChart>
          </Card>
        </ComponentPreview>
        <CodeBlock
          code={`<ComposedChart
  data={dummyData}
  index="date"
  series={[
    { category: "Desktop", type: "bar", color: "url(#custom-gradient-composed)" },
    { category: "Mobile", type: "line", color: "#facc15" }
  ]}
  customTooltip={(props: any) => {
    if (!props.active || !props.payload || props.payload.length === 0) return null;
    return (
      <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-xl">
        <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Avatar" className="h-10 w-10 rounded-full" />
        <div>
          <p className="text-sm font-medium text-zinc-300">Total Visits</p>
          {props.payload.map((item: any, i: number) => (
            <div key={i} className="flex items-center justify-between gap-4 text-sm mt-1">
              <span style={{ color: item.color }}>{item.name}</span>
              <span className="font-bold text-white">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }}
>
  <defs>
    <linearGradient id="custom-gradient-composed" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#818cf8" stopOpacity={0.2} />
    </linearGradient>
  </defs>
</ComposedChart>`}
        />
      </section>

      <section id="component-api" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          API Reference
        </h2>
        <ApiTable rows={apiRows} />
        <h3 className="font-outfit text-xl sm:text-2xl font-medium tracking-[-0.4px] text-zinc-900 dark:text-white pt-6">
          Recharts API Reference
        </h3>
        <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
          External documentation reference:{" "}
          <a
            href="https://recharts.github.io/en-US/api/ComposedChart/"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            https://recharts.github.io/en-US/api/ComposedChart/
          </a>
        </p>
      </section>
    </div>
  );
}
