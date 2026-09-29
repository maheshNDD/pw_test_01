import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await page.getByRole("link", { name: "Make Appointment" }).click();
  await expect(page.getByText("Please login to make")).toBeVisible();
  await page.getByLabel("Username").fill("John Doe");
  await page.getByLabel("Password").fill("ThisIsNotAPassword");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.locator("h2")).toContainText("Make Appointment");
})

test.only("Find the locator values", async ({ page }) => {
  await page.goto("await page.goto('https://katalon-demo-cura.herokuapp.com/');");
  const makeAppointBtn = page.getByRole("link", {
    name: "Make Appointment",
  });
  await makeAppointBtn.click();
  console.log(`Locator type: ${typeof makeAppointBtn}, Value of the locator: ${makeAppointBtn}`,
  );
})

