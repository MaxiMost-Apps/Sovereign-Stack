import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // 1. Login
  console.log('Navigating to Login...');
  await page.goto('http://localhost:5173/login');
  await page.click('text="Continue as Guest (Demo)"');

  // 2. Wait for Dashboard
  console.log('Waiting for Dashboard...');
  await page.waitForURL('**/dashboard');

  // 3. Navigate to Settings
  console.log('Navigating to Settings...');
  await page.goto('http://localhost:5173/settings');
  await page.waitForSelector('text="System Configuration"');

  // 4. Change "Start of Week" to SUNDAY
  console.log('Changing Start of Week to SUNDAY...');
  await page.click('button:has-text("SUNDAY")');

  // 5. Save (Force Click via JS because overlay might be tricky for Playwright)
  console.log('Waiting for Save Button...');
  await page.waitForSelector('button:has-text("Save & Sync")', { state: 'visible', timeout: 5000 });
  console.log('Clicking Save via Evaluation...');

  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(el => el.textContent?.includes('Save & Sync'));
    if (btn) (btn as HTMLElement).click();
  });

  await page.waitForTimeout(3000); // Wait for toast/sync

  // 6. Reload Page (Simulate new session)
  console.log('Reloading Page...');
  await page.reload();
  await page.waitForSelector('text="System Configuration"');

  // 7. Verify Persistence
  // Check if SUNDAY button has the active class (bg-purple-600)
  const sundayBtn = await page.$('button:has-text("SUNDAY")');
  const classAttribute = await sundayBtn?.getAttribute('class');

  if (classAttribute && classAttribute.includes('bg-purple-600')) {
      console.log('SUCCESS: "Start of Week" setting persisted as SUNDAY.');
  } else {
      console.error(`FAILURE: "Start of Week" setting reverted. Class: ${classAttribute}`);
  }

  // 8. Screenshot
  await page.screenshot({ path: '/home/jules/verification/settings_persistence.png', fullPage: true });
  console.log('Screenshot saved.');

  await browser.close();
})();
