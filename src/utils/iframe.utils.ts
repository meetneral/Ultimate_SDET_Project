import { Frame } from '@playwright/test';

export class IframeUtil {
  private frame: Frame;

  constructor(frame: Frame) {
    this.frame = frame;
  }

  async getContentsOfIframes() {
    return await this.frame.locator('*').all();
  }

  async updateContentInIframe(newContent: string) {
    await this.frame.setContent(newContent);
  }
}

import { FrameLocator, Locator } from '@playwright/test';

export class FrameLocatorUtil {
  private frameLocator: FrameLocator;

  constructor(frameLocator: FrameLocator) {
    this.frameLocator = frameLocator;
  }

  // Get all elements inside the iframe
  async getContentsOfIframes(): Promise<Locator[]> {
    return await this.frameLocator.locator('*').all();
  }

  // Update content of a specific element inside the iframe
  async updateElementContent(selector: string, newContent: string): Promise<void> {
    const element = this.frameLocator.locator(selector);
    await element.evaluate((el, content) => {
      el.innerHTML = content;
    }, newContent);
  }

  // Example: click a button inside the iframe
  async clickButton(selector: string): Promise<void> {
    await this.frameLocator.locator(selector).click();
  }
}
