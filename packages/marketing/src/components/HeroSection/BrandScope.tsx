"use client";
import * as React from "react";
import type { BrandProfile, WebsiteDesignTokens } from "@hudbird/schemas";
import { cn } from "../../utils/cn";
import { brandStyle } from "./brand";
import "./pilot.css";

const BrandModeContext = React.createContext<BrandProfile["mode"]>("light");
export function useBrandMode() {
  return React.useContext(BrandModeContext);
}

const SECTION_ID_ALIASES: Record<string, string> = {
  "logo-cloud": "logos",
  logos: "logo-cloud",
};

/**
 * Resolves an anchor target within a rendered BrandScope/document root by checking HTML `id`,
 * `data-landing-section`, and known legacy section aliases (`logo-cloud` <-> `logos`).
 */
export function findSectionTarget(root: ParentNode, rawId: string): HTMLElement | null {
  const cleanId = rawId.replace(/^#/, "").trim();
  if (!cleanId || cleanId === "top" || cleanId === "landing-page") {
    return root instanceof HTMLElement ? root : (root.firstElementChild as HTMLElement | null);
  }
  const alias = SECTION_ID_ALIASES[cleanId];
  const candidates = [cleanId, ...(alias ? [alias] : [])];

  if (root instanceof HTMLElement && root.id && candidates.includes(root.id)) {
    return root;
  }

  for (const id of candidates) {
    const byId = Array.from(root.querySelectorAll<HTMLElement>("[id]")).find(
      (node) => node.id === id
    );
    if (byId) return byId;
  }

  for (const id of candidates) {
    const bySection = root.querySelector<HTMLElement>(
      `[data-landing-section="${CSS?.escape ? CSS.escape(id) : id}"]`
    );
    if (bySection) return bySection;
  }

  return null;
}

/**
 * Scrolls to an element smoothly inside either its own scrollable viewport or the host
 * scrollable container when hosted inside an auto-height builder preview iframe.
 */
export function scrollTargetSmoothly(
  target: HTMLElement,
  options?: { isTopTarget?: boolean; offsetTop?: number }
) {
  if (!target.isConnected) return;

  const ownerDoc = target.ownerDocument;
  const ownerWin = ownerDoc.defaultView;
  const reduced = ownerWin?.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const offsetTop = options?.offsetTop ?? 72;
  const frameEl = ownerWin?.frameElement as HTMLElement | null;
  const isAutoHeightIframe =
    Boolean(frameEl) &&
    ownerWin != null &&
    ownerDoc.documentElement.scrollHeight <= ownerWin.innerHeight + 8;

  if (isAutoHeightIframe && frameEl && ownerWin?.parent) {
    const parentDoc = frameEl.ownerDocument;
    const parentWin = ownerWin.parent;
    const frameRect = frameEl.getBoundingClientRect();
    const targetRect = options?.isTopTarget ? { top: 0 } : target.getBoundingClientRect();
    const frameScale = frameEl.offsetWidth > 0 ? frameRect.width / frameEl.offsetWidth : 1;
    const targetTop = targetRect.top * frameScale;

    let scrollContainer: HTMLElement | null = frameEl.parentElement;
    while (scrollContainer && scrollContainer !== parentDoc.body) {
      const style = parentWin.getComputedStyle(scrollContainer);
      const isScrollableY =
        (style.overflowY === "auto" || style.overflowY === "scroll") &&
        scrollContainer.scrollHeight > scrollContainer.clientHeight + 4;
      if (isScrollableY) break;
      scrollContainer = scrollContainer.parentElement;
    }

    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
    if (
      scrollContainer &&
      scrollContainer !== parentDoc.body &&
      typeof scrollContainer.scrollTo === "function"
    ) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const delta = frameRect.top + targetTop - containerRect.top - 16;
      const nextTop = Math.max(0, scrollContainer.scrollTop + delta);
      scrollContainer.scrollTo({ top: nextTop, behavior });
    } else if (typeof parentWin.scrollTo === "function") {
      const nextTop = options?.isTopTarget
        ? Math.max(0, parentWin.scrollY + frameRect.top - offsetTop)
        : Math.max(0, parentWin.scrollY + frameRect.top + targetTop - offsetTop);
      parentWin.scrollTo({ top: nextTop, behavior });
    }
    return;
  }

  if (options?.isTopTarget && typeof ownerWin?.scrollTo === "function") {
    ownerWin.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    return;
  }

  if (typeof target.scrollIntoView === "function") {
    target.scrollIntoView({
      behavior: reduced ? "instant" : "smooth",
      block: "start",
    });
  }
}

export interface BrandScopeProps extends React.HTMLAttributes<HTMLDivElement> {
  brand: BrandProfile;
  tokens?: WebsiteDesignTokens;
}

export function BrandScope({
  brand,
  tokens,
  className,
  style,
  children,
  onClick,
  ...props
}: BrandScopeProps) {
  const scopeRef = React.useRef<HTMLDivElement>(null);
  const googleFonts = React.useMemo(
    () =>
      Array.from(
        new Set(
          [
            brand.googleFont,
            tokens?.typography?.headingGoogleFont,
            tokens?.typography?.bodyGoogleFont,
            tokens?.typography?.monoGoogleFont,
          ]
            .map((value) => value?.trim())
            .filter((value): value is string => Boolean(value))
        )
      ),
    [
      brand.googleFont,
      tokens?.typography?.headingGoogleFont,
      tokens?.typography?.bodyGoogleFont,
      tokens?.typography?.monoGoogleFont,
    ]
  );

  React.useEffect(() => {
    if (googleFonts.length === 0) return;
    const doc = scopeRef.current?.ownerDocument ?? document;
    for (const font of googleFonts) {
      const id = `hudbird-google-font-${encodeURIComponent(font)}`;
      if (doc.getElementById(id)) continue;
      const link = doc.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?${new URLSearchParams({ family: `${font}:wght@400;500;600;700`, display: "swap" })}`;
      doc.head.appendChild(link);
    }
  }, [googleFonts]);
  return (
    <BrandModeContext.Provider value={brand.mode}>
      <div
        {...props}
        ref={scopeRef}
        data-brand={brand.id}
        data-brand-mode={brand.mode}
        data-hb-theme={brand.mode}
        className={cn("hb-pilot w-full", brand.mode === "dark" && "dark", className)}
        onClick={(event) => {
          onClick?.(event);
          if (
            event.defaultPrevented ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          )
            return;
          const anchor = (event.target as Element).closest("a[href^='#']");
          const rawHref = anchor?.getAttribute("href");
          if (!rawHref || rawHref.startsWith("#/")) return;
          const id = rawHref.slice(1);
          const isTop = !id.trim() || id === "top" || id === "landing-page";
          const target = findSectionTarget(event.currentTarget, id);
          if (target) {
            event.preventDefault();
            const smooth = event.currentTarget.dataset.landingSmoothScroll !== "false";
            if (
              !smooth &&
              typeof target.scrollIntoView === "function" &&
              !target.ownerDocument.defaultView?.frameElement
            ) {
              target.scrollIntoView({ behavior: "instant", block: "start" });
            } else {
              scrollTargetSmoothly(target, { isTopTarget: isTop });
            }
            if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
          } else if (event.currentTarget.ownerDocument.defaultView?.frameElement) {
            event.preventDefault();
          }
        }}
        style={{ ...brandStyle(brand, tokens), ...style }}
      >
        {children}
      </div>
    </BrandModeContext.Provider>
  );
}
