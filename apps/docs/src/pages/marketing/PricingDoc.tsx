import React, { useState } from "react";
import { PageToolbar } from "../../components/PageToolbar";
import pricingCode from "../../../../../packages/marketing/src/components/Pricing/Pricing.tsx?raw";
import pricingGlassCode from "../../../../../packages/marketing/src/components/Pricing/PricingGlass.tsx?raw";
import { InstallationTabs } from "../../components/InstallationTabs";
import {
  PricingSection,
  PricingHeader,
  PricingBadge,
  PricingTitle,
  PricingDescription,
  PricingToggle,
  PricingGrid,
  PricingTier,
  PricingTierHeader,
  PricingTierName,
  PricingTierDescription,
  PricingTierPrice,
  PricingTierFeatures,
  PricingTierFeature,
  PricingGlass,
} from "@hudbird/marketing";
import { Button } from "@hudbird/ui";
import { MarketingPreview } from "../../components/MarketingPreview";
import { ApiTable, type ApiPropRow } from "../../components/ApiTable";
import { ChevronRight, Menu } from "lucide-react";
import skillContent from "../../../../../.agents/skills/marketing-bento-grid/SKILL.md?raw"; // fallback skill for now

export const pricingTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "standard-three-tier", title: "Standard Three Tier" },
      { id: "glass", title: "Glassmorphic Pricing" },
    ],
  },
];

const threeTierCode = `import { useState } from 'react'
import { Button } from "@/components/hudbird-ui/Button";
import { PricingSection, PricingHeader, PricingBadge, PricingTitle, PricingDescription, PricingToggle, PricingGrid, PricingTier, PricingTierHeader, PricingTierName, PricingTierDescription, PricingTierPrice, PricingTierFeatures, PricingTierFeature } from "@/components/hudbird-ui/Pricing";

function Example() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <PricingSection variant="subtle">
      <PricingHeader>
        <PricingBadge>Pricing</PricingBadge>
        <PricingTitle>Pricing that grows with you</PricingTitle>
        <PricingDescription>
          Choose an affordable plan that's packed with the best features for engaging your audience, creating customer loyalty, and driving sales.
        </PricingDescription>
        <PricingToggle isAnnual={isAnnual} onChange={setIsAnnual} />
      </PricingHeader>
      
      <PricingGrid>
        {/* Tier 1 */}
        <PricingTier index={0}>
          <PricingTierHeader>
            <PricingTierName>Freelancer</PricingTierName>
            <PricingTierDescription>The essentials to provide your best work for clients.</PricingTierDescription>
            <PricingTierPrice price={isAnnual ? "$190" : "$19"} period={isAnnual ? "/year" : "/month"} />
          </PricingTierHeader>
          <Button variant="outline" className="w-full mt-2">Buy plan</Button>
          <PricingTierFeatures>
            <PricingTierFeature>5 products</PricingTierFeature>
            <PricingTierFeature>Up to 1,000 subscribers</PricingTierFeature>
            <PricingTierFeature>Basic analytics</PricingTierFeature>
            <PricingTierFeature>48-hour support response time</PricingTierFeature>
          </PricingTierFeatures>
        </PricingTier>

        {/* Tier 2 (Popular) */}
        <PricingTier index={1} popular>
          <PricingTierHeader>
            <PricingTierName popular>Startup</PricingTierName>
            <PricingTierDescription popular>A plan that scales with your rapidly growing business.</PricingTierDescription>
            <PricingTierPrice popular price={isAnnual ? "$490" : "$49"} period={isAnnual ? "/year" : "/month"} />
          </PricingTierHeader>
          <Button color="primary" className="w-full mt-2 ring-1 ring-white/20">Buy plan</Button>
          <PricingTierFeatures popular>
            <PricingTierFeature popular>25 products</PricingTierFeature>
            <PricingTierFeature popular>Up to 10,000 subscribers</PricingTierFeature>
            <PricingTierFeature popular>Advanced analytics</PricingTierFeature>
            <PricingTierFeature popular>24-hour support response time</PricingTierFeature>
            <PricingTierFeature popular>Marketing automations</PricingTierFeature>
          </PricingTierFeatures>
        </PricingTier>

        {/* Tier 3 */}
        <PricingTier index={2}>
          <PricingTierHeader>
            <PricingTierName>Enterprise</PricingTierName>
            <PricingTierDescription>Dedicated support and infrastructure for your company.</PricingTierDescription>
            <PricingTierPrice price={isAnnual ? "$990" : "$99"} period={isAnnual ? "/year" : "/month"} />
          </PricingTierHeader>
          <Button variant="outline" className="w-full mt-2">Buy plan</Button>
          <PricingTierFeatures>
            <PricingTierFeature>Unlimited products</PricingTierFeature>
            <PricingTierFeature>Unlimited subscribers</PricingTierFeature>
            <PricingTierFeature>Advanced analytics</PricingTierFeature>
            <PricingTierFeature>1-hour, dedicated support response time</PricingTierFeature>
            <PricingTierFeature>Marketing automations</PricingTierFeature>
            <PricingTierFeature>Custom reporting tools</PricingTierFeature>
          </PricingTierFeatures>
        </PricingTier>
      </PricingGrid>
    </PricingSection>
  )
}`;

