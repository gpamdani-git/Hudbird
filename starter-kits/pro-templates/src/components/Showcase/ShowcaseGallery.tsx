import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { PREBUILT_47_TEMPLATES, PrebuiltTemplateMeta, INNER_PAGES_MATRIX } from "@hudbird/schemas";
import {
  ArrowUpRight,
  Search,
  LayoutGrid,
  Layers,
  Sparkles,
  ShieldCheck,
  Maximize2,
} from "lucide-react";
import { getTemplatePexelsPack, PEXELS } from "../nexus-sections/HudbirdVisualWidgets";
import { HudbirdTemplateLogoIcon } from "../nexus-sections/HudbirdKit";

interface FlagshipLandingTemplate {
  id: string;
  name: string;
  category: string;
  badge?: string;
  accent: string;
  slugSymbol: string;
  lightImage: string;
  darkImage: string;
  mainPath: string;
  subPages: { name: string; path: string }[];
}

const FLAGSHIP_LANDING_TEMPLATES: FlagshipLandingTemplate[] = [
  {
    id: "vibecode-ui-library",
    name: "Vibecode UI & Shader Library",
    category: "UI & Code Library · 3D Fan Deck, Shaders, Blocks & Demos",
    badge: "New Theme",
    accent: "#7C3AED",
    slugSymbol: "vibecode-ui",
    lightImage: "/assets/templates/vibecode-ui-light.png",
    darkImage: "/assets/templates/vibecode-ui.png",
    mainPath: "/vibecode-ui",
    subPages: [
      { name: "Home", path: "/vibecode-ui" },
      { name: "Demos", path: "/vibecode-ui/demos" },
      { name: "3D Blocks", path: "/vibecode-ui/blocks" },
      { name: "Shaders", path: "/vibecode-ui/shaders" },
      { name: "Sections", path: "/vibecode-ui/sections" },
      { name: "Pricing", path: "/vibecode-ui/pricing" },
    ],
  },
  {
    id: "nexus-digital-agency",
    name: "Digital Agency (Nexus Flagship)",
    category: "Flagship Agency · 47 Niches & 29+ Inner Pages",
    badge: "Flagship",
    accent: "#7C3AED",
    slugSymbol: "digital-agency",
    lightImage: "/assets/templates/prebuilt/digital-agency.jpg",
    darkImage: "/assets/templates/prebuilt/digital-agency.jpg",
    mainPath: "/demos/digital-agency",
    subPages: [
      { name: "Home", path: "/demos/digital-agency" },
      { name: "About", path: "/demos/digital-agency/about" },
      { name: "Services", path: "/demos/digital-agency/services" },
      { name: "Portfolio", path: "/demos/digital-agency/portfolio" },
      { name: "Pricing", path: "/demos/digital-agency/pricing" },
      { name: "Auth & OTP", path: "/demos/digital-agency/sign-in" },
    ],
  },
  {
    id: "saas-launchpad",
    name: "SaaS Launchpad",
    category: "B2B Software & Cloud Platform",
    badge: "Multi-Page",
    accent: "#6366F1",
    slugSymbol: "cloud-software",
    lightImage: "/assets/templates/saas-launchpad-light.png",
    darkImage: "/assets/templates/saas-launchpad.png",
    mainPath: "/saas-launchpad",
    subPages: [
      { name: "Home", path: "/saas-launchpad" },
      { name: "Features", path: "/saas-launchpad/features" },
      { name: "Pricing", path: "/saas-launchpad/pricing" },
      { name: "About", path: "/saas-launchpad/about" },
      { name: "Contact", path: "/saas-launchpad/contact" },
    ],
  },
  {
    id: "ai-startup",
    name: "AI Startup",
    category: "Artificial Intelligence & Neural SaaS",
    badge: "Popular",
    accent: "#84CC16",
    slugSymbol: "ai-saas-software",
    lightImage: "/assets/templates/ai-startup-light.png",
    darkImage: "/assets/templates/ai-startup.png",
    mainPath: "/ai-startup",
    subPages: [
      { name: "Home", path: "/ai-startup" },
      { name: "Features", path: "/ai-startup/features" },
      { name: "Pricing", path: "/ai-startup/pricing" },
      { name: "About", path: "/ai-startup/about" },
      { name: "Contact", path: "/ai-startup/contact" },
    ],
  },
  {
    id: "modern-app",
    name: "Modern App",
    category: "Mobile & Consumer Product Showcase",
    accent: "#2EA3F2",
    slugSymbol: "mobile-management",
    lightImage: "/assets/templates/modern-app-light.png",
    darkImage: "/assets/templates/modern-app.png",
    mainPath: "/modern-app",
    subPages: [
      { name: "Home", path: "/modern-app" },
      { name: "Features", path: "/modern-app/features" },
      { name: "Pricing", path: "/modern-app/pricing" },
      { name: "About", path: "/modern-app/about" },
      { name: "Contact", path: "/modern-app/contact" },
    ],
  },
  {
    id: "ecommerce",
    name: "Luxury Ecommerce",
    category: "Retail, DTC Brand & Editorial Store",
    accent: "#F97316",
    slugSymbol: "pos-system",
    lightImage: "/assets/templates/ecommerce-light.png",
    darkImage: "/assets/templates/ecommerce.png",
    mainPath: "/ecommerce",
    subPages: [
      { name: "Home", path: "/ecommerce" },
      { name: "Shop", path: "/ecommerce/shop" },
      { name: "Collections", path: "/ecommerce/collections" },
      { name: "About", path: "/ecommerce/about" },
      { name: "Contact", path: "/ecommerce/contact" },
    ],
  },
  {
    id: "fintech",
    name: "Fintech & Banking",
    category: "Treasury, Payments & Wealth OS",
    accent: "#10B981",
    slugSymbol: "financial-management-platform",
    lightImage: "/assets/templates/fintech-light.png",
    darkImage: "/assets/templates/fintech.png",
    mainPath: "/fintech",
    subPages: [
      { name: "Home", path: "/fintech" },
      { name: "Solutions", path: "/fintech/solutions" },
      { name: "Security", path: "/fintech/security" },
      { name: "Pricing", path: "/fintech/pricing" },
      { name: "Contact", path: "/fintech/contact" },
    ],
  },
  {
    id: "hospitality",
    name: "Boutique Hospitality",
    category: "Luxury Resort & Architectural Villas",
    accent: "#F59E0B",
    slugSymbol: "property-management-software",
    lightImage: "/assets/templates/hospitality-light.png",
    darkImage: "/assets/templates/hospitality.png",
    mainPath: "/hospitality",
    subPages: [
      { name: "Home", path: "/hospitality" },
      { name: "Rooms", path: "/hospitality/rooms" },
      { name: "Dining", path: "/hospitality/dining" },
      { name: "Experiences", path: "/hospitality/experiences" },
      { name: "Contact", path: "/hospitality/contact" },
    ],
  },
  {
    id: "agency",
    name: "Creative Studio Agency",
    category: "Brand Direction & Case Study Portfolio",
    accent: "#EC4899",
    slugSymbol: "creative-portfolio",
    lightImage: "/assets/templates/agency-light.png",
    darkImage: "/assets/templates/agency.png",
    mainPath: "/agency",
    subPages: [
      { name: "Home", path: "/agency" },
      { name: "Work", path: "/agency/work" },
      { name: "Services", path: "/agency/services" },
      { name: "About", path: "/agency/about" },
      { name: "Contact", path: "/agency/contact" },
    ],
  },
];

