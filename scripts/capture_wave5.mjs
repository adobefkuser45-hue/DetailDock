import { chromium } from '@playwright/test';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  
  await page.goto('https://client-mauve-zeta-13.vercel.app', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Capture Why Choose Us
  const whyUs = page.locator('#why-us');
  if (await whyUs.count() > 0) {
    await whyUs.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await whyUs.screenshot({
      path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/wave5_why_choose_us.png'
    });
    console.log('Saved wave5_why_choose_us.png');
  }

  // Capture Process Timeline
  const timeline = page.locator('section:has-text("From Online Spec to Concourse Mirror")');
  if (await timeline.count() > 0) {
    await timeline.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await timeline.screenshot({
      path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/wave5_process_timeline.png'
    });
    console.log('Saved wave5_process_timeline.png');
  }

  await browser.close();
}

capture().catch(console.error);
