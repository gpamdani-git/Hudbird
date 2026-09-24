"use client";
import * as React from "react";
import {
  Line,
  LineChart as RechartsLineChart,
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

export interface LineChartProps extends Omit<
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
  curveType?: "linear" | "natural" | "monotone" | "step";
  connectNulls?: boolean;
  strokeWidth?: number;
  strokeDasharray?: string | string[];
  showDots?: boolean;
  customDot?: React.ReactElement | ((props: any) => React.ReactNode);
  variant?: "default" | "sparkline";
  customTooltip?: React.ReactElement | ((props: any) => React.ReactNode);
  children?: React.ReactNode;
}

const defaultColors = [
  "var(--color-primary-500, #3b82f6)",
  "var(--color-secondary-500, #a855f7)",
  "var(--color-success-500, #22c55e)",
  "var(--color-warning-500, #eab308)",
  "var(--color-danger-500, #ef4444)",
  "var(--color-info-500, #0ea5e9)",
];

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
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
      curveType = "monotone",
      connectNulls = false,
      strokeWidth = 2,
      strokeDasharray,
      showDots = true,
      customDot,
      variant = "default",
      customTooltip,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isSparkline = variant === "sparkline";
    const heightClass = isSparkline ? "h-[120px]" : "h-[350px]";

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
          <RechartsLineChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              left: 0,
              bottom: 0,
            }}
          >
            {showGridLines && !isSparkline && (
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="currentColor"
                className="text-zinc-200 dark:text-zinc-800"
              />
            )}

            {showXAxis && !isSparkline && (
              <XAxis
                dataKey={index}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickMargin={12}
                className="text-zinc-500 dark:text-zinc-400"
              />
            )}

            {showYAxis && !isSparkline && (
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={valueFormatter}
                tickMargin={12}
                className="text-zinc-500 dark:text-zinc-400"
              />
            )}

            {showTooltip && (
              <Tooltip
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
                wrapperStyle={{ fontSize: "14px", paddingTop: "20px" }}
              />
            )}

            {categories.map((category, i) => (
              <Line
                key={category}
                type={curveType}
                dataKey={category}
                stroke={colors[i % colors.length]}
                strokeWidth={strokeWidth}
                strokeDasharray={
                  Array.isArray(strokeDasharray)
                    ? strokeDasharray[i % strokeDasharray.length]
                    : strokeDasharray
                }
                connectNulls={connectNulls}
                dot={
                  customDot
                    ? (customDot as any)
                    : showDots
                      ? (props: any) => {
                          const { cx, cy } = props;
                          if (cx === undefined || cy === undefined || isNaN(cx) || isNaN(cy))
                            return null;
                          return (
                            <circle
                              cx={cx}
                              cy={cy}
                              r={4}
                              fill={colors[i % colors.length]}
                              stroke="none"
                            />
                          );
                        }
                      : false
                }
                activeDot={(props: any) => {
                  const { cx, cy, stroke, fill, dataKey } = props;
                  if (cx === undefined || cy === undefined || isNaN(cx) || isNaN(cy)) return null;
                  return (
                    <circle cx={cx} cy={cy} r={6} fill={colors[i % colors.length]} stroke="none" />
                  );
                }}
              />
            ))}
            {children}
          </RechartsLineChart>
        </ResponsiveContainer>
      </motion.div>
    );
  }
);

LineChart.displayName = "LineChart";

export { LineChart };
