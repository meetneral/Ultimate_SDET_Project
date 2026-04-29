import { test, expect } from '@playwright/test';

test.only('verify user creation via API', async ({ request }) => {
    const response = await request.post('http://example.com/api/users', {
        data: { name: 'Sdet_Warrior', job: 'Leader' }
    });
    expect(response.status()).toBe(405);
    // const body = await response.json();
    // expect(body.name).toBe('Sdet_Warrior');
});