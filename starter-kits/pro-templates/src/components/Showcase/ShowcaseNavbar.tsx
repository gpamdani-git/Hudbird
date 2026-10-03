import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@hudbird/ui";
import { ChevronDown } from "lucide-react";

export function ShowcaseNavbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 flex w-full items-center justify-center px-4 py-4 sm:px-6 lg:px-8"
    >
      <div className="flex w-full max-w-7xl items-center justify-between rounded-full border border-zinc-200/50 bg-white/70 px-6 py-3 shadow-sm backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/70">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-heading text-lg font-bold text-zinc-900 dark:text-white">
            BlankUI Pro
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <button className="flex items-center gap-1 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
            Prebuilt Websites <ChevronDown className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-1 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
            Inner Pages <ChevronDown className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-1 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
            Admin CMS <ChevronDown className="h-4 w-4" />
          </button>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Button className="rounded-full font-semibold">Purchase Now</Button>
        </div>
      </div>
    </motion.header>
  );
}
