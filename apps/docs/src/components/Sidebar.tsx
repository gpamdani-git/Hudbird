import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  X,
  LifeBuoy,
  Component,
  Layout,
  Box,
  CircleDot,
  PanelLeftClose,
  PanelLeft,
  Bot,
  Terminal,
} from "lucide-react";
import { navigationData } from "../navData";
import { motion, AnimatePresence } from "framer-motion";
import { GlobalSearch } from "./GlobalSearch";
import changelogData from "../data/changelog.json";
import { DiscordIcon } from "./SocialIcons";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMini?: boolean;
  onToggleMini?: () => void;
}

// Icon mapping helper
const getIconForName = (name: string, isGroupTitle: boolean = false) => {
  if (name === "Getting started") return <Home className="h-4 w-4 shrink-0" />;
  if (name === "CLI Commands") return <Terminal className="h-4 w-4 shrink-0" />;
  if (name === "AI Agent Skills")
    return <Bot className="h-4 w-4 shrink-0 text-indigo-500 dark:text-indigo-400" />;
  if (name === "Templates") return <Layout className="h-4 w-4 shrink-0" />;
  if (name === "Changelog") return <Layout className="h-4 w-4 shrink-0" />;
  if (name === "Support & FAQ") return <LifeBuoy className="h-4 w-4 shrink-0" />;

  if (isGroupTitle) {
    if (name === "Layouts") return <Layout className="h-4 w-4 shrink-0" />;
    if (name === "Marketing Sections") return <Component className="h-4 w-4 shrink-0" />;
    if (name === "Components") return <Box className="h-4 w-4 shrink-0" />;
  }

  return <CircleDot className="h-4 w-4 shrink-0 opacity-50" />;
};

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  isMini = false,
  onToggleMini,
}) => {
  const isMobileVisible = isOpen ? "translate-x-0" : "-translate-x-[120%]";
  const isDesktopVisible = !isMini ? "lg:translate-x-0" : "lg:-translate-x-[120%]";
  const transformClasses = `${isMobileVisible} ${isDesktopVisible}`;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className={`fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-sm lg:hidden`}
        />
      )}

      <aside
        className={`fixed top-3 bottom-3 left-3 z-50 flex w-64 flex-col overflow-hidden rounded-xl border border-white/50 bg-white/50 px-3 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-3xl dark:border-white/10 dark:bg-[#1a1a1c]/60 dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] ${transformClasses} transition-transform duration-300 ease-in-out`}
      >
        {/* Subtle glass gradients to enhance blur beautifulness */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/60 to-transparent dark:from-white/5 dark:to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/60 to-transparent dark:from-white/5 dark:to-transparent" />

        {/* Header / Logo */}
        <div className="relative z-10 mb-4 flex items-center justify-between px-1.5">
          <NavLink
            to="/"
            className="flex items-center gap-3 overflow-hidden transition-opacity hover:opacity-80"
          >
            <img
              src="/assets/new-logo/hudbirdui-icon-black.svg"
              alt="Hudbird UI"
              className="h-7 w-7 shrink-0 object-contain dark:hidden"
            />
            <img
              src="/assets/new-logo/hudbirdui-icon-white.svg"
              alt="Hudbird UI"
              className="hidden h-7 w-7 shrink-0 object-contain dark:block"
            />

            <div className="flex flex-col whitespace-nowrap">
              <span className="text-[13px] font-bold tracking-tight text-zinc-900 dark:text-white">
                Hudbird UI
              </span>
              <span className="text-[10px] font-medium text-zinc-500">
                v{changelogData[0]?.version || "1.2.0"}
              </span>
            </div>
          </NavLink>
        </div>

        {/* Global Search */}
        <div className="relative z-10 mb-5 px-1">
          <GlobalSearch isMini={isMini} className="w-full justify-center" />
        </div>

        {/* Navigation Groups */}
        <div className="scrollbar-hide relative z-10 flex-1 overflow-x-hidden overflow-y-auto">
          {navigationData.map((group, groupIdx) => (
            <div key={groupIdx} className="mb-6">
              {/* Divider if not the first group */}
              {groupIdx > 0 && (
                <div className="mr-2 mb-3 ml-2 border-t border-black/5 dark:border-white/5" />
              )}

              {/* Group Title */}
              {group.title && (
                <h5 className="mb-2 px-2.5 text-[11px] font-bold tracking-wider whitespace-nowrap text-zinc-400 dark:text-zinc-500">
                  {group.title}
                </h5>
              )}

              <ul className="relative space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose?.();
                      }}
                      className={({ isActive }) =>
                        `group relative flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] transition-all duration-200 ease-in-out outline-none ${
                          isActive
                            ? "bg-black/10 font-medium text-zinc-900 shadow-xs dark:bg-white/15 dark:text-white"
                            : "text-zinc-600 hover:bg-black/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-200"
                        }`
                      }
                      title={isMini ? item.name : undefined}
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            {getIconForName(item.name)}
                            <span className="whitespace-nowrap">{item.name}</span>
                          </div>

                          {!isMini && item.variants !== undefined && (
                            <span
                              className={`rounded px-1.5 py-0.5 text-[9px] leading-none font-bold transition-opacity duration-200 ${
                                isActive
                                  ? "bg-white/60 text-zinc-800 opacity-100 dark:bg-black/30 dark:text-zinc-300"
                                  : "bg-black/5 text-zinc-500 opacity-0 group-hover:opacity-100 dark:bg-white/10 dark:text-zinc-400"
                              }`}
                            >
                              {item.variants}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Divider */}
          <div className="mr-2 mb-3 ml-2 border-t border-black/5 dark:border-white/5" />

          {/* Community Section */}
          <div className="mb-2">
            <h5 className="mb-2 px-2.5 text-[11px] font-bold tracking-wider whitespace-nowrap text-zinc-400 dark:text-zinc-500">
              Community
            </h5>
            <ul className="relative space-y-0.5">
              <li>
                <a
                  href="https://discord.gg/NPBspwkXke"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] text-zinc-600 transition-all duration-200 ease-in-out outline-none hover:bg-black/5 hover:text-[#5865F2] dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-[#5865F2]"
                  title={isMini ? "Discord Community" : undefined}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <DiscordIcon className="h-4 w-4 shrink-0 text-[#5865F2]" />
                    <span className="whitespace-nowrap">Discord Community</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/gpamdani-git/Hudbird/discussions"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] text-zinc-600 transition-all duration-200 ease-in-out outline-none hover:bg-black/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-200"
                  title={isMini ? "GitHub Discussions" : undefined}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <LifeBuoy className="h-4 w-4 shrink-0" />
                    <span className="whitespace-nowrap">GitHub Discussions</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};
