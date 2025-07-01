import { test, expect } from "@playwright/test";

test.describe("New unsuccessfull login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/auth/signin");
  });

  test("Should show a message for invalid username", async ({ page }) => {
    await page.getByPlaceholder("Rut sin puntos y con guíon").click();
    await page.getByPlaceholder("Rut sin puntos y con guíon").fill("123");
    await page.locator("section").click();
    await expect(page.getByText("RUT ingresado inválido")).toBeInViewport();
  });

  test("Should show a message for invalid credentials", async ({ page }) => {
    await page.getByPlaceholder("Rut sin puntos y con guíon").click();
    await page.getByPlaceholder("Rut sin puntos y con guíon").fill("198884863");
    await page.getByLabel("Contraseña").click();
    await page.getByLabel("Contraseña").fill("1");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("RUT ingresado inválido")).toBeHidden();
    await expect(
      page.getByText("Datos de inicio de sesión inválidos"),
    ).toBeVisible();
  });
});

test.describe("New successfull login", () => {
  test("Should authenticate", async ({ page }) => {
    await page.goto("http://localhost:3000/auth/signin");
    await page.getByPlaceholder("Rut sin puntos y con guíon").click();
    await page.getByPlaceholder("Rut sin puntos y con guíon").fill("198884863");
    await page.getByPlaceholder("Rut sin puntos y con guíon").press("Tab");
    await page.getByLabel("Contraseña").fill("123");
    await page.getByLabel("Contraseña").press("Enter");
    await page.getByRole("button", { name: "Submit" }).click();
    await page.waitForURL("http://localhost:3000/dashboard");
    await page
      .getByLabel("Welcome Cristhoferrol server: AdministradorDashboard")
      .click();
  });
});
