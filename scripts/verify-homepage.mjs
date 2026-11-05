import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

const base = process.env.HOMEPAGE_URL || "http://127.0.0.1:3000";
const out = path.resolve("output/playwright/homepage");
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));

function channel(value) {
  const normalized = value / 255;
  return normalized <= 0.03928
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}
function contrast(foreground, background) {
  const fg = foreground.match(/\d+(?:\.\d+)?/g).slice(0, 3).map(Number);
  const bg = background.match(/\d+(?:\.\d+)?/g).slice(0, 3).map(Number);
  const fgL = 0.2126 * channel(fg[0]) + 0.7152 * channel(fg[1]) + 0.0722 * channel(fg[2]);
  const bgL = 0.2126 * channel(bg[0]) + 0.7152 * channel(bg[1]) + 0.0722 * channel(bg[2]);
  return (Math.max(fgL, bgL) + 0.05) / (Math.min(fgL, bgL) + 0.05);
}

try {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.removeItem("theme"));
  await page.reload({ waitUntil: "networkidle" });
  await page.locator("[data-landing-page][data-brand-mode='dark']").waitFor();
  await page.getByRole("button", { name: "Use light theme" }).click();
  assert.equal(await page.evaluate(() => localStorage.getItem("theme")), "light");
  await page.reload({ waitUntil: "networkidle" });
  await page.locator("[data-landing-page][data-brand-mode='light']").waitFor();

  for (const mode of ["light", "dark"])
    for (const width of [375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 950 });
      await page.evaluate((value) => localStorage.setItem("theme", value), mode);
      await page.reload({ waitUntil: "networkidle" });
      await page.locator(`[data-landing-page][data-brand-mode='${mode}']`).waitFor();
      const layout = await page.evaluate(() => {
        const brand = document.querySelector("[data-landing-page]");
        const h1 = document.querySelector("h1");
        const tabs = [...document.querySelectorAll('[role="tab"] span')].filter(
          (node) => node.scrollWidth > node.clientWidth + 1
        );
        const clippedHeadings = [...document.querySelectorAll("h1,h2,h3")].filter((node) => {
          const rect = node.getBoundingClientRect();
          return rect.left < -1 || rect.right > innerWidth + 1;
        });
        return {
          overflow: document.documentElement.scrollWidth - innerWidth,
          h1Count: document.querySelectorAll("h1").length,
          clippedTabs: tabs.map((node) => node.textContent),
          clippedHeadings: clippedHeadings.map((node) => node.textContent),
          headingColor: h1 ? getComputedStyle(h1).color : "",
          background: brand ? getComputedStyle(brand).backgroundColor : "",
        };
      });
      assert.ok(layout.overflow <= 1, JSON.stringify({ mode, width, layout }));
      assert.equal(layout.h1Count, 1, JSON.stringify({ mode, width, layout }));
      assert.deepEqual(layout.clippedTabs, [], JSON.stringify({ mode, width, layout }));
      assert.deepEqual(layout.clippedHeadings, [], JSON.stringify({ mode, width, layout }));
      assert.ok(
        contrast(layout.headingColor, layout.background) >= 4.5,
        JSON.stringify({ mode, width, layout })
      );
      if (width === 375 || width === 1440)
        await page.screenshot({
          path: path.join(out, `${mode}-${width}.png`),
          fullPage: true,
        });
    }

  await page.setViewportSize({ width: 1024, height: 950 });
  const navLogo = page.getByRole("link", { name: "Hudbird UI home" }).locator("img");
  assert.equal(await navLogo.getAttribute("src"), "/assets/logo/hudbird-logo-white.png");
  assert.equal(await page.locator("#hero .hw-slot").count(), 12);
  assert.equal(await page.getByRole("link", { name: "Get Started", exact: true }).getAttribute("href"), "/#/marketing/landing-builder");
  await page.getByRole("tab", { name: "Centered" }).click();
  await page.locator("[data-builder-preview='centered']").waitFor();
  assert.equal(
    await page.locator("[data-builder-preview='centered']").getAttribute("data-brand"),
    "hudbird-home"
  );
  const proofImages = await page.locator('img[alt^="Hudbird page builder"], img[alt^="React source"]').all();
  assert.ok(proofImages.length >= 3);
  for (const image of proofImages) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((node) => {
      if (!(node instanceof HTMLImageElement) || !node.complete || node.naturalWidth === 0)
        throw new Error(`Product proof image failed to load: ${node.getAttribute("src")}`);
    });
  }
  const hrefs = await page.locator("a").evaluateAll((anchors) =>
    anchors.map((anchor) => anchor.getAttribute("href")).filter(Boolean)
  );
  for (const href of [
    "/#/docs",
    "/#/marketing/landing-sections",
    "/#/marketing/landing-builder",
    "https://github.com/gpamdani-git/Hudbird",
    "https://danihudbird.gumroad.com/l/hudbirdui-pro-allaccess",
  ])
    assert.ok(hrefs.includes(href), `Missing homepage destination ${href}`);

  await page.goto(`${base}/#/templates/ai-startup`, { waitUntil: "networkidle" });
  await page.locator("h1").first().waitFor();
  assert.deepEqual(errors, []);
  await fs.writeFile(
    path.join(out, "results.json"),
    JSON.stringify(
      {
        themes: ["system", "light", "dark"],
        viewports: [375, 768, 1024, 1440],
        contrast: "WCAG AA heading check passed",
        builderVariant: "passed",
        links: "passed",
        legacyTemplate: "passed",
        reducedMotion: "passed",
        errors,
      },
      null,
      2
    )
  );
  console.log("Homepage theme, responsive layout, builder, links, contrast, and legacy template passed.");
} finally {
  await browser.close();
}
