import React, { useState, Suspense, useEffect, useRef } from "react";
import { BLOCKS_DATA } from "../data/blocks";
import { MarketingPreview } from "../components/MarketingPreview";
import { Button, Input } from "@hudbird/ui";
import { Search } from "lucide-react";

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
    <div className="mx-auto min-h-screen w-full bg-white text-zinc-900 dark:bg-[#161618] dark:text-white">
      {/* Header */}
      <div className="w-full border-b border-zinc-200 bg-zinc-50/50 pt-24 pb-12 dark:border-white/[0.08] dark:bg-[#161618]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
            <div>
              <h1 className="font-outfit mb-4 text-4xl leading-[1.12] font-bold tracking-[-1.8px] text-zinc-950 sm:mb-6 sm:text-6xl sm:tracking-[-2.2px] lg:text-[72px] dark:text-white">
                Blocks Gallery
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
                Independent marketing sections from our production templates. Composable building
                blocks engineered with clean semantic HTML and zero bloat.
              </p>
            </div>

            {/* Search */}
            <div className="w-full shrink-0 sm:w-72">
              <Input
                placeholder="Search blocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search className="h-4 w-4 text-zinc-400" />}
                radius="full"
                size="sm"
                aria-label="Search blocks"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <Button
                  key={cat}
                  size="sm"
                  radius="full"
                  variant={isActive ? "solid" : "bordered"}
                  color={isActive ? "default" : "secondary"}
                  className={
                    isActive
                      ? "font-semibold shadow-xs dark:bg-white dark:text-zinc-950"
                      : "border-black/[0.08] text-zinc-600 hover:text-zinc-950 dark:border-white/[0.08] dark:text-zinc-400 dark:hover:text-white"
                  }
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            {activeCategory} Blocks{" "}
            <span className="text-base font-normal text-zinc-400">({filteredBlocks.length})</span>
          </h2>
          <p className="mt-1.5 text-sm text-zinc-500 sm:text-base dark:text-zinc-400">
            Isolated block instances. Use the viewport toggles to inspect responsiveness across
            desktop, tablet, and mobile.
          </p>
        </div>

        <div className="flex flex-col gap-14">
          {filteredBlocks.length > 0 ? (
            filteredBlocks.map((block, idx) => (
              <LazyBlock
                key={`${block.name}-${idx}`}
                block={block}
                activeCategory={activeCategory}
              />
            ))
          ) : (
            <div className="py-20 text-center text-sm text-zinc-500">
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
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { rootMargin: "600px" }
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
      {hasLoaded ? (
        <Suspense
          fallback={
            <div
              className="w-full rounded-2xl bg-zinc-100 dark:bg-white/[0.04]"
              style={{ height: heightStr }}
            />
          }
        >
          <MarketingPreview
            title={block.name}
            subtitle={`Template: ${block.template}`}
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
          className="flex w-full items-center justify-center rounded-2xl border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-[#161618]"
          style={{ height: heightStr }}
        >
          <div className="flex flex-col items-center gap-2 text-zinc-400">
            <span className="font-mono text-xs tracking-wider uppercase">Loading block</span>
          </div>
        </div>
      )}
    </div>
  );
}
