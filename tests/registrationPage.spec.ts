import {test, expect} from '@playwright/test';
import { RegistrationPage } from './../pages/RegistrationPage.ts';


test('Successful registration', async ({ page }) => {

    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.terms.check();
    await registrationPage.register("Kristiyan", "Draganov", "test@test.test", "admin", "admin");
    await expect(page).toHaveTitle('Confirmation!');
    await expect(registrationPage.successMsg).toBeVisible();
})


test('Unsuccessful registration - not matching passwords', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.terms.check();
    await registrationPage.register("Kristiyan", "Draganov", "test@test.test", "admin", "admin123");

    await expect(registrationPage.notMatchingMsg).toBeVisible();
})


test('Unsuccessful registration - not checked terms', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.register("Kristiyan", "Draganov", "test@test.test", "admin", "admin");
    
    const validationTooltip = await registrationPage.terms.evaluate((element) => {
        const input = element as HTMLInputElement;
        return input.validationMessage;
      })
    
      await expect(validationTooltip).toContain("Please check this box if you want to proceed.");
})