import * as React from "react";
import { NavLink } from "react-router-dom";
import { Button, Heading, Select, SelectItem, Switch, Text } from "@hudbird/ui";
import {
  SaasLandingPage,
  LandingSectionPreview,
  landingSectionRegistry,
  createLandingPageConfig,
  parseLandingPageConfig,
  moveLandingSection,
  createLandingPageCode,
  createLandingPageRecipe,
  formaLandingContent,
} from "@hudbird/marketing";
import type {
  LandingPageConfig,
  LandingSectionSelection,
  LandingSectionType,
} from "@hudbird/schemas";
import { SectionContextMenu } from "../../components/landing/SectionContextMenu";
import { VariantHoverPreview } from "../../components/landing/VariantHoverPreview";
import type { ContextMenuSectionInfo } from "../../components/IframePreview";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronRight,
  Code2,
  Copy,
  Download,
  Eye,
  Menu,
  Monitor,
  MoreHorizontal,
  Palette,
  PanelLeft,
  RotateCcw,
  Smartphone,
  Tablet,
  Sliders,
  Layers,
  ArrowLeft,
} from "lucide-react";
import { IframePreview } from "../../components/IframePreview";
import { LandingBrandControls } from "../../components/landing/LandingBrandControls";
import { BlockVariantsInspector } from "../../components/landing/BlockVariantsInspector";
import { SectionThumbnailCard } from "../../components/landing/SectionThumbnailCard";
import changelogData from "../../data/changelog.json";
import { useWebsiteMode } from "../../lib/useWebsiteMode";

const storageKey = "hudbird-landing-builder:v2";

function restore() {
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved)
      return { config: createLandingPageConfig(), message: "Choose a layout for each section." };
    const config = parseLandingPageConfig(JSON.parse(saved));
    if (config) return { config, message: "Your saved page has been restored." };
    return {
      config: createLandingPageConfig(),
      message: "The saved layout could not be restored. Starting with the Hudbird UI example.",
    };
  } catch {
    return {
      config: createLandingPageConfig(),
      message: "Browser storage is unavailable. Download JSON to keep your choices.",
    };
  }
}

type ViewportPreset = "desktop" | "tablet" | "mobile";

const viewportWidths: Record<ViewportPreset, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
};

interface HoveredVariantPreview {
  type: LandingSectionType;
  title: string;
  variantId: string;
  variantName: string;
  variantDescription: string;
  top: number;
}

