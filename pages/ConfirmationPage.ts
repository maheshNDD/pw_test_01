import type { Locator, Page } from "@playwright/test";

export class ConfirmationPage {
  constructor(private readonly page: Page) {}

  get heading(): Locator {
    return this.page.getByRole("heading", { name: "Appointment Confirmation" });
  }

  get bookingNotice(): Locator {
    return this.page.getByText(
      "Please be informed that your appointment has been booked as following:",
    );
  }

  readmissionValue(value: string): Locator {
    return this.page.getByText(value);
  }

  insuranceValue(value: string): Locator {
    return this.page.getByText(value);
  }

  visitDate(value: string): Locator {
    return this.page.getByText(value);
  }

  comment(value: string): Locator {
    return this.page.getByText(value);
  }
}
