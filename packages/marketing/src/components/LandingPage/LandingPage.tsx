"use client";
import * as React from "react";
import type {
  LandingPageConfig,
  LandingSectionContent,
  LandingSectionSelection,
  LandingSectionType,
  BrandProfile,
} from "@hudbird/schemas";
import { Heading, Text } from "@hudbird/ui";
import { BrandScope, HeroSection } from "../HeroSection";
import {
  LandingMotionContext,
  LandingNavigationContext,
  landingSectionTypes,
  useLandingMode,
} from "../LandingShared";
import { LandingNavbar } from "../LandingNavbar";
import { LandingLogoCloud } from "../LandingLogoCloud";
import { LandingBenefits } from "../LandingBenefits";
import { LandingFeatureShowcase } from "../LandingFeatureShowcase";
import { LandingHowItWorks } from "../LandingHowItWorks";
import { LandingIntegrations } from "../LandingIntegrations";
import { LandingTestimonials } from "../LandingTestimonials";
import { LandingPricing } from "../LandingPricing";
import { LandingFaq } from "../LandingFaq";
import { LandingCta } from "../LandingCta";
import { LandingFooter } from "../LandingFooter";

export function LandingSection({
  selection,
  content,
  brand,
}: {
  selection: LandingSectionSelection;
  content: LandingSectionContent;
  brand: BrandProfile;
}) {
  switch (selection.type) {
    case "navbar":
      return <LandingNavbar variant={selection.variant} content={content.navbar} brand={brand} />;
    case "hero":
      return (
        <div data-landing-section="hero">
          <HeroSection
            id="hero"
            content={content.hero.content}
            config={content.hero.variants[selection.variant]}
          />
        </div>
      );
    case "logos":
      return <LandingLogoCloud variant={selection.variant} content={content.logos} />;
    case "benefits":
      return <LandingBenefits variant={selection.variant} content={content.benefits} />;
    case "features":
      return <LandingFeatureShowcase variant={selection.variant} content={content.features} />;
    case "how-it-works":
      return <LandingHowItWorks variant={selection.variant} content={content["how-it-works"]} />;
    case "integrations":
      return <LandingIntegrations variant={selection.variant} content={content.integrations} />;
    case "testimonials":
      return <LandingTestimonials variant={selection.variant} content={content.testimonials} />;
    case "pricing":
      return <LandingPricing variant={selection.variant} content={content.pricing} />;
    case "faq":
      return <LandingFaq variant={selection.variant} content={content.faq} />;
    case "cta":
      return <LandingCta variant={selection.variant} content={content.cta} />;
    case "footer":
      return <LandingFooter variant={selection.variant} content={content.footer} brand={brand} />;
  }
}

export function SaasLandingPage({
  config,
  content,
}: {
  config: LandingPageConfig;
  content: LandingSectionContent;
}) {
  const websiteMode = useLandingMode();
  const brand = {
    ...config.brand,
    mode: config.themeMode === "auto" ? websiteMode : config.themeMode,
  };
  const visible = config.sections
    .filter((section) => section.enabled)
    .map((section) => section.type);
  const first = visible.find((type) => type !== "navbar" && type !== "footer");
  const hrefFor = (href: string) => {
    if (!href.startsWith("#") || href === "#landing-page") return href;
    return visible.includes(href.slice(1) as LandingSectionType)
      ? href
      : first
        ? `#${first}`
        : "#landing-page";
  };
  const render = (section: LandingSectionSelection) => (
    <LandingSection
      key={section.type}
      selection={section}
      brand={brand}
      content={{
        ...content,
        hero: {
          ...content.hero,
          content: {
            ...content.hero.content,
            primaryAction: {
              ...content.hero.content.primaryAction,
              href: hrefFor(content.hero.content.primaryAction.href),
            },
            secondaryAction: content.hero.content.secondaryAction
              ? {
                  ...content.hero.content.secondaryAction,
                  href: hrefFor(content.hero.content.secondaryAction.href),
                }
              : undefined,
          },
        },
      }}
    />
  );
  return (
    <BrandScope
      brand={brand}
      data-landing-page
      data-landing-smooth-scroll={config.motion?.smoothScroll ?? true}
      className="min-h-[100dvh]"
    >
      <LandingMotionContext.Provider
        value={config.motion ?? { reveal: "subtle", autoplay: true, smoothScroll: true }}
      >
        <LandingNavigationContext.Provider value={{ visible, hrefFor }}>
          {config.sections
            .filter((section) => section.enabled && section.type === "navbar")
            .map(render)}
          <main id="landing-page" tabIndex={-1}>
            {!visible.includes("hero") && (
              <Heading as="h1" className="sr-only">
                {brand.name} product overview
              </Heading>
            )}
            {config.sections
              .filter(
                (section) =>
                  section.enabled && section.type !== "navbar" && section.type !== "footer"
              )
              .map(render)}
            {!first && (
              <div className="p-8">
                <Heading as="h2" size="h3">
                  Your page starts here.
                </Heading>
                <Text>Enable a content section to preview your page.</Text>
              </div>
            )}
          </main>
          {config.sections
            .filter((section) => section.enabled && section.type === "footer")
            .map(render)}
        </LandingNavigationContext.Provider>
      </LandingMotionContext.Provider>
    </BrandScope>
  );
}

export function LandingSectionPreview({
  selection,
  content,
  brand,
}: {
  selection: LandingSectionSelection;
  content: LandingSectionContent;
  brand: BrandProfile;
}) {
  return (
    <BrandScope
      brand={brand}
      id="landing-preview"
      data-landing-preview-type={selection.type}
      data-landing-preview-variant={selection.variant}
    >
      <LandingNavigationContext.Provider
        value={{ visible: landingSectionTypes, hrefFor: () => "#landing-preview" }}
      >
        <LandingSection
          selection={selection}
          content={{
            ...content,
            hero: {
              ...content.hero,
              content: {
                ...content.hero.content,
                primaryAction: { ...content.hero.content.primaryAction, href: "#landing-preview" },
                secondaryAction: content.hero.content.secondaryAction
                  ? { ...content.hero.content.secondaryAction, href: "#landing-preview" }
                  : undefined,
              },
            },
          }}
          brand={brand}
        />
      </LandingNavigationContext.Provider>
    </BrandScope>
  );
}
