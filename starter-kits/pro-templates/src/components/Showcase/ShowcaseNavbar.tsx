import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@hudbird/ui";
import { PREBUILT_47_TEMPLATES, PrebuiltTemplateMeta } from "@hudbird/schemas";
import {
  ChevronDown,
  Moon,
  Sun,
  ArrowRight,
  ArrowUpRight,
  LayoutGrid,
  Component,
  LayoutTemplate,
  Search,
  Sparkles,
} from "lucide-react";
import { HudbirdTemplateLogoIcon } from "../nexus-sections/HudbirdKit";

const MEGAMENU_DATA = {
  landingPages: [
    {
      title: "Vibecode UI & Shader Library",
      desc: "3D Fan Deck, Shaders, Blocks & Code Library",
      path: "/vibecode-ui",
      badge: "New",
    },
    {
      title: "Digital Agency (Nexus Flagship)",
      desc: "Flagship Agency & Studio System",
      path: "/demos/digital-agency",
      badge: "Flagship",
    },
    {
      title: "SaaS Launchpad",
      desc: "B2B Software & Product Suite",
      path: "/saas-launchpad",
    },
    {
      title: "AI Startup",
      desc: "Next-Gen Neural & LLM Platform",
      path: "/ai-startup",
      badge: "Popular",
    },
    {
      title: "Modern App",
      desc: "Consumer Mobile & Desktop Showcase",
      path: "/modern-app",
    },
    {
      title: "Ecommerce",
      desc: "Luxury Retail & Storefront System",
      path: "/ecommerce",
    },
    {
      title: "Fintech",
      desc: "Modern Banking & Treasury OS",
      path: "/fintech",
    },
    {
      title: "Hospitality",
      desc: "Boutique Resort & Architectural Stays",
      path: "/hospitality",
    },
    {
      title: "Creative Agency",
      desc: "Design & Brand Direction Studio",
      path: "/agency",
    },
  ],
  coreUI: [
    { title: "Core Components", path: "https://hudbirdui.com/docs", icon: Component },
    { title: "Block Gallery", path: "https://hudbirdui.com/blocks", icon: LayoutGrid },
    {
      title: "Chart Library",
      path: "https://hudbirdui.com/charts",
      icon: LayoutTemplate,
    },
  ],
  innerPages: {
    company: [
      { title: "About Studio", path: "/demos/digital-agency/about" },
      { title: "Services Overview", path: "/demos/digital-agency/services" },
      { title: "Service Details", path: "/demos/digital-agency/service-detail" },
      { title: "Team Leadership", path: "/demos/digital-agency/team" },
      { title: "Careers & Perks", path: "/demos/digital-agency/careers" },
      { title: "Contact & Booking", path: "/demos/digital-agency/contact" },
    ],
    showcase: [
      { title: "Selected Projects", path: "/demos/digital-agency/portfolio" },
      { title: "Case Study Detail", path: "/demos/digital-agency/case-study-detail" },
      { title: "Process & Workflow", path: "/demos/digital-agency/process" },
      { title: "Pricing Plans", path: "/demos/digital-agency/pricing" },
      { title: "Client Portal", path: "/demos/digital-agency/client-portal" },
      { title: "Integrations Hub", path: "/demos/digital-agency/integrations" },
    ],
    editorial: [
      { title: "Blog & Journal", path: "/demos/digital-agency/blog" },
      { title: "Blog Post Detail", path: "/demos/digital-agency/blog-post-detail" },
      { title: "Changelog Releases", path: "/demos/digital-agency/changelog" },
      { title: "Privacy Policy (Sticky)", path: "/demos/digital-agency/privacy", badge: "Sticky" },
      { title: "Terms & Conditions", path: "/demos/digital-agency/terms" },
    ],
    auth: [
      { title: "Sign In / Login", path: "/demos/digital-agency/sign-in", badge: "Auth" },
      { title: "Create Account / Register", path: "/demos/digital-agency/sign-up", badge: "Auth" },
      { title: "Forgot Password", path: "/demos/digital-agency/forgot-password" },
      { title: "6-Digit OTP Verify", path: "/demos/digital-agency/otp", badge: "New" },
      { title: "Coming Soon", path: "/demos/digital-agency/coming-soon" },
      { title: "System Maintenance", path: "/demos/digital-agency/maintenance", badge: "New" },
      { title: "404 Error Page", path: "/demos/digital-agency/404" },
    ],
  },
  admin: [
    { title: "Executive Dashboard", path: "/dashboard", badge: "CMS" },
    { title: "Hudbird AI Mail Client", path: "/ai-mail", badge: "New" },
    { title: "Hudbird AI Copilot Chat", path: "/ai-chat", badge: "New" },
    { title: "Analytics & Telemetry", path: "/dashboard/analytics" },
    { title: "Blog & Posts Manager", path: "/dashboard/posts" },
    { title: "Media Asset Library", path: "/dashboard/media" },
    { title: "Visual Site Builder", path: "/dashboard/site-builder" },
    { title: "System Settings", path: "/dashboard/settings" },
  ],
};

