
from playwright.sync_api import Page, expect, sync_playwright

def test_cache_clear(page: Page):
    print("Navigating to /mirror...")
    page.goto("http://localhost:5173/mirror")

    # Simple check to ensure it loads
    expect(page.get_by_text("THE MIRROR")).to_be_visible()

    print("Mirror Loaded.")
    page.screenshot(path="verification/clean_deploy.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_cache_clear(page)
        except Exception as e:
            print(f"Failed: {e}")
        finally:
            browser.close()
