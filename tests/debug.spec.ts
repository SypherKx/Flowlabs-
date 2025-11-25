import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Debug Dashboard', async ({ page }) => {
    const log = (msg) => fs.appendFileSync('debug_log.txt', msg + '\n');
    log('Starting Debug Test');

    try {
        await page.goto('/login');
        log('Navigated to login');

        if (await page.getByTestId('email-input').isVisible()) {
            log('Login form visible, logging in...');
            await page.getByTestId('email-input').fill('test@flowlabs.com');
            await page.getByTestId('password-input').fill('TestPassword123!');
            await page.getByTestId('login-submit').click();
            log('Clicked submit');
            await page.waitForURL('**/dashboard', { timeout: 20000 });
            log('Redirected to dashboard');
        } else {
            log('Already logged in?');
        }

        log('Waiting for network idle');
        await page.waitForLoadState('networkidle');
        log('Network idle');

        const spinner = page.locator('.animate-spin');
        if (await spinner.isVisible()) {
            log('Spinner is visible. Waiting for it to hide...');
            await expect(spinner).not.toBeVisible({ timeout: 10000 });
            log('Spinner hidden');
        } else {
            log('Spinner not visible initially');
        }

        log('Checking for kpi-card');
        const cards = page.getByTestId('kpi-card');
        const count = await cards.count();
        log(`Found ${count} cards`);
        expect(count).toBeGreaterThanOrEqual(4);

        if (count === 0) {
            log('Dumping HTML body:');
            const html = await page.innerHTML('body');
            log(html);
        }

    } catch (e) {
        log(`Error: ${e.message}`);
        log(`Stack: ${e.stack}`);
    }
});
