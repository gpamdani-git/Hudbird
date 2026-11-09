import React from "react";
import { render, screen } from "@testing-library/react";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import {
  ApplicationPageRenderer,
  applicationUiCatalog,
  createHudbirdStudioCode,
  createHudbirdStudioConfig,
  createHudbirdStudioRecipe,
  hudbirdArchitectureLayers,
  marketingComponentsCatalog,
  MarketingExamplePageRenderer,
  marketingExamplesCatalog,
  moveStudioBlock,
  parseHudbirdStudioConfig,
  SharedPageRenderer,
  sharedPagesCatalog,
  switchStudioApplicationCategory,
  switchStudioMarketingExample,
  switchStudioSharedCategory,
} from "./index";

describe("BlueprintStudio Clean-Room 3-Menu Architecture", () => {
  it("exposes all 4 architecture layers, 6 Application UI categories, 6 Shared Page categories, 18 Marketing component groups, and 10 Marketing examples", () => {
    expect(hudbirdArchitectureLayers).toHaveLength(4);
    expect(applicationUiCatalog).toHaveLength(6);
    expect(sharedPagesCatalog).toHaveLength(6);
    expect(marketingComponentsCatalog).toHaveLength(18);
    expect(marketingExamplesCatalog).toHaveLength(10);
  });

  it("renders Menu 1: Application UI Examples (Sidebar & Stacked shells)", () => {
    const config = createHudbirdStudioConfig();
    const { unmount } = render(
      <ApplicationPageRenderer
        category={config.application.category}
        blocks={config.application.blocks}
        brand={config.brand}
      />
    );
    expect(screen.getByText(/Recurring Revenue & Expansion Velocity/i)).toBeInTheDocument();
    unmount();

    const stackedConfig = switchStudioApplicationCategory(config, "dashboards-stacked");
    render(
      <ApplicationPageRenderer
        category={stackedConfig.application.category}
        blocks={stackedConfig.application.blocks}
        brand={stackedConfig.brand}
      />
    );
    expect(screen.getByText(/Dashboards 02 \(Stacked Header\)/i)).toBeInTheDocument();
  });

  it("renders Menu 2: Shared Page Examples (Login, Verification OTP, 404, Email)", () => {
    const loginConfig = switchStudioSharedCategory(createHudbirdStudioConfig(), "login");
    const { unmount } = render(
      <SharedPageRenderer
        category={loginConfig.shared.category}
        blocks={loginConfig.shared.blocks}
        brand={loginConfig.brand}
      />
    );
    expect(screen.getAllByText(/Sign in to/i).length).toBeGreaterThan(0);
    unmount();

    const otpConfig = switchStudioSharedCategory(createHudbirdStudioConfig(), "verification");
    render(
      <SharedPageRenderer
        category={otpConfig.shared.category}
        blocks={otpConfig.shared.blocks}
        brand={otpConfig.brand}
      />
    );
    expect(screen.getByText(/Verify your security token/i)).toBeInTheDocument();
  });

  it("renders Menu 3: Marketing Examples across extended templates", () => {
    const aboutConfig = switchStudioMarketingExample(createHudbirdStudioConfig(), "about-pages");
    render(
      <MarketingExamplePageRenderer
        exampleSlug={aboutConfig.marketing.exampleSlug}
        blocks={aboutConfig.marketing.extendedBlocks}
        brand={aboutConfig.brand}
        landingConfig={aboutConfig.marketing.landingConfig}
      />
    );
    expect(screen.getByText(/Open Engineering & Design Roles/i)).toBeInTheDocument();
  });

  it("reorders blocks, round-trips studio recipes, and compiles generated TSX for all 3 domains without diagnostics", () => {
    const base = createHudbirdStudioConfig();
    const reordered = moveStudioBlock(base.application.blocks, 2, "down");
    expect(reordered[3]?.type).toBe(base.application.blocks[2]?.type);

    const recipe = createHudbirdStudioRecipe(base);
    const parsed = parseHudbirdStudioConfig(JSON.stringify(recipe));
    expect(parsed.warnings).toHaveLength(0);
    expect(parsed.config.domain).toBe("application-ui");

    const domains = ["application-ui", "shared-pages", "marketing"] as const;
    for (const domain of domains) {
      const domainConfig = createHudbirdStudioConfig({ domain });
      const code = createHudbirdStudioCode(domainConfig);
      const transpiled = ts.transpileModule(code, {
        compilerOptions: {
          jsx: ts.JsxEmit.ReactJSX,
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ES2022,
        },
        reportDiagnostics: true,
      });
      expect(transpiled.diagnostics ?? []).toHaveLength(0);
    }
  });
});
