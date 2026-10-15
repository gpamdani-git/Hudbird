import React from "react";
import { useThemeEditor } from "./ThemeEditorContext";
import { hexToOklch, oklchToHex, parseOklch } from "../../lib/colorUtils";
import { cn } from "@hudbird/ui";

export const PrimaryColorPicker = () => {
  const { primaryColor, setPrimaryColor } = useThemeEditor();

  const { l, c, h } = parseOklch(primaryColor);
  const hex = oklchToHex(l, c, h);

  const presets = [
    { name: "Zinc", color: "0.5 0 0" },
    { name: "Red", color: "0.6 0.2 25" },
    { name: "Blue", color: "0.6 0.2 260" },
    { name: "Green", color: "0.6 0.15 150" },
    { name: "Violet", color: "0.55 0.2 290" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        Primary Color
      </label>
      <div className="grid grid-cols-3 gap-2">
        {presets.map((p) => {
          const isActive = primaryColor === p.color;
          return (
            <button
              key={p.name}
              onClick={() => setPrimaryColor(p.color)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-lg border px-2 py-2 text-xs font-medium transition-all",
                isActive
                  ? "border-primary bg-primary/10 text-primary ring-primary/20 ring-1"
                  : "border-border bg-card hover:bg-muted"
              )}
            >
              <div
                className="border-border/50 h-4 w-4 rounded-full border"
                style={{
                  backgroundColor: oklchToHex(
                    ...(Object.values(parseOklch(p.color)) as [number, number, number])
                  ),
                }}
              />
              {p.name}
            </button>
          );
        })}

        {/* Custom Color Input */}
        <div
          className={cn(
            "group relative flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border px-2 py-2 text-xs font-medium transition-all",
            !presets.some((p) => p.color === primaryColor)
              ? "border-primary bg-primary/10 text-primary ring-primary/20 ring-1"
              : "border-border bg-card hover:bg-muted"
          )}
        >
          <input
            type="color"
            value={hex}
            onChange={(e) => setPrimaryColor(hexToOklch(e.target.value))}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <div
            className="border-border/50 pointer-events-none h-4 w-4 rounded-full border shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]"
            style={{ backgroundColor: hex }}
          />
          <span className="pointer-events-none">Custom</span>
        </div>
      </div>
    </div>
  );
};
