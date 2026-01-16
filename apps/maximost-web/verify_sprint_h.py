from playwright.sync_api import sync_playwright, expect
import datetime

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        print("Navigating to login page...")
        page.goto("http://localhost:5173/login")

        # Wait for the "Continue as Guest" button and click it
        print("Clicking 'Continue as Guest'...")
        guest_button = page.get_by_text("Continue as Guest (Demo)")
        expect(guest_button).to_be_visible()
        guest_button.click()

        # Wait for dashboard to load
        print("Waiting for dashboard...")
        page.wait_for_url("**/dashboard")

        # 1. Verify Settings v2.0
        print("Navigating to Settings...")
        page.goto("http://localhost:5173/settings")

        print("Checking for v2.0 indicator...")
        v2_indicator = page.get_by_text("Settings Module v2.0")
        expect(v2_indicator).to_be_visible()
        page.screenshot(path="verification_settings_v2.png")

        # 2. Verify Weekly Matrix Z-Index (indirectly via screenshot)
        print("Navigating to Dashboard Weekly View...")
        page.goto("http://localhost:5173/dashboard")
        weekly_btn = page.get_by_role("button", name="weekly")
        weekly_btn.click()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification_weekly_zindex.png")

        browser.close()

if __name__ == "__main__":
    run()
