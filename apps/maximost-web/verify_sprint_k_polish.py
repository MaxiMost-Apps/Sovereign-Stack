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

        # 1. Verify Daily Habit Row Color
        print("Taking daily view screenshot...")
        page.screenshot(path="verification_daily_color.png")

        # 2. Verify Weekly Matrix Drag Handle
        print("Switching to Weekly View...")
        weekly_btn = page.get_by_role("button", name="weekly")
        weekly_btn.click()

        page.wait_for_timeout(1000)

        print("Taking weekly view screenshot...")
        page.screenshot(path="verification_weekly_color.png")

        browser.close()

if __name__ == "__main__":
    run()
