import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Copy,
  Check,
  ExternalLink,
  LifeBuoy,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getPrevNext } from "../navData";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@hudbird/ui";

interface PageToolbarProps {
  isWide?: boolean;
  breadcrumbs?: any;
}

export const PageToolbar: React.FC<PageToolbarProps> = () => {
  const location = useLocation();
  const { prev, next } = getPrevNext(location.pathname);
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex shrink-0 items-center gap-1 rounded-xl bg-black/[0.04] p-1 dark:bg-white/[0.04]">
      {/* Previous page */}
      {prev ? (
        <Link
          to={prev.path}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-all duration-150 hover:-translate-y-0.5 hover:bg-black/5 hover:text-zinc-950 active:translate-y-0 active:scale-95 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
          title={`Previous: ${prev.name}`}
          aria-label={`Previous: ${prev.name}`}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <div className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-300 dark:text-zinc-700">
          <ChevronLeft className="h-4 w-4" />
        </div>
      )}

      {/* Next page */}
      {next ? (
        <Link
          to={next.path}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-all duration-150 hover:-translate-y-0.5 hover:bg-black/5 hover:text-zinc-950 active:translate-y-0 active:scale-95 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
          title={`Next: ${next.name}`}
          aria-label={`Next: ${next.name}`}
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <div className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-300 dark:text-zinc-700">
          <ChevronRight className="h-4 w-4" />
        </div>
      )}

      {/* Secondary Actions in 3-Dots Menu (Gestalt & Don't Make Me Think) */}
      <Dropdown placement="bottom-end">
        <DropdownTrigger
          className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-all duration-150 hover:-translate-y-0.5 hover:bg-black/5 hover:text-zinc-950 active:translate-y-0 active:scale-95 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
          title="Page options"
          aria-label="Page options"
        >
          <MoreHorizontal className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownMenu className="min-w-[180px]">
          <DropdownItem
            startContent={
              copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )
            }
            onClick={copyUrl}
          >
            {copied ? "URL Copied!" : "Copy Page URL"}
          </DropdownItem>
          <DropdownItem
            startContent={<ExternalLink className="h-3.5 w-3.5" />}
            onClick={() => window.open("https://github.com/gpamdani-git/Hudbird", "_blank")}
          >
            GitHub Repository
          </DropdownItem>
          <DropdownItem
            startContent={<LifeBuoy className="h-3.5 w-3.5" />}
            onClick={() => window.open("https://github.com/gpamdani-git/Hudbird/issues", "_blank")}
          >
            Report an Issue
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
