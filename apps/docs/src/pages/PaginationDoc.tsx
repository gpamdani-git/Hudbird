// apps/docs/src/pages/PaginationDoc.tsx
import React, { useState } from "react";
import {
  Pagination,
  type PaginationVariant,
  type PaginationColor,
  type PaginationRadius,
  type PaginationSize,
  InfiniteScroll,
  Button,
} from "@hudbird/ui";
import {
  RefreshCw,
  Database,
  Check,
} from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const paginationTocItems = [
  { id: "component-api", title: "Component API" },
  {
    id: "pagination-examples",
    title: "Pagination Examples",
    children: [
      { id: "basic-pagination", title: "Interactive Pagination" },
      { id: "pagination-variants", title: "Variants & Shapes" },
      { id: "pagination-colors", title: "Color Themes" },
      { id: "large-dataset-ellipsis", title: "Smart Ellipsis Range" },
      { id: "custom-controls-sizes", title: "Sizes & Custom Controls" },
    ],
  },
  {
    id: "infinite-scroll-examples",
    title: "Infinite Scroll",
    children: [
      { id: "infinite-scroll-simulation", title: "Interactive Scroll Simulation" },
      { id: "custom-loader-end", title: "Custom Loader & End State" },
    ],
  },
];

export default function PaginationDoc() {
  // --- Interactive Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const [largeDatasetPage, setLargeDatasetPage] = useState(50);
  const [selectedVariant, setSelectedVariant] = useState<PaginationVariant>("solid");
  const [selectedColor, setSelectedColor] = useState<PaginationColor>("primary");
  const [selectedRadius, setSelectedRadius] = useState<PaginationRadius>("xl");
  const [selectedSize, setSelectedSize] = useState<PaginationSize>("md");

  // --- Infinite Scroll Simulation State ---
  const [items, setItems] = useState<Array<{ id: number; title: string; category: string; time: string }>>(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `Data Record item #${i + 1}`,
      category: ["Analytics", "Database", "Security", "Server", "API"][i % 5],
      time: `${i * 3 + 2} mins ago`,
    }))
  );
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const maxItemsLimit = 40;

  const loadMoreItems = () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    // Simulate network latency / fetch delay
    setTimeout(() => {
      setItems((prev) => {
        const nextId = prev.length + 1;
        if (nextId > maxItemsLimit) {
          setHasMore(false);
          setIsLoadingMore(false);
          return prev;
        }

        const newBatch = Array.from({ length: 5 }, (_, i) => ({
          id: nextId + i,
          title: `Data Record item #${nextId + i}`,
          category: ["Analytics", "Database", "Security", "Server", "API"][(nextId + i) % 5],
          time: `Just now`,
        }));

        const updated = [...prev, ...newBatch];
        if (updated.length >= maxItemsLimit) {
          setHasMore(false);
        }
        return updated;
      });
      setIsLoadingMore(false);
    }, 1000);
  };

  const resetInfiniteScroll = () => {
    setItems(
      Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `Data Record item #${i + 1}`,
        category: ["Analytics", "Database", "Security", "Server", "API"][i % 5],
        time: `${i * 3 + 2} mins ago`,
      }))
    );
    setHasMore(true);
    setIsLoadingMore(false);
  };

  // API Prop Tables
  const paginationApiRows: ApiPropRow[] = [
    {
      prop: "total",
      defaultVal: "required",
      description: (
        <span>
          The total number of available pages (e.g.,{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">10</code>,{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">100</code>).
        </span>
      ),
    },
    {
      prop: "page",
      defaultVal: "1",
      description: (
        <span>
          Controlled active page index (1-indexed). Use with{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">onChange</code>.
        </span>
      ),
    },
    {
      prop: "onChange",
      defaultVal: "-",
      description: (
        <span>
          Callback triggered when a page or ellipsis jump button is clicked:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">(page: number) =&gt; void</code>.
        </span>
      ),
    },
    {
      prop: "variant",
      defaultVal: "'solid'",
      description: (
        <span>
          Visual variant style:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'solid'</code>,{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'bordered'</code>,{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'flat'</code>, or{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'light'</code>.
        </span>
      ),
    },
    {
      prop: "color",
      defaultVal: "'primary'",
      description: (
        <span>
          Theme color for the active page button:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'primary'</code> (indigo),{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'success'</code> (emerald),{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'danger'</code> (rose),{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'dark'</code>, or{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'zinc'</code>.
        </span>
      ),
    },
    {
      prop: "radius",
      defaultVal: "'xl'",
      description: (
        <span>
          Border radius token:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'</code>.
        </span>
      ),
    },
    {
      prop: "size",
      defaultVal: "'md'",
      description: (
        <span>
          Button size scale:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'sm' | 'md' | 'lg'</code>.
        </span>
      ),
    },
    {
      prop: "siblings",
      defaultVal: "1",
      description: "Number of sibling buttons visible around the current active page.",
    },
    {
      prop: "boundaries",
      defaultVal: "1",
      description: "Number of boundary pages visible at the beginning and end of range.",
    },
    {
      prop: "showControls",
      defaultVal: "true",
      description: "Whether to display the Prev and Next navigation trigger buttons.",
    },
    {
      prop: "isDisabled",
      defaultVal: "false",
      description: "Disables all user interaction on the pagination container.",
    },
  ];

  const infiniteScrollApiRows: ApiPropRow[] = [
    {
      prop: "next",
      defaultVal: "required",
      description: (
        <span>
          Callback executed when the bottom sentinel observer enters the viewport:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">() =&gt; void | Promise&lt;void&gt;</code>.
        </span>
      ),
    },
    {
      prop: "hasMore",
      defaultVal: "required",
      description: "Boolean indicating whether more items are available for sequential retrieval.",
    },
    {
      prop: "loader",
      defaultVal: "Default Spinner",
      description: "Custom React node rendered at the bottom while loading new items.",
    },
    {
      prop: "endMessage",
      defaultVal: "Default Message",
      description: "Custom React node displayed when hasMore becomes false.",
    },
    {
      prop: "rootMargin",
      defaultVal: "'100px'",
      description: "IntersectionObserver root margin threshold to pre-trigger loading before reaching bottom.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Header Section */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Pagination & Infinite Scroll
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-500/20">
            Component
          </span>
        </div>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          High-performance data management components for handling paginated datasets and endless feeds with smooth micro-interactions, smart ellipsis calculation, and native IntersectionObserver integration.
        </p>
      </div>

      {/* Hero Interactive Preview */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="flex flex-col items-center justify-center gap-6 w-full py-4">
            {/* Controls customizer */}
            <div className="flex flex-wrap items-center justify-center gap-3 p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 text-xs">
              {/* Variant selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-500 font-medium">Variant:</span>
                {(["solid", "bordered", "flat", "light"] as PaginationVariant[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                      selectedVariant === v
                        ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs border border-zinc-200 dark:border-zinc-700"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>

              <div className="h-4 w-[1px] bg-zinc-300 dark:bg-zinc-700 hidden sm:block" />

              {/* Color selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-500 font-medium">Color:</span>
                {(["primary", "success", "danger", "dark"] as PaginationColor[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-2.5 py-1 rounded-lg font-medium capitalize transition-all ${
                      selectedColor === c
                        ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs border border-zinc-200 dark:border-zinc-700"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Render Pagination */}
            <Pagination
              total={10}
              page={currentPage}
              onChange={setCurrentPage}
              variant={selectedVariant}
              color={selectedColor}
              radius={selectedRadius}
              size={selectedSize}
            />

            {/* Indicator text */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                Current Page: {currentPage}
              </span>
              <span className="text-zinc-400">/ 10</span>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { useState } from "react";
import { Pagination } from "@hudbird/ui";

export default function Example() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination
        total={10}
        page={page}
        onChange={setPage}
        variant="${selectedVariant}"
        color="${selectedColor}"
        radius="${selectedRadius}"
        size="${selectedSize}"
      />
      <p className="text-xs text-zinc-500">Current Page: {page} / 10</p>
    </div>
  );
}`}
        />
      </section>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Component API
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Complete props documentation for <code className="font-mono text-xs text-indigo-600 dark:text-indigo-400">&lt;Pagination&gt;</code> and <code className="font-mono text-xs text-indigo-600 dark:text-indigo-400">&lt;InfiniteScroll&gt;</code>.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Pagination Props
          </h3>
          <ApiTable rows={paginationApiRows} />
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            InfiniteScroll Props
          </h3>
          <ApiTable rows={infiniteScrollApiRows} />
        </div>
      </section>

      {/* Pagination Examples Section */}
      <section id="pagination-examples" className="space-y-12">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Pagination Examples
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Explore diverse style variants, color themes, and automatic dynamic truncation.
          </p>
        </div>

        {/* 1. Basic Pagination */}
        <div id="basic-pagination" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Basic Interactive Pagination
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Default solid styling with navigation arrow controls and active state feedback.
          </p>

          <ComponentPreview>
            <div className="py-2">
              <Pagination total={8} defaultPage={1} />
            </div>
          </ComponentPreview>

          <CodeBlock code={`<Pagination total={8} defaultPage={1} />`} />
        </div>

        {/* 2. Variants & Shapes */}
        <div id="pagination-variants" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Style Variants & Border Radii
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Choose between <code className="font-mono text-xs">solid</code>, <code className="font-mono text-xs">bordered</code>, <code className="font-mono text-xs">flat</code>, and <code className="font-mono text-xs">light</code> with pill (<code className="font-mono text-xs">radius="full"</code>) or rounded box tokens.
          </p>

          <ComponentPreview>
            <div className="flex flex-col items-center gap-5 py-3">
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Solid Variant (radius="full")
                </span>
                <Pagination total={6} defaultPage={2} variant="solid" radius="full" />
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Bordered Variant (radius="xl")
                </span>
                <Pagination total={6} defaultPage={3} variant="bordered" radius="xl" />
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Flat Variant (radius="lg")
                </span>
                <Pagination total={6} defaultPage={4} variant="flat" radius="lg" />
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Light Variant (radius="md")
                </span>
                <Pagination total={6} defaultPage={5} variant="light" radius="md" />
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`{/* Solid Variant with Full Pill Radius */}
<Pagination total={6} defaultPage={2} variant="solid" radius="full" />

{/* Bordered Variant */}
<Pagination total={6} defaultPage={3} variant="bordered" radius="xl" />

{/* Flat Variant */}
<Pagination total={6} defaultPage={4} variant="flat" radius="lg" />

{/* Light Variant */}
<Pagination total={6} defaultPage={5} variant="light" radius="md" />`}
          />
        </div>

        {/* 3. Color Themes */}
        <div id="pagination-colors" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Color Themes
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Dedicated semantic color palettes: Indigo Primary, Emerald Success, Rose Danger, and Dark Zinc.
          </p>

          <ComponentPreview>
            <div className="flex flex-col items-center gap-4 py-3">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">Primary (Indigo)</span>
                <Pagination total={6} defaultPage={1} color="primary" />
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Success (Emerald)</span>
                <Pagination total={6} defaultPage={2} color="success" />
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold">Danger (Rose)</span>
                <Pagination total={6} defaultPage={3} color="danger" />
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-zinc-700 dark:text-zinc-300 font-semibold">Dark / Zinc</span>
                <Pagination total={6} defaultPage={4} color="dark" />
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`<Pagination total={6} defaultPage={1} color="primary" />
<Pagination total={6} defaultPage={2} color="success" />
<Pagination total={6} defaultPage={3} color="danger" />
<Pagination total={6} defaultPage={4} color="dark" />`}
          />
        </div>

        {/* 4. Smart Ellipsis Range */}
        <div id="large-dataset-ellipsis" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Smart Logarithmic Ellipsis Truncation
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            When <code className="font-mono text-xs">total</code> is large (e.g. 100 pages), the component mathematically calculates middle and boundary siblings, inserting interactive ellipsis jumps (<code className="font-mono text-xs">•••</code>) that turn into jump buttons on hover.
          </p>

          <ComponentPreview>
            <div className="flex flex-col items-center gap-4 py-4">
              <Pagination
                total={100}
                page={largeDatasetPage}
                onChange={setLargeDatasetPage}
                siblings={1}
                boundaries={1}
                color="primary"
              />

              <div className="flex items-center gap-2 flex-wrap justify-center">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setLargeDatasetPage(1)}
                  className="text-xs"
                >
                  Page 1
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setLargeDatasetPage(25)}
                  className="text-xs"
                >
                  Page 25
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setLargeDatasetPage(50)}
                  className="text-xs"
                >
                  Page 50
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setLargeDatasetPage(75)}
                  className="text-xs"
                >
                  Page 75
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setLargeDatasetPage(100)}
                  className="text-xs"
                >
                  Page 100
                </Button>
              </div>

              <p className="text-xs text-zinc-500">
                Viewing page <strong className="text-zinc-900 dark:text-zinc-100">{largeDatasetPage}</strong> of 100 total pages
              </p>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`export default function LargePagination() {
  const [page, setPage] = useState(50);

  return (
    <div className="flex flex-col items-center gap-3">
      <Pagination
        total={100}
        page={page}
        onChange={setPage}
        siblings={1}
        boundaries={1}
      />
      <div className="flex gap-2">
        <Button onClick={() => setPage(1)}>Page 1</Button>
        <Button onClick={() => setPage(50)}>Page 50</Button>
        <Button onClick={() => setPage(100)}>Page 100</Button>
      </div>
    </div>
  );
}`}
          />
        </div>

        {/* 5. Sizes & Custom Controls */}
        <div id="custom-controls-sizes" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Sizes & Custom Controls
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Available in <code className="font-mono text-xs">sm</code>, <code className="font-mono text-xs">md</code>, and <code className="font-mono text-xs">lg</code> sizes with support for custom previous/next content.
          </p>

          <ComponentPreview>
            <div className="flex flex-col items-center gap-5 py-3">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-zinc-400">Size: Small (sm)</span>
                <Pagination total={5} size="sm" defaultPage={2} />
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-zinc-400">Size: Medium (md)</span>
                <Pagination total={5} size="md" defaultPage={3} />
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-zinc-400">Size: Large (lg)</span>
                <Pagination total={5} size="lg" defaultPage={4} />
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`{/* Small Size */}
<Pagination total={5} size="sm" defaultPage={2} />

{/* Medium Size (Default) */}
<Pagination total={5} size="md" defaultPage={3} />

{/* Large Size */}
<Pagination total={5} size="lg" defaultPage={4} />`}
          />
        </div>
      </section>

      {/* Infinite Scroll Examples Section */}
      <section id="infinite-scroll-examples" className="space-y-12">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Infinite Scroll Component
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Endless scrolling built on pure React and native <code className="font-mono text-xs text-indigo-600 dark:text-indigo-400">IntersectionObserver</code>. Automatically fires the <code className="font-mono text-xs">next()</code> callback as the sentinel detector scrolls into view.
          </p>
        </div>

        {/* Interactive Scroll Simulation */}
        <div id="infinite-scroll-simulation" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Interactive Scroll Simulation
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Scroll down the bounded box below. When the bottom sentinel enters viewport, a 1-second pulse loader appears and appends 5 dynamic records until the 40-item threshold is reached.
          </p>

          <ComponentPreview>
            <div className="w-full max-w-lg mx-auto space-y-3">
              {/* Header Bar with Counter & Reset */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    Loaded Items: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{items.length}</span>
                    <span className="text-zinc-400 font-normal"> / {maxItemsLimit} max</span>
                  </span>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetInfiniteScroll}
                  className="h-7 text-xs gap-1.5"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reset Feed
                </Button>
              </div>

              {/* Scrollable Container Box (h-80 overflow-y-auto) */}
              <div className="h-80 overflow-y-auto border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl p-4 shadow-inner">
                <InfiniteScroll
                  next={loadMoreItems}
                  hasMore={hasMore}
                  isLoading={isLoadingMore}
                  loader={
                    <div className="flex flex-col items-center justify-center gap-2 py-4 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                      <div className="flex items-center gap-2 animate-pulse bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800/80">
                        <svg
                          className="w-4 h-4 animate-spin text-indigo-600 dark:text-indigo-400"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Fetching 5 new records...</span>
                      </div>
                    </div>
                  }
                  endMessage={
                    <div className="flex flex-col items-center justify-center gap-1.5 py-6 text-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                      <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        All {maxItemsLimit} records have been loaded!
                      </p>
                      <p className="text-[11px] text-zinc-500">
                        Infinite scroll observer disconnected safely.
                      </p>
                    </div>
                  }
                >
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center text-xs font-bold font-mono">
                            {item.id}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                              {item.title}
                            </p>
                            <p className="text-[10px] text-zinc-400">
                              Logged timestamp: {item.time}
                            </p>
                          </div>
                        </div>

                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                          {item.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </InfiniteScroll>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { useState } from "react";
import { InfiniteScroll } from "@hudbird/ui";

export default function InfiniteFeed() {
  const [items, setItems] = useState(initialItems);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    // Simulated network API call
    setTimeout(() => {
      setItems(prev => [...prev, ...newItems]);
      if (items.length >= 40) setHasMore(false);
    }, 1000);
  };

  return (
    <div className="h-80 overflow-y-auto border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4">
      <InfiniteScroll
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="py-2 text-center text-xs animate-pulse text-indigo-600">
            Fetching 5 new records...
          </div>
        }
        endMessage={
          <div className="py-4 text-center text-xs text-zinc-400">
            All records loaded.
          </div>
        }
      >
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="p-3 bg-white dark:bg-zinc-900 rounded-xl border">
              {item.title}
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}`}
          />
        </div>

        {/* Custom Loader & End State */}
        <div id="custom-loader-end" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Custom Skeleton Loader & Root Margins
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Customize the loader slot with custom skeleton placeholders or tailored UI spinners, and tune the <code className="font-mono text-xs">rootMargin="150px"</code> to pre-fetch records seamlessly before the user reaches the absolute bottom.
          </p>

          <CodeBlock
            code={`<InfiniteScroll
  next={fetchMoreData}
  hasMore={hasMore}
  rootMargin="150px"
  loader={
    <div className="grid grid-cols-2 gap-3 py-3">
      <div className="h-16 rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
      <div className="h-16 rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
    </div>
  }
  endMessage={
    <div className="py-4 text-center text-xs text-zinc-400">
      🎉 You've reached the end of the feed!
    </div>
  }
>
  {/* Feed Items Container */}
</InfiniteScroll>`}
          />
        </div>
      </section>
    </div>
  );
}
