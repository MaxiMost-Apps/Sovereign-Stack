import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        for port, name in [(5175, "alexis"), (5176, "aegis"), (5174, "hope")]:
            page = await browser.new_page()
            try:
                print(f"Snapshotting {name} on {port}...")
                await page.goto(f"http://localhost:{port}", timeout=10000)
                await page.screenshot(path=f"verification/debug_{name}_home.png", full_page=True)
                title = await page.title()
                print(f"{name} Title: {title}")

                # Print console logs to detect React errors
                page.on("console", lambda msg: print(f"{name} Console: {msg.text}"))
                page.on("pageerror", lambda exc: print(f"{name} Error: {exc}"))

                # Check for root element content
                root_content = await page.inner_html("#root")
                print(f"{name} Root Content Length: {len(root_content)}")

            except Exception as e:
                print(f"Error snapshotting {name}: {e}")

            await page.close()

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
