import { Page, expect } from '@playwright/test';
import * as fs from 'fs';
import { analyzeWithAI } from './aiService'; // We will build this

export class SmartPage {
    private cachePath = './healed-locators.json';

    constructor(private page: Page) {}

    async click(selector: string, description: string) {
        // 1. Check Cache first
        const healedSelector = this.getCache(description);
        const target = healedSelector || selector;

        try {
            await this.page.click(target, { timeout: 5000 });
        } catch (error) {
            console.log(`[Healing]: Selector ${target} failed. Invoking AI...`);
            
            // 2. Get DOM Snapshot
            const dom = await this.page.evaluate(() => document.body.innerHTML);
            
            // 3. Ask LLM for the new selector based on the "description"
            const newSelector = await analyzeWithAI(dom, description);
            
            if (newSelector) {
                await this.page.click(newSelector);
                this.updateCache(description, newSelector); // 4. Cache it properly
            } else {
                throw error;
            }
        }
    }

    private getCache(key: string) {
        if (!fs.existsSync(this.cachePath)) return null;
        const cache = JSON.parse(fs.readFileSync(this.cachePath, 'utf8'));
        return cache[key] || null;
    }

    private updateCache(key: string, value: string) {
        const cache = fs.existsSync(this.cachePath) ? JSON.parse(fs.readFileSync(this.cachePath, 'utf8')) : {};
        cache[key] = value;
        fs.writeFileSync(this.cachePath, JSON.stringify(cache, null, 2));
    }
}