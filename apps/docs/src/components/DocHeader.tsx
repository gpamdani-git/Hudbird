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
      className={`mb-16 flex flex-col items-start justify-between gap-8 sm:mb-24 sm:flex-row sm:items-start lg:mb-28 ${className}`}
    >
      <div className="w-full min-w-0 flex-1">
        {(category || badge) && (
          <div className="mb-6 flex flex-wrap items-center gap-3 sm:mb-8">
            {category && (
              <span className="text-xs font-extrabold tracking-[1.6px] text-indigo-600 uppercase sm:text-[13px] dark:text-indigo-400">
                {category}
              </span>
            )}
            {badge && (
              <span className="rounded-full border border-indigo-500/25 bg-indigo-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                {badge}
              </span>
            )}
          </div>
        )}
        <h1 className="font-outfit text-4xl font-medium tracking-[-1.8px] leading-[1.12] text-zinc-900 sm:text-6xl sm:tracking-[-2.2px] lg:text-[72px] dark:text-white mb-6 sm:mb-8">
          {title}
        </h1>
        <div className="max-w-3xl text-lg font-normal leading-[1.6] tracking-[-0.16px] text-zinc-600 sm:text-xl lg:text-2xl dark:text-[#828282]">
          {description}
        </div>
      </div>
      <PageToolbar />
    </div>
  );
};
