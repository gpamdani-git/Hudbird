// starter-kits/pro-templates/src/components/nexus-sections/SplitTextCtaFooter.tsx
"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SplitTextCtaFooterProps } from "@hudbird/schemas";
import { Container, Reveal, PillLink } from "./ScrollReveal";

const NICHE_FOOTER_COPY: Record<
  string,
  { badge: string; headline: string; sub: string; primaryLabel: string }
> = {
  "digital-agency": {
    badge: "Start a Sprint Pod",
    headline: "Ready to ship a flagship product that converts?",
    sub: "Speak directly with our principal design and engineering partners—zero junior handoffs, fixed-scope sprints, and 100% IP ownership.",
    primaryLabel: "Book Discovery Call",
  },
  "ai-copilot": {
    badge: "Autonomous SEO & Content",
    headline: "Scale organic traffic with live SERP intelligence.",
    sub: "Deploy automated keyword clustering, intent scoring, and brief generation across your entire content team in minutes.",
    primaryLabel: "Start Free Workspace",
  },
  "fintech-protocol": {
    badge: "Treasury & Property Ops",
    headline: "Automate filings, treasury sweeps, and portfolio yield.",
    sub: "Connect your ERP, bank accounts, and property ledgers into one unified operating system with real-time reconciliation.",
    primaryLabel: "Request Live Demo",
  },
  "cyber-shield": {
    badge: "Zero-Trust Cloud Defense",
    headline: "Harden your infrastructure with autonomous eBPF telemetry.",
    sub: "Deploy sub-10ms anomaly detection, cryptographic enclave verification, and continuous SOC2 compliance across every cluster.",
    primaryLabel: "Deploy Security Audit",
  },
  "alunara-wellness": {
    badge: "Private Longevity Atelier",
    headline: "Begin your personalized cellular longevity protocol.",
    sub: "Reserve a private biometric consultation at our Zurich, Kyoto, or Alpine sanctuaries with our clinical formulation leads.",
    primaryLabel: "Reserve Consultation",
  },
};

