"use client";
import React, { useState, useEffect } from "react";
import { Badge, Button, Container, Heading, Input, Section, Text } from "@hudbird/ui";
import type { ApplicationBlockSelection } from "@hudbird/schemas";
import { BrandScope, findSectionTarget, scrollTargetSmoothly } from "../HeroSection";
import { useLandingMode } from "../LandingShared";
import { SaasLandingPage } from "../LandingPage/LandingPage";
import { LoginPage } from "../LoginPage";
import {
  AboutUsSection,
  WhoAreWeSection,
  OurTeamSection,
  MeetOurExpertSection,
  ValuesSection,
  EditorialBrandCtaSection,
} from "../AboutUsSection";
import { PricingCompareSection } from "../PricingCompareSection";
import { BlogIndexSection, BlogPostSection, DEFAULT_BLOG_POSTS } from "../BlogSection";
import { ContactPageSection } from "../ContactSection";
import { LegalPageSection, type LegalDocKey } from "../LegalSection";
import { ApplicationPageRenderer } from "../BlueprintStudio/ApplicationUiBuilder";
import {
  getAboutPageSections,
  getContactPageSections,
  getEffectiveAuthConfig,
  getEffectiveDashboardConfig,
  getEffectiveNotFoundConfig,
  getEffectiveSharedSections,
  getEffectiveTokens,
  getLegalPageSections,
  isPricingCompareEnabled,
  isSectionPage,
  resolveLinkTarget,
  resolvePageContent,
  resolvedPageConfig,
  type WebsiteProjectConfig,
  type WebsitePage,
} from "./config";

function AccountForm({
  recovery,
  loginHref,
  name,
  heading,
  subheading,
  onComplete,
}: {
  recovery: boolean;
  loginHref: string;
  name: string;
  heading?: string;
  subheading?: string;
  onComplete?: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Section spacing="lg" className="bg-background min-h-[660px]">
      <Container size="sm" className="max-w-md space-y-7">
        <Text className="text-center font-semibold">{name}</Text>
        <Heading
          as="h1"
          size="h2"
          className="text-center"
          data-hb-node="heading"
          data-hb-edit="auth:heading"
        >
          {heading || (recovery ? "Forgot password?" : "Create your account")}
        </Heading>
        <Text
          variant="muted"
          className="text-center"
          data-hb-node="text"
          data-hb-edit="auth:subheading"
        >
          {subheading ||
            (recovery
              ? "Enter your email to request a reset link."
              : "Make room for your next project.")}
        </Text>
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
            if (!recovery && onComplete) onComplete();
          }}
        >
          {!recovery && <Input label="Full name" name="name" autoComplete="name" required />}
          <Input label="Email address" type="email" name="email" autoComplete="email" required />
          {!recovery && (
            <Input
              label="Password"
              type="password"
              name="password"
              autoComplete="new-password"
              minLength={8}
              required
              description="Use at least 8 characters."
            />
          )}
          <Button type="submit" color="primary" className="w-full">
            {recovery ? "Send reset link" : "Create account"}
          </Button>
          {submitted && (
            <Text role="status" variant="muted">
              {recovery
                ? "Reset link sent in preview. Check your inbox or return to sign in."
                : "Account created in preview."}
            </Text>
          )}
        </form>
        <Button asChild variant="plain" className="w-full">
          <a href={loginHref}>Back to log in</a>
        </Button>
      </Container>
    </Section>
  );
}

