import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly welcomeMessage: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.getByRole('heading', { name: 'Dashboard' });
    this.logoutButton = page.getByRole('button', { name: /profile/i });
  }

  async verifyLoggedIn() {
    await this.welcomeMessage.waitFor({ state: 'visible', timeout: 15000 });
  }

  async logout() {
    await this.logoutButton.click();
    await this.page.getByRole('menuitem', { name: /logout/i }).click();
  }
}
