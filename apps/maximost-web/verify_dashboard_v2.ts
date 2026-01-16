import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // 1. Login
  console.log('Navigating to Login...');
  await page.goto('http://localhost:5173/login');

  console.log('Clicking Guest Access...');
  await page.click('text="Continue as Guest (Demo)"');

  // 2. Wait for Dashboard
  console.log('Waiting for Dashboard...');
  await page.waitForURL('**/dashboard');
  await page.waitForSelector('text=Today\'s Mission', { timeout: 10000 });
  console.log('SUCCESS: "Today\'s Mission" header found.');

  // 3. Verify Header
  const headerText = await page.textContent('h1.text-2xl');
  console.log(`Current Date Display: ${headerText}`);

  // 4. Switch to Weekly View
  console.log('Switching to Weekly View...');
  await page.click('text=Weekly');

  // 5. Verify Unified Grid Elements
  // Check for the sticky Protocol header
  await page.waitForSelector('text=Protocol');
  console.log('SUCCESS: Protocol header visible.');

  // Check for auto-scroll target (today-column)
  const todayColumn = await page.$('#today-column');
  if (todayColumn) {
      console.log('SUCCESS: "today-column" ID found (Auto-scroll logic active).');
  } else {
      console.log('WARNING: "today-column" ID NOT found.');
  }

  // 6. Screenshot
  await page.screenshot({ path: '/home/jules/verification/dashboard_v2_verification.png', fullPage: true });
  console.log('Screenshot saved to verification/dashboard_v2_verification.png');

  await browser.close();
})();
