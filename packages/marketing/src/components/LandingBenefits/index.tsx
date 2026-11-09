"use client";
import * as React from "react";
import { Badge, Card, CardBody, Grid, Heading, Text } from "@hudbird/ui";
import { ArrowUpRight } from "lucide-react";
import type { LandingSectionProps } from "@hudbird/schemas";
import { HeroImageView } from "../HeroSection";
import { LandingFrame } from "../LandingShared";

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

  // Duplicate quotes for infinite seamless marquee
  const tickerItems = [...impactQuotes, ...impactQuotes];

  return (
    <LandingFrame id="benefits">
      {/* 1. Header: Clean title with 2 font modes like hero, no description paragraph */}
      <div className="mb-10 sm:mb-14">
        <BenefitTitle title={content.title} />
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
        <Grid cols={3} gap="md">
          {columns.map((col, idx) => (
            <Card
              key={idx}
              variant="bordered"
              radius="lg"
              className="hb-radius group relative overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <img
                  src={col.image}
                  alt={col.title}
                  className="h-full w-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-white/92 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100 dark:bg-zinc-950/90" />
              </div>
              <CardBody className="relative z-10 flex min-h-[340px] flex-col justify-between p-7 sm:p-8">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="modern" size="sm" className="hb-landing-number">
                      0{idx + 1}
                    </Badge>
                  </div>
                  <Heading
                    as="h3"
                    className="mt-4 font-serif text-2xl font-normal text-zinc-900 dark:text-zinc-100"
                  >
                    {col.title}
                  </Heading>
                  <Text className="text-muted-foreground mt-2.5 text-sm leading-relaxed sm:text-base">
                    {col.description}
                  </Text>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {col.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md border border-zinc-200/80 bg-zinc-50/80 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <a
                    href={col.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-950 transition-colors group-hover:text-[var(--hb-accent,var(--primary))] sm:text-sm dark:text-zinc-100"
                  >
                    <span>{`Explore ${col.title}`}</span>
                    <ArrowUpRight className="h-4 w-4 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:rotate-45" />
                  </a>
                </div>
              </CardBody>
            </Card>
          ))}
        </Grid>
      ) : (
        <Grid cols={2} gap="xl" align="center">
          <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 shadow-sm dark:border-white/10">
            <HeroImageView image={content.image} priority={false} />
            <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/20 bg-black/40 p-4 text-white backdrop-blur-md dark:border-white/10">
              <Text className="text-xs font-medium tracking-wider text-white/80 uppercase">
                Verified Outcome
              </Text>
              <Text className="mt-1 text-sm font-semibold sm:text-base">
                Building in-house: 18 months. With Hudbird: 6 weeks.
              </Text>
            </div>
          </div>
          <div className="space-y-6">
            {columns.map((col, idx) => (
              <div
                key={idx}
                className="group rounded-xl border border-zinc-200/80 bg-white/70 p-6 transition-all hover:border-zinc-300 hover:bg-white hover:shadow-xs dark:border-white/10 dark:bg-zinc-900/40 dark:hover:border-white/20 dark:hover:bg-zinc-900/80"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Heading
                      as="h3"
                      className="font-serif text-xl font-normal text-zinc-900 dark:text-zinc-100"
                    >
                      {col.title}
                    </Heading>
                    <Text className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {col.description}
                    </Text>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-400 transition-all duration-300 group-hover:rotate-45 group-hover:text-zinc-950 dark:text-zinc-500 dark:group-hover:text-white" />
                </div>
              </div>
            ))}
          </div>
        </Grid>
      )}
    </LandingFrame>
  );
}
