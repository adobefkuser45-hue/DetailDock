import { chromium } from '@playwright/test';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

  // 1. Capture /track empty search screen
  await page.goto('https://client-mauve-zeta-13.vercel.app/track', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/tracking_landing.png',
    fullPage: false 
  });
  console.log('Saved tracking_landing.png');

  // 2. Capture /track/DD-DEMO01 top viewport
  await page.goto('https://client-mauve-zeta-13.vercel.app/track/DD-DEMO01', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/tracking_demo_top.png',
    fullPage: false 
  });
  console.log('Saved tracking_demo_top.png');

  // 3. Scroll down on DD-DEMO01 to capture DVI & Warranty sections
  await page.evaluate(() => window.scrollBy(0, 900));
  await page.waitForTimeout(1000);
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/tracking_demo_middle.png',
    fullPage: false 
  });
  console.log('Saved tracking_demo_middle.png');

  // 4. Scroll further down to capture communications & audit logs
  await page.evaluate(() => window.scrollBy(0, 900));
  await page.waitForTimeout(1000);
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/tracking_demo_bottom.png',
    fullPage: false 
  });
  console.log('Saved tracking_demo_bottom.png');

  await browser.close();
}

capture().catch(console.error);
