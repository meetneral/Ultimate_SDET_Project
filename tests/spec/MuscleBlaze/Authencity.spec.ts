import { test, expect } from "@playwright/test";
import { Homepage } from "../../MBpage/Homepage";
import { Authenticity } from "../../MBpage/Authenticity";

test.describe("Homepage", () => {
  let Page: Authenticity;

  test.beforeEach(async ({ page }) => {
    Page = new Authenticity(page);
  });

  test("should navigate to the homepage and click the label", async ({
    page,
  }) => {
    await Page.navigate();
    await Page.Aunthenticity(Page.authenticity);
    await Page.clickCheckAunthenticity(Page.checkAuthenticity);
    expect(Page.checkAuthenticity).toBeVisible();

    // Assertion
    await expect(page).toHaveURL(
      "https://www.muscleblaze.com/authenticity-guaranteed",
    );
    await Page.fillDetails();
    await Page.clickCheckNow(Page.checkNowBtn);
  });
});
