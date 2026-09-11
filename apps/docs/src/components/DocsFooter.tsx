import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getPrevNext } from "../navData";

interface DocsFooterProps {
  isWide?: boolean;
}

export const DocsFooter: React.FC<DocsFooterProps> = ({ isWide }) => {
  const location = useLocation();
  const { prev, next } = getPrevNext(location.pathname);

  if (!prev && !next) return null;

  return (
    <div
      className={`mt-16 flex flex-row items-center justify-between border-t border-zinc-200 pt-8 pb-16 dark:border-zinc-800 ${isWide ? "mx-auto max-w-7xl px-4 sm:px-8 lg:px-12" : ""}`}
    >
      {prev ? (
        <Link
          to={prev.path}
          className="group flex flex-col items-start gap-1 rounded-lg border border-transparent px-2 py-2 text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
        >
          <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-500 dark:group-hover:text-zinc-300">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </div>
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">{prev.name}</span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          to={next.path}
          className="group flex flex-col items-end gap-1 rounded-lg border border-transparent px-2 py-2 text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
        >
          <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-500 dark:group-hover:text-zinc-300">
            Next
            <ChevronRight className="h-4 w-4" />
          </div>
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">{next.name}</span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};
