const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  const templates = [
    { url: "http://localhost:5173/#/templates/ai-startup", name: "ai-startup" },
    { url: "http://localhost:5173/#/templates/saas-launchpad", name: "saas-launchpad" },
    { url: "http://localhost:5173/#/templates/modern-app", name: "modern-app" },
    { url: "http://localhost:5173/#/templates/enterprise", name: "digital-agency" },
  ];

  for (const t of templates) {
    console.log(`Capturing ${t.name}...`);
    await page.goto(t.url);
    await page.waitForTimeout(3000); // wait for framer motion animations

    // Light mode full screenshot
    await page.emulateMedia({ colorScheme: "light" });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: `public/assets/templates/${t.name}-light-full.png`,
      fullPage: true,
    });

    // Dark mode full screenshot
    await page.emulateMedia({ colorScheme: "dark" });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `public/assets/templates/${t.name}-full.png`, fullPage: true });

    // Thumbnail screenshots (viewport only)
    await page.emulateMedia({ colorScheme: "light" });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `public/assets/templates/${t.name}-light.png` });

    await page.emulateMedia({ colorScheme: "dark" });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `public/assets/templates/${t.name}.png` });
  }

  await browser.close();
  console.log("Done capturing all screenshots!");
})();
