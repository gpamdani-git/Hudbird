"use client";
import * as React from "react";
import {
  RadialBarChart as RechartsRadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/cn";
import { ChartTooltip } from "../ChartTooltip";
import { motion } from "framer-motion";

export interface RadialChartProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd" | "ref"
> {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  showTooltip?: boolean;
  innerRadius?: string | number;
  outerRadius?: string | number;
  startAngle?: number;
  endAngle?: number;
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

const RadialChart = React.forwardRef<HTMLDivElement, RadialChartProps>(
  (
    {
      data,
      index,
      categories,
      colors = defaultColors,
      valueFormatter = (value: number) => value.toString(),
      showLegend = true,
      showTooltip = true,
      innerRadius = "10%",
      outerRadius = "100%",
      startAngle = 90,
      endAngle = -270,
      customTooltip,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // Inject fill color into data if not present (RadialBar uses the item's fill property natively)
    const processedData = data.map((item, idx) => ({
      ...item,
      fill: item.fill || colors[idx % colors.length],
    }));

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
          <RechartsRadialBarChart
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            data={processedData}
            barSize={16}
          >
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
                wrapperStyle={{ paddingTop: "12px" }}
                formatter={(value, entry, idx) => {
                  const item = processedData[idx];
                  const label = item ? item[index] || item.name : value;
                  return (
                    <span className="ml-1.5 inline-block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {label}
                    </span>
                  );
                }}
              />
            )}

            {categories.map((category) => (
              <RadialBar
                key={category}
                background={{ className: "fill-zinc-100 dark:fill-zinc-800" }}
                dataKey={category}
                cornerRadius={9999}
                isAnimationActive={false}
              />
            ))}
            {children}
          </RechartsRadialBarChart>
        </ResponsiveContainer>
      </motion.div>
    );
  }
);
RadialChart.displayName = "RadialChart";

export { RadialChart };
