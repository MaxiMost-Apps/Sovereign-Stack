import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // 1. Visit Landing Page
  console.log('Navigating to Landing Page...');
  await page.goto('http://localhost:5173/');

  // 2. Verify New H1
  const h1Text = await page.textContent('h1');
  if (h1Text?.includes('FORGE YOUR ELITE HABITS')) {
      console.log('SUCCESS: New H1 text found.');
  } else {
      console.error(`FAILURE: H1 text mismatch. Found: "${h1Text}"`);
  }

  // 3. Verify Consolidation Block
  const problemText = await page.textContent('text="The Problem"');
  if (problemText) {
      console.log('SUCCESS: Consolidation Block "The Problem" found.');
  } else {
      console.error('FAILURE: Consolidation Block not found.');
  }

  // 4. Verify Terminology (Landing Page)
  const bodyText = await page.textContent('body');
  if (bodyText?.includes('Willpower')) {
      console.error('FAILURE: Found "Willpower" on Landing Page.');
  } else {
      console.log('SUCCESS: "Willpower" not found on Landing Page.');
  }

  if (bodyText?.includes('Internal Force')) {
      console.log('SUCCESS: "Internal Force" found on Landing Page.');
  } else {
      console.error('FAILURE: "Internal Force" NOT found on Landing Page.');
  }

  // 5. Navigate to Manifesto
  console.log('Navigating to Manifesto...');
  await page.click('text="Read The Manifesto"');
  await page.waitForURL('**/manifesto');

  // 6. Verify Terminology (Manifesto)
  const manifestoText = await page.textContent('body');
  if (manifestoText?.includes('Willpower')) {
      // Note: The prompt asked to replace it where appropriate.
      // In the "Biological Verification" block, we explicitly changed it to "Internal Force (Willpower)" or just "Internal Force".
      // Let's check specifically for the "We do not trust your..." line.
      console.log('Checking specific Manifesto line...');
  }

  // Check specific line replacement
  const bioBlock = await page.textContent('text="We do not trust your Internal Force"');
  if (bioBlock) {
       console.log('SUCCESS: Manifesto terminology updated correctly.');
  } else {
       console.error('FAILURE: Manifesto terminology check failed.');
  }

  // 7. Screenshot
  await page.screenshot({ path: '/home/jules/verification/copy_update.png', fullPage: true });
  console.log('Screenshot saved.');

  await browser.close();
})();
