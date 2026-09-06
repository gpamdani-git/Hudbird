// apps/docs/src/components/IframeMobileSimulator.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

export interface IframeMobileSimulatorProps {
  children: React.ReactNode;
  height?: number | string;
  className?: string;
  showStatusBar?: boolean;
}

export const IframeMobileSimulator: React.FC<IframeMobileSimulatorProps> = ({
  children,
  height = 560,
  className = "",
  showStatusBar = true,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const setupIframe = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      // Copy all style and link[rel=stylesheet] elements from the parent document
      doc.head.innerHTML = "";
      
      const meta = doc.createElement("meta");
      meta.name = "viewport";
      meta.content = "width=device-width, initial-scale=1.0";
      doc.head.appendChild(meta);

      document.querySelectorAll("style, link[rel='stylesheet']").forEach((node) => {
        doc.head.appendChild(node.cloneNode(true));
      });

      // Synchronize dark theme class
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        doc.documentElement.classList.add("dark");
      } else {
        doc.documentElement.classList.remove("dark");
      }

      // Reset base iframe styles for a pristine mobile canvas
      doc.documentElement.style.height = "100%";
      doc.documentElement.style.width = "100%";
      doc.body.style.margin = "0";
      doc.body.style.padding = "0";
      doc.body.style.height = "100%";
      doc.body.style.width = "100%";
      doc.body.style.overflow = "hidden";
      doc.body.className =
        "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 antialiased font-sans select-none";

      // Create a mount point inside the iframe
      let container = doc.getElementById("iframe-app-root");
      if (!container) {
        container = doc.createElement("div");
        container.id = "iframe-app-root";
        container.style.height = "100%";
        container.style.width = "100%";
        container.style.position = "relative";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        doc.body.appendChild(container);
      }
      setMountNode(container);
    };

    setupIframe();

    // Theme observer for dark mode toggle in parent doc
    const themeObserver = new MutationObserver(() => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      if (document.documentElement.classList.contains("dark")) {
        doc.documentElement.classList.add("dark");
      } else {
        doc.documentElement.classList.remove("dark");
      }
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => themeObserver.disconnect();
  }, []);

  return (
    <div
      className={`relative w-full max-w-[390px] mx-auto rounded-[36px] p-2.5 bg-zinc-900 dark:bg-zinc-800 shadow-2xl border-4 border-zinc-300 dark:border-zinc-700 select-none ${className}`}
    >
      {/* Smartphone Notch & Speaker Bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-950 rounded-full z-30 flex items-center justify-center">
        <div className="w-12 h-1 bg-zinc-800 rounded-full" />
        <div className="w-2 h-2 rounded-full bg-zinc-900 ml-2" />
      </div>

      {/* Screen Frame */}
      <div className="relative w-full rounded-[28px] overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col">
        {/* iOS Status Bar */}
        {showStatusBar && (
          <div className="px-6 pt-3 pb-1 bg-white/95 dark:bg-zinc-950/95 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 shrink-0 z-20">
            <span>9:41</span>
            <div className="flex items-center gap-1 text-[10px]">
              <span className="font-mono">5G</span>
              <div className="w-4 h-2 border border-current rounded-xs p-0.5 flex items-center">
                <div className="w-full h-full bg-current rounded-2xs" />
              </div>
            </div>
          </div>
        )}

        {/* Isolated Iframe with 1:1 Mobile Viewport */}
        <iframe
          ref={iframeRef}
          style={{ height, width: "100%", border: "none" }}
          className="w-full bg-white dark:bg-zinc-950"
          title="Isolated Mobile Viewport Simulator"
        />

        {/* Smartphone Home Indicator bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-zinc-400/60 dark:bg-zinc-600/60 rounded-full z-20 pointer-events-none" />
      </div>

      {/* Portal Container Content into the iframe */}
      {mountNode && ReactDOM.createPortal(children, mountNode)}
    </div>
  );
};
