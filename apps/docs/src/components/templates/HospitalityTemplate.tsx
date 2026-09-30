import React from "react";
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

export function HospitalityTemplate() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#111111]">
      <HospitalityHero />
      <HospitalityHighlights />
      <HospitalityDining />
      <HospitalitySpa />
      <HospitalityExperiences />
      <HospitalityFooterHero />
      <HospitalityCuratedJourneys />
      <HospitalityFooter />
    </div>
  );
}
