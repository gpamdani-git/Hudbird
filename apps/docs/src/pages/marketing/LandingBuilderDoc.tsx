import { ProjectPages, PageSettings, AddPageDialog } from "../../components/builder/ProjectPages";
import {
  SectionEditorPanel,
  type InspectorTarget,
} from "../../components/builder/SectionEditorPanel";
import { BuilderTreeInspector } from "../../components/builder/BuilderTreeInspector";
import type { SelectedCoreNode } from "../../components/builder/CoreComponentEditors";
import { DesignTokenStudioDrawer } from "../../components/builder/DesignTokenStudioDrawer";
import { drawerTransition } from "../../components/builder/motionPresets";
import { MultiFileCodeViewer } from "../../components/builder/MultiFileCodeViewer";
import { createSandboxRenderHooks } from "../../components/builder/liveSandboxRenderer";
import { AddSectionDialog } from "../../components/builder/AddSectionDialog";
import { SiteFlowModal } from "../../components/builder/SiteFlowModal";
import {
  createWebsiteProject,
  parseWebsiteProject,
  pageConfig,
  resolvedPageConfig,
  resolveSectionFilePath,
  addWebsitePage,
  getAboutPageSections,
  toggleAboutPageSection,
  getContactPageSections,
  toggleContactPageSection,
  getLegalPageSections,
  toggleLegalPageSection,
  isPricingCompareEnabled,
  togglePricingCompareSection,
  isSectionPage,
  createWebsiteProjectCode,
  createWebsiteStarterPack,
  enableAndPositionPageSection,
  generateTailwindV4ThemeCss,
  generateTokensJson,
  getEffectiveDashboardConfig,
  getEffectiveNotFoundConfig,
  getEffectiveAuthConfig,
  getEffectiveSharedSections,
  movePageSection,
  resolvePageContent,
  syncNavigationFromSharedNavbar,
  updateInlineContent,
  WebsiteProjectPage,
  type AboutSectionId,
  type ContactSectionId,
  type LegalSectionId,
  type WebsitePage,
  type WebsiteProjectConfig,
  type WebsiteStarterPackId,
  type WebsiteTemplate,
} from "@hudbird/marketing";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft as BackIcon,
  ArrowRight as ForwardIcon,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  Code2,
  Copy,
  Download,
  Eye,
  EyeOff,
  File,
  FileCode2,
  Globe,
  Grid2x2,
  Layers,
  LayoutDashboard,
  Lock,
  Maximize2,
  Megaphone,
  Menu,
  Minimize2,
  Monitor,
  Moon,
  MousePointer2,
  Plus,
  Redo2,
  RotateCcw,
  Sliders,
  Smartphone,
  Sun,
  Tablet,
  TriangleAlert,
  Undo2,
  X,
} from "lucide-react";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { Button, Heading, Select, SelectItem, Text } from "@hudbird/ui";
import { createLandingPageConfig, parseLandingPageConfig } from "@hudbird/marketing";
import type {
  LandingPageConfig,
  LandingSectionSelection,
  LandingSectionType,
  SectionAppearanceSettings,
  SectionGridSettings,
} from "@hudbird/schemas";
import { SectionContextMenu } from "../../components/landing/SectionContextMenu";
import { VariantHoverPreview } from "../../components/landing/VariantHoverPreview";
import type {
  ActiveSectionAction,
  ActiveSectionMeta,
  ContextMenuSectionInfo,
  SelectionTargetMeta,
} from "../../components/IframePreview";
import { IframePreview } from "../../components/IframePreview";
import type { HoveredVariantPreviewData } from "../../components/landing/BlockVariantsInspector";
import { SectionThumbnailCard } from "../../components/landing/SectionThumbnailCard";
import { SectionWireframeSvg } from "../../components/landing/SectionWireframeSvg";
import { useWebsiteMode } from "../../lib/useWebsiteMode";

const storageKey = "hudbird-website-builder:v1";
const legacyStorageKey = "hudbird-landing-builder:v2";
function restore() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const project = parseWebsiteProject(JSON.parse(saved));
      if (project) return { project, message: "Your project has been restored.", canSave: true };
      return {
        project: createWebsiteProject(),
        message:
          "Saved project could not be read. It has been preserved; export your new project before reloading.",
        canSave: false,
      };
    }
    const legacy = localStorage.getItem(legacyStorageKey);
    const config = legacy ? parseLandingPageConfig(JSON.parse(legacy)) : undefined;
    return {
      project: createWebsiteProject(config),
      message: config
        ? "Your landing page is now Home. Add another page when you’re ready."
        : "Start with Home, or add a page.",
      canSave: true,
    };
  } catch {
    return {
      project: createWebsiteProject(),
      message: "Browser storage could not be read. Export your project to keep your work.",
      canSave: false,
    };
  }
}

type ViewportPreset = "desktop" | "tablet" | "mobile";

const viewportWidths: Record<ViewportPreset, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
};

const GRID_CAPABLE_SECTIONS = new Set<LandingSectionType>([
  "benefits",
  "features",
  "how-it-works",
  "integrations",
  "testimonials",
  "pricing",
  "faq",
  "logos",
  "cta",
]);

const MODULAR_TARGET_IDS = new Set<string>([
  "pricing-compare",
  "blog-index",
  "blog-post",
  "about",
  "who-are-we",
  "our-team",
  "meet-our-expert",
  "values",
  "editorial-cta",
  "contact-mail",
  "contact-form-call",
  "contact-locations",
  "legal-hero",
  "legal-reader",
  "legal-preferences",
]);

function defaultInspectorTargetForPage(page: WebsitePage): InspectorTarget {
  if (page.template === "login" || page.template === "signup" || page.template === "recovery") {
    return "auth";
  }
  if (page.template === "dashboard") {
    return "dashboard";
  }
  if (page.template === "not-found") {
    return "not-found";
  }
  if (page.template === "about") {
    return "about";
  }
  if (page.template === "contact") {
    return "contact-mail";
  }
  if (page.template === "legal") {
    return "legal-hero";
  }
  if (page.template === "blog") {
    return "blog-index";
  }
  if (page.template === "blog-post") {
    return "blog-post";
  }
  const firstBody = page.sections.find(
    (s) => s.enabled && s.type !== "navbar" && s.type !== "footer"
  );
  return firstBody?.type ?? "hero";
}

