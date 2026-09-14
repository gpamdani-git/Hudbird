import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/** Provides the global dark/light toggle logic shared across the template */
export function useTemplateTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light");
    root.classList.add("dark");
    setTheme("dark");
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.remove("light");
      root.classList.add("dark");
      setTheme("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      setTheme("light");
    }
  };

  return { theme, toggleTheme };
}

/** Inline theme toggle button — embed in the navbar */
export const ThemeToggleButton = ({
  theme,
  onToggle,
}: {
  theme: "light" | "dark";
  onToggle: () => void;
}) => (
  <motion.button
    onClick={onToggle}
    whileTap={{ scale: 0.9 }}
    className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-700"
    aria-label="Toggle theme"
  >
    <AnimatePresence mode="wait" initial={false}>
      {theme === "light" ? (
        <motion.span
          key="moon"
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <Moon size={16} />
        </motion.span>
      ) : (
        <motion.span
          key="sun"
          initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <Sun size={16} />
        </motion.span>
      )}
    </AnimatePresence>
  </motion.button>
);

/** Legacy: floating fixed button (kept for backward compat) */
export const TemplateThemeToggle = () => {
  const { theme, toggleTheme } = useTemplateTheme();
  return <ThemeToggleButton theme={theme} onToggle={toggleTheme} />;
};
