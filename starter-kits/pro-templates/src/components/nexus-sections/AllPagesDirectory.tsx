// starter-kits/pro-templates/src/components/nexus-sections/AllPagesDirectory.tsx
"use client";

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  INNER_PAGES_MATRIX,
  InnerPageMeta,
  PREBUILT_47_TEMPLATES,
  PrebuiltTemplateMeta,
} from "@hudbird/schemas";
import { Container, MaskedHeading, Reveal } from "./ScrollReveal";
import { PEXELS, getTemplatePexelsPack } from "./HudbirdVisualWidgets";
import { HB, HudbirdTemplateLogoIcon } from "./HudbirdKit";
import {
  ArrowUpRight,
  Search,
  Layers,
  LayoutGrid,
  ShieldCheck,
  KeyRound,
  Sparkles,
} from "lucide-react";

const PAGE_PREVIEW_IMAGES = [
  PEXELS.villaHero,
  PEXELS.abstract3d1,
  PEXELS.project1,
  PEXELS.studioTeam,
  PEXELS.villaExterior1,
  PEXELS.abstract3d2,
  PEXELS.project2,
  PEXELS.neuralBrain,
  PEXELS.villaExterior2,
  PEXELS.abstract3d3,
  PEXELS.project3,
  PEXELS.vrPortrait,
  PEXELS.villaInterior,
  PEXELS.project4,
  PEXELS.wellness1,
  PEXELS.project5,
  PEXELS.wellness2,
  PEXELS.skyClouds,
  PEXELS.wellness3,
  PEXELS.wellness4,
];

export interface AllPagesDirectoryProps {
  nicheSlug: string;
  nicheName: string;
  pages?: InnerPageMeta[];
  defaultView?: "inner" | "templates";
}