function downloadFile(filename: string, content: string, mime = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function LandingBuilderDoc() {
  const [initial] = React.useState(restore);
  const [projectHistory, setProjectHistory] = React.useState<{
    past: WebsiteProjectConfig[];
    present: WebsiteProjectConfig;
    future: WebsiteProjectConfig[];
  }>(() => ({ past: [], present: initial.project, future: [] }));

  const project = projectHistory.present;
  const canUndo = projectHistory.past.length > 0;
  const canRedo = projectHistory.future.length > 0;

  const lastEditRef = React.useRef<{ time: number; el: EventTarget | null }>({
    time: 0,
    el: null,
  });

  const setProject: React.Dispatch<React.SetStateAction<WebsiteProjectConfig>> = React.useCallback(
    (action) => {
      const activeEl = typeof document !== "undefined" ? document.activeElement : null;
      const isTextFormField =
        (activeEl instanceof HTMLInputElement &&
          !["checkbox", "radio", "file", "range", "button", "submit"].includes(activeEl.type)) ||
        activeEl instanceof HTMLTextAreaElement;
      const now = Date.now();
      const shouldBatch =
        isTextFormField &&
        activeEl !== null &&
        lastEditRef.current.el === activeEl &&
        now - lastEditRef.current.time < 600;
      lastEditRef.current =
        isTextFormField && activeEl ? { time: now, el: activeEl } : { time: 0, el: null };

      setProjectHistory((state) => {
        const next =
          typeof action === "function"
            ? (action as (prev: WebsiteProjectConfig) => WebsiteProjectConfig)(state.present)
            : action;
        if (next === state.present) return state;
        const onlyNavChanged =
          next.activePageId !== state.present.activePageId &&
          next.pages === state.present.pages &&
          next.brand === state.present.brand &&
          next.tokens === state.present.tokens &&
          next.shared === state.present.shared &&
          next.authConfig === state.present.authConfig &&
          next.dashboardConfig === state.present.dashboardConfig &&
          next.notFoundConfig === state.present.notFoundConfig &&
          next.contentOverrides === state.present.contentOverrides &&
          next.navigation === state.present.navigation &&
          next.primaryActionPageId === state.present.primaryActionPageId &&
          next.themeMode === state.present.themeMode &&
          next.motion === state.present.motion &&
          next.name === state.present.name;
        if (onlyNavChanged) {
          return { ...state, present: next };
        }
        if (shouldBatch && state.past.length > 0) {
          return {
            past: state.past,
            present: next,
            future: [],
          };
        }
        return {
          past: [...state.past.slice(-34), state.present],
          present: next,
          future: [],
        };
      });
    },
    []
  );

  const currentPage = project.pages.find((p) => p.id === project.activePageId) ?? project.pages[0];
  const config = React.useMemo(
    () => resolvedPageConfig(project, currentPage),
    [project, currentPage]
  );
  const resolvedContent = React.useMemo(
    () => resolvePageContent(project, currentPage),
    [project, currentPage]
  );

  const setConfig = (next: React.SetStateAction<LandingPageConfig>) =>
    setProject((previous) => {
      const active =
        previous.pages.find((p) => p.id === previous.activePageId) ?? previous.pages[0];
      const updated = typeof next === "function" ? next(pageConfig(previous, active)) : next;
      return {
        ...previous,
        brand: updated.brand,
        themeMode: updated.themeMode,
        motion: updated.motion,
        pages: previous.pages.map((p) =>
          p.id === active.id ? { ...p, sections: updated.sections } : p
        ),
      };
    });

  const [addOpen, setAddOpen] = React.useState(false);
  const [addSectionOpen, setAddSectionOpen] = React.useState(false);
  const [flowOpen, setFlowOpen] = React.useState(false);
  const importRef = React.useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();
  const [importError, setImportError] = React.useState("");
  const [rightPanelMode, setRightPanelMode] = React.useState<"page" | "theme" | null>(null);
  const [widgetPopoverOpen, setWidgetPopoverOpen] = React.useState(false);
  const [selectedEditPath, setSelectedEditPath] = React.useState<string | null>(null);

  React.useEffect(() => {
    setWidgetPopoverOpen(false);
    setSelectedEditPath(null);
  }, [currentPage.id]);
  const [backHistory, setBackHistory] = React.useState<string[]>([]);
  const [forwardHistory, setForwardHistory] = React.useState<string[]>([]);
  const [testing404, setTesting404] = React.useState(false);
  const [interactionMode, setInteractionMode] = React.useState<"edit" | "navigate">("edit");
  const [codeInitialFile, setCodeInitialFile] = React.useState("src/App.tsx");
  const [status, setStatus] = React.useState(initial.message);
  const [viewport, setViewport] = React.useState<ViewportPreset>("desktop");
  const [desktopViewportWidth, setDesktopViewportWidth] = React.useState<"1280" | "1440" | "auto">(
    "1280"
  );
  const [canvasScale, setCanvasScale] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [isSidebarHidden, setIsSidebarHidden] = React.useState(false);
  const [isTopBarHidden, setIsTopBarHidden] = React.useState(false);
  const topBarTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = React.useState(false);
  const [hoveredVariant, setHoveredVariant] = React.useState<HoveredVariantPreviewData | null>(
    null
  );
  const [sidebarTab, setSidebarTab] = React.useState<"pages" | "sections" | "inspector">("pages");
  const [inspectorTarget, setInspectorTarget] = React.useState<InspectorTarget>(() =>
    defaultInspectorTargetForPage(initial.project.pages[0])
  );
  const [selectedCoreNode, setSelectedCoreNode] = React.useState<SelectedCoreNode>("section");
  const [selectedItemIndex, setSelectedItemIndex] = React.useState<number | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = React.useState<number>(0);
  const [iframeDoc, setIframeDoc] = React.useState<Document | null>(null);
  const handleSelectSlide = React.useCallback(
    (index: number) => {
      setActiveSlideIndex(index);
      iframeDoc?.dispatchEvent(new CustomEvent("hb:hero-select-slide", { detail: { index } }));
    },
    [iframeDoc]
  );
  const [showGridGuides, setShowGridGuides] = React.useState<boolean>(false);
  const [insertAfterSection, setInsertAfterSection] = React.useState<
    LandingSectionType | undefined
  >(undefined);
  const [selectedAboutSection, setSelectedAboutSection] = React.useState<
    | AboutSectionId
    | ContactSectionId
    | LegalSectionId
    | "pricing-compare"
    | "blog-index"
    | "blog-post"
    | "contact-page"
    | null
  >(null);

  const selectPage = (id: string, fromPreview = false) => {
    const nextPage = project.pages.find((p) => p.id === id);
    if (!nextPage) return;
    if (fromPreview && id !== project.activePageId) {
      setBackHistory((previous) => [...previous, project.activePageId]);
      setForwardHistory([]);
    }
    setTesting404(false);
    setProject((previous) => ({ ...previous, activePageId: id }));
    setSelectedAboutSection(null);
    setSelectedItemIndex(null);
    setWidgetPopoverOpen(false);
    setInspectorTarget(defaultInspectorTargetForPage(nextPage));
    setSelectedCoreNode("section");
    setContextMenu((previous) => ({ ...previous, isOpen: false }));
    setHoveredVariant(null);
    if (!fromPreview) {
      setSidebarTab("pages");
    }
    setActiveTab("preview");
    setIsMobileDrawerOpen(false);
    if (!isSidebarHidden) setIsTopBarHidden(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const addPages = (templates: WebsiteTemplate[]) => {
    const ids = templates.map(() => crypto.randomUUID());
    let nextSnapshot = project;
    templates.forEach((template, index) => {
      nextSnapshot = addWebsitePage(nextSnapshot, template, ids[index]);
    });
    const addedActivePage = nextSnapshot.pages.find((p) => p.id === ids[0]);
    setProject((previous) => {
      let next = previous;
      templates.forEach((template, index) => {
        next = addWebsitePage(next, template, ids[index]);
      });
      return { ...next, activePageId: ids[0] };
    });
    setTesting404(false);
    setAddOpen(false);
    setSidebarTab("pages");
    setRightPanelMode(null);
    setWidgetPopoverOpen(false);
    setSelectedAboutSection(null);
    setSelectedCoreNode("section");
    setSelectedItemIndex(null);
    if (addedActivePage) {
      setInspectorTarget(defaultInspectorTargetForPage(addedActivePage));
    }
    setIsMobileDrawerOpen(false);
    setStatus(
      templates.includes("blog") && templates.length > 1
        ? "Blog and Single Post pages added with navigation between them."
        : templates.length > 1
          ? "Account pages added with links between them."
          : "Page added. Open settings to change its name or URL."
    );
  };

  const applyStarterPack = (packId: WebsiteStarterPackId) => {
    const nextPack = createWebsiteStarterPack(packId, pageConfig(project, currentPage));
    const nextActive =
      nextPack.pages.find((p) => p.id === nextPack.activePageId) ?? nextPack.pages[0];
    setProject((previous) => {
      const pack = createWebsiteStarterPack(packId, pageConfig(previous, currentPage));
      return {
        ...pack,
        tokens: previous.tokens,
      };
    });
    setTesting404(false);
    setAddOpen(false);
    setBackHistory([]);
    setForwardHistory([]);
    setSidebarTab("pages");
    setRightPanelMode(null);
    setWidgetPopoverOpen(false);
    setSelectedAboutSection(null);
    setSelectedCoreNode("section");
    setSelectedItemIndex(null);
    if (nextActive) {
      setInspectorTarget(defaultInspectorTargetForPage(nextActive));
    }
    setActiveTab("preview");
    setIsMobileDrawerOpen(false);
    setStatus(`Loaded ${packId} multipage starter kit with synced shared sections.`);
  };

  const aboutPageSections = React.useMemo(() => getAboutPageSections(currentPage), [currentPage]);
  const contactPageSections = React.useMemo(
    () => getContactPageSections(currentPage),
    [currentPage]
  );
  const legalPageSections = React.useMemo(() => getLegalPageSections(currentPage), [currentPage]);
  const toggleAboutSectionEnabled = (id: AboutSectionId, enabled: boolean) =>
    setProject((previous) => ({
      ...previous,
      pages: previous.pages.map((p) =>
        p.id === previous.activePageId ? toggleAboutPageSection(p, id, enabled) : p
      ),
    }));
  const toggleContactSectionEnabled = (id: ContactSectionId, enabled: boolean) =>
    setProject((previous) => ({
      ...previous,
      pages: previous.pages.map((p) =>
        p.id === previous.activePageId ? toggleContactPageSection(p, id, enabled) : p
      ),
    }));
  const toggleLegalSectionEnabled = (id: LegalSectionId, enabled: boolean) =>
    setProject((previous) => ({
      ...previous,
      pages: previous.pages.map((p) =>
        p.id === previous.activePageId ? toggleLegalPageSection(p, id, enabled) : p
      ),
    }));
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

  const applyThemeMode = React.useCallback(
    (nextMode: "auto" | "light" | "dark") => {
      const resolvedMode: "light" | "dark" =
        nextMode === "auto"
          ? typeof window !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : nextMode;
      setProject((prev) => ({
        ...prev,
        themeMode: nextMode,
        brand: { ...prev.brand, mode: resolvedMode },
      }));
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", resolvedMode === "dark");
        document.documentElement.setAttribute("data-theme", resolvedMode);
      }
      try {
        window.localStorage.setItem("theme", resolvedMode);
      } catch {
        // Ignore storage access errors in restricted frames
      }
    },
    [setProject]
  );

  const openSectionInspector = React.useCallback(
    (
      target: InspectorTarget,
      node: SelectedCoreNode = "section",
      itemIndex: number | null = null,
      options?: { openPopover?: boolean; editPath?: string | null }
    ) => {
      const normalizedTarget = (
        target === ("logo-cloud" as string) ? "logos" : target
      ) as InspectorTarget;
      setInspectorTarget(normalizedTarget);
      setSelectedCoreNode(node);
      setSelectedItemIndex(node === "section" ? null : itemIndex);
      setSelectedEditPath(options?.editPath ?? null);
      setSidebarTab("inspector");
      setRightPanelMode(null);
      if (options?.openPopover ?? true) {
        setWidgetPopoverOpen(true);
      }
    },
    []
  );

  const handleSelectCoreNode = React.useCallback((node: SelectedCoreNode) => {
    setSelectedCoreNode(node);
    setSelectedEditPath(null);
    if (node === "section") {
      setSelectedItemIndex(null);
    }
  }, []);

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
      if (initial.canSave) localStorage.setItem(storageKey, JSON.stringify(project));
    } catch {
      setStatus("Unable to save locally. Download JSON to keep your choices.");
    }
  }, [project, initial.canSave]);

  const source = createWebsiteProjectCode(project);
  const recipe = { schema: "hudbird.website.recipe", schemaVersion: 1, project };
  const sandboxHooks = React.useMemo(() => createSandboxRenderHooks(project), [project]);

  const update = (type: LandingSectionType, patch: Record<string, unknown>) =>
    setProject((previous) => {
      const active =
        previous.pages.find((p) => p.id === previous.activePageId) ?? previous.pages[0];
      const nextPages = previous.pages.map((p) =>
        p.id === active.id
          ? {
              ...p,
              sections: p.sections.map((section) =>
                section.type === type
                  ? ({ ...section, ...patch } as LandingSectionSelection)
                  : section
              ),
            }
          : p
      );

      const isSharedSlot =
        (type === "navbar" || type === "footer") &&
        (active.sharedMode?.[type] ?? "inherit") === "inherit";
      if (!isSharedSlot) {
        return { ...previous, pages: nextPages };
      }

      const effShared = getEffectiveSharedSections(previous);
      if (type === "navbar") {
        const updatedNav = { ...effShared.navbar!.selection, ...patch } as Extract<
          LandingSectionSelection,
          { type: "navbar" }
        >;
        return {
          ...previous,
          pages: nextPages,
          shared: {
            ...previous.shared,
            navbar: { ...effShared.navbar!, selection: updatedNav },
          },
        };
      }
      const updatedFooter = { ...effShared.footer!.selection, ...patch } as Extract<
        LandingSectionSelection,
        { type: "footer" }
      >;
      return {
        ...previous,
        pages: nextPages,
        shared: {
          ...previous.shared,
          footer: { ...effShared.footer!, selection: updatedFooter },
        },
      };
    });

  async function importProject(file?: globalThis.File) {
    if (!file) return;
    try {
      if (file.size > 5_000_000) throw new Error("Choose a project file smaller than 5 MB.");
      const value = JSON.parse(await file.text());
      const restored = parseWebsiteProject(value.project ?? value);
      const legacy = !restored && parseLandingPageConfig(value.config ?? value);
      if (!restored && !legacy)
        throw new Error("This file is not a valid Hudbird project or landing configuration.");
      downloadFile(
        "hudbird-before-import.json",
        JSON.stringify(project, null, 2),
        "application/json"
      );
      setProject(restored ?? createWebsiteProject(legacy || undefined));
      setBackHistory([]);
      setForwardHistory([]);
      setTesting404(false);
      setSidebarTab("pages");
      setActiveTab("preview");
      setImportError("");
      setStatus("Project imported. Your previous project was downloaded as a backup.");
    } catch (error) {
      setImportError(error instanceof Error ? error.message : "Unable to import this file.");
    }
    if (importRef.current) importRef.current.value = "";
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(source);
      setStatus("React code copied.");
      setIsExportMenuOpen(false);
    } catch {
      setStatus("Clipboard unavailable. Use Download App.tsx instead.");
    }
  }

  const isConfigBodySection = (target: InspectorTarget | string): target is LandingSectionType =>
    target !== "navbar" && target !== "footer" && config.sections.some((s) => s.type === target);

  const movableBodySections = React.useMemo(
    () =>
      config.sections.filter(
        (s) =>
          s.type !== "navbar" &&
          s.type !== "footer" &&
          !(currentPage.template === "about" && s.type === "hero") &&
          !["blog", "blog-post", "contact", "legal"].includes(currentPage.template)
      ),
    [config.sections, currentPage.template]
  );

  const orderedInspectorTargets = React.useMemo<InspectorTarget[]>(() => {
    if (["login", "signup", "recovery"].includes(currentPage.template)) return ["auth"];
    if (currentPage.template === "dashboard") return ["dashboard"];
    if (currentPage.template === "not-found") return ["not-found"];

    const list: InspectorTarget[] = [];
    const navSec = config.sections.find((s) => s.type === "navbar");
    if (navSec?.enabled && currentPage.sharedMode?.navbar !== "hidden") {
      list.push("navbar");
    }
    if (currentPage.template === "about") {
      aboutPageSections.filter((b) => b.enabled).forEach((b) => list.push(b.id));
    } else if (currentPage.template === "contact") {
      contactPageSections.filter((b) => b.enabled).forEach((b) => list.push(b.id));
    } else if (currentPage.template === "legal") {
      legalPageSections.filter((b) => b.enabled).forEach((b) => list.push(b.id));
    } else if (currentPage.template === "blog") {
      list.push("blog-index");
    } else if (currentPage.template === "blog-post") {
      list.push("blog-post");
    }
    for (const sec of movableBodySections) {
      if (!sec.enabled) continue;
      if (
        currentPage.template === "pricing" &&
        sec.type === "faq" &&
        isPricingCompareEnabled(currentPage)
      ) {
        list.push("pricing-compare");
      }
      list.push(sec.type);
    }
    const footSec = config.sections.find((s) => s.type === "footer");
    if (footSec?.enabled && currentPage.sharedMode?.footer !== "hidden") {
      list.push("footer");
    }
    return list;
  }, [
    currentPage,
    config.sections,
    aboutPageSections,
    contactPageSections,
    legalPageSections,
    movableBodySections,
  ]);

  const activeSectionMeta = React.useMemo<ActiveSectionMeta>(() => {
    const normalized = (
      inspectorTarget === ("logo-cloud" as string) ? "logos" : inspectorTarget
    ) as InspectorTarget;
    const isBody = isConfigBodySection(normalized);
    const movableIdx = isBody ? movableBodySections.findIndex((s) => s.type === normalized) : -1;
    const activeSec = config.sections.find((s) => s.type === normalized);
    const effShared = getEffectiveSharedSections(project);

    let enabled = true;
    if (normalized === "navbar") {
      enabled = Boolean(activeSec?.enabled) && currentPage.sharedMode?.navbar !== "hidden";
    } else if (normalized === "footer") {
      enabled = Boolean(activeSec?.enabled) && currentPage.sharedMode?.footer !== "hidden";
    } else if (normalized === "announcement") {
      enabled = Boolean(effShared.announcement?.enabled);
    } else if (normalized === "pricing-compare") {
      enabled = isPricingCompareEnabled(currentPage);
    } else if (activeSec) {
      enabled = activeSec.enabled;
    } else {
      const modMatch =
        aboutPageSections.find((b) => b.id === normalized) ??
        contactPageSections.find((b) => b.id === normalized) ??
        legalPageSections.find((b) => b.id === normalized);
      if (modMatch) enabled = modMatch.enabled;
    }

    const canToggleHide =
      normalized !== "auth" &&
      normalized !== "dashboard" &&
      normalized !== "not-found" &&
      normalized !== "blog-index" &&
      normalized !== "blog-post";

    const currentGrid = (activeSec?.customSettings as SectionAppearanceSettings | undefined)?.grid;

    return {
      canMoveUp: movableIdx > 0,
      canMoveDown: movableIdx >= 0 && movableIdx < movableBodySections.length - 1,
      enabled,
      supportsGrid: GRID_CAPABLE_SECTIONS.has(normalized as LandingSectionType),
      supportsAddBelow: isBody,
      canToggleHide,
      grid: currentGrid,
    };
  }, [
    inspectorTarget,
    movableBodySections,
    config.sections,
    project,
    currentPage,
    aboutPageSections,
    contactPageSections,
    legalPageSections,
  ]);

  const handleStepSection = (delta: -1 | 1) => {
    if (!orderedInspectorTargets.length) return;
    const idx = orderedInspectorTargets.indexOf(inspectorTarget);
    const nextIdx =
      idx === -1 ? 0 : Math.max(0, Math.min(orderedInspectorTargets.length - 1, idx + delta));
    const nextTarget = orderedInspectorTargets[nextIdx];
    setSelectedAboutSection(
      MODULAR_TARGET_IDS.has(String(nextTarget))
        ? (nextTarget as
            | AboutSectionId
            | ContactSectionId
            | LegalSectionId
            | "pricing-compare"
            | "blog-index"
            | "blog-post")
        : null
    );
    openSectionInspector(nextTarget);
    triggerScrollToSection(String(nextTarget));
  };

  const handleSectionAction = (action: ActiveSectionAction) => {
    const rawType = action.sectionType === "logo-cloud" ? "logos" : action.sectionType;
    switch (action.type) {
      case "move-up": {
        if (!isConfigBodySection(rawType)) return;
        setProject((previous) => movePageSection(previous, currentPage.id, rawType, "up"));
        setStatus(`${rawType} moved up.`);
        triggerScrollToSection(rawType);
        return;
      }
      case "move-down": {
        if (!isConfigBodySection(rawType)) return;
        setProject((previous) => movePageSection(previous, currentPage.id, rawType, "down"));
        setStatus(`${rawType} moved down.`);
        triggerScrollToSection(rawType);
        return;
      }
      case "toggle-hide": {
        if (rawType === "navbar" || rawType === "footer") {
          const isHidden = currentPage.sharedMode?.[rawType] === "hidden";
          setProject((previous) => ({
            ...previous,
            pages: previous.pages.map((p) =>
              p.id === currentPage.id
                ? {
                    ...p,
                    sharedMode: {
                      ...p.sharedMode,
                      [rawType]: isHidden ? "inherit" : "hidden",
                    },
                  }
                : p
            ),
          }));
          setStatus(`${rawType} ${isHidden ? "shown" : "hidden"} on ${currentPage.name}.`);
          return;
        }
        if (rawType === "announcement") {
          const eff = getEffectiveSharedSections(project);
          const nextEnabled = !eff.announcement?.enabled;
          setProject((previous) => ({
            ...previous,
            shared: {
              ...previous.shared,
              announcement: {
                ...getEffectiveSharedSections(previous).announcement!,
                enabled: nextEnabled,
              },
            },
          }));
          setStatus(`Announcement banner ${nextEnabled ? "shown" : "hidden"}.`);
          return;
        }
        if (rawType === "pricing-compare") {
          const nextEnabled = !isPricingCompareEnabled(currentPage);
          setProject((previous) => ({
            ...previous,
            pages: previous.pages.map((p) =>
              p.id === previous.activePageId ? togglePricingCompareSection(p, nextEnabled) : p
            ),
          }));
          setStatus(`Pricing compare ${nextEnabled ? "shown" : "hidden"}.`);
          return;
        }
        const aboutMatch = aboutPageSections.find((b) => b.id === rawType);
        if (aboutMatch) {
          toggleAboutSectionEnabled(aboutMatch.id, !aboutMatch.enabled);
          setStatus(`${aboutMatch.title} ${!aboutMatch.enabled ? "shown" : "hidden"}.`);
          return;
        }
        const contactMatch = contactPageSections.find((b) => b.id === rawType);
        if (contactMatch) {
          toggleContactSectionEnabled(contactMatch.id, !contactMatch.enabled);
          setStatus(`${contactMatch.title} ${!contactMatch.enabled ? "shown" : "hidden"}.`);
          return;
        }
        const legalMatch = legalPageSections.find((b) => b.id === rawType);
        if (legalMatch) {
          toggleLegalSectionEnabled(legalMatch.id, !legalMatch.enabled);
          setStatus(`${legalMatch.title} ${!legalMatch.enabled ? "shown" : "hidden"}.`);
          return;
        }
        const sec = config.sections.find((s) => s.type === rawType);
        if (sec) {
          update(sec.type, { enabled: !sec.enabled });
          setStatus(`${sec.type} ${!sec.enabled ? "shown" : "hidden"}.`);
        }
        return;
      }
      case "open-settings": {
        openSectionInspector(rawType as InspectorTarget);
        setIsSidebarHidden(false);
        return;
      }
      case "add-below": {
        if (!isConfigBodySection(rawType)) return;
        setInsertAfterSection(rawType);
        setAddSectionOpen(true);
        return;
      }
      case "set-grid": {
        const sec = config.sections.find((s) => s.type === rawType);
        if (!sec) return;
        const prevSettings = (sec.customSettings ?? {}) as SectionAppearanceSettings;
        const nextGrid: SectionGridSettings = {
          ...(prevSettings.grid ?? {}),
          ...action.patch,
        };
        update(sec.type, {
          customSettings: {
            ...prevSettings,
            grid: nextGrid,
          },
        });
        setStatus(`Updated ${sec.type} grid layout.`);
        return;
      }
    }
  };

  const handleUndo = React.useCallback(() => {
    lastEditRef.current = { time: 0, el: null };
    setProjectHistory((state) => {
      if (!state.past.length) return state;
      const previous = state.past[state.past.length - 1];
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future.slice(0, 34)],
      };
    });
    setStatus("Undid last change.");
  }, []);

  const handleRedo = React.useCallback(() => {
    lastEditRef.current = { time: 0, el: null };
    setProjectHistory((state) => {
      if (!state.future.length) return state;
      const next = state.future[0];
      return {
        past: [...state.past, state.present],
        present: next,
        future: state.future.slice(1),
      };
    });
    setStatus("Redid change.");
  }, []);

  // Auto-hide top nav when window/workspace scrolls
  React.useEffect(() => {
    const handleWindowScroll = () => {
      if (isSidebarHidden && window.scrollY > 20) {
        setIsTopBarHidden(true);
        if (topBarTimerRef.current) clearTimeout(topBarTimerRef.current);
      }
    };
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [isSidebarHidden]);

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
    openSectionInspector(type);
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
    setProject((previous) => movePageSection(previous, currentPage.id, type, direction));
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

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const targetEl = e.target as HTMLElement | null;
      const isEditable =
        targetEl?.tagName === "INPUT" ||
        targetEl?.tagName === "TEXTAREA" ||
        targetEl?.tagName === "SELECT" ||
        Boolean(targetEl?.isContentEditable) ||
        Boolean(targetEl?.closest(".cm-editor"));

      if (!isEditable && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
        return;
      }
      if (!isEditable && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        handleRedo();
        return;
      }
      if (!isEditable && !e.metaKey && !e.ctrlKey && !e.altKey && e.key.toLowerCase() === "g") {
        e.preventDefault();
        setShowGridGuides((prev) => !prev);
        return;
      }
      if (e.key === "Escape") {
        if (isExportMenuOpen) {
          e.preventDefault();
          setIsExportMenuOpen(false);
          return;
        }
        setRightPanelMode(null);
        if (contextMenu.isOpen) {
          setContextMenu((prev) => ({ ...prev, isOpen: false }));
          return;
        }
        exitFullscreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [contextMenu.isOpen, exitFullscreen, handleUndo, handleRedo, isExportMenuOpen]);

  React.useEffect(() => {
    if (!isExportMenuOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("#builder-export")) return;
      setIsExportMenuOpen(false);
    };
    const handleIframeDismiss = () => setIsExportMenuOpen(false);
    const handleIframeKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsExportMenuOpen(false);
      }
    };
    window.addEventListener("pointerdown", handlePointerDown, true);
    window.addEventListener("blur", handleIframeDismiss);
    iframeDoc?.addEventListener("pointerdown", handleIframeDismiss, true);
    iframeDoc?.addEventListener("keydown", handleIframeKeyDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown, true);
      window.removeEventListener("blur", handleIframeDismiss);
      iframeDoc?.removeEventListener("pointerdown", handleIframeDismiss, true);
      iframeDoc?.removeEventListener("keydown", handleIframeKeyDown);
    };
  }, [isExportMenuOpen, iframeDoc]);

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white text-zinc-900 antialiased transition-colors duration-300 dark:bg-[#161618] dark:text-[#e5e5e5]">
      <input
        ref={importRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        aria-label="Import project JSON"
        onChange={(e) => void importProject(e.target.files?.[0])}
      />
      {importError && (
        <div
          role="alert"
          className="fixed bottom-4 left-1/2 z-[70] w-[min(480px,90vw)] -translate-x-1/2 rounded-xl border border-red-200 bg-white p-4 text-sm text-red-700 shadow-lg dark:border-red-900 dark:bg-zinc-900 dark:text-red-300"
        >
          {importError}
          <Button variant="plain" size="sm" onClick={() => setImportError("")}>
            Dismiss
          </Button>
        </div>
      )}
      {/* Accessible Page Title */}
      <Heading as="h1" className="sr-only">
        Your website. Page by page.
      </Heading>
      <Text role="status" aria-live="polite" className="sr-only">
        {status}
      </Text>

      {/* 1. LEFT SIDEBAR (Tabbed: Sections Visual Cards vs Granular Inspector) */}
      <aside
        aria-label="Project sidebar"
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
          </NavLink>
        </div>

        {/* Tab Switcher: Pages vs Sections vs Inspector */}
        <div className="relative z-10 mb-3.5 grid grid-cols-3 gap-1 rounded-lg border border-zinc-200/80 bg-zinc-100/70 p-1 dark:border-white/10 dark:bg-zinc-900/60">
          <button
            type="button"
            aria-pressed={sidebarTab === "pages"}
            onClick={() => setSidebarTab("pages")}
            className={`flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-semibold ${
              sidebarTab === "pages"
                ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#28292d] dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <File className="h-3.5 w-3.5" />
            <span>Pages</span>
          </button>
          <button
            type="button"
            aria-pressed={sidebarTab === "sections"}
            onClick={() => setSidebarTab("sections")}
            className={`flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-semibold ${
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
            aria-pressed={sidebarTab === "inspector"}
            onClick={() => {
              setSidebarTab("inspector");
              triggerScrollToSection(inspectorTarget);
            }}
            className={`flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-semibold ${
              sidebarTab === "inspector"
                ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#28292d] dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Inspector</span>
          </button>
        </div>

        {sidebarTab === "pages" && (
          <ProjectPages
            project={project}
            onChange={setProject}
            onSelect={selectPage}
            onAdd={() => setAddOpen(true)}
            onSettings={() => setRightPanelMode("page")}
            onEditShared={(slot) => {
              openSectionInspector(slot);
              if (isSectionPage(currentPage) || slot === "navbar" || slot === "footer") {
                triggerScrollToSection(slot);
              }
            }}
            onOpenFlow={() => setFlowOpen(true)}
          />
        )}

        {/* TAB 1: SECTIONS LIST (Supports Marketing, Dashboard Overview, Auth & 404 Pages) */}
        {sidebarTab === "sections" &&
          (() => {
            const shared = getEffectiveSharedSections(project);
            const announcementEnabled = Boolean(shared.announcement?.enabled);
            const announcementCard = (
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelectedAboutSection(null);
                  openSectionInspector("announcement");
                  triggerScrollToSection("announcement");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openSectionInspector("announcement");
                  }
                }}
                className={`group flex cursor-pointer items-center justify-between gap-2 rounded-xl border p-2.5 transition-colors ${
                  inspectorTarget === "announcement"
                    ? "border-zinc-900 bg-zinc-50 dark:border-white/80 dark:bg-[#1a1b1f]"
                    : "border-zinc-200/80 bg-white/80 hover:border-zinc-400 dark:border-zinc-800 dark:bg-[#161618] dark:hover:border-zinc-700"
                }`}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <Megaphone className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      Announcement
                    </div>
                    <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                      {shared.announcement?.text || "Top banner message"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={
                    announcementEnabled ? "Hide Announcement Bar" : "Show Announcement Bar"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setProject((prev) => ({
                      ...prev,
                      shared: {
                        ...prev.shared,
                        announcement: {
                          ...getEffectiveSharedSections(prev).announcement!,
                          enabled: !announcementEnabled,
                        },
                      },
                    }));
                    setStatus(
                      `Global Announcement Bar ${!announcementEnabled ? "shown" : "hidden"}.`
                    );
                  }}
                  className="shrink-0 p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                >
                  {announcementEnabled ? (
                    <Eye className="h-3.5 w-3.5" />
                  ) : (
                    <EyeOff className="h-3.5 w-3.5 text-zinc-500" />
                  )}
                </button>
              </div>
            );

            if (currentPage.template === "dashboard") {
              const dash = getEffectiveDashboardConfig(project);
              const blocks = dash.blocks;
              const moveDashboardBlock = (idx: number, delta: -1 | 1) => {
                const swapIdx = idx + delta;
                if (swapIdx < 0 || swapIdx >= blocks.length) return;
                const nextBlocks = [...blocks];
                [nextBlocks[idx], nextBlocks[swapIdx]] = [nextBlocks[swapIdx], nextBlocks[idx]];
                setProject((prev) => ({
                  ...prev,
                  dashboardConfig: {
                    ...getEffectiveDashboardConfig(prev),
                    blocks: nextBlocks,
                  },
                }));
              };
              return (
                <div
                  id="builder-sections"
                  className="scrollbar-hide relative z-10 flex-1 space-y-2.5 overflow-x-hidden overflow-y-auto pr-1"
                >
                  <div className="flex items-center justify-between px-1 pb-1">
                    <span className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                      Dashboard MVP (1 Page)
                    </span>
                    <button
                      type="button"
                      onClick={() => openSectionInspector("dashboard")}
                      className="text-[10px] font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      Tune Overview →
                    </button>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      openSectionInspector("dashboard");
                      triggerScrollToSection("dashboard");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openSectionInspector("dashboard");
                      }
                    }}
                    className="cursor-pointer rounded-2xl border border-zinc-900 bg-zinc-50/90 p-3 shadow-xs dark:border-white/80 dark:bg-[#1a1b1f]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        <LayoutDashboard className="h-3.5 w-3.5 text-indigo-500" />
                        {dash.appTitle}
                      </span>
                      <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                        {dash.category}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                      {dash.welcomeSubtitle}
                    </p>
                  </div>

                  <div className="px-1 pt-1 text-[10px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                    Overview Blocks ({blocks.length})
                  </div>

                  {blocks.map((block, idx) => (
                    <div
                      key={block.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        openSectionInspector("dashboard");
                        triggerScrollToSection("dashboard");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openSectionInspector("dashboard");
                        }
                      }}
                      className={`flex cursor-pointer items-center justify-between gap-2 rounded-xl border p-2.5 transition-colors ${
                        block.enabled
                          ? "border-zinc-200/80 bg-white hover:border-zinc-400 dark:border-zinc-800 dark:bg-[#161618] dark:hover:border-zinc-700"
                          : "border-dashed border-zinc-200 bg-zinc-50/50 opacity-50 dark:border-zinc-800 dark:bg-[#141416]/50"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          {block.title}
                        </div>
                        <div className="truncate font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                          {block.variant}
                        </div>
                      </div>
                      <div
                        className="flex shrink-0 items-center gap-0.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveDashboardBlock(idx, -1)}
                          aria-label={`Move ${block.title} up`}
                          className="p-1 text-zinc-400 hover:text-zinc-900 disabled:opacity-25 dark:hover:text-white"
                        >
                          <ArrowUp className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === blocks.length - 1}
                          onClick={() => moveDashboardBlock(idx, 1)}
                          aria-label={`Move ${block.title} down`}
                          className="p-1 text-zinc-400 hover:text-zinc-900 disabled:opacity-25 dark:hover:text-white"
                        >
                          <ArrowDown className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setProject((prev) => ({
                              ...prev,
                              dashboardConfig: {
                                ...getEffectiveDashboardConfig(prev),
                                blocks: blocks.map((b) =>
                                  b.id === block.id ? { ...b, enabled: !b.enabled } : b
                                ),
                              },
                            }));
                            setStatus(`${block.title} ${!block.enabled ? "shown" : "hidden"}.`);
                          }}
                          aria-label={block.enabled ? `Hide ${block.title}` : `Show ${block.title}`}
                          className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        >
                          {block.enabled ? (
                            <Eye className="h-3.5 w-3.5" />
                          ) : (
                            <EyeOff className="h-3.5 w-3.5 text-zinc-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }

            if (
              currentPage.template === "login" ||
              currentPage.template === "signup" ||
              currentPage.template === "recovery"
            ) {
              const auth = getEffectiveAuthConfig(project);
              const headingPreview =
                currentPage.template === "signup"
                  ? auth.signupHeading
                  : currentPage.template === "recovery"
                    ? auth.recoveryHeading
                    : auth.loginHeading;
              return (
                <div
                  id="builder-sections"
                  className="scrollbar-hide relative z-10 flex-1 space-y-2.5 overflow-x-hidden overflow-y-auto pr-1"
                >
                  <div className="flex items-center justify-between px-1 pb-1">
                    <span className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                      Auth Page Blocks
                    </span>
                  </div>
                  {announcementCard}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      openSectionInspector("auth");
                      triggerScrollToSection("auth");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openSectionInspector("auth");
                      }
                    }}
                    className="cursor-pointer rounded-2xl border border-zinc-900 bg-zinc-50/90 p-3 shadow-xs dark:border-white/80 dark:bg-[#1a1b1f]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        <Lock className="h-3.5 w-3.5 text-indigo-500" />
                        Auth Card ({currentPage.template})
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
                    </div>
                    <p className="mt-1 truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                      {headingPreview}
                    </p>
                  </div>
                  {(["navbar", "footer"] as const).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        openSectionInspector(slot);
                        triggerScrollToSection(slot);
                      }}
                      className="flex w-full items-center justify-between border-t border-zinc-200/80 px-1 py-2.5 text-left text-xs transition-colors hover:text-zinc-950 dark:border-zinc-800 dark:hover:text-white"
                    >
                      <span className="font-medium text-zinc-900 capitalize dark:text-zinc-100">
                        Shared {slot}
                      </span>
                      <span className="text-[11px] text-zinc-500 capitalize dark:text-zinc-400">
                        {currentPage.sharedMode?.[slot] ?? "inherit"}
                      </span>
                    </button>
                  ))}
                </div>
              );
            }

            if (currentPage.template === "not-found") {
              const nf = getEffectiveNotFoundConfig(project);
              return (
                <div
                  id="builder-sections"
                  className="scrollbar-hide relative z-10 flex-1 space-y-2.5 overflow-x-hidden overflow-y-auto pr-1"
                >
                  <div className="flex items-center justify-between px-1 pb-1">
                    <span className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                      404 Recovery Page
                    </span>
                  </div>
                  {announcementCard}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      openSectionInspector("not-found");
                      triggerScrollToSection("not-found");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openSectionInspector("not-found");
                      }
                    }}
                    className="cursor-pointer rounded-2xl border border-zinc-900 bg-zinc-50/90 p-3 shadow-xs dark:border-white/80 dark:bg-[#1a1b1f]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        <TriangleAlert className="h-3.5 w-3.5 text-amber-500" />
                        {nf.code} Error Hero
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
                    </div>
                    <p className="mt-1 truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                      {nf.title}
                    </p>
                  </div>
                  {(["navbar", "footer"] as const).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        openSectionInspector(slot);
                        triggerScrollToSection(slot);
                      }}
                      className="flex w-full items-center justify-between border-t border-zinc-200/80 px-1 py-2.5 text-left text-xs transition-colors hover:text-zinc-950 dark:border-zinc-800 dark:hover:text-white"
                    >
                      <span className="font-medium text-zinc-900 capitalize dark:text-zinc-100">
                        Shared {slot}
                      </span>
                      <span className="text-[11px] text-zinc-500 capitalize dark:text-zinc-400">
                        {currentPage.sharedMode?.[slot] ?? "inherit"}
                      </span>
                    </button>
                  ))}
                </div>
              );
            }

            const isAboutTemplate = currentPage.template === "about";
            const isPricingTemplate = currentPage.template === "pricing";
            const isBlogIndexTemplate = currentPage.template === "blog";
            const isBlogPostTemplate = currentPage.template === "blog-post";
            const isBlogTemplate = isBlogIndexTemplate || isBlogPostTemplate;
            const isContactTemplate = currentPage.template === "contact";
            const isLegalTemplate = currentPage.template === "legal";
            const isEditorialUtilityTemplate =
              isBlogTemplate || isContactTemplate || isLegalTemplate;
            const pricingCompareShown = isPricingCompareEnabled(currentPage);
            const visibleConfigSections = isAboutTemplate
              ? config.sections.filter((s) => s.type !== "hero")
              : isEditorialUtilityTemplate
                ? config.sections.filter((s) => s.type === "navbar" || s.type === "footer")
                : config.sections;
            const navbarSelection = visibleConfigSections.find((s) => s.type === "navbar");
            const bodyConfigSections =
              isAboutTemplate || isEditorialUtilityTemplate
                ? visibleConfigSections.filter((s) => s.type !== "navbar")
                : visibleConfigSections;
            const totalBlockCount =
              aboutPageSections.length +
              contactPageSections.length +
              legalPageSections.length +
              visibleConfigSections.length +
              (isPricingTemplate ? 1 : 0) +
              (isBlogTemplate ? 1 : 0);

            const renderModularSectionGroup = <TId extends ContactSectionId | LegalSectionId>(
              groupHeading: string,
              blocks: ReadonlyArray<{ id: TId; title: string; variant: string; enabled: boolean }>,
              onToggleBlock: (id: TId, enabled: boolean) => void
            ) => (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-1 pt-1">
                  <span className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                    {groupHeading} ({blocks.length})
                  </span>
                </div>
                {blocks.map((block) => {
                  const isSelected =
                    selectedAboutSection === block.id || inspectorTarget === block.id;
                  return (
                    <div
                      key={block.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setSelectedAboutSection(block.id);
                        if (!block.enabled) {
                          onToggleBlock(block.id, true);
                        }
                        openSectionInspector(block.id as InspectorTarget);
                        triggerScrollToSection(block.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedAboutSection(block.id);
                          if (!block.enabled) {
                            onToggleBlock(block.id, true);
                          }
                          openSectionInspector(block.id as InspectorTarget);
                          triggerScrollToSection(block.id);
                        }
                      }}
                      className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-3 transition-[border-color,background-color,box-shadow,opacity] duration-200 ${
                        isSelected
                          ? "border-zinc-900 bg-zinc-50/90 shadow-md ring-2 ring-zinc-900/10 dark:border-white/90 dark:bg-[#1a1b1f] dark:ring-white/10"
                          : block.enabled
                            ? "border-zinc-200/80 bg-white hover:border-zinc-400 hover:shadow-2xs dark:border-zinc-800 dark:bg-[#161618] dark:hover:border-zinc-700"
                            : "border-dashed border-zinc-200 bg-zinc-50/50 opacity-40 dark:border-zinc-800 dark:bg-[#141416]/50"
                      }`}
                    >
                      <div className="flex items-center justify-between pb-1">
                        <span className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          {block.title}
                        </span>
                        <div
                          className="flex shrink-0 items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              const nextEnabled = !block.enabled;
                              onToggleBlock(block.id, nextEnabled);
                              setStatus(`${block.title} ${nextEnabled ? "shown" : "hidden"}.`);
                            }}
                            aria-label={
                              block.enabled ? `Hide ${block.title}` : `Show ${block.title}`
                            }
                            className="p-1 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                          >
                            {block.enabled ? (
                              <Eye className="h-3.5 w-3.5" />
                            ) : (
                              <EyeOff className="h-3.5 w-3.5 text-zinc-500" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="pt-1">
                        <div className="flex items-center justify-center rounded-xl border border-black/[0.04] bg-zinc-100/70 p-2.5 dark:border-white/[0.06] dark:bg-[#0e0f11]">
                          <SectionWireframeSvg type={block.id} variant={block.variant} />
                        </div>
                      </div>

                      {isSelected && (
                        <div className="absolute top-0 right-0 h-3 w-3 rounded-bl-lg bg-zinc-900 dark:bg-white" />
                      )}
                    </div>
                  );
                })}
              </div>
            );

            const templateFocusBlock = isBlogTemplate
              ? {
                  id: (isBlogPostTemplate ? "blog-post" : "blog-index") as
                    "blog-post" | "blog-index",
                  title: isBlogPostTemplate ? "Single Post Reader" : "Blog Journal",
                  variant: isBlogPostTemplate ? "longform-comments" : "editorial-feed",
                }
              : null;

            const renderConfigSectionCard = (selection: LandingSectionSelection, index: number) => (
              <SectionThumbnailCard
                key={selection.type}
                selection={selection}
                index={index}
                totalSections={config.sections.length}
                isSelected={!selectedAboutSection && inspectorTarget === selection.type}
                onSelect={() => {
                  setSelectedAboutSection(null);
                  openSectionInspector(selection.type);
                  triggerScrollToSection(selection.type);
                }}
                onToggleEnabled={(enabled) => {
                  update(selection.type, { enabled });
                  setStatus(`${selection.type} ${enabled ? "shown" : "hidden"}.`);
                }}
                onMoveUp={
                  selection.type !== "navbar" && selection.type !== "footer"
                    ? () => {
                        setProject((previous) =>
                          movePageSection(previous, currentPage.id, selection.type, "up")
                        );
                        setStatus(`${selection.type} moved up.`);
                      }
                    : undefined
                }
                onMoveDown={
                  selection.type !== "navbar" && selection.type !== "footer"
                    ? () => {
                        setProject((previous) =>
                          movePageSection(previous, currentPage.id, selection.type, "down")
                        );
                        setStatus(`${selection.type} moved down.`);
                      }
                    : undefined
                }
              />
            );

            return (
              <div
                id="builder-sections"
                className="scrollbar-hide relative z-10 flex-1 space-y-2.5 overflow-x-hidden overflow-y-auto pr-1"
              >
                <div className="flex items-center justify-between gap-2 px-1 pb-1">
                  <span className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                    Page Blocks ({totalBlockCount})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setInsertAfterSection(undefined);
                      setAddSectionOpen(true);
                    }}
                    className="inline-flex items-center gap-1 rounded-md border border-zinc-200/80 bg-white px-2 py-0.5 text-[10px] font-semibold text-zinc-700 hover:border-zinc-400 hover:text-zinc-950 dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-200 dark:hover:bg-white/10"
                  >
                    <Plus className="h-3 w-3" />
                    Add
                  </button>
                </div>

                {announcementCard}

                {(isAboutTemplate || isEditorialUtilityTemplate) &&
                  navbarSelection &&
                  renderConfigSectionCard(navbarSelection, 0)}

                {templateFocusBlock &&
                  (() => {
                    const isSelected =
                      selectedAboutSection === templateFocusBlock.id ||
                      inspectorTarget === templateFocusBlock.id;
                    return (
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          setSelectedAboutSection(templateFocusBlock.id);
                          openSectionInspector(templateFocusBlock.id);
                          triggerScrollToSection(templateFocusBlock.id);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedAboutSection(templateFocusBlock.id);
                            openSectionInspector(templateFocusBlock.id);
                            triggerScrollToSection(templateFocusBlock.id);
                          }
                        }}
                        className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-3 transition-[border-color,background-color,box-shadow] duration-200 ${
                          isSelected
                            ? "border-zinc-900 bg-zinc-50/90 shadow-md ring-2 ring-zinc-900/10 dark:border-white/90 dark:bg-[#1a1b1f] dark:ring-white/10"
                            : "border-zinc-200/80 bg-white hover:border-zinc-400 hover:shadow-2xs dark:border-zinc-800 dark:bg-[#161618] dark:hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-center justify-between pb-1">
                          <span className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                            {templateFocusBlock.title}
                          </span>
                        </div>
                        <div className="pt-1">
                          <div className="flex items-center justify-center rounded-xl border border-black/[0.04] bg-zinc-100/70 p-2.5 dark:border-white/[0.06] dark:bg-[#0e0f11]">
                            <SectionWireframeSvg
                              type={templateFocusBlock.id}
                              variant={templateFocusBlock.variant}
                            />
                          </div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-0 right-0 h-3 w-3 rounded-bl-lg bg-zinc-900 dark:bg-white" />
                        )}
                      </div>
                    );
                  })()}

                {isContactTemplate &&
                  contactPageSections.length > 0 &&
                  renderModularSectionGroup(
                    "Contact Us Sections",
                    contactPageSections,
                    toggleContactSectionEnabled
                  )}

                {isLegalTemplate &&
                  legalPageSections.length > 0 &&
                  renderModularSectionGroup(
                    "Legal Sections",
                    legalPageSections,
                    toggleLegalSectionEnabled
                  )}

                {isAboutTemplate && aboutPageSections.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between px-1 pt-1">
                      <span className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                        About Us Sections ({aboutPageSections.length})
                      </span>
                    </div>
                    {aboutPageSections.map((block) => {
                      const isSelected =
                        selectedAboutSection === block.id || inspectorTarget === block.id;
                      return (
                        <div
                          key={block.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            setSelectedAboutSection(block.id);
                            if (!block.enabled) {
                              toggleAboutSectionEnabled(block.id, true);
                            }
                            openSectionInspector(block.id);
                            triggerScrollToSection(block.id);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setSelectedAboutSection(block.id);
                              if (!block.enabled) {
                                toggleAboutSectionEnabled(block.id, true);
                              }
                              openSectionInspector(block.id);
                              triggerScrollToSection(block.id);
                            }
                          }}
                          className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-3 transition-[border-color,background-color,box-shadow,opacity] duration-200 ${
                            isSelected
                              ? "border-zinc-900 bg-zinc-50/90 shadow-md ring-2 ring-zinc-900/10 dark:border-white/90 dark:bg-[#1a1b1f] dark:ring-white/10"
                              : block.enabled
                                ? "border-zinc-200/80 bg-white hover:border-zinc-400 hover:shadow-2xs dark:border-zinc-800 dark:bg-[#161618] dark:hover:border-zinc-700"
                                : "border-dashed border-zinc-200 bg-zinc-50/50 opacity-40 dark:border-zinc-800 dark:bg-[#141416]/50"
                          }`}
                        >
                          <div className="flex items-center justify-between pb-1">
                            <span className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                              {block.title}
                            </span>
                            <div
                              className="flex shrink-0 items-center gap-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  const nextEnabled = !block.enabled;
                                  toggleAboutSectionEnabled(block.id, nextEnabled);
                                  setStatus(`${block.title} ${nextEnabled ? "shown" : "hidden"}.`);
                                }}
                                aria-label={
                                  block.enabled ? `Hide ${block.title}` : `Show ${block.title}`
                                }
                                className="p-1 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                              >
                                {block.enabled ? (
                                  <Eye className="h-3.5 w-3.5" />
                                ) : (
                                  <EyeOff className="h-3.5 w-3.5 text-zinc-500" />
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="pt-1">
                            <div className="flex items-center justify-center rounded-xl border border-black/[0.04] bg-zinc-100/70 p-2.5 dark:border-white/[0.06] dark:bg-[#0e0f11]">
                              <SectionWireframeSvg type={block.id} variant={block.variant} />
                            </div>
                          </div>

                          {isSelected && (
                            <div className="absolute top-0 right-0 h-3 w-3 rounded-bl-lg bg-zinc-900 dark:bg-white" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {bodyConfigSections.map((selection) => {
                  const realIndex = config.sections.findIndex((s) => s.type === selection.type);
                  const compareCard =
                    isPricingTemplate && selection.type === "faq" ? (
                      <div
                        key="pricing-compare"
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          setSelectedAboutSection("pricing-compare");
                          if (!pricingCompareShown) {
                            setProject((previous) => ({
                              ...previous,
                              pages: previous.pages.map((p) =>
                                p.id === previous.activePageId
                                  ? togglePricingCompareSection(p, true)
                                  : p
                              ),
                            }));
                          }
                          openSectionInspector("pricing-compare");
                          triggerScrollToSection("pricing-compare");
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedAboutSection("pricing-compare");
                            if (!pricingCompareShown) {
                              setProject((previous) => ({
                                ...previous,
                                pages: previous.pages.map((p) =>
                                  p.id === previous.activePageId
                                    ? togglePricingCompareSection(p, true)
                                    : p
                                ),
                              }));
                            }
                            openSectionInspector("pricing-compare");
                            triggerScrollToSection("pricing-compare");
                          }
                        }}
                        className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-3 transition-[border-color,background-color,box-shadow,opacity] duration-200 ${
                          selectedAboutSection === "pricing-compare" ||
                          inspectorTarget === "pricing-compare"
                            ? "border-zinc-900 bg-zinc-50/90 shadow-md ring-2 ring-zinc-900/10 dark:border-white/90 dark:bg-[#1a1b1f] dark:ring-white/10"
                            : pricingCompareShown
                              ? "border-zinc-200/80 bg-white hover:border-zinc-400 hover:shadow-2xs dark:border-zinc-800 dark:bg-[#161618] dark:hover:border-zinc-700"
                              : "border-dashed border-zinc-200 bg-zinc-50/50 opacity-40 dark:border-zinc-800 dark:bg-[#141416]/50"
                        }`}
                      >
                        <div className="flex items-center justify-between pb-1">
                          <span className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                            Pricing Compare
                          </span>
                          <div
                            className="flex shrink-0 items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                const nextEnabled = !pricingCompareShown;
                                setProject((previous) => ({
                                  ...previous,
                                  pages: previous.pages.map((p) =>
                                    p.id === previous.activePageId
                                      ? togglePricingCompareSection(p, nextEnabled)
                                      : p
                                  ),
                                }));
                                setStatus(`Pricing Compare ${nextEnabled ? "shown" : "hidden"}.`);
                              }}
                              aria-label={
                                pricingCompareShown
                                  ? "Hide Pricing Compare"
                                  : "Show Pricing Compare"
                              }
                              className="p-1 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                            >
                              {pricingCompareShown ? (
                                <Eye className="h-3.5 w-3.5" />
                              ) : (
                                <EyeOff className="h-3.5 w-3.5 text-zinc-500" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="pt-1">
                          <div className="flex items-center justify-center rounded-xl border border-black/[0.04] bg-zinc-100/70 p-2.5 dark:border-white/[0.06] dark:bg-[#0e0f11]">
                            <SectionWireframeSvg type="pricing-compare" variant="compare-matrix" />
                          </div>
                        </div>

                        {selectedAboutSection === "pricing-compare" && (
                          <div className="absolute top-0 right-0 h-3 w-3 rounded-bl-lg bg-zinc-900 dark:bg-white" />
                        )}
                      </div>
                    ) : null;

                  return (
                    <React.Fragment key={selection.type}>
                      {compareCard}
                      {renderConfigSectionCard(selection, realIndex)}
                    </React.Fragment>
                  );
                })}
              </div>
            );
          })()}

        {/* TAB 2: INSPECTOR (Clean Section & Core Component Tree -> Right Floating Editor) */}
        {sidebarTab === "inspector" && (
          <div
            id="builder-inspector"
            className="scrollbar-hide relative z-10 flex-1 overflow-x-hidden overflow-y-auto pr-1"
          >
            <BuilderTreeInspector
              project={project}
              page={currentPage}
              selectedTarget={inspectorTarget}
              selectedNode={selectedCoreNode}
              selectedItemIndex={selectedItemIndex}
              iframeDoc={iframeDoc}
              activeSlideIndex={activeSlideIndex}
              onSelectSlide={handleSelectSlide}
              onSelect={(target, node, itemIdx) => {
                const resolvedTarget = target as InspectorTarget;
                setSelectedAboutSection(
                  MODULAR_TARGET_IDS.has(String(resolvedTarget))
                    ? (resolvedTarget as
                        | AboutSectionId
                        | ContactSectionId
                        | LegalSectionId
                        | "pricing-compare"
                        | "blog-index"
                        | "blog-post")
                    : null
                );
                openSectionInspector(resolvedTarget, node ?? "section", itemIdx ?? null);
                triggerScrollToSection(String(resolvedTarget));
              }}
              onOpenPageSettings={() => setRightPanelMode("page")}
              onOpenThemeStudio={() => setRightPanelMode("theme")}
            />
          </div>
        )}
      </aside>

      {/* 1. FLOATING HIGH-FIDELITY ISOLATED HOVER PREVIEW */}
      <VariantHoverPreview
        hoveredVariant={hoveredVariant && !isSidebarHidden ? hoveredVariant : null}
        content={resolvedContent}
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
        className={`flex min-h-screen min-w-0 flex-1 flex-col transition-[padding] duration-300 ease-in-out ${
          isSidebarHidden ? "lg:pl-0" : "lg:pl-[20.5rem]"
        } ${rightPanelMode !== null && !isSidebarHidden ? "lg:pr-[22rem]" : ""}`}
      >
        {/* CENTER FULL WEBSITE PREVIEW CANVAS */}
        <div
          id="builder-workspace"
          className={`flex flex-1 flex-col items-center transition-all duration-300 ${
            isSidebarHidden && viewport === "desktop"
              ? "m-0 w-full p-0 pb-24"
              : "px-4 pt-3 pb-24 sm:px-6 lg:px-6"
          }`}
        >
          {/* Single Consolidated Top Nav & Canvas Control Bar */}
          <header
            aria-label="Builder toolbar"
            onMouseEnter={() => {
              if (topBarTimerRef.current) clearTimeout(topBarTimerRef.current);
              setIsTopBarHidden(false);
            }}
            onMouseLeave={() => {
              if (isSidebarHidden) {
                topBarTimerRef.current = setTimeout(() => setIsTopBarHidden(true), 3000);
              }
            }}
            className={`${
              isSidebarHidden && viewport === "desktop"
                ? "fixed top-3 right-4 left-4 z-50 w-auto"
                : "sticky top-3 z-40 mb-2.5 w-full"
            } flex flex-nowrap items-center justify-between gap-1.5 rounded-xl border border-black/[0.06] bg-white/90 px-2 py-1.5 text-xs text-zinc-600 shadow-2xs backdrop-blur-xl transition-all duration-300 dark:border-white/[0.08] dark:bg-[#161618]/90 dark:text-zinc-300 ${
              isTopBarHidden
                ? "pointer-events-none -translate-y-[150%] opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            {/* Left: Mobile Sidebar Drawer Toggle + Back/Forward + Route Selector */}
            <div className="flex min-w-0 flex-1 items-center gap-1 sm:flex-none">
              <button
                type="button"
                onClick={() => {
                  setIsSidebarHidden(false);
                  setIsMobileDrawerOpen(!isMobileDrawerOpen);
                }}
                className="rounded-md p-1 text-zinc-600 transition-colors hover:bg-black/5 hover:text-zinc-900 lg:hidden dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100"
                aria-label="Open sidebar"
              >
                <Menu className="h-4 w-4" />
              </button>

              <Button
                variant="plain"
                size="sm"
                isIconOnly
                aria-label="Previous preview page"
                disabled={!backHistory.some((id) => project.pages.some((p) => p.id === id))}
                onClick={() => {
                  const valid = backHistory.filter((id) => project.pages.some((p) => p.id === id));
                  const id = valid.pop();
                  setBackHistory(valid);
                  if (id) {
                    setForwardHistory((prev) => [...prev, currentPage.id]);
                    setTesting404(false);
                    setProject((previous) => ({ ...previous, activePageId: id }));
                    const nextPage = project.pages.find((p) => p.id === id);
                    if (nextPage) setInspectorTarget(defaultInspectorTargetForPage(nextPage));
                  }
                }}
              >
                <BackIcon size={14} />
              </Button>
              <Button
                variant="plain"
                size="sm"
                isIconOnly
                aria-label="Forward preview page"
                disabled={!forwardHistory.some((id) => project.pages.some((p) => p.id === id))}
                onClick={() => {
                  const valid = forwardHistory.filter((id) =>
                    project.pages.some((p) => p.id === id)
                  );
                  const id = valid.pop();
                  setForwardHistory(valid);
                  if (id) {
                    setBackHistory((prev) => [...prev, currentPage.id]);
                    setTesting404(false);
                    setProject((previous) => ({ ...previous, activePageId: id }));
                    const nextPage = project.pages.find((p) => p.id === id);
                    if (nextPage) setInspectorTarget(defaultInspectorTargetForPage(nextPage));
                  }
                }}
              >
                <ForwardIcon size={14} />
              </Button>

              <div className="min-w-0 flex-1 min-[1420px]:w-[160px] sm:w-[132px] sm:flex-none">
                <Select
                  value={testing404 ? "__missing-404__" : currentPage.id}
                  onValueChange={(val) => {
                    if (val === "__missing-404__") {
                      setTesting404(true);
                      setInspectorTarget("not-found");
                    } else {
                      selectPage(val, true);
                    }
                  }}
                >
                  {project.pages.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} ({p.path})
                    </SelectItem>
                  ))}
                  {testing404 && (
                    <SelectItem value="__missing-404__">Missing Route (/missing-page)</SelectItem>
                  )}
                </Select>
              </div>
            </div>

            {/* Right: Undo/Redo, Width/Grid, Responsive Icons, Fullscreen & Export */}
            <div className="flex shrink-0 items-center justify-end gap-1.5">
              {/* Undo / Redo */}
              <div className="hidden h-7 shrink-0 items-center gap-0.5 rounded-lg border border-black/[0.06] bg-zinc-100/80 p-0.5 sm:flex dark:border-white/[0.08] dark:bg-[#121214]">
                <button
                  type="button"
                  disabled={!canUndo}
                  onClick={handleUndo}
                  aria-label="Undo"
                  title="Undo (Cmd/Ctrl+Z)"
                  className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-white hover:text-zinc-950 disabled:opacity-30 dark:text-zinc-400 dark:hover:bg-[#28292d] dark:hover:text-white"
                >
                  <Undo2 className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  disabled={!canRedo}
                  onClick={handleRedo}
                  aria-label="Redo"
                  title="Redo (Cmd/Ctrl+Shift+Z)"
                  className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-white hover:text-zinc-950 disabled:opacity-30 dark:text-zinc-400 dark:hover:bg-[#28292d] dark:hover:text-white"
                >
                  <Redo2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {viewport === "desktop" && activeTab === "preview" && (
                <select
                  aria-label="Desktop canvas virtual width"
                  value={desktopViewportWidth}
                  onChange={(e) =>
                    setDesktopViewportWidth(e.target.value as "1280" | "1440" | "auto")
                  }
                  className="hidden h-7 w-[112px] shrink-0 cursor-pointer rounded-lg border border-black/[0.08] bg-white px-1.5 text-[11px] font-medium text-zinc-700 transition-colors hover:border-zinc-400 sm:inline-flex xl:w-auto xl:px-2 dark:border-white/[0.08] dark:bg-[#1e1e22] dark:text-zinc-200 dark:hover:border-white/25"
                  title="Desktop viewport virtual width (scales cleanly to fit available canvas space)"
                >
                  <option value="1280">
                    1280px ·{" "}
                    {desktopViewportWidth === "1280" ? `${Math.round(canvasScale * 100)}%` : "Fit"}
                  </option>
                  <option value="1440">
                    1440px ·{" "}
                    {desktopViewportWidth === "1440" ? `${Math.round(canvasScale * 100)}%` : "Fit"}
                  </option>
                  <option value="auto">Auto · 100%</option>
                </select>
              )}

              {activeTab === "preview" && interactionMode === "edit" && (
                <button
                  type="button"
                  onClick={() => setShowGridGuides((prev) => !prev)}
                  aria-label="Toggle canvas grid guides"
                  aria-pressed={showGridGuides}
                  title="Toggle CSS grid guides (G)"
                  className={`hidden h-7 w-7 shrink-0 items-center justify-center gap-1 rounded-lg border px-0 text-[11px] font-medium transition-colors sm:inline-flex xl:w-auto xl:px-2 ${
                    showGridGuides
                      ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300"
                      : "border-black/[0.08] bg-white text-zinc-600 hover:text-zinc-950 dark:border-white/[0.08] dark:bg-[#1e1e22] dark:text-zinc-300 dark:hover:text-white"
                  }`}
                >
                  <Grid2x2 className="h-3 w-3" />
                  <span className="hidden xl:inline">Grid</span>
                </button>
              )}

              {/* Responsive Viewport Icons */}
              <div
                className="hidden h-7 shrink-0 items-center gap-0.5 rounded-lg border border-black/[0.06] bg-zinc-100/80 p-0.5 sm:flex dark:border-white/[0.08] dark:bg-[#121214]"
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
                  title="Desktop viewport"
                  className={`flex h-6 w-6 items-center justify-center rounded-md transition-colors ${
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
                  title="Tablet viewport"
                  className={`flex h-6 w-6 items-center justify-center rounded-md transition-colors ${
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
                  title="Mobile viewport"
                  className={`flex h-6 w-6 items-center justify-center rounded-md transition-colors ${
                    viewport === "mobile" && activeTab === "preview"
                      ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#28292d] dark:text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (isSidebarHidden) {
                    exitFullscreen();
                  } else {
                    setIsSidebarHidden(true);
                    setRightPanelMode(null);
                    setStatus("Entered full-width preview. Press Esc or edge hotspot to return.");
                  }
                }}
                aria-label={isSidebarHidden ? "Exit fullscreen preview" : "Fullscreen preview"}
                title={isSidebarHidden ? "Back to editor (Esc)" : "Expand canvas fullscreen"}
                className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-600 transition-colors hover:text-zinc-950 sm:inline-flex dark:border-white/[0.08] dark:bg-[#1e1e22] dark:text-zinc-300 dark:hover:text-white"
              >
                {isSidebarHidden ? (
                  <Minimize2 className="h-3.5 w-3.5" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" />
                )}
              </button>

              {/* Single Export Button with Dropdown (replaces + Add page) */}
              <div id="builder-export" className="relative shrink-0">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={isExportMenuOpen}
                  onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                  className="inline-flex h-7 items-center gap-1 rounded-lg bg-zinc-900 px-2 text-[11px] font-semibold text-white transition-colors hover:bg-zinc-800 min-[1360px]:px-2.5 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export</span>
                  <ChevronDown className="h-3 w-3 opacity-70" />
                </button>

                <AnimatePresence>
                  {isExportMenuOpen && (
                    <motion.div
                      role="menu"
                      aria-label="Export options"
                      initial={reduced ? { opacity: 1 } : { opacity: 0, y: -4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }}
                      transition={{ duration: reduced ? 0 : 0.14, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full right-0 z-50 mt-2 flex w-60 origin-top-right flex-col gap-0.5 rounded-xl border border-zinc-200/90 bg-white p-1.5 shadow-xl dark:border-white/[0.1] dark:bg-[#1e1e22]"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setCodeInitialFile(
                            resolveSectionFilePath(project, currentPage.id, String(inspectorTarget))
                          );
                          setActiveTab("code");
                          setIsExportMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/[0.08]"
                      >
                        <FileCode2 className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Open Code Studio (Modular)</span>
                      </button>

                      <button
                        type="button"
                        onClick={copy}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/[0.08]"
                      >
                        <Copy className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Copy App.tsx</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          downloadFile("App.tsx", source, "text/plain;charset=utf-8");
                          setIsExportMenuOpen(false);
                          setStatus("Downloaded App.tsx.");
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/[0.08]"
                      >
                        <Download className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Download App.tsx</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          downloadFile(
                            "tokens.css",
                            generateTailwindV4ThemeCss(project.brand, project.tokens),
                            "text/css;charset=utf-8"
                          );
                          setIsExportMenuOpen(false);
                          setStatus("Downloaded tokens.css for Tailwind v4.");
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/[0.08]"
                      >
                        <Download className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Download tokens.css</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          downloadFile(
                            "design-tokens.json",
                            JSON.stringify(
                              generateTokensJson(project.brand, project.tokens),
                              null,
                              2
                            ),
                            "application/json"
                          );
                          setIsExportMenuOpen(false);
                          setStatus("Downloaded W3C design-tokens.json.");
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/[0.08]"
                      >
                        <Download className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Download design-tokens.json</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          downloadFile(
                            "hudbird-website.json",
                            JSON.stringify(project, null, 2),
                            "application/json"
                          );
                          setIsExportMenuOpen(false);
                          setStatus("Downloaded project JSON.");
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/[0.08]"
                      >
                        <Download className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Download project JSON</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          downloadFile(
                            "hudbird-website.recipe.json",
                            JSON.stringify(recipe, null, 2),
                            "application/json"
                          );
                          setIsExportMenuOpen(false);
                          setStatus("Downloaded recipe JSON.");
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/[0.08]"
                      >
                        <Download className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Download recipe</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          importRef.current?.click();
                          setIsExportMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/[0.08]"
                      >
                        <Download className="h-3.5 w-3.5 rotate-180 text-zinc-400" />
                        <span>Import project JSON</span>
                      </button>

                      <div className="my-0.5 h-px bg-zinc-100 dark:bg-white/[0.06]" />

                      <button
                        type="button"
                        onClick={() => {
                          setConfig({
                            ...createLandingPageConfig(),
                            brand: config.brand,
                            themeMode: config.themeMode,
                          });
                          setStatus("Reset current page sections to defaults.");
                          setIsExportMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/[0.08]"
                      >
                        <RotateCcw className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Reset page sections</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {!initial.canSave && (
            <Text variant="small" role="alert" className="mb-3">
              Local saving is unavailable. Export this project to keep your changes.
            </Text>
          )}

          {activeTab === "preview" ? (
            <div
              className={`w-full overflow-clip transition-all duration-300 ${
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
                themeMode={resolvedBrand.mode}
                interactionMode={interactionMode}
                virtualWidth={
                  viewport === "desktop" && desktopViewportWidth !== "auto"
                    ? Number(desktopViewportWidth)
                    : null
                }
                onScaleChange={setCanvasScale}
                onIframeDocumentChange={setIframeDoc}
                onSlideChanged={setActiveSlideIndex}
                singleClickInlineEdit
                widgetPopoverOpen={widgetPopoverOpen}
                onToggleWidgetPopover={(open) =>
                  setWidgetPopoverOpen((prev) => (open !== undefined ? open : !prev))
                }
                renderInlineWidgetPopover={({ close }) => (
                  <SectionEditorPanel
                    project={project}
                    page={currentPage}
                    selectedTarget={inspectorTarget}
                    selectedNode={selectedCoreNode}
                    selectedItemIndex={selectedItemIndex}
                    selectedEditPath={selectedEditPath}
                    iframeDoc={iframeDoc}
                    activeSlideIndex={activeSlideIndex}
                    onSelectSlide={handleSelectSlide}
                    showGridOverlay={showGridGuides}
                    onToggleGridOverlay={() => setShowGridGuides((prev) => !prev)}
                    onSelectNode={handleSelectCoreNode}
                    showHeaderBackButton={false}
                    displayMode="popover"
                    onClosePopover={close}
                    onChange={setProject}
                    onBack={close}
                    onSelectPage={(pageId) => {
                      close();
                      selectPage(pageId, true);
                    }}
                    onHoverVariant={setHoveredVariant}
                  />
                )}
                selectedSection={inspectorTarget}
                selectedCoreNode={selectedCoreNode}
                selectedItemIndex={selectedItemIndex}
                showGridOverlay={showGridGuides}
                onToggleGridOverlay={() => setShowGridGuides((prev) => !prev)}
                activeSectionMeta={activeSectionMeta}
                onSectionAction={handleSectionAction}
                onStepSection={handleStepSection}
                onUndo={handleUndo}
                onRedo={handleRedo}
                onSelectSection={(secType, meta?: SelectionTargetMeta) => {
                  const normalized = (
                    secType === "logo-cloud" ? "logos" : secType
                  ) as InspectorTarget;
                  setSelectedAboutSection(
                    MODULAR_TARGET_IDS.has(String(normalized))
                      ? (normalized as
                          | AboutSectionId
                          | ContactSectionId
                          | LegalSectionId
                          | "pricing-compare"
                          | "blog-index"
                          | "blog-post")
                      : null
                  );
                  openSectionInspector(
                    normalized,
                    (meta?.coreNode as SelectedCoreNode | undefined) ?? "section",
                    meta?.itemIndex ?? null,
                    { openPopover: false, editPath: meta?.editPath ?? null }
                  );
                  setContextMenu((prev) => (prev.isOpen ? { ...prev, isOpen: false } : prev));
                }}
                onInlineEdit={(editKey, value, secType) => {
                  setProject((prev) => updateInlineContent(prev, currentPage.id, editKey, value));
                  if (secType) {
                    const normalized = (
                      secType === "logo-cloud" ? "logos" : secType
                    ) as InspectorTarget;
                    setInspectorTarget(normalized);
                  }
                  setStatus(`Updated ${editKey} inline.`);
                }}
                onContextMenuSection={
                  isSectionPage(currentPage) ? handleContextMenuSection : undefined
                }
                onEscape={exitFullscreen}
                scrollToSection={scrollTarget}
              >
                <WebsiteProjectPage
                  project={{
                    ...project,
                    brand: { ...project.brand, mode: resolvedBrand.mode },
                    themeMode: resolvedBrand.mode,
                  }}
                  pageId={testing404 ? "__missing-404__" : currentPage.id}
                  interactionMode={interactionMode}
                  renderCustomPage={sandboxHooks.renderCustomPage}
                  renderCustomSection={sandboxHooks.renderCustomSection}
                  onNavigate={(id) => selectPage(id, true)}
                />
              </IframePreview>
            </div>
          ) : (
            <div id="builder-source-preview" className="w-full">
              <MultiFileCodeViewer
                project={project}
                onChangeProject={(updater) => setProject((prev) => updater(prev))}
                initialFilePath={codeInitialFile}
                activePageId={currentPage.id}
                onSelectPage={(id) =>
                  setProject((previous) =>
                    previous.activePageId === id ? previous : { ...previous, activePageId: id }
                  )
                }
                themeMode={resolvedBrand.mode}
              />
            </div>
          )}
        </div>
      </main>

      {/* Figma-Style Bottom Floating Canvas Dock */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 transition-[padding,transform,opacity] duration-300 ease-in-out ${
          isSidebarHidden ? "lg:pl-0" : "lg:pl-[20.5rem]"
        } ${rightPanelMode !== null && !isSidebarHidden ? "lg:pr-[22rem]" : ""} ${
          isTopBarHidden ? "translate-y-24 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div
          id="builder-bottom-dock"
          role="toolbar"
          aria-label="Canvas floating dock"
          onMouseEnter={() => {
            if (topBarTimerRef.current) clearTimeout(topBarTimerRef.current);
            setIsTopBarHidden(false);
          }}
          className="pointer-events-auto inline-flex max-w-full items-center gap-1.5 rounded-2xl border border-black/[0.08] bg-white/95 p-1.5 text-xs text-zinc-700 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-xl dark:border-white/[0.1] dark:bg-[#1a1a1d]/95 dark:text-zinc-200 dark:shadow-[0_12px_36px_rgb(0,0,0,0.45)]"
        >
          {/* Edit vs Navigate Interaction Mode (Figma UI3 Blue Primary Active Pill) */}
          <div
            role="group"
            aria-label="Canvas interaction mode"
            className="flex h-8 items-center gap-0.5 rounded-xl bg-zinc-100/90 p-0.5 dark:bg-black/40"
          >
            <button
              type="button"
              aria-label="Edit mode"
              aria-pressed={interactionMode === "edit" && activeTab === "preview"}
              onClick={() => {
                setActiveTab("preview");
                setInteractionMode("edit");
              }}
              className={`relative inline-flex h-7 min-w-[32px] items-center justify-center gap-1.5 rounded-[10px] px-2 text-[11px] font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:outline-none sm:px-2.5 ${
                interactionMode === "edit" && activeTab === "preview"
                  ? "text-white"
                  : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              }`}
              title="Click text on canvas to edit inline, or components for widget settings"
            >
              {interactionMode === "edit" && activeTab === "preview" && (
                <motion.span
                  layoutId="bottom-dock-interaction-pill"
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 520, damping: 38, mass: 0.6 }
                  }
                  className="absolute inset-0 rounded-[10px] bg-blue-600 shadow-xs"
                />
              )}
              <MousePointer2 className="relative z-10 h-3.5 w-3.5" />
              <span className="relative z-10 hidden sm:inline">Edit</span>
            </button>

            <button
              type="button"
              aria-label="Navigate mode"
              aria-pressed={interactionMode === "navigate" && activeTab === "preview"}
              onClick={() => {
                setActiveTab("preview");
                setInteractionMode("navigate");
              }}
              className={`relative inline-flex h-7 min-w-[32px] items-center justify-center gap-1.5 rounded-[10px] px-2 text-[11px] font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:outline-none sm:px-2.5 ${
                interactionMode === "navigate" && activeTab === "preview"
                  ? "text-white"
                  : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              }`}
              title="Click links, buttons, and multipage flows live"
            >
              {interactionMode === "navigate" && activeTab === "preview" && (
                <motion.span
                  layoutId="bottom-dock-interaction-pill"
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 520, damping: 38, mass: 0.6 }
                  }
                  className="absolute inset-0 rounded-[10px] bg-blue-600 shadow-xs"
                />
              )}
              <Globe className="relative z-10 h-3.5 w-3.5" />
              <span className="relative z-10 hidden sm:inline">Navigate</span>
            </button>
          </div>

          {isSectionPage(currentPage) && (
            <>
              <div
                className="h-5 w-px shrink-0 bg-black/[0.08] dark:bg-white/[0.1]"
                aria-hidden="true"
              />
              <button
                type="button"
                aria-label="Add section"
                onClick={() => {
                  setActiveTab("preview");
                  setAddSectionOpen(true);
                }}
                title="Insert new section onto this page"
                className="inline-flex h-8 min-w-[32px] items-center justify-center gap-1.5 rounded-xl px-2 text-[11px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:outline-none md:px-2.5 dark:text-zinc-300 dark:hover:bg-white/[0.08] dark:hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Section</span>
              </button>
            </>
          )}

          <div
            className="h-5 w-px shrink-0 bg-black/[0.08] dark:bg-white/[0.1]"
            aria-hidden="true"
          />

          {/* Mode Toggles: Preview <-> Code & Light <-> Dark */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              role="switch"
              aria-checked={activeTab === "code"}
              aria-label="Toggle Preview and Code mode"
              title={
                activeTab === "code"
                  ? "Code mode active — click to switch to Preview"
                  : "Preview mode active — click to switch to Code"
              }
              onClick={() => {
                if (activeTab === "preview") {
                  setCodeInitialFile(
                    resolveSectionFilePath(project, currentPage.id, String(inspectorTarget))
                  );
                  setActiveTab("code");
                } else {
                  setActiveTab("preview");
                }
              }}
              className="relative inline-flex h-8 items-center rounded-xl border border-black/[0.06] bg-zinc-100/90 p-0.5 transition-colors hover:border-black/[0.14] focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:outline-none dark:border-white/[0.08] dark:bg-black/40 dark:hover:border-white/[0.16]"
            >
              <span
                className={`relative inline-flex h-7 min-w-[32px] items-center justify-center gap-1.5 rounded-[10px] px-2 text-[11px] font-medium transition-colors sm:px-2.5 ${
                  activeTab === "preview"
                    ? "text-blue-600 dark:text-sky-400"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {activeTab === "preview" && (
                  <motion.span
                    layoutId="bottom-dock-view-pill"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 520, damping: 38, mass: 0.6 }
                    }
                    className="absolute inset-0 rounded-[10px] bg-white shadow-2xs dark:bg-[#28292d]"
                  />
                )}
                <Eye className="relative z-10 h-3.5 w-3.5" />
                <span className="relative z-10 hidden sm:inline">Preview</span>
              </span>
              <span
                className={`relative inline-flex h-7 min-w-[32px] items-center justify-center gap-1.5 rounded-[10px] px-2 text-[11px] font-medium transition-colors sm:px-2.5 ${
                  activeTab === "code"
                    ? "text-blue-600 dark:text-sky-400"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {activeTab === "code" && (
                  <motion.span
                    layoutId="bottom-dock-view-pill"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 520, damping: 38, mass: 0.6 }
                    }
                    className="absolute inset-0 rounded-[10px] bg-white shadow-2xs dark:bg-[#28292d]"
                  />
                )}
                <Code2 className="relative z-10 h-3.5 w-3.5" />
                <span className="relative z-10 hidden sm:inline">Code</span>
              </span>
            </button>

            <button
              type="button"
              role="switch"
              aria-checked={resolvedBrand.mode === "dark"}
              aria-label="Toggle Light and Dark mode"
              title={`Toggle Light / Dark mode (current: ${resolvedBrand.mode})`}
              onClick={() => applyThemeMode(resolvedBrand.mode === "dark" ? "light" : "dark")}
              className="relative inline-flex h-8 items-center rounded-xl border border-black/[0.06] bg-zinc-100/90 p-0.5 transition-colors hover:border-black/[0.14] focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:outline-none dark:border-white/[0.08] dark:bg-black/40 dark:hover:border-white/[0.16]"
            >
              <span
                className={`relative flex h-7 w-7 items-center justify-center rounded-[10px] transition-colors ${
                  resolvedBrand.mode === "light"
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-zinc-400 dark:text-zinc-500"
                }`}
              >
                {resolvedBrand.mode === "light" && (
                  <motion.span
                    layoutId="bottom-dock-theme-pill"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 520, damping: 38, mass: 0.6 }
                    }
                    className="absolute inset-0 rounded-[10px] bg-white shadow-2xs dark:bg-[#28292d]"
                  />
                )}
                <Sun className="relative z-10 h-3.5 w-3.5" />
              </span>
              <span
                className={`relative flex h-7 w-7 items-center justify-center rounded-[10px] transition-colors ${
                  resolvedBrand.mode === "dark"
                    ? "text-zinc-900 dark:text-sky-300"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {resolvedBrand.mode === "dark" && (
                  <motion.span
                    layoutId="bottom-dock-theme-pill"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 520, damping: 38, mass: 0.6 }
                    }
                    className="absolute inset-0 rounded-[10px] bg-white shadow-2xs dark:bg-[#28292d]"
                  />
                )}
                <Moon className="relative z-10 h-3.5 w-3.5" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Unified Right Floating Settings & Inspector Drawer */}
      <AnimatePresence>
        {rightPanelMode !== null && !isSidebarHidden && (
          <motion.aside
            aria-label={rightPanelMode === "page" ? "Page settings" : "Theme and Design Tokens"}
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: "100%" }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: "100%" }}
            transition={drawerTransition(reduced)}
            className="fixed top-20 right-3 bottom-3 z-40 flex w-[calc(100vw-24px)] max-w-[336px] flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/95 text-zinc-900 shadow-2xl backdrop-blur-xl sm:right-4 sm:bottom-4 dark:border-white/[0.08] dark:bg-[#161618]/95 dark:text-zinc-100"
          >
            {/* Compact Mode Switcher Header */}
            <div className="flex items-center justify-between gap-2 border-b border-zinc-200/80 px-3 py-2.5 dark:border-white/[0.08]">
              <div
                role="tablist"
                aria-label="Right inspector panel mode"
                className="grid flex-1 grid-cols-2 gap-0.5 rounded-xl bg-zinc-100 p-0.5 dark:bg-black/35"
              >
                {(
                  [
                    { id: "page", label: "Page" },
                    { id: "theme", label: "Theme" },
                  ] as const
                ).map(({ id, label }) => {
                  const active = rightPanelMode === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setRightPanelMode(id)}
                      className={`rounded-lg py-1.5 text-[11px] font-semibold transition-colors ${
                        active
                          ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#27272b] dark:text-white"
                          : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setRightPanelMode(null)}
                aria-label="Close inspector drawer"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/[0.08] dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {rightPanelMode === "page" && (
              <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto px-4 py-4">
                <PageSettings
                  key={currentPage.id}
                  project={project}
                  onChange={setProject}
                  onClose={() => setRightPanelMode(null)}
                  embedded
                />
              </div>
            )}

            {rightPanelMode === "theme" && (
              <DesignTokenStudioDrawer
                project={project}
                onChange={setProject}
                onThemeModeChange={applyThemeMode}
                onClose={() => setRightPanelMode(null)}
                embedded
              />
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Modals */}
      {addOpen && (
        <AddPageDialog
          onAdd={addPages}
          onApplyStarterPack={applyStarterPack}
          onClose={() => setAddOpen(false)}
        />
      )}
      {addSectionOpen && (
        <AddSectionDialog
          pageSections={currentPage.sections}
          insertAfterType={
            insertAfterSection ??
            (isConfigBodySection(inspectorTarget) ? inspectorTarget : undefined)
          }
          onInsertSection={(sectionType, afterType) => {
            setProject((prev) =>
              enableAndPositionPageSection(prev, currentPage.id, sectionType, afterType)
            );
            setInsertAfterSection(undefined);
            openSectionInspector(sectionType);
            setAddSectionOpen(false);
            triggerScrollToSection(sectionType);
            setStatus(`Added and focused ${sectionType} section.`);
          }}
          onClose={() => {
            setAddSectionOpen(false);
            setInsertAfterSection(undefined);
          }}
        />
      )}
      {flowOpen && (
        <SiteFlowModal
          project={project}
          onSelectPage={(pageId) => {
            selectPage(pageId, true);
            setFlowOpen(false);
          }}
          onAddPageToNavbar={(pageId) => {
            const targetPage = project.pages.find((p) => p.id === pageId);
            if (!targetPage) return;
            setProject((prev) => {
              const eff = getEffectiveSharedSections(prev);
              const existingItems = eff.navbar?.items ?? [];
              if (
                existingItems.some(
                  (item) => item.target.kind === "page" && item.target.pageId === pageId
                )
              ) {
                return prev;
              }
              const nextItems = [
                ...existingItems,
                {
                  id: `nav-${targetPage.id}`,
                  label: targetPage.name,
                  description: `Visit ${targetPage.name}`,
                  target: { kind: "page" as const, pageId: targetPage.id },
                },
              ];
              return syncNavigationFromSharedNavbar({
                ...prev,
                shared: {
                  ...prev.shared,
                  navbar: { ...eff.navbar!, items: nextItems },
                },
              });
            });
            setStatus(`Added ${targetPage.name} to global Navbar.`);
          }}
          onClose={() => setFlowOpen(false)}
        />
      )}

      {/* 5. Section Right-Click Context Menu */}
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
