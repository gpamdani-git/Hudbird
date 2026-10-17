// packages/schemas/src/index.ts
import { NicheConfig } from "./types";
import { digitalAgencyNiche, DIGITAL_AGENCY_INNER_PAGES } from "./niches/digital-agency";
import { aiCopilotNiche } from "./niches/ai-copilot";
import { alunaraWellnessNiche } from "./niches/alunara-wellness";
import { fintechProtocolNiche } from "./niches/fintech-protocol";
import { cyberShieldNiche } from "./niches/cyber-shield";
import { getPrebuiltTemplateMeta, buildNicheConfigFromPrebuilt } from "./niches/prebuilt-47";

export * from "./types";
export * from "./niches/digital-agency";
export * from "./niches/ai-copilot";
export * from "./niches/alunara-wellness";
export * from "./niches/fintech-protocol";
export * from "./niches/cyber-shield";
export * from "./niches/inner-pages";
export * from "./niches/prebuilt-47";

// Global Niche Registry containing all 5 Flagship Niches
export const NICHES_REGISTRY: Record<string, NicheConfig> = {
  [digitalAgencyNiche.slug]: digitalAgencyNiche,
  [aiCopilotNiche.slug]: aiCopilotNiche,
  [alunaraWellnessNiche.slug]: alunaraWellnessNiche,
  [fintechProtocolNiche.slug]: fintechProtocolNiche,
  [cyberShieldNiche.slug]: cyberShieldNiche,
};

/**
 * Retrieve a specific niche configuration by its URL slug (supports all 47 pre-built templates).
 */
export function getNicheBySlug(slug: string): NicheConfig | undefined {
  // Normalize slug to handle aliases and leading/trailing slashes
  const clean = slug.replace(/^\/+|\/+$/g, "");
  if (NICHES_REGISTRY[clean]) return NICHES_REGISTRY[clean];

  // Check if slug matches one of our 47 pre-built templates
  const prebuiltMeta = getPrebuiltTemplateMeta(clean);
  if (prebuiltMeta) {
    return buildNicheConfigFromPrebuilt(prebuiltMeta);
  }

  // Also check if slug ends with one of our registered slugs
  for (const [key, niche] of Object.entries(NICHES_REGISTRY)) {
    if (clean === key || clean.endsWith(`/${key}`) || clean.endsWith(key)) {
      return niche;
    }
  }

  return undefined;
}

/**
 * Retrieve all registered niche configurations (Total 5 Flagship Niches = 120+ pages).
 */
export function getAllNiches(): NicheConfig[] {
  return Object.values(NICHES_REGISTRY);
}

/**
 * Standard 24 Inner Pages Matrix for Multiplier Engine
 */
export const INNER_PAGES_MATRIX = DIGITAL_AGENCY_INNER_PAGES;
