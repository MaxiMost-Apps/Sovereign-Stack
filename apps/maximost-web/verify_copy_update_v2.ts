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

  // 4. Verify Terminology (Landing Page - Main Body)
  // Note: We need to check the entire body text
  const bodyText = await page.evaluate(() => document.body.innerText);

  // Check specifically in the Manifesto Section ON THE LANDING PAGE
  // The Landing Page HAS a Manifesto section (Section 6)
  if (bodyText.includes('We rely on Biological Verification, not willpower')) {
      console.error('FAILURE: Found "not willpower" in Landing Page text.');
  } else if (bodyText.includes('not Internal Force')) {
      console.log('SUCCESS: "not Internal Force" found in Landing Page text.');
  } else {
      console.log('WARNING: Could not find specific "not Internal Force" phrase, manual check recommended.');
  }

  if (bodyText.includes('Willpower')) {
      console.error('FAILURE: "Willpower" still present on page.');
  } else {
      console.log('SUCCESS: "Willpower" globally removed from Landing Page.');
  }

  // 5. Navigate to Manifesto PAGE (if distinct)
  // The button actually scrolls to #manifesto on the landing page, it doesn't navigate to /manifesto.
  // BUT the instruction mentioned "ManifestoPage.jsx" which implies a separate route exists too.
  // Let's check the separate route just in case.
  console.log('Navigating to /manifesto route...');
  await page.goto('http://localhost:5173/manifesto');

  const manifestoPageText = await page.evaluate(() => document.body.innerText);
  if (manifestoPageText.includes('Internal Force (Willpower)')) {
       console.log('SUCCESS: Manifesto Page terminology updated correctly.');
  } else {
       console.error('FAILURE: Manifesto Page terminology check failed.');
  }

  // 6. Screenshot
  await page.screenshot({ path: '/home/jules/verification/copy_update_v2.png', fullPage: true });
  console.log('Screenshot saved.');

  await browser.close();
})();
