import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

// CI flag (true if running in CI)
const isCI = !!process.env.CI;

export default defineConfig({
  timeout: 90000,
  expect: { timeout: 10000 },
  testDir: "./tests/spec/MuscleBlaze/",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: [
    ["html"],
    ["allure-playwright", { outputFolder: "allure-results" }],
  ],

use: {
  video: "on",
  screenshot: "on",
  headless: isCI, // headless in CI, headed locally
  ignoreHTTPSErrors: isCI,
  viewport: null, // disables Playwright’s default 1280x720
  launchOptions: {
    slowMo: isCI ? 0 : 100,
    args: [
      ...(isCI
        ? ["--disable-http2"]
        : ["--start-maximized", "--window-size=1920,1080"]), // ✅ force full HD
    ],
  },
  contextOptions: {
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  },
},


  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
