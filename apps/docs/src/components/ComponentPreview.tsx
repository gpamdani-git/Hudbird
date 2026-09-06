// apps/docs/src/components/ComponentPreview.tsx
import React, { useState, useEffect } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  X,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IframePreview } from "./IframePreview";

export type ViewportMode = "desktop" | "tablet" | "mobile";

interface ComponentPreviewProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  showControls?: boolean;
  defaultViewport?: ViewportMode;
  allowFullscreen?: boolean;
  iframeMode?: "auto" | "always" | "none";
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  children,
  className = "",
  title,
  description,
  showControls = true,
  defaultViewport = "desktop",
  allowFullscreen = true,
  iframeMode = "auto",
}) => {
  const [viewport, setViewport] = useState<ViewportMode>(defaultViewport);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [key, setKey] = useState(0); // for remount/reset

  // Handle escape key to close fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  // Prevent background scroll when fullscreen is active
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  const viewportWidthClasses: Record<ViewportMode, string> = {
    desktop: "w-full max-w-full",
    tablet: "w-full max-w-[768px]",
    mobile: "w-full max-w-[390px]",
  };

  const viewportLabels: Record<ViewportMode, string> = {
    desktop: "Desktop (100%)",
    tablet: "Tablet (768px)",
    mobile: "Mobile (390px)",
  };

  const renderToolbar = (inModal = false) => (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-900/90 px-3 py-2 text-xs backdrop-blur-md">
      {/* Left: Viewport Mode Switcher */}
      <div className="flex items-center gap-1">
        <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-0.5 shadow-xs">
          <button
            type="button"
            onClick={() => setViewport("desktop")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
              viewport === "desktop"
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
            title="Desktop View (Full Width)"
          >
            <Monitor size={13} />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport("tablet")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
              viewport === "tablet"
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
            title="Tablet View (768px)"
          >
            <Tablet size={13} />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport("mobile")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
              viewport === "mobile"
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
            title="Mobile View (390px)"
          >
            <Smartphone size={13} />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        <span className="hidden md:inline-block text-[11px] font-mono text-zinc-400 dark:text-zinc-500 ml-2">
          {viewportLabels[viewport]}
        </span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setKey((prev) => prev + 1)}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors shadow-xs"
          title="Reset / Remount Component Preview"
        >
          <RotateCcw size={12} />
        </button>

        {allowFullscreen && !inModal && (
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white transition-colors shadow-xs font-medium text-xs"
            title="Open in Fullscreen Preview Canvas"
          >
            <Maximize2 size={12} />
            <span>Fullscreen</span>
          </button>
        )}

        {inModal && (
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="flex items-center gap-1 h-7 px-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:opacity-90 transition-opacity shadow-xs text-xs"
            title="Exit Fullscreen Preview"
          >
            <Minimize2 size={12} />
            <span>Exit Fullscreen</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Standard Inline Preview Container */}
      <div
        className={`my-4 flex flex-col w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-950/40 shadow-xs transition-all relative ${className}`}
      >
        {showControls && (
          <div className="rounded-t-2xl overflow-hidden">
            {renderToolbar(false)}
          </div>
        )}

        {/* Component Display Canvas */}
        <div className="relative flex min-h-[220px] w-full items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-b from-zinc-50/60 to-white dark:from-zinc-950/40 dark:to-zinc-900/30 rounded-b-2xl">
          <div
            key={key}
            className={`transition-all duration-300 ease-out mx-auto ${viewportWidthClasses[viewport]} w-full`}
          >
            {viewport !== "desktop" && (
              <div className="mb-2 text-center">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-200/80 dark:bg-zinc-800/80 text-[10px] font-mono font-medium text-zinc-600 dark:text-zinc-400">
                  {viewport === "mobile" ? "📱 390px Viewport" : "📱 768px Viewport"}
                </span>
              </div>
            )}
            <div
              data-viewport={viewport}
              className={`w-full ${
                (iframeMode === "auto" && viewport !== "desktop") || iframeMode === "always"
                  ? "rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 shadow-md bg-white dark:bg-zinc-950 overflow-hidden"
                  : ""
              }`}
            >
              {(iframeMode === "auto" && viewport !== "desktop") || iframeMode === "always" ? (
                <IframePreview minHeight={600} key={`frame-${key}-${viewport}`}>
                  {children}
                </IframePreview>
              ) : (
                <div className="w-full flex items-center justify-center">
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal Dialog */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col bg-zinc-900/80 dark:bg-black/90 backdrop-blur-xl p-2 sm:p-6 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.96, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-1 flex-col w-full h-full rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-5 py-3.5 bg-zinc-50 dark:bg-zinc-900">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <Layers size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      Fullscreen Component Canvas Preview
                    </h3>
                    <p className="text-[11px] text-zinc-500">
                      Live interactive preview with responsive viewport switching (Esc to exit)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFullscreen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    aria-label="Close fullscreen modal"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Toolbar */}
              {renderToolbar(true)}

              {/* Fullscreen Canvas Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 flex items-center justify-center bg-zinc-100/60 dark:bg-zinc-900/40">
                <div
                  key={`modal-${key}`}
                  className={`transition-all duration-300 ease-out mx-auto ${viewportWidthClasses[viewport]}`}
                >
                  {viewport !== "desktop" && (
                    <div className="mb-3 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 shadow-xs">
                        {viewport === "mobile" ? "📱 Mobile 390px Frame" : "📱 Tablet 768px Frame"}
                      </span>
                    </div>
                  )}
                  <div
                    className={`w-full overflow-hidden ${
                      (iframeMode === "auto" && viewport !== "desktop") || iframeMode === "always"
                        ? "rounded-3xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 shadow-2xl bg-white dark:bg-zinc-950"
                        : ""
                    }`}
                  >
                    {(iframeMode === "auto" && viewport !== "desktop") || iframeMode === "always" ? (
                      <IframePreview minHeight={600} key={`modal-frame-${key}-${viewport}`}>
                        {children}
                      </IframePreview>
                    ) : (
                      children
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
