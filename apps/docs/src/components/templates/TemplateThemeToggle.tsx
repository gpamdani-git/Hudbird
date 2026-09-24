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

/** Floating fixed badge with Made with hudbirdui and theme toggle */
export const TemplateThemeToggle = () => {
  const { theme, toggleTheme } = useTemplateTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed right-6 bottom-6 z-50 flex items-center gap-3 rounded-full border border-zinc-200/80 bg-white/80 p-1.5 shadow-xl backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#0a0a0a]/80"
    >
      <div className="flex items-center gap-1.5 pl-3">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Made with <span className="font-bold text-zinc-900 dark:text-zinc-100">hudbirdui</span>
        </span>
      </div>

      <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

      <motion.button
        onClick={toggleTheme}
        whileTap={{ scale: 0.9 }}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
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
              <Moon size={14} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={14} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};