export const SplitTextCtaFooter: React.FC<{ data: SplitTextCtaFooterProps }> = ({ data }) => {
  const location = useLocation();
  const matchNiche = location.pathname.match(/\/demos\/([^/]+)/);
  const activeNicheSlug = matchNiche?.[1] || "digital-agency";
  const copy = NICHE_FOOTER_COPY[activeNicheSlug] || NICHE_FOOTER_COPY["digital-agency"];

  return (
    <footer className="relative overflow-hidden border-t border-black/[0.06] bg-[#F4F5F8] pt-20 pb-12 text-[#0D0F14] transition-colors duration-300 sm:pt-28 dark:border-white/[0.08] dark:bg-[#0B0C10] dark:text-[#F9FAFB]">
      <Container>
        {/* 1. Double-Bezel HudbirdUI CTA Banner Card (Zero Purple Glow, High-Contrast Lime CTA) */}
        <div className="mb-16 rounded-[36px] border border-black/[0.06] bg-black/[0.04] p-2 dark:border-white/[0.08] dark:bg-white/[0.04]">
          <div className="relative overflow-hidden rounded-[30px] bg-[#0D0F14] p-8 text-white shadow-[0_24px_60px_-20px_rgba(13,15,20,0.35)] sm:p-14 lg:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-28 -bottom-28 h-96 w-96 rounded-full bg-[#C8F560]/12 blur-[110px]"
            />
            <div className="relative z-10 mx-auto max-w-4xl space-y-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-1.5 text-xs font-semibold text-white/90">
                <span className="h-2 w-2 rounded-full bg-[#C8F560]" />
                <span>{copy.badge}</span>
              </span>

              <h2 className="mx-auto max-w-3xl text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-balance text-white">
                {copy.headline}
              </h2>

              <Reveal delay={0.08}>
                <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                  {copy.sub}
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <PillLink
                    href={data.primaryCta?.href || `/demos/${activeNicheSlug}/contact`}
                    variant="lime"
                    size="lg"
                  >
                    {data.primaryCta?.label || copy.primaryLabel}
                  </PillLink>
                  <PillLink href={`/demos/${activeNicheSlug}/pricing`} variant="inverse" size="lg">
                    View Pricing
                  </PillLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* 2. Clean 4-Column HudbirdUI Footer Links */}
        <div className="grid grid-cols-1 gap-10 border-b border-black/[0.06] pb-12 md:grid-cols-2 lg:grid-cols-12 dark:border-white/[0.08]">
          <div className="space-y-5 lg:col-span-4">
            <Link to={`/demos/${activeNicheSlug}`} className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D0F14] text-sm font-bold text-[#C8F560] dark:bg-[#C8F560] dark:text-[#0D0F14]">
                H
              </span>
              <span className="text-xl font-semibold tracking-tight text-[#0D0F14] dark:text-white">
                HudbirdUI
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-[#5E6472] dark:text-[#9CA3AF]">
              HudbirdUI designs, engineers, and scales category-leading digital products with React
              19, Tailwind CSS v4, and tactile motion architecture.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Dribbble", "Behance", "X / Twitter", "LinkedIn", "GitHub"].map((soc) => (
                <a
                  key={soc}
                  href="https://ui8.net"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/[0.06] bg-white px-3.5 py-1.5 text-xs font-medium text-[#5E6472] transition-colors hover:text-[#0D0F14] dark:border-white/[0.08] dark:bg-[#14171F] dark:text-[#9CA3AF] dark:hover:text-white"
                >
                  {soc}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3 lg:col-span-2">
            <h4 className="text-xs font-semibold text-[#0D0F14] dark:text-white">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "About Studio", href: `/demos/${activeNicheSlug}/about` },
                { label: "Capabilities", href: `/demos/${activeNicheSlug}/services` },
                { label: "Leadership", href: `/demos/${activeNicheSlug}/team` },
                { label: "Open Roles", href: `/demos/${activeNicheSlug}/careers` },
                { label: "Contact Desk", href: `/demos/${activeNicheSlug}/contact` },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-[#5E6472] transition-colors hover:text-[#0D0F14] dark:text-[#9CA3AF] dark:hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 lg:col-span-3">
            <h4 className="text-xs font-semibold text-[#0D0F14] dark:text-white">
              Showcase & Editorial
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Selected Work", href: `/demos/${activeNicheSlug}/projects` },
                { label: "Case Study Deep-Dive", href: `/demos/${activeNicheSlug}/case-study` },
                { label: "Engineering Journal", href: `/demos/${activeNicheSlug}/blog` },
                { label: "Article View", href: `/demos/${activeNicheSlug}/blog-post` },
                { label: "Release Changelog", href: `/demos/${activeNicheSlug}/changelog` },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-[#5E6472] transition-colors hover:text-[#0D0F14] dark:text-[#9CA3AF] dark:hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 lg:col-span-3">
            <h4 className="text-xs font-semibold text-[#0D0F14] dark:text-white">
              Platform & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Sprint Methodology", href: `/demos/${activeNicheSlug}/process` },
                { label: "Pricing & Compare", href: `/demos/${activeNicheSlug}/pricing` },
                { label: "Client Portal", href: `/demos/${activeNicheSlug}/portal` },
                { label: "Stack Integrations", href: `/demos/${activeNicheSlug}/integrations` },
                { label: "All 24+ Pages Directory", href: `/demos/${activeNicheSlug}/all-pages` },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-[#5E6472] transition-colors hover:text-[#0D0F14] dark:text-[#9CA3AF] dark:hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Copyright Bottom Row */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-[#5E6472] sm:flex-row dark:text-[#9CA3AF]">
          <p>© 2026 HudbirdUI — Crafted with React 19, Tailwind v4 & Motion Physics.</p>
          <div className="flex items-center gap-6">
            <Link to="/nexus" className="font-semibold hover:text-[#0D0F14] dark:hover:text-white">
              All Flagship Demos ↗
            </Link>
            <Link
              to={`/demos/${activeNicheSlug}/privacy`}
              className="hover:text-[#0D0F14] dark:hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              to={`/demos/${activeNicheSlug}/terms`}
              className="hover:text-[#0D0F14] dark:hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
