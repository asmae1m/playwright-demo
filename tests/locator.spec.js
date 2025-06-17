import { test, expect, chromium } from '@playwright/test';

test('Languages in Wikipedia', async () => {
    const browser = await chromium.launch({ headless: false }); 
    const context = await browser.newContext();
    const page = await context.newPage();
  
    await page.goto('https://www.wikipedia.org/');
    await page.waitForTimeout(3000);
  
    await page.locator('#js-link-box-fr').click(); 
  
    await page.waitForTimeout(3000);
  
    const language= await page.getAttribute('html', 'lang'); 
    expect(language).toBe('fr'); 
  
    const heading = await page.locator('.firstHeading.mw-first-heading').innerText();
    console.info(heading);
  
    console.info("This page is in french!")
  
  });