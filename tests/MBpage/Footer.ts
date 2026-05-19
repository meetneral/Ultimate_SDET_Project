import { Page, Locator, expect } from "@playwright/test";

export class Footer {
  public facebook: Locator;
  public twitter: Locator;
  public instagram: Locator;
  public youtube: Locator;
  public linkdein: Locator;
  public homepageHandle: Page;

  constructor(page: Page) {
    // Initialize footer properties if needed
    this.facebook = page.locator("//*[@alt='facebook']/..");
    this.twitter = page.locator("//*[@alt='X']/..");
    this.instagram = page.locator("//*[@alt='instagram']/..");
    this.youtube = page.locator("//*[@alt='youtube']/..");
    this.linkdein = page.locator("//*[@alt='linkedin']/..");
    this.homepageHandle = page.context().pages()[0];
  }

  public async scroolToFooter() {
    await this.facebook.scrollIntoViewIfNeeded();
  }
  public async clickFacebookandNavigate() {
    await this.facebook.click();
    await this.homepageHandle.bringToFront();
    await expect(this.homepageHandle).toHaveURL("https://www.muscleblaze.com/");
  }
  public async clickTwitterandNavigate() {
    await this.twitter.click();
    await this.homepageHandle.bringToFront();
    await expect(this.homepageHandle).toHaveURL("https://www.muscleblaze.com/");
  }
  public async clickInstagramandNavigate() {
    await this.instagram.click();
    await this.homepageHandle.bringToFront();
    await expect(this.homepageHandle).toHaveURL("https://www.muscleblaze.com/");
  }
  public async clickYoutubeandNavigate() {
    await this.youtube.click();
    await this.homepageHandle.bringToFront();
    await expect(this.homepageHandle).toHaveURL("https://www.muscleblaze.com/");
  }
    public async clickLinkedinandNavigate() {    
    await this.linkdein.click();
    await this.homepageHandle.bringToFront();
    await expect(this.homepageHandle).toHaveURL("https://www.muscleblaze.com/");
  }
}
