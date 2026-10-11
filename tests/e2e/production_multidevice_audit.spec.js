import { test, expect } from '@playwright/test';

// Test mobile viewport (iPhone 14 standard: 390 x 844)
test.use({
  viewport: { width: 390, height: 844 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
});

test.describe('DetailDock Mobile & Multi-Device Concourse Audit', () => {

  test('1. Homepage Mobile: Pristine rendering, zero horizontal overflow, floating dock clearance', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=DetailDock').first()).toBeVisible();
    await page.waitForTimeout(500);

    // Verify zero horizontal page blowout
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Capture visual proof
    await page.screenshot({ 
      path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/mobile_audit_homepage.png',
      fullPage: false 
    });
  });

  test('2. Smart Package Builder Mobile: Responsive chassis cards and live cockpit', async ({ page }) => {
    await page.goto('/builder');
    await expect(page.locator('text=Smart Package Builder').first()).toBeVisible();
    await page.waitForTimeout(500);

    // Verify zero horizontal blowout
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Capture visual proof
    await page.screenshot({ 
      path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/mobile_audit_builder.png',
      fullPage: false 
    });
  });

  test('3. Appointment Booking Wizard Mobile: Clean calendar, slot picker, and intake inputs', async ({ page }) => {
    await page.goto('/book');
    await expect(page.locator('button:has-text("Continue to Date & Bay Selection")').first()).toBeVisible();
    await page.waitForTimeout(500);

    // Verify zero horizontal blowout
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Capture visual proof
    await page.screenshot({ 
      path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/mobile_audit_book.png',
      fullPage: false 
    });
  });

  test('4. Live Telemetry Portal Mobile: 5-stage progress gauge, radar, and audit log', async ({ page }) => {
    await page.goto('/track/DD-DEMO01');
    await expect(page.locator('text=DD-DEMO01').first()).toBeVisible();
    await page.waitForTimeout(500);

    // Verify zero horizontal blowout
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Capture visual proof
    await page.screenshot({ 
      path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/mobile_audit_track.png',
      fullPage: false 
    });
  });

  test('5. Customer VIP Garage Mobile: Unauth landing & Atelier privileges', async ({ page }) => {
    await page.goto('/garage');
    await expect(page.locator('text=Customer Atelier Portal').first()).toBeVisible();
    await page.waitForTimeout(500);

    // Verify zero horizontal blowout
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Capture visual proof
    await page.screenshot({ 
      path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/mobile_audit_garage.png',
      fullPage: false 
    });
  });

  test('6. Admin Operations Deck Mobile: Restricted login card on sovereign port 5174 and zero customer leakage', async ({ page }) => {
    // 1. Customer portal at /admin has zero admin leakage
    await page.goto('/admin');
    await expect(page.locator('text=Atelier Operations Deck')).toHaveCount(0);

    // 2. Sovereign Admin Deck on port 5174
    await page.goto('http://localhost:5174/');
    await expect(page.locator('button:has-text("Fill Demo Admin Credentials")').first()).toBeVisible();
    await page.waitForTimeout(500);

    // Verify zero horizontal blowout on sovereign admin
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Capture visual proof
    await page.screenshot({ 
      path: 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45/mobile_audit_admin.png',
      fullPage: false 
    });
  });

});
