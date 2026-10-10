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

  // Step 2 -> Step 3
  await page.locator('button:has-text("Continue to Vehicle Intake")').first().click();
  await page.waitForTimeout(1500);

  // Capture Step 3 (Vehicle Intake & Payment Preferences)
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/booking_step3_refined.png',
    fullPage: false 
  });
  console.log('Saved booking_step3_refined.png');

  // Fill in vehicle and client form
  await page.locator('input[placeholder="e.g. Porsche"]').fill('Porsche');
  await page.locator('input[placeholder="e.g. 911 GT3 RS"]').fill('911 GT3 RS (Weissach Package)');
  await page.locator('input[placeholder="e.g. 2024"]').fill('2025');

  await page.locator('input[placeholder="e.g. Alexander Rivera"]').fill('Julian Sterling');
  await page.locator('input[placeholder="e.g. alex@example.com"]').fill('julian.sterling@atelier-concourse.com');
  await page.locator('input[placeholder="e.g. (512) 555-0199"]').fill('(512) 890-4411');

  // Submit booking
  const submitBtn = page.locator('button:has-text("Confirm & Reserve Slot")').first();
  await submitBtn.click();

  // Wait for Step 4 Confirmation Screen
  await page.waitForSelector('text=Appointment Confirmed & Secured', { timeout: 15000 });
  await page.waitForTimeout(1500);

  // Capture Step 4 Confirmation
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/booking_step4_confirmed.png',
    fullPage: false 
  });
  console.log('Saved booking_step4_confirmed.png');

  await browser.close();
}

capture().catch(console.error);
