import React, { useState } from "react";
import { TemplateThemeToggle } from "./TemplateThemeToggle";
import {
  FintechNavbar,
  FintechHero,
  FintechLogoCloud,
  FintechFeatureGrid,
  FintechBentoGrid,
  FintechPricing,
  FintechFaq,
  FintechTestimonials,
  FintechCta,
  FintechFooter,
} from "@hudbird/marketing/fintech";

export const FintechTemplate = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 selection:bg-emerald-500/30 dark:bg-zinc-950">
      <TemplateThemeToggle />
      <FintechNavbar />
      <FintechHero />
      <FintechLogoCloud />
      <FintechFeatureGrid />
      <FintechBentoGrid />
      <FintechPricing />
      <FintechFaq />
      <FintechTestimonials />
      <FintechCta />
      <FintechFooter />
    </div>
  );
};
