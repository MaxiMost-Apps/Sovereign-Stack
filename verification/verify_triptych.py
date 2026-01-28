
from playwright.sync_api import Page, expect, sync_playwright

def test_triptych_render(page: Page):
    print("Navigating to /mirror...")
    page.goto("http://localhost:5173/mirror")

    # Check for "THE MIRROR" title
    expect(page.get_by_text("THE MIRROR", exact=True)).to_be_visible()

    # Check for "Attempts Remaining"
    expect(page.get_by_text("Attempts Remaining")).to_be_visible()

    # Check for Columns
    expect(page.get_by_text("THE LIE")).to_be_visible()
    expect(page.get_by_text("THE POISON")).to_be_visible()
    expect(page.get_by_text("THE DRIFT")).to_be_visible()

    print("Verification Success")
    page.screenshot(path="verification/triptych_verified.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_triptych_render(page)
        except Exception as e:
            print(f"Verification Failed: {e}")
        finally:
            browser.close()
