import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Sparkles } from "lucide-react";
import { navigationData } from "../navData";
import { motion, AnimatePresence } from "framer-motion";
import { GlobalSearch } from "./GlobalSearch";
import changelogData from "../data/changelog.json";
import { cn } from "@hudbird/ui";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMini?: boolean;
  onToggleMini?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isMini = false }) => {
  const location = useLocation();
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  // Ensure the active item's group is always expanded
  useEffect(() => {
    const currentGroup = navigationData.find((group) =>
      group.items.some((item) => item.path === location.pathname)
    );
    if (currentGroup?.title && collapsedGroups[currentGroup.title]) {
      setCollapsedGroups((prev) => ({
        ...prev,
        [currentGroup.title!]: false,
      }));
    }
  }, [location.pathname]);

  const toggleGroup = (title: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isMobileVisible = isOpen ? "translate-x-0" : "-translate-x-[120%]";
  const isDesktopVisible = !isMini ? "lg:translate-x-0" : "lg:-translate-x-[120%]";
  const transformClasses = `${isMobileVisible} ${isDesktopVisible}`;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-3 bottom-3 left-3 z-50 flex w-64 flex-col overflow-hidden rounded-xl bg-white/80 px-3 py-4 backdrop-blur-3xl dark:bg-[#161618]/90 ${transformClasses} transition-transform duration-300 ease-in-out`}
      >
        {/* Header / Logo */}
        <div className="relative z-10 mb-4 flex items-center justify-between px-2 pt-1">
          <NavLink
            to="/"
            className="flex items-center gap-2 overflow-hidden transition-opacity hover:opacity-80"
          >
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
            <span className="ml-1 rounded-full bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-800/80 dark:text-zinc-400">
              v{changelogData[0]?.version || "1.5.0"}
            </span>
          </NavLink>
        </div>

        {/* Global Search (clean borderless & shadowless) */}
        <div className="relative z-10 mb-4 px-1">
          <GlobalSearch isMini={isMini} className="w-full justify-center" />
        </div>

        {/* Navigation Groups */}
        <div className="scrollbar-hide relative z-10 flex-1 overflow-x-hidden overflow-y-auto pr-1">
          {navigationData.map((group, groupIdx) => {
            const groupTitle = group.title || "Overview";
            const isCollapsed = Boolean(collapsedGroups[groupTitle]);

            return (
              <div key={groupIdx} className="group/section mb-3.5">
                {/* Collapsible Group Header - Bold uppercase */}
                <button
                  type="button"
                  onClick={() => toggleGroup(groupTitle)}
                  className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[11px] font-bold tracking-wider text-zinc-400 uppercase transition-colors group-hover/section:text-zinc-700 hover:!text-zinc-950 dark:text-zinc-500 dark:group-hover/section:text-zinc-300 dark:hover:!text-white"
                >
                  <span className="truncate">{groupTitle}</span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 shrink-0 text-zinc-400/80 transition-transform duration-200 group-hover/section:text-zinc-600 dark:text-zinc-600 dark:group-hover/section:text-zinc-400",
                      isCollapsed ? "-rotate-90" : "rotate-0"
                    )}
                  />
                </button>

                {/* Sub-menu with Nested Indentation (Gestalt Proximity & Common Region) */}
                <AnimatePresence initial={false}>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="relative ml-2 space-y-0.5 border-l border-black/5 pt-0.5 pl-2 dark:border-white/5">
                        {group.items.map((item) => (
                          <li key={item.path}>
                            <NavLink
                              to={item.path}
                              onClick={() => {
                                if (window.innerWidth < 1024) onClose?.();
                              }}
                              className={({ isActive }) =>
                                cn(
                                  "group relative flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] transition-all duration-150 outline-none select-none",
                                  isActive
                                    ? "bg-zinc-100 font-bold text-zinc-900 shadow-xs dark:bg-white/10 dark:text-white"
                                    : "font-semibold text-zinc-400 hover:bg-black/5 hover:font-bold hover:!text-zinc-950 dark:text-zinc-500 dark:hover:bg-white/5 dark:hover:font-bold dark:hover:!text-white"
                                )
                              }
                              title={item.name}
                            >
                              <span className="truncate">{item.name}</span>
                              {item.variants !== undefined && (
                                <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-600">
                                  {item.variants}
                                </span>
                              )}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Position 6: Templates Pro Button */}
          <div className="pt-2 pb-4">
            <button
              type="button"
              onClick={() => {
                const url = import.meta.env.DEV
                  ? "http://localhost:5174/"
                  : "https://starterkit-pro.vercel.app/";
                window.open(url, "_blank");
              }}
              className="group flex w-full items-center justify-between rounded-xl border border-zinc-200/80 bg-zinc-100/70 px-3 py-2 text-xs font-bold text-zinc-800 transition-all duration-150 hover:-translate-y-0.5 hover:bg-zinc-200/70 hover:shadow-xs active:translate-y-0 active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-amber-500 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12" />
                <span className="font-bold">Templates Pro</span>
              </div>
              <span className="rounded-md bg-zinc-200/80 px-1.5 py-0.5 text-[9px] font-bold text-zinc-800 dark:bg-white/15 dark:text-zinc-200">
                PRO
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
