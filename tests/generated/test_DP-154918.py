
import pytest
from playwright.sync_api import sync_playwright

@pytest.fixture
def browser():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        yield browser
        browser.close()

@pytest.fixture
def page(browser):
    page = browser.new_page()
    page.goto("https://dialpad-mini.lovable.app/")
    return page

# Test case 1: Verify that the "Call in progress" text is updated to "Calling..."
def test_call_modal_text_update(page):
    # Preconditions
    page.click("text=Login")
    page.fill("#username", "demo@dialpad.com")
    page.fill("#password", "password123")
    page.click("text=Sign In")
    page.click("text=Make a call")
    page.fill("#phone", "123456789")
    page.click("text=Start a call")

    # Verify that the old text is not visible
    assert page.query_selector("#call-status") is not None
    assert page.inner_text("#call-status") != "Call in progress - Demo mode"

    # Verify that the new text is visible
    assert page.inner_text("#call-status") == "Calling... - Demo mode"

    # Clean up
    page.click("text=End Call")
    page.click("text=Close")
    page.click("text=Log Out")

# Test case 2: Verify that the call flow works as expected
def test_full_call_flow(page):
    # Preconditions
    page.click("text=Login")
    page.fill("#username", "demo@dialpad.com")
    page.fill("#password", "password123")
    page.click("text=Sign In")
    page.click("text=Make a call")
    page.fill("#phone", "123456789")
    page.click("text=Start a call")

    # Verify that the call status is updated
    assert page.inner_text("#call-status") == "Calling... - Demo mode"

    # End the call
    page.click("text=End Call")
    assert page.inner_text("#call-status") != "Calling... - Demo mode"

    # Close the modal
    page.click("text=Close")

    # Verify that the user is logged out
    page.click("text=Log Out")
    assert page.url == "https://dialpad-mini.lovable.app/"
