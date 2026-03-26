import { test, expect, chromium } from "@playwright/test";
import Example from "../../src/page/example";

test.describe("Example Test Suite", () => {

    test("Example Test Case", async ({ page, context }) => {
      const examplePage = new Example(page);
    await examplePage.exampleMethod();
    });

});