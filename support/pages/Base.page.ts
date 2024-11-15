import { type Page, expect } from '@playwright/test';

class BasePage {
  private static instance: BasePage;
  protected page: Page;
  protected hash: string;
  protected translations: Record<string, any>;

  constructor(page: Page, hash: string, translations: Record<string, any>) {
    this.page = page;
    this.hash = hash;
    this.translations = translations;
  }

  public static getInstance(page: Page, hash: string, translations: Record<string, any>): BasePage {
    if (!BasePage.instance) {
      BasePage.instance = new BasePage(page, hash, translations);
    }
    return BasePage.instance;
  }

  /*
  #############
  # Locators - Common UI Elements being modeled
  #############
  */

  get productSortContainer() {
    return this.page.locator('[data-test="product-sort-container"]');
  }

  get shoppingCartLink() {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  get menuButton() {
    return this.page.getByRole('button', { name: 'Open Menu' });
  }

  get closeMenuButton() {
    return this.page.getByRole('button', { name: 'Close Menu' });
  }

  get allItemsLink() {
    return this.page.locator('[data-test="inventory-sidebar-link"]');
  }

  get aboutLink() {
    return this.page.locator('[data-test="about-sidebar-link"]');
  }

  get resetAppStateLink() {
    return this.page.locator('[data-test="reset-sidebar-link"]');
  }

  get logoutLink() {
    return this.page.locator('[data-test="logout-sidebar-link"]');
  }

  get footer() {
    return this.page.locator('[data-test="footer-copy"]');
  }

  get twitterLink() {
    return this.page.locator('[data-test="social-twitter"]');
  }

  get facebookLink() {
    return this.page.locator('[data-test="social-facebook"]');
  }

  get linkedinLink() {
    return this.page.locator('[data-test="social-linkedin"]');
  }

  /*
  #############
  # Actions - Common Actions on the page
  #############
  */

  async visit() {
    console.log('Visiting page:', this.hash);
    await this.page.goto(this.hash);
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async closeMenu() {
    await this.closeMenuButton.click();
  }

  async goToShoppingCart() {
    await this.shoppingCartLink.click();
  }

  async selectProductSort(option: string) {
    await this.productSortContainer.selectOption(option);
  }

  async navigateToAllItems() {
    await this.openMenu();
    await this.allItemsLink.click();
  }

  async navigateToAbout() {
    await this.openMenu();
    await this.aboutLink.click();
  }

  async resetAppState() {
    await this.openMenu();
    await this.resetAppStateLink.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  /*
  #############
  # Assertions - Common Assertions on the page
  #############
  */

  async shouldBeLoaded() {
    await expect(this.page).toHaveURL(new RegExp(this.hash));
    await this.assertPageUrl(this.hash);
    await this.page.waitForURL(this.hash, {
      waitUntil: 'networkidle',
      timeout: 10000
    });
  }

  async assertPageUrl(expectedHash: string) {
    const currentUrl = this.page.url();
    expect(currentUrl).toContain(expectedHash);
  }

  async assertProductSortContainerIsVisible() {
    await expect(this.productSortContainer).toBeVisible();
  }

  async assertShoppingCartIsVisible() {
    await expect(this.shoppingCartLink).toBeVisible();
  }

  async assertFooterText(expectedText: string) {
    await expect(this.footer).toContainText(expectedText);
  }

  async assertSocialLinksVisible() {
    await expect(this.twitterLink).toBeVisible();
    await expect(this.facebookLink).toBeVisible();
    await expect(this.linkedinLink).toBeVisible();
  }

}

export default BasePage;
