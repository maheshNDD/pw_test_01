import { test, expect } from "@playwright/test";
import { environment } from "../utils/env";

test("test1", async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await page.getByLabel('Username').fill(environment.username);
  await page.getByLabel('Password').fill(environment.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
   await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
  await page.getByRole('cell', { name: '14' }).click();
   await page.getByRole('textbox', { name: 'Comment' }).fill('test');
  await page.getByRole('button', { name: 'Book Appointment' }).click();
  
  await expect(page.getByRole('heading', { name: 'Appointment Confirmation' })).toBeVisible();
  await expect(page.locator('#summary')).toContainText('Please be informed that your appointment has been booked as following:');
  await expect(page.locator('#hospital_readmission')).toContainText('Yes');
  await expect(page.locator("#program")).toContainText("Medicare");
  await expect(page.locator('#visit_date')).toContainText('14/10/2026');
  await expect(page.locator('#comment')).toContainText('test');
   
});
