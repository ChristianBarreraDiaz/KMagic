import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Soltect Water/);
});

test("get started link", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText("Setting up", { exact: true })).toBeVisible();
});
