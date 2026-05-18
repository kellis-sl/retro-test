// spec: specs/retrotool.plan.md
// seed: seed.spec.ts

import { test, expect } from '../../fixtures';
import { v4 as uuidv4 } from 'uuid';

test.describe('Group & Vote Phase', () => {
  test('Grouping comments via drag and drop', async ({ page, retroBoard, retroApi }) => {
    const slug = uuidv4();

    // Navigate first to create the retro and establish the browser session
    await retroBoard.gotoNamed(slug);

    // Seed two improve items and transition to Group & Vote phase
    const parent = await retroApi.createImproveItem(slug, 'Deployment speed');
    const child = await retroApi.createImproveItem(slug, 'CI/CD pipeline');
    await retroApi.transitionToReviewStep(slug);

    // Reload to reflect the new board state
    await page.reload();

    // Verify both comment cards are visible before grouping
    await expect(page.getByText('Deployment speed')).toBeVisible();
    await expect(page.getByText('CI/CD pipeline')).toBeVisible();

    // Drag 'CI/CD pipeline' onto 'Deployment speed' to group them
    const childCard = page.locator('[class*="Item__ItemContainer-"]').filter({ hasText: 'CI/CD pipeline' });
    const parentCard = page.locator('[class*="Item__ItemContainer-"]').filter({ hasText: 'Deployment speed' });

    await childCard.waitFor({ state: 'visible' });
    await parentCard.waitFor({ state: 'visible' });

    const childBox = await childCard.boundingBox();
    const parentBox = await parentCard.boundingBox();

    if (!childBox || !parentBox) throw new Error('Could not get bounding box for drag source or target');

    await page.mouse.move(childBox!.x + childBox!.width / 2, childBox!.y + childBox!.height / 2);
    await page.mouse.down();
    await page.mouse.move(parentBox!.x + parentBox!.width / 2, parentBox!.y + parentBox!.height / 2, { steps: 20 });
    await page.mouse.up();

    // Verify the grouping was successful by checking the DOM structure
    const parentCardAfter = page.getByText('#00Deployment speed0CI/CD')
    const childCardAfter = parentCardAfter.getByRole('button', { name: 'CI/CD pipeline' });

    await expect(parentCardAfter).toBeVisible();
    await expect(childCardAfter).toBeVisible();
  });
});