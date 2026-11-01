import React, { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import { ChevronRight, Copy, Check } from "lucide-react";

interface InstallationTabsProps {
  componentName: string;
  dependencies?: string;
  manualCode?: string;
  manualFileName?: string;
}

export const InstallationTabs: React.FC<InstallationTabsProps> = ({
  componentName,
  dependencies = "framer-motion lucide-react clsx tailwind-merge class-variance-authority",
  manualCode = "// Copy the component code from the repository",
  manualFileName = `src/components/hudbird-ui/${componentName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("")}.tsx`,
}) => {
  const [activeTab, setActiveTab] = useState<"command" | "manual">("command");
  const [pkgManager, setPkgManager] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [copiedDeps, setCopiedDeps] = useState(false);

  const formattedName = componentName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

  const getCommand = () => {
    switch (pkgManager) {
      case "npm":
        return `npx hudbird-ui@latest add ${formattedName}`;
      case "yarn":
        return `yarn dlx hudbird-ui@latest add ${formattedName}`;
      case "bun":
        return `bunx --bun hudbird-ui@latest add ${formattedName}`;
      case "pnpm":
      default:
        return `pnpm dlx hudbird-ui@latest add ${formattedName}`;
    }
  };

  const getInstallCommand = () => {
    switch (pkgManager) {
      case "npm":
        return `npm install ${dependencies}`;
      case "yarn":
        return `yarn add ${dependencies}`;
      case "bun":
        return `bun add ${dependencies}`;
      case "pnpm":
      default:
        return `pnpm add ${dependencies}`;
    }
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(getCommand());
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  const handleCopyDeps = () => {
    navigator.clipboard.writeText(getInstallCommand());
    setCopiedDeps(true);
    setTimeout(() => setCopiedDeps(false), 2000);
  };

  return (
    <div className="my-8">
      <h3 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
        Installation
      </h3>

      {/* Tabs: Command vs Manual */}
      <div className="mb-4 flex items-center gap-6 border-b border-black/5 dark:border-white/5">
        <button
          onClick={() => setActiveTab("command")}
          className={`border-b-2 pb-2 text-sm font-bold transition-all duration-150 active:scale-95 ${
            activeTab === "command"
              ? "border-zinc-900 text-zinc-900 dark:border-white dark:text-white"
              : "border-transparent text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
          }`}
        >
          CLI Command
        </button>
        <button
          onClick={() => setActiveTab("manual")}
          className={`border-b-2 pb-2 text-sm font-bold transition-all duration-150 active:scale-95 ${
            activeTab === "manual"
              ? "border-zinc-900 text-zinc-900 dark:border-white dark:text-white"
              : "border-transparent text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
          }`}
        >
          Manual
        </button>
      </div>

      {/* Tab: CLI Command */}
      {activeTab === "command" && (
        <div className="group relative overflow-hidden rounded-xl border border-black/10 bg-zinc-50/70 transition-all dark:border-white/10 dark:bg-[#161618]">
          <div className="flex items-center justify-between border-b border-black/5 bg-zinc-100/50 px-3.5 py-2 dark:border-white/5 dark:bg-[#202124]/40">
            {/* Package Managers */}
            <div className="flex items-center gap-1.5">
              <ChevronRight className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
              {(["pnpm", "npm", "yarn", "bun"] as const).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setPkgManager(pm)}
                  className={`rounded-md px-2.5 py-1 font-mono text-xs font-semibold transition-all duration-150 active:scale-95 ${
                    pkgManager === pm
                      ? "bg-white text-zinc-950 shadow-xs dark:bg-white/15 dark:text-white"
                      : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  {pm}
                </button>
              ))}
            </div>

            {/* Copy Button with Micro-interaction */}
            <button
              type="button"
              onClick={handleCopyCommand}
              aria-label="Copy installation command"
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-150 active:scale-90 ${
                copiedCommand
                  ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400"
                  : "bg-black/5 text-zinc-600 hover:-translate-y-0.5 hover:bg-black/10 hover:text-zinc-950 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
            >
              {copiedCommand ? (
                <>
                  <Check className="animate-in zoom-in-75 h-3.5 w-3.5 text-emerald-500 duration-150" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="overflow-x-auto px-4 py-3 font-mono text-[13.5px] leading-[1.6] font-medium text-zinc-900 select-all dark:text-[#E5E5E5]">
            {getCommand()}
          </div>
        </div>
      )}

      {/* Tab: Manual */}
      {activeTab === "manual" && (
        <div className="space-y-6">
          {/* Step 1: Dependencies */}
          <div className="relative pl-8">
            <div className="absolute top-0 left-0 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-900 dark:bg-white/15 dark:text-white">
              1
            </div>
            <h4 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Install the following dependencies:
            </h4>
            <div className="overflow-hidden rounded-xl border border-black/10 bg-zinc-50/70 transition-all dark:border-white/10 dark:bg-[#161618]">
              <div className="flex items-center justify-between border-b border-black/5 bg-zinc-100/50 px-3.5 py-2 dark:border-white/5 dark:bg-[#202124]/40">
                <div className="flex items-center gap-1.5">
                  <ChevronRight className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
                  {(["pnpm", "npm", "yarn", "bun"] as const).map((pm) => (
                    <button
                      key={pm}
                      onClick={() => setPkgManager(pm)}
                      className={`rounded-md px-2.5 py-1 font-mono text-xs font-semibold transition-all duration-150 active:scale-95 ${
                        pkgManager === pm
                          ? "bg-white text-zinc-950 shadow-xs dark:bg-white/15 dark:text-white"
                          : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white"
                      }`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleCopyDeps}
                  aria-label="Copy dependencies command"
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-150 active:scale-90 ${
                    copiedDeps
                      ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400"
                      : "bg-black/5 text-zinc-600 hover:-translate-y-0.5 hover:bg-black/10 hover:text-zinc-950 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
                  }`}
                >
                  {copiedDeps ? (
                    <>
                      <Check className="animate-in zoom-in-75 h-3.5 w-3.5 text-emerald-500 duration-150" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="overflow-x-auto px-4 py-3 font-mono text-[13.5px] leading-[1.6] font-medium text-zinc-900 select-all dark:text-[#E5E5E5]">
                {getInstallCommand()}
              </div>
            </div>
          </div>

          {/* Step 2: Component Code */}
          <div className="relative pl-8">
            <div className="absolute top-0 left-0 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-900 dark:bg-white/15 dark:text-white">
              2
            </div>
            <h4 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Copy and paste the component code:
            </h4>
            <CodeBlock
              code={manualCode}
              filename={manualFileName}
              language="tsx"
              expandable={true}
            />
          </div>

          {/* Step 3: Imports */}
          <div className="relative pl-8">
            <div className="absolute top-0 left-0 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-900 dark:bg-white/15 dark:text-white">
              3
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Update the import paths to match your project setup.
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};
