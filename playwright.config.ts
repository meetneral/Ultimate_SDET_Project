import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

// CI flag (true if running in CI)
const isCI = !!process.env.CI;

export default defineConfig({
  timeout: 90000,
  expect: { timeout: 10000 },
  testDir: "./tests/spec",
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
    headless: isCI, // ✅ headless in CI, headed locally
    ignoreHTTPSErrors: isCI, // ✅ ignore HTTPS errors in CI only
    viewport: isCI ? null : { width: 1920, height: 1080 }, // ✅ full view locally
    launchOptions: {
      slowMo: isCI ? 0 : 100, // ✅ slower locally to mimic human behavior
      args: [
        ...(isCI ? ["--disable-http2"] : ["--start-maximized"]), 
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
