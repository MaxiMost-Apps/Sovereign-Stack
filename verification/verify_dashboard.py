
from playwright.sync_api import Page, expect, sync_playwright
import time

def test_dashboard_render(page: Page):
    # 1. Arrange: Go to the Dashboard.
    print("Navigating to dashboard...")
    page.goto("http://localhost:5173/")

    # 2. Act: Wait for load.
    # The dashboard usually has a title or specific text.
    # Based on the code I modified, it should have "The Architect" or "Protocol" or "Library".
    # I replaced "The Architect" with "Blueprints" in memory, but let's look for "HABIT LIBRARY" or specific habits.

    print("Waiting for content...")
    # "Morning Protocol" is a category in the sovereign library.
    try:
        page.wait_for_selector("text=Morning Protocol", timeout=10000)
        print("Found 'Morning Protocol'")
    except:
        print("Could not find 'Morning Protocol', dumping page content...")
        print(page.content())

    # Check for the Mirror link in the sidebar or navigation (if visible) or just try to navigate to it.
    # But here I just want to verify the Dashboard itself isn't crashing (White Screen of Death).

    # 3. Assert: Check for a known habit from the Sovereign Library
    # "Cold Plunge" or "Meditation"
    expect(page.get_by_text("Meditation")).to_be_visible()

    # 4. Screenshot
    print("Taking screenshot...")
    page.screenshot(path="verification/dashboard_verified.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_dashboard_render(page)
            print("Verification script finished successfully.")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