export function ShowcaseNavbar() {
  const [isDark, setIsDark] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [demoSearch, setDemoSearch] = useState("");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const shouldBeDark = storedTheme === "dark" || storedTheme === null;

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
      if (storedTheme === null) {
        localStorage.setItem("theme", "dark");
      }
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const isDarkMode = document.documentElement.classList.toggle("dark");
    setIsDark(isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  };

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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 flex w-full items-center justify-center px-4 py-3.5 sm:px-6 lg:px-8"
    >
      <div
        onMouseLeave={() => setActiveMenu(null)}
        className="relative flex w-full max-w-[1320px] items-center justify-between gap-2 rounded-full border border-black/[0.06] bg-white/95 px-4 py-2.5 shadow-[0_12px_36px_-8px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:px-5 dark:border-white/10 dark:bg-[#11131B]/95"
      >
        {/* Brand Logo (Single Line, Never Wraps) */}
        <Link to="/" className="flex shrink-0 items-center gap-2.5 whitespace-nowrap">
          <img
            src="/assets/new-logo/hudbirdui-icon-black.svg"
            alt="Hudbird UI"
            className="h-7 w-7 shrink-0 dark:hidden"
          />
          <img
            src="/assets/new-logo/hudbirdui-icon-white.svg"
            alt="Hudbird UI"
            className="hidden h-7 w-7 shrink-0 dark:block"
          />
          <span className="font-heading flex items-center gap-2 text-base font-bold tracking-tight whitespace-nowrap text-zinc-900 sm:text-lg dark:text-white">
            <span>HudbirdUI</span>
            <span className="rounded-full bg-[#C8F560] px-2 py-0.5 text-[10px] leading-none font-bold whitespace-nowrap text-[#0D0F14]">
              PRO 4.2
            </span>
          </span>
        </Link>

        {/* Desktop Single-Line Navigation */}
        <nav className="hidden items-center gap-1 lg:flex xl:gap-1.5">
          {/* 1. Landing Pages (8 Flagship Themes) */}
          <div className="relative" onMouseEnter={() => setActiveMenu("landingPages")}>
            <button
              type="button"
              onClick={() => setActiveMenu(activeMenu === "landingPages" ? null : "landingPages")}
              className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors ${
                activeMenu === "landingPages"
                  ? "bg-zinc-100 text-zinc-900 dark:bg-white/10 dark:text-white"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              }`}
            >
              <span>Landing Pages</span>
              <span className="rounded-full bg-zinc-200/80 px-1.5 py-0.5 text-[10px] leading-none font-semibold text-zinc-800 dark:bg-white/10 dark:text-zinc-200">
                9
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${
                  activeMenu === "landingPages" ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {activeMenu === "landingPages" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 mt-3 w-[540px] overflow-hidden rounded-[28px] border border-black/[0.08] bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-[#11131B]"
                >
                  <div className="mb-3 flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-white/10">
                    <div>
                      <h4 className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                        9 Flagship Landing Pages
                      </h4>
                      <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                        Vibecode UI Library, Digital Agency Nexus + Flagship Multi-Page Suites
                      </p>
                    </div>
                    <a
                      href="#landing-pages"
                      onClick={() => setActiveMenu(null)}
                      className="text-xs font-semibold whitespace-nowrap text-zinc-900 hover:underline dark:text-[#C8F560]"
                    >
                      View Grid ↓
                    </a>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {MEGAMENU_DATA.landingPages.map((item) => (
                      <Link
                        key={item.title}
                        to={item.path}
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col justify-between rounded-2xl p-3 transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.06]"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-[13px] font-semibold text-zinc-900 group-hover:text-black dark:text-white dark:group-hover:text-[#C8F560]">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="shrink-0 rounded-full bg-[#C8F560] px-2 py-0.5 text-[9.5px] font-bold text-[#0D0F14]">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <span className="mt-0.5 truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                          {item.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. 47+ Prebuilt Websites Mega Menu */}
          <div className="relative" onMouseEnter={() => setActiveMenu("prebuilt")}>
            <button
              type="button"
              onClick={() => setActiveMenu(activeMenu === "prebuilt" ? null : "prebuilt")}
              className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors ${
                activeMenu === "prebuilt"
                  ? "bg-zinc-100 text-zinc-900 dark:bg-white/10 dark:text-white"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              }`}
            >
              <span>Pre-built Websites</span>
              <span className="rounded-full bg-[#C8F560] px-1.5 py-0.5 text-[10px] leading-none font-bold text-[#0D0F14]">
                47
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${
                  activeMenu === "prebuilt" ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* 3. 29+ Inner, Auth & OTP Pages Menu */}
          <div className="relative" onMouseEnter={() => setActiveMenu("innerPages")}>
            <button
              type="button"
              onClick={() => setActiveMenu(activeMenu === "innerPages" ? null : "innerPages")}
              className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors ${
                activeMenu === "innerPages"
                  ? "bg-zinc-100 text-zinc-900 dark:bg-white/10 dark:text-white"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              }`}
            >
              <span>Inner & Auth</span>
              <span className="rounded-full bg-zinc-200/80 px-1.5 py-0.5 text-[10px] leading-none font-semibold text-zinc-800 dark:bg-white/10 dark:text-zinc-200">
                29+
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${
                  activeMenu === "innerPages" ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* 4. Admin CMS Pages Menu */}
          <div className="relative" onMouseEnter={() => setActiveMenu("admin")}>
            <button
              type="button"
              onClick={() => setActiveMenu(activeMenu === "admin" ? null : "admin")}
              className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors ${
                activeMenu === "admin"
                  ? "bg-zinc-100 text-zinc-900 dark:bg-white/10 dark:text-white"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              }`}
            >
              <span>Admin CMS</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${
                  activeMenu === "admin" ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {activeMenu === "admin" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 mt-3 w-[440px] -translate-x-1/2 overflow-hidden rounded-[28px] border border-black/[0.08] bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#11131B]"
                >
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {MEGAMENU_DATA.admin.map((item) => (
                      <Link
                        key={item.title}
                        to={item.path}
                        onClick={() => setActiveMenu(null)}
                        className="group flex items-center justify-between gap-2 rounded-xl p-2 transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.06]"
                      >
                        <span className="truncate text-[13px] font-medium text-zinc-800 transition-colors group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="shrink-0 rounded-full bg-[#C8F560] px-2 py-0.5 text-[9.5px] font-bold text-[#0D0F14]">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-zinc-100 pt-4 dark:border-white/10">
                    <Link
                      to="/demos/digital-agency/sign-in"
                      onClick={() => setActiveMenu(null)}
                      className="flex items-center justify-between rounded-xl bg-[#F4F5F8] px-4 py-3 text-xs font-semibold text-zinc-900 transition-colors hover:bg-[#C8F560] hover:text-[#0D0F14] dark:bg-white/[0.06] dark:text-white"
                    >
                      <span>Open Auth & 6-Digit OTP Suite</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 5. Core UI & Blocks Menu */}
          <div className="relative" onMouseEnter={() => setActiveMenu("coreUI")}>
            <button
              type="button"
              onClick={() => setActiveMenu(activeMenu === "coreUI" ? null : "coreUI")}
              className={`flex cursor-pointer items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors ${
                activeMenu === "coreUI"
                  ? "bg-zinc-100 text-zinc-900 dark:bg-white/10 dark:text-white"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              }`}
            >
              <span>Core UI</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${
                  activeMenu === "coreUI" ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {activeMenu === "coreUI" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-[520px] overflow-hidden rounded-[28px] border border-black/[0.08] bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#11131B]"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 mb-1 flex flex-col gap-1 border-b border-zinc-100 pb-3 dark:border-white/10">
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Developer Ecosystem
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Accessible components, marketing blocks, and interactive charts.
                      </p>
                    </div>
                    {MEGAMENU_DATA.coreUI.map((item) => (
                      <a
                        key={item.title}
                        href={item.path}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-3.5 rounded-2xl border border-transparent p-3.5 transition-colors hover:border-zinc-200 hover:bg-zinc-50 dark:hover:border-white/10 dark:hover:bg-white/[0.04]"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 group-hover:bg-[#C8F560] group-hover:text-[#0D0F14] dark:bg-white/10 dark:text-zinc-200">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                            {item.title}
                          </span>
                          <span className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                            View Docs <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right CTA & Theme Toggle (Single-Line, Never Wraps) */}
        <div className="flex shrink-0 items-center gap-2 whitespace-nowrap">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("hudbird:open-demos-modal"))}
            className="hidden cursor-pointer items-center gap-1.5 rounded-full bg-[#F4F5F8] px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-zinc-900 transition-colors hover:bg-[#C8F560] hover:text-[#0D0F14] sm:inline-flex dark:bg-white/[0.07] dark:text-white"
          >
            <LayoutGrid className="h-3.5 w-3.5 shrink-0" />
            <span>47+ Popup</span>
          </button>

          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="https://danihudbird.gumroad.com/l/hudbirdui-pro-allaccess"
            target="_blank"
            rel="noreferrer"
            className="shrink-0"
          >
            <Button className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold whitespace-nowrap text-white shadow-md transition-transform hover:scale-105 active:scale-95 sm:text-sm dark:bg-[#C8F560] dark:text-[#0D0F14]">
              Purchase Now
            </Button>
          </a>
        </div>

        {/* Full-Width Dropdowns (47 Pre-Built Templates & 29+ Inner Pages) */}
        <AnimatePresence>
          {activeMenu === "prebuilt" && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 left-0 z-50 pt-3"
            >
              <div className="rounded-[34px] border border-black/[0.08] bg-zinc-900/[0.06] p-1.5 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-white/[0.06]">
                <div className="rounded-[28px] border border-black/[0.06] bg-white p-6 sm:p-7 dark:border-white/10 dark:bg-[#11131A]">
                  <div className="mb-5 flex flex-col justify-between gap-3 border-b border-black/[0.06] pb-4 sm:flex-row sm:items-center dark:border-white/10">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C8F560] px-3 py-1 text-xs font-bold whitespace-nowrap text-[#0D0F14]">
                        <Sparkles className="h-3.5 w-3.5" />
                        47 Pre-Built Websites
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Each with custom domain icon, real screenshot preview & 29+ inner/auth pages
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="relative w-56">
                        <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                        <input
                          type="text"
                          value={demoSearch}
                          onChange={(e) => setDemoSearch(e.target.value)}
                          placeholder="Filter 47 websites..."
                          className="w-full rounded-full border border-black/[0.06] bg-[#F4F5F8] py-1.5 pr-3 pl-8 text-xs text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-[#C8F560] focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenu(null);
                          window.dispatchEvent(new CustomEvent("hudbird:open-demos-modal"));
                        }}
                        className="cursor-pointer rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90 dark:bg-[#C8F560] dark:text-[#0D0F14]"
                      >
                        Fullscreen Gallery ↗
                      </button>
                    </div>
                  </div>

                  <div className="grid max-h-[62vh] grid-cols-1 gap-x-5 gap-y-1 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-4">
                    {columns47.map((colItems, colIdx) => (
                      <ul key={colIdx} className="space-y-1">
                        {colItems.map((tpl: PrebuiltTemplateMeta) => {
                          const labelText = tpl.title || tpl.name || tpl.slug;
                          return (
                            <li key={tpl.slug}>
                              <Link
                                to={`/demos/${tpl.slug}`}
                                onClick={() => setActiveMenu(null)}
                                className="group flex items-center justify-between rounded-xl px-2.5 py-2 text-[13px] font-medium text-zinc-900 transition-all hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-white/[0.08]"
                              >
                                <span className="flex min-w-0 items-center gap-2.5">
                                  <span
                                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-black/[0.05] dark:border-white/10"
                                    style={{
                                      backgroundColor: `${tpl.accent}18`,
                                      color: tpl.accent,
                                    }}
                                  >
                                    <HudbirdTemplateLogoIcon
                                      slug={tpl.slug}
                                      className="h-3.5 w-3.5"
                                    />
                                  </span>
                                  <span className="truncate">{labelText}</span>
                                </span>
                                {tpl.isNew ? (
                                  <span className="ml-2 shrink-0 rounded-full bg-[#C8F560] px-2 py-0.5 text-[10px] font-bold text-[#0D0F14]">
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

          {activeMenu === "innerPages" && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 left-0 z-50 pt-3"
            >
              <div className="grid grid-cols-1 gap-6 rounded-[28px] border border-black/[0.08] bg-white p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.3)] sm:grid-cols-2 lg:grid-cols-4 dark:border-white/10 dark:bg-[#11131A]">
                <div>
                  <h4 className="mb-3 text-xs font-bold tracking-wider text-zinc-400 uppercase">
                    Company & Studio
                  </h4>
                  <ul className="space-y-2">
                    {MEGAMENU_DATA.innerPages.company.map((item) => (
                      <li key={item.title}>
                        <Link
                          to={item.path}
                          onClick={() => setActiveMenu(null)}
                          className="block py-0.5 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-[#C8F560]"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 text-xs font-bold tracking-wider text-zinc-400 uppercase">
                    Portfolio, Pricing & Portal
                  </h4>
                  <ul className="space-y-2">
                    {MEGAMENU_DATA.innerPages.showcase.map((item) => (
                      <li key={item.title}>
                        <Link
                          to={item.path}
                          onClick={() => setActiveMenu(null)}
                          className="block py-0.5 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-[#C8F560]"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 text-xs font-bold tracking-wider text-zinc-400 uppercase">
                    Editorial & Legal
                  </h4>
                  <ul className="space-y-2">
                    {MEGAMENU_DATA.innerPages.editorial.map((item) => (
                      <li key={item.title}>
                        <Link
                          to={item.path}
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center justify-between py-0.5 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-[#C8F560]"
                        >
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="rounded-full bg-[#C8F560] px-2 py-0.5 text-[10px] font-bold text-[#0D0F14]">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 text-xs font-bold tracking-wider text-zinc-400 uppercase">
                    Auth, OTP & Utility (9)
                  </h4>
                  <ul className="space-y-2">
                    {MEGAMENU_DATA.innerPages.auth.map((item) => (
                      <li key={item.title}>
                        <Link
                          to={item.path}
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center justify-between py-0.5 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-[#C8F560]"
                        >
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="rounded-full bg-[#C8F560] px-2 py-0.5 text-[10px] font-bold text-[#0D0F14]">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
