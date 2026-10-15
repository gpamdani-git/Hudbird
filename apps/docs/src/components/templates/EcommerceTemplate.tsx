import React from "react";
import { TemplateThemeToggle } from "./TemplateThemeToggle";
import {
  EcommerceNavbar,
  EcommerceHero,
  EcommerceLogoCloud,
  EcommerceFeatureGrid,
  EcommerceBentoGrid,
  EcommercePricing,
  EcommerceFaq,
  EcommerceTestimonials,
  EcommerceCta,
  EcommerceFooter,
} from "@hudbird/marketing/ecommerce";

export const EcommerceTemplate = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 selection:bg-orange-500/30 dark:bg-zinc-950">
      <TemplateThemeToggle />
      <EcommerceNavbar />
      <EcommerceHero />
      <EcommerceLogoCloud />
      <EcommerceFeatureGrid />
      <EcommerceBentoGrid />
      <EcommercePricing />
      <EcommerceFaq />
      <EcommerceTestimonials />
      <EcommerceCta />
      <EcommerceFooter />
    </div>
  );
};
