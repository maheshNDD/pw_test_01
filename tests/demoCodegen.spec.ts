import { test, expect } from "@playwright/test";
import { environment } from "../utils/env";

test("test", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Make Appointment" }).click();
  await expect(page.getByText("Please login to make")).toBeVisible();
  await page.getByLabel("Username").fill(environment.username);
  await page.getByLabel("Password").fill(environment.password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.locator("h2")).toContainText("Make Appointment");
});
