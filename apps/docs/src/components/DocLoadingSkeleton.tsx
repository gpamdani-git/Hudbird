import React from "react";

export function DocLoadingSkeleton() {
  return (
    <div className="space-y-8 pb-20 animate-pulse">
      <div className="space-y-3">
        <div className="h-9 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        <div className="h-5 w-96 bg-zinc-100 dark:bg-zinc-850 rounded-md" />
      </div>
      <div className="h-64 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50" />
      <div className="space-y-4">
        <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        <div className="h-28 w-full rounded-xl bg-zinc-100 dark:bg-zinc-850" />
      </div>
    </div>
  );
}
