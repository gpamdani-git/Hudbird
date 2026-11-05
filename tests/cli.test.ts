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

  it("ships a self-contained startup pilot with schema, CSS, media, and its Codex skill", () => {
    const registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
    const seen = new Set<string>();
    const visit = (name: string) => {
      if (seen.has(name)) return;
      seen.add(name);
      expect(registry[name], `Missing registry dependency: ${name}`).toBeDefined();
      for (const dependency of registry[name].registryDependencies ?? []) visit(dependency);
      for (const file of registry[name].files)
        expect(file.content).not.toMatch(/(?:from\s+["']|import\s*["'])@hudbird\//);
    };
    visit("StartupPilot");
    expect(seen).toContain("CompositionSchema");
    expect(seen).toContain("HeroSection");
    expect(seen).toContain("Tabs");
    expect(registry.HeroSection.files.map((file: { name: string }) => file.name)).toEqual(
      expect.arrayContaining(["pilot.css", "theme.css"])
    );
    expect(registry.StartupPilot.skill).toContain("name: hudbird-startup-pilot");
    expect(
      registry.StartupPilot.files.find((file: { name: string }) => file.name === "demo-video.ts")
        .content
    ).toContain("data:video/webm;base64,");
  });

  it("resolves every landing section independently and ships the complete builder export", () => {
    const registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
    const sections = [
      "LandingNavbar",
      "HeroSection",
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
    ];
    const resolve = (entry: string) => {
      const seen = new Set<string>();
      const visit = (name: string) => {
        if (seen.has(name)) return;
        seen.add(name);
        expect(registry[name], `Missing registry dependency: ${name}`).toBeDefined();
        for (const dependency of registry[name].registryDependencies ?? []) visit(dependency);
        for (const file of registry[name].files)
          expect(file.content).not.toMatch(/(?:from\s+["']|import\s*["'])@hudbird\//);
      };
      visit(entry);
      return seen;
    };
    for (const section of sections) {
      const dependencies = resolve(section);
      expect(dependencies).toContain("CompositionSchema");
      expect(dependencies).toContain("Section");
      expect(dependencies).toContain("Container");
      expect(dependencies).toContain("HeroSection");
    }
    expect([...resolve("LandingPage")]).toEqual(expect.arrayContaining(sections));
    expect(registry.LandingPage.skillName).toBe("hudbird-landing-sections");
    expect(registry.LandingShared.skill).toContain("name: hudbird-landing-sections");
    expect(registry.HeroSection.files.map((file: { name: string }) => file.name)).toContain(
      "theme.css"
    );
  });
});
