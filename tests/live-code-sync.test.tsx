import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  createModularWebsiteProjectFiles,
  createWebsiteStarterPack,
  resolvePageContent,
  resolvePageFilePath,
  resolveSectionFilePath,
  WebsiteProjectPage,
} from "@hudbird/marketing";
import {
  applyLiveCodeChange,
  revertCustomFileToSynced,
} from "../apps/docs/src/components/builder/liveCodeSync";
import { createSandboxRenderHooks } from "../apps/docs/src/components/builder/liveSandboxRenderer";

describe("Modular live coding & 2-way sync engine", () => {
  it("generates genuine modular per-page and per-section TSX files alongside tokens & data", () => {
    const project = createWebsiteStarterPack("saas-complete");
    const files = createModularWebsiteProjectFiles(project);
    const paths = files.map((f) => f.path);

    expect(paths).toContain("src/App.tsx");
    expect(paths).toContain("src/pages/HomePage.tsx");
    expect(paths).toContain("src/sections/shared/NavbarSection.tsx");
    expect(paths).toContain("src/sections/home/HeroSection.tsx");
    expect(paths).toContain("src/sections/home/BenefitsSection.tsx");
    expect(paths).toContain("src/styles/tokens.css");
    expect(paths).toContain("src/data/project.config.json");
    expect(paths).toContain("design-tokens.json");

    const heroFile = files.find((f) => f.path === "src/sections/home/HeroSection.tsx")!;
    expect(heroFile.kind).toBe("section");
    expect(heroFile.content).toContain("export const sectionVariant");
    expect(heroFile.content).toContain("<HeroSection");
  });

  it("reverse-syncs sectionVariant and sectionContent edits back to WebsiteProjectConfig cleanly (2-way)", () => {
    const project = createWebsiteStarterPack("saas-complete");
    const files = createModularWebsiteProjectFiles(project);
    const heroPath = resolveSectionFilePath(project, "home", "hero");
    const heroFile = files.find((f) => f.path === heroPath)!;

    const editedCode = heroFile.content
      .replace(`"split" as const`, `"centered" as const`)
      .replace("Make room for your next idea.", "Live Coded Hero Title");

    const res = applyLiveCodeChange(project, heroFile, editedCode);
    expect(res.status).toBe("synced");
    expect(res.project.customFiles).toBeUndefined();

    const homePage = res.project.pages.find((p) => p.id === "home")!;
    const heroSel = homePage.sections.find((s) => s.type === "hero")!;
    expect(heroSel.variant).toBe("centered");
    expect(resolvePageContent(res.project, homePage).hero.content.title).toBe(
      "Live Coded Hero Title"
    );
  });

  it("promotes freeform JSX/Hook edits to Custom TSX Override, compiles via Sucrase, and renders live inside WebsiteProjectPage", () => {
    const project = createWebsiteStarterPack("saas-complete");
    const files = createModularWebsiteProjectFiles(project);
    const heroFile = files.find((f) => f.path === "src/sections/home/HeroSection.tsx")!;

    const customCode = `import { useState } from "react";
import { Badge, Heading } from "@hudbird/ui";

export default function HomeHeroSection() {
  const [tag] = useState("Live Custom Runtime");
  return (
    <section className="py-12 text-center">
      <Badge color="primary">{tag}</Badge>
      <Heading as="h1">Engineered in Live Code</Heading>
    </section>
  );
}
`;

    const res = applyLiveCodeChange(project, heroFile, customCode);
    expect(res.status).toBe("custom-tsx");
    expect(res.project.customFiles?.[heroFile.path]).toBe(customCode);

    const hooks = createSandboxRenderHooks(res.project);
    render(
      <WebsiteProjectPage
        project={res.project}
        pageId="home"
        interactionMode="navigate"
        renderCustomPage={hooks.renderCustomPage}
        renderCustomSection={hooks.renderCustomSection}
        onNavigate={vi.fn()}
      />
    );

    expect(screen.getByText("Live Custom Runtime")).toBeInTheDocument();
    expect(screen.getByText("Engineered in Live Code")).toBeInTheDocument();

    // Reverting restores synced cleanly
    const reverted = revertCustomFileToSynced(res.project, heroFile.path);
    expect(reverted.customFiles).toBeUndefined();
  });

  it("holds last valid project state and returns diagnostic line when TSX has syntax errors", () => {
    const project = createWebsiteStarterPack("saas-complete");
    const files = createModularWebsiteProjectFiles(project);
    const heroFile = files.find((f) => f.path === "src/sections/home/HeroSection.tsx")!;

    const brokenCode = `import { Heading } from "@hudbird/ui";
export default function HomeHeroSection() {
  return <Heading>Unclosed tag;
}`;

    const res = applyLiveCodeChange(project, heroFile, brokenCode);
    expect(res.status).toBe("error");
    expect(res.diagnostic?.message).toBeTruthy();
    expect(res.project).toBe(project);
  });

  it("syncs tokens.css variables back to brand tokens and validates 6-digit hex colors", () => {
    const project = createWebsiteStarterPack("saas-complete");
    const files = createModularWebsiteProjectFiles(project);
    const cssFile = files.find((f) => f.path === "src/styles/tokens.css")!;

    const nextCss = cssFile.content.replace(
      /--hb-accent:\s*#[0-9a-fA-F]{6};/g,
      "--hb-accent: #e11d48;"
    );
    const okRes = applyLiveCodeChange(project, cssFile, nextCss);
    expect(okRes.status).toBe("synced");
    expect(okRes.project.brand.primary).toBe("#e11d48");

    const badCss = cssFile.content.replace(/--hb-accent:\s*#[0-9a-fA-F]{6};/g, "--hb-accent: #e1;");
    const errRes = applyLiveCodeChange(project, cssFile, badCss);
    expect(errRes.status).toBe("error");
    expect(errRes.project.brand.primary).toBe(project.brand.primary);
  });

  it("syncs page section ordering cleanly when sections are reordered in HomePage.tsx", () => {
    const project = createWebsiteStarterPack("saas-complete");
    const files = createModularWebsiteProjectFiles(project);
    const homePagePath = resolvePageFilePath(project, "home");
    const pageFile = files.find((f) => f.path === homePagePath)!;

    // Move <FaqSection /> right after <HeroSection />
    const editedPage = pageFile.content
      .replace("      <FaqSection />\n", "")
      .replace("      <HeroSection />\n", "      <HeroSection />\n      <FaqSection />\n");

    const res = applyLiveCodeChange(project, pageFile, editedPage);
    expect(res.status).toBe("synced");
    const home = res.project.pages.find((p) => p.id === "home")!;
    const heroIdx = home.sections.findIndex((s) => s.type === "hero");
    const faqIdx = home.sections.findIndex((s) => s.type === "faq");
    expect(faqIdx).toBe(heroIdx + 1);
  });
});
