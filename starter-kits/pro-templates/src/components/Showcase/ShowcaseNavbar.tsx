import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Badge } from "@hudbird/ui";
import {
  ChevronDown,
  Moon,
  Sun,
  ArrowRight,
  LayoutGrid,
  Component,
  LayoutTemplate,
  Settings2,
} from "lucide-react";

const MEGAMENU_DATA = {
  prebuilt: [
    { title: "Digital Agency", path: "/agency", isNew: true },
    { title: "AI Startup", path: "/ai-startup", isNew: true },
    { title: "Modern App", path: "/modern-app", isNew: false },
    { title: "SaaS Launchpad", path: "/saas-launchpad", isNew: false },
    { title: "Fintech", path: "/fintech", isNew: false },
    { title: "E-Commerce", path: "/ecommerce", isNew: false },
    { title: "Hospitality", path: "/hospitality", isNew: false },
  ],
  coreUI: [
    { title: "Core Components", path: "https://hudbird.vercel.app/#/docs", icon: Component },
    { title: "Block Gallery", path: "https://hudbird.vercel.app/#/blocks", icon: LayoutGrid },
    {
      title: "Chart Library",
      path: "https://hudbird.vercel.app/#/area-chart",
      icon: LayoutTemplate,
    },
  ],
  innerPages: {
    company: [
      { title: "About Us", path: "/about" },
      { title: "Contact", path: "/contact" },
      { title: "Pricing", path: "/pricing" },
    ],
    products: [
      { title: "Analytics", path: "/analytics" },
      { title: "Security", path: "/security" },
      { title: "Integrations", path: "/integrations" },
    ],
    resources: [
      { title: "Blog", path: "/blog" },
      { title: "Community", path: "/community" },
      { title: "API Reference", path: "/docs/api-reference" },
    ],
    auth: [
      { title: "Login", path: "/login" },
      { title: "Register", path: "/register" },
      { title: "Forgot Password", path: "/forgot-password" },
    ],
  },
  admin: [
    { title: "Dashboard Overview", path: "/dashboard" },
    { title: "Analytics", path: "/dashboard/analytics" },
    { title: "Blog & Posts", path: "/dashboard/posts" },
    { title: "Media Library", path: "/dashboard/media" },
    { title: "Site Builder", path: "/dashboard/site-builder" },
    { title: "System Settings", path: "/dashboard/settings" },
  ],
};

