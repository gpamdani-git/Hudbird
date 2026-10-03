const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1080 }
  });

  const templates = [
    { url: 'http://localhost:5174/saas-launchpad', name: 'saas-launchpad' },
    { url: 'http://localhost:5174/ai-startup', name: 'ai-startup' },
    { url: 'http://localhost:5174/modern-app', name: 'modern-app' },
    { url: 'http://localhost:5174/ecommerce', name: 'ecommerce' },
    { url: 'http://localhost:5174/fintech', name: 'fintech' },
    { url: 'http://localhost:5174/hospitality', name: 'hospitality' },
    { url: 'http://localhost:5174/agency', name: 'agency' },
    { url: 'http://localhost:5174/dashboard', name: 'admin-cms' },
  ];

  for (const t of templates) {
    console.log(`Capturing ${t.name}...`);
    await page.goto(t.url);
    // Wait longer for animations to finish
    await page.waitForTimeout(4000); 
    
    // Thumbnail screenshots (viewport only)
    await page.emulateMedia({ colorScheme: 'light' });
    // Reset background to light in case it got stuck (since AiStartup forces dark)
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = '#ffffff';
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `starter-kits/pro-templates/public/assets/templates/${t.name}-light.png` });

    await page.emulateMedia({ colorScheme: 'dark' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#030712'; // Zinc 950
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `starter-kits/pro-templates/public/assets/templates/${t.name}.png` });
  }

  await browser.close();
  console.log("Done capturing all screenshots for Pro Templates!");
})();
