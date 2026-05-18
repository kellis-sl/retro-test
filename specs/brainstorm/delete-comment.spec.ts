import { test, expect } from '../../fixtures';
import { v4 as uuidv4 } from 'uuid';

test('can delete a comment in the Brainstorm phase', async ({ page, retroBoard }) => {
  const slug = uuidv4();
  await retroBoard.gotoNamed(slug);

  await retroBoard.addComment('workedWell', 'Comment to delete');

  await expect(page.getByText('Comment to delete')).toBeVisible({ timeout: 10000 });

  const commentCard = page.locator('[class*="Item__ItemContainer-"]').filter({ hasText: 'Comment to delete' });
  await commentCard.hover();
  await page.waitForTimeout(2000); // Wait for the delete button to appear
  await commentCard.locator('[class*="Item__DeleteItemButton-"] button').click();
  await expect(page.getByText('Comment to delete')).not.toBeVisible({ timeout: 5000 });
});
