import { Page, Locator } from '@playwright/test';

export class Homepage {
  public allProducts: Locator;
  public offers: Locator;
  public stores: Locator;
  public ourStory: Locator;
  public authenticity: Locator;
  public chatSupport: Locator;
  public businessSupport: Locator;

  constructor(public page: Page) {
    this.allProducts = page.locator('(//*[text()=" All Products"])[1]');
    this.offers = page.locator('text="Offers"');
    this.stores = page.locator('text=" Stores"');
    this.ourStory = page.locator('text=" Our Story"');
    this.authenticity = page.locator('text=" Authenticity"');
    this.chatSupport = page.locator('text="Chat Support"');
    this.businessSupport = page.locator('text="Business Support"');
  }

  bySelector(selector: string): Locator {
    return this.page.locator(selector);
  }

  byXpath(xpath: string): Locator {
    return this.page.locator(`xpath=${xpath}`);
  }

  async navigate() {
    await this.page.goto('https://www.muscleblaze.com/');
  }

  async clickLabel(label: Locator) {
    await label.hover();
  }
}
