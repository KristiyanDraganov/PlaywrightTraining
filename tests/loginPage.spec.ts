import {test, expect} from '@playwright/test';


test('Successful login to the site', async({ page }) => {
  await page.goto('https://play1.automationcamp.ir/login.html');
  await expect(page).toHaveTitle('Login');

  const username = page.locator('#user');
  const password = page.locator('#password');
  const loginBtn = page.locator('#login');

  await username.fill('admin');
  await password.fill('admin');
  await loginBtn.click();

  await expect(page).toHaveTitle('Order Pizza');
})


test('Unsuccessful login - wrong username', async({ page }) => {
  await page.goto('https://play1.automationcamp.ir/login.html');
  await expect(page).toHaveTitle('Login');

  const username = page.locator('#user');
  const password = page.locator('#password');
  const loginBtn = page.locator('#login');
  const validatioMsg = page.locator('#message');

  await username.fill('123');
  await password.fill('admin');
  await loginBtn.click();

  await expect(validatioMsg).toBeVisible();
})


test('Unsuccessful login - wrong password', async({ page }) => {
  await page.goto('https://play1.automationcamp.ir/login.html');
  await expect(page).toHaveTitle('Login');

  const username = page.locator('#user');
  const password = page.locator('#password');
  const loginBtn = page.locator('#login');
  const validatioMsg = page.locator('#message');

  await username.fill('admin');
  await password.fill('123');
  await loginBtn.click();

  await expect(validatioMsg).toBeVisible();
})