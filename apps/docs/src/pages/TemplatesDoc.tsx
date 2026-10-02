import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@hudbird/ui";
import { Eye, Search, Filter, Code, Sparkles, ArrowRight } from "lucide-react";
import { TemplateCodeModal } from "../components/TemplateCodeModal";
import { ProPricingModal } from "../components/ProPricingModal";

const TemplateLivePreview = ({
  templateId,
  name,
  imageLight,
  imageDark,
  onCodeClick,
}: {
  templateId: string;
  name: string;
  imageLight: string;
  imageDark: string;
  onCodeClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldRenderIframe, setShouldRenderIframe] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isHovered) {
      setShouldRenderIframe(true);
    } else {
      // Delay unmounting the iframe to allow fallback image to fade in smoothly
      timeout = setTimeout(() => {
        setShouldRenderIframe(false);
        setIframeLoaded(false); // Reset load state for next hover
      }, 700);
    }
    return () => clearTimeout(timeout);
  }, [isHovered]);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setScale(entry.contentRect.width / 1440);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="group absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden bg-zinc-100 dark:bg-[#0a0a0b]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fallback Image Thumbnail */}
      <div
        className={`absolute inset-0 z-10 transition-opacity duration-700 ease-in-out ${isHovered && iframeLoaded ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <img
          src={imageLight}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover dark:hidden"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <img
          src={imageDark}
          alt={name}
          className="absolute inset-0 hidden h-full w-full object-cover dark:block"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        {/* Gradient fallback behind images */}
        <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200/50 dark:from-zinc-900 dark:to-[#0a0a0b]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white/50 shadow-sm dark:border-white/10 dark:bg-white/5">
            <Eye className="h-6 w-6 text-zinc-400 dark:text-zinc-500" />
          </div>
          <span className="text-lg font-bold tracking-tight text-zinc-700 dark:text-zinc-300">
            {name}
          </span>
          <span className="mt-2 text-xs font-medium text-zinc-500">Hover to Live Preview</span>
        </div>
      </div>

      {/* Live Iframe */}
      {shouldRenderIframe && (
        <div
          className={`absolute top-0 left-0 z-0 origin-top-left transition-opacity duration-1000 ease-in-out ${iframeLoaded ? "opacity-100" : "opacity-0"}`}
          style={{
            width: "1440px",
            height: "1080px",
            transform: `scale(${scale})`,
          }}
        >
          <div className="h-full w-full origin-top scale-[1.02] transition-all duration-700 ease-out">
            <iframe
              src={`/#/templates/${templateId}`}
              className="pointer-events-none h-full w-full border-0"
              tabIndex={-1}
              onLoad={() => setIframeLoaded(true)}
            />
          </div>
        </div>
      )}

      {/* Buttons Overlay */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center gap-2 bg-white/40 backdrop-blur-[2px] transition-opacity duration-300 dark:bg-black/40 ${isHovered ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <Button
          variant="solid"
          className="rounded-full bg-zinc-900 font-medium text-white shadow-xl hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          startContent={<Eye className="h-4 w-4" />}
          onClick={(e) => {
            e.stopPropagation();
            window.open(`/#/templates/${templateId}`, "_blank");
          }}
        >
          Live Preview
        </Button>
        <Button
          variant="outline"
          className="rounded-full bg-white font-medium text-zinc-900 shadow-xl hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
          startContent={<Code className="h-4 w-4" />}
          onClick={(e) => {
            e.stopPropagation();
            onCodeClick();
          }}
        >
          Code
        </Button>
      </div>
    </div>
  );
};

