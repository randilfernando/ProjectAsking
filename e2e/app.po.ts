import { browser, element, by } from 'protractor';

export class ProjectAskingHomePage {
  navigateTo() {
    return browser.get('/login');
  }

  getTitleText() {
    return element(by.id('#title')).getText();
  }
}
