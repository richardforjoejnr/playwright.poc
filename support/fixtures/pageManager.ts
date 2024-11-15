import { test as base } from '@playwright/test';
import LoginPage from '../pages/Login.page';

export const pageInstance = base.extend<{
  loginPage: LoginPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