const TEMPLATES = [
  {
    id: "hybrid",
    name: "Hybrid Startup",
    author: "Hudbird UI Team",
    category: "Software",
    subCategory: "SaaS",
    price: "Free",
    imageDark: "/assets/templates/ai-startup.webp",
    imageLight: "/assets/templates/ai-startup-light.webp",
    date: "2026-09-26",
    trendingScore: 99,
  },
  {
    id: "saas-launchpad",
    name: "SaaS Launchpad",
    author: "Hudbird UI Team",
    category: "Software",
    subCategory: "SaaS",
    price: "Free",
    imageDark: "/assets/templates/saas-launchpad.webp",
    imageLight: "/assets/templates/saas-launchpad-light.webp",
    date: "2026-09-01",
    trendingScore: 95,
  },
  {
    id: "fintech",
    name: "Fintech App",
    author: "Hudbird UI Team",
    category: "Software",
    subCategory: "Fintech",
    price: "$49",
    imageDark: "/assets/templates/fintech.webp",
    imageLight: "/assets/templates/fintech-light.webp",
    date: "2026-09-02",
    trendingScore: 88,
  },
  {
    id: "ai-startup",
    name: "AI Startup",
    author: "Hudbird UI Team",
    category: "Software",
    subCategory: "AI",
    price: "$99",
    imageDark: "/assets/templates/ai-startup.webp",
    imageLight: "/assets/templates/ai-startup-light.webp",
    date: "2026-09-05",
    trendingScore: 98,
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    author: "Hudbird UI Team",
    category: "Ecommerce",
    subCategory: "Digital",
    price: "$79",
    imageDark: "/assets/templates/ecommerce.webp",
    imageLight: "/assets/templates/ecommerce-light.webp",
    date: "2026-09-06",
    trendingScore: 82,
  },
  {
    id: "modern-app",
    name: "Modern App",
    author: "Hudbird UI Team",
    category: "Software",
    subCategory: "Apps",
    price: "$59",
    imageDark: "/assets/templates/modern-app.webp",
    imageLight: "/assets/templates/modern-app-light.webp",
    date: "2026-09-08",
    trendingScore: 91,
  },
  {
    id: "enterprise",
    name: "Digital Agency",
    author: "Hudbird UI Team",
    category: "Agency",
    subCategory: "Design",
    price: "$129",
    imageDark: "/assets/templates/digital-agency.webp",
    imageLight: "/assets/templates/digital-agency-light.webp",
    date: "2026-09-10",
    trendingScore: 85,
  },
  {
    id: "hospitality",
    name: "Luxury Villa & Resort",
    author: "Hudbird UI Team",
    category: "Services",
    subCategory: "Hospitality",
    price: "$149",
    imageDark: "/assets/hospitality/bali-resort.jpg",
    imageLight: "/assets/hospitality/bali-resort.jpg",
    date: "2026-09-11",
    trendingScore: 99,
  },
  {
    id: "admin-cms",
    name: "Admin CMS Dashboard",
    author: "Hudbird UI Team",
    category: "Software",
    subCategory: "SaaS",
    price: "$89",
    imageDark: "/assets/templates/admin-cms.webp",
    imageLight: "/assets/templates/admin-cms-light.webp",
    date: "2026-09-12",
    trendingScore: 94,
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
    sub: ["Consulting", "Education", "Hospitality", "Real Estate"],
  },
];

export default function TemplatesDoc() {
  const [filter, setFilter] = useState<"Trending" | "Best" | "Recent">("Trending");
  const [selectedTemplateForCode, setSelectedTemplateForCode] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [isProModalOpen, setIsProModalOpen] = useState(false);

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

          {/* Early Bird Pro Banner */}
          <div className="mb-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-blue-200/80 bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-white p-5 shadow-xs md:flex-row dark:border-blue-900/40 dark:from-blue-950/40 dark:via-indigo-950/20 dark:to-zinc-950">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-zinc-900 dark:text-white">
                    Hudbird Pro All-Access Pass
                  </h3>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                    Early Bird $49
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                  Get full source-code repositories for all 9+ templates, the visual Admin CMS
                  Builder, and free lifetime updates.
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              className="w-full shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-semibold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 md:w-auto"
              onClick={() => setIsProModalOpen(true)}
            >
              Get All-Access ($49) <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
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
                  <TemplateLivePreview
                    templateId={template.id}
                    name={template.name}
                    imageLight={template.imageLight}
                    imageDark={template.imageDark}
                    onCodeClick={() =>
                      setSelectedTemplateForCode({ id: template.id, name: template.name })
                    }
                  />
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

      <TemplateCodeModal
        isOpen={!!selectedTemplateForCode}
        onClose={() => setSelectedTemplateForCode(null)}
        templateId={selectedTemplateForCode?.id || null}
        templateName={selectedTemplateForCode?.name || ""}
      />

      <ProPricingModal isOpen={isProModalOpen} onClose={() => setIsProModalOpen(false)} />
    </div>
  );
}
