import * as React from "react";
import { Button, Input, Select, SelectItem, Switch, Text } from "@hudbird/ui";
import type {
  HeroImage,
  SectionColorSettings,
  SectionIllustrationSettings,
  SectionMediaSettings,
  SectionMotionSettings,
  SectionSlideshowSettings,
  SectionVideoSettings,
  SectionVisibilitySettings,
} from "@hudbird/schemas";
import {
  Check,
  Eye,
  Film,
  Images,
  Monitor,
  Palette,
  Play,
  RotateCcw,
  Search,
  Shield,
  Smartphone,
  Sparkles,
  Tablet,
  Upload,
  Video,
  Zap,
  Layers,
  Globe,
  Lock,
  Code2,
  Cpu,
  Database,
  Cloud,
  Clock,
  Compass,
  CreditCard,
  Flame,
  Gauge,
  Heart,
  Key,
  LifeBuoy,
  Mail,
  Rocket,
  Sliders,
  Star,
  Terminal,
  Users,
  Wand2,
} from "lucide-react";
import { CORE_DEFAULT_OPTION, MediaCoreEditor } from "./CoreComponentEditors";
import { MediaUploadField, type MediaPresetOption } from "./MediaUploadField";
import { HeroSlidesCrudEditor } from "./SectionItemCrudList";
import {
  WIDGET_PAGE_META,
  type ScannedSectionProfile,
  type ScannerCategoryFilter,
} from "./sectionScanner";

export function extractYouTubeVideoId(rawUrl: string | undefined): string | null {
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();
  const match = trimmed.match(
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/|v\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match?.[1] ?? null;
}

function parseHexRgb(hex: string): [number, number, number] | null {
  const clean = hex.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(clean)) {
    return [
      parseInt(clean[0] + clean[0], 16),
      parseInt(clean[1] + clean[1], 16),
      parseInt(clean[2] + clean[2], 16),
    ];
  }
  if (/^[0-9a-fA-F]{6}$/.test(clean)) {
    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16),
    ];
  }
  return null;
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function computeContrastBadge(
  bgHex?: string,
  fgHex?: string
): {
  ratio: string;
  tier: "AAA" | "AA" | "Low";
} {
  const bg = parseHexRgb(bgHex || "#ffffff") ?? [255, 255, 255];
  const defaultFg =
    relativeLuminance(bg) < 0.25
      ? ([250, 250, 250] as [number, number, number])
      : ([9, 9, 11] as [number, number, number]);
  const fg = (fgHex ? parseHexRgb(fgHex) : null) ?? defaultFg;
  const l1 = Math.max(relativeLuminance(bg), relativeLuminance(fg));
  const l2 = Math.min(relativeLuminance(bg), relativeLuminance(fg));
  const ratioNum = (l1 + 0.05) / (l2 + 0.05);
  return {
    ratio: `${ratioNum.toFixed(1)}:1`,
    tier: ratioNum >= 7 ? "AAA" : ratioNum >= 4.5 ? "AA" : "Low",
  };
}

