import { Page, Locator } from '@playwright/test';
import { time } from 'node:console';

export class Authenticity {
  public checkAuthenticity: Locator;
  public authenticity: Locator;
  public chatSupport: Locator;
  public businessSupport: Locator;
  public uniquePincode: Locator;
  public mobileNumber: Locator;
  public email: Locator;
  public checkNowBtn: Locator;

  constructor(public page: Page) {
    this.checkAuthenticity = page.locator('text="Check Authenticity"');
    this.authenticity = page.locator('text=" Authenticity"');
    this.chatSupport = page.locator('text="Chat Support"');
    this.businessSupport = page.locator('text="Business Support"');
    this.uniquePincode = page.locator('//*[@id="#code"]');
    this.mobileNumber = page.locator('//*[@id="phoneNumber"]');
    this.email = page.locator('//*[@id="email"]');
    this.checkNowBtn = page.locator('//button[@id="auth-form"]');
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

  async clickCheckAunthenticity(label: Locator) {
    await this.checkAuthenticity.click();
  }

  async Aunthenticity(label: Locator) {
    await this.authenticity.hover();
  }

  async fillDetails() {
    await this.uniquePincode.fill("#H876643" );
    await this.mobileNumber.fill("9876543211");
    await this.email.fill("test@example.com");
  }
  async clickCheckNow(label: Locator) {
    await this.checkNowBtn.click();
  }
}
