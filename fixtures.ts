import { test as base } from '@playwright/test';
import type { Page } from '@playwright/test';
import * as RetroApi from './pages/RetroApi';
import { LandingPage } from './pages/LandingPage';
import { RetroBoard } from './pages/RetroBoard';

type BoundFn<T extends (page: Page, ...args: never[]) => unknown> =
  T extends (page: Page, ...args: infer A) => infer R
    ? (...args: A) => R
    : never;

type RetroApiFixture = {
  createWorksItem: BoundFn<typeof RetroApi.createWorksItem>;
  createImproveItem: BoundFn<typeof RetroApi.createImproveItem>;
  createOtherItem: BoundFn<typeof RetroApi.createOtherItem>;
  createActionItem: BoundFn<typeof RetroApi.createActionItem>;
  removeItem: BoundFn<typeof RetroApi.removeItem>;
  combineItems: BoundFn<typeof RetroApi.combineItems>;
  addVote: BoundFn<typeof RetroApi.addVote>;
  transitionToReviewStep: BoundFn<typeof RetroApi.transitionToReviewStep>;
  transitionToActionsStep: BoundFn<typeof RetroApi.transitionToActionsStep>;
  transitionToFinalStep: BoundFn<typeof RetroApi.transitionToFinalStep>;
  updateRetro: BoundFn<typeof RetroApi.updateRetro>;
  toggleCompleted: BoundFn<typeof RetroApi.toggleCompleted>;
  detachItem: BoundFn<typeof RetroApi.detachItem>;
};

export const test = base.extend<{
  landingPage: LandingPage;
  retroBoard: RetroBoard;
  retroApi: RetroApiFixture;
}>({
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },
  retroBoard: async ({ page }, use) => {
    await use(new RetroBoard(page));
  },
  retroApi: async ({ page }, use) => {
    await use({
      createWorksItem: (...args) => RetroApi.createWorksItem(page, ...args),
      createImproveItem: (...args) => RetroApi.createImproveItem(page, ...args),
      createOtherItem: (...args) => RetroApi.createOtherItem(page, ...args),
      createActionItem: (...args) => RetroApi.createActionItem(page, ...args),
      removeItem: (...args) => RetroApi.removeItem(page, ...args),
      combineItems: (...args) => RetroApi.combineItems(page, ...args),
      addVote: (...args) => RetroApi.addVote(page, ...args),
      transitionToReviewStep: (...args) => RetroApi.transitionToReviewStep(page, ...args),
      transitionToActionsStep: (...args) => RetroApi.transitionToActionsStep(page, ...args),
      transitionToFinalStep: (...args) => RetroApi.transitionToFinalStep(page, ...args),
      updateRetro: (...args) => RetroApi.updateRetro(page, ...args),
      toggleCompleted: (...args) => RetroApi.toggleCompleted(page, ...args),
      detachItem: (...args) => RetroApi.detachItem(page, ...args),
    });
  },
});

export { expect } from '@playwright/test';
