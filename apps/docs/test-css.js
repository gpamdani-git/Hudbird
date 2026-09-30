import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3001/#/themes");
  await new Promise((r) => setTimeout(r, 2000));

  const rules = await page.evaluate(() => {
    let output = "";
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText === ":root") {
            output += rule.cssText + "\n";
          }
          if (rule.selectorText === ".bg-primary") {
            output += rule.cssText + "\n";
          }
        }
      } catch (_) {
        // Ignore CORS errors from cross-origin stylesheets
      }
    }
    return output;
  });
  console.log(rules);

  await browser.close();
})();
