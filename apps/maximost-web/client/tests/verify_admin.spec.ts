import { test, expect } from '@playwright/test';

test('verify admin diagnostics navigation', async ({ page }) => {
  // 1. Navigate to the Admin Console directly
  await page.goto('http://localhost:5173/admin/diagnostics');

  // 2. Wait for app load
  await page.waitForTimeout(5000);

  // 3. Take a screenshot
  await page.screenshot({ path: 'verification_admin_diag.png', fullPage: true });
});
