import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://play1.automationcamp.ir/login.html');
  await expect(page).toHaveTitle('Login');
  await page.locator('#user').fill('admin');
  await page.locator('#password').fill('admin');
  await page.locator('#login').click();
  await expect(page).toHaveTitle('Order Pizza');
});

test('Order pizza - adds selected pizza to cart', async ({ page }) => {
  const pageHeader = page.getByRole('heading', { name: 'Dinesh\'s Pizza House' });
  const size = page.locator('#rad_medium');
  const flavor = page.locator('#select_flavor');
  const onionTopping = page.locator('#onions');
  const oliveTopping = page.locator('#green_olive');
  const tomatoTopping = page.locator('#tomoto');
  const sauce = page.locator('#rad_barbeque');
  const quantity = page.locator('#quantity');
  const addToCartBtn = page.locator('#submit_button');
  const itemsAddedMsg = page.locator('#added_message');

  await expect(pageHeader).toBeVisible();

  // choose options
  await size.check();
  await expect(size).toBeChecked();

  await flavor.selectOption('Supreme');
  await expect(flavor).toHaveValue(/Supreme/);

  await sauce.check();
  await expect(sauce).toBeChecked();

  await onionTopping.check();
  await expect(onionTopping).toBeChecked();

  await oliveTopping.check();
  await expect(oliveTopping).toBeChecked();

  await tomatoTopping.uncheck();
  await expect(tomatoTopping).not.toBeChecked();

  await quantity.fill('5');
  await expect(quantity).toHaveValue('5');

  await addToCartBtn.click();

  // Wait for loader to appear and disappear before checking the message
  const loader = page.locator('#exampleModalLongTitle');
  await expect(loader).toBeVisible();
  await expect(loader).not.toBeVisible();
  await expect(itemsAddedMsg).toHaveText('Pizza added to the cart!');
});