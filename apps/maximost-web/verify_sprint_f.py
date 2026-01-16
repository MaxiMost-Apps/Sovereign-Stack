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

        # 1. Verify Settings Page
        print("Navigating to Settings...")
        page.goto("http://localhost:5173/settings")
        # Verify Neural Archives
        print("Checking Neural Archives...")
        archives = page.get_by_text("Neural Archives")
        expect(archives).to_be_visible()
        # Screenshot Settings
        page.screenshot(path="verification_settings.png")

        # 2. Verify Architect Page
        print("Navigating to Architect Page...")
        page.goto("http://localhost:5173/academy/architect")
        # Verify Content (The 4 Laws)
        print("Checking Content...")
        law_content = page.get_by_text("1. Make it Obvious (The Cue).")
        expect(law_content).to_be_visible()
        # Screenshot Architect
        page.screenshot(path="verification_architect.png")

        browser.close()

if __name__ == "__main__":
    run()
