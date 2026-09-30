import React, { useState, Suspense, useEffect, useRef } from "react";
import { BLOCKS_DATA } from "../data/blocks";
import { MarketingPreview } from "../components/MarketingPreview";
import { Button } from "@hudbird/ui";
import { Code, Eye, Search } from "lucide-react";
import { DocLoadingSkeleton } from "../components/DocLoadingSkeleton";

export default function BlocksGalleryDoc() {
  const categories = ["All", ...Object.keys(BLOCKS_DATA).sort()];
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const activeBlocks =
    activeCategory === "All"
      ? Object.values(BLOCKS_DATA).flat()
      : BLOCKS_DATA[activeCategory as keyof typeof BLOCKS_DATA] || [];

  const filteredBlocks = activeBlocks.filter(
    (block) =>
      block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.template.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto min-h-screen w-full bg-white text-zinc-900 dark:bg-[#0a0a0b] dark:text-white">
      {/* Header */}
      <div className="w-full border-b border-zinc-200 bg-zinc-50/50 pt-24 pb-12 dark:border-white/5 dark:bg-[#0a0a0b]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
            <div>
              <h1 className="mb-4 text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl dark:text-white">
                Blocks Gallery
              </h1>
              <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
                Mix and match individual sections from our templates. Perfect for building custom
                pages faster with pre-designed Lego blocks.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full shrink-0 sm:w-72">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search blocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-zinc-200 bg-white py-2 pr-4 pl-9 text-sm focus:ring-2 focus:ring-zinc-900 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:ring-white/20"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-black"
                    : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
            {activeCategory} Blocks{" "}
            <span className="text-lg text-zinc-400">({filteredBlocks.length})</span>
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Note: Components like Navbar or absolute positioned elements might overlap. Please use
            the "Mobile/Tablet" viewport toggle to isolate them in an iframe.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {filteredBlocks.length > 0 ? (
            filteredBlocks.map((block, idx) => (
              <LazyBlock
                key={`${block.name}-${idx}`}
                block={block}
                activeCategory={activeCategory}
              />
            ))
          ) : (
            <div className="py-20 text-center text-zinc-500">
              No blocks found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LazyBlock({ block, activeCategory }: { block: any; activeCategory: string }) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasLoaded(true);
          // Once it has loaded, we can disconnect the observer
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { rootMargin: "600px" } // Load early before scrolling into view
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const BlockComponent = block.component;
  const heightStr =
    activeCategory === "Navbar" || block.name.includes("Navbar")
      ? "500px"
      : activeCategory === "Footer"
        ? "400px"
        : "600px";

  return (
    <div
      ref={ref}
      className="relative flex flex-col"
      style={{
        minHeight: heightStr,
        contentVisibility: "auto",
        containIntrinsicSize: heightStr,
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-zinc-900 dark:text-white">{block.name}</h3>
          <p className="text-xs text-zinc-500">From {block.template} Template</p>
        </div>
      </div>

      {hasLoaded ? (
        <Suspense
          fallback={
            <div
              className="w-full animate-pulse rounded-2xl bg-zinc-100 dark:bg-white/5"
              style={{ height: heightStr }}
            />
          }
        >
          <MarketingPreview
            title={block.name}
            code={block.code}
            minHeight={
              activeCategory === "Navbar" || block.name.includes("Navbar")
                ? 500
                : activeCategory === "Footer"
                  ? 400
                  : 600
            }
            trapFixed={block.name.includes("Navbar")}
          >
            <BlockComponent navVisible={true} navCompact={false} />
          </MarketingPreview>
        </Suspense>
      ) : (
        <div
          className="flex w-full items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800/80 dark:bg-[#0a0a0a]"
          style={{ height: heightStr }}
        >
          <div className="flex animate-pulse flex-col items-center gap-4">
            <div className="h-8 w-8 text-zinc-300 dark:text-zinc-700">
              <Eye />
            </div>
            <div className="text-sm font-medium text-zinc-400">Scrolling into view...</div>
          </div>
        </div>
      )}
    </div>
  );
}
