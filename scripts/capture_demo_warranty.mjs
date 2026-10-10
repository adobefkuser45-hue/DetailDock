import { chromium } from '@playwright/test';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

  await page.goto('https://client-mauve-zeta-13.vercel.app/track/DD-DEMO01', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Scroll down to capture the Warranty Certificate and Communications log
  await page.evaluate(() => window.scrollBy(0, 1800));
  await page.waitForTimeout(1000);

  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/track_demo_warranty_full.png',
    fullPage: false 
  });
  console.log('Saved track_demo_warranty_full.png');

  await browser.close();
}

capture().catch(console.error);
