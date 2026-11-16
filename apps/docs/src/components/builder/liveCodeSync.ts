import type {
  LandingSectionSelection,
  LandingSectionType,
  SectionAppearanceSettings,
  WebsiteDesignTokens,
  WebsiteSurfaceBase,
} from "@hudbird/schemas";
import {
  getEffectiveSharedSections,
  getEffectiveTokens,
  landingSectionRegistry,
  normalizePagePath,
  parseWebsiteProject,
  resolveSectionFilePath,
  SURFACE_BASE_PALETTES,
  type WebsiteExportFile,
  type WebsiteProjectConfig,
} from "@hudbird/marketing";
import { buildVirtualFileMap, compileTsxSourceToModule, isCompiledError } from "./liveTsxSandbox";

export interface CodeSyncDiagnostic {
  message: string;
  line?: number;
  column?: number;
}

export interface LiveCodeApplyResult {
  project: WebsiteProjectConfig;
  status: "synced" | "custom-tsx" | "error";
  diagnostic?: CodeSyncDiagnostic;
}

const VALID_HEX_6 = /^#[\da-f]{6}$/i;
const VALID_SURFACES = new Set<WebsiteSurfaceBase>([
  "zinc",
  "slate",
  "neutral",
  "stone",
  "obsidian",
]);

function normalizeCodeBody(source: string): string {
  const marker = source.indexOf("export default function");
  if (marker === -1) return "";
  return source
    .slice(marker)
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function stripCustomFile(project: WebsiteProjectConfig, path: string): WebsiteProjectConfig {
  if (!project.customFiles || !(path in project.customFiles)) return project;
  const next = { ...project.customFiles };
  delete next[path];
  return {
    ...project,
    customFiles: Object.keys(next).length > 0 ? next : undefined,
  };
}

function withCustomFile(
  project: WebsiteProjectConfig,
  path: string,
  content: string
): WebsiteProjectConfig {
  return {
    ...project,
    customFiles: {
      ...(project.customFiles ?? {}),
      [path]: content,
    },
  };
}

export function revertCustomFileToSynced(
  project: WebsiteProjectConfig,
  filePath: string
): WebsiteProjectConfig {
  return stripCustomFile(project, filePath);
}

function hasBalancedBraces(css: string): { ok: boolean; line?: number } {
  let depth = 0;
  let line = 1;
  for (let i = 0; i < css.length; i++) {
    const ch = css[i];
    if (ch === "\n") line++;
    else if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth < 0) return { ok: false, line };
    }
  }
  return { ok: depth === 0, line };
}

