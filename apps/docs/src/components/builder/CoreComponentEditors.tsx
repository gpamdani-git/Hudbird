import * as React from "react";
import { Button, Input, Select, SelectItem, Switch, Text, Textarea } from "@hudbird/ui";
import type { WebsiteProjectConfig } from "@hudbird/marketing";
import type {
  SectionBadgeSettings,
  SectionButtonSettings,
  SectionCardSettings,
  SectionGridSettings,
  SectionHeadingSettings,
  SectionMediaSettings,
  SectionTextSettings,
  WebsiteLinkTarget,
} from "@hudbird/schemas";
import { ArrowLeft, Grid2x2, RotateCcw } from "lucide-react";
import { LinkTargetPicker } from "./LinkTargetPicker";
import { MediaUploadField, type MediaPresetOption } from "./MediaUploadField";

export const CORE_DEFAULT_OPTION = "__default__";

export type SelectedCoreNode =
  | "section"
  | "heading"
  | "text"
  | "primary-button"
  | "secondary-button"
  | "media"
  | "card"
  | "badge"
  | "items"
  | "grid"
  | "links"
  | "brand";

function OptionSelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T | undefined;
  options: readonly { value: T; label: string }[];
  onChange: (next: T | undefined) => void;
}) {
  return (
    <div className="space-y-1.5">
      <span className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
        {label}
      </span>
      <Select
        aria-label={label}
        value={value ?? CORE_DEFAULT_OPTION}
        onValueChange={(next) => onChange(next === CORE_DEFAULT_OPTION ? undefined : (next as T))}
      >
        <SelectItem value={CORE_DEFAULT_OPTION}>Default (Theme)</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

function SwitchRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/70 px-3 py-2 dark:border-white/[0.08] dark:bg-white/[0.02]">
      <div className="min-w-0">
        <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">{label}</div>
        {hint && <div className="text-[11px] text-zinc-500 dark:text-zinc-400">{hint}</div>}
      </div>
      <Switch
        size="sm"
        aria-label={label}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
}

export function CoreDrilldownHeader({
  sectionTitle,
  componentLabel,
  onBackToSection,
  onReset,
}: {
  sectionTitle: string;
  componentLabel: string;
  onBackToSection: () => void;
  onReset?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-2.5 py-2 dark:border-white/[0.08] dark:bg-white/[0.03]">
      <div className="flex min-w-0 items-center gap-2">
        <Button
          type="button"
          variant="plain"
          size="sm"
          onClick={onBackToSection}
          startContent={<ArrowLeft className="h-3.5 w-3.5" />}
        >
          {sectionTitle}
        </Button>
        <span className="text-zinc-300 dark:text-zinc-600">/</span>
        <span className="truncate text-xs font-semibold text-zinc-900 dark:text-white">
          {componentLabel}
        </span>
      </div>
      {onReset && (
        <Button
          type="button"
          variant="plain"
          size="sm"
          onClick={onReset}
          startContent={<RotateCcw className="h-3 w-3" />}
        >
          Reset
        </Button>
      )}
    </div>
  );
}

const BUTTON_VARIANTS: readonly {
  value: NonNullable<SectionButtonSettings["variant"]>;
  label: string;
}[] = [
  { value: "solid", label: "Solid" },
  { value: "bordered", label: "Bordered" },
  { value: "outline", label: "Outline" },
  { value: "soft", label: "Soft" },
  { value: "flat", label: "Flat" },
  { value: "ghost", label: "Ghost" },
];

const BUTTON_COLORS: readonly {
  value: NonNullable<SectionButtonSettings["color"]>;
  label: string;
}[] = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "dark", label: "Dark" },
  { value: "zinc", label: "Zinc" },
  { value: "success", label: "Success" },
  { value: "warning", label: "Warning" },
  { value: "danger", label: "Danger" },
];

