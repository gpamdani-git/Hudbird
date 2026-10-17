// starter-kits/pro-templates/src/components/nexus-sections/NavbarMegaMenu.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavbarMegaMenuProps,
  getAllNiches,
  PREBUILT_47_TEMPLATES,
  PrebuiltTemplateMeta,
} from "@hudbird/schemas";
import {
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  ArrowUpRight,
  ArrowLeft,
  Search,
  Sparkles,
} from "lucide-react";
import { useIsDark, toggleTheme, PillLink } from "./ScrollReveal";
import { HudbirdTemplateLogoIcon } from "./HudbirdKit";

export interface NavbarProps {
  data: NavbarMegaMenuProps;
  activePath?: string;
}

export const NavbarMegaMenu: React.FC<NavbarProps> = ({ data }) => {
  const [openDropdown, setOpenDropdown] = useState<"demos47" | "company" | "inner" | "all" | null>(
    null
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [demoSearch, setDemoSearch] = useState("");
  const isDark = useIsDark();
  const location = useLocation();
  const allNiches = getAllNiches();

  const matchNiche = location.pathname.match(/\/demos\/([^/]+)/);
  const activeNicheSlug = matchNiche?.[1] || "digital-agency";
  const currentPrebuilt = useMemo(
    () => PREBUILT_47_TEMPLATES.find((t) => t.slug === activeNicheSlug),
    [activeNicheSlug]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Group all 47 templates into 4 columns matching Screenshot media_1792212000864_a26eb1e2.png
  const columns47 = useMemo(() => {
    const q = demoSearch.trim().toLowerCase();
    const filtered = q
      ? PREBUILT_47_TEMPLATES.filter(
          (t) =>
            (t.title || t.name || "").toLowerCase().includes(q) ||
            t.slug.toLowerCase().includes(q) ||
            t.archetype.toLowerCase().includes(q)
        )
      : PREBUILT_47_TEMPLATES;

    return [1, 2, 3, 4].map((colNum) => filtered.filter((item) => item.column === colNum));
  }, [demoSearch]);

  const companyPages = [
    {
      title: "About Us",
      desc: "Our story, mission & studio culture",
      href: `/demos/${activeNicheSlug}/about`,
    },
    {
      title: "Services",
      desc: "UI/UX, web dev, brand & growth",
      href: `/demos/${activeNicheSlug}/services`,
    },
    {
      title: "Service Details",
      desc: "Deep-dive capability breakdown",
      href: `/demos/${activeNicheSlug}/service-detail`,
    },
    {
      title: "Our Team",
      desc: "Meet the multidisciplinary leaders",
      href: `/demos/${activeNicheSlug}/team`,
    },
    {
      title: "Careers",
      desc: "Open roles & remote positions",
      href: `/demos/${activeNicheSlug}/careers`,
    },
    {
      title: "Contact Us",
      desc: "Start a project conversation",
      href: `/demos/${activeNicheSlug}/contact`,
    },
  ];

  const innerDetailPages = [
    {
      title: "Selected Projects",
      desc: "Interactive portfolio & case studies",
      href: `/demos/${activeNicheSlug}/portfolio`,
    },
    {
      title: "Project Details",
      desc: "Full case study & metrics breakdown",
      href: `/demos/${activeNicheSlug}/case-study-detail`,
    },
    {
      title: "Our Process",
      desc: "Clarity before creativity workflow",
      href: `/demos/${activeNicheSlug}/process`,
    },
    {
      title: "Pricing Plans",
      desc: "Transparent startup & pro packages",
      href: `/demos/${activeNicheSlug}/pricing`,
    },
    {
      title: "Blog & Insights",
      desc: "Articles, tutorials & engineering notes",
      href: `/demos/${activeNicheSlug}/blog`,
    },
    {
      title: "Blog Details",
      desc: "Long-form editorial article template",
      href: `/demos/${activeNicheSlug}/blog-post-detail`,
    },
    {
      title: "Integrations",
      desc: "Connect your favorite tools in 1 click",
      href: `/demos/${activeNicheSlug}/integrations`,
    },
    {
      title: "Changelog",
      desc: "Latest product releases & updates",
      href: `/demos/${activeNicheSlug}/changelog`,
    },
  ];

  return (
    <header className="pointer-events-none sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-auto mx-auto max-w-[1240px]">
        <div
          onMouseLeave={() => setOpenDropdown(null)}
          className="relative flex h-16 items-center justify-between rounded-full border border-black/[0.06] bg-white/95 pr-2.5 pl-2.5 shadow-[0_12px_36px_-8px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-all duration-300 sm:h-[68px] dark:border-white/10 dark:bg-zinc-900/90 dark:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.55)]"
        >
          {/* Left: Domain-Specific Brand Mark + Clean Brand Name */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to={`/demos/${activeNicheSlug}`}
              className="group flex items-center gap-2.5 rounded-full py-1 pr-2 pl-1 focus:outline-none"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-sm transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: "var(--brand-primary, #7C3AED)" }}
              >
                <HudbirdTemplateLogoIcon slug={activeNicheSlug} className="h-5 w-5" />
              </span>
              <div className="flex flex-col">
                <span className="text-[17px] leading-none font-semibold tracking-[-0.03em] whitespace-nowrap text-zinc-900 dark:text-white">
                  HudbirdUI
                </span>
                <span className="mt-0.5 max-w-[140px] truncate text-[10px] font-medium tracking-tight whitespace-nowrap text-zinc-400 dark:text-zinc-400">
                  {currentPrebuilt?.title || data.brandTag || "pro templates"}
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Clean HudbirdUI Dropdown & Direct Links (Strictly single-line whitespace-nowrap) */}
          <nav className="hidden items-center gap-1 text-[13.5px] font-medium whitespace-nowrap text-zinc-600 lg:flex dark:text-zinc-300">
            {/* 47+ Pre-Built Demos Mega Menu Trigger */}
            <div className="relative" onMouseEnter={() => setOpenDropdown("demos47")}>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "demos47" ? null : "demos47")}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 whitespace-nowrap transition-colors hover:bg-zinc-100/80 hover:text-zinc-950 dark:hover:bg-white/5 dark:hover:text-white"
              >
                <span>Demos</span>
                <span className="rounded-full bg-[#C8F560] px-1.5 py-0.5 text-[10px] leading-none font-bold text-[#0D0F14]">
                  47
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    openDropdown === "demos47"
                      ? "rotate-180 text-zinc-900 dark:text-[#C8F560]"
                      : "opacity-60"
                  }`}
                />
              </button>
            </div>

            <div className="relative" onMouseEnter={() => setOpenDropdown("company")}>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "company" ? null : "company")}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 whitespace-nowrap transition-colors hover:bg-zinc-100/80 hover:text-zinc-950 dark:hover:bg-white/5 dark:hover:text-white"
              >
                <span>Company</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    openDropdown === "company"
                      ? "rotate-180 text-[color:var(--brand-primary,#7C3AED)]"
                      : "opacity-60"
                  }`}
                />
              </button>
            </div>

            <div className="relative" onMouseEnter={() => setOpenDropdown("inner")}>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "inner" ? null : "inner")}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 whitespace-nowrap transition-colors hover:bg-zinc-100/80 hover:text-zinc-950 dark:hover:bg-white/5 dark:hover:text-white"
              >
                <span>Inner pages</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    openDropdown === "inner"
                      ? "rotate-180 text-[color:var(--brand-primary,#7C3AED)]"
                      : "opacity-60"
                  }`}
                />
              </button>
            </div>

            <div className="relative" onMouseEnter={() => setOpenDropdown("all")}>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "all" ? null : "all")}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 whitespace-nowrap transition-colors hover:bg-zinc-100/80 hover:text-zinc-950 dark:hover:bg-white/5 dark:hover:text-white"
              >
                <span>All pages</span>
                <span className="rounded-full bg-[color:var(--brand-primary,#7C3AED)]/12 px-1.5 py-0.5 text-[10px] leading-none font-semibold text-[color:var(--brand-primary,#7C3AED)]">
                  29+
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    openDropdown === "all"
                      ? "rotate-180 text-[color:var(--brand-primary,#7C3AED)]"
                      : "opacity-60"
                  }`}
                />
              </button>
            </div>

            <Link
              to={`/demos/${activeNicheSlug}/portfolio`}
              className="rounded-full px-3 py-2 whitespace-nowrap transition-colors hover:bg-zinc-100/80 hover:text-zinc-950 dark:hover:bg-white/5 dark:hover:text-white"
            >
              Projects
            </Link>

            <Link
              to={`/demos/${activeNicheSlug}/pricing`}
              className="rounded-full px-3 py-2 whitespace-nowrap transition-colors hover:bg-zinc-100/80 hover:text-zinc-950 dark:hover:bg-white/5 dark:hover:text-white"
            >
              Pricing
            </Link>

            <Link
              to={`/demos/${activeNicheSlug}/sign-in`}
              className="rounded-full px-3 py-2 whitespace-nowrap transition-colors hover:bg-zinc-100/80 hover:text-zinc-950 dark:hover:bg-white/5 dark:hover:text-white"
            >
              Auth
            </Link>
          </nav>

          {/* Right: Back to Main Hub + Theme Toggle + Signature Double-Ring Capsule CTA */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/"
              title="Back to Main HudbirdUI Showcase"
              className="hidden items-center gap-1.5 rounded-full bg-zinc-100/80 px-3 py-2 text-xs font-semibold whitespace-nowrap text-zinc-700 transition-colors hover:bg-[#C8F560] hover:text-[#0D0F14] xl:inline-flex dark:bg-white/5 dark:text-zinc-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Main Hub</span>
            </Link>

            <button
              type="button"
              onClick={toggleTheme}
              title="Toggle Light / Dark Mode"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/[0.06] bg-zinc-100/70 text-zinc-700 transition-colors hover:bg-zinc-200/70 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-zinc-700" />
              )}
            </button>

            <div className="hidden shrink-0 sm:block">
              <PillLink
                href={data.primaryCta?.href || `/demos/${activeNicheSlug}/contact`}
                variant="brand"
                size="md"
              >
                {data.primaryCta?.label || "Get started"}
              </PillLink>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/[0.08] text-zinc-900 lg:hidden dark:border-white/10 dark:text-white"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Dropdown Panels */}
          <AnimatePresence>
            {/* 4-COLUMN 47 PRE-BUILT TEMPLATES MEGA MENU (Exact match to Screenshot media_1792212000864_a26eb1e2.png) */}
            {openDropdown === "demos47" && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full right-0 left-0 z-50 pt-3"
              >
                <div className="rounded-[34px] border border-black/[0.08] bg-zinc-900/[0.05] p-1.5 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.32)] dark:border-white/10 dark:bg-white/[0.05]">
                  <div className="rounded-[28px] border border-black/[0.06] bg-white p-6 sm:p-7 dark:border-white/10 dark:bg-[#11131A]">
                    {/* Top Bar: Title + Search Filter + Master Showcase Link */}
                    <div className="mb-5 flex flex-col justify-between gap-3 border-b border-black/[0.06] pb-4 sm:flex-row sm:items-center dark:border-white/10">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C8F560] px-3 py-1 text-xs font-bold text-[#0D0F14]">
                          <Sparkles className="h-3.5 w-3.5" />
                          47 Pre-Built Templates
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          Click any vertical to launch its bespoke landing page & 29+ inner/auth
                          routes
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="relative w-56">
                          <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                          <input
                            type="text"
                            value={demoSearch}
                            onChange={(e) => setDemoSearch(e.target.value)}
                            placeholder="Filter 47 templates..."
                            className="w-full rounded-full border border-black/[0.06] bg-[#F4F5F8] py-1.5 pr-3 pl-8 text-xs text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-[#C8F560] focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setOpenDropdown(null);
                            window.dispatchEvent(new CustomEvent("hudbird:open-demos-modal"));
                          }}
                          className="cursor-pointer rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-white transition-opacity hover:opacity-90 dark:bg-white/10 dark:text-[#C8F560]"
                        >
                          Visual Cards Popup ↗
                        </button>
                      </div>
                    </div>

                    {/* 4-Column List of 47 Templates */}
                    <div className="grid max-h-[64vh] grid-cols-1 gap-x-6 gap-y-1 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-4">
                      {columns47.map((colItems, colIdx) => (
                        <ul key={colIdx} className="space-y-1">
                          {colItems.map((tpl: PrebuiltTemplateMeta) => {
                            const isCurrent = tpl.slug === activeNicheSlug;
                            const labelText = tpl.title || tpl.name || tpl.slug;
                            return (
                              <li key={tpl.slug}>
                                <Link
                                  to={`/demos/${tpl.slug}`}
                                  onClick={() => setOpenDropdown(null)}
                                  className={`group flex items-center justify-between rounded-xl px-3 py-2 text-[13.5px] transition-all ${
                                    isCurrent
                                      ? "bg-zinc-900 font-semibold text-white shadow-xs dark:bg-[#C8F560] dark:text-[#0D0F14]"
                                      : "font-medium text-zinc-900 hover:bg-zinc-100 hover:text-black dark:text-zinc-100 dark:hover:bg-white/[0.08] dark:hover:text-white"
                                  }`}
                                >
                                  <span className="flex min-w-0 items-center gap-2">
                                    <span
                                      className="h-1.5 w-1.5 shrink-0 rounded-full opacity-75 transition-all group-hover:scale-125 group-hover:opacity-100"
                                      style={{
                                        backgroundColor: isCurrent ? "#10B981" : tpl.accent,
                                      }}
                                    />
                                    <span className="truncate text-zinc-900 group-hover:text-black dark:text-zinc-100 dark:group-hover:text-white">
                                      {isCurrent ? (
                                        <span className="text-white dark:text-[#0D0F14]">
                                          {labelText}
                                        </span>
                                      ) : (
                                        labelText
                                      )}
                                    </span>
                                  </span>
                                  {tpl.isNew ? (
                                    <span className="ml-2 shrink-0 rounded-full bg-[#C8F560] px-2.5 py-0.5 text-[10px] leading-tight font-bold text-[#0D0F14] shadow-2xs">
                                      New
                                    </span>
                                  ) : (
                                    <ArrowUpRight className="ml-2 h-3.5 w-3.5 shrink-0 text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {openDropdown === "company" && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-1/2 z-50 w-[560px] -translate-x-1/2 pt-3"
              >
                <div className="grid grid-cols-2 gap-2 rounded-[28px] border border-black/[0.08] bg-white p-4 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.18)] dark:border-white/10 dark:bg-zinc-900">
                  {companyPages.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="group flex items-start justify-between rounded-2xl p-3.5 transition-colors hover:bg-zinc-50 dark:hover:bg-white/5"
                    >
                      <div>
                        <div className="text-sm font-semibold text-zinc-900 transition-colors group-hover:text-[color:var(--brand-primary,#7C3AED)] dark:text-white">
                          {item.title}
                        </div>
                        <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                          {item.desc}
                        </div>
                      </div>
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--brand-primary,#7C3AED)]" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {openDropdown === "inner" && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-1/2 z-50 w-[640px] -translate-x-1/2 pt-3"
              >
                <div className="rounded-[28px] border border-black/[0.08] bg-white p-5 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.18)] dark:border-white/10 dark:bg-zinc-900">
                  <div className="grid grid-cols-2 gap-2">
                    {innerDetailPages.map((item) => (
                      <Link
                        key={item.title}
                        to={item.href}
                        onClick={() => setOpenDropdown(null)}
                        className="group flex items-start justify-between rounded-2xl p-3.5 transition-colors hover:bg-zinc-50 dark:hover:bg-white/5"
                      >
                        <div>
                          <div className="text-sm font-semibold text-zinc-900 transition-colors group-hover:text-[color:var(--brand-primary,#7C3AED)] dark:text-white">
                            {item.title}
                          </div>
                          <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                            {item.desc}
                          </div>
                        </div>
                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--brand-primary,#7C3AED)]" />
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {openDropdown === "all" && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full right-0 left-0 z-50 pt-3"
              >
                <div className="rounded-[32px] border border-black/[0.08] bg-white p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] sm:p-8 dark:border-white/10 dark:bg-zinc-900">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:col-span-8">
                      <div>
                        <div className="mb-3 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                          Core & Detail Pages
                        </div>
                        <ul className="space-y-2 text-sm">
                          {[
                            { label: "Home Demo", slug: `/demos/${activeNicheSlug}` },
                            { label: "About Studio", slug: `/demos/${activeNicheSlug}/about` },
                            {
                              label: "Services Overview",
                              slug: `/demos/${activeNicheSlug}/services`,
                            },
                            {
                              label: "Service Details",
                              slug: `/demos/${activeNicheSlug}/service-detail`,
                            },
                            {
                              label: "Projects Gallery",
                              slug: `/demos/${activeNicheSlug}/portfolio`,
                            },
                            {
                              label: "Project Details",
                              slug: `/demos/${activeNicheSlug}/case-study-detail`,
                            },
                            {
                              label: "Process & Workflow",
                              slug: `/demos/${activeNicheSlug}/process`,
                            },
                            { label: "Pricing & Plans", slug: `/demos/${activeNicheSlug}/pricing` },
                          ].map((p) => (
                            <li key={p.label}>
                              <Link
                                to={p.slug}
                                onClick={() => setOpenDropdown(null)}
                                className="block py-0.5 font-medium text-zinc-600 transition-colors hover:text-[color:var(--brand-primary,#7C3AED)] dark:text-zinc-300 dark:hover:text-white"
                              >
                                {p.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="mb-3 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                          Editorial & Team
                        </div>
                        <ul className="space-y-2 text-sm">
                          {[
                            { label: "Blog Listing", slug: `/demos/${activeNicheSlug}/blog` },
                            {
                              label: "Blog Article Detail",
                              slug: `/demos/${activeNicheSlug}/blog-post-detail`,
                            },
                            { label: "Team Leadership", slug: `/demos/${activeNicheSlug}/team` },
                            { label: "Careers & Perks", slug: `/demos/${activeNicheSlug}/careers` },
                            {
                              label: "Client Portal",
                              slug: `/demos/${activeNicheSlug}/client-portal`,
                            },
                            {
                              label: "Integrations Hub",
                              slug: `/demos/${activeNicheSlug}/integrations`,
                            },
                            {
                              label: "Changelog Releases",
                              slug: `/demos/${activeNicheSlug}/changelog`,
                            },
                            {
                              label: "Contact & Booking",
                              slug: `/demos/${activeNicheSlug}/contact`,
                            },
                          ].map((p) => (
                            <li key={p.label}>
                              <Link
                                to={p.slug}
                                onClick={() => setOpenDropdown(null)}
                                className="block py-0.5 font-medium text-zinc-600 transition-colors hover:text-[color:var(--brand-primary,#7C3AED)] dark:text-zinc-300 dark:hover:text-white"
                              >
                                {p.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="mb-3 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                          Auth, OTP & Utility (9)
                        </div>
                        <ul className="space-y-2 text-sm">
                          {[
                            {
                              label: "Sign In / Login",
                              slug: `/demos/${activeNicheSlug}/sign-in`,
                              badge: "Auth",
                            },
                            {
                              label: "Create Account / Register",
                              slug: `/demos/${activeNicheSlug}/sign-up`,
                              badge: "Auth",
                            },
                            {
                              label: "Forgot / Reset Password",
                              slug: `/demos/${activeNicheSlug}/forgot-password`,
                            },
                            {
                              label: "OTP 2FA Verification",
                              slug: `/demos/${activeNicheSlug}/otp`,
                              badge: "New",
                            },
                            { label: "Privacy Policy", slug: `/demos/${activeNicheSlug}/privacy` },
                            {
                              label: "Terms & Conditions",
                              slug: `/demos/${activeNicheSlug}/terms`,
                            },
                            { label: "Coming Soon", slug: `/demos/${activeNicheSlug}/coming-soon` },
                            {
                              label: "System Maintenance",
                              slug: `/demos/${activeNicheSlug}/maintenance`,
                              badge: "New",
                            },
                            { label: "404 Error Page", slug: `/demos/${activeNicheSlug}/404` },
                          ].map((p) => (
                            <li key={p.label}>
                              <Link
                                to={p.slug}
                                onClick={() => setOpenDropdown(null)}
                                className="flex items-center justify-between py-0.5 font-medium text-zinc-600 transition-colors hover:text-[color:var(--brand-primary,#7C3AED)] dark:text-zinc-300 dark:hover:text-white"
                              >
                                <span>{p.label}</span>
                                {p.badge && (
                                  <span className="rounded-full bg-[#C8F560] px-2 py-0.5 text-[10px] font-bold text-[#0D0F14]">
                                    {p.badge}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right 4 cols: Switch Flagship Pre-built Website Demos */}
                    <div className="flex flex-col justify-between rounded-2xl border border-black/[0.05] bg-zinc-50 p-5 lg:col-span-4 dark:border-white/10 dark:bg-white/[0.04]">
                      <div>
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                            Flagship Archetypes
                          </span>
                          <button
                            type="button"
                            onClick={() => setOpenDropdown("demos47")}
                            className="cursor-pointer text-xs font-semibold text-zinc-900 hover:underline dark:text-[#C8F560]"
                          >
                            All 47 Templates →
                          </button>
                        </div>
                        <div className="space-y-1.5">
                          {allNiches.map((n) => (
                            <Link
                              key={n.slug}
                              to={`/demos/${n.slug}`}
                              onClick={() => setOpenDropdown(null)}
                              className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-all ${
                                n.slug === activeNicheSlug
                                  ? "bg-zinc-900 font-semibold text-white dark:bg-[#C8F560] dark:text-[#0D0F14]"
                                  : "text-zinc-700 hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10"
                              }`}
                            >
                              <span>{n.name}</span>
                              <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: n.theme.brandPrimary }}
                              />
                            </Link>
                          ))}
                          <Link
                            to="/demos/property-management-software"
                            onClick={() => setOpenDropdown(null)}
                            className="flex items-center justify-between rounded-xl px-3 py-2 text-xs text-zinc-700 transition-all hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10"
                          >
                            <span>Property Management Software</span>
                            <span className="h-2.5 w-2.5 rounded-full bg-[#2EA3F2]" />
                          </Link>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-black/[0.06] pt-3 text-xs text-zinc-500 dark:border-white/10">
                        <span>47 Demos × 29+ Inner Routes</span>
                        <span className="font-semibold text-emerald-600 dark:text-[#C8F560]">
                          HudbirdUI v4.2
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 max-h-[80vh] space-y-5 overflow-y-auto rounded-3xl border border-black/[0.08] bg-white p-5 shadow-2xl lg:hidden dark:border-white/10 dark:bg-zinc-900"
            >
              <div className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                Core & Auth Pages
              </div>
              <div className="grid grid-cols-2 gap-2">
                {companyPages
                  .concat([
                    { title: "Sign In", desc: "Auth", href: `/demos/${activeNicheSlug}/sign-in` },
                    { title: "Register", desc: "Auth", href: `/demos/${activeNicheSlug}/sign-up` },
                    { title: "OTP Verify", desc: "2FA", href: `/demos/${activeNicheSlug}/otp` },
                    {
                      title: "Coming Soon",
                      desc: "Launch",
                      href: `/demos/${activeNicheSlug}/coming-soon`,
                    },
                  ])
                  .map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-xl bg-zinc-50 p-2.5 text-xs font-semibold text-zinc-900 dark:bg-white/5 dark:text-white"
                    >
                      {item.title}
                    </Link>
                  ))}
              </div>
              <div className="pt-2">
                <PillLink
                  href={data.primaryCta?.href || `/demos/${activeNicheSlug}/contact`}
                  variant="brand"
                  size="md"
                  fullWidth
                >
                  {data.primaryCta?.label || "Get started"}
                </PillLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
