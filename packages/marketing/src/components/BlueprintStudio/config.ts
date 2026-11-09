import type {
  ApplicationExampleCategorySlug,
  HudbirdBlueprintDomain,
  HudbirdStudioBuilderConfig,
  HudbirdStudioRecipe,
  MarketingExampleCategorySlug,
  SharedPageCategorySlug,
} from "@hudbird/schemas";
import { createLandingPageConfig } from "../LandingPage/config";
import {
  getApplicationCategory,
  getMarketingExampleDefinition,
  getSharedPageCategory,
  HUDBIRD_STUDIO_REGISTRY_VERSION,
} from "./catalog";

export function moveStudioBlock<T>(
  items: readonly T[],
  index: number,
  direction: "up" | "down"
): T[] {
  const next = [...items];
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || index >= next.length || targetIndex < 0 || targetIndex >= next.length) {
    return next;
  }
  const [moved] = next.splice(index, 1);
  next.splice(targetIndex, 0, moved);
  return next;
}

export function createHudbirdStudioConfig(
  overrides?: Partial<HudbirdStudioBuilderConfig>
): HudbirdStudioBuilderConfig {
  const defaultAppCategory = getApplicationCategory("dashboards");
  const defaultSharedCategory = getSharedPageCategory("login");
  const defaultMarketingExample = getMarketingExampleDefinition("landing-pages");
  const baseLanding = createLandingPageConfig();

  const brand = {
    ...baseLanding.brand,
    ...(overrides?.brand ?? {}),
  };

  return {
    version: 1,
    domain: overrides?.domain ?? "application-ui",
    brand,
    themeMode: overrides?.themeMode ?? "auto",
    application: {
      category: overrides?.application?.category ?? defaultAppCategory.slug,
      variantId: overrides?.application?.variantId ?? defaultAppCategory.variants[0].id,
      blocks:
        overrides?.application?.blocks?.map((b) => ({ ...b })) ??
        defaultAppCategory.variants[0].defaultBlocks.map((b) => ({ ...b })),
    },
    shared: {
      category: overrides?.shared?.category ?? defaultSharedCategory.slug,
      variantId: overrides?.shared?.variantId ?? defaultSharedCategory.variants[0].id,
      blocks:
        overrides?.shared?.blocks?.map((b) => ({ ...b })) ??
        defaultSharedCategory.variants[0].defaultBlocks.map((b) => ({ ...b })),
    },
    marketing: {
      exampleSlug: overrides?.marketing?.exampleSlug ?? defaultMarketingExample.slug,
      landingConfig: overrides?.marketing?.landingConfig ?? {
        ...baseLanding,
        brand,
      },
      extendedBlocks:
        overrides?.marketing?.extendedBlocks?.map((b) => ({ ...b })) ??
        defaultMarketingExample.defaultBlocks.map((b) => ({ ...b })),
    },
  };
}

export function switchStudioApplicationCategory(
  config: HudbirdStudioBuilderConfig,
  categorySlug: ApplicationExampleCategorySlug,
  variantId?: string
): HudbirdStudioBuilderConfig {
  const category = getApplicationCategory(categorySlug);
  const chosenVariant = category.variants.find((v) => v.id === variantId) ?? category.variants[0];
  return {
    ...config,
    domain: "application-ui",
    application: {
      category: category.slug,
      variantId: chosenVariant.id,
      blocks: chosenVariant.defaultBlocks.map((b) => ({ ...b })),
    },
  };
}

export function switchStudioSharedCategory(
  config: HudbirdStudioBuilderConfig,
  categorySlug: SharedPageCategorySlug,
  variantId?: string
): HudbirdStudioBuilderConfig {
  const category = getSharedPageCategory(categorySlug);
  const chosenVariant = category.variants.find((v) => v.id === variantId) ?? category.variants[0];
  return {
    ...config,
    domain: "shared-pages",
    shared: {
      category: category.slug,
      variantId: chosenVariant.id,
      blocks: chosenVariant.defaultBlocks.map((b) => ({ ...b })),
    },
  };
}

