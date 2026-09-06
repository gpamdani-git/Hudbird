import React, { useEffect, useState } from "react";
import { Moon, Sun, ArrowUpRight, Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  onToggleMobileSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileSidebar }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 sm:px-8">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/button" className="flex items-center gap-2.5 group">
            {/* Catalyst icon mark */}
            <div className="w-7 h-7 rounded-lg bg-zinc-950 dark:bg-white flex items-center justify-center text-white dark:text-zinc-950 font-bold text-sm tracking-tighter">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" fill="var(--color-bg, #000)" className="text-white dark:text-zinc-950 fill-white dark:fill-zinc-950" />
              </svg>
            </div>
            <span className="font-bold text-base tracking-tight text-zinc-900 dark:text-white">
              Catalyst
            </span>
          </Link>
        </div>

        {/* Right: Navigation items & Theme Toggle */}
        <div className="flex items-center gap-5 sm:gap-6 text-sm font-medium">
          <a
            href="#demo"
            className="hidden sm:inline-block text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            Demo
          </a>
          <Link
            to="/button"
            className="text-zinc-900 dark:text-white font-semibold transition-colors"
          >
            Docs
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <span>Buy UI Kit</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
