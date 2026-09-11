import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getPrevNext } from "../navData";

interface PageToolbarProps {
  isWide?: boolean;
}

export const PageToolbar: React.FC<PageToolbarProps> = ({ isWide }) => {
  const location = useLocation();
  const { prev, next } = getPrevNext(location.pathname);
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setDropdownOpen(false);
  };

  return (
    <div className="flex shrink-0 items-center justify-end gap-2">
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex h-8 items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          Copy Page
        </button>

        {dropdownOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
            <div className="absolute right-0 z-50 mt-1 w-48 rounded-md border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
              <button
                onClick={copyUrl}
                className="flex w-full items-center rounded-sm px-2 py-1.5 text-xs text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                Copy URL
              </button>
            </div>
          </>
        )}
      </div>

      {prev ? (
        <Link
          to={prev.path}
          className="flex h-8 items-center justify-center rounded-md border border-zinc-200 bg-white px-2 text-zinc-600 shadow-sm transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
          title={`Previous: ${prev.name}`}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-100 bg-zinc-50 px-2 text-zinc-300 dark:border-zinc-800/50 dark:bg-zinc-900/30 dark:text-zinc-700">
          <ChevronLeft className="h-4 w-4" />
        </div>
      )}

      {next ? (
        <Link
          to={next.path}
          className="flex h-8 items-center justify-center rounded-md border border-zinc-200 bg-white px-2 text-zinc-600 shadow-sm transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
          title={`Next: ${next.name}`}
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-100 bg-zinc-50 px-2 text-zinc-300 dark:border-zinc-800/50 dark:bg-zinc-900/30 dark:text-zinc-700">
          <ChevronRight className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};
