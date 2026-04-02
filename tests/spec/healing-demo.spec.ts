import { test } from '@playwright/test';
import { SmartPage } from '../../src/utils/smartPage';

test('AI Self-Healing Demo', async ({ page }) => {
    const smartPage = new SmartPage(page);
    
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.goto('https://www.website.com/sign-in/?source=SC&country=IN');

    // INTENTIONALLY WRONG XPATH: This element does not exist.
    // The description "The login username input field" will be sent to the LLM.
    await smartPage.click(
        '//input[@id="WRONG_ID_123"]', 
        'The login username input field'
    );

    console.log('Test continued successfully thanks to AI healing!');
});