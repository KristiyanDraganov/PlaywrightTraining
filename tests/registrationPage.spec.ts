import {test, expect} from '@playwright/test';


test.beforeEach(async ({ page }) => {
   
    await page.goto('https://play1.automationcamp.ir/login.html');
    await expect(page).toHaveTitle('Login');

    const newRegistrationBtn = page.getByRole('link', { name: 'New user? Register!' });
    const registrationHeader = page.getByRole('heading', { name: 'Register' })

    await newRegistrationBtn.click();

    await expect(page).toHaveTitle('Register!');
    await expect(registrationHeader).toBeVisible();
  });


test('Successful registration', async ({ page }) => {
    
    const firstName = page.getByPlaceholder('First Name');
    const lastName = page.getByPlaceholder('Last Name');
    const email = page.getByPlaceholder('Email');
    const password = page.locator('#pwd1');
    const confirmPassword = page.locator('#pwd2');
    const terms = page.getByRole('checkbox', {name: 'terms'});
    const registerNowBtn = page.locator('#submit_button');
    const successMsg = page.getByRole('heading', { name: 'Confirmation' });

    await firstName.fill('Kristiyan');
    await lastName.fill('Draganov');
    await email.fill('test@test.test');
    await password.fill('admin');
    await confirmPassword.fill('admin');
    await terms.check();
    await registerNowBtn.click();

    await expect(page).toHaveTitle('Confirmation!');
    await expect(successMsg).toBeVisible();
})


test('Unsuccessful registration - not matching passwords', async ({ page }) => {
    
    const firstName = page.getByPlaceholder('First Name');
    const lastName = page.getByPlaceholder('Last Name');
    const email = page.getByPlaceholder('Email');
    const password = page.locator('#pwd1');
    const confirmPassword = page.locator('#pwd2');
    const terms = page.getByRole('checkbox', {name: 'terms'});
    const registerNowBtn = page.locator('#submit_button');
    const notMatchingMsg = page.locator('#message');

    await firstName.fill('Kristiyan');
    await lastName.fill('Draganov');
    await email.fill('test@test.test');
    await password.fill('admin');
    await confirmPassword.fill('admin123');
    await terms.check();
    await registerNowBtn.click();

    await expect(notMatchingMsg).toBeVisible();
})

test('Unsuccessful registration - not checked terms', async ({ page }) => {
    
    const firstName = page.getByPlaceholder('First Name');
    const lastName = page.getByPlaceholder('Last Name');
    const email = page.getByPlaceholder('Email');
    const password = page.locator('#pwd1');
    const confirmPassword = page.locator('#pwd2');
    const registerNowBtn = page.locator('#submit_button');
    const terms = page.getByRole('checkbox', {name: 'terms'});
    
    await firstName.fill('Kristiyan');
    await lastName.fill('Draganov');
    await email.fill('test@test.test');
    await password.fill('admin');
    await confirmPassword.fill('admin');
    await registerNowBtn.click();
    
    const validationTooltip = await terms.evaluate((element) => {
        const input = element as HTMLInputElement
        return input.validationMessage
      })
    
      expect(validationTooltip).toContain("Please check this box if you want to proceed.")
})