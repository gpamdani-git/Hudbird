import React, { useState } from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { Tabs, Tab, Button } from "@hudbird/ui";
import { IdeCodeBlock } from "./IdeCodeBlock";
import { IframePreview } from "./IframePreview";

export type ViewportMode = "desktop" | "tablet" | "mobile";

interface MarketingPreviewProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
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
  subtitle,
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
        <div>
          {title && (
            <div className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {title}
            </div>
          )}
          {subtitle && (
            <div className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Preview / Code Toggle */}
          <Tabs
            size="sm"
            variant="solid"
            radius="md"
            selectedKey={activeTab}
            onSelectionChange={(k) => setActiveTab(k as "preview" | "code")}
          >
            <Tab tabKey="preview" title="Preview" />
            <Tab tabKey="code" title="Code" />
          </Tabs>

          <div className="h-4 w-px bg-zinc-200 dark:bg-white/[0.08]" />

          {/* Viewport Toggles */}
          <div className="flex items-center gap-1 rounded-xl border border-black/[0.06] bg-zinc-100/80 p-0.5 dark:border-white/[0.08] dark:bg-[#161618]">
            <Button
              size="sm"
              isIconOnly
              radius="md"
              variant={viewport === "desktop" && activeTab === "preview" ? "solid" : "light"}
              color={viewport === "desktop" && activeTab === "preview" ? "default" : "secondary"}
              className={
                viewport === "desktop" && activeTab === "preview"
                  ? "shadow-xs dark:bg-[#28292d] dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }
              onClick={() => {
                setActiveTab("preview");
                setViewport("desktop");
              }}
              aria-label="Desktop viewport"
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              isIconOnly
              radius="md"
              variant={viewport === "tablet" && activeTab === "preview" ? "solid" : "light"}
              color={viewport === "tablet" && activeTab === "preview" ? "default" : "secondary"}
              className={
                viewport === "tablet" && activeTab === "preview"
                  ? "shadow-xs dark:bg-[#28292d] dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }
              onClick={() => {
                setActiveTab("preview");
                setViewport("tablet");
              }}
              aria-label="Tablet viewport"
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              isIconOnly
              radius="md"
              variant={viewport === "mobile" && activeTab === "preview" ? "solid" : "light"}
              color={viewport === "mobile" && activeTab === "preview" ? "default" : "secondary"}
              className={
                viewport === "mobile" && activeTab === "preview"
                  ? "shadow-xs dark:bg-[#28292d] dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }
              onClick={() => {
                setActiveTab("preview");
                setViewport("mobile");
              }}
              aria-label="Mobile viewport"
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-black/[0.08] bg-zinc-50 shadow-xs dark:border-white/[0.08] dark:bg-[#161618]">
        {activeTab === "preview" ? (
          <div
            className="flex w-full items-center justify-center bg-zinc-100/60 dark:bg-[#121214]"
            style={{ minHeight: `${minHeight}px` }}
          >
            <div
              className="w-full transition-all duration-300 ease-in-out"
              style={{ maxWidth: viewportWidths[viewport] }}
            >
              {viewport === "desktop" ? (
                <div
                  className={`relative isolate w-full bg-white dark:bg-[#161618] ${trapFixed ? "overflow-hidden" : ""}`}
                  style={
                    trapFixed
                      ? { transform: "translateZ(0)", minHeight: `${minHeight}px` }
                      : { minHeight: `${minHeight}px` }
                  }
                >
                  {children}
                </div>
              ) : (
                <div className="relative my-8 h-full w-full overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#161618]">
                  <IframePreview minHeight={800}>{children}</IframePreview>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className="w-full bg-zinc-50 dark:bg-[#121214]"
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
