import { defineConfig, devices } from "@playwright/test";
import * as path from "path";
import dotenv from "dotenv";
import config from "./config";

/**
 * Read environment variables from file.
 */
dotenv.config({ path: path.resolve(__dirname, `.env`) });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  testIgnore: "**/tests-examples/*.example.ts",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [
        ["list"],
        [
          "playwright-qase-reporter",
          {
            mode: "testops",
            debug: false,
            environment: config.name,
            testops: {
              api: {
                token: process.env.QASE_TOKEN,
              },
              project: config.qaseproject,
              uploadAttachments: true,
              run: {
                title: `Automated run - ${config.name} ${
                  process.env.TEST_TYPE ? process.env.TEST_TYPE : ""
                } - ${new Date().toISOString()}`,
                complete: true,
              },
            },
          },
        ],
        ["json", { outputFile: "results.json" }], // Add JSON reporter for CI
      ]
    : [
        ["html"], // Use HTML reporter locally
      ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: config.baseUrl || "https://portal.vocovo.com/",
    testIdAttribute: "data-test",
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    /* Set storage state to reuse session */
    // storageState: path.resolve(__dirname, './storageState.json'),

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for different test types */
  projects: [
    {
      name: "all",
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
      grepInvert: /@production/, // Exclude @production tagged tests
    },
    {
      name: "regression",
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
      grep: /@regression/,
    },
    {
      name: "smoke",
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
      grep: /@smoke/,
    },
    {
      name: "sanity",
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
      grep: /@sanity/,
    },
    {
      name: "production",
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
      grep: /@production/,
    },
    {
      name: "setup",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /.*\.setup\.ts/,
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
