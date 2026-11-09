import React from "react";

export function DocLoadingSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-8 py-6 pb-20">
      {/* Top Banner / Breadcrumb Loader */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-md bg-zinc-200/80 dark:bg-zinc-800" />
          <div className="h-4 w-32 rounded-md bg-zinc-200/80 dark:bg-zinc-800" />
        </div>
        <div className="h-8 w-24 rounded-lg bg-zinc-200/80 dark:bg-zinc-800" />
      </div>

      {/* Hero / Page Header Skeleton */}
      <div className="space-y-3">
        <div className="h-10 w-3/4 max-w-lg rounded-xl bg-zinc-200/80 dark:bg-zinc-800" />
        <div className="h-5 w-full max-w-2xl rounded-md bg-zinc-200/70 dark:bg-zinc-800/70" />
      </div>

      {/* Main Preview Container Skeleton */}
      <div className="relative flex h-[380px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-100/60 dark:border-white/[0.08] dark:bg-[#161618]">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/[0.06] bg-white shadow-sm dark:border-white/[0.08] dark:bg-zinc-900">
            <svg
              viewBox="0 0 81 123"
              fill="currentColor"
              className="h-6 w-auto animate-pulse text-zinc-900 dark:text-white"
              aria-hidden="true"
            >
              <path d="M 11.5,0 A 11.5,11.5 0 0,1 23,11.5 L 23,44 C 25,38 36,35 48,35 C 64,35 80.5,45 80.5,65 L 80.5,111.5 A 11.25,11.25 0 0,1 58,111.5 L 58,65 C 58,57 50,53.5 40.5,53.5 C 31,53.5 23,58 23,67 L 23,111.5 A 11.5,11.5 0 0,1 0,111.5 L 0,11.5 A 11.5,11.5 0 0,1 11.5,0 Z" />
            </svg>
          </div>
          <span className="text-xs font-medium tracking-tight text-zinc-400 dark:text-zinc-500">
            Loading documentation...
          </span>
        </div>
      </div>

      {/* Bottom Content / Code Block Skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-40 rounded-md bg-zinc-200/80 dark:bg-zinc-800" />
        <div className="h-32 w-full rounded-xl border border-zinc-200/80 bg-zinc-100/60 dark:border-white/[0.08] dark:bg-[#161618]" />
      </div>
    </div>
  );
}
