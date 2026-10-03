import React, { useEffect } from "react";
import {
  HospitalityHero,
  HospitalityHighlights,
  HospitalityDining,
  HospitalitySpa,
  HospitalityExperiences,
  HospitalityCuratedJourneys,
  HospitalityFooterHero,
  HospitalityFooter,
} from "@hudbird/marketing";

export function Hospitality() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.backgroundColor = "";
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#F9F9F7] font-sans">
      <HospitalityHero />
      <HospitalityHighlights />
      <HospitalityDining />
      <HospitalitySpa />
      <HospitalityExperiences />
      <HospitalityCuratedJourneys />
      <HospitalityFooterHero />
      <HospitalityFooter />
    </main>
  );
}
