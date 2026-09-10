import React from "react";

export function DocLoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-8 pb-20">
      <div className="space-y-3">
        <div className="h-9 w-64 rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80" />
        <div className="h-5 w-96 rounded-md bg-zinc-200/80 dark:bg-zinc-800/80" />
      </div>
      <div className="h-64 w-full rounded-2xl bg-zinc-200/80 dark:bg-zinc-800/80" />
      <div className="space-y-4">
        <div className="h-6 w-32 rounded-md bg-zinc-200/80 dark:bg-zinc-800/80" />
        <div className="h-28 w-full rounded-xl bg-zinc-200/80 dark:bg-zinc-800/80" />
      </div>
    </div>
  );
}
