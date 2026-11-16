"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, GitCompareArrows, Minus } from "lucide-react";
import { Badge, Container, Heading, Section, Switch, Tab, Tabs, Text } from "@hudbird/ui";
import { cn } from "../../utils/cn";
import { ABOUT_EASE_OUT, useSafeSectionReveal } from "../AboutUsSection/shared";
import "./pricing-compare.css";

export type CompareCellValue = boolean | string;

export interface PricingComparePlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: string;
  annualPrice: string;
  periodLabel: string;
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
}

export interface PricingCompareRow {
  id: string;
  feature: string;
  hint?: string;
  values: [CompareCellValue, CompareCellValue, CompareCellValue];
}

export interface PricingCompareGroup {
  id: string;
  label: string;
  rows: PricingCompareRow[];
}

export interface PricingCompareSectionProps {
  id?: string;
  badgeLabel?: string;
  title?: string;
  description?: string;
  plans?: [PricingComparePlan, PricingComparePlan, PricingComparePlan];
  groups?: PricingCompareGroup[];
  className?: string;
}

export const DEFAULT_PLANS: [PricingComparePlan, PricingComparePlan, PricingComparePlan] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Solo builders & prototypes",
    monthlyPrice: "$0",
    annualPrice: "$0",
    periodLabel: "/forever",
    ctaLabel: "Start Free",
    ctaHref: "#cta",
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Product teams shipping fast",
    monthlyPrice: "$29",
    annualPrice: "$23",
    periodLabel: "/month",
    ctaLabel: "Get Pro",
    ctaHref: "#cta",
    highlighted: true,
    badge: "Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Multi-brand organizations",
    monthlyPrice: "Custom",
    annualPrice: "Custom",
    periodLabel: "",
    ctaLabel: "Contact Sales",
    ctaHref: "#cta",
  },
];

export const DEFAULT_GROUPS: PricingCompareGroup[] = [
  {
    id: "core-ui",
    label: "Core UI & Accessibility",
    rows: [
      {
        id: "primitives",
        feature: "Production React primitives",
        hint: "Buttons, dialogs, inputs, tables, navigation & overlays",
        values: ["45+ components", "120+ components", "120+ & custom"],
      },
      {
        id: "wcag",
        feature: "WCAG 2.2 AA keyboard & ARIA",
        hint: "Focus traps, roving tabindex & screen-reader roles",
        values: [true, true, true],
      },
      {
        id: "bundles",
        feature: "Tree-shakable ESM & CJS bundles",
        values: [true, true, true],
      },
      {
        id: "composition",
        feature: "Headless slots & asChild composition",
        values: [false, true, true],
      },
    ],
  },
  {
    id: "theming-tokens",
    label: "Design Tokens & Theming",
    rows: [
      {
        id: "presets",
        feature: "Built-in brand presets",
        values: ["3 presets", "24+ presets", "Unlimited + custom"],
      },
      {
        id: "tailwind-v4",
        feature: "CSS-first Tailwind v4 @theme export",
        hint: "Zero-runtime OKLCH color & typography variables",
        values: [false, true, true],
      },
      {
        id: "surface-modes",
        feature: "Light, Dark & Glass mode parity",
        values: ["Light & Dark", "All 3 modes", "All 3 + white-label"],
      },
      {
        id: "figma-sync",
        feature: "Figma Tokens JSON synchronization",
        values: [false, true, true],
      },
    ],
  },
  {
    id: "motion-builder",
    label: "Motion & Multi-Page Builder",
    rows: [
      {
        id: "motion-suite",
        feature: "Calibrated Motion & spring physics",
        hint: "Prefers-reduced-motion & pointer-gated interactions",
        values: ["Basic reveal", "Full Motion suite", "Full + custom curves"],
      },
      {
        id: "page-builder",
        feature: "Multi-Page Builder & JSX export",
        values: ["1 page", "Unlimited pages", "Unlimited + CI sync"],
      },
      {
        id: "editorial-blocks",
        feature: "Editorial, Bento & Showcase blocks",
        values: [false, true, true],
      },
    ],
  },
  {
    id: "licensing-support",
    label: "Licensing & Engineering Support",
    rows: [
      {
        id: "projects",
        feature: "Commercial projects",
        values: ["1 project", "Unlimited", "Organization-wide"],
      },
      {
        id: "seats",
        feature: "Team seats included",
        values: ["1 seat", "Up to 10 seats", "Unlimited seats"],
      },
      {
        id: "support",
        feature: "Engineering support & SLA",
        values: ["Community", "Priority 24h", "Dedicated Slack + SLA"],
      },
    ],
  },
];

