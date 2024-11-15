import { type Page, expect } from '@playwright/test';
import BasePage from './Base.page';
import * as dotenv from 'dotenv';

dotenv.config();

const authFile = '.auth/user.json';

const loginPageTranslations = {
  en: {
    title: 'Swag Labs',
  },
};

class LoginPage extends BasePage {
  constructor(page: Page) {
    const hash = '';
    super(page, hash, loginPageTranslations);
  }

  // Locators
  get userNameField() {
    return this.page.locator('[data-test="username"]');
  }

  get userPasswordField() {
    return this.page.locator('[data-test="password"]');
  }

  get loginInButton() {
    return this.page.locator('[data-test="login-button"]');
  }

  get loginErrorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  get secondaryHeader() {
    return this.page.locator('[data-test="secondary-header"]');
  }

  get shoppingCartLink() {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  get titleText() {
    return this.page.locator('[data-test="title"]');
  }

  get productSortContainer() {
    return this.page.locator('[data-test="product-sort-container"]');
  }

  get menuButton() {
    return this.page.getByRole('button', { name: 'Open Menu' });
  }

  get logoutLink() {
    return this.page.locator('[data-test="logout-sidebar-link"]');
  }

  // Actions
  async visit() {
    await super.visit();
  }

  async login(name: string, password: string) {
    await this.userNameField.fill(name);
    await this.userPasswordField.fill(password);
    await this.loginInButton.click();
  }

  async loginWithTestAccount() {
    const username = process.env.USERNAME || 'standard_user';
    const password = process.env.PASSWORD || 'secret_sauce';

    if (!username || !password) {
      throw new Error('Username or password is missing in environment variables.');
    }
    await this.login(username, password);
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  // Assertions
  async shouldBeLoaded() {
    await super.shouldBeLoaded();
    await expect(this.page.getByText('Swag Labs')).toBeVisible();
    await expect(this.userNameField).toBeVisible();
    await expect(this.userPasswordField).toBeVisible();
    await expect(this.loginInButton).toBeVisible();
  }

  async shouldShowLoginErrorMessage(expectedMessage: string) {
    await expect(this.loginErrorMessage).toBeVisible();
    await expect(this.loginErrorMessage).toContainText(expectedMessage);
  }

  async shouldSeeDashboard() {
    await expect(this.page.getByText('Swag Labs')).toBeVisible();
    await expect(this.secondaryHeader).toBeVisible();
    await expect(this.shoppingCartLink).toBeVisible();
    await expect(this.titleText).toContainText('Products');
    await expect(this.productSortContainer).toBeVisible();
  }

  async saveStorageState() {
    await this.page.context().storageState({ path: authFile });
  }
}

export default LoginPage;
