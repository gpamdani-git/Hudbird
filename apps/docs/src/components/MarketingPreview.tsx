import React, { useState } from "react";
import { Monitor, Tablet, Smartphone, Copy, Check, ChevronDown } from "lucide-react";
import { IdeCodeBlock } from "./IdeCodeBlock";
import { IframePreview } from "./IframePreview";

export type ViewportMode = "desktop" | "tablet" | "mobile";

interface MarketingPreviewProps {
  title?: string;
  children: React.ReactNode;
  code?: string;
  codeHtml?: string;
  codeVue?: string;
  skill?: string;
  minHeight?: number;
  trapFixed?: boolean;
}

export const MarketingPreview: React.FC<MarketingPreviewProps> = ({
  title = "Simple centered",
  children,
  code,
  codeHtml,
  codeVue,
  skill,
  minHeight = 400,
  trapFixed = false,
}) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [viewport, setViewport] = useState<ViewportMode>("desktop");

  const viewportWidths: Record<ViewportMode, string> = {
    desktop: "100%",
    tablet: "768px",
    mobile: "390px",
  };

  return (
    <div className="my-8 flex w-full flex-col gap-4">
      {/* Header Controls */}
      <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Preview / Code Toggle */}
          <div className="flex rounded-full bg-zinc-100 p-0.5 dark:bg-zinc-800/50">
            <button
              onClick={() => setActiveTab("preview")}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === "preview"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === "code"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              Code
            </button>
          </div>

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

          {/* Viewport Toggles */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setActiveTab("preview");
                setViewport("desktop");
              }}
              className={`rounded-md p-1.5 transition-colors ${
                viewport === "desktop" && activeTab === "preview"
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                  : "text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300"
              }`}
            >
              <Monitor size={16} />
            </button>
            <button
              onClick={() => {
                setActiveTab("preview");
                setViewport("tablet");
              }}
              className={`rounded-md p-1.5 transition-colors ${
                viewport === "tablet" && activeTab === "preview"
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                  : "text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300"
              }`}
            >
              <Tablet size={16} />
            </button>
            <button
              onClick={() => {
                setActiveTab("preview");
                setViewport("mobile");
              }}
              className={`rounded-md p-1.5 transition-colors ${
                viewport === "mobile" && activeTab === "preview"
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                  : "text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300"
              }`}
            >
              <Smartphone size={16} />
            </button>
          </div>

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>

      {/* Main Container */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-xs dark:border-zinc-800/80 dark:bg-[#0a0a0a]">
        {activeTab === "preview" ? (
          <div
            className="flex w-full items-center justify-center bg-zinc-100 dark:bg-[#050505]"
            style={{ minHeight: `${minHeight}px` }}
          >
            <div
              className="w-full transition-all duration-300 ease-in-out"
              style={{ maxWidth: viewportWidths[viewport] }}
            >
              {viewport === "desktop" ? (
                <div
                  className={`relative isolate w-full bg-white dark:bg-zinc-950 ${trapFixed ? "overflow-hidden" : ""}`}
                  style={
                    trapFixed
                      ? { transform: "translateZ(0)", minHeight: `${minHeight}px` }
                      : { minHeight: `${minHeight}px` }
                  }
                >
                  {children}
                </div>
              ) : (
                <div className="relative my-8 h-full w-full overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800/50">
                  <IframePreview minHeight={800}>{children}</IframePreview>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className="w-full bg-zinc-50 dark:bg-[#0d1117]"
            style={{ minHeight: `${minHeight}px` }}
          >
            <IdeCodeBlock
              codeReact={code}
              codeHtml={codeHtml}
              codeVue={codeVue}
              codeMarkdown={skill}
            />
          </div>
        )}
      </div>
    </div>
  );
};
