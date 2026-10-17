// starter-kits/pro-templates/src/components/nexus-sections/LivePreviewToolbar.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { INNER_PAGES_MATRIX, PREBUILT_47_TEMPLATES, PrebuiltTemplateMeta } from "@hudbird/schemas";
import {
  Sun,
  Moon,
  Palette,
  X,
  ArrowUpRight,
  ArrowLeft,
  Sparkles,
  LayoutGrid,
  Search,
  Layers,
  Home,
} from "lucide-react";
import { useIsDark, toggleTheme } from "./ScrollReveal";
import { getTemplatePexelsPack, PEXELS } from "./HudbirdVisualWidgets";
import { HudbirdTemplateLogoIcon } from "./HudbirdKit";

export interface LivePreviewToolbarProps {
  currentAccentColor: string;
  onAccentColorChange: (color: string) => void;
}

export const ACCENT_COLOR_PRESETS = [
  { name: "Hudbird Violet", value: "#7C3AED", class: "bg-[#7C3AED]" },
  { name: "Coral Flame", value: "#F97316", class: "bg-[#F97316]" },
  { name: "Lime Workflow", value: "#84CC16", class: "bg-[#84CC16]" },
  { name: "Sky PropTech", value: "#2EA3F2", class: "bg-[#2EA3F2]" },
  { name: "Emerald Pulse", value: "#10B981", class: "bg-[#10B981]" },
];

