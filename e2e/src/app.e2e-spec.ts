import { AppPage } from './app.po';
import { browser, logging, by, element, $$ } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

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

    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/portal/display-auctions');

  });

  it('should create a new product', () => {
    //browser.get('/portal/display-auctions');
    element(by.id('display-auctions')).click();
    // element(by.css(''))
    // $$('')
    $$('.example-card').then((elementsBeforeAdding) => {
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

  it('should submit a bid', async () => {
    // Navigate to display-auctions
    element(by.id('display-auctions')).click();

    // Click on first product
    $$('.example-card').first().click();

    // Save bid count
    let bidCount: number = await $$('.bidCount').getText().then((text) => { return parseInt(text) });
    // Submit bid
    $$('#btnSubmitBid').click();
    // Sleep for response
    browser.sleep(2000);
    // Save new count
    let newCount: number = await $$('.bidCount').getText().then((text) => { return parseInt(text) });

    // Verify bid count to have increased by 1
    expect(newCount - bidCount).toEqual(1);
  });

  it('should delete a product', async () => {
    // Log in as regular user
    browser.get('/home/login');
    page.getByFormControlName('username').sendKeys('whatever');
    page.getByFormControlName('password').sendKeys('whateverPassword');
    element(by.id('btnUserlogin')).click();

    browser.sleep(3000);

    element(by.id('display-auctions')).click();

    // Count products
    let noOfElemsBefore: number = await $$('.example-card').then((elementsBeforeAdding) => { return elementsBeforeAdding.length })

    // Enter product details
    $$('.example-card').first().click();
    //$$('.mat-button').first().click();
    browser.sleep(1000);
    element.all(by.className('btn-delete')).then(function (items) {
      // Assert that delete button is not visible
      expect(items.length).toBe(0);
    });

    // Log out
    element(by.id('btnLogout')).click();
    // Log in as admin
    browser.get('/home/login');
    page.getByFormControlName('username').sendKeys('admin');
    page.getByFormControlName('password').sendKeys('whateverPassword');
    element(by.id('btnUserlogin')).click();
    browser.sleep(3000);

    // Navigate to product details
    element(by.id('display-auctions')).click();
    
    // Click on product
    $$('.example-card').first().click();
    browser.sleep(1000);

    // Verify delete button
    element.all(by.className('btnDelete')).then(function (items) {
      // Assert that delete button is not visible
      expect(items.length).toBe(1);
    });

    // Click delete button
    $$('.btnDelete').click();

    browser.sleep(3000);

    // Verify amount of products is 1 less
    $$('.example-card').then((elementsAfterDeleting) => {
      expect(elementsAfterDeleting.length - noOfElemsBefore).toEqual(-1);
    })

  });

})

afterEach(async () => {
  // Assert that there are no errors emitted from the browser
  const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  expect(logs).not.toContain(jasmine.objectContaining({
    level: logging.Level.SEVERE,
  } as logging.Entry));
});
});
