import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

interface CliCommandTabsProps {
  commandType: "init" | "add";
}

export const CliCommandTabs: React.FC<CliCommandTabsProps> = ({ commandType }) => {
  const [pkgManager, setPkgManager] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");

  const getCommand = () => {
    const addSuffix = commandType === "add" ? " add [ComponentName]" : " init";

    switch (pkgManager) {
      case "npm":
        return `npx hudbird-ui@latest${addSuffix}`;
      case "yarn":
        return `yarn dlx hudbird-ui@latest${addSuffix}`;
      case "bun":
        return `bunx --bun hudbird-ui@latest${addSuffix}`;
      case "pnpm":
      default:
        return `pnpm dlx hudbird-ui@latest${addSuffix}`;
    }
  };

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50/50 dark:border-[#2E2F33] dark:bg-[#161618]">
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
  );
};
