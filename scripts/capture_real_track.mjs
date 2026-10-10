import { chromium } from '@playwright/test';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

  await page.goto('https://client-mauve-zeta-13.vercel.app/track/DD-SBQV29', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Top section
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/tracking_real_top.png',
    fullPage: false 
  });
  console.log('Saved tracking_real_top.png');

  // 2. Middle section (Telemetry, Financials)
  await page.evaluate(() => window.scrollBy(0, 700));
  await page.waitForTimeout(1000);
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/tracking_real_middle.png',
    fullPage: false 
  });
  console.log('Saved tracking_real_middle.png');

  // 3. Bottom section (DVI inspection, logs)
  await page.evaluate(() => window.scrollBy(0, 700));
  await page.waitForTimeout(1000);
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/tracking_real_bottom.png',
    fullPage: false 
  });
  console.log('Saved tracking_real_bottom.png');

  await browser.close();
}

capture().catch(console.error);
