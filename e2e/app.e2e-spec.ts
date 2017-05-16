import { ProjectAskingHomePage } from './app.po';

describe('project-asking App', () => {
  let page: ProjectAskingHomePage;

  beforeEach(() => {
    page = new ProjectAskingHomePage();
  });

  it('should have a heading of featured', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Featured Content');
  });
});
