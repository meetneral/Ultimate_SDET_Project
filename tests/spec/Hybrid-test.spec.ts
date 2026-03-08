import { expect, test } from "@playwright/test";
import { UserApi } from "../../src/api/UserApi";
import { SmartPage } from "../../src/utils/smartPage";
import testData from "../../src/data/testData.json";
import { getAuthToken } from "../../src/utils/authHelper";

for (const data of testData.first) {
  // Only run login tests for objects with username and password
  if (!data.username || !data.password) continue;

  test(`Hybrid Flow: ${data.desc}`, async ({ page, request }) => {
    const userApi = new UserApi(request);
    const smartPage = new SmartPage(page);

    // 1. Setup: API Call (The Full-Stack Proof)
    const post = await userApi.createUser(data.username, "Automation_Lead");
    console.log(`Step 1: API Data Created (ID: ${post.id})`);

    // 2. Action: UI Login with Self-Healing
    await page.goto("https://the-internet.herokuapp.com/login");

    // We use the "Smart" click here.
    // If the ID changes, the AI will heal it.
    await smartPage.click(
      "#username",
      "The login username input field",
    );
    await page.fill("#username", data.username);

    await smartPage.click("#password", "The login password input field");
    await page.fill("#password", data.password);

    await smartPage.click('button[type="submit"]', "The login submit button");

    // 3. Verification
    if (data.desc === "Valid Login") {
      await page.waitForSelector(".flash.success");
    } else {
      await page.waitForSelector(".flash.error");
    }
  });
  
}
test.only("Advanced API Chaining: Injecting Token to UI", async ({ page }) => {
    // 1. Get Token from API
    const token = await getAuthToken();
    console.log(`🔑 Extracted Token: ${token}`);

    // 2. Inject Token into Browser Storage BEFORE visiting the site
    await page.addInitScript((t) => {
      window.localStorage.setItem("auth-token", t);
    }, token);

    // 3. Navigate and Verify
    await page.goto(
      "https://the-internet.herokuapp.com/"
    );

    // Verify the token exists in the browser
    const localStorageToken = await page.evaluate(() =>
      window.localStorage.getItem("auth-token"),
    );
    expect(localStorageToken).toBe(token);

    console.log("✅ Token successfully injected into Browser!");
  });