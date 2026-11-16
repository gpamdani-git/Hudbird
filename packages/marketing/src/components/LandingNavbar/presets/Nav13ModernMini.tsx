"use client";
import * as React from "react";
import { createPortal } from "react-dom";
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
import { brandStyle } from "../../HeroSection/brand";
import { cn } from "../../../utils/cn";

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
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on Escape key press
  React.useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    const doc =
      navbarRef.current?.ownerDocument ?? (typeof document !== "undefined" ? document : null);
    doc?.addEventListener("keydown", handleKeyDown);
    return () => doc?.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const portalTarget =
    navbarRef.current?.ownerDocument?.body ??
    (typeof document !== "undefined" ? document.body : null);

  const { scrollPercent } = useNavbarScroll({
    enabled: true,
    navbarRef,
    isMenuOpen,
  });

  // Detect and sync dark mode state
  React.useEffect(() => {
    const getDoc = () =>
      navbarRef.current?.ownerDocument ?? (typeof document !== "undefined" ? document : null);
    const checkDark = () => {
      const doc = getDoc();
      if (doc?.documentElement) {
        setIsDark(doc.documentElement.classList.contains("dark"));
      }
    };
    checkDark();
    const doc = getDoc();
    if (!doc?.documentElement) return;
    const observer = new MutationObserver(checkDark);
    observer.observe(doc.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    const doc =
      navbarRef.current?.ownerDocument ?? (typeof document !== "undefined" ? document : null);
    if (!doc?.documentElement) return;
    const nextDark = !doc.documentElement.classList.contains("dark");
    if (nextDark) {
      doc.documentElement.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch {
        /* ignore localStorage restrictions */
      }
    } else {
      doc.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch {
        /* ignore localStorage restrictions */
      }
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

  const menuDrawerContent = (
    <AnimatePresence>
      {isMenuOpen && (
        <div
          className={cn("hb-modern-mini-portal pointer-events-auto", isDark && "dark")}
          style={brand ? brandStyle(brand) : undefined}
        >
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Expanded Floating Menu Card */}
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 0, scale: 1 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="fixed inset-x-3.5 top-3 z-[9999] mx-auto max-h-[calc(100vh-24px)] max-w-[360px] overflow-y-auto rounded-3xl border border-black/10 bg-white p-5 text-zinc-950 shadow-2xl sm:top-4 sm:max-w-[380px] sm:p-6 dark:border-white/10 dark:bg-[#18181b] dark:text-white"
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
                {menuLinks.map((link, idx) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      data-hb-node="links"
                      data-hb-item={idx}
                      data-hb-edit={`navbar:links.${idx}.label`}
                      onClick={() =>
                        handleLinkClick(
                          "target" in link ? link.target : undefined,
                          "href" in link ? link.href : undefined
                        )
                      }
                      className="block w-full py-1 text-left text-2xl font-bold tracking-tight text-zinc-900 transition-all hover:translate-x-1 hover:text-zinc-600 focus:outline-hidden dark:text-white dark:hover:text-zinc-300"
                    >
                      <span data-hb-edit-text="">{link.label}</span>
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
                className="group hb-primary hb-cta relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--hb-accent,var(--primary,#2457d6))] px-5 py-3 text-center text-sm font-semibold text-[var(--hb-on-accent,var(--primary-foreground,#ffffff))] shadow-sm transition-all hover:opacity-95 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>{content.action?.label || "See the demo"}</span>
                  <ArrowRight className="h-4 w-4" />
                </span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <nav
      ref={navbarRef}
      data-navbar-preset="nav-13"
      data-navbar-open={isMenuOpen ? "true" : undefined}
      aria-label="Modern Mini Navigation"
      className={`sticky top-0 ${isMenuOpen ? "z-[100]" : "z-50"} w-full transition-colors duration-300 ${className ?? ""}`}
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
                data-hb-node="primary-button"
                data-hb-edit="navbar:action.label"
                className="group hb-primary hb-cta relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--hb-accent,var(--primary,#2457d6))] px-5 py-2.5 text-sm font-semibold tracking-tight text-[var(--hb-on-accent,var(--primary-foreground,#ffffff))] shadow-xs transition-all hover:opacity-95 hover:shadow-md active:scale-95 sm:px-6 sm:py-2.5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span data-hb-edit-text="">{content.action?.label || "See the demo"}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </a>
            </>
          )}
        </div>
      </div>

      {/* 3. MORPHING DROPDOWN MENU CARD PORTAL (Rendered at top-level body to eliminate stacking context traps) */}
      {mounted && portalTarget ? createPortal(menuDrawerContent, portalTarget) : menuDrawerContent}
    </nav>
  );
}
