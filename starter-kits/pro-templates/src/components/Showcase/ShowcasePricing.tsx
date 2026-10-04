import React from "react";
import { Button } from "@hudbird/ui";
import {
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
} from "@hudbird/marketing";

export function ShowcasePricing() {
  return (
    <div id="pricing" className="w-full bg-zinc-50 dark:bg-zinc-950">
      <PricingSection variant="subtle">
        <PricingHeader>
          <PricingBadge>Pricing</PricingBadge>
          <PricingTitle>Simple, transparent pricing</PricingTitle>
          <PricingDescription>
            Get lifetime access to all current and future components, templates, and updates. Build
            unlimited commercial projects.
          </PricingDescription>
        </PricingHeader>

        <PricingGrid>
          {/* Tier 1 (Free) */}
          <PricingTier index={0}>
            <PricingTierHeader>
              <PricingTierName>UI Core & Blocks</PricingTierName>
              <PricingTierDescription>Open source UI components & blocks.</PricingTierDescription>
              <PricingTierPrice price="$0" period="/free forever" />
            </PricingTierHeader>
            <a
              href="https://hudbirdui.com/docs"
              target="_blank"
              rel="noreferrer"
              className="mt-2 block w-full"
            >
              <Button variant="outline" color="zinc" className="w-full">
                Read Documentation
              </Button>
            </a>
            <PricingTierFeatures>
              <PricingTierFeature>100+ UI Core Components</PricingTierFeature>
              <PricingTierFeature>30+ Marketing Blocks</PricingTierFeature>
              <PricingTierFeature>Framer Motion animations</PricingTierFeature>
              <PricingTierFeature>Tailwind CSS v4 ready</PricingTierFeature>
              <PricingTierFeature>Community Discord support</PricingTierFeature>
            </PricingTierFeatures>
          </PricingTier>

          {/* Tier 2 (Popular) */}
          <PricingTier index={1} popular>
            <PricingTierHeader>
              <PricingTierName popular>All-Access Pass</PricingTierName>
              <PricingTierDescription popular>
                Every template + future releases.
              </PricingTierDescription>
              <PricingTierPrice popular price="$249" period="/lifetime" />
            </PricingTierHeader>
            <a
              href="https://danihudbird.gumroad.com/l/hudbirdui-pro-allaccess"
              target="_blank"
              rel="noreferrer"
              className="mt-2 block w-full"
            >
              <Button
                color="dark/white"
                className="w-full text-white ring-1 ring-white/20 transition-transform hover:scale-[1.02]"
              >
                Get All-Access Pass
              </Button>
            </a>
            <PricingTierFeatures popular>
              <PricingTierFeature popular>All 9+ Production Starter Kits</PricingTierFeature>
              <PricingTierFeature popular>Premium Admin Dashboard UI</PricingTierFeature>
              <PricingTierFeature popular>Private GitHub Repo Access</PricingTierFeature>
              <PricingTierFeature popular>
                Unlimited Personal & Commercial Projects
              </PricingTierFeature>
              <PricingTierFeature popular>All future templates — FREE forever</PricingTierFeature>
              <PricingTierFeature popular>Priority Customer Support</PricingTierFeature>
            </PricingTierFeatures>
          </PricingTier>

          {/* Tier 3 */}
          <PricingTier index={2}>
            <PricingTierHeader>
              <PricingTierName>Agency License</PricingTierName>
              <PricingTierDescription>For teams, agencies & studios.</PricingTierDescription>
              <PricingTierPrice price="$499" period="/lifetime" />
            </PricingTierHeader>
            <a
              href="https://danihudbird.gumroad.com/l/hudbirdui-pro-allaccess"
              target="_blank"
              rel="noreferrer"
              className="mt-2 block w-full"
            >
              <Button variant="outline" color="zinc" className="w-full">
                Get Agency License
              </Button>
            </a>
            <PricingTierFeatures>
              <PricingTierFeature>Everything in All-Access Pass</PricingTierFeature>
              <PricingTierFeature>Commercial & Agency License</PricingTierFeature>
              <PricingTierFeature>Unlimited client handovers</PricingTierFeature>
              <PricingTierFeature>No attribution required</PricingTierFeature>
              <PricingTierFeature>Dedicated email support</PricingTierFeature>
            </PricingTierFeatures>
          </PricingTier>
        </PricingGrid>
      </PricingSection>
    </div>
  );
}
