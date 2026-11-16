// apps/docs/src/components/IframePreview.tsx
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  EyeOff,
  Grid2x2,
  Pencil,
  Plus,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { BUTTON_PRESS_CLASS, popoverTransition } from "./builder/motionPresets";

export interface ContextMenuSectionInfo {
  sectionType: string;
  x: number;
  y: number;
}

export type BuilderCoreNodeKind =
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

export interface SelectionTargetMeta {
  x: number;
  y: number;
  coreNode?: BuilderCoreNodeKind;
  itemIndex?: number | null;
  editPath?: string | null;
}

export interface GridQuickPatch {
  columns?: "auto" | 1 | 2 | 3 | 4;
  gap?: "tight" | "normal" | "relaxed";
  align?: "stretch" | "start" | "center";
}

export type ActiveSectionAction =
  | { type: "move-up"; sectionType: string }
  | { type: "move-down"; sectionType: string }
  | { type: "toggle-hide"; sectionType: string }
  | { type: "open-settings"; sectionType: string }
  | { type: "add-below"; sectionType: string }
  | { type: "set-grid"; sectionType: string; patch: GridQuickPatch };

export interface ActiveSectionMeta {
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  enabled?: boolean;
  supportsGrid?: boolean;
  supportsAddBelow?: boolean;
  canToggleHide?: boolean;
  grid?: GridQuickPatch;
}

export interface WidgetPopoverRenderContext {
  sectionType: string;
  coreNode: BuilderCoreNodeKind;
  itemIndex: number | null;
  editPath?: string | null;
  close: () => void;
}

export interface IframePreviewProps {
  children: React.ReactNode;
  minHeight?: number;
  className?: string;
  flush?: boolean;
  themeMode?: "light" | "dark";
  interactionMode?: "edit" | "navigate";
  selectedSection?: string | null;
  selectedCoreNode?: BuilderCoreNodeKind | null;
  selectedItemIndex?: number | null;
  showGridOverlay?: boolean;
  onToggleGridOverlay?: () => void;
  activeSectionMeta?: ActiveSectionMeta;
  onSectionAction?: (action: ActiveSectionAction) => void;
  onStepSection?: (delta: -1 | 1) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  virtualWidth?: number | null;
  onScaleChange?: (scale: number) => void;
  onSelectSection?: (sectionType: string, meta?: SelectionTargetMeta) => void;
  onInlineEdit?: (editKey: string, value: string, sectionType?: string) => void;
  onPreviewClick?: () => void;
  onContextMenuSection?: (info: ContextMenuSectionInfo) => void;
  onEscape?: () => void;
  scrollToSection?: { type: string; nonce: number } | null;
  onIframeDocumentChange?: (doc: Document | null) => void;
  onSlideChanged?: (index: number) => void;
  singleClickInlineEdit?: boolean;
  widgetPopoverOpen?: boolean;
  onToggleWidgetPopover?: (open?: boolean) => void;
  renderInlineWidgetPopover?: (ctx: WidgetPopoverRenderContext) => React.ReactNode;
}

interface HoveredSectionOverlay {
  sectionType: string;
  top: number;
  left: number;
  width: number;
  editableKey?: string;
  editableRect?: { top: number; left: number; width: number; height: number };
  linkHref?: string;
  linkRect?: { top: number; left: number; width: number; height: number };
}

interface ActiveInlineEdit {
  editKey: string;
  sectionType: string;
  top: number;
  left: number;
  multiline: boolean;
}

interface MeasuredSelectionGeometry {
  sectionType: string;
  top: number;
  left: number;
  width: number;
  height: number;
  nodeRect?: {
    top: number;
    left: number;
    width: number;
    height: number;
  } | null;
  gridOverlay?: {
    top: number;
    left: number;
    width: number;
    height: number;
    columns: Array<{ left: number; width: number }>;
  } | null;
}

const VALID_CORE_NODES = new Set<BuilderCoreNodeKind>([
  "section",
  "heading",
  "text",
  "primary-button",
  "secondary-button",
  "media",
  "card",
  "badge",
  "items",
  "grid",
  "links",
  "brand",
]);

