import { expect, test as setup } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { HomePage, LoginPage } from "../pages";
import { environment } from "../utils/env";
import testCases from "../test-data/locatorModular.json";

const authFile = path.resolve(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  const testCase = testCases[0];
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.open();
  await homePage.startAppointment();
  await loginPage.login(environment.username, environment.password);
  await expect(
    page.getByRole("heading", { name: "Make Appointment" }),
  ).toBeVisible();

  await mkdir(path.dirname(authFile), { recursive: true });
  await page.context().storageState({ path: authFile });
});
