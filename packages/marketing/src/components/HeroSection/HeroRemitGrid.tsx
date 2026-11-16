"use client";
import * as React from "react";
import { Section, Container, Heading, Text, Button } from "@hudbird/ui";
import { ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { HeroContent, HeroRemitGridConfig } from "@hudbird/schemas";
import {
  renderInlineFormattedText,
  useLandingAppearance,
  useLandingNavigation,
} from "../LandingShared";
import { cn } from "../../utils/cn";
import "./hero-remit-grid.css";

export interface HeroRemitGridProps extends Omit<React.HTMLAttributes<HTMLElement>, "content"> {
  content: HeroContent;
  config: HeroRemitGridConfig;
  headingLevel?: "h1" | "h2" | "h3";
}

// Morphing Arrow Micro-Interaction:
// Default: rotated -45deg (pointing up-right).
// On Hover: springs smoothly to 0deg (pointing straight right) with slight translation.
function MorphingArrow({
  isHovered = false,
  className,
}: {
  isHovered?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      className={cn(
        "hb-remit-accent-text inline-flex shrink-0 items-center justify-center",
        className
      )}
      animate={
        reduceMotion
          ? undefined
          : {
              rotate: isHovered ? 0 : -45,
              x: isHovered ? 4 : 0,
            }
      }
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
      aria-hidden="true"
    >
      <ArrowRight className="h-4 w-4" />
    </motion.span>
  );
}

function renderRemitTitle(title: string) {
  if (!title) return "Invoices that chase themselves.";
  if (title.includes("*")) {
    return renderInlineFormattedText(title);
  }
  if (title.toLowerCase().includes("chase themselves")) {
    const idx = title.toLowerCase().indexOf("chase themselves");
    const prefix = title.slice(0, idx);
    const suffix = title.slice(idx);
    return (
      <>
        {prefix}
        <br />
        <span className="hb-remit-accent-text">{suffix}</span>
      </>
    );
  }
  const words = title.split(" ");
  if (words.length <= 2) return title;
  const mid = Math.ceil(words.length / 2);
  const firstHalf = words.slice(0, mid).join(" ");
  const secondHalf = words.slice(mid).join(" ");
  return (
    <>
      {firstHalf} <br />
      <span className="hb-remit-accent-text">{secondHalf}</span>
    </>
  );
}

// Interactive Hover Card Wrapper with Pexels Background Reveal + Backdrop Blur
function InteractiveRemitCard({
  children,
  imageSrc,
  className,
  onHoverChange,
  dataHbNode,
  dataHbItem,
}: {
  children: React.ReactNode;
  imageSrc?: string;
  className?: string;
  onHoverChange?: (hovered: boolean) => void;
  dataHbNode?: string;
  dataHbItem?: number;
}) {
  const [hovered, setHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    onHoverChange?.(false);
  };

  return (
    <div
      data-hb-node={dataHbNode}
      data-hb-item={dataHbItem}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => handleMouseEnter()}
      onBlur={() => handleMouseLeave()}
      className={cn(
        "hb-remit-card group relative flex flex-col justify-between overflow-hidden p-6 shadow-xs sm:p-7",
        className
      )}
    >
      {/* Pexels Hover Background Image with Blur Scrim */}
      {imageSrc && (
        <div className="hb-remit-hover-media" aria-hidden="true">
          <img
            src={imageSrc}
            alt=""
            className="h-full w-full object-cover object-center brightness-95 contrast-110 filter dark:brightness-60"
            loading="lazy"
          />
          <div className="hb-remit-scrim-blur" />
          <div className="from-background via-background/60 absolute inset-0 bg-gradient-to-t to-transparent" />
        </div>
      )}

      {/* Content Layer (always on top of image and blur) */}
      <div className="relative z-2 flex h-full flex-col justify-between">{children}</div>
    </div>
  );
}

