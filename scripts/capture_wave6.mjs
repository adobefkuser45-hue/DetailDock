import { chromium } from '@playwright/test';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  
  await page.goto('https://client-mauve-zeta-13.vercel.app', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Capture Testimonials
  const testimonials = page.locator('#testimonials');
  if (await testimonials.count() > 0) {
    await testimonials.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await testimonials.screenshot({
      path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/wave6_testimonials.png'
    });
    console.log('Saved wave6_testimonials.png');
  }

  // Capture Final CTA
  const cta = page.locator('#contact-cta');
  if (await cta.count() > 0) {
    await cta.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await cta.screenshot({
      path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/wave6_final_cta.png'
    });
    console.log('Saved wave6_final_cta.png');
  }

  await browser.close();
}

capture().catch(console.error);
