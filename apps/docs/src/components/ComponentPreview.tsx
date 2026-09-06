import React from "react";

interface ComponentPreviewProps {
  children: React.ReactNode;
  className?: string;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`my-4 flex min-h-[160px] w-full items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8 sm:p-12 shadow-xs transition-colors ${className}`}
    >
      {children}
    </div>
  );
};
