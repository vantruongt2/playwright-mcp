import { test, expect } from '@playwright/test';

test('should add and remove a todo item', async ({ page }) => {
  // Navigate to the TodoMVC application
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Create a unique todo name using timestamp
  const uniqueTodo = `Unique Todo ${new Date().toLocaleString()}`;
  
  // Add a new todo item
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(uniqueTodo);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  // Verify the todo item was added
  const todoItem = page.getByText(uniqueTodo);
  await expect(todoItem).toBeVisible();
  
  // Verify the count of items
  await expect(page.getByText('1 item left')).toBeVisible();
  
  // Delete the todo item (first hover to make delete button visible)
  const todoListItem = page.getByRole('listitem').filter({ hasText: uniqueTodo });
  await todoListItem.hover();
  await page.getByRole('button', { name: 'Delete' }).click();
  
  // Verify the item was deleted
  await expect(todoItem).not.toBeVisible();
});