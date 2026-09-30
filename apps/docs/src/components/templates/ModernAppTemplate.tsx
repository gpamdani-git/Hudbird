import React, { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { TemplateThemeToggle } from "./TemplateThemeToggle";
import {
  ModernAppNavbar,
  ModernAppHero,
  ModernAppLogoCloud,
  ModernAppGrid,
  ModernAppReflect,
  ModernAppNetwork,
  ModernAppRadar,
  ModernAppMeetings,
  ModernAppTestimonials,
  ModernAppCta,
  ModernAppFooter,
} from "@hudbird/marketing";

export const ModernAppTemplate = () => {
  const { scrollY } = useScroll();
  const [navVisible, setNavVisible] = useState(true);
  const [navCompact, setNavCompact] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() || 0;
    const diff = current - previous;
    if (current > 50) setNavCompact(true);
    else setNavCompact(false);
    if (current > 150 && diff > 5) setNavVisible(false);
    else if (diff < -5 || current <= 150) setNavVisible(true);
  });

  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 selection:bg-rose-500/30 dark:bg-zinc-950">
      <TemplateThemeToggle />
      <ModernAppNavbar navVisible={navVisible} navCompact={navCompact} />
      <ModernAppHero />
      <ModernAppLogoCloud />
      <ModernAppGrid />
      <ModernAppReflect />
      <ModernAppNetwork />
      <ModernAppRadar />
      <ModernAppMeetings />
      <ModernAppTestimonials />
      <ModernAppCta />
      <ModernAppFooter />
    </div>
  );
};
