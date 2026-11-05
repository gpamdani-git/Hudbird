"use client";
import * as React from "react";
import type { BrandProfile } from "@hudbird/schemas";
import { cn } from "../../utils/cn";
import { brandStyle } from "./brand";
import "./pilot.css";

const BrandModeContext = React.createContext<BrandProfile["mode"]>("light");
export function useBrandMode() {
  return React.useContext(BrandModeContext);
}

export interface BrandScopeProps extends React.HTMLAttributes<HTMLDivElement> {
  brand: BrandProfile;
}

export function BrandScope({
  brand,
  className,
  style,
  children,
  onClick,
  ...props
}: BrandScopeProps) {
  const scopeRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!brand.googleFont) return;
    const doc = scopeRef.current?.ownerDocument ?? document;
    const font = brand.googleFont.trim();
    const id = `hudbird-google-font-${encodeURIComponent(font)}`;
    if (!font || doc.getElementById(id)) return;
    const link = doc.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?${new URLSearchParams({ family: `${font}:wght@400;500;600;700`, display: "swap" })}`;
    doc.head.appendChild(link);
  }, [brand.googleFont]);
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
          const id = anchor?.getAttribute("href")?.slice(1);
          const target =
            event.currentTarget.id === id
              ? event.currentTarget
              : Array.from(event.currentTarget.querySelectorAll<HTMLElement>("[id]")).find(
                  (node) => node.id === id
                );
          if (target) {
            event.preventDefault();
            const reduced = target.ownerDocument.defaultView?.matchMedia(
              "(prefers-reduced-motion: reduce)"
            ).matches;
            const smooth = event.currentTarget.dataset.landingSmoothScroll !== "false";
            target.scrollIntoView({
              behavior: reduced || !smooth ? "instant" : "smooth",
              block: "start",
            });
            if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
          }
        }}
        style={{ ...brandStyle(brand), ...style }}
      >
        {children}
      </div>
    </BrandModeContext.Provider>
  );
}
