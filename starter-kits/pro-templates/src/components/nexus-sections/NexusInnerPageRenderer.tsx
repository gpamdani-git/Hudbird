// starter-kits/pro-templates/src/components/nexus-sections/NexusInnerPageRenderer.tsx
"use client";

import React, { useState } from "react";
import { NicheConfig } from "@hudbird/schemas";
import { NavbarMegaMenu } from "./NavbarMegaMenu";
import { SplitTextCtaFooter } from "./SplitTextCtaFooter";
import { StickyProcessSteps } from "./StickyProcessSteps";
import { ServicesInteractive } from "./ServicesInteractive";
import { CaseStudyShowcase } from "./CaseStudyShowcase";
import { PricingGrid } from "./PricingGrid";
import { FaqWithTestimonials } from "./FaqWithTestimonials";
import { AllPagesDirectory } from "./AllPagesDirectory";
import {
  InnerPageArchitecturalHero,
  ProcessDeliverablesMatrix,
  InteractiveSprintEstimator,
  PricingComparisonMatrix,
  PortfolioFilterableGrid,
  CaseStudyDetailView,
  ChangelogTimeline,
  BlogJournalListing,
  BlogPostDetailView,
  ClientWorkspacePortal,
  TeamLeadershipGrid,
  CareersBoardView,
  StackEcosystemGrid,
  LegalDocumentLayout,
  ArchitecturalStatusView,
  HudbirdAuthUtilityView,
  HudbirdAuthMode,
} from "./inner-pages";
import { getDomainContent } from "./inner-pages/domainContent";
import { PillLink } from "./ScrollReveal";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Globe,
  Cpu,
  Layers,
  Terminal,
} from "lucide-react";
import { PEXELS } from "./HudbirdVisualWidgets";
import { HB, HbSection, HbHeader, HbImage } from "./HudbirdKit";

export interface NexusInnerPageRendererProps {
  niche: NicheConfig;
  pageSlug: string;
  customBrandPrimary?: string;
}

