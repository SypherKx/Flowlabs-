import { test, expect } from '@playwright/test';

test('Sanity Check', async ({ page }) => {
    console.log('Sanity check running');
    await page.goto('https://example.com');
    expect(true).toBe(true);
});
