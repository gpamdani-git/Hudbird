import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3001/#/themes");
  await new Promise((r) => setTimeout(r, 2000));

  // Get color of a primary button before change
  const beforeColor = await page.evaluate(() => {
    const btn = document.querySelector("button.bg-primary");
    return btn ? window.getComputedStyle(btn).backgroundColor : null;
  });
  console.log("BEFORE Color:", beforeColor);

  // Click a color in the theme editor
  await page.evaluate(() => {
    // Assuming there's a button to change color
    const stoneBtn = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent === "Stone"
    );
    if (stoneBtn) stoneBtn.click();

    // Or Red primary color
    const redBtn = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent === "Red"
    );
    if (redBtn) redBtn.click();
  });

  await new Promise((r) => setTimeout(r, 1000));

  // Get color after change
  const afterColor = await page.evaluate(() => {
    const btn = document.querySelector("button.bg-primary");
    return btn ? window.getComputedStyle(btn).backgroundColor : null;
  });
  console.log("AFTER Color:", afterColor);

  await browser.close();
})();
