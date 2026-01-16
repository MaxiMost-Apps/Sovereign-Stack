from playwright.sync_api import sync_playwright, expect
import time

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

        # Wait for element to be visible
        expect(guest_button).to_be_visible()
        guest_button.click()

        # Wait for dashboard to load (checking URL)
        print("Waiting for dashboard...")
        page.wait_for_url("**/dashboard")

        # Navigate to The Toolkit page
        print("Navigating to Master Toolbelt page...")
        page.goto("http://localhost:5173/academy/toolkit")

        # Verify the title "MASTER TOOLBELT" is present
        print("Verifying page content...")
        header = page.get_by_role("heading", name="MASTER TOOLBELT")
        expect(header).to_be_visible()

        # Verify at least one module (e.g., "TACTICAL SLEEP")
        module_text = page.get_by_text("TACTICAL SLEEP")
        expect(module_text).to_be_visible()

        # Take a screenshot
        print("Taking screenshot...")
        page.screenshot(path="verification_toolkit.png")
        print("Screenshot saved to verification_toolkit.png")

        browser.close()

if __name__ == "__main__":
    run()
