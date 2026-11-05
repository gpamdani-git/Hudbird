import * as React from "react";
import { Button, Grid, Input, Select, SelectItem } from "@hudbird/ui";
import type { BrandProfile, LandingPageConfig } from "@hudbird/schemas";
import { pilotBrands } from "@hudbird/marketing";
import { typographyPresets } from "../../lib/themes";

export function LandingBrandControls({
  brand,
  onChange,
  themeMode,
  onThemeChange,
}: {
  brand: BrandProfile;
  onChange: (brand: BrandProfile) => void;
  themeMode: LandingPageConfig["themeMode"];
  onThemeChange: (mode: LandingPageConfig["themeMode"]) => void;
}) {
  const [color, setColor] = React.useState(brand.primary);
  React.useEffect(() => setColor(brand.primary), [brand.primary]);
  const fonts = [...new Set([...typographyPresets.sans, ...typographyPresets.heading])];
  return (
    <div className="space-y-5">
      <div role="group" aria-label="Brand presets" className="flex flex-wrap gap-2">
        {pilotBrands.map((preset) => (
          <Button
            key={preset.id}
            size="sm"
            variant={brand.id === preset.id ? "solid" : "outline"}
            aria-pressed={brand.id === preset.id}
            onClick={() => onChange({ ...preset })}
          >
            {preset.name}
          </Button>
        ))}
      </div>
      <Grid cols={2} gap="md">
        <Input
          label="Brand name"
          value={brand.name}
          onChange={(event) => onChange({ ...brand, name: event.target.value })}
        />
        <Input
          label="Primary color"
          value={color}
          isInvalid={!/^#[\da-f]{6}$/i.test(color)}
          errorMessage="Use a six-digit hex color."
          onChange={(event) => {
            setColor(event.target.value);
            if (/^#[\da-f]{6}$/i.test(event.target.value))
              onChange({ ...brand, primary: event.target.value });
          }}
        />
        <Select
          label="Brand font"
          value={brand.googleFont ?? "preset"}
          onValueChange={(font) =>
            onChange({
              ...brand,
              googleFont: font === "preset" ? undefined : font,
              fontFamily:
                font === "preset"
                  ? (pilotBrands.find((preset) => preset.id === brand.id) ?? pilotBrands[0])
                      .fontFamily
                  : `"${font}", ${["Lora", "Playfair Display"].includes(font) ? "Georgia, serif" : "system-ui, sans-serif"}`,
            })
          }
        >
          <SelectItem value="preset">Brand preset font</SelectItem>
          {fonts.map((font) => (
            <SelectItem key={font} value={font}>
              {font}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Corner style"
          value={brand.radius}
          onValueChange={(radius) =>
            onChange({ ...brand, radius: radius as BrandProfile["radius"] })
          }
        >
          {["square", "soft", "round"].map((value) => (
            <SelectItem key={value} value={value}>
              {value[0].toUpperCase() + value.slice(1)}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Spacing"
          value={brand.density}
          onValueChange={(density) =>
            onChange({ ...brand, density: density as BrandProfile["density"] })
          }
        >
          <SelectItem value="comfortable">Comfortable</SelectItem>
          <SelectItem value="compact">Compact</SelectItem>
        </Select>
        <Input
          label="Logo URL or local path"
          value={brand.logo?.src ?? ""}
          onChange={(event) =>
            onChange({
              ...brand,
              logo: event.target.value
                ? { src: event.target.value, alt: `${brand.name} logo` }
                : undefined,
            })
          }
        />
        <Input
          label="Reference URL"
          value={brand.referenceUrl ?? ""}
          onChange={(event) => onChange({ ...brand, referenceUrl: event.target.value })}
          description="Saved with your brief. No automatic website import."
        />
      </Grid>
      <div role="group" aria-label="Preview theme" className="flex flex-wrap gap-2">
        {(["auto", "light", "dark"] as const).map((mode) => (
          <Button
            key={mode}
            size="sm"
            variant={themeMode === mode ? "solid" : "outline"}
            aria-pressed={themeMode === mode}
            onClick={() => onThemeChange(mode)}
          >
            {mode === "auto" ? "Follow website" : `${mode === "light" ? "Light" : "Dark"} preview`}
          </Button>
        ))}
      </div>
    </div>
  );
}