const BUTTON_SIZES: readonly {
  value: NonNullable<SectionButtonSettings["size"]>;
  label: string;
}[] = [
  { value: "sm", label: "Small (sm)" },
  { value: "md", label: "Medium (md)" },
  { value: "lg", label: "Large (lg)" },
];

const RADIUS_OPTIONS: readonly {
  value: NonNullable<SectionButtonSettings["radius"]>;
  label: string;
}[] = [
  { value: "none", label: "Sharp (none)" },
  { value: "md", label: "Medium (md)" },
  { value: "lg", label: "Large (lg)" },
  { value: "full", label: "Pill (full)" },
];

export function ButtonCoreEditor({
  title = "Button",
  labelValue,
  onLabelChange,
  targetValue,
  project,
  onTargetChange,
  onClearTarget,
  onJumpToPage,
  settings,
  onSettingsChange,
}: {
  title?: string;
  labelValue: string;
  onLabelChange: (nextLabel: string) => void;
  targetValue: WebsiteLinkTarget | undefined;
  project: WebsiteProjectConfig;
  onTargetChange: (next: WebsiteLinkTarget) => void;
  onClearTarget?: () => void;
  onJumpToPage?: (pageId: string, sectionAnchor?: string) => void;
  settings: SectionButtonSettings | undefined;
  onSettingsChange: (next: SectionButtonSettings | undefined) => void;
}) {
  const hasOverrides = Boolean(
    settings && (settings.variant || settings.color || settings.size || settings.radius)
  );

  const patchStyle = (patch: Partial<SectionButtonSettings>) => {
    const merged: SectionButtonSettings = { ...settings, ...patch };
    const cleaned: SectionButtonSettings = {};
    if (merged.variant) cleaned.variant = merged.variant;
    if (merged.color) cleaned.color = merged.color;
    if (merged.size) cleaned.size = merged.size;
    if (merged.radius) cleaned.radius = merged.radius;
    onSettingsChange(Object.keys(cleaned).length > 0 ? cleaned : undefined);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{title}</span>
        {hasOverrides && (
          <Button
            type="button"
            variant="plain"
            size="sm"
            onClick={() => onSettingsChange(undefined)}
            startContent={<RotateCcw className="h-3 w-3" />}
          >
            Reset style
          </Button>
        )}
      </div>

      <Input
        label="Button label"
        placeholder="Get started"
        value={labelValue}
        onChange={(e) => onLabelChange(e.target.value)}
      />

      <LinkTargetPicker
        label="Destination"
        value={targetValue}
        project={project}
        onChange={onTargetChange}
        onClear={onClearTarget}
        onJumpToPage={onJumpToPage}
      />

      <div className="space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
        <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
          Core @hudbird/ui Button props
        </Text>
        <div className="grid grid-cols-2 gap-2.5">
          <OptionSelectField
            label="Variant"
            value={settings?.variant}
            options={BUTTON_VARIANTS}
            onChange={(variant) => patchStyle({ variant })}
          />
          <OptionSelectField
            label="Color"
            value={settings?.color}
            options={BUTTON_COLORS}
            onChange={(color) => patchStyle({ color })}
          />
          <OptionSelectField
            label="Size"
            value={settings?.size}
            options={BUTTON_SIZES}
            onChange={(size) => patchStyle({ size })}
          />
          <OptionSelectField
            label="Radius"
            value={settings?.radius}
            options={RADIUS_OPTIONS}
            onChange={(radius) => patchStyle({ radius })}
          />
        </div>
      </div>
    </div>
  );
}

const ASPECT_RATIO_OPTIONS: readonly {
  value: NonNullable<SectionMediaSettings["aspectRatio"]>;
  label: string;
}[] = [
  { value: "auto", label: "Auto" },
  { value: "16/9", label: "16:9 Widescreen" },
  { value: "4/3", label: "4:3 Standard" },
  { value: "3/2", label: "3:2 Editorial" },
  { value: "21/9", label: "21:9 Cinema" },
  { value: "1/1", label: "1:1 Square" },
];

