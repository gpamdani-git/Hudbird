const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  const templates = [
    { url: 'http://localhost:5173/#/templates/ai-startup', name: 'ai-startup' },
    { url: 'http://localhost:5173/#/templates/saas-launchpad', name: 'saas-launchpad' },
    { url: 'http://localhost:5173/#/templates/modern-app', name: 'modern-app' },
    { url: 'http://localhost:5173/#/templates/enterprise', name: 'digital-agency' }
  ];

  for (const t of templates) {
    console.log(`Capturing ${t.name}...`);
    await page.goto(t.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    await page.emulateMedia({ colorScheme: 'light' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `public/assets/templates/${t.name}-light-full.png`, fullPage: true });

    await page.emulateMedia({ colorScheme: 'dark' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `public/assets/templates/${t.name}-full.png`, fullPage: true });
    
    await page.emulateMedia({ colorScheme: 'light' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `public/assets/templates/${t.name}-light.png` });

    await page.emulateMedia({ colorScheme: 'dark' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `public/assets/templates/${t.name}.png` });
  }

  await browser.close();
  console.log("Done capturing all screenshots!");
})();
