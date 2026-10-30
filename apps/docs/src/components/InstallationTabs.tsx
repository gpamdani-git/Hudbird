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
  manualFileName = `src/components/hudbird-ui/${componentName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("")}.tsx`,
}) => {
  const [activeTab, setActiveTab] = useState<"command" | "manual">("command");
  const [pkgManager, setPkgManager] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");

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

  return (
    <div className="my-6">
      <h3 className="mb-4 text-2xl font-medium tracking-[-0.3px] text-zinc-900 dark:text-white">
        Installation
      </h3>

      <div className="mb-4 flex items-center gap-6 border-b border-zinc-200 dark:border-[#2E2F33]">
        <button
          onClick={() => setActiveTab("command")}
          className={`border-b-2 pb-2 text-sm font-medium transition-colors ${
            activeTab === "command"
              ? "border-zinc-900 text-zinc-900 dark:border-indigo-400 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-[#828282] dark:hover:text-white"
          }`}
        >
          Command
        </button>
        <button
          onClick={() => setActiveTab("manual")}
          className={`border-b-2 pb-2 text-sm font-medium transition-colors ${
            activeTab === "manual"
              ? "border-zinc-900 text-zinc-900 dark:border-indigo-400 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-[#828282] dark:hover:text-white"
          }`}
        >
          Manual
        </button>
      </div>

      {activeTab === "command" && (
        <div className="overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50/50 dark:border-[#2E2F33] dark:bg-[#161618]">
          <div className="flex items-center gap-2 border-b border-zinc-200/80 bg-zinc-100/50 px-4 py-2 dark:border-[#2E2F33] dark:bg-[#202124]/60">
            <ChevronRight className="h-4 w-4 text-zinc-500 dark:text-[#828282]" />
            {(["pnpm", "npm", "yarn", "bun"] as const).map((pm) => (
              <button
                key={pm}
                onClick={() => setPkgManager(pm)}
                className={`rounded-md px-3 py-1 font-mono text-xs transition-colors ${
                  pkgManager === pm
                    ? "bg-zinc-200 font-semibold text-zinc-900 dark:border dark:border-[#2E2F33] dark:bg-[#202124] dark:text-indigo-400"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-[#828282] dark:hover:text-white"
                }`}
              >
                {pm}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto px-4 py-3 font-mono text-[13.6px] leading-[1.65] text-zinc-800 dark:text-[#E5E5E5]">
            {getCommand()}
          </div>
        </div>
      )}

      {activeTab === "manual" && (
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="relative pl-8">
            <div className="absolute top-0 left-0 flex h-6 w-6 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-xs font-semibold text-zinc-900 dark:border-[#2E2F33] dark:bg-[#202124] dark:text-indigo-400">
              1
            </div>
            <h4 className="mb-3 text-sm leading-6 font-semibold text-zinc-900 dark:text-[#E5E5E5]">
              Install the following dependencies:
            </h4>
            <div className="overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50/50 dark:border-[#2E2F33] dark:bg-[#161618]">
              <div className="flex items-center gap-2 border-b border-zinc-200/80 bg-zinc-100/50 px-4 py-2 dark:border-[#2E2F33] dark:bg-[#202124]/60">
                <ChevronRight className="h-4 w-4 text-zinc-500 dark:text-[#828282]" />
                {(["pnpm", "npm", "yarn", "bun"] as const).map((pm) => (
                  <button
                    key={pm}
                    onClick={() => setPkgManager(pm)}
                    className={`rounded-md px-3 py-1 font-mono text-xs transition-colors ${
                      pkgManager === pm
                        ? "bg-zinc-200 font-semibold text-zinc-900 dark:border dark:border-[#2E2F33] dark:bg-[#202124] dark:text-indigo-400"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-[#828282] dark:hover:text-white"
                    }`}
                  >
                    {pm}
                  </button>
                ))}
              </div>
              <div className="overflow-x-auto px-4 py-3 font-mono text-[13.6px] leading-[1.65] text-zinc-800 dark:text-[#E5E5E5]">
                {getInstallCommand()}
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative pl-8">
            <div className="absolute top-0 left-0 flex h-6 w-6 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-xs font-semibold text-zinc-900 dark:border-[#2E2F33] dark:bg-[#202124] dark:text-indigo-400">
              2
            </div>
            <h4 className="mb-3 text-sm leading-6 font-semibold text-zinc-900 dark:text-[#E5E5E5]">
              Copy and paste the following code into your project.
            </h4>
            <CodeBlock
              code={manualCode}
              filename={manualFileName}
              language="tsx"
              expandable={true}
            />
          </div>

          {/* Step 3 */}
          <div className="relative pl-8">
            <div className="absolute top-0 left-0 flex h-6 w-6 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-xs font-semibold text-zinc-900 dark:border-[#2E2F33] dark:bg-[#202124] dark:text-indigo-400">
              3
            </div>
            <h4 className="text-sm leading-6 font-semibold text-zinc-900 dark:text-[#E5E5E5]">
              Update the import paths to match your project setup.
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};
