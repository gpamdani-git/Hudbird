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
      className={`flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-start ${className}`}
    >
      <div className="w-full min-w-0 flex-1">
        {category && (
          <div className="mb-3.5 text-[13px] font-extrabold tracking-[1.4px] text-indigo-600 uppercase dark:text-indigo-400">
            {category}
          </div>
        )}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h1 className="font-outfit text-3xl leading-[1.15] font-medium tracking-[-1.8px] text-zinc-900 sm:text-4xl lg:text-[44px] dark:text-white">
            {title}
          </h1>
          {badge && (
            <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {badge}
            </span>
          )}
        </div>
        <div className="max-w-3xl text-base leading-[1.625] tracking-[-0.16px] text-zinc-600 sm:text-lg lg:text-xl dark:text-[#828282]">
          {description}
        </div>
      </div>
      <PageToolbar />
    </div>
  );
};
