import { test, expect } from '@playwright/test';

test.describe('Rakuten Global Localization Suite', () => {

  test('Search validation on Rakuten Japan with ja-JP locale', async ({ browser }) => {

    const context = await browser.newContext({
      locale: 'ja-JP',
      timezoneId: 'Asia/Tokyo',
      viewport: { width: 1920, height: 1080 } // Your maximized resolution
    });
    const page = await context.newPage();

  
    await page.goto('https://www.rakuten.co.jp/');

    // 3. Locate the Search Bar (Handling potential Shadow DOM or dynamic IDs)
    const searchBar = page.locator('#common-header-search-input, input[name="item"]');
    await expect(searchBar).toBeVisible({ timeout: 15000 });

    // 4. Perform Search using Japanese characters (e.g., "Switch")
    await searchBar.fill('Switch');
    await page.keyboard.press('Enter');

    // 5. Validate the Results Page
    // We check for the Japanese word for "Results" or the presence of Yen (¥)
    const resultCount = page.locator('.searchresultitem, .rsltCnt'); 
    await expect(resultCount.first()).toBeVisible();

    // 6. Verification: Check if price contains Yen symbol
    const priceElement = page.locator('.important').first();
    const priceText = await priceElement.innerText();
    console.log(`First item price: ${priceText}`);
    
    expect(priceText).toContain('円'); // '円' is the Japanese char for Yen

    await context.close();
  });



test.only('Translate Japanese site via Google Translate', async ({ page }) => {
  // Open Google Translate with the Japanese site URL
  const targetUrl = 'https://www.rakuten.co.jp/';

  await 
  await page.goto(`https://translate.google.com/translate?sl=ja&tl=en&u=${encodeURIComponent(targetUrl)}`);

  // Now the page is shown in English
  await expect(page.locator('body')).toContainText('Expected English Text');
});



});

