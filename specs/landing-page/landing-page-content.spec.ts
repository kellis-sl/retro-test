// spec: specs/retrotool.plan.md
// seed: seed.spec.ts

import { test, expect } from '../../fixtures';

test.describe('Landing Page', () => {
  test('Landing page loads with correct content', async ({ landingPage }) => {
    // 1. Navigate to https://www.retrotool.app/
    await landingPage.goto();

    // Verify page title
    await expect(landingPage.page).toHaveTitle(
      'Retro tool | Simple and effective retrospectives for your team'
    );

    // Verify the main heading is visible
    await expect(landingPage.heading).toBeVisible();

    // 2. Verify the hero section is visible
    await expect(landingPage.startNewRetroLink).toBeVisible();
    await expect(landingPage.seeHowItWorksLink).toBeVisible();

    // Verify retro count text is visible
    await expect(landingPage.retroCount).toBeVisible();

    // 3. Scroll down to the features section
    await expect(landingPage.easyPeasyHeading).toBeVisible();
    await expect(landingPage.anonymousHeading).toBeVisible();
    await expect(landingPage.realTimeHeading).toBeVisible();
    await expect(landingPage.noLoginHeading).toBeVisible();

    // 4. Scroll to the 'How to use Retro tool' section
    await expect(landingPage.howToUseHeading).toBeVisible();

    // Verify workflow sub-headings are present
    await expect(landingPage.brainstormHeading).toBeVisible();
    await expect(landingPage.groupVoteHeading).toBeVisible();
    await expect(landingPage.addActionItemsHeading).toBeVisible();
    await expect(landingPage.doneHeading).toBeVisible();

    // 5. Check the footer contains creator credits with links to their social profiles
    await expect(landingPage.unaiLink).toBeVisible();
    await expect(landingPage.marcioLink).toBeVisible();
    await expect(landingPage.andrzejLink).toBeVisible();
    await expect(landingPage.christianLink).toBeVisible();
    await expect(landingPage.rudeLink).toBeVisible();
  });
});