export const AllPagesDirectory: React.FC<AllPagesDirectoryProps> = ({
  nicheSlug,
  nicheName,
  pages,
  defaultView = "inner",
}) => {
  const [activeTab, setActiveTab] = useState<"inner" | "templates">(defaultView);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedArchetype, setSelectedArchetype] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const list = pages && pages.length > 0 ? pages : INNER_PAGES_MATRIX;

  const innerCategories = [
    { id: "all", label: `All Inner Pages (${list.length})` },
    { id: "core", label: "Core & Company" },
    { id: "showcase", label: "Portfolio & Case Studies" },
    { id: "editorial", label: "Blog & Editorial" },
    { id: "product", label: "Product & Docs" },
    { id: "utility", label: "Auth, OTP & Utility (9)" },
  ];

  const templateArchetypes = [
    { id: "all", label: `All 47 Pre-Built Templates (${PREBUILT_47_TEMPLATES.length})` },
    { id: "ai", label: "AI & Automation (16)" },
    { id: "fintech", label: "Fintech & Wealth (11)" },
    { id: "agency", label: "Agency, SaaS & CRM (11)" },
    { id: "cyber", label: "Cyber, Cloud & Security (5)" },
    { id: "proptech", label: "PropTech & POS (2)" },
    { id: "wellness", label: "Consumer & Lifestyle (2)" },
  ];

  const filteredInnerPages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return list.filter((p) => {
      const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [list, selectedCategory, searchQuery]);

  const filteredTemplates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PREBUILT_47_TEMPLATES.filter((t) => {
      const matchesArch = selectedArchetype === "all" || t.archetype === selectedArchetype;
      const matchesSearch =
        !q ||
        (t.title || t.name || "").toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.slug.toLowerCase().includes(q);
      return matchesArch && matchesSearch;
    });
  }, [selectedArchetype, searchQuery]);

  const quickAuthLinks = [
    { label: "Sign In / Login", slug: "sign-in" },
    { label: "Create Account", slug: "sign-up" },
    { label: "Forgot Password", slug: "forgot-password" },
    { label: "OTP 2FA Verify", slug: "otp" },
    { label: "Privacy Policy", slug: "privacy" },
    { label: "Coming Soon", slug: "coming-soon" },
    { label: "Maintenance", slug: "maintenance" },
    { label: "404 Error", slug: "404" },
  ];

  return (
    <section
      id="all-pages-directory"
      className="border-t border-black/[0.06] bg-[#F4F5F8] py-20 transition-colors duration-300 sm:py-28 dark:border-white/10 dark:bg-[#0B0C10]"
    >
      <Container>
        {/* Top Double-Bezel Header & Mode Switcher */}
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl space-y-3.5">
            <Reveal y={10}>
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#C8F560] px-4 py-1.5 text-xs font-semibold text-[#0D0F14] shadow-xs">
                <Sparkles className="h-3.5 w-3.5" />
                47 Pre-Built Templates · {list.length} Inner, Auth & Utility Pages
              </span>
            </Reveal>

            <MaskedHeading
              as="h2"
              text={
                activeTab === "templates"
                  ? "Explore all *47 pre-built* multipurpose templates"
                  : `Explore all ${list.length} inner, auth & utility pages for *${nicheName}*`
              }
              accent={activeTab === "templates" ? "47 pre-built" : nicheName}
              className="text-[clamp(1.9rem,3.8vw,3.2rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-zinc-900 dark:text-white"
            />
          </div>

          {/* Segmented Double-Bezel Switcher: Inner Pages vs 47 Pre-Built Templates */}
          <div className={HB.bezel}>
            <div className="flex flex-wrap items-center gap-1.5 rounded-[26px] bg-white p-1.5 dark:bg-[#14161D]">
              <button
                type="button"
                onClick={() => setActiveTab("inner")}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all ${
                  activeTab === "inner"
                    ? "bg-[#C8F560] text-[#0D0F14] shadow-sm"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>{list.length} Inner & Auth Pages</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("templates")}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all ${
                  activeTab === "templates"
                    ? "bg-[#C8F560] text-[#0D0F14] shadow-sm"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>47 Pre-Built Demos</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Auth & Utility Jump Strip */}
        <div className="mb-8 rounded-[28px] border border-black/[0.06] bg-white p-4 shadow-xs dark:border-white/10 dark:bg-[#14161D]">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-zinc-900 dark:text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C8F560] text-[#0D0F14]">
                <KeyRound className="h-3.5 w-3.5" />
              </span>
              <span>Auth & Utility Suite (Direct Preview):</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {quickAuthLinks.map((item) => (
                <Link
                  key={item.slug}
                  to={`/demos/${nicheSlug}/${item.slug}`}
                  className="inline-flex items-center gap-1 rounded-full border border-black/[0.08] bg-[#F4F5F8] px-3 py-1.5 text-[11px] font-medium text-zinc-800 transition-all hover:border-black/15 hover:bg-[#C8F560] hover:text-[#0D0F14] dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-200"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-70" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Search & Filter Control Bar */}
        <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          {/* Category / Archetype Pills */}
          <div className="flex flex-wrap gap-2">
            {(activeTab === "inner" ? innerCategories : templateArchetypes).map((cat) => {
              const isSelected =
                activeTab === "inner" ? selectedCategory === cat.id : selectedArchetype === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    activeTab === "inner"
                      ? setSelectedCategory(cat.id)
                      : setSelectedArchetype(cat.id)
                  }
                  className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    isSelected ? HB.pillActive : HB.pillIdle
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeTab === "inner"
                  ? "Search inner, auth, OTP, legal..."
                  : "Search 47 pre-built templates..."
              }
              className="w-full rounded-full border border-black/[0.08] bg-white py-2.5 pr-4 pl-10 text-xs text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-[#C8F560] focus:outline-none dark:border-white/10 dark:bg-[#14161D] dark:text-white"
            />
          </div>
        </div>

        {/* TAB 1: 29+ Inner, Auth & Utility Pages Grid (3-Column Luxury Grid with Real Screenshots) */}
        {activeTab === "inner" ? (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredInnerPages.map((page, idx) => {
              const subSlug = page.slug.replace(/^\/+/, "").replace(/^demos\/[^/]+\//, "");
              const targetHref = `/demos/${nicheSlug}/${subSlug}`;
              const fallbackThumb = PAGE_PREVIEW_IMAGES[idx % PAGE_PREVIEW_IMAGES.length];
              const realInnerShot = `/assets/templates/inner/${page.id}.jpg`;
              const isAuthOrUtility = page.category === "utility";

              return (
                <div key={page.id} className={HB.bezel}>
                  <Link
                    to={targetHref}
                    className="group flex h-full flex-col justify-between rounded-[26px] border border-black/[0.05] bg-white p-3.5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-white/10 dark:bg-[#14161D]"
                  >
                    {/* Real Captured Browser Screenshot Preview */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border border-black/[0.06] bg-zinc-900 dark:border-white/10">
                      <img
                        src={realInnerShot}
                        alt={page.title}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== fallbackThumb) {
                            target.src = fallbackThumb;
                          }
                        }}
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span
                        className={`absolute top-2.5 left-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase shadow-xs ${
                          isAuthOrUtility
                            ? "bg-[#C8F560] text-[#0D0F14]"
                            : "bg-white/95 text-zinc-950"
                        }`}
                      >
                        {page.category}
                      </span>
                      <span className="absolute right-2.5 bottom-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-zinc-950 shadow transition-all group-hover:bg-[#C8F560] group-hover:text-[#0D0F14]">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>

                    {/* Card Copy */}
                    <div className="p-2 pt-4">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-[15px] font-semibold text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-white dark:group-hover:text-[#C8F560]">
                          {page.title}
                        </h3>
                        {isAuthOrUtility && (
                          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                        )}
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {page.shortDesc}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          /* TAB 2: All 47 Pre-Built Website Templates Grid (3-Column Luxury Grid with Real Screenshots) */
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((tpl: PrebuiltTemplateMeta, idx: number) => {
              const pack = getTemplatePexelsPack(tpl.slug, tpl.archetype);
              const fallbackThumb =
                pack.hero || PAGE_PREVIEW_IMAGES[idx % PAGE_PREVIEW_IMAGES.length];
              const realScreenshotUrl = `/assets/templates/prebuilt/${tpl.slug}.jpg`;
              const displayTitle = tpl.title || tpl.name || tpl.slug;
              const displayNum = (tpl.numId || idx + 1).toString().padStart(2, "0");
              return (
                <div key={tpl.slug} className={HB.bezel}>
                  <Link
                    to={`/demos/${tpl.slug}`}
                    className="group flex h-full flex-col justify-between rounded-[26px] border border-black/[0.05] bg-white p-3.5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-white/10 dark:bg-[#14161D]"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border border-black/[0.06] bg-zinc-900 dark:border-white/10">
                      <img
                        src={realScreenshotUrl}
                        alt={displayTitle}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== fallbackThumb) {
                            target.src = fallbackThumb;
                          }
                        }}
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="rounded-full bg-black/75 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
                          #{displayNum} · {tpl.archetype}
                        </span>
                        {tpl.isNew && (
                          <span className="rounded-full bg-[#C8F560] px-2.5 py-0.5 text-[10px] font-bold text-[#0D0F14]">
                            New
                          </span>
                        )}
                      </div>

                      <div className="absolute right-12 bottom-2.5 left-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="inline-block rounded-full bg-black/75 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
                          {tpl.metricHighlight}
                        </span>
                      </div>

                      <span className="absolute right-2.5 bottom-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-zinc-950 shadow transition-all group-hover:bg-[#C8F560] group-hover:text-[#0D0F14]">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2.5 p-2 pt-4">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-black/[0.06] dark:border-white/10"
                          style={{
                            backgroundColor: `${tpl.accent}18`,
                            color: tpl.accent,
                          }}
                        >
                          <HudbirdTemplateLogoIcon slug={tpl.slug} className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="truncate text-[15px] font-semibold text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-white dark:group-hover:text-[#C8F560]">
                            {displayTitle}
                          </h3>
                          <p className="truncate text-xs text-zinc-600 dark:text-zinc-400">
                            {tpl.tagline}
                          </p>
                        </div>
                      </div>
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: tpl.accent }}
                        title={`Brand accent: ${tpl.accent}`}
                      />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
};