function isRowDifferent(values: [CompareCellValue, CompareCellValue, CompareCellValue]) {
  return !(values[0] === values[1] && values[1] === values[2]);
}

function CompareCellContent({
  value,
  highlighted,
}: {
  value: CompareCellValue;
  highlighted?: boolean;
}) {
  if (typeof value === "boolean") {
    return value ? (
      <span
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center rounded-full",
          highlighted
            ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
            : "bg-zinc-100 text-zinc-900 dark:bg-white/10 dark:text-zinc-100"
        )}
        aria-label="Included"
      >
        <Check className="h-3.5 w-3.5 stroke-[2.25]" aria-hidden="true" />
      </span>
    ) : (
      <span
        className="inline-flex h-6 w-6 items-center justify-center text-zinc-300 dark:text-zinc-700"
        aria-label="Not included"
      >
        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "text-xs leading-snug sm:text-[13px]",
        highlighted
          ? "font-semibold text-zinc-950 dark:text-white"
          : "font-medium text-zinc-700 dark:text-zinc-300"
      )}
    >
      {value}
    </span>
  );
}

export function PricingCompareSection({
  id = "pricing-compare",
  badgeLabel = "Compare Plans",
  title = "Every Primitive, Token, and Workflow Compared",
  description = "Inspect what ships in Starter, Pro, and Enterprise side by side. Filter by capability or isolate only the differences before choosing your stack.",
  plans = DEFAULT_PLANS,
  groups = DEFAULT_GROUPS,
  className,
}: PricingCompareSectionProps) {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const revealed = useSafeSectionReveal(sectionRef);
  const prefersReducedMotion = Boolean(useReducedMotion());

  const [billing, setBilling] = React.useState<"monthly" | "annual">("annual");
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [differencesOnly, setDifferencesOnly] = React.useState<boolean>(false);

  const initialFor = (yOffset: number) =>
    prefersReducedMotion ? false : { opacity: 0, y: yOffset };

  const targetFor = (yOffset: number) =>
    prefersReducedMotion || revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset };

  const visibleGroups = React.useMemo(() => {
    return groups
      .filter((group) => activeCategory === "all" || group.id === activeCategory)
      .map((group) => ({
        ...group,
        rows: differencesOnly ? group.rows.filter((r) => isRowDifferent(r.values)) : group.rows,
      }))
      .filter((group) => group.rows.length > 0);
  }, [groups, activeCategory, differencesOnly]);

  const filterKey = `${activeCategory}-${differencesOnly ? "diff" : "all"}`;

  return (
    <div ref={sectionRef} data-landing-section="pricing-compare" className="w-full">
      <Section
        id={id}
        spacing="none"
        className={cn(
          "hb-pricing-compare bg-background relative overflow-hidden border-t border-zinc-200/70 py-12 sm:py-16 lg:py-24 dark:border-white/[0.08]",
          className
        )}
      >
        <Container size="xl">
          <div className="mx-auto w-full max-w-6xl">
            {/* Editorial Pill Badge */}
            <motion.div
              initial={initialFor(10)}
              animate={targetFor(10)}
              transition={{ duration: 0.36, ease: ABOUT_EASE_OUT }}
              className="mb-4 sm:mb-6"
            >
              <Badge
                variant="modern"
                size="md"
                data-hb-node="badge"
                data-hb-edit="pricing-compare:badgeLabel"
                className="gap-2 px-3.5 py-1.5 text-xs font-medium"
              >
                <GitCompareArrows
                  className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300"
                  aria-hidden="true"
                />
                <span data-hb-edit-text="">{badgeLabel}</span>
              </Badge>
            </motion.div>

            {/* Split 12-Col Editorial Header */}
            <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-12 md:gap-10 lg:gap-12">
              <motion.div
                initial={initialFor(14)}
                animate={targetFor(14)}
                transition={{ duration: 0.42, delay: 0.04, ease: ABOUT_EASE_OUT }}
                className="md:col-span-6"
              >
                <Heading
                  as="h2"
                  size="inherit"
                  data-hb-node="heading"
                  data-hb-edit="pricing-compare:title"
                  className="text-foreground max-w-[18ch] text-2xl leading-[1.14] font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem]"
                >
                  {title}
                </Heading>
              </motion.div>

              <motion.div
                initial={initialFor(14)}
                animate={targetFor(14)}
                transition={{ duration: 0.42, delay: 0.08, ease: ABOUT_EASE_OUT }}
                className="flex flex-col gap-5 md:col-span-6"
              >
                <Text
                  data-hb-node="text"
                  data-hb-edit="pricing-compare:description"
                  className="text-muted-foreground max-w-[54ch] text-sm leading-[1.65] font-normal sm:text-[17px]"
                >
                  {description}
                </Text>

                {/* Interactive Controls: Billing Cadence + Core Switch */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <div
                    role="group"
                    aria-label="Billing cycle"
                    className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100/80 p-1 dark:border-white/10 dark:bg-white/[0.04]"
                  >
                    {(["monthly", "annual"] as const).map((cycle) => {
                      const isActive = billing === cycle;
                      return (
                        <button
                          key={cycle}
                          type="button"
                          onClick={() => setBilling(cycle)}
                          aria-pressed={isActive}
                          className={cn(
                            "hb-compare-toggle-btn relative min-h-9 cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium tracking-[-0.01em]",
                            isActive
                              ? "text-zinc-950 dark:text-white"
                              : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                          )}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="hb-compare-billing-pill"
                              transition={
                                prefersReducedMotion
                                  ? { duration: 0.01 }
                                  : { type: "spring", duration: 0.34, bounce: 0.14 }
                              }
                              className="absolute inset-0 rounded-full bg-white shadow-2xs ring-1 ring-zinc-200/80 dark:bg-zinc-900 dark:ring-white/15"
                            />
                          )}
                          <span className="relative z-10 flex items-center gap-1.5">
                            <span>{cycle === "monthly" ? "Monthly" : "Annual"}</span>
                            {cycle === "annual" && (
                              <span className="rounded-full bg-zinc-900 px-1.5 py-0.5 text-[10px] font-semibold text-white dark:bg-white dark:text-zinc-950">
                                -20%
                              </span>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex min-h-11 items-center">
                    <Switch
                      size="sm"
                      checked={differencesOnly}
                      onChange={(e) => setDifferencesOnly(e.target.checked)}
                      label="Differences only"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Underline Tabs from @hudbird/ui */}
            <motion.div
              initial={initialFor(12)}
              animate={targetFor(12)}
              transition={{ duration: 0.4, delay: 0.12, ease: ABOUT_EASE_OUT }}
              className="mt-8 sm:mt-10"
            >
              <Tabs
                variant="underlined"
                size="md"
                selectedKey={activeCategory}
                onSelectionChange={(key) => setActiveCategory(String(key))}
                aria-label="Filter comparison categories"
                className="w-full"
                classNames={{
                  tabList:
                    "w-full overflow-x-auto pb-0 border-b border-zinc-200/80 dark:border-white/[0.08] gap-5 sm:gap-6",
                  tab: "min-h-11 px-1 text-xs sm:text-sm",
                }}
              >
                <Tab key="all" tabKey="all" title="All capabilities" />
                {groups.map((group) => (
                  <Tab key={group.id} tabKey={group.id} title={group.label} />
                ))}
              </Tabs>
            </motion.div>

            {/* Animated View Container for Tab & Switch Transitions (/animate) */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={filterKey}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: ABOUT_EASE_OUT }}
                className="mt-6"
              >
                {/* Mobile Reflow Layout (< md): Zero Horizontal Overflow (/antislop-layoutmobile) */}
                <div className="space-y-6 md:hidden">
                  {/* Stacked Plan Summary Cards */}
                  <div className="grid grid-cols-1 gap-3">
                    {plans.map((plan) => {
                      const price = billing === "annual" ? plan.annualPrice : plan.monthlyPrice;
                      return (
                        <div
                          key={plan.id}
                          className={cn(
                            "rounded-2xl border p-4",
                            plan.highlighted
                              ? "border-zinc-900/20 bg-zinc-50/90 dark:border-white/20 dark:bg-white/[0.04]"
                              : "border-zinc-200/85 bg-white dark:border-white/10 dark:bg-zinc-950/60"
                          )}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <Heading
                                  as="h3"
                                  size="inherit"
                                  className="text-foreground text-base font-semibold tracking-[-0.02em]"
                                >
                                  {plan.name}
                                </Heading>
                                {plan.badge && (
                                  <Badge
                                    variant="modern"
                                    size="sm"
                                    className="px-2 py-0.5 text-[11px]"
                                  >
                                    {plan.badge}
                                  </Badge>
                                )}
                              </div>
                              <Text className="text-muted-foreground mt-0.5 text-xs">
                                {plan.tagline}
                              </Text>
                            </div>
                            <div className="text-right">
                              <span className="text-foreground text-xl font-semibold tracking-[-0.03em] tabular-nums">
                                {price}
                              </span>
                              {plan.periodLabel && (
                                <span className="text-muted-foreground ml-0.5 text-[11px]">
                                  {plan.periodLabel}
                                </span>
                              )}
                            </div>
                          </div>
                          <a
                            href={plan.ctaHref}
                            className={cn(
                              "hb-compare-cta mt-3.5 inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-xs font-medium tracking-[-0.01em]",
                              plan.highlighted
                                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                                : "border border-zinc-200 bg-white text-zinc-900 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-100"
                            )}
                          >
                            <span>{plan.ctaLabel}</span>
                            <ArrowUpRight
                              className="hb-compare-cta-arrow h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                          </a>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile Reflow Feature Comparison Cards */}
                  {visibleGroups.map((group) => (
                    <div key={group.id} className="space-y-2.5">
                      <Heading
                        as="h4"
                        size="inherit"
                        className="text-foreground px-1 text-xs font-semibold tracking-[0.04em] uppercase"
                      >
                        {group.label}
                      </Heading>
                      <div className="divide-y divide-zinc-200/75 overflow-hidden rounded-2xl border border-zinc-200/85 bg-white dark:divide-white/[0.08] dark:border-white/10 dark:bg-zinc-950/60">
                        {group.rows.map((row) => (
                          <div key={row.id} className="p-4">
                            <div className="text-foreground text-sm font-semibold tracking-[-0.01em]">
                              {row.feature}
                            </div>
                            {row.hint && (
                              <div className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
                                {row.hint}
                              </div>
                            )}
                            <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-zinc-100 pt-3 dark:border-white/[0.06]">
                              {plans.map((plan, idx) => (
                                <div key={`${row.id}-mobile-${plan.id}`} className="min-w-0">
                                  <dt className="text-muted-foreground text-[11px] font-medium">
                                    {plan.name}
                                  </dt>
                                  <dd className="mt-1">
                                    <CompareCellContent
                                      value={row.values[idx]}
                                      highlighted={plan.highlighted}
                                    />
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tablet & Desktop Matrix Table (md+) */}
                <div
                  tabIndex={0}
                  role="region"
                  aria-label="Hudbird UI plan comparison matrix"
                  className="hidden overflow-x-auto rounded-[22px] border border-zinc-200/85 bg-white shadow-2xs md:block dark:border-white/10 dark:bg-zinc-950/60"
                >
                  <table className="w-full min-w-[720px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-zinc-200/80 dark:border-white/10">
                        <th
                          scope="col"
                          className="sticky left-0 z-20 w-[34%] bg-white/95 px-5 py-6 align-bottom backdrop-blur-sm sm:px-6 dark:bg-zinc-950/95"
                        >
                          <Text className="text-foreground text-xs font-semibold tracking-[0.04em] uppercase">
                            Capabilities
                          </Text>
                          <Text className="text-muted-foreground mt-1 text-sm font-normal">
                            Side-by-side breakdown
                          </Text>
                        </th>
                        {plans.map((plan, planIdx) => {
                          const price = billing === "annual" ? plan.annualPrice : plan.monthlyPrice;
                          return (
                            <th
                              key={plan.id}
                              scope="col"
                              data-hb-node="card"
                              data-hb-item={planIdx}
                              className={cn(
                                "w-[22%] px-5 py-6 align-top sm:px-6",
                                plan.highlighted && "bg-zinc-50/90 dark:bg-white/[0.03]"
                              )}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <Heading
                                  as="h3"
                                  size="inherit"
                                  data-hb-node="heading"
                                  data-hb-item={planIdx}
                                  data-hb-edit={`pricing-compare:plans.${planIdx}.name`}
                                  className="text-foreground text-base font-semibold tracking-[-0.02em]"
                                >
                                  {plan.name}
                                </Heading>
                                {plan.badge && (
                                  <Badge
                                    variant="modern"
                                    size="sm"
                                    data-hb-node="badge"
                                    data-hb-item={planIdx}
                                    data-hb-edit={`pricing-compare:plans.${planIdx}.badge`}
                                    className="px-2 py-0.5 text-[11px]"
                                  >
                                    <span data-hb-edit-text="">{plan.badge}</span>
                                  </Badge>
                                )}
                              </div>
                              <Text
                                data-hb-node="text"
                                data-hb-item={planIdx}
                                data-hb-edit={`pricing-compare:plans.${planIdx}.tagline`}
                                className="text-muted-foreground mt-1 text-xs font-normal"
                              >
                                {plan.tagline}
                              </Text>
                              <div className="mt-4 flex items-baseline gap-1">
                                <AnimatePresence mode="wait" initial={false}>
                                  <motion.span
                                    key={`${plan.id}-${billing}`}
                                    data-hb-node="heading"
                                    data-hb-item={planIdx}
                                    data-hb-edit={`pricing-compare:plans.${planIdx}.${billing === "annual" ? "annualPrice" : "monthlyPrice"}`}
                                    initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                                    transition={{ duration: 0.16, ease: ABOUT_EASE_OUT }}
                                    className="text-foreground text-2xl font-semibold tracking-[-0.03em] tabular-nums sm:text-[1.75rem]"
                                  >
                                    {price}
                                  </motion.span>
                                </AnimatePresence>
                                {plan.periodLabel && (
                                  <span
                                    data-hb-node="text"
                                    data-hb-item={planIdx}
                                    data-hb-edit={`pricing-compare:plans.${planIdx}.periodLabel`}
                                    className="text-muted-foreground text-xs font-normal"
                                  >
                                    {plan.periodLabel}
                                  </span>
                                )}
                              </div>
                              <a
                                href={plan.ctaHref}
                                data-hb-node="primary-button"
                                data-hb-item={planIdx}
                                data-hb-edit={`pricing-compare:plans.${planIdx}.ctaLabel`}
                                className={cn(
                                  "hb-compare-cta mt-4 inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium tracking-[-0.01em]",
                                  plan.highlighted
                                    ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                                    : "border border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-white/25"
                                )}
                              >
                                <span data-hb-edit-text="">{plan.ctaLabel}</span>
                                <ArrowUpRight
                                  className="hb-compare-cta-arrow h-3.5 w-3.5"
                                  aria-hidden="true"
                                />
                              </a>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>

                    <tbody>
                      {visibleGroups.map((group) => {
                        const groupIdx = Math.max(
                          0,
                          groups.findIndex((g) => g.id === group.id)
                        );
                        return (
                          <React.Fragment key={group.id}>
                            <tr className="border-b border-zinc-200/70 bg-zinc-50/70 dark:border-white/[0.07] dark:bg-white/[0.02]">
                              <th
                                colSpan={4}
                                scope="colgroup"
                                className="px-5 py-3 text-left sm:px-6"
                              >
                                <Heading
                                  as="h4"
                                  size="inherit"
                                  data-hb-node="heading"
                                  data-hb-item={groupIdx}
                                  data-hb-edit={`pricing-compare:groups.${groupIdx}.label`}
                                  className="text-foreground text-xs font-semibold tracking-[0.04em] uppercase"
                                >
                                  {group.label}
                                </Heading>
                              </th>
                            </tr>
                            {group.rows.map((row) => {
                              const sourceGroup = groups[groupIdx];
                              const rowIdx = Math.max(
                                0,
                                sourceGroup ? sourceGroup.rows.findIndex((r) => r.id === row.id) : 0
                              );
                              return (
                                <tr
                                  key={row.id}
                                  data-hb-node="items"
                                  data-hb-item={groupIdx}
                                  className="hb-compare-row border-b border-zinc-200/60 last:border-b-0 dark:border-white/[0.06]"
                                >
                                  <th
                                    scope="row"
                                    className="sticky left-0 z-10 bg-white/95 px-5 py-4 text-left align-middle font-semibold backdrop-blur-sm sm:px-6 dark:bg-zinc-950/95"
                                  >
                                    <div
                                      data-hb-node="text"
                                      data-hb-item={rowIdx}
                                      data-hb-edit={`pricing-compare:groups.${groupIdx}.rows.${rowIdx}.feature`}
                                      className="text-foreground text-sm font-semibold tracking-[-0.01em]"
                                    >
                                      {row.feature}
                                    </div>
                                    {row.hint && (
                                      <div
                                        data-hb-node="text"
                                        data-hb-item={rowIdx}
                                        data-hb-edit={`pricing-compare:groups.${groupIdx}.rows.${rowIdx}.hint`}
                                        className="text-muted-foreground mt-0.5 text-xs leading-relaxed font-normal"
                                      >
                                        {row.hint}
                                      </div>
                                    )}
                                  </th>
                                  {plans.map((plan, colIndex) => (
                                    <td
                                      key={`${row.id}-${plan.id}`}
                                      data-hb-node="text"
                                      data-hb-item={colIndex}
                                      data-hb-edit={`pricing-compare:groups.${groupIdx}.rows.${rowIdx}.values.${colIndex}`}
                                      data-hb-edit-mode="popover"
                                      className={cn(
                                        "px-5 py-4 align-middle sm:px-6",
                                        plan.highlighted && "bg-zinc-50/65 dark:bg-white/[0.02]"
                                      )}
                                    >
                                      <CompareCellContent
                                        value={row.values[colIndex]}
                                        highlighted={plan.highlighted}
                                      />
                                    </td>
                                  ))}
                                </tr>
                              );
                            })}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </Section>
    </div>
  );
}
