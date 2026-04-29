import { test, expect } from '@playwright/test';
import { MongoClient, ObjectId } from 'mongodb';

test('UI + API + MongoDB backend integrity', async ({ page }) => {
 
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
