"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, X, User, ArrowRight } from "lucide-react";
import type {
  BrandProfile,
  LandingAction,
  LandingNavigationLink,
  NavbarCustomSettings,
} from "@hudbird/schemas";
import { NavbarBrandMark } from "../NavbarBrandMark";
import { useNavbarScroll } from "../useNavbarScroll";
import { useLandingNavigation } from "../../LandingShared";

export interface Nav13ModernMiniProps {
  brand: BrandProfile;
  content: {
    action: LandingAction;
    links: LandingNavigationLink[];
    secondaryAction?: LandingAction;
  };
  brandContent?: React.ReactNode;
  endContent?: React.ReactNode;
  customSettings?: NavbarCustomSettings;
  className?: string;
}

export function Nav13ModernMini({
  brand,
  content,
  brandContent,
  endContent,
  customSettings,
  className = "",
}: Nav13ModernMiniProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  const navbarRef = React.useRef<HTMLElement>(null);

  const { scrollPercent } = useNavbarScroll({
    enabled: true,
    navbarRef,
    isMenuOpen,
  });

  // Detect and sync dark mode state
  React.useEffect(() => {
    const checkDark = () => {
      if (typeof document !== "undefined") {
        setIsDark(document.documentElement.classList.contains("dark"));
      }
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    if (typeof document !== "undefined") {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    }
    return () => observer.disconnect();
  }, []);

  const toggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof document === "undefined") return;
    const nextDark = !document.documentElement.classList.contains("dark");
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setIsDark(nextDark);
  };

  const { visible, hrefFor } = useLandingNavigation();

  const rawLinks =
    content.links && content.links.length > 0
      ? content.links
      : [
          { label: "PDP's", target: "features" },
          { label: "Products", target: "products" },
          { label: "Videos", target: "demo" },
          { label: "Our features", target: "features" },
        ];

  const menuLinks = rawLinks.filter((link) =>
    "href" in link && Boolean(link.href)
      ? true
      : "target" in link && Boolean(link.target)
        ? visible.includes(link.target as any)
        : true
  );

  const getLinkHref = (link: (typeof rawLinks)[number]) =>
    "href" in link && Boolean(link.href)
      ? (link.href as string)
      : "target" in link && Boolean(link.target)
        ? hrefFor(`#${link.target}`)
        : "#";

  const otherLinks = [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Cookie Policy", href: "#cookies" },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Twitter / X", href: "https://x.com" },
    { label: "GitHub", href: "https://github.com" },
  ];

  const handleLinkClick = (target?: string, href?: string) => {
    setIsMenuOpen(false);
    if (target && typeof document !== "undefined") {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    if (href && href.startsWith("#") && typeof document !== "undefined") {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      ref={navbarRef}
      data-navbar-preset="nav-13"
      aria-label="Modern Mini Navigation"
      className={`sticky top-0 z-40 w-full transition-colors duration-300 ${className ?? ""}`}
      style={{
        backgroundColor:
          customSettings?.surface === "solid"
            ? (customSettings.backgroundColor ?? "transparent")
            : "transparent",
      }}
    >
      {/* Visually hidden accessible navigation for screen readers and indexing */}
      <div className="sr-only">
        <h2>Navigation Links</h2>
        <ul>
          {menuLinks.map((link) => (
            <li key={link.label}>
              <a href={getLinkHref(link)}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-8 lg:px-12">
        {/* 1. LEFT: Brand Logo Mark */}
        <div className="z-10 flex shrink-0 items-center">
          <NavbarBrandMark brand={brand} brandContent={brandContent} />
        </div>

        {/* 2. CAPSULE MENU: On mobile sits right-aligned, on desktop 100% Dead Center Horizontally & Vertically */}
        <div className="relative flex items-center justify-center sm:pointer-events-none sm:absolute sm:inset-0 sm:z-20">
          <div className="relative flex items-center justify-center sm:pointer-events-auto">
            <motion.div
              layoutId="modern-mini-capsule"
              className="flex items-center gap-2 rounded-full border border-black/10 bg-black py-1.5 pr-2 pl-3.5 text-xs text-white shadow-xl transition-all duration-300 sm:gap-2.5 sm:py-2 sm:pr-2.5 sm:pl-4 sm:text-sm dark:border-white/15 dark:bg-[#1c1c1f]/90 dark:backdrop-blur-xl"
            >
              {/* Menu Trigger Button */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center gap-1.5 font-medium tracking-tight text-white transition-opacity hover:opacity-85 focus:outline-hidden"
                aria-expanded={isMenuOpen}
                aria-label="Open navigation menu"
              >
                <svg
                  className="h-3.5 w-3.5 shrink-0"
                  viewBox="0 0 16 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="2" y1="3" x2="14" y2="3" />
                  <line x1="2" y1="9" x2="14" y2="9" />
                </svg>
                <span>Menu</span>
              </button>

              {/* Moon/Sun Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:h-7 sm:w-7"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? (
                  <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                ) : (
                  <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                )}
              </button>

              {/* Scroll Position Percentage Badge */}
              <span
                className="rounded-full bg-white/20 px-2 py-0.5 font-mono text-[11px] font-semibold text-white/90 sm:px-2.5 sm:text-xs"
                title="Page scroll progress"
              >
                {scrollPercent}%
              </span>
            </motion.div>

            {/* 3. MORPHING DROPDOWN MENU CARD (Image 3 Reference) */}
            <AnimatePresence>
              {isMenuOpen && (
                <>
                  {/* Backdrop overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
                    aria-hidden="true"
                  />

                  {/* Expanded Floating Menu Card */}
                  <motion.div
                    initial={{ opacity: 0, y: -12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.95 }}
                    transition={{ type: "spring", damping: 28, stiffness: 350 }}
                    className="fixed inset-x-3.5 top-3 z-50 mx-auto max-h-[calc(100vh-24px)] max-w-[360px] overflow-y-auto rounded-3xl border border-black/10 bg-white p-5 text-zinc-950 shadow-2xl sm:top-4 sm:max-w-[380px] sm:p-6 dark:border-white/10 dark:bg-[#18181b] dark:text-white"
                  >
                    {/* Card Header: Close, Theme, Percentage */}
                    <div className="flex items-center justify-between pb-4 sm:pb-5">
                      <button
                        type="button"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-1.5 text-xs font-semibold tracking-tight transition-opacity hover:opacity-75 focus:outline-hidden"
                        aria-label="Close menu"
                      >
                        <X className="h-4 w-4 shrink-0" />
                        <span>Close</span>
                      </button>

                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={toggleTheme}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-zinc-200 dark:bg-white/10 dark:hover:bg-white/20"
                          aria-label="Toggle theme"
                        >
                          {isDark ? (
                            <Sun className="h-3.5 w-3.5 text-white" />
                          ) : (
                            <Moon className="h-3.5 w-3.5 text-zinc-900" />
                          )}
                        </button>
                        <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 font-mono text-xs font-semibold text-zinc-700 dark:bg-white/15 dark:text-white/90">
                          {scrollPercent}%
                        </span>
                      </div>
                    </div>

                    {/* Section: Menu (Primary Large Typography Links) */}
                    <div className="space-y-1">
                      <span className="block text-[11px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                        Menu
                      </span>
                      <ul className="space-y-0.5 pt-1">
                        {menuLinks.map((link) => (
                          <li key={link.label}>
                            <button
                              type="button"
                              onClick={() =>
                                handleLinkClick(
                                  "target" in link ? link.target : undefined,
                                  "href" in link ? link.href : undefined
                                )
                              }
                              className="block w-full py-1 text-left text-2xl font-bold tracking-tight text-zinc-900 transition-all hover:translate-x-1 hover:text-zinc-600 focus:outline-hidden dark:text-white dark:hover:text-zinc-300"
                            >
                              {link.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Divider Line */}
                    <div className="my-5 border-t border-zinc-200/80 dark:border-white/10" />

                    {/* Section: Other */}
                    <div className="space-y-1">
                      <span className="block text-[11px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                        Other
                      </span>
                      <ul className="space-y-1 pt-1">
                        {otherLinks.map((item) => (
                          <li key={item.label}>
                            <a
                              href={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="block text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Section: Social media */}
                    <div className="mt-5 space-y-1">
                      <span className="block text-[11px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                        Social media
                      </span>
                      <ul className="space-y-1 pt-1">
                        {socialLinks.map((item) => (
                          <li key={item.label}>
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mobile CTA inside menu drawer */}
                    <div className="mt-6 sm:hidden">
                      <a
                        href={content.action?.href ?? "#features"}
                        onClick={() => setIsMenuOpen(false)}
                        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-zinc-950 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-950"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <span>{content.action?.label || "See the demo"}</span>
                          <ArrowRight className="h-4 w-4" />
                        </span>
                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full dark:via-black/10" />
                      </a>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 4. RIGHT: User Profile Button + Pill CTA Button (Classic generous luxury proportion) */}
        <div className="z-10 hidden shrink-0 items-center gap-3 sm:flex">
          {endContent ? (
            endContent
          ) : (
            <>
              {/* User Avatar / Profile Icon Button */}
              <button
                type="button"
                aria-label="User Account"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-zinc-900 shadow-2xs transition-all hover:bg-zinc-100 sm:h-11 sm:w-11 dark:border-white/15 dark:bg-[#1c1c1f] dark:text-white dark:hover:bg-white/10"
              >
                <User className="h-5 w-5" />
              </button>

              {/* Main Pill CTA Button */}
              <a
                href={content.action?.href ?? "#features"}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold tracking-tight text-white shadow-xs transition-all hover:bg-zinc-800 hover:shadow-md active:scale-95 sm:px-6 sm:py-2.5 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>{content.action?.label || "See the demo"}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full dark:via-black/10" />
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
