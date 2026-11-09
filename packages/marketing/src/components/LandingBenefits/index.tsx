"use client";
import * as React from "react";
import { Badge, Button, Card, CardBody, Grid, Heading, Text } from "@hudbird/ui";
import {
  ArrowUpRight,
  MapPin,
  Calendar,
  Clock,
  Star,
  Heart,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Repeat2,
} from "lucide-react";
import type { LandingSectionProps } from "@hudbird/schemas";
import { HeroImageView } from "../HeroSection";
import { LandingFrame } from "../LandingShared";
import { cn } from "../../utils/cn";

export interface BenefitColumnItem {
  title: string;
  description: string;
  tags: string[];
  image: string;
  href: string;
}

const defaultBenefitColumns: BenefitColumnItem[] = [
  {
    title: "Design Systems",
    description:
      "Transform static tokens and Figma designs into production-ready, accessible UI components.",
    tags: ["Design Tokens", "Figma Sync", "Accessibility", "Tailwind v4"],
    image:
      "https://images.pexels.com/photos/5882678/pexels-photo-5882678.jpeg?auto=compress&cs=tinysrgb&w=1200",
    href: "#features",
  },
  {
    title: "Marketing Engineering",
    description:
      "Turn document-heavy specifications into high-converting landing pages and live interactive sandboxes.",
    tags: ["Page Builder", "Micro-Interactions", "Framer Motion", "Conversion A/B"],
    image:
      "https://images.pexels.com/photos/5951735/pexels-photo-5951735.jpeg?auto=compress&cs=tinysrgb&w=1200",
    href: "#features",
  },
  {
    title: "Enterprise Velocity",
    description:
      "Ship verified, high-performance workflows and durable pages in days instead of months.",
    tags: ["Design System", "Edge Bundles", "Zero Config", "Full-Stack Velocity"],
    image:
      "https://images.pexels.com/photos/7582781/pexels-photo-7582781.jpeg?auto=compress&cs=tinysrgb&w=1200",
    href: "#pricing",
  },
];

const impactQuotes = [
  {
    highlight: "Building this in-house",
    quote: "would've cost us $2M and 18 months. Hudbird had us live in six weeks.",
    author: "Head of AI, Tech-Forward Insurance Brokerage",
  },
  {
    highlight: "Our workflows",
    quote:
      "were live in days, not months. The support is unlike anything we've seen from an enterprise vendor.",
    author: "Alaris Acquisitions",
  },
  {
    highlight: "Eliminated 90%",
    quote:
      "of our custom front-end boilerplate. We shipped our redesign in a single sprint with zero bugs.",
    author: "VP of Product, Forma Labs",
  },
  {
    highlight: "Apple-grade polish",
    quote:
      "straight out of the box. The motion physics and token system saved our engineering team months.",
    author: "Design Director, Monolith Digital",
  },
];

