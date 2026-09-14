import React, { useState, useMemo } from "react";
import { Button } from "@hudbird/ui";
import { Eye, Search, Filter } from "lucide-react";

const TEMPLATES = [
  {
    id: "saas-launchpad",
    name: "SaaS Launchpad",
    author: "BlankUI Team",
    category: "Software",
    subCategory: "SaaS",
    price: "Free",
    image: "/assets/templates/saas-launchpad.png",
    date: "2026-09-01",
    trendingScore: 95,
  },
  {
    id: "fintech",
    name: "Fintech App",
    author: "BlankUI Team",
    category: "Software",
    subCategory: "Fintech",
    price: "$49",
    image: "/assets/templates/fintech.png",
    date: "2026-09-02",
    trendingScore: 88,
  },
  {
    id: "ai-startup",
    name: "AI Startup",
    author: "BlankUI Team",
    category: "Software",
    subCategory: "AI",
    price: "$99",
    image: "/assets/templates/ai-startup.png",
    date: "2026-09-05",
    trendingScore: 98,
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    author: "BlankUI Team",
    category: "Ecommerce",
    subCategory: "Digital",
    price: "$79",
    image: "/assets/templates/ecommerce.png",
    date: "2026-09-06",
    trendingScore: 82,
  },
  {
    id: "modern-app",
    name: "Modern App",
    author: "BlankUI Team",
    category: "Software",
    subCategory: "Apps",
    price: "$59",
    image: "/assets/templates/modern-app.png",
    date: "2026-09-08",
    trendingScore: 91,
  },
  {
    id: "enterprise",
    name: "Digital Agency",
    author: "BlankUI Team",
    category: "Agency",
    subCategory: "Design",
    price: "$129",
    image: "/assets/templates/digital-agency.png",
    date: "2026-09-10",
    trendingScore: 85,
  },
];

const CATEGORIES = [
  {
    name: "Portfolio",
    sub: ["Artists", "Designers", "Photography", "Resume"],
  },
  {
    name: "Software",
    sub: ["AI", "Apps", "Fintech", "SaaS"],
  },
  {
    name: "Agency",
    sub: ["Architecture", "Design", "Marketing", "Web"],
  },
  {
    name: "Ecommerce",
    sub: ["Beauty", "Digital", "Fashion", "Furniture"],
  },
  {
    name: "Services",
    sub: ["Consulting", "Education", "Home", "Legal"],
  },
];

