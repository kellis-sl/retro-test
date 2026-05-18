// spec: specs/retrotool.plan.md
// seed: seed.spec.ts

import { test, expect } from '../../fixtures';
import { v4 as uuidv4 } from 'uuid';

test.describe('Group & Vote Phase', () => {
  test('Adding more comments during Group & Vote phase', async ({ page, retroBoard, retroApi }) => {
    const slug = uuidv4();

    // Navigate first to create the retro and establish the browser session
    await retroBoard.gotoNamed(slug);

    // Seed a comment and transition to Group & Vote phase
    await retroApi.createWorksItem(slug, 'Initial seeded comment');
    await retroApi.transitionToReviewStep(slug);

    // Reload to reflect the new board state
    await page.reload();

    await expect(page.getByText('Initial seeded comment')).toBeVisible({ timeout: 10000 });

    // Add a new comment to the 'It worked well that...' column during the Group & Vote phase
    await retroBoard.addComment('workedWell', 'Late addition during voting');

    // Re-navigate to confirm the new comment was persisted to the board
    await retroBoard.gotoNamed(slug);

    await expect(page.getByText('Late addition during voting')).toBeVisible();
    await expect(page.getByText('Initial seeded comment')).toBeVisible();

    // Verify the new card has a vote button
    await expect(page.getByRole('button', { name: 'animation' }).first()).toBeVisible();
  });
});
