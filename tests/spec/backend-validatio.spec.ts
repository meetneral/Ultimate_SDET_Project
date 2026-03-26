import { test, expect } from '@playwright/test';
import { MongoClient, ObjectId } from 'mongodb';

test('UI + API + MongoDB backend integrity', async ({ page }) => {
  // --- Step 1: UI Action ---
//   await page.goto('https://banking.example.com/login');
//   await page.fill('#username', 'testUser');
//   await page.fill('#password', 'securePass123');
//   await page.click('#loginButton');
//   await expect(page.locator('#welcomeMessage')).toContainText('Welcome testUser');

//   // Perform a wire transfer
//   await page.click('#wireTransferLink');
//   await page.fill('#amount', '1000');
//   await page.fill('#recipient', 'John Doe');
//   await page.click('#submitTransfer');
//   await expect(page.locator('#confirmation')).toContainText('Transfer Successful');

  // --- Step 2: MongoDB Backend Integrity ---
  const uri = 'mongodb+srv://meetneral33:C6OmSekfGzEu7lnq@cluster0.jxe3e.mongodb.net/';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('EcommerceDB');
    const transfers = db.collection('review_db');

    // Query to validate transaction consistency
    const result : any = await transfers.findOne({ _id:new ObjectId('67f553e916d32b7f43e34021')});
    console.log('MongoDB Query Result:', result);

    expect(result).not.toBeNull();
    expect(result.comment).toBe('This product is great!');
    expect(result.rating).toBe(4);
    console.log('✅ MongoDB backend integrity validated');
  } finally {
    await client.close();
  }
});
