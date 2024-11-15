import { Locator } from '@playwright/test';

/**
 * Helper function that waits for the Task Manager spinner to disappear.
 *
 * @param spinnerLocator - The locator of the spinner to wait for it to disappear.
 * @param timeout - Optional timeout in milliseconds to wait (default is 10000 ms).
 */
export async function waitForTaskManagerSpinnerToDisappear(spinnerLocator: Locator, timeout: number = 10000) {
    try {
        await spinnerLocator.waitFor({
            state: 'hidden',
            timeout: timeout
        });
        console.log('Task Manager spinner has disappeared.');
    } catch (error) {
        throw new Error(`Task Manager spinner did not disappear within ${timeout}ms`);
    }
}
