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

  get readmissionValue(): Locator {
    return this.page.getByText("Yes");
  }

  get insuranceValue(): Locator {
    return this.page.getByText("Medicare");
  }

  get visitDate(): Locator {
    return this.page.getByText("14/10/2026");
  }

  get comment(): Locator {
    return this.page.getByText("test");
  }
}
