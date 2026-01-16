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

        # 1. Verify New Navigation (Sidebar & Header)
        print("Verifying new navigation...")
        # Check for "Protocols" link in Sidebar (Command Group)
        # Note: Sidebar might be hidden on mobile/small screens in headless, so we ensure viewport is wide
        page.set_viewport_size({"width": 1280, "height": 720})
        protocols_link = page.get_by_text("Protocols")
        expect(protocols_link).to_be_visible()

        # 2. Verify Protocol Page
        print("Navigating to Protocols Page...")
        protocols_link.click()
        page.wait_for_url("**/protocols")

        # Check for Huberman or Jocko content
        print("Checking for Protocol content...")
        huberman = page.get_by_text("Andrew Huberman")
        expect(huberman).to_be_visible()

        # Take screenshot of protocols
        print("Taking protocols screenshot...")
        page.screenshot(path="verification_protocols.png")

        browser.close()

if __name__ == "__main__":
    run()
