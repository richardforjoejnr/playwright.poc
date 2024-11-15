# playwright-poc

This repository contains the production-level tests for our Portal application, written using the Playwright testing framework.

## Setup

1. Copy env.example and update with prod credentials
   - Smoke tests are currently set to run in prod
2. Run `nvm use` to make sure you are using the correct node version
3. Run `npx playwright install`
4. Run `npm install`

You should now be ready to start running tests 🎉 try running `npm run test:e2e`
