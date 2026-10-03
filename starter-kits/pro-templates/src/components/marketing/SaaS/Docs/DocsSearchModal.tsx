import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, FileText, ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const docsSidebarData = [
  {
    category: "Getting Started",
    links: [
      { title: "Introduction", href: "/docs/api-reference", type: "guide" },
      { title: "Authentication", href: "/docs/api-reference", type: "guide" },
      { title: "Pagination", href: "/docs/api-reference", type: "guide" },
      { title: "Errors", href: "/docs/api-reference", type: "guide" },
    ],
  },
  {
    category: "Core Resources",
    links: [
      { title: "Workspaces", href: "/docs/api-reference", type: "api" },
      { title: "Projects", href: "/docs/api-reference", type: "api" },
      { title: "Tasks", href: "/docs/api-reference", type: "api" },
      { title: "Users", href: "/docs/api-reference", type: "api" },
      { title: "Comments", href: "/docs/api-reference", type: "api" },
    ],
  },
  {
    category: "Advanced",
    links: [
      { title: "Webhooks", href: "/docs/api-reference", type: "guide" },
      { title: "Rate Limits", href: "/docs/api-reference", type: "guide" },
      { title: "Idempotency", href: "/docs/api-reference", type: "guide" },
      { title: "Versioning", href: "/docs/api-reference", type: "guide" },
    ],
  },
];

// Flatten for search
const flatDocsData = docsSidebarData.flatMap((section) =>
  section.links.map((link) => ({ ...link, category: section.category }))
);

interface DocsSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DocsSearchModal({ isOpen, onClose }: DocsSearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          document.dispatchEvent(new CustomEvent("open-docs-search"));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const filteredResults = query
    ? flatDocsData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : flatDocsData;

  const handleSelect = (href: string) => {
    onClose();
    navigate(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-zinc-900/40 backdrop-blur-sm dark:bg-black/60"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 px-4 sm:px-0"
          >
            <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-zinc-200 dark:bg-[#12141D] dark:ring-white/10">
              {/* Search Input */}
              <div className="relative flex items-center border-b border-zinc-200 px-4 py-4 dark:border-white/10">
                <Search className="h-5 w-5 text-zinc-400" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search documentation..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent px-4 text-zinc-900 outline-none placeholder:text-zinc-500 dark:text-white dark:placeholder:text-zinc-400"
                />
                <button
                  onClick={onClose}
                  className="rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-white/10 dark:hover:text-zinc-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredResults.length === 0 ? (
                  <div className="py-14 text-center text-sm text-zinc-500">
                    No results found for "{query}"
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {filteredResults.map((result, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelect(result.href)}
                        className="group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors hover:bg-zinc-100 dark:hover:bg-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-colors group-hover:bg-purple-500 group-hover:text-white dark:bg-white/5 dark:text-zinc-400">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-zinc-900 dark:text-white">
                              {result.title}
                            </span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                              {result.category}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-zinc-300 opacity-0 transition-all group-hover:text-zinc-500 group-hover:opacity-100 dark:text-zinc-600 dark:group-hover:text-zinc-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-500 dark:border-white/10 dark:bg-black/20">
                <div className="flex items-center gap-2">
                  <kbd className="rounded border border-zinc-200 bg-white px-2 py-0.5 font-sans dark:border-white/10 dark:bg-white/5">
                    ↑↓
                  </kbd>
                  <span>to navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Press</span>
                  <kbd className="rounded border border-zinc-200 bg-white px-2 py-0.5 font-sans dark:border-white/10 dark:bg-white/5">
                    esc
                  </kbd>
                  <span>to close</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
