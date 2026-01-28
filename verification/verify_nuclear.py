
from playwright.sync_api import Page, expect, sync_playwright

def test_nuclear_overwrite(page: Page):
    print("Navigating to dashboard...")
    page.goto("http://localhost:5173/")

    # Check for "Mission Control"
    expect(page.get_by_text("Mission Control")).to_be_visible()

    # Check for "Habit Library" Section header (from new code)
    expect(page.get_by_text("Habit Library")).to_be_visible()

    # Check for at least one library item being rendered.
    # "Morning Sunlight" or "Deep Work" from Sovereign Library.
    # Note: HabitLibrary component is used.
    expect(page.get_by_text("Morning Sunlight")).to_be_visible()

    print("Taking Screenshot...")
    page.screenshot(path="verification/nuclear_verified.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_nuclear_overwrite(page)
            print("Nuclear Verification Success")
        except Exception as e:
            print(f"Verification Failed: {e}")
        finally:
            browser.close()
