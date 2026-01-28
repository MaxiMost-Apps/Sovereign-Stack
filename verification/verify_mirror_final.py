
from playwright.sync_api import Page, expect, sync_playwright

def test_mirror_render(page: Page):
    print("Navigating to /mirror...")
    page.goto("http://localhost:5173/mirror")

    # The Mirror page should have "THE MIRROR" or "Accountability Mirror" text.
    # From code: <h1 ...>The Mirror</h1>

    print("Waiting for title...")
    expect(page.get_by_text("The Mirror", exact=True)).to_be_visible()

    # Check for the textarea
    expect(page.get_by_placeholder("State your excuse...")).to_be_visible()

    print("Taking screenshot...")
    page.screenshot(path="verification/final_mirror_verified.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_mirror_render(page)
            print("Mirror verification success.")
        except Exception as e:
            print(f"Mirror verification failed: {e}")
        finally:
            browser.close()
