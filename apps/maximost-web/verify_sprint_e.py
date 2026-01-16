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

        # Verify Date Header
        print("Verifying date header...")
        today = datetime.datetime.now()
        date_str = today.strftime("%A, %b")
        # Matches partial like "Monday, Jan"
        header = page.get_by_role("heading", name=date_str)
        # Note: If day is single digit, strftime might need adjustment if app uses non-padded.
        # Dashboard uses: weekday: 'long', month: 'short', day: 'numeric' -> "Monday, Jan 1"

        # Take a screenshot of the Daily View (default)
        print("Taking daily view screenshot...")
        page.screenshot(path="verification_daily.png")

        # Switch to Weekly View
        print("Switching to Weekly View...")
        weekly_btn = page.get_by_role("button", name="weekly")
        weekly_btn.click()

        # Wait for "ABSOLUTE HABITS" sticky header
        page.wait_for_timeout(1000) # Give it a sec to render

        print("Taking weekly view screenshot...")
        page.screenshot(path="verification_weekly.png")

        browser.close()

if __name__ == "__main__":
    run()
