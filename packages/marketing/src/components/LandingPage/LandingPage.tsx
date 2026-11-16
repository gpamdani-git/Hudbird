"use client";
import * as React from "react";
import type {
  LandingPageConfig,
  LandingSectionContent,
  LandingSectionSelection,
  LandingSectionType,
  BrandProfile,
  WebsiteDesignTokens,
  SectionAppearanceSettings,
} from "@hudbird/schemas";
import { Heading, Text } from "@hudbird/ui";
import { BrandScope, HeroSection } from "../HeroSection";
import {
  LandingMotionContext,
  LandingNavigationContext,
  LandingSectionIdContext,
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
      return (
        <LandingNavbar
          variant={selection.variant}
          content={content.navbar}
          brand={brand}
          customSettings={selection.customSettings}
        />
      );
    case "hero":
      return (
        <div data-landing-section="hero">
          <HeroSection
            id="hero"
            content={content.hero.content}
            config={
              content.hero.variants[selection.variant] ??
              (selection.variant === "center-canvas" ||
              (selection.variant as string) === "center-video"
                ? { variant: selection.variant as "center-canvas" | "center-video" }
                : selection.variant === "editorial-photo"
                  ? { variant: "editorial-photo" }
                  : selection.variant === "remit-grid" ||
                      (selection.variant as string) === "fintech-remit"
                    ? { variant: "remit-grid" }
                    : { variant: "split-product" })
            }
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
  tokens,
  beforeSections,
  renderBeforeSection,
  renderCustomSection,
  className,
}: {
  config: LandingPageConfig;
  content: LandingSectionContent;
  tokens?: WebsiteDesignTokens;
  beforeSections?: React.ReactNode;
  renderBeforeSection?: Partial<Record<LandingSectionType, React.ReactNode>>;
  renderCustomSection?: (section: LandingSectionSelection) => React.ReactNode | undefined;
  className?: string;
}) {
  const websiteMode = useLandingMode();
  const brand = {
    ...config.brand,
    mode: config.themeMode === "auto" ? websiteMode : config.themeMode,
  };
  const visibleSections = config.sections.filter((section) => section.enabled);
  const visible = visibleSections.map((section) => section.type);
  const sectionAnchorMap = new Map<string, string>();
  const visibleAnchorIds: string[] = [];
  visibleSections.forEach((section) => {
    const customAnchor = (
      section.customSettings as SectionAppearanceSettings | undefined
    )?.anchorId?.trim();
    if (customAnchor) {
      sectionAnchorMap.set(section.type, customAnchor);
      visibleAnchorIds.push(customAnchor);
    }
  });
  const first = visible.find((type) => type !== "navbar" && type !== "footer");
  const hrefFor = (href: string) => {
    if (!href.startsWith("#") || href.startsWith("#/") || href === "#landing-page") return href;
    const rawId = href.slice(1);
    if (visibleAnchorIds.includes(rawId)) return `#${rawId}`;
    const normalizedId = rawId === "logo-cloud" ? "logos" : rawId;
    if (visible.includes(normalizedId as LandingSectionType)) {
      return `#${sectionAnchorMap.get(normalizedId) ?? normalizedId}`;
    }
    return first ? `#${sectionAnchorMap.get(first) ?? first}` : "#landing-page";
  };
  const render = (section: LandingSectionSelection) => {
    const appearance =
      (section.customSettings as SectionAppearanceSettings | undefined) ?? undefined;
    const colorCfg = appearance?.color;
    const visCfg = appearance?.visibility;
    const sectionStyle: React.CSSProperties | undefined =
      colorCfg && (colorCfg.background || colorCfg.foreground || colorCfg.accent)
        ? ({
            ...(colorCfg.background
              ? { "--hb-bg": colorCfg.background, backgroundColor: colorCfg.background }
              : {}),
            ...(colorCfg.foreground
              ? { "--hb-ink": colorCfg.foreground, color: colorCfg.foreground }
              : {}),
            ...(colorCfg.accent
              ? { "--hb-accent": colorCfg.accent, "--primary": colorCfg.accent }
              : {}),
          } as React.CSSProperties)
        : undefined;
    const customSectionNode = renderCustomSection?.(section);
    return (
      <React.Fragment key={section.type}>
        {renderBeforeSection?.[section.type]}
        <LandingSectionIdContext.Provider
          value={{ sectionId: section.type, badge: appearance?.badge, appearance }}
        >
          <div
            data-landing-section={section.type}
            data-hb-surface={section.type !== "navbar" ? appearance?.surface : undefined}
            data-hb-padding={section.type !== "navbar" ? appearance?.paddingY : undefined}
            data-hb-container={section.type !== "navbar" ? appearance?.containerWidth : undefined}
            data-hb-align={section.type !== "navbar" ? appearance?.align : undefined}
            data-hb-featured-card={appearance?.card?.featuredIndex}
            data-hb-hover={appearance?.motion?.hoverEffect}
            data-hb-motion={appearance?.motion?.entrance}
            data-hb-hide-desktop={visCfg?.hideDesktop ? "true" : undefined}
            data-hb-hide-tablet={visCfg?.hideTablet ? "true" : undefined}
            data-hb-hide-mobile={visCfg?.hideMobile ? "true" : undefined}
            style={sectionStyle}
            className="w-full"
          >
            {customSectionNode !== undefined ? (
              customSectionNode
            ) : (
              <LandingSection
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
            )}
          </div>
        </LandingSectionIdContext.Provider>
      </React.Fragment>
    );
  };
  return (
    <BrandScope
      brand={brand}
      tokens={tokens}
      data-landing-page
      data-landing-smooth-scroll={config.motion?.smoothScroll ?? true}
      className={className ?? "min-h-[100dvh]"}
    >
      <LandingMotionContext.Provider
        value={config.motion ?? { reveal: "subtle", autoplay: true, smoothScroll: true }}
      >
        <LandingNavigationContext.Provider value={{ visible, hrefFor }}>
          {config.sections
            .filter((section) => section.enabled && section.type === "navbar")
            .map(render)}
          <main id="landing-page" tabIndex={-1}>
            {!visible.includes("hero") && !beforeSections && (
              <Heading as="h1" className="sr-only">
                {brand.name} product overview
              </Heading>
            )}
            {beforeSections}
            {config.sections
              .filter(
                (section) =>
                  section.enabled && section.type !== "navbar" && section.type !== "footer"
              )
              .map(render)}
            {!first && !beforeSections && (
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