export function WebsiteProjectPage({
  project,
  pageId,
  onNavigate,
  hashRoutes = false,
  interactionMode = "navigate",
  renderCustomPage,
  renderCustomSection,
}: {
  project: WebsiteProjectConfig;
  pageId: string;
  onNavigate: (id: string) => void;
  hashRoutes?: boolean;
  interactionMode?: "edit" | "navigate";
  renderCustomPage?: (page: WebsitePage) => React.ReactNode | undefined;
  renderCustomSection?: (ctx: {
    page: WebsitePage;
    sectionType: string;
    variant?: string;
  }) => React.ReactNode | undefined;
}) {
  const websiteMode = useLandingMode();
  const [activePostSlug, setActivePostSlug] = useState<string>(DEFAULT_BLOG_POSTS[0].slug);
  const [inlineReaderSlug, setInlineReaderSlug] = useState<string | null>(null);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocKey>("privacy");
  const [legalNavVersion, setLegalNavVersion] = useState(0);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  const page =
    project.pages.find((p) => p.id === pageId) ??
    project.pages.find((p) => p.template === "not-found");
  useEffect(() => {
    setInlineReaderSlug(null);
  }, [page?.id]);
  const customNavOverrides =
    page?.sharedMode?.navbar === "custom"
      ? (page.sharedOverrides?.navbar as { brandName?: string } | undefined)
      : undefined;
  const brand = {
    ...project.brand,
    ...(customNavOverrides?.brandName ? { name: customNavOverrides.brandName } : {}),
    mode: project.themeMode === "auto" ? websiteMode : project.themeMode,
  };
  const tokens = getEffectiveTokens(project);
  const shared = getEffectiveSharedSections(project);
  const auth = getEffectiveAuthConfig(project);
  const dash = getEffectiveDashboardConfig(project);
  const nf = getEffectiveNotFoundConfig(project);

  const modStr = (sectionId: string, field: string): string | undefined => {
    const val = page?.modularOverrides?.[sectionId]?.[field];
    return typeof val === "string" ? val : undefined;
  };
  const modVal = <T,>(sectionId: string, field: string): T | undefined => {
    const val = page?.modularOverrides?.[sectionId]?.[field];
    return val as T | undefined;
  };
  const renderModFrame = (sectionId: string, node: React.ReactNode) => {
    const resolvedNode = resolveModularCustom(sectionId, node);
    const s = page?.modularSettings?.[sectionId];
    if (
      !s ||
      (!s.surface && !s.paddingY && !s.containerWidth && !s.align && !s.color && !s.visibility)
    ) {
      return resolvedNode;
    }
    const colorCfg = s.color;
    const visCfg = s.visibility;
    const modStyle: React.CSSProperties | undefined =
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

    return (
      <div
        data-hb-surface={s.surface}
        data-hb-padding={s.paddingY}
        data-hb-container={s.containerWidth}
        data-hb-align={s.align}
        data-hb-hide-desktop={visCfg?.hideDesktop ? "true" : undefined}
        data-hb-hide-tablet={visCfg?.hideTablet ? "true" : undefined}
        data-hb-hide-mobile={visCfg?.hideMobile ? "true" : undefined}
        style={modStyle}
      >
        {resolvedNode}
      </div>
    );
  };

  const routeHref = (path: string) => (hashRoutes ? `#${path}` : path);
  const href = (template: WebsitePage["template"]) => {
    const target = project.pages.find((p) => p.template === template);
    return target ? routeHref(target.path) : undefined;
  };
  const home = project.pages.find((p) => p.path === "/") ?? project.pages[0];
  const content = page
    ? resolvePageContent(project, page, { hashRoutes })
    : resolvePageContent(project, home, { hashRoutes });

  const announcement = shared.announcement;
  const showAnnouncement =
    Boolean(announcement?.enabled) && (interactionMode === "edit" || !announcementDismissed);
  const announcementLink = announcement?.target
    ? resolveLinkTarget(project, announcement.target, { hashRoutes })
    : undefined;

  const scrollTargetInOwnerDoc = (anchorEl: Element | null, id: string) => {
    const ownerDoc = anchorEl?.ownerDocument ?? (typeof document !== "undefined" ? document : null);
    if (!ownerDoc) return;
    window.setTimeout(() => {
      const target = findSectionTarget(ownerDoc.body, id);
      if (target) {
        const clean = id.replace(/^#/, "").trim();
        const isTop = !clean || clean === "top" || clean === "landing-page";
        scrollTargetSmoothly(target, { isTopTarget: isTop });
      }
    }, 80);
  };

  const scrollToTopInOwnerDoc = (anchorEl: Element | null) => {
    const ownerDoc = anchorEl?.ownerDocument ?? (typeof document !== "undefined" ? document : null);
    if (!ownerDoc?.body) return;
    window.setTimeout(() => {
      const rootEl = (ownerDoc.querySelector(".hb-pilot") as HTMLElement | null) ?? ownerDoc.body;
      scrollTargetSmoothly(rootEl, { isTopTarget: true });
    }, 50);
  };

  const socialProviders: ("Google" | "GitHub" | "SSO")[] = [
    ...(auth.socialProviders?.google ? (["Google"] as const) : []),
    ...(auth.socialProviders?.github ? (["GitHub"] as const) : []),
    ...(auth.socialProviders?.sso ? (["SSO"] as const) : []),
  ];
  const forgotTarget = auth.forgotPasswordPageId
    ? project.pages.find((p) => p.id === auth.forgotPasswordPageId)
    : undefined;
  const dashBackTarget = dash.backToSitePageId
    ? project.pages.find((p) => p.id === dash.backToSitePageId)
    : undefined;
  const dashBackHref = dashBackTarget ? routeHref(dashBackTarget.path) : routeHref(home.path);
  const nfPrimaryHref = resolveLinkTarget(project, nf.primaryActionTarget, { hashRoutes }).href;
  const nfSecondaryHref = nf.secondaryActionTarget
    ? resolveLinkTarget(project, nf.secondaryActionTarget, { hashRoutes }).href
    : undefined;

  const customPageNode = page ? renderCustomPage?.(page) : undefined;
  const resolveModularCustom = (sectionId: string, fallbackNode: React.ReactNode) => {
    const activeTargetPage = page ?? project.pages.find((p) => p.template === "not-found");
    if (!activeTargetPage || !renderCustomSection) return fallbackNode;
    const custom = renderCustomSection({ page: activeTargetPage, sectionType: sectionId });
    return custom !== undefined ? custom : fallbackNode;
  };

  return (
    <BrandScope
      brand={brand}
      tokens={tokens}
      onClickCapture={(event) => {
        if (event.button !== 0 || event.shiftKey || event.altKey) return;
        const followInEdit = interactionMode === "edit" && (event.metaKey || event.ctrlKey);
        if (interactionMode !== "edit" && (event.metaKey || event.ctrlKey)) return;
        const anchor = (event.target as Element).closest("a[href]");
        if (!anchor) return;
        const raw = anchor.getAttribute("href")?.trim();
        if (!raw) {
          event.preventDefault();
          return;
        }
        if (interactionMode === "edit" && !followInEdit) {
          event.preventDefault();
          return;
        }
        if (/^(https?:)?\/\//i.test(raw)) {
          event.preventDefault();
          const url = raw.startsWith("//") ? `${window.location.protocol}${raw}` : raw;
          window.open(url, "_blank", "noopener,noreferrer");
          return;
        }
        if (/^(mailto|tel):/i.test(raw)) {
          return;
        }
        if (raw.startsWith("#") && !raw.startsWith("#/")) {
          event.preventDefault();
          scrollTargetInOwnerDoc(anchor, raw.slice(1));
          return;
        }
        const pathWithHash = raw.startsWith("#/") ? raw.slice(1) : raw;
        if (!pathWithHash.startsWith("/")) return;
        const [withoutHash, hashAnchor] = pathWithHash.split("#");
        const [pathnameRaw, queryPart] = withoutHash.split("?");
        const pathnamePart = pathnameRaw.length > 1 ? pathnameRaw.replace(/\/+$/, "") : pathnameRaw;
        const target = project.pages.find((p) => p.path === pathnamePart);
        if (target) {
          event.preventDefault();
          if (target.template === "legal" && queryPart) {
            const params = new URLSearchParams(queryPart);
            const docParam = params.get("doc");
            if (
              docParam === "privacy" ||
              docParam === "terms" ||
              docParam === "cookies" ||
              docParam === "license"
            ) {
              setActiveLegalDoc(docParam);
              setLegalNavVersion((prev) => prev + 1);
              if (docParam === "cookies" && typeof window !== "undefined") {
                scrollTargetInOwnerDoc(anchor, "legal-preferences");
              }
            }
          }
          onNavigate(target.id);
          if (hashAnchor && typeof window !== "undefined") {
            scrollTargetInOwnerDoc(anchor, hashAnchor);
          } else if (target.id !== page?.id && typeof window !== "undefined") {
            scrollToTopInOwnerDoc(anchor);
          }
        } else if (anchor.ownerDocument.defaultView?.frameElement) {
          event.preventDefault();
          const notFoundPage = project.pages.find((p) => p.template === "not-found");
          if (notFoundPage) {
            onNavigate(notFoundPage.id);
            scrollToTopInOwnerDoc(anchor);
          }
        }
      }}
    >
      {showAnnouncement && announcement && isSectionPage(page!) && (
        <div
          data-landing-section="announcement"
          className="relative flex flex-wrap items-center justify-center gap-2 border-b border-[var(--hb-border)] bg-[var(--hb-surface)] px-4 py-2 text-center text-xs"
        >
          {announcement.badge?.trim() && (
            <Badge
              size="sm"
              variant="flat"
              color="primary"
              data-hb-node="badge"
              data-hb-edit="announcement:badge"
            >
              <span data-hb-edit-text="">{announcement.badge}</span>
            </Badge>
          )}
          <span
            data-hb-node="text"
            data-hb-edit="announcement:text"
            className="text-[var(--hb-ink)]"
          >
            {announcement.text}
          </span>
          {announcement.linkLabel?.trim() && announcementLink && (
            <a
              href={announcementLink.href}
              data-hb-node="primary-button"
              data-hb-edit="announcement:linkLabel"
              className="font-semibold text-[var(--hb-accent)] underline underline-offset-4"
            >
              <span data-hb-edit-text="">{announcement.linkLabel}</span>
            </a>
          )}
          {interactionMode !== "edit" && (
            <button
              type="button"
              onClick={() => setAnnouncementDismissed(true)}
              aria-label="Dismiss announcement"
              className="text-muted-foreground hover:text-foreground absolute right-3 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {customPageNode !== undefined ? (
        customPageNode
      ) : !page || page.template === "not-found" ? (
        <div data-landing-section="not-found">
          {resolveModularCustom(
            "not-found",
            <Section spacing="xl">
              <Container size="sm" className="space-y-6 text-center">
                <Text
                  variant="muted"
                  data-hb-node="text"
                  data-hb-edit="notFound:code"
                  className="font-mono text-sm"
                >
                  {nf.code}
                </Text>
                <Heading as="h1" size="h2" data-hb-node="heading" data-hb-edit="notFound:title">
                  {nf.title}
                </Heading>
                <Text variant="muted" data-hb-node="text" data-hb-edit="notFound:description">
                  {nf.description}
                </Text>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button
                    asChild
                    color="primary"
                    data-hb-node="primary-button"
                    data-hb-edit="notFound:primaryActionLabel"
                  >
                    <a href={nfPrimaryHref}>
                      <span data-hb-edit-text="">{nf.primaryActionLabel || "Back to home"}</span>
                    </a>
                  </Button>
                  {nf.secondaryActionLabel?.trim() && nfSecondaryHref && (
                    <Button
                      asChild
                      variant="outline"
                      data-hb-node="secondary-button"
                      data-hb-edit="notFound:secondaryActionLabel"
                    >
                      <a href={nfSecondaryHref}>
                        <span data-hb-edit-text="">{nf.secondaryActionLabel}</span>
                      </a>
                    </Button>
                  )}
                </div>
                {nf.showQuickLinks && (
                  <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[var(--hb-border)] pt-6 text-xs">
                    {project.pages
                      .filter((p) => p.template !== "not-found")
                      .slice(0, 6)
                      .map((p) => (
                        <a
                          key={p.id}
                          href={routeHref(p.path)}
                          className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                        >
                          {p.name}
                        </a>
                      ))}
                  </div>
                )}
              </Container>
            </Section>
          )}
        </div>
      ) : isSectionPage(page) ? (
        <SaasLandingPage
          tokens={tokens}
          config={
            page.template === "about" ||
            page.template === "blog" ||
            page.template === "blog-post" ||
            page.template === "contact" ||
            page.template === "legal"
              ? {
                  ...resolvedPageConfig(project, page),
                  sections: resolvedPageConfig(project, page).sections.map((section) =>
                    section.type === "hero" ? { ...section, enabled: false } : section
                  ),
                }
              : resolvedPageConfig(project, page)
          }
          content={content}
          renderCustomSection={
            renderCustomSection && page
              ? (section) =>
                  renderCustomSection({
                    page,
                    sectionType: section.type,
                    variant: section.variant,
                  })
              : undefined
          }
          renderBeforeSection={
            isPricingCompareEnabled(page)
              ? {
                  faq: renderModFrame(
                    "pricing-compare",
                    <PricingCompareSection
                      badgeLabel={modStr("pricing-compare", "badgeLabel")}
                      title={modStr("pricing-compare", "title")}
                      description={modStr("pricing-compare", "description")}
                      plans={modVal("pricing-compare", "plans")}
                      groups={modVal("pricing-compare", "groups")}
                    />
                  ),
                }
              : undefined
          }
          beforeSections={
            page.template === "legal"
              ? (() => {
                  const legalBlocks = getLegalPageSections(page);
                  const enabledIds = legalBlocks
                    .filter((item) => item.enabled)
                    .map((item) => item.id);

                  return resolveModularCustom(
                    "legal-hero",
                    <LegalPageSection
                      brandName={brand.name}
                      heroHeading={modStr("legal-hero", "heading")}
                      heroSubheading={modStr("legal-hero", "subheading")}
                      readerTocHeading={modStr("legal-reader", "tocHeading")}
                      preferencesHeading={modStr("legal-preferences", "heading")}
                      preferencesSubheading={modStr("legal-preferences", "subheading")}
                      initialDoc={activeLegalDoc}
                      syncVersion={legalNavVersion}
                      visibleSections={enabledIds}
                    />
                  );
                })()
              : page.template === "contact"
                ? (() => {
                    const contactBlocks = getContactPageSections(page);
                    const visibleSections = Object.fromEntries(
                      contactBlocks.map((item) => [item.id, item.enabled])
                    );

                    return resolveModularCustom(
                      "contact-mail",
                      <ContactPageSection
                        brandName={brand.name}
                        title={modStr("contact-mail", "title")}
                        description={modStr("contact-mail", "description")}
                        channels={modVal("contact-mail", "channels")}
                        formHeading={modStr("contact-form-call", "heading")}
                        formSubheading={modStr("contact-form-call", "subheading")}
                        locationsHeading={modStr("contact-locations", "heading")}
                        locationsSubheading={modStr("contact-locations", "subheading")}
                        offices={modVal("contact-locations", "offices")}
                        visibleSections={visibleSections}
                      />
                    );
                  })()
                : page.template === "blog"
                  ? inlineReaderSlug
                    ? renderModFrame(
                        "blog-post",
                        <BlogPostSection
                          postSlug={inlineReaderSlug}
                          posts={modVal("blog-index", "posts")}
                          title={modStr("blog-post", "title")}
                          summary={modStr("blog-post", "summary")}
                          coverImage={modVal("blog-post", "coverImage")}
                          onSelectPost={(slug) => {
                            setActivePostSlug(slug);
                            setInlineReaderSlug(slug);
                          }}
                          onBackToBlog={() => setInlineReaderSlug(null)}
                        />
                      )
                    : renderModFrame(
                        "blog-index",
                        <BlogIndexSection
                          brandName={brand.name}
                          badgeLabel={modStr("blog-index", "badgeLabel")}
                          title={modStr("blog-index", "title")}
                          description={modStr("blog-index", "description")}
                          posts={modVal("blog-index", "posts")}
                          onSelectPost={(slug) => {
                            setActivePostSlug(slug);
                            const postPage = project.pages.find((p) => p.template === "blog-post");
                            if (postPage) {
                              onNavigate(postPage.id);
                            } else {
                              setInlineReaderSlug(slug);
                            }
                          }}
                        />
                      )
                  : page.template === "blog-post"
                    ? renderModFrame(
                        "blog-post",
                        <BlogPostSection
                          postSlug={activePostSlug}
                          posts={modVal("blog-index", "posts")}
                          title={modStr("blog-post", "title")}
                          summary={modStr("blog-post", "summary")}
                          coverImage={modVal("blog-post", "coverImage")}
                          onSelectPost={(slug) => setActivePostSlug(slug)}
                          onBackToBlog={() => {
                            const blogPage = project.pages.find((p) => p.template === "blog");
                            if (blogPage) {
                              onNavigate(blogPage.id);
                            } else {
                              onNavigate(home.id);
                            }
                          }}
                        />
                      )
                    : page.template === "about"
                      ? (() => {
                          const aboutBlocks = getAboutPageSections(page);
                          const isAboutVisible = (id: string) =>
                            aboutBlocks.find((item) => item.id === id)?.enabled ?? false;
                          const nextAnchor = isAboutVisible("who-are-we")
                            ? "#who-are-we"
                            : isAboutVisible("our-team")
                              ? "#our-team"
                              : isAboutVisible("meet-our-expert")
                                ? "#meet-our-expert"
                                : "#benefits";

                          return (
                            <>
                              {isAboutVisible("about") &&
                                renderModFrame(
                                  "about",
                                  <AboutUsSection
                                    badgeLabel={
                                      modStr("about", "badgeLabel") ?? `About ${brand.name}`
                                    }
                                    title={modStr("about", "title")}
                                    actionLabel={
                                      modStr("about", "actionLabel") ?? `Explore ${brand.name}`
                                    }
                                    actionHref={nextAnchor}
                                    posterSrc={modStr("about", "posterSrc")}
                                    videoUrl={modStr("about", "videoUrl")}
                                    videoTitle={modStr("about", "videoTitle")}
                                  />
                                )}
                              {isAboutVisible("who-are-we") &&
                                renderModFrame(
                                  "who-are-we",
                                  <WhoAreWeSection
                                    badgeLabel={modStr("who-are-we", "badgeLabel")}
                                    title={modStr("who-are-we", "title")}
                                    description={modStr("who-are-we", "description")}
                                  />
                                )}
                              {isAboutVisible("our-team") &&
                                renderModFrame(
                                  "our-team",
                                  <OurTeamSection
                                    title={modStr("our-team", "title")}
                                    description={modStr("our-team", "description")}
                                    imageSrc={modStr("our-team", "imageSrc")}
                                    imageAlt={modStr("our-team", "imageAlt")}
                                  />
                                )}
                              {isAboutVisible("meet-our-expert") &&
                                renderModFrame(
                                  "meet-our-expert",
                                  <MeetOurExpertSection
                                    badgeLabel={modStr("meet-our-expert", "badgeLabel")}
                                    title={modStr("meet-our-expert", "title")}
                                    description={modStr("meet-our-expert", "description")}
                                    experts={modVal("meet-our-expert", "experts")}
                                  />
                                )}
                              {isAboutVisible("values") &&
                                renderModFrame(
                                  "values",
                                  <ValuesSection
                                    brandName={brand.name}
                                    eyebrow={modStr("values", "eyebrow")}
                                    title={modStr("values", "title")}
                                    description={modStr("values", "description")}
                                    items={modVal("values", "items")}
                                  />
                                )}
                              {isAboutVisible("editorial-cta") &&
                                renderModFrame(
                                  "editorial-cta",
                                  <EditorialBrandCtaSection
                                    title={modStr("editorial-cta", "title")}
                                    description={modStr("editorial-cta", "description")}
                                    primaryLabel={modStr("editorial-cta", "primaryLabel")}
                                    imageSrc={modStr("editorial-cta", "imageSrc")}
                                    videoUrl={modStr("editorial-cta", "videoUrl")}
                                    videoCaptionLabel={modStr("editorial-cta", "videoCaptionLabel")}
                                    videoPromptLabel={modStr("editorial-cta", "videoPromptLabel")}
                                    rating={modStr("editorial-cta", "rating")}
                                    ratingSummary={modStr("editorial-cta", "ratingSummary")}
                                    avatars={modVal("editorial-cta", "avatars")}
                                  />
                                )}
                            </>
                          );
                        })()
                      : undefined
          }
          className="min-h-[600px]"
        />
      ) : page.template === "login" ? (
        <div data-landing-section="auth">
          {resolveModularCustom(
            "auth",
            <LoginPage
              brandName={brand.name}
              variant={page.authLayout}
              heading={auth.loginHeading}
              subheading={auth.loginDescription}
              submitLabel={auth.loginSubmitLabel}
              showSocial={socialProviders.length > 0}
              socialProviders={socialProviders}
              showSignUp={Boolean(href("signup"))}
              showRecovery={Boolean(forgotTarget || href("recovery"))}
              homeHref={routeHref(home.path)}
              signUpHref={href("signup") ?? routeHref(home.path)}
              forgotPasswordHref={
                forgotTarget
                  ? routeHref(forgotTarget.path)
                  : (href("recovery") ?? routeHref(home.path))
              }
              onLogin={
                interactionMode !== "edit" && auth.postAuthPageId
                  ? () => onNavigate(auth.postAuthPageId!)
                  : undefined
              }
            />
          )}
        </div>
      ) : page.template === "signup" || page.template === "recovery" ? (
        <div data-landing-section="auth">
          {resolveModularCustom(
            "auth",
            <AccountForm
              key={page.id}
              recovery={page.template === "recovery"}
              loginHref={href("login") ?? routeHref(home.path)}
              name={brand.name}
              heading={page.template === "recovery" ? auth.recoveryHeading : auth.signupHeading}
              subheading={
                page.template === "recovery" ? auth.recoveryDescription : auth.signupDescription
              }
              onComplete={
                interactionMode !== "edit" && auth.postAuthPageId
                  ? () => onNavigate(auth.postAuthPageId!)
                  : undefined
              }
            />
          )}
        </div>
      ) : (
        <div data-landing-section="dashboard">
          {resolveModularCustom(
            "dashboard",
            <>
              <div className="bg-background flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-6 py-3 dark:border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <Badge size="sm" variant="flat" color="primary">
                    Overview
                  </Badge>
                  <Text
                    variant="small"
                    data-hb-node="heading"
                    data-hb-edit="dashboard:appTitle"
                    className="font-medium"
                  >
                    {dash.appTitle}
                  </Text>
                </div>
                <Button
                  asChild
                  variant="plain"
                  size="sm"
                  data-hb-node="primary-button"
                  data-hb-edit="dashboard:backToSiteLabel"
                >
                  <a href={dashBackHref}>
                    <span data-hb-edit-text="">{dash.backToSiteLabel || "Back to website"}</span>
                  </a>
                </Button>
              </div>
              <ApplicationPageRenderer
                category={dash.category}
                brand={brand}
                appTitle={dash.appTitle}
                welcomeSubtitle={dash.welcomeSubtitle}
                sidebarLinks={dash.sidebarLinks.map((link) => ({
                  id: link.id,
                  label: link.label,
                  href: resolveLinkTarget(project, link.target, { hashRoutes }).href,
                }))}
                blocks={
                  dash.blocks.map((block) => ({
                    type: block.type,
                    variant: block.variant,
                    enabled: block.enabled,
                  })) as ApplicationBlockSelection[]
                }
              />
            </>
          )}
        </div>
      )}
    </BrandScope>
  );
}

/** Hash routes make the exported project usable on static hosting without rewrite rules. */
export function WebsiteProject({ project }: { project: WebsiteProjectConfig }) {
  const [path, setPath] = useState(() =>
    typeof window === "undefined" ? "/" : window.location.hash.slice(1) || "/"
  );
  useEffect(() => {
    const changed = () => setPath(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", changed);
    return () => window.removeEventListener("hashchange", changed);
  }, []);
  const page = project.pages.find((p) => p.path === path);

  return (
    <WebsiteProjectPage
      project={project}
      pageId={page?.id ?? ""}
      hashRoutes
      onNavigate={(id) => {
        const next = project.pages.find((p) => p.id === id);
        if (next) {
          window.location.hash = next.path;
          setPath(next.path);
          window.scrollTo(0, 0);
        }
      }}
    />
  );
}
