import React, { useEffect, useState } from "react";
import { Moon, Sun, Menu, Monitor, ChevronRight, PanelLeft } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@hudbird/ui";
import { navigationData } from "../navData";
import changelogData from "../data/changelog.json";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

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
      return "system";
    }
    return "system";
  });

  const location = useLocation();
  const isThemesPage = location.pathname.startsWith("/themes");

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
      <header className="pointer-events-auto w-full rounded-xl border border-white/50 bg-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-3xl transition-colors duration-300 dark:border-white/10 dark:bg-[#1a1a1c]/60 dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
        {/* Subtle inner gradients */}
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/60 to-transparent dark:from-white/5 dark:to-transparent" />

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
            <Link to="/" className="group flex items-center gap-2.5 lg:hidden">
              <img
                src="/assets/new-logo/hudbirdui-icon-blue.svg"
                alt="Hudbird UI"
                className="h-7 w-7 object-contain dark:hidden"
              />
              <img
                src="/assets/new-logo/hudbirdui-icon-white.svg"
                alt="Hudbird UI"
                className="hidden h-7 w-7 object-contain dark:block"
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

          {/* Right: Navigation items & Theme Segmented Switch UI */}
          <div className="flex shrink-0 items-center gap-3 text-sm font-medium xl:gap-6">
            {/* Desktop Navigation */}
            <div className="hidden items-center gap-6 xl:flex">
              <Link to={isThemesPage ? "/" : "/themes"}>
                <Button
                  variant={isThemesPage ? "outline" : "solid"}
                  color="primary"
                  size="sm"
                  className="h-7 px-3 py-0 text-[11px] font-semibold tracking-wide"
                >
                  {isThemesPage ? "Back to Docs" : "Create Theme"}
                </Button>
              </Link>
              <Link
                to="/templates"
                className="flex items-center gap-1.5 text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                <span className="font-semibold text-zinc-900 dark:text-white">Templates</span>
              </Link>
              <a
                href="https://hudbird-editor.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                title="Hudbird Builder"
              >
                <span className="font-semibold text-zinc-900 dark:text-white">Builder</span>
              </a>

              {/* Segmented Switch UI: Light | Dark | System */}
              <div
                role="radiogroup"
                aria-label="Theme mode switcher"
                className="flex items-center rounded-xl border border-zinc-200/50 bg-white/50 p-0.5 dark:border-zinc-800/50 dark:bg-zinc-900/50"
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
            </div>

            {/* Mobile Navigation Dropdown */}
            <div className="flex xl:hidden">
              <Dropdown placement="bottom-end">
                <DropdownTrigger
                  className="flex items-center justify-center rounded-lg p-2 text-zinc-600 transition-colors hover:bg-black/5 dark:text-zinc-400 dark:hover:bg-white/5"
                  title="Menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </DropdownTrigger>
                <DropdownMenu className="min-w-[180px]">
                  <DropdownItem>
                    <a
                      href="https://hudbird-editor.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center font-medium"
                    >
                      Builder
                    </a>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/templates" className="flex w-full items-center font-medium">
                      Templates
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link
                      to={isThemesPage ? "/" : "/themes"}
                      className="flex w-full items-center font-medium"
                    >
                      {isThemesPage ? "Back to Docs" : "Create Theme"}
                    </Link>
                  </DropdownItem>
                  <DropdownItem className="my-1 border-t border-zinc-200 dark:border-zinc-800" />
                  <DropdownItem>
                    <a
                      href="https://github.com/gpamdani-git/Hudbird-UI-Discus"
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center font-medium"
                    >
                      <GithubIcon className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
