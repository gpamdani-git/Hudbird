import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Monitor } from "lucide-react";

const links = [
  { name: "Agents", href: "#" },
  { name: "Docs", href: "/installation" },
  { name: "Components", href: "#" },
  { name: "Templates", href: "#" },
  { name: "Pricing", href: "#pricing" },
  { name: "GitHub", href: "#" },
  { name: "X/Twitter", href: "https://x.com/dani_akbarr" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Terms", href: "/terms" },
  { name: "Privacy", href: "/privacy" },
];

export function ShowcaseFooter() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    if (newTheme === "system") {
      localStorage.removeItem("theme");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      localStorage.setItem("theme", newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  return (
    <footer className="relative z-10 w-full border-t border-zinc-200/50 bg-zinc-50 py-16 dark:border-white/5 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        {/* Navigation Links */}
        <nav className="mb-8 flex flex-wrap justify-center gap-x-6 gap-y-4">
          {links.map((link) =>
            link.href.startsWith("http") ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        {/* Copyright */}
        <p className="mb-8 text-xs text-zinc-400 dark:text-zinc-500">
          &copy; {new Date().getFullYear()} Hudbird UI. All rights reserved.
        </p>

        {/* Theme Toggle Pill */}
        <div className="flex items-center gap-1 rounded-full bg-zinc-200/50 p-1 dark:bg-white/10">
          <button
            onClick={() => changeTheme("light")}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              theme === "light"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Sun className="h-4 w-4" />
          </button>
          <button
            onClick={() => changeTheme("dark")}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              theme === "dark"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Moon className="h-4 w-4" />
          </button>
          <button
            onClick={() => changeTheme("system")}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              theme === "system"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Monitor className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
