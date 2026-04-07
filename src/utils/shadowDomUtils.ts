// shadow-dom.service.ts
import { Page, Locator } from '@playwright/test';

export class ShadowDOMService {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Get elements inside a shadow root
   * @param hostSelector - CSS selector for the shadow host
   * @param innerSelector - CSS selector inside shadow root
   */
  async getElements(hostSelector: string, innerSelector: string): Promise<string[]> {
    return await this.page.evaluate(
      ([hostSelector, innerSelector]) => {
        const host = document.querySelector(hostSelector);
        if (!host || !host.shadowRoot) return [];
        return Array.from(host.shadowRoot.querySelectorAll(innerSelector)).map(el => el.outerHTML);
      },
      [hostSelector, innerSelector]
    );
  }

  /**
   * Update element content inside shadow root
   * @param hostSelector - CSS selector for the shadow host
   * @param innerSelector - CSS selector inside shadow root
   * @param newContent - new HTML/text content
   */
  async updateElement(hostSelector: string, innerSelector: string, newContent: string): Promise<void> {
    await this.page.evaluate(
      ([hostSelector, innerSelector, newContent]) => {
        const host = document.querySelector(hostSelector);
        if (!host || !host.shadowRoot) return;
        const target = host.shadowRoot.querySelector(innerSelector);
        if (target) target.innerHTML = newContent;
      },
      [hostSelector, innerSelector, newContent]
    );
  }

  /**
   * Get a Playwright Locator for an element inside shadow DOM
   * (uses built-in shadow selector support)
   */
  getLocator(hostSelector: string, innerSelector: string): Locator {
    return this.page.locator(hostSelector).locator(innerSelector);
  }
}
