import React, { useState } from "react";
import { Monitor, Tablet, Smartphone, Copy, Check, ChevronDown } from "lucide-react";
import { CodeBlock } from "./CodeBlock";
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
}

export const MarketingPreview: React.FC<MarketingPreviewProps> = ({
  title = "Simple centered",
  children,
  code,
  codeHtml,
  codeVue,
  skill,
  minHeight = 400,
}) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "skill">("preview");
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [isCopied, setIsCopied] = useState(false);
  const [framework, setFramework] = useState<"React" | "HTML" | "Vue">("React");

  const handleCopy = () => {
    let textToCopy = "";
    if (activeTab === "skill") textToCopy = skill || "";
    else if (activeTab === "code") {
      if (framework === "React") textToCopy = code || "";
      else if (framework === "HTML") textToCopy = codeHtml || "";
      else if (framework === "Vue") textToCopy = codeVue || "";
    }

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const viewportWidths: Record<ViewportMode, string> = {
    desktop: "100%",
    tablet: "768px",
    mobile: "390px",
  };

  return (
    <div className="my-8 flex w-full flex-col gap-4">
      {/* Header Controls */}
      <div className="flex w-full items-center justify-between">
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</div>

        <div className="flex items-center gap-4">
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
            <button
              onClick={() => setActiveTab("skill")}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === "skill"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              Skill.md
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

          {/* Dropdown Placeholder */}
          <div className="group relative">
            <button className="flex items-center gap-1 text-xs font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">
              {framework} <ChevronDown size={14} />
            </button>
            <div className="absolute top-full right-0 z-10 hidden w-24 pt-1 group-hover:block">
              <div className="rounded-md border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
                <button
                  onClick={() => setFramework("React")}
                  className="block w-full px-3 py-1.5 text-left text-xs text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  React
                </button>
                <button
                  onClick={() => setFramework("HTML")}
                  className="block w-full px-3 py-1.5 text-left text-xs text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  HTML
                </button>
                <button
                  onClick={() => setFramework("Vue")}
                  className="block w-full px-3 py-1.5 text-left text-xs text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  Vue
                </button>
              </div>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-1.5 text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300"
          >
            {isCopied ? <Check size={16} /> : <Copy size={16} />}
          </button>
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
              className="h-full w-full transition-all duration-300 ease-in-out"
              style={{ maxWidth: viewportWidths[viewport] }}
            >
              {viewport === "desktop" ? (
                <div className="relative isolate h-full w-full overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800/50">
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
            className="w-full overflow-x-auto bg-zinc-50 p-4 text-sm sm:p-6 dark:bg-[#0d1117]"
            style={{ minHeight: `${minHeight}px` }}
          >
            {activeTab === "code" ? (
              framework === "React" ? (
                code ? (
                  <CodeBlock code={code} />
                ) : (
                  <div className="flex h-full min-h-[400px] items-center justify-center text-zinc-500">
                    <p>React code export coming soon.</p>
                  </div>
                )
              ) : framework === "HTML" ? (
                codeHtml ? (
                  <CodeBlock code={codeHtml} language="html" />
                ) : (
                  <div className="flex h-full min-h-[400px] items-center justify-center text-zinc-500">
                    <p>HTML code export coming soon.</p>
                  </div>
                )
              ) : codeVue ? (
                <CodeBlock code={codeVue} language="vue" />
              ) : (
                <div className="flex h-full min-h-[400px] items-center justify-center text-zinc-500">
                  <p>Vue code export coming soon.</p>
                </div>
              )
            ) : activeTab === "skill" && skill ? (
              <CodeBlock code={skill} language="markdown" />
            ) : (
              <p className="text-sm text-zinc-500">No content provided.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