const ADMIN_CMS_SUITES = [
  {
    id: "admin-cms",
    name: "Hudbird Executive Dashboard",
    category: "Admin CMS · Analytics, Posts, Media & Site Builder",
    path: "/dashboard",
    metric: "6 Live Modules",
    accent: "#7C3AED",
    lightImage: "/assets/templates/admin-cms-light.png",
    darkImage: "/assets/templates/admin-cms.png",
    isNew: true,
    subRoutes: [
      { name: "Overview", path: "/dashboard" },
      { name: "Analytics", path: "/dashboard/analytics" },
      { name: "Posts", path: "/dashboard/posts" },
      { name: "Media", path: "/dashboard/media" },
      { name: "Site Builder", path: "/dashboard/site-builder" },
      { name: "Settings", path: "/dashboard/settings" },
    ],
  },
  {
    id: "admin-mail",
    name: "Hudbird AI Mail Client",
    category: "Workspace App · Smart Inbox & Auto-Triage",
    path: "/ai-mail",
    metric: "AI Auto-Triage",
    accent: "#2EA3F2",
    lightImage: "/assets/templates/prebuilt/admin-mail.jpg",
    darkImage: "/assets/templates/prebuilt/admin-mail.jpg",
    isNew: true,
    subRoutes: [
      { name: "Smart Inbox", path: "/ai-mail" },
      { name: "Priority Triage", path: "/ai-mail" },
      { name: "AI Drafts", path: "/ai-mail" },
    ],
  },
  {
    id: "admin-ai-chat",
    name: "Hudbird AI Copilot Chat",
    category: "Workspace App · Multi-Model Prompt Canvas",
    path: "/ai-chat",
    metric: "Streaming LLM",
    accent: "#84CC16",
    lightImage: "/assets/templates/prebuilt/admin-ai-chat.jpg",
    darkImage: "/assets/templates/prebuilt/admin-ai-chat.jpg",
    isNew: true,
    subRoutes: [
      { name: "Prompt Studio", path: "/ai-chat" },
      { name: "Code Artifact", path: "/ai-chat" },
      { name: "Multi-Agent", path: "/ai-chat" },
    ],
  },
];

