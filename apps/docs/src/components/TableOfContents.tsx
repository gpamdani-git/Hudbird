import React, { useEffect, useState } from "react";
import { Coffee } from "lucide-react";
import { GithubIcon, DiscordIcon } from "./SocialIcons";

export interface TocItem {
  id: string;
  title: string;
  level?: 2 | 3;
  children?: TocItem[];
}

interface TableOfContentsProps {
  items: TocItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Collect all section ids from items and their children
    const allIds: string[] = [];
    const extractIds = (list: TocItem[]) => {
      list.forEach((item) => {
        allIds.push(item.id);
        if (item.children) {
          extractIds(item.children);
        }
      });
    };
    extractIds(items);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // Offset for header

      // Find the current active section
      for (let i = allIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(allIds[i]);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveId(allIds[i]);
            return;
          }
        }
      }

      // Default to first item if at top
      if (allIds.length > 0 && window.scrollY < 200) {
        setActiveId(allIds[0]);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Header height + padding
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  const renderItem = (item: TocItem, isChild = false) => {
    const isActive = activeId === item.id;

    return (
      <li key={item.id} className="space-y-1.5">
        <a
          href={`#${item.id}`}
          onClick={(e) => scrollToSection(e, item.id)}
          className={`block py-1 text-sm transition-colors ${
            isChild ? "border-l border-zinc-200 pl-4 dark:border-zinc-800" : ""
          } ${
            isActive
              ? `font-medium text-zinc-900 dark:text-zinc-50 ${isChild ? "!border-zinc-900 dark:!border-zinc-100" : ""}`
              : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
        >
          {item.title}
        </a>
        {item.children && item.children.length > 0 && (
          <ul className="space-y-2 pt-1">
            {item.children.map((child) => renderItem(child, true))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav aria-label="Table of contents" className="w-full">
      <h4 className="mb-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">On This Page</h4>
      <ul className="space-y-2.5 text-sm">{items.map((item) => renderItem(item, false))}</ul>

      <div className="mt-8 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <h5 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Support Hudbird UI
        </h5>
        <p className="mb-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          Help us improve the library by reporting bugs or requesting new features on GitHub.
        </p>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/gpamdani-git/Hudbird/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 flex-1 items-center justify-center rounded-md border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            Open Issue
          </a>
          <a
            href="https://discord.gg/NPBspwkXke"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-colors hover:bg-indigo-50 hover:text-[#5865F2] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-indigo-500/10 dark:hover:text-[#5865F2]"
            title="Join Discord Community"
          >
            <DiscordIcon className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/gpamdani-git/Hudbird"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            title="GitHub Repository"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href="https://www.buymeacoffee.com/daniakbar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-colors hover:bg-amber-50 hover:text-amber-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-amber-500/10 dark:hover:text-amber-500"
            title="Buy me a coffee"
          >
            <Coffee className="h-4 w-4" />
          </a>
        </div>
      </div>
    </nav>
  );
};
