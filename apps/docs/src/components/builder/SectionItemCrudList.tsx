import * as React from "react";
import { Button, Input, Select, SelectItem, Text, Textarea } from "@hudbird/ui";
import type {
  HeroImage,
  LandingAction,
  LandingFeature,
  LandingItem,
  LandingSectionContent,
  ProductDemoTab,
  WebsiteLinkTarget,
} from "@hudbird/schemas";
import {
  resolveLinkTarget,
  type WebsiteProjectConfig,
  type WebsiteSharedFooterConfig,
} from "@hudbird/marketing";
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, Copy, Plus, Trash2 } from "lucide-react";
import { LinkTargetPicker } from "./LinkTargetPicker";
import { MediaUploadField, type MediaPresetOption } from "./MediaUploadField";
import { CORE_DEFAULT_OPTION } from "./CoreComponentEditors";

function makeUid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

export function inferHrefToLinkTarget(
  project: WebsiteProjectConfig,
  rawHref: string | undefined
): WebsiteLinkTarget {
  const href = rawHref?.trim() ?? "";
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return { kind: "external", href, openInNewTab: href.startsWith("http") };
  }
  if (href.startsWith("website-page:")) {
    const rest = href.slice("website-page:".length);
    const [pageId, anchor] = rest.split("#");
    const matched = project.pages.find((p) => p.id === pageId);
    if (matched) return { kind: "page", pageId: matched.id, sectionAnchor: anchor || undefined };
  }
  if (href.startsWith("/")) {
    const [cleanPath, anchor] = href.split("#");
    const matched = project.pages.find((p) => p.path === cleanPath.split("?")[0]);
    if (matched) return { kind: "page", pageId: matched.id, sectionAnchor: anchor || undefined };
  }
  if (href.startsWith("#") && !href.startsWith("#/")) {
    const sec = href.slice(1) || "pricing";
    return { kind: "section", section: sec as never };
  }
  const home = project.pages.find((p) => p.path === "/") ?? project.pages[0];
  return home
    ? { kind: "page", pageId: home.id }
    : { kind: "external", href: href || "https://", openInNewTab: false };
}

export function linkTargetToActionHref(
  project: WebsiteProjectConfig,
  target: WebsiteLinkTarget
): string {
  return resolveLinkTarget(project, target).href;
}

const SelectedItemIndexContext = React.createContext<number | null>(null);

export function SelectedItemIndexProvider({
  selectedItemIndex,
  children,
}: {
  selectedItemIndex?: number | null;
  children: React.ReactNode;
}) {
  return (
    <SelectedItemIndexContext.Provider value={selectedItemIndex ?? null}>
      {children}
    </SelectedItemIndexContext.Provider>
  );
}

interface CrudListShellProps<T> {
  label: string;
  items: T[];
  addLabel: string;
  onCreateItem: () => T;
  onChange: (next: T[]) => void;
  getTitle: (item: T, index: number) => string;
  getSubtitle?: (item: T, index: number) => string | undefined;
  renderFields: (item: T, index: number, patchItem: (patch: Partial<T>) => void) => React.ReactNode;
  duplicateItem?: (item: T) => T;
  minItems?: number;
  activeIndex?: number | null;
  onActiveIndexChange?: (idx: number | null) => void;
}

