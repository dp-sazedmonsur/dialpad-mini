
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

x# Test case: Verify user cannot place a call with invalid phone number
def test_cannot_start_call_with_invalid_number(browser_and_page):
    # Login
    browser_and_page.click("text=Login")
    browser_and_page.fill("#username", "demo@dialpad.com")
    browser_and_page.fill("#password", "password123")
    browser_and_page.click("text=Sign In")

    # Navigate to Make a call
    browser_and_page.click("text=Make a call")
    browser_and_page.fill("#phone", "abc123")  # Invalid input
    browser_and_page.click("text=Start a call")

    # Status should not show "Calling..."
    assert browser_and_page.query_selector("#call-status").text_content() != "Calling... - Demo mode"
    # Error message or default state expected
    assert "Enter a phone number" in browser_and_page.query_selector("#call-status").text_content()

    browser_and_page.click("text=Close")
    browser_and_page.click("text=Log Out")


# Test case: Verify multiple calls cannot be started simultaneously
def test_cannot_start_multiple_calls(browser_and_page):
    # Login
    browser_and_page.click("text=Login")
    browser_and_page.fill("#username", "demo@dialpad.com")
    browser_and_page.fill("#password", "password123")
    browser_and_page.click("text=Sign In")

    # Start first call
    browser_and_page.click("text=Make a call")
    browser_and_page.fill("#phone", "123456789")
    browser_and_page.click("text=Start a call")

    # Try starting another call while one is active
    browser_and_page.click("text=Start a call")

    # Still only one call should be active → "Calling..."
    assert browser_and_page.query_selector("#call-status").text_content() == "Calling... - Demo mode"

    # End the call and clean up
    browser_and_page.click("text=End Call")
    browser_and_page.click("text=Close")
    browser_and_page.click("text=Log Out")


# Test case: Verify logout works correctly after making a call
def test_logout_after_call(browser_and_page):
    # Login
    browser_and_page.click("text=Login")
    browser_and_page.fill("#username", "demo@dialpad.com")
    browser_and_page.fill("#password", "password123")
    browser_and_page.click("text=Sign In")

    # Make and end a call
    browser_and_page.click("text=Make a call")
    browser_and_page.fill("#phone", "123456789")
    browser_and_page.click("text=Start a call")
    browser_and_page.click("text=End Call")

    # Logout
    browser_and_page.click("text=Log Out")

    # Verify redirected to login screen
    assert browser_and_page.is_visible("text=Login")


# Test case: Verify call modal can be closed without making a call
def test_close_modal_without_call(browser_and_page):
    # Login
    browser_and_page.click("text=Login")
    browser_and_page.fill("#username", "demo@dialpad.com")
    browser_and_page.fill("#password", "password123")
    browser_and_page.click("text=Sign In")

    # Open call modal but don’t start a call
    browser_and_page.click("text=Make a call")

    # Close modal directly
    browser_and_page.click("text=Close")
    
    # Ensure status text is reset/hidden
    assert not browser_and_page.is_visible("#call-status")
    browser_and_page.click("text=Log Out")

