import { chromium } from '@playwright/test';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  
  await page.goto('https://client-mauve-zeta-13.vercel.app/builder', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2500);

  // Full page screenshot
  await page.screenshot({
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/builder_full_page.png',
    fullPage: true
  });
  console.log('Saved builder_full_page.png');

  // Viewport 1: Header & Vehicle Selector
  await page.screenshot({
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/builder_viewport_top.png'
  });
  console.log('Saved builder_viewport_top.png');

  // Viewport 2: Package Selector
  const pkgSection = page.locator('text=Choose Detailing Tier').first();
  if (await pkgSection.count() > 0) {
    await pkgSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/builder_packages.png'
    });
    console.log('Saved builder_packages.png');
  }

  // Viewport 3: Add-on Selector
  const addonSection = page.locator('text=Optional Atelier Enhancements').first();
  if (await addonSection.count() > 0) {
    await addonSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/builder_addons.png'
    });
    console.log('Saved builder_addons.png');
  }

  await browser.close();
}

capture().catch(console.error);
