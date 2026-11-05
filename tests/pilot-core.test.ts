import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";

describe("Hudbird component-to-block architecture", () => {
  for (const [file, required] of [
    ["HeroSection/HeroSection.tsx", ["Section", "Container", "Grid", "Button", "Heading", "Text"]],
    [
      "HeroSection/ProductDemo.tsx",
      ["Card", "CardHeader", "CardBody", "Tabs", "TabList", "Tab", "TabPanel"],
    ],
    [
      "StartupPilot/StartupPage.tsx",
      ["Section", "Container", "Grid", "Button", "Accordion", "AccordionItem"],
    ],
  ] as const) {
    it(`${file} composes Hudbird primitives rather than standalone replacements`, () => {
      const source = fs.readFileSync(
        path.resolve("packages/marketing/src/components", file),
        "utf8"
      );
      const tree = ts.createSourceFile(
        file,
        source,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX
      );
      const imports = tree.statements
        .filter(ts.isImportDeclaration)
        .find(
          (statement) =>
            ts.isStringLiteral(statement.moduleSpecifier) &&
            statement.moduleSpecifier.text === "@hudbird/ui"
        );
      expect(imports).toBeDefined();
      for (const name of required)
        expect(imports!.getText(tree)).toMatch(new RegExp(`\\b${name}\\b`));
      const rawControls: string[] = [];
      function visit(node: ts.Node) {
        if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
          const tag = node.tagName.getText(tree);
          if (["button", "input", "select", "section"].includes(tag)) rawControls.push(tag);
        }
        ts.forEachChild(node, visit);
      }
      visit(tree);
      expect(rawControls).toEqual([]);
      expect(source).not.toMatch(/className=["'][^"']*\bgrid-cols-/);
    });
  }
});
