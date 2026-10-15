import React from "react";
import { TemplateThemeToggle } from "./TemplateThemeToggle";
import {
  SaaSNavbar,
  SaaSHero,
  SaaSLogoCloud,
  SaaSFeatureGrid,
  SaaSBentoGrid,
  SaaSPricing,
  SaaSFaq,
  SaaSTestimonials,
  SaaSCta,
  SaaSFooter,
} from "@hudbird/marketing/saas";

export const SaaSTemplate = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 selection:bg-blue-500/30 dark:bg-zinc-950">
      <TemplateThemeToggle />
      <SaaSNavbar />
      <SaaSHero />
      <SaaSLogoCloud />
      <SaaSFeatureGrid />
      <SaaSBentoGrid />
      <SaaSPricing />
      <SaaSFaq />
      <SaaSTestimonials />
      <SaaSCta />
      <SaaSFooter />
    </div>
  );
};
