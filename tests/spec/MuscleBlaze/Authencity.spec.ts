import { test, expect, Page } from "@playwright/test";
import { Authenticity } from "../../MBpage/Authenticity";

test.describe("Authenticity", () => {
  let authenticity: Authenticity;

  test.beforeEach(async ({ page }) => {
    authenticity = new Authenticity(page);
    await page.goto("https://www.muscleblaze.com/");
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Redirection of Page", async ({ page }) => {
    // await authenticity.navigate();
    await test.step("Navigate to MuscleBlaze Authenticity", async () => {
      await authenticity.Aunthenticity(authenticity.authenticity);
    });
    await test.step("check to MuscleBlaze Authenticity", async () => {
      await authenticity.clickCheckAunthenticity(
        authenticity.checkAuthenticity,
      );
    });

    // await expect(authenticity.checkAuthenticity).toBeVisible();
    await expect(page).toHaveURL(
      "https://www.muscleblaze.com/authenticity-guaranteed",
    );

    // await authenticity.fillDetails();
    // await authenticity.clickCheckNow(authenticity.checkNowBtn);
  });

  test("Authenticity Page Functionality", async ({ page }) => {
    // await authenticity.navigate();
    await test.step("Navigate to MuscleBlaze Authenticity", async () => {
      await authenticity.Aunthenticity(authenticity.authenticity);
    });
    await test.step("Click Check Authenticity", async () => {
      await authenticity.clickCheckAunthenticity(authenticity.checkAuthenticity);
    });

    // await expect(authenticity.checkAuthenticity).toBeVisible();
    await expect(page).toHaveURL(
      "https://www.muscleblaze.com/authenticity-guaranteed",
    );

    await authenticity.fillDetails();
    await authenticity.clickCheckNow(authenticity.checkNowBtn);
  });
  test("Protien check", async ({ page }) => {
    await authenticity.Aunthenticity(authenticity.authenticity);
    await authenticity.clickProtienLabCertificate(
      authenticity.protienLabCertificate,
    );
    await expect(page).toHaveURL("https://www.muscleblaze.com/lab-results");
    await authenticity.searchByBatch(authenticity.protienLabCertificate);
  });
});