export const NexusInnerPageRenderer: React.FC<NexusInnerPageRendererProps> = ({
  niche,
  pageSlug,
  customBrandPrimary,
}) => {
  const brandColor = customBrandPrimary || niche.theme.brandPrimary;
  const brandAccent = niche.theme.brandAccent;

  const dynamicStyles = {
    "--brand-primary": brandColor,
    "--brand-accent": brandAccent,
  } as React.CSSProperties;

  const cleanSlug = pageSlug.replace(/^\/+|\/+$/g, "");
  const pageInfo = niche.innerPages.find((p) => {
    const pClean = p.slug.replace(/^\/+|\/+$/g, "");
    return pClean.endsWith(cleanSlug) || p.id === cleanSlug;
  }) || {
    id: cleanSlug || "page",
    title: cleanSlug.split("/").pop()?.replace(/-/g, " ").toUpperCase() || "PAGE",
    shortDesc: "Architectural overview and comprehensive specifications.",
    category: "core",
    slug: `/demos/${niche.slug}/${cleanSlug}`,
  };

  const slugKey = pageInfo.id.toLowerCase();
  const domainContent = getDomainContent(niche.slug);

  // Contact form state
  const [formSent, setFormSent] = useState(false);
  const [formWorkstream, setFormWorkstream] = useState(domainContent.contact.workstreams[0]);
  const [activeSpecTab, setActiveSpecTab] = useState<number>(0);

  // =========================================================================
  // ROUTE 0: /all-pages & /directory (Dedicated Multipurpose Directory Route)
  // =========================================================================
  if (
    slugKey.includes("all-pages") ||
    slugKey.includes("directory") ||
    slugKey.includes("sitemap")
  ) {
    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />
          <InnerPageArchitecturalHero
            nicheSlug={niche.slug}
            nicheName={niche.name}
            specCode="PRICING"
            variant="minimal"
            title={`Complete Multipurpose Directory · ${niche.name}`}
            subtitle="24+ Production Inner Pages"
            description={`Navigate every dedicated inner page, interactive tool, and domain view included in ${niche.name}.`}
            primaryCtaText="Back to Home"
            primaryCtaHref={`/demos/${niche.slug}`}
            secondaryCtaText="Contact Studio"
            secondaryCtaHref={`/demos/${niche.slug}/contact`}
            metrics={[
              { value: "24+", label: "Inner Views", subtext: "Zero placeholder pages" },
              { value: "5", label: "Flagship Niches", subtext: "Domain-authentic layouts" },
              { value: "100%", label: "HudbirdUI Kit", subtext: "Strict TypeScript tokens" },
              { value: "0.00", label: "Layout Shift", subtext: "Verified CWV score" },
            ]}
          />
          <AllPagesDirectory
            nicheSlug={niche.slug}
            nicheName={niche.name}
            pages={niche.innerPages}
          />
          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 1: /process & /methodology
  // Focused exclusivamente on Process Steps + Phase Deliverables Matrix
  // =========================================================================
  if (slugKey.includes("process") || slugKey.includes("method")) {
    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <InnerPageArchitecturalHero
            nicheSlug={niche.slug}
            nicheName={niche.name}
            specCode="PROCESS"
            variant="showcase"
            title={domainContent.process.title}
            subtitle={domainContent.process.subtitle}
            description={domainContent.process.description}
            primaryCtaText={domainContent.process.primaryCtaText}
            primaryCtaHref={`/demos/${niche.slug}/contact`}
            secondaryCtaText={domainContent.process.secondaryCtaText}
            secondaryCtaHref="#deliverables"
            metrics={domainContent.process.metrics}
          />

          <StickyProcessSteps data={niche.sections.process} />

          <ProcessDeliverablesMatrix
            nicheSlug={niche.slug}
            title="Phase Deliverables & Technical Artifacts"
            subtitle="Every sprint phase yields concrete, production-ready code, token schemas, and documentation."
          />

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 2: /services & /service-detail
  // Focused on Interactive Capabilities + Sprint Scope Estimator
  // =========================================================================
  if (slugKey.includes("service")) {
    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <InnerPageArchitecturalHero
            nicheSlug={niche.slug}
            nicheName={niche.name}
            specCode="SERVICES"
            variant="showcase"
            title={domainContent.services.title}
            subtitle={domainContent.services.subtitle}
            description={domainContent.services.description}
            primaryCtaText={domainContent.services.primaryCtaText}
            primaryCtaHref={`/demos/${niche.slug}/pricing`}
            secondaryCtaText={domainContent.services.secondaryCtaText}
            secondaryCtaHref="#estimator"
            metrics={domainContent.services.metrics}
          />

          <ServicesInteractive data={niche.sections.services} />

          <InteractiveSprintEstimator nicheSlug={niche.slug} />

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 3: /pricing
  // Focused on Minimal Hero + Pricing Tiers + Comparison Matrix
  // =========================================================================
  if (slugKey.includes("pricing") || slugKey.includes("plan") || slugKey.includes("tier")) {
    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <InnerPageArchitecturalHero
            nicheSlug={niche.slug}
            nicheName={niche.name}
            specCode="PRICING"
            variant="minimal"
            title={domainContent.pricing.title}
            subtitle={domainContent.pricing.subtitle}
            description={domainContent.pricing.description}
            primaryCtaText={domainContent.pricing.primaryCtaText}
            primaryCtaHref={`/demos/${niche.slug}/contact`}
            secondaryCtaText={domainContent.pricing.secondaryCtaText}
            secondaryCtaHref="#comparison"
            metrics={domainContent.pricing.metrics}
          />

          <PricingGrid data={niche.sections.pricing} />

          <PricingComparisonMatrix
            nicheSlug={niche.slug}
            title="Exhaustive Tier Comparison Matrix"
            subtitle="Compare technical deliverables, velocity cadence, SLAs, and security standards across our engagement models."
          />

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 4: /projects/case-study, /project-detail, /case-study
  // Focused exclusively on the deep-dive CaseStudyDetailView
  // =========================================================================
  if (
    slugKey.includes("case-study") ||
    slugKey.includes("case_study") ||
    (slugKey.includes("project") && slugKey.includes("detail"))
  ) {
    const primaryCase = niche.sections.caseStudies.projects[0] || {
      title: "Flagship Production Case Study",
      client: niche.name,
      category: "Enterprise System",
      metrics: { label: "Performance Lift", value: "+340%" },
    };

    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <InnerPageArchitecturalHero
            nicheSlug={niche.slug}
            nicheName={niche.name}
            specCode="CASE-STUDY"
            variant="showcase"
            title={`${primaryCase.title}: Architecture Deep-Dive`}
            subtitle={primaryCase.category}
            description={`How we engineered and deployed ${primaryCase.title} for ${primaryCase.client} to achieve verifiable commercial outcomes and zero architectural debt.`}
            primaryCtaText="Request Similar Architecture"
            primaryCtaHref={`/demos/${niche.slug}/contact`}
            secondaryCtaText="View Benchmarks"
            secondaryCtaHref="#telemetry-benchmark"
            metrics={[
              {
                value: primaryCase.metrics.value,
                label: primaryCase.metrics.label,
                subtext: "Verified outcome",
              },
              { value: "0.00", label: "Zero CLS", subtext: "No layout thrash" },
              { value: "< 50ms", label: "P95 Latency", subtext: "Sub-second response" },
              { value: "100%", label: "Test Coverage", subtext: "Strict type contracts" },
            ]}
          />

          <CaseStudyDetailView nicheSlug={niche.slug} />

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 5: /projects & /work & /portfolio (Portfolio Listing)
  // Focused on Filterable Portfolio Grid + Featured Case Studies
  // =========================================================================
  if (
    slugKey.includes("project") ||
    slugKey.includes("work") ||
    slugKey.includes("portfolio") ||
    slugKey.includes("outcome")
  ) {
    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <InnerPageArchitecturalHero
            nicheSlug={niche.slug}
            nicheName={niche.name}
            specCode="PORTFOLIO"
            variant="showcase"
            title={`Selected Deployments & Flagships · ${niche.name}`}
            subtitle="Proven Commercial Results"
            description={`A curated portfolio of high-impact architectures, enterprise flagships, and commercial systems built under the ${niche.name} standard.`}
            primaryCtaText="Start A Project"
            primaryCtaHref={`/demos/${niche.slug}/contact`}
            secondaryCtaText="View Case Study"
            secondaryCtaHref={`/demos/${niche.slug}/case-study-detail`}
            metrics={[
              { value: "18+", label: "Flagship Releases", subtext: "Production deployments" },
              { value: "3.4x", label: "Avg Conversion Lift", subtext: "After system revamp" },
              { value: "99.99%", label: "Uptime SLA", subtext: "Zero downtime edge" },
              { value: "100%", label: "On-Time Delivery", subtext: "Strict sprint discipline" },
            ]}
          />

          <PortfolioFilterableGrid nicheSlug={niche.slug} />

          <CaseStudyShowcase data={niche.sections.caseStudies} />

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 6: /changelog
  // Focused exclusively on Minimal Hero + ChangelogTimeline
  // =========================================================================
  if (slugKey.includes("changelog") || slugKey.includes("release")) {
    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <InnerPageArchitecturalHero
            nicheSlug={niche.slug}
            nicheName={niche.name}
            specCode="CHANGELOG"
            variant="minimal"
            title={`Engineering Changelog & Release Ledger · ${niche.name}`}
            subtitle="Continuous Delivery & System Evolution"
            description={`A complete, transparent chronological record of all shipped updates, architectural refactors, and performance benchmarks for ${niche.name}.`}
            primaryCtaText="View Commits"
            primaryCtaHref="#changelog"
            secondaryCtaText="Request Feature"
            secondaryCtaHref={`/demos/${niche.slug}/contact`}
            metrics={[
              {
                value: domainContent.changelog[0]?.version || "v4.2.0",
                label: "Current Release",
                subtext: "Active production cutover",
              },
              { value: "100%", label: "Uptime SLA", subtext: "Zero deployment drops" },
              { value: "Weekly", label: "Cadence", subtext: "Milestone releases" },
              { value: "Sub-180s", label: "CI/CD Pipeline", subtext: "Automated verification" },
            ]}
          />

          <ChangelogTimeline nicheSlug={niche.slug} />

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 7: /blog/post, /blog-post, /article
  // Focused on Article Reader + Related Journal Listing
  // =========================================================================
  if (
    slugKey.includes("blog-post") ||
    slugKey.includes("blog/post") ||
    (slugKey.includes("blog") && slugKey.includes("post")) ||
    slugKey.includes("essay")
  ) {
    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <BlogPostDetailView nicheSlug={niche.slug} />

          <BlogJournalListing
            nicheSlug={niche.slug}
            title="Related Engineering Essays & Research"
            subtitle="Continue reading verified technical publications on web performance, system tokens, and kinetic interfaces."
          />

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 8: /blog & /journal (Blog Listing)
  // Focused on Split Editorial Hero + BlogJournalListing
  // =========================================================================
  if (slugKey.includes("blog") || slugKey.includes("journal")) {
    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <InnerPageArchitecturalHero
            nicheSlug={niche.slug}
            nicheName={niche.name}
            specCode="JOURNAL"
            variant="split"
            title={`Engineering Journal & Technical Essays · ${niche.name}`}
            subtitle="Architectural Insights & Philosophy"
            description="In-depth explorations of domain architecture, token contracts, and high-performance engineering."
            primaryCtaText="Read Latest Essay"
            primaryCtaHref={`/demos/${niche.slug}/blog-details`}
            secondaryCtaText="Browse Articles"
            secondaryCtaHref="#blog-listing"
            metrics={[
              { value: "100/100", label: "Performance", subtext: "Zero compromise" },
              { value: "W3C", label: "Token Spec", subtext: "Figma-to-code sync" },
              { value: "Motion 13", label: "Kinetic Engine", subtext: "Spring linear() curves" },
              { value: "Weekly", label: "Publish Cadence", subtext: "Staff engineers & leads" },
            ]}
          />

          <BlogJournalListing nicheSlug={niche.slug} />

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 9: /portal & /client (Client Workspace & Console)
  // Focused on Telemetry Hero + ClientWorkspacePortal
  // =========================================================================
  if (slugKey.includes("portal") || slugKey.includes("dashboard") || slugKey.includes("client")) {
    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <InnerPageArchitecturalHero
            nicheSlug={niche.slug}
            nicheName={niche.name}
            specCode="PORTAL"
            variant="telemetry"
            title={domainContent.portal.sprintTitle}
            subtitle={domainContent.portal.hudBadge}
            description={`Real-time transparency into your active production burndown, automated SLA checks, and verified deliverables for ${niche.name}.`}
            primaryCtaText="Open Direct Comms"
            primaryCtaHref={`mailto:${domainContent.contact.email}`}
            secondaryCtaText="Review Deliverables"
            secondaryCtaHref="#deliverables"
            metrics={domainContent.portal.activeMetrics}
          />

          <ClientWorkspacePortal nicheSlug={niche.slug} />

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 10: /team & /team/member
  // Focused on Split Hero + TeamLeadershipGrid
  // =========================================================================
  if (slugKey.includes("team") || slugKey.includes("leader") || slugKey.includes("people")) {
    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <InnerPageArchitecturalHero
            nicheSlug={niche.slug}
            nicheName={niche.name}
            specCode="TEAM"
            variant="split"
            title={`Leadership, Engineering & Domain Partners · ${niche.name}`}
            subtitle="The People Behind The Code"
            description="Our practice is led exclusively by senior practitioners with staff-level engineering and domain leadership experience. Zero junior handoffs."
            primaryCtaText="Work With Our Pod"
            primaryCtaHref={`/demos/${niche.slug}/contact`}
            secondaryCtaText="View Open Roles"
            secondaryCtaHref={`/demos/${niche.slug}/career`}
            metrics={[
              { value: "100%", label: "Senior Staff", subtext: "Zero junior developers" },
              { value: "4", label: "Studio Hubs", subtext: "Zurich, Tokyo, SF, Stockholm" },
              { value: "48h", label: "Pod Standup", subtext: "Fast onboarding into Slack" },
              { value: "120+", label: "Shipped Views", subtext: "Commercial production flagships" },
            ]}
          />

          <TeamLeadershipGrid nicheSlug={niche.slug} />

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 11: /about & /company & /studio
  // Focused on Split Hero + Studio Philosophy + Global Studio Hubs Bento
  // =========================================================================
  if (slugKey.includes("about") || slugKey.includes("company") || slugKey.includes("studio")) {
    const aboutData = domainContent.about;

    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <InnerPageArchitecturalHero
            nicheSlug={niche.slug}
            nicheName={niche.name}
            specCode="ABOUT"
            variant="split"
            title={aboutData.title}
            subtitle={aboutData.subtitle}
            description={aboutData.description}
            primaryCtaText="Work With Us"
            primaryCtaHref={`/demos/${niche.slug}/contact`}
            secondaryCtaText="Explore Work"
            secondaryCtaHref={`/demos/${niche.slug}/portfolio`}
            metrics={aboutData.metrics}
          />

          {/* Philosophy & Studio Architecture Section */}
          <HbSection tone="light">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="space-y-6 lg:col-span-6">
                <span className={HB.brandChip}>{aboutData.philosophyTag}</span>
                <h2
                  className={`text-3xl leading-[1.1] font-semibold tracking-tight sm:text-5xl ${HB.ink}`}
                >
                  {aboutData.philosophyHeading}{" "}
                  <span className="text-[color:var(--brand-primary)]">
                    {aboutData.philosophyAccentWord}
                  </span>
                  .
                </h2>
                <p className={`text-base leading-relaxed sm:text-lg ${HB.ink2}`}>
                  {aboutData.philosophyParagraph1}
                </p>
                <p className={`text-sm leading-relaxed sm:text-base ${HB.ink3}`}>
                  {aboutData.philosophyParagraph2}
                </p>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[
                    { val: "100/100", label: "Lighthouse CWV", bg: "bg-[#C8F560] text-[#0D0F14]" },
                    { val: "48h", label: "Sprint Kickoff", bg: "bg-[#7EE7EE] text-[#0D0F14]" },
                    { val: "Zero", label: "Vendor Lock-in", bg: "bg-[#A78BFA] text-[#0D0F14]" },
                  ].map((pill, idx) => (
                    <div key={idx} className={`rounded-2xl p-4 ${pill.bg} space-y-0.5`}>
                      <span className="block text-xl font-bold tabular-nums">{pill.val}</span>
                      <span className="block text-[11px] font-semibold opacity-80">
                        {pill.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-[36px] border border-black/[0.06] bg-[#ECEEF4] p-2 dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
                    <HbImage
                      src={PEXELS.studioTeam}
                      alt={`${niche.name} Studio`}
                      fallbackIndex={0}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/85 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-[#14171F]/90">
                      <div>
                        <span className={`text-sm font-semibold ${HB.ink} block`}>
                          HudbirdUI Flagship Studio Pod
                        </span>
                        <span className={`text-xs ${HB.ink2}`}>
                          Staff engineers & principal product designers
                        </span>
                      </div>
                      <span className="shrink-0 rounded-full bg-[#C8F560] px-3.5 py-1.5 text-xs font-bold text-[#0D0F14]">
                        Verified Pod
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HbSection>

          {/* Bespoke Global Studio Hubs & Operating Principles */}
          <HbSection tone="muted">
            <HbHeader
              badge="Global Footprint"
              title="Four interconnected engineering & design hubs"
              subtitle="Follow-the-sun velocity across Zurich, San Francisco, Tokyo, and Stockholm."
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  city: "Zurich",
                  role: "Architecture & Privacy HQ",
                  tz: "CET (UTC+1)",
                  image: PEXELS.architectureWhite,
                },
                {
                  city: "San Francisco",
                  role: "AI Systems & Venture Lab",
                  tz: "PST (UTC-8)",
                  image: PEXELS.project1,
                },
                {
                  city: "Tokyo",
                  role: "Motion & Craft Studio",
                  tz: "JST (UTC+9)",
                  image: PEXELS.project3,
                },
                {
                  city: "Stockholm",
                  role: "Design Systems & Tokens",
                  tz: "CET (UTC+1)",
                  image: PEXELS.villaExterior2,
                },
              ].map((hub) => (
                <div
                  key={hub.city}
                  className="flex rounded-[30px] border border-black/[0.06] bg-white/80 p-2 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <div className="flex w-full flex-col justify-between rounded-[24px] border border-black/[0.05] bg-white p-3 dark:border-white/10 dark:bg-[#14171F]">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[18px]">
                      <HbImage
                        src={hub.image}
                        alt={hub.city}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute top-2.5 right-2.5 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[10px] text-white">
                        {hub.tz}
                      </span>
                    </div>
                    <div className="p-3">
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                        {hub.city}
                      </h3>
                      <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{hub.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </HbSection>

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 12: /contact & /book
  // Focused on Telemetry Hero + Direct Principal Intake Form
  // =========================================================================
  if (slugKey.includes("contact") || slugKey.includes("book") || slugKey.includes("consult")) {
    const contactData = domainContent.contact;

    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <InnerPageArchitecturalHero
            nicheSlug={niche.slug}
            nicheName={niche.name}
            specCode="CONTACT"
            variant="telemetry"
            title={`Initiate An Engagement With ${niche.name}`}
            subtitle="Direct Engineering Channel"
            description={contactData.subtext}
            primaryCtaText="Submit Inquiry"
            primaryCtaHref="#inquiry-form"
            secondaryCtaText="View Pricing"
            secondaryCtaHref={`/demos/${niche.slug}/pricing`}
            metrics={[
              { value: "<2h", label: "Response Window", subtext: "Direct to Principal" },
              { value: "100%", label: "IP Ownership", subtext: "Strict NDA guarantee" },
              { value: "48h", label: "Architecture SLA", subtext: "Dedicated pod kickoff" },
              { value: "Direct", label: "Channel Access", subtext: contactData.channel },
            ]}
          />

          <HbSection id="inquiry-form" tone="muted">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="space-y-6 lg:col-span-5">
                <div className={`${HB.cardDark} space-y-6 p-8`}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#C8F560] px-3.5 py-1.5 text-xs font-semibold text-[#0D0F14]">
                    <Sparkles className="h-3.5 w-3.5" />
                    Direct Principal Intake
                  </span>
                  <h2 className="text-2xl leading-tight font-semibold tracking-tight text-white sm:text-3xl">
                    {contactData.headline}
                  </h2>
                  <p className="text-sm leading-relaxed text-white/70">{contactData.subtext}</p>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <span className="text-xs text-white/60">Direct Email</span>
                      <a
                        href={`mailto:${contactData.email}`}
                        className="text-xs font-semibold text-[#C8F560] hover:underline"
                      >
                        {contactData.email}
                      </a>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <span className="text-xs text-white/60">Slack Connect</span>
                      <span className="text-xs font-semibold text-[#7EE7EE]">
                        {contactData.channel}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <span className="text-xs text-white/60">Global Hubs</span>
                      <span className="text-xs font-semibold text-white">
                        Zurich · San Francisco · Tokyo
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden rounded-[28px]">
                  <HbImage
                    src={PEXELS.architectureHero}
                    alt="Studio Headquarters"
                    fallbackIndex={1}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl bg-white/85 p-4 backdrop-blur-xl dark:bg-[#14171F]/85">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {PEXELS.avatars.slice(0, 3).map((av, i) => (
                          <HbImage
                            key={i}
                            src={av}
                            alt="Partner"
                            fallbackIndex={i}
                            className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                          />
                        ))}
                      </div>
                      <span className={`text-xs font-semibold ${HB.ink}`}>Partners online now</span>
                    </div>
                    <span className="rounded-full bg-[#C8F560] px-3 py-1 text-[11px] font-bold text-[#0D0F14]">
                      &lt; 2h Reply
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className={`${HB.card} space-y-6 p-8 sm:p-11`}>
                  <div className="space-y-1.5">
                    <span className={HB.chip}>Sprint Scope Brief</span>
                    <h3 className={`text-2xl font-semibold ${HB.ink} pt-1`}>
                      Configure your engagement
                    </h3>
                    <p className={`text-sm ${HB.ink2}`}>
                      Share your timeline and objectives—no sales reps, you speak directly with the
                      principal engineer.
                    </p>
                  </div>

                  {formSent ? (
                    <div className="space-y-4 rounded-[24px] border border-[#C8F560] bg-[#C8F560]/20 px-6 py-12 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#C8F560] text-[#0D0F14]">
                        <Check className="h-6 w-6 stroke-[2.5]" />
                      </div>
                      <h3 className={`text-2xl font-semibold ${HB.ink}`}>
                        Inquiry Logged & Routed
                      </h3>
                      <p className={`text-sm ${HB.ink2} mx-auto max-w-md`}>
                        Our principal architect is reviewing your brief and will reply with a custom
                        sprint roadmap within 2 hours.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setFormSent(true);
                      }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className={`text-xs font-semibold ${HB.ink}`}>Full Name *</label>
                          <input
                            required
                            type="text"
                            placeholder="Alex Vance"
                            className={`w-full rounded-2xl border border-black/10 bg-[#F4F5F8] px-4 py-3.5 text-sm dark:border-white/10 dark:bg-white/[0.04] ${HB.ink} focus:border-[color:var(--brand-primary)] focus:outline-none`}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className={`text-xs font-semibold ${HB.ink}`}>Work Email *</label>
                          <input
                            required
                            type="email"
                            placeholder="alex@company.com"
                            className={`w-full rounded-2xl border border-black/10 bg-[#F4F5F8] px-4 py-3.5 text-sm dark:border-white/10 dark:bg-white/[0.04] ${HB.ink} focus:border-[color:var(--brand-primary)] focus:outline-none`}
                          />
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <label className={`text-xs font-semibold ${HB.ink}`}>
                          Primary Workstream
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {contactData.workstreams.map((ws) => (
                            <button
                              key={ws}
                              type="button"
                              onClick={() => setFormWorkstream(ws)}
                              className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                                formWorkstream === ws
                                  ? "bg-[#C8F560] text-[#0D0F14] shadow-sm"
                                  : "bg-[#F4F5F8] text-[#5E6472] hover:text-[#0D0F14] dark:bg-white/[0.05] dark:text-[#9CA3AF] dark:hover:text-white"
                              }`}
                            >
                              {ws}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className={`text-xs font-semibold ${HB.ink}`}>
                          Project Scope & Target Launch
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Describe your product goals, key deliverables, and target launch window..."
                          className={`w-full rounded-2xl border border-black/10 bg-[#F4F5F8] px-4 py-3.5 text-sm dark:border-white/10 dark:bg-white/[0.04] ${HB.ink} focus:border-[color:var(--brand-primary)] focus:outline-none`}
                        />
                      </div>

                      <button
                        type="submit"
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0D0F14] py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-[#0D0F14]"
                      >
                        {contactData.submitButtonText}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </HbSection>

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 13: /faq
  // Focused on Minimal Hero + FaqWithTestimonials
  // =========================================================================
  if (slugKey.includes("faq")) {
    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <InnerPageArchitecturalHero
            nicheSlug={niche.slug}
            nicheName={niche.name}
            specCode="FAQ"
            variant="minimal"
            title={`Frequently Answered Technical Questions · ${niche.name}`}
            subtitle="Direct Technical Answers"
            description={`Exhaustive explanations covering domain architecture, token contracts, stack compatibility, deployment protocols, and ongoing maintenance for ${niche.name}.`}
            primaryCtaText="Book Architecture Call"
            primaryCtaHref={`/demos/${niche.slug}/contact`}
            secondaryCtaText="View Pricing"
            secondaryCtaHref={`/demos/${niche.slug}/pricing`}
            metrics={[
              { value: "24/7", label: "Knowledge Base", subtext: "Exhaustive technical docs" },
              { value: "100%", label: "Contract Certainty", subtext: "Fixed-scope guarantee" },
              { value: "16+", label: "Verified Answers", subtext: "No marketing fluff" },
              { value: "Direct", label: "Channel Access", subtext: domainContent.contact.channel },
            ]}
          />

          <FaqWithTestimonials data={niche.sections.faqTestimonials} />

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 14: /careers & /jobs
  // Focused on Split Hero + CareersBoardView
  // =========================================================================
  if (
    slugKey.includes("career") ||
    slugKey.includes("job") ||
    slugKey.includes("hire") ||
    slugKey.includes("role")
  ) {
    const isFintech = niche.slug === "fintech-protocol";
    const isAI = niche.slug === "ai-copilot";
    const isWellness = niche.slug === "alunara-wellness";
    const isCyber = niche.slug === "cyber-shield";

    const careerTitle = isFintech
      ? "Pioneer Sovereign Financial Infrastructure"
      : isAI
        ? "Architect Autonomous Intelligence Systems"
        : isWellness
          ? "Formulate The Future of Botanical Living"
          : isCyber
            ? "Defend Global Cloud Infrastructure"
            : "Build The Future of Digital Products";

    const careerDesc = isFintech
      ? "We are hiring staff-level smart contract auditors, quantitative risk modelers, and cryptographers. Zero corporate bureaucracy, top-tier compensation."
      : isAI
        ? "We are hiring foundation systems researchers, Triton GPU optimization engineers, and agent orchestration architects."
        : isWellness
          ? "We are hiring master herbal chemists, luxury spatial designers, and regenerative agriculture sourcing leads."
          : isCyber
            ? "We are hiring kernel eBPF engineers, white-hat exploit researchers, and incident response commanders."
            : "We are hiring staff-level frontend architects, design technologists, and kinetic systems engineers.";

    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <InnerPageArchitecturalHero
            nicheSlug={niche.slug}
            nicheName={niche.name}
            specCode="CAREERS"
            variant="split"
            title={careerTitle}
            subtitle={`Join ${niche.name}`}
            description={careerDesc}
            primaryCtaText="View Open Roles"
            primaryCtaHref="#open-roles"
            secondaryCtaText="Meet The Team"
            secondaryCtaHref={`/demos/${niche.slug}/team`}
            metrics={[
              { value: "$150k+", label: "Base Comp Range", subtext: "Top quartile market rate" },
              { value: "0.2–0.6%", label: "Equity Grant", subtext: "Real upside allocation" },
              { value: "100%", label: "Remote Global", subtext: "Asynchronous workflow" },
              { value: "4w", label: "Paid Sabbatical", subtext: "Annual recharge time" },
            ]}
          />

          <div id="open-roles">
            <CareersBoardView nicheSlug={niche.slug} />
          </div>

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 15: /integrations & /ecosystem & /stack
  // Focused on Telemetry Hero + StackEcosystemGrid
  // =========================================================================
  if (
    slugKey.includes("integration") ||
    slugKey.includes("ecosystem") ||
    slugKey.includes("stack")
  ) {
    const isFintech = niche.slug === "fintech-protocol";
    const isAI = niche.slug === "ai-copilot";
    const isWellness = niche.slug === "alunara-wellness";
    const isCyber = niche.slug === "cyber-shield";

    const integrationTitle = isFintech
      ? "Certified EVM, Custody & CCIP Integrations"
      : isAI
        ? "Certified LLM Foundation & GPU Integrations"
        : isWellness
          ? "Certified Commerce, Lab & Spatial Integrations"
          : isCyber
            ? "Certified Zero-Trust & SecOps Integrations"
            : "Certified Stack & Ecosystem Integrations";

    const integrationDesc = isFintech
      ? "Native integrations with Fireblocks, Chainlink CCIP, Safe Multi-Sig, Dune Analytics, and leading Layer 2 liquidity bridges."
      : isAI
        ? "Native integrations with NVIDIA Triton, vLLM, Pinecone, Claude SDK, LangGraph, and Kubernetes bare metal."
        : isWellness
          ? "Native integrations with Shopify Hydrogen, Sanity CMS, Three.js 3D Shaders, Klaviyo, and Bio-Suisse lab portals."
          : isCyber
            ? "Native integrations with Cloudflare Magic WAN, HashiCorp Vault, Falco eBPF, CrowdStrike Falcon, and OpenFGA."
            : "Built to plug directly into your existing infrastructure. 100% standard TypeScript, W3C design tokens, Next.js 15, and headless API runtimes.";

    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <InnerPageArchitecturalHero
            nicheSlug={niche.slug}
            nicheName={niche.name}
            specCode="ECOSYSTEM"
            variant="telemetry"
            title={integrationTitle}
            subtitle={`Ecosystem · ${niche.name}`}
            description={integrationDesc}
            primaryCtaText="Explore Integrations"
            primaryCtaHref="#ecosystem"
            secondaryCtaText="Schedule Architecture Call"
            secondaryCtaHref={`/demos/${niche.slug}/contact`}
            metrics={[
              { value: "16+", label: "Native Adapters", subtext: "Zero glue code required" },
              { value: "Sub-10ms", label: "Edge TTFB", subtext: "Cloudflare & Vercel edge" },
              { value: "100%", label: "W3C Token Sync", subtext: "Figma to CSS-first variables" },
              { value: "Zero", label: "Vendor Lock-in", subtext: "Fully self-hostable source" },
            ]}
          />

          <StackEcosystemGrid nicheSlug={niche.slug} />

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 16: /privacy & /terms & /legal & /license
  // Focused on Minimal Hero + LegalDocumentLayout
  // =========================================================================
  if (
    slugKey.includes("privacy") ||
    slugKey.includes("term") ||
    slugKey.includes("legal") ||
    slugKey.includes("license")
  ) {
    const isPrivacy = slugKey.includes("privacy");
    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <InnerPageArchitecturalHero
            nicheSlug={niche.slug}
            nicheName={niche.name}
            specCode={isPrivacy ? "PRIVACY" : "TERMS"}
            variant="minimal"
            title={
              isPrivacy
                ? "Data Privacy Policy & Zero-Telemetry Contract"
                : "Commercial Terms of Service & Architectural License"
            }
            subtitle={isPrivacy ? "Privacy & Security" : "Commercial License"}
            description={
              isPrivacy
                ? "We enforce strict zero-telemetry and local-first data processing. Your proprietary design tokens and customer data never leave your infrastructure."
                : "Comprehensive, founder-friendly terms granting 100% royalty-free commercial IP ownership upon delivery. No runtime licensing kickbacks."
            }
            primaryCtaText="Download Legal PDF"
            primaryCtaHref="#legal"
            secondaryCtaText="Contact Legal Desk"
            secondaryCtaHref="mailto:legal@hudbird.studio"
            metrics={[
              { value: "100%", label: "IP Ownership", subtext: "Full code and asset transfer" },
              { value: "Zero", label: "Data Retention", subtext: "Local-first architecture" },
              { value: "GDPR", label: "Compliant", subtext: "Swiss FADP & CCPA verified" },
              { value: "30-Day", label: "Bug Warranty", subtext: "Sub-24h response SLA" },
            ]}
          />

          <div id="legal">
            <LegalDocumentLayout
              documentType={isPrivacy ? "privacy" : "terms"}
              documentTitle={
                isPrivacy
                  ? "Global Privacy Policy & Data Sovereignty Framework"
                  : "Commercial Terms of Service & Software License"
              }
            />
          </div>

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 17: /testimonials & /reviews & /endorsements
  // Focused on Split Hero + FaqWithTestimonials
  // =========================================================================
  if (
    slugKey.includes("testimonial") ||
    slugKey.includes("review") ||
    slugKey.includes("endorse")
  ) {
    const isFintech = niche.slug === "fintech-protocol";
    const isAI = niche.slug === "ai-copilot";
    const isWellness = niche.slug === "alunara-wellness";
    const isCyber = niche.slug === "cyber-shield";

    const testimonialTitle = isFintech
      ? "Verified Institutional Treasurers & Fund Audits"
      : isAI
        ? "Verified Enterprise AI Leads & Research Audits"
        : isWellness
          ? "Verified Patron Endorsements & Atelier Reviews"
          : isCyber
            ? "Verified CISOs & Cloud Defense Audits"
            : "Verified Founder & CTO Endorsements";

    const testimonialDesc = isFintech
      ? "Read firsthand accounts from digital asset fund managers, DAO treasurers, and crypto foundations who secured liquidity on Aura Protocol."
      : isAI
        ? "Read firsthand accounts from VP of Engineering and Staff AI Architects scaling agentic copilots on Synapse infrastructure."
        : isWellness
          ? "Read authentic experiences from discerning patrons, luxury hotel directors, and botanical researchers experiencing Alunara rituals."
          : isCyber
            ? "Read firsthand security evaluations from Fortune 500 security executives and defense contractors protected by CyberShield."
            : "Read firsthand accounts from venture-backed founders and engineering leaders who scaled with our flagship design and code architecture.";

    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <InnerPageArchitecturalHero
            nicheSlug={niche.slug}
            nicheName={niche.name}
            specCode="REVIEWS"
            variant="split"
            title={testimonialTitle}
            subtitle={`Proof of Performance · ${niche.name}`}
            description={testimonialDesc}
            primaryCtaText="Book Studio Call"
            primaryCtaHref={`/demos/${niche.slug}/contact`}
            secondaryCtaText="Explore Shipped Work"
            secondaryCtaHref={`/demos/${niche.slug}/portfolio`}
            metrics={[
              { value: "98.4%", label: "Client NPS", subtext: "Top-tier founder satisfaction" },
              { value: "12+", label: "Verified Reviews", subtext: "Audited testimonials" },
              {
                value: "+340%",
                label: "Avg Conversion Lift",
                subtext: "Measurable commercial impact",
              },
              { value: "< 24ms", label: "P95 Latency", subtext: "Production speed standard" },
            ]}
          />

          <FaqWithTestimonials data={niche.sections.faqTestimonials} />

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 18: /404 & /not-found
  // Focused exclusively on ArchitecturalStatusView (no duplicate hero or filler)
  // =========================================================================
  if (slugKey.includes("404") || slugKey.includes("not-found")) {
    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <ArchitecturalStatusView
            mode="404"
            nicheSlug={niche.slug}
            nicheName={niche.name}
            attemptedPath={`/demos/${niche.slug}/${cleanSlug}`}
          />

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 19: /coming-soon & /waitlist
  // Focused exclusively on ArchitecturalStatusView mode="coming-soon"
  // =========================================================================
  if (slugKey.includes("coming-soon") || slugKey.includes("waitlist")) {
    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />

          <div id="waitlist">
            <ArchitecturalStatusView
              mode="coming-soon"
              nicheSlug={niche.slug}
              nicheName={niche.name}
            />
          </div>

          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // ROUTE 20: AUTH, OTP & SYSTEM MAINTENANCE SUITE
  // (/sign-in, /login, /sign-up, /register, /forgot-password, /reset-password, /otp, /verify, /maintenance)
  // =========================================================================
  if (
    slugKey.includes("sign-in") ||
    slugKey.includes("signin") ||
    slugKey.includes("login") ||
    slugKey.includes("sign-up") ||
    slugKey.includes("signup") ||
    slugKey.includes("register") ||
    slugKey.includes("forgot") ||
    slugKey.includes("reset") ||
    slugKey.includes("otp") ||
    slugKey.includes("verify") ||
    slugKey.includes("2fa") ||
    slugKey.includes("maintenance")
  ) {
    const resolvedAuthMode: HudbirdAuthMode =
      slugKey.includes("sign-up") || slugKey.includes("signup") || slugKey.includes("register")
        ? "sign-up"
        : slugKey.includes("forgot") || slugKey.includes("reset")
          ? "forgot-password"
          : slugKey.includes("otp") || slugKey.includes("verify") || slugKey.includes("2fa")
            ? "otp"
            : slugKey.includes("maintenance")
              ? "maintenance"
              : "sign-in";

    return (
      <div
        style={dynamicStyles}
        className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
      >
        <main className="relative z-10 flex flex-col">
          <NavbarMegaMenu data={niche.sections.navbar} />
          <HudbirdAuthUtilityView niche={niche} initialMode={resolvedAuthMode} />
          <SplitTextCtaFooter data={niche.sections.footer} />
        </main>
      </div>
    );
  }

  // =========================================================================
  // BESPOKE DOMAIN SPECIFICATION VIEW FOR SPECIALIZED ROUTES
  // (e.g., /security, /architecture, /docs, /analytics, /sign-up, /login)
  // =========================================================================
  const specTabs = [
    {
      label: `${pageInfo.title} Architecture`,
      metric: "99.99% SLA",
      code: `export const ${pageInfo.id.replace(/[^a-zA-Z0-9]/g, "_")}Config = {\n  niche: "${niche.slug}",\n  module: "${pageInfo.title}",\n  telemetry: "real-time",\n  zeroTrust: true,\n};`,
      desc: `Dedicated production module for ${pageInfo.title} inside the ${niche.name} ecosystem, engineered with strict TypeScript schemas and zero layout shift.`,
    },
    {
      label: "Runtime Telemetry & SLA",
      metric: "< 12ms Edge",
      code: `GET /api/v1/${niche.slug}/${pageInfo.id}/health\nHTTP/1.1 200 OK\nX-Hudbird-Latency: 8.4ms\nX-Compliance-State: VERIFIED`,
      desc: `Continuous automated verification, sub-12ms global edge caching, and real-time observability built directly into ${pageInfo.title}.`,
    },
    {
      label: "Token & Theme Contract",
      metric: "W3C Compliant",
      code: `:root {\n  --brand-primary: ${brandColor};\n  --surface-bezel: rgba(255,255,255,0.06);\n  --radius-outer: 34px;\n  --radius-inner: 26px;\n}`,
      desc: `Full dark/light polarity support and Double-Bezel surface tokens ready to customize for ${niche.name}.`,
    },
  ];

  return (
    <div
      style={dynamicStyles}
      className="bg-nx-page text-nx-ink relative min-h-screen font-sans transition-colors duration-300"
    >
      <main className="relative z-10 flex flex-col">
        <NavbarMegaMenu data={niche.sections.navbar} />

        <InnerPageArchitecturalHero
          nicheSlug={niche.slug}
          nicheName={niche.name}
          specCode="PORTAL"
          variant="telemetry"
          title={`${pageInfo.title} · ${niche.name}`}
          subtitle={pageInfo.category.toUpperCase()}
          description={
            pageInfo.shortDesc ||
            `Production module and interactive specification for ${pageInfo.title} in ${niche.name}.`
          }
          primaryCtaText="Request Access"
          primaryCtaHref={`/demos/${niche.slug}/contact`}
          secondaryCtaText="Inspect Spec"
          secondaryCtaHref="#spec-inspector"
          metrics={[
            { value: "2026", label: "Release Standard", subtext: "HudbirdUI v4.2" },
            { value: "100%", label: "TypeScript Strict", subtext: "Verified contracts" },
            { value: "<12ms", label: "Edge Latency", subtext: "Multi-region sync" },
            { value: "0.00", label: "Layout Shift", subtext: "100/100 CWV" },
          ]}
        />

        <HbSection id="spec-inspector" tone="light">
          <HbHeader
            badge={pageInfo.category}
            title={`Interactive ${pageInfo.title} Inspector`}
            subtitle={`Explore the live configuration, runtime health, and architectural primitives powering ${pageInfo.title}.`}
          />

          <div className="rounded-[34px] border border-black/[0.06] bg-[#ECEEF4] p-2 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="rounded-[26px] border border-black/[0.05] bg-white p-6 sm:p-10 dark:border-white/10 dark:bg-[#14171F]">
              <div className="flex flex-wrap gap-2 border-b border-black/[0.06] pb-6 dark:border-white/10">
                {specTabs.map((t, idx) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setActiveSpecTab(idx)}
                    className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                      activeSpecTab === idx
                        ? "bg-[#0D0F14] text-white dark:bg-[#C8F560] dark:text-[#0D0F14]"
                        : "bg-[#F4F5F8] text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-300"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 items-center gap-8 pt-8 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#C8F560] px-3 py-1 text-xs font-semibold text-[#0D0F14]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{specTabs[activeSpecTab].metric}</span>
                  </span>
                  <h3 className={`text-2xl font-semibold ${HB.ink}`}>
                    {specTabs[activeSpecTab].label}
                  </h3>
                  <p className={`text-sm leading-relaxed sm:text-base ${HB.ink2}`}>
                    {specTabs[activeSpecTab].desc}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <PillLink href={`/demos/${niche.slug}/contact`} variant="brand" size="md">
                      Deploy {pageInfo.title}
                    </PillLink>
                    <PillLink href={`/demos/${niche.slug}/pricing`} variant="ghost" size="md">
                      Compare plans
                    </PillLink>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="space-y-3 overflow-x-auto rounded-2xl border border-white/10 bg-[#0D0F14] p-6 font-mono text-xs text-zinc-200 sm:text-sm">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs text-zinc-400">
                      <span className="inline-flex items-center gap-1.5 text-[#C8F560]">
                        <Terminal className="h-3.5 w-3.5" />
                        <span>
                          {niche.slug}/{pageInfo.id}.ts
                        </span>
                      </span>
                      <span>Verified</span>
                    </div>
                    <pre className="leading-relaxed text-emerald-300">
                      <code>{specTabs[activeSpecTab].code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HbSection>

        <SplitTextCtaFooter data={niche.sections.footer} />
      </main>
    </div>
  );
};
