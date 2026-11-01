import React from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@hudbird/ui";

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
        <Button
          variant="outline"
          size="sm"
          endContent={<ChevronDown className="h-3 w-3 opacity-50" />}
          className="border-border/40 bg-card text-[12px] font-medium"
        >
          All Categories
        </Button>
        <Button
          variant="outline"
          size="sm"
          endContent={<ChevronDown className="h-3 w-3 opacity-50" />}
          className="border-border/40 bg-card text-[12px] font-medium"
        >
          Status
        </Button>
        <Button
          variant="outline"
          size="sm"
          startContent={<SlidersHorizontal className="h-3 w-3" />}
          className="border-border/40 bg-card text-[12px] font-medium"
        >
          Filters
        </Button>
      </div>
    </div>
  );
};
