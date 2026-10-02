import React from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function MarketingLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-zinc-900 dark:bg-[#030712] dark:text-white">
      <SiteHeader />

      <main className="flex-1 pt-20 lg:pt-24">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
