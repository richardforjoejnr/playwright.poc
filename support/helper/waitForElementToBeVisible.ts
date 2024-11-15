import { Locator, Page, expect } from '@playwright/test';

/**
 * Waits for an element to be visible and performs an assertion that it is visible.
 * 
 * @param locator - The locator of the element to assert visibility on.
 * @param timeout - Optional timeout in milliseconds for waiting (default: 5000).
 */
export async function waitForElementToBeVisible(
  page: Page,
  locator: Locator,
  timeout: number = 5000
) {
  if (!page.isClosed()) {
    await locator.waitFor({ state: 'visible', timeout });
    await expect(locator).toBeVisible();
  }

}