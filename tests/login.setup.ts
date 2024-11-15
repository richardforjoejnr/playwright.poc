import { test as setup } from '../support/fixtures';
import * as dotenv from 'dotenv';

dotenv.config();

setup('login, and save session state', async ({ loginPage }) => {
  // Step 1: Visit the login page first and ensure it is loaded
  await loginPage.visit();
  await loginPage.shouldBeLoaded();

  // Step 2: Perform login with credentials from environment variables
  await loginPage.loginWithTestAccount();
  console.log(`\x1b[2m\tSign in processed\x1b[0m`);

  // Step 4: Verify that the dashboard page is loaded after login
  await loginPage.saveStorageState();
});
