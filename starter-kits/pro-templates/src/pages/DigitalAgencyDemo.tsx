// starter-kits/pro-templates/src/pages/DigitalAgencyDemo.tsx
"use client";

import React, { useState, useEffect } from "react";
import { digitalAgencyNiche } from "@hudbird/schemas";
import { SectionRenderer, LivePreviewToolbar } from "../components/nexus-sections";

export function DigitalAgencyDemo() {
  const [accentColor, setAccentColor] = useState("#7C3AED");

  useEffect(() => {
    document.title = `${digitalAgencyNiche.name} — HudbirdUI Digital Agency Platform`;

    const params = new URLSearchParams(window.location.search);
    const themeParam = params.get("theme");

    if (themeParam === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      // Soft off-white light mode by default
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F4F5F8] text-zinc-900 transition-colors duration-300 dark:bg-[#0B0B10] dark:text-white">
      <SectionRenderer niche={digitalAgencyNiche} customBrandPrimary={accentColor} />

      <LivePreviewToolbar
        currentAccentColor={accentColor}
        onAccentColorChange={(color) => setAccentColor(color)}
      />
    </div>
  );
}

export default DigitalAgencyDemo;
