import { APIRequestContext, expect } from '@playwright/test';

export class UserApi {
    constructor(private request: APIRequestContext) {}

    async createUser(name: string|undefined, job: string|undefined) {
        // Switching to JSONPlaceholder - reliable and no Cloudflare block
        const response = await this.request.post('https://jsonplaceholder.typicode.com/posts', {
            data: {
                title: name,
                body: job,
                userId: 1,
            },
        });

        if (response.status() !== 201) {
            console.error(`API Error: ${response.status()}`);
        }

        expect(response.status()).toBe(201);
        return await response.json();
    }
}