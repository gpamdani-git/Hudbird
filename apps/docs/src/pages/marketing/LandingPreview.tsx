import * as React from "react";
import { useLocation } from "react-router-dom";
import {
  SaasLandingPage,
  LandingSectionPreview,
  createLandingPageConfig,
  landingSectionRegistry,
  formaLandingContent,
  pilotBrands,
} from "@hudbird/marketing";
import type { LandingSectionSelection } from "@hudbird/schemas";
import { useWebsiteMode } from "../../lib/useWebsiteMode";

export default function LandingPreview() {
  const params = new URLSearchParams(useLocation().search);
  const websiteMode = useWebsiteMode();
  const config = createLandingPageConfig();
  config.brand = {
    ...(pilotBrands.find((brand) => brand.id === params.get("brand")) ?? config.brand),
  };
  const mode = params.get("mode");
  config.themeMode = mode === "dark" || mode === "light" ? mode : "auto";
  const section = landingSectionRegistry.find(
    (definition) => definition.type === params.get("section")
  );
  if (section) {
    const variant =
      [...section.variants, ...(section.additionalVariants ?? [])].find(
        (item) => item.id === params.get("variant")
      ) ?? section.variants[0];
    return (
      <LandingSectionPreview
        selection={
          { type: section.type, variant: variant.id, enabled: true } as LandingSectionSelection
        }
        content={formaLandingContent}
        brand={{
          ...config.brand,
          mode: config.themeMode === "auto" ? websiteMode : config.themeMode,
        }}
      />
    );
  }
  return <SaasLandingPage config={config} content={formaLandingContent} />;
}
