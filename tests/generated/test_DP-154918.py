
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
def test_call_in_progress_text_updated(page):
    # Given the user is logged in
    page.click("text=Login")
    page.fill("#username", "demo@dialpad.com")
    page.fill("#password", "password123")
    page.click("text=Sign In")
    page.wait_for_selector("text=Make a call")

    # When the user clicks the "Start a call" button
    page.fill("#phone", "123456789")
    page.click("text=Start a call")

    # Then the "Call in progress" text should be updated to "Calling..."
    assert page.inner_text("#call-status") == "Calling... - Demo mode"
    assert page.inner_text("#call-status") != "Call in progress - Demo mode"

# Test case 2: Verify that the "Calling..." text is visible when a call is in progress
def test_calling_text_is_visible(page):
    # Given the user is logged in
    page.click("text=Login")
    page.fill("#username", "demo@dialpad.com")
    page.fill("#password", "password123")
    page.click("text=Sign In")
    page.wait_for_selector("text=Make a call")

    # When the user clicks the "Start a call" button
    page.fill("#phone", "123456789")
    page.click("text=Start a call")

    # Then the "Calling..." text should be visible
    assert page.inner_text("#call-status") == "Calling... - Demo mode"

# Test case 3: Verify that the "Calling..." text is not visible when a call is not in progress
def test_calling_text_is_not_visible(page):
    # Given the user is logged in
    page.click("text=Login")
    page.fill("#username", "demo@dialpad.com")
    page.fill("#password", "password123")
    page.click("text=Sign In")
    page.wait_for_selector("text=Make a call")

    # Then the "Calling..." text should not be visible
    assert page.inner_text("#call-status") != "Calling... - Demo mode"
    assert page.inner_text("#call-status") == "Enter a phone number to start a demo call"

# Test case 4: Verify that the "Call in progress" text is not visible when a call is not in progress
def test_call_in_progress_text_is_not_visible(page):
    # Given the user is logged in
    page.click("text=Login")
    page.fill("#username", "demo@dialpad.com")
    page.fill("#password", "password123")
    page.click("text=Sign In")
    page.wait_for_selector("text=Make a call")
