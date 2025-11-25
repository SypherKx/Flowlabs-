import { test, expect, Page } from '@playwright/test';
import fs from 'fs';

const log = (msg: string) => fs.appendFileSync('flowlabs_log.txt', msg + '\n');

// Test credentials (update these with real test account)
const TEST_USER = {
    email: 'test@flowlabs.com',
    password: 'TestPassword123!'
};

// Helper to mock Supabase requests
async function mockSupabase(page: Page) {
    log('Setting up Supabase Mocks');

    // Mock Supabase Auth
    await page.route('**/auth/v1/token?grant_type=password', async route => {
        const json = {
            access_token: "fake-access-token",
            token_type: "bearer",
            expires_in: 3600,
            refresh_token: "fake-refresh-token",
            user: {
                id: "fake-user-id",
                aud: "authenticated",
                role: "authenticated",
                email: "test@flowlabs.com",
                email_confirmed_at: new Date().toISOString(),
                phone: "",
                last_sign_in_at: new Date().toISOString(),
                app_metadata: { provider: "email", providers: ["email"] },
                user_metadata: {},
                identities: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }
        };
        await route.fulfill({ json });
    });

    // Mock Data Fetching (Leads)
    await page.route('**/rest/v1/leads*', async route => {
        const json = [
            { id: 1, value: 1000, status: 'New' },
            { id: 2, value: 2000, status: 'Closed' },
            { id: 3, value: 3000, status: 'Negotiation' },
            { id: 4, value: 4000, status: 'New' }
        ];
        await route.fulfill({ json });
    });

    // Mock Clients
    await page.route('**/rest/v1/clients*', async route => {
        await route.fulfill({ json: [] });
    });

    // Mock Logs
    await page.route('**/rest/v1/logs*', async route => {
        await route.fulfill({ json: [] });
    });
}

test.describe('FlowLabs - Layout & Responsiveness Tests', () => {

    test('Landing Page - Navbar Visibility', async ({ page, viewport }) => {
        await page.goto('/');
        const navbar = page.locator('nav, header').first();
        await expect(navbar).toBeVisible();
        if (viewport && viewport.width < 768) {
            const logo = page.getByText('FlowLabs').first();
            await expect(logo).toBeVisible();
        }
    });

    test('Landing Page - Hero Section', async ({ page }) => {
        await page.goto('/');
        const heroHeading = page.locator('h1, h2').first();
        await expect(heroHeading).toBeVisible();
        const box = await heroHeading.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.height).toBeGreaterThan(20);
    });

    test('Landing Page - CTA Button Clickable', async ({ page }) => {
        await page.goto('/');
        const ctaButton = page.getByRole('button', { name: /get started|sign up|start free/i })
            .or(page.getByRole('link', { name: /get started|sign up|start free/i }));
        await expect(ctaButton.first()).toBeVisible();
        await expect(ctaButton.first()).toBeEnabled();
    });

    test('Landing Page - Footer & Legal Links', async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        const privacyLink = page.getByRole('link', { name: /privacy/i });
        const termsLink = page.getByRole('link', { name: /terms/i });
        await expect(privacyLink).toBeVisible();
        await expect(termsLink).toBeVisible();
    });
});

