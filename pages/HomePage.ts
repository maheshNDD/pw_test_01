import type { Page } from "@playwright/test";

export class HomePage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto("https://katalon-demo-cura.herokuapp.com/");
  }

  async startAppointment(): Promise<void> {
    await this.page.getByRole("link", { name: "Make Appointment" }).click();
  }
}
