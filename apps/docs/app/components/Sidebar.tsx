"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/components/button", label: "Button" },
    { href: "/components/input", label: "Input" },
    { href: "/components/card", label: "Card" },
  ];

  return (
    <aside className="hidden md:block w-[260px] shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 pr-6 border-r border-zinc-200/60 dark:border-zinc-800/60">
      <nav className="flex flex-col space-y-8 text-sm">
        <div className="flex flex-col space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1 px-3">
            Overview
          </h4>
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              pathname === "/"
                ? "bg-zinc-100 dark:bg-zinc-900 font-bold text-zinc-900 dark:text-zinc-50"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            Introduction
          </Link>
        </div>

        <div className="flex flex-col space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1 px-3">
            Components
          </h4>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-xl transition-colors ${
                  isActive
                    ? "bg-zinc-100 dark:bg-zinc-900 font-bold text-zinc-900 dark:text-zinc-50"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