function cssEscape(value: string): string {
  return typeof CSS !== "undefined" && typeof CSS.escape === "function"
    ? CSS.escape(value)
    : value.replace(/"/g, '\\"');
}

function mapEditScopeToSection(scope: string): string {
  if (scope === "notFound") return "not-found";
  if (scope === "logo-cloud") return "logos";
  return scope;
}

function findSectionElement(doc: Document, sectionType: string): HTMLElement | null {
  const normalized = mapEditScopeToSection(sectionType);
  const selector =
    normalized === "logos"
      ? '[data-landing-section="logos"], [data-landing-section="logo-cloud"]'
      : `[data-landing-section="${cssEscape(normalized)}"]`;
  const match = doc.querySelector(selector) as HTMLElement | null;
  if (match) return match;
  const editPrefix = normalized === "not-found" ? "notFound" : normalized;
  const editEl = doc.querySelector(
    `[data-hb-edit^="${cssEscape(editPrefix)}:"]`
  ) as HTMLElement | null;
  return (editEl?.closest("section, header, footer, main, form") as HTMLElement | null) ?? editEl;
}

function resolveEditTextTarget(editEl: HTMLElement): HTMLElement {
  return (editEl.querySelector("[data-hb-edit-text]") as HTMLElement | null) ?? editEl;
}

function serializeEditableNode(root: Node, multiline: boolean): string {
  const walk = (node: Node): string => {
    if (node.nodeType === 3) return node.nodeValue ?? "";
    if (node.nodeType !== 1) return "";
    const el = node as HTMLElement;
    if (el.tagName === "BR") return multiline ? "\n" : " ";
    let inner = "";
    for (const child of Array.from(el.childNodes)) {
      inner += walk(child);
    }
    const isItalic = el.dataset.hbItalic === "true" || el.tagName === "I" || el.tagName === "EM";
    if (isItalic) {
      const cleaned = inner.replace(/^\*+|\*+$/g, "");
      return cleaned ? `*${cleaned}*` : "";
    }
    const isBlock = el.tagName === "DIV" || el.tagName === "P";
    if (multiline && isBlock && el.previousSibling) {
      return `\n${inner}`;
    }
    return inner;
  };
  return walk(root)
    .replace(/\u00a0/g, " ")
    .trim();
}

function formatEditFieldLabel(editKey: string): string {
  const [, rawField = editKey] = editKey.split(":");
  const map: Record<string, string> = {
    title: "Heading",
    heading: "Heading",
    subtitle: "Subtitle",
    subheading: "Subheading",
    description: "Description",
    note: "Note",
    eyebrow: "Eyebrow",
    brandName: "Brand name",
    "primaryAction.label": "Primary button",
    "secondaryAction.label": "Secondary button",
    "action.label": "Button label",
    "badge.label": "Badge",
    "media.caption": "Caption",
  };
  if (map[rawField]) return map[rawField];
  const last = rawField.split(".").pop() || rawField;
  return last.charAt(0).toUpperCase() + last.slice(1);
}

function formatSectionPillLabel(sectionType: string): string {
  const labels: Record<string, string> = {
    announcement: "Announcement",
    navbar: "Navbar",
    hero: "Hero",
    logos: "Logo Cloud",
    "logo-cloud": "Logo Cloud",
    "how-it-works": "How It Works",
    benefits: "Benefits",
    features: "Features",
    integrations: "Integrations",
    testimonials: "Testimonials",
    pricing: "Pricing",
    "pricing-compare": "Pricing Compare",
    faq: "FAQ",
    cta: "CTA",
    footer: "Footer",
    auth: "Auth Card",
    dashboard: "Dashboard",
    "not-found": "404 Page",
    about: "About Intro",
    "who-are-we": "Who We Are",
    "our-team": "Our Team",
    "meet-our-expert": "Meet Experts",
    values: "Values",
    "editorial-cta": "Editorial CTA",
    "contact-mail": "Support Email",
    "contact-form-call": "Contact Form",
    "contact-locations": "Locations",
    "legal-hero": "Legal Header",
    "legal-reader": "Legal Reader",
    "legal-preferences": "Consent & DSAR",
    "blog-index": "Blog Catalog",
    "blog-post": "Blog Article",
  };
  return labels[sectionType] ?? sectionType;
}

function formatCoreNodeBadge(
  node: BuilderCoreNodeKind | null | undefined,
  itemIndex?: number | null
): string | null {
  if (!node || node === "section") return null;
  const map: Record<Exclude<BuilderCoreNodeKind, "section">, string> = {
    heading: "Heading",
    text: "Text",
    "primary-button": "Primary CTA",
    "secondary-button": "Secondary CTA",
    media: "Media",
    card: itemIndex != null ? `Item #${itemIndex + 1}` : "Card",
    badge: "Badge",
    items: itemIndex != null ? `Item #${itemIndex + 1}` : "Items",
    grid: "Grid",
    links: "Links",
    brand: "Brand",
  };
  return map[node] ?? null;
}

function formatLinkPreview(href: string): string {
  const clean = href.replace(/^#\//, "/").trim();
  if (clean.length <= 22) return clean;
  return `${clean.slice(0, 20)}...`;
}

interface DomNodeSnapshot {
  node: ChildNode;
  textData: string | null;
  children: DomNodeSnapshot[];
}

function captureDomSnapshot(parent: Node): DomNodeSnapshot[] {
  return Array.from(parent.childNodes).map((node) => ({
    node,
    textData: node.nodeType === 3 || node.nodeType === 8 ? node.nodeValue : null,
    children: node.nodeType === 1 ? captureDomSnapshot(node) : [],
  }));
}

function restoreDomSnapshot(
  parent: Node,
  snapshot: DomNodeSnapshot[],
  optimisticSingleText?: string
) {
  const nodes: ChildNode[] = [];
  for (let i = 0; i < snapshot.length; i++) {
    const entry = snapshot[i];
    if (entry.node.nodeType === 3) {
      entry.node.nodeValue =
        optimisticSingleText !== undefined && snapshot.length === 1
          ? optimisticSingleText
          : (entry.textData ?? "");
    } else if (entry.node.nodeType === 8) {
      entry.node.nodeValue = entry.textData ?? "";
    } else if (entry.node.nodeType === 1) {
      restoreDomSnapshot(entry.node, entry.children);
    }
    nodes.push(entry.node);
  }
  (parent as ParentNode).replaceChildren(...nodes);
}

export const IframePreview: React.FC<IframePreviewProps> = ({
  children,
  minHeight = 0,
  className = "",
  flush = false,
  themeMode,
  interactionMode = "edit",
  selectedSection = null,
  selectedCoreNode = null,
  selectedItemIndex = null,
  showGridOverlay = false,
  onToggleGridOverlay,
  activeSectionMeta,
  onSectionAction,
  onStepSection,
  onUndo,
  onRedo,
  virtualWidth = null,
  onScaleChange,
  onSelectSection,
  onInlineEdit,
  onPreviewClick,
  onContextMenuSection,
  onEscape,
  scrollToSection,
  onIframeDocumentChange,
  onSlideChanged,
  singleClickInlineEdit = false,
  widgetPopoverOpen = false,
  onToggleWidgetPopover,
  renderInlineWidgetPopover,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [frameHeight, setFrameHeight] = useState<number>(minHeight || 600);
  const [wrapperWidth, setWrapperWidth] = useState<number>(0);
  const [isReady, setIsReady] = useState(false);

  // Fall back to fluid 1:1 responsive layout on narrow mobile containers (< 440px)
  const scale =
    virtualWidth && wrapperWidth >= 440 && virtualWidth > wrapperWidth
      ? wrapperWidth / virtualWidth
      : 1;
  const scaleRef = useRef(scale);
  scaleRef.current = scale;
  const frameHeightRef = useRef(frameHeight);
  frameHeightRef.current = frameHeight;

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const updateWidth = () => setWrapperWidth(el.clientWidth);
    updateWidth();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    onScaleChange?.(scale);
  }, [scale, onScaleChange]);
  const [hoveredSection, setHoveredSection] = useState<HoveredSectionOverlay | null>(null);
  const [inlineEdit, setInlineEdit] = useState<ActiveInlineEdit | null>(null);
  const [gridPopoverOpen, setGridPopoverOpen] = useState(false);
  const [selectionGeom, setSelectionGeom] = useState<MeasuredSelectionGeometry | null>(null);

  const hoveredEditableElRef = useRef<HTMLElement | null>(null);
  const hoveredLinkElRef = useRef<HTMLAnchorElement | null>(null);
  const isPointerOverMiniMenuRef = useRef(false);
  const activeEditableRef = useRef<{
    el: HTMLElement;
    hostEl: HTMLElement;
    sectionEl: HTMLElement | null;
    editKey: string;
    sectionType: string;
    initialValue: string;
    multiline: boolean;
    domSnapshot: DomNodeSnapshot[];
  } | null>(null);

  const themeModeRef = useRef(themeMode);
  themeModeRef.current = themeMode;

  useEffect(() => {
    if (mountNode) {
      const id = setTimeout(() => setIsReady(true), 120);
      return () => clearTimeout(id);
    } else {
      setIsReady(false);
    }
  }, [mountNode]);

  const interactionModeRef = useRef(interactionMode);
  interactionModeRef.current = interactionMode;

  const selectedSectionRef = useRef(selectedSection);
  selectedSectionRef.current = selectedSection;

  const selectedCoreNodeRef = useRef(selectedCoreNode);
  selectedCoreNodeRef.current = selectedCoreNode;

  const selectedItemIndexRef = useRef(selectedItemIndex);
  selectedItemIndexRef.current = selectedItemIndex;

  const showGridOverlayRef = useRef(showGridOverlay);
  showGridOverlayRef.current = showGridOverlay;

  const activeSectionMetaRef = useRef(activeSectionMeta);
  activeSectionMetaRef.current = activeSectionMeta;

  const onToggleGridOverlayRef = useRef(onToggleGridOverlay);
  onToggleGridOverlayRef.current = onToggleGridOverlay;

  const onSectionActionRef = useRef(onSectionAction);
  onSectionActionRef.current = onSectionAction;

  const onStepSectionRef = useRef(onStepSection);
  onStepSectionRef.current = onStepSection;

  const onUndoRef = useRef(onUndo);
  onUndoRef.current = onUndo;

  const onRedoRef = useRef(onRedo);
  onRedoRef.current = onRedo;

  const onSelectSectionRef = useRef(onSelectSection);
  onSelectSectionRef.current = onSelectSection;

  const onInlineEditRef = useRef(onInlineEdit);
  onInlineEditRef.current = onInlineEdit;

  const onPreviewClickRef = useRef(onPreviewClick);
  onPreviewClickRef.current = onPreviewClick;

  const onContextMenuSectionRef = useRef(onContextMenuSection);
  onContextMenuSectionRef.current = onContextMenuSection;

  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  const onIframeDocumentChangeRef = useRef(onIframeDocumentChange);
  onIframeDocumentChangeRef.current = onIframeDocumentChange;

  const onSlideChangedRef = useRef(onSlideChanged);
  onSlideChangedRef.current = onSlideChanged;

  const singleClickInlineEditRef = useRef(singleClickInlineEdit);
  singleClickInlineEditRef.current = singleClickInlineEdit;

  const onToggleWidgetPopoverRef = useRef(onToggleWidgetPopover);
  onToggleWidgetPopoverRef.current = onToggleWidgetPopover;

  const widgetPopoverOpenRef = useRef(widgetPopoverOpen);
  widgetPopoverOpenRef.current = widgetPopoverOpen;

  const lastClickedNodeElRef = useRef<HTMLElement | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [, setViewportSyncTick] = useState(0);

  useEffect(() => {
    if (!widgetPopoverOpen) return;
    let rafId: number | null = null;
    const syncPos = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setViewportSyncTick((n) => n + 1));
    };
    const handleKeyDownWindow = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onToggleWidgetPopoverRef.current?.(false);
      }
    };
    const handleOutsidePointer = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (popoverRef.current?.contains(target)) return;
      if (target.closest('[data-hb-widget-toggle="true"], #builder-inspector, [role="listbox"]'))
        return;
      if (iframeRef.current && target === iframeRef.current) return;
      onToggleWidgetPopoverRef.current?.(false);
    };
    window.addEventListener("scroll", syncPos, { passive: true });
    window.addEventListener("resize", syncPos, { passive: true });
    window.addEventListener("keydown", handleKeyDownWindow);
    window.addEventListener("pointerdown", handleOutsidePointer, { capture: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", syncPos);
      window.removeEventListener("resize", syncPos);
      window.removeEventListener("keydown", handleKeyDownWindow);
      window.removeEventListener("pointerdown", handleOutsidePointer, { capture: true });
    };
  }, [widgetPopoverOpen]);

  const resolveEffectiveDark = (explicitMode?: "light" | "dark") =>
    explicitMode ? explicitMode === "dark" : document.documentElement.classList.contains("dark");

  const commitInlineEdit = () => {
    const active = activeEditableRef.current;
    if (!active) return;
    activeEditableRef.current = null;
    active.el.removeAttribute("contenteditable");
    active.el.removeAttribute("spellcheck");
    delete active.el.dataset.hbEditing;
    delete active.hostEl.dataset.hbEditing;
    const nextValue = serializeEditableNode(active.el, active.multiline);
    const initialTrimmed = active.initialValue.replace(/\u00a0/g, " ").trim();

    if (!nextValue && initialTrimmed) {
      restoreDomSnapshot(active.el, active.domSnapshot);
    } else if (nextValue !== initialTrimmed) {
      // Restore React's exact original DOM Node identities before React reconciles the committed text
      restoreDomSnapshot(active.el, active.domSnapshot, nextValue);
      onInlineEditRef.current?.(active.editKey, nextValue, active.sectionType);
    } else {
      restoreDomSnapshot(active.el, active.domSnapshot);
    }
    setInlineEdit(null);
  };

  const cancelInlineEdit = () => {
    const active = activeEditableRef.current;
    if (!active) return;
    activeEditableRef.current = null;
    restoreDomSnapshot(active.el, active.domSnapshot);
    active.el.removeAttribute("contenteditable");
    active.el.removeAttribute("spellcheck");
    delete active.el.dataset.hbEditing;
    delete active.hostEl.dataset.hbEditing;
    active.el.blur();
    setInlineEdit(null);
  };

  const isPopoverOnlyEditEl = (editEl: HTMLElement | null): boolean => {
    if (!editEl) return false;
    if (editEl.dataset.hbEditMode === "popover") return true;
    const nodeKind = editEl.dataset.hbNode;
    if (
      nodeKind === "icon" ||
      nodeKind === "media" ||
      nodeKind === "video" ||
      nodeKind === "slideshow"
    ) {
      return true;
    }
    const tag = editEl.tagName.toLowerCase();
    if (tag === "img" || tag === "video" || tag === "svg" || tag === "picture") return true;
    if (editEl.querySelector("svg, img, video") && !(editEl.textContent ?? "").trim()) {
      return true;
    }
    return false;
  };

  const beginInlineEditOnNode = (editEl: HTMLElement, explicitSectionType?: string) => {
    const editKey = editEl.dataset.hbEdit;
    if (!editKey || !onInlineEditRef.current) return;
    if (isPopoverOnlyEditEl(editEl)) {
      onToggleWidgetPopoverRef.current?.(true);
      return;
    }
    const targetEl = resolveEditTextTarget(editEl);
    if (activeEditableRef.current?.el === targetEl) return;
    if (activeEditableRef.current) {
      commitInlineEdit();
    }

    const sectionEl = editEl.closest("[data-landing-section]") as HTMLElement | null;
    const sectionType =
      explicitSectionType ??
      (sectionEl?.dataset.landingSection
        ? mapEditScopeToSection(sectionEl.dataset.landingSection)
        : mapEditScopeToSection(editKey.split(":")[0] || "hero"));
    const rect = editEl.getBoundingClientRect();
    const preliminaryLen = (targetEl.textContent ?? "").trim().length;
    const isSingleLineRole =
      /^H[1-6]$/.test(targetEl.tagName) ||
      Boolean(editEl.closest("a, button")) ||
      /:(?:title|heading|eyebrow|label|brandName|cta|badge|name|role|price|period|plan)$/.test(
        editKey
      );
    const isMultilineField =
      /:(?:description|subheading|subtitle|note|quote|answer|bio|summary|body|content)$/.test(
        editKey
      ) || targetEl.tagName === "BLOCKQUOTE";
    const multiline =
      isMultilineField || (!isSingleLineRole && (rect.height > 64 || preliminaryLen > 88));
    const initialValue = serializeEditableNode(targetEl, multiline);
    const domSnapshot = captureDomSnapshot(targetEl);

    activeEditableRef.current = {
      el: targetEl,
      hostEl: editEl,
      sectionEl,
      editKey,
      sectionType,
      initialValue,
      multiline,
      domSnapshot,
    };

    targetEl.setAttribute("contenteditable", "true");
    targetEl.setAttribute("spellcheck", "true");
    targetEl.dataset.hbEditing = "true";
    editEl.dataset.hbEditing = "true";
    targetEl.focus({ preventScroll: true });

    const ownerDoc = targetEl.ownerDocument;
    const selection = ownerDoc.getSelection();
    if (selection) {
      const range = ownerDoc.createRange();
      range.selectNodeContents(targetEl);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    const s = scaleRef.current;
    const curWrapperWidth = wrapperRef.current?.clientWidth || 640;
    const scaledIframeHeight = frameHeightRef.current * s;
    const scaledTop = rect.top * s;
    const scaledBottom = rect.bottom * s;
    const scaledLeft = rect.left * s;
    const top =
      scaledTop > 48
        ? scaledTop - 40
        : Math.min(Math.max(8, scaledIframeHeight - 48), scaledBottom + 8);
    const left = Math.max(8, Math.min(curWrapperWidth - 290, scaledLeft));
    setInlineEdit({
      editKey,
      sectionType,
      top,
      left,
      multiline,
    });
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let resizeObserver: ResizeObserver | null = null;

    const setupIframe = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const isDark = resolveEffectiveDark(themeModeRef.current);

      // Write basic HTML structure with strictly auto-height root so iframe shrinks on section delete/change
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html lang="en" class="${isDark ? "dark" : ""}" style="color-scheme: ${isDark ? "dark" : "light"};">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <base href="${window.location.origin}/" />
            <style>
              /* Base resets for preview frame with true dynamic height */
              html, body {
                margin: 0;
                padding: 0;
                height: auto !important;
                min-height: 0 !important;
                background-color: transparent;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                overflow-x: clip !important;
                overflow-y: visible !important;
                overscroll-behavior: auto;
              }
              body {
                padding: 0;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
              }

              /* AI Studio Section Selection & Transition (Hardware-accelerated, zero load) */
              :root {
                --hb-ai-focus-rgb: 24, 24, 27;
              }
              html.dark, :root.dark {
                --hb-ai-focus-rgb: 255, 255, 255;
              }

              @keyframes hb-ai-focus-pulse {
                0% {
                  box-shadow: 0 0 0 1px rgba(var(--hb-ai-focus-rgb), 0),
                              0 0 0 rgba(var(--hb-ai-focus-rgb), 0);
                }
                20% {
                  box-shadow: 0 0 0 1px rgba(var(--hb-ai-focus-rgb), 0.35),
                              0 0 30px -4px rgba(var(--hb-ai-focus-rgb), 0.16);
                }
                75% {
                  box-shadow: 0 0 0 1px rgba(var(--hb-ai-focus-rgb), 0.22),
                              0 0 18px -4px rgba(var(--hb-ai-focus-rgb), 0.08);
                }
                100% {
                  box-shadow: 0 0 0 1px rgba(var(--hb-ai-focus-rgb), 0),
                              0 0 0 rgba(var(--hb-ai-focus-rgb), 0);
                }
              }

              @keyframes hb-ai-beam-sweep {
                0% {
                  transform: translateX(-100%);
                  opacity: 0;
                }
                25% {
                  opacity: 1;
                }
                75% {
                  opacity: 1;
                }
                100% {
                  transform: translateX(100%);
                  opacity: 0;
                }
              }

              .hb-ai-focus-active {
                position: relative !important;
                animation: hb-ai-focus-pulse 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
              }

              .hb-ai-focus-active::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(
                  90deg,
                  transparent 0%,
                  rgba(var(--hb-ai-focus-rgb), 0.2) 20%,
                  rgba(var(--hb-ai-focus-rgb), 0.95) 50%,
                  rgba(var(--hb-ai-focus-rgb), 0.2) 80%,
                  transparent 100%
                );
                box-shadow: 0 0 12px rgba(var(--hb-ai-focus-rgb), 0.6);
                pointer-events: none;
                z-index: 60;
                animation: hb-ai-beam-sweep 1.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }

              @media (prefers-reduced-motion: reduce) {
                .hb-ai-focus-active {
                  animation-duration: 0.35s !important;
                }
                .hb-ai-focus-active::after {
                  animation: none !important;
                  opacity: 0 !important;
                }
              }

              @media (hover: hover) and (pointer: fine) {
                html[data-hb-interaction="edit"] [data-landing-section]:hover {
                  outline: 1px dashed rgba(59, 130, 246, 0.55);
                  outline-offset: -2px;
                }
                html[data-hb-interaction="edit"] [data-hb-edit]:hover {
                  outline: 1.5px dashed rgba(79, 70, 229, 0.75);
                  outline-offset: 3px;
                  border-radius: 4px;
                  cursor: text;
                }
              }
              html[data-hb-interaction="edit"] [data-hb-edit][contenteditable="true"],
              html[data-hb-interaction="edit"] [data-hb-edit]:has([contenteditable="true"]) {
                outline: 2px solid #4f46e5 !important;
                outline-offset: 4px;
                border-radius: 6px;
                background: rgba(79, 70, 229, 0.06);
                caret-color: #4f46e5;
                cursor: text;
              }
              html[data-hb-interaction="edit"] [data-hb-edit-text][contenteditable="true"] {
                outline: none !important;
                caret-color: #4f46e5;
              }
              html[data-hb-interaction="edit"] [data-hb-edit][contenteditable="true"]:focus {
                outline: 2px solid #4f46e5 !important;
              }
            </style>
            <style id="hb-selection-style"></style>
          </head>
          <body class="text-zinc-900 dark:text-zinc-50 font-sans ${flush ? "p-0" : "p-4"} relative overflow-x-clip m-0 w-full h-auto">
            <div id="frame-root" class="w-full flex flex-col items-stretch justify-start h-auto min-h-0"></div>
          </body>
        </html>
      `);
      doc.close();

      doc.documentElement.dataset.hbInteraction = interactionModeRef.current;

      // Lock preview viewport height so elements using 100vh do not cause recursive auto-expand loop
      doc.documentElement.style.setProperty("--hb-viewport-h", `${window.innerHeight}px`);

      // Copy all active stylesheets & inline styles from parent document
      const syncStyles = () => {
        if (!doc.head) return;
        document.querySelectorAll("style, link[rel='stylesheet']").forEach((node) => {
          const cloned = node.cloneNode(true);
          doc.head.appendChild(cloned);
        });
      };
      syncStyles();

      const root = doc.getElementById("frame-root");
      setMountNode(root);
      onIframeDocumentChangeRef.current?.(doc);

      // Measure true content height precisely without phantom space below footer
      const calculateTrueHeight = () => {
        if (!root) return minHeight;
        let bottom = 0;
        const children = root.children;
        for (let i = 0; i < children.length; i++) {
          const el = children[i] as HTMLElement;
          const elBottom = Math.ceil(el.offsetTop + el.getBoundingClientRect().height);
          if (elBottom > bottom) bottom = elBottom;
        }
        const measured = Math.ceil(
          Math.max(
            bottom,
            root.getBoundingClientRect().height,
            root.offsetHeight,
            root.scrollHeight,
            doc.body.scrollHeight
          )
        );
        return Math.max(measured, minHeight);
      };

      let rafId: number | null = null;
      const syncFrameHeight = () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const contentHeight = calculateTrueHeight();
          if (contentHeight > 0) {
            setFrameHeight((prev) => (prev !== contentHeight ? contentHeight : prev));
          }
          if (
            doc.defaultView &&
            (doc.defaultView.scrollY !== 0 || doc.documentElement.scrollTop !== 0)
          ) {
            doc.documentElement.scrollTop = 0;
            doc.body.scrollTop = 0;
            doc.defaultView.scrollTo(0, 0);
          }
        });
      };

      if (root) {
        resizeObserver = new ResizeObserver(syncFrameHeight);
        resizeObserver.observe(root);
        resizeObserver.observe(doc.body);
        void doc.fonts?.ready?.then(() => syncFrameHeight());
      }

      const resolveSectionTarget = (
        target: HTMLElement | null
      ): {
        el: HTMLElement;
        sectionType: string;
        coreNode: BuilderCoreNodeKind;
        itemIndex: number | null;
      } | null => {
        if (!target) return null;
        const sectionEl = target.closest("[data-landing-section]") as HTMLElement | null;
        let containerEl: HTMLElement | null = sectionEl;
        let rawType = sectionEl?.dataset.landingSection ?? "";

        const editEl = target.closest("[data-hb-edit]") as HTMLElement | null;
        if (!rawType && editEl?.dataset.hbEdit) {
          rawType = editEl.dataset.hbEdit.split(":")[0] || "";
          containerEl =
            (editEl.closest("section, header, footer, main, form") as HTMLElement | null) ?? editEl;
        }
        if (!rawType || !containerEl) return null;

        const sectionType = mapEditScopeToSection(rawType);

        // Extract deep item index from [data-hb-item] or dot-path in data-hb-edit
        let itemIndex: number | null = null;
        const itemEl = target.closest("[data-hb-item]") as HTMLElement | null;
        if (itemEl && containerEl.contains(itemEl)) {
          const parsed = Number.parseInt(itemEl.dataset.hbItem ?? "", 10);
          if (Number.isInteger(parsed) && parsed >= 0) itemIndex = parsed;
        }
        const editField = editEl?.dataset.hbEdit?.split(":")[1] ?? "";
        if (itemIndex === null) {
          const pathMatch = editField.match(/(?:^|\.)(\d+)(?:\.|$)/);
          if (pathMatch) {
            const parsed = Number.parseInt(pathMatch[1], 10);
            if (Number.isInteger(parsed) && parsed >= 0) itemIndex = parsed;
          }
        }

        // Extract core component node from nearest [data-hb-node] inside section, or infer from editKey/DOM
        let coreNode: BuilderCoreNodeKind = "section";
        const nodeEl = target.closest("[data-hb-node]") as HTMLElement | null;
        if (nodeEl && containerEl.contains(nodeEl)) {
          const rawNode = nodeEl.dataset.hbNode as BuilderCoreNodeKind | undefined;
          if (rawNode && VALID_CORE_NODES.has(rawNode)) {
            coreNode = rawNode;
          }
        }
        if (coreNode === "section" && editField) {
          if (editField.startsWith("badge") || editField === "eyebrow") coreNode = "badge";
          else if (editField.startsWith("primaryAction") || editField === "action.label")
            coreNode = "primary-button";
          else if (editField.startsWith("secondaryAction")) coreNode = "secondary-button";
          else if (editField === "brandName") coreNode = "brand";
          else if (editField === "title" || editField === "heading") coreNode = "heading";
          else if (
            editField === "description" ||
            editField === "subheading" ||
            editField === "subtitle" ||
            editField === "note"
          )
            coreNode = "text";
          else if (editField.startsWith("media.")) coreNode = "media";
          else if (itemIndex !== null) coreNode = "card";
        }
        if (coreNode === "section" && itemIndex !== null) {
          coreNode = "card";
        }
        if (coreNode === "section") {
          const mediaEl = target.closest(
            'figure, picture, video, [aria-roledescription="carousel"], [role="img"], img'
          ) as HTMLElement | null;
          if (mediaEl && containerEl.contains(mediaEl)) {
            coreNode = "media";
          }
        }

        return { el: containerEl, sectionType, coreNode, itemIndex };
      };

      const handlePointerDown = (e: MouseEvent) => {
        if (e.button === 0 && interactionModeRef.current === "navigate") {
          onPreviewClickRef.current?.();
        }
      };

      const handleInteraction = () => {
        if (interactionModeRef.current === "navigate") {
          onPreviewClickRef.current?.();
        }
      };

      const handleClick = (e: MouseEvent) => {
        if (interactionModeRef.current !== "edit") return;
        const target = e.target as HTMLElement | null;
        if (activeEditableRef.current) {
          if (activeEditableRef.current.el.contains(target)) {
            if (target?.closest("a, button[type='submit']")) {
              e.preventDefault();
            }
            return;
          }
          commitInlineEdit();
        }
        if (e.metaKey || e.ctrlKey) {
          const linkEl = target?.closest("a[href]");
          if (linkEl) return;
        }
        const popoverTriggerEl = target?.closest(
          "[data-hb-video-trigger='true'], [data-hb-edit-mode='popover']"
        );
        const anchorOrEditable = target?.closest("a, [data-hb-edit], button[type='submit']");
        if (popoverTriggerEl || anchorOrEditable) {
          e.preventDefault();
        }
        const editEl = target?.closest("[data-hb-edit]") as HTMLElement | null;
        const popoverOnly = isPopoverOnlyEditEl(editEl);
        const activeCaretInsideButton =
          Boolean(
            activeEditableRef.current?.el && target && activeEditableRef.current.el.contains(target)
          ) && Boolean(target?.closest("button, a, [role='button'], summary"));
        if (popoverTriggerEl || popoverOnly || activeCaretInsideButton) {
          e.stopPropagation();
        }
        const info = resolveSectionTarget(target);
        lastClickedNodeElRef.current =
          editEl ?? (target?.closest("[data-hb-node], [data-hb-item]") as HTMLElement | null);
        if (info && onSelectSectionRef.current) {
          setGridPopoverOpen(false);
          const rect = iframe.getBoundingClientRect();
          const s = scaleRef.current;
          onSelectSectionRef.current(info.sectionType, {
            x: rect.left + e.clientX * s,
            y: rect.top + e.clientY * s,
            coreNode: info.coreNode,
            itemIndex: info.itemIndex,
            editPath: editEl?.dataset.hbEdit ?? null,
          });
        }
        if (singleClickInlineEditRef.current) {
          if (editEl?.dataset.hbEdit && onInlineEditRef.current) {
            if (popoverOnly) {
              onToggleWidgetPopoverRef.current?.(true);
            } else {
              onToggleWidgetPopoverRef.current?.(false);
              beginInlineEditOnNode(editEl, info?.sectionType);
            }
          } else if (info && info.coreNode !== "section") {
            onToggleWidgetPopoverRef.current?.(true);
          } else if (info && info.coreNode === "section") {
            onToggleWidgetPopoverRef.current?.(false);
          }
        }
      };

      const handleDoubleClick = (e: MouseEvent) => {
        if (interactionModeRef.current !== "edit" || !onInlineEditRef.current) return;
        const target = e.target as HTMLElement | null;
        const editEl = target?.closest("[data-hb-edit]") as HTMLElement | null;
        if (!editEl?.dataset.hbEdit) return;

        e.preventDefault();
        e.stopPropagation();
        if (isPopoverOnlyEditEl(editEl)) {
          onToggleWidgetPopoverRef.current?.(true);
          return;
        }
        const sectionInfo = resolveSectionTarget(editEl);
        beginInlineEditOnNode(editEl, sectionInfo?.sectionType);
      };

      let hoverRaf: number | null = null;
      const canHover =
        typeof window === "undefined"
          ? true
          : !(window.matchMedia?.("(hover: none) and (pointer: coarse)")?.matches ?? false);

      const handleMouseMove = (e: MouseEvent) => {
        if (
          !canHover ||
          interactionModeRef.current !== "edit" ||
          isPointerOverMiniMenuRef.current
        ) {
          return;
        }
        const target = e.target as HTMLElement | null;
        if (hoverRaf) cancelAnimationFrame(hoverRaf);
        hoverRaf = requestAnimationFrame(() => {
          const info = resolveSectionTarget(target);
          if (!info) {
            hoveredEditableElRef.current = null;
            hoveredLinkElRef.current = null;
            setHoveredSection((prev) => (prev ? null : prev));
            return;
          }
          const secRect = info.el.getBoundingClientRect();
          const editEl = target?.closest("[data-hb-edit]") as HTMLElement | null;
          const editKey = editEl?.dataset.hbEdit;
          const editRect = editEl?.getBoundingClientRect();
          const linkEl = target?.closest("a[href]") as HTMLAnchorElement | null;
          const linkHref = linkEl?.getAttribute("href")?.trim() || undefined;
          const linkRect = linkEl?.getBoundingClientRect();

          hoveredEditableElRef.current = editEl;
          hoveredLinkElRef.current = linkEl;

          setHoveredSection((prev) => {
            if (
              prev &&
              prev.sectionType === info.sectionType &&
              prev.editableKey === editKey &&
              prev.linkHref === linkHref &&
              Math.abs(prev.top - secRect.top) < 2 &&
              (!editRect ||
                (prev.editableRect &&
                  Math.abs(prev.editableRect.top - editRect.top) < 2 &&
                  Math.abs(prev.editableRect.left - editRect.left) < 2)) &&
              (!linkRect ||
                (prev.linkRect &&
                  Math.abs(prev.linkRect.top - linkRect.top) < 2 &&
                  Math.abs(prev.linkRect.left - linkRect.left) < 2))
            ) {
              return prev;
            }
            return {
              sectionType: info.sectionType,
              top: secRect.top,
              left: secRect.left,
              width: secRect.width,
              editableKey: editKey,
              editableRect: editRect
                ? {
                    top: editRect.top,
                    left: editRect.left,
                    width: editRect.width,
                    height: editRect.height,
                  }
                : undefined,
              linkHref,
              linkRect: linkRect
                ? {
                    top: linkRect.top,
                    left: linkRect.left,
                    width: linkRect.width,
                    height: linkRect.height,
                  }
                : undefined,
            };
          });
        });
      };

      const handleContextMenu = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        const sectionEl = target?.closest("[data-landing-section]") as HTMLElement | null;
        if (sectionEl && sectionEl.dataset.landingSection) {
          e.preventDefault();
          e.stopPropagation();
          const rect = iframe.getBoundingClientRect();
          const s = scaleRef.current;
          onContextMenuSectionRef.current?.({
            sectionType: sectionEl.dataset.landingSection,
            x: rect.left + e.clientX * s,
            y: rect.top + e.clientY * s,
          });
        }
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        const active = activeEditableRef.current;
        if (active) {
          if (e.key === "Escape") {
            e.preventDefault();
            e.stopPropagation();
            cancelInlineEdit();
            return;
          }
          if (e.key === "Enter" && (!active.multiline || e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            e.stopPropagation();
            commitInlineEdit();
            return;
          }
          if (e.key === " " || e.code === "Space") {
            e.stopPropagation();
            return;
          }
          if (e.key === "Tab") {
            e.preventDefault();
            e.stopPropagation();
            const scopeRoot = active.sectionEl ?? doc;
            const candidates = Array.from(scopeRoot.querySelectorAll("[data-hb-edit]")).filter(
              (el): el is HTMLElement => {
                if (!(el instanceof HTMLElement) || !el.dataset.hbEdit) return false;
                if (isPopoverOnlyEditEl(el)) return false;
                const r = el.getBoundingClientRect();
                return r.width > 0 && r.height > 0;
              }
            );
            const curIdx = candidates.indexOf(active.hostEl);
            const nextIdx =
              curIdx >= 0 && candidates.length > 1
                ? (curIdx + (e.shiftKey ? -1 : 1) + candidates.length) % candidates.length
                : -1;
            const nextEl = nextIdx >= 0 ? candidates[nextIdx] : null;
            const secType = active.sectionType;
            commitInlineEdit();
            if (nextEl && nextEl !== active.hostEl) {
              requestAnimationFrame(() => beginInlineEditOnNode(nextEl, secType));
            }
            return;
          }
          return;
        }

        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
          e.preventDefault();
          if (e.shiftKey) {
            onRedoRef.current?.();
          } else {
            onUndoRef.current?.();
          }
          return;
        }
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "y") {
          e.preventDefault();
          onRedoRef.current?.();
          return;
        }

        if (interactionModeRef.current === "edit") {
          const curTarget = e.target as HTMLElement | null;
          const isFormEl =
            curTarget?.tagName === "INPUT" ||
            curTarget?.tagName === "TEXTAREA" ||
            curTarget?.tagName === "SELECT" ||
            curTarget?.isContentEditable;
          const curSection = selectedSectionRef.current;

          if (!isFormEl && curSection) {
            if ((e.metaKey || e.ctrlKey) && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
              const dir = e.key === "ArrowUp" ? "move-up" : "move-down";
              const allowed =
                dir === "move-up"
                  ? activeSectionMetaRef.current?.canMoveUp
                  : activeSectionMetaRef.current?.canMoveDown;
              if (allowed) {
                e.preventDefault();
                onSectionActionRef.current?.({ type: dir, sectionType: curSection });
              }
              return;
            }
            if (!e.metaKey && !e.ctrlKey && !e.altKey) {
              if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                if (onStepSectionRef.current) {
                  e.preventDefault();
                  onStepSectionRef.current(e.key === "ArrowUp" ? -1 : 1);
                  return;
                }
              }
              if (e.key.toLowerCase() === "g") {
                e.preventDefault();
                onToggleGridOverlayRef.current?.();
                return;
              }
              if (
                (e.key === "Delete" || e.key === "Backspace") &&
                activeSectionMetaRef.current?.canToggleHide
              ) {
                e.preventDefault();
                onSectionActionRef.current?.({
                  type: "toggle-hide",
                  sectionType: curSection,
                });
                return;
              }
            }
          }
        }

        if (e.key === "Escape") {
          setGridPopoverOpen(false);
          if (widgetPopoverOpenRef.current) {
            onToggleWidgetPopoverRef.current?.(false);
            return;
          }
          onEscapeRef.current?.();
        }
      };

      const handlePaste = (e: ClipboardEvent) => {
        const active = activeEditableRef.current;
        if (!active) return;
        const plain = e.clipboardData?.getData("text/plain");
        if (typeof plain !== "string") return;
        e.preventDefault();
        doc.execCommand?.(
          "insertText",
          false,
          active.multiline ? plain : plain.replace(/\s+/g, " ")
        );
      };

      const handleBlur = (e: FocusEvent) => {
        const active = activeEditableRef.current;
        if (!active || e.target !== active.el) return;
        requestAnimationFrame(() => {
          if (activeEditableRef.current?.el === active.el && doc.activeElement !== active.el) {
            commitInlineEdit();
          }
        });
      };

      const handlePreventInternalScroll = () => {
        if (
          doc.defaultView &&
          (doc.defaultView.scrollY !== 0 ||
            doc.documentElement.scrollTop !== 0 ||
            doc.body.scrollTop !== 0)
        ) {
          doc.documentElement.scrollTop = 0;
          doc.body.scrollTop = 0;
          doc.defaultView.scrollTo(0, 0);
        }
      };

      const handleSlideChanged = (e: Event) => {
        const custom = e as CustomEvent<{ index?: number }>;
        if (typeof custom.detail?.index === "number") {
          onSlideChangedRef.current?.(custom.detail.index);
        }
      };

      const handleKeyUp = (e: KeyboardEvent) => {
        const active = activeEditableRef.current;
        if (!active) return;
        if (
          (e.key === " " || e.code === "Space") &&
          (active.el ?? active.hostEl).closest("button, a, [role='button'], summary")
        ) {
          e.preventDefault();
          e.stopPropagation();
        }
      };

      doc.addEventListener("scroll", handlePreventInternalScroll, { passive: true });
      doc.addEventListener("pointerdown", handlePointerDown);
      doc.addEventListener("wheel", handleInteraction, { passive: true });
      doc.addEventListener("touchmove", handleInteraction, { passive: true });
      doc.addEventListener("click", handleClick, true);
      doc.addEventListener("dblclick", handleDoubleClick, true);
      doc.addEventListener("mousemove", handleMouseMove, { passive: true });
      doc.addEventListener("contextmenu", handleContextMenu);
      doc.addEventListener("keydown", handleKeyDown, true);
      doc.addEventListener("keyup", handleKeyUp, true);
      doc.addEventListener("paste", handlePaste, true);
      doc.addEventListener("blur", handleBlur, true);
      doc.addEventListener("hb:hero-slide-changed", handleSlideChanged);
    };

    setupIframe();

    // Observe parent dark mode only when preview themeMode isn't explicitly fixed
    const themeObserver = new MutationObserver(() => {
      if (iframe.contentDocument && !themeModeRef.current) {
        const isDark = document.documentElement.classList.contains("dark");
        iframe.contentDocument.documentElement.classList.toggle("dark", isDark);
        iframe.contentDocument.documentElement.style.colorScheme = isDark ? "dark" : "light";
      }
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleWindowResize = () => {
      if (iframe.contentDocument?.documentElement) {
        iframe.contentDocument.documentElement.style.setProperty(
          "--hb-viewport-h",
          `${window.innerHeight}px`
        );
      }
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      onIframeDocumentChangeRef.current?.(null);
      resizeObserver?.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [flush, minHeight]);

  useEffect(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc?.documentElement) return;
    const isDark = resolveEffectiveDark(themeMode);
    doc.documentElement.classList.toggle("dark", isDark);
    doc.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [themeMode, mountNode]);

  useEffect(() => {
    const doc = iframeRef.current?.contentDocument;
    if (doc?.documentElement) {
      doc.documentElement.dataset.hbInteraction = interactionMode;
      const selectionStyleEl = doc.getElementById("hb-selection-style");
      if (selectionStyleEl) {
        if (interactionMode === "edit" && selectedSection) {
          const normalized = mapEditScopeToSection(selectedSection);
          const escaped = cssEscape(normalized);
          const sectionSelector =
            normalized === "logos"
              ? 'html[data-hb-interaction="edit"] [data-landing-section="logos"], html[data-hb-interaction="edit"] [data-landing-section="logo-cloud"]'
              : `html[data-hb-interaction="edit"] [data-landing-section="${escaped}"]`;
          const innerSectionSelector =
            normalized === "logos"
              ? 'html[data-hb-interaction="edit"] [data-landing-section="logos"] [data-landing-section="logo-cloud"]'
              : `html[data-hb-interaction="edit"] [data-landing-section="${escaped}"] [data-landing-section="${escaped}"]`;

          let css = `
            ${sectionSelector} {
              outline: 2px solid rgba(59, 130, 246, 0.85);
              outline-offset: -2px;
            }
            ${innerSectionSelector} {
              outline: none;
            }
          `;

          if (selectedItemIndex != null) {
            css += `
              ${sectionSelector} [data-hb-item="${selectedItemIndex}"] {
                outline: 1.5px dashed rgba(99, 102, 241, 0.88);
                outline-offset: 2px;
                border-radius: 8px;
              }
            `;
          }

          if (selectedCoreNode && selectedCoreNode !== "section") {
            const nodeEsc = cssEscape(selectedCoreNode);
            const scopePrefix =
              selectedItemIndex != null &&
              selectedCoreNode !== "card" &&
              selectedCoreNode !== "items" &&
              selectedCoreNode !== "grid"
                ? `${sectionSelector} [data-hb-item="${selectedItemIndex}"]`
                : sectionSelector;
            if (selectedCoreNode === "heading") {
              css += `
                ${scopePrefix} [data-hb-node="heading"] {
                  outline: 1.5px dashed rgba(79, 70, 229, 0.85);
                  outline-offset: 3px;
                  border-radius: 4px;
                }
              `;
            } else if (selectedCoreNode === "text") {
              css += `
                ${scopePrefix} [data-hb-node="text"] {
                  outline: 1.5px dashed rgba(79, 70, 229, 0.85);
                  outline-offset: 3px;
                  border-radius: 4px;
                }
              `;
            } else if (selectedCoreNode === "grid") {
              css += `
                ${sectionSelector} [data-hb-node="grid"] {
                  outline: 1.5px dashed rgba(79, 70, 229, 0.72);
                  outline-offset: 2px;
                }
              `;
            } else {
              css += `
                ${scopePrefix} [data-hb-node="${nodeEsc}"] {
                  outline: 1.5px dashed rgba(79, 70, 229, 0.88);
                  outline-offset: 3px;
                  border-radius: 6px;
                }
              `;
            }
          }

          selectionStyleEl.textContent = css;
        } else {
          selectionStyleEl.textContent = "";
        }
      }
    }
    if (interactionMode !== "edit") {
      if (activeEditableRef.current) {
        commitInlineEdit();
      }
      hoveredEditableElRef.current = null;
      hoveredLinkElRef.current = null;
      setHoveredSection(null);
      setInlineEdit(null);
      setGridPopoverOpen(false);
    }
  }, [interactionMode, selectedSection, selectedCoreNode, selectedItemIndex, mountNode]);

  useEffect(() => {
    setGridPopoverOpen(false);
  }, [selectedSection]);

  useEffect(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc || interactionMode !== "edit" || !selectedSection) {
      setSelectionGeom(null);
      return;
    }

    const measure = () => {
      const sectionEl = findSectionElement(doc, selectedSection);
      if (!sectionEl) {
        setSelectionGeom(null);
        return;
      }
      const sr = sectionEl.getBoundingClientRect();
      if (sr.width <= 0 || sr.height <= 0) {
        setSelectionGeom(null);
        return;
      }

      let gridOverlay: MeasuredSelectionGeometry["gridOverlay"] = null;
      if (showGridOverlay || selectedCoreNode === "grid") {
        const gridEl = sectionEl.querySelector('[data-hb-node="grid"]') as HTMLElement | null;
        if (gridEl && doc.defaultView) {
          const gr = gridEl.getBoundingClientRect();
          const cs = doc.defaultView.getComputedStyle(gridEl);
          const padLeft = parseFloat(cs.paddingLeft || "0") || 0;
          const colGap = parseFloat(cs.columnGap || "0") || 0;
          const tracks = cs.gridTemplateColumns
            .split(/\s+/)
            .map((part) => (part.endsWith("px") ? parseFloat(part) : NaN))
            .filter((n) => !Number.isNaN(n) && n > 0);
          if (gr.width > 0 && gr.height > 0 && tracks.length > 0) {
            const columns: Array<{ left: number; width: number }> = [];
            let cursorX = gr.left + padLeft;
            for (const w of tracks) {
              columns.push({ left: cursorX, width: w });
              cursorX += w + colGap;
            }
            gridOverlay = {
              top: gr.top,
              left: gr.left,
              width: gr.width,
              height: gr.height,
              columns,
            };
          }
        }
      }

      let nodeRect: MeasuredSelectionGeometry["nodeRect"] = null;
      if (selectedCoreNode && selectedCoreNode !== "section") {
        const nodeEsc = cssEscape(selectedCoreNode);
        const scopedContainer: HTMLElement | null =
          selectedItemIndex != null
            ? ((sectionEl.querySelector(
                `[data-hb-item="${selectedItemIndex}"]`
              ) as HTMLElement | null) ?? sectionEl)
            : sectionEl;

        let targetEl: HTMLElement | null;
        if (
          selectedItemIndex != null &&
          (selectedCoreNode === "card" || selectedCoreNode === "items")
        ) {
          targetEl = scopedContainer;
        } else {
          targetEl = scopedContainer.querySelector(
            `[data-hb-node="${nodeEsc}"]`
          ) as HTMLElement | null;
          if (!targetEl) {
            const fallbackSelectorMap: Partial<Record<BuilderCoreNodeKind, string>> = {
              heading: '[data-hb-edit$=":title"], [data-hb-edit$=":heading"], h1, h2, h3',
              text: '[data-hb-edit$=":description"], [data-hb-edit$=":subheading"], [data-hb-edit$=":quote"]',
              badge: '[data-hb-edit$=":eyebrow"], [data-hb-edit$=":badge"]',
              "primary-button":
                '[data-hb-edit*="primaryAction"], [data-hb-edit*="action.label"], a, button',
              "secondary-button":
                '[data-hb-edit*="secondaryAction"], [data-hb-edit*="videoPromptLabel"]',
              media:
                '[aria-roledescription="carousel"], video, figure img, img:not([role="presentation"]), iframe, img',
              brand: '[data-hb-edit$=":brandName"]',
              grid: '[data-hb-node="grid"]',
              links: "nav a, footer a",
            };
            const fbSel = fallbackSelectorMap[selectedCoreNode];
            if (fbSel) {
              targetEl = scopedContainer.querySelector(fbSel) as HTMLElement | null;
            }
          }
          if (
            !targetEl &&
            lastClickedNodeElRef.current &&
            doc.contains(lastClickedNodeElRef.current) &&
            sectionEl.contains(lastClickedNodeElRef.current)
          ) {
            targetEl = lastClickedNodeElRef.current;
          }
        }
        if (targetEl) {
          const nr = targetEl.getBoundingClientRect();
          if (nr.width > 0 && nr.height > 0) {
            nodeRect = {
              top: nr.top,
              left: nr.left,
              width: nr.width,
              height: nr.height,
            };
          }
        }
      }

      setSelectionGeom({
        sectionType: mapEditScopeToSection(selectedSection),
        top: sr.top,
        left: sr.left,
        width: sr.width,
        height: sr.height,
        nodeRect,
        gridOverlay,
      });
    };

    const raf = requestAnimationFrame(measure);
    let mo: MutationObserver | null = null;
    if (mountNode) {
      mo = new MutationObserver(() => {
        requestAnimationFrame(measure);
      });
      mo.observe(mountNode, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "style", "data-landing-section"],
      });
    }
    return () => {
      cancelAnimationFrame(raf);
      mo?.disconnect();
    };
  }, [
    interactionMode,
    selectedSection,
    selectedCoreNode,
    selectedItemIndex,
    showGridOverlay,
    mountNode,
    frameHeight,
    wrapperWidth,
    virtualWidth,
  ]);

  // Smoothly position landing page to the selected section on demand
  useEffect(() => {
    if (!scrollToSection?.type || !iframeRef.current) return;
    const iframe = iframeRef.current;
    const sectionType = scrollToSection.type;

    const performScroll = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const highlightElement = (el: HTMLElement) => {
        const targetSection = (el.firstElementChild as HTMLElement) || el;
        const isDark =
          doc.documentElement.classList.contains("dark") ||
          targetSection.dataset.heroVariant === "video" ||
          targetSection.classList.contains("bg-zinc-950") ||
          targetSection.classList.contains("hb-video-section");

        const rgb = isDark ? "255, 255, 255" : "24, 24, 27";
        targetSection.style.setProperty("--hb-ai-focus-rgb", rgb);

        targetSection.classList.remove("hb-ai-focus-active");
        // Force repaint to cleanly trigger the hardware-accelerated animation
        void targetSection.offsetWidth;
        targetSection.classList.add("hb-ai-focus-active");

        setTimeout(() => {
          targetSection.classList.remove("hb-ai-focus-active");
          targetSection.style.removeProperty("--hb-ai-focus-rgb");
        }, 1500);
      };

      if (sectionType === "navbar") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const target = doc.querySelector(`[data-landing-section="navbar"]`) as HTMLElement | null;
        if (target) {
          highlightElement(target);
        }
        return;
      }

      const target = findSectionElement(doc, sectionType);
      if (target) {
        const iframeRect = iframe.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const s = scaleRef.current;
        const headerOffset = 76; // Clearance for top fixed navbar
        const targetScrollY = Math.max(
          0,
          window.scrollY + iframeRect.top + targetRect.top * s - headerOffset
        );

        window.scrollTo({
          top: targetScrollY,
          behavior: "smooth",
        });

        highlightElement(target);
      }
    };

    const rafId = requestAnimationFrame(performScroll);
    return () => cancelAnimationFrame(rafId);
  }, [scrollToSection]);

  const handleOpenInlineFromHover = () => {
    if (hoveredEditableElRef.current) {
      onToggleWidgetPopoverRef.current?.(false);
      beginInlineEditOnNode(hoveredEditableElRef.current, hoveredSection?.sectionType);
    }
  };

  const handleOpenInlineForSelectedNode = () => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc || !selectedSection) return;
    const sectionEl = findSectionElement(doc, selectedSection);
    if (!sectionEl) return;
    const scoped: HTMLElement =
      selectedItemIndex != null
        ? ((sectionEl.querySelector(
            `[data-hb-item="${selectedItemIndex}"]`
          ) as HTMLElement | null) ?? sectionEl)
        : sectionEl;
    const candidate =
      (scoped.querySelector(
        `[data-hb-node="${cssEscape(selectedCoreNode ?? "heading")}"] [data-hb-edit]`
      ) as HTMLElement | null) ??
      (scoped.querySelector(
        `[data-hb-node="${cssEscape(selectedCoreNode ?? "heading")}"][data-hb-edit]`
      ) as HTMLElement | null) ??
      (scoped.querySelector("[data-hb-edit]") as HTMLElement | null);
    if (candidate) {
      onToggleWidgetPopoverRef.current?.(false);
      beginInlineEditOnNode(candidate, mapEditScopeToSection(selectedSection));
    }
  };

  const handleFollowHoveredLink = () => {
    const anchor = hoveredLinkElRef.current;
    const doc = iframeRef.current?.contentDocument;
    if (!anchor || !doc?.defaultView) return;
    anchor.dispatchEvent(
      new doc.defaultView.MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        metaKey: true,
        view: doc.defaultView,
      })
    );
  };

  const effectiveWrapperWidth = wrapperWidth || wrapperRef.current?.clientWidth || 720;
  const hoverAnchorRect = hoveredSection?.editableRect ?? hoveredSection?.linkRect;
  const scaledAnchorTop = hoverAnchorRect ? hoverAnchorRect.top * scale : 0;
  const scaledAnchorHeight = hoverAnchorRect ? hoverAnchorRect.height * scale : 0;
  const scaledAnchorLeft = hoverAnchorRect ? hoverAnchorRect.left * scale : 0;
  const scaledFrameHeight = frameHeight * scale;
  const hoverMenuTop = hoverAnchorRect
    ? scaledAnchorTop > 46
      ? scaledAnchorTop - 38
      : Math.min(Math.max(8, scaledFrameHeight - 44), scaledAnchorTop + scaledAnchorHeight + 6)
    : hoveredSection
      ? Math.max(8, hoveredSection.top * scale + 8)
      : 8;
  const hoverMenuLeft = hoverAnchorRect
    ? Math.max(8, Math.min(effectiveWrapperWidth - 300, scaledAnchorLeft))
    : hoveredSection
      ? Math.max(10, Math.min(effectiveWrapperWidth - 260, hoveredSection.left * scale + 10))
      : 10;
  const scaledWidthPx = virtualWidth && scale < 1 ? virtualWidth : undefined;
  const outerHeightPx = Math.ceil(frameHeight * scale);
  const activeNodeBadge = formatCoreNodeBadge(selectedCoreNode, selectedItemIndex);
  const activeBarTop = selectionGeom ? Math.max(8, selectionGeom.top * scale + 8) : 8;
  const activeBarLeft = selectionGeom
    ? Math.max(8, Math.min(effectiveWrapperWidth - 280, selectionGeom.left * scale + 10))
    : 10;
  const addBelowTop = selectionGeom
    ? Math.min(
        Math.max(32, scaledFrameHeight - 28),
        (selectionGeom.top + selectionGeom.height) * scale - 13
      )
    : 0;
  const showHoverMiniBar =
    isReady &&
    interactionMode === "edit" &&
    hoveredSection &&
    !inlineEdit &&
    Boolean(
      hoveredSection.editableKey ||
      hoveredSection.linkHref ||
      hoveredSection.sectionType !== selectionGeom?.sectionType
    );

  return (
    <div
      ref={wrapperRef}
      data-hb-inline-editing={inlineEdit ? inlineEdit.editKey : undefined}
      onMouseLeave={() => {
        isPointerOverMiniMenuRef.current = false;
        setHoveredSection(null);
      }}
      className="relative w-full overflow-clip"
    >
      {!isReady && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-50/90 py-12 backdrop-blur-xs transition-opacity duration-300 dark:bg-[#161618]/90"
          style={{ minHeight: `${Math.max(minHeight, 140)}px` }}
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute h-9 w-9 animate-ping rounded-full bg-blue-500/25" />
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.08] bg-white shadow-xs dark:border-white/10 dark:bg-zinc-900">
              <svg
                viewBox="0 0 81 123"
                fill="currentColor"
                className="h-5 w-auto animate-pulse text-zinc-900 dark:text-white"
                aria-hidden="true"
              >
                <path d="M 11.5,0 A 11.5,11.5 0 0,1 23,11.5 L 23,44 C 25,38 36,35 48,35 C 64,35 80.5,45 80.5,65 L 80.5,111.5 A 11.25,11.25 0 0,1 58,111.5 L 58,65 C 58,57 50,53.5 40.5,53.5 C 31,53.5 23,58 23,67 L 23,111.5 A 11.5,11.5 0 0,1 0,111.5 L 0,11.5 A 11.5,11.5 0 0,1 11.5,0 Z" />
              </svg>
            </div>
          </div>
          <span className="mt-2.5 text-[11px] font-medium tracking-tight text-zinc-500 dark:text-zinc-400">
            Rendering preview...
          </span>
        </div>
      )}

      {/* Faint CSS Grid Column Visualizer Overlay */}
      {isReady && interactionMode === "edit" && selectionGeom?.gridOverlay && (
        <div
          aria-hidden="true"
          data-hb-grid-overlay="true"
          className="pointer-events-none absolute inset-0 z-10 overflow-clip"
        >
          {selectionGeom.gridOverlay.columns.map((col, idx) => (
            <div
              key={idx}
              style={{
                top: selectionGeom.gridOverlay!.top * scale,
                left: col.left * scale,
                width: Math.max(12, col.width * scale),
                height: Math.max(24, selectionGeom.gridOverlay!.height * scale),
              }}
              className="absolute rounded-md border border-dashed border-indigo-500/35 bg-indigo-500/[0.045] dark:border-indigo-400/35 dark:bg-indigo-400/[0.055]"
            />
          ))}
        </div>
      )}

      {/* Persistent Active Section Bar + Quick Grid Popover */}
      <AnimatePresence>
        {isReady && interactionMode === "edit" && selectionGeom && !inlineEdit && (
          <motion.div
            key={`active-bar-${selectionGeom.sectionType}`}
            initial={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : -4,
              scale: prefersReducedMotion ? 1 : 0.98,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : -2,
              scale: prefersReducedMotion ? 1 : 0.98,
            }}
            transition={popoverTransition(prefersReducedMotion)}
            style={{
              top: activeBarTop,
              left: activeBarLeft,
              transformOrigin: "top left",
            }}
            className="pointer-events-none absolute z-20 flex max-w-[calc(100%-16px)] flex-col items-start gap-1.5"
          >
            <div
              role="toolbar"
              aria-label={`Active section ${formatSectionPillLabel(selectionGeom.sectionType)}`}
              className="pointer-events-auto inline-flex flex-wrap items-center gap-0.5 rounded-full border border-indigo-500/30 bg-zinc-900/95 px-2 py-1 text-[11px] font-medium text-white shadow-lg backdrop-blur-md dark:border-indigo-400/35 dark:bg-zinc-950/95"
            >
              <span className="px-1.5 font-semibold tracking-tight text-white">
                {formatSectionPillLabel(selectionGeom.sectionType)}
              </span>
              {activeNodeBadge && (
                <span className="rounded-full bg-indigo-500/25 px-1.5 py-0.5 text-[10px] font-medium text-indigo-200">
                  {activeNodeBadge}
                </span>
              )}

              {onSectionAction && (
                <>
                  {(activeSectionMeta?.canMoveUp || activeSectionMeta?.canMoveDown) && (
                    <>
                      <span className="mx-0.5 h-3 w-px bg-white/15" aria-hidden="true" />
                      <button
                        type="button"
                        disabled={!activeSectionMeta.canMoveUp}
                        aria-label="Move section up"
                        title="Move up (Cmd+Up)"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSectionAction({
                            type: "move-up",
                            sectionType: selectionGeom.sectionType,
                          });
                        }}
                        className={`rounded-full p-1 text-zinc-300 hover:bg-white/15 hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none disabled:opacity-30 ${BUTTON_PRESS_CLASS}`}
                      >
                        <ArrowUp className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        disabled={!activeSectionMeta.canMoveDown}
                        aria-label="Move section down"
                        title="Move down (Cmd+Down)"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSectionAction({
                            type: "move-down",
                            sectionType: selectionGeom.sectionType,
                          });
                        }}
                        className={`rounded-full p-1 text-zinc-300 hover:bg-white/15 hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none disabled:opacity-30 ${BUTTON_PRESS_CLASS}`}
                      >
                        <ArrowDown className="h-3 w-3" />
                      </button>
                    </>
                  )}

                  {activeSectionMeta?.supportsGrid && (
                    <>
                      <span className="mx-0.5 h-3 w-px bg-white/15" aria-hidden="true" />
                      <button
                        type="button"
                        aria-label="Quick Grid selector"
                        aria-expanded={gridPopoverOpen}
                        title="Grid tracks & alignment (Press G for guides)"
                        onClick={(e) => {
                          e.stopPropagation();
                          setGridPopoverOpen((v) => !v);
                        }}
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none ${BUTTON_PRESS_CLASS} ${
                          gridPopoverOpen || showGridOverlay
                            ? "bg-indigo-500 text-white"
                            : "text-zinc-200 hover:bg-white/15 hover:text-white"
                        }`}
                      >
                        <Grid2x2 className="h-3 w-3" />
                        <span>Grid</span>
                      </button>
                    </>
                  )}

                  {activeSectionMeta?.canToggleHide && (
                    <>
                      <span className="mx-0.5 h-3 w-px bg-white/15" aria-hidden="true" />
                      <button
                        type="button"
                        aria-label="Hide section"
                        title="Hide section (Delete)"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSectionAction({
                            type: "toggle-hide",
                            sectionType: selectionGeom.sectionType,
                          });
                        }}
                        className={`rounded-full p-1 text-zinc-300 hover:bg-white/15 hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none ${BUTTON_PRESS_CLASS}`}
                      >
                        <EyeOff className="h-3 w-3" />
                      </button>
                    </>
                  )}

                  <span className="mx-0.5 h-3 w-px bg-white/15" aria-hidden="true" />
                  <button
                    type="button"
                    data-hb-widget-toggle="true"
                    aria-label="Open section settings"
                    title={
                      onToggleWidgetPopover
                        ? "Open Section Widget Settings"
                        : "Open Section Settings drawer"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      onSectionAction({
                        type: "open-settings",
                        sectionType: selectionGeom.sectionType,
                      });
                    }}
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none ${BUTTON_PRESS_CLASS} ${
                      widgetPopoverOpen && (!selectedCoreNode || selectedCoreNode === "section")
                        ? "bg-indigo-500 text-white"
                        : "bg-white/12 text-white hover:bg-white/20"
                    }`}
                  >
                    <SlidersHorizontal className="h-2.5 w-2.5" />
                    <span>Settings</span>
                  </button>
                </>
              )}
            </div>

            <AnimatePresence>
              {gridPopoverOpen && activeSectionMeta?.supportsGrid && onSectionAction && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: prefersReducedMotion ? 0 : -4,
                    scale: prefersReducedMotion ? 1 : 0.97,
                  }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    y: prefersReducedMotion ? 0 : -2,
                    scale: prefersReducedMotion ? 1 : 0.97,
                  }}
                  transition={popoverTransition(prefersReducedMotion)}
                  style={{ transformOrigin: "top left" }}
                  onClick={(e) => e.stopPropagation()}
                  className="pointer-events-auto w-60 rounded-xl border border-zinc-200/90 bg-white/95 p-3 text-zinc-900 shadow-2xl backdrop-blur-xl dark:border-white/15 dark:bg-[#1a1b1e]/95 dark:text-zinc-100"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-100">
                      Desktop Grid
                    </span>
                    {onToggleGridOverlay && (
                      <button
                        type="button"
                        onClick={onToggleGridOverlay}
                        className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
                          showGridOverlay
                            ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300"
                            : "text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/10"
                        }`}
                      >
                        {showGridOverlay ? "Guides On" : "Show Guides"}
                      </button>
                    )}
                  </div>
                  <div className="space-y-2.5">
                    <div>
                      <div className="mb-1 text-[10px] font-medium text-zinc-500 uppercase dark:text-zinc-400">
                        Columns
                      </div>
                      <div className="grid grid-cols-5 gap-1">
                        {(["auto", 1, 2, 3, 4] as const).map((col) => {
                          const current = activeSectionMeta.grid?.columns ?? "auto";
                          return (
                            <button
                              key={String(col)}
                              type="button"
                              onClick={() =>
                                onSectionAction({
                                  type: "set-grid",
                                  sectionType: selectionGeom.sectionType,
                                  patch: { columns: col === "auto" ? undefined : col },
                                })
                              }
                              className={`rounded-md py-1 text-[11px] font-medium transition-colors ${
                                current === col
                                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-white/[0.06] dark:text-zinc-300 dark:hover:bg-white/12"
                              }`}
                            >
                              {col === "auto" ? "Auto" : col}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 text-[10px] font-medium text-zinc-500 uppercase dark:text-zinc-400">
                        Gap
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {(["tight", "normal", "relaxed"] as const).map((gap) => {
                          const current = activeSectionMeta.grid?.gap ?? "normal";
                          return (
                            <button
                              key={gap}
                              type="button"
                              onClick={() =>
                                onSectionAction({
                                  type: "set-grid",
                                  sectionType: selectionGeom.sectionType,
                                  patch: { gap: gap === "normal" ? undefined : gap },
                                })
                              }
                              className={`rounded-md py-1 text-[11px] font-medium capitalize transition-colors ${
                                current === gap
                                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-white/[0.06] dark:text-zinc-300 dark:hover:bg-white/12"
                              }`}
                            >
                              {gap}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom centered + Add section below trigger */}
      {isReady &&
        interactionMode === "edit" &&
        selectionGeom &&
        !inlineEdit &&
        activeSectionMeta?.supportsAddBelow &&
        onSectionAction &&
        selectionGeom.height > 72 && (
          <div
            style={{ top: addBelowTop }}
            className="pointer-events-none absolute right-0 left-0 z-20 flex justify-center"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSectionAction({ type: "add-below", sectionType: selectionGeom.sectionType });
              }}
              className={`pointer-events-auto inline-flex items-center gap-1 rounded-full border border-indigo-500/35 bg-white/95 px-2.5 py-0.5 text-[11px] font-medium text-indigo-600 shadow-md backdrop-blur-xs hover:bg-indigo-50 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none dark:border-indigo-400/40 dark:bg-zinc-900/95 dark:text-indigo-300 dark:hover:bg-indigo-950/60 ${BUTTON_PRESS_CLASS}`}
            >
              <Plus className="h-3 w-3" />
              <span>Add section below</span>
            </button>
          </div>
        )}

      <AnimatePresence>
        {showHoverMiniBar && hoveredSection && (
          <motion.div
            key={`mini-hover-${hoveredSection.sectionType}-${hoveredSection.editableKey || hoveredSection.linkHref || "sec"}`}
            initial={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : 4,
              scale: prefersReducedMotion ? 1 : 0.98,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : 2,
              scale: prefersReducedMotion ? 1 : 0.98,
            }}
            transition={popoverTransition(prefersReducedMotion)}
            onMouseEnter={() => {
              isPointerOverMiniMenuRef.current = true;
            }}
            onMouseLeave={() => {
              isPointerOverMiniMenuRef.current = false;
            }}
            className="pointer-events-none absolute z-30 flex items-center"
            style={{
              top: hoverMenuTop,
              left: hoverMenuLeft,
              transformOrigin: "bottom left",
            }}
          >
            <div
              role="toolbar"
              aria-label={`${formatSectionPillLabel(hoveredSection.sectionType)} actions`}
              className="pointer-events-auto inline-flex items-center gap-1 rounded-full border border-zinc-900/15 bg-zinc-900/92 px-2 py-1 text-[11px] font-medium text-white shadow-lg backdrop-blur-md dark:border-white/15 dark:bg-zinc-950/92"
            >
              <span className="px-1 font-semibold tracking-tight text-zinc-200">
                {formatSectionPillLabel(hoveredSection.sectionType)}
              </span>
              {hoveredSection.editableKey && onInlineEdit && (
                <>
                  <span className="h-3 w-px bg-white/15" aria-hidden="true" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenInlineFromHover();
                    }}
                    className="inline-flex items-center gap-1 rounded-full bg-indigo-500 px-2 py-0.5 text-[11px] font-medium text-white transition-colors hover:bg-indigo-400"
                  >
                    <Pencil className="h-2.5 w-2.5" />
                    Edit text
                  </button>
                </>
              )}
              {hoveredSection.linkHref && (
                <>
                  <span className="h-3 w-px bg-white/15" aria-hidden="true" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFollowHoveredLink();
                    }}
                    title={`Follow ${hoveredSection.linkHref}`}
                    className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-zinc-100 transition-colors hover:bg-white/20"
                  >
                    <span>{formatLinkPreview(hoveredSection.linkHref)}</span>
                    <ArrowUpRight className="h-2.5 w-2.5 text-indigo-300" />
                  </button>
                </>
              )}
              {onSelectSection && (
                <>
                  <span className="h-3 w-px bg-white/15" aria-hidden="true" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSection(hoveredSection.sectionType);
                    }}
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium text-zinc-200 transition-colors hover:bg-white/15 hover:text-white"
                  >
                    <SlidersHorizontal className="h-2.5 w-2.5" />
                    Inspect
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {inlineEdit && (
          <motion.div
            key={`inline-bar-${inlineEdit.editKey}`}
            initial={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : 4,
              scale: prefersReducedMotion ? 1 : 0.98,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : 2,
              scale: prefersReducedMotion ? 1 : 0.98,
            }}
            transition={popoverTransition(prefersReducedMotion)}
            style={{
              top: inlineEdit.top,
              left: inlineEdit.left,
              transformOrigin: "bottom left",
            }}
            onMouseDown={(e) => {
              // Keep focus inside active contentEditable DOM node when clicking mini-bar buttons
              e.preventDefault();
            }}
            className="absolute z-40 inline-flex items-center gap-1.5 rounded-full border border-indigo-500/40 bg-zinc-900/95 px-2.5 py-1 text-[11px] font-medium text-white shadow-xl backdrop-blur-xl dark:border-indigo-400/40 dark:bg-zinc-950/95"
            role="toolbar"
            aria-label={`Editing ${inlineEdit.editKey}`}
          >
            <span className="font-semibold text-indigo-300">
              {formatEditFieldLabel(inlineEdit.editKey)}
            </span>
            <span className="hidden text-[10px] text-zinc-400 sm:inline">
              {inlineEdit.multiline ? "Cmd+Enter saves" : "Enter saves"}
            </span>
            <span className="h-3 w-px bg-white/15" aria-hidden="true" />
            {onToggleWidgetPopover && (
              <button
                type="button"
                data-hb-widget-toggle="true"
                onClick={() => {
                  commitInlineEdit();
                  onToggleWidgetPopover(true);
                }}
                aria-label="More widget settings"
                title="Open widget settings for this item"
                className="inline-flex items-center gap-1 rounded-full bg-white/12 px-2 py-0.5 text-[11px] font-medium text-white transition-colors hover:bg-white/22"
              >
                <SlidersHorizontal className="h-2.5 w-2.5" />
                <span>More</span>
              </button>
            )}
            <button
              type="button"
              onClick={cancelInlineEdit}
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium text-zinc-300 transition-colors hover:bg-white/15 hover:text-white"
            >
              <X className="h-3 w-3" />
              Cancel
            </button>
            <button
              type="button"
              onClick={commitInlineEdit}
              className="inline-flex items-center gap-1 rounded-full bg-indigo-500 px-2.5 py-0.5 text-[11px] font-semibold text-white transition-colors hover:bg-indigo-400"
            >
              <Check className="h-3 w-3" />
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Node Contextual Pill (anchored directly to clicked component / media / item when not typing inline) */}
      <AnimatePresence>
        {isReady &&
          interactionMode === "edit" &&
          !inlineEdit &&
          onToggleWidgetPopover &&
          selectionGeom?.nodeRect &&
          selectedCoreNode &&
          selectedCoreNode !== "section" &&
          (() => {
            const nr = selectionGeom.nodeRect!;
            const scaledTop = nr.top * scale;
            const scaledBottom = (nr.top + nr.height) * scale;
            const scaledLeft = nr.left * scale;
            const nodeBarTop =
              scaledTop > 48
                ? scaledTop - 36
                : Math.min(Math.max(8, scaledFrameHeight - 40), scaledBottom + 6);
            const nodeBarLeft = Math.max(8, Math.min(effectiveWrapperWidth - 260, scaledLeft));
            const supportsInlineCopy = [
              "heading",
              "text",
              "badge",
              "primary-button",
              "secondary-button",
              "brand",
            ].includes(selectedCoreNode);
            return (
              <motion.div
                key={`node-bar-${selectionGeom.sectionType}-${selectedCoreNode}-${selectedItemIndex ?? "root"}`}
                initial={{
                  opacity: 0,
                  y: prefersReducedMotion ? 0 : 4,
                  scale: prefersReducedMotion ? 1 : 0.98,
                }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: prefersReducedMotion ? 0 : 2,
                  scale: prefersReducedMotion ? 1 : 0.98,
                }}
                transition={popoverTransition(prefersReducedMotion)}
                style={{
                  top: nodeBarTop,
                  left: nodeBarLeft,
                  transformOrigin: "bottom left",
                }}
                onClick={(e) => e.stopPropagation()}
                role="toolbar"
                aria-label={`${activeNodeBadge ?? selectedCoreNode} contextual controls`}
                className="absolute z-30 inline-flex items-center gap-1 rounded-full border border-indigo-500/35 bg-zinc-900/95 px-2 py-1 text-[11px] font-medium text-white shadow-xl backdrop-blur-md dark:border-indigo-400/40 dark:bg-zinc-950/95"
              >
                <span className="px-1 font-semibold text-indigo-300">
                  {activeNodeBadge ?? selectedCoreNode}
                </span>
                {supportsInlineCopy && onInlineEdit && (
                  <>
                    <span className="h-3 w-px bg-white/15" aria-hidden="true" />
                    <button
                      type="button"
                      onClick={handleOpenInlineForSelectedNode}
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium text-zinc-200 transition-colors hover:bg-white/15 hover:text-white ${BUTTON_PRESS_CLASS}`}
                    >
                      <Pencil className="h-2.5 w-2.5" />
                      <span>Edit text</span>
                    </button>
                  </>
                )}
                <span className="h-3 w-px bg-white/15" aria-hidden="true" />
                <button
                  type="button"
                  data-hb-widget-toggle="true"
                  aria-expanded={widgetPopoverOpen}
                  onClick={() => onToggleWidgetPopover(!widgetPopoverOpen)}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors ${BUTTON_PRESS_CLASS} ${
                    widgetPopoverOpen
                      ? "bg-indigo-500 text-white"
                      : "bg-white/12 text-white hover:bg-white/22"
                  }`}
                >
                  <SlidersHorizontal className="h-2.5 w-2.5" />
                  <span>More</span>
                </button>
              </motion.div>
            );
          })()}
      </AnimatePresence>

      {/* Portal In-Canvas Per-Widget Settings Popover */}
      {typeof document !== "undefined" &&
        ReactDOM.createPortal(
          <AnimatePresence>
            {isReady &&
              interactionMode === "edit" &&
              widgetPopoverOpen &&
              renderInlineWidgetPopover &&
              selectedSection &&
              (() => {
                const frameRect = iframeRef.current?.getBoundingClientRect();
                if (!frameRect) return null;
                const anchor =
                  selectionGeom?.nodeRect && selectedCoreNode && selectedCoreNode !== "section"
                    ? selectionGeom.nodeRect
                    : selectionGeom
                      ? {
                          top: selectionGeom.top + 38,
                          left: selectionGeom.left + 10,
                          width: Math.min(selectionGeom.width, 320),
                          height: 4,
                        }
                      : { top: 24, left: 24, width: 240, height: 32 };

                const anchorTopVp = frameRect.top + anchor.top * scale;
                const anchorBottomVp = frameRect.top + (anchor.top + anchor.height) * scale;
                const anchorLeftVp = frameRect.left + anchor.left * scale;

                const popoverWidth = Math.min(376, Math.max(276, window.innerWidth - 24));
                const left = Math.max(
                  12,
                  Math.min(window.innerWidth - popoverWidth - 12, anchorLeftVp)
                );

                const spaceBelow = window.innerHeight - anchorBottomVp - 16;
                const spaceAbove = anchorTopVp - 72;
                const openBelow = spaceBelow >= 280 || spaceBelow >= spaceAbove;
                const top = openBelow
                  ? Math.min(window.innerHeight - 160, Math.max(64, anchorBottomVp + 10))
                  : undefined;
                const bottom = !openBelow
                  ? Math.max(16, window.innerHeight - anchorTopVp + 10)
                  : undefined;
                const maxBodyHeight = Math.max(
                  180,
                  Math.min(440, window.innerHeight - 96, (openBelow ? spaceBelow : spaceAbove) - 20)
                );

                return (
                  <motion.div
                    ref={popoverRef}
                    key="in-canvas-widget-popover"
                    role="dialog"
                    aria-label="In-canvas widget settings"
                    initial={{
                      opacity: 0,
                      y: prefersReducedMotion ? 0 : openBelow ? -6 : 6,
                      scale: prefersReducedMotion ? 1 : 0.97,
                    }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      y: prefersReducedMotion ? 0 : openBelow ? -4 : 4,
                      scale: prefersReducedMotion ? 1 : 0.97,
                    }}
                    transition={popoverTransition(prefersReducedMotion)}
                    style={{
                      position: "fixed",
                      top,
                      bottom,
                      left,
                      width: `${popoverWidth}px`,
                      transformOrigin: openBelow ? "top left" : "bottom left",
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="z-[70] overflow-visible rounded-2xl border border-zinc-200/90 bg-white/95 text-zinc-900 shadow-2xl backdrop-blur-xl dark:border-white/[0.12] dark:bg-[#161618]/95 dark:text-zinc-100"
                  >
                    <div
                      style={{ maxHeight: `${maxBodyHeight}px` }}
                      className="scrollbar-hide overflow-y-auto px-3.5 py-3 pb-8"
                    >
                      {renderInlineWidgetPopover({
                        sectionType: mapEditScopeToSection(selectedSection),
                        coreNode: selectedCoreNode ?? "section",
                        itemIndex: selectedItemIndex ?? null,
                        editPath: lastClickedNodeElRef.current?.dataset?.hbEdit ?? null,
                        close: () => onToggleWidgetPopoverRef.current?.(false),
                      })}
                    </div>
                  </motion.div>
                );
              })()}
          </AnimatePresence>,
          document.body
        )}

      <div
        style={{
          height: `${outerHeightPx}px`,
          width: "100%",
          overflow: "clip",
        }}
      >
        <div
          style={
            scaledWidthPx
              ? {
                  width: `${scaledWidthPx}px`,
                  height: `${frameHeight}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }
              : {
                  width: "100%",
                  height: `${frameHeight}px`,
                }
          }
        >
          <iframe
            ref={iframeRef}
            title="Responsive Isolated Canvas"
            style={{ height: `${frameHeight}px`, width: "100%" }}
            className={`block w-full border-0 bg-transparent transition-opacity duration-300 ${!isReady ? "opacity-0" : "opacity-100"} ${className}`}
          >
            {mountNode && ReactDOM.createPortal(children, mountNode)}
          </iframe>
        </div>
      </div>
    </div>
  );
};
