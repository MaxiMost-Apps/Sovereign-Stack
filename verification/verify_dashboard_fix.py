
from playwright.sync_api import Page, expect, sync_playwright

def test_dashboard_fix(page: Page):
    print("Navigating to dashboard...")
    page.goto("http://localhost:5173/")

    # Check for "Mission Control"
    expect(page.get_by_text("Mission Control")).to_be_visible()

    # Check for "Habit Library"
    expect(page.get_by_text("Habit Library")).to_be_visible()

    # Crucial: Check that "Absolute Protocol" is visible.
    # The fix ensures items show up even if user has no data.
    # "Morning Sunlight" is an Absolute habit in Sovereign Library.
    expect(page.get_by_text("Absolute Protocol")).to_be_visible()
    expect(page.get_by_text("Morning Sunlight")).to_be_visible()

    print("Verification Success: Dashboard is populated.")
    page.screenshot(path="verification/dashboard_fix_verified.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_dashboard_fix(page)
        except Exception as e:
            print(f"Verification Failed: {e}")
        finally:
            browser.close()
