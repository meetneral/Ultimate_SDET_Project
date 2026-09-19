import { test, expect } from '../../fixtures/parallel-fixture';
import { LoginPage } from '../../page/LoginPage';

test.describe('Regression: login flow 1', () => {
  test.skip('should login with allocated test credential', async ({ page, executionContext }) => {
   await test.step('Login with allocated test credential', async () => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(executionContext.credential.username, executionContext.credential.password);

     await expect(page).toHaveURL(/.*index/);
  });
});
});
