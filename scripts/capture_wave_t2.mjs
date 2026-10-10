import { chromium } from '@playwright/test';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

  console.log('Navigating to live DD-DEMO01...');
  await page.goto('https://client-mauve-zeta-13.vercel.app/track/DD-DEMO01', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Scroll down to capture the newly activated Chronological Audit Trail & Concierge Strip
  await page.evaluate(() => window.scrollBy(0, 2400));
  await page.waitForTimeout(1000);
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/track_wave_t2_audit_and_concierge.png',
    fullPage: false 
  });
  console.log('Saved track_wave_t2_audit_and_concierge.png');

  // 2. Open the Smartphone Simulator modal
  await page.evaluate(() => window.scrollBy(0, -600));
  await page.waitForTimeout(500);
  const simulateBtn = page.getByRole('button', { name: /Simulate Phone Notification/i });
  await simulateBtn.click();
  await page.waitForTimeout(1000);

  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/track_wave_t2_phone_modal.png',
    fullPage: false 
  });
  console.log('Saved track_wave_t2_phone_modal.png');

  await browser.close();
}

capture().catch(console.error);
