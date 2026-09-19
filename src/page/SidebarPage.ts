import { Page, Locator } from '@playwright/test';

export class SidebarPage {
  readonly page: Page;
  readonly dashboardLink: Locator;
  readonly adminLink: Locator;
  readonly pimLink: Locator;
  readonly leaveLink: Locator;
  readonly timeLink: Locator;
  readonly recruitmentLink: Locator;
  readonly myInfoLink: Locator;
  readonly performanceLink: Locator;
  readonly directoryLink: Locator;
  readonly maintenanceLink: Locator;
  readonly claimLink: Locator;
  readonly buzzLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.adminLink = page.getByRole('link', { name: 'Admin' });
    this.pimLink = page.getByRole('link', { name: 'PIM' });
    this.leaveLink = page.getByRole('link', { name: 'Leave' });
    this.timeLink = page.getByRole('link', { name: 'Time' });
    this.recruitmentLink = page.getByRole('link', { name: 'Recruitment' });
    this.myInfoLink = page.getByRole('link', { name: 'My Info' });
    this.performanceLink = page.getByRole('link', { name: 'Performance' });
    this.directoryLink = page.getByRole('link', { name: 'Directory' });
    this.maintenanceLink = page.getByRole('link', { name: 'Maintenance' });
    this.claimLink = page.getByRole('link', { name: 'Claim' });
    this.buzzLink = page.getByRole('link', { name: 'Buzz' });
  }

  async expectVisible() {
    await this.dashboardLink.waitFor({ state: 'visible' });
  }

  async open(name: string) {
    await this.page.getByRole('link', { name, exact: true }).click();
  }
}