export default function LandingBuilderDoc() {
  const [initial] = React.useState(restore);
  const [config, setConfig] = React.useState<LandingPageConfig>(initial.config);
  const [status, setStatus] = React.useState(initial.message);
  const [viewport, setViewport] = React.useState<ViewportPreset>("desktop");
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [isSidebarHidden, setIsSidebarHidden] = React.useState(false);
  const [isTopBarHidden, setIsTopBarHidden] = React.useState(false);
  const topBarTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);
  const [isBrandPanelOpen, setIsBrandPanelOpen] = React.useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = React.useState(false);
  const [openThreeDotSection, setOpenThreeDotSection] = React.useState<LandingSectionType | null>(
    null
  );
  const [collapsedGroups, setCollapsedGroups] = React.useState<Record<string, boolean>>({});
  const [hoveredVariant, setHoveredVariant] = React.useState<HoveredVariantPreview | null>(null);
  const [sidebarTab, setSidebarTab] = React.useState<"sections" | "inspector">("sections");
  const [inspectedSectionType, setInspectedSectionType] =
    React.useState<LandingSectionType>("navbar");
  const [contextMenu, setContextMenu] = React.useState<{
    isOpen: boolean;
    sectionType: LandingSectionType | null;
    position: { x: number; y: number };
  }>({
    isOpen: false,
    sectionType: null,
    position: { x: 0, y: 0 },
  });
  const [scrollTarget, setScrollTarget] = React.useState<{ type: string; nonce: number } | null>(
    null
  );

  const triggerScrollToSection = React.useCallback((type: string) => {
    setScrollTarget({ type, nonce: Date.now() });
  }, []);

  const websiteMode = useWebsiteMode();
  const resolvedBrand = {
    ...config.brand,
    mode: config.themeMode === "auto" ? websiteMode : config.themeMode,
  };

  // Auto-hide Top Bar after 2.5s when sidebar is closed for immersive fullscreen preview
  React.useEffect(() => {
    if (isSidebarHidden) {
      topBarTimerRef.current = setTimeout(() => {
        setIsTopBarHidden(true);
      }, 2500);
    } else {
      if (topBarTimerRef.current) clearTimeout(topBarTimerRef.current);
      setIsTopBarHidden(false);
    }
    return () => {
      if (topBarTimerRef.current) clearTimeout(topBarTimerRef.current);
    };
  }, [isSidebarHidden]);

  React.useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(config));
    } catch {
      setStatus("Unable to save locally. Download JSON to keep your choices.");
    }
  }, [config]);

  const source = createLandingPageCode(config);
  const recipe = createLandingPageRecipe(config, formaLandingContent);

  const update = (type: LandingSectionType, patch: Record<string, unknown>) =>
    setConfig((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.type === type ? ({ ...section, ...patch } as LandingSectionSelection) : section
      ),
    }));

  async function copy() {
    try {
      await navigator.clipboard.writeText(source);
      setStatus("React code copied.");
      setIsExportMenuOpen(false);
    } catch {
      setStatus("Clipboard unavailable. Use Download React instead.");
    }
  }

  const toggleGroupCollapse = (type: LandingSectionType) => {
    setCollapsedGroups((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handlePreviewClick = React.useCallback(() => {
    setIsSidebarHidden(true);
    setIsTopBarHidden(true);
    if (topBarTimerRef.current) {
      clearTimeout(topBarTimerRef.current);
    }
    setIsBrandPanelOpen(false);
    setIsExportMenuOpen(false);
    setContextMenu((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Auto-hide top nav when window/workspace scrolls
  React.useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 20) {
        setIsTopBarHidden(true);
        if (topBarTimerRef.current) clearTimeout(topBarTimerRef.current);
      }
    };
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  const handleContextMenuSection = React.useCallback((info: ContextMenuSectionInfo) => {
    setContextMenu({
      isOpen: true,
      sectionType: info.sectionType as LandingSectionType,
      position: { x: info.x, y: info.y },
    });
  }, []);

  const handleSelectVariantFromContext = (type: LandingSectionType, variantId: string) => {
    update(type, { variant: variantId });
    setStatus(`Updated ${type} layout to ${variantId}.`);
    triggerScrollToSection(type);
  };

  const handleOpenInspectorFromContext = (type: LandingSectionType) => {
    setInspectedSectionType(type);
    setSidebarTab("inspector");
    setIsSidebarHidden(false);
    triggerScrollToSection(type);
  };

  const handleToggleEnabledFromContext = (type: LandingSectionType) => {
    const sec = config.sections.find((s) => s.type === type);
    if (sec) {
      update(type, { enabled: !sec.enabled });
      setStatus(`${type} is now ${!sec.enabled ? "visible" : "hidden"}.`);
    }
  };

  const handleMoveOrderFromContext = (type: LandingSectionType, direction: "up" | "down") => {
    setConfig((current) => moveLandingSection(current, type, direction === "up" ? -1 : 1));
    setStatus(`${type} moved ${direction}.`);
  };

  const exitFullscreen = React.useCallback(() => {
    if (isSidebarHidden || isTopBarHidden) {
      if (topBarTimerRef.current) clearTimeout(topBarTimerRef.current);
      setIsSidebarHidden(false);
      setIsTopBarHidden(false);
      setStatus("Exited fullscreen mode.");
    }
  }, [isSidebarHidden, isTopBarHidden]);

  // Global Escape key listener to exit fullscreen mode & restore top bar & sidebar
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (contextMenu.isOpen) {
          setContextMenu((prev) => ({ ...prev, isOpen: false }));
          return;
        }
        exitFullscreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [contextMenu.isOpen, exitFullscreen]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-zinc-900 antialiased transition-colors duration-300 dark:bg-[#161618] dark:text-[#e5e5e5]">
      {/* Accessible Page Title */}
      <Heading as="h1" className="sr-only">
        One page. Your arrangement.
      </Heading>
      <Text role="status" aria-live="polite" className="sr-only">
        {status}
      </Text>

      {/* 1. LEFT SIDEBAR (Tabbed: Sections Visual Cards vs Granular Inspector) */}
      <aside
        aria-label="Section library"
        className={`fixed top-3 bottom-3 left-3 z-50 flex w-72 flex-col overflow-hidden rounded-xl bg-white/85 px-3.5 py-4 backdrop-blur-3xl transition-transform duration-300 ease-in-out sm:w-80 dark:bg-[#161618]/90 ${
          isSidebarHidden
            ? "-translate-x-[120%]"
            : isMobileDrawerOpen
              ? "translate-x-0 shadow-2xl"
              : "-translate-x-[120%] lg:translate-x-0"
        }`}
      >
        {/* Header / Logo & Version Badge (Spacious spacing matching docs sidebar) */}
        <div className="relative z-10 mb-6 flex items-center justify-between px-2 pt-2 sm:mb-7">
          <NavLink
            to="/docs"
            className="flex items-center gap-2 overflow-hidden transition-opacity hover:opacity-80"
          >
            <img
              src="/assets/logo/hudbird-logo-black.png"
              alt="Hudbird UI"
              className="h-6 w-auto object-contain dark:hidden"
            />
            <img
              src="/assets/logo/hudbird-logo-white.png"
              alt="Hudbird UI"
              className="hidden h-6 w-auto object-contain dark:block"
            />
            <span className="ml-1 rounded-full bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-800/80 dark:text-zinc-400">
              v{changelogData[0]?.version || "1.5.0"}
            </span>
          </NavLink>
        </div>

        {/* Tab Switcher: Sections (Visual Cards) vs Inspector (Advanced Settings) */}
        <div className="relative z-10 mb-3.5 grid grid-cols-2 gap-1 rounded-lg border border-zinc-200/80 bg-zinc-100/70 p-1 dark:border-white/10 dark:bg-zinc-900/60">
          <button
            type="button"
            onClick={() => setSidebarTab("sections")}
            className={`flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-semibold transition-all ${
              sidebarTab === "sections"
                ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#28292d] dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Sections</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSidebarTab("inspector");
              triggerScrollToSection(inspectedSectionType);
            }}
            className={`flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-semibold transition-all ${
              sidebarTab === "inspector"
                ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#28292d] dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Inspector</span>
          </button>
        </div>

        {/* TAB 1: SECTIONS LIST (Visual Mini-Cards Wireframe) */}
        {sidebarTab === "sections" && (
          <div
            id="builder-sections"
            className="scrollbar-hide relative z-10 flex-1 space-y-2.5 overflow-x-hidden overflow-y-auto pr-1"
          >
            <div className="flex items-center justify-between px-1 pb-1">
              <span className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                Page Blocks ({config.sections.length})
              </span>
              <span className="text-[10px] text-zinc-400">Click to tune</span>
            </div>

            {config.sections.map((selection, index) => (
              <SectionThumbnailCard
                key={selection.type}
                selection={selection}
                index={index}
                totalSections={config.sections.length}
                isSelected={inspectedSectionType === selection.type}
                onSelect={() => {
                  setInspectedSectionType(selection.type);
                  setSidebarTab("inspector");
                  triggerScrollToSection(selection.type);
                }}
                onToggleEnabled={(enabled) => {
                  update(selection.type, { enabled });
                  setStatus(`${selection.type} ${enabled ? "shown" : "hidden"}.`);
                }}
                onMoveUp={
                  selection.type !== "navbar" && selection.type !== "footer"
                    ? () => {
                        setConfig((current) => moveLandingSection(current, selection.type, -1));
                        setStatus(`${selection.type} moved up.`);
                      }
                    : undefined
                }
                onMoveDown={
                  selection.type !== "navbar" && selection.type !== "footer"
                    ? () => {
                        setConfig((current) => moveLandingSection(current, selection.type, 1));
                        setStatus(`${selection.type} moved down.`);
                      }
                    : undefined
                }
              />
            ))}
          </div>
        )}

        {/* TAB 2: INSPECTOR (Premade Layout Blocks with Live Hover Preview) */}
        {sidebarTab === "inspector" && (
          <div
            id="builder-inspector"
            className="scrollbar-hide relative z-10 flex-1 overflow-x-hidden overflow-y-auto pr-1"
          >
            <BlockVariantsInspector
              sectionType={inspectedSectionType}
              currentVariant={
                config.sections.find((s) => s.type === inspectedSectionType)?.variant ?? ""
              }
              isEnabled={
                config.sections.find((s) => s.type === inspectedSectionType)?.enabled !== false
              }
              onSelectVariant={(variantId) => {
                update(inspectedSectionType, { variant: variantId, enabled: true });
                setStatus(`${inspectedSectionType} layout set to ${variantId}.`);
                triggerScrollToSection(inspectedSectionType);
              }}
              onHoverVariant={setHoveredVariant}
              onToggleEnabled={(enabled) => {
                update(inspectedSectionType, { enabled });
                setStatus(`${inspectedSectionType} ${enabled ? "shown" : "hidden"}.`);
              }}
              onBack={() => setSidebarTab("sections")}
            />
          </div>
        )}
      </aside>

      {/* 1. FLOATING HIGH-FIDELITY ISOLATED HOVER PREVIEW */}
      <VariantHoverPreview
        hoveredVariant={hoveredVariant && !isSidebarHidden ? hoveredVariant : null}
        content={formaLandingContent}
        brand={resolvedBrand}
      />

      {/* 2. macOS-Style Left Edge Hotspot: Hover cursor to left edge to reveal Sidebar */}
      {isSidebarHidden && (
        <div
          className="group fixed top-0 bottom-0 left-0 z-40 w-6 cursor-pointer"
          onMouseEnter={() => setIsSidebarHidden(false)}
          title="Hover to open sidebar"
        >
          <div className="absolute top-1/2 left-0.5 flex h-24 w-1.5 -translate-y-1/2 items-center justify-center rounded-r-full bg-zinc-400/40 backdrop-blur-md transition-all group-hover:w-3 group-hover:bg-zinc-700/80 dark:bg-white/20 dark:group-hover:bg-white/60" />
        </div>
      )}

      {/* 3. macOS-Style Top Edge Hotspot: Hover cursor to top edge to reveal Top Controls */}
      <div
        className={`group fixed top-0 right-0 z-50 h-6 cursor-pointer transition-all ${
          isSidebarHidden ? "left-0" : "left-0 lg:left-[20.5rem]"
        } ${isTopBarHidden ? "pointer-events-auto" : "pointer-events-none"}`}
        onMouseEnter={() => {
          if (topBarTimerRef.current) clearTimeout(topBarTimerRef.current);
          setIsTopBarHidden(false);
        }}
        title="Hover to reveal top controls (or press Esc)"
      >
        {isTopBarHidden && (
          <div className="mx-auto mt-0.5 flex h-1.5 w-20 items-center justify-center rounded-full bg-zinc-400/40 backdrop-blur-md transition-all group-hover:w-32 group-hover:bg-zinc-700/80 dark:bg-white/20 dark:group-hover:bg-white/60" />
        )}
      </div>

      {/* Mobile Sidebar Backdrop */}
      {isMobileDrawerOpen && !isSidebarHidden && (
        <div
          className="fixed inset-0 z-40 bg-zinc-950/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 4. MAIN WORKSPACE */}
      <main
        className={`flex min-h-screen min-w-0 flex-1 flex-col transition-all duration-300 ease-in-out ${
          isSidebarHidden ? "lg:pl-0" : "lg:pl-[20.5rem]"
        }`}
      >
        {/* TOP NAVBAR (macOS Auto-Hide animated fixed header) */}
        <header
          onMouseEnter={() => {
            if (topBarTimerRef.current) clearTimeout(topBarTimerRef.current);
            setIsTopBarHidden(false);
          }}
          onMouseLeave={() => {
            if (isSidebarHidden) {
              topBarTimerRef.current = setTimeout(() => setIsTopBarHidden(true), 3000);
            }
          }}
          className={`fixed top-0 right-0 z-50 bg-white/85 backdrop-blur-3xl transition-all duration-300 ease-in-out dark:bg-[#161618]/90 ${
            isSidebarHidden ? "left-0" : "left-0 lg:left-[20.5rem]"
          } ${
            isTopBarHidden
              ? "pointer-events-none -translate-y-full opacity-0"
              : "translate-y-0 opacity-100 shadow-xs"
          }`}
        >
          <div className="flex h-14 items-center justify-between gap-3 px-4 sm:gap-6 sm:px-8 lg:px-12">
            {/* Left: Sidebar Toggle & Breadcrumbs (Matches Docs Header.tsx) */}
            <div className="flex shrink-0 items-center gap-3">
              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => {
                  setIsSidebarHidden(false);
                  setIsMobileDrawerOpen(!isMobileDrawerOpen);
                }}
                className="-ml-1.5 rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-black/5 hover:text-zinc-900 lg:hidden dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100"
                aria-label="Open sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Desktop Hide/Show Sidebar Toggle */}
              <button
                type="button"
                onClick={() => setIsSidebarHidden(!isSidebarHidden)}
                className="-ml-1.5 hidden rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-black/5 hover:text-zinc-900 lg:flex dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100"
                aria-label="Toggle sidebar"
                title={isSidebarHidden ? "Show sidebar" : "Hide sidebar"}
              >
                <PanelLeft className="h-4 w-4" />
              </button>

              {/* Header Breadcrumbs */}
              <div className="flex items-center gap-2 text-sm font-medium tracking-tight">
                <span className="text-zinc-500 dark:text-zinc-400">Marketing Sections</span>
                <ChevronRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-600" />
                <span className="text-zinc-900 dark:text-zinc-100">Page Builder</span>
              </div>
            </div>

            {/* Right: Responsive Icons, Preview/Code, Brand Theme, & 1 Export Dropdown Button */}
            <div className="flex shrink-0 items-center gap-2 text-sm font-medium sm:gap-2.5">
              {/* Responsive Viewport Icons */}
              <div
                className="flex items-center gap-0.5 rounded-xl border border-black/[0.06] bg-zinc-100/80 p-0.5 dark:border-white/[0.08] dark:bg-[#121214]"
                role="group"
                aria-label="Responsive viewport"
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("preview");
                    setViewport("desktop");
                  }}
                  aria-label="Desktop viewport"
                  className={`rounded-lg p-1.5 transition-colors ${
                    viewport === "desktop" && activeTab === "preview"
                      ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#28292d] dark:text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  <Monitor className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("preview");
                    setViewport("tablet");
                  }}
                  aria-label="Tablet viewport"
                  className={`rounded-lg p-1.5 transition-colors ${
                    viewport === "tablet" && activeTab === "preview"
                      ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#28292d] dark:text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  <Tablet className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("preview");
                    setViewport("mobile");
                  }}
                  aria-label="Mobile viewport"
                  className={`rounded-lg p-1.5 transition-colors ${
                    viewport === "mobile" && activeTab === "preview"
                      ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#28292d] dark:text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Preview / Code Switcher */}
              <div className="hidden items-center gap-0.5 rounded-xl border border-black/[0.06] bg-zinc-100/80 p-0.5 sm:flex dark:border-white/[0.08] dark:bg-[#121214]">
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                    activeTab === "preview"
                      ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#28292d] dark:text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("code")}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                    activeTab === "code"
                      ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#28292d] dark:text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5" />
                  <span>Code</span>
                </button>
              </div>

              {/* Theme & Brand Button */}
              <button
                type="button"
                onClick={() => setIsBrandPanelOpen(!isBrandPanelOpen)}
                aria-label="Brand and preview theme"
                title="Brand and preview theme"
                className={`flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-medium transition-colors ${
                  isBrandPanelOpen
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900"
                    : "border-black/[0.08] bg-white text-zinc-700 hover:bg-zinc-50 dark:border-white/[0.08] dark:bg-[#1e1e22] dark:text-zinc-200"
                }`}
              >
                <Palette className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Theme</span>
              </button>

              {/* Single Export Button with Dropdown */}
              <div id="builder-export" className="relative">
                <button
                  type="button"
                  onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-zinc-900 px-3 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export</span>
                  <ChevronDown className="h-3 w-3 opacity-70" />
                </button>

                <div
                  className={
                    isExportMenuOpen
                      ? "absolute top-full right-0 z-50 mt-2 flex w-52 flex-col gap-1 rounded-xl border border-zinc-200/90 bg-white p-1.5 shadow-xl dark:border-white/[0.1] dark:bg-[#1e1e22]"
                      : "fixed right-2 bottom-1 z-[100] flex h-2 items-center gap-1 overflow-hidden opacity-0"
                  }
                >
                  <button
                    type="button"
                    onClick={copy}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/[0.08]"
                  >
                    <Copy className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Copy React</span>
                  </button>

                  <a
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(source)}`}
                    download="App.tsx"
                    onClick={() => setIsExportMenuOpen(false)}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/[0.08]"
                  >
                    <Download className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Download React</span>
                  </a>

                  <a
                    href={`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(config, null, 2))}`}
                    download="hudbird-landing.json"
                    onClick={() => setIsExportMenuOpen(false)}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/[0.08]"
                  >
                    <Download className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Download JSON</span>
                  </a>

                  <a
                    href={`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(recipe, null, 2))}`}
                    download="hudbird-page.recipe.json"
                    onClick={() => setIsExportMenuOpen(false)}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/[0.08]"
                  >
                    <Download className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Download recipe</span>
                  </a>

                  <div className="my-0.5 h-px bg-zinc-100 dark:bg-white/[0.06]" />

                  <button
                    type="button"
                    onClick={() => {
                      setConfig(createLandingPageConfig());
                      setStatus("Reset to the Hudbird UI example.");
                      setIsExportMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/[0.08]"
                  >
                    <RotateCcw className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Reset layout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Collapsible Brand & Theme Controls Panel */}
          {isBrandPanelOpen && (
            <div
              id="builder-brand"
              className="border-t border-zinc-200/80 bg-zinc-50/95 px-4 py-4 sm:px-8 lg:px-12 dark:border-white/[0.08] dark:bg-[#141417]"
            >
              <LandingBrandControls
                brand={config.brand}
                onChange={(brand) => setConfig({ ...config, brand })}
                themeMode={config.themeMode}
                onThemeChange={(themeMode) => setConfig({ ...config, themeMode })}
              />
            </div>
          )}
        </header>

        {/* Header spacer when not fullscreen */}
        <div
          className={`w-full shrink-0 transition-all duration-300 ${
            isSidebarHidden ? "h-0" : "h-14"
          }`}
          aria-hidden="true"
        />

        {/* CENTER FULL WEBSITE PREVIEW CANVAS */}
        <div
          id="builder-workspace"
          onPointerDown={(e) => {
            if (e.button === 0) handlePreviewClick();
          }}
          className={`flex flex-1 flex-col items-center transition-all duration-300 ${
            isSidebarHidden && viewport === "desktop"
              ? "m-0 w-full p-0"
              : `px-4 pb-8 sm:px-8 lg:px-12 ${isTopBarHidden ? "pt-4" : "pt-2"}`
          }`}
        >
          {activeTab === "preview" ? (
            <div
              className={`w-full overflow-hidden transition-all duration-300 ${
                isSidebarHidden && viewport === "desktop"
                  ? "rounded-none border-0 bg-transparent shadow-none"
                  : "rounded-2xl border border-black/[0.08] bg-white shadow-xs dark:border-white/[0.08] dark:bg-[#161618]"
              }`}
              style={{
                maxWidth:
                  isSidebarHidden && viewport === "desktop" ? "100%" : viewportWidths[viewport],
              }}
            >
              <IframePreview
                flush
                minHeight={0}
                onPreviewClick={handlePreviewClick}
                onContextMenuSection={handleContextMenuSection}
                onEscape={exitFullscreen}
                scrollToSection={scrollTarget}
              >
                <SaasLandingPage
                  config={config}
                  content={formaLandingContent}
                  className="flex min-h-0 w-full flex-col justify-start"
                />
              </IframePreview>
            </div>
          ) : (
            <div
              id="builder-source-preview"
              className="w-full overflow-hidden rounded-2xl border border-black/[0.08] bg-zinc-950 text-zinc-100 shadow-xs dark:border-white/[0.08]"
            >
              <pre className="max-h-[82dvh] overflow-auto p-5 font-mono text-xs leading-relaxed text-zinc-100">
                <code>{source}</code>
              </pre>
            </div>
          )}
        </div>
      </main>

      {/* 5. Section Right-Click Context Menu (Maximum z-index: z-[999999]) */}
      <SectionContextMenu
        isOpen={contextMenu.isOpen}
        sectionType={contextMenu.sectionType}
        position={contextMenu.position}
        currentVariant={
          contextMenu.sectionType
            ? (config.sections.find((s) => s.type === contextMenu.sectionType)?.variant ?? "")
            : ""
        }
        isEnabled={
          contextMenu.sectionType
            ? (config.sections.find((s) => s.type === contextMenu.sectionType)?.enabled ?? true)
            : true
        }
        onSelectVariant={handleSelectVariantFromContext}
        onOpenInspector={handleOpenInspectorFromContext}
        onToggleEnabled={handleToggleEnabledFromContext}
        onMoveOrder={handleMoveOrderFromContext}
        onClose={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
