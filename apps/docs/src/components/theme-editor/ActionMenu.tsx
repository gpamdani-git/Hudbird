import React, { useState } from "react";
import { useThemeEditor } from "./ThemeEditorContext";
import { Copy, Terminal, Check, Code, Download, Sparkles, Sliders, Palette } from "lucide-react";
import {
  Button,
  Tabs,
  Tab,
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
        <div className="scrollbar-none overflow-x-auto pb-1">
          <Tabs
            size="sm"
            variant="solid"
            radius="md"
            selectedKey={activeTab}
            onSelectionChange={(k) => setActiveTab(k as ExportTab)}
          >
            <Tab
              tabKey="tailwind"
              title="Tailwind v4 (@theme)"
              icon={<Palette className="h-3.5 w-3.5 opacity-70" />}
            />
            <Tab
              tabKey="figma"
              title="Figma Tokens Studio"
              icon={<Sliders className="h-3.5 w-3.5 opacity-70" />}
            />
            <Tab
              tabKey="css"
              title="CSS :root Variables"
              icon={<Code className="h-3.5 w-3.5 opacity-70" />}
            />
            <Tab
              tabKey="components-json"
              title="components.json"
              icon={<Terminal className="h-3.5 w-3.5 opacity-70" />}
            />
          </Tabs>
        </div>

        <div className="custom-scrollbar flex max-h-[55vh] flex-col gap-4 overflow-y-auto pr-1">
          {/* Tab 1: Tailwind v4 @theme */}
          {activeTab === "tailwind" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 sm:text-base dark:text-zinc-100">
                    Tailwind CSS v4 Native @theme Directive
                  </h4>
                  <p className="text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                    Paste directly into your{" "}
                    <code className="font-mono text-xs">src/index.css</code> beneath{" "}
                    <code className="font-mono text-xs">@import "tailwindcss";</code>
                  </p>
                </div>
                <Button
                  variant="bordered"
                  color="secondary"
                  size="sm"
                  radius="md"
                  onClick={() => handleCopy(getTailwindV4ThemeString(), "tailwind")}
                >
                  {copied.tailwind ? (
                    <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="mr-1.5 h-3.5 w-3.5 opacity-70" />
                  )}
                  {copied.tailwind ? "Copied @theme!" : "Copy @theme"}
                </Button>
              </div>
              <div className="relative">
                <pre className="custom-scrollbar max-h-72 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-950 p-3.5 font-mono text-xs text-zinc-200 sm:text-sm dark:border-zinc-800">
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
                  <h4 className="text-sm font-semibold text-zinc-900 sm:text-base dark:text-zinc-100">
                    Figma Tokens Studio (DTCG Specification)
                  </h4>
                  <p className="text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                    Compatible with Figma Tokens Studio plugin &amp; design system sync pipelines.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="bordered"
                    color="secondary"
                    size="sm"
                    radius="md"
                    onClick={handleDownloadFigmaJson}
                  >
                    <Download className="mr-1.5 h-3.5 w-3.5 opacity-70" />
                    Download JSON
                  </Button>
                  <Button
                    variant="bordered"
                    color="secondary"
                    size="sm"
                    radius="md"
                    onClick={() => handleCopy(getFigmaTokensJson(), "figma")}
                  >
                    {copied.figma ? (
                      <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="mr-1.5 h-3.5 w-3.5 opacity-70" />
                    )}
                    {copied.figma ? "Copied!" : "Copy JSON"}
                  </Button>
                </div>
              </div>
              <div className="relative">
                <pre className="custom-scrollbar max-h-72 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-950 p-3.5 font-mono text-xs text-zinc-200 sm:text-sm dark:border-zinc-800">
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
                  <h4 className="text-sm font-semibold text-zinc-900 sm:text-base dark:text-zinc-100">
                    Standard CSS Custom Properties (:root)
                  </h4>
                  <p className="text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                    Compatible with CSS Modules, Next.js, and projects without Tailwind v4.
                  </p>
                </div>
                <Button
                  variant="bordered"
                  color="secondary"
                  size="sm"
                  radius="md"
                  onClick={() => handleCopy(getCssString(), "css")}
                >
                  {copied.css ? (
                    <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="mr-1.5 h-3.5 w-3.5 opacity-70" />
                  )}
                  {copied.css ? "Copied CSS!" : "Copy CSS"}
                </Button>
              </div>
              <div className="relative">
                <pre className="custom-scrollbar max-h-72 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-950 p-3.5 font-mono text-xs text-zinc-200 sm:text-sm dark:border-zinc-800">
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
                    <h4 className="text-sm font-semibold text-zinc-900 sm:text-base dark:text-zinc-100">
                      1. Initialize Project via CLI
                    </h4>
                    <p className="text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                      Set up your project dependencies and folder structure.
                    </p>
                  </div>
                  <Button
                    variant="bordered"
                    color="secondary"
                    size="sm"
                    radius="md"
                    onClick={() => handleCopy(getCliCommand(), "cli")}
                  >
                    {copied.cli ? (
                      <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Terminal className="mr-1.5 h-3.5 w-3.5 opacity-70" />
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
                    variant="bordered"
                    color="secondary"
                    size="sm"
                    radius="md"
                    onClick={() => handleCopy(getComponentsJsonSnippet(), "json")}
                  >
                    {copied.json ? (
                      <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="mr-1.5 h-3.5 w-3.5 opacity-70" />
                    )}
                    {copied.json ? "Copied JSON!" : "Copy JSON"}
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
