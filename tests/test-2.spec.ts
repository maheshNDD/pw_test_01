import { test, expect } from '@playwright/test';

test('test01', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await page.getByRole('textbox', { name: 'Username' }).first().click();
  await page.getByRole('textbox', { name: 'Username' }).first().press('ControlOrMeta+c');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('John Doe');
  await page.getByRole('textbox', { name: 'Password' }).first().press('ControlOrMeta+c');
  await page.getByLabel('Password').fill('ThisIsNotAPassword');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
  await page.getByRole('radio', { name: 'Medicaid' }).check();
  await page.getByRole('textbox', { name: 'Visit Date (Required)' }).fill('10/10/2026');
  await page.getByRole('textbox', { name: 'Comment' }).fill('visit 1');
  await page.getByRole('button', { name: 'Book Appointment' }).click();
});
