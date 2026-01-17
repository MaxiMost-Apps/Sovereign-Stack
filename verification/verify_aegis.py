import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the page
        try:
            await page.goto("http://localhost:5176")
        except Exception as e:
            print(f"Error connecting to server: {e}")
            await browser.close()
            return

        # Check title
        title = await page.title()
        print(f"Page Title: {title}")

        # Check for Calculator visibility
        calculator = await page.is_visible("text=Dopamine Detox Calculator")
        print(f"Calculator Visible: {calculator}")

        # Input High usage
        # Use simple selectors for inputs
        await page.fill('input[placeholder="e.g. 6"]', "12") # Screen time
        await page.fill('input[placeholder="e.g. 2"]', "5")  # Social Media (First one found with this placeholder?)

        # Wait, the placeholder for Social Media is e.g. 2
        # And Deep Work is e.g. 4

        await page.fill('input[placeholder="e.g. 4"]', "0")  # Deep Work

        # Click Calculate
        await page.click("text=Analyze Protocol")

        # Check results for Level 5 (Nuclear Option)
        level5 = await page.is_visible("text=Level 5: Nuclear Option")

        print(f"Result Calculation Verified (Level 5): {level5}")

        # Screenshot
        await page.screenshot(path="verification/aegis_defense.png", full_page=True)
        print("Screenshot saved to verification/aegis_defense.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
