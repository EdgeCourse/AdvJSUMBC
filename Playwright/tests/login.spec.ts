import { test, expect } from '@playwright/test';

test('user can log in', async ({ page }) => {
  await page.goto('http://localhost:3000/login.html');

  await page.fill('#username', 'admin');
  await page.fill('#password', '123456');
  await page.click('button[type="submit"]');

  // Check something happened: redirect or message
  await expect(page).toHaveURL(/dashboard/); // Or use a selector like:
  // await expect(page.locator('#success')).toHaveText('Welcome!');
});
