import { ProjectAskingClientPage } from './app.po';

describe('project-asking-client App', () => {
  let page: ProjectAskingClientPage;

  beforeEach(() => {
    page = new ProjectAskingClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
