import React from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

export const AdminToolbar = () => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative w-full max-w-xs">
        <Search className="text-muted-foreground/40 absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
        <input
          type="search"
          placeholder="Search posts..."
          className="border-border/40 bg-card text-foreground placeholder:text-muted-foreground/40 focus:border-border focus:bg-background h-9 w-full rounded-lg border pr-3 pl-9 text-[13px] transition-colors outline-none"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <button className="border-border/40 bg-card text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-8 items-center gap-1.5 rounded-lg border px-3 text-[12px] font-medium transition-colors">
          All Categories
          <ChevronDown className="h-3 w-3 opacity-50" />
        </button>
        <button className="border-border/40 bg-card text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-8 items-center gap-1.5 rounded-lg border px-3 text-[12px] font-medium transition-colors">
          Status
          <ChevronDown className="h-3 w-3 opacity-50" />
        </button>
        <button className="border-border/40 bg-card text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-8 items-center gap-1.5 rounded-lg border px-3 text-[12px] font-medium transition-colors">
          <SlidersHorizontal className="h-3 w-3" />
          Filters
        </button>
      </div>
    </div>
  );
};
