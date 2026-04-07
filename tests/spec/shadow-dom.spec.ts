import { test, expect } from '@playwright/test';
import { ShadowDOMService } from '../../src/utils/shadowDomUtils';

test.skip('shadow DOM interaction demo', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/shadowDemo.html');

  const shadowService = new ShadowDOMService(page);

  // Get elements inside shadow DOM
  const elements = await shadowService.getElements('my-component', 'button');
  console.log('Found buttons:', elements);

  // Update content inside shadow DOM
  await shadowService.updateElement('my-component', 'h2', 'Updated Title via Playwright');

  // Click the button inside shadow DOM
  const shadowButton = shadowService.getLocator('my-component', 'button');
  await shadowButton.click();

  expect(await shadowButton.textContent()).toBe('Clicked!');
});









test('Interact with button inside Shadow DOM', async ({ page }) => {
  // 1. Navigate to the practice page
  await page.goto('https://practice.expandtesting.com/shadowdom');

  // 2. Locate the button inside the shadow host
  // Using the tag name 'button' inside the host is more stable than partial text matching
  const shadowButton = page.locator('#shadow-host >> button');

  // 3. Optional: Wait for the host to hydrate
  await page.locator('#shadow-host').waitFor({ state: 'visible' });

  // 4. Click the button
  await shadowButton.click();

  // 5. Verification (The button text usually changes or an alert appears)
  // await expect(shadowButton).toBeVisible();
  console.log('Successfully clicked the button inside the Shadow DOM');
});