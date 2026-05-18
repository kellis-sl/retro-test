// spec: specs/retrotool.plan.md
// seed: seed.spec.ts

import { test, expect } from '../../fixtures';
import { v4 as uuidv4 } from 'uuid';

test.describe('Group & Vote Phase', () => {
  test('Voting on comments in the Group & Vote phase', async ({ page, retroBoard, retroApi }) => {
    const slug = uuidv4();

    // Navigate first to create the retro and establish the browser session
    await retroBoard.gotoNamed(slug);

    // Seed a comment and transition to Group & Vote phase using the shared browser session
    await retroApi.createWorksItem(slug, 'Improve deployment process');
    await retroApi.transitionToReviewStep(slug);

    // Reload to reflect the new board state
    await page.reload();

    await expect(page.getByText('Improve deployment process')).toBeVisible();

    // Verify the comment starts with a vote count of 0
    await expect(page.getByText('0', { exact: true })).toBeVisible();

    // Click the vote button — each click adds one vote (votes are not toggleable)
    await page.getByRole('button', { name: 'animation' }).first().click();
    await expect(page.getByText('1', { exact: true })).toBeVisible();

    // A second vote increments again
    await page.getByRole('button', { name: 'animation' }).first().click();
    await expect(page.getByText('2', { exact: true })).toBeVisible();
  });
});
