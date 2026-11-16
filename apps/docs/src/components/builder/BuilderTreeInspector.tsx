import * as React from "react";
import { Button, Text } from "@hudbird/ui";
import {
  getAboutPageSections,
  getContactPageSections,
  getLegalPageSections,
  landingSectionRegistry,
  type WebsitePage,
  type WebsiteProjectConfig,
} from "@hudbird/marketing";
import type { LandingSectionType } from "@hudbird/schemas";
import {
  ChevronDown,
  ChevronRight,
  Grid2x2,
  Image as ImageIcon,
  Layers,
  LayoutGrid,
  Link2,
  ListChecks,
  Megaphone,
  MousePointerClick,
  PanelBottom,
  PanelTop,
  Palette,
  Settings2,
  Square,
  Tag,
  Type,
} from "lucide-react";
import type { SelectedCoreNode } from "./CoreComponentEditors";
import type { InspectorTarget } from "./SectionEditorPanel";
import { scanActiveSection, type ScannedTreeNode, type TreeNodeIconKey } from "./sectionScanner";

const TREE_NODE_ICONS: Record<TreeNodeIconKey, React.ComponentType<{ className?: string }>> = {
  grid: Grid2x2,
  badge: Tag,
  heading: Type,
  text: Type,
  "primary-button": MousePointerClick,
  "secondary-button": MousePointerClick,
  media: ImageIcon,
  card: Square,
  items: ListChecks,
  links: Link2,
  brand: Layers,
};

function getSectionMeta(type: LandingSectionType) {
  return landingSectionRegistry.find((d) => d.type === type);
}

export interface BuilderTreeInspectorProps {
  project: WebsiteProjectConfig;
  page: WebsitePage;
  selectedTarget: InspectorTarget | (string & {});
  selectedNode: SelectedCoreNode;
  selectedItemIndex?: number | null;
  iframeDoc?: Document | null;
  activeSlideIndex?: number | null;
  onSelectSlide?: (idx: number) => void;
  onSelect: (
    target: InspectorTarget | (string & {}),
    node?: SelectedCoreNode,
    itemIndex?: number | null
  ) => void;
  onOpenPageSettings: () => void;
  onOpenThemeStudio: () => void;
}