const MEDIA_RADIUS_OPTIONS: readonly {
  value: NonNullable<SectionMediaSettings["radius"]>;
  label: string;
}[] = [
  { value: "none", label: "None" },
  { value: "md", label: "Medium (md)" },
  { value: "lg", label: "Large (lg)" },
  { value: "xl", label: "Extra large (xl)" },
];

export function MediaCoreEditor({
  src,
  darkSrc,
  alt,
  caption,
  presets,
  onImageChange,
  onCaptionChange,
  settings,
  onSettingsChange,
}: {
  src: string;
  darkSrc?: string;
  alt: string;
  caption?: string;
  presets?: MediaPresetOption[];
  onImageChange: (patch: { src?: string; darkSrc?: string; alt?: string }) => void;
  onCaptionChange?: (caption: string) => void;
  settings: SectionMediaSettings | undefined;
  onSettingsChange: (next: SectionMediaSettings | undefined) => void;
}) {
  const hasOverrides = Boolean(
    settings &&
    (settings.aspectRatio ||
      settings.radius ||
      settings.focalPoint ||
      settings.hasBorder !== undefined ||
      settings.overlayGradient !== undefined ||
      settings.isZoomable !== undefined)
  );

  const patchMedia = (patch: Partial<SectionMediaSettings>) => {
    const merged: SectionMediaSettings = { ...settings, ...patch };
    const cleaned: SectionMediaSettings = {};
    if (merged.aspectRatio) cleaned.aspectRatio = merged.aspectRatio;
    if (merged.radius) cleaned.radius = merged.radius;
    if (merged.focalPoint) cleaned.focalPoint = merged.focalPoint;
    if (merged.hasBorder !== undefined) cleaned.hasBorder = merged.hasBorder;
    if (merged.overlayGradient !== undefined) cleaned.overlayGradient = merged.overlayGradient;
    if (merged.isZoomable !== undefined) cleaned.isZoomable = merged.isZoomable;
    onSettingsChange(Object.keys(cleaned).length > 0 ? cleaned : undefined);
  };

  return (
    <div className="space-y-4">
      <MediaUploadField
        label="Section visual"
        src={src}
        darkSrc={darkSrc}
        alt={alt}
        showAlt
        presets={presets}
        onChange={onImageChange}
        onClear={() => onImageChange({ src: "", darkSrc: "" })}
      />

      {onCaptionChange && (
        <Input
          label="Editorial caption"
          placeholder="Optional caption below image..."
          value={caption ?? ""}
          onChange={(e) => onCaptionChange(e.target.value)}
        />
      )}

      <div className="space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
        <div className="flex items-center justify-between gap-2">
          <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
            Core EditorialImage props
          </Text>
          {hasOverrides && (
            <Button
              type="button"
              variant="plain"
              size="sm"
              onClick={() => onSettingsChange(undefined)}
              startContent={<RotateCcw className="h-3 w-3" />}
            >
              Reset
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <OptionSelectField
            label="Aspect ratio"
            value={settings?.aspectRatio}
            options={ASPECT_RATIO_OPTIONS}
            onChange={(aspectRatio) => patchMedia({ aspectRatio })}
          />
          <OptionSelectField
            label="Radius"
            value={settings?.radius}
            options={MEDIA_RADIUS_OPTIONS}
            onChange={(radius) => patchMedia({ radius })}
          />
        </div>

        <OptionSelectField
          label="Focal point"
          value={settings?.focalPoint}
          options={FOCAL_POINT_OPTIONS}
          onChange={(focalPoint) => patchMedia({ focalPoint })}
        />

        <div className="space-y-2">
          <SwitchRow
            label="Frame border"
            hint="Render hairline border around media"
            checked={settings?.hasBorder ?? false}
            onChange={(hasBorder) => patchMedia({ hasBorder })}
          />
          <SwitchRow
            label="Overlay gradient"
            hint="Subtle vignette for editorial depth"
            checked={settings?.overlayGradient ?? false}
            onChange={(overlayGradient) => patchMedia({ overlayGradient })}
          />
          <SwitchRow
            label="Click to zoom"
            hint="Allow lightbox zoom on click"
            checked={settings?.isZoomable ?? false}
            onChange={(isZoomable) => patchMedia({ isZoomable })}
          />
        </div>
      </div>
    </div>
  );
}

const FOCAL_POINT_OPTIONS: readonly {
  value: NonNullable<SectionMediaSettings["focalPoint"]>;
  label: string;
}[] = [
  { value: "center", label: "Center (50% 50%)" },
  { value: "top", label: "Top (50% 0%)" },
  { value: "bottom", label: "Bottom (50% 100%)" },
  { value: "left", label: "Left (0% 50%)" },
  { value: "right", label: "Right (100% 50%)" },
  { value: "top-left", label: "Top Left" },
  { value: "top-right", label: "Top Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "bottom-right", label: "Bottom Right" },
];

const HEADING_SIZES: readonly {
  value: NonNullable<SectionHeadingSettings["size"]>;
  label: string;
}[] = [
  { value: "display", label: "Display" },
  { value: "h1", label: "H1" },
  { value: "h2", label: "H2" },
  { value: "h3", label: "H3" },
  { value: "h4", label: "H4" },
];

const HEADING_TRACKING: readonly {
  value: NonNullable<SectionHeadingSettings["tracking"]>;
  label: string;
}[] = [
  { value: "stitch", label: "Stitch (-0.04em)" },
  { value: "tighter", label: "Tighter" },
  { value: "tight", label: "Tight" },
  { value: "normal", label: "Normal" },
  { value: "wide", label: "Wide" },
];

const HEADING_COLORS: readonly {
  value: NonNullable<SectionHeadingSettings["color"]>;
  label: string;
}[] = [
  { value: "default", label: "Default ink" },
  { value: "muted", label: "Muted ink" },
  { value: "primary", label: "Primary accent" },
];

const TEXT_VARIANTS: readonly {
  value: NonNullable<SectionTextSettings["variant"]>;
  label: string;
}[] = [
  { value: "default", label: "Default body" },
  { value: "lead", label: "Lead subtitle" },
  { value: "muted", label: "Muted" },
  { value: "prose", label: "Editorial prose" },
];

const TEXT_WEIGHTS: readonly {
  value: NonNullable<SectionTextSettings["weight"]>;
  label: string;
}[] = [
  { value: "normal", label: "Regular" },
  { value: "medium", label: "Medium" },
  { value: "semibold", label: "Semibold" },
];

const TEXT_ALIGNS: readonly { value: NonNullable<SectionTextSettings["align"]>; label: string }[] =
  [
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
  ];

export function TypographyCoreEditor({
  headingText,
  onHeadingTextChange,
  descriptionText,
  onDescriptionTextChange,
  headingSettings,
  onHeadingSettingsChange,
  textSettings,
  onTextSettingsChange,
  focusField = "both",
}: {
  headingText?: string;
  onHeadingTextChange?: (next: string) => void;
  descriptionText?: string;
  onDescriptionTextChange?: (next: string) => void;
  headingSettings: SectionHeadingSettings | undefined;
  onHeadingSettingsChange: (next: SectionHeadingSettings | undefined) => void;
  textSettings: SectionTextSettings | undefined;
  onTextSettingsChange: (next: SectionTextSettings | undefined) => void;
  focusField?: "both" | "heading" | "text";
}) {
  const showHeadingSection = focusField !== "text";
  const showTextSection = focusField !== "heading";
  const hasOverrides = Boolean(
    (headingSettings &&
      (headingSettings.size ||
        headingSettings.tracking ||
        headingSettings.color ||
        headingSettings.withDivider !== undefined)) ||
    (textSettings && (textSettings.variant || textSettings.weight || textSettings.align))
  );

  const patchHeading = (patch: Partial<SectionHeadingSettings>) => {
    const merged: SectionHeadingSettings = { ...headingSettings, ...patch };
    const cleaned: SectionHeadingSettings = {};
    if (merged.size) cleaned.size = merged.size;
    if (merged.tracking) cleaned.tracking = merged.tracking;
    if (merged.color) cleaned.color = merged.color;
    if (merged.withDivider !== undefined) cleaned.withDivider = merged.withDivider;
    onHeadingSettingsChange(Object.keys(cleaned).length > 0 ? cleaned : undefined);
  };

  const patchText = (patch: Partial<SectionTextSettings>) => {
    const merged: SectionTextSettings = { ...textSettings, ...patch };
    const cleaned: SectionTextSettings = {};
    if (merged.variant) cleaned.variant = merged.variant;
    if (merged.weight) cleaned.weight = merged.weight;
    if (merged.align) cleaned.align = merged.align;
    onTextSettingsChange(Object.keys(cleaned).length > 0 ? cleaned : undefined);
  };

  return (
    <div className="space-y-4">
      {showHeadingSection && onHeadingTextChange && (
        <div className="space-y-1.5">
          <Textarea
            label="Headline text (*word* = italic accent)"
            rows={2}
            value={headingText ?? ""}
            onChange={(e) => onHeadingTextChange(e.target.value)}
          />
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => {
                const current = (headingText ?? "").trim();
                const words = current.split(/\s+/).filter(Boolean);
                if (words.length > 0 && !current.includes("*")) {
                  const last = words[words.length - 1];
                  words[words.length - 1] = `*${last}*`;
                  onHeadingTextChange(words.join(" "));
                } else {
                  onHeadingTextChange(`${current} *accent*`.trim());
                }
              }}
              className="rounded-md border border-zinc-200/80 bg-zinc-50 px-2 py-0.5 font-serif text-[11px] text-zinc-700 italic hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:bg-white/10"
            >
              + *italic* accent
            </button>
          </div>
        </div>
      )}

      {showTextSection && onDescriptionTextChange && (
        <Textarea
          label="Description text"
          rows={3}
          value={descriptionText ?? ""}
          onChange={(e) => onDescriptionTextChange(e.target.value)}
        />
      )}

      {showHeadingSection && (
        <div className="space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
          <div className="flex items-center justify-between gap-2">
            <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
              Heading props
            </Text>
            {hasOverrides && (
              <Button
                type="button"
                variant="plain"
                size="sm"
                onClick={() => {
                  onHeadingSettingsChange(undefined);
                  if (focusField === "both") {
                    onTextSettingsChange(undefined);
                  }
                }}
                startContent={<RotateCcw className="h-3 w-3" />}
              >
                Reset
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <OptionSelectField
              label="Heading size"
              value={headingSettings?.size}
              options={HEADING_SIZES}
              onChange={(size) => patchHeading({ size })}
            />
            <OptionSelectField
              label="Letter spacing"
              value={headingSettings?.tracking}
              options={HEADING_TRACKING}
              onChange={(tracking) => patchHeading({ tracking })}
            />
            <OptionSelectField
              label="Heading color"
              value={headingSettings?.color}
              options={HEADING_COLORS}
              onChange={(color) => patchHeading({ color })}
            />
          </div>

          <SwitchRow
            label="Editorial divider rule"
            hint="Add hairline divider under section heading"
            checked={headingSettings?.withDivider ?? false}
            onChange={(withDivider) => patchHeading({ withDivider })}
          />
        </div>
      )}

      {showTextSection && (
        <div className="space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
          <div className="flex items-center justify-between gap-2">
            <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
              Body Text props
            </Text>
            {focusField === "text" &&
              (textSettings?.variant || textSettings?.weight || textSettings?.align) && (
                <Button
                  type="button"
                  variant="plain"
                  size="sm"
                  onClick={() => onTextSettingsChange(undefined)}
                  startContent={<RotateCcw className="h-3 w-3" />}
                >
                  Reset
                </Button>
              )}
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <OptionSelectField
              label="Variant"
              value={textSettings?.variant}
              options={TEXT_VARIANTS}
              onChange={(variant) => patchText({ variant })}
            />
            <OptionSelectField
              label="Weight"
              value={textSettings?.weight}
              options={TEXT_WEIGHTS}
              onChange={(weight) => patchText({ weight })}
            />
            <OptionSelectField
              label="Alignment"
              value={textSettings?.align}
              options={TEXT_ALIGNS}
              onChange={(align) => patchText({ align })}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const CARD_VARIANTS: readonly {
  value: NonNullable<SectionCardSettings["variant"]>;
  label: string;
}[] = [
  { value: "shadow", label: "Elevated shadow" },
  { value: "bordered", label: "Bordered" },
  { value: "flat", label: "Flat surface" },
];

const BADGE_VARIANTS: readonly {
  value: NonNullable<SectionBadgeSettings["variant"]>;
  label: string;
}[] = [
  { value: "modern", label: "Modern" },
  { value: "solid", label: "Solid" },
  { value: "soft", label: "Soft" },
  { value: "outline", label: "Outline" },
  { value: "flat", label: "Flat" },
];

const BADGE_COLORS: readonly {
  value: NonNullable<SectionBadgeSettings["color"]>;
  label: string;
}[] = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "zinc", label: "Zinc" },
  { value: "neutral", label: "Neutral" },
  { value: "success", label: "Success" },
  { value: "warning", label: "Warning" },
  { value: "danger", label: "Danger" },
];

export function CardBadgeCoreEditor({
  anchorId,
  defaultAnchorId,
  onAnchorIdChange,
  badgeText,
  onBadgeTextChange,
  badgeSettings,
  onBadgeSettingsChange,
  cardSettings,
  onCardSettingsChange,
  showCard = true,
  showBadge = true,
  showAnchor = true,
}: {
  anchorId: string | undefined;
  defaultAnchorId: string;
  onAnchorIdChange: (next: string | undefined) => void;
  badgeText?: string;
  onBadgeTextChange?: (next: string) => void;
  badgeSettings: SectionBadgeSettings | undefined;
  onBadgeSettingsChange: (next: SectionBadgeSettings | undefined) => void;
  cardSettings: SectionCardSettings | undefined;
  onCardSettingsChange: (next: SectionCardSettings | undefined) => void;
  showCard?: boolean;
  showBadge?: boolean;
  showAnchor?: boolean;
}) {
  const patchCard = (patch: Partial<SectionCardSettings>) => {
    const merged: SectionCardSettings = { ...cardSettings, ...patch };
    const cleaned: SectionCardSettings = {};
    if (merged.variant) cleaned.variant = merged.variant;
    if (merged.radius) cleaned.radius = merged.radius;
    if (merged.featuredIndex !== undefined && merged.featuredIndex > 0) {
      cleaned.featuredIndex = merged.featuredIndex;
    }
    onCardSettingsChange(Object.keys(cleaned).length > 0 ? cleaned : undefined);
  };

  const patchBadge = (patch: Partial<SectionBadgeSettings>) => {
    const merged: SectionBadgeSettings = { ...badgeSettings, ...patch };
    const cleaned: SectionBadgeSettings = {};
    if (merged.variant) cleaned.variant = merged.variant;
    if (merged.color) cleaned.color = merged.color;
    if (merged.size) cleaned.size = merged.size;
    if (merged.showPulseDot !== undefined) cleaned.showPulseDot = merged.showPulseDot;
    onBadgeSettingsChange(Object.keys(cleaned).length > 0 ? cleaned : undefined);
  };

  return (
    <div className="space-y-4">
      {showAnchor && (
        <Input
          label="Section anchor ID"
          placeholder={defaultAnchorId}
          value={anchorId ?? ""}
          onChange={(e) => {
            const clean = e.target.value
              .toLowerCase()
              .replace(/^#+/, "")
              .replace(/[^a-z0-9-_]/g, "-");
            onAnchorIdChange(clean || undefined);
          }}
        />
      )}

      {showCard && (
        <div className="space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
          <div className="flex items-center justify-between gap-2">
            <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
              Card props
            </Text>
            {(cardSettings?.variant ||
              cardSettings?.radius ||
              cardSettings?.featuredIndex !== undefined) && (
              <Button
                type="button"
                variant="plain"
                size="sm"
                onClick={() => onCardSettingsChange(undefined)}
                startContent={<RotateCcw className="h-3 w-3" />}
              >
                Reset
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <OptionSelectField
              label="Card variant"
              value={cardSettings?.variant}
              options={CARD_VARIANTS}
              onChange={(variant) => patchCard({ variant })}
            />
            <OptionSelectField
              label="Card radius"
              value={cardSettings?.radius}
              options={RADIUS_OPTIONS}
              onChange={(radius) => patchCard({ radius })}
            />
          </div>
          <div className="space-y-1.5">
            <span className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
              Featured card highlight
            </span>
            <div className="grid grid-cols-5 gap-1">
              {[0, 1, 2, 3, 4].map((idx) => {
                const active = (cardSettings?.featuredIndex ?? 0) === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    aria-pressed={active}
                    onClick={() => patchCard({ featuredIndex: idx === 0 ? undefined : idx })}
                    className={`rounded-lg py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? "bg-zinc-900 text-white shadow-2xs dark:bg-white dark:text-zinc-950"
                        : "border border-zinc-200/80 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.08]"
                    }`}
                  >
                    {idx === 0 ? "None" : `#${idx}`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {showBadge && (
        <div className="space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
          <div className="flex items-center justify-between gap-2">
            <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
              Badge props
            </Text>
            {(badgeSettings?.variant ||
              badgeSettings?.color ||
              badgeSettings?.size ||
              badgeSettings?.showPulseDot !== undefined) && (
              <Button
                type="button"
                variant="plain"
                size="sm"
                onClick={() => onBadgeSettingsChange(undefined)}
                startContent={<RotateCcw className="h-3 w-3" />}
              >
                Reset
              </Button>
            )}
          </div>
          {onBadgeTextChange && (
            <Input
              label="Eyebrow badge text"
              placeholder="Release 2.4"
              value={badgeText ?? ""}
              onChange={(e) => onBadgeTextChange(e.target.value)}
            />
          )}
          <div className="grid grid-cols-2 gap-2.5">
            <OptionSelectField
              label="Badge variant"
              value={badgeSettings?.variant}
              options={BADGE_VARIANTS}
              onChange={(variant) => patchBadge({ variant })}
            />
            <OptionSelectField
              label="Badge color"
              value={badgeSettings?.color}
              options={BADGE_COLORS}
              onChange={(color) => patchBadge({ color })}
            />
            <OptionSelectField
              label="Badge size"
              value={badgeSettings?.size}
              options={BUTTON_SIZES}
              onChange={(size) => patchBadge({ size })}
            />
          </div>
          <SwitchRow
            label="Live pulsing dot"
            hint="Show animated status indicator before badge label"
            checked={badgeSettings?.showPulseDot ?? false}
            onChange={(showPulseDot) => patchBadge({ showPulseDot })}
          />
        </div>
      )}
    </div>
  );
}

const GRID_COL_OPTIONS: readonly {
  value: NonNullable<SectionGridSettings["columns"]>;
  label: string;
}[] = [
  { value: "auto", label: "Auto" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
];

const GRID_GAP_OPTIONS: readonly {
  value: NonNullable<SectionGridSettings["gap"]>;
  label: string;
}[] = [
  { value: "tight", label: "Tight" },
  { value: "normal", label: "Normal" },
  { value: "relaxed", label: "Relaxed" },
];

const GRID_ALIGN_OPTIONS: readonly {
  value: NonNullable<SectionGridSettings["align"]>;
  label: string;
}[] = [
  { value: "stretch", label: "Stretch" },
  { value: "start", label: "Start" },
  { value: "center", label: "Center" },
];

export function GridCoreEditor({
  settings,
  onChange,
  showGridOverlay,
  onToggleGridOverlay,
}: {
  settings: SectionGridSettings | undefined;
  onChange: (next: SectionGridSettings | undefined) => void;
  showGridOverlay?: boolean;
  onToggleGridOverlay?: () => void;
}) {
  const hasOverrides = Boolean(
    settings && (settings.columns !== undefined || settings.gap || settings.align)
  );

  const patchGrid = (patch: Partial<SectionGridSettings>) => {
    const merged: SectionGridSettings = { ...settings, ...patch };
    const cleaned: SectionGridSettings = {};
    if (merged.columns && merged.columns !== "auto") cleaned.columns = merged.columns;
    if (merged.gap && merged.gap !== "normal") cleaned.gap = merged.gap;
    if (merged.align && merged.align !== "stretch") cleaned.align = merged.align;
    onChange(Object.keys(cleaned).length > 0 ? cleaned : undefined);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Grid2x2 className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
            <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
              Core Grid tracks
            </Text>
          </div>
          {hasOverrides && (
            <Button
              type="button"
              variant="plain"
              size="sm"
              onClick={() => onChange(undefined)}
              startContent={<RotateCcw className="h-3 w-3" />}
            >
              Reset
            </Button>
          )}
        </div>

        <div className="space-y-1.5">
          <span className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
            Desktop columns
          </span>
          <div className="grid grid-cols-5 gap-1">
            {GRID_COL_OPTIONS.map((opt) => {
              const active = (settings?.columns ?? "auto") === opt.value;
              return (
                <button
                  key={String(opt.value)}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    patchGrid({ columns: opt.value === "auto" ? undefined : opt.value })
                  }
                  className={`rounded-lg py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-zinc-900 text-white shadow-2xs dark:bg-white dark:text-zinc-950"
                      : "border border-zinc-200/80 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.08]"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
            Track gap
          </span>
          <div className="grid grid-cols-3 gap-1">
            {GRID_GAP_OPTIONS.map((opt) => {
              const active = (settings?.gap ?? "normal") === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => patchGrid({ gap: opt.value === "normal" ? undefined : opt.value })}
                  className={`rounded-lg py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-zinc-900 text-white shadow-2xs dark:bg-white dark:text-zinc-950"
                      : "border border-zinc-200/80 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.08]"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
            Row alignment
          </span>
          <div className="grid grid-cols-3 gap-1">
            {GRID_ALIGN_OPTIONS.map((opt) => {
              const active = (settings?.align ?? "stretch") === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    patchGrid({ align: opt.value === "stretch" ? undefined : opt.value })
                  }
                  className={`rounded-lg py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-zinc-900 text-white shadow-2xs dark:bg-white dark:text-zinc-950"
                      : "border border-zinc-200/80 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.08]"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {onToggleGridOverlay && (
          <SwitchRow
            label="Canvas track guides"
            hint="Overlay CSS grid columns on canvas (Press G)"
            checked={Boolean(showGridOverlay)}
            onChange={() => onToggleGridOverlay()}
          />
        )}

        <Text variant="small" className="text-[11px] text-zinc-500 dark:text-zinc-400">
          Mobile viewports collapse cleanly to 1 column automatically via Hudbird Grid.
        </Text>
      </div>
    </div>
  );
}
