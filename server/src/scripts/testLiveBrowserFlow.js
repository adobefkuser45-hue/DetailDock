import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45';
const LIVE_URL = 'https://client-mauve-zeta-13.vercel.app';

async function runLiveBrowserTest() {
  console.log('====================================================');
  console.log(`🌐 DETAILDOCK LIVE BROWSER VERIFICATION: ${LIVE_URL}`);
  console.log('====================================================\n');

  const browser = await chromium.launch({
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) DetailDock-E2E-Verifier/1.1'
  });

  const page = await context.newPage();

  try {
    // -------------------------------------------------------------
    // 1. Homepage
    // -------------------------------------------------------------
    console.log('📍 1. Navigating to Live Homepage...');
    await page.goto(`${LIVE_URL}/`, { waitUntil: 'networkidle', timeout: 30000 });
    const pageTitle = await page.title();
    console.log(`   ✓ Page title loaded: "${pageTitle}"`);

    const heroText = await page.locator('text=Preserve Perfection').first().isVisible();
    console.log(`   ✓ Hero luxury branding visible: ${heroText}`);

    const homeScreenshot = path.join(ARTIFACT_DIR, 'detaildock_live_homepage.png');
    await page.screenshot({ path: homeScreenshot, fullPage: false });
    console.log(`   📸 Captured Homepage Screenshot -> ${homeScreenshot}`);

    // -------------------------------------------------------------
    // 2. Smart Package Builder
    // -------------------------------------------------------------
    console.log('\n📍 2. Navigating to Smart Package Builder...');
    await page.goto(`${LIVE_URL}/builder`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);

    const builderHeading = await page.locator('text=Smart Package Builder').first().isVisible();
    console.log(`   ✓ Smart Builder heading visible: ${builderHeading}`);

    // Select Coupe Chassis
    const coupeBtn = page.locator('text=Coupe').first();
    if (await coupeBtn.isVisible()) {
      await coupeBtn.click();
      console.log('   ✓ Selected Coupe Chassis (1.1x multiplier)');
    }

    // Select Signature Detail
    const signaturePkg = page.locator('text=Signature Multi-Stage Detail').first();
    if (await signaturePkg.isVisible()) {
      await signaturePkg.click();
      console.log('   ✓ Selected Signature Multi-Stage Detail Package');
    }

    await page.waitForTimeout(1000);
    const builderScreenshot = path.join(ARTIFACT_DIR, 'detaildock_live_builder.png');
    await page.screenshot({ path: builderScreenshot, fullPage: false });
    console.log(`   📸 Captured Smart Builder Screenshot -> ${builderScreenshot}`);

    // -------------------------------------------------------------
    // 3. Appointment Booking Flow
    // -------------------------------------------------------------
    console.log('\n📍 3. Navigating to Schedule Bay (/book)...');
    await page.goto(`${LIVE_URL}/book`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);

    const bookingHeading = await page.locator('text=Configure Appointment & Cleanroom Bay').first().isVisible();
    console.log(`   ✓ Appointment Booking heading visible: ${bookingHeading}`);

    const bookingScreenshot = path.join(ARTIFACT_DIR, 'detaildock_live_booking.png');
    await page.screenshot({ path: bookingScreenshot, fullPage: false });
    console.log(`   📸 Captured Booking Wizard Screenshot -> ${bookingScreenshot}`);

    // -------------------------------------------------------------
    // 4. Customer Atelier Garage
    // -------------------------------------------------------------
    console.log('\n📍 4. Navigating to Customer Atelier Garage (/garage)...');
    await page.goto(`${LIVE_URL}/garage`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);

    const demoFillBtn = page.locator('button:has-text("Fill Demo Credentials")').first();
    if (await demoFillBtn.isVisible()) {
      await demoFillBtn.click();
      console.log('   ✓ Filled 1-Click VIP Demo Client credentials (alex@example.com)');
      
      const accessBtn = page.locator('button:has-text("Access Customer Garage")').first();
      await accessBtn.click();
      
      // Wait for authenticated profile
      await page.waitForSelector('text=Alex Vance', { timeout: 15000 });
      console.log('   ✓ Authenticated as VIP Client: Alex Vance');

      await page.waitForTimeout(1000);
      const garageScreenshot = path.join(ARTIFACT_DIR, 'detaildock_live_customer_garage.png');
      await page.screenshot({ path: garageScreenshot, fullPage: false });
      console.log(`   📸 Captured Customer Garage Screenshot -> ${garageScreenshot}`);
    }

    // -------------------------------------------------------------
    // 5. Admin Operations Deck & Catalog Cockpit
    // -------------------------------------------------------------
    console.log('\n📍 5. Navigating to Admin Portal (/admin)...');
    await page.goto(`${LIVE_URL}/admin`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);

    const adminLoginBtn = page.locator('button:has-text("Fill Demo Admin Credentials")').first();
    if (await adminLoginBtn.isVisible()) {
      await adminLoginBtn.click();
      console.log('   ✓ Filled 1-Click Demo Admin credentials (admin@detaildock.com)');
      const submitAdmin = page.locator('button:has-text("Authenticate & Open Pipeline")').first();
      await submitAdmin.click();
      await page.waitForSelector('text=Atelier Operations Deck', { timeout: 15000 });
      console.log('   ✓ Admin Operations Deck loaded');
    }

    const deckScreenshot = path.join(ARTIFACT_DIR, 'detaildock_live_admin_deck.png');
    await page.screenshot({ path: deckScreenshot, fullPage: false });
    console.log(`   📸 Captured Admin Operations Deck Screenshot -> ${deckScreenshot}`);

    // Open Service Catalog & Pricing Cockpit Modal
    const catalogBtn = page.locator('button:has-text("Catalog & Pricing")').first();
    if (await catalogBtn.isVisible()) {
      await catalogBtn.click();
      await page.waitForSelector('text=Service Catalog & Pricing Cockpit', { timeout: 10000 });
      console.log('   ✓ Service Catalog & Pricing Cockpit Modal open');

      await page.waitForTimeout(1000);
      const catalogScreenshot = path.join(ARTIFACT_DIR, 'detaildock_live_admin_catalog.png');
      await page.screenshot({ path: catalogScreenshot, fullPage: false });
      console.log(`   📸 Captured Admin Catalog Modal Screenshot -> ${catalogScreenshot}`);
    }

    // -------------------------------------------------------------
    // 6. Live Job Tracking Portal with DVI & Warranty
    // -------------------------------------------------------------
    console.log('\n📍 6. Navigating to Live Tracking Portal (/track/DD-3HSF7F)...');
    await page.goto(`${LIVE_URL}/track/DD-3HSF7F`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('text=DD-3HSF7F', { timeout: 15000 });
    console.log('   ✓ Tracking Portal loaded with real booking DD-3HSF7F');

    await page.waitForTimeout(1000);
    const trackingScreenshot = path.join(ARTIFACT_DIR, 'detaildock_live_tracking.png');
    await page.screenshot({ path: trackingScreenshot, fullPage: false });
    console.log(`   📸 Captured Tracking Portal Screenshot -> ${trackingScreenshot}`);

    console.log('\n====================================================');
    console.log('🎉 ALL LIVE BROWSER TESTS & SCREENSHOTS COMPLETED!');
    console.log('====================================================\n');
  } catch (error) {
    console.error('❌ Error during live browser verification:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runLiveBrowserTest();
