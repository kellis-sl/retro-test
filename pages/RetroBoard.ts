import { type Page, type Locator } from '@playwright/test';

type BrainstormColumn = 'workedWell' | 'improve' | 'questions';

export class RetroBoard {
  readonly page: Page;

  // Column inputs
  readonly workedWellInput: Locator;
  readonly improveInput: Locator;
  readonly questionsInput: Locator;
  readonly actionItemsInput: Locator;

  // Header controls
  readonly lockIcon: Locator;
  readonly infoIcon: Locator;
  readonly exportButton: Locator;
  readonly startNewRetroButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.workedWellInput = page.getByRole('textbox', { name: 'It worked well that...' });
    this.improveInput = page.getByRole('textbox', { name: 'We could improve...' });
    this.questionsInput = page.getByRole('textbox', { name: 'I want to ask about...' });
    this.actionItemsInput = page.getByRole('textbox', { name: 'We need to do...' });

    this.lockIcon = page.getByRole('img', { name: /Retro (not )?protected by password/ });
    this.infoIcon = page.getByRole('img', { name: 'More info about Retro tool' });
    this.exportButton = page.getByRole('button', { name: 'Export' });
    this.startNewRetroButton = page.getByRole('button', { name: 'Start new retro' });
  }

  async goto() {
    await this.page.goto('https://www.retrotool.app/new');
  }

  async gotoNamed(name: string) {
    // Wait for the GQL response that contains retro data (not just currentUser),
    // since the retro is created server-side and the app makes multiple GQL calls on load.
    await Promise.all([
      this.page.waitForResponse(async (resp) => {
        if (!resp.url().includes('/api/graph') || resp.status() !== 200) return false;
        const body = await resp.text();
        return body.includes('"retro"');
      }),
      this.page.goto(`https://www.retrotool.app/${name}`),
    ]);
  }

  async addComment(column: BrainstormColumn, text: string) {
    const inputMap: Record<BrainstormColumn, Locator> = {
      workedWell: this.workedWellInput,
      improve: this.improveInput,
      questions: this.questionsInput,
    };
    const input = inputMap[column];
    await input.click();
    await input.pressSequentially(text);
    await input.press('Enter');
    await this.page.reload(); // Ensure the new comment is visible after adding
  }

  async addActionItem(text: string) {
    await this.actionItemsInput.pressSequentially(text);
    await this.actionItemsInput.press('Enter');
  }

  async advanceToGroupAndVote() {
    await this.page.getByRole('button', { name: 'Group & vote comments' }).click();
    await this.page.locator('reach-portal').getByText('Group & vote comments').click();
  }

  async advanceToActionItems() {
    await this.page.getByRole('button', { name: 'Discuss and add action items' }).click();
  }

  async finishRetro() {
    await this.page.getByRole('button', { name: 'Finish retro' }).click();
  }

  async setPassword(password: string) {
    await this.lockIcon.click();
    await this.page.getByPlaceholder('Write password...').fill(password);
    await this.page.getByText('Set Password').click();
  }
}
