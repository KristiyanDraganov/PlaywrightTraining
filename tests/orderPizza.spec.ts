import {test, expect} from '@playwright/test';


test('Order pizza', async({ page }) => {
  await page.goto('https://play1.automationcamp.ir/login.html');
  await expect(page).toHaveTitle('Login');

  const username = page.locator('#user');
  const password = page.locator('#password');
  const loginBtn = page.locator('#login');
  const pageHeader = page.getByRole('heading', { name: 'Dinesh\'s Pizza House' });
  const size = page.locator('#rad_medium');
  const flavor = page.locator("#select_flavor");
  const onionTopping = page.locator("#onions");
  const oliveTopping = page.locator("#green_olive");
  const tomatoTopping = page.locator("#tomoto");
  const sauce = page.locator('#rad_barbeque');
  const itemsAddedMsg = page.locator('#added_message');

  const quantity = page.locator('#quantity')
  const addToCartBtn = page.locator('#submit_button');

  await username.fill('admin');
  await password.fill('admin');
  await loginBtn.click();

  await expect(page).toHaveTitle('Order Pizza');
  await expect(pageHeader).toBeVisible();
  
  await size.check();
  await flavor.selectOption('Supreme');
  await sauce.check();
  await onionTopping.check();
  await oliveTopping.check();
  await tomatoTopping.uncheck();
  await quantity.fill('5');
  await addToCartBtn.click();

  await expect(itemsAddedMsg).toBeVisible();
})
