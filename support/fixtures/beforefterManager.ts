import { test as base } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

// Extend the test fixture with global hooks for each test and each worker process
export const beforeAfterManager = base.extend<{ page: void, forEachTest: void }, { forEachWorker: void }>({
  
  // Global beforeAll and afterAll hooks (for all tests in every worker)
  forEachWorker: [async ({ browser }, use) => {

    console.log(`BEFORE ALL TESTS in worker ${base.info().workerIndex}`);

    await use(); // Proceed with the worker process

  }, { scope: 'worker', auto: true }],

  // beforeEach and afterEach hooks for every test
  forEachTest: [async ({ page }, use) => {
    console.log('BEFORE EACH TEST');
    // Example setup before each test:
    // - Clear cookies or local storage
 
    await use(); // Proceed with the test

    console.log('AFTER EACH TEST');
    // Example teardown after each test:
    // - Reset mocks or spies
    console.log('Last URL:', page.url()); // Example: Log the last URL visited
  }, { auto: true }],  // Automatically run before and after every test

  // Extend the 'page' fixture to add custom behavior or setup
  page: async ({ page }, use) => {
    // Inject a script to indicate Playwright is running
    // before
  console.log('BEFORE TEST - beforeAfterManager');
    await page.addInitScript(() => {
      console.log('Playwright is running');
      (window as any).Playwright = true;
    });

    // Add custom routing to log or block requests
    await page.route('**/*', route => {
      // Add your custom routing logic here
      console.log('Request to', route.request().url());
      route.continue();
    });

    // Provide the modified page fixture to the tests
    await use(page); // Correctly passing the page object to use

    console.log('AFTER TEST - beforeAfterManager');
  },
});

// Exporting test and expect to make them available in other test files
export { expect } from '@playwright/test';

