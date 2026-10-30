import React from "react";
import chartTooltipCode from "../../../../packages/core/src/components/ChartTooltip/ChartTooltip.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import { ChartTooltip } from "@hudbird/ui/components/ChartTooltip";
import { DocHeader } from "../components/DocHeader";
import { TableOfContents } from "../components/TableOfContents";
import { ApiTable } from "../components/ApiTable";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";

export const chartTooltipTocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "indicators", title: "Indicators" },
  { id: "hide-label", title: "Hide Label" },
  { id: "hide-indicator", title: "Hide Indicator" },
  { id: "value-formatter", title: "Value Formatter" },
  { id: "anatomy", title: "Anatomy" },
  { id: "component-api", title: "Component API" },
];

export default function ChartTooltipDoc() {
  const apiRows = [
    {
      prop: "active",
      type: "boolean",
      default: "false",
      description: "Injected by Recharts. Indicates if tooltip is active.",
    },
    {
      prop: "payload",
      type: "any[]",
      default: "[]",
      description: "Injected by Recharts. The data payload of the hovered point.",
    },
    {
      prop: "label",
      type: "string | number",
      default: "undefined",
      description: "Injected by Recharts. The label of the hovered point.",
    },
    {
      prop: "indicator",
      type: '"dot" | "line" | "dashed"',
      default: '"dot"',
      description: "The style of the indicator color badge.",
    },
    {
      prop: "hideLabel",
      type: "boolean",
      default: "false",
      description: "Hides the main tooltip label when true.",
    },
    {
      prop: "hideIndicator",
      type: "boolean",
      default: "false",
      description: "Hides the color indicator when true.",
    },
    {
      prop: "valueFormatter",
      type: "(value: number) => string",
      default: "undefined",
      description:
        "A function to format the displayed values (e.g. adding currency or percentages).",
    },
    {
      prop: "className",
      type: "string",
      default: '""',
      description: "Additional CSS classes to apply to the tooltip container.",
    },
  ];

  // Dummy payload for static rendering
  const dummyPayload = [
    { name: "Revenue", value: 4000, color: "#3b82f6" },
    { name: "Expenses", value: 2400, color: "#ef4444" },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-32">
      <DocHeader
        category="CHARTS"
        title="Chart Tooltip"
        badge="Component"
        description="A composable React tooltip for chart data points with customizable indicators, labels, and value formatters."
      />

      <section id="installation" className="scroll-mt-24 space-y-6">
        <InstallationTabs
          componentName="chart-tooltip"
          dependencies="recharts clsx tailwind-merge"
          manualCode={chartTooltipCode}
        />
      </section>

      <section id="usage" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          Usage
        </h2>
          <ComponentPreview>
            <div className="flex w-full justify-center px-4 py-8">
              <ChartTooltip active={true} label="Jan" payload={dummyPayload} />
            </div>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartTooltip } from "@hudbird/ui/components/ChartTooltip";

export default function Usage() {
  const data = [
    { time: "Jan", revenue: 4000, expenses: 2400 },
    // ...
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <XAxis dataKey="time" hide />
        <Tooltip content={<ChartTooltip />} />
        <Area dataKey="revenue" fill="#3b82f6" stroke="#3b82f6" />
        <Area dataKey="expenses" fill="#ef4444" stroke="#ef4444" />
      </AreaChart>
    </ResponsiveContainer>
  );
}`}
          />
        </section>

        <section id="indicators" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Indicators</h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            You can customize the indicator style by passing the <code>indicator</code> prop.
            Options are <code>"dot"</code> (default), <code>"line"</code>, or <code>"dashed"</code>.
          </p>
          <ComponentPreview>
            <div className="flex w-full flex-col flex-wrap justify-center gap-6 px-4 py-8 md:flex-row">
              <ChartTooltip
                active={true}
                label="Jan (dot)"
                payload={dummyPayload}
                indicator="dot"
              />
              <ChartTooltip
                active={true}
                label="Jan (line)"
                payload={dummyPayload}
                indicator="line"
              />
              <ChartTooltip
                active={true}
                label="Jan (dashed)"
                payload={dummyPayload}
                indicator="dashed"
              />
            </div>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Tooltip content={<ChartTooltip indicator="line" />} />
<Tooltip content={<ChartTooltip indicator="dashed" />} />`}
          />
        </section>

        <section id="hide-label" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Hide Label</h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            Pass <code>hideLabel</code> to remove the main label (e.g. the X-axis value) from the
            tooltip header.
          </p>
          <ComponentPreview>
            <div className="flex w-full justify-center px-4 py-8">
              <ChartTooltip active={true} label="Jan" payload={dummyPayload} hideLabel />
            </div>
          </ComponentPreview>
          <CodeBlock language="tsx" code={`<Tooltip content={<ChartTooltip hideLabel />} />`} />
        </section>

        <section id="hide-indicator" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Hide Indicator
          </h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            Pass <code>hideIndicator</code> to remove the color badge next to the item name.
          </p>
          <ComponentPreview>
            <div className="flex w-full justify-center px-4 py-8">
              <ChartTooltip active={true} label="Jan" payload={dummyPayload} hideIndicator />
            </div>
          </ComponentPreview>
          <CodeBlock language="tsx" code={`<Tooltip content={<ChartTooltip hideIndicator />} />`} />
        </section>

        <section id="value-formatter" className="mb-12 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Value Formatter
          </h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            Use <code>valueFormatter</code> to format numeric values (e.g., as currency or adding
            units).
          </p>
          <ComponentPreview>
            <div className="flex w-full justify-center px-4 py-8">
              <ChartTooltip
                active={true}
                label="Jan"
                payload={dummyPayload}
                valueFormatter={(val) => "$" + val.toLocaleString()}
              />
            </div>
          </ComponentPreview>
          <CodeBlock
            language="tsx"
            code={`<Tooltip 
  content={<ChartTooltip valueFormatter={(val) => "$" + val.toLocaleString()} />} 
/>`}
          />
        </section>

      <section id="anatomy" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          Anatomy
        </h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <CodeBlock
            language="tsx"
            code={`import { Tooltip } from "recharts";
import { ChartTooltip } from "@hudbird/ui/components/ChartTooltip";

<Tooltip content={<ChartTooltip {...props} />} />`}
          />
        </div>
      </section>

      <section id="component-api" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          Component API
        </h2>
        <ApiTable rows={apiRows} />
        <h3 className="font-outfit text-xl sm:text-2xl font-medium tracking-[-0.4px] text-zinc-900 dark:text-white pt-6">
          API Reference
        </h3>
        <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
          External documentation reference:{" "}
          <a
            href="https://recharts.org/en-US/api/Tooltip"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            https://recharts.org/en-US/api/Tooltip
          </a>
        </p>
      </section>
    </div>
  );
}
