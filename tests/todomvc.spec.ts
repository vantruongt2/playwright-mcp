import { test, expect } from '@playwright/test';

test('TodoMVC - create and remove a todo item', async ({ page }) => {
  // The unique todo name that includes the current date
  const todoText = 'Test Todo Item - May 22 2025';

  // Navigate to TodoMVC demo site
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Verify that the page loaded
  await expect(page).toHaveTitle(/TodoMVC/);
  
  // Create a new todo item
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await newTodoInput.fill(todoText);
  await newTodoInput.press('Enter');
  
  // Verify that the todo item was added to the list
  const todoItem = page.getByTestId('todo-title').filter({ hasText: todoText });
  await expect(todoItem).toBeVisible();
  await expect(page.getByText('1 item left')).toBeVisible();
  
  // Hover over the todo item to make the delete button visible
  await todoItem.hover();
  
  // Delete the todo item
  await page.getByRole('button', { name: 'Delete' }).click();
  
  // Verify that the todo item was removed
  await expect(todoItem).not.toBeVisible();
  await expect(page.getByTestId('todo-list')).not.toBeVisible();
});
