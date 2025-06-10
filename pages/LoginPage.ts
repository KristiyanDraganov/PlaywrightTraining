import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;
  readonly validationMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('#user');
    this.password = page.locator('#password');
    this.loginBtn = page.locator('#login');
    this.validationMsg = page.locator('#message');
  }

  async goto() {
    await this.page.goto('https://play1.automationcamp.ir/login.html');
    await expect(this.page).toHaveTitle('Login');
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }

  async sucessfullLogin() {
    await expect(this.page).toHaveTitle('Order Pizza');
  }

  async failedLogin() {
    await expect(this.validationMsg).toBeVisible();
  }
}