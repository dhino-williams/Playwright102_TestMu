import { test, expect } from '@playwright/test';

test('Scenario 2: Drag & Drop Sliders Interaction', async ({ page }) => {
  // 1. Open the page directly to ensure fast execution
  await page.goto('https://www.testmuai.com/selenium-playground/drag-drop-range-sliders-demo/', {
    waitUntil: 'domcontentloaded'
  });

  // 2. Best Practice: Target the correct unique element using its dedicated ID
  const outputValue = page.locator('#rangeSuccess');
  // Find the exact sibling range input element associated with this output block
  const slider = page.locator('input[type="range"]').filter({ has: page.locator('~ #rangeSuccess') });

  // Ensure element is visible and scrolled into position cleanly
  await slider.scrollIntoViewIfNeeded();

  // 3. Get the physical bounding box to simulate a real drag interaction
  const sliderBox = await slider.boundingBox();
  if (!sliderBox) throw new Error("Slider bounding box could not be retrieved.");

  // Calculate starting and destination mouse track positions
  const startX = sliderBox.x + (sliderBox.width * 0.15); // Approximate initial value position (15)
  const startY = sliderBox.y + (sliderBox.height / 2);
  const targetX = sliderBox.x + (sliderBox.width * 0.95); // Destination track position (95)

  // 4. Perform a human-like click and slide gesture to fully trigger frontend event scripts
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(targetX, startY, { steps: 20 }); // Incremental steps guarantee the drag event bubbles up
  await page.mouse.up();

  // 5. Fine-tune precisely using arrow key adjustments if micro layout differences fall short
  let currentVal = await outputValue.innerText();
  while (currentVal !== '95') {
    await slider.focus();
    if (parseInt(currentVal) < 95) {
      await page.keyboard.press('ArrowRight');
    } else {
      await page.keyboard.press('ArrowLeft');
    }
    currentVal = await outputValue.innerText();
  }

  // 6. Final Validation assertion
  await expect(outputValue).toHaveText('95');
});