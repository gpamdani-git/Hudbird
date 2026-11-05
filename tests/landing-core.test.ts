import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { describe, it, expect } from "vitest";

describe("SaaS sections consume Hudbird core", () => {
  for (const name of [
    "LandingNavbar",
    "LandingBuilderShowcase",
    "LandingLogoCloud",
    "LandingBenefits",
    "LandingFeatureShowcase",
    "LandingHowItWorks",
    "LandingIntegrations",
    "LandingTestimonials",
    "LandingPricing",
    "LandingFaq",
    "LandingCta",
    "LandingFooter",
  ]) {
    it(`${name} uses shared Hudbird macro layout and original controls`, () => {
      const file = path.resolve("packages/marketing/src/components", name, "index.tsx");
      const source = fs.readFileSync(file, "utf8");
      expect(source).toMatch(/from ["']@hudbird\/ui["']/);
      expect(source).toMatch(/from ["']\.\.\/LandingShared["']/);
      expect(source).toContain("<LandingFrame");
      const tree = ts.createSourceFile(
        file,
        source,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX
      );
      const forbidden: string[] = [];
      function visit(node: ts.Node) {
        if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
          const tag = node.tagName.getText(tree);
          if (["button", "input", "select", "section", "table"].includes(tag)) forbidden.push(tag);
        }
        ts.forEachChild(node, visit);
      }
      visit(tree);
      expect(forbidden).toEqual([]);
      expect(source).not.toMatch(/className=["'][^"']*\bgrid-cols-/);
    });
  }
  it("the common frame itself uses Section and Container from core", () => {
    const source = fs.readFileSync(
      path.resolve("packages/marketing/src/components/LandingShared/index.tsx"),
      "utf8"
    );
    expect(source).toContain("<Section");
    expect(source).toContain("<Container");
    expect(source).toMatch(/from ["']@hudbird\/ui["']/);
  });
});
