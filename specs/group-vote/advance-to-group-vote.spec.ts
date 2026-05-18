// spec: specs/retrotool.plan.md
// seed: seed.spec.ts

import { test, expect } from '../../fixtures';
import { v4 as uuidv4 } from 'uuid';

test.describe('Group & Vote Phase', () => {
  test('Advancing from Brainstorm to Group & Vote phase', async ({ page, retroBoard }) => {
    const slug = uuidv4();

    // Navigate to the board first so the browser session owns the comment
    await retroBoard.gotoNamed(slug);

    // Add a comment via UI so it is owned by the browser session (visible in Brainstorm phase)
    await retroBoard.addComment('workedWell', 'Team morale was high');
    await expect(page.getByText('Team morale was high')).toBeVisible();

    // Click the 'Group & vote comments' button to trigger the confirmation dialog
    await page.getByRole('button', { name: 'Group & vote comments' }).click();

    // Verify the confirmation dialog appears with the correct text
    await expect(page.getByText('Are you sure?')).toBeVisible();
    await expect(page.getByText("Everyone will see all comments and this can't be undone.")).toBeVisible();

    // Click 'Cancel' in the confirmation dialog
    await page.getByText('Cancel').click();

    // Verify the retro remains in the Brainstorm phase after cancelling
    await expect(page.getByRole('button', { name: 'Group & vote comments' })).toBeVisible();
    await expect(page.getByText("Add your comments below, you won't be able to see your peers' until next step")).toBeVisible();

    // Click 'Group & vote comments' again and confirm the advance
    await page.getByRole('button', { name: 'Group & vote comments' }).click();
    await page.locator('reach-portal').getByText('Group & vote comments').click();

    // Verify the retro has advanced to the Group & Vote phase
    await expect(page.getByText('Drag and drop comments to group them together and vote for the ones you\'d like to discuss about')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Discuss and add action items' })).toBeVisible();
  });
});
