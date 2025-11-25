import { test, expect } from '@playwright/test';

test('Sign Up Flow', async ({ page }) => {
    // Generate random email
    const email = `test${Date.now()}@flowlabs.com`;
    const password = 'TestPassword123!';

    await page.goto('/login');
    await page.getByText('Sign up').click();

    await page.waitForURL('**/signup');

    await page.getByPlaceholder('Full Name').fill('Test User');
    await page.getByPlaceholder('Email Address').fill(email);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByPlaceholder('Confirm Password').fill(password);

    // Click sign up button (assuming text "Sign Up" or similar)
    await page.getByRole('button', { name: /sign up/i }).click();

    // Should redirect to dashboard
    await page.waitForURL('**/dashboard', { timeout: 20000 });

    // Check for welcome message or dashboard element
    await expect(page.getByText('FlowLabs')).toBeVisible();
});