export function ShowcaseGallery() {
  const [activeView, setActiveView] = useState<"websites" | "inner">("websites");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filterPills = [
    { id: "all", label: "All 47 Websites" },
    { id: "new", label: "New Releases (12)" },
    { id: "ai", label: "AI & Automation (16)" },
    { id: "fintech", label: "Fintech & Wealth (11)" },
    { id: "agency", label: "Agency, SaaS & CRM (11)" },
    { id: "cyber", label: "Cyber & Cloud (5)" },
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
    <section
      id="templates"
      className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-20 sm:px-6 lg:px-8"
    >
      {/* =====================================================================
          SECTION 1: 8 FLAGSHIP MULTI-PAGE LANDING PAGES (3-COLUMN LUXURY GRID)
      ===================================================================== */}
      <div id="landing-pages" className="mb-24 scroll-mt-28">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl space-y-2.5">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#C8F560] px-3.5 py-1 text-xs font-bold text-[#0D0F14]">
              <Sparkles className="h-3.5 w-3.5" />9 Flagship Multi-Page Landing Themes
            </span>
            <h2 className="text-3xl leading-[1.08] font-semibold tracking-[-0.035em] text-zinc-900 sm:text-4xl dark:text-white">
              Flagship Landing Page Suites
            </h2>
            <p className="text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
              Complete multi-page marketing systems with dedicated inner routes, real browser
              screenshots, and light/dark theme support.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 self-start rounded-full border border-black/[0.06] bg-white px-4 py-2 text-xs font-semibold text-zinc-700 sm:self-auto dark:border-white/10 dark:bg-[#14161E] dark:text-zinc-300">
            <span>9 Multi-Page Suites · 3 Per Row</span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FLAGSHIP_LANDING_TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              className="group flex flex-col justify-between rounded-[28px] border border-black/[0.06] bg-white p-3.5 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-[#14161E] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            >
              <div>
                <Link
                  to={tpl.mainPath}
                  className="relative block aspect-[16/10] w-full overflow-hidden rounded-[20px] border border-black/[0.06] bg-zinc-900 dark:border-white/10"
                >
                  {/* Light Mode Real Screenshot */}
                  <img
                    src={tpl.lightImage}
                    alt={tpl.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] dark:hidden"
                  />
                  {/* Dark Mode Real Screenshot */}
                  <img
                    src={tpl.darkImage}
                    alt={tpl.name}
                    loading="lazy"
                    className="hidden h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] dark:block"
                  />

                  <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="rounded-full bg-black/75 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                      {tpl.subPages.length} Included Routes
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#C8F560] px-3.5 py-1.5 text-xs font-bold text-[#0D0F14] shadow-lg">
                      <span>Open Demo</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>

                {/* Title + Domain Icon + Badge */}
                <div className="flex items-center justify-between gap-3 px-2 pt-4 pb-2">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-black/[0.06] dark:border-white/10"
                      style={{
                        backgroundColor: `${tpl.accent}18`,
                        color: tpl.accent,
                      }}
                    >
                      <HudbirdTemplateLogoIcon slug={tpl.slugSymbol} className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <Link
                        to={tpl.mainPath}
                        className="block truncate text-[15px] font-semibold text-zinc-900 transition-colors group-hover:text-black dark:text-white dark:group-hover:text-[#C8F560]"
                      >
                        {tpl.name}
                      </Link>
                      <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                        {tpl.category}
                      </p>
                    </div>
                  </div>

                  {tpl.badge && (
                    <span className="shrink-0 rounded-full bg-[#C8F560] px-2.5 py-0.5 text-[11px] font-bold text-[#0D0F14]">
                      {tpl.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Direct Sub-Page Pills */}
              <div className="mt-2 flex flex-wrap gap-1.5 border-t border-black/[0.05] px-2 pt-2.5 dark:border-white/[0.07]">
                {tpl.subPages.map((sub) => (
                  <Link
                    key={sub.path}
                    to={sub.path}
                    className="rounded-full bg-[#F4F5F8] px-2.5 py-1 text-[11px] font-medium text-zinc-600 transition-colors hover:bg-[#C8F560] hover:text-[#0D0F14] dark:bg-white/[0.05] dark:text-zinc-300 dark:hover:bg-[#C8F560] dark:hover:text-[#0D0F14]"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================================
          SECTION 2: 47+ PRE-BUILT MULTIPURPOSE WEBSITES (3-COLUMN LUXURY GRID)
      ===================================================================== */}
      <div className="border-t border-black/[0.08] pt-20 dark:border-white/10">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#C8F560] px-3.5 py-1 text-xs font-bold text-[#0D0F14]">
              <Sparkles className="h-3.5 w-3.5" />
              47+ Pre-Built Websites · Real Browser Screenshots
            </span>
            <h2 className="text-3xl leading-[1.08] font-semibold tracking-[-0.035em] text-zinc-900 sm:text-4xl lg:text-[2.75rem] dark:text-white">
              Explore all 47+ pre-built websites
            </h2>
            <p className="text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
              Every template features its own real live screenshot, custom domain logo icon,
              interactive playground, ROI calculator, and 29+ inner/auth pages.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
            {/* Button to Open Fullscreen Popup */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("hudbird:open-demos-modal"))}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-zinc-900 px-4 py-2.5 text-xs font-semibold whitespace-nowrap text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-zinc-950"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Open Fullscreen Popup</span>
            </button>

            {/* View Switcher: 47 Websites vs 29+ Inner Pages */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.06] bg-white p-1.5 dark:border-white/10 dark:bg-[#14161E]">
              <button
                type="button"
                onClick={() => setActiveView("websites")}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                  activeView === "websites"
                    ? "bg-[#C8F560] text-[#0D0F14] shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>47 Pre-built Websites</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveView("inner")}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                  activeView === "inner"
                    ? "bg-[#C8F560] text-[#0D0F14] shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>29+ Inner & Auth Pages</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills + Live Search Row */}
        <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          {activeView === "websites" ? (
            <div className="flex flex-wrap items-center gap-2">
              {filterPills.map((pill) => {
                const active = selectedFilter === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setSelectedFilter(pill.id)}
                    className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                      active
                        ? "bg-zinc-900 text-white dark:bg-[#C8F560] dark:text-[#0D0F14]"
                        : "border border-black/[0.06] bg-white text-zinc-600 hover:bg-zinc-100 dark:border-white/10 dark:bg-[#14161E] dark:text-zinc-300 dark:hover:bg-white/10"
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Showing all 29+ inner, company, portfolio, pricing, blog, 6-digit OTP, auth, and legal
              templates.
            </div>
          )}

          <div className="relative w-full shrink-0 lg:w-72">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeView === "websites"
                  ? "Search 47 pre-built websites..."
                  : "Search 29+ inner & auth pages..."
              }
              className="w-full rounded-full border border-black/[0.08] bg-white py-2.5 pr-4 pl-10 text-xs text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-[#C8F560] focus:outline-none dark:border-white/10 dark:bg-[#14161E] dark:text-white"
            />
          </div>
        </div>

        {/* 3-Column Luxury Cards Grid with Real Captured Screenshots */}
        {activeView === "websites" ? (
          <div className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredWebsites.map((tpl: PrebuiltTemplateMeta) => {
              const displayTitle = tpl.title || tpl.name || tpl.slug;
              const pack = getTemplatePexelsPack(tpl.slug, tpl.archetype);
              const realScreenshotUrl = `/assets/templates/prebuilt/${tpl.slug}.jpg`;

              return (
                <Link
                  key={tpl.slug}
                  to={`/demos/${tpl.slug}`}
                  className="group flex flex-col rounded-[28px] border border-black/[0.06] bg-white p-3.5 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-[#14161E] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
                >
                  {/* Real Captured Browser Screenshot Window */}
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

                    {/* Hover Overlay with Live Metric & Open CTA */}
                    <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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

                  {/* Bottom Caption Row: Relevant Domain Logo Icon + Title + Lime "New" Badge */}
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
                      <span className="shrink-0 rounded-full bg-[#C8F560] px-2.5 py-0.5 text-[11px] leading-tight font-bold text-[#0D0F14]">
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
          /* 29+ Inner, Auth & OTP Pages Grid (3-Column Luxury Grid with Real Screenshots) */
          <div className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredInnerPages.map((page, idx) => {
              const subSlug = page.slug.replace(/^\/+/, "").replace(/^demos\/[^/]+\//, "");
              const fallbackThumb = PEXELS.projects[idx % PEXELS.projects.length];
              const realInnerShot = `/assets/templates/inner/${page.id}.jpg`;
              const isUtility = page.category === "utility";
              return (
                <Link
                  key={page.id}
                  to={`/demos/digital-agency/${subSlug}`}
                  className="group flex flex-col justify-between rounded-[28px] border border-black/[0.06] bg-white p-3.5 transition-all hover:-translate-y-1.5 hover:shadow-xl dark:border-white/10 dark:bg-[#14161E]"
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
                    <span
                      className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase shadow-xs ${
                        isUtility ? "bg-[#C8F560] text-[#0D0F14]" : "bg-white/95 text-zinc-950"
                      }`}
                    >
                      {page.category}
                    </span>
                  </div>
                  <div className="p-3 pt-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-[15px] font-semibold text-zinc-900 group-hover:text-zinc-600 dark:text-white dark:group-hover:text-[#C8F560]">
                        {page.title}
                      </h3>
                      {isUtility ? (
                        <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-400" />
                      )}
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
                      {page.shortDesc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* =====================================================================
          SECTION 3: ADMIN CMS & AI WORKSPACE SUITES (3-COLUMN LUXURY GRID)
      ===================================================================== */}
      <div
        id="admin-cms"
        className="scroll-mt-28 border-t border-black/[0.08] pt-16 dark:border-white/10"
      >
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="mb-2.5 inline-flex items-center gap-2 rounded-full bg-[#C8F560] px-3.5 py-1 text-xs font-bold text-[#0D0F14]">
              <Sparkles className="h-3.5 w-3.5" />
              Admin CMS & AI Workspace Suites
            </span>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Admin CMS, Analytics & AI Applications
            </h2>
            <p className="mt-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
              Full-screen interactive executive dashboards, visual site builders, and AI
              applications.
            </p>
          </div>
          <span className="self-start rounded-full bg-[#C8F560] px-3.5 py-1.5 text-xs font-bold text-[#0D0F14] sm:self-auto">
            {ADMIN_CMS_SUITES.length} Interactive Suites
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ADMIN_CMS_SUITES.map((suite) => (
            <div
              key={suite.id}
              className="group flex flex-col justify-between rounded-[28px] border border-black/[0.06] bg-white p-3.5 transition-all hover:-translate-y-1.5 hover:shadow-xl dark:border-white/10 dark:bg-[#14161E]"
            >
              <div>
                <Link
                  to={suite.path}
                  className="relative block aspect-[16/10] w-full overflow-hidden rounded-[20px] border border-black/[0.06] bg-zinc-950 dark:border-white/10"
                >
                  <img
                    src={suite.lightImage}
                    alt={suite.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] dark:hidden"
                  />
                  <img
                    src={suite.darkImage}
                    alt={suite.name}
                    loading="lazy"
                    className="hidden h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] dark:block"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                        {suite.metric}
                      </span>
                      <span className="rounded-full bg-[#C8F560] px-2.5 py-0.5 text-[10px] font-bold text-[#0D0F14]">
                        New
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-white">
                      <span className="text-xs font-medium text-zinc-200">{suite.category}</span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-950 transition-colors group-hover:bg-[#C8F560]">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center justify-between px-2 pt-4 pb-2">
                  <Link
                    to={suite.path}
                    className="text-base font-semibold text-zinc-900 transition-colors group-hover:text-black dark:text-white dark:group-hover:text-[#C8F560]"
                  >
                    {suite.name}
                  </Link>
                  <Link
                    to={suite.path}
                    className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-[#C8F560]"
                  >
                    Launch ↗
                  </Link>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5 border-t border-black/[0.05] px-2 pt-2.5 dark:border-white/[0.07]">
                {suite.subRoutes.map((sub) => (
                  <Link
                    key={sub.name}
                    to={sub.path}
                    className="rounded-full bg-[#F4F5F8] px-2.5 py-1 text-[11px] font-medium text-zinc-600 transition-colors hover:bg-[#C8F560] hover:text-[#0D0F14] dark:bg-white/[0.05] dark:text-zinc-300"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
