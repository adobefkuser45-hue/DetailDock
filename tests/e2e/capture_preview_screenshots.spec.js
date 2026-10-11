import { test, expect } from '@playwright/test';

const ARTIFACT_DIR = 'C:/Users/FAISAL/.gemini/antigravity/brain/a9504329-682a-4cbf-a601-ae1f6c445e45';

test.describe('DetailDock High-Resolution Visual Previews', () => {

  test('1. Capture Customer Portal Homepage with Dynamic Studio CMS Banner', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 850 });
    await page.goto('http://localhost:5173/');
    await expect(page.locator('text=Concourse Perfection').first()).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: `${ARTIFACT_DIR}/preview_customer_portal_homepage.png`,
      fullPage: false
    });
  });

  test('2. Capture Zero Admin Leakage on Customer Portal (:5173/admin)', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 850 });
    await page.goto('http://localhost:5173/admin');
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: `${ARTIFACT_DIR}/preview_customer_zero_admin_leak.png`,
      fullPage: false
    });
  });

  test('3. Capture Sovereign Admin Login Card (:5174)', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 850 });
    await page.goto('http://localhost:5174/');
    await expect(page.locator('button:has-text("Fill Demo Admin Credentials")').first()).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: `${ARTIFACT_DIR}/preview_admin_login.png`,
      fullPage: false
    });
  });

  test('4. Capture Sovereign Admin Atelier Operations Deck & Kanban (:5174)', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto('http://localhost:5174/');

    const deckHeader = page.locator('text=Atelier Operations Deck').first();
    const isAlreadyLoggedIn = await deckHeader.isVisible().catch(() => false);

    if (!isAlreadyLoggedIn) {
      const demoFillBtn = page.locator('button:has-text("Fill Demo Admin Credentials")').first();
      await expect(demoFillBtn).toBeVisible({ timeout: 10000 });
      await demoFillBtn.click();

      const authBtn = page.locator('button:has-text("Authenticate & Open Pipeline")').first();
      await expect(authBtn).toBeVisible();
      await authBtn.click();
    }

    await expect(deckHeader).toBeVisible({ timeout: 15000 });
    await expect(page.locator('text=Live Atelier Pipeline Board').first()).toBeVisible();
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: `${ARTIFACT_DIR}/preview_admin_operations_deck.png`,
      fullPage: false
    });
  });

  test('5. Capture Dynamic Website Studio CMS Cockpit Modal (:5174)', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto('http://localhost:5174/');

    const deckHeader = page.locator('text=Atelier Operations Deck').first();
    const isAlreadyLoggedIn = await deckHeader.isVisible().catch(() => false);

    if (!isAlreadyLoggedIn) {
      const demoFillBtn = page.locator('button:has-text("Fill Demo Admin Credentials")').first();
      await expect(demoFillBtn).toBeVisible({ timeout: 10000 });
      await demoFillBtn.click();

      const authBtn = page.locator('button:has-text("Authenticate & Open Pipeline")').first();
      await expect(authBtn).toBeVisible();
      await authBtn.click();
    }

    await expect(deckHeader).toBeVisible({ timeout: 15000 });

    const cmsBtn = page.locator('button:has-text("Website Studio CMS")').first();
    await expect(cmsBtn).toBeVisible();
    await cmsBtn.click();
    await expect(page.locator('text=Website Studio CMS').first()).toBeVisible();
    await page.waitForTimeout(800);
    await page.screenshot({
      path: `${ARTIFACT_DIR}/preview_admin_cms_cockpit.png`,
      fullPage: false
    });
  });

  test('6. Capture Service Catalog & Pricing Cockpit Modal (:5174)', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto('http://localhost:5174/');

    const deckHeader = page.locator('text=Atelier Operations Deck').first();
    const isAlreadyLoggedIn = await deckHeader.isVisible().catch(() => false);

    if (!isAlreadyLoggedIn) {
      const demoFillBtn = page.locator('button:has-text("Fill Demo Admin Credentials")').first();
      await expect(demoFillBtn).toBeVisible({ timeout: 10000 });
      await demoFillBtn.click();

      const authBtn = page.locator('button:has-text("Authenticate & Open Pipeline")').first();
      await expect(authBtn).toBeVisible();
      await authBtn.click();
    }

    await expect(deckHeader).toBeVisible({ timeout: 15000 });

    const catalogBtn = page.locator('button:has-text("Catalog & Rates")').first();
    await expect(catalogBtn).toBeVisible();
    await catalogBtn.click();
    await expect(page.locator('text=Service Catalog & Pricing Cockpit').first()).toBeVisible();
    await page.waitForTimeout(800);
    await page.screenshot({
      path: `${ARTIFACT_DIR}/preview_admin_catalog_cockpit.png`,
      fullPage: false
    });
  });

});
