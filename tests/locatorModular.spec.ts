import { expect, test } from "@playwright/test";
import {
  AppointmentPage,
  ConfirmationPage,
  HomePage,
  LoginPage,
} from "../pages";

test("test1", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const appointmentPage = new AppointmentPage(page);
  const confirmationPage = new ConfirmationPage(page);

  await homePage.open();
  await homePage.startAppointment();
  await loginPage.login("John Doe", "ThisIsNotAPassword");
  await appointmentPage.applyForHospitalReadmission();
  await appointmentPage.selectVisitDate("14");
  await appointmentPage.enterComment("test");
  await appointmentPage.bookAppointment();

  await expect(confirmationPage.heading).toBeVisible();
  await expect(confirmationPage.bookingNotice).toBeVisible();
  await expect(confirmationPage.readmissionValue).toBeVisible();
  await expect(confirmationPage.insuranceValue).toBeVisible();
  await expect(confirmationPage.visitDate).toBeVisible();
  await expect(confirmationPage.comment).toBeVisible();
});
