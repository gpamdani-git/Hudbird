"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Badge, Container, Heading, Section, Text } from "@hudbird/ui";
import { cn } from "../../utils/cn";
import { ABOUT_EASE_OUT, useSafeSectionReveal } from "./shared";
import "./about-us-section.css";

export interface WhoAreWeStat {
  id: string;
  value: string;
  label: string;
}

export interface WhoAreWeSectionProps {
  id?: string;
  badgeLabel?: string;
  title?: string;
  description?: string;
  stats?: WhoAreWeStat[];
  className?: string;
}

const EASE_OUT = ABOUT_EASE_OUT;

const DEFAULT_STATS: WhoAreWeStat[] = [
  { id: "components", value: "120+", label: "Production UI primitives" },
  { id: "sections", value: "40+", label: "Composable page sections" },
  { id: "accessibility", value: "100%", label: "WCAG AA token contrast" },
  { id: "themes", value: "24+", label: "Built-in brand presets" },
];

function StairsStepIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2.5 12.5h3v-3h3v-3h3v-3h2" />
    </svg>
  );
}

function AnimatedStatValue({
  value,
  active,
  reducedMotion,
}: {
  value: string;
  active: boolean;
  reducedMotion: boolean;
}) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number.parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [displayNumber, setDisplayNumber] = React.useState<number | null>(target);

  React.useEffect(() => {
    if (target === null || reducedMotion || !active) {
      setDisplayNumber(target);
      return;
    }

    const startVal = Math.max(0, Math.floor(target * 0.72));
    const duration = 560;
    const startTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(startVal + (target - startVal) * eased);
      setDisplayNumber(next);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, reducedMotion, target]);

  if (target === null || displayNumber === null) {
    return <>{value}</>;
  }

  return (
    <>
      {displayNumber}
      {suffix}
    </>
  );
}

export function WhoAreWeSection({
  id = "who-are-we",
  badgeLabel = "Who Are We",
  title = "Modular UI Architecture Built for Scale",
  description = "Hudbird UI is a modern design system and multi-page React builder crafted for product teams and frontend engineers. We combine accessible core primitives, calibrated motion physics, and token-driven theming so you can ship cohesive interfaces faster.",
  stats = DEFAULT_STATS,
  className,
}: WhoAreWeSectionProps) {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const isVisible = useSafeSectionReveal(sectionRef);

  const initialFor = (y: number) => (shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y });
  const targetFor = (y: number) =>
    isVisible ? (shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }) : initialFor(y);

  const statDelays = [0.12, 0.165, 0.2, 0.23];

  return (
    <Section
      id={id}
      data-landing-section="who-are-we"
      spacing="lg"
      className={cn("hb-about-us bg-background text-foreground", className)}
    >
      <Container size="xl" gutter="lg">
        <div ref={sectionRef}>
          {/* Top Pill Badge */}
          <motion.div
            initial={initialFor(10)}
            animate={targetFor(10)}
            transition={{ duration: 0.36, delay: 0, ease: EASE_OUT }}
            className="mb-5 sm:mb-6"
          >
            <Badge
              variant="modern"
              size="md"
              data-hb-node="badge"
              data-hb-edit="who-are-we:badgeLabel"
              className="gap-2 px-3.5 py-1.5 text-xs font-medium"
            >
              <StairsStepIcon className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
              <span data-hb-edit-text="">{badgeLabel}</span>
            </Badge>
          </motion.div>

          {/* Split Editorial Heading + Narrative Paragraph */}
          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-10 lg:gap-12">
            <motion.div
              initial={initialFor(14)}
              animate={targetFor(14)}
              transition={{ duration: 0.42, delay: 0.05, ease: EASE_OUT }}
              className="md:col-span-5"
            >
              <Heading
                as="h2"
                size="inherit"
                data-hb-node="heading"
                data-hb-edit="who-are-we:title"
                className="text-foreground max-w-[16ch] text-3xl leading-[1.12] font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem]"
              >
                {title}
              </Heading>
            </motion.div>

            <motion.div
              initial={initialFor(14)}
              animate={targetFor(14)}
              transition={{ duration: 0.44, delay: 0.09, ease: EASE_OUT }}
              className="md:col-span-6 md:col-start-7"
            >
              <Text
                data-hb-node="text"
                data-hb-edit="who-are-we:description"
                className="text-muted-foreground max-w-[56ch] text-base leading-[1.65] font-normal sm:text-[17px]"
              >
                {description}
              </Text>
            </motion.div>
          </div>

          {/* Four-Column Borderless Editorial Metrics */}
          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 sm:mt-16 md:grid-cols-4 lg:mt-20 lg:gap-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={initialFor(12)}
                animate={targetFor(12)}
                transition={{
                  duration: 0.38,
                  delay: statDelays[index] ?? 0.12 + index * 0.035,
                  ease: EASE_OUT,
                }}
                className="min-w-0"
              >
                <div className="text-foreground text-4xl leading-none font-normal tracking-[-0.03em] tabular-nums sm:text-5xl lg:text-[3.5rem]">
                  <AnimatedStatValue
                    value={stat.value}
                    active={isVisible}
                    reducedMotion={shouldReduceMotion}
                  />
                </div>
                <Text className="text-muted-foreground mt-3 text-sm font-normal sm:text-[15px]">
                  {stat.label}
                </Text>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
