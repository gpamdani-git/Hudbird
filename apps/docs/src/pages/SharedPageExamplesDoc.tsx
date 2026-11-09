import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  createHudbirdStudioCode,
  createHudbirdStudioConfig,
  getSharedPageCategory,
  SharedPageRenderer,
  sharedPagesCatalog,
  switchStudioSharedCategory,
} from "@hudbird/marketing";
import type { SharedPageCategorySlug } from "@hudbird/schemas";
import { DocHeader } from "../components/DocHeader";
import { InstallationTabs } from "../components/InstallationTabs";
import { MarketingPreview } from "../components/MarketingPreview";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";
import { useWebsiteMode } from "../lib/useWebsiteMode";

const apiRows: ApiPropRow[] = [
  {
    prop: "category",
    type: '"login" | "signup" | "verification" | "forgot-password" | "404" | "email-templates"',
    required: true,
    description: "Selects the shared page template category.",
  },
  {
    prop: "blocks",
    type: "SharedPageSlotSelection[]",
    required: true,
    description: "Slot arrangement for the shared page layout.",
  },
  {
    prop: "brand",
    type: "BrandProfile",
    required: true,
    description: "Brand identity and surface mode applied to the page.",
  },
];

export default function SharedPageExamplesDoc() {
  const { category: paramCategory } = useParams<{ category?: string }>();

  const activeCategorySlug = useMemo<SharedPageCategorySlug>(() => {
    const match = sharedPagesCatalog.find((c) => c.slug === paramCategory);
    return match ? match.slug : "login";
  }, [paramCategory]);

  const websiteMode = useWebsiteMode();
  const activeCategory = getSharedPageCategory(activeCategorySlug);

  const defaultConfig = useMemo(
    () =>
      switchStudioSharedCategory(
        createHudbirdStudioConfig({ domain: "shared-pages" }),
        activeCategorySlug,
        activeCategory.variants[0]?.id
      ),
    [activeCategorySlug, activeCategory]
  );

  const defaultCode = useMemo(() => createHudbirdStudioCode(defaultConfig), [defaultConfig]);

  return (
    <div className="space-y-24 pb-24 sm:space-y-32">
      <DocHeader
        category="Shared Pages"
        title={activeCategory.title}
        badge={activeCategory.badge}
        description={activeCategory.description}
      />

      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName={activeCategory.slug} manualCode={defaultCode} />
      </div>

      <div id="examples" className="flex flex-col gap-16">
        {activeCategory.variants.map((variant) => {
          const config = switchStudioSharedCategory(
            createHudbirdStudioConfig({ domain: "shared-pages" }),
            activeCategorySlug,
            variant.id
          );
          const code = createHudbirdStudioCode(config);
          return (
            <MarketingPreview
              key={variant.id}
              isolateViewport
              title={variant.name}
              subtitle={variant.description}
              code={code}
              minHeight={560}
            >
              <SharedPageRenderer
                category={config.shared.category}
                blocks={config.shared.blocks}
                brand={{ ...config.brand, mode: websiteMode }}
              />
            </MarketingPreview>
          );
        })}
      </div>

      <section id="component-api" className="scroll-mt-24 space-y-8">
        <div>
          <h2 className="font-outfit mb-4 text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Component API
          </h2>
          <ApiTable title="SharedPageRenderer Props" rows={apiRows} />
        </div>
      </section>
    </div>
  );
}
