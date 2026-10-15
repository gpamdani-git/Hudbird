import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Hudbird UI CLI & Registry Validation", () => {
  const registryPath = path.resolve(__dirname, "../packages/cli/templates/registry.json");

  it("loads registry.json with valid schema and non-empty components", () => {
    expect(fs.existsSync(registryPath)).toBe(true);
    const registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
    const keys = Object.keys(registry);

    expect(keys.length).toBeGreaterThanOrEqual(60);
    expect(registry["Button"]).toBeDefined();
    expect(registry["Form"]).toBeDefined();
    expect(registry["InputOTP"]).toBeDefined();
    expect(registry["Slot"]).toBeDefined();
    expect(registry["Hero"]).toBeDefined();
  });

  it("validates that all registry components contain files and valid categories", () => {
    const registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
    const validCategories = [
      "primitives",
      "forms",
      "navigation",
      "feedback",
      "data",
      "charts",
      "marketing",
      "components",
    ];

    for (const [name, item] of Object.entries<any>(registry)) {
      if (name === "utils") continue;
      expect(item.name).toBe(name);
      expect(Array.isArray(item.files)).toBe(true);
      expect(item.files.length).toBeGreaterThan(0);
      expect(validCategories).toContain(item.category);
    }
  });

  it("verifies dependency linkage (e.g. Button and Form require Slot)", () => {
    const registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
    expect(registry["Button"].registryDependencies).toContain("Slot");
    expect(registry["Form"].registryDependencies).toContain("Slot");
  });
});
