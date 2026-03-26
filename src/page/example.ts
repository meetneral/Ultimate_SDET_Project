import { chromium } from 'playwright-extra';
import { Page } from "@playwright/test";

const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

export default class Example{
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    /**
     * This method demonstrates how to use stealthSync to slow down the page's interactions,
     * and how to parse the results of a search query.
     * It visits the IRCTC website, searches for trains between PUNE JN and NAGPUR,
     * and then logs all the available trains to the console.
     */
    async exampleMethod() {
     
        await this.page.goto("https://www.irctc.co.in/nget/train-search",{waitUntil: 'domcontentloaded'});
        await this.page.locator('(//*[@role="searchbox"])[1]').fill('PUNE JN - PUNE (PUNE)');
        await this.page.waitForTimeout(1000); // Wait for suggestions to load
        await this.page.keyboard.press('Enter');
        await this.page.locator('(//*[@role="searchbox"])[2]').fill('NAGPUR - NGP (NAGPUR)');
        await this.page.waitForTimeout(1000); // Wait for suggestions to load
        await this.page.keyboard.press('Enter');
        await this.page.locator('(//div[@role="button"])[2]').click();
        // await this.page.getByRole('button').nth(2).click();
        const allOptions=this.page.locator('//ul[@role="listbox"]');
        const parse:string[] = await allOptions.allTextContents();

        console.log("parsed data:", parse);
        parse.forEach((option)=>{
            console.log(option);
        });
    }


    
}