// spec: specs/retrotool.plan.md
// seed: seed.spec.ts

import { test, expect } from '../../fixtures';

test.describe('Retro Creation', () => {
  test('Creating a new retro via /new URL', async ({ retroBoard, page }) => {
    // 1. Navigate to https://www.retrotool.app/new
    await retroBoard.goto();

    // Expect: User is redirected to a UUID-based URL
    await expect(page).toHaveURL(/\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);

    // Expect: All four column input fields are visible ('We need to do...' is disabled)
    await expect(retroBoard.workedWellInput).toBeVisible();
    await expect(retroBoard.improveInput).toBeVisible();
    await expect(retroBoard.questionsInput).toBeVisible();
    await expect(retroBoard.actionItemsInput).toBeVisible();
    await expect(retroBoard.actionItemsInput).toBeDisabled();

    // 2. Verify the phase breadcrumb indicator shows all four phases
    await expect(page.getByText('Brainstorm')).toBeVisible();
    await expect(page.getByText('Add action items')).toBeVisible();
    await expect(page.getByText('Done')).toBeVisible();

    // 3. Verify the 'Group & vote comments' button is disabled with no comments
    await expect(page.getByRole('button', { name: 'Group & vote comments' })).toBeDisabled();
  });

  test('Creating a retro with a custom URL', async ({ retroBoard, page }) => {
    // 1. Navigate to https://www.retrotool.app/my-team-sprint-99
    await retroBoard.gotoNamed('my-team-sprint-99');

    // Expect: The retro board is loaded at the custom URL in the Brainstorm phase
    await expect(page).toHaveURL('https://www.retrotool.app/my-team-sprint-99');
    await expect(retroBoard.workedWellInput).toBeVisible();

    // 2. Verify the retro is in a blank state (no comments, all inputs empty)
    await expect(retroBoard.workedWellInput).toHaveValue('');
    await expect(retroBoard.improveInput).toHaveValue('');
    await expect(retroBoard.questionsInput).toHaveValue('');
    await expect(page.getByRole('button', { name: 'Group & vote comments' })).toBeDisabled();

    // 3. Navigate back to the same custom URL and verify it persists
    await retroBoard.gotoNamed('my-team-sprint-99');
    await expect(page).toHaveURL('https://www.retrotool.app/my-team-sprint-99');
    await expect(retroBoard.workedWellInput).toBeVisible();
  });
});
