import { chromium } from '@playwright/test';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  
  await page.goto('https://client-mauve-zeta-13.vercel.app/book', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Step 1 -> Step 2
  await page.locator('button:has-text("Continue to Date & Bay Selection")').first().click();
  await page.waitForTimeout(1500);

  // In Step 2, find first date that has open slots (e.g. day 14 or 15)
  const dateButtons = page.locator('div.grid button');
  const count = await dateButtons.count();
  for (let i = 0; i < count; i++) {
    await dateButtons.nth(i).click();
    await page.waitForTimeout(500);
    const availableSlot = page.locator('button:not([disabled]):has-text("Bay")').first();
    if (await availableSlot.isVisible().catch(() => false)) {
      await availableSlot.click();
      await page.waitForTimeout(500);
      break;
    }
  }

  // Click 'Continue to Vehicle Intake'
  const nextBtn = page.locator('button:has-text("Continue to Vehicle Intake")').first();
  await nextBtn.click();
  await page.waitForTimeout(1500);

  // Screenshot Step 3
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/booking_step3.png',
    fullPage: false 
  });
  console.log('Saved new booking_step3.png successfully!');

  await browser.close();
}

capture().catch(console.error);
