import React, { useState } from "react";
import { ThemeEditorProvider } from "./ThemeEditorContext";
import { BaseColorPicker } from "./BaseColorPicker";
import { PrimaryColorPicker } from "./PrimaryColorPicker";
import { FontPicker } from "./FontPicker";
import { RadiusPicker } from "./RadiusPicker";
import { ActionMenu } from "./ActionMenu";
import { Paintbrush, Minimize2 } from "lucide-react";
import { cn } from "@hudbird/ui";

export const ThemeEditorInner = () => {
  const [minimized, setMinimized] = useState(false);

  return (
    <div
      className={cn(
        "fixed top-24 right-4 z-40 flex flex-col overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-2xl transition-all duration-300",
        "border-zinc-200/80 bg-white/95 dark:border-white/[0.08] dark:bg-[#161618]/95",
        minimized ? "w-12" : "w-80"
      )}
    >
      <div className="flex items-center justify-between border-b border-zinc-200/60 bg-zinc-50/80 px-3 py-2.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMinimized(!minimized)}
            className="flex cursor-pointer items-center justify-center rounded-lg p-1 transition-colors hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
            title={minimized ? "Expand Theme Editor" : "Collapse Theme Editor"}
          >
            <Paintbrush className="text-primary h-4 w-4" />
          </button>
          {!minimized && (
            <span className="text-sm font-semibold text-zinc-900 dark:text-white">
              Theme Editor
            </span>
          )}
        </div>
        {!minimized && (
          <button
            onClick={() => setMinimized(true)}
            className="cursor-pointer rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
            title="Minimize"
          >
            <Minimize2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {!minimized && (
        <>
          <div className="scrollbar-hide max-h-[calc(100vh-16rem)] flex-1 space-y-5 overflow-y-auto p-4">
            <BaseColorPicker />
            <PrimaryColorPicker />
            <RadiusPicker />
            <FontPicker />
          </div>
          <div className="border-t border-zinc-200/60 bg-zinc-50/60 p-4 dark:border-white/[0.08] dark:bg-white/[0.02]">
            <ActionMenu />
          </div>
        </>
      )}
    </div>
  );
};

export const ThemeEditor = ({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) => {
  return <ThemeEditorInner />;
};
