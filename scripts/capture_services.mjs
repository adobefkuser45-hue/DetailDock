import { chromium } from '@playwright/test';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  
  await page.goto('https://client-mauve-zeta-13.vercel.app', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);

  const servicesSection = page.locator('#services');
  await servicesSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);

  await servicesSection.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/wave4_services_section.png' 
  });
  console.log('Saved wave4_services_section.png');

  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
