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
        # We can't easily assert color computation, but we can verify the element structure update.
        # We check if the button class contains the expected classes or style attributes if we could inspect them.
        # For now, we take a screenshot to visually confirm the "Neon Pulse" and color.
        print("Taking daily view screenshot...")
        page.screenshot(path="verification_daily_harmony.png")

        # 2. Verify Weekly Matrix Z-Index & Drag Handle
        print("Switching to Weekly View...")
        weekly_btn = page.get_by_role("button", name="weekly")
        weekly_btn.click()

        # Wait for render
        page.wait_for_timeout(1000)

        # Verify Drag Handle Presence (indirectly via screenshot or finding the element)
        # We added GripVertical, so we can look for the svg or container class.
        # The class is "absolute left-2 text-slate-600 cursor-grab active:cursor-grabbing bg-black/50 p-1 rounded"
        # Let's just screenshot.

        print("Taking weekly view screenshot...")
        page.screenshot(path="verification_weekly_harmony.png")

        browser.close()

if __name__ == "__main__":
    run()
