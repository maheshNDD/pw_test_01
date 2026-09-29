import { test, expect } from "@playwright/test";

test.describe("Login Functonlity", () => {

    test.beforeEach("Login function trigger", async ({ page }) => {
        //Login trigger
        await page.goto("https://katalon-demo-cura.herokuapp.com/");
        await page.getByRole("link", { name: "Make Appointment" }).click();
        await expect(page.getByText("Please login to make")).toBeVisible();
    });

test("test for correct login cred", async ({ page }) => {
    //Successful login 
      await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

test("Test to prevent login with invalid  cred", async ({ page }) => {
    //Unsuccessful login 
      await page.getByLabel("Username").fill("John Doe1");
    await page.getByLabel("Password").fill("ThisIsNotAPassword1");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("#login")).toContainText("Login failed! Please ensure the username and password are valid.",);
  });
});