export function switchStudioMarketingExample(
  config: HudbirdStudioBuilderConfig,
  exampleSlug: MarketingExampleCategorySlug
): HudbirdStudioBuilderConfig {
  const example = getMarketingExampleDefinition(exampleSlug);
  return {
    ...config,
    domain: "marketing",
    marketing: {
      ...config.marketing,
      exampleSlug: example.slug,
      extendedBlocks: example.defaultBlocks.map((b) => ({ ...b })),
    },
  };
}

export function createHudbirdStudioRecipe(config: HudbirdStudioBuilderConfig): HudbirdStudioRecipe {
  return {
    schema: "hudbird.studio.recipe",
    schemaVersion: 1,
    registryVersion: HUDBIRD_STUDIO_REGISTRY_VERSION,
    generatedAt: new Date().toISOString(),
    config,
  };
}

export function parseHudbirdStudioConfig(input: string): {
  config: HudbirdStudioBuilderConfig;
  warnings: string[];
} {
  const warnings: string[] = [];
  try {
    const raw = JSON.parse(input) as Record<string, unknown>;
    const candidate =
      raw.schema === "hudbird.studio.recipe" && raw.config && typeof raw.config === "object"
        ? (raw.config as Partial<HudbirdStudioBuilderConfig>)
        : (raw as Partial<HudbirdStudioBuilderConfig>);

    const validDomains: HudbirdBlueprintDomain[] = ["application-ui", "shared-pages", "marketing"];
    const domain = validDomains.includes(candidate.domain as HudbirdBlueprintDomain)
      ? (candidate.domain as HudbirdBlueprintDomain)
      : "application-ui";

    if (!validDomains.includes(candidate.domain as HudbirdBlueprintDomain)) {
      warnings.push("Unrecognized or missing domain; defaulted to 'application-ui'.");
    }

    const merged = createHudbirdStudioConfig({
      ...candidate,
      domain,
    });

    return { config: merged, warnings };
  } catch (err) {
    warnings.push(
      `Invalid JSON recipe (${err instanceof Error ? err.message : "parse error"}); restored default studio blueprint.`
    );
    return {
      config: createHudbirdStudioConfig(),
      warnings,
    };
  }
}

export function createHudbirdStudioCode(config: HudbirdStudioBuilderConfig): string {
  const brandJson = JSON.stringify(config.brand, null, 2);

  if (config.domain === "application-ui") {
    const blocksJson = JSON.stringify(config.application.blocks, null, 2);
    return `import React from "react";
import { ApplicationPageRenderer } from "@hudbird/marketing";
import type { ApplicationBlockSelection, BrandProfile } from "@hudbird/schemas";

const brand: BrandProfile = ${brandJson};

const blocks: ApplicationBlockSelection[] = ${blocksJson};

export default function App() {
  return (
    <ApplicationPageRenderer
      category="${config.application.category}"
      brand={brand}
      blocks={blocks}
    />
  );
}
`;
  }

  if (config.domain === "shared-pages") {
    const blocksJson = JSON.stringify(config.shared.blocks, null, 2);
    return `import React from "react";
import { SharedPageRenderer } from "@hudbird/marketing";
import type { BrandProfile, SharedBlockSelection } from "@hudbird/schemas";

const brand: BrandProfile = ${brandJson};

const blocks: SharedBlockSelection[] = ${blocksJson};

export default function App() {
  return (
    <SharedPageRenderer
      category="${config.shared.category}"
      brand={brand}
      blocks={blocks}
    />
  );
}
`;
  }

  const marketingBlocksJson = JSON.stringify(config.marketing.extendedBlocks, null, 2);
  return `import React from "react";
import { MarketingExamplePageRenderer, createLandingPageConfig } from "@hudbird/marketing";
import type { BrandProfile, MarketingExtendedBlockSelection } from "@hudbird/schemas";

const brand: BrandProfile = ${brandJson};

const blocks: MarketingExtendedBlockSelection[] = ${marketingBlocksJson};

const landingConfig = {
  ...createLandingPageConfig(),
  brand,
};

export default function App() {
  return (
    <MarketingExamplePageRenderer
      exampleSlug="${config.marketing.exampleSlug}"
      brand={brand}
      blocks={blocks}
      landingConfig={landingConfig}
    />
  );
}
`;
}
