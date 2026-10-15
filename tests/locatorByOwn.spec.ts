import { test, expect } from "@playwright/test";
import { environment } from "../utils/env";
test("test1", async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await page.getByLabel('Username').fill(environment.username);
  await page.getByLabel('Password').fill(environment.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
  const visitDate = page.getByRole('textbox', { name: 'Visit Date (Required)' });
  await visitDate.click();
  await page.getByRole('cell', { name: '15' }).click();
  const selectedVisitDate = await visitDate.inputValue();
  await page.getByRole('textbox', { name: 'Comment' }).fill('test');
  await page.getByRole('button', { name: 'Book Appointment' }).click();
  
    await expect(page.getByRole('heading', { name: 'Appointment Confirmation' })).toBeVisible();
    await expect(page.getByText('Please be informed that your appointment has been booked as following:')).toBeVisible();
    await expect(page.getByText('Yes')).toBeVisible();
    await expect(page.getByText('Medicare')).toBeVisible();
    await expect(page.getByText(selectedVisitDate)).toBeVisible();
    await expect(page.getByText('test')).toBeVisible();

   
});