import React, { useEffect } from "react";
import { SaaSNavbar } from "@/components/marketing/SaaS/Navbar/SaaSNavbar";
import {
  FintechHero,
  FintechLogoCloud,
  FintechFeatureGrid,
  FintechBentoGrid,
  FintechPricing,
  FintechFaq,
  FintechTestimonials,
  FintechCta,
  FintechFooter,
} from "@hudbird/marketing";

export function Fintech() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.backgroundColor = "";
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col bg-white font-sans dark:bg-zinc-950">
      <SaaSNavbar />
      <FintechHero />
      <FintechLogoCloud />
      <FintechFeatureGrid />
      <FintechBentoGrid />
      <FintechPricing />
      <FintechFaq />
      <FintechTestimonials />
      <FintechCta />
      <FintechFooter />
    </main>
  );
}
