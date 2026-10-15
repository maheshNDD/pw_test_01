import { test, expect } from "@playwright/test";
import { environment } from "../utils/env";

test.describe("Login Functonlity", () => {

    test.beforeEach("Login function trigger", async ({ page }) => {
        //Login trigger
        await page.goto("/");
        await page.getByRole("link", { name: "Make Appointment" }).click();
        await expect(page.getByText("Please login to make")).toBeVisible();
    });

test("test for correct login cred", async ({ page }) => {
    //Successful login 
      await page.getByLabel("Username").fill(environment.username);
    await page.getByLabel("Password").fill(environment.password);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

test("Test to prevent login with invalid  cred", async ({ page }) => {
    //Unsuccessful login 
      await page.getByLabel("Username").fill("invalid-user");
    await page.getByLabel("Password").fill("invalid-password");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("#login")).toContainText("Login failed! Please ensure the username and password are valid.",);
  });
});
