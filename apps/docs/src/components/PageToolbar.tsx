import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getPrevNext } from "../navData";

interface PageToolbarProps {
  isWide?: boolean;
  breadcrumbs?: any;
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
    <div className="flex shrink-0 items-center justify-end gap-2 pb-8">
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex h-8 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 shadow-xs transition-colors hover:bg-zinc-50 dark:border-[#2E2F33] dark:bg-[#202124] dark:text-[#E5E5E5] dark:hover:bg-[#2E2F33] dark:hover:text-white"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-zinc-400 dark:text-[#828282]" />
          )}
          Copy Page
        </button>

        {dropdownOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
            <div className="absolute right-0 z-50 mt-1 w-48 rounded-lg border border-zinc-200 bg-white p-1 shadow-lg dark:border-[#2E2F33] dark:bg-[#202124]">
              <button
                onClick={copyUrl}
                className="flex w-full items-center rounded-md px-2.5 py-1.5 text-xs text-zinc-700 hover:bg-zinc-100 dark:text-[#E5E5E5] dark:hover:bg-[#2E2F33] dark:hover:text-indigo-400"
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
          className="flex h-8 items-center justify-center rounded-lg border border-zinc-200 bg-white px-2 text-zinc-600 shadow-xs transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-[#2E2F33] dark:bg-[#202124] dark:text-[#828282] dark:hover:bg-[#2E2F33] dark:hover:text-indigo-400"
          title={`Previous: ${prev.name}`}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-50 px-2 text-zinc-300 dark:border-[#2E2F33]/40 dark:bg-[#161618] dark:text-zinc-700">
          <ChevronLeft className="h-4 w-4" />
        </div>
      )}

      {next ? (
        <Link
          to={next.path}
          className="flex h-8 items-center justify-center rounded-lg border border-zinc-200 bg-white px-2 text-zinc-600 shadow-xs transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-[#2E2F33] dark:bg-[#202124] dark:text-[#828282] dark:hover:bg-[#2E2F33] dark:hover:text-indigo-400"
          title={`Next: ${next.name}`}
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-50 px-2 text-zinc-300 dark:border-[#2E2F33]/40 dark:bg-[#161618] dark:text-zinc-700">
          <ChevronRight className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};
