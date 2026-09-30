import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3001/#/themes");
  await new Promise((r) => setTimeout(r, 2000));

  const rules = await page.evaluate(() => {
    let result = "";
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules)) {
          if (rule.cssText.includes("--color-primary-600")) {
            result += rule.cssText + "\n";
          }
        }
      } catch (_) {
        // Ignore CORS errors from cross-origin stylesheets
      }
    }
    return result;
  });
  console.log("CSS Rules containing --color-primary-600:\n", rules);

  await browser.close();
})();
