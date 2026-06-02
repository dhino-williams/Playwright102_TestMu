import { test, expect } from '@playwright/test';

test('Scenario 1: Simple Form Demo Assertion', async ({ page }) => {
  // 1. Navigate directly to the simple form subpage
  await page.goto('https://www.testmuai.com/selenium-playground/simple-form-demo/', {
    waitUntil: 'domcontentloaded'
  });

  // 2. Validate that the URL contains “simple-form-demo”
  await expect(page).toHaveURL(/.*simple-form-demo/);

  // 3. Create a variable for a string value
  const customMessage = 'Welcome to TestMu AI';

  // 4. Enter values in the “Enter Message” text box
  const messageInput = page.locator('input#user-message');
  await messageInput.fill(customMessage);

  // 5. Click “Get Checked Value”
  await page.locator('button#showInput').click();

  // 6. Target the explicit message display element directly
 const displayedMessage = page.locator('#message');
await expect(displayedMessage).toHaveText("Welcome to TestMu AI");
});