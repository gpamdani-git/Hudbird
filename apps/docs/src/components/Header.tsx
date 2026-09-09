import React, { useEffect, useState } from "react";
import { Moon, Sun, ArrowUpRight, Menu, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { HudbirdLogo } from "./HudbirdLogo";
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
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 sm:px-8 gap-3 sm:gap-6">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="flex items-center gap-2.5 group">
            {/* Hudbird Logo Icon */}
            <div className="w-8 h-8 rounded-xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
              <HudbirdLogo className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
                Hudbird UI
              </span>
              <span className="hidden sm:flex px-1.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest leading-none">
                Beta
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md mx-auto flex justify-end sm:justify-center">
          <GlobalSearch />
        </div>

        {/* Right: Navigation items & Theme Segmented Switch UI */}
        <div className="flex items-center gap-3 sm:gap-6 text-sm font-medium shrink-0">
          <Link
            to="/"
            className="text-zinc-900 dark:text-white font-semibold transition-colors"
          >
            Docs
          </Link>
          <a
            href="https://www.buymeacoffee.com/daniakbar"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex hover:opacity-80 transition-opacity"
          >
            <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=daniakbar&button_colour=5F7FFF&font_colour=ffffff&font_family=Comic&outline_colour=000000&coffee_colour=FFDD00" alt="Buy me a coffee" className="h-8" />
          </a>

          {/* Segmented Switch UI: Light | Dark | System */}
          <div
            role="radiogroup"
            aria-label="Theme mode switcher"
            className="flex items-center p-0.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
          >
            <button
              type="button"
              role="radio"
              aria-checked={theme === "light"}
              onClick={() => setTheme("light")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                theme === "light"
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-white font-semibold"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
              title="Light mode"
            >
              <Sun className={`w-3.5 h-3.5 ${theme === "light" ? "text-amber-500" : ""}`} />
              <span className="hidden md:inline">Light</span>
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={theme === "dark"}
              onClick={() => setTheme("dark")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                theme === "dark"
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-white font-semibold"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
              title="Dark mode"
            >
              <Moon className={`w-3.5 h-3.5 ${theme === "dark" ? "text-indigo-500 dark:text-indigo-400" : ""}`} />
              <span className="hidden md:inline">Dark</span>
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={theme === "system"}
              onClick={() => setTheme("system")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                theme === "system"
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-white font-semibold"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
              title="System preference"
            >
              <Monitor className={`w-3.5 h-3.5 ${theme === "system" ? "text-indigo-500 dark:text-indigo-400" : ""}`} />
              <span className="hidden md:inline">System</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