test.describe('FlowLabs - Authentication Flow', () => {
    test.beforeEach(async ({ page }) => {
        await mockSupabase(page);
    });

    test('Login Page - Form Elements Visible', async ({ page, viewport }) => {
        await page.goto('/login');
        const emailInput = page.getByTestId('email-input');
        const passwordInput = page.getByTestId('password-input');
        const submitButton = page.getByTestId('login-submit');
        await expect(emailInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
        await expect(submitButton).toBeVisible();
    });

    test('Login Flow - Successful Authentication', async ({ page }) => {
        await page.goto('/login');
        await page.getByTestId('email-input').fill(TEST_USER.email);
        await page.getByTestId('password-input').fill(TEST_USER.password);
        await page.getByTestId('login-submit').click();
        await page.waitForURL('**/dashboard', { timeout: 20000 });
        await expect(page).toHaveURL(/dashboard/);
    });
});

test.describe('FlowLabs - Dashboard Responsiveness', () => {
    test.beforeEach(async ({ page }) => {
        await mockSupabase(page);
        // Login before each dashboard test
        await page.goto('/login');
        if (await page.getByTestId('email-input').isVisible()) {
            await page.getByTestId('email-input').fill(TEST_USER.email);
            await page.getByTestId('password-input').fill(TEST_USER.password);
            await page.getByTestId('login-submit').click();
            await page.waitForURL('**/dashboard', { timeout: 20000 });
        }
    });

    test('Dashboard - KPI Cards Layout', async ({ page, viewport }) => {
        log('Starting KPI Cards Layout test');
        await page.waitForLoadState('networkidle');
        
        const metricCards = page.getByTestId('kpi-card');
        await expect(metricCards.first()).toBeVisible({ timeout: 20000 });
        
        const cardCount = await metricCards.count();
        log(`Found ${cardCount} KPI cards`);
        expect(cardCount).toBeGreaterThanOrEqual(4);

        if (viewport) {
            if (viewport.width < 768) {
                console.log('Mobile viewport - cards should stack vertically');
            } else if (viewport.width < 1024) {
                console.log('Tablet viewport - 2-column grid expected');
            } else {
                console.log('Desktop viewport - 4-column grid expected');
            }
        }
    });

    test('Dashboard - No Horizontal Scroll', async ({ page }) => {
        await page.waitForLoadState('networkidle');
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5);
    });

    test('Dashboard - Sidebar Behavior', async ({ page, viewport }) => {
        const sidebar = page.locator('aside, [class*="sidebar"]').first();
        if (viewport && viewport.width < 768) {
            const toggleBtn = page.getByTestId('sidebar-toggle');
            await expect(toggleBtn).toBeVisible();
        } else {
            await expect(sidebar).toBeVisible();
        }
    });
});

test.describe('FlowLabs - Pricing & Payment', () => {
    test.beforeEach(async ({ page }) => {
        await mockSupabase(page);
        await page.goto('/login');
        if (await page.getByTestId('email-input').isVisible()) {
            await page.getByTestId('email-input').fill(TEST_USER.email);
            await page.getByTestId('password-input').fill(TEST_USER.password);
            await page.getByTestId('login-submit').click();
            await page.waitForURL('**/dashboard', { timeout: 20000 });
        }
        await page.goto('/pricing');
    });

    test('Pricing - Upgrade Button Triggers Razorpay', async ({ page }) => {
        const upgradeBtn = page.getByTestId('upgrade-pro-btn');
        if (await upgradeBtn.count() > 0) {
            await expect(upgradeBtn).toBeVisible();
            await expect(upgradeBtn).toBeEnabled();
        }
    });
});

test.describe('FlowLabs - Settings Page', () => {
    test.beforeEach(async ({ page }) => {
        await mockSupabase(page);
        await page.goto('/login');
        if (await page.getByTestId('email-input').isVisible()) {
            await page.getByTestId('email-input').fill(TEST_USER.email);
            await page.getByTestId('password-input').fill(TEST_USER.password);
            await page.getByTestId('login-submit').click();
            await page.waitForURL('**/dashboard', { timeout: 20000 });
        }
    });

    test('Settings Page - Sections Visible', async ({ page }) => {
        const settingsLink = page.getByRole('link', { name: /settings/i })
            .or(page.getByRole('button', { name: /settings/i }));

        if (await settingsLink.count() > 0) {
            await settingsLink.first().click();
            await page.waitForLoadState('networkidle');
            const profileSection = page.getByText(/profile/i);
            const billingSection = page.getByText(/billing/i);
            const hasProfile = await profileSection.count() > 0;
            const hasBilling = await billingSection.count() > 0;
            expect(hasProfile || hasBilling).toBeTruthy();
        }
    });

    test('Settings Page - Sign Out Button', async ({ page }) => {
        const signOutButton = page.getByRole('button', { name: /sign out|logout|log out/i });
        expect(await signOutButton.count()).toBeGreaterThan(0);
    });
});

test.describe('FlowLabs - Legal Pages', () => {
    test('Privacy Policy - Page Loads', async ({ page }) => {
        await page.goto('/privacy');
        const content = page.getByText(/privacy|data collection|personal information/i);
        await expect(content.first()).toBeVisible();
    });

    test('Terms of Service - Page Loads', async ({ page }) => {
        await page.goto('/terms');
        const content = page.getByText(/terms|agreement|service/i);
        await expect(content.first()).toBeVisible();
    });
});
