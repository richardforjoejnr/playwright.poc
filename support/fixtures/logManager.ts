import * as fs from 'fs';
import { test as base, expect } from '@playwright/test';

export const logger = base.extend<{ page: void, failOnJSError: boolean, saveLogs: void }>({
  failOnJSError: [ true, { option: true }],
  page: async ({ page, failOnJSError }, use) => { 
    // before
    const errors: Array<Error> = [];
    page.addListener('pageerror', (error) => errors.push(error));
    await use(page);
    // after
    if (failOnJSError) { 
      console.log('Errors:', errors);
      expect(errors).toHaveLength(0);
    }
    
  },
  saveLogs: [async ({}, use, testInfo) => {
    // Collecting logs during the test.
    const logs = [];

    await use();

    console.log('Test logs:');

    // After the test we can check whether the test passed or failed.
    if (testInfo.status !== testInfo.expectedStatus) {
      // outputPath() API guarantees a unique file name.
      const logFile = testInfo.outputPath('logs.txt');
      await fs.promises.writeFile(logFile, logs.join('\n'), 'utf8');
      testInfo.attachments.push({ name: 'logs', contentType: 'text/plain', path: logFile });
    }
  }, { auto: true }],
});
export { expect } from '@playwright/test';