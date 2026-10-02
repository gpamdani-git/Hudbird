"use client";
import * as React from "react";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { cn } from "@/lib/cn";
import { ChartTooltip } from "../ChartTooltip";
import { motion } from "framer-motion";

export interface RadarChartProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd" | "ref"
> {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showGridLines?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  gridType?: "polygon" | "circle";
  showRadiusAxis?: boolean;
  customTooltip?: React.ReactElement | ((props: any) => React.ReactNode);
  fillOpacity?: number;
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

const RadarChart = React.forwardRef<HTMLDivElement, RadarChartProps>(
  (
    {
      data,
      index,
      categories,
      colors = defaultColors,
      valueFormatter = (value: number) => value.toString(),
      showGridLines = true,
      showLegend = true,
      showTooltip = true,
      gridType = "polygon",
      showRadiusAxis = false,
      customTooltip,
      fillOpacity = 0.5,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn("h-64 w-full sm:h-72", className)}
        {...props}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart data={data} outerRadius="70%">
            {showGridLines && (
              <PolarGrid gridType={gridType} className="stroke-zinc-200 dark:stroke-zinc-800" />
            )}
            <PolarAngleAxis
              dataKey={index}
              tick={{ fill: "currentColor", fontSize: 12 }}
              className="text-zinc-500 dark:text-zinc-400"
            />
            {showRadiusAxis && (
              <PolarRadiusAxis
                tickFormatter={valueFormatter}
                tick={{ fill: "currentColor", fontSize: 12 }}
                className="text-zinc-500 dark:text-zinc-400"
              />
            )}

            {showTooltip && (
              <Tooltip
                content={
                  customTooltip ? (
                    typeof customTooltip === "function" ? (
                      (customTooltip as any)
                    ) : (
                      React.cloneElement(
                        customTooltip as React.ReactElement,
                        {
                          valueFormatter,
                        } as any
                      )
                    )
                  ) : (
                    <ChartTooltip valueFormatter={valueFormatter} />
                  )
                }
              />
            )}

            {showLegend && (
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{value}</span>
                )}
              />
            )}

            {categories.map((category, idx) => {
              const color = colors[idx % colors.length];
              return (
                <Radar
                  key={category}
                  name={category}
                  dataKey={category}
                  stroke={color}
                  fill={color}
                  fillOpacity={fillOpacity}
                  isAnimationActive={false}
                  activeDot={(props: any) => {
                    const { cx, cy } = props;
                    if (cx === undefined || cy === undefined || isNaN(cx) || isNaN(cy)) return null;
                    return <circle cx={cx} cy={cy} r={5} fill={color} stroke="none" />;
                  }}
                />
              );
            })}
            {children}
          </RechartsRadarChart>
        </ResponsiveContainer>
      </motion.div>
    );
  }
);
RadarChart.displayName = "RadarChart";

export { RadarChart };
