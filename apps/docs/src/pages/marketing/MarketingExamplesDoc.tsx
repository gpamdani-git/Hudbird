import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  createHudbirdStudioCode,
  createHudbirdStudioConfig,
  getMarketingExampleDefinition,
  MarketingExamplePageRenderer,
  marketingExamplesCatalog,
  switchStudioMarketingExample,
} from "@hudbird/marketing";
import type { MarketingExampleCategorySlug } from "@hudbird/schemas";
import { DocHeader } from "../../components/DocHeader";
import { InstallationTabs } from "../../components/InstallationTabs";
import { MarketingPreview } from "../../components/MarketingPreview";
import { ApiTable, type ApiPropRow } from "../../components/ApiTable";
import { useWebsiteMode } from "../../lib/useWebsiteMode";

const apiRows: ApiPropRow[] = [
  {
    prop: "exampleSlug",
    type: '"landing-pages" | "pricing-pages" | "about-pages" | "contact-pages" | "blog-pages" | "blog-post-pages" | "faq-pages" | "team-pages" | "legal-pages" | "404-pages"',
    required: true,
    description: "Selects the marketing page composition.",
  },
  {
    prop: "blocks",
    type: "MarketingExtendedBlockSelection[]",
    required: true,
    description: "Ordered section blocks rendered inside the marketing page.",
  },
  {
    prop: "brand",
    type: "BrandProfile",
    required: true,
    description: "Brand identity tokens applied across all sections.",
  },
];

export default function MarketingExamplesDoc() {
  const { slug: paramSlug } = useParams<{ slug?: string }>();

  const activeExampleSlug = useMemo<MarketingExampleCategorySlug>(() => {
    const match = marketingExamplesCatalog.find((e) => e.slug === paramSlug);
    return match ? match.slug : "landing-pages";
  }, [paramSlug]);

  const websiteMode = useWebsiteMode();
  const activeExample = getMarketingExampleDefinition(activeExampleSlug);

  const studioConfig = useMemo(() => {
    const base = switchStudioMarketingExample(
      createHudbirdStudioConfig({ domain: "marketing" }),
      activeExampleSlug
    );
    const resolvedBrand = { ...base.brand, mode: websiteMode };
    return {
      ...base,
      brand: resolvedBrand,
      marketing: {
        ...base.marketing,
        landingConfig: {
          ...base.marketing.landingConfig,
          brand: resolvedBrand,
          themeMode: websiteMode,
        },
      },
    };
  }, [activeExampleSlug, websiteMode]);

  const generatedCode = useMemo(() => createHudbirdStudioCode(studioConfig), [studioConfig]);

  return (
    <div className="space-y-24 pb-24 sm:space-y-32">
      <DocHeader
        category="Marketing Examples"
        title={activeExample.title}
        badge={activeExample.badge}
        description={activeExample.description}
      />

      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName={activeExample.slug} manualCode={generatedCode} />
      </div>

      <div id="examples" className="flex flex-col gap-16">
        <MarketingPreview
          isolateViewport
          title={activeExample.title}
          subtitle={activeExample.description}
          code={generatedCode}
          minHeight={680}
        >
          <MarketingExamplePageRenderer
            exampleSlug={studioConfig.marketing.exampleSlug}
            blocks={studioConfig.marketing.extendedBlocks}
            brand={studioConfig.brand}
            landingConfig={studioConfig.marketing.landingConfig}
          />
        </MarketingPreview>
      </div>

      <section id="component-api" className="scroll-mt-24 space-y-8">
        <div>
          <h2 className="font-outfit mb-4 text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Component API
          </h2>
          <ApiTable title="MarketingExamplePageRenderer Props" rows={apiRows} />
        </div>
      </section>
    </div>
  );
}