function parseCssBlockVars(css: string, blockSelector: ":root" | ".dark"): Record<string, string> {
  const escaped = blockSelector === ":root" ? ":root" : "\\.dark";
  const regex = new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`, "g");
  const vars: Record<string, string> = {};
  let match: RegExpExecArray | null;
  while ((match = regex.exec(css)) !== null) {
    const body = match[1];
    const declRegex = /(--[a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
    let decl: RegExpExecArray | null;
    while ((decl = declRegex.exec(body)) !== null) {
      vars[decl[1].trim()] = decl[2].trim();
    }
  }
  return vars;
}

function applyTokensCssSync(project: WebsiteProjectConfig, cssCode: string): LiveCodeApplyResult {
  const braces = hasBalancedBraces(cssCode);
  if (!braces.ok) {
    return {
      project,
      status: "error",
      diagnostic: { message: "Unmatched `{` or `}` in tokens.css", line: braces.line },
    };
  }

  const rootVars = parseCssBlockVars(cssCode, ":root");
  const darkVars = parseCssBlockVars(cssCode, ".dark");
  const modeVars =
    project.brand.mode === "dark" && Object.keys(darkVars).length > 0 ? darkVars : rootVars;

  if (Object.keys(rootVars).length === 0 && Object.keys(darkVars).length === 0) {
    return {
      project,
      status: "error",
      diagnostic: { message: "Expected :root or .dark CSS custom properties block", line: 1 },
    };
  }

  const nextBrand = { ...project.brand };
  const curTokens = getEffectiveTokens(project);
  const nextTokens: WebsiteDesignTokens = {
    ...curTokens,
    semantic: { ...(curTokens.semantic ?? {}) },
    typography: { ...(curTokens.typography ?? {}) },
    shape: { ...(curTokens.shape ?? {}) },
    customColors: { ...(curTokens.customColors ?? {}) },
  };

  const accent = modeVars["--hb-accent"] ?? rootVars["--hb-accent"];
  if (accent && VALID_HEX_6.test(accent)) {
    nextBrand.primary = accent;
  } else if (accent && accent.startsWith("#")) {
    return {
      project,
      status: "error",
      diagnostic: {
        message: `--hb-accent must be a valid 6-digit hex color (got "${accent}")`,
      },
    };
  }

  const secondary = modeVars["--hb-secondary"] ?? rootVars["--hb-secondary"];
  if (secondary) nextTokens.secondaryColor = secondary;

  const success = modeVars["--hb-success"] ?? rootVars["--hb-success"];
  const warning = modeVars["--hb-warning"] ?? rootVars["--hb-warning"];
  const danger = modeVars["--hb-danger"] ?? rootVars["--hb-danger"];
  if (success) nextTokens.semantic!.success = success;
  if (warning) nextTokens.semantic!.warning = warning;
  if (danger) nextTokens.semantic!.danger = danger;

  const radius = modeVars["--hb-radius"] ?? rootVars["--hb-radius"];
  if (radius) {
    const parsedRadius = Number.parseFloat(radius);
    if (Number.isFinite(parsedRadius) && parsedRadius >= 0 && parsedRadius <= 48) {
      nextTokens.shape!.radiusPx = parsedRadius;
    }
  }

  const bodyFont = modeVars["--hb-font"] ?? rootVars["--hb-font"];
  const headingFont = modeVars["--hb-font-heading"] ?? rootVars["--hb-font-heading"];
  const monoFont = modeVars["--hb-font-mono"] ?? rootVars["--hb-font-mono"];
  if (bodyFont) {
    nextTokens.typography!.bodyFont = bodyFont;
    nextBrand.fontFamily = bodyFont;
  }
  if (headingFont) nextTokens.typography!.headingFont = headingFont;
  if (monoFont) nextTokens.typography!.monoFont = monoFont;

  const palette =
    SURFACE_BASE_PALETTES[nextTokens.surfaceBase]?.[project.brand.mode] ??
    SURFACE_BASE_PALETTES.zinc[project.brand.mode];
  const colorMap: Array<
    [
      "--hb-bg" | "--hb-surface" | "--hb-ink" | "--hb-muted" | "--hb-border",
      "bg" | "surface" | "ink" | "muted" | "border",
    ]
  > = [
    ["--hb-bg", "bg"],
    ["--hb-surface", "surface"],
    ["--hb-ink", "ink"],
    ["--hb-muted", "muted"],
    ["--hb-border", "border"],
  ];
  for (const [cssVar, key] of colorMap) {
    const val = modeVars[cssVar];
    if (val && val !== palette[key]) {
      nextTokens.customColors![key] = val;
    }
  }

  return {
    project: stripCustomFile(
      { ...project, brand: nextBrand, tokens: nextTokens },
      "src/styles/tokens.css"
    ),
    status: "synced",
  };
}

function applyTokensJsonSync(project: WebsiteProjectConfig, jsonCode: string): LiveCodeApplyResult {
  try {
    const parsed = JSON.parse(jsonCode) as {
      brand?: { name?: string; mode?: "light" | "dark"; primary?: string };
      tokens?: {
        surfaceBase?: WebsiteSurfaceBase;
        secondaryColor?: string;
        semantic?: WebsiteDesignTokens["semantic"];
        typography?: WebsiteDesignTokens["typography"];
        shape?: WebsiteDesignTokens["shape"];
        spacing?: WebsiteDesignTokens["spacing"];
      };
      cssVariables?: Record<string, string>;
    };
    const nextBrand = { ...project.brand };
    if (parsed.brand?.name?.trim()) nextBrand.name = parsed.brand.name.trim();
    if (parsed.brand?.mode === "light" || parsed.brand?.mode === "dark") {
      nextBrand.mode = parsed.brand.mode;
    }
    if (parsed.brand?.primary) {
      if (!VALID_HEX_6.test(parsed.brand.primary)) {
        return {
          project,
          status: "error",
          diagnostic: { message: "brand.primary must be a 6-digit hex color (e.g. #4f46e5)" },
        };
      }
      nextBrand.primary = parsed.brand.primary;
    }
    const curTokens = getEffectiveTokens(project);
    const nextTokens: WebsiteDesignTokens = {
      ...curTokens,
      ...(parsed.tokens ?? {}),
      surfaceBase:
        parsed.tokens?.surfaceBase && VALID_SURFACES.has(parsed.tokens.surfaceBase)
          ? parsed.tokens.surfaceBase
          : curTokens.surfaceBase,
      semantic: { ...(curTokens.semantic ?? {}), ...(parsed.tokens?.semantic ?? {}) },
      typography: { ...(curTokens.typography ?? {}), ...(parsed.tokens?.typography ?? {}) },
      shape: { ...(curTokens.shape ?? {}), ...(parsed.tokens?.shape ?? {}) },
      spacing: { ...(curTokens.spacing ?? {}), ...(parsed.tokens?.spacing ?? {}) },
    };
    return {
      project: stripCustomFile(
        { ...project, brand: nextBrand, tokens: nextTokens },
        "design-tokens.json"
      ),
      status: "synced",
    };
  } catch (err) {
    return {
      project,
      status: "error",
      diagnostic: {
        message: err instanceof Error ? err.message : "Invalid design-tokens.json",
        line: 1,
      },
    };
  }
}

function applyProjectJsonSync(
  project: WebsiteProjectConfig,
  jsonCode: string
): LiveCodeApplyResult {
  try {
    const parsed = JSON.parse(jsonCode) as unknown;
    const valid = parseWebsiteProject(parsed);
    if (!valid) {
      return {
        project,
        status: "error",
        diagnostic: {
          message:
            "JSON parsed, but violates WebsiteProjectConfig schema (check pages, paths, or activePageId).",
          line: 1,
        },
      };
    }
    return {
      project: stripCustomFile(
        {
          ...valid,
          customFiles: valid.customFiles ?? project.customFiles,
        },
        "src/data/project.config.json"
      ),
      status: "synced",
    };
  } catch (err) {
    return {
      project,
      status: "error",
      diagnostic: {
        message: err instanceof Error ? err.message : "Invalid JSON",
        line: 1,
      },
    };
  }
}

function applyRoutesTsSync(project: WebsiteProjectConfig, routesCode: string): LiveCodeApplyResult {
  const virtualMap = buildVirtualFileMap(project, "src/routes.ts", routesCode);
  const compiled = compileTsxSourceToModule("src/routes.ts", virtualMap);
  if (isCompiledError(compiled)) {
    return {
      project,
      status: "error",
      diagnostic: { message: compiled.message, line: compiled.line, column: compiled.column },
    };
  }
  const routeList = compiled.exports.WEBSITE_ROUTES;
  if (!Array.isArray(routeList)) {
    return {
      project,
      status: "error",
      diagnostic: { message: "WEBSITE_ROUTES must remain an exported array", line: 1 },
    };
  }
  const nextPages = project.pages.map((p) => {
    const updated = routeList.find(
      (
        r
      ): r is {
        id?: string;
        name?: string;
        path?: string;
        seo?: { title?: string; description?: string };
      } => Boolean(r && typeof r === "object" && (r as { id?: string }).id === p.id)
    );
    if (!updated) return p;
    const nextPath =
      typeof updated.path === "string" && updated.path.trim()
        ? normalizePagePath(updated.path)
        : p.path;
    return {
      ...p,
      name: typeof updated.name === "string" && updated.name.trim() ? updated.name.trim() : p.name,
      path: nextPath,
      ...(updated.seo ? { seo: updated.seo } : {}),
    };
  });
  const pathSet = new Set(nextPages.map((p) => p.path));
  if (pathSet.size !== nextPages.length) {
    return {
      project,
      status: "error",
      diagnostic: { message: "Duplicate page path in WEBSITE_ROUTES" },
    };
  }
  return {
    project: stripCustomFile({ ...project, pages: nextPages }, "src/routes.ts"),
    status: "synced",
  };
}

function patchSectionFromEvaluatedExports(
  project: WebsiteProjectConfig,
  pageId: string,
  sectionType: string,
  exportsObj: Record<string, unknown>
): WebsiteProjectConfig | { error: string } {
  const targetPage = project.pages.find((p) => p.id === pageId) ?? project.pages[0];
  if (!targetPage) return project;

  const isLanding = landingSectionRegistry.some((d) => d.type === sectionType);
  if (isLanding) {
    const typedType = sectionType as LandingSectionType;
    const registryDef = landingSectionRegistry.find((d) => d.type === typedType)!;
    const rawVariant = exportsObj.sectionVariant;
    const allVariants = [...registryDef.variants, ...(registryDef.additionalVariants ?? [])].map(
      (v) => v.id
    );
    if (typeof rawVariant !== "string" || !allVariants.includes(rawVariant as never)) {
      return {
        error: `Unknown variant "${String(rawVariant)}" for "${sectionType}". Allowed: ${allVariants.join(", ")}`,
      };
    }

    const appearance = exportsObj.sectionAppearance as SectionAppearanceSettings | undefined;
    const sectionContent = exportsObj.sectionContent as Record<string, unknown> | undefined;
    const sectionConfig = exportsObj.sectionConfig as Record<string, unknown> | undefined;
    const sectionBrand = exportsObj.sectionBrand as { name?: string } | undefined;

    const nextPages = project.pages.map((p) => {
      const updateThisPage =
        p.id === pageId ||
        ((typedType === "navbar" || typedType === "footer") &&
          (targetPage.sharedMode?.[typedType] ?? "inherit") === "inherit" &&
          (p.sharedMode?.[typedType] ?? "inherit") === "inherit");
      if (!updateThisPage) return p;

      const nextSections: LandingSectionSelection[] = p.sections.map((sec) =>
        sec.type === typedType
          ? ({
              ...sec,
              variant: rawVariant,
              customSettings:
                appearance && Object.keys(appearance).length > 0 ? appearance : undefined,
            } as LandingSectionSelection)
          : sec
      );

      let nextPage = { ...p, sections: nextSections };
      if (sectionContent && p.id === pageId) {
        if (typedType === "hero") {
          const prevHero = (p.contentOverrides?.hero ?? {}) as Record<string, unknown>;
          const prevVariants = (prevHero.variants ?? {}) as Record<string, unknown>;
          nextPage = {
            ...nextPage,
            contentOverrides: {
              ...nextPage.contentOverrides,
              hero: {
                ...prevHero,
                content: sectionContent,
                ...(sectionConfig
                  ? { variants: { ...prevVariants, [rawVariant]: sectionConfig } }
                  : {}),
              },
            },
          };
        } else {
          nextPage = {
            ...nextPage,
            contentOverrides: {
              ...nextPage.contentOverrides,
              [typedType]: sectionContent,
            },
          };
        }
      }
      return nextPage;
    });

    let nextProject: WebsiteProjectConfig = { ...project, pages: nextPages };

    // Keep global shared navbar/footer synced when inheriting
    if (
      (typedType === "navbar" || typedType === "footer") &&
      (targetPage.sharedMode?.[typedType] ?? "inherit") === "inherit"
    ) {
      const shared = getEffectiveSharedSections(nextProject);
      if (typedType === "navbar" && sectionContent) {
        const navContent = sectionContent as {
          links?: Array<{ label: string; href: string }>;
          action?: { label?: string };
        };
        nextProject = {
          ...nextProject,
          brand:
            sectionBrand?.name?.trim() && sectionBrand.name !== nextProject.brand.name
              ? { ...nextProject.brand, name: sectionBrand.name.trim() }
              : nextProject.brand,
          contentOverrides: {
            ...nextProject.contentOverrides,
            navbar: sectionContent,
          },
          shared: {
            ...nextProject.shared,
            navbar: {
              ...shared.navbar!,
              selection: {
                type: "navbar",
                variant: rawVariant,
                enabled: true,
                ...(appearance && Object.keys(appearance).length > 0
                  ? { customSettings: appearance }
                  : {}),
              } as unknown as Extract<LandingSectionSelection, { type: "navbar" }>,
              ...(navContent.action?.label ? { actionLabel: navContent.action.label } : {}),
            },
          },
        };
      } else if (typedType === "footer" && sectionContent) {
        nextProject = {
          ...nextProject,
          contentOverrides: {
            ...nextProject.contentOverrides,
            footer: sectionContent,
          },
          shared: {
            ...nextProject.shared,
            footer: {
              ...shared.footer!,
              selection: {
                type: "footer",
                variant: rawVariant,
                enabled: true,
                ...(appearance && Object.keys(appearance).length > 0
                  ? { customSettings: appearance }
                  : {}),
              } as unknown as Extract<LandingSectionSelection, { type: "footer" }>,
            },
          },
        };
      }
    }

    return nextProject;
  }

  // Modular non-landing section props sync
  const rawProps = exportsObj.sectionProps;
  if (!rawProps || typeof rawProps !== "object") return project;
  const propsObj = rawProps as Record<string, unknown>;

  if (sectionType === "not-found") {
    return {
      ...project,
      notFoundConfig: {
        ...((project.notFoundConfig ?? {}) as unknown as Record<string, unknown>),
        ...propsObj,
      } as unknown as WebsiteProjectConfig["notFoundConfig"],
    };
  }
  if (sectionType === "auth") {
    return {
      ...project,
      authConfig: {
        ...(project.authConfig ?? {}),
        ...(typeof propsObj.heading === "string" ? { loginHeading: propsObj.heading } : {}),
        ...(typeof propsObj.subheading === "string"
          ? { loginDescription: propsObj.subheading }
          : {}),
        ...(typeof propsObj.submitLabel === "string"
          ? { loginSubmitLabel: propsObj.submitLabel }
          : {}),
      },
    };
  }
  if (sectionType === "dashboard") {
    return {
      ...project,
      dashboardConfig: {
        ...(project.dashboardConfig ?? ({} as never)),
        ...(typeof propsObj.appTitle === "string" ? { appTitle: propsObj.appTitle } : {}),
        ...(typeof propsObj.welcomeSubtitle === "string"
          ? { welcomeSubtitle: propsObj.welcomeSubtitle }
          : {}),
      },
    };
  }

  // Modular page blocks (pricing-compare, about, blog-index, blog-post, etc.)
  return {
    ...project,
    pages: project.pages.map((p) =>
      p.id === pageId
        ? {
            ...p,
            modularOverrides: {
              ...(p.modularOverrides ?? {}),
              [sectionType]: {
                ...(p.modularOverrides?.[sectionType] ?? {}),
                ...propsObj,
              },
            },
          }
        : p
    ),
  };
}

function trySyncPageOrdering(
  project: WebsiteProjectConfig,
  pageId: string,
  nextCode: string,
  syncedCode: string
): WebsiteProjectConfig | null {
  const page = project.pages.find((p) => p.id === pageId);
  if (!page) return null;

  const parseTagsAndImports = (code: string) => {
    const bodyMarker = code.indexOf("export default function");
    if (bodyMarker === -1) return null;
    const head = code.slice(0, bodyMarker);
    const body = code.slice(bodyMarker);

    const importMap = new Map<string, string>();
    const impRegex = /import\s+([A-Za-z0-9_]+)\s+from\s+["']([^"']+)["'];/g;
    let m: RegExpExecArray | null;
    while ((m = impRegex.exec(head)) !== null) {
      importMap.set(m[1], m[2]);
    }

    const returnMatch =
      /return\s*\(\s*<div\s+className="min-h-screen w-full"\s*>([\s\S]*)<\/div>\s*\)\s*;?\s*\}\s*$/m.exec(
        body
      );
    if (!returnMatch) return null;
    const inner = returnMatch[1]
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "")
      .trim();
    const lines = inner
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const tags: string[] = [];
    for (const line of lines) {
      const tagMatch = /^<([A-Za-z0-9_]+)\s*\/>$/.exec(line);
      if (!tagMatch || !importMap.has(tagMatch[1])) return null;
      tags.push(importMap.get(tagMatch[1])!);
    }
    return tags;
  };

  const nextRelPaths = parseTagsAndImports(nextCode);
  const syncedRelPaths = parseTagsAndImports(syncedCode);
  if (!nextRelPaths || !syncedRelPaths) return null;

  // Map relative path (`../sections/...`) back to LandingSectionType
  const pathToSectionType = new Map<string, LandingSectionType>();
  for (const sec of page.sections) {
    const full = resolveSectionFilePath(project, page.id, sec.type);
    const rel = full.replace(/^src\//, "../").replace(/\.tsx$/, "");
    pathToSectionType.set(rel, sec.type);
  }

  // Only perform structural page sync if all tags correspond cleanly to known sections
  const nextTypes: LandingSectionType[] = [];
  for (const rel of nextRelPaths) {
    const secType = pathToSectionType.get(rel);
    if (!secType) return null;
    nextTypes.push(secType);
  }

  const nextEnabledSet = new Set(nextTypes);
  const byType = new Map(page.sections.map((s) => [s.type, s]));
  const reordered: LandingSectionSelection[] = [];

  const navSec = byType.get("navbar");
  if (navSec) {
    reordered.push({ ...navSec, enabled: nextEnabledSet.has("navbar") });
  }
  for (const t of nextTypes) {
    if (t === "navbar" || t === "footer") continue;
    const existing = byType.get(t);
    if (existing && !reordered.some((r) => r.type === t)) {
      reordered.push({ ...existing, enabled: true });
    }
  }
  for (const sec of page.sections) {
    if (
      sec.type !== "navbar" &&
      sec.type !== "footer" &&
      !reordered.some((r) => r.type === sec.type)
    ) {
      reordered.push({ ...sec, enabled: false });
    }
  }
  const footSec = byType.get("footer");
  if (footSec) {
    reordered.push({ ...footSec, enabled: nextEnabledSet.has("footer") });
  }

  return {
    ...project,
    pages: project.pages.map((p) => (p.id === page.id ? { ...p, sections: reordered } : p)),
  };
}

export function applyLiveCodeChange(
  project: WebsiteProjectConfig,
  fileMeta: WebsiteExportFile,
  nextCode: string
): LiveCodeApplyResult {
  if (fileMeta.syncedContent !== undefined && nextCode === fileMeta.syncedContent) {
    return {
      project: stripCustomFile(project, fileMeta.path),
      status: "synced",
    };
  }

  if (fileMeta.path === "src/data/project.config.json") {
    return applyProjectJsonSync(project, nextCode);
  }
  if (fileMeta.path === "design-tokens.json") {
    return applyTokensJsonSync(project, nextCode);
  }
  if (fileMeta.path === "src/styles/tokens.css") {
    return applyTokensCssSync(project, nextCode);
  }
  if (fileMeta.path === "src/routes.ts") {
    return applyRoutesTsSync(project, nextCode);
  }

  // All TSX files: validate syntax + module imports first via liveTsxSandbox
  const virtualMap = buildVirtualFileMap(project, fileMeta.path, nextCode);
  const compiled = compileTsxSourceToModule(fileMeta.path, virtualMap);
  if (isCompiledError(compiled)) {
    return {
      project,
      status: "error",
      diagnostic: {
        message: compiled.message,
        line: compiled.line,
        column: compiled.column,
      },
    };
  }
  if (!compiled.defaultComponent) {
    return {
      project,
      status: "error",
      diagnostic: {
        message: "File must export a default React component (`export default function ...`).",
        line: 1,
      },
    };
  }

  // Section TSX: attempt 2-way schema prop sync if default export JSX structure wasn't altered
  if (fileMeta.kind === "section" && fileMeta.pageId && fileMeta.sectionType) {
    const bodyMatch =
      fileMeta.syncedContent &&
      normalizeCodeBody(nextCode) === normalizeCodeBody(fileMeta.syncedContent);
    if (bodyMatch) {
      const patched = patchSectionFromEvaluatedExports(
        project,
        fileMeta.pageId,
        fileMeta.sectionType,
        compiled.exports
      );
      if ("error" in patched) {
        return {
          project,
          status: "error",
          diagnostic: { message: patched.error, line: 3 },
        };
      }
      return {
        project: stripCustomFile(patched, fileMeta.path),
        status: "synced",
      };
    }
    return {
      project: withCustomFile(project, fileMeta.path, nextCode),
      status: "custom-tsx",
    };
  }

  // Page TSX: try lightweight section ordering/toggle sync before promoting to Custom TSX
  if (fileMeta.kind === "page" && fileMeta.pageId && fileMeta.syncedContent) {
    const syncedOrder = trySyncPageOrdering(
      project,
      fileMeta.pageId,
      nextCode,
      fileMeta.syncedContent
    );
    if (syncedOrder) {
      return {
        project: stripCustomFile(syncedOrder, fileMeta.path),
        status: "synced",
      };
    }
  }

  return {
    project: withCustomFile(project, fileMeta.path, nextCode),
    status: "custom-tsx",
  };
}
