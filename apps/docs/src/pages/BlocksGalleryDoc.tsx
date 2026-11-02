import React, { useState, Suspense, useEffect, useRef } from "react";
import { BLOCKS_DATA } from "../data/blocks";
import { MarketingPreview } from "../components/MarketingPreview";
import { Button, Input, Section, Container, cn } from "@hudbird/ui";
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
      <Section
        as="header"
        spacing="sm"
        bordered="bottom"
        className="bg-zinc-50/50 pt-24 pb-12 dark:bg-[#161618]"
      >
        <Container size="xl">
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

          <div className="mt-8 inline-flex flex-wrap items-center gap-1.5 rounded-2xl border border-black/[0.06] bg-zinc-100/70 p-1.5 dark:border-white/[0.08] dark:bg-[#121214]">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "cursor-pointer rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all duration-150 active:scale-95",
                    isActive
                      ? "bg-white font-semibold text-zinc-950 shadow-xs dark:bg-[#28292d] dark:text-white"
                      : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Container size="xl" className="py-12">
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
      </Container>
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
