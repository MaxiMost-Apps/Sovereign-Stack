import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the page
        try:
            await page.goto("http://localhost:5175")
        except Exception as e:
            print(f"Error connecting to server: {e}")
            await browser.close()
            return

        # Check title
        title = await page.title()
        print(f"Page Title: {title}")

        # Check for Calculator visibility
        calculator = await page.is_visible("text=Zone 2 Calculator")
        print(f"Calculator Visible: {calculator}")

        # Input Age
        await page.fill('input[placeholder="Enter your age"]', "30")

        # Click Calculate
        await page.click("text=Calculate Zones")

        # Check results
        lower = await page.is_visible("text=114") # 190 * 0.6
        upper = await page.is_visible("text=133") # 190 * 0.7

        print(f"Result Calculation Verified: {lower and upper}")

        # Screenshot
        await page.screenshot(path="verification/alexis_intel.png", full_page=True)
        print("Screenshot saved to verification/alexis_intel.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
