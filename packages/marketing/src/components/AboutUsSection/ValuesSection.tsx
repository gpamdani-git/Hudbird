"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container, Heading, Section, Text } from "@hudbird/ui";
import { cn } from "../../utils/cn";
import { ABOUT_EASE_OUT, useSafeSectionReveal } from "./shared";
import "./about-us-section.css";

export interface ValueBentoItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
}

export interface ValuesSectionProps {
  id?: string;
  eyebrow?: string;
  brandName?: string;
  title?: string;
  description?: string;
  items?: [ValueBentoItem, ValueBentoItem, ValueBentoItem, ValueBentoItem, ValueBentoItem];
  className?: string;
}

export const DEFAULT_VALUES: [
  ValueBentoItem,
  ValueBentoItem,
  ValueBentoItem,
  ValueBentoItem,
  ValueBentoItem,
] = [
  {
    id: "precision-primitives",
    title: "Precision Primitives",
    description:
      "Accessible, keyboard-ready React components engineered with strict TypeScript contracts.",
    imageSrc:
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Monochrome minimalist software engineering desk with clean monitor setup",
  },
  {
    id: "token-driven-themes",
    title: "Token-Driven Themes",
    description: "Switch palettes, typography, and surface contrast seamlessly across every page.",
    imageSrc:
      "https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=1000",
    imageAlt: "Monochrome minimalist architectural studio interior",
  },
  {
    id: "calibrated-motion",
    title: "Calibrated Motion",
    description:
      "Hardware-accelerated springs and subtle scroll reveals that respect reduced-motion.",
    imageSrc:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1000",
    imageAlt: "Monochrome product engineering collaboration around workspace table",
  },
  {
    id: "composable-sections",
    title: "Composable Sections",
    description: "Mix and match hero, bento, pricing, and editorial blocks without layout drift.",
    imageSrc:
      "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Monochrome modern studio meeting space with clean geometry",
  },
  {
    id: "developer-ergonomics",
    title: "Developer Ergonomics",
    description:
      "Clean JSX exports, predictable props, and zero-boilerplate integration in minutes.",
    imageSrc:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Monochrome engineering workstation with code and minimal desk space",
  },
];

function ChevronDownCircleIcon() {
  return (
    <span
      aria-hidden="true"
      className="hb-value-chevron inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/60 text-white"
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
      >
        <path d="M4.5 6.5 8 10l3.5-3.5" />
      </svg>
    </span>
  );
}