function BenefitTitle({ title }: { title?: string }) {
  const displayTitle = title || "Pick your workflow. See Hudbird at work.";

  if (displayTitle.includes("*")) {
    const parts = displayTitle.split(/(\*[^*]+\*)/g);
    return (
      <Heading
        as="h2"
        className="text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl lg:text-[2.75rem] dark:text-white"
      >
        {parts.map((part, i) => {
          if (part.startsWith("*") && part.endsWith("*")) {
            return (
              <span
                key={i}
                className="[font-family:serif,Georgia,ui-serif] font-serif font-normal text-zinc-900 italic dark:text-zinc-100"
              >
                {part.slice(1, -1)}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </Heading>
    );
  }

  const trimmed = displayTitle.trim();
  const sentences = trimmed.split(/\.\s+/);
  if (sentences.length >= 2) {
    return (
      <Heading
        as="h2"
        className="text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl lg:text-[2.75rem] dark:text-white"
      >
        <span className="mr-2 [font-family:serif,Georgia,ui-serif] font-serif font-normal text-zinc-900 italic dark:text-zinc-100">
          {sentences[0]}.
        </span>
        <span className="font-sans font-semibold tracking-tight text-zinc-900 dark:text-white">
          {sentences.slice(1).join(". ")}
        </span>
      </Heading>
    );
  }

  const words = trimmed.replace(/\.$/, "").split(" ");
  if (words.length > 3) {
    const splitIndex = Math.max(1, words.length - 2);
    const firstPart = words.slice(0, splitIndex).join(" ");
    const secondPart = words.slice(splitIndex).join(" ");
    return (
      <Heading
        as="h2"
        className="text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl lg:text-[2.75rem] dark:text-white"
      >
        <span className="mr-2 [font-family:serif,Georgia,ui-serif] font-serif font-normal text-zinc-900 italic dark:text-zinc-100">
          {firstPart}
        </span>
        <span className="font-sans font-semibold tracking-tight text-zinc-900 dark:text-white">
          {secondPart}.
        </span>
      </Heading>
    );
  }

  return (
    <Heading
      as="h2"
      className="text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl lg:text-[2.75rem] dark:text-white"
    >
      <span className="[font-family:serif,Georgia,ui-serif] font-serif font-normal text-zinc-900 italic dark:text-zinc-100">
        {displayTitle}
      </span>
    </Heading>
  );
}

export function LandingBenefits({ variant, content }: LandingSectionProps<"benefits">) {
  const [activeRole, setActiveRole] = React.useState<"hirer" | "talent">("hirer");
  const [activeVisualIdx, setActiveVisualIdx] = React.useState<number>(0);

  const columns: BenefitColumnItem[] = defaultBenefitColumns.map((def, idx) => {
    const item = content?.items?.[idx];
    return {
      title: item?.title || def.title,
      description: item?.description || def.description,
      tags: def.tags,
      image: def.image,
      href: def.href,
    };
  });

  // Duplicate quotes 4x for continuous seamless rightward gliding
  const tickerItems = [...impactQuotes, ...impactQuotes, ...impactQuotes, ...impactQuotes];

  return (
    <LandingFrame id="benefits">
      {/* 1. Header: Clean title with 2 font modes like hero, without description text */}
      <div className="mb-10 sm:mb-14">
        {variant === "cards" ? (
          <div className="text-center">
            <BenefitTitle
              title={content.title || "We've done the *hard part*, now *it's* your turn to create"}
            />
            <Text className="mx-auto mt-3 max-w-xl text-sm font-normal text-zinc-500 sm:text-base dark:text-zinc-400">
              {content.description ||
                "Whether you're looking for work or finding talent, everything is designed to flow effortlessly."}
            </Text>
            {/* Interactive Segmented Pill Switch */}
            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center rounded-full border border-zinc-200/80 bg-zinc-100/90 p-1 shadow-2xs backdrop-blur-xs dark:border-white/10 dark:bg-zinc-800/80">
                <Button
                  size="sm"
                  variant="plain"
                  onClick={() => setActiveRole("hirer")}
                  className={cn(
                    "h-8 rounded-full px-5 text-xs font-semibold transition-all duration-300",
                    activeRole === "hirer"
                      ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  )}
                >
                  Hirer
                </Button>
                <Button
                  size="sm"
                  variant="plain"
                  onClick={() => setActiveRole("talent")}
                  className={cn(
                    "h-8 rounded-full px-5 text-xs font-semibold transition-all duration-300",
                    activeRole === "talent"
                      ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  )}
                >
                  Talent
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <BenefitTitle title={content.title} />
        )}
      </div>

      {/* 2. Main content based on variant */}
      {variant === "columns" ? (
        <>
          {/* 3-Column Luxury Container matching image reference */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-2xs dark:border-white/10 dark:bg-[#14151a]">
            <div className="flex flex-col divide-y divide-zinc-200/90 md:flex-row md:divide-x md:divide-y-0 dark:divide-white/10 [&>*]:flex-1">
              {columns.map((col, idx) => (
                <div
                  key={idx}
                  className="group relative flex min-h-[400px] cursor-pointer flex-col justify-between overflow-hidden p-7 sm:min-h-[440px] sm:p-8 lg:p-10"
                >
                  {/* Background image: smooth hover fade-in & scale */}
                  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={col.image}
                      alt={col.title}
                      className="h-full w-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-white/90 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100 dark:bg-zinc-950/88" />
                  </div>

                  {/* Relative content */}
                  <div className="relative z-10 flex min-w-0 flex-col">
                    <Heading
                      as="h3"
                      className="[font-family:serif,Georgia,ui-serif] font-serif text-2xl font-normal tracking-tight text-zinc-950 transition-colors sm:text-[1.75rem] dark:text-white"
                    >
                      {col.title}
                    </Heading>
                    <Text className="mt-3.5 text-sm leading-relaxed font-normal text-zinc-600 transition-colors group-hover:text-zinc-900 sm:text-base dark:text-zinc-300 dark:group-hover:text-white">
                      {col.description}
                    </Text>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {col.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-md border border-zinc-200/80 bg-zinc-50/80 px-2.5 py-1 text-xs font-medium text-zinc-700 shadow-2xs backdrop-blur-xs transition-colors group-hover:border-zinc-300 group-hover:bg-white/95 dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-300 dark:group-hover:border-white/20 dark:group-hover:bg-zinc-900/90"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 mt-10 sm:mt-14">
                    <a
                      href={col.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-tight text-zinc-950 transition-colors group-hover:text-[var(--hb-accent,var(--primary))] sm:text-sm dark:text-white"
                    >
                      <span>{`Explore ${col.title}`}</span>
                      <ArrowUpRight className="h-4 w-4 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:rotate-45" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Enterprise impact quote ticker (Shopify-style rightwards smooth gliding with decelerate on hover) */}
          <div className="mt-16 sm:mt-20">
            <div
              className="hb-benefit-ticker-wrapper group/ticker relative overflow-hidden py-4"
              aria-label="Enterprise customer impact"
            >
              {/* Fade masks */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--hb-bg,#ffffff)] to-transparent sm:w-28" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--hb-bg,#ffffff)] to-transparent sm:w-28" />

              <div className="hb-benefit-ticker flex gap-10 sm:gap-14">
                {tickerItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex w-[320px] shrink-0 flex-col justify-between sm:w-[460px] lg:w-[520px]"
                  >
                    <Text className="text-base leading-relaxed font-medium tracking-tight text-zinc-900 sm:text-lg lg:text-xl dark:text-zinc-100">
                      <span className="mr-1.5 font-serif font-normal text-zinc-400 italic dark:text-zinc-500">
                        {item.highlight}
                      </span>
                      <span className="text-zinc-800 dark:text-zinc-200">{item.quote}</span>
                    </Text>
                    <Text className="mt-3.5 text-xs font-medium text-zinc-400 sm:text-sm dark:text-zinc-500">
                      {item.author}
                    </Text>
                  </div>
                ))}
              </div>
            </div>

            {/* Luxury pill indicator at the bottom */}
            <div className="mt-8 flex justify-center">
              <div className="h-1.5 w-12 rounded-full bg-zinc-300 transition-all hover:w-16 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600" />
            </div>
          </div>
        </>
      ) : variant === "cards" ? (
        /* 2x2 Showcase Card Grid (Faithful to uploaded reference images 1 & 2) */
        <Grid cols={2} gap="lg">
          {/* Card 1: Create project with iPhone mockup and floating metadata card */}
          <div className="group relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-[28px] border border-zinc-200/80 bg-zinc-50/70 p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.02]">
            <div>
              <Heading
                as="h3"
                className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white"
              >
                Create project
              </Heading>
              <Text className="mt-1 text-sm font-normal text-zinc-500 dark:text-zinc-400">
                Add requirements, upload references.
              </Text>
            </div>

            <div className="relative mt-8 flex justify-center pt-4">
              {/* Phone Mockup Frame */}
              <div className="relative w-[230px] rounded-t-[32px] border-4 border-b-0 border-zinc-900 bg-white px-3 pt-2.5 pb-10 shadow-2xl sm:w-[250px] dark:border-zinc-700 dark:bg-zinc-900">
                <div className="flex items-center justify-between pb-2 text-[10px] font-semibold text-zinc-900 dark:text-white">
                  <span>9:41</span>
                  <div className="h-3 w-14 rounded-full bg-zinc-900 dark:bg-white/20" />
                  <span>5G</span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2 dark:border-white/[0.08]">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-white">
                    Create Project
                  </span>
                  <span className="text-xs text-zinc-400">✕</span>
                </div>
                <div className="mt-2.5">
                  <div className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                    References (4)
                  </div>
                  <div className="mt-1.5 overflow-hidden rounded-xl">
                    <img
                      src="https://images.pexels.com/photos/5882678/pexels-photo-5882678.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Reference"
                      className="h-28 w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Overlapping Floating Metadata Card */}
              <div className="absolute bottom-2 left-0 z-10 w-[210px] rounded-2xl border border-zinc-200/90 bg-white/95 p-3 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.16)] backdrop-blur-md sm:left-2 sm:w-[230px] dark:border-white/10 dark:bg-zinc-900/95">
                <div className="divide-y divide-zinc-100 text-xs dark:divide-white/[0.08]">
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                      <div>
                        <div className="font-semibold text-zinc-900 dark:text-white">Austin</div>
                        <div className="text-[10px] text-zinc-400">TX, USA</div>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                      <span className="font-medium text-zinc-800 dark:text-zinc-200">
                        Sunday, 28 Mar
                      </span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-white">
                      <Clock className="h-3.5 w-3.5 text-amber-500" />
                      <span>Expires in 3 days</span>
                    </div>
                    <div className="mt-0.5 text-[9px] leading-tight text-zinc-500 dark:text-zinc-400">
                      Close applications 3 days before start
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Hire talent with photographer card & price bubble */}
          <div className="group relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-[28px] border border-purple-200/60 bg-purple-50/50 p-6 sm:p-8 dark:border-purple-500/20 dark:bg-purple-950/20">
            <div>
              <Heading
                as="h3"
                className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white"
              >
                Hire talent
              </Heading>
              <Text className="mt-1 text-sm font-normal text-zinc-500 dark:text-zinc-400">
                Choose talent and collaborate.
              </Text>
            </div>

            <div className="relative mt-8 flex justify-center pt-2">
              <div className="w-full max-w-[320px] rounded-2xl border border-zinc-200/80 bg-white/95 p-4 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/95">
                {/* Talent Header */}
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.pexels.com/photos/7582781/pexels-photo-7582781.jpeg?auto=compress&cs=tinysrgb&w=200"
                    alt="James Smith"
                    className="h-9 w-9 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-white/15"
                  />
                  <div>
                    <div className="text-xs font-semibold text-zinc-900 dark:text-white">
                      James Smith
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-zinc-500 dark:text-zinc-400">
                      <span className="font-semibold text-amber-500">5.0★</span>
                      <span>• Photographer</span>
                    </div>
                  </div>
                </div>

                {/* 3 Photos Grid */}
                <div className="mt-3 flex gap-2 overflow-hidden rounded-xl">
                  <img
                    src="https://images.pexels.com/photos/5951735/pexels-photo-5951735.jpeg?auto=compress&cs=tinysrgb&w=300"
                    alt="Work 1"
                    className="h-28 w-1/3 rounded-lg object-cover"
                  />
                  <img
                    src="https://images.pexels.com/photos/7582781/pexels-photo-7582781.jpeg?auto=compress&cs=tinysrgb&w=300"
                    alt="Work 2"
                    className="h-28 w-1/3 rounded-lg object-cover"
                  />
                  <img
                    src="https://images.pexels.com/photos/5882678/pexels-photo-5882678.jpeg?auto=compress&cs=tinysrgb&w=300"
                    alt="Work 3"
                    className="h-28 w-1/3 rounded-lg object-cover"
                  />
                </div>

                {/* Offer Chat Bubble */}
                <div className="mt-3.5 flex items-center justify-between rounded-xl bg-zinc-100/80 px-3 py-2 text-xs dark:bg-white/[0.06]">
                  <span className="truncate text-zinc-700 dark:text-zinc-300">
                    Hi, I can give you 15 edited images
                  </span>
                  <span className="ml-2 shrink-0 rounded-full bg-emerald-500/10 px-2 py-0.5 font-bold text-emerald-600 dark:text-emerald-400">
                    $220
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Communication with iPhone inbox & floating DM bubble */}
          <div className="group relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-[28px] border border-emerald-200/60 bg-emerald-50/50 p-6 sm:p-8 dark:border-emerald-500/20 dark:bg-emerald-950/20">
            <div>
              <Heading
                as="h3"
                className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white"
              >
                Communication
              </Heading>
              <Text className="mt-1 text-sm font-normal text-zinc-500 dark:text-zinc-400">
                All DMs are finally in one app.
              </Text>
            </div>

            <div className="relative mt-8 flex justify-center pt-4">
              {/* Phone Mockup Frame */}
              <div className="relative w-[230px] rounded-t-[32px] border-4 border-b-0 border-zinc-900 bg-white px-3 pt-2.5 pb-14 shadow-2xl sm:w-[250px] dark:border-zinc-700 dark:bg-zinc-900">
                <div className="flex items-center justify-between pb-2 text-[10px] font-semibold text-zinc-900 dark:text-white">
                  <span>9:41</span>
                  <div className="h-3 w-14 rounded-full bg-zinc-900 dark:bg-white/20" />
                  <span>5G</span>
                </div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white">Inbox</div>
                <div className="mt-2 flex gap-1.5 text-[10px]">
                  <span className="rounded-full bg-zinc-900 px-2.5 py-0.5 text-white dark:bg-white dark:text-zinc-900">
                    Active
                  </span>
                  <span className="rounded-full px-2 py-0.5 text-zinc-500">Completed</span>
                  <span className="rounded-full px-2 py-0.5 text-zinc-500">Archive</span>
                </div>
              </div>

              {/* Floating DM Notification Bubble */}
              <div className="absolute bottom-4 left-0 z-10 w-[240px] rounded-2xl border border-zinc-200/90 bg-white/95 p-3 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.16)] backdrop-blur-md sm:left-2 sm:w-[260px] dark:border-white/10 dark:bg-zinc-900/95">
                <div className="flex items-start gap-2.5">
                  <img
                    src="https://images.pexels.com/photos/7582781/pexels-photo-7582781.jpeg?auto=compress&cs=tinysrgb&w=200"
                    alt="James Smith"
                    className="h-8 w-8 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-white/15"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-900 dark:text-white">
                        James Smith
                      </span>
                      <span className="text-[9px] text-zinc-400">09:00 AM</span>
                    </div>
                    <p className="mt-0.5 truncate text-[10px] text-zinc-600 dark:text-zinc-300">
                      Portrait Photo Shoot • I can arrive at 8 am
                    </p>
                  </div>
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-purple-600 text-[9px] font-bold text-white">
                    1
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Freely trust with rating review card and like heart pill */}
          <div className="group relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-[28px] border border-zinc-200/80 bg-zinc-50/70 p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.02]">
            <div>
              <Heading
                as="h3"
                className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white"
              >
                Freely trust
              </Heading>
              <Text className="mt-1 text-sm font-normal text-zinc-500 dark:text-zinc-400">
                Choose talent on rating and reviews.
              </Text>
            </div>

            <div className="relative mt-8 flex justify-center pt-4">
              {/* Phone Mockup Frame */}
              <div className="relative w-[230px] rounded-t-[32px] border-4 border-b-0 border-zinc-900 bg-white px-3 pt-2.5 pb-16 shadow-2xl sm:w-[250px] dark:border-zinc-700 dark:bg-zinc-900">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src="https://images.pexels.com/photos/5951735/pexels-photo-5951735.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Photo Shoot"
                    className="h-24 w-full object-cover"
                  />
                </div>
                <div className="mt-2 text-xs font-semibold text-zinc-900 dark:text-white">
                  Portrait photo shoot
                </div>
                <div className="text-[10px] text-zinc-400">28 Mar</div>
                <div className="mt-1 flex items-center gap-3 text-[10px] text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" /> 123
                  </span>
                  <span className="flex items-center gap-1">
                    <Repeat2 className="h-3 w-3" /> 13
                  </span>
                </div>
              </div>

              {/* Overlapping Floating Review Card */}
              <div className="absolute bottom-4 left-0 z-10 w-[230px] rounded-2xl border border-zinc-200/90 bg-white/95 p-3 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.16)] backdrop-blur-md sm:left-2 sm:w-[250px] dark:border-white/10 dark:bg-zinc-900/95">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </div>
                <p className="my-1.5 line-clamp-2 text-[10px] leading-snug font-medium text-zinc-700 italic dark:text-zinc-200">
                  &ldquo;Loved working together — the photos turned out even better than
                  expected!&rdquo;
                </p>
                <div className="flex items-center gap-2 border-t border-zinc-100 pt-1.5 dark:border-white/[0.08]">
                  <img
                    src="https://images.pexels.com/photos/5951735/pexels-photo-5951735.jpeg?auto=compress&cs=tinysrgb&w=200"
                    alt="Linda White"
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[10px] font-semibold text-zinc-900 dark:text-white">
                      Linda White
                    </div>
                    <div className="text-[9px] text-zinc-400">5.0★ • Photographer</div>
                  </div>
                </div>
              </div>

              {/* Reaction Pill Chip */}
              <div className="absolute right-0 bottom-1 z-20 flex items-center gap-1 rounded-full bg-rose-500/15 px-2.5 py-1 text-[11px] font-bold text-rose-600 shadow-sm sm:right-2 dark:bg-rose-400/20 dark:text-rose-400">
                <span>❤️</span>
                <span>123</span>
              </div>
            </div>
          </div>
        </Grid>
      ) : (
        /* Asymmetrical Visual List with Device Mockup Preview & Interactive Stack */
        <Grid cols={2} gap="xl" align="center">
          {/* Left Column: Device Mockup Interactive Showcase */}
          <div className="group relative overflow-hidden rounded-[28px] border border-zinc-200/80 bg-zinc-50/80 p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-zinc-900/40">
            <div className="relative mx-auto w-full max-w-[340px] overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-zinc-950">
              <img
                src={columns[activeVisualIdx]?.image || columns[0].image}
                alt={columns[activeVisualIdx]?.title || "Showcase"}
                className="aspect-[4/3] w-full rounded-xl object-cover transition-all duration-500"
              />
              <div className="p-3">
                <Badge variant="modern" size="sm">
                  {`0${activeVisualIdx + 1} / 03`}
                </Badge>
                <Heading as="h4" className="mt-2 text-base font-bold text-zinc-900 dark:text-white">
                  {columns[activeVisualIdx]?.title}
                </Heading>
                <Text className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Interactive production workflow preview for {columns[activeVisualIdx]?.title}.
                </Text>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive List Rows */}
          <div className="space-y-4">
            {columns.map((col, idx) => {
              const isActive = idx === activeVisualIdx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveVisualIdx(idx)}
                  onClick={() => setActiveVisualIdx(idx)}
                  className={cn(
                    "group cursor-pointer rounded-2xl border p-5 transition-all duration-300 sm:p-6",
                    isActive
                      ? "border-zinc-300 bg-white shadow-md dark:border-white/20 dark:bg-zinc-900/90"
                      : "border-zinc-200/80 bg-white/60 hover:border-zinc-300 hover:bg-white dark:border-white/10 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/70"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500">
                          0{idx + 1}
                        </span>
                        <Heading
                          as="h3"
                          className="font-serif text-lg font-normal text-zinc-900 sm:text-xl dark:text-zinc-100"
                        >
                          {col.title}
                        </Heading>
                      </div>
                      <Text className="mt-2 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                        {col.description}
                      </Text>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {col.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-md border border-zinc-200/80 bg-zinc-50/80 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-1">
                      <ArrowUpRight
                        className={cn(
                          "h-5 w-5 shrink-0 transition-all duration-300",
                          isActive
                            ? "rotate-45 text-zinc-950 dark:text-white"
                            : "text-zinc-400 group-hover:rotate-45 group-hover:text-zinc-950 dark:text-zinc-500 dark:group-hover:text-white"
                        )}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Grid>
      )}
    </LandingFrame>
  );
}
