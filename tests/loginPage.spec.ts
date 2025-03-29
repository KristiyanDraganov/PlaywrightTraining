import {test, expect} from '@playwright/test';


test('Login to the site', async({ page }) => {
  await page.goto('https://play1.automationcamp.ir/login.html');

  const username = page.locator('#user');
  const password = page.locator('#password');
  const loginBtn = page.locator('#login');

  await username.fill('admin');
  await password.fill('admin');
  await loginBtn.click();

  await expect(page).toHaveTitle('Order Pizza');
})
