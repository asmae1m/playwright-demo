const { test, expect } = require('@playwright/test');

test('login works with visible steps', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.waitForTimeout(1000);

  await page.fill('#username', 'tomsmith');
  await page.waitForTimeout(1000);

  await page.fill('#password', 'SuperSecretPassword!');
  await page.waitForTimeout(1000);

  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);

  await expect(page.locator('.flash.success')).toBeVisible();
  await page.waitForTimeout(1500);
});

