
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            page.goto("http://localhost:5174")
            page.wait_for_selector("text=Consult the Oracle")
            page.click("text=Consult the Oracle")
            page.wait_for_timeout(500) # Wait for animation
            page.screenshot(path="verification/hope_stoic.png", full_page=True)
            print("Stoic Generator verification captured.")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
