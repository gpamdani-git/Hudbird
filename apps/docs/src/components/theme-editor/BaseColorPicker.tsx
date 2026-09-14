import React from "react";
import { useThemeEditor } from "./ThemeEditorContext";
import { baseColors } from "../../lib/themes";
import { cn } from "@hudbird/ui/utils/cn";

export const BaseColorPicker = () => {
  const { activeBase, setActiveBase } = useThemeEditor();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        Base Style
      </label>
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(baseColors) as Array<keyof typeof baseColors>).map((key) => {
          const isActive = activeBase === key;
          return (
            <button
              key={key}
              onClick={() => setActiveBase(key)}
              className={cn(
                "rounded-lg border py-2.5 text-xs font-semibold shadow-sm transition-all",
                isActive
                  ? "border-zinc-950 bg-zinc-950 text-white shadow-sm dark:border-white dark:bg-white dark:text-zinc-950"
                  : "border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {baseColors[key].name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
