import { type Page, type Locator } from '@playwright/test';

export class LandingPage {
  readonly page: Page;

  // Hero
  readonly heading: Locator;
  readonly startNewRetroLink: Locator;
  readonly seeHowItWorksLink: Locator;
  readonly retroCount: Locator;

  // Feature cards
  readonly easyPeasyHeading: Locator;
  readonly anonymousHeading: Locator;
  readonly realTimeHeading: Locator;
  readonly noLoginHeading: Locator;

  // How to use section
  readonly howToUseHeading: Locator;
  readonly brainstormHeading: Locator;
  readonly groupVoteHeading: Locator;
  readonly addActionItemsHeading: Locator;
  readonly doneHeading: Locator;

  // Footer
  readonly unaiLink: Locator;
  readonly marcioLink: Locator;
  readonly andrzejLink: Locator;
  readonly christianLink: Locator;
  readonly rudeLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole('heading', { name: 'Retro tool, simple and' });
    this.startNewRetroLink = page.getByRole('link', { name: 'Start a new retro' });
    this.seeHowItWorksLink = page.getByRole('link', { name: 'See how it works' });
    this.retroCount = page.getByText('retros and counting');

    this.easyPeasyHeading = page.getByRole('heading', { name: 'Easy peasy' });
    this.anonymousHeading = page.getByRole('heading', { name: 'Anonymous' });
    this.realTimeHeading = page.getByRole('heading', { name: 'Real time' });
    this.noLoginHeading = page.getByRole('heading', { name: 'No login & private' });

    this.howToUseHeading = page.getByRole('heading', { name: 'How to use Retro tool' });
    this.brainstormHeading = page.getByRole('heading', { name: 'Brainstorm' });
    this.groupVoteHeading = page.getByRole('heading', { name: 'Group & vote' });
    this.addActionItemsHeading = page.getByRole('heading', { name: 'Add action items' });
    this.doneHeading = page.getByRole('heading', { name: 'Done' });

    this.unaiLink = page.getByRole('link', { name: 'Unai Esteibar' });
    this.marcioLink = page.getByRole('link', { name: 'Marcio Barrios' });
    this.andrzejLink = page.getByRole('link', { name: 'Andrzej Trzaska' });
    this.christianLink = page.getByRole('link', { name: 'Christian Siles' });
    this.rudeLink = page.getByRole('link', { name: 'Rude Ayelo' });
  }

  async goto() {
    await this.page.goto('https://www.retrotool.app/');
  }
}
