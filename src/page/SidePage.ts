import { Page, Locator } from "@playwright/test";

export default class SidePage {
  readonly page: Page;
  readonly sidebutton: Locator;
  readonly Admin: Locator;
  readonly PIM: Locator;
  readonly Leave: Locator;
  readonly Recruitment: Locator;
  readonly MyInfo: Locator;
  readonly Performance: Locator;
  readonly Dashboard: Locator;
  readonly Directory: Locator;
  readonly Maintenance: Locator;
  readonly claim: Locator;
  readonly buzz: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebutton = page.locator("//button[@type='button' and @role='none']");
    this.Admin = page.locator("//span[text()='Admin']/..");
    this.PIM = page.locator("//span[text()='PIM']/..");
    this.Leave = page.locator("//span[text()='Leave']/..");
    this.Recruitment = page.locator("//span[text()='Recruitment']/..");
    this.MyInfo = page.locator("//span[text()='My Info']/..");
    this.Dashboard = page.locator("//span[text()='Dashboard']/..");
    this.Directory = page.locator("//span[text()='Directory']/..");
    this.Performance = page.locator("//span[text()='Performance']/..");
    this.Maintenance = page.locator("//span[text()='Maintenance']/..");
    this.claim = page.locator("//span[text()='Claim']/..");
    this.buzz = page.locator("//span[text()='Buzz']/..");

    // this.welcomeMessage = page.getByRole('heading', { name: 'Dashboard' });
    // this.logoutButton = page.getByRole('button', { name: /profile/i });
  }

  //   async verifyLoggedIn() {
  //     await this.welcomeMessage.waitFor({ state: 'visible', timeout: 15000 });
  //   }

  //   async logout() {
  //     await this.logoutButton.click();
  //     await this.page.getByRole('menuitem', { name: /logout/i }).click();
  //   }
}
