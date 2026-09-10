import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  X,
  CornerDownLeft,
  Layers,
  Layout,
  BookOpen,
  Hash,
  ArrowRight,
  FileQuestion,
} from "lucide-react";
import { searchIndex, SearchItem } from "../data/searchIndex";

interface GlobalSearchProps {
  className?: string;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Detect OS for shortcut symbol (⌘ on Mac/iOS, Ctrl on Windows/Linux)
  const isMac = useMemo(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent);
    }
    return true;
  }, []);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K and /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // Quick slash / shortcut when not in input/textarea
      if (
        e.key === "/" &&
        !isOpen &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          (e.target as HTMLElement)?.isContentEditable
        )
      ) {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      // Escape key to close modal
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input and reset query on open
  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0);
      // Small timeout ensures the DOM node is rendered before focusing
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Filter and score search results
  const filteredResults = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      // Default: Return a curated mix of popular items & new additions
      return searchIndex.filter(
        (item) =>
          item.id === "getting-started" ||
          item.id === "comp-button" ||
          item.id === "comp-tabs" ||
          item.id === "comp-accordion" ||
          item.id === "comp-navbar" ||
          item.id === "comp-radio-group" ||
          item.id === "comp-tooltip" ||
          item.id === "layout-sidebar" ||
          item.id === "layout-stacked"
      );
    }

    // Rank results based on relevance
    const scored = searchIndex
      .map((item) => {
        let score = 0;
        const titleLower = item.title.toLowerCase();
        const descLower = item.description.toLowerCase();
        const parentLower = item.parent?.toLowerCase() || "";

        if (titleLower === cleanQuery) score += 100;
        else if (titleLower.startsWith(cleanQuery)) score += 60;
        else if (titleLower.includes(cleanQuery)) score += 40;

        if (parentLower.includes(cleanQuery)) score += 30;

        // Keyword matches
        if (item.keywords?.some((k) => k.toLowerCase() === cleanQuery)) score += 35;
        else if (item.keywords?.some((k) => k.toLowerCase().includes(cleanQuery))) score += 20;

        // Description matches
        if (descLower.includes(cleanQuery)) score += 10;

        // Category matches
        if (item.category.toLowerCase().includes(cleanQuery)) score += 5;

        return { item, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item);

    return scored;
  }, [query]);

  // Keep selected index in bounds when results list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  // Scroll active item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeElement = resultsContainerRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      );
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  // Navigate to item
  const handleSelect = (item: SearchItem) => {
    setIsOpen(false);
    if (item.path.includes("#")) {
      const [routePath, hash] = item.path.split("#");
      navigate(routePath);
      setTimeout(() => {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      navigate(item.path);
    }
  };

  // Keyboard navigation within list
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredResults.length === 0 ? 0 : (prev + 1) % filteredResults.length
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredResults.length === 0
          ? 0
          : (prev - 1 + filteredResults.length) % filteredResults.length
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    }
  };

  // Icon selector per category
  const renderItemIcon = (item: SearchItem) => {
    switch (item.category) {
      case "Getting Started":
        return <BookOpen className="h-4 w-4 shrink-0 text-indigo-500 dark:text-indigo-400" />;
      case "Layouts":
        return <Layout className="h-4 w-4 shrink-0 text-purple-500 dark:text-purple-400" />;
      case "Sections":
        return <Hash className="h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />;
      case "Components":
      default:
        return <Layers className="h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />;
    }
  };

  return (
    <>
      {/* 1. Header Search Bar Trigger Button */}
      <div className={`relative flex items-center ${className}`}>
        {/* Desktop / Tablet Trigger Button */}
        <button
          type="button"
          id="global-search-bar"
          onClick={() => setIsOpen(true)}
          aria-label="Search documentation"
          className="group hidden h-9 w-48 cursor-pointer items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/80 px-3 text-xs text-zinc-400 shadow-2xs transition-all select-none hover:border-zinc-300 hover:bg-zinc-100/80 hover:text-zinc-600 sm:flex md:w-64 lg:w-72 xl:w-80 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-500 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
        >
          <div className="flex items-center gap-2.5 truncate">
            <Search className="h-3.5 w-3.5 shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
            <span className="truncate">Search documentation...</span>
          </div>

          <div className="flex items-center gap-1">
            <kbd className="inline-flex items-center rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[10px] font-medium text-zinc-500 shadow-2xs transition-colors group-hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:border-zinc-600">
              {isMac ? "⌘" : "Ctrl+"}K
            </kbd>
          </div>
        </button>

        {/* Mobile-only Trigger Icon Button */}
        <button
          type="button"
          id="mobile-global-search-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="Search documentation"
          className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 sm:hidden dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      {/* 2. Global Search Command Palette Modal */}
      {isOpen && (
        <div
          className="animate-in fade-in fixed inset-0 z-50 flex items-start justify-center bg-zinc-950/40 p-3 backdrop-blur-xs duration-150 sm:p-6 md:pt-20 dark:bg-zinc-950/70"
          onClick={() => setIsOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search documentation"
            id="global-search-dialog"
            onClick={(e) => e.stopPropagation()}
            className="animate-in zoom-in-95 flex max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl duration-150 sm:max-h-[75vh] dark:border-zinc-800 dark:bg-zinc-900"
          >
            {/* Search Input Box */}
            <div className="relative flex items-center gap-3 border-b border-zinc-200 px-4 py-3.5 dark:border-zinc-800">
              <Search className="h-5 w-5 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search components, layouts, guides, props..."
                className="w-full min-w-0 border-none bg-transparent p-0 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-0 sm:text-base dark:text-white dark:placeholder:text-zinc-500"
                aria-autocomplete="list"
                aria-controls="search-results-list"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                  aria-label="Clear query"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="hidden rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] font-medium text-zinc-500 sm:inline-flex dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
              >
                ESC
              </button>
            </div>

            {/* Results Container */}
            <div
              ref={resultsContainerRef}
              id="search-results-list"
              className="flex-1 space-y-1 overflow-y-auto p-2 sm:p-3"
            >
              {filteredResults.length > 0 ? (
                <>
                  <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                    {query.trim() ? "Search Results" : "Quick Links & Suggestions"}
                  </div>

                  {filteredResults.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        data-index={index}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-colors ${
                          isSelected
                            ? "bg-zinc-100 text-zinc-950 shadow-2xs dark:bg-zinc-800/90 dark:text-white"
                            : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/50"
                        }`}
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className={`rounded-lg p-1.5 transition-colors ${
                              isSelected
                                ? "bg-white shadow-2xs dark:bg-zinc-700"
                                : "bg-zinc-100 dark:bg-zinc-800/80"
                            }`}
                          >
                            {renderItemIcon(item)}
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              {item.parent && (
                                <span className="truncate text-xs font-normal text-zinc-400 dark:text-zinc-500">
                                  {item.parent} &gt;
                                </span>
                              )}
                              <span
                                className={`truncate text-sm font-medium ${
                                  isSelected ? "text-zinc-950 dark:text-white" : ""
                                }`}
                              >
                                {item.title}
                              </span>

                              {item.isNew && (
                                <span className="py-0.2 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-1.5 text-[10px] leading-none font-semibold text-emerald-600 dark:text-emerald-400">
                                  New
                                </span>
                              )}

                              <span className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                                • {item.category}
                              </span>
                            </div>

                            <p className="mt-0.5 line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center pl-3">
                          {isSelected ? (
                            <span className="flex items-center gap-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                              <span className="hidden sm:inline">Jump to</span>
                              <CornerDownLeft className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                            </span>
                          ) : (
                            <ArrowRight className="h-3.5 w-3.5 text-transparent transition-colors group-hover:text-zinc-400 dark:group-hover:text-zinc-500" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                /* Empty state when no matches found */
                <div className="px-6 py-12 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">
                    <FileQuestion className="h-6 w-6" />
                  </div>
                  <h4 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-white">
                    No results found for &ldquo;{query}&rdquo;
                  </h4>
                  <p className="mx-auto mb-4 max-w-xs text-xs text-zinc-500 dark:text-zinc-400">
                    We couldn&apos;t find any documentation or components matching your search term.
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    <span className="py-1 text-xs text-zinc-400">Try:</span>
                    {["Button", "Tabs", "Navbar", "Accordion", "Input", "Layouts"].map(
                      (suggest) => (
                        <button
                          key={suggest}
                          type="button"
                          onClick={() => setQuery(suggest)}
                          className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                        >
                          {suggest}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Keyboard Navigation Helper Footer */}
            <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-[11px] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
              <div className="hidden items-center gap-3 sm:flex">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-zinc-200 bg-white px-1 py-0.5 font-mono text-[10px] dark:border-zinc-700 dark:bg-zinc-800">
                    ↑
                  </kbd>
                  <kbd className="rounded border border-zinc-200 bg-white px-1 py-0.5 font-mono text-[10px] dark:border-zinc-700 dark:bg-zinc-800">
                    ↓
                  </kbd>{" "}
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-zinc-200 bg-white px-1 py-0.5 font-mono text-[10px] dark:border-zinc-700 dark:bg-zinc-800">
                    ↵
                  </kbd>{" "}
                  select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-zinc-200 bg-white px-1 py-0.5 font-mono text-[10px] dark:border-zinc-700 dark:bg-zinc-800">
                    esc
                  </kbd>{" "}
                  close
                </span>
              </div>

              <div className="flex w-full items-center justify-between gap-2 text-zinc-400 sm:w-auto sm:justify-end dark:text-zinc-500">
                <span>
                  {query.trim()
                    ? `${filteredResults.length} result${filteredResults.length === 1 ? "" : "s"}`
                    : "Hudbird UI Docs"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
