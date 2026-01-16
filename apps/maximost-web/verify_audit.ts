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

  // 3. Navigate to Progress Page
  console.log('Navigating to Progress Page...');
  await page.goto('http://localhost:5173/progress');

  // 4. Verify Charts
  await page.waitForSelector('text="Consistency Index"', { timeout: 10000 });
  console.log('SUCCESS: Consistency Index header found.');

  // Check for Recharts container
  const chart = await page.$('.recharts-responsive-container');
  if (chart) console.log('SUCCESS: Recharts BarChart found.');
  else console.error('FAILURE: Recharts BarChart NOT found.');

  // Check for Siege Map (Daily Perfection)
  await page.waitForSelector('text="Siege Map (Daily Perfection)"');
  console.log('SUCCESS: Siege Map header found.');

  // 5. Navigate to Dashboard -> Monthly View
  console.log('Navigating to Dashboard Monthly View...');
  await page.goto('http://localhost:5173/dashboard');
  await page.click('text=Monthly');

  // 6. Verify Monthly Calendar Dots
  await page.waitForSelector('.rounded-full'); // Check for dots
  const dots = await page.$$('.w-2.h-2.rounded-full');
  console.log(`Found ${dots.length} heatmap dots in Monthly View.`);

  // 7. Screenshot
  await page.screenshot({ path: '/home/jules/verification/audit_verification.png', fullPage: true });
  console.log('Screenshot saved.');

  await browser.close();
})();
