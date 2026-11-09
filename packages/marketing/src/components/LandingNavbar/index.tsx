"use client";
import * as React from "react";
import {
  Button,
  Grid,
  Text,
  IconBox,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMegaMenu,
} from "@hudbird/ui";
import type {
  BrandProfile,
  LandingSectionProps,
  NavbarVariant,
  NavbarCustomSettings,
} from "@hudbird/schemas";
import { LandingFrame, LandingActionButton, useLandingNavigation } from "../LandingShared";
import { resolveNavbarPreset } from "./presetMatrix";
import { Nav01SaaSClassic } from "./presets/Nav01SaaSClassic";
import { Nav02SaaSFloating } from "./presets/Nav02SaaSFloating";
import { Nav03SaaSPlatform } from "./presets/Nav03SaaSPlatform";
import { Nav04StartupLaunch } from "./presets/Nav04StartupLaunch";
import { Nav05CreativeAgency } from "./presets/Nav05CreativeAgency";
import { Nav06CreativeStudio } from "./presets/Nav06CreativeStudio";
import { Nav07Portfolio } from "./presets/Nav07Portfolio";
import { Nav08CorporateClassic } from "./presets/Nav08CorporateClassic";
import { Nav09CorporateEnterprise } from "./presets/Nav09CorporateEnterprise";
import { Nav10LuxuryHospitality } from "./presets/Nav10LuxuryHospitality";
import { Nav11RestaurantFB } from "./presets/Nav11RestaurantFB";
import { Nav12ProfessionalServices } from "./presets/Nav12ProfessionalServices";

export * from "./types";
export * from "./presetMatrix";
export * from "./useNavbarScroll";
export * from "./useActiveSection";
export * from "./NavbarContainer";
export * from "./NavbarBrandMark";
export * from "./NavbarDrawerContent";

