import React, { useEffect } from "react";
import { SaaSNavbar } from "@/components/marketing/SaaS/Navbar/SaaSNavbar";
import {
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

export function Ecommerce() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.backgroundColor = "";
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col bg-white font-sans dark:bg-zinc-950">
      <SaaSNavbar />
      <EcommerceHero />
      <EcommerceLogoCloud />
      <EcommerceFeatureGrid />
      <EcommerceBentoGrid />
      <EcommercePricing />
      <EcommerceFaq />
      <EcommerceTestimonials />
      <EcommerceCta />
      <EcommerceFooter />
    </main>
  );
}
