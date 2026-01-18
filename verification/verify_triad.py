import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # Verify Alexis Intel (Trinity)
        page_alexis = await browser.new_page()
        try:
            print("Checking Alexis (5175)...")
            await page_alexis.goto("http://localhost:5175", timeout=60000)
            title = await page_alexis.title()
            print(f"Alexis Title: {title}")

            # Check for Navbar link existence first
            if await page_alexis.is_visible("text=The Vault"):
                await page_alexis.click("text=The Vault")
                await page_alexis.wait_for_selector("text=The Institutional Vault", timeout=10000)
                print("Alexis: Navigation to Vault Verified")
            else:
                print("Alexis: 'The Vault' link not found")
        except Exception as e:
            print(f"Alexis Error: {e}")

        # Verify Aegis Defense (Tank)
        page_aegis = await browser.new_page()
        try:
            print("Checking Aegis (5176)...")
            await page_aegis.goto("http://localhost:5176", timeout=60000)
            title = await page_aegis.title()
            print(f"Aegis Title: {title}")

            if await page_aegis.is_visible("text=Telemetry"):
                await page_aegis.click("text=Telemetry")
                await page_aegis.wait_for_selector("text=LIVE INGEST FEED", timeout=10000)
                print("Aegis: Ingest Log Verified")
            else:
                print("Aegis: 'Telemetry' link not found")
        except Exception as e:
            print(f"Aegis Error: {e}")

        # Verify Hope Soul (Neo)
        page_hope = await browser.new_page()
        try:
            print("Checking Hope (5174)...")
            await page_hope.goto("http://localhost:5174", timeout=60000)
            title = await page_hope.title()
            print(f"Hope Title: {title}")

            if await page_hope.is_visible("text=Manifesto"):
                await page_hope.click("text=Manifesto")
                await page_hope.wait_for_selector("text=The Architect's Manifesto", timeout=10000)
                print("Hope: Manifesto Verified")

                # Check for Article 21
                if await page_hope.is_visible("text=The Unseen Foundation"):
                     print("Hope: Article Content Verified")
                else:
                     print("Hope: Article Content Missing")

            else:
                 print("Hope: 'Manifesto' link not found")

        except Exception as e:
            print(f"Hope Error: {e}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