function CrudListShell<T>({
  label,
  items,
  addLabel,
  onCreateItem,
  onChange,
  getTitle,
  getSubtitle,
  renderFields,
  duplicateItem,
  minItems = 0,
  activeIndex = null,
  onActiveIndexChange,
}: CrudListShellProps<T>) {
  const ctxItemIndex = React.useContext(SelectedItemIndexContext);
  const externalIndex = activeIndex ?? ctxItemIndex;
  const [openIndex, setOpenIndex] = React.useState<number | null>(
    externalIndex != null && externalIndex >= 0 && externalIndex < items.length
      ? externalIndex
      : items.length > 0
        ? 0
        : null
  );

  React.useEffect(() => {
    if (externalIndex != null && externalIndex >= 0 && externalIndex < items.length) {
      setOpenIndex(externalIndex);
    }
  }, [externalIndex, items.length]);

  const selectOpen = (nextIdx: number | null) => {
    setOpenIndex(nextIdx);
    onActiveIndexChange?.(nextIdx);
  };

  const move = (idx: number, dir: -1 | 1) => {
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const copy = [...items];
    const [moved] = copy.splice(idx, 1);
    copy.splice(targetIdx, 0, moved);
    onChange(copy);
    selectOpen(targetIdx);
  };

  const remove = (idx: number) => {
    if (items.length <= minItems) return;
    const next = items.filter((_, i) => i !== idx);
    onChange(next);
    const resolved =
      openIndex === idx
        ? next.length > 0
          ? Math.min(idx, next.length - 1)
          : null
        : openIndex !== null && openIndex > idx
          ? openIndex - 1
          : openIndex;
    selectOpen(resolved);
  };

  const duplicate = (idx: number) => {
    const clone = duplicateItem
      ? duplicateItem(items[idx])
      : ({ ...(items[idx] as Record<string, unknown>) } as T);
    const next = [...items.slice(0, idx + 1), clone, ...items.slice(idx + 1)];
    onChange(next);
    selectOpen(idx + 1);
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200">
          {label} ({items.length})
        </span>
        <Button
          type="button"
          size="sm"
          variant="outline"
          startContent={<Plus className="h-3 w-3" />}
          onClick={() => {
            const next = [...items, onCreateItem()];
            onChange(next);
            selectOpen(next.length - 1);
          }}
        >
          {addLabel}
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-200 px-3 py-4 text-center text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
          No entries yet. Click {addLabel} to create one.
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const isFocusedFromCanvas = externalIndex === idx;
            const subtitle = getSubtitle?.(item, idx);
            return (
              <div
                key={idx}
                className={`overflow-hidden rounded-xl border transition-colors ${
                  isFocusedFromCanvas
                    ? "border-indigo-500/60 bg-indigo-50/40 ring-1 ring-indigo-500/20 dark:border-indigo-400/50 dark:bg-indigo-500/[0.08]"
                    : "border-zinc-200/80 bg-zinc-50/70 dark:border-white/[0.08] dark:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between gap-1 px-2.5 py-2">
                  <button
                    type="button"
                    onClick={() => selectOpen(isOpen ? null : idx)}
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                  >
                    {isOpen ? (
                      <ChevronDown className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                    )}
                    <div className="min-w-0">
                      <div className="truncate text-xs font-medium text-zinc-900 dark:text-zinc-100">
                        {getTitle(item, idx) || `Item ${idx + 1}`}
                      </div>
                      {subtitle && (
                        <div className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
                          {subtitle}
                        </div>
                      )}
                    </div>
                  </button>

                  <div className="flex shrink-0 items-center gap-0.5">
                    <button
                      type="button"
                      disabled={idx === 0}
                      aria-label={`Move ${getTitle(item, idx)} up`}
                      onClick={() => move(idx, -1)}
                      className="rounded-md p-1 text-zinc-500 hover:bg-zinc-200/70 hover:text-zinc-900 disabled:opacity-30 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      <ArrowUp className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === items.length - 1}
                      aria-label={`Move ${getTitle(item, idx)} down`}
                      onClick={() => move(idx, 1)}
                      className="rounded-md p-1 text-zinc-500 hover:bg-zinc-200/70 hover:text-zinc-900 disabled:opacity-30 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      <ArrowDown className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Duplicate ${getTitle(item, idx)}`}
                      onClick={() => duplicate(idx)}
                      className="rounded-md p-1 text-zinc-500 hover:bg-zinc-200/70 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      disabled={items.length <= minItems}
                      aria-label={`Delete ${getTitle(item, idx)}`}
                      onClick={() => remove(idx)}
                      className="rounded-md p-1 text-zinc-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 dark:text-zinc-400 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="space-y-3 border-t border-zinc-200/80 bg-white/80 p-3 dark:border-white/[0.08] dark:bg-zinc-950/40">
                    {renderFields(item, idx, (patch) => {
                      onChange(items.map((row, i) => (i === idx ? { ...row, ...patch } : row)));
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function HeroSlidesCrudEditor({
  slides,
  presets,
  activeSlideIndex = null,
  onSelectSlide,
  project,
  onChange,
}: {
  slides: HeroImage[];
  presets?: MediaPresetOption[];
  activeSlideIndex?: number | null;
  onSelectSlide?: (idx: number) => void;
  project?: WebsiteProjectConfig;
  onChange: (next: HeroImage[]) => void;
}) {
  return (
    <CrudListShell<HeroImage>
      label="Slideshow frames"
      items={slides}
      addLabel="Add slide"
      minItems={1}
      activeIndex={activeSlideIndex}
      onActiveIndexChange={(idx) => {
        if (idx != null) onSelectSlide?.(idx);
      }}
      onCreateItem={() => ({
        src: presets?.[0]?.src ?? "",
        alt: `Slide ${slides.length + 1}`,
        caption: "",
        focalPoint: "center center",
      })}
      duplicateItem={(item) => ({ ...item, alt: `${item.alt} copy` })}
      getTitle={(item, idx) => item.title || item.alt || `Slide ${idx + 1}`}
      getSubtitle={(item) =>
        item.src.startsWith("data:") ? "Uploaded image" : item.caption || item.src
      }
      onChange={onChange}
      renderFields={(item, idx, patch) => (
        <div className="space-y-3">
          {onSelectSlide && (
            <div className="flex items-center justify-between gap-2 rounded-lg bg-zinc-100/80 px-2.5 py-1.5 dark:bg-white/[0.04]">
              <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
                Frame #{idx + 1}
              </span>
              <Button type="button" size="sm" variant="outline" onClick={() => onSelectSlide(idx)}>
                Preview on canvas
              </Button>
            </div>
          )}
          <MediaUploadField
            label="Slide artwork (Desktop)"
            src={item.src}
            darkSrc={item.darkSrc}
            alt={item.alt}
            showAlt
            presets={presets}
            onChange={(p) => patch(p)}
          />
          <MediaUploadField
            label="Mobile crop (optional)"
            src={item.mobileSrc ?? ""}
            darkSrc={item.darkMobileSrc}
            helperText="Falls back to desktop image on mobile if empty."
            onChange={(p) =>
              patch({
                ...(p.src !== undefined ? { mobileSrc: p.src || undefined } : {}),
                ...(p.darkSrc !== undefined ? { darkMobileSrc: p.darkSrc || undefined } : {}),
              })
            }
            onClear={() => patch({ mobileSrc: undefined, darkMobileSrc: undefined })}
          />
          <div className="space-y-1">
            <span className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
              Focal point crop
            </span>
            <Select
              aria-label={`Slide ${idx + 1} focal point`}
              value={item.focalPoint ?? "center center"}
              onValueChange={(v) => patch({ focalPoint: v })}
            >
              <SelectItem value="center center">Center</SelectItem>
              <SelectItem value="top center">Top Center</SelectItem>
              <SelectItem value="bottom center">Bottom Center</SelectItem>
              <SelectItem value="left center">Left Center</SelectItem>
              <SelectItem value="right center">Right Center</SelectItem>
              <SelectItem value="50% 25%">Upper Subject (25%)</SelectItem>
            </Select>
          </div>
          <Input
            label="Overlay headline"
            placeholder="Optional headline shown on this slide"
            value={item.title ?? ""}
            onChange={(e) => patch({ title: e.target.value })}
          />
          <Input
            label="Overlay subtitle"
            placeholder="Optional supporting copy"
            value={item.subtitle ?? ""}
            onChange={(e) => patch({ subtitle: e.target.value })}
          />
          <Input
            label="Caption"
            placeholder="Optional bottom caption"
            value={item.caption ?? ""}
            onChange={(e) => patch({ caption: e.target.value })}
          />
          <div className="space-y-2 rounded-lg border border-zinc-200/80 p-2.5 dark:border-white/10">
            <Input
              label="Slide CTA label (optional)"
              placeholder="e.g. Explore feature"
              value={item.action?.label ?? ""}
              onChange={(e) =>
                patch({
                  action: e.target.value.trim()
                    ? { label: e.target.value, href: item.action?.href ?? "#features" }
                    : undefined,
                })
              }
            />
            {item.action?.label &&
              (project ? (
                <LinkTargetPicker
                  label="Slide CTA destination"
                  value={inferHrefToLinkTarget(project, item.action.href)}
                  project={project}
                  onChange={(target) =>
                    patch({
                      action: {
                        label: item.action?.label ?? "Learn more",
                        href: linkTargetToActionHref(project, target),
                      },
                    })
                  }
                />
              ) : (
                <Input
                  label="Slide CTA href"
                  value={item.action.href}
                  onChange={(e) =>
                    patch({
                      action: {
                        label: item.action?.label ?? "Learn more",
                        href: e.target.value,
                      },
                    })
                  }
                />
              ))}
          </div>
        </div>
      )}
    />
  );
}

export function HeroInteractiveTabsCrudEditor({
  tabs,
  onChange,
}: {
  tabs: ProductDemoTab[];
  onChange: (next: ProductDemoTab[]) => void;
}) {
  return (
    <CrudListShell<ProductDemoTab>
      label="Interactive tabs"
      items={tabs}
      addLabel="Add tab"
      minItems={1}
      onCreateItem={() => ({
        id: makeUid("tab"),
        label: `Tab ${tabs.length + 1}`,
        title: "New capability",
        description: "Describe what happens in this workflow view.",
        items: ["Instant state updates", "Accessible keyboard focus"],
      })}
      duplicateItem={(item) => ({ ...item, id: makeUid("tab"), label: `${item.label} Copy` })}
      getTitle={(item) => item.label || item.title}
      getSubtitle={(item) => `${item.items.length} bullet items`}
      onChange={onChange}
      renderFields={(item, _idx, patch) => (
        <div className="space-y-3">
          <Input
            label="Tab label"
            value={item.label}
            onChange={(e) => patch({ label: e.target.value })}
          />
          <Input
            label="Headline"
            value={item.title}
            onChange={(e) => patch({ title: e.target.value })}
          />
          <Textarea
            label="Description"
            rows={2}
            value={item.description}
            onChange={(e) => patch({ description: e.target.value })}
          />
          <Textarea
            label="Highlights (one per line)"
            rows={3}
            value={item.items.join("\n")}
            onChange={(e) =>
              patch({
                items: e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
        </div>
      )}
    />
  );
}

export function LogosCrudEditor({
  items,
  logoAssets,
  presets,
  onChange,
  onLogoAssetsChange,
}: {
  items: string[];
  logoAssets?: LandingSectionContent["logos"]["logoAssets"];
  presets?: MediaPresetOption[];
  onChange: (next: string[]) => void;
  onLogoAssetsChange?: (next: NonNullable<LandingSectionContent["logos"]["logoAssets"]>) => void;
}) {
  const rows = items.map((name, i) => ({ id: i, name }));
  const findAsset = (name: string, idx: number) =>
    logoAssets?.[idx] ?? logoAssets?.find((a) => a.name.toLowerCase() === name.toLowerCase());

  const updateAsset = (
    name: string,
    idx: number,
    patchAsset: { src?: string; darkSrc?: string; href?: string; name?: string }
  ) => {
    if (!onLogoAssetsChange) return;
    const baseList = [...(logoAssets ?? [])];
    while (baseList.length < items.length) {
      const n = items[baseList.length] ?? `Partner ${baseList.length + 1}`;
      baseList.push({ id: `logo-${baseList.length + 1}`, name: n });
    }
    const existing = baseList[idx] ?? { id: `logo-${idx + 1}`, name };
    baseList[idx] = { ...existing, ...patchAsset };
    onLogoAssetsChange(baseList);
  };

  return (
    <CrudListShell<{ id: number; name: string }>
      label="Partner logos & assets"
      items={rows}
      addLabel="Add logo"
      onCreateItem={() => ({ id: rows.length, name: "Acme Corp" })}
      getTitle={(item) => item.name}
      getSubtitle={(item, idx) => {
        const asset = findAsset(item.name, idx);
        return asset?.src ? "Custom SVG / image uploaded" : "Built-in wordmark";
      }}
      onChange={(nextRows) => {
        onChange(nextRows.map((r) => r.name));
        if (onLogoAssetsChange && logoAssets) {
          onLogoAssetsChange(
            nextRows.map((r, i) => logoAssets[r.id] ?? { id: `logo-${i + 1}`, name: r.name })
          );
        }
      }}
      renderFields={(item, idx, patch) => {
        const asset = findAsset(item.name, idx);
        return (
          <div className="space-y-3">
            <Input
              label="Company / Partner name"
              value={item.name}
              onChange={(e) => {
                patch({ name: e.target.value });
                updateAsset(item.name, idx, { name: e.target.value });
              }}
            />
            {onLogoAssetsChange && (
              <>
                <MediaUploadField
                  label="Custom logo SVG / image (optional)"
                  src={asset?.src ?? ""}
                  darkSrc={asset?.darkSrc}
                  presets={presets}
                  helperText="Leave empty to use built-in wordmark matching partner name."
                  onChange={(p) =>
                    updateAsset(item.name, idx, {
                      ...(p.src !== undefined ? { src: p.src || undefined } : {}),
                      ...(p.darkSrc !== undefined ? { darkSrc: p.darkSrc || undefined } : {}),
                    })
                  }
                  onClear={() =>
                    updateAsset(item.name, idx, { src: undefined, darkSrc: undefined })
                  }
                />
                <Input
                  label="Partner link URL (optional)"
                  placeholder="https://partner.example"
                  value={asset?.href ?? ""}
                  onChange={(e) =>
                    updateAsset(item.name, idx, { href: e.target.value || undefined })
                  }
                />
              </>
            )}
          </div>
        );
      }}
    />
  );
}

export function BenefitsCrudEditor({
  items,
  image,
  impactQuotes,
  presets,
  onItemsChange,
  onImageChange,
  onImpactQuotesChange,
}: {
  items: LandingItem[];
  image: HeroImage;
  impactQuotes?: NonNullable<LandingSectionContent["benefits"]["impactQuotes"]>;
  presets?: MediaPresetOption[];
  onItemsChange: (next: LandingItem[]) => void;
  onImageChange: (next: HeroImage) => void;
  onImpactQuotesChange?: (
    next: NonNullable<LandingSectionContent["benefits"]["impactQuotes"]>
  ) => void;
}) {
  return (
    <div className="space-y-4">
      <CrudListShell<LandingItem>
        label="Benefit items"
        items={items}
        addLabel="Add benefit"
        onCreateItem={() => ({
          id: makeUid("benefit"),
          title: "New benefit",
          description: "Explain the clear customer outcome.",
        })}
        duplicateItem={(item) => ({ ...item, id: makeUid("benefit"), title: `${item.title} Copy` })}
        getTitle={(item) => item.title}
        getSubtitle={(item) => item.description}
        onChange={onItemsChange}
        renderFields={(item, _idx, patch) => (
          <div className="space-y-3">
            <Input
              label="Title"
              value={item.title}
              onChange={(e) => patch({ title: e.target.value })}
            />
            <Textarea
              label="Description"
              rows={2}
              value={item.description}
              onChange={(e) => patch({ description: e.target.value })}
            />
            <Input
              label="Tags (comma-separated, for visual-list / cards)"
              placeholder="e.g. Zero config, SOC2 Ready"
              value={(item.tags ?? []).join(", ")}
              onChange={(e) =>
                patch({
                  tags: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
            />
            <Input
              label="Learn more URL (optional)"
              placeholder="/docs or #pricing"
              value={item.href ?? ""}
              onChange={(e) => patch({ href: e.target.value || undefined })}
            />
            <MediaUploadField
              label="Card image (optional override)"
              src={item.image?.src ?? ""}
              darkSrc={item.image?.darkSrc}
              alt={item.image?.alt ?? item.title}
              showAlt
              presets={presets}
              onChange={(p) =>
                patch({
                  image: { ...(item.image ?? { src: "", alt: item.title }), ...p },
                })
              }
              onClear={() => patch({ image: undefined })}
            />
          </div>
        )}
      />

      <MediaUploadField
        label="Section visual (visual-list layout)"
        src={image.src}
        darkSrc={image.darkSrc}
        alt={image.alt}
        showAlt
        presets={presets}
        onChange={(p) => onImageChange({ ...image, ...p })}
      />

      {onImpactQuotesChange && (
        <CrudListShell<{
          id?: string;
          highlight?: string;
          quote: string;
          author: string;
          role?: string;
        }>
          label="Impact quotes (columns footer)"
          items={impactQuotes ?? []}
          addLabel="Add quote"
          onCreateItem={() => ({
            id: makeUid("iq"),
            highlight: "3.4x faster shipping",
            quote: "Cut deployment toil in half across all customer workspaces.",
            author: "Maya Lin",
            role: "VP Platform",
          })}
          getTitle={(q) => q.highlight || q.author}
          getSubtitle={(q) => q.quote}
          onChange={onImpactQuotesChange}
          renderFields={(q, _idx, patchQ) => (
            <div className="space-y-2.5">
              <Input
                label="Key metric / highlight"
                value={q.highlight ?? ""}
                onChange={(e) => patchQ({ highlight: e.target.value })}
              />
              <Textarea
                label="Quote"
                rows={2}
                value={q.quote}
                onChange={(e) => patchQ({ quote: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Author"
                  value={q.author}
                  onChange={(e) => patchQ({ author: e.target.value })}
                />
                <Input
                  label="Role"
                  value={q.role ?? ""}
                  onChange={(e) => patchQ({ role: e.target.value })}
                />
              </div>
            </div>
          )}
        />
      )}
    </div>
  );
}

export function FeatureItemsCrudEditor({
  label = "Feature items",
  items,
  presets,
  showSubSteps = false,
  onChange,
}: {
  label?: string;
  items: LandingFeature[];
  presets?: MediaPresetOption[];
  showSubSteps?: boolean;
  onChange: (next: LandingFeature[]) => void;
}) {
  return (
    <CrudListShell<LandingFeature>
      label={label}
      items={items}
      addLabel="Add item"
      onCreateItem={() => ({
        id: makeUid("feature"),
        title: "New capability",
        description: "Describe how this feature helps your users.",
        image: {
          src: presets?.[0]?.src ?? "",
          alt: "Feature illustration",
        },
        bullets: ["Fast setup", "Zero boilerplate"],
      })}
      duplicateItem={(item) => ({
        ...item,
        id: makeUid("feature"),
        title: `${item.title} Copy`,
      })}
      getTitle={(item) => item.title}
      getSubtitle={(item) => item.description}
      onChange={onChange}
      renderFields={(item, _idx, patch) => (
        <div className="space-y-3">
          <Input
            label="Title"
            value={item.title}
            onChange={(e) => patch({ title: e.target.value })}
          />
          <Textarea
            label="Description"
            rows={2}
            value={item.description}
            onChange={(e) => patch({ description: e.target.value })}
          />
          <MediaUploadField
            label="Item visual"
            src={item.image?.src ?? ""}
            darkSrc={item.image?.darkSrc}
            alt={item.image?.alt ?? item.title}
            showAlt
            presets={presets}
            onChange={(p) =>
              patch({ image: { ...(item.image ?? { src: "", alt: item.title }), ...p } })
            }
          />
          <Textarea
            label="Bullet highlights (one per line, accordion / split)"
            rows={3}
            placeholder="Instant live preview&#10;Accessible keyboard controls"
            value={(item.bullets ?? []).join("\n")}
            onChange={(e) =>
              patch({
                bullets: e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
          {showSubSteps && (
            <>
              <Textarea
                label="Sub-steps (label | optional badge per line)"
                rows={3}
                placeholder="Connect repo | 1m&#10;Preview changes | Auto"
                value={(item.subSteps ?? [])
                  .filter((s): s is NonNullable<typeof s> => Boolean(s && typeof s === "object"))
                  .map((s) => (s.badge ? `${s.label} | ${s.badge}` : s.label))
                  .join("\n")}
                onChange={(e) => {
                  const existingSubs = (item.subSteps ?? []).filter(
                    (s): s is NonNullable<typeof s> => Boolean(s && typeof s === "object")
                  );
                  patch({
                    subSteps: e.target.value
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean)
                      .map((line, subIdx) => {
                        const [rawLabel, rawBadge] = line.split("|").map((p) => p.trim());
                        return {
                          id: existingSubs[subIdx]?.id ?? makeUid("sub"),
                          label: rawLabel ?? line,
                          ...(rawBadge ? { badge: rawBadge } : {}),
                        };
                      }),
                  });
                }}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Step CTA label"
                  placeholder="Optional action"
                  value={item.actionLabel ?? ""}
                  onChange={(e) => patch({ actionLabel: e.target.value || undefined })}
                />
                <Input
                  label="Step CTA URL"
                  placeholder="#signup"
                  value={item.actionHref ?? ""}
                  onChange={(e) => patch({ actionHref: e.target.value || undefined })}
                />
              </div>
            </>
          )}
        </div>
      )}
    />
  );
}

export function IntegrationsCrudEditor({
  items,
  onChange,
}: {
  items: (LandingItem & { category: string })[];
  onChange: (next: (LandingItem & { category: string })[]) => void;
}) {
  return (
    <CrudListShell<LandingItem & { category: string }>
      label="Integration cards"
      items={items}
      addLabel="Add integration"
      onCreateItem={() => ({
        id: makeUid("int"),
        title: "New Connector",
        category: "Data Sync",
        description: "Automatic bidirectional webhook synchronization.",
      })}
      duplicateItem={(item) => ({ ...item, id: makeUid("int"), title: `${item.title} Copy` })}
      getTitle={(item) => item.title}
      getSubtitle={(item) => item.category}
      onChange={onChange}
      renderFields={(item, _idx, patch) => (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Name"
              value={item.title}
              onChange={(e) => patch({ title: e.target.value })}
            />
            <Input
              label="Category"
              value={item.category}
              onChange={(e) => patch({ category: e.target.value })}
            />
          </div>
          <Textarea
            label="Description"
            rows={2}
            value={item.description}
            onChange={(e) => patch({ description: e.target.value })}
          />
        </div>
      )}
    />
  );
}

type TestimonialItemRow = LandingSectionContent["testimonials"]["items"][number];

export function TestimonialsCrudEditor({
  items,
  presets,
  metrics,
  onMetricsChange,
  featuredAction,
  onFeaturedActionChange,
  project,
  onChange,
}: {
  items: TestimonialItemRow[];
  presets?: MediaPresetOption[];
  metrics?: LandingSectionContent["testimonials"]["metrics"];
  onMetricsChange?: (next: NonNullable<LandingSectionContent["testimonials"]["metrics"]>) => void;
  featuredAction?: LandingAction;
  onFeaturedActionChange?: (next: LandingAction | undefined) => void;
  project?: WebsiteProjectConfig;
  onChange: (next: TestimonialItemRow[]) => void;
}) {
  return (
    <div className="space-y-4">
      <CrudListShell<TestimonialItemRow>
        label="Customer quotes & stories"
        items={items}
        addLabel="Add quote"
        onCreateItem={() => ({
          id: makeUid("quote"),
          quote: "Cut our release cycle from two weeks down to a single afternoon.",
          source: "Alex Rivera",
          context: "VP of Engineering",
          rating: "5.0",
        })}
        duplicateItem={(item) => ({ ...item, id: makeUid("quote") })}
        getTitle={(item) => item.source || "Unnamed author"}
        getSubtitle={(item) => (item.videoUrl ? `Video · ${item.context}` : item.context)}
        onChange={onChange}
        renderFields={(item, _idx, patch) => (
          <div className="space-y-3">
            <Textarea
              label="Quote"
              rows={3}
              value={item.quote}
              onChange={(e) => patch({ quote: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Author"
                value={item.source}
                onChange={(e) => patch({ source: e.target.value })}
              />
              <Input
                label="Role / Context"
                value={item.context}
                onChange={(e) => patch({ context: e.target.value })}
              />
            </div>
            <MediaUploadField
              label="Author avatar"
              src={item.avatar ?? ""}
              presets={presets}
              helperText="Upload portrait or paste avatar URL."
              onChange={(p) =>
                patch({
                  ...(p.src !== undefined ? { avatar: p.src || undefined } : {}),
                })
              }
              onClear={() => patch({ avatar: undefined })}
            />
            <div className="space-y-2.5 rounded-lg border border-zinc-200/80 p-2.5 dark:border-white/10">
              <Input
                label="Video story URL (YouTube or MP4, featured/collection)"
                placeholder="https://youtube.com/watch?v=... or .mp4"
                value={item.videoUrl ?? ""}
                onChange={(e) => patch({ videoUrl: e.target.value || undefined })}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Duration"
                  placeholder="2:40"
                  value={item.videoDuration ?? ""}
                  onChange={(e) => patch({ videoDuration: e.target.value || undefined })}
                />
                <Input
                  label="Rating"
                  placeholder="4.9/5"
                  value={item.rating ?? ""}
                  onChange={(e) => patch({ rating: e.target.value || undefined })}
                />
              </div>
              <MediaUploadField
                label="Story poster image (optional)"
                src={item.image ?? ""}
                presets={presets}
                onChange={(p) =>
                  patch({
                    ...(p.src !== undefined ? { image: p.src || undefined } : {}),
                  })
                }
                onClear={() => patch({ image: undefined })}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Date (optional)"
                placeholder="Oct 2026"
                value={item.date ?? ""}
                onChange={(e) => patch({ date: e.target.value || undefined })}
              />
              <Input
                label="Signature (optional)"
                placeholder="— Forma Ops Team"
                value={item.signature ?? ""}
                onChange={(e) => patch({ signature: e.target.value || undefined })}
              />
            </div>
          </div>
        )}
      />

      {onMetricsChange && (
        <CrudListShell<{ label: string; value: string }>
          label="Single-quote highlight metrics"
          items={metrics ?? []}
          addLabel="Add metric"
          onCreateItem={() => ({ value: "99.9%", label: "Uptime SLA" })}
          getTitle={(m) => `${m.value} — ${m.label}`}
          onChange={onMetricsChange}
          renderFields={(m, _idx, patchM) => (
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Metric value"
                value={m.value}
                onChange={(e) => patchM({ value: e.target.value })}
              />
              <Input
                label="Metric label"
                value={m.label}
                onChange={(e) => patchM({ label: e.target.value })}
              />
            </div>
          )}
        />
      )}

      {onFeaturedActionChange && (
        <div className="space-y-2 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
          <span className="block text-xs font-medium text-zinc-700 dark:text-zinc-200">
            Collection footer action button
          </span>
          <Input
            label="Button label"
            placeholder="Contact sales"
            value={featuredAction?.label ?? ""}
            onChange={(e) =>
              onFeaturedActionChange(
                e.target.value.trim()
                  ? { label: e.target.value, href: featuredAction?.href ?? "/contact" }
                  : undefined
              )
            }
          />
          {featuredAction?.label &&
            (project ? (
              <LinkTargetPicker
                label="Button destination"
                value={inferHrefToLinkTarget(project, featuredAction.href)}
                project={project}
                onChange={(target) =>
                  onFeaturedActionChange({
                    label: featuredAction.label,
                    href: linkTargetToActionHref(project, target),
                  })
                }
              />
            ) : (
              <Input
                label="Button href"
                value={featuredAction.href}
                onChange={(e) =>
                  onFeaturedActionChange({
                    label: featuredAction.label,
                    href: e.target.value,
                  })
                }
              />
            ))}
        </div>
      )}
    </div>
  );
}

export function PricingPlansCrudEditor({
  project,
  plans,
  onChange,
  onJumpToPage,
}: {
  project: WebsiteProjectConfig;
  plans: LandingSectionContent["pricing"]["plans"];
  onChange: (next: LandingSectionContent["pricing"]["plans"]) => void;
  onJumpToPage?: (pageId: string, sectionAnchor?: string) => void;
}) {
  return (
    <CrudListShell<LandingSectionContent["pricing"]["plans"][number]>
      label="Pricing plans"
      items={plans}
      addLabel="Add plan"
      minItems={1}
      onCreateItem={() => ({
        id: makeUid("plan"),
        name: "Scale",
        price: "$49",
        period: "/ month",
        description: "Everything teams need to launch fast.",
        features: ["Unlimited projects", "Priority email support", "Custom domain"],
        action: { label: "Start Scale", href: "/signup" },
      })}
      duplicateItem={(item) => ({
        ...item,
        id: makeUid("plan"),
        name: `${item.name} Copy`,
      })}
      getTitle={(item) => `${item.name} · ${item.price}`}
      getSubtitle={(item) => item.period}
      onChange={onChange}
      renderFields={(item, _idx, patch) => (
        <div className="space-y-3">
          <Input
            label="Plan name"
            value={item.name}
            onChange={(e) => patch({ name: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Price"
              value={item.price}
              onChange={(e) => patch({ price: e.target.value })}
            />
            <Input
              label="Billing period"
              placeholder="/ month"
              value={item.period}
              onChange={(e) => patch({ period: e.target.value })}
            />
          </div>
          <Textarea
            label="Plan description"
            rows={2}
            value={item.description}
            onChange={(e) => patch({ description: e.target.value })}
          />
          <Textarea
            label="Included features (one per line)"
            rows={3}
            value={item.features.join("\n")}
            onChange={(e) =>
              patch({
                features: e.target.value
                  .split("\n")
                  .map((f) => f.trim())
                  .filter(Boolean),
              })
            }
          />
          <Input
            label="Plan CTA label"
            value={item.action.label}
            onChange={(e) => patch({ action: { ...item.action, label: e.target.value } })}
          />
          <LinkTargetPicker
            label="Plan CTA destination"
            value={inferHrefToLinkTarget(project, item.action.href)}
            project={project}
            onChange={(target) =>
              patch({
                action: {
                  ...item.action,
                  href: linkTargetToActionHref(project, target),
                },
              })
            }
            onJumpToPage={onJumpToPage}
          />
        </div>
      )}
    />
  );
}

export function FaqCrudEditor({
  items,
  onChange,
}: {
  items: { id: string; question: string; answer: string; group: string }[];
  onChange: (next: { id: string; question: string; answer: string; group: string }[]) => void;
}) {
  return (
    <CrudListShell<{ id: string; question: string; answer: string; group: string }>
      label="Questions & answers"
      items={items}
      addLabel="Add question"
      onCreateItem={() => ({
        id: makeUid("faq"),
        group: "General",
        question: "How quickly can our team get started?",
        answer: "Provision your workspace in under two minutes with preconfigured defaults.",
      })}
      duplicateItem={(item) => ({ ...item, id: makeUid("faq") })}
      getTitle={(item) => item.question}
      getSubtitle={(item) => item.group}
      onChange={onChange}
      renderFields={(item, _idx, patch) => (
        <div className="space-y-3">
          <Input
            label="Group / Category"
            placeholder="General, Billing, Security"
            value={item.group}
            onChange={(e) => patch({ group: e.target.value })}
          />
          <Input
            label="Question"
            value={item.question}
            onChange={(e) => patch({ question: e.target.value })}
          />
          <Textarea
            label="Answer"
            rows={3}
            value={item.answer}
            onChange={(e) => patch({ answer: e.target.value })}
          />
        </div>
      )}
    />
  );
}

export function FooterContactStatusCrud({
  project,
  footer,
  onChange,
  onJumpToPage,
}: {
  project: WebsiteProjectConfig;
  footer: WebsiteSharedFooterConfig;
  onChange: (patch: Partial<WebsiteSharedFooterConfig>) => void;
  onJumpToPage?: (pageId: string, sectionAnchor?: string) => void;
}) {
  const contactLinks = footer.contactLinks ?? [];
  const locales = footer.locales ?? [];

  return (
    <div className="space-y-5">
      <Input
        label="Contact section heading"
        placeholder="Ready to build?"
        value={footer.heading ?? ""}
        onChange={(e) => onChange({ heading: e.target.value || undefined })}
      />

      <div className="space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
        <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
          Footer primary action
        </Text>
        <Input
          label="Action label"
          placeholder="Book a walkthrough"
          value={footer.contactAction?.label ?? ""}
          onChange={(e) =>
            onChange({
              contactAction: {
                label: e.target.value,
                href: footer.contactAction?.href ?? "/contact",
              },
            })
          }
        />
        <LinkTargetPicker
          label="Action destination"
          value={inferHrefToLinkTarget(project, footer.contactAction?.href)}
          project={project}
          onChange={(target) =>
            onChange({
              contactAction: {
                label: footer.contactAction?.label || "Contact sales",
                href: linkTargetToActionHref(project, target),
              },
            })
          }
          onClear={() => onChange({ contactAction: undefined })}
          onJumpToPage={onJumpToPage}
        />
      </div>

      <CrudListShell<NonNullable<WebsiteSharedFooterConfig["contactLinks"]>[number]>
        label="Direct contact channels"
        items={contactLinks}
        addLabel="Add channel"
        onCreateItem={() => ({
          type: "email",
          label: "hello@example.com",
          href: "mailto:hello@example.com",
        })}
        getTitle={(item) => item.label}
        getSubtitle={(item) => `${item.type ?? "link"} · ${item.href}`}
        onChange={(next) => onChange({ contactLinks: next })}
        renderFields={(item, _idx, patch) => (
          <div className="space-y-2.5">
            <div className="space-y-1.5">
              <span className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
                Channel type
              </span>
              <Select
                aria-label="Channel type"
                value={item.type ?? CORE_DEFAULT_OPTION}
                onValueChange={(v) =>
                  patch({
                    type:
                      v === CORE_DEFAULT_OPTION
                        ? undefined
                        : (v as "email" | "phone" | "schedule" | "chat"),
                  })
                }
              >
                <SelectItem value={CORE_DEFAULT_OPTION}>Default</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="schedule">Schedule</SelectItem>
                <SelectItem value="chat">Chat</SelectItem>
              </Select>
            </div>
            <Input
              label="Label"
              value={item.label}
              onChange={(e) => patch({ label: e.target.value })}
            />
            <Input
              label="Href / Contact URL"
              value={item.href}
              onChange={(e) => patch({ href: e.target.value })}
            />
          </div>
        )}
      />

      <Input
        label="Office hours"
        placeholder="Mon-Fri · 9:00-18:00 UTC"
        value={footer.officeHours ?? ""}
        onChange={(e) => onChange({ officeHours: e.target.value || undefined })}
      />

      <div className="space-y-2.5 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
        <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
          Service status pill (locale-status preset)
        </Text>
        <Input
          label="Status label"
          placeholder="All systems operational"
          value={footer.status?.label ?? ""}
          onChange={(e) =>
            onChange({
              status: e.target.value
                ? {
                    label: e.target.value,
                    href: footer.status?.href ?? "/status",
                    summary: footer.status?.summary,
                  }
                : undefined,
            })
          }
        />
        <Input
          label="Status page href"
          placeholder="/status or https://status..."
          value={footer.status?.href ?? ""}
          onChange={(e) =>
            onChange({
              status: footer.status
                ? { ...footer.status, href: e.target.value }
                : { label: "System status", href: e.target.value },
            })
          }
        />
        <Input
          label="Summary"
          placeholder="99.98% uptime over 90 days"
          value={footer.status?.summary ?? ""}
          onChange={(e) =>
            onChange({
              status: footer.status
                ? { ...footer.status, summary: e.target.value || undefined }
                : undefined,
            })
          }
        />
      </div>

      <CrudListShell<NonNullable<WebsiteSharedFooterConfig["locales"]>[number]>
        label="Locales"
        items={locales}
        addLabel="Add locale"
        onCreateItem={() => ({ code: "en", label: "English", href: "/" })}
        getTitle={(item) => `${item.code.toUpperCase()} · ${item.label}`}
        getSubtitle={(item) => item.href}
        onChange={(next) => onChange({ locales: next })}
        renderFields={(item, _idx, patch) => (
          <div className="grid grid-cols-3 gap-2">
            <Input
              label="Code"
              value={item.code}
              onChange={(e) => patch({ code: e.target.value })}
            />
            <Input
              label="Label"
              value={item.label}
              onChange={(e) => patch({ label: e.target.value })}
            />
            <Input
              label="Href"
              value={item.href}
              onChange={(e) => patch({ href: e.target.value })}
            />
          </div>
        )}
      />

      {locales.length > 0 && (
        <div className="space-y-1.5">
          <span className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
            Active locale
          </span>
          <Select
            aria-label="Active footer locale"
            value={footer.activeLocale ?? CORE_DEFAULT_OPTION}
            onValueChange={(v) =>
              onChange({ activeLocale: v === CORE_DEFAULT_OPTION ? undefined : v })
            }
          >
            <SelectItem value={CORE_DEFAULT_OPTION}>Default</SelectItem>
            {locales.map((loc) => (
              <SelectItem key={loc.code} value={loc.code}>
                {loc.label} ({loc.code})
              </SelectItem>
            ))}
          </Select>
        </div>
      )}
    </div>
  );
}
