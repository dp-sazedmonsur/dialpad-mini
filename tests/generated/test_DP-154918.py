
import pytest
from playwright.sync_api import sync_playwright

# Fixture to set up the browser and page
@pytest.fixture(scope="function")
def browser_and_page():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://dialpad-mini.lovable.app/")
        yield page
        browser.close()

# Test case: Verify that the "Call in progress" text is replaced with "Calling..." when a call is active
def test_call_modal_shows_calling_instead_of_call_in_progress(browser_and_page):
    # Login
    browser_and_page.click("text=Login")
    browser_and_page.fill("#username", "demo@dialpad.com")
    browser_and_page.fill("#password", "password123")
    browser_and_page.click("text=Sign In")

    # Make a call
    browser_and_page.click("text=Make a call")
    browser_and_page.fill("#phone", "123456789")
    browser_and_page.click("text=Start a call")

    # Verify that "Call in progress" is replaced with "Calling..."
    assert browser_and_page.query_selector("#call-status").text_content() != "Call in progress - Demo mode"
    assert browser_and_page.query_selector("#call-status").text_content() == "Calling... - Demo mode"

    # End the call
    browser_and_page.click("text=End Call")
    browser_and_page.click("text=Close")
    browser_and_page.click("text=Log Out")

# Test case: Verify that the "Call in progress" text is not replaced when a call is not active
def test_call_modal_does_not_show_calling_when_no_call_is_active(browser_and_page):
    # Login
    browser_and_page.click("text=Login")
    browser_and_page.fill("#username", "demo@dialpad.com")
    browser_and_page.fill("#password", "password123")
    browser_and_page.click("text=Sign In")

    # Verify that "Call in progress" is not visible
    browser_and_page.click("text=Make a call")
    assert browser_and_page.query_selector("#call-status").text_content() != "Call in progress - Demo mode"
    assert browser_and_page.query_selector("#call-status").text_content() == "Enter a phone number to start a demo call"

    browser_and_page.click("text=Close")
    browser_and_page.click("text=Log Out")
