"use client";
import * as React from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { cn } from "../../utils/cn";
import { ChartTooltip } from "../ChartTooltip";
import { motion } from "framer-motion";

export interface BarChartProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd" | "ref"
> {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGridLines?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  type?: "default" | "stacked" | "percent";
  variant?: "default" | "sparkline";
  layout?: "horizontal" | "vertical";
  customTooltip?: React.ReactElement | ((props: any) => React.ReactNode);
  barRadius?: number | [number, number, number, number];
  children?: React.ReactNode;
}

const defaultColors = [
  "var(--color-primary-500, #4F46E5)",
  "var(--color-cyan-500, #06B6D4)",
  "var(--color-success-500, #10B981)",
  "var(--color-warning-500, #F59E0B)",
  "var(--color-danger-500, #F43F5E)",
  "var(--color-secondary-500, #8B5CF6)",
];

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      data,
      index,
      categories,
      colors = defaultColors,
      valueFormatter = (value: number) => value.toString(),
      showXAxis = true,
      showYAxis = true,
      showGridLines = true,
      showLegend = true,
      showTooltip = true,
      type = "default",
      variant = "default",
      layout = "horizontal",
      customTooltip,
      barRadius = 6,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isSparkline = variant === "sparkline";
    const heightClass = isSparkline ? "h-[120px]" : "h-[350px]";
    const isVertical = layout === "vertical";

    return (
      <motion.div
        ref={ref}
        className={cn("w-full", heightClass, className)}
        {...props}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            layout={layout}
            margin={{
              top: 24,
              right: 24,
              left: 24,
              bottom: showLegend && !isSparkline ? 80 : 40,
            }}
          >
            {showGridLines && !isSparkline && (
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={isVertical}
                horizontal={!isVertical}
                stroke="currentColor"
                className="text-zinc-200/80 dark:text-white/[0.08]"
              />
            )}

            {showXAxis && !isSparkline && (
              <XAxis
                {...(!isVertical ? { dataKey: index, type: "category" } : { type: "number" })}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickMargin={16}
                tickFormatter={isVertical ? valueFormatter : undefined}
                className="text-zinc-500 dark:text-zinc-400"
              />
            )}

            {showYAxis && !isSparkline && (
              <YAxis
                {...(isVertical ? { dataKey: index, type: "category", width: 60 } : {})}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickMargin={16}
                tickFormatter={isVertical ? undefined : valueFormatter}
                className="text-zinc-500 dark:text-zinc-400"
              />
            )}

            {showTooltip && (
              <Tooltip
                cursor={{
                  fill: "currentColor",
                  className: "text-zinc-200/40 dark:text-white/[0.04]",
                }}
                content={
                  customTooltip ? customTooltip : <ChartTooltip valueFormatter={valueFormatter} />
                }
              />
            )}

            {showLegend && !isSparkline && (
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: "13px", paddingTop: "20px" }}
                formatter={(value) => (
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    {value}
                  </span>
                )}
              />
            )}

            {categories.map((category, i) => (
              <Bar
                key={category}
                dataKey={category}
                fill={colors[i % colors.length]}
                radius={
                  type === "stacked"
                    ? undefined
                    : typeof barRadius === "number"
                      ? isVertical
                        ? [0, barRadius, barRadius, 0]
                        : [barRadius, barRadius, 0, 0]
                      : barRadius
                }
                stackId={type === "stacked" || type === "percent" ? "1" : undefined}
              />
            ))}
            {children}
          </RechartsBarChart>
        </ResponsiveContainer>
      </motion.div>
    );
  }
);

BarChart.displayName = "BarChart";

export { BarChart };
