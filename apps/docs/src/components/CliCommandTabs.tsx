import React, { useState } from "react";
import { ChevronRight, Copy, Check } from "lucide-react";

interface CliCommandTabsProps {
  commandType: "init" | "add";
}

export const CliCommandTabs: React.FC<CliCommandTabsProps> = ({ commandType }) => {
  const [pkgManager, setPkgManager] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(getCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-black/10 bg-zinc-50/70 transition-all dark:border-white/10 dark:bg-[#161618]">
      <div className="flex items-center justify-between border-b border-black/5 bg-zinc-100/50 px-3.5 py-2 dark:border-white/5 dark:bg-[#202124]/40">
        <div className="flex items-center gap-1.5">
          <ChevronRight className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
          {(["pnpm", "npm", "yarn", "bun"] as const).map((pm) => (
            <button
              key={pm}
              onClick={() => setPkgManager(pm)}
              className={`h-7 rounded-md px-3 font-mono text-xs font-semibold transition-all duration-150 active:scale-95 ${
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
          onClick={handleCopy}
          aria-label="Copy CLI command"
          className={`flex h-7 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-all duration-150 active:scale-90 ${
            copied
              ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400"
              : "bg-black/5 text-zinc-600 hover:-translate-y-0.5 hover:bg-black/10 hover:text-zinc-950 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
          }`}
        >
          {copied ? (
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
  );
};
