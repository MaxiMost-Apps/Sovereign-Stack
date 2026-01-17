
from playwright.sync_api import sync_playwright

def verify_dashboard():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Note: This will likely fail to load data because the backend is not running in the same process
            # and I cannot easily start the full stack here.
            # However, I can check if the server serves the page.
            page.goto('http://localhost:5173')
            page.wait_for_timeout(5000) # Wait for load
            page.screenshot(path='verification/dashboard.png')
            print('Screenshot taken')
        except Exception as e:
            print(f'Error: {e}')
        finally:
            browser.close()

if __name__ == '__main__':
    verify_dashboard()
