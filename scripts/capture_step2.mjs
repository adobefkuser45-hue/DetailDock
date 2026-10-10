import { chromium } from '@playwright/test';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

  await page.goto('https://client-mauve-zeta-13.vercel.app/book', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Step 1 -> Step 2
  await page.locator('button:has-text("Continue to Date & Bay Selection")').first().click();
  
  // Wait for initial availability API call for Oct 12 to settle
  await page.waitForResponse(resp => resp.url().includes('/availability') && resp.status() === 200).catch(() => {});
  await page.waitForTimeout(1000);

  // Capture 1: Fully committed day (Oct 12) showing guidance banner & status
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/booking_step2_committed.png',
    fullPage: false 
  });
  console.log('Saved booking_step2_committed.png');

  // Click Thursday 15 (which has all dual bays completely open)
  const [response] = await Promise.all([
    page.waitForResponse(resp => resp.url().includes('/availability') && resp.url().includes('2026-10-15')),
    page.locator('button:has-text("15")').first().click()
  ]);
  await page.waitForTimeout(1200);

  // Select 09:00 AM slot
  const slot09 = page.locator('button:not([disabled]):has-text("09:00 AM")').first();
  await slot09.click();
  await page.waitForTimeout(600);

  // Capture 2: Available day with selected slot
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/booking_step2_available.png',
    fullPage: false 
  });
  console.log('Saved booking_step2_available.png');

  await browser.close();
}

capture().catch(console.error);
