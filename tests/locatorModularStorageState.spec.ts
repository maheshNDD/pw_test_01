import { expect, test } from "@playwright/test";
import {
  AppointmentPage,
  ConfirmationPage,
  HomePage,
} from "../pages";
import testCases from "../test-data/locatorModular.json";

for (const testCase of testCases) {
  test(testCase.name, async ({ page }) => {
    const homePage = new HomePage(page);
    const appointmentPage = new AppointmentPage(page);
    const confirmationPage = new ConfirmationPage(page);

    await homePage.open();
    await homePage.startAppointment();
    await expect(
      page.getByRole("heading", { name: "Make Appointment" }),
    ).toBeVisible();
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
