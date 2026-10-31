import * as React from "react";
import { cn } from "../../utils/cn";

export interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
  indicator?: "dot" | "line" | "dashed";
  hideLabel?: boolean;
  hideIndicator?: boolean;
  valueFormatter?: (value: number) => string;
  className?: string;
}

export const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  (
    {
      active,
      payload,
      label,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      valueFormatter,
      className,
    },
    ref
  ) => {
    if (active && payload && payload.length) {
      return (
        <div
          ref={ref}
          className={cn(
            "min-w-[10rem] rounded-xl border border-zinc-200/80 bg-white/90 p-3 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-[#2E2F33] dark:bg-[#161618]/90 dark:shadow-black/40",
            className
          )}
        >
          {!hideLabel && (
            <p className="font-outfit mb-2 text-xs font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {label}
            </p>
          )}
          <div className="space-y-1.5">
            {payload.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {!hideIndicator && (
                    <div
                      className={cn(
                        "shrink-0",
                        indicator === "dot" && "h-2 w-2 rounded-full",
                        indicator === "line" && "h-3 w-1 rounded-sm",
                        indicator === "dashed" && "h-0 w-2 rounded-none border-t-2 border-dashed"
                      )}
                      style={{
                        backgroundColor: indicator !== "dashed" ? item.color : "transparent",
                        borderColor: item.color,
                      }}
                    />
                  )}
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">{item.name}</span>
                </div>
                <span className="font-outfit text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {valueFormatter ? valueFormatter(item.value) : item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  }
);

ChartTooltip.displayName = "ChartTooltip";
