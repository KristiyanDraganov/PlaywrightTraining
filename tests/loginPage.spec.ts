import { test, expect } from "@playwright/test";
import { LoginPage } from "./../pages/LoginPage.ts";

test("Successful login to the site", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login("admin", "admin");
  await loginPage.sucessfullLogin();
});


test("Unsuccessful login - wrong username", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login("123", "admin");
  await loginPage.failedLogin();
});


test("Unsuccessful login - wrong password", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login("admin", "123");
  await loginPage.failedLogin();
});
