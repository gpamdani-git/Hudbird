import React from "react";
import { SaaSNavbar } from "@/components/marketing/SaaS/Navbar/SaaSNavbar";
import { SaaSHero } from "@/components/marketing/SaaS/Hero/SaaSHero";
import { SaaSLogoCloud } from "@/components/marketing/SaaS/LogoCloud/SaaSLogoCloud";
import { SaaSFeatureGrid } from "@/components/marketing/SaaS/FeatureGrid/SaaSFeatureGrid";
import { SaaSBentoGrid } from "@/components/marketing/SaaS/BentoGrid/SaaSBentoGrid";
import { SaaSPricing } from "@/components/marketing/SaaS/Pricing/SaaSPricing";
import { SaaSFaq } from "@/components/marketing/SaaS/Faq/SaaSFaq";
import { SaaSTestimonials } from "@/components/marketing/SaaS/Testimonials/SaaSTestimonials";
import { SaaSCta } from "@/components/marketing/SaaS/Cta/SaaSCta";
import { SaaSFooter } from "@/components/marketing/SaaS/Footer/SaaSFooter";

export function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 selection:bg-zinc-200/50 dark:bg-zinc-950">
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
}
