import { test, expect } from '@playwright/test';

test.describe('Cloud Production Verification: Sovereign Admin & Decoupled Customer Portal', () => {

  test('1. Production Customer Portal is live and has ZERO admin leakage', async ({ page }) => {
    // 1. Visit live customer portal
    await page.goto('https://client-mauve-zeta-13.vercel.app', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/DetailDock/i);

    // Assert navbar has no admin link
    const adminLink = page.locator('nav a[href*="admin"], footer a[href*="admin"]');
    await expect(adminLink).toHaveCount(0);

    // 2. Direct navigate to /admin on customer portal
    await page.goto('https://client-mauve-zeta-13.vercel.app/admin', { waitUntil: 'domcontentloaded' });
    
    // Assert zero admin components leak
    await expect(page.locator('text=Atelier Operations Deck')).toHaveCount(0);
    await expect(page.locator('text=Obsidian Concourse Conductor')).toHaveCount(0);
    await expect(page.locator('text=Sovereign Admin')).toHaveCount(0);
  });

  test('2. Sovereign Admin Deck is live on dedicated domain and logs in with live Render API', async ({ page }) => {
    // 1. Navigate to live sovereign admin domain
    await page.goto('https://detaildock-ops.vercel.app', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/DetailDock — Sovereign Studio Operations Admin Deck/i);

    // Verify Obsidian login card
    await expect(page.locator('text=Sovereign Studio Operations Deck')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('text=Studio Operations Login')).toBeVisible();

    // 2. Click Quick Demo Login credentials
    const quickFillBtn = page.locator('button:has-text("Fill Demo Admin Credentials")');
    if (await quickFillBtn.isVisible()) {
      await quickFillBtn.click();
    } else {
      await page.fill('input[type="email"]', 'admin@detaildock.com');
      await page.fill('input[type="password"]', 'DetailDockAdmin2026!');
    }

    // 3. Submit login
    await page.click('button:has-text("Authenticate & Open Pipeline")');

    // 4. Assert Operations Deck appears
    await expect(page.locator('text=Atelier Operations Deck')).toBeVisible({ timeout: 20000 });
    await expect(page.locator('text=Dual Cleanroom Bays Active')).toBeVisible();
    await expect(page.locator('text=Website Studio CMS')).toBeVisible();
  });

});
