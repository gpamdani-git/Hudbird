import React, { useState } from "react";
import {
  Hero,
  HeroHeader,
  HeroBody,
  HeroBadge,
  HeroTitle,
  HeroDescription,
  HeroActions,
  FeatureSection,
  FeatureHeader,
  FeatureBadge,
  FeatureTitle,
  FeatureDescription,
  FeatureAlternating,
  FeatureRow,
  FeatureRowContent,
  FeatureRowMedia,
  PricingSection,
  PricingHeader,
  PricingBadge,
  PricingTitle,
  PricingDescription,
  PricingGrid,
  PricingTier,
  PricingTierHeader,
  PricingTierName,
  PricingTierDescription,
  PricingTierPrice,
  PricingTierFeatures,
  PricingTierFeature,
  PricingToggle,
  Testimonials,
  CtaCentered,
  FooterSimple,
} from "@hudbird/marketing";
import { Button } from "@hudbird/ui";
import {
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Truck,
  CreditCard,
  ChevronRight,
  BarChart,
  LineChart,
} from "lucide-react";
import { TemplateThemeToggle } from "./TemplateThemeToggle";
import { motion } from "framer-motion";

const SIMPLE_LINKS = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Integrations", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "API", href: "#" },
];

const SOCIALS = [{ label: "Twitter", href: "#", icon: <ArrowUpRight className="h-5 w-5" /> }];

