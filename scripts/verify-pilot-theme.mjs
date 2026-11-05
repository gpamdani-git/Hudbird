import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const base = process.env.PILOT_URL || "http://127.0.0.1:3010";
const out = path.resolve("output/playwright/startup-pilot");
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1414, height: 900 },
  ignoreHTTPSErrors: true,
});
await context.addInitScript(() => localStorage.setItem("theme", "dark"));
const page = await context.newPage();
await page.emulateMedia({ reducedMotion: "reduce" });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
async function expectMode(mode) {
  await page.waitForFunction(
    (expected) =>
      [...document.querySelectorAll("[data-brand-mode]")].length >= 5 &&
      [...document.querySelectorAll("[data-brand-mode]")].every(
        (node) => node.dataset.brandMode === expected
      ),
    mode
  );
}
async function cardColors() {
  return page
    .locator('[data-hudbird-block="product-demo"]')
    .first()
    .evaluate((node) => {
      const rgb = (color) => {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3);
      };
      return {
        background: rgb(getComputedStyle(node).backgroundColor),
        heading: rgb(getComputedStyle(node.querySelector("h3")).color),
        paragraph: rgb(getComputedStyle(node.querySelector("p")).color),
      };
    });
}
try {
  await page.goto(`${base}/#/marketing/hero-pilot`, { waitUntil: "networkidle" });
  await expectMode("dark");
  assert.equal(
    await page
      .getByRole("button", { name: "Follow website", exact: true })
      .getAttribute("aria-pressed"),
    "true"
  );
  await page.getByRole("button", { name: "Choose product first", exact: true }).click();
  await expectMode("dark");
  let colors = await cardColors();
  assert.ok(
    colors.background.every((channel) => channel < 30),
    JSON.stringify(colors)
  );
  assert.deepEqual(colors.heading, [244, 244, 245]);
  await page.screenshot({ path: path.join(out, "theme-follow-dark.png"), fullPage: false });

  await page.getByRole("button", { name: "Light preview", exact: true }).click();
  await expectMode("light");
  colors = await cardColors();
  assert.deepEqual(colors.heading, [24, 24, 27]);
  assert.deepEqual(colors.paragraph, [82, 82, 91]);
  assert.ok(
    colors.background.every((channel) => channel > 250),
    JSON.stringify(colors)
  );
  await page
    .locator('[data-hudbird-block="product-demo"]')
    .first()
    .screenshot({ path: path.join(out, "light-card-inside-dark-site.png") });
  await page.getByRole("button", { name: "Gather", exact: true }).click();
  await expectMode("light");
  await page.getByRole("button", { name: "Follow website", exact: true }).click();
  await expectMode("dark");

  await page.evaluate(() => document.documentElement.classList.remove("dark"));
  await expectMode("light");
  await page.evaluate(() => document.documentElement.classList.add("dark"));
  await expectMode("dark");
  await page.getByRole("combobox", { name: "Brand font", exact: true }).click();
  await page.getByRole("option", { name: "Poppins", exact: true }).click();
  await page.waitForFunction(() =>
    [...document.querySelectorAll("[data-brand]")].every((node) =>
      getComputedStyle(node).fontFamily.includes("Poppins")
    )
  );
  const link = page.locator('link[id^="hudbird-google-font-Poppins"]');
  assert.equal(await link.count(), 1);
  assert.match(await link.getAttribute("href"), /fonts.googleapis.com\/css2/);
  const previewUrl = await page
    .getByRole("link", { name: "Open full preview" })
    .first()
    .getAttribute("href");
  assert.ok(previewUrl.includes("font=Poppins"));
  const download = await page
    .getByRole("link", { name: "Download brand and composition" })
    .getAttribute("href");
  const exported = JSON.parse(decodeURIComponent(download.split(",").slice(1).join(",")));
  assert.equal(exported.brand.googleFont, "Poppins");
  assert.equal(exported.brand.mode, "dark");
  const preview = await context.newPage();
  await preview.goto(`${base}${previewUrl}`, { waitUntil: "networkidle" });
  assert.equal(await preview.locator("[data-brand-mode]").getAttribute("data-brand-mode"), "dark");
  assert.match(
    await preview
      .getByRole("heading", { level: 1 })
      .evaluate((node) => getComputedStyle(node).fontFamily),
    /Poppins/
  );
  await preview.close();
  await page.waitForFunction(
    () =>
      [...document.fonts].some(
        (font) => font.family.replace(/["']/g, "") === "Poppins" && font.status === "loaded"
      ),
    {},
    { timeout: 20000 }
  );
  await page.getByRole("button", { name: "Dark preview", exact: true }).click();
  await page.evaluate(() => document.documentElement.classList.remove("dark"));
  await expectMode("dark");
  colors = await cardColors();
  assert.ok(colors.background.every((channel) => channel < 30));
  assert.deepEqual(colors.heading, [244, 244, 245]);
  await page.getByRole("button", { name: "Follow website", exact: true }).click();
  await expectMode("light");
  await page.setViewportSize({ width: 375, height: 900 });
  await page.waitForFunction(() => document.documentElement.scrollWidth <= innerWidth + 1);
  assert.deepEqual(errors, []);
  await fs.writeFile(
    path.join(out, "theme-font-results.json"),
    JSON.stringify(
      {
        autoModes: "passed",
        oppositeThemeIsolation: "passed",
        brandPresetPreservesMode: "passed",
        fontLoading: "Poppins loaded from Google Fonts",
        previewAndExport: "passed",
        mobile: "passed",
        errors,
      },
      null,
      2
    )
  );
  console.log(
    "Theme synchronization, light-card contrast in a dark site, Google Font loading, preview/export, and mobile checks passed."
  );
} catch (error) {
  console.error(error);
  await page.screenshot({ path: path.join(out, "theme-font-failure.png"), fullPage: false });
  process.exitCode = 1;
} finally {
  await browser.close();
}
