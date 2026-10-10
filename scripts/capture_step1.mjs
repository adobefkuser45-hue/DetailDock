import { chromium } from '@playwright/test';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  
  await page.goto('https://client-mauve-zeta-13.vercel.app/book', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);

  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/booking_step1.png',
    fullPage: false 
  });
  console.log('Saved booking_step1.png successfully!');

  await browser.close();
}

capture().catch(console.error);
