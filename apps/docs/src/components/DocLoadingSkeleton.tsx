import React from "react";

export function DocLoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-8 pb-20">
      <div className="space-y-3">
        <div className="h-4 w-28 rounded-md bg-zinc-200/80 dark:bg-[#202124]" />
        <div className="h-10 w-72 rounded-lg bg-zinc-200/80 dark:bg-[#202124]" />
        <div className="h-5 w-96 rounded-md bg-zinc-200/80 dark:bg-[#202124]" />
      </div>
      <div className="h-64 w-full rounded-2xl border border-zinc-200/80 bg-zinc-200/80 dark:border-[#2E2F33] dark:bg-[#202124]" />
      <div className="space-y-4">
        <div className="h-6 w-32 rounded-md bg-zinc-200/80 dark:bg-[#202124]" />
        <div className="h-28 w-full rounded-xl border border-zinc-200/80 bg-zinc-200/80 dark:border-[#2E2F33] dark:bg-[#202124]" />
      </div>
    </div>
  );
}
