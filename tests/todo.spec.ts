import { test, expect } from '@playwright/test';

test('Todo workflow - create and delete a todo item', async ({ page }) => {
  // Generate a unique todo name using the current date and time
  const uniqueTodoName = `My unique todo for ${new Date().toLocaleDateString()}`;
  
  // Navigate to the TodoMVC app
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Verify page has loaded correctly
  await expect(page).toHaveTitle('React • TodoMVC');
  
  // Create a new todo item
  const newTodoInput = page.getByRole('textbox', { name: 'What needs to be done?' });
  await newTodoInput.fill(uniqueTodoName);
  await newTodoInput.press('Enter');
  
  // Verify the todo item has been added
  const todoItem = page.getByTestId('todo-title').filter({ hasText: uniqueTodoName });
  await expect(todoItem).toBeVisible();
  await expect(page.getByText('1 item left')).toBeVisible();
  
  // Hover over the todo item to reveal the delete button
  await todoItem.hover();
  
  // Delete the todo item
  await page.getByRole('button', { name: 'Delete' }).click();
  
  // Verify the todo item has been removed
  await expect(todoItem).not.toBeVisible();
  await expect(page.getByTestId('todo-title')).toHaveCount(0);
});