export default function PricingDoc({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const [isAnnual, setIsAnnual] = useState(false);

  const apiRows: ApiPropRow[] = [
    {
      prop: "variant (PricingSection)",
      type: '"default" | "subtle" | "transparent"',
      defaultVal: '"default"',
      description: "Controls the background color of the Pricing container.",
    },
    {
      prop: "popular (PricingTier)",
      type: "boolean",
      defaultVal: "false",
      description: "If true, applies the dark/highlighted theme for the 'Most Popular' tier.",
    },
    {
      prop: "isAnnual (PricingToggle)",
      type: "boolean",
      defaultVal: "false",
      description: "State controlling the toggle switch position.",
    },
    {
      prop: "onChange (PricingToggle)",
      type: "(isAnnual: boolean) => void",
      defaultVal: "-",
      description: "Callback fired when the toggle is clicked.",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center pt-24 pb-24">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="w-full min-w-0 flex-1 pr-4">
            <div className="mb-3 flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                Pricing Sections
              </h1>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                New
              </span>
            </div>
            <p className="pr-32 text-base text-zinc-600 sm:pr-40 lg:max-w-4xl dark:text-zinc-400">
              Beautifully designed pricing tables that convert visitors into customers. Built with
              accessibility and flexibility in mind.
            </p>
          </div>
          <PageToolbar />
        </div>

        <div id="installation" className="scroll-mt-24 space-y-4">
          <InstallationTabs componentName="pricing" manualCode={pricingCode} />
        </div>

        <div className="mt-16 flex flex-col gap-16">
          <MarketingPreview title="Standard Three Tier" skill={skillContent} code={threeTierCode}>
            <PricingSection variant="subtle">
              <PricingHeader>
                <PricingBadge>Pricing</PricingBadge>
                <PricingTitle>Pricing that grows with you</PricingTitle>
                <PricingDescription>
                  Choose an affordable plan that's packed with the best features for engaging your
                  audience, creating customer loyalty, and driving sales.
                </PricingDescription>
                <PricingToggle isAnnual={isAnnual} onChange={setIsAnnual} />
              </PricingHeader>

              <PricingGrid>
                {/* Tier 1 */}
                <PricingTier index={0}>
                  <PricingTierHeader>
                    <PricingTierName>Freelancer</PricingTierName>
                    <PricingTierDescription>
                      The essentials to provide your best work for clients.
                    </PricingTierDescription>
                    <PricingTierPrice
                      price={isAnnual ? "$190" : "$19"}
                      period={isAnnual ? "/year" : "/month"}
                    />
                  </PricingTierHeader>
                  <Button variant="outline" className="mt-2 w-full">
                    Buy plan
                  </Button>
                  <PricingTierFeatures>
                    <PricingTierFeature>5 products</PricingTierFeature>
                    <PricingTierFeature>Up to 1,000 subscribers</PricingTierFeature>
                    <PricingTierFeature>Basic analytics</PricingTierFeature>
                    <PricingTierFeature>48-hour support response time</PricingTierFeature>
                  </PricingTierFeatures>
                </PricingTier>

                {/* Tier 2 (Popular) */}
                <PricingTier index={1} popular>
                  <PricingTierHeader>
                    <PricingTierName popular>Startup</PricingTierName>
                    <PricingTierDescription popular>
                      A plan that scales with your rapidly growing business.
                    </PricingTierDescription>
                    <PricingTierPrice
                      popular
                      price={isAnnual ? "$490" : "$49"}
                      period={isAnnual ? "/year" : "/month"}
                    />
                  </PricingTierHeader>
                  <Button
                    color="primary"
                    className="mt-2 w-full ring-1 ring-white/20 hover:ring-white/40"
                  >
                    Buy plan
                  </Button>
                  <PricingTierFeatures popular>
                    <PricingTierFeature popular>25 products</PricingTierFeature>
                    <PricingTierFeature popular>Up to 10,000 subscribers</PricingTierFeature>
                    <PricingTierFeature popular>Advanced analytics</PricingTierFeature>
                    <PricingTierFeature popular>24-hour support response time</PricingTierFeature>
                    <PricingTierFeature popular>Marketing automations</PricingTierFeature>
                  </PricingTierFeatures>
                </PricingTier>

                {/* Tier 3 */}
                <PricingTier index={2}>
                  <PricingTierHeader>
                    <PricingTierName>Enterprise</PricingTierName>
                    <PricingTierDescription>
                      Dedicated support and infrastructure for your company.
                    </PricingTierDescription>
                    <PricingTierPrice
                      price={isAnnual ? "$990" : "$99"}
                      period={isAnnual ? "/year" : "/month"}
                    />
                  </PricingTierHeader>
                  <Button variant="outline" className="mt-2 w-full">
                    Buy plan
                  </Button>
                  <PricingTierFeatures>
                    <PricingTierFeature>Unlimited products</PricingTierFeature>
                    <PricingTierFeature>Unlimited subscribers</PricingTierFeature>
                    <PricingTierFeature>Advanced analytics</PricingTierFeature>
                    <PricingTierFeature>1-hour, dedicated support response time</PricingTierFeature>
                    <PricingTierFeature>Marketing automations</PricingTierFeature>
                    <PricingTierFeature>Custom reporting tools</PricingTierFeature>
                  </PricingTierFeatures>
                </PricingTier>
              </PricingGrid>
            </PricingSection>
          </MarketingPreview>
        </div>

        {/* Glassmorphic Pricing */}
        <div id="glass" className="mt-16 scroll-mt-24">
          <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Glassmorphic Pricing
          </h3>
          <MarketingPreview>
            <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-950 dark:to-indigo-950/20">
              <div className="absolute top-0 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/30 blur-[100px]" />
              <div className="absolute right-1/4 bottom-0 h-96 w-96 translate-x-1/2 rounded-full bg-cyan-500/30 blur-[100px]" />

              <PricingGlass
                isAnnual={isAnnual}
                onToggleAnnual={setIsAnnual}
                tiers={[
                  {
                    name: "Freelancer",
                    description: "The essentials to provide your best work for clients.",
                    price: isAnnual ? "$190" : "$19",
                    period: isAnnual ? "/year" : "/month",
                    buttonLabel: "Buy plan",
                    features: [
                      "5 products",
                      "Up to 1,000 subscribers",
                      "Basic analytics",
                      "48-hour support response time",
                    ],
                  },
                  {
                    name: "Startup",
                    description: "A plan that scales with your rapidly growing business.",
                    price: isAnnual ? "$490" : "$49",
                    period: isAnnual ? "/year" : "/month",
                    popular: true,
                    buttonLabel: "Buy plan",
                    features: [
                      "25 products",
                      "Up to 10,000 subscribers",
                      "Advanced analytics",
                      "24-hour support response time",
                      "Marketing automations",
                    ],
                  },
                  {
                    name: "Enterprise",
                    description: "Dedicated support and infrastructure for your company.",
                    price: isAnnual ? "$990" : "$99",
                    period: isAnnual ? "/year" : "/month",
                    buttonLabel: "Buy plan",
                    features: [
                      "Unlimited products",
                      "Unlimited subscribers",
                      "Advanced analytics",
                      "1-hour, dedicated support response time",
                      "Marketing automations",
                      "Custom reporting tools",
                    ],
                  },
                ]}
              />
            </div>
          </MarketingPreview>
        </div>

        <section id="component-api" className="mt-16 scroll-mt-24 space-y-8">
          <div>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Component API
            </h2>
            <ApiTable title="Pricing Props" rows={apiRows} />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
              PricingGlass Props
            </h3>
            <ApiTable
              title="PricingGlass"
              rows={[
                {
                  prop: "tiers",
                  type: "PricingGlassTier[]",
                  defaultVal: "-",
                  description: "Array of pricing tiers to display.",
                },
                {
                  prop: "isAnnual",
                  type: "boolean",
                  defaultVal: "false",
                  description: "State controlling the toggle switch position.",
                },
                {
                  prop: "onToggleAnnual",
                  type: "(isAnnual: boolean) => void",
                  defaultVal: "-",
                  description:
                    "Callback fired when the toggle is clicked. If not provided, toggle is hidden.",
                },
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
