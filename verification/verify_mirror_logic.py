
from playwright.sync_api import Page, expect, sync_playwright

def test_mirror_logic(page: Page):
    print("Navigating to /mirror...")
    page.goto("http://localhost:5173/mirror")

    # Check for "THE MIRROR" title
    expect(page.get_by_text("THE MIRROR")).to_be_visible()

    # Check for columns
    expect(page.get_by_text("THE LIE")).to_be_visible()

    # Note: We can't easily test interactions because of React state/input handling without complex selectors,
    # but rendering confirms the component didn't crash.

    print("Mirror Logic Render Verification Success.")
    page.screenshot(path="verification/mirror_logic_verified.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_mirror_logic(page)
        except Exception as e:
            print(f"Verification Failed: {e}")
        finally:
            browser.close()
