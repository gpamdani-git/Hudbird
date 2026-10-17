// starter-kits/pro-templates/src/components/Showcase/NexusMasterShowcase.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { INNER_PAGES_MATRIX } from "@hudbird/schemas";
import {
  Container,
  SectionLabel,
  MaskedHeading,
  Reveal,
  PillLink,
  useIsDark,
  toggleTheme,
} from "../nexus-sections/ScrollReveal";
import {
  PEXELS,
  HudbirdFeatureWidgetGrid,
  HudbirdSplitFloatingStats,
  HudbirdRobustTelemetryBento,
} from "../nexus-sections/HudbirdVisualWidgets";
import { Sun, Moon, ArrowUpRight } from "lucide-react";
import { AllPagesDirectory } from "../nexus-sections/AllPagesDirectory";

const FLAGSHIP_DEMOS = [
  {
    slug: "digital-agency",
    href: "/demos/digital-agency",
    title: "Digital Agency Platform",
    category: "agency",
    badge: "Flagship #01 · Light & Dark",
    desc: "2-column split hero, 95% & 130+ satisfaction stats, 3 fan-tilted 3D fluid cards, interactive services grid & project slider.",
    accent: "#7C3AED",
    previewImage: PEXELS.abstract3d1,
    tags: ["3D Fan Cards", "Project Slider", "29+ Pages"],
  },
  {
    slug: "ai-copilot",
    href: "/demos/ai-copilot",
    title: "AI Keyword Generator & Prompt Studio",
    category: "ai-saas",
    badge: "Flagship #02 · Dark Grid",
    desc: "3D perspective wireframe grid on #0A0A0F, interactive AI prompt textarea with warm coral/orange radial glow & live cluster generator.",
    accent: "#F97316",
    previewImage: PEXELS.abstract3d2,
    tags: ["Coral Prompt Glow", "3D Grid", "Live AI Clusters"],
  },
  {
    slug: "fintech-protocol",
    href: "/demos/fintech-protocol",
    title: "Workflow Automation & Treasury SaaS",
    category: "fintech",
    badge: "Flagship #03 · Sky & Glass",
    desc: "Photorealistic sky & clouds backdrop, lime-green circular badge CTA, and frosted glass Tax Filing interactive SaaS table UI.",
    accent: "#84CC16",
    previewImage: PEXELS.skyClouds,
    tags: ["Sky Backdrop", "Frosted SaaS Table", "Lime CTA"],
  },
  {
    slug: "proptech-villa",
    href: "/demos/property-management-software",
    title: "Smart Property Management (PropTech)",
    category: "fintech",
    badge: "Flagship #04 · Architectural Villa",
    desc: "Bright sky backdrop with modern white cantilevered luxury villa, floating transaction & profit sparkline cards, and 2x2 cobalt ring telemetry.",
    accent: "#2563EB",
    previewImage: PEXELS.villaHero,
    tags: ["Modern Villa Hero", "Floating Stats", "Cobalt Ring Bento"],
  },
  {
    slug: "cyber-shield",
    href: "/demos/cyber-shield",
    title: "Neural Networks & AI Business Growth",
    category: "ai-saas",
    badge: "Flagship #05 · 3D Sculpture",
    desc: "Clean studio canvas with 3D pastel neural brain centerpiece flanked by floating tilted social & 87% efficiency glass cards.",
    accent: "#6366F1",
    previewImage: PEXELS.neuralBrain,
    tags: ["3D Brain Centerpiece", "Tilted Glass Cards", "Enterprise AI"],
  },
  {
    slug: "alunara-wellness",
    href: "/demos/alunara-wellness",
    title: "AI Solutions & Bio-Longevity Lab",
    category: "ecommerce",
    badge: "Flagship #06 · Aurora Video Pill",
    desc: "Deep violet aurora wave backdrop, inline video play pill inside the headline, concentric ripple CTA rings & horizontal slide gallery.",
    accent: "#EC4899",
    previewImage: PEXELS.vrPortrait,
    tags: ["Inline Video Pill", "Aurora Wave", "Slide Gallery"],
  },
];

