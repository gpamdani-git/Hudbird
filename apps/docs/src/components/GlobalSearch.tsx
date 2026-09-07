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
        return <BookOpen className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />;
      case "Layouts":
        return <Layout className="w-4 h-4 text-purple-500 dark:text-purple-400 shrink-0" />;
      case "Sections":
        return <Hash className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />;
      case "Components":
      default:
        return <Layers className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />;
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
          className="hidden sm:flex items-center justify-between w-48 md:w-64 lg:w-72 xl:w-80 h-9 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 hover:bg-zinc-100/80 dark:hover:bg-zinc-900 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all text-xs select-none group cursor-pointer shadow-2xs"
        >
          <div className="flex items-center gap-2.5 truncate">
            <Search className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors shrink-0" />
            <span className="truncate">Search documentation...</span>
          </div>

          <div className="flex items-center gap-1">
            <kbd className="inline-flex items-center px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[10px] font-medium font-mono text-zinc-500 dark:text-zinc-400 shadow-2xs group-hover:border-zinc-300 dark:group-hover:border-zinc-600 transition-colors">
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
          className="sm:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Global Search Command Palette Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 md:pt-20 bg-zinc-950/40 dark:bg-zinc-950/70 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search documentation"
            id="global-search-dialog"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[75vh] animate-in zoom-in-95 duration-150"
          >
            {/* Search Input Box */}
            <div className="relative flex items-center px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800 gap-3">
              <Search className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search components, layouts, guides, props..."
                className="w-full bg-transparent text-sm sm:text-base text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none border-none p-0 focus:ring-0"
                aria-autocomplete="list"
                aria-controls="search-results-list"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="Clear query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="hidden sm:inline-flex px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-[10px] font-medium font-mono text-zinc-500 dark:text-zinc-400"
              >
                ESC
              </button>
            </div>

            {/* Results Container */}
            <div
              ref={resultsContainerRef}
              id="search-results-list"
              className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1"
            >
              {filteredResults.length > 0 ? (
                <>
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
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
                        className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-zinc-100 dark:bg-zinc-800/90 text-zinc-950 dark:text-white shadow-2xs"
                            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`p-1.5 rounded-lg transition-colors ${
                              isSelected
                                ? "bg-white dark:bg-zinc-700 shadow-2xs"
                                : "bg-zinc-100 dark:bg-zinc-800/80"
                            }`}
                          >
                            {renderItemIcon(item)}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              {item.parent && (
                                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-normal truncate">
                                  {item.parent} &gt;
                                </span>
                              )}
                              <span
                                className={`text-sm font-medium truncate ${
                                  isSelected ? "text-zinc-950 dark:text-white" : ""
                                }`}
                              >
                                {item.title}
                              </span>

                              {item.isNew && (
                                <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md border border-emerald-500/20 leading-none">
                                  New
                                </span>
                              )}

                              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
                                • {item.category}
                              </span>
                            </div>

                            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center pl-3 shrink-0">
                          {isSelected ? (
                            <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                              <span className="hidden sm:inline">Jump to</span>
                              <CornerDownLeft className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                            </span>
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5 text-transparent group-hover:text-zinc-400 dark:group-hover:text-zinc-500 transition-colors" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                /* Empty state when no matches found */
                <div className="py-12 px-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
                    <FileQuestion className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
                    No results found for &ldquo;{query}&rdquo;
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto mb-4">
                    We couldn&apos;t find any documentation or components matching your search term.
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    <span className="text-xs text-zinc-400 py-1">Try:</span>
                    {["Button", "Tabs", "Navbar", "Accordion", "Input", "Layouts"].map(
                      (suggest) => (
                        <button
                          key={suggest}
                          type="button"
                          onClick={() => setQuery(suggest)}
                          className="px-2 py-0.5 text-xs rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
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
            <div className="px-4 py-2.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
              <div className="hidden sm:flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono text-[10px]">
                    ↑
                  </kbd>
                  <kbd className="px-1 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono text-[10px]">
                    ↓
                  </kbd>{" "}
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono text-[10px]">
                    ↵
                  </kbd>{" "}
                  select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono text-[10px]">
                    esc
                  </kbd>{" "}
                  close
                </span>
              </div>

              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2 text-zinc-400 dark:text-zinc-500">
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