export function HeroRemitGrid({
  content,
  config,
  headingLevel = "h1",
  id,
  className,
  ...props
}: HeroRemitGridProps) {
  const reduceMotion = useReducedMotion();

  // Hover states for arrow morphing
  const [hoverRowRight, setHoverRowRight] = React.useState(false);
  const [hoverMetric1, setHoverMetric1] = React.useState(false);
  const [hoverMetric2, setHoverMetric2] = React.useState(false);
  const [hoverMetric3, setHoverMetric3] = React.useState(false);

  // Content fallbacks matching image reference and theme tokens
  const badgeText = config.badgeText ?? "New · automatic reminders";
  const statLabel = config.statLabel ?? "PAID THIS MONTH";
  const statValue = config.statValue ?? "$24,800";
  const chartBars = config.chartBars ?? [38, 55, 46, 75, 62, 100];
  const invoiceList = config.invoiceList ?? [
    { name: "Northwind", status: "Paid", isPaid: true },
    { name: "Studio Park", status: "Due in 3d", isPaid: false },
    { name: "Acme Co.", status: "Paid", isPaid: true },
  ];
  const floatingReminder = config.floatingReminder ?? {
    tag: "REMINDER SENT",
    title: "Invoice #1042 paid in 2 days",
    badge: "On time",
  };

  const metricCards = config.metricCards ?? [
    {
      title: "2 days",
      description: "average time to get paid",
      footerText: "Original concept, not client work Shubhank Agrey",
      footerHref: "#concept",
      imageSrc:
        "https://images.pexels.com/photos/5882678/pexels-photo-5882678.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Auto",
      description: "friendly reminders on late invoices",
      footerText: "friendly reminders on late invoices",
      footerHref: "#reminders",
      imageSrc:
        "https://images.pexels.com/photos/5951735/pexels-photo-5951735.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "1 click",
      description: "pay links for every client",
      footerText: "pay links for every client",
      footerHref: "#paylinks",
      imageSrc:
        "https://images.pexels.com/photos/7582781/pexels-photo-7582781.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  const credit = config.credit ?? {
    label: "Original concept, not client work · Shubhank Agrey",
  };
  const appearance = useLandingAppearance();
  const { hrefFor } = useLandingNavigation();
  const headingCfg = appearance?.heading;
  const textCfg = appearance?.text;
  const primaryCfg = appearance?.button;
  const secondaryCfg = appearance?.secondaryButton;

  return (
    <Section
      id={id}
      spacing="none"
      data-hero-variant="remit-grid"
      className={cn("hb-section hb-remit-hero", className)}
      {...props}
    >
      {/* Subtle Atmospheric Ambient Glow colored by theme's primary token */}
      <div
        className="hb-remit-ambient-glow pointer-events-none absolute top-0 right-0 z-0 h-[550px] w-[550px]"
        style={{ position: "absolute" }}
        aria-hidden="true"
      />

      <Container
        size="xl"
        gutter="lg"
        className="relative flex flex-col gap-7 pt-1 sm:gap-9 sm:pt-2 lg:gap-11"
      >
        {/* MAIN HERO SECTION: 2 COLUMNS (1fr 1fr) — EDITORIAL PITCH & LIVE DASHBOARD CHASSIS */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column: Eyebrow Badge, Main Heading, Subtitle & Action Buttons */}
          <div className="flex flex-col justify-center">
            {/* Pill Badge */}
            <div className="mb-3.5 flex items-center sm:mb-4">
              <div
                data-hb-node="badge"
                data-hb-edit="hero:eyebrow"
                className="border-border bg-card/80 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium shadow-xs"
              >
                <span
                  className="hb-remit-accent-bg h-2 w-2 rounded-full shadow-[0_0_8px_var(--hb-remit-accent)]"
                  aria-hidden="true"
                />
                <span data-hb-edit-text="">{badgeText}</span>
              </div>
            </div>

            {/* Main Editorial Headline */}
            <Heading
              as={headingLevel}
              size={headingCfg?.size}
              tracking={headingCfg?.tracking}
              color={headingCfg?.color}
              withDivider={headingCfg?.withDivider}
              data-hb-node="heading"
              data-hb-edit="hero:title"
              className={cn(
                !headingCfg?.size &&
                  "text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl lg:text-6xl",
                !headingCfg?.color && "text-foreground"
              )}
            >
              {renderRemitTitle(content.title)}
            </Heading>

            {/* Sub-text description */}
            <Text
              variant={textCfg?.variant}
              weight={textCfg?.weight}
              align={textCfg?.align}
              data-hb-node="text"
              data-hb-edit="hero:description"
              className="text-muted-foreground mt-5 max-w-[48ch] text-base leading-relaxed sm:text-lg"
            >
              {content.description}
            </Text>

            {/* Action Buttons Row */}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
              <Button
                href={hrefFor(content.primaryAction.href)}
                variant={primaryCfg?.variant ?? "solid"}
                color={primaryCfg?.color ?? "primary"}
                size={primaryCfg?.size ?? "lg"}
                radius={primaryCfg?.radius}
                data-hb-node="primary-button"
                data-hb-edit="hero:primaryAction.label"
                className={cn(
                  !primaryCfg?.radius && "hb-radius rounded-full",
                  "px-7 text-base font-semibold shadow-sm"
                )}
              >
                <span data-hb-edit-text="">{content.primaryAction.label}</span>
              </Button>
              {content.secondaryAction && (
                <Button
                  href={hrefFor(content.secondaryAction.href)}
                  variant={secondaryCfg?.variant ?? "outline"}
                  color={secondaryCfg?.color}
                  size={secondaryCfg?.size ?? "lg"}
                  radius={secondaryCfg?.radius}
                  data-hb-node="secondary-button"
                  data-hb-edit="hero:secondaryAction.label"
                  className={cn(
                    !secondaryCfg?.radius && "hb-radius rounded-full",
                    !secondaryCfg?.variant &&
                      !secondaryCfg?.color &&
                      "border-border bg-card/70 text-foreground hover:bg-card",
                    "px-6 text-base font-medium"
                  )}
                >
                  <span data-hb-edit-text="">{content.secondaryAction.label}</span>
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: Live Dashboard Card with Bar Chart, Status Table & Floating Accent Badge */}
          <div className="relative" data-hb-node="media">
            <InteractiveRemitCard
              dataHbNode="card"
              imageSrc={
                config.backdropSrc ||
                "https://images.pexels.com/photos/5882678/pexels-photo-5882678.jpeg?auto=compress&cs=tinysrgb&w=800"
              }
              onHoverChange={setHoverRowRight}
              className="p-7 sm:p-8"
            >
              <div>
                {/* Metric Header & Number */}
                <div className="flex items-center justify-between">
                  <span
                    data-hb-node="text"
                    data-hb-edit="hero:statLabel"
                    className="text-muted-foreground text-xs font-bold tracking-wider uppercase"
                  >
                    {statLabel}
                  </span>
                  <MorphingArrow isHovered={hoverRowRight} />
                </div>
                <div
                  data-hb-node="heading"
                  data-hb-edit="hero:statValue"
                  className="text-foreground mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl"
                >
                  {statValue}
                </div>

                {/* Micro Bar Chart */}
                <div className="mt-6 flex h-14 items-end gap-2.5 sm:h-16 sm:gap-3">
                  {chartBars.map((heightPercent, idx) => {
                    const isLast = idx === chartBars.length - 1;
                    return (
                      <div
                        key={idx}
                        className={cn("hb-remit-bar flex-1", isLast && "is-active")}
                        style={{ height: `${heightPercent}%` }}
                        aria-hidden="true"
                      />
                    );
                  })}
                </div>

                {/* Invoice Status Rows */}
                <div
                  data-hb-node="items"
                  className="divide-border/60 border-border mt-7 flex flex-col divide-y border-t pt-4"
                >
                  {invoiceList.map((item, idx) => (
                    <div
                      key={idx}
                      data-hb-item={idx}
                      className="flex items-center justify-between py-2.5 text-sm"
                    >
                      <span
                        data-hb-node="text"
                        data-hb-item={idx}
                        data-hb-edit={`hero:invoiceList.${idx}.name`}
                        className="text-foreground/90 font-medium"
                      >
                        {item.name}
                      </span>
                      <span
                        data-hb-node="badge"
                        data-hb-item={idx}
                        data-hb-edit={`hero:invoiceList.${idx}.status`}
                        className={cn(
                          "font-semibold",
                          item.isPaid ? "hb-remit-accent-text" : "text-muted-foreground"
                        )}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </InteractiveRemitCard>

            {/* Overlapping Floating Accent Reminder Card */}
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="hb-remit-lime-card absolute -right-2 -bottom-6 z-3 w-[240px] p-5 sm:-right-4 sm:-bottom-8 sm:w-[270px] sm:p-6"
            >
              <div className="text-[11px] font-bold tracking-wider uppercase opacity-80">
                {floatingReminder.tag}
              </div>
              <div className="mt-1.5 text-base leading-tight font-extrabold sm:text-lg">
                {floatingReminder.title}
              </div>
              <div className="mt-3.5 flex items-center justify-between">
                <span className="bg-background/90 text-foreground inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shadow-xs">
                  <Check className="hb-remit-accent-text h-3 w-3" />
                  {floatingReminder.badge}
                </span>
                <MorphingArrow isHovered={hoverRowRight} className="text-white" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* METRICS ROW: 3 COLUMNS SEJAJAR STATS WITH HOVER GLIDE INTERACTION */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6" data-hb-node="items">
          {metricCards.map((metric, idx) => {
            const isHovered = idx === 0 ? hoverMetric1 : idx === 1 ? hoverMetric2 : hoverMetric3;
            const setHovered =
              idx === 0 ? setHoverMetric1 : idx === 1 ? setHoverMetric2 : setHoverMetric3;
            return (
              <InteractiveRemitCard
                key={idx}
                dataHbItem={idx}
                imageSrc={metric.imageSrc}
                onHoverChange={setHovered}
                className="min-h-[170px]"
              >
                <div>
                  <div className="flex items-baseline justify-between">
                    <div className="hb-remit-accent-text text-3xl font-extrabold sm:text-4xl">
                      {metric.title}
                    </div>
                    <MorphingArrow isHovered={isHovered} />
                  </div>
                  <div className="text-muted-foreground mt-2 text-sm font-medium">
                    {metric.description}
                  </div>
                </div>
                <div className="border-border/60 text-muted-foreground/80 mt-4 border-t pt-3 text-xs">
                  {metric.footerText}
                </div>
              </InteractiveRemitCard>
            );
          })}
        </div>

        {/* BOTTOM TICKER / MARQUEE: Smooth right slide marquee that gently decelerates on hover */}
        <div className="hb-remit-marquee-container py-2" aria-label="Live automated metrics ticker">
          <div className="hb-remit-marquee-track">
            {[...metricCards, ...metricCards, ...metricCards].map((item, idx) => (
              <div
                key={idx}
                className="border-border bg-card/80 text-muted-foreground flex items-center gap-3 rounded-full border px-4 py-1.5 text-xs shadow-2xs backdrop-blur-xs"
              >
                <span className="text-foreground font-semibold">{item.title}</span>
                <span className="hb-remit-accent-bg h-1.5 w-1.5 rounded-full" />
                <span>{item.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER CREDIT */}
        {credit && (
          <footer className="text-muted-foreground/70 text-left text-xs">
            {credit.href ? (
              <a
                href={credit.href}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-foreground transition-colors"
              >
                {credit.label}
              </a>
            ) : (
              <span>{credit.label}</span>
            )}
          </footer>
        )}
      </Container>
    </Section>
  );
}
