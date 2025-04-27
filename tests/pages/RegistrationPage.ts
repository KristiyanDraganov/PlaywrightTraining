import { expect, Page, Locator } from "@playwright/test";

export class RegistrationPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly terms: Locator;
  readonly registerNowBtn: Locator;
  readonly successMsg: Locator;
  readonly notMatchingMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByPlaceholder("First Name");
    this.lastName = page.getByPlaceholder("Last Name");
    this.email = page.getByPlaceholder("Email");
    this.password = page.locator("#pwd1");
    this.confirmPassword = page.locator("#pwd2");
    this.terms = page.getByRole("checkbox", { name: "terms" });
    this.registerNowBtn = page.locator("#submit_button");
    this.successMsg = page.getByRole('heading', { name: 'Confirmation' });
    this.notMatchingMsg = page.locator('#message');
  }

  async goto(){
    await this.page.goto('https://play1.automationcamp.ir/register.html');
    await expect(this.page).toHaveTitle('Register!');
  }

  async register(firstName: string, lastName: string, email: string, password: string, confirmPassword: string){
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.confirmPassword.fill(confirmPassword);
    await this.registerNowBtn.click();
  }
}
