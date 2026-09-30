import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on("console", (msg) => {
    if (msg.type() === "warning" || msg.type() === "error") {
      console.log("BROWSER LOG:", msg.text());
    }
  });

  await page.goto("http://localhost:3001/#/themes");
  await new Promise((r) => setTimeout(r, 2000));

  await browser.close();
})();
