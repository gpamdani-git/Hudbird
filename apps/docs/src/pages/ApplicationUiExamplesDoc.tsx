import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  ApplicationPageRenderer,
  applicationUiCatalog,
  createHudbirdStudioCode,
  createHudbirdStudioConfig,
  getApplicationCategory,
  switchStudioApplicationCategory,
} from "@hudbird/marketing";
import type { ApplicationExampleCategorySlug } from "@hudbird/schemas";
import { DocHeader } from "../components/DocHeader";
import { InstallationTabs } from "../components/InstallationTabs";
import { MarketingPreview } from "../components/MarketingPreview";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";
import { useWebsiteMode } from "../lib/useWebsiteMode";

const apiRows: ApiPropRow[] = [
  {
    prop: "category",
    type: '"dashboards" | "dashboards-stacked" | "settings" | "settings-stacked" | "informational" | "informational-stacked"',
    required: true,
    description: "Selects the Application UI layout shell (01 Sidebar vs 02 Stacked Header).",
  },
  {
    prop: "blocks",
    type: "ApplicationSlotSelection[]",
    required: true,
    description: "Ordered slot configuration for the application page.",
  },
  {
    prop: "brand",
    type: "BrandProfile",
    required: true,
    description: "Brand profile tokens applied to the shell and child organisms.",
  },
];

export default function ApplicationUiExamplesDoc() {
  const { category: paramCategory } = useParams<{ category?: string }>();

  const activeCategorySlug = useMemo<ApplicationExampleCategorySlug>(() => {
    const match = applicationUiCatalog.find((c) => c.slug === paramCategory);
    return match ? match.slug : "dashboards";
  }, [paramCategory]);

  const websiteMode = useWebsiteMode();
  const activeCategory = getApplicationCategory(activeCategorySlug);

  const defaultConfig = useMemo(
    () =>
      switchStudioApplicationCategory(
        createHudbirdStudioConfig({ domain: "application-ui" }),
        activeCategorySlug,
        activeCategory.variants[0]?.id
      ),
    [activeCategorySlug, activeCategory]
  );

  const defaultCode = useMemo(() => createHudbirdStudioCode(defaultConfig), [defaultConfig]);

  return (
    <div className="space-y-24 pb-24 sm:space-y-32">
      <DocHeader
        category="Application UI"
        title={activeCategory.title}
        badge={activeCategory.badge}
        description={activeCategory.description}
      />

      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName={activeCategory.slug} manualCode={defaultCode} />
      </div>

      <div id="examples" className="flex flex-col gap-16">
        {activeCategory.variants.map((variant) => {
          const config = switchStudioApplicationCategory(
            createHudbirdStudioConfig({ domain: "application-ui" }),
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
              minHeight={640}
            >
              <ApplicationPageRenderer
                category={config.application.category}
                blocks={config.application.blocks}
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
          <ApiTable title="ApplicationPageRenderer Props" rows={apiRows} />
        </div>
      </section>
    </div>
  );
}
