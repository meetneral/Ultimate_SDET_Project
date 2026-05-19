import { test } from "@playwright/test";
import { Footer } from "../../MBpage/Footer";

test.describe("Muscle Blaze Footer", () => {
  let footer: Footer;

  test.beforeEach(async ({ page }) => {
    footer = new Footer(page);
    await page.goto("https://www.muscleblaze.com/");
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Redirection of Footer", async ({ page }) => { 
    await test.step("Navigate to MuscleBlaze Footer", async () => {
      await footer.scroolToFooter();
      await footer.clickFacebookandNavigate();
      await footer.clickTwitterandNavigate();
      await footer.clickInstagramandNavigate();
      await footer.clickYoutubeandNavigate();
      await footer.clickLinkedinandNavigate();
    });
  });
});