export function BuilderTreeInspector({
  project,
  page,
  selectedTarget,
  selectedNode,
  selectedItemIndex = null,
  iframeDoc = null,
  activeSlideIndex = null,
  onSelectSlide,
  onSelect,
  onOpenPageSettings,
  onOpenThemeStudio,
}: BuilderTreeInspectorProps) {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>(() => ({
    [String(selectedTarget)]: true,
  }));

  const bodySections = page.sections.filter((s) => s.type !== "navbar" && s.type !== "footer");

  // Track active variant key so switching section variant auto-expands & refreshes layers
  const activeSectionVariant =
    page.sections.find((s) => s.type === selectedTarget)?.variant ?? "default";

  React.useEffect(() => {
    setExpanded((prev) => ({
      ...prev,
      [String(selectedTarget)]: true,
    }));
  }, [selectedTarget, activeSectionVariant]);

  const modularBlocks: Array<{ id: string; title: string; variant: string; enabled: boolean }> =
    React.useMemo(() => {
      if (page.template === "about") return getAboutPageSections(page);
      if (page.template === "contact") return getContactPageSections(page);
      if (page.template === "legal") return getLegalPageSections(page);
      if (page.template === "blog") {
        return [
          { id: "blog-index", title: "Article Catalog", variant: "editorial-grid", enabled: true },
        ];
      }
      if (page.template === "blog-post") {
        return [
          { id: "blog-post", title: "Article Content", variant: "reader-wide", enabled: true },
        ];
      }
      if (page.template === "pricing") {
        return [
          {
            id: "pricing-compare",
            title: "Pricing Compare",
            variant: "compare-matrix",
            enabled: page.pricingCompareEnabled !== false,
          },
        ];
      }
      return [];
    }, [page]);

  const scannedByTarget = React.useMemo(() => {
    const map = new Map<string, ReturnType<typeof scanActiveSection>>();
    const targets = [
      "navbar",
      "footer",
      ...bodySections.map((s) => s.type),
      ...modularBlocks.map((b) => b.id),
      ...(page.template === "login" || page.template === "signup" || page.template === "recovery"
        ? ["auth"]
        : []),
      ...(page.template === "dashboard" ? ["dashboard"] : []),
      ...(page.template === "not-found" ? ["not-found"] : []),
    ];
    for (const target of targets) {
      map.set(
        target,
        scanActiveSection({
          project,
          page,
          selectedTarget: target,
          selectedCoreNode: selectedTarget === target ? selectedNode : "section",
          selectedItemIndex: selectedTarget === target ? selectedItemIndex : null,
          iframeDoc: selectedTarget === target ? iframeDoc : null,
        })
      );
    }
    return map;
  }, [
    project,
    page,
    bodySections,
    modularBlocks,
    selectedTarget,
    selectedNode,
    selectedItemIndex,
    iframeDoc,
  ]);

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderScannedChildren = (targetKey: string, children: ScannedTreeNode[]) => {
    const isSectionSelected = selectedTarget === targetKey;
    return (
      <div className="ml-4 space-y-0.5 border-l border-zinc-200/90 pl-2.5 dark:border-white/10">
        {children.map((child) => {
          const Icon = TREE_NODE_ICONS[child.iconKey] ?? Layers;
          const activeLeaf =
            isSectionSelected &&
            selectedNode === child.node &&
            selectedItemIndex == null &&
            !(child.isSlideshowQueue && activeSlideIndex != null && selectedNode === "media");
          const itemLabels = child.itemLabels ?? [];
          return (
            <React.Fragment key={child.node}>
              <button
                type="button"
                onClick={() => onSelect(targetKey, child.node, null)}
                className={`flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                  activeLeaf
                    ? "bg-zinc-900 font-medium text-white dark:bg-white dark:text-zinc-950"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
                }`}
              >
                <span className="flex min-w-0 items-center gap-1.5">
                  <Icon className="h-3 w-3 shrink-0 opacity-70" />
                  <span className="truncate">{child.label}</span>
                </span>
                <span
                  className={`shrink-0 text-[10px] ${
                    activeLeaf
                      ? "text-white/75 dark:text-zinc-600"
                      : "text-zinc-400 dark:text-zinc-500"
                  }`}
                >
                  {child.coreType}
                </span>
              </button>
              {itemLabels.length > 0 && (
                <div className="ml-3 space-y-0.5 border-l border-zinc-200/70 pl-2 dark:border-white/[0.08]">
                  {itemLabels.map((itemLabel, idx) => {
                    const itemActive =
                      isSectionSelected &&
                      (child.isSlideshowQueue
                        ? (activeSlideIndex ?? 0) === idx && selectedNode === "media"
                        : selectedItemIndex === idx);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (child.isSlideshowQueue) {
                            onSelectSlide?.(idx);
                            iframeDoc?.dispatchEvent(
                              new CustomEvent("hb:hero-select-slide", {
                                detail: { index: idx },
                              })
                            );
                            onSelect(targetKey, "media", idx);
                          } else {
                            onSelect(targetKey, child.itemSelectNode ?? "card", idx);
                          }
                        }}
                        className={`flex w-full items-center justify-between gap-2 rounded-md px-2 py-1 text-left text-[11px] transition-colors ${
                          itemActive
                            ? "bg-indigo-600 font-medium text-white dark:bg-indigo-500 dark:text-white"
                            : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
                        }`}
                      >
                        <span className="truncate">
                          #{idx + 1} · {itemLabel || `Item ${idx + 1}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const renderChromeTreeNode = (
    slot: "navbar" | "footer",
    label: string,
    variantLabel: string,
    Icon: React.ComponentType<{ className?: string }>
  ) => {
    const children = scannedByTarget.get(slot)?.treeNodes ?? [];
    const isSelected = selectedTarget === slot;
    const isRootActive = isSelected && selectedNode === "section";
    const isExpanded = Boolean(expanded[slot]);
    const isCustom = page.sharedMode?.[slot] === "custom";
    return (
      <div key={slot} className="space-y-0.5">
        <div
          className={`flex items-center gap-1 rounded-lg px-1.5 py-1.5 transition-colors ${
            isRootActive
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
              : isSelected
                ? "bg-zinc-100 text-zinc-950 dark:bg-white/[0.08] dark:text-white"
                : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/[0.05]"
          }`}
        >
          <button
            type="button"
            aria-label={`Toggle ${label} children`}
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand(slot);
            }}
            className="rounded p-0.5 opacity-70 hover:opacity-100"
          >
            {isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setExpanded((prev) => ({ ...prev, [slot]: true }));
              onSelect(slot, "section", null);
            }}
            className="flex min-w-0 flex-1 items-center justify-between gap-2 text-left text-xs font-medium"
          >
            <span className="flex min-w-0 items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 shrink-0 opacity-70" />
              <span className="truncate">{label}</span>
              {isCustom && (
                <span
                  className={`rounded px-1 text-[9px] font-semibold uppercase ${
                    isRootActive
                      ? "bg-white/20 text-white dark:bg-zinc-900/15 dark:text-zinc-900"
                      : "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300"
                  }`}
                >
                  Custom
                </span>
              )}
            </span>
            <span
              className={`truncate text-[10px] font-normal ${
                isRootActive
                  ? "text-white/75 dark:text-zinc-600"
                  : "text-zinc-400 dark:text-zinc-500"
              }`}
            >
              {variantLabel}
            </span>
          </button>
        </div>
        {isExpanded && children.length > 0 && renderScannedChildren(slot, children)}
      </div>
    );
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Calm active context bar */}
      <div className="space-y-2.5 rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              {page.name}
            </div>
            <div className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
              {page.path} · {page.template}
            </div>
          </div>
          <span className="shrink-0 text-[10px] font-medium text-zinc-500 uppercase dark:text-zinc-400">
            Tree
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onOpenPageSettings}
            startContent={<Settings2 className="h-3 w-3" />}
          >
            Page settings
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onOpenThemeStudio}
            startContent={<Palette className="h-3 w-3" />}
          >
            Theme tokens
          </Button>
        </div>
      </div>

      {/* Global Chrome */}
      <div className="space-y-1.5">
        <div className="px-1 text-[10px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
          Shared Chrome
        </div>

        <button
          type="button"
          onClick={() => onSelect("announcement", "section")}
          className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${
            selectedTarget === "announcement"
              ? "bg-zinc-900 font-medium text-white dark:bg-white dark:text-zinc-950"
              : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/[0.05]"
          }`}
        >
          <span className="flex min-w-0 items-center gap-2">
            <Megaphone className="h-3.5 w-3.5 shrink-0 opacity-70" />
            <span className="truncate">Announcement Bar</span>
          </span>
          <span
            className={`text-[10px] ${
              selectedTarget === "announcement"
                ? "text-white/75 dark:text-zinc-600"
                : "text-zinc-400 dark:text-zinc-500"
            }`}
          >
            {project.shared?.announcement?.enabled ? "On" : "Off"}
          </span>
        </button>

        {page.sharedMode?.navbar !== "hidden" &&
          renderChromeTreeNode(
            "navbar",
            "Navbar",
            (page.sharedMode?.navbar === "custom"
              ? page.sections.find((s) => s.type === "navbar")?.variant
              : project.shared?.navbar?.selection.variant) ?? "simple",
            PanelTop
          )}
      </div>

      {/* Page Body Sections + Dynamic Scanned Children + Modular Blocks */}
      <div className="space-y-1.5">
        <div className="px-1 text-[10px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
          Page Sections
        </div>

        {(page.template === "login" ||
          page.template === "signup" ||
          page.template === "recovery") &&
          (() => {
            const children = scannedByTarget.get("auth")?.treeNodes ?? [];
            const isExpanded = expanded["auth"] ?? selectedTarget === "auth";
            return (
              <div className="space-y-1">
                <div
                  className={`flex w-full items-center gap-1 rounded-lg px-2 py-2 text-xs transition-colors ${
                    selectedTarget === "auth" && selectedNode === "section"
                      ? "bg-zinc-900 font-medium text-white dark:bg-white dark:text-zinc-950"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/[0.05]"
                  }`}
                >
                  {children.length > 0 && (
                    <button
                      type="button"
                      aria-label="Toggle auth children"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand("auth");
                      }}
                      className="rounded p-0.5 opacity-70 hover:opacity-100"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5" />
                      )}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onSelect("auth", "section", null)}
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                  >
                    <LayoutGrid className="h-3.5 w-3.5 shrink-0 opacity-70" />
                    <span>Authentication Flow</span>
                  </button>
                </div>
                {isExpanded && children.length > 0 && renderScannedChildren("auth", children)}
              </div>
            );
          })()}

        {page.template === "dashboard" &&
          (() => {
            const children = scannedByTarget.get("dashboard")?.treeNodes ?? [];
            const isExpanded = expanded["dashboard"] ?? selectedTarget === "dashboard";
            return (
              <div className="space-y-1">
                <div
                  className={`flex w-full items-center gap-1 rounded-lg px-2 py-2 text-xs transition-colors ${
                    selectedTarget === "dashboard" && selectedNode === "section"
                      ? "bg-zinc-900 font-medium text-white dark:bg-white dark:text-zinc-950"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/[0.05]"
                  }`}
                >
                  {children.length > 0 && (
                    <button
                      type="button"
                      aria-label="Toggle dashboard children"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand("dashboard");
                      }}
                      className="rounded p-0.5 opacity-70 hover:opacity-100"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5" />
                      )}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onSelect("dashboard", "section", null)}
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                  >
                    <LayoutGrid className="h-3.5 w-3.5 shrink-0 opacity-70" />
                    <span>Dashboard Shell</span>
                  </button>
                </div>
                {isExpanded && children.length > 0 && renderScannedChildren("dashboard", children)}
              </div>
            );
          })()}

        {page.template === "not-found" &&
          (() => {
            const children = scannedByTarget.get("not-found")?.treeNodes ?? [];
            const isExpanded = expanded["not-found"] ?? selectedTarget === "not-found";
            return (
              <div className="space-y-1">
                <div
                  className={`flex w-full items-center gap-1 rounded-lg px-2 py-2 text-xs transition-colors ${
                    selectedTarget === "not-found" && selectedNode === "section"
                      ? "bg-zinc-900 font-medium text-white dark:bg-white dark:text-zinc-950"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/[0.05]"
                  }`}
                >
                  {children.length > 0 && (
                    <button
                      type="button"
                      aria-label="Toggle 404 children"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand("not-found");
                      }}
                      className="rounded p-0.5 opacity-70 hover:opacity-100"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5" />
                      )}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onSelect("not-found", "section", null)}
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                  >
                    <Layers className="h-3.5 w-3.5 shrink-0 opacity-70" />
                    <span>Not Found (404)</span>
                  </button>
                </div>
                {isExpanded && children.length > 0 && renderScannedChildren("not-found", children)}
              </div>
            );
          })()}

        {modularBlocks.map((block) => {
          const isBlockSelected = selectedTarget === block.id;
          const isBlockRootActive = isBlockSelected && selectedNode === "section";
          const children = scannedByTarget.get(block.id)?.treeNodes ?? [];
          const isExpanded = expanded[block.id] ?? isBlockSelected;
          return (
            <div key={block.id} className="space-y-1">
              <div
                className={`flex w-full items-center gap-1 rounded-lg px-2 py-2 text-xs transition-colors ${
                  isBlockRootActive
                    ? "bg-zinc-900 font-medium text-white dark:bg-white dark:text-zinc-950"
                    : isBlockSelected
                      ? "bg-zinc-200/80 font-medium text-zinc-900 dark:bg-white/[0.12] dark:text-white"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/[0.05]"
                } ${!block.enabled ? "opacity-55" : ""}`}
              >
                {children.length > 0 && (
                  <button
                    type="button"
                    aria-label={`Toggle ${block.title} children`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(block.id);
                    }}
                    className="rounded p-0.5 opacity-70 hover:opacity-100"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5" />
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onSelect(block.id, "section", null)}
                  className="flex min-w-0 flex-1 items-center justify-between gap-2 text-left"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Layers className="h-3.5 w-3.5 shrink-0 opacity-70" />
                    <span className="truncate">{block.title}</span>
                  </span>
                  <span
                    className={`truncate text-[10px] ${
                      isBlockRootActive
                        ? "text-white/75 dark:text-zinc-600"
                        : "text-zinc-400 dark:text-zinc-500"
                    }`}
                  >
                    {block.enabled ? block.variant : "Hidden"}
                  </span>
                </button>
              </div>
              {isExpanded && children.length > 0 && renderScannedChildren(block.id, children)}
            </div>
          );
        })}

        {bodySections.length === 0 &&
        modularBlocks.length === 0 &&
        page.template !== "login" &&
        page.template !== "signup" &&
        page.template !== "recovery" &&
        page.template !== "dashboard" &&
        page.template !== "not-found" ? (
          <div className="rounded-xl border border-dashed border-zinc-200 px-3 py-3 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
            No body sections yet. Click Sections to add one.
          </div>
        ) : (
          bodySections.map((sec) => {
            const meta = getSectionMeta(sec.type);
            const profile = scannedByTarget.get(sec.type);
            const children = profile?.treeNodes ?? [];
            const isSectionSelected = selectedTarget === sec.type;
            const isSectionRootActive =
              isSectionSelected && selectedNode === "section" && selectedItemIndex == null;
            const isExpanded = Boolean(expanded[sec.type]) && children.length > 0;

            return (
              <div key={sec.type} className="space-y-0.5">
                <div
                  className={`flex items-center gap-1 rounded-lg px-1.5 py-1.5 transition-colors ${
                    isSectionRootActive
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                      : isSectionSelected
                        ? "bg-zinc-100 text-zinc-950 dark:bg-white/[0.08] dark:text-white"
                        : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/[0.05]"
                  } ${!sec.enabled ? "opacity-55" : ""}`}
                >
                  {children.length > 0 ? (
                    <button
                      type="button"
                      aria-label={`Toggle ${meta?.title ?? sec.type} children`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(sec.type);
                      }}
                      className="rounded p-0.5 opacity-70 hover:opacity-100"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5" />
                      )}
                    </button>
                  ) : (
                    <span className="w-4.5" />
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setExpanded((prev) => ({ ...prev, [sec.type]: true }));
                      onSelect(sec.type, "section", null);
                    }}
                    className="flex min-w-0 flex-1 items-center justify-between gap-2 text-left text-xs font-medium"
                  >
                    <span className="truncate">{meta?.title ?? sec.type}</span>
                    <span
                      className={`truncate text-[10px] font-normal ${
                        isSectionRootActive
                          ? "text-white/75 dark:text-zinc-600"
                          : "text-zinc-400 dark:text-zinc-500"
                      }`}
                    >
                      {sec.enabled ? sec.variant : "Hidden"}
                    </span>
                  </button>
                </div>

                {isExpanded && renderScannedChildren(sec.type, children)}
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {page.sharedMode?.footer !== "hidden" && (
        <div className="space-y-1.5">
          <div className="px-1 text-[10px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
            Shared Footer
          </div>
          {renderChromeTreeNode(
            "footer",
            "Footer",
            (page.sharedMode?.footer === "custom"
              ? page.sections.find((s) => s.type === "footer")?.variant
              : project.shared?.footer?.selection.variant) ?? "columns",
            PanelBottom
          )}
        </div>
      )}

      <Text variant="small" className="px-1 text-[11px] text-zinc-500 dark:text-zinc-400">
        Select any section or component to edit its details in the right inspector drawer.
      </Text>
    </div>
  );
}
