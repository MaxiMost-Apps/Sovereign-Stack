import { test, expect } from '@playwright/test';

test('verify CouncilGhost variants', async ({ page }) => {
  // 1. Navigate to the page
  await page.goto('http://localhost:5173/dashboard');

  // 2. Wait for the application to load
  await page.waitForTimeout(5000); // Wait for auth/data load

  // 3. Take a screenshot of the Ghost Test Deck
  await page.screenshot({ path: 'verification_screenshot.png', fullPage: true });
  console.log('Screenshot saved to verification_screenshot.png');
});
