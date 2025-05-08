import { test, expect } from '@playwright/test';

test('should add and remove todo item', async ({ page }) => {
  // Navigate to the TodoMVC application
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Create a unique todo item with timestamp to ensure uniqueness
  const todoText = `Unique Todo Item for ${new Date().toLocaleDateString()}`;
  
  // Add the todo item
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await newTodoInput.fill(todoText);
  await newTodoInput.press('Enter');
  
  // Verify the todo item is displayed
  const todoItem = page.getByText(todoText);
  await expect(todoItem).toBeVisible();
  
  // Hover over the todo item to make the delete button visible
  const todoListItem = page.locator('.todo-list li').filter({ hasText: todoText });
  await todoListItem.hover();
  
  // Click the delete button
  await todoListItem.locator('button.destroy').click();
  
  // Verify the todo item is removed
  await expect(todoItem).not.toBeVisible();
});