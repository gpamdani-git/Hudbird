import React, { useEffect, useState } from "react";
import { Moon, Sun, ArrowUpRight, Menu, Monitor, Coffee, Sparkles } from "lucide-react";

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
import { Badge, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@hudbird/ui";
import { Link } from "react-router-dom";
import { GlobalSearch } from "./GlobalSearch";

interface HeaderProps {
  onToggleMobileSidebar?: () => void;
}

type Theme = "light" | "dark" | "system";

export const Header: React.FC<HeaderProps> = ({ onToggleMobileSidebar }) => {
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
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="flex h-14 items-center justify-between gap-3 px-4 sm:gap-6 sm:px-8">
        {/* Left: Brand / Logo */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="p-2 text-zinc-600 hover:text-zinc-900 lg:hidden dark:text-zinc-400 dark:hover:text-zinc-100"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="group flex items-center gap-2.5">
            {/* Logo Icon (Light Mode) */}
            <img
              src="/assets/marketing-section/logo-hudbird/logo-ico-blue.svg"
              alt="Hudbird UI"
              className="h-8 w-8 object-contain dark:hidden"
            />
            {/* Logo Icon (Dark Mode) */}
            <img
              src="/assets/marketing-section/logo-hudbird/logo-ico-white.svg"
              alt="Hudbird UI"
              className="hidden h-8 w-8 object-contain dark:block"
            />

            {/* Logo Text */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Hudbird UI
              </span>
              <Badge variant="solid" color="primary">
                1.2.0
              </Badge>
            </div>
          </Link>
        </div>

        {/* Center: Global Search Bar */}
        <div className="mx-auto flex max-w-md flex-1 justify-end sm:justify-center">
          <GlobalSearch />
        </div>

        {/* Right: Navigation items & Theme Segmented Switch UI */}
        <div className="flex shrink-0 items-center gap-3 text-sm font-medium sm:gap-6">
          <Link
            to="/"
            className="hidden font-semibold text-zinc-900 transition-colors sm:block dark:text-white"
          >
            Docs
          </Link>
          <a
            href="https://hudbird-editor.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            title="Hudbird AI Editor"
          >
            <Sparkles className="h-4 w-4 fill-indigo-500/20 text-indigo-500" />
            <span className="hidden font-medium sm:inline">AI Editor</span>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
              Alpha
            </span>
          </a>
          <Dropdown placement="bottom-end">
            <DropdownTrigger
              className="flex items-center text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              title="GitHub"
            >
              <GithubIcon className="h-5 w-5" />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                onClick={() =>
                  window.open("https://github.com/gpamdani-git/Hudbird-UI-Discus", "_blank")
                }
                endContent={<ArrowUpRight className="h-3 w-3" />}
              >
                Public Tracker & Discussions
              </DropdownItem>
              <DropdownItem disabled>Source Code (Private)</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <a
            href="https://www.buymeacoffee.com/daniakbar"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center text-zinc-600 transition-colors hover:text-amber-600 sm:flex dark:text-zinc-400 dark:hover:text-amber-500"
            title="Buy me a coffee"
          >
            <Coffee className="h-5 w-5" />
          </a>

          {/* Segmented Switch UI: Light | Dark | System */}
          <div
            role="radiogroup"
            aria-label="Theme mode switcher"
            className="flex items-center rounded-xl border border-zinc-200 bg-zinc-100 p-0.5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <button
              type="button"
              role="radio"
              aria-checked={theme === "light"}
              onClick={() => setTheme("light")}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                theme === "light"
                  ? "bg-white font-semibold text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
              title="Light mode"
            >
              <Sun className={`h-3.5 w-3.5 ${theme === "light" ? "text-amber-500" : ""}`} />
              <span className="hidden md:inline">Light</span>
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={theme === "dark"}
              onClick={() => setTheme("dark")}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                theme === "dark"
                  ? "bg-white font-semibold text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
              title="Dark mode"
            >
              <Moon
                className={`h-3.5 w-3.5 ${theme === "dark" ? "text-indigo-500 dark:text-indigo-400" : ""}`}
              />
              <span className="hidden md:inline">Dark</span>
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={theme === "system"}
              onClick={() => setTheme("system")}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                theme === "system"
                  ? "bg-white font-semibold text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
              title="System preference"
            >
              <Monitor
                className={`h-3.5 w-3.5 ${theme === "system" ? "text-indigo-500 dark:text-indigo-400" : ""}`}
              />
              <span className="hidden md:inline">System</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
