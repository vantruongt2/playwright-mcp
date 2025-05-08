import { test, expect } from '@playwright/test';


test.describe('TodoMVC', () => {
  test('should clear text input field when an item is added', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create one todo item.
    await newTodo.fill('Buy groceries');
    await newTodo.press('Enter');

    // Check that input is empty.
    await expect(newTodo).toBeEmpty();
  });

  test('should allow me to add todo items', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create 1st todo.
    await newTodo.fill('Take out the trash');
    await newTodo.press('Enter');

    // Make sure the list only has one todo item.
    await expect(page.getByTestId('todo-title')).toHaveText([
      'Take out the trash',
    ]);
  });
});
