import { test, expect } from '@playwright/test';

test.describe('Shadow DOM Testing', () => {
  test('should interact with shadow DOM elements on Shoelace website', async ({ page }) => {
    // Navigate to the Shoelace website
    await page.goto('https://shoelace.style/components/button');
    console.log('Navigated to Shoelace website');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    console.log('Page loaded successfully');

    // Close any modal dialogs that might be blocking interactions
    // const dialog = page.locator('sl-dialog[open]');
    // const dialogCount = await dialog.count();
    // if (dialogCount > 0) {
    //   console.log('Found modal dialog, closing it...');
    //   // Click the close button in the dialog
    //   const closeButton = dialog.locator('button[aria-label="Close"]').first();
    //   if (await closeButton.isVisible()) {
    //     await closeButton.click();
    //     await page.waitForTimeout(500);
    //   }
    // }
    await page.locator('//*[@id="wa-dialog"]/div[2]/div/sl-button//button/slot[2]').click();
    console.log('Closed modal dialog if it was present');

    // Find and interact with shadow DOM elements
    // Shoelace buttons are web components with shadow DOM
    const buttonLocator = page.locator('sl-button').nth(5); // Skip the first few buttons in the dialog area
    
    // Check if button exists
    const buttonCount = await page.locator('sl-button').count();
    expect(buttonCount).toBeGreaterThan(0);
    console.log(`Found ${buttonCount} Shoelace button elements`);

    // Get text from the button
    const buttonText = await buttonLocator.textContent();
    console.log(`Button text: ${buttonText}`);

    // Click the button
    await buttonLocator.click();
    console.log('Button clicked successfully');

    // Verify the button is visible
    await expect(buttonLocator).toBeVisible();

    // Take a screenshot to verify the shadow DOM rendering
    await page.screenshot({ path: 'shadow-dom-test.png' });
    console.log('Screenshot saved');
  });

  test('should access shadow DOM properties', async ({ page }) => {
    await page.goto('https://shoelace.style/components/button');
    await page.waitForLoadState('networkidle');

    // Use page.evaluate to access shadow DOM from within browser context
    const result = await page.evaluate(() => {
      const button = document.querySelector('sl-button');
      if (button) {
        return {
          tagName: button.tagName,
          hasAttribute: button.hasAttribute('disabled'),
        };
      }
      return null;
    });

    console.log('Shadow DOM element properties:', result);
    expect(result).toBeTruthy();
  });
});
