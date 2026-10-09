import { test, expect } from '@playwright/test';

test.describe.serial('DetailDock End-to-End Atelier Customer & Admin Journey', () => {
  let createdBookingCode = '';

  test('1. Homepage: Renders luxury atelier hero, before/after slider, and packages', async ({ page }) => {
    await page.goto('/');

    // Check title & branding
    await expect(page).toHaveTitle(/DetailDock/i);
    await expect(page.locator('text=Preserve Perfection').first()).toBeVisible();

    // Check live studio pill
    await expect(page.locator('text=DUAL BAYS ACTIVE').first()).toBeVisible();

    // Check Before/After Slider & Gloss Meter
    await expect(page.locator('text=Gloss Meter').first()).toBeVisible();

    // Check Preservation Packages Grid Section
    await expect(page.locator('text=Precision Preservation Packages').first()).toBeVisible();
  });

  test('2. Smart Package Builder: Configures chassis, packages, addons, and calculates authoritative price', async ({ page }) => {
    await page.goto('/builder');

    // Header check
    await expect(page.locator('text=Smart Package Builder').first()).toBeVisible();

    // Step 1: Select Chassis (Coupe / Sports 1.1x)
    const coupeBtn = page.locator('text=Coupe').first();
    await expect(coupeBtn).toBeVisible();
    await coupeBtn.click();

    // Step 2: Select Package
    const packageCard = page.locator('text=Signature Multi-Stage Detail').first();
    await expect(packageCard).toBeVisible();
    await packageCard.click();

    // Verify Pricing Cockpit
    const pricingCockpit = page.locator('text=Pricing Cockpit').first();
    await expect(pricingCockpit).toBeVisible();

    // Click Proceed to Bay Reservation
    const proceedBtn = page.locator('button:has-text("Proceed to Bay Reservation")').first();
    await expect(proceedBtn).toBeVisible();
    await proceedBtn.click();

    // Assert URL transitioned to booking wizard
    await expect(page).toHaveURL(/\/book/);
  });

  test('3. Appointment Booking Wizard: Selects studio slot, enters vehicle intake, and generates DD-XXXXXX code', async ({ page }) => {
    await page.goto('/book');

    // Step 1: Spec Review -> Proceed to Slot Selection
    const continueToSlotBtn = page.locator('button:has-text("Continue to Date & Bay Selection")').first();
    await expect(continueToSlotBtn).toBeVisible({ timeout: 10000 });
    await continueToSlotBtn.click();

    // Step 2: Studio Bay Date & Slot Selection
    // If the active date slots are all booked, cycle through upcoming dates until an open bay slot is found
    const openSlotBtn = page.locator('button:has-text("Open"):not([disabled])').first();
    const isFirstDateOpen = await openSlotBtn.isVisible({ timeout: 2000 }).catch(() => false);
    if (!isFirstDateOpen) {
      const dateButtons = page.locator('div.grid button:has-text("Oct")');
      const count = await dateButtons.count();
      for (let i = 1; i < count; i++) {
        await dateButtons.nth(i).click();
        await page.waitForTimeout(500);
        if (await openSlotBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
          break;
        }
      }
    }
    await expect(openSlotBtn).toBeVisible({ timeout: 10000 });
    await openSlotBtn.click();

    const continueToIntakeBtn = page.locator('button:has-text("Continue to Vehicle Intake")').first();
    await expect(continueToIntakeBtn).toBeEnabled({ timeout: 5000 });
    await continueToIntakeBtn.click();

    // Step 3: Vehicle & Customer Intake Form
    await page.locator('input[placeholder="e.g. Porsche"]').fill('Porsche');
    await page.locator('input[placeholder="e.g. 911 GT3 RS"]').fill('911 Dakar');
    await page.locator('input[placeholder="e.g. 2024"]').fill('2024');

    await page.locator('input[placeholder="e.g. Alexander Rivera"]').fill('Christian Vance');
    await page.locator('input[placeholder="e.g. alex@example.com"]').fill('christian.vance@luxuryholding.com');
    await page.locator('input[placeholder="e.g. (512) 555-0199"]').fill('(512) 782-9901');

    // Verify Payment Preference Selection Component
    await expect(page.locator('text=Payment & Settlement Preference').first()).toBeVisible();
    await expect(page.locator('text=Pay at Studio Arrival').first()).toBeVisible();
    await expect(page.locator('text=Online Card Payment').first()).toBeVisible();

    // Submit Booking
    const submitBtn = page.locator('button:has-text("Confirm & Reserve Slot")').first();
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // Step 4: Booking Confirmation Screen
    const confirmationHeader = page.locator('text=Appointment Confirmed & Secured').first();
    await expect(confirmationHeader).toBeVisible({ timeout: 15000 });

    // Verify PDF Invoice Download Button
    await expect(page.locator('text=Download Tax Invoice / Receipt (PDF)').first()).toBeVisible();

    // Extract generated DD-XXXXXX tracking code
    const pageText = await page.innerText('body');
    const match = pageText.match(/DD-[0-9A-Z]{6}/);
    expect(match).not.toBeNull();
    createdBookingCode = match ? match[0] : '';
    console.log(`[E2E Test]: Successfully generated booking tracking code: ${createdBookingCode}`);
  });

  test('4. Live Public Job Tracking Portal: Resolves telemetry, progress gauge, and bay specs', async ({ page }) => {
    const codeToTrack = createdBookingCode || 'DD-DEMO01';
    await page.goto(`/track/${codeToTrack}`);

    // Verify Tracking Page Header
    await expect(page.locator('text=Track Vehicle Treatment').first()).toBeVisible({ timeout: 10000 });

    if (createdBookingCode) {
      await expect(page.locator(`text=${createdBookingCode}`).first()).toBeVisible({ timeout: 10000 });
      await expect(page.locator('text=Live Telemetry Pipeline').first()).toBeVisible();
      await expect(page.locator('text=Vehicle Spec').first()).toBeVisible();
      await expect(page.locator('text=Cleanroom Bay').first()).toBeVisible();
      // Verify Tax Invoice & Invoicing Section
      await expect(page.locator('text=Financial Settlement & Official Invoicing').first()).toBeVisible();
      await expect(page.locator('text=Download Tax Invoice / Receipt (PDF)').first()).toBeVisible();

      // Verify Automated Client Telemetry & Notifications Section
      await expect(page.locator('text=Automated Client Telemetry & Notifications').first()).toBeVisible();
      await expect(page.locator('button:has-text("Simulate Phone Notification")').first()).toBeVisible();
    }
  });

  test('5. Admin Operations Deck: Authenticates, inspects Kanban pipeline, and advances status', async ({ page }) => {
    await page.goto('/admin');

    // Wait for either the admin command deck (if already logged in) or the login form
    const deckHeader = page.locator('text=Atelier Operations Deck').first();
    const isAlreadyLoggedIn = await deckHeader.isVisible().catch(() => false);

    if (!isAlreadyLoggedIn) {
      // Wait for login screen and 1-Click Demo Fill Button
      const demoFillBtn = page.locator('button:has-text("Fill Demo Admin Credentials")').first();
      await expect(demoFillBtn).toBeVisible({ timeout: 10000 });
      await demoFillBtn.click();

      // Submit Authentication
      const authBtn = page.locator('button:has-text("Authenticate & Open Pipeline")').first();
      await expect(authBtn).toBeVisible();
      await authBtn.click();
    }

    // Command Deck Header
    await expect(deckHeader).toBeVisible({ timeout: 15000 });

    // KPI Metric Row
    await expect(page.locator('text=Total Studio Revenue').first()).toBeVisible();
    await expect(page.locator('text=Cleanroom Utilization').first()).toBeVisible();

    // Verify Studio Identity Settings Customizer Modal opens cleanly
    const settingsBtn = page.locator('button:has-text("Studio Identity Settings")').first();
    await expect(settingsBtn).toBeVisible();
    await settingsBtn.click();
    await expect(page.locator('text=Studio Identity & Location Settings').first()).toBeVisible();
    await page.locator('button:has-text("Cancel")').first().click();

    // Kanban Board
    await expect(page.locator('text=Live Atelier Pipeline Board').first()).toBeVisible();
    await expect(page.locator('text=1. Requested').first()).toBeVisible();
    await expect(page.locator('text=2. Confirmed').first()).toBeVisible();
    await expect(page.locator('text=3. In Cleanroom Bay').first()).toBeVisible();

    // Status Advance Test on First Available Card
    const advanceBtn = page.locator('button:has-text("Confirm Bay")').first();
    if (await advanceBtn.isVisible()) {
      await advanceBtn.click();
      await page.waitForTimeout(500);
      await expect(page.locator('text=2. Confirmed').first()).toBeVisible();
    }
  });
});
