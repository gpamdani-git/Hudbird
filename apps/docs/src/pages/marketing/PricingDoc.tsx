import React, { useState } from "react";
import pricingCode from "../../../../../packages/marketing/src/components/Pricing/Pricing.tsx?raw";
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
    children: [{ id: "standard-three-tier", title: "Standard Three Tier" }],
  },
];

const threeTierCode = `import { useState } from 'react'
import { Button } from '@hudbird/ui'
import { 
  PricingSection, PricingHeader, PricingBadge, PricingTitle, PricingDescription, PricingToggle,
  PricingGrid, PricingTier, PricingTierHeader, PricingTierName, PricingTierDescription, PricingTierPrice, PricingTierFeatures, PricingTierFeature
} from '@hudbird/marketing'

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
    <div className="flex w-full flex-col pb-20">
      <div className="sticky top-14 z-30 mb-8 w-full border-b border-zinc-200/50 bg-white/80 px-4 py-4 backdrop-blur-md transition-all sm:px-6 lg:px-8 dark:border-zinc-800/50 dark:bg-zinc-950/80">
        <div className="flex items-center gap-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {onOpenSidebar && (
            <button
              onClick={onOpenSidebar}
              className="-ml-1.5 hidden rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 lg:flex dark:text-zinc-300 dark:hover:bg-zinc-800"
              aria-label="Open Navigation"
            >
              <Menu size={18} />
            </button>
          )}
          <span>Marketing section</span>
          <ChevronRight size={14} className="text-zinc-400" />
          <span className="text-zinc-900 dark:text-zinc-100">Pricing Section</span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="mb-10">
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
            Pricing Sections
          </h1>
          <p className="max-w-3xl text-lg text-balance text-zinc-600 dark:text-zinc-400">
            Beautifully designed pricing tables that convert visitors into customers. Built with
            accessibility and flexibility in mind.
          </p>
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

        <section id="component-api" className="mt-16 scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Component API
          </h2>
          <ApiTable title="Pricing Props" rows={apiRows} />
        </section>
      </div>
    </div>
  );
}
