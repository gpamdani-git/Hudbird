import React from "react";
import { PageToolbar } from "./PageToolbar";

interface DocHeaderProps {
  category?: string;
  title: string;
  description: React.ReactNode;
  badge?: string;
  className?: string;
}

export const DocHeader: React.FC<DocHeaderProps> = ({
  category,
  title,
  description,
  badge,
  className = "",
}) => {
  return (
    <div
      className={`mb-12 flex flex-col items-start justify-between gap-6 sm:mb-16 sm:flex-row sm:items-start ${className}`}
    >
      <div className="w-full min-w-0 flex-1">
        {(category || badge) && (
          <div className="mb-4 flex flex-wrap items-center gap-2.5 sm:mb-6">
            {category && (
              <span className="text-xs font-bold tracking-[1.5px] text-zinc-400 uppercase dark:text-zinc-500">
                {category}
              </span>
            )}
            {badge && (
              <span className="rounded-full bg-black/5 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-zinc-700 dark:bg-white/10 dark:text-zinc-300">
                {badge}
              </span>
            )}
          </div>
        )}
        <h1 className="font-outfit mb-4 text-4xl leading-[1.12] font-bold tracking-[-1.8px] text-zinc-950 sm:mb-6 sm:text-6xl sm:tracking-[-2.2px] lg:text-[72px] dark:text-white">
          {title}
        </h1>
        <div className="max-w-3xl text-lg leading-[1.6] font-normal tracking-[-0.16px] text-zinc-600 sm:text-xl lg:text-2xl dark:text-zinc-400">
          {description}
        </div>
      </div>
      <PageToolbar />
    </div>
  );
};
