import { chromium } from '@playwright/test';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  await page.goto('https://client-mauve-zeta-13.vercel.app', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  
  // Click navbar Services anchor
  const servicesLink = page.locator('header a[href*="services"]').first();
  await servicesLink.click();
  await page.waitForTimeout(1500);

  const scrollY = await page.evaluate(() => window.scrollY);
  const sectionRect = await page.locator('#services').evaluate(el => el.getBoundingClientRect());
  const headerRect = await page.locator('#services h2').evaluate(el => el.getBoundingClientRect());
  const badgeRect = await page.locator('#services .inline-flex').first().evaluate(el => el.getBoundingClientRect());
  const navRect = await page.locator('header').first().evaluate(el => el.getBoundingClientRect());
  console.log(JSON.stringify({ scrollY, sectionRect, headerRect, badgeRect, navRect }, null, 2));

  // Screenshot user viewport
  await page.screenshot({ path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/wave4_services_after_click.png' });
  await browser.close();
}

run().catch(console.error);
