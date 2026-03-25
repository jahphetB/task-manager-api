import { test, expect, type Page } from '@playwright/test';

async function registerAndLogin(page: Page, username: string, password: string) {
  await page.goto('/');

  await page.locator('#username').fill(username);
  await page.locator('#password').fill(password);

  await page.locator('#registerBtn').click();
  await expect(page.locator('#authMsg')).toContainText(/registered successfully/i);

  await page.locator('#loginBtn').click();
  await expect(page.locator('#authChip')).toContainText(`Signed in as ${username}`);
}

async function createTask(page: Page, title: string, description: string) {
  await page.locator('#taskTitle').fill(title);
  await page.locator('#taskDesc').fill(description);

  const createResponsePromise = page.waitForResponse((response) => {
    return response.url().includes('/api/tasks') && response.request().method() === 'POST';
  });

  await page.locator('#createTaskBtn').click();

  const createResponse = await createResponsePromise;
  expect(createResponse.status()).toBe(201);
}

test.describe('TaskManager UI smoke', () => {
  test('login UI appears and protected controls start disabled', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toHaveText('TaskManager');
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#loginBtn')).toBeVisible();
    await expect(page.locator('#registerBtn')).toBeVisible();

    await expect(page.locator('#authChip')).toContainText('Not signed in');
    await expect(page.locator('#createTaskBtn')).toBeDisabled();
    await expect(page.locator('#refreshBtn')).toBeDisabled();
  });

  test('user can register and log in and task controls become enabled', async ({ page }) => {
    const username = `pw_user_${Date.now()}`;
    const password = 'Pass1234!';

    await registerAndLogin(page, username, password);

    await expect(page.locator('#createTaskBtn')).toBeEnabled();
    await expect(page.locator('#refreshBtn')).toBeEnabled();
    await expect(page.locator('#tokenPreview')).not.toHaveText('(none)');
  });

  test('logged-in user can create a task', async ({ page }) => {
    const username = `pw_user_${Date.now()}`;
    const password = 'Pass1234!';
    const taskTitle = `Task ${Date.now()}`;
    const taskDescription = 'Created by Playwright';

    await registerAndLogin(page, username, password);
    await createTask(page, taskTitle, taskDescription);

    await expect(page.locator('#taskTitle')).toHaveValue('');
    await expect(page.locator('#taskDesc')).toHaveValue('');
  });

  test('logout clears session and disables protected task controls', async ({ page }) => {
    const username = `pw_user_${Date.now()}`;
    const password = 'Pass1234!';

    await registerAndLogin(page, username, password);

    await page.locator('#logoutBtn').click();

    await expect(page.locator('#authChip')).toContainText('Not signed in');
    await expect(page.locator('#createTaskBtn')).toBeDisabled();
    await expect(page.locator('#refreshBtn')).toBeDisabled();
    await expect(page.locator('#tokenPreview')).toHaveText('(none)');
  });

  test('created task appears in the task list after refresh', async ({ page }) => {
    const username = `pw_user_${Date.now()}`;
    const password = 'Pass1234!';
    const taskTitle = `Task ${Date.now()}`;
    const taskDescription = 'Task list rendering check';

    await registerAndLogin(page, username, password);
    await createTask(page, taskTitle, taskDescription);

    await page.locator('#refreshBtn').click();

    await expect(page.locator('#taskList')).toContainText(taskTitle);
  });
});