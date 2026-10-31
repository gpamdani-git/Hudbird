import React, { useEffect, useState } from "react";
import {
  Moon,
  Sun,
  Menu,
  Monitor,
  ChevronRight,
  PanelLeft,
  MoreHorizontal,
  ExternalLink,
  LifeBuoy,
  FileText,
} from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@hudbird/ui";
import { navigationData } from "../navData";
import { GithubIcon, DiscordIcon } from "./SocialIcons";

interface HeaderProps {
  onToggleMobileSidebar?: () => void;
  onToggleDesktopSidebar?: () => void;
}

type Theme = "light" | "dark" | "system";

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileSidebar,
  onToggleDesktopSidebar,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      if (typeof window !== "undefined") {
        const storedTheme = window.localStorage?.getItem("theme") as Theme | null;
        if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
          return storedTheme;
        }
      }
    } catch {
      return "dark";
    }
    return "dark";
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Find breadcrumb
  let parentGroup = "";
  let currentItem = "";
  for (const group of navigationData) {
    const item = group.items.find((i) => i.path === location.pathname);
    if (item) {
      parentGroup = group.title || "";
      currentItem = item.name;
      break;
    }
  }

  useEffect(() => {
    try {
      const root = document.documentElement;
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const applyTheme = () => {
        const isSystemDark = mediaQuery.matches;
        const shouldBeDark = theme === "dark" || (theme === "system" && isSystemDark);

        if (shouldBeDark) {
          root.classList.add("dark");
          root.setAttribute("data-theme", "dark");
        } else {
          root.classList.remove("dark");
          root.setAttribute("data-theme", "light");
        }
      };

      applyTheme();

      if (theme !== "system") {
        window.localStorage?.setItem("theme", theme);
      } else {
        window.localStorage?.removeItem("theme");
      }

      const handleChange = () => {
        if (theme === "system") {
          applyTheme();
        }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } catch {
      // Ignore storage restrictions in sandboxed environment
    }
  }, [theme]);

  return (
    <div className="pointer-events-none sticky top-3 z-40 mx-auto mt-3 w-[calc(100%-24px)] transition-all duration-300">
      <header className="pointer-events-auto w-full rounded-xl bg-white/80 backdrop-blur-3xl transition-colors duration-300 dark:bg-[#161618]/90">
        <div className="relative z-10 flex h-14 items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6">
          {/* Left: Toggles & Breadcrumbs */}
          <div className="flex shrink-0 items-center gap-3">
            {/* Mobile Hamburger Toggle */}
            <button
              onClick={onToggleMobileSidebar}
              className="-ml-1.5 rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-black/5 hover:text-zinc-900 lg:hidden dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Desktop Sidebar Toggle */}
            <button
              onClick={onToggleDesktopSidebar}
              className="-ml-1.5 hidden rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-black/5 hover:text-zinc-900 lg:flex dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100"
              aria-label="Toggle sidebar"
            >
              <PanelLeft className="h-4 w-4" />
            </button>

            {/* Mobile Logo Fallback */}
            <Link to="/" className="group flex items-center gap-2 lg:hidden">
              <img
                src="/assets/logo/hudbird-logo-black.png"
                alt="Hudbird UI"
                className="h-6 w-auto object-contain dark:hidden"
              />
              <img
                src="/assets/logo/hudbird-logo-white.png"
                alt="Hudbird UI"
                className="hidden h-6 w-auto object-contain dark:block"
              />
            </Link>

            {/* Desktop Breadcrumbs */}
            <div className="ml-1 hidden items-center gap-2 text-[13px] font-medium lg:flex">
              {parentGroup && (
                <>
                  <span className="text-zinc-500 dark:text-zinc-400">{parentGroup}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-600" />
                </>
              )}
              {currentItem ? (
                <span className="text-zinc-900 dark:text-zinc-100">{currentItem}</span>
              ) : (
                <span className="text-zinc-900 dark:text-zinc-100">Docs</span>
              )}
            </div>
          </div>

          {/* Right: Actions (Templates, Theme, Three-Dots Menu) */}
          <div className="flex shrink-0 items-center gap-2 text-sm font-medium sm:gap-3">
            {/* Subtle Templates PRO Pill */}
            <button
              type="button"
              onClick={() => {
                const url = import.meta.env.DEV
                  ? "http://localhost:5174/"
                  : "https://starterkit-pro.vercel.app/";
                window.open(url, "_blank");
              }}
              className="flex items-center gap-1.5 rounded-full border border-black/10 bg-black/5 px-2.5 py-1 text-xs font-medium text-zinc-700 transition-all hover:bg-black/10 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10"
              title="Explore PRO Templates"
            >
              <span>Templates</span>
              <span className="py-0.2 rounded-full bg-zinc-200/80 px-1.5 text-[9px] font-semibold text-zinc-800 dark:bg-white/15 dark:text-zinc-200">
                PRO
              </span>
            </button>

            {/* Segmented Switch UI: Light | Dark | System */}
            <div
              role="radiogroup"
              aria-label="Theme mode switcher"
              className="hidden items-center rounded-xl border border-zinc-200/50 bg-white/50 p-0.5 sm:flex dark:border-zinc-800/50 dark:bg-zinc-900/50"
            >
              <button
                type="button"
                role="radio"
                aria-checked={theme === "light"}
                onClick={() => setTheme("light")}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                  theme === "light"
                    ? "bg-white font-semibold text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-white"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
                title="Light mode"
              >
                <Sun className={`h-3 w-3 ${theme === "light" ? "text-amber-500" : ""}`} />
                <span>Light</span>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={theme === "dark"}
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                  theme === "dark"
                    ? "bg-white font-semibold text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-white"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
                title="Dark mode"
              >
                <Moon
                  className={`h-3 w-3 ${theme === "dark" ? "text-indigo-500 dark:text-indigo-400" : ""}`}
                />
                <span>Dark</span>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={theme === "system"}
                onClick={() => setTheme("system")}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                  theme === "system"
                    ? "bg-white font-semibold text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-white"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
                title="System preference"
              >
                <Monitor
                  className={`h-3 w-3 ${theme === "system" ? "text-indigo-500 dark:text-indigo-400" : ""}`}
                />
                <span>System</span>
              </button>
            </div>

            {/* Three-Dots Menu (Gestalt grouped secondary items) */}
            <Dropdown placement="bottom-end">
              <DropdownTrigger
                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-black/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
                title="More options"
                aria-label="More options"
              >
                <MoreHorizontal className="h-4 w-4" />
              </DropdownTrigger>
              <DropdownMenu className="min-w-[190px]">
                <DropdownItem
                  startContent={<ExternalLink className="h-4 w-4" />}
                  onClick={() => window.open("https://hudbird-editor.vercel.app/", "_blank")}
                >
                  Builder
                </DropdownItem>
                <DropdownItem
                  startContent={<DiscordIcon className="h-4 w-4 text-[#5865F2]" />}
                  onClick={() => window.open("https://discord.gg/NPBspwkXke", "_blank")}
                >
                  Discord Community
                </DropdownItem>
                <DropdownItem
                  startContent={<GithubIcon className="h-4 w-4" />}
                  onClick={() => window.open("https://github.com/gpamdani-git/Hudbird", "_blank")}
                >
                  GitHub Repository
                </DropdownItem>
                <DropdownItem
                  startContent={<FileText className="h-4 w-4" />}
                  onClick={() => navigate("/changelog")}
                >
                  Changelog
                </DropdownItem>
                <DropdownItem
                  startContent={<LifeBuoy className="h-4 w-4" />}
                  onClick={() => navigate("/support")}
                >
                  Support & FAQ
                </DropdownItem>

                {/* Mobile-only quick theme toggle */}
                <div className="my-1 border-t border-zinc-200 sm:hidden dark:border-zinc-800" />
                <div className="flex items-center justify-between px-3 py-1.5 text-xs text-zinc-500 sm:hidden dark:text-zinc-400">
                  <span>Theme</span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setTheme("light")}
                      className={`rounded p-1 ${
                        theme === "light"
                          ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-white"
                          : ""
                      }`}
                      title="Light"
                    >
                      <Sun className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme("dark")}
                      className={`rounded p-1 ${
                        theme === "dark"
                          ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-white"
                          : ""
                      }`}
                      title="Dark"
                    >
                      <Moon className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme("system")}
                      className={`rounded p-1 ${
                        theme === "system"
                          ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-white"
                          : ""
                      }`}
                      title="System"
                    >
                      <Monitor className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </header>
    </div>
  );
};
