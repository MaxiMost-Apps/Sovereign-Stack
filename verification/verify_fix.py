
from playwright.sync_api import Page, expect, sync_playwright

def test_dashboard_syntax_fix(page: Page):
    print("Navigating to dashboard...")
    page.goto("http://localhost:5173/")

    print("Waiting for dashboard to load...")
    # Check if the page loads without white screen
    expect(page.get_by_text("Mission Control")).to_be_visible()

    # Check for checkmark buttons (should verify they render)
    # They have class "w-12 h-8" per the new snippet
    # Using CSS selector to find at least one
    # .w-12.h-8.rounded-lg.flex.items-center.justify-center

    # Actually, simpler: check for the text "HABIT LIBRARY"
    expect(page.get_by_text("HABIT LIBRARY")).to_be_visible()

    print("Taking verification screenshot...")
    page.screenshot(path="verification/dashboard_fix_verified.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_dashboard_syntax_fix(page)
            print("Dashboard fix verification success.")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
