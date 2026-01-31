from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to preview dashboard...")
        url = "http://localhost:5175/preview-dashboard"

        # Check console logs
        page.on("console", lambda msg: print(f"PAGE LOG: {msg.text}"))
        page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))

        try:
            page.goto(url, timeout=30000)
        except:
            print("Failed to load page.")
            sys.exit(1)

        # 1. Verify Header "Today's Mission"
        try:
            page.wait_for_selector("text=Today's Mission", timeout=10000)
            print("✅ 'Today's Mission' Verified")
        except:
            print("❌ 'Today's Mission' Not Found")
            page.screenshot(path="debug_classic_dashboard.png")
            sys.exit(1)

        # 2. Verify Tab Switcher (DAILY, WEEKLY, MONTHLY)
        if page.locator("button:text-is('DAILY')").is_visible() and page.locator("button:text-is('WEEKLY')").is_visible():
             print("✅ Tab Switcher Verified")
        else:
             print("❌ Tab Switcher Missing")

        # 3. Verify Absolute Habits Section
        if page.locator("text=Absolute Habits").is_visible():
             print("✅ 'Absolute Habits' Section Verified")
        else:
             print("❌ 'Absolute Habits' Section Missing")

        page.screenshot(path="verification_classic_dashboard.png")
        print("Captured verification screenshot.")

        browser.close()

if __name__ == "__main__":
    run()