export function LandingNavbar({
  variant,
  content,
  brand,
  brandContent,
  endContent,
  customSettings,
}: LandingSectionProps<"navbar"> & {
  brand: BrandProfile;
  brandContent?: React.ReactNode;
  endContent?: React.ReactNode;
  customSettings?: NavbarCustomSettings;
}) {
  const meta = resolveNavbarPreset(variant);
  const presetId = meta.id;

  const renderPreset = () => {
    switch (presetId) {
      case "nav-01":
        return (
          <Nav01SaaSClassic
            brand={brand}
            content={content}
            brandContent={brandContent}
            endContent={endContent}
            customSettings={customSettings}
          />
        );
      case "nav-02":
        return (
          <Nav02SaaSFloating
            brand={brand}
            content={content}
            brandContent={brandContent}
            endContent={endContent}
            customSettings={customSettings}
          />
        );
      case "nav-03":
        return (
          <Nav03SaaSPlatform
            brand={brand}
            content={content}
            brandContent={brandContent}
            endContent={endContent}
            customSettings={customSettings}
          />
        );
      case "nav-04":
        return (
          <Nav04StartupLaunch
            brand={brand}
            content={content}
            brandContent={brandContent}
            endContent={endContent}
            customSettings={customSettings}
          />
        );
      case "nav-05":
        return (
          <Nav05CreativeAgency
            brand={brand}
            content={content}
            brandContent={brandContent}
            endContent={endContent}
            customSettings={customSettings}
          />
        );
      case "nav-06":
        return (
          <Nav06CreativeStudio
            brand={brand}
            content={content}
            brandContent={brandContent}
            endContent={endContent}
            customSettings={customSettings}
          />
        );
      case "nav-07":
        return (
          <Nav07Portfolio
            brand={brand}
            content={content}
            brandContent={brandContent}
            endContent={endContent}
            customSettings={customSettings}
          />
        );
      case "nav-08":
        return (
          <Nav08CorporateClassic
            brand={brand}
            content={content}
            brandContent={brandContent}
            endContent={endContent}
            customSettings={customSettings}
          />
        );
      case "nav-09":
        return (
          <Nav09CorporateEnterprise
            brand={brand}
            content={content}
            brandContent={brandContent}
            endContent={endContent}
            customSettings={customSettings}
          />
        );
      case "nav-10":
        return (
          <Nav10LuxuryHospitality
            brand={brand}
            content={content}
            brandContent={brandContent}
            endContent={endContent}
            customSettings={customSettings}
          />
        );
      case "nav-11":
        return (
          <Nav11RestaurantFB
            brand={brand}
            content={content}
            brandContent={brandContent}
            endContent={endContent}
            customSettings={customSettings}
          />
        );
      case "nav-12":
        return (
          <Nav12ProfessionalServices
            brand={brand}
            content={content}
            brandContent={brandContent}
            endContent={endContent}
            customSettings={customSettings}
          />
        );
      default:
        return (
          <Nav01SaaSClassic
            brand={brand}
            content={content}
            brandContent={brandContent}
            endContent={endContent}
            customSettings={customSettings}
          />
        );
    }
  };

  const customClass = React.useMemo(() => {
    if (!customSettings) return "";
    const classes: string[] = [];

    if (customSettings.surface === "transparent") {
      classes.push(
        "[&_[data-navbar-preset]]:!bg-transparent [&_[data-navbar-preset]]:!border-transparent [&_[data-navbar-preset]]:!shadow-none"
      );
    } else if (customSettings.surface === "glass") {
      classes.push(
        "[&_[data-navbar-preset]]:!bg-background/80 [&_[data-navbar-preset]]:!backdrop-blur-xl [&_[data-navbar-preset]]:!border-b [&_[data-navbar-preset]]:!border-border/40"
      );
    } else if (customSettings.surface === "solid") {
      classes.push(
        "[&_[data-navbar-preset]]:!bg-background [&_[data-navbar-preset]]:!border-b [&_[data-navbar-preset]]:!border-border"
      );
    }

    if (customSettings.containerWidth === "compact") {
      classes.push(
        "[&_[data-navbar-preset]_.max-w-6xl]:!max-w-5xl [&_[data-navbar-preset]_.max-w-7xl]:!max-w-5xl"
      );
    } else if (customSettings.containerWidth === "standard") {
      classes.push(
        "[&_[data-navbar-preset]_.max-w-5xl]:!max-w-6xl [&_[data-navbar-preset]_.max-w-7xl]:!max-w-6xl"
      );
    } else if (customSettings.containerWidth === "wide") {
      classes.push(
        "[&_[data-navbar-preset]_.max-w-5xl]:!max-w-7xl [&_[data-navbar-preset]_.max-w-6xl]:!max-w-7xl"
      );
    } else if (customSettings.containerWidth === "full") {
      classes.push(
        "[&_[data-navbar-preset]_.max-w-5xl]:!max-w-full [&_[data-navbar-preset]_.max-w-6xl]:!max-w-full [&_[data-navbar-preset]_.max-w-7xl]:!max-w-full"
      );
    }

    if (customSettings.showCta === false) {
      classes.push(
        "[&_[data-navbar-preset]_.hb-primary]:!hidden [&_[data-navbar-preset]_.hb-cta]:!hidden"
      );
    }

    if (customSettings.heroClearance === "none") {
      classes.push("mb-0");
    } else if (customSettings.heroClearance === "compact") {
      classes.push("mb-4");
    } else if (customSettings.heroClearance === "generous") {
      classes.push("mb-12 sm:mb-16");
    } else if (customSettings.heroClearance === "default") {
      classes.push("mb-6 sm:mb-8");
    }

    return classes.join(" ");
  }, [customSettings]);

  return (
    <LandingFrame id="navbar" as="header" compact>
      <div className={`w-full transition-all duration-200 ${customClass}`}>{renderPreset()}</div>
    </LandingFrame>
  );
}
