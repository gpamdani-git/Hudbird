import * as React from "react";
import { Button, Input, Text } from "@hudbird/ui";
import { ImagePlus, Moon, Sun, Trash2, Upload } from "lucide-react";

const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
  "image/gif",
]);

export interface MediaPresetOption {
  label: string;
  src: string;
  darkSrc?: string;
  alt?: string;
}

export interface MediaUploadFieldProps {
  label?: string;
  helperText?: string;
  src: string;
  darkSrc?: string;
  alt?: string;
  showAlt?: boolean;
  presets?: MediaPresetOption[];
  placeholderUrl?: string;
  onChange: (patch: { src?: string; darkSrc?: string; alt?: string }) => void;
  onClear?: () => void;
}

function readImageAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Could not read image file."));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function MediaUploadField({
  label = "Image",
  helperText,
  src,
  darkSrc,
  alt,
  showAlt = false,
  presets,
  placeholderUrl = "https://... or upload image",
  onChange,
  onClear,
}: MediaUploadFieldProps) {
  const lightInputRef = React.useRef<HTMLInputElement>(null);
  const darkInputRef = React.useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [dragTarget, setDragTarget] = React.useState<"light" | "dark" | null>(null);
  const [showDarkVariant, setShowDarkVariant] = React.useState(Boolean(darkSrc));
  const [brokenLight, setBrokenLight] = React.useState(false);
  const [brokenDark, setBrokenDark] = React.useState(false);
  const [lastFileInfo, setLastFileInfo] = React.useState<string | null>(null);

  React.useEffect(() => {
    setBrokenLight(false);
  }, [src]);

  React.useEffect(() => {
    setBrokenDark(false);
    if (darkSrc) {
      setShowDarkVariant(true);
    }
  }, [darkSrc]);

  const handleFileSelected = async (file: File | undefined, slot: "light" | "dark") => {
    if (!file) return;
    setErrorMsg(null);
    if (file.type && !ACCEPTED_IMAGE_TYPES.has(file.type)) {
      setErrorMsg("Unsupported image format. Use PNG, JPG, WebP, SVG, or GIF.");
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setErrorMsg(
        `File exceeds 2 MB limit (${formatFileSize(file.size)}). Use a smaller image or paste a URL.`
      );
      return;
    }
    try {
      const dataUrl = await readImageAsDataUrl(file);
      setLastFileInfo(`${file.name} · ${formatFileSize(file.size)}`);
      if (slot === "dark") {
        onChange({ darkSrc: dataUrl });
      } else {
        onChange({ src: dataUrl });
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Could not load selected file.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, slot: "light" | "dark") => {
    e.preventDefault();
    e.stopPropagation();
    setDragTarget(null);
    const file = e.dataTransfer.files?.[0];
    void handleFileSelected(file, slot);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200">{label}</span>
        <div className="flex items-center gap-1.5">
          {!showDarkVariant && (
            <button
              type="button"
              onClick={() => setShowDarkVariant(true)}
              className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
            >
              <Moon className="h-3 w-3" />
              Dark variant
            </button>
          )}
          {(src || darkSrc) && onClear && (
            <button
              type="button"
              onClick={() => {
                setErrorMsg(null);
                setLastFileInfo(null);
                onClear();
              }}
              aria-label={`Clear ${label}`}
              className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
            >
              <Trash2 className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Light / Default image dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragTarget("light");
        }}
        onDragLeave={() => setDragTarget((prev) => (prev === "light" ? null : prev))}
        onDrop={(e) => handleDrop(e, "light")}
        className={`group relative overflow-hidden rounded-xl border p-2.5 transition-colors ${
          dragTarget === "light"
            ? "border-zinc-900 bg-zinc-100/90 dark:border-white dark:bg-white/[0.08]"
            : "border-zinc-200/80 bg-zinc-50/70 dark:border-white/[0.08] dark:bg-white/[0.02]"
        }`}
      >
        <input
          ref={lightInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            void handleFileSelected(file, "light");
          }}
        />

        <div className="flex items-center gap-3">
          <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200/80 bg-white dark:border-white/10 dark:bg-zinc-900">
            {src && !brokenLight ? (
              <img
                src={src}
                alt={alt || "Selected preview"}
                onError={() => setBrokenLight(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImagePlus className="h-4 w-4 text-zinc-400" />
            )}
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-700 dark:text-zinc-200">
              <Sun className="h-3 w-3 text-zinc-400" />
              <span>Default / Light image</span>
            </div>
            <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
              {lastFileInfo ??
                (src.startsWith("data:")
                  ? "Uploaded local image"
                  : src
                    ? "External or preset URL"
                    : "Drop file here or upload (max 2 MB)")}
            </p>
            <div className="flex items-center gap-1.5 pt-0.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => lightInputRef.current?.click()}
                startContent={<Upload className="h-3 w-3" />}
              >
                Upload
              </Button>
              {src && (
                <Button
                  type="button"
                  variant="plain"
                  size="sm"
                  onClick={() => {
                    setLastFileInfo(null);
                    onChange({ src: "" });
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Input
        label="Image URL (or uploaded data)"
        placeholder={placeholderUrl}
        value={src.startsWith("data:") ? "" : src}
        onChange={(e) => {
          setLastFileInfo(null);
          onChange({ src: e.target.value });
        }}
      />
      {src.startsWith("data:") && (
        <Text variant="small" className="text-[11px] text-zinc-500 dark:text-zinc-400">
          Using uploaded inline asset. Paste an https URL above to replace it.
        </Text>
      )}

      {/* Optional Dark mode image override */}
      {showDarkVariant && (
        <div className="space-y-2 rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-2.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
          <input
            ref={darkInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              void handleFileSelected(file, "dark");
            }}
          />
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-700 dark:text-zinc-200">
              <Moon className="h-3 w-3 text-zinc-400" />
              Dark mode image override
            </span>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => darkInputRef.current?.click()}
                startContent={<Upload className="h-3 w-3" />}
              >
                Upload
              </Button>
              <Button
                type="button"
                variant="plain"
                size="sm"
                onClick={() => {
                  onChange({ darkSrc: "" });
                  setShowDarkVariant(false);
                }}
              >
                Hide
              </Button>
            </div>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragTarget("dark");
            }}
            onDragLeave={() => setDragTarget((prev) => (prev === "dark" ? null : prev))}
            onDrop={(e) => handleDrop(e, "dark")}
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200/80 bg-zinc-950 dark:border-white/10">
              {darkSrc && !brokenDark ? (
                <img
                  src={darkSrc}
                  alt={alt || "Dark preview"}
                  onError={() => setBrokenDark(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Moon className="h-3.5 w-3.5 text-zinc-500" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <Input
                aria-label="Dark image URL"
                placeholder="Optional dark mode image URL..."
                value={darkSrc?.startsWith("data:") ? "" : (darkSrc ?? "")}
                onChange={(e) => onChange({ darkSrc: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      {showAlt && (
        <Input
          label="Alt text"
          placeholder="Describe image for screen readers..."
          value={alt ?? ""}
          onChange={(e) => onChange({ alt: e.target.value })}
        />
      )}

      {/* Optional curated presets */}
      {presets && presets.length > 0 && (
        <div className="space-y-1.5">
          <span className="block text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
            Quick presets
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            {presets.map((preset) => {
              const isSelected = src === preset.src;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setErrorMsg(null);
                    setLastFileInfo(null);
                    onChange({
                      src: preset.src,
                      ...(preset.darkSrc !== undefined ? { darkSrc: preset.darkSrc } : {}),
                      ...(preset.alt ? { alt: preset.alt } : {}),
                    });
                  }}
                  className={`group overflow-hidden rounded-lg border text-left transition-colors ${
                    isSelected
                      ? "border-zinc-900 ring-1 ring-zinc-900 dark:border-white dark:ring-white"
                      : "border-zinc-200/80 hover:border-zinc-400 dark:border-white/10 dark:hover:border-white/30"
                  }`}
                >
                  <div className="h-10 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                    <img
                      src={preset.src}
                      alt={preset.alt ?? preset.label}
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                  <div className="truncate px-1.5 py-1 text-[10px] font-medium text-zinc-700 dark:text-zinc-300">
                    {preset.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {errorMsg && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs text-red-700 dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-300"
        >
          {errorMsg}
        </p>
      )}

      {helperText && (
        <Text variant="small" className="text-[11px] text-zinc-500 dark:text-zinc-400">
          {helperText}
        </Text>
      )}
    </div>
  );
}
