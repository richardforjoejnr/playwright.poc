import { Page, Locator } from '@playwright/test';

/**
 * Scroll through the list and select an item by its visible text.
 * If the item is not found, it throws an error.
 * 
 * @param page - The Playwright page instance.
 * @param dropdownLocator - The locator to open the dropdown.
 * @param taskOptionsLocator - The locator for the dropdown options.
 * @param taskText - The text of the item to select.
 */
export async function scrollAndSelectByText(
  page: Page,
  dropdownLocator: Locator,
  taskOptionsLocator: Locator,
  taskText: string
) {
  let isItemFound = false;

  await dropdownLocator.click();

  while (!isItemFound) {
    // Get visible items in the list and check for a match
    const visibleItems = await taskOptionsLocator.allTextContents();

    for (const [index, text] of visibleItems.entries()) {
      if (text.trim() === taskText) {
        await taskOptionsLocator.nth(index).click(); 
        isItemFound = true;
        break;
      }
    }

    if (!isItemFound) {
      const canScrollMore = await page.evaluate(() => {
        const scrollElement = document.querySelector('.rc-virtual-list-holder');
        if (scrollElement) {
          const { scrollTop, scrollHeight, clientHeight } = scrollElement;
          if (scrollTop + clientHeight < scrollHeight) {
            scrollElement.scrollBy(0, clientHeight);
            return true;
          }
        }
        return false;
      });

      if (!canScrollMore) {
        throw new Error(`Task "${taskText}" not found in the dropdown list.`);
      }
    }
  }
}