export function SectionScannerHeader({
  profile,
  activeCategory,
  onSelectCategory,
}: {
  profile: ScannedSectionProfile;
  activeCategory: ScannerCategoryFilter;
  onSelectCategory: (next: ScannerCategoryFilter) => void;
}) {
  return (
    <div
      data-hb-scanner-bar="true"
      className="space-y-2 rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-2.5 dark:border-white/[0.08] dark:bg-white/[0.02]"
    >
      <div className="flex items-center justify-between gap-2 px-0.5">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
          <span className="truncate text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
            Scanned · {profile.title}
          </span>
          {profile.variant && profile.variant !== "default" && (
            <span className="rounded-md border border-zinc-200/80 bg-white px-1.5 py-0.5 font-mono text-[10px] font-medium text-zinc-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
              {profile.variant}
            </span>
          )}
        </div>
        <span className="shrink-0 text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
          {profile.capabilities.size} widgets
        </span>
      </div>

      {profile.availableWidgetPages.length > 1 && (
        <div
          role="tablist"
          aria-label="Scanned widget categories"
          className="flex flex-wrap gap-1 rounded-lg bg-zinc-100/90 p-1 dark:bg-black/35"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "all"}
            onClick={() => onSelectCategory("all")}
            className={`rounded-md px-2 py-1 text-[11px] font-semibold transition-colors ${
              activeCategory === "all"
                ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#27272b] dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            All
          </button>
          {profile.availableWidgetPages.map((pageGroup) => {
            const meta = WIDGET_PAGE_META[pageGroup];
            const active = activeCategory === pageGroup;
            return (
              <button
                key={pageGroup}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectCategory(pageGroup)}
                className={`rounded-md px-2 py-1 text-[11px] font-semibold transition-colors ${
                  active
                    ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#27272b] dark:text-white"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {meta.shortLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const SECTION_BG_SWATCHES = [
  { label: "White", hex: "#ffffff" },
  { label: "Zinc 50", hex: "#fafafa" },
  { label: "Zinc 100", hex: "#f4f4f5" },
  { label: "Ice Blue", hex: "#eff6ff" },
  { label: "Soft Indigo", hex: "#eef2ff" },
  { label: "Soft Emerald", hex: "#ecfdf5" },
  { label: "Warm Amber", hex: "#fffbeb" },
  { label: "Zinc 900", hex: "#18181b" },
  { label: "Obsidian 950", hex: "#09090b" },
] as const;

export function SectionColorPickerWidget({
  settings,
  onChange,
  showScrim = true,
}: {
  settings: SectionColorSettings | undefined;
  onChange: (next: SectionColorSettings | undefined) => void;
  showScrim?: boolean;
}) {
  const hasOverrides = Boolean(
    settings &&
    (settings.background ||
      settings.foreground ||
      settings.accent ||
      settings.scrimColor ||
      settings.scrimOpacity !== undefined)
  );

  const patch = (nextPatch: Partial<SectionColorSettings>) => {
    const merged: SectionColorSettings = { ...settings, ...nextPatch };
    const cleaned: SectionColorSettings = {};
    if (merged.background?.trim()) cleaned.background = merged.background.trim();
    if (merged.foreground?.trim()) cleaned.foreground = merged.foreground.trim();
    if (merged.accent?.trim()) cleaned.accent = merged.accent.trim();
    if (merged.scrimColor?.trim()) cleaned.scrimColor = merged.scrimColor.trim();
    if (merged.scrimOpacity !== undefined) cleaned.scrimOpacity = merged.scrimOpacity;
    if (merged.borderColor?.trim()) cleaned.borderColor = merged.borderColor.trim();
    onChange(Object.keys(cleaned).length > 0 ? cleaned : undefined);
  };

  const contrast = computeContrastBadge(settings?.background, settings?.foreground);

  return (
    <div className="space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Palette className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
          <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
            Section Color &amp; Contrast
          </Text>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold ${
              contrast.tier === "Low"
                ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
            }`}
          >
            {contrast.ratio} {contrast.tier}
          </span>
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
      </div>

      {/* Swatches */}
      <div className="space-y-1.5">
        <span className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
          Background color override
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => patch({ background: undefined, foreground: undefined })}
            className={`rounded-md border px-2 py-1 text-[10px] font-semibold transition-colors ${
              !settings?.background
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                : "border-zinc-200/80 bg-white text-zinc-600 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300"
            }`}
          >
            Auto
          </button>
          {SECTION_BG_SWATCHES.map((sw) => {
            const active = settings?.background?.toLowerCase() === sw.hex.toLowerCase();
            return (
              <button
                key={sw.hex}
                type="button"
                title={`${sw.label} (${sw.hex})`}
                aria-label={`Set section background ${sw.label}`}
                onClick={() => {
                  const rgb = parseHexRgb(sw.hex);
                  const isDark = rgb ? relativeLuminance(rgb) < 0.25 : false;
                  patch({
                    background: sw.hex,
                    foreground: isDark ? "#fafafa" : "#09090b",
                  });
                }}
                className={`h-5 w-5 rounded-full border transition-transform ${
                  active
                    ? "scale-110 ring-2 ring-indigo-500 ring-offset-1 dark:ring-offset-zinc-900"
                    : "border-zinc-300/80 hover:scale-105 dark:border-white/20"
                }`}
                style={{ backgroundColor: sw.hex }}
              />
            );
          })}
        </div>
      </div>

      {/* Hex / Native inputs */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <span className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
            Background hex
          </span>
          <div className="flex items-center gap-1.5">
            <input
              type="color"
              aria-label="Pick section background color"
              value={parseHexRgb(settings?.background ?? "") ? settings!.background! : "#ffffff"}
              onChange={(e) => patch({ background: e.target.value })}
              className="h-7 w-7 shrink-0 cursor-pointer rounded border border-zinc-200 bg-transparent p-0.5 dark:border-white/10"
            />
            <Input
              aria-label="Section background hex"
              placeholder="#ffffff"
              value={settings?.background ?? ""}
              onChange={(e) => patch({ background: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-1">
          <span className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
            Text ink hex
          </span>
          <div className="flex items-center gap-1.5">
            <input
              type="color"
              aria-label="Pick section text color"
              value={parseHexRgb(settings?.foreground ?? "") ? settings!.foreground! : "#09090b"}
              onChange={(e) => patch({ foreground: e.target.value })}
              className="h-7 w-7 shrink-0 cursor-pointer rounded border border-zinc-200 bg-transparent p-0.5 dark:border-white/10"
            />
            <Input
              aria-label="Section text ink hex"
              placeholder="#09090b"
              value={settings?.foreground ?? ""}
              onChange={(e) => patch({ foreground: e.target.value })}
            />
          </div>
        </div>
      </div>

      {showScrim && (
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
            <span>Overlay scrim opacity</span>
            <span className="font-mono text-zinc-800 dark:text-zinc-200">
              {settings?.scrimOpacity ?? 0}%
            </span>
          </div>
          <input
            type="range"
            aria-label="Overlay scrim opacity"
            min={0}
            max={90}
            step={5}
            value={settings?.scrimOpacity ?? 0}
            onChange={(e) => {
              const val = Number(e.target.value);
              patch({ scrimOpacity: val === 0 ? undefined : val });
            }}
            className="h-1.5 w-full cursor-pointer accent-zinc-900 dark:accent-white"
          />
        </div>
      )}
    </div>
  );
}

const VIDEO_STREAM_PRESETS = [
  {
    label: "Abstract Dark Glass (MP4)",
    src: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4",
  },
  {
    label: "Digital Network Flow (MP4)",
    src: "https://videos.pexels.com/video-files/3141208/3141208-uhd_2560_1440_25fps.mp4",
  },
  {
    label: "YouTube Product Keynote Demo",
    src: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
  },
] as const;

export function VideoMediaWidget({
  videoSrc,
  onVideoSrcChange,
  poster,
  presets,
  onPosterChange,
  onPosterCaptionChange,
  mediaSettings,
  onMediaSettingsChange,
  videoSettings,
  onVideoSettingsChange,
}: {
  videoSrc: string;
  onVideoSrcChange: (src: string) => void;
  poster: HeroImage;
  presets?: MediaPresetOption[];
  onPosterChange: (patch: { src?: string; darkSrc?: string; alt?: string }) => void;
  onPosterCaptionChange?: (caption: string) => void;
  mediaSettings: SectionMediaSettings | undefined;
  onMediaSettingsChange: (next: SectionMediaSettings | undefined) => void;
  videoSettings: SectionVideoSettings | undefined;
  onVideoSettingsChange: (next: SectionVideoSettings | undefined) => void;
}) {
  const youtubeId = extractYouTubeVideoId(videoSrc);
  const [sourceTab, setSourceTab] = React.useState<"url" | "upload" | "presets">(
    youtubeId ? "url" : "url"
  );
  const [uploadNotice, setUploadNotice] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const patchVideo = (patch: Partial<SectionVideoSettings>) => {
    const merged: SectionVideoSettings = { ...videoSettings, ...patch };
    onVideoSettingsChange(merged);
  };

  const handleVideoFileSelect = (file: File | undefined) => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    onVideoSrcChange(objectUrl);
    setUploadNotice(`Loaded ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Video className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
            <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
              Video Upload &amp; YouTube Link
            </Text>
          </div>
          {youtubeId && (
            <span className="rounded-md bg-red-500/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-red-600 dark:text-red-300">
              YouTube · {youtubeId}
            </span>
          )}
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-3 gap-0.5 rounded-lg bg-zinc-100 p-0.5 dark:bg-black/35">
          {(
            [
              { id: "url", label: "URL / YouTube" },
              { id: "upload", label: "Upload MP4" },
              { id: "presets", label: "Presets" },
            ] as const
          ).map((t) => {
            const active = sourceTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSourceTab(t.id)}
                className={`rounded-md py-1 text-[11px] font-semibold transition-colors ${
                  active
                    ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#27272b] dark:text-white"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {sourceTab === "url" && (
          <div className="space-y-2">
            <Input
              label="Video stream / MP4 or YouTube URL"
              placeholder="https://www.youtube.com/watch?v=... or https://.../clip.mp4"
              value={videoSrc}
              onChange={(e) => onVideoSrcChange(e.target.value)}
            />
            {youtubeId && (
              <div className="flex items-center gap-2 rounded-lg border border-zinc-200/80 bg-white p-2 text-xs dark:border-white/10 dark:bg-white/[0.03]">
                <img
                  src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                  alt="YouTube thumbnail preview"
                  className="h-10 w-16 shrink-0 rounded object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[11px] font-semibold text-zinc-900 dark:text-zinc-100">
                    YouTube Embed Ready
                  </div>
                  <div className="truncate font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                    ID: {youtubeId}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {sourceTab === "upload" && (
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/webm,video/ogg"
              aria-label="Upload video file"
              className="hidden"
              onChange={(e) => handleVideoFileSelect(e.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-zinc-300 bg-white/80 px-3 py-4 text-center transition-colors hover:border-zinc-500 dark:border-white/15 dark:bg-white/[0.02] dark:hover:border-white/35"
            >
              <Upload className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                Click to upload MP4 / WebM video
              </span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                Plays immediately in live canvas preview
              </span>
            </button>
            {uploadNotice && (
              <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                {uploadNotice}
              </div>
            )}
          </div>
        )}

        {sourceTab === "presets" && (
          <div className="space-y-1.5">
            {VIDEO_STREAM_PRESETS.map((preset) => {
              const active = videoSrc === preset.src;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => onVideoSrcChange(preset.src)}
                  className={`flex w-full items-center justify-between rounded-lg border px-2.5 py-2 text-left text-xs font-medium transition-colors ${
                    active
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                      : "border-zinc-200/80 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-200"
                  }`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <Film className="h-3.5 w-3.5 shrink-0 opacity-70" />
                    <span className="truncate">{preset.label}</span>
                  </span>
                  {active && <Check className="h-3.5 w-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Playback Controls */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {(
            [
              { key: "autoplay", label: "Autoplay", def: true },
              { key: "muted", label: "Muted", def: true },
              { key: "loop", label: "Loop", def: true },
              { key: "controls", label: "Controls", def: false },
            ] as const
          ).map((item) => {
            const checked = videoSettings?.[item.key] ?? item.def;
            return (
              <div
                key={item.key}
                className="flex items-center justify-between rounded-lg border border-zinc-200/80 bg-white px-2.5 py-1.5 dark:border-white/[0.08] dark:bg-white/[0.02]"
              >
                <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-200">
                  {item.label}
                </span>
                <Switch
                  size="sm"
                  aria-label={`Video ${item.label}`}
                  checked={checked}
                  onChange={(e) => patchVideo({ [item.key]: e.target.checked })}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Poster Image Upload & EditorialImage Props */}
      <MediaCoreEditor
        src={poster.src}
        darkSrc={poster.darkSrc}
        alt={poster.alt}
        caption={poster.caption}
        presets={presets}
        onImageChange={onPosterChange}
        onCaptionChange={onPosterCaptionChange}
        settings={mediaSettings}
        onSettingsChange={onMediaSettingsChange}
      />
    </div>
  );
}

export function SlideshowMediaWidget({
  slides,
  presets,
  onSlidesChange,
  slideshowSettings,
  onSlideshowSettingsChange,
  activeSlideIndex,
  onSelectSlide,
  project,
}: {
  slides: HeroImage[];
  presets?: MediaPresetOption[];
  onSlidesChange: (slides: HeroImage[]) => void;
  slideshowSettings: SectionSlideshowSettings | undefined;
  onSlideshowSettingsChange: (next: SectionSlideshowSettings | undefined) => void;
  activeSlideIndex?: number | null;
  onSelectSlide?: (idx: number) => void;
  project?: import("@hudbird/marketing").WebsiteProjectConfig;
}) {
  const multiInputRef = React.useRef<HTMLInputElement>(null);
  const [batchMessage, setBatchMessage] = React.useState<string | null>(null);

  const handleMultiFileUpload = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList).slice(0, 10);
    const readAsDataUrl = (file: File) =>
      new Promise<HeroImage>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const res = typeof reader.result === "string" ? reader.result : "";
          const baseName = file.name.replace(/\.[^.]+$/, "");
          resolve({
            src: res,
            darkSrc: res,
            alt: baseName || "Slideshow image",
            caption: baseName,
          });
        };
        reader.readAsDataURL(file);
      });

    const newSlides = await Promise.all(files.map(readAsDataUrl));
    onSlidesChange([...slides, ...newSlides]);
    setBatchMessage(
      `Added ${newSlides.length} slide${newSlides.length > 1 ? "s" : ""} to gallery.`
    );
  };

  const patchSlideshow = (patch: Partial<SectionSlideshowSettings>) => {
    onSlideshowSettingsChange({ ...slideshowSettings, ...patch });
  };

  const resolvedActiveIdx =
    activeSlideIndex != null && activeSlideIndex >= 0 && activeSlideIndex < slides.length
      ? activeSlideIndex
      : 0;

  return (
    <div className="space-y-4">
      <div className="space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Images className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
            <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
              Multi-Image Slideshow Engine
            </Text>
          </div>
          <span className="rounded-md bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-zinc-700 dark:bg-white/10 dark:text-zinc-300">
            Slide {resolvedActiveIdx + 1} / {Math.max(slides.length, 1)}
          </span>
        </div>

        {/* Clickable active slide switcher synced with canvas & left tree */}
        {slides.length > 0 && (
          <div className="grid grid-cols-4 gap-1.5">
            {slides.map((slide, idx) => {
              const isCurrent = resolvedActiveIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectSlide?.(idx)}
                  aria-label={`Jump canvas to slide ${idx + 1}`}
                  className={`group relative overflow-hidden rounded-lg border text-left transition-all ${
                    isCurrent
                      ? "border-indigo-500 ring-2 ring-indigo-500/25 dark:border-indigo-400"
                      : "border-zinc-200 hover:border-zinc-400 dark:border-white/10 dark:hover:border-white/30"
                  }`}
                >
                  <div className="aspect-[16/10] w-full bg-zinc-200/70 dark:bg-zinc-900">
                    {slide.src ? (
                      <img
                        src={slide.src}
                        alt={slide.alt || `Slide ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[10px] text-zinc-400">
                        #{idx + 1}
                      </div>
                    )}
                  </div>
                  <div
                    className={`truncate px-1.5 py-1 text-[10px] font-medium ${
                      isCurrent
                        ? "bg-indigo-600 text-white dark:bg-indigo-500"
                        : "bg-white/90 text-zinc-700 dark:bg-zinc-950/90 dark:text-zinc-300"
                    }`}
                  >
                    #{idx + 1} {slide.title || slide.alt || `Slide ${idx + 1}`}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <input
          ref={multiInputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
          aria-label="Upload multiple slideshow images"
          className="hidden"
          onChange={(e) => void handleMultiFileUpload(e.target.files)}
        />
        <button
          type="button"
          onClick={() => multiInputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-zinc-300 bg-white/80 px-3 py-2.5 text-center transition-colors hover:border-zinc-500 dark:border-white/15 dark:bg-white/[0.02] dark:hover:border-white/35"
        >
          <Upload className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
            Batch upload multiple images
          </span>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
            Select 2–10 PNG, JPG, WebP, or SVG files at once
          </span>
        </button>

        {batchMessage && (
          <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            {batchMessage}
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <span className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
              Autoplay
            </span>
            <Select
              aria-label="Slideshow autoplay speed"
              value={String(slideshowSettings?.autoplayMs ?? 4500)}
              onValueChange={(v) => patchSlideshow({ autoplayMs: Number(v) })}
            >
              <SelectItem value="0">Manual (Off)</SelectItem>
              <SelectItem value="3000">Fast (3s)</SelectItem>
              <SelectItem value="4500">Default (4.5s)</SelectItem>
              <SelectItem value="6500">Relaxed (6.5s)</SelectItem>
            </Select>
          </div>
          <div className="space-y-1">
            <span className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
              Transition
            </span>
            <Select
              aria-label="Slideshow transition"
              value={slideshowSettings?.transition ?? "slide"}
              onValueChange={(v) =>
                patchSlideshow({ transition: v as SectionSlideshowSettings["transition"] })
              }
            >
              <SelectItem value="slide">Slide</SelectItem>
              <SelectItem value="fade">Crossfade</SelectItem>
              <SelectItem value="zoom">Subtle Zoom</SelectItem>
            </Select>
          </div>
          <div className="space-y-1">
            <span className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
              Frame Ratio
            </span>
            <Select
              aria-label="Slideshow aspect ratio"
              value={slideshowSettings?.aspectRatio ?? "auto"}
              onValueChange={(v) =>
                patchSlideshow({
                  aspectRatio: v as SectionSlideshowSettings["aspectRatio"],
                })
              }
            >
              <SelectItem value="auto">Auto</SelectItem>
              <SelectItem value="16/9">16:9 Wide</SelectItem>
              <SelectItem value="4/3">4:3 Classic</SelectItem>
              <SelectItem value="21/9">21:9 Cinema</SelectItem>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-2 border-t border-zinc-200/70 pt-2.5 dark:border-white/[0.08]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-zinc-600 dark:text-zinc-300">Dot indicators</span>
            <Switch
              size="sm"
              checked={slideshowSettings?.showIndicators !== false}
              onChange={(e) => patchSlideshow({ showIndicators: e.target.checked })}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-zinc-600 dark:text-zinc-300">Arrow buttons</span>
            <Switch
              size="sm"
              checked={slideshowSettings?.showArrows !== false}
              onChange={(e) => patchSlideshow({ showArrows: e.target.checked })}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-zinc-600 dark:text-zinc-300">Infinite loop</span>
            <Switch
              size="sm"
              checked={slideshowSettings?.loop !== false}
              onChange={(e) => patchSlideshow({ loop: e.target.checked })}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-zinc-600 dark:text-zinc-300">Pause on hover</span>
            <Switch
              size="sm"
              checked={slideshowSettings?.pauseOnHover !== false}
              onChange={(e) => patchSlideshow({ pauseOnHover: e.target.checked })}
            />
          </div>
        </div>
      </div>

      <HeroSlidesCrudEditor
        slides={slides}
        presets={presets}
        activeSlideIndex={activeSlideIndex}
        onSelectSlide={onSelectSlide}
        project={project}
        onChange={onSlidesChange}
      />
    </div>
  );
}

const CURATED_ICONS = [
  { id: "sparkles", label: "Sparkles", Icon: Sparkles },
  { id: "zap", label: "Zap", Icon: Zap },
  { id: "shield", label: "Shield", Icon: Shield },
  { id: "layers", label: "Layers", Icon: Layers },
  { id: "globe", label: "Globe", Icon: Globe },
  { id: "lock", label: "Lock", Icon: Lock },
  { id: "code", label: "Code", Icon: Code2 },
  { id: "cpu", label: "CPU", Icon: Cpu },
  { id: "database", label: "Database", Icon: Database },
  { id: "cloud", label: "Cloud", Icon: Cloud },
  { id: "check", label: "Check", Icon: Check },
  { id: "clock", label: "Clock", Icon: Clock },
  { id: "compass", label: "Compass", Icon: Compass },
  { id: "credit-card", label: "Billing", Icon: CreditCard },
  { id: "flame", label: "Flame", Icon: Flame },
  { id: "gauge", label: "Speed", Icon: Gauge },
  { id: "heart", label: "Heart", Icon: Heart },
  { id: "key", label: "Key", Icon: Key },
  { id: "lifebuoy", label: "Support", Icon: LifeBuoy },
  { id: "mail", label: "Mail", Icon: Mail },
  { id: "rocket", label: "Rocket", Icon: Rocket },
  { id: "sliders", label: "Sliders", Icon: Sliders },
  { id: "star", label: "Star", Icon: Star },
  { id: "terminal", label: "Terminal", Icon: Terminal },
  { id: "users", label: "Team", Icon: Users },
  { id: "wand", label: "Wand", Icon: Wand2 },
] as const;

export function IconBrandPickerWidget({
  selectedIcon,
  onSelectIcon,
  targetLabel = "Active item icon",
}: {
  selectedIcon?: string;
  onSelectIcon: (iconId: string) => void;
  targetLabel?: string;
}) {
  const [query, setQuery] = React.useState("");
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CURATED_ICONS;
    return CURATED_ICONS.filter(
      (item) => item.id.includes(q) || item.label.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
      <div className="flex items-center justify-between gap-2">
        <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
          {targetLabel}
        </Text>
        {selectedIcon && (
          <span className="rounded-md bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[10px] font-medium text-zinc-700 dark:bg-white/10 dark:text-zinc-300">
            {selectedIcon}
          </span>
        )}
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          aria-label="Search icons"
          placeholder="Search Lucide icons (zap, shield, code...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-zinc-200/80 bg-white py-1.5 pr-2.5 pl-8 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-100"
        />
      </div>

      <div className="grid grid-cols-6 gap-1">
        {filtered.map(({ id, label, Icon }) => {
          const active = selectedIcon === id;
          return (
            <button
              key={id}
              type="button"
              title={label}
              aria-label={`Select ${label} icon`}
              aria-pressed={active}
              onClick={() => onSelectIcon(id)}
              className={`flex flex-col items-center justify-center gap-0.5 rounded-lg border py-1.5 transition-colors ${
                active
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                  : "border-zinc-200/80 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.08]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="max-w-full truncate px-0.5 text-[9px] leading-tight">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function MotionRevealWidget({
  settings,
  onChange,
  sectionType,
}: {
  settings: SectionMotionSettings | undefined;
  onChange: (next: SectionMotionSettings | undefined) => void;
  sectionType: string;
}) {
  const hasOverrides = Boolean(
    settings && (settings.entrance || settings.staggerMs || settings.hoverEffect)
  );

  const patch = (nextPatch: Partial<SectionMotionSettings>) => {
    const merged: SectionMotionSettings = { ...settings, ...nextPatch };
    const cleaned: SectionMotionSettings = {};
    if (merged.entrance) cleaned.entrance = merged.entrance;
    if (merged.durationMs) cleaned.durationMs = merged.durationMs;
    if (merged.staggerMs) cleaned.staggerMs = merged.staggerMs;
    if (merged.hoverEffect) cleaned.hoverEffect = merged.hoverEffect;
    onChange(Object.keys(cleaned).length > 0 ? cleaned : undefined);
  };

  const replayAnimationOnCanvas = () => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe[title="Responsive Isolated Canvas"]'
    );
    const doc = iframe?.contentDocument;
    if (!doc) return;
    const target =
      doc.querySelector<HTMLElement>(`[data-landing-section="${sectionType}"]`) ??
      doc.querySelector<HTMLElement>(".hb-pilot");
    if (!target || typeof target.animate !== "function") return;
    const entrance = settings?.entrance ?? "fade-up";
    const keyframes: Keyframe[] =
      entrance === "scale-in"
        ? [
            { opacity: 0.2, transform: "scale(0.96)" },
            { opacity: 1, transform: "scale(1)" },
          ]
        : entrance === "blur-reveal"
          ? [
              { opacity: 0.2, filter: "blur(6px)", transform: "translateY(8px)" },
              { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" },
            ]
          : [
              { opacity: 0.25, transform: "translateY(12px)" },
              { opacity: 1, transform: "translateY(0)" },
            ];
    target.animate(keyframes, {
      duration: settings?.durationMs ?? 420,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    });
  };

  return (
    <div className="space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
          <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
            Animation &amp; Reveal Motion
          </Text>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={replayAnimationOnCanvas}
            startContent={<Play className="h-3 w-3" />}
          >
            Replay
          </Button>
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
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="space-y-1">
          <span className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
            Entrance preset
          </span>
          <Select
            aria-label="Entrance motion preset"
            value={settings?.entrance ?? CORE_DEFAULT_OPTION}
            onValueChange={(v) =>
              patch({
                entrance:
                  v === CORE_DEFAULT_OPTION ? undefined : (v as SectionMotionSettings["entrance"]),
              })
            }
          >
            <SelectItem value={CORE_DEFAULT_OPTION}>Default (Theme)</SelectItem>
            <SelectItem value="none">Instant (Off)</SelectItem>
            <SelectItem value="fade-up">Subtle Fade Up</SelectItem>
            <SelectItem value="stagger">Stagger Waterfall</SelectItem>
            <SelectItem value="blur-reveal">Editorial Blur Reveal</SelectItem>
            <SelectItem value="scale-in">Spring Scale In</SelectItem>
          </Select>
        </div>

        <div className="space-y-1">
          <span className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
            Hover interaction
          </span>
          <Select
            aria-label="Card hover effect"
            value={settings?.hoverEffect ?? CORE_DEFAULT_OPTION}
            onValueChange={(v) =>
              patch({
                hoverEffect:
                  v === CORE_DEFAULT_OPTION
                    ? undefined
                    : (v as SectionMotionSettings["hoverEffect"]),
              })
            }
          >
            <SelectItem value={CORE_DEFAULT_OPTION}>Default</SelectItem>
            <SelectItem value="lift">Hover Lift (-2px)</SelectItem>
            <SelectItem value="border-glow">Accent Border Glow</SelectItem>
            <SelectItem value="none">Static (None)</SelectItem>
          </Select>
        </div>
      </div>
    </div>
  );
}

export function VisibilityAnchorWidget({
  visibility,
  onVisibilityChange,
}: {
  visibility: SectionVisibilitySettings | undefined;
  onVisibilityChange: (next: SectionVisibilitySettings | undefined) => void;
}) {
  const hasOverrides = Boolean(
    visibility && (visibility.hideDesktop || visibility.hideTablet || visibility.hideMobile)
  );

  const patch = (nextPatch: Partial<SectionVisibilitySettings>) => {
    const merged: SectionVisibilitySettings = { ...visibility, ...nextPatch };
    const cleaned: SectionVisibilitySettings = {};
    if (merged.hideDesktop) cleaned.hideDesktop = true;
    if (merged.hideTablet) cleaned.hideTablet = true;
    if (merged.hideMobile) cleaned.hideMobile = true;
    onVisibilityChange(Object.keys(cleaned).length > 0 ? cleaned : undefined);
  };

  const devices = [
    {
      key: "hideDesktop" as const,
      label: "Desktop",
      Icon: Monitor,
      visible: !visibility?.hideDesktop,
    },
    {
      key: "hideTablet" as const,
      label: "Tablet",
      Icon: Tablet,
      visible: !visibility?.hideTablet,
    },
    {
      key: "hideMobile" as const,
      label: "Mobile",
      Icon: Smartphone,
      visible: !visibility?.hideMobile,
    },
  ];

  return (
    <div className="space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Eye className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
          <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
            Breakpoint Visibility
          </Text>
        </div>
        {hasOverrides && (
          <Button
            type="button"
            variant="plain"
            size="sm"
            onClick={() => onVisibilityChange(undefined)}
            startContent={<RotateCcw className="h-3 w-3" />}
          >
            Show all
          </Button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {devices.map(({ key, label, Icon, visible }) => (
          <button
            key={key}
            type="button"
            aria-pressed={visible}
            onClick={() => patch({ [key]: visible ? true : undefined })}
            className={`flex items-center justify-center gap-1.5 rounded-lg border py-1.5 text-xs font-medium transition-colors ${
              visible
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                : "border-zinc-200/80 bg-white text-zinc-500 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const ACCENT_TONES: Array<{
  id: NonNullable<SectionIllustrationSettings["accentTone"]>;
  label: string;
}> = [
  { id: "theme", label: "Theme" },
  { id: "indigo", label: "Indigo" },
  { id: "emerald", label: "Emerald" },
  { id: "amber", label: "Amber" },
  { id: "monochrome", label: "Mono" },
];

/**
 * Widget editor dedicated to sections rendered with interactive JSX/SVG code illustrations
 * (allowing code mockup prop customization OR overriding with a custom uploaded image).
 */
export function CodeIllustrationWidget({
  settings,
  onChange,
  presets = [],
  mediaPresets = [],
  illustrationLabel = "Code Illustration",
}: {
  settings: SectionIllustrationSettings | undefined;
  onChange: (next: SectionIllustrationSettings | undefined) => void;
  presets?: Array<{ id: string; label: string }>;
  mediaPresets?: MediaPresetOption[];
  illustrationLabel?: string;
}) {
  const mode = settings?.mode ?? "code";
  const hasOverrides = Boolean(
    settings &&
    (settings.mode === "custom-image" ||
      settings.presetVariant ||
      settings.interactive === false ||
      (settings.accentTone && settings.accentTone !== "theme") ||
      settings.badgeText ||
      settings.titleText ||
      settings.subtitleText ||
      settings.metricValue ||
      settings.showFloatingCallout)
  );

  const patch = (next: Partial<SectionIllustrationSettings>) => {
    const merged: SectionIllustrationSettings = {
      ...settings,
      ...next,
    };
    onChange(merged);
  };

  return (
    <div className="space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Code2 className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
          <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
            {illustrationLabel}
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

      {/* Mode Switcher: Live Code Illustration vs Custom Image Override */}
      <div
        role="tablist"
        aria-label="Visual display mode"
        className="grid grid-cols-2 gap-1 rounded-lg bg-zinc-200/70 p-0.5 dark:bg-white/[0.06]"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "code"}
          onClick={() => patch({ mode: "code" })}
          className={`flex items-center justify-center gap-1.5 rounded-md py-1.5 text-[11px] font-medium transition-[background-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] ${
            mode === "code"
              ? "bg-white text-zinc-950 shadow-2xs dark:bg-zinc-800 dark:text-white"
              : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          }`}
        >
          <Code2 className="h-3 w-3" />
          <span>Code Visual</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "custom-image"}
          onClick={() => patch({ mode: "custom-image" })}
          className={`flex items-center justify-center gap-1.5 rounded-md py-1.5 text-[11px] font-medium transition-[background-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] ${
            mode === "custom-image"
              ? "bg-white text-zinc-950 shadow-2xs dark:bg-zinc-800 dark:text-white"
              : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          }`}
        >
          <Images className="h-3 w-3" />
          <span>Custom Image</span>
        </button>
      </div>

      {mode === "custom-image" ? (
        <MediaUploadField
          label="Override Illustration Image"
          src={settings?.customImage?.src ?? ""}
          alt={settings?.customImage?.alt ?? ""}
          showAlt
          presets={mediaPresets}
          onChange={(p) =>
            patch({
              mode: "custom-image",
              customImage: {
                src: p.src ?? settings?.customImage?.src ?? "",
                alt: p.alt ?? settings?.customImage?.alt ?? illustrationLabel,
              },
            })
          }
        />
      ) : (
        <div className="space-y-3">
          {presets.length > 0 && (
            <div className="space-y-1.5">
              <Text variant="small" className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Illustration Style
              </Text>
              <div className="grid grid-cols-2 gap-1.5">
                {presets.map((p) => {
                  const selected = (settings?.presetVariant ?? presets[0].id) === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => patch({ presetVariant: p.id })}
                      className={`rounded-lg border px-2 py-1.5 text-left text-[11px] font-medium transition-[border-color,background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] ${
                        selected
                          ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                          : "border-zinc-200/80 bg-white text-zinc-700 hover:border-zinc-300 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300"
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <Text variant="small" className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Accent Tone
            </Text>
            <div className="grid grid-cols-5 gap-1">
              {ACCENT_TONES.map((tone) => {
                const active = (settings?.accentTone ?? "theme") === tone.id;
                return (
                  <button
                    key={tone.id}
                    type="button"
                    onClick={() => patch({ accentTone: tone.id })}
                    className={`rounded-md border py-1 text-[10px] font-medium transition-[background-color,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      active
                        ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                        : "border-zinc-200/80 bg-white text-zinc-600 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400"
                    }`}
                  >
                    {tone.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-0.5">
            <div>
              <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                Interactive hover &amp; motion
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                Allow hover tilt and state cycling in preview
              </div>
            </div>
            <Switch
              size="sm"
              checked={settings?.interactive !== false}
              onChange={(e) => patch({ interactive: e.target.checked })}
            />
          </div>

          <Input
            label="Mockup Status Badge (optional)"
            placeholder="e.g. Live Sync, Step 01"
            value={settings?.badgeText ?? ""}
            onChange={(e) => patch({ badgeText: e.target.value })}
          />

          <div className="flex items-center justify-between gap-2 pt-0.5">
            <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
              Show floating callout pill
            </div>
            <Switch
              size="sm"
              checked={Boolean(settings?.showFloatingCallout)}
              onChange={(e) => patch({ showFloatingCallout: e.target.checked })}
            />
          </div>

          {settings?.showFloatingCallout && (
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Callout Title"
                placeholder="Latency"
                value={settings?.titleText ?? ""}
                onChange={(e) => patch({ titleText: e.target.value })}
              />
              <Input
                label="Highlight Value"
                placeholder="0.24ms"
                value={settings?.metricValue ?? ""}
                onChange={(e) => patch({ metricValue: e.target.value })}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
