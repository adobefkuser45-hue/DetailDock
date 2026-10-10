import { chromium } from '@playwright/test';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  
  await page.goto('https://client-mauve-zeta-13.vercel.app');
  await page.waitForLoadState('networkidle');

  const resultsSection = page.locator('#results');
  await resultsSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);

  // 1. Paint scenario
  await resultsSection.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/slider_paint_real.png' 
  });
  console.log('Saved slider_paint_real.png');

  // 2. Wheels scenario
  const wheelsBtn = page.locator('#results button:has-text("Wheels")').first();
  await wheelsBtn.click();
  await page.waitForTimeout(1000);
  await resultsSection.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/slider_wheels_real.png' 
  });
  console.log('Saved slider_wheels_real.png');

  // 3. Interior scenario
  const interiorBtn = page.locator('#results button:has-text("Cockpit Leather")').first();
  await interiorBtn.click();
  await page.waitForTimeout(1000);
  await resultsSection.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/slider_interior_real.png' 
  });
  console.log('Saved slider_interior_real.png');

  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
