import { test, expect } from '@playwright/test';

test('Scenario 3: Input Form Submit Interventions', async ({ page }) => {
  // 1. Route directly to the form subpage and don't block on heavy tracking assets
  await page.goto('https://www.testmuai.com/selenium-playground/input-form-demo', {
    waitUntil: 'domcontentloaded'
  });

  const submitButton = page.getByRole('button', { name: 'Submit' });
  const nameInput = page.locator('input#name');

  // 2. Click “Submit” without filling in any information to trigger the native validation message
  await submitButton.click();

  // 3. Assert native validation message safely matching browser layout differences
  const validationMessage = await nameInput.evaluate((el: HTMLInputElement) => el.validationMessage);
  expect(['Please fill out this field.', 'Please fill in this field.']).toContain(validationMessage);

  // 4. Fill in Name, Email, and all remaining fields using explicit locators
  await nameInput.fill('John Doe');
  await page.locator('input#inputEmail4').fill('johndoe@example.com');
  await page.locator('input#inputPassword4').fill('SecurePassword123');
  await page.locator('input#company').fill('Automation Corp');
  await page.locator('input#websitename').fill('https://example.com');
  
  // 5. From the Country drop-down, select “United States” using the text property
  await page.locator('select[name="country"]').selectOption({ label: 'United States' });

  await page.locator('input#inputCity').fill('San Francisco');
  await page.locator('input#inputAddress1').fill('123 Testing St');
  await page.locator('input#inputAddress2').fill('Suite 400');
  await page.locator('input#inputState').fill('California');
  await page.locator('input#inputZip').fill('94105');

  // 6. Click “Submit” to send the finalized valid data
  await submitButton.click();

  // 7. Validate the success message text block injection directly
  const successMessage = page.locator('.success-msg');
  await expect(successMessage).toContainText('Thanks for contacting us, we will get back to you shortly.');
});