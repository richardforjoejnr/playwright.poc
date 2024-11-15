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
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
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
        ["json", { outputFile: "results.json" }],
      ]
    : [["html"]],
  use: {
    baseURL: config.baseUrl || "https://www.saucedemo.com/",
    testIdAttribute: "data-test",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
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
      name: "setup",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /.*\.setup\.ts/,
    },
    // E2E projects for each browser
    {
      name: "e2e-chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "e2e-firefox",
      use: {
        ...devices["Desktop Firefox"],
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "e2e-webkit",
      use: {
        ...devices["Desktop Safari"],
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
    },
  ],
});
