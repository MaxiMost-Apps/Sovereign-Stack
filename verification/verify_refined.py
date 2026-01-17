
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            page.goto("http://localhost:5174")
            page.wait_for_selector("text=The Sovereign Soul")
            page.screenshot(path="verification/home_page_refined.png", full_page=True)
            print("Home page refined screenshot captured.")

            # Check navbar links
            links = ["The Path", "Stories", "The Foundation", "The Mirror"]
            for link in links:
                if page.get_by_text(link).count() == 0:
                    print(f"Warning: Link {link} not found in navbar")
                else:
                    print(f"Link {link} found.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
