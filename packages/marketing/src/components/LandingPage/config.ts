import type {
  LandingPageConfig,
  LandingPageRecipe,
  LandingSectionContent,
  LandingSectionSelection,
  LandingSectionType,
} from "@hudbird/schemas";
import { pilotBrands } from "../StartupPilot";
import { landingSectionRegistry } from "./catalog";

export function createLandingPageConfig(): LandingPageConfig {
  return {
    version: 1,
    brand: { ...pilotBrands[0] },
    themeMode: "auto",
    motion: { reveal: "subtle", autoplay: true, smoothScroll: true },
    sections: landingSectionRegistry.map(
      (section) =>
        ({
          type: section.type,
          variant: section.variants[0].id,
          enabled: true,
        }) as LandingSectionSelection
    ),
  };
}

export function moveLandingSection(
  config: LandingPageConfig,
  type: LandingSectionType,
  direction: -1 | 1
): LandingPageConfig {
  if (type === "navbar" || type === "footer") return config;
  const sections = [...config.sections];
  const index = sections.findIndex((section) => section.type === type);
  const other = index + direction;
  if (
    index < 0 ||
    other < 0 ||
    other >= sections.length ||
    ["navbar", "footer"].includes(sections[other].type)
  )
    return config;
  [sections[index], sections[other]] = [sections[other], sections[index]];
  return { ...config, sections };
}

/** Restore only the supported, complete configuration shape from local storage. */
export function parseLandingPageConfig(value: unknown): LandingPageConfig | undefined {
  if (!value || typeof value !== "object") return;
  const config = value as LandingPageConfig;
  if (config.version !== 1 || !["auto", "light", "dark"].includes(config.themeMode)) return;
  if (
    config.motion &&
    (!["off", "subtle"].includes(config.motion.reveal) ||
      typeof config.motion.autoplay !== "boolean" ||
      typeof config.motion.smoothScroll !== "boolean")
  )
    return;
  const b = config.brand;
  if (
    !b ||
    typeof b.id !== "string" ||
    typeof b.name !== "string" ||
    !/^#[\da-f]{6}$/i.test(b.primary) ||
    typeof b.fontFamily !== "string" ||
    !["square", "soft", "round"].includes(b.radius) ||
    !["compact", "comfortable"].includes(b.density) ||
    !["light", "dark"].includes(b.mode)
  )
    return;
  if (b.googleFont !== undefined && typeof b.googleFont !== "string") return;
  if (b.referenceUrl !== undefined && typeof b.referenceUrl !== "string") return;
  if (b.logo && (typeof b.logo.src !== "string" || typeof b.logo.alt !== "string")) return;
  if (
    !Array.isArray(config.sections) ||
    config.sections.length !== landingSectionRegistry.length ||
    new Set(config.sections.map((section) => section?.type)).size !== landingSectionRegistry.length
  )
    return;
  for (const selection of config.sections) {
    const definition = landingSectionRegistry.find((section) => section.type === selection?.type);
    if (
      !definition ||
      typeof selection.enabled !== "boolean" ||
      ![...definition.variants, ...(definition.additionalVariants ?? [])].some(
        (variant) => variant.id === selection.variant
      )
    )
      return;
  }
  if (config.sections[0].type !== "navbar" || config.sections.at(-1)?.type !== "footer") return;
  return config;
}

export function createLandingPageCode(config: LandingPageConfig): string {
  const serialized = JSON.stringify(config, null, 2);
  return `import { SaasLandingPage, formaLandingContent } from "@/components/hudbird-ui/LandingPage";\nimport type { LandingPageConfig } from "@/components/hudbird-ui/CompositionSchema";\n\nconst config: LandingPageConfig = ${serialized};\n\nexport default function App() {\n  return <SaasLandingPage config={config} content={formaLandingContent} />;\n}\n`;
}

export function createLandingPageRecipe(
  config: LandingPageConfig,
  content: LandingSectionContent
): LandingPageRecipe {
  return {
    schema: "hudbird.landing.recipe",
    schemaVersion: 1,
    registryVersion: "1.5.0-local",
    generatedAt: new Date().toISOString(),
    config,
    content,
  };
}
