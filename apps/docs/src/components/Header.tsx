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
  LayoutTemplate,
} from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Container,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@hudbird/ui";
import { navigationData } from "../navData";
import { GithubIcon, DiscordIcon } from "./SocialIcons";
import { GlobalSearch } from "./GlobalSearch";
import { HudbirdIcon } from "./HudbirdLogo";

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
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-3xl transition-colors duration-300 dark:bg-[#161618]/90">
      <Container
        size="xl"
        gutter="none"
        className="flex h-14 items-center justify-between gap-3 px-4 sm:gap-6 sm:px-8 lg:px-12"
      >
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

          {/* Mobile Logo with Icon Mark */}
          <Link to="/" className="group flex items-center gap-2 lg:hidden">
            <HudbirdIcon className="h-5 w-auto text-zinc-950 transition-transform group-hover:scale-105 dark:text-white" />
            <span className="text-base font-bold tracking-tight text-zinc-950 dark:text-white">
              hudbird
            </span>
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

        {/* Right: Search & Grouped Three-Dots Menu */}
        <div className="flex shrink-0 items-center gap-2 text-sm font-medium sm:gap-3">
          {/* Global Search Bar */}
          <GlobalSearch />

          {/* Three-Dots Menu (Ecosystem, Resources, Community, Appearance) */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-black/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
              title="More options"
              aria-label="More options"
            >
              <MoreHorizontal className="h-4 w-4" />
            </DropdownTrigger>
            <DropdownMenu className="min-w-[220px]">
              {/* 1. Ecosystem / Tools */}
              <DropdownSection title="Ecosystem">
                <DropdownItem
                  startContent={<LayoutTemplate className="h-4 w-4 text-indigo-500" />}
                  endContent={
                    <span className="rounded bg-indigo-500/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-indigo-600 dark:text-indigo-400">
                      PRO
                    </span>
                  }
                  onClick={() => {
                    const url = import.meta.env.DEV
                      ? "http://localhost:5174/"
                      : "https://starterkit-pro.vercel.app/";
                    window.open(url, "_blank");
                  }}
                >
                  Templates
                </DropdownItem>
                <DropdownItem
                  startContent={<ExternalLink className="h-4 w-4" />}
                  onClick={() => window.open("https://hudbird-editor.vercel.app/", "_blank")}
                >
                  Visual Builder
                </DropdownItem>
              </DropdownSection>

              {/* 2. Documentation & Resources */}
              <DropdownSection title="Documentation" showDivider>
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
              </DropdownSection>

              {/* 3. Community & Source */}
              <DropdownSection title="Community" showDivider>
                <DropdownItem
                  startContent={<GithubIcon className="h-4 w-4" />}
                  onClick={() => window.open("https://github.com/gpamdani-git/Hudbird", "_blank")}
                >
                  GitHub Repository
                </DropdownItem>
                <DropdownItem
                  startContent={<DiscordIcon className="h-4 w-4 text-[#5865F2]" />}
                  onClick={() => window.open("https://discord.gg/NPBspwkXke", "_blank")}
                >
                  Discord Community
                </DropdownItem>
              </DropdownSection>

              {/* 4. Appearance / Theme Switcher */}
              <DropdownSection title="Theme" showDivider>
                <div className="px-2 py-1">
                  <div className="flex w-full items-center rounded-lg border border-zinc-200/80 bg-zinc-100/80 p-0.5 dark:border-zinc-800/80 dark:bg-zinc-800/60">
                    <button
                      type="button"
                      onClick={() => setTheme("light")}
                      className={`flex flex-1 items-center justify-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-all ${
                        theme === "light"
                          ? "bg-white font-semibold text-zinc-900 shadow-2xs dark:bg-zinc-700 dark:text-white"
                          : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                      }`}
                      title="Light mode"
                    >
                      <Sun className={`h-3 w-3 ${theme === "light" ? "text-amber-500" : ""}`} />
                      <span>Light</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme("dark")}
                      className={`flex flex-1 items-center justify-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-all ${
                        theme === "dark"
                          ? "bg-white font-semibold text-zinc-900 shadow-2xs dark:bg-zinc-700 dark:text-white"
                          : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                      }`}
                      title="Dark mode"
                    >
                      <Moon className={`h-3 w-3 ${theme === "dark" ? "text-indigo-400" : ""}`} />
                      <span>Dark</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme("system")}
                      className={`flex flex-1 items-center justify-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-all ${
                        theme === "system"
                          ? "bg-white font-semibold text-zinc-900 shadow-2xs dark:bg-zinc-700 dark:text-white"
                          : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                      }`}
                      title="System preference"
                    >
                      <Monitor
                        className={`h-3 w-3 ${theme === "system" ? "text-indigo-400" : ""}`}
                      />
                      <span>System</span>
                    </button>
                  </div>
                </div>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Container>
    </header>
  );
};
