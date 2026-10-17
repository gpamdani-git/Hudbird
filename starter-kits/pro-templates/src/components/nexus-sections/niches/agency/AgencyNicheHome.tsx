// starter-kits/pro-templates/src/components/nexus-sections/niches/agency/AgencyNicheHome.tsx
"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NicheConfig } from "@hudbird/schemas";
import { NavbarMegaMenu } from "../../NavbarMegaMenu";
import { HeroAgency } from "../../HeroAgency";
import { AllPagesDirectory } from "../../AllPagesDirectory";
import { SplitTextCtaFooter } from "../../SplitTextCtaFooter";
import { PEXELS, HudbirdSplitFloatingStats } from "../../HudbirdVisualWidgets";
import { Container, SectionLabel, MaskedHeading, PillLink } from "../../ScrollReveal";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Check,
  Play,
  Star,
  Plus,
  Minus,
  Sparkles,
  Layers,
  Code2,
  Compass,
  TrendingUp,
} from "lucide-react";

const HUDBIRD_SERVICES = [
  {
    id: "ui-ux",
    title: "UI/UX Design",
    shortDesc: "Intuitive interfaces designed to turn visitors into loyal users.",
    detailDesc:
      "Research-driven experiences that feel effortless, look polished, and convert with purpose.",
    icon: Layers,
    bullets: [
      "User research & wireframes",
      "Interactive prototyping",
      "Design systems",
      "Usability testing",
      "Mobile app design",
    ],
  },
  {
    id: "web-dev",
    title: "Web Development",
    shortDesc: "Fast, scalable builds engineered to drive real business growth.",
    detailDesc:
      "Clean architecture and modern stacks that keep your product reliable, secure, and ready to scale.",
    icon: Code2,
    bullets: [
      "Custom web applications",
      "CMS & eCommerce",
      "API integrations",
      "Performance optimization",
      "Cloud deployment",
    ],
  },
  {
    id: "brand-strategy",
    title: "Brand Strategy",
    shortDesc: "Distinctive identity systems that make your brand memorable.",
    detailDesc:
      "Positioning, messaging, and visual language that help your brand stand out and stay consistent.",
    icon: Compass,
    bullets: [
      "Brand positioning",
      "Visual identity",
      "Tone of voice",
      "Brand guidelines",
      "Logo systems",
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    shortDesc: "Data-backed campaigns that attract and retain the right audience.",
    detailDesc:
      "Strategy and execution across channels to grow visibility, engagement, and measurable revenue.",
    icon: TrendingUp,
    bullets: [
      "SEO & content",
      "Paid media",
      "Social campaigns",
      "Analytics & reporting",
      "Email marketing",
    ],
  },
];

const HUDBIRD_PROJECTS = [
  {
    title: "FinovaX Pro",
    subtitle: "Advanced Financial Intelligence Platform",
    category: "Fintech UI/UX",
    metric: "3.4x ROI improvement",
    image: PEXELS.projects[0],
  },
  {
    title: "Orbit Commerce",
    subtitle: "Scalable E-commerce Experience Platform",
    category: "Web Development",
    metric: "+68% Conversion Lift",
    image: PEXELS.projects[1],
  },
  {
    title: "Lumora Health",
    subtitle: "Patient-Centered Care Digital Platform",
    category: "Mobile & Web App",
    metric: "98% Patient CSAT",
    image: PEXELS.projects[2],
  },
  {
    title: "Nexora CRM",
    subtitle: "Smart Customer Relationship Suite",
    category: "SaaS Product",
    metric: "$2.4M Annual Savings",
    image: PEXELS.projects[3],
  },
  {
    title: "Verdant Travel",
    subtitle: "Immersive Booking & Discovery App",
    category: "Brand & Mobile",
    metric: "4.9★ App Store Rating",
    image: PEXELS.projects[4],
  },
  {
    title: "Pulse Media",
    subtitle: "Content Streaming & Engagement Hub",
    category: "Design System",
    metric: "94% Improved Scalability",
    image: PEXELS.projects[5],
  },
];

const HUDBIRD_TEAM = [
  { name: "Ethan Carter", role: "Founder & Creative Director", image: PEXELS.avatars[0] },
  { name: "Sophia Bennett", role: "Brand Strategist", image: PEXELS.avatars[1] },
  { name: "Kai Nakamura", role: "Product Designer", image: PEXELS.avatars[2] },
  { name: "Noah Hayes", role: "Lead Developer", image: PEXELS.avatars[3] },
  { name: "Marcus Rivera", role: "Marketing Director", image: PEXELS.avatars[4] },
];

const HUDBIRD_TESTIMONIALS = [
  {
    name: "Liam Harper",
    role: "Product Lead",
    quote:
      "The design system and web platform were sharp, clean, and made our product look genuinely world-class.",
    avatar: PEXELS.avatars[0],
  },
  {
    name: "Maya Collins",
    role: "VP of Brand",
    quote:
      "They truly captured the essence of our brand while doubling our landing page conversion rate in 30 days.",
    avatar: PEXELS.avatars[1],
  },
  {
    name: "Ethan Brooks",
    role: "President of Sales",
    quote:
      "Zero fluff, lightning-fast execution, and a visual identity that immediately set us apart from competitors.",
    avatar: PEXELS.avatars[2],
  },
  {
    name: "Zoe Mitchell",
    role: "Web Designer",
    quote:
      "Every interaction, hover state, and responsive breakpoint was crafted with obsessive attention to detail.",
    avatar: PEXELS.avatars[3],
  },
];

const HUDBIRD_FAQS = [
  {
    q: "How fast can we kick off and launch a new digital product?",
    a: "Most brand and web platform engagements kick off within 48 hours and launch in 4 to 6 weeks with weekly interactive milestones.",
  },
  {
    q: "Do you handle both UI/UX design and full-stack web development?",
    a: "Yes. Our multidisciplinary team handles research, UI/UX design systems, interactive motion, and production React/Next.js or Tailwind deployment.",
  },
  {
    q: "Can we customize all 24+ inner pages and components for our brand?",
    a: "Absolutely. Every template, color token, typography scale, and inner page is modular and ready to adapt in minutes.",
  },
  {
    q: "What happens after the project launches?",
    a: "We provide full documentation, design system handoff, analytics tracking, and optional ongoing growth sprints.",
  },
];

export interface AgencyNicheHomeProps {
  niche: NicheConfig;
  customBrandPrimary?: string;
}

export const AgencyNicheHome: React.FC<AgencyNicheHomeProps> = ({ niche }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>("ui-ux");
  const [projectSlideIndex, setProjectSlideIndex] = useState<number>(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#F4F5F8] text-zinc-900 transition-colors duration-300 dark:bg-[#0B0B10] dark:text-white">
      {/* 1. Floating Pill Navbar */}
      <NavbarMegaMenu data={niche.sections.navbar} />

      {/* 2. Hero with 3 Fan-Tilted 3D Artwork Cards */}
      <HeroAgency data={niche.sections.hero as any} />

      {/* 3. Clean About + Video Showreel + 3-Stat Strip */}
      <section className="rounded-t-[40px] bg-white py-20 shadow-[0_-10px_40px_rgba(0,0,0,0.02)] sm:rounded-t-[56px] sm:py-28 dark:bg-zinc-950">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-6">
              <SectionLabel label="About HudbirdUI Studio" />
              <MaskedHeading
                as="h2"
                text="From concept to launch, we build digital products that *grow* faster."
                accent="grow"
                className="text-[clamp(2rem,4vw,3.4rem)] leading-[1.1] font-semibold tracking-[-0.035em]"
              />
              <p className="max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                From concept to launch, we focus on creating digital products that solve real
                problems, improve user experience, and help modern brands scale with clarity.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <PillLink href="/demos/digital-agency/about" variant="brand" size="md">
                  Learn more
                </PillLink>
                <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-xs font-semibold dark:bg-white/5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span>Rated 4.8/5.0 by 200+ founders</span>
                </div>
              </div>
            </div>

            {/* Interactive Video Reel Card */}
            <div className="lg:col-span-6">
              <div
                onClick={() => setIsVideoModalOpen(true)}
                className="group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-[32px] border border-black/[0.06] bg-zinc-900 shadow-[0_24px_60px_-15px_rgba(124,58,237,0.18)] dark:border-white/10"
              >
                <img
                  src={PEXELS.studioTeam}
                  alt="Studio Showreel"
                  className="h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 sm:p-8">
                  <div className="flex justify-end">
                    <span className="rounded-full border border-white/20 bg-white/15 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                      01:45 Showreel
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-white sm:text-xl">
                        Watch how we ship in 4 weeks
                      </p>
                      <p className="text-xs text-white/75 sm:text-sm">
                        Design systems, 3D motion & full-stack engineering
                      </p>
                    </div>
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-0.5 h-6 w-6 fill-current" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { value: "150+", label: "Trusted partners", sub: "Global SaaS & enterprise teams" },
              {
                value: "12+",
                label: "Years of experience",
                sub: "Shipping high-impact digital products",
              },
              { value: "48+", label: "Awards won", sub: "Awwwards, FWA & UI8 featured" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col justify-between rounded-[28px] border border-black/[0.05] bg-[#F4F5F8] p-7 dark:border-white/10 dark:bg-zinc-900/80"
              >
                <div className="text-4xl font-semibold tracking-[-0.03em] text-zinc-900 sm:text-5xl dark:text-white">
                  {stat.value}
                </div>
                <div className="mt-4">
                  <div className="text-base font-semibold text-zinc-900 dark:text-white">
                    {stat.label}
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{stat.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Interactive 4-Card Services Grid */}
      <section className="bg-[#F4F5F8] py-20 sm:py-28 dark:bg-[#0B0B10]">
        <Container>
          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl space-y-4">
              <SectionLabel label="Our Services" />
              <MaskedHeading
                as="h2"
                text="Built to simplify your journey and *accelerate* growth."
                accent="accelerate"
                className="text-[clamp(2rem,4vw,3.4rem)] leading-[1.08] font-semibold tracking-[-0.035em]"
              />
            </div>
            <PillLink href="/demos/digital-agency/services" variant="brand" size="md">
              Get started
            </PillLink>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {HUDBIRD_SERVICES.map((srv) => {
              const Icon = srv.icon;
              const isExpanded = activeServiceId === srv.id;
              return (
                <div
                  key={srv.id}
                  onMouseEnter={() => setActiveServiceId(srv.id)}
                  onClick={() => setActiveServiceId(srv.id)}
                  className={`group relative flex min-h-[420px] cursor-pointer flex-col justify-between overflow-hidden rounded-[30px] border p-6 transition-all duration-500 sm:p-7 ${
                    isExpanded
                      ? "-translate-y-1 border-zinc-800 bg-zinc-900 text-white shadow-[0_28px_60px_-15px_rgba(124,58,237,0.3)]"
                      : "border-black/[0.06] bg-white text-zinc-900 hover:border-[#7C3AED]/40 dark:border-white/10 dark:bg-zinc-900/70 dark:text-white"
                  }`}
                >
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                          isExpanded
                            ? "bg-[#7C3AED] text-white"
                            : "bg-[#F4F5F8] text-[#7C3AED] dark:bg-white/10"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <Link
                        to="/demos/digital-agency/service-detail"
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                          isExpanded
                            ? "bg-white text-zinc-950"
                            : "bg-zinc-100 text-zinc-600 dark:bg-white/10 dark:text-zinc-300"
                        }`}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>

                    <h3 className="text-xl font-semibold tracking-tight">{srv.title}</h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        isExpanded ? "text-zinc-300" : "text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {isExpanded ? srv.detailDesc : srv.shortDesc}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-current/10 pt-5">
                    <ul className="space-y-2">
                      {srv.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2.5 text-xs font-medium">
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/20 text-[#7C3AED]">
                            <Check className="h-2.5 w-2.5" />
                          </span>
                          <span
                            className={
                              isExpanded ? "text-zinc-200" : "text-zinc-600 dark:text-zinc-300"
                            }
                          >
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/demos/digital-agency/service-detail"
                      className={`mt-5 inline-flex items-center gap-1.5 text-xs font-semibold ${
                        isExpanded ? "text-purple-300 hover:text-white" : "text-[#7C3AED]"
                      }`}
                    >
                      <span>Explore service</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 5. NEW SCREENSHOT C SECTION: Split Isometric Cube Features + Overlapping $41.379 & Profit 85.4% Stat Cards */}
      <HudbirdSplitFloatingStats
        badge="Reasons to select HudbirdUI"
        headline="Modern tools built for today’s digital product teams."
        subtitle="Streamline design systems, automate deployments, and maximize client ROI."
        features={[
          "Unified design-to-code system for all client brands",
          "Automated sprint milestones & real-time telemetry",
          "Interactive component playgrounds & live previews",
          "AI-powered conversion & accessibility optimization",
        ]}
        image={PEXELS.architectureWhite}
      />

      {/* 6. Interactive Slide Image Gallery — Selected Projects (100% Pexels) */}
      <section className="bg-white py-20 sm:py-28 dark:bg-zinc-950">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl space-y-4">
              <SectionLabel label="Selected Projects" />
              <MaskedHeading
                as="h2"
                text="Every project is built with one goal—*performance*."
                accent="performance"
                className="text-[clamp(2rem,4vw,3.4rem)] leading-[1.08] font-semibold tracking-[-0.035em]"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setProjectSlideIndex((prev) =>
                    prev === 0 ? HUDBIRD_PROJECTS.length - 3 : Math.max(0, prev - 1)
                  )
                }
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-zinc-900 hover:text-white dark:border-white/15 dark:hover:bg-white dark:hover:text-zinc-950"
                aria-label="Previous projects"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setProjectSlideIndex((prev) =>
                    prev >= HUDBIRD_PROJECTS.length - 3 ? 0 : prev + 1
                  )
                }
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-zinc-900 hover:text-white dark:border-white/15 dark:hover:bg-white dark:hover:text-zinc-950"
                aria-label="Next projects"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <PillLink href="/demos/digital-agency/portfolio" variant="ghost" size="md">
                View All Projects
              </PillLink>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {HUDBIRD_PROJECTS.slice(projectSlideIndex, projectSlideIndex + 3).map((proj, idx) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
              >
                <Link
                  to="/demos/digital-agency/case-study-detail"
                  className="group block overflow-hidden rounded-[30px] border border-black/[0.06] bg-[#F4F5F8] p-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-white/10 dark:bg-zinc-900"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-zinc-200 dark:bg-zinc-800">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-zinc-900 backdrop-blur-md dark:bg-zinc-900/90 dark:text-white">
                      {proj.category}
                    </div>
                    <div className="absolute right-3 bottom-3 rounded-full bg-[#7C3AED] px-3 py-1 text-[11px] font-semibold text-white shadow-md">
                      {proj.metric}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 p-4">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900 transition-colors group-hover:text-[#7C3AED] dark:text-white">
                        {proj.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                        {proj.subtitle}
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-white transition-colors group-hover:bg-[#7C3AED] group-hover:text-white dark:border-white/10 dark:bg-white/10">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. Team Portrait Slider + Testimonials Bento + FAQ */}
      <section className="bg-white py-20 sm:py-28 dark:bg-zinc-950">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-xl space-y-3">
              <SectionLabel label="Our Team" />
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Deep expertise focused on solutions built to perform.
              </h2>
            </div>
            <PillLink href="/demos/digital-agency/team" variant="ghost" size="md">
              View All Members
            </PillLink>
          </div>

          <div className="mb-24 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {HUDBIRD_TEAM.map((member) => (
              <Link
                key={member.name}
                to="/demos/digital-agency/team"
                className="group rounded-[26px] border border-black/[0.05] bg-[#F4F5F8] p-2.5 transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-zinc-900"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-[20px] bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-zinc-900 transition-colors dark:text-white">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{member.role}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Client Reviews Bento */}
          <div className="mb-24 grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="flex rounded-[34px] border border-black/[0.06] bg-[#ECEEF4] p-2 lg:col-span-4 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="flex w-full flex-col justify-between rounded-[26px] bg-[#0D0F14] p-8 text-white">
                <div className="space-y-2">
                  <span className="text-xs font-semibold tracking-wider text-[#C8F560] uppercase">
                    Verified Impact
                  </span>
                  <div className="text-5xl font-bold tracking-tight tabular-nums">4.8/5</div>
                  <p className="text-sm text-zinc-300">Real Rating across 243+ client launches</p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-white/15 pt-8">
                  <div>
                    <div className="text-2xl font-bold text-[#C8F560] tabular-nums">+243</div>
                    <div className="text-xs text-zinc-400">Trusted by 20k+ teams</div>
                  </div>
                  <PillLink href="/demos/digital-agency/contact" variant="lime" size="sm">
                    Start Now
                  </PillLink>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-8">
              {HUDBIRD_TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="flex flex-col justify-between space-y-5 rounded-[28px] border border-black/[0.05] bg-[#F4F5F8] p-6 dark:border-white/10 dark:bg-zinc-900"
                >
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    “{t.quote}”
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {t.name}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clean FAQ Accordion */}
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 space-y-3 text-center">
              <SectionLabel label="FAQ" />
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Clarity before you start
              </h2>
            </div>

            <div className="space-y-3">
              {HUDBIRD_FAQS.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={item.q}
                    className="overflow-hidden rounded-2xl border border-black/[0.06] bg-[#F4F5F8] dark:border-white/10 dark:bg-zinc-900"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-sm font-semibold text-zinc-900 sm:text-base dark:text-white"
                    >
                      <span>{item.q}</span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white dark:bg-white/10">
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* 9. Interactive 24+ Multipurpose Pages Directory */}
      <div id="all-pages">
        <AllPagesDirectory nicheSlug={niche.slug} nicheName={niche.name} pages={niche.innerPages} />
      </div>

      {/* 10. Clean HudbirdUI Footer */}
      <SplitTextCtaFooter data={niche.sections.footer} />

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl space-y-4 overflow-hidden rounded-3xl border border-white/15 bg-zinc-950 p-6 text-white"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">
                  HudbirdUI Digital Agency — 2026 Showreel
                </span>
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="cursor-pointer rounded-full bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
                >
                  Close ✕
                </button>
              </div>
              <div className="flex aspect-video flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#4C1D95] via-[#7C3AED] to-[#EC4899] p-8 text-center">
                <Sparkles className="mb-3 h-12 w-12 animate-pulse text-white" />
                <p className="text-2xl font-bold">Interactive 4K Studio Reel Preview</p>
                <p className="mt-2 max-w-md text-sm text-white/80">
                  Featuring GSAP scroll choreography, Lenis smooth inertia, and 24+ multipurpose
                  inner pages.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgencyNicheHome;
