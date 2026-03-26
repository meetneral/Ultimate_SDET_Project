import { chromium, Browser, Page, BrowserContext } from 'playwright';

export class ShadowDOMTester {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;

  async launch() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async navigateTo(url: string) {
    if (!this.page) throw new Error('Browser not launched');
    await this.page.goto(url);
  }

  async testShadowDOM() {
    if (!this.page) throw new Error('Browser not launched');

    // Wait for the page to load
    await this.page.waitForLoadState('networkidle');
    console.log('Page loaded successfully');

    // Try to find and interact with shadow DOM elements
    try {
      // Example: Find all shadow DOM host elements
      const hosts = await this.page.locator('sl-button').count();
      console.log(`Found ${hosts} Shoelace button elements`);

      if (hosts > 0) {
        // Get text from first shadow DOM element
        const firstButton = this.page.locator('sl-button').first();
        const text = await firstButton.textContent();
        console.log(`Button text: ${text}`);

        // Click the button
        await firstButton.click();
        console.log('Button clicked successfully');
      }
    } catch (error) {
      console.error('Error interacting with shadow DOM:', error);
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Run the test
(async () => {
  const tester = new ShadowDOMTester();
  
  try {
    await tester.launch();
    console.log('Browser launched');
    
    await tester.navigateTo('https://shoelace.style/components/button');
    console.log('Navigated to Shoelace website');
    
    await tester.testShadowDOM();
    
    // Keep browser open for 5 seconds to see the result
    await new Promise(resolve => setTimeout(resolve, 5000));
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await tester.close();
    console.log('Browser closed');
  }
})();
