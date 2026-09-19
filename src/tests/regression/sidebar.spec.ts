import { test, expect } from '../../fixtures/parallel-fixture';
import * as allure from 'allure-js-commons';

test.describe('Regression: sidebar navigation', () => {
  test('should navigate through the authenticated sidebar', async ({ sidebarPage }) => {
    const navigationItems = [
      ['Admin'],
      ['PIM'],
      ['Leave'],
      ['Recruitment'],
      ['My Info'],
      ['Performance'],
      ['Dashboard'],
      ['Directory'],
    //   ['Maintenance'],
      ['Claim'],
    //   ['Buzz'],
    ] as const;

    for (const [label] of navigationItems) {
      await allure.step(`Navigate to ${label}`, async () => {
        await sidebarPage.open(label);
        await expect(sidebarPage.page).toHaveURL(/\/web\/index\.php\//);
        await allure.attachment(`${label} page`, await sidebarPage.page.screenshot(), {
          contentType: 'image/png',
        });
      });
    }
  });
});
