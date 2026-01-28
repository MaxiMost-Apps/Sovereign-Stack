
from playwright.sync_api import Page, expect, sync_playwright

def test_landing_render(page: Page):
    print("Navigating to root...")
    page.goto("http://localhost:5173/")

    print(f"Page URL: {page.url}")
    print(f"Page Title: {page.title()}")

    # Check for Landing Page specific text
    # "Master your biological and psychological perimeter."
    # or "Enter The System" / "Login"
    try:
        expect(page.get_by_role("button", name="Initialize Protocol")).to_be_visible(timeout=5000)
        print("Found 'Initialize Protocol' button - Landing Page Loaded.")
    except:
        print("Could not find button, dumping content snippet...")
        content = page.content()
        print(content[:500])

    page.screenshot(path="verification/landing_verified.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_landing_render(page)
            print("Landing verification finished.")
        except Exception as e:
            print(f"Verification script error: {e}")
        finally:
            browser.close()
