import React, { useEffect } from "react";
import { SaaSNavbar } from "@/components/marketing/SaaS/Navbar/SaaSNavbar";
import {
  AgencyHero,
  AgencyAbout,
  AgencyProjects,
  AgencyServices,
  AgencyExperiences,
  AgencyCta,
  AgencyFooter,
} from "@hudbird/marketing";

export function Agency() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.backgroundColor = "";
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col bg-white font-sans dark:bg-zinc-950">
      <SaaSNavbar />
      <AgencyHero />
      <AgencyAbout />
      <AgencyProjects />
      <AgencyServices />
      <AgencyExperiences />
      <AgencyCta />
      <AgencyFooter />
    </main>
  );
}
