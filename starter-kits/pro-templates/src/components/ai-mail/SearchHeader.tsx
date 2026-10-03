import React from "react";
import { Search, Menu, Settings, HelpCircle, Grid, SlidersHorizontal } from "lucide-react";
import { Avatar } from "@/components/ui";

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onMenuToggle: () => void;
  onProfileClick: () => void;
}

export function SearchHeader({
  searchQuery,
  onSearchChange,
  onMenuToggle,
  onProfileClick,
}: SearchHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4 dark:border-white/10 dark:bg-[#111111]">
      <div className="flex w-[240px] items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="rounded-full p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <img
            src="/assets/new-logo/hudbirdui-icon-black.svg"
            className="h-8 w-8 dark:hidden"
            alt="Logo"
          />
          <img
            src="/assets/new-logo/hudbirdui-icon-white.svg"
            className="hidden h-8 w-8 dark:block"
            alt="Logo"
          />
          <span className="text-xl font-medium tracking-tight text-zinc-600 dark:text-zinc-300">
            Mail
          </span>
        </div>
      </div>

      <div className="max-w-[720px] flex-1 px-8">
        <div className="relative flex h-12 items-center rounded-full bg-[#f0f4f9] px-2 transition-shadow focus-within:bg-white focus-within:shadow-md dark:bg-zinc-800/50 dark:focus-within:bg-zinc-800">
          <div className="p-2 text-zinc-500">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search mail"
            className="flex-1 border-none bg-transparent px-2 text-base outline-none"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700">
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button className="rounded-full p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
          <HelpCircle className="h-5 w-5" />
        </button>
        <button className="rounded-full p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
          <Settings className="h-5 w-5" />
        </button>
        <button className="rounded-full p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
          <Grid className="h-5 w-5" />
        </button>
        <div className="ml-2 cursor-pointer" onClick={onProfileClick}>
          <Avatar
            name="Dani Akbar"
            size="sm"
            className="ring-2 ring-transparent transition-all hover:ring-blue-100"
          />
        </div>
      </div>
    </header>
  );
}
