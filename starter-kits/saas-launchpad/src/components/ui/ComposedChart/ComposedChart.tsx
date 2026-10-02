"use client";
import * as React from "react";
import {
  Area,
  Bar,
  Line,
  ComposedChart as RechartsComposedChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { cn } from "@/lib/cn";
import { ChartTooltip } from "../ChartTooltip";
import { motion } from "framer-motion";

export type ComposedSeries = {
  category: string;
  type: "bar" | "line" | "area";
  color?: string;
  yAxisId?: string;
  stackId?: string;
};

export interface ComposedChartProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd" | "ref"
> {
  data: any[];
  index: string;
  series: ComposedSeries[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGridLines?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  customTooltip?: React.ReactElement | ((props: any) => React.ReactNode);
  children?: React.ReactNode;
  barRadius?: number | [number, number, number, number];
  layout?: "horizontal" | "vertical";
}

const defaultColors = [
  "var(--color-primary-500, #3b82f6)",
  "var(--color-secondary-500, #a855f7)",
  "var(--color-success-500, #22c55e)",
  "var(--color-warning-500, #eab308)",
  "var(--color-danger-500, #ef4444)",
];

const ComposedChart = React.forwardRef<HTMLDivElement, ComposedChartProps>(
  (
    {
      data = [],
      index,
      series = [],
      colors = defaultColors,
      valueFormatter = (value: number) => value.toString(),
      showXAxis = true,
      showYAxis = true,
      showGridLines = true,
      showLegend = true,
      showTooltip = true,
      layout = "horizontal",
      customTooltip,
      children,
      barRadius = 4,
      className,
      ...props
    },
    ref
  ) => {
    const isVertical = layout === "vertical";

    return (
      <motion.div
        ref={ref}
        className={cn("h-64 w-full sm:h-80", className)}
        {...props}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsComposedChart
            data={data}
            layout={layout}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            {showGridLines && (
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={!isVertical}
                horizontal={isVertical || layout === "horizontal"}
                stroke="currentColor"
                className="text-zinc-200 dark:text-zinc-800"
              />
            )}

            {showXAxis && (
              <XAxis
                type={isVertical ? "number" : "category"}
                dataKey={isVertical ? undefined : index}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={isVertical ? valueFormatter : undefined}
                tickMargin={12}
                className="text-zinc-500 dark:text-zinc-400"
              />
            )}

            {showYAxis && (
              <YAxis
                type={isVertical ? "category" : "number"}
                dataKey={isVertical ? index : undefined}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={isVertical ? undefined : valueFormatter}
                tickMargin={12}
                className="text-zinc-500 dark:text-zinc-400"
              />
            )}

            {showTooltip && (
              <Tooltip
                cursor={{ fill: "currentColor", opacity: 0.05 }}
                content={
                  customTooltip ? customTooltip : <ChartTooltip valueFormatter={valueFormatter} />
                }
              />
            )}

            {showLegend && (
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "14px",
                }}
              />
            )}

            {series.map((item, i) => {
              const color = item.color || colors[i % colors.length];

              if (item.type === "area") {
                return (
                  <Area
                    key={`${item.category}-area-${i}`}
                    type="monotone"
                    dataKey={item.category}
                    name={item.category}
                    yAxisId={item.yAxisId}
                    stackId={item.stackId}
                    stroke={color}
                    fill={color}
                    fillOpacity={0.2}
                    strokeWidth={2}
                    activeDot={(props: any) => {
                      const { cx, cy, stroke, fill, dataKey } = props;
                      if (cx === undefined || cy === undefined || isNaN(cx) || isNaN(cy))
                        return null;
                      return <circle cx={cx} cy={cy} r={6} fill={stroke} stroke="none" />;
                    }}
                  />
                );
              }

              if (item.type === "bar") {
                return (
                  <Bar
                    key={`${item.category}-bar-${i}`}
                    dataKey={item.category}
                    name={item.category}
                    yAxisId={item.yAxisId}
                    stackId={item.stackId}
                    fill={color}
                    radius={
                      isVertical
                        ? ([0, barRadius, barRadius, 0] as any)
                        : ([barRadius, barRadius, 0, 0] as any)
                    }
                  />
                );
              }

              if (item.type === "line") {
                return (
                  <Line
                    key={`${item.category}-line-${i}`}
                    type="monotone"
                    dataKey={item.category}
                    name={item.category}
                    yAxisId={item.yAxisId}
                    stroke={color}
                    strokeWidth={2}
                    dot={false}
                    activeDot={(props: any) => {
                      const { cx, cy, stroke, fill, dataKey } = props;
                      if (cx === undefined || cy === undefined || isNaN(cx) || isNaN(cy))
                        return null;
                      return <circle cx={cx} cy={cy} r={6} fill={stroke} stroke="none" />;
                    }}
                  />
                );
              }

              return null;
            })}

            {children}
          </RechartsComposedChart>
        </ResponsiveContainer>
      </motion.div>
    );
  }
);

ComposedChart.displayName = "ComposedChart";

export { ComposedChart };
