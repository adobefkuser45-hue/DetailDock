import { chromium } from '@playwright/test';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

  // 1. Capture empty /track landing with architecture features
  await page.goto('https://client-mauve-zeta-13.vercel.app/track', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/track_empty_architecture.png',
    fullPage: false 
  });
  console.log('Saved track_empty_architecture.png');

  // 2. Click "Try DD-DEMO01" button to test instant demo showcase loading
  const demoBtn = page.locator('button:has-text("Try DD-DEMO01")').first();
  await demoBtn.click();
  await page.waitForTimeout(2000);

  // Capture top of DD-DEMO01 showcase
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/track_demo_showcase_top.png',
    fullPage: false 
  });
  console.log('Saved track_demo_showcase_top.png');

  // 3. Scroll down to capture Financials & Preservation Investment
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(800);
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/track_demo_showcase_financials.png',
    fullPage: false 
  });
  console.log('Saved track_demo_showcase_financials.png');

  await browser.close();
}

capture().catch(console.error);