export const EcommerceTemplate = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white dark:bg-zinc-950">
      <TemplateThemeToggle />

      {/* <!-- Hero Section - E-commerce Platform Theme --> */}
      <Hero size="lg" className="relative overflow-hidden bg-white dark:bg-zinc-950">
        <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100/50 via-transparent to-transparent dark:from-orange-900/20" />

        <HeroHeader
          className="relative z-50"
          logo={
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold text-zinc-900 dark:text-white">CommerceOS</span>
            </div>
          }
          links={[
            { label: "Platform", href: "#" },
            { label: "Solutions", href: "#" },
            { label: "Pricing", href: "#" },
          ]}
          action={
            <Button
              size="sm"
              className="rounded-full bg-zinc-900 px-6 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950"
            >
              Start Free
            </Button>
          }
        />
        <HeroBody align="center" className="relative z-10 mx-auto max-w-4xl pt-32 pb-24 lg:pt-40">
          <HeroBadge className="rounded-full border border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400">
            New: Global Inventory Sync ⚡️
          </HeroBadge>
          <HeroTitle className="mt-6 text-6xl font-bold tracking-tight text-zinc-900 md:text-8xl dark:text-white">
            Sell everywhere.
            <br />
            Manage anywhere.
          </HeroTitle>
          <HeroDescription className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
            The all-in-one commerce operating system. Build your storefront, process payments
            globally, and manage complex inventory across 50+ sales channels instantly.
          </HeroDescription>
          <HeroActions className="mt-10 justify-center">
            <Button className="h-14 rounded-full bg-orange-500 px-8 text-lg text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600">
              Start your 14-day trial
            </Button>
            <Button
              variant="outline"
              className="h-14 rounded-full border-zinc-200 px-8 text-lg text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Book a Demo
            </Button>
          </HeroActions>
        </HeroBody>
      </Hero>

      {/* <!-- Feature Section - E-commerce Platform Dashboard --> */}
      <FeatureSection className="border-t border-zinc-100 bg-zinc-50 py-32 dark:border-zinc-900 dark:bg-zinc-900/30">
        <FeatureHeader>
          <FeatureBadge className="rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
            Dashboard Overview
          </FeatureBadge>
          <FeatureTitle className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
            Everything at your fingertips.
          </FeatureTitle>
          <FeatureDescription className="mx-auto mt-6 max-w-2xl text-xl text-zinc-600 dark:text-zinc-400">
            Stop switching between 10 different apps. CommerceOS unifies your orders, customers, and
            analytics into one blazing-fast interface.
          </FeatureDescription>
        </FeatureHeader>

        <FeatureAlternating className="mt-24">
          <FeatureRow>
            <FeatureRowContent>
              <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Real-time Sales Analytics
              </h3>
              <p className="mt-6 text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
                Watch your revenue grow in real-time. Our streaming analytics engine processes every
                transaction instantly, providing you with up-to-the-second insights on conversion
                rates and average order value.
              </p>
              <ul className="mt-8 space-y-4 text-lg text-zinc-700 dark:text-zinc-300">
                <li className="flex items-center gap-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/20">
                    <LineChart size={16} />
                  </div>{" "}
                  Live revenue tracking
                </li>
                <li className="flex items-center gap-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/20">
                    <BarChart size={16} />
                  </div>{" "}
                  Cohort analysis & LTV
                </li>
                <li className="flex items-center gap-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/20">
                    <Package size={16} />
                  </div>{" "}
                  Best-selling product metrics
                </li>
              </ul>
            </FeatureRowContent>
            <FeatureRowMedia>
              <div className="group relative flex h-[450px] w-full flex-col justify-end overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white p-8 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
                <div className="absolute inset-0 bg-gradient-to-t from-orange-50/50 to-transparent dark:from-orange-950/20" />

                {/* Animated E-commerce Stats Mockup */}
                <div className="relative z-10 flex h-full w-full flex-col justify-between pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium text-zinc-500">Total Sales</span>
                      <span className="mt-1 text-4xl font-bold text-zinc-900 dark:text-white">
                        $124,592
                      </span>
                      <span className="mt-2 flex items-center gap-1 text-sm font-semibold text-emerald-500">
                        <ArrowUpRight size={14} /> +24.5% vs last month
                      </span>
                    </div>
                    <div className="rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-white">
                      This Month
                    </div>
                  </div>

                  {/* Animated Bar Chart */}
                  <div className="mt-8 flex h-48 items-end justify-between gap-3">
                    {[30, 45, 25, 60, 85, 50, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex flex-1 flex-col items-center gap-2 transition-opacity group-hover:opacity-100"
                      >
                        <motion.div
                          initial={{ height: "0%" }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                          className={`w-full rounded-t-lg ${i === 6 ? "bg-orange-500" : "bg-orange-200 dark:bg-orange-900/40"}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FeatureRowMedia>
          </FeatureRow>

          <FeatureRow reverse className="mt-32">
            <FeatureRowContent>
              <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Global Logistics Engine
              </h3>
              <p className="mt-6 text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
                Automate your entire fulfillment process. We automatically route orders to the
                nearest warehouse, generate shipping labels instantly, and update inventory across
                all your connected marketplaces.
              </p>
              <Button className="mt-8 h-14 rounded-full bg-zinc-900 px-8 text-lg font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950">
                View Integrations
              </Button>
            </FeatureRowContent>
            <FeatureRowMedia className="rounded-[3rem] bg-zinc-100 p-3 sm:p-4 dark:bg-zinc-800/50">
              <div className="relative flex h-[400px] w-full flex-col justify-center overflow-hidden rounded-[2rem] bg-zinc-900 p-8 shadow-2xl ring-1 ring-white/10">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent dark:from-blue-900/30" />

                {/* Logistics Order Pipeline Mockup */}
                <div className="relative z-10 flex flex-col gap-4">
                  <span className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">
                    Live Orders
                  </span>

                  {[
                    {
                      id: "#ORD-8921",
                      status: "Processing",
                      icon: <Package size={16} />,
                      color: "text-blue-600 dark:text-blue-400",
                      bg: "bg-blue-100 dark:bg-blue-500/20",
                    },
                    {
                      id: "#ORD-8920",
                      status: "Shipped",
                      icon: <Truck size={16} />,
                      color: "text-emerald-600 dark:text-emerald-400",
                      bg: "bg-emerald-100 dark:bg-emerald-500/20",
                    },
                    {
                      id: "#ORD-8919",
                      status: "Payment Verified",
                      icon: <CreditCard size={16} />,
                      color: "text-purple-600 dark:text-purple-400",
                      bg: "bg-purple-100 dark:bg-purple-500/20",
                    },
                  ].map((order, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
                      className="flex items-center justify-between rounded-2xl border border-zinc-200/50 bg-zinc-50/80 p-4 backdrop-blur-sm dark:border-zinc-700/50 dark:bg-zinc-800/80"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-10 w-10 rounded-full ${order.bg} ${order.color} flex items-center justify-center`}
                        >
                          {order.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-zinc-900 dark:text-white">
                            {order.id}
                          </span>
                          <span className="text-sm text-zinc-500 dark:text-zinc-400">
                            United States
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${order.color}`}>
                          {order.status}
                        </span>
                        <ChevronRight size={16} className="text-zinc-500" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FeatureRowMedia>
          </FeatureRow>
        </FeatureAlternating>
      </FeatureSection>

      {/* <!-- Pricing Section --> */}
      <PricingSection className="border-t border-zinc-200 bg-white py-32 dark:border-zinc-900 dark:bg-zinc-950">
        <PricingHeader>
          <PricingBadge className="rounded-full bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">
            Transparent Pricing
          </PricingBadge>
          <PricingTitle className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Start small, grow huge.
          </PricingTitle>
          <PricingDescription className="mx-auto max-w-2xl text-xl text-zinc-600 dark:text-zinc-400">
            No transaction fees on our native payment gateway. Just a flat monthly rate that scales
            when you do.
          </PricingDescription>
          <PricingToggle isAnnual={isAnnual} onChange={setIsAnnual} />
        </PricingHeader>
        <div className="mx-auto mt-20 max-w-7xl px-4">
          <PricingGrid className="grid-cols-1 gap-8 md:grid-cols-3">
            <PricingTier
              index={0}
              className="rounded-3xl border-zinc-200 bg-zinc-50 p-10 dark:border-zinc-800 dark:bg-zinc-900/30"
            >
              <PricingTierHeader>
                <PricingTierName className="text-2xl text-zinc-900 dark:text-white">
                  Creator
                </PricingTierName>
                <PricingTierDescription className="mt-2 text-zinc-600 dark:text-zinc-400">
                  Everything you need to launch your first store.
                </PricingTierDescription>
                <PricingTierPrice
                  price={isAnnual ? "$290" : "$29"}
                  period={isAnnual ? "/year" : "/month"}
                  className="mt-6 text-zinc-900 dark:text-white"
                />
              </PricingTierHeader>
              <Button
                variant="outline"
                className="mt-8 h-14 w-full rounded-full border-zinc-300 text-lg text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
              >
                Start Free Trial
              </Button>
              <PricingTierFeatures className="mt-10">
                <PricingTierFeature className="text-zinc-700 dark:text-zinc-300">
                  Up to 1,000 products
                </PricingTierFeature>
                <PricingTierFeature className="text-zinc-700 dark:text-zinc-300">
                  Custom domain support
                </PricingTierFeature>
                <PricingTierFeature className="text-zinc-700 dark:text-zinc-300">
                  Basic analytics dashboard
                </PricingTierFeature>
                <PricingTierFeature className="text-zinc-700 dark:text-zinc-300">
                  Standard email support
                </PricingTierFeature>
                <PricingTierFeature className="text-zinc-400 line-through">
                  Abandoned cart recovery
                </PricingTierFeature>
              </PricingTierFeatures>
            </PricingTier>

            <PricingTier
              index={1}
              popular
              className="relative transform rounded-3xl border-orange-500 bg-white p-10 shadow-2xl md:-translate-y-4 dark:bg-zinc-900"
            >
              <PricingTierHeader>
                <PricingTierName popular className="text-2xl text-orange-600 dark:text-orange-400">
                  Scale
                </PricingTierName>
                <PricingTierDescription popular className="mt-2 text-zinc-600 dark:text-zinc-400">
                  Advanced features for growing brands.
                </PricingTierDescription>
                <PricingTierPrice
                  popular
                  price={isAnnual ? "$790" : "$79"}
                  period={isAnnual ? "/year" : "/month"}
                  priceClassName="text-zinc-900 dark:text-white mt-6"
                />
              </PricingTierHeader>
              <Button className="mt-8 h-14 w-full rounded-full bg-orange-500 text-lg text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600">
                Upgrade to Scale
              </Button>
              <PricingTierFeatures popular className="mt-10">
                <PricingTierFeature popular className="font-medium text-zinc-900 dark:text-white">
                  Unlimited products
                </PricingTierFeature>
                <PricingTierFeature popular className="text-zinc-900 dark:text-white">
                  Multi-currency checkout
                </PricingTierFeature>
                <PricingTierFeature popular className="text-zinc-900 dark:text-white">
                  Advanced reporting & API access
                </PricingTierFeature>
                <PricingTierFeature popular className="text-zinc-900 dark:text-white">
                  Automated cart recovery workflows
                </PricingTierFeature>
                <PricingTierFeature popular className="text-zinc-900 dark:text-white">
                  24/7 Priority support
                </PricingTierFeature>
              </PricingTierFeatures>
            </PricingTier>

            <PricingTier
              index={2}
              className="rounded-3xl border-zinc-200 bg-zinc-50 p-10 dark:border-zinc-800 dark:bg-zinc-900/30"
            >
              <PricingTierHeader>
                <PricingTierName className="text-2xl text-zinc-900 dark:text-white">
                  Enterprise
                </PricingTierName>
                <PricingTierDescription className="mt-2 text-zinc-600 dark:text-zinc-400">
                  Custom solutions for massive volume.
                </PricingTierDescription>
                <PricingTierPrice
                  price="Custom"
                  period=""
                  className="mt-6 text-zinc-900 dark:text-white"
                />
              </PricingTierHeader>
              <Button
                variant="outline"
                className="mt-8 h-14 w-full rounded-full border-zinc-300 text-lg text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
              >
                Contact Sales
              </Button>
              <PricingTierFeatures className="mt-10">
                <PricingTierFeature className="text-zinc-700 dark:text-zinc-300">
                  Unlimited everything
                </PricingTierFeature>
                <PricingTierFeature className="text-zinc-700 dark:text-zinc-300">
                  Dedicated account manager
                </PricingTierFeature>
                <PricingTierFeature className="text-zinc-700 dark:text-zinc-300">
                  Custom integrations & API
                </PricingTierFeature>
                <PricingTierFeature className="text-zinc-700 dark:text-zinc-300">
                  SLA uptime guarantee
                </PricingTierFeature>
                <PricingTierFeature className="text-zinc-700 dark:text-zinc-300">
                  White-glove onboarding
                </PricingTierFeature>
              </PricingTierFeatures>
            </PricingTier>
          </PricingGrid>
        </div>
      </PricingSection>

      {/* <!-- Testimonials --> */}
      <div className="border-t border-zinc-200 bg-zinc-50 py-24 dark:border-zinc-900 dark:bg-zinc-900/50">
        <Testimonials />
      </div>

      {/* <!-- CTA V5 - Centered Card --> */}
      <div className="bg-white px-4 py-32 sm:px-6 lg:px-8 dark:bg-zinc-950">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem] bg-zinc-100 shadow-2xl dark:bg-zinc-900">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent dark:from-orange-500/30"></div>
          <CtaCentered
            className="relative z-10 bg-transparent py-24"
            title={
              <span className="text-5xl font-bold tracking-tight text-zinc-900 md:text-6xl dark:text-white">
                Ready to launch?
              </span>
            }
            description={
              <span className="mx-auto mt-6 block max-w-2xl text-xl text-zinc-600 dark:text-zinc-400">
                Join 10,000+ brands growing their revenue with CommerceOS. Start your 14-day free
                trial today.
              </span>
            }
            primaryAction={{
              label: "Start Free Trial",
              href: "#",
              className:
                "bg-orange-500 text-white hover:bg-orange-600 rounded-full h-14 px-8 text-lg font-medium",
            }}
            secondaryAction={{
              label: "Book Demo",
              href: "#",
              className:
                "border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full h-14 px-8 text-lg font-medium ml-0 sm:ml-4 mt-4 sm:mt-0",
            }}
          />
        </div>
      </div>

      {/* <!-- Footer --> */}
      <FooterSimple
        className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-900 dark:bg-zinc-950"
        logo={
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-orange-500" />
            <span className="text-lg font-bold text-zinc-900 dark:text-white">CommerceOS</span>
          </div>
        }
        links={SIMPLE_LINKS}
        socials={SOCIALS}
        copyright="&copy; 2026 CommerceOS Inc. All rights reserved."
      />
    </div>
  );
};
