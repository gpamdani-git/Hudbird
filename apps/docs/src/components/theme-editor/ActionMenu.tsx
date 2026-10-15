import React, { useState } from "react";
import { useThemeEditor } from "./ThemeEditorContext";
import { Copy, Terminal, Check, Code, Download, Sparkles, Sliders, Palette } from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@hudbird/ui";

type ExportTab = "tailwind" | "figma" | "css" | "components-json";

export const ThemeExportDialog = () => {
  const {
    getCssString,
    getCliCommand,
    getTailwindV4ThemeString,
    getFigmaTokensJson,
    getComponentsJsonSnippet,
    isExportModalOpen,
    setIsExportModalOpen,
  } = useThemeEditor();

  const [activeTab, setActiveTab] = useState<ExportTab>("tailwind");
  const [copied, setCopied] = useState<Record<string, boolean>>({});

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const handleDownloadFigmaJson = () => {
    const jsonStr = getFigmaTokensJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "hudbird-tokens.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} size="lg">
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Palette className="h-4 w-4" />
            </span>
            <DialogTitle>Export Theme &amp; Design Tokens</DialogTitle>
          </div>
          <DialogDescription>
            Synchronize your custom palette and dimensions across code and design tools.
          </DialogDescription>
        </DialogHeader>

        {/* Segmented Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-100/80 p-1 dark:border-zinc-800 dark:bg-zinc-900/80">
          <button
            type="button"
            onClick={() => setActiveTab("tailwind")}
            className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeTab === "tailwind"
                ? "bg-white font-semibold text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-white"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            Tailwind v4 (@theme)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("figma")}
            className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeTab === "figma"
                ? "bg-white font-semibold text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-white"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Palette className="h-3.5 w-3.5 text-purple-500" />
            Figma Tokens Studio (JSON)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("css")}
            className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeTab === "css"
                ? "bg-white font-semibold text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-white"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Code className="h-3.5 w-3.5 text-emerald-500" />
            CSS :root Variables
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("components-json")}
            className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeTab === "components-json"
                ? "bg-white font-semibold text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-white"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Sliders className="h-3.5 w-3.5 text-amber-500" />
            components.json
          </button>
        </div>

        <div className="custom-scrollbar flex max-h-[55vh] flex-col gap-4 overflow-y-auto pr-1">
          {/* Tab 1: Tailwind v4 @theme */}
          {activeTab === "tailwind" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    Tailwind CSS v4 Native @theme Directive
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Paste directly into your <code className="text-xs">src/index.css</code> beneath{" "}
                    <code className="text-xs">@import "tailwindcss";</code>
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(getTailwindV4ThemeString(), "tailwind")}
                  className="h-7 cursor-pointer text-xs"
                >
                  {copied.tailwind ? (
                    <Check className="mr-1 h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="mr-1 h-3 w-3" />
                  )}
                  {copied.tailwind ? "Copied @theme!" : "Copy @theme"}
                </Button>
              </div>
              <div className="relative">
                <pre className="custom-scrollbar max-h-72 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-950 p-3.5 font-mono text-xs text-zinc-200 dark:border-zinc-800">
                  <code>{getTailwindV4ThemeString()}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Tab 2: Figma Tokens Studio JSON */}
          {activeTab === "figma" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    Figma Tokens Studio (DTCG Specification)
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Compatible with Figma Tokens Studio plugin &amp; design system sync pipelines.
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadFigmaJson}
                    className="h-7 cursor-pointer text-xs"
                  >
                    <Download className="mr-1 h-3 w-3" />
                    Download tokens.json
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(getFigmaTokensJson(), "figma")}
                    className="h-7 cursor-pointer text-xs"
                  >
                    {copied.figma ? (
                      <Check className="mr-1 h-3 w-3 text-emerald-500" />
                    ) : (
                      <Copy className="mr-1 h-3 w-3" />
                    )}
                    {copied.figma ? "Copied JSON!" : "Copy JSON"}
                  </Button>
                </div>
              </div>
              <div className="relative">
                <pre className="custom-scrollbar max-h-72 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-950 p-3.5 font-mono text-xs text-zinc-200 dark:border-zinc-800">
                  <code>{getFigmaTokensJson()}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Tab 3: CSS :root Variables */}
          {activeTab === "css" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    Standard CSS Custom Properties (:root)
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Compatible with CSS Modules, Next.js, and projects without Tailwind v4.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(getCssString(), "css")}
                  className="h-7 cursor-pointer text-xs"
                >
                  {copied.css ? (
                    <Check className="mr-1 h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="mr-1 h-3 w-3" />
                  )}
                  {copied.css ? "Copied CSS!" : "Copy CSS"}
                </Button>
              </div>
              <div className="relative">
                <pre className="custom-scrollbar max-h-72 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-950 p-3.5 font-mono text-xs text-zinc-200 dark:border-zinc-800">
                  <code>{getCssString()}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Tab 4: CLI & components.json */}
          {activeTab === "components-json" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      1. Initialize Project via CLI
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Set up your project dependencies and folder structure.
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(getCliCommand(), "cli")}
                    className="h-7 cursor-pointer text-xs"
                  >
                    {copied.cli ? (
                      <Check className="mr-1 h-3 w-3 text-emerald-500" />
                    ) : (
                      <Terminal className="mr-1 h-3 w-3" />
                    )}
                    {copied.cli ? "Copied CLI!" : "Copy CLI"}
                  </Button>
                </div>
                <pre className="overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-950 p-3 font-mono text-xs text-zinc-200 dark:border-zinc-800">
                  <code>{getCliCommand()}</code>
                </pre>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      2. Project Configuration (components.json)
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Configured with your selected base color palette.
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(getComponentsJsonSnippet(), "json")}
                    className="h-7 cursor-pointer text-xs"
                  >
                    {copied.json ? (
                      <Check className="mr-1 h-3 w-3 text-emerald-500" />
                    ) : (
                      <Copy className="mr-1 h-3 w-3" />
                    )}
                    {copied.json ? "Copied JSON!" : "Copy components.json"}
                  </Button>
                </div>
                <pre className="overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-950 p-3 font-mono text-xs text-zinc-200 dark:border-zinc-800">
                  <code>{getComponentsJsonSnippet()}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsExportModalOpen(false)}
            className="cursor-pointer"
          >
            Close
          </Button>
          {activeTab === "tailwind" && (
            <Button
              variant="solid"
              color="primary"
              onClick={() => handleCopy(getTailwindV4ThemeString(), "tailwind")}
              className="cursor-pointer"
            >
              <Copy className="mr-2 h-4 w-4" />
              {copied.tailwind ? "Copied @theme!" : "Copy Tailwind @theme"}
            </Button>
          )}
          {activeTab === "figma" && (
            <Button
              variant="solid"
              color="primary"
              onClick={handleDownloadFigmaJson}
              className="cursor-pointer"
            >
              <Download className="mr-2 h-4 w-4" />
              Download tokens.json
            </Button>
          )}
          {activeTab === "css" && (
            <Button
              variant="solid"
              color="primary"
              onClick={() => handleCopy(getCssString(), "css")}
              className="cursor-pointer"
            >
              <Copy className="mr-2 h-4 w-4" />
              {copied.css ? "Copied CSS!" : "Copy All CSS"}
            </Button>
          )}
          {activeTab === "components-json" && (
            <Button
              variant="solid"
              color="primary"
              onClick={() => handleCopy(getComponentsJsonSnippet(), "json")}
              className="cursor-pointer"
            >
              <Copy className="mr-2 h-4 w-4" />
              {copied.json ? "Copied!" : "Copy components.json"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const ActionMenu = () => {
  const { setIsExportModalOpen } = useThemeEditor();

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="solid"
        color="dark"
        size="sm"
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg"
        onClick={() => setIsExportModalOpen(true)}
      >
        <Code className="h-3.5 w-3.5" />
        Export Theme Tokens
      </Button>
    </div>
  );
};
