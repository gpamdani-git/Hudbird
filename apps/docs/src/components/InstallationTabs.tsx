import React, { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import { ChevronRight } from "lucide-react";

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
  manualFileName = `src/components/hudbird-ui/${componentName.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("")}.tsx`
}) => {
  const [activeTab, setActiveTab] = useState<"command" | "manual">("command");
  const [pkgManager, setPkgManager] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");

  const getCommand = () => {
    switch (pkgManager) {
      case "npm":
        return `npx hudbird-ui@latest add ${componentName}`;
      case "yarn":
        return `yarn dlx hudbird-ui@latest add ${componentName}`;
      case "bun":
        return `bunx --bun hudbird-ui@latest add ${componentName}`;
      case "pnpm":
      default:
        return `pnpm dlx hudbird-ui@latest add ${componentName}`;
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

  return (
    <div className="my-6">
      <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
        Installation
      </h3>

      <div className="flex items-center gap-6 border-b border-zinc-200 dark:border-zinc-800 mb-4">
        <button
          onClick={() => setActiveTab("command")}
          className={`pb-2 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "command"
              ? "border-zinc-900 text-zinc-900 dark:border-white dark:text-white"
              : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
          }`}
        >
          Command
        </button>
        <button
          onClick={() => setActiveTab("manual")}
          className={`pb-2 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "manual"
              ? "border-zinc-900 text-zinc-900 dark:border-white dark:text-white"
              : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
          }`}
        >
          Manual
        </button>
      </div>

      {activeTab === "command" && (
        <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-950/5 dark:bg-zinc-900/60 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-950/50">
            <ChevronRight className="w-4 h-4 text-zinc-500" />
            {(["pnpm", "npm", "yarn", "bun"] as const).map((pm) => (
              <button
                key={pm}
                onClick={() => setPkgManager(pm)}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                  pkgManager === pm
                    ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                }`}
              >
                {pm}
              </button>
            ))}
          </div>
          <div className="px-4 py-3 font-mono text-[13px] text-zinc-800 dark:text-zinc-200 overflow-x-auto">
            {getCommand()}
          </div>
        </div>
      )}

      {activeTab === "manual" && (
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="relative pl-8">
            <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
              1
            </div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3 leading-6">
              Install the following dependencies:
            </h4>
            <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-950/5 dark:bg-zinc-900/60 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-950/50">
                <ChevronRight className="w-4 h-4 text-zinc-500" />
                {(["pnpm", "npm", "yarn", "bun"] as const).map((pm) => (
                  <button
                    key={pm}
                    onClick={() => setPkgManager(pm)}
                    className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                      pkgManager === pm
                        ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                    }`}
                  >
                    {pm}
                  </button>
                ))}
              </div>
              <div className="px-4 py-3 font-mono text-[13px] text-zinc-800 dark:text-zinc-200 overflow-x-auto">
                {getInstallCommand()}
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative pl-8">
            <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
              2
            </div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3 leading-6">
              Copy and paste the following code into your project.
            </h4>
            <CodeBlock code={manualCode} filename={manualFileName} language="tsx" expandable={true} />
          </div>

          {/* Step 3 */}
          <div className="relative pl-8">
            <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
              3
            </div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-6">
              Update the import paths to match your project setup.
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};
