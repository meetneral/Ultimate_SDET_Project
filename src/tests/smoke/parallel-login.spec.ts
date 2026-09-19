import { test, expect } from '../../fixtures/parallel-fixture';
import { LoginPage } from '../../page/LoginPage';
import { HomePage } from '../../page/HomePage';

test.describe('Smoke: parallel login flow', () => {
  test('should login with first unique credential in parallel', async ({ page, executionContext }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.goto();
    await loginPage.login(executionContext.credential.username, executionContext.credential.password);
    await homePage.verifyLoggedIn();

    await expect(page).toHaveURL(/.*secure/i);
    await expect(homePage.welcomeMessage).toContainText(/welcome|secure/i);

    await homePage.logout();
  });

  test('should login with second unique credential in parallel', async ({ page, executionContext }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.goto();
    await loginPage.login(executionContext.credential.username, executionContext.credential.password);
    await homePage.verifyLoggedIn();

    await expect(page).toHaveURL(/.*secure/i);
    await expect(homePage.welcomeMessage).toContainText(/welcome|secure/i);

    await homePage.logout();
  });
});
