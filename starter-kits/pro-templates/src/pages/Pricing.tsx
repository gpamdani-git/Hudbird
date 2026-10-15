import React from "react";
import { SaaSNavbar } from "@/components/marketing/SaaS/Navbar/SaaSNavbar";
import { SaaSPricing } from "@/components/marketing/SaaS/Pricing/SaaSPricing";
import { SaaSFaq } from "@/components/marketing/SaaS/Faq/SaaSFaq";
import { SaaSFooter } from "@/components/marketing/SaaS/Footer/SaaSFooter";

export function Pricing() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 selection:bg-zinc-200/50 dark:bg-[#070912]">
      <SaaSNavbar />

      <div className="pt-24 sm:pt-32">
        <SaaSPricing />
      </div>

      <SaaSFaq />
      <SaaSFooter />
    </div>
  );
}
