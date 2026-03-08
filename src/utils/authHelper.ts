import { request } from '@playwright/test';

export async function getAuthToken() {
const context = await request.newContext();
const response = await context.post('https://jsonplaceholder.typicode.com/posts', {
data: {
username: 'admin',
password: 'password123'
}
});

// In a real app, this would be response.json().token
// For this demo, we will simulate a successful token
const body = await response.json();
return "SECRET_WARRIOR_TOKEN_" + body.id; 
}