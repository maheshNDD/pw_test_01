import { expect, test } from "@playwright/test";
import {
  AppointmentPage,
  ConfirmationPage,
  HomePage,
  LoginPage,
} from "../pages";
import testCases from "../test-data/locatorModular.json";
import { environment } from "../utils/env";

for (const testCase of testCases) {
  test(testCase.name, async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);
    const confirmationPage = new ConfirmationPage(page);

    await homePage.open();
    await homePage.startAppointment();
    await loginPage.login(environment.username, environment.password);
    if (testCase.appointment.readmission) {
      await appointmentPage.applyForHospitalReadmission();
    }
    await appointmentPage.selectVisitDate(testCase.appointment.visitDateDay);
    await appointmentPage.enterComment(testCase.appointment.comment);
    await appointmentPage.bookAppointment();

    await expect(confirmationPage.heading).toBeVisible();
    await expect(confirmationPage.bookingNotice).toBeVisible();
    await expect(
      confirmationPage.readmissionValue(testCase.expected.readmission),
    ).toBeVisible();
    await expect(
      confirmationPage.insuranceValue(testCase.expected.insurance),
    ).toBeVisible();
    await expect(
      confirmationPage.visitDate(testCase.expected.visitDate),
    ).toBeVisible();
    await expect(
      confirmationPage.comment(testCase.expected.comment),
    ).toBeVisible();
  });
}