export function ShowcaseNavbar() {
  const [isDark, setIsDark] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 flex w-full items-center justify-center px-4 py-4 sm:px-6 lg:px-8"
    >
      <div className="relative flex w-full max-w-7xl items-center justify-between rounded-full border border-zinc-200/50 bg-white/70 px-6 py-3 shadow-sm backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/70">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/assets/new-logo/hudbirdui-icon-black.svg"
            alt="Hudbird UI"
            className="h-7 w-7 dark:hidden"
          />
          <img
            src="/assets/new-logo/hudbirdui-icon-white.svg"
            alt="Hudbird UI"
            className="hidden h-7 w-7 dark:block"
          />
          <span className="font-heading flex items-center gap-1.5 text-lg font-bold text-zinc-900 dark:text-white">
            Hudbird UI
            <Badge
              variant="success"
              className="h-5 rounded-md border-none bg-blue-500 px-1.5 text-[10px] font-bold text-white uppercase hover:bg-blue-600"
            >
              PRO
            </Badge>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-2 md:flex" onMouseLeave={() => setActiveMenu(null)}>
          {/* Prebuilt Websites Menu */}
          <div className="relative" onMouseEnter={() => setActiveMenu("prebuilt")}>
            <button
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeMenu === "prebuilt" ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white" : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"}`}
            >
              7+ Prebuilt Websites{" "}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${activeMenu === "prebuilt" ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {activeMenu === "prebuilt" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 mt-2 w-[800px] -translate-x-1/2 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                    {MEGAMENU_DATA.prebuilt.map((item) => (
                      <Link
                        key={item.title}
                        to={item.path}
                        className="group flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
                      >
                        <span className="text-sm font-medium text-zinc-700 transition-colors group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-white">
                          {item.title}
                        </span>
                        {item.isNew && (
                          <Badge
                            variant="success"
                            className="h-5 border-none bg-[#C4F042] px-2 text-[10px] text-zinc-900 hover:bg-[#b0d93b]"
                          >
                            New
                          </Badge>
                        )}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Inner Pages Menu */}
          <div className="relative" onMouseEnter={() => setActiveMenu("innerPages")}>
            <button
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeMenu === "innerPages" ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white" : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"}`}
            >
              Inner Pages{" "}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${activeMenu === "innerPages" ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {activeMenu === "innerPages" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 mt-2 w-[800px] -translate-x-1/2 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="grid grid-cols-4 gap-8">
                    {/* Company */}
                    <div className="flex flex-col gap-3">
                      <h4 className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                        Company
                      </h4>
                      <div className="flex flex-col gap-2">
                        {MEGAMENU_DATA.innerPages.company.map((item) => (
                          <Link
                            key={item.title}
                            to={item.path}
                            className="text-sm font-medium text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* Products */}
                    <div className="flex flex-col gap-3">
                      <h4 className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                        Products
                      </h4>
                      <div className="flex flex-col gap-2">
                        {MEGAMENU_DATA.innerPages.products.map((item) => (
                          <Link
                            key={item.title}
                            to={item.path}
                            className="text-sm font-medium text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* Resources */}
                    <div className="flex flex-col gap-3">
                      <h4 className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                        Resources
                      </h4>
                      <div className="flex flex-col gap-2">
                        {MEGAMENU_DATA.innerPages.resources.map((item) => (
                          <Link
                            key={item.title}
                            to={item.path}
                            className="text-sm font-medium text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* Auth */}
                    <div className="flex flex-col gap-3">
                      <h4 className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                        Authentication
                      </h4>
                      <div className="flex flex-col gap-2">
                        {MEGAMENU_DATA.innerPages.auth.map((item) => (
                          <Link
                            key={item.title}
                            to={item.path}
                            className="text-sm font-medium text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Core UI & Block Gallery Menu */}
          <div className="relative" onMouseEnter={() => setActiveMenu("coreUI")}>
            <button
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeMenu === "coreUI" ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white" : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"}`}
            >
              Core UI & Blocks{" "}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${activeMenu === "coreUI" ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {activeMenu === "coreUI" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 mt-2 w-[600px] -translate-x-1/2 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 mb-4 flex flex-col gap-1 border-b border-zinc-100 pb-4 dark:border-zinc-800">
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Developer Resources
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Everything you need to build stunning interfaces.
                      </p>
                    </div>
                    {MEGAMENU_DATA.coreUI.map((item) => (
                      <a
                        key={item.title}
                        href={item.path}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-4 rounded-xl border border-transparent p-4 transition-colors hover:border-zinc-200 hover:bg-zinc-50 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 group-hover:bg-blue-100 group-hover:text-blue-600 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-zinc-900 dark:text-white">
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

          {/* Admin CMS Pages Menu */}
          <div className="relative" onMouseEnter={() => setActiveMenu("admin")}>
            <button
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeMenu === "admin" ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white" : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"}`}
            >
              Admin CMS Pages{" "}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${activeMenu === "admin" ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {activeMenu === "admin" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 mt-2 w-[400px] -translate-x-1/2 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {MEGAMENU_DATA.admin.map((item) => (
                      <Link
                        key={item.title}
                        to={item.path}
                        className="group flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
                      >
                        <span className="text-sm font-medium text-zinc-700 transition-colors group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-white">
                          {item.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                    <Link
                      to="/login"
                      className="flex items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                    >
                      Login to Demo CMS <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href="https://hudbirdui.lemonsqueezy.com/checkout" target="_blank" rel="noreferrer">
            <Button className="rounded-full bg-zinc-900 font-semibold text-white shadow-md transition-transform hover:scale-105 active:scale-95 dark:bg-white dark:text-zinc-900">
              Purchase Now
            </Button>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
