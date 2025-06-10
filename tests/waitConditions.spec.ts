import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
  test.setTimeout(100000);
  await page.goto('https://play1.automationcamp.ir/expected_conditions.html');
  await expect(page).toHaveTitle("Wait Conditions");
  const minWait = page.getByPlaceholder('Min. Wait');
  const maxWait = page.getByPlaceholder('Max. Wait');
  
  await minWait.fill('10');
  await maxWait.fill('100');
});


test('Wait for alert to be present', async ({ page }) => {
  
  const alertTrigger = page.locator('#alert_trigger');
  const handledAlert = page.locator('#alert_handled_badge');

  page.on('dialog', dialog => dialog.accept());
  await alertTrigger.click();
  await handledAlert.waitFor({state: 'visible'});
});


test('Wait for prompt to be present - accept', async ({ page }) => {
  const promptTrigger = page.locator('#prompt_trigger');
  const confirmedPrompt = page.locator('#confirm_ok_badge');

  page.on('dialog', dialog => dialog.accept());
  await promptTrigger.click();
  await confirmedPrompt.waitFor({state: 'visible'});
});


test('Wait for prompt to be present - dismiss', async ({ page }) => {
  const promptTrigger = page.locator('#prompt_trigger');
  const deniedPrompt = page.locator('#confirm_cancelled_badge');

  page.on('dialog', dialog => dialog.dismiss());
  await promptTrigger.click();
  await deniedPrompt.waitFor({state: 'visible'});
});