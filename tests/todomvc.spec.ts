import { test, expect } from "@playwright/test";

test("TodoMVC - add and remove a todo item", async ({ page }) => {
  // Generate a unique todo name with timestamp
  const uniqueTodoName = `Unique Todo Item - ${new Date().toLocaleDateString()}`;

  // Navigate to the TodoMVC demo site
  await page.goto("https://demo.playwright.dev/todomvc");

  // Verify the page title
  await expect(page).toHaveTitle(/TodoMVC/);

  // Create a new todo item
  const todoInput = page.getByRole("textbox", {
    name: "What needs to be done?",
  });
  await todoInput.fill(uniqueTodoName);
  await todoInput.press("Enter");

  // Verify that the todo item is displayed in the list
  const todoItem = page.getByText(uniqueTodoName);
  await expect(todoItem).toBeVisible();

  // Check that the todo counter shows 1 item
  await expect(page.getByText("1 item left")).toBeVisible();

  // Hover over the todo item to reveal the delete button
  await todoItem.hover();

  // Click the delete button
  await page.getByRole("button", { name: "Delete" }).click();

  // Verify that the todo item is removed
  await expect(todoItem).not.toBeVisible();

  // Check that the todo list is empty (no todo counter visible)
  await expect(page.getByText("item left")).not.toBeVisible();
});
