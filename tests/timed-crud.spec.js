const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
});

test('TodoMVC - CRUD operations with delay', async ({ page }) => {
  const todoInput = page.locator('.new-todo');

  // 🟢 CREATE
  await todoInput.fill('Buy milk');
  await page.waitForTimeout(1000);
  await todoInput.press('Enter');
  await page.waitForTimeout(1000);
  await expect(page.locator('.todo-list li')).toHaveCount(1);
  await expect(page.locator('.todo-list li')).toHaveText(['Buy milk']);
  await page.waitForTimeout(1000);

  // 📘 READ
  const firstTodo = page.locator('.todo-list li').first();
  await expect(firstTodo).toContainText('Buy milk');
  await page.waitForTimeout(1000);

  // 📝 UPDATE
  await firstTodo.dblclick();
  await page.waitForTimeout(1000);
  const editInput = firstTodo.locator('.edit');
  await editInput.fill('Buy chocolate milk');
  await page.waitForTimeout(1000);
  await editInput.press('Enter');
  await page.waitForTimeout(1000);
  await expect(firstTodo).toContainText('Buy chocolate milk');
  await page.waitForTimeout(1000);

   // ❌ DELETE
  await firstTodo.hover();
  await page.waitForTimeout(1000);
  await firstTodo.locator('.destroy').click();
  await page.waitForTimeout(1000);
  await expect(page.locator('.todo-list li')).toHaveCount(0);

});
