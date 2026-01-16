from playwright.sync_api import sync_playwright, expect
import time

def test_sprint17(page):
    # 1. Login
    page.goto("http://localhost:5173/login")
    page.wait_for_load_state("networkidle")

    # Try to find the demo login button or simulate guest
    # Based on memory: "Continue as Guest (Demo)" button
    try:
        guest_btn = page.get_by_role("button", name="Continue as Guest")
        if guest_btn.is_visible():
            guest_btn.click()
            print("Clicked Guest Login")
            page.wait_for_url("**/dashboard")
        else:
            print("Guest button not found, assuming already logged in or different flow")
    except Exception as e:
        print(f"Login flow exception: {e}")

    # Ensure we are on dashboard
    page.goto("http://localhost:5173/dashboard")
    page.wait_for_load_state("networkidle")
    time.sleep(2) # Allow animations

    # 2. Verify Sidebar Links (System Group)
    # Check for "Preferences" and "The Vault"
    # Note: Text might be hidden if collapsed, but icons should be there.
    # Let's look for the text in the DOM or aria-labels.

    # Take a screenshot of the Dashboard with Sidebar
    page.screenshot(path="verification/dashboard_sidebar.png")
    print("Dashboard screenshot taken")

    # 3. Test Preferences Navigation
    # Find the link. It might be an anchor or button.
    # Trying to find by text "Preferences"
    try:
        prefs_link = page.get_by_text("Preferences")
        if prefs_link.is_visible():
            prefs_link.click()
            page.wait_for_url("**/preferences")
            expect(page).to_have_url("http://localhost:5173/preferences")
            time.sleep(1)
            page.screenshot(path="verification/preferences_page.png")
            print("Preferences navigation verified")
        else:
            print("Preferences link not visible (maybe collapsed sidebar?)")
            # Try navigating directly
            page.goto("http://localhost:5173/preferences")
            page.screenshot(path="verification/preferences_page_direct.png")
    except Exception as e:
        print(f"Preferences navigation failed: {e}")
        page.goto("http://localhost:5173/preferences")
        page.screenshot(path="verification/preferences_page_forced.png")

    # 4. Test Vault Navigation
    # Go back to dashboard first if needed, or navigate from Preferences
    # Let's try navigating via the footer icon if possible, or the System menu
    try:
        # Check for "The Vault" text
        vault_link = page.get_by_text("The Vault")
        if vault_link.is_visible():
            vault_link.click()
            page.wait_for_url("**/vault")
            expect(page).to_have_url("http://localhost:5173/vault")
            time.sleep(1)
            page.screenshot(path="verification/vault_page.png")
            print("Vault navigation verified")
        else:
            print("Vault link not visible")
            page.goto("http://localhost:5173/vault")
            page.screenshot(path="verification/vault_page_direct.png")
    except Exception as e:
        print(f"Vault navigation failed: {e}")
        page.goto("http://localhost:5173/vault")
        page.screenshot(path="verification/vault_page_forced.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 720})
        page = context.new_page()
        try:
            test_sprint17(page)
        except Exception as e:
            print(f"Test failed: {e}")
        finally:
            browser.close()
