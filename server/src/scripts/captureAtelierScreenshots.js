import { chromium } from 'playwright';
import path from 'path';
import http from 'http';
import { spawn } from 'child_process';

const ARTIFACT_DIR = 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45';
const LOCAL_URL = 'http://localhost:5173';

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status < 500) return true;
    } catch (_) {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server at ${url} failed to respond within ${timeoutMs}ms`);
}

async function capture() {
  console.log('🚀 Starting Atelier v2.0 screenshot capture...');

  // Start server and vite client
  const serverProc = spawn('node', ['server/src/server.js'], { stdio: 'ignore', shell: true });
  const clientProc = spawn('node', ['node_modules/vite/bin/vite.js', 'client', '--port', '5173'], { stdio: 'ignore', shell: true });

  try {
    await waitForServer('http://localhost:5000/api/v1/health');
    await waitForServer(LOCAL_URL);
    console.log('✅ Local servers online.');

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    const page = await context.newPage();

    // 1. Homepage
    console.log('📸 1. Homepage...');
    await page.goto(`${LOCAL_URL}/`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'detaildock_atelier_homepage.png'), fullPage: false });

    // 2. Builder
    console.log('📸 2. Smart Package Builder...');
    await page.goto(`${LOCAL_URL}/builder`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);
    // Select sports coupe
    const coupe = page.locator('text=Coupe').first();
    if (await coupe.isVisible()) await coupe.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'detaildock_atelier_builder.png'), fullPage: false });

    // 3. Booking Wizard
    console.log('📸 3. Bay Booking Wizard...');
    await page.goto(`${LOCAL_URL}/book`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'detaildock_atelier_booking.png'), fullPage: false });

    // 4. Tracking with Radar
    console.log('📸 4. Live Tracking & 6-Zone Radar...');
    await page.goto(`${LOCAL_URL}/track/DD-3HSF7F`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'detaildock_atelier_tracking.png'), fullPage: false });

    // 5. Customer VIP Garage
    console.log('📸 5. VIP Customer Garage...');
    await page.goto(`${LOCAL_URL}/garage`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);
    const demoFill = page.locator('button:has-text("Fill Demo Credentials")').first();
    if (await demoFill.isVisible()) {
      await demoFill.click();
      const authBtn = page.locator('button:has-text("Access Customer Garage")').first();
      await authBtn.click();
      await page.waitForTimeout(2000);
    }
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'detaildock_atelier_garage.png'), fullPage: false });

    await browser.close();
    console.log('🎉 All Concourse Atelier v2.0 screenshots captured successfully!');
  } finally {
    serverProc.kill();
    clientProc.kill();
  }
}

capture().catch((err) => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
