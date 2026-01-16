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

        # 1. Verify Date Header
        print("Verifying date header...")
        today = datetime.datetime.now()
        date_str = today.strftime("%A, %b")
        header = page.get_by_role("heading", name=date_str)
        expect(header).to_be_visible()

        # 2. Verify No Confetti (Visual check mainly, but we can verify element class)
        # We replaced the confetti button with motion.button

        # 3. Verify Modal Button Text logic
        print("Opening New Habit Modal...")
        new_habit_btn = page.get_by_role("button", name="+ New Habit")
        new_habit_btn.click()

        print("Checking button text for 'Create Protocol'...")
        create_btn = page.get_by_role("button", name="Create Protocol")
        expect(create_btn).to_be_visible()

        # Close modal
        page.get_by_text("Cancel").click()

        # Take screenshot
        print("Taking final screenshot...")
        page.screenshot(path="verification_sprint_g.png")

        browser.close()

if __name__ == "__main__":
    run()
