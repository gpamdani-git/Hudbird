"use client";

import React, { useMemo } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { ChartTooltip } from "../ChartTooltip/ChartTooltip";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";

export interface PieChartProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd" | "ref"
> {
  /**
   * Array of objects containing the data to render.
   */
  data: any[];
  /**
   * The key in the data objects to map to the values.
   */
  category?: string;
  /**
   * Array of keys for rendering nested donut charts.
   */
  categories?: string[];
  /**
   * The key in the data objects to map to the name/label.
   */
  index: string;
  /**
   * Array of colors to use for the pie slices.
   */
  colors?: string[];
  /**
   * Variant of the pie chart. "pie" is solid, "donut" has a hole.
   */
  variant?: "pie" | "donut";
  /**
   * Whether to display the tooltip on hover.
   */
  showTooltip?: boolean;
  /**
   * Whether to display the chart legend.
   */
  showLegend?: boolean;
  /**
   * Custom component to render the tooltip.
   */
  customTooltip?: React.ReactElement | ((props: any) => React.ReactNode);
  children?: React.ReactNode;
  /**
   * Function to format the values on the Tooltip.
   */
  valueFormatter?: (value: number) => string;
  /**
   * Custom content to render in the center of the donut chart.
   */
  donutContent?: React.ReactNode;
  /**
   * Inner radius of the pie. If not provided, it is automatically calculated for "donut" variant.
   */
  innerRadius?: number | string;
  /**
   * Outer radius of the pie.
   */
  outerRadius?: number | string;
  /**
   * Whether to display labels on the pie slices.
   */
  showLabel?: boolean;
}

const defaultColors = [
  "var(--color-primary-500, #3b82f6)",
  "var(--color-success-500, #22c55e)",
  "var(--color-warning-500, #eab308)",
  "var(--color-danger-500, #ef4444)",
  "var(--color-secondary-500, #a855f7)",
  "var(--color-info-500, #0ea5e9)",
];

export const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      data = [],
      category,
      categories,
      index,
      colors = defaultColors,
      variant = "pie",
      showTooltip = true,
      showLegend = true,
      customTooltip,
      children,
      valueFormatter = (value: number) => value.toString(),
      donutContent,
      innerRadius,
      outerRadius,
      showLabel = false,
      className,
      ...props
    },
    ref
  ) => {
    // Determine the active categories array
    const activeCategories = useMemo(() => {
      if (categories && categories.length > 0) return categories;
      if (category) return [category];
      return [];
    }, [category, categories]);

    // Handle radii for nested charts or single charts
    const getRadii = (idx: number, total: number) => {
      const isDonut = variant === "donut" || total > 1; // Nested pies force donut behavior implicitly

      if (total === 1) {
        return {
          innerRadius: innerRadius ?? (isDonut ? "60%" : 0),
          outerRadius: outerRadius ?? "80%",
        };
      }

      // Logic for nested rings
      // Divide the available radius equally among the rings
      const availableRadius = 80; // use max 80%
      const step = availableRadius / total;
      const ringOuter = step * (idx + 1);
      const ringInner = isDonut ? step * idx + (idx === 0 ? 30 : 0) : step * idx; // Adjust inner for the first ring if donut

      return {
        innerRadius: `${ringInner}%`,
        outerRadius: `${ringOuter}%`,
      };
    };

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
          <RechartsPieChart>
            {showTooltip && (
              <Tooltip
                content={
                  customTooltip
                    ? (customTooltip as any)
                    : (props) => (
                        <ChartTooltip {...(props as any)} valueFormatter={valueFormatter} />
                      )
                }
                cursor={{ fill: "var(--color-zinc-100, #f4f4f5)", opacity: 0.2 }}
              />
            )}

            {showLegend && (
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {value}
                  </span>
                )}
              />
            )}

            {activeCategories.map((cat, idx) => {
              const { innerRadius: rInner, outerRadius: rOuter } = getRadii(
                idx,
                activeCategories.length
              );

              return (
                <Pie
                  key={cat}
                  data={data}
                  dataKey={cat}
                  nameKey={index}
                  cx="50%"
                  cy="50%"
                  innerRadius={rInner}
                  outerRadius={rOuter}
                  stroke="none"
                  label={
                    showLabel
                      ? {
                          fill: "var(--color-zinc-700, #3f3f46)",
                          fontSize: 12,
                          fontWeight: 500,
                        }
                      : false
                  }
                >
                  {data.map((entry, dataIdx) => {
                    // For nested pies, we might want to adjust colors to avoid them looking exactly the same.
                    // If total > 1, we offset the color index or modify opacity (not natively supported by simple Cell fill without parsing).
                    // For simplicity, we just loop through the provided colors array.
                    const colorOffset = idx * 2; // Arbitrary shift for outer rings
                    const fill = colors[(dataIdx + colorOffset) % colors.length];
                    return <Cell key={`cell-${dataIdx}`} fill={fill} />;
                  })}
                  {donutContent && idx === 0 && variant === "donut" && (
                    <Label
                      content={(props: any) => {
                        const { viewBox } = props;
                        const cxVal = viewBox?.cx ?? props.cx ?? "50%";
                        const cyVal = viewBox?.cy ?? props.cy ?? "50%";
                        return (
                          <foreignObject
                            x={cxVal}
                            y={cyVal}
                            width={1}
                            height={1}
                            style={{ pointerEvents: "none", overflow: "visible" }}
                          >
                            <div
                              className="pointer-events-none flex items-center justify-center"
                              style={{ width: 0, height: 0, overflow: "visible" }}
                            >
                              <div
                                style={{ width: "max-content", height: "max-content" }}
                                className="flex flex-col items-center justify-center"
                              >
                                {donutContent}
                              </div>
                            </div>
                          </foreignObject>
                        );
                      }}
                      position="center"
                    />
                  )}
                </Pie>
              );
            })}
            {children}
          </RechartsPieChart>
        </ResponsiveContainer>
      </motion.div>
    );
  }
);

PieChart.displayName = "PieChart";
