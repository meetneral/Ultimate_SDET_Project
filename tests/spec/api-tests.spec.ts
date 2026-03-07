import { test, expect } from '@playwright/test';

test.only('verify user creation via API', async ({ request }) => {
    const response = await request.post('', {
        data: { name: 'Sdet_Warrior', job: 'Leader' }
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.name).toBe('Sdet_Warrior');
}
//     const response = await request.post('/api/users', {
//         data: { name: 'Sdet_Warrior', job: 'Leader' }
//     });
//     expect(response.status()).toBe(201);
//     const body = await response.json();
//     expect(body.name).toBe('Sdet_Warrior');
// }
);