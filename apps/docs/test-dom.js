import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3001/#/themes");
  await new Promise((r) => setTimeout(r, 2000));

  const len = await page.evaluate(() => {
    const el = document.querySelector("[data-theme-preview]");
    return el ? el.innerHTML.length : -1;
  });
  console.log("PREVIEW HTML length:", len);

  const btns = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("button"))
      .map((b) => b.innerText)
      .slice(0, 10);
  });
  console.log("Buttons:", btns);

  await browser.close();
})();