export default function TemplatesDoc() {
  const [filter, setFilter] = useState<"Trending" | "Best" | "Recent">("Trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string, subCategory?: string) => {
    if (activeCategory === category && activeSubCategory === (subCategory || null)) {
      // Toggle off if already selected
      setActiveCategory(null);
      setActiveSubCategory(null);
    } else {
      setActiveCategory(category);
      setActiveSubCategory(subCategory || null);
    }
  };

  const filteredTemplates = useMemo(() => {
    let result = [...TEMPLATES];

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) => t.name.toLowerCase().includes(q) || t.author.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (activeCategory) {
      result = result.filter((t) => t.category === activeCategory);
    }

    // Filter by subcategory
    if (activeSubCategory) {
      result = result.filter((t) => t.subCategory === activeSubCategory);
    }

    // Apply sorting
    if (filter === "Recent") {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (filter === "Trending") {
      result.sort((a, b) => b.trendingScore - a.trendingScore);
    } else if (filter === "Best") {
      // For demo purposes, let's just sort by price descending as "Best" or just alphabet
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, activeCategory, activeSubCategory, filter]);

  return (
    <div className="mx-auto min-h-screen w-full bg-white text-zinc-900 dark:bg-[#0a0a0b] dark:text-white">
      {/* Header Section */}
      <div className="w-full border-b border-zinc-200 bg-white pt-24 pb-12 dark:border-white/5 dark:bg-[#0a0a0b]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-start">
            <div className="max-w-2xl">
              <h1 className="mb-4 text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl dark:text-white">
                Templates
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Browse polished templates from the community to
                <br />
                find the perfect starting point for your next website.
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <Search className="h-4 w-4 text-zinc-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Templates..."
                className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-2.5 pr-4 pl-10 text-sm text-zinc-900 transition-all placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-200 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-zinc-500 dark:focus:ring-white/20"
              />
            </div>
          </div>

          {/* Categories Grid */}
          <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-5">
            {CATEGORIES.map((cat) => (
              <div key={cat.name}>
                <button
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`mb-4 text-sm font-medium transition-colors ${activeCategory === cat.name && !activeSubCategory ? "text-zinc-900 underline decoration-zinc-900/30 underline-offset-4 dark:text-white dark:decoration-white/30" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"}`}
                >
                  {cat.name}
                </button>
                <ul className="space-y-3">
                  {cat.sub.map((sub) => (
                    <li key={sub}>
                      <button
                        onClick={() => handleCategorySelect(cat.name, sub)}
                        className={`text-sm transition-colors ${activeSubCategory === sub && activeCategory === cat.name ? "font-medium text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300"}`}
                      >
                        {sub}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Filters Bar */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 p-1 dark:border-white/5 dark:bg-white/5">
            {(["Trending", "Best", "Recent"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${filter === f ? "bg-white text-zinc-900 shadow-sm dark:bg-white/10 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
              Price <Filter className="h-3 w-3" />
            </button>
            <button className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
              Style <Filter className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Selected Filter Labels */}
        {(activeCategory || searchQuery) && (
          <div className="mb-8 flex items-center gap-3">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Showing results for:</span>
            {searchQuery && (
              <span className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5 text-xs text-zinc-700 dark:bg-white/10 dark:text-white">
                "{searchQuery}"
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-red-500 dark:hover:text-red-400"
                >
                  &times;
                </button>
              </span>
            )}
            {activeCategory && (
              <span className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5 text-xs text-zinc-700 dark:bg-white/10 dark:text-white">
                {activeCategory} {activeSubCategory ? `> ${activeSubCategory}` : ""}
                <button
                  onClick={() => {
                    setActiveCategory(null);
                    setActiveSubCategory(null);
                  }}
                  className="hover:text-red-500 dark:hover:text-red-400"
                >
                  &times;
                </button>
              </span>
            )}
          </div>
        )}

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="group flex flex-col">
                <div
                  className="relative mb-4 aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-white/10 dark:bg-zinc-900"
                  onClick={() => window.open(`/#/templates/${template.id}`, "_blank")}
                >
                  <img
                    src={template.image}
                    alt={template.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-white/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 dark:bg-black/40">
                    <Button
                      variant="solid"
                      className="rounded-full bg-zinc-900 font-medium text-white shadow-xl hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                      startContent={<Eye className="h-4 w-4" />}
                    >
                      Live Preview
                    </Button>
                  </div>
                </div>
                <div className="flex items-start justify-between px-1">
                  <div>
                    <h3 className="cursor-pointer text-base font-semibold text-zinc-900 decoration-zinc-900/30 underline-offset-4 hover:underline dark:text-white dark:decoration-white/30">
                      {template.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-zinc-500">{template.author}</p>
                  </div>
                  <div className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-900 dark:bg-white/10 dark:text-white">
                    {template.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 py-32 dark:border-white/10 dark:bg-white/[0.02]">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-white/5">
              <Search className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
            </div>
            <h3 className="mb-2 text-xl font-medium text-zinc-900 dark:text-white">
              No templates found
            </h3>
            <p className="mb-8 max-w-md text-center text-zinc-500 dark:text-zinc-400">
              We couldn't find any templates matching your current filters. <br />
              Try adjusting your search or category selection.
            </p>
            <Button
              variant="outline"
              className="border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory(null);
                setActiveSubCategory(null);
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
