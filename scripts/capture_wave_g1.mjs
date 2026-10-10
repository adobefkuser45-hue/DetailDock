import { chromium } from '@playwright/test';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

  console.log('Navigating to live /garage (Unauthenticated)...');
  await page.goto('https://client-mauve-zeta-13.vercel.app/garage', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Capture Unauthenticated view with dock clearance and 3 VIP Privilege cards
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/garage_wave_g1_unauth.png',
    fullPage: false 
  });
  console.log('Saved garage_wave_g1_unauth.png');

  // 2. Click "Fill Demo Credentials" and log in
  const fillDemoBtn = page.getByRole('button', { name: /Fill Demo Credentials/i });
  await fillDemoBtn.click();
  await page.waitForTimeout(500);

  const loginBtn = page.getByRole('button', { name: /Access Customer Garage/i });
  await loginBtn.click();
  await page.waitForTimeout(1000);

  // Wait for loading to finish and fleet cards to be rendered
  await page.locator('text=Personal Fleet').first().waitFor({ state: 'visible', timeout: 15000 });
  await page.waitForTimeout(3000);

  // 3. Capture Authenticated VIP Client Fleet with dock clearance and dynamic supercar photography
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/garage_wave_g1_auth_fleet.png',
    fullPage: false 
  });
  console.log('Saved garage_wave_g1_auth_fleet.png');

  await browser.close();
}

capture().catch(console.error);
