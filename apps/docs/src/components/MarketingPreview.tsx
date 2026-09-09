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
    <div className="flex flex-col gap-4 my-8 w-full">
      {/* Header Controls */}
      <div className="flex items-center justify-between w-full">
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </div>

        <div className="flex items-center gap-4">
          {/* Preview / Code Toggle */}
          <div className="flex bg-zinc-100 dark:bg-zinc-800/50 rounded-full p-0.5">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                activeTab === "preview"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                activeTab === "code"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              Code
            </button>
            <button
              onClick={() => setActiveTab("skill")}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                activeTab === "skill"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              Skill.md
            </button>
          </div>

          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800" />

          {/* Viewport Toggles */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setActiveTab("preview");
                setViewport("desktop");
              }}
              className={`p-1.5 rounded-md transition-colors ${
                viewport === "desktop" && activeTab === "preview"
                  ? "text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800"
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
              className={`p-1.5 rounded-md transition-colors ${
                viewport === "tablet" && activeTab === "preview"
                  ? "text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800"
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
              className={`p-1.5 rounded-md transition-colors ${
                viewport === "mobile" && activeTab === "preview"
                  ? "text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800"
                  : "text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300"
              }`}
            >
              <Smartphone size={16} />
            </button>
          </div>

          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800" />

          {/* Dropdown Placeholder */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
              {framework} <ChevronDown size={14} />
            </button>
            <div className="absolute right-0 top-full pt-1 hidden group-hover:block z-10 w-24">
              <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg py-1">
                <button onClick={() => setFramework('React')} className="block w-full text-left px-3 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700">React</button>
                <button onClick={() => setFramework('HTML')} className="block w-full text-left px-3 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700">HTML</button>
                <button onClick={() => setFramework('Vue')} className="block w-full text-left px-3 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700">Vue</button>
              </div>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
          >
            {isCopied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full relative rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#0a0a0a] overflow-hidden shadow-xs">
        {activeTab === "preview" ? (
          <div className="w-full flex items-center justify-center bg-zinc-100 dark:bg-[#050505]" style={{ minHeight: `${minHeight}px` }}>
            <div
              className="transition-all duration-300 ease-in-out w-full h-full"
              style={{ maxWidth: viewportWidths[viewport] }}
            >
              {viewport === "desktop" ? (
                <div className="w-full h-full relative isolate bg-white dark:bg-zinc-950 rounded-2xl overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-800/50">
                  {children}
                </div>
              ) : (
                <div className="w-full h-full relative bg-white dark:bg-zinc-950 rounded-2xl overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-800/50 shadow-xl my-8">
                  <IframePreview minHeight={800}>{children}</IframePreview>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full p-4 sm:p-6 bg-zinc-50 dark:bg-[#0d1117] overflow-x-auto text-sm" style={{ minHeight: `${minHeight}px` }}>
            {activeTab === "code" ? (
              framework === "React" ? (
                code ? <CodeBlock code={code} /> : <div className="flex items-center justify-center h-full min-h-[400px] text-zinc-500"><p>React code export coming soon.</p></div>
              ) : framework === "HTML" ? (
                codeHtml ? <CodeBlock code={codeHtml} language="html" /> : <div className="flex items-center justify-center h-full min-h-[400px] text-zinc-500"><p>HTML code export coming soon.</p></div>
              ) : (
                codeVue ? <CodeBlock code={codeVue} language="vue" /> : <div className="flex items-center justify-center h-full min-h-[400px] text-zinc-500"><p>Vue code export coming soon.</p></div>
              )
            ) : activeTab === "skill" && skill ? (
              <CodeBlock code={skill} language="markdown" />
            ) : (
              <p className="text-zinc-500 text-sm">No content provided.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
