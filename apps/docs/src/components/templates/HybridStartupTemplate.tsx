import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  CustomCursor,
  AiStartupHero,
  AiStartupLogoCloud,
  AgencyAbout,
  AgencyProjects,
  AiStartupFeatures,
  AgencyExperiences,
  AiStartupCta,
  AiStartupFooter,
} from "@hudbird/marketing";
import { useTemplateTheme } from "./TemplateThemeToggle";

// Minimal mock data for AgencyProjects
const MOCK_PROJECTS = [
  {
    name: "AI Copilot Core",
    category: "SaaS Application",
    overview:
      "A sleek and futuristic AI startup dashboard with dark mode, glowing neon accents, and real-time processing visualizations.",
    year: "2025",
    client: "Acme AI",
    scope: ["UX/UI Design", "Frontend Dev", "Framer Motion"],
    image: "/agency/1.png",
    images: ["/agency/1.png", "/agency/2.png"],
  },
  {
    name: "Nova Workspace",
    category: "Productivity",
    overview:
      "An elegant, minimalist workspace tool for creative agencies focusing on typography and whitespace.",
    year: "2024",
    client: "Nova Inc",
    scope: ["Art Direction", "Web Design"],
    image: "/agency/2.png",
    images: ["/agency/2.png", "/agency/3.png"],
  },
];

export const HybridStartupTemplate = () => {
  const { theme, toggleTheme } = useTemplateTheme();

  // State for Agency blocks
  const [activeProject, setActiveProject] = useState<any>(null);

  // Scroll to top when opening a project (from Agency logic)
  useEffect(() => {
    if (activeProject) {
      window.scrollTo(0, 0);
    }
  }, [activeProject]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white selection:bg-blue-500/30 dark:bg-[#030712]">
      {/* 
        Custom Cursor from Agency template. 
        It adapts based on hover state of data-cursor elements. 
      */}
      <CustomCursor />

      {/* --- SECTION 1: AiStartup (Futuristic, High-Tech) --- */}
      <AiStartupHero theme={theme} toggleTheme={toggleTheme} />
      <AiStartupLogoCloud />

      {/* --- SECTION 2: Agency (Minimalist, Editorial, Light-Mode focused) --- */}
      {/* Note: Agency blocks have their own bg-[#F4F2ED] defined inside them */}
      <div>
        <AgencyAbout />
        <AgencyProjects projects={MOCK_PROJECTS} setActiveProject={setActiveProject} />
      </div>

      {/* --- SECTION 3: AiStartup (Bento Grid) --- */}
      {/* Note: AiStartupFeatures will use dark:bg-[#030712] */}
      <AiStartupFeatures />

      {/* --- SECTION 4: Agency (Experiences / Client List) --- */}
      <AgencyExperiences />

      {/* --- SECTION 5: AiStartup (Terminal CTA & Mega Footer) --- */}
      <AiStartupCta />
      <AiStartupFooter />
    </div>
  );
};
