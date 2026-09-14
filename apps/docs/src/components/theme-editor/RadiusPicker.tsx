import React from "react";
import { useThemeEditor } from "./ThemeEditorContext";
import { cn } from "@hudbird/ui/utils/cn";

export const RadiusPicker = () => {
  const { activeRadius, setActiveRadius } = useThemeEditor();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        Border Radius
      </label>
      <div className="grid grid-cols-4 gap-2">
        {[
          { value: 0, label: "Sharp" },
          { value: 0.25, label: "Subtle" },
          { value: 0.5, label: "Round" },
          { value: 1.0, label: "Full" },
        ].map((r) => {
          const isActive = activeRadius === r.value;
          return (
            <button
              key={r.value}
              title={`${r.value}rem`}
              onClick={() => setActiveRadius(r.value)}
              className={cn(
                "rounded-lg border py-2 text-xs font-semibold transition-all",
                isActive
                  ? "border-primary bg-primary/10 text-primary ring-primary/20 ring-1"
                  : "border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground shadow-sm"
              )}
            >
              {r.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