export const LivePreviewToolbar: React.FC<LivePreviewToolbarProps> = ({
  currentAccentColor,
  onAccentColorChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"websites" | "inner">("websites");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const isDark = useIsDark();
  const location = useLocation();

  const matchNiche = location.pathname.match(/\/demos\/([^/]+)/);
  const activeNicheSlug = matchNiche?.[1] || "digital-agency";
  const isRootShowcase = location.pathname === "/";

  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setIsColorPickerOpen(false);
      }
    };
    window.addEventListener("hudbird:open-demos-modal", handleOpenModal);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("hudbird:open-demos-modal", handleOpenModal);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Lock body scroll when Fullscreen Popup is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const filterPills = [
    { id: "all", label: "All 47 Websites" },
    { id: "new", label: "New Releases (12)" },
    { id: "ai", label: "AI & Automation (16)" },
    { id: "fintech", label: "Fintech & Wealth (11)" },
    { id: "agency", label: "Agency, SaaS & CRM (11)" },
    { id: "cyber", label: "Cyber, Cloud & Security (5)" },
    { id: "proptech", label: "PropTech & Lifestyle (4)" },
  ];

  const filteredWebsites = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = PREBUILT_47_TEMPLATES.filter((t) => {
      const title = (t.title || t.name || "").toLowerCase();
      const matchesSearch =
        !q ||
        title.includes(q) ||
        t.slug.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.archetype.toLowerCase().includes(q);
      if (!matchesSearch) return false;

      if (selectedFilter === "all") return true;
      if (selectedFilter === "new") return Boolean(t.isNew);
      if (selectedFilter === "proptech") {
        return t.archetype === "proptech" || t.archetype === "wellness";
      }
      return t.archetype === selectedFilter;
    });

    return [...list].sort((a, b) => {
      if (Boolean(a.isNew) !== Boolean(b.isNew)) {
        return a.isNew ? -1 : 1;
      }
      return (a.numId || 0) - (b.numId || 0);
    });
  }, [selectedFilter, searchQuery]);

  const filteredInnerPages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return INNER_PAGES_MATRIX;
    return INNER_PAGES_MATRIX.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <>
      {/* Bottom-Right Floating Capsule with Direct Back Link to Main Demo Page (Image 4 Fix) */}
      <aside className="fixed right-5 bottom-5 z-40 flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/95 p-1.5 text-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.24)] backdrop-blur-2xl dark:border-white/15 dark:bg-[#12141C]/95 dark:text-white">
        {!isRootShowcase && (
          <Link
            to="/"
            title="Back to Main Demo Hub"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F5F8] px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-zinc-800 transition-all hover:bg-[#C8F560] hover:text-[#0D0F14] dark:bg-white/10 dark:text-zinc-100 dark:hover:bg-[#C8F560] dark:hover:text-[#0D0F14]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Main Demo</span>
          </Link>
        )}

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="group flex cursor-pointer items-center gap-2 rounded-full bg-zinc-900 py-1.5 pr-2.5 pl-3.5 text-xs font-semibold whitespace-nowrap text-white transition-all hover:opacity-95 dark:bg-white dark:text-zinc-950"
        >
          <LayoutGrid className="h-3.5 w-3.5 text-[#C8F560] transition-transform duration-300 group-hover:rotate-90 dark:text-zinc-900" />
          <span>47+ Pre-built Demos</span>
          <span className="rounded-full bg-[#C8F560] px-2 py-0.5 text-[10px] leading-none font-bold text-[#0D0F14]">
            47+
          </span>
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          title="Toggle Light / Dark Mode"
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-zinc-700" />
          )}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
            title="Switch Brand Accent Color"
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          >
            <Palette className="h-4 w-4" />
          </button>

          {isColorPickerOpen && (
            <div className="absolute right-0 bottom-full mb-3 flex items-center gap-2 rounded-2xl border border-black/10 bg-white p-2.5 shadow-2xl dark:border-white/15 dark:bg-zinc-900">
              {ACCENT_COLOR_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => {
                    onAccentColorChange(p.value);
                    setIsColorPickerOpen(false);
                  }}
                  title={p.name}
                  className={`h-6 w-6 rounded-full ${p.class} cursor-pointer transition-transform hover:scale-110 ${
                    currentAccentColor.toLowerCase() === p.value.toLowerCase()
                      ? "scale-110 ring-2 ring-zinc-900 dark:ring-white"
                      : "opacity-80"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* FULLSCREEN LUXURY POPUP ("47+ Pre-built websites" — 3 items per row with Real Captured Screenshots) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex h-screen w-screen flex-col overflow-hidden bg-[#F6F7FA] text-zinc-900 dark:bg-[#0B0D13] dark:text-white"
          >
            {/* Sticky Fullscreen Header */}
            <div className="shrink-0 border-b border-black/[0.06] bg-white/95 px-6 pt-6 pb-5 backdrop-blur-2xl sm:px-10 lg:px-14 dark:border-white/10 dark:bg-[#0E1017]/95">
              <div className="mx-auto max-w-[1440px]">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#C8F560] text-xs font-bold text-[#0D0F14] shadow-xs">
                      47+
                    </span>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h2 className="text-xl font-semibold tracking-[-0.03em] text-zinc-900 sm:text-2xl lg:text-[26px] dark:text-white">
                          47+ Pre-built websites
                        </h2>
                        <span className="hidden items-center gap-1 rounded-full bg-zinc-900/5 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 sm:inline-flex dark:bg-white/10 dark:text-zinc-300">
                          Real Live Previews · 3-Column Luxury Grid
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                        Click any live website below — each features bespoke industry architecture,
                        custom Pexels visuals, and 29+ inner/auth pages.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {!isRootShowcase && (
                      <Link
                        to="/"
                        onClick={() => setIsModalOpen(false)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F5F8] px-4 py-2 text-xs font-semibold whitespace-nowrap text-zinc-800 transition-colors hover:bg-[#C8F560] hover:text-[#0D0F14] dark:bg-white/[0.07] dark:text-zinc-200"
                      >
                        <Home className="h-3.5 w-3.5" />
                        <span>Main Demo Hub</span>
                      </Link>
                    )}

                    {/* Segmented Switcher: 47 Websites vs 29+ Inner Pages */}
                    <div className="hidden items-center gap-1 rounded-full border border-black/[0.06] bg-[#F4F5F8] p-1 md:flex dark:border-white/10 dark:bg-white/[0.06]">
                      <button
                        type="button"
                        onClick={() => setModalTab("websites")}
                        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                          modalTab === "websites"
                            ? "bg-[#C8F560] text-[#0D0F14] shadow-2xs"
                            : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                        }`}
                      >
                        <LayoutGrid className="h-3.5 w-3.5" />
                        <span>47 Pre-built Websites</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalTab("inner")}
                        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                          modalTab === "inner"
                            ? "bg-[#C8F560] text-[#0D0F14] shadow-2xs"
                            : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                        }`}
                      >
                        <Layers className="h-3.5 w-3.5" />
                        <span>29+ Inner & Auth Pages</span>
                      </button>
                    </div>

                    {/* Circular Close Button */}
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      aria-label="Close Fullscreen Pre-built Websites Modal"
                      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#F4F5F8] text-zinc-700 transition-colors hover:bg-[#C8F560] hover:text-[#0D0F14] sm:h-11 sm:w-11 dark:bg-white/10 dark:text-zinc-200"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Filter Pills + Search Row */}
                <div className="mt-5 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                  {modalTab === "websites" ? (
                    <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-1">
                      {filterPills.map((pill) => {
                        const active = selectedFilter === pill.id;
                        return (
                          <button
                            key={pill.id}
                            type="button"
                            onClick={() => setSelectedFilter(pill.id)}
                            className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                              active
                                ? "bg-zinc-900 text-white dark:bg-[#C8F560] dark:text-[#0D0F14]"
                                : "bg-[#F4F5F8] text-zinc-600 hover:bg-zinc-200/70 dark:bg-white/[0.06] dark:text-zinc-300 dark:hover:bg-white/10"
                            }`}
                          >
                            {pill.label}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <Sparkles className="h-3.5 w-3.5 text-[#84CC16]" />
                      <span>
                        Showing all 29+ Inner, Company, Auth, OTP & Legal routes for{" "}
                        <strong className="text-zinc-900 dark:text-white">{activeNicheSlug}</strong>
                      </span>
                    </div>
                  )}

                  <div className="relative w-full shrink-0 lg:w-80">
                    <Search className="pointer-events-none absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        modalTab === "websites"
                          ? "Search 47 pre-built websites..."
                          : "Search 29+ inner & auth pages..."
                      }
                      className="w-full rounded-full border border-black/[0.06] bg-[#F4F5F8] py-2 pr-4 pl-9 text-xs text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-[#C8F560] focus:outline-none dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Fullscreen 3-Column Luxury Grid */}
            <div className="flex-1 overflow-y-auto px-6 py-9 sm:px-10 lg:px-14">
              <div className="mx-auto max-w-[1440px]">
                {modalTab === "websites" ? (
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredWebsites.map((tpl: PrebuiltTemplateMeta) => {
                      const isCurrent = tpl.slug === activeNicheSlug;
                      const displayTitle = tpl.title || tpl.name || tpl.slug;
                      const pack = getTemplatePexelsPack(tpl.slug, tpl.archetype);
                      const realScreenshotUrl = `/assets/templates/prebuilt/${tpl.slug}.jpg`;

                      return (
                        <Link
                          key={tpl.slug}
                          to={`/demos/${tpl.slug}`}
                          onClick={() => setIsModalOpen(false)}
                          className={`group flex flex-col rounded-[28px] p-3.5 transition-all duration-300 hover:-translate-y-1.5 ${
                            isCurrent
                              ? "bg-white shadow-xl ring-2 ring-[#C8F560] dark:bg-[#151822]"
                              : "border border-black/[0.06] bg-white hover:shadow-[0_24px_60px_rgba(0,0,0,0.14)] dark:border-white/[0.08] dark:bg-[#141720] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
                          }`}
                        >
                          {/* Real Captured Website Screenshot Window */}
                          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border border-black/[0.06] bg-zinc-900 dark:border-white/10">
                            <img
                              src={realScreenshotUrl}
                              alt={displayTitle}
                              loading="lazy"
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (target.src !== pack.hero) {
                                  target.src = pack.hero;
                                }
                              }}
                              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                            />

                            {/* Subtle Hover Overlay + Action Pill */}
                            <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/55 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                                <span
                                  className="h-2 w-2 rounded-full"
                                  style={{ backgroundColor: tpl.accent }}
                                />
                                {tpl.metricHighlight}
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#C8F560] px-3.5 py-1.5 text-xs font-bold text-[#0D0F14] shadow-lg">
                                <span>Live Demo</span>
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              </span>
                            </div>
                          </div>

                          {/* Card Footer: Domain Logo Icon + Title + New Pill */}
                          <div className="flex items-center justify-between gap-3 px-2 pt-4 pb-1">
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
                                <h3 className="truncate text-[15px] font-semibold text-zinc-900 transition-colors group-hover:text-black dark:text-white dark:group-hover:text-[#C8F560]">
                                  {displayTitle}
                                </h3>
                                <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                                  {tpl.tagline}
                                </p>
                              </div>
                            </div>

                            {tpl.isNew ? (
                              <span className="shrink-0 rounded-full bg-[#C8F560] px-2.5 py-0.5 text-[11px] leading-tight font-bold text-[#0D0F14] shadow-2xs">
                                New
                              </span>
                            ) : (
                              <span className="shrink-0 rounded-full bg-black/[0.05] px-2.5 py-0.5 text-[10px] font-semibold text-zinc-500 dark:bg-white/10 dark:text-zinc-400">
                                #{(tpl.numId || 1).toString().padStart(2, "0")}
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  /* TAB 2: 29+ Inner, Auth & Utility Pages in 3-Column Grid with Real Screenshots */
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredInnerPages.map((page, idx) => {
                      const subSlug = page.slug.replace(/^\/+/, "").replace(/^demos\/[^/]+\//, "");
                      const fallbackThumb = PEXELS.projects[idx % PEXELS.projects.length];
                      const realInnerShot = `/assets/templates/inner/${page.id}.jpg`;
                      return (
                        <Link
                          key={page.id}
                          to={`/demos/${activeNicheSlug}/${subSlug}`}
                          onClick={() => setIsModalOpen(false)}
                          className="group flex flex-col justify-between rounded-[28px] border border-black/[0.06] bg-white p-3.5 transition-all hover:-translate-y-1.5 hover:shadow-xl dark:border-white/[0.08] dark:bg-[#141720]"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] border border-black/[0.06] bg-zinc-900 dark:border-white/10">
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
                            <span className="absolute top-3 left-3 rounded-full bg-[#C8F560] px-2.5 py-0.5 text-[10px] font-bold text-[#0D0F14] uppercase shadow-xs">
                              {page.category}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-2 px-2 pt-4 pb-1">
                            <div className="min-w-0">
                              <div className="truncate text-[15px] font-semibold text-zinc-900 dark:text-white">
                                {page.title}
                              </div>
                              <div className="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-400">
                                {page.shortDesc}
                              </div>
                            </div>
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-[#C8F560]" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
