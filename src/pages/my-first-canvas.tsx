import React, { useState, useEffect } from "react";
import { Button, CtaCentered } from "./hudbird-ui"; // Hudbird UI library (vendored in src/components/hudbird-ui)
import { Moon, Sun } from "lucide-react";

function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(savedTheme);
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };
  return (
    <button
      onClick={toggleTheme}
      className="fixed right-4 bottom-4 z-50 rounded-full border border-zinc-200 bg-white p-3 text-zinc-900 shadow-lg transition-colors dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

export default function GeneratedComponent() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
      <ThemeSwitcher />
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-[#0A0A0E] px-8 py-12">
        <div className="flex flex-col">
          <CtaCentered className="bg-transparent">
            <span>Boost your productivity. Start using our app today.</span>
            <span>
              Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam.
            </span>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-full">
                <Button color="primary" className="w-full sm:w-auto" size="lg">
                  Get started
                </Button>
              </div>
              <div className="w-full">
                <Button variant="outline" className="w-full sm:w-auto" size="lg">
                  Learn more
                </Button>
              </div>
            </div>
          </CtaCentered>
        </div>
      </div>
    </div>
  );
}
