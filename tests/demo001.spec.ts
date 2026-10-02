import { test, expect } from "@playwright/test";

test("Verify Home Page", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  console.log(await page.title());

  await expect(page).toHaveTitle(/CURA/);

  await expect(page.locator("h1")).toHaveText("CURA Healthcare Service");
});

test("Login preventing with wrong details", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await page.locator("#menu-toggle").click();
  await page.getByRole("link", { name: "Home" }).click();
    await page.getByRole("link", { name: "Make Appointment" }).click();
  await page.getByRole("textbox", { name: "Username" }).first().click();
  await page.getByRole("textbox", { name: "Password" }).first().click();
  await page.getByLabel("Username").click();
  await page.getByLabel("Username").fill("John Smith");
  await page.getByLabel("Password").fill("demo");
  await expect(page.locator("#btn-login")).toContainText(
    "Login failed! Please ensure the username and password are valid.",
  );
});
