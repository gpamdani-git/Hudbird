import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
import { landingSectionRegistry } from "../packages/marketing/src/components/LandingPage/catalog.ts";
const base = process.env.PILOT_URL || "http://127.0.0.1:3010";
const out = path.resolve("output/playwright/landing-sections");
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.emulateMedia({ reducedMotion: "reduce" });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const results = [];
try {
  for (const definition of landingSectionRegistry)
    for (const variant of definition.variants)
      for (const brand of ["clear-blue", "studio-green"])
        for (const mode of ["light", "dark"])
          for (const width of [375, 768, 1024, 1440]) {
            await page.setViewportSize({ width, height: 900 });
            await page.goto(
              `${base}/#/templates/saas-landing?section=${definition.type}&variant=${variant.id}&brand=${brand}&mode=${mode}`,
              { waitUntil: "domcontentloaded" }
            );
            await page.waitForFunction(
              ({ type, variant, brand, mode }) => {
                const node = document.querySelector("[data-landing-preview-type]");
                return (
                  node?.dataset.landingPreviewType === type &&
                  node?.dataset.landingPreviewVariant === variant &&
                  node?.dataset.brand === brand &&
                  node?.dataset.brandMode === mode
                );
              },
              { type: definition.type, variant: variant.id, brand, mode }
            );
            const layout = await page.evaluate(() => ({
              width: innerWidth,
              scrollWidth: document.documentElement.scrollWidth,
              overflow: [
                ...document.querySelectorAll(
                  "[data-landing-section] h1,[data-landing-section] h2,[data-landing-section] h3"
                ),
              ]
                .filter((node) => {
                  const r = node.getBoundingClientRect();
                  return r.width && (r.right > innerWidth + 1 || r.left < -1);
                })
                .map((node) => node.textContent),
            }));
            assert.ok(
              layout.scrollWidth <= width + 1,
              JSON.stringify({
                section: definition.type,
                variant: variant.id,
                brand,
                mode,
                width,
                layout,
              })
            );
            assert.deepEqual(
              layout.overflow,
              [],
              JSON.stringify({
                section: definition.type,
                variant: variant.id,
                brand,
                mode,
                width,
                layout,
              })
            );
            if (
              brand === "clear-blue" &&
              ((width === 1440 && mode === "light") || (width === 375 && mode === "dark"))
            )
              await page.screenshot({
                path: path.join(out, `${definition.type}-${variant.id}-${mode}-${width}.png`),
                fullPage: true,
              });
            results.push({ section: definition.type, variant: variant.id, brand, mode, width });
          }
  assert.deepEqual(errors, []);
  await fs.writeFile(
    path.join(out, "matrix.json"),
    JSON.stringify(
      {
        checks: results.length,
        variants: landingSectionRegistry.reduce((n, s) => n + s.variants.length, 0),
        results,
        errors,
      },
      null,
      2
    )
  );
  console.log(
    `Passed ${results.length} layout checks for ${landingSectionRegistry.reduce((n, s) => n + s.variants.length, 0)} variants, 2 brands, 2 modes, and 4 viewports.`
  );
} catch (error) {
  console.error({ url: page.url(), errors });
  await page.screenshot({ path: path.join(out, "failure.png"), fullPage: true });
  throw error;
} finally {
  await browser.close();
}
