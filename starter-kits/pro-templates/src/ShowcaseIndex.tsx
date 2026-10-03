import React, { useEffect } from "react";
import { ShowcaseNavbar } from "./components/Showcase/ShowcaseNavbar";
import { ShowcaseHero } from "./components/Showcase/ShowcaseHero";
import { ShowcaseGallery } from "./components/Showcase/ShowcaseGallery";

export function ShowcaseIndex() {
  useEffect(() => {
    // Reset any strict dark mode locks from other pages
    document.documentElement.style.backgroundColor = "";
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col bg-zinc-50 font-sans dark:bg-zinc-950">
      <ShowcaseNavbar />
      <ShowcaseHero />
      <ShowcaseGallery />

      {/* Spacer for footer */}
      <div className="h-32" />
    </main>
  );
}
