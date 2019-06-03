import { AppPage } from './app.po';
import { browser, logging, by, element, $$ } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  // it('should display welcome message', () => {
  //   page.navigateTo();
  //   expect(page.getTitleText()).toEqual('Welcome to lauritz!');
  // });

  it('should verify that login link routes to the login component', () => {
    browser.get('/');
    element(by.id('btnLogin')).click();
    let loginText = element(by.id('loginTitle')).getText();
    expect(loginText).toEqual('Login');
  });

  it('should verify that logging in takes the user to the display auctions page', () => {

    browser.get('/home/login');
    
    page.getByFormControlName('username').sendKeys('whatever');

    page.getByFormControlName('password').sendKeys('whateverPassword');

    element(by.id('btnUserlogin')).click();

    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+'/portal/display-auctions');
    
  });

  it('should create a new product', () => {
    /// Go to display-auctions. Count number of auctions.
    // Go to create-auction. Fill out fields to create an auction.
    // Go to display-auctions. Count number of auctions
    // Verify that we now have on more product.
    browser.get('/portal/display-auctions');
    // element(by.css(''))
    // $$('')
    $$('.example-card').then( (elementsBeforeAdding) => {
      let noOfElemsBefore = elementsBeforeAdding.length;
      element(by.id('btnNewAuction')).click();
      page.getByFormControlName('name').sendKeys('Lipstick');
      page.getByFormControlName('description').sendKeys('It is a great lipstick');
      page.getByFormControlName('startingPrice').sendKeys('50');
      page.getByFormControlName('minimumBid').sendKeys('10');
      page.getByFormControlName('endDate').sendKeys('2019-01-02');
      page.getByFormControlName('location').sendKeys('Copenhagen');

      element(by.id('btnCreateAuction')).click();

      $$('.example-card').then((elementsAfterAdding) => {
        expect(elementsAfterAdding.length - noOfElemsBefore).toEqual(1);
      })

    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
