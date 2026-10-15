import React, { useEffect } from "react";
import { SaaSNavbar } from "@/components/marketing/SaaS/Navbar/SaaSNavbar";
import {
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
} from "@hudbird/marketing/modern-app";

export function ModernApp() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.backgroundColor = "";
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col bg-white font-sans dark:bg-zinc-950">
      <SaaSNavbar />
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
    </main>
  );
}
