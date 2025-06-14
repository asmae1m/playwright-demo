const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
});

test('TodoMVC - CRUD operations', async ({ page }) => {
  const todoInput = page.locator('.new-todo');

  // CREATE
  await todoInput.fill('Buy milk');
  await todoInput.press('Enter');
  await expect(page.locator('.todo-list li')).toHaveCount(1);
  await expect(page.locator('.todo-list li')).toHaveText(['Buy milk']);

  // READ
  const firstTodo = page.locator('.todo-list li').first();

  await expect(firstTodo).toContainText('Buy milk');
  await page.waitForTimeout(1000);

  // UPDATE
  await firstTodo.dblclick();
  const editInput = firstTodo.locator('.edit');
  await editInput.fill('Buy chocolate milk');
  await editInput.press('Enter');
  await expect(firstTodo).toContainText('Buy chocolate milk');

   // DELETE
  await firstTodo.hover();
  await firstTodo.locator('.destroy').click();
  await expect(page.locator('.todo-list li')).toHaveCount(0);
});
