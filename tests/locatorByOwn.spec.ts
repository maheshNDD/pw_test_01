import { test, expect } from "@playwright/test";
test("test1", async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await page.getByLabel('Username').fill('John Doe');
  await page.getByLabel('Password').fill('ThisIsNotAPassword');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
   await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
  await page.getByRole('cell', { name: '14' }).click();
   await page.getByRole('textbox', { name: 'Comment' }).fill('test');
  await page.getByRole('button', { name: 'Book Appointment' }).click();
  
    await expect(page.getByRole('heading', { name: 'Appointment Confirmation' })).toBeVisible();
    await expect(page.getByText('Please be informed that your appointment has been booked as following:')).toBeVisible();
    await expect(page.getByText('Yes')).toBeVisible();
    await expect(page.getByText('Medicare')).toBeVisible();
    await expect(page.getByText('14/10/2026')).toBeVisible();
    await expect(page.getByText('test')).toBeVisible();

   
});