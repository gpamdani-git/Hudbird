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
      window.history.pushState(null, "", `#${id}`);
    }
  };

  const renderItem = (item: TocItem, isChild = false) => {
    const isActive = activeId === item.id;

    return (
      <li key={item.id} className="space-y-1.5">
        <a
          href={`#${item.id}`}
          onClick={(e) => scrollToSection(e, item.id)}
          className={`block text-xs transition-colors py-0.5 leading-snug ${
            isChild ? "pl-3 border-l border-zinc-200 dark:border-zinc-800" : ""
          } ${
            isActive
              ? `font-medium text-zinc-900 dark:text-zinc-50 ${isChild ? "!border-zinc-900 dark:!border-zinc-100" : ""}`
              : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
        >
          {item.title}
        </a>
        {item.children && item.children.length > 0 && (
          <ul className="space-y-1.5 pt-0.5">
            {item.children.map((child) => renderItem(child, true))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav aria-label="Table of contents" className="w-full">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3">
        On this page
      </h4>
      <ul className="space-y-2 text-xs">
        {items.map((item) => renderItem(item, false))}
      </ul>
    </nav>
  );
};
