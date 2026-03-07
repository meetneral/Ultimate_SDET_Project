import { test } from '@playwright/test';
import { UserApi } from '../../src/api/UserApi';
import { SmartPage } from '../../src/utils/smartPage';
import testData from '../../src/data/testData.json';

for (const data of testData) {
    test(`Hybrid Flow: ${data.desc}`, async ({ page, request }) => {
        const userApi = new UserApi(request);
        const smartPage = new SmartPage(page);

        // 1. Setup: API Call (The Full-Stack Proof)
        const post = await userApi.createUser(data.username, 'Automation_Lead');
        console.log(`Step 1: API Data Created (ID: ${post.id})`);

        // 2. Action: UI Login with Self-Healing
        await page.goto('https://the-internet.herokuapp.com/login');

        // We use the "Smart" click here. 
        // If the ID changes to "WRONG_ID", the AI will heal it.
        await smartPage.click('#username', 'The login username input field');
        await page.fill('#username', data.username);
        
        await smartPage.click('#password', 'The login password input field');
        await page.fill('#password', data.password);

        await smartPage.click('button[type="submit"]', 'The login submit button');

        // 3. Verification
        if (data.desc === 'Valid Login') {
            await page.waitForSelector('.flash.success');
        } else {
            await page.waitForSelector('.flash.error');
        }
    });
}