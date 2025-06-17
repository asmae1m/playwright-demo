import { test, expect, chromium } from '@playwright/test';

test('Login Test', async () => {
  const browser = await chromium.launch({ headless: false }); 
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://mail.fh-aachen.de/');
  await page.waitForTimeout(3000);

  const username = page.locator('#username');
  await username.pressSequentially('am9027s'); //pressSequentially pour ecrire lettre par lettre, fill pour saisir tout le mot 

  const password = page.locator('#password');
  await password.pressSequentially('@'); //pressSequentially pour ecrire lettre par lettre, fill pour saisir tout le mot 

  await page.waitForTimeout(8000);
  await page.locator('.signinTxt >> nth=0').click();
  await page.waitForTimeout(8000);
  await page.locator('#trust-browser-button').click();
  await page.waitForTimeout(9000);

  const title = await page.locator('div._n_k1.ms-fcl-ns').innerText();
  expect(title).toContain('Boîte de réception'); //What we do expect ??

  console.info("You are logged in!"); // Au cas ou successful
});