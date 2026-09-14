import React from "react";
import { useThemeEditor } from "./ThemeEditorContext";
import { typographyPresets } from "../../lib/themes";
import { Select, SelectItem } from "@hudbird/ui/components/Select/Select";

export const FontPicker = () => {
  const { activeFontSans, setActiveFontSans, activeFontHeading, setActiveFontHeading } =
    useThemeEditor();

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-foreground text-xs font-semibold tracking-wider uppercase">Typography</h4>

      <div className="space-y-2">
        <label className="text-muted-foreground text-xs">Heading Font</label>
        <Select value={activeFontHeading} onValueChange={setActiveFontHeading}>
          {typographyPresets.heading.map((font) => (
            <SelectItem key={font} value={font}>
              {font}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-muted-foreground text-xs">Body Font</label>
        <Select value={activeFontSans} onValueChange={setActiveFontSans}>
          {typographyPresets.sans.map((font) => (
            <SelectItem key={font} value={font}>
              {font}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
