import { PresentationRpAcPage } from './app.po';

describe('presentation-rp-ac App', () => {
  let page: PresentationRpAcPage;

  beforeEach(() => {
    page = new PresentationRpAcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
