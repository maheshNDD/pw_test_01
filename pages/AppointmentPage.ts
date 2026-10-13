import type { Page } from "@playwright/test";

export class AppointmentPage {
  constructor(private readonly page: Page) {}

  async applyForHospitalReadmission(): Promise<void> {
    await this.page
      .getByRole("checkbox", { name: "Apply for hospital readmission" })
      .check();
  }

  async selectVisitDate(day: string): Promise<void> {
    await this.page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await this.page.getByRole("cell", { name: day }).click();
  }

  async enterComment(comment: string): Promise<void> {
    await this.page.getByRole("textbox", { name: "Comment" }).fill(comment);
  }

  async bookAppointment(): Promise<void> {
    await this.page.getByRole("button", { name: "Book Appointment" }).click();
  }
}
