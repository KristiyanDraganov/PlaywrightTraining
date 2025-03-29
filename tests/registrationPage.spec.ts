import {test, expect} from '@playwright/test';

test('Successful registration', async ({ page }) => {
    await page.goto('https://play1.automationcamp.ir/login.html');
    await expect(page).toHaveTitle('Login');

    const newRegistrationBtn = page.getByRole('link', { name: 'New user? Register!' });
    const registrationHeader = 	page.getByRole('heading', { name: 'Register' })
    const firstName = page.getByPlaceholder('First Name');
    const lastName = page.getByPlaceholder('Last Name');
    const email = page.getByPlaceholder('Email');
    const password = page.locator('#pwd1');
    const confirmPassword = page.locator('#pwd2');
    const terms = page.getByRole('checkbox', {name: 'terms'});
    const registerNowBtn = page.locator('#submit_button');
    const successMsg = page.getByRole('heading', { name: 'Confirmation' });

    await page.pause();
    await newRegistrationBtn.click();

    await expect(page).toHaveTitle('Register!');
    await expect(registrationHeader).toBeVisible();

    await firstName.fill('Kristiyan');
    await lastName.fill('Draganov');
    await email.fill('test@test.test');
    await password.fill('admin');
    await confirmPassword.fill('admin');
    await terms.check();
    await registerNowBtn.click();

    await expect(page).toHaveTitle('Confirmation!');
    await expect(successMsg).toBeVisible();
    await page.pause();
})