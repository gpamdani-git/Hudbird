import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";
const out = path.resolve("output/playwright/startup-pilot");
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 481, height: 827 } });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
let checks = 0;
try {
  for (const hero of ["centered", "split", "slideshow", "video"])
    for (const mode of ["light", "dark"]) {
      await page.goto(`http://127.0.0.1:3010/#/templates/startup-pilot?hero=${hero}&mode=${mode}`, {
        waitUntil: "networkidle",
      });
      const image = page.locator("#hero img").first();
      await image.waitFor();
      await image.evaluate((img) => img.decode());
      const src = await image.getAttribute("src");
      const svg = decodeURIComponent(src.slice(src.indexOf(",") + 1));
      assert.ok(svg.includes(mode === "dark" ? 'rx="18" fill="#202124"' : 'rx="18" fill="white"'));
      assert.ok(svg.includes(mode === "dark" ? 'fill="#f4f4f5"' : 'fill="#18181b"'));
      if (hero === "video") assert.equal(await page.locator("video").getAttribute("poster"), src);
      if (hero === "slideshow") {
        await page.getByRole("button", { name: "Next slide", exact: true }).click();
        const next = decodeURIComponent(
          (await image.getAttribute("src")).split(",").slice(1).join(",")
        );
        assert.ok(next.includes("Projects"));
        assert.ok(
          next.includes(mode === "dark" ? 'rx="18" fill="#202124"' : 'rx="18" fill="white"')
        );
      }
      if (hero === "centered")
        await page.locator("#hero").screenshot({ path: path.join(out, `artwork-${mode}-481.png`) });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      checks++;
    }
  await page.goto("http://127.0.0.1:3010/#/marketing/hero-pilot", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Dark preview", exact: true }).click();
  await page.waitForFunction(() =>
    [...document.querySelectorAll("figure img")].every((img) =>
      decodeURIComponent(img.getAttribute("src")).includes('rx="18" fill="#202124"')
    )
  );
  await page.getByRole("button", { name: "Light preview", exact: true }).click();
  await page.waitForFunction(() =>
    [...document.querySelectorAll("figure img")].every((img) =>
      decodeURIComponent(img.getAttribute("src")).includes('rx="18" fill="white"')
    )
  );
  assert.deepEqual(errors, []);
  await fs.writeFile(
    path.join(out, "artwork-results.json"),
    JSON.stringify(
      { checks, liveModeSwitch: "passed", slideshow: "passed", videoPoster: "passed", errors },
      null,
      2
    )
  );
  console.log(`Passed ${checks} artwork mode/layout checks plus live theme switching.`);
} finally {
  await browser.close();
}
