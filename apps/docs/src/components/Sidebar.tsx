import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, LifeBuoy } from "lucide-react";
import { navigationData } from "../navData";
import { motion, AnimatePresence } from "framer-motion";
import { GlobalSearch } from "./GlobalSearch";
import changelogData from "../data/changelog.json";
import { DiscordIcon } from "./SocialIcons";
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

        {/* Global Search */}
        <div className="relative z-10 mb-4 px-1">
          <GlobalSearch isMini={isMini} className="w-full justify-center" />
        </div>

        {/* Navigation Groups */}
        <div className="scrollbar-hide relative z-10 flex-1 overflow-x-hidden overflow-y-auto pr-1">
          {navigationData.map((group, groupIdx) => {
            const groupTitle = group.title || "Overview";
            const isCollapsed = Boolean(collapsedGroups[groupTitle]);

            return (
              <div key={groupIdx} className="mb-4">
                {/* Divider if not the first group */}
                {groupIdx > 0 && (
                  <div className="mr-2 mb-3 ml-2 border-t border-black/5 dark:border-white/5" />
                )}

                {/* Collapsible Group Header */}
                <button
                  type="button"
                  onClick={() => toggleGroup(groupTitle)}
                  className="group flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-[11px] font-semibold tracking-wider text-zinc-400 uppercase transition-colors hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
                >
                  <span className="truncate">{groupTitle}</span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 shrink-0 text-zinc-400/80 transition-transform duration-200 group-hover:text-zinc-600 dark:text-zinc-600 dark:group-hover:text-zinc-400",
                      isCollapsed ? "-rotate-90" : "rotate-0"
                    )}
                  />
                </button>

                {/* Group Items */}
                <AnimatePresence initial={false}>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="relative space-y-0.5 pt-0.5">
                        {group.items.map((item) => (
                          <li key={item.path}>
                            <NavLink
                              to={item.path}
                              onClick={() => {
                                if (window.innerWidth < 1024) onClose?.();
                              }}
                              className={({ isActive }) =>
                                cn(
                                  "group relative flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] transition-all duration-150 outline-none",
                                  isActive
                                    ? "bg-zinc-100 font-medium text-zinc-900 shadow-xs dark:bg-white/10 dark:text-white"
                                    : "font-normal text-zinc-500 hover:bg-black/5 hover:text-zinc-900 dark:text-zinc-400/80 dark:hover:bg-white/5 dark:hover:text-white"
                                )
                              }
                              title={item.name}
                            >
                              {({ isActive }) => (
                                <>
                                  <span className="truncate">{item.name}</span>

                                  {!isMini && item.variants !== undefined && (
                                    <span
                                      className={cn(
                                        "rounded px-1.5 py-0.5 font-mono text-[9px] font-medium transition-opacity duration-150",
                                        isActive
                                          ? "bg-zinc-200/80 text-zinc-800 dark:bg-white/10 dark:text-zinc-300"
                                          : "bg-black/5 text-zinc-400 opacity-60 group-hover:opacity-100 dark:bg-white/5 dark:text-zinc-500"
                                      )}
                                    >
                                      {item.variants}
                                    </span>
                                  )}
                                  {!isMini && item.isNew && item.variants === undefined && (
                                    <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-medium text-emerald-600 dark:text-emerald-400">
                                      New
                                    </span>
                                  )}
                                </>
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

          {/* Divider */}
          <div className="mr-2 mb-3 ml-2 border-t border-black/5 dark:border-white/5" />

          {/* Community Section */}
          <div className="mb-2">
            <button
              type="button"
              onClick={() => toggleGroup("Community")}
              className="group flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-[11px] font-semibold tracking-wider text-zinc-400 uppercase transition-colors hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
              <span>Community</span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 shrink-0 text-zinc-400/80 transition-transform duration-200 group-hover:text-zinc-600 dark:text-zinc-600 dark:group-hover:text-zinc-400",
                  collapsedGroups["Community"] ? "-rotate-90" : "rotate-0"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {!collapsedGroups["Community"] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <ul className="relative space-y-0.5 pt-0.5">
                    <li>
                      <a
                        href="https://discord.gg/NPBspwkXke"
                        target="_blank"
                        rel="noreferrer"
                        className="group relative flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] font-normal text-zinc-500 transition-all duration-150 outline-none hover:bg-black/5 hover:text-[#5865F2] dark:text-zinc-400/80 dark:hover:bg-white/5 dark:hover:text-[#5865F2]"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <DiscordIcon className="h-3.5 w-3.5 shrink-0 text-[#5865F2]" />
                          <span className="truncate">Discord Community</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/gpamdani-git/Hudbird/discussions"
                        target="_blank"
                        rel="noreferrer"
                        className="group relative flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] font-normal text-zinc-500 transition-all duration-150 outline-none hover:bg-black/5 hover:text-zinc-900 dark:text-zinc-400/80 dark:hover:bg-white/5 dark:hover:text-white"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <LifeBuoy className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">GitHub Discussions</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </aside>
    </>
  );
};
