import { chromium } from '@playwright/test';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1150 } });

  await page.goto('https://client-mauve-zeta-13.vercel.app/book', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Step 1 -> Step 2
  await page.locator('button:has-text("Continue to Date & Bay Selection")').first().click();
  await page.waitForTimeout(1000);

  // Click Thursday 15
  await Promise.all([
    page.waitForResponse(resp => resp.url().includes('/availability') && resp.url().includes('2026-10-15')),
    page.locator('button:has-text("15")').first().click()
  ]);
  await page.waitForTimeout(1000);

  // Select 09:00 AM
  await page.locator('button:not([disabled]):has-text("09:00 AM")').first().click();
  await page.waitForTimeout(500);

  // Scroll down slightly so the confirmation strip and Continue button are in view
  await page.evaluate(() => window.scrollBy(0, 200));
  await page.waitForTimeout(500);

  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/booking_step2_selected_full.png',
    fullPage: false 
  });
  console.log('Saved booking_step2_selected_full.png');

  await browser.close();
}

capture().catch(console.error);
