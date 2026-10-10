import { chromium } from '@playwright/test';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

  console.log('Navigating to /garage (Unauthenticated)...');
  await page.goto('https://client-mauve-zeta-13.vercel.app/garage', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Capture Unauthenticated Login / Register Landing
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/garage_unauth_landing.png',
    fullPage: false 
  });
  console.log('Saved garage_unauth_landing.png');

  // 2. Click "Fill Demo Credentials" and log in
  const fillDemoBtn = page.getByRole('button', { name: /Fill Demo Credentials/i });
  await fillDemoBtn.click();
  await page.waitForTimeout(500);

  const loginBtn = page.getByRole('button', { name: /Access Customer Garage/i });
  await loginBtn.click();
  await page.waitForTimeout(1000);
  // Wait for loading spinner to disappear
  await page.locator('text=Personal Fleet').first().waitFor({ state: 'visible', timeout: 15000 });
  await page.waitForTimeout(3000);

  // 3. Capture Authenticated VIP Client Garage (Vehicles Tab)
  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/garage_auth_fleet.png',
    fullPage: false 
  });
  console.log('Saved garage_auth_fleet.png');

  // 4. Click "Add Vehicle" to inspect the Add Vehicle Modal
  const addVehicleBtn = page.getByRole('button', { name: /Add Vehicle/i }).first();
  await addVehicleBtn.click();
  await page.waitForTimeout(1000);

  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/garage_add_vehicle_modal.png',
    fullPage: false 
  });
  console.log('Saved garage_add_vehicle_modal.png');

  // Cancel modal
  const cancelBtn = page.getByRole('button', { name: /Cancel/i });
  await cancelBtn.click();
  await page.waitForTimeout(500);

  // 5. Switch to "Concierge Bookings & History" Tab
  const bookingsTab = page.getByRole('button', { name: /Concierge Bookings & History/i });
  await bookingsTab.click();
  await page.waitForTimeout(1500);

  await page.screenshot({ 
    path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/garage_auth_bookings.png',
    fullPage: false 
  });
  console.log('Saved garage_auth_bookings.png');

  await browser.close();
}

capture().catch(console.error);
