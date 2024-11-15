import { test } from '../../support/fixtures';
import * as dotenv from 'dotenv';
dotenv.config();

const authFile = '.auth/user.json';
const password = 'secret_sauce';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Tests', () => {

  test('Login with standard_user and save session state @smoke', async ({ loginPage }) => {
    // Arrange
    await loginPage.visit();
    await loginPage.shouldBeLoaded();

    // Act
    await loginPage.login('standard_user', password);
    console.log(`\x1b[2m\tSign in processed for standard_user\x1b[0m`);

    // Assert
    await loginPage.shouldSeeDashboard();
    await loginPage.saveStorageState();
    console.log(`\x1b[2m\tSession state saved to ${authFile} for standard_user\x1b[0m`);
    await loginPage.logout();
  });

  test('Login with locked_out_user and expect error @regression', async ({ loginPage }) => {
    // Arrange
    await loginPage.visit();
    await loginPage.shouldBeLoaded();

    // Act
    await loginPage.login('locked_out_user', password);

    // Assert
    await loginPage.shouldShowLoginErrorMessage('Epic sadface: Sorry, this user has been locked out.');
    console.log(`\x1b[2m\tError displayed as expected for locked_out_user\x1b[0m`);
  });

  test('Login with problem_user and verify access @regression', async ({ loginPage }) => {
    // Arrange
    await loginPage.visit();
    await loginPage.shouldBeLoaded();

    // Act
    await loginPage.login('problem_user', password);

    // Assert
    await loginPage.shouldSeeDashboard();
    console.log(`\x1b[2m\tAccess verified for problem_user\x1b[0m`);
    await loginPage.logout();
  });

  test('Login with performance_glitch_user and verify access', async ({ loginPage }) => {
    // Arrange
    await loginPage.visit();
    await loginPage.shouldBeLoaded();

    // Act
    await loginPage.login('performance_glitch_user', password);

    // Assert
    await loginPage.shouldSeeDashboard();
    console.log(`\x1b[2m\tAccess verified for performance_glitch_user\x1b[0m`);
    await loginPage.logout();
  });

  test('Login with error_user and verify access @regression', async ({ loginPage }) => {
    // Arrange
    await loginPage.visit();
    await loginPage.shouldBeLoaded();

    // Act
    await loginPage.login('error_user', password);

    // Assert
    await loginPage.shouldSeeDashboard();
    console.log(`\x1b[2m\tAccess verified for error_user\x1b[0m`);
    await loginPage.logout();
  });

  test('Login with visual_user and verify access @regression', async ({ loginPage }) => {
    // Arrange
    await loginPage.visit();
    await loginPage.shouldBeLoaded();

    // Act
    await loginPage.login('visual_user', password);

    // Assert
    await loginPage.shouldSeeDashboard();
    console.log(`\x1b[2m\tAccess verified for visual_user\x1b[0m`);
    await loginPage.logout();
  });
});
