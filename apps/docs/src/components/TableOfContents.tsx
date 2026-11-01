import React, { useEffect, useState } from "react";

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
      <li key={item.id} className="space-y-1">
        <a
          href={`#${item.id}`}
          onClick={(e) => scrollToSection(e, item.id)}
          className={`block py-1 text-[13px] transition-all duration-150 select-none ${
            isChild ? "pl-2" : ""
          } ${
            isActive
              ? "font-bold text-zinc-950 dark:text-white"
              : "font-semibold text-zinc-400 hover:font-bold hover:text-zinc-950 dark:text-zinc-500 dark:hover:font-bold dark:hover:text-white"
          }`}
        >
          {item.title}
        </a>
        {item.children && item.children.length > 0 && (
          <ul className="ml-2 space-y-0.5 border-l border-black/5 pt-0.5 pl-2 dark:border-white/5">
            {item.children.map((child) => renderItem(child, true))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav aria-label="Table of contents" className="w-full">
      <h4 className="mb-3 text-[11px] font-bold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
        On This Page
      </h4>
      <ul className="ml-1 space-y-1 border-l border-black/5 pl-2 text-sm dark:border-white/5">
        {items.map((item) => renderItem(item, false))}
      </ul>

      {/* Subtle Support section */}
      <div className="mt-8 rounded-xl border border-black/5 bg-black/[0.02] p-3.5 dark:border-white/5 dark:bg-white/[0.02]">
        <h5 className="mb-1 text-xs font-bold text-zinc-900 dark:text-zinc-100">
          Support Hudbird UI
        </h5>
        <p className="mb-3 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          Report bugs or request new features on GitHub.
        </p>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/gpamdani-git/Hudbird/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-7 flex-1 items-center justify-center rounded-lg border border-black/10 bg-white px-2.5 text-[11px] font-semibold text-zinc-800 transition-all hover:-translate-y-0.5 hover:bg-zinc-50 active:translate-y-0 active:scale-[0.98] dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            Open Issue
          </a>
          <a
            href="https://discord.gg/NPBspwkXke"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-7 flex-1 items-center justify-center rounded-lg border border-black/10 bg-white px-2.5 text-[11px] font-semibold text-[#5865F2] transition-all hover:-translate-y-0.5 hover:bg-zinc-50 active:translate-y-0 active:scale-[0.98] dark:border-white/10 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            Discord
          </a>
        </div>
      </div>
    </nav>
  );
};
