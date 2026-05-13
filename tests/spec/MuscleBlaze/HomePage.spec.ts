import { test, expect } from '@playwright/test';
import { Homepage } from '../../MBpage/Homepage';

test.describe('Homepage', () => {
  let homepage: Homepage;

  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
  });

  test('should navigate to the homepage and click the label', async ({ page }) => {
    await homepage.navigate();
    await homepage.clickLabel(homepage.allProducts);
    await homepage.clickLabel(homepage.offers);
    await homepage.clickLabel(homepage.stores);
    await homepage.clickLabel(homepage.ourStory);
    await homepage.clickLabel(homepage.authenticity);
    await homepage.clickLabel(homepage.chatSupport);
    await homepage.clickLabel(homepage.businessSupport);

    // Assertion
    await expect(page).toHaveURL('https://www.muscleblaze.com/');
  });
});
