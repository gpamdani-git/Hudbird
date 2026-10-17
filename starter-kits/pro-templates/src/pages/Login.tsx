import React from "react";
import { digitalAgencyNiche } from "@hudbird/schemas";
import { NavbarMegaMenu } from "@/components/nexus-sections/NavbarMegaMenu";
import { SplitTextCtaFooter } from "@/components/nexus-sections/SplitTextCtaFooter";
import { HudbirdAuthUtilityView } from "@/components/nexus-sections/inner-pages/HudbirdAuthUtilityViews";

export function Login() {
  return (
    <div className="min-h-screen bg-[#F4F5F8] font-sans text-zinc-900 dark:bg-[#0B0C10] dark:text-white">
      <NavbarMegaMenu data={digitalAgencyNiche.sections.navbar} />
      <HudbirdAuthUtilityView niche={digitalAgencyNiche} initialMode="sign-in" />
      <SplitTextCtaFooter data={digitalAgencyNiche.sections.footer} />
    </div>
  );
}