export function NexusMasterShowcase() {
  const isDark = useIsDark();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    document.title = "HudbirdUI — 47 Pre-Built Templates & 29+ Inner/Auth Pages Library";
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const filteredDemos =
    selectedCategory === "all"
      ? FLAGSHIP_DEMOS
      : FLAGSHIP_DEMOS.filter((d) => d.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#F4F5F8] font-sans text-zinc-900 transition-colors duration-300 dark:bg-[#0A0A0F] dark:text-white">
      {/* 1. Floating Pill Header (HudbirdUI Flagship) */}
      <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex h-16 items-center justify-between rounded-full border border-black/[0.06] bg-white/95 px-3 shadow-[0_12px_36px_-8px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:h-[68px] dark:border-white/10 dark:bg-zinc-900/90">
            <Link to="/nexus" className="flex items-center gap-2.5 pl-1">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C8F560] font-bold text-[#0D0F14] shadow-sm">
                H
              </span>
              <div>
                <span className="block text-lg leading-none font-semibold tracking-tight">
                  HudbirdUI
                </span>
                <span className="text-[10px] font-medium text-zinc-400">
                  47 Pre-Built Templates
                </span>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 md:flex dark:text-zinc-300">
              <a
                href="#demos"
                className="transition-colors hover:text-zinc-950 dark:hover:text-white"
              >
                Flagship Archetypes
              </a>
              <a
                href="#all-pages-directory"
                className="transition-colors hover:text-zinc-950 dark:hover:text-white"
              >
                All 47 Templates
              </a>
              <Link
                to="/demos/digital-agency/sign-in"
                className="transition-colors hover:text-zinc-950 dark:hover:text-white"
              >
                Auth & OTP Suite
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/[0.06] bg-zinc-100/80 dark:border-white/10 dark:bg-white/5"
                title="Toggle Theme"
              >
                {isDark ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4 text-zinc-700" />
                )}
              </button>
              <PillLink href="#all-pages-directory" variant="brand" size="md">
                Explore 47 Demos
              </PillLink>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Master Showcase Hero */}
      <section className="overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
        <Container>
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <Reveal y={10}>
              <SectionLabel label="HudbirdUI Flagship Design System · 47 Pre-Built Templates + 29+ Inner Pages" />
            </Reveal>

            <MaskedHeading
              as="h1"
              text="Build, launch, and scale with *47 pre-built* HudbirdUI templates"
              accent="47 pre-built"
              className="text-[clamp(2.5rem,5.5vw,4.6rem)] leading-[1.06] font-semibold tracking-[-0.035em]"
            />

            <Reveal delay={0.1} y={14}>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
                Every template is custom-crafted with Double-Bezel architecture, interactive 3D
                cards, coral-glow AI prompt engines, PropTech architectural villas, and a full 29+
                inner, Auth, 6-digit OTP, and Legal page suite.
              </p>
            </Reveal>

            <Reveal delay={0.18} y={16}>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <PillLink href="#all-pages-directory" variant="brand" size="lg">
                  Browse All 47 Pre-Built Templates
                </PillLink>
                <PillLink href="/demos/digital-agency/sign-in" variant="ghost" size="lg">
                  Preview Auth & OTP Suite
                </PillLink>
              </div>
            </Reveal>
          </div>

          {/* 4 Key Highlights Strip */}
          <div className="mt-16 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {[
              {
                value: "47",
                label: "Pre-Built Templates",
                sub: "AI, SaaS, Fintech, Agency & Cyber",
              },
              {
                value: "29+",
                label: "Inner & Auth Pages",
                sub: "Sign In, Register, OTP, Legal, 404",
              },
              {
                value: "1,360+",
                label: "Total Route Permutations",
                sub: "47 templates × 29+ inner views",
              },
              {
                value: "100%",
                label: "Pexels Curated Media",
                sub: "Verified high-res photography",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-[28px] border border-black/[0.06] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900"
              >
                <div className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-[#C8F560]">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-semibold">{stat.label}</div>
                <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{stat.sub}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Pre-Built Flagship Demos Grid (#demos) */}
      <section
        id="demos"
        className="rounded-t-[44px] bg-white py-20 sm:rounded-t-[60px] sm:py-28 dark:bg-zinc-950"
      >
        <Container>
          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl space-y-3">
              <SectionLabel label="6 Core Archetype Worlds" />
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Distinct visual layouts crafted for every modern industry.
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All Archetypes (6)" },
                { id: "agency", label: "Digital Agency" },
                { id: "ai-saas", label: "AI & Neural SaaS" },
                { id: "fintech", label: "Fintech & PropTech" },
                { id: "ecommerce", label: "AI Solutions & Bio" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#C8F560] text-[#0D0F14] shadow-sm"
                      : "bg-[#F4F5F8] text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredDemos.map((demo) => (
              <Link
                key={demo.slug}
                to={demo.href}
                className="group flex flex-col justify-between rounded-[34px] border border-black/[0.06] bg-[#F4F5F8] p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl dark:border-white/10 dark:bg-zinc-900"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-zinc-950">
                  <img
                    src={demo.previewImage}
                    alt={demo.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/75 via-black/15 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-zinc-950">
                        {demo.badge}
                      </span>
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-lg"
                        style={{ backgroundColor: demo.accent }}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {demo.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold transition-colors group-hover:text-zinc-600 dark:group-hover:text-[#C8F560]">
                      {demo.title}
                    </h3>
                    <span className="shrink-0 text-xs font-semibold text-zinc-900 dark:text-[#C8F560]">
                      Live ↗
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                    {demo.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Full 47 Pre-Built Templates & 29+ Inner/Auth Pages Interactive Directory */}
      <AllPagesDirectory
        nicheSlug="digital-agency"
        nicheName="HudbirdUI"
        pages={INNER_PAGES_MATRIX}
        defaultView="templates"
      />

      {/* 5. Interactive UI Widgets Showcase (#widgets) */}
      <div id="widgets">
        <HudbirdFeatureWidgetGrid />
        <HudbirdSplitFloatingStats />
        <HudbirdRobustTelemetryBento />
      </div>
    </div>
  );
}

export default NexusMasterShowcase;