function ValueCard({
  item,
  index,
  revealed,
  reducedMotion,
  className,
}: {
  item: ValueBentoItem;
  index: number;
  revealed: boolean;
  reducedMotion: boolean | null;
  className?: string;
}) {
  return (
    <motion.article
      tabIndex={0}
      data-hb-node="card"
      data-hb-item={index}
      data-hb-edit={`values:items.${index}.imageSrc`}
      data-hb-edit-mode="popover"
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={reducedMotion || revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        duration: 0.44,
        delay: 0.08 + index * 0.045,
        ease: ABOUT_EASE_OUT,
      }}
      className={cn(
        "hb-value-card bg-muted/40 relative overflow-hidden rounded-[20px] select-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-none dark:focus-visible:ring-white",
        className
      )}
    >
      <img
        src={item.imageSrc}
        alt={item.imageAlt ?? item.title}
        loading="lazy"
        className="hb-value-photo h-full w-full object-cover object-center"
      />

      {/* Minimal bottom vignette for legibility at rest */}
      <div
        aria-hidden="true"
        className="hb-value-rest-scrim pointer-events-none absolute inset-0"
      />

      {/* Gradient bg-to-transparent scrim revealed ONLY on card hover / focus */}
      <div
        aria-hidden="true"
        className="hb-value-hover-gradient pointer-events-none absolute inset-0"
      />

      {/* Card foreground label + hover-revealed description */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <h3
            data-hb-node="heading"
            data-hb-item={index}
            data-hb-edit={`values:items.${index}.title`}
            className="hb-value-title pointer-events-auto m-0 text-lg leading-snug font-semibold tracking-[-0.02em] text-white sm:text-[21px]"
          >
            {item.title}
          </h3>
          <ChevronDownCircleIcon />
        </div>

        <div className="hb-value-desc-wrap">
          <div className="hb-value-desc-inner">
            <p
              data-hb-node="text"
              data-hb-item={index}
              data-hb-edit={`values:items.${index}.description`}
              className="hb-value-desc pointer-events-auto pt-2.5 text-xs leading-[1.5] text-white/85 sm:text-[13px]"
            >
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ValuesSection({
  id = "values",
  eyebrow = "Values",
  brandName = "Hudbird",
  title,
  description,
  items = DEFAULT_VALUES,
  className,
}: ValuesSectionProps) {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const revealed = useSafeSectionReveal(sectionRef);
  const prefersReducedMotion = useReducedMotion();

  const resolvedTitle = title ?? `Build Faster Interfaces with ${brandName}`;
  const resolvedDescription =
    description ??
    `${brandName} unites accessible primitives, editorial typography, and token-driven theming into a single modular system—built for teams that care about speed, clarity, and visual craft.`;

  const initialFor = (yOffset: number) =>
    prefersReducedMotion ? false : { opacity: 0, y: yOffset };

  const targetFor = (yOffset: number) =>
    prefersReducedMotion || revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset };

  return (
    <div ref={sectionRef} data-landing-section="values" className="w-full">
      <Section
        id={id}
        spacing="none"
        className={cn(
          "hb-about-us bg-background relative overflow-hidden py-16 sm:py-20 lg:py-24",
          className
        )}
      >
        <Container size="xl">
          <div className="mx-auto w-full max-w-6xl">
            {/* Top Bento: Tall Portrait Card Left + Editorial Header & 2 Cards Right */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-stretch md:gap-5">
              <div className="flex md:col-span-5">
                <ValueCard
                  item={items[0]}
                  index={0}
                  revealed={revealed}
                  reducedMotion={prefersReducedMotion}
                  className="aspect-[4/5] min-h-[360px] w-full flex-1 md:aspect-auto md:min-h-[470px]"
                />
              </div>

              <div className="flex flex-col justify-between md:col-span-7">
                <motion.div
                  initial={initialFor(12)}
                  animate={targetFor(12)}
                  transition={{ duration: 0.42, ease: ABOUT_EASE_OUT }}
                  className="pb-6 md:px-1 md:pb-7"
                >
                  <Text
                    data-hb-node="badge"
                    data-hb-edit="values:eyebrow"
                    className="text-muted-foreground text-xs font-medium tracking-[-0.01em] sm:text-sm"
                  >
                    {eyebrow}
                  </Text>
                  <Heading
                    as="h2"
                    size="inherit"
                    data-hb-node="heading"
                    data-hb-edit="values:title"
                    className="text-foreground mt-2.5 max-w-[18ch] text-3xl leading-[1.12] font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[2.65rem]"
                  >
                    {resolvedTitle}
                  </Heading>
                  <Text
                    data-hb-node="text"
                    data-hb-edit="values:description"
                    className="text-muted-foreground mt-4 max-w-[54ch] text-sm leading-[1.6] font-normal sm:text-[15px]"
                  >
                    {resolvedDescription}
                  </Text>
                </motion.div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <ValueCard
                    item={items[1]}
                    index={1}
                    revealed={revealed}
                    reducedMotion={prefersReducedMotion}
                    className="aspect-[4/3.1]"
                  />
                  <ValueCard
                    item={items[2]}
                    index={2}
                    revealed={revealed}
                    reducedMotion={prefersReducedMotion}
                    className="aspect-[4/3.1]"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Asymmetric Bento Row */}
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-12">
              <div className="md:col-span-5">
                <ValueCard
                  item={items[3]}
                  index={3}
                  revealed={revealed}
                  reducedMotion={prefersReducedMotion}
                  className="aspect-[16/10] sm:aspect-[16/9]"
                />
              </div>
              <div className="md:col-span-7">
                <ValueCard
                  item={items[4]}
                  index={4}
                  revealed={revealed}
                  reducedMotion={prefersReducedMotion}
                  className="aspect-[16/10] sm:aspect-[16/6.6]"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
