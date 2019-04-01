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

  it('should verify that login link routes to the login component', async () => {
    await browser.get('/');
    await element(by.id('btnLogin')).click();
    let loginText = element(by.id('loginTitle')).getText();
    await expect(loginText).toEqual('Login');
  });

  it('should test ...', async () => {
    // write test no. 2.
    await browser.get('/home/login');

    await page.getByFormControlName('username').sendKeys('whatever');
    // browser.sleep(1000);
    await page.getByFormControlName('password').sendKeys('whateverPassword'); // nice alternative where no id is needed.
    // browser.sleep(1000);
    await element(by.id('btnUserlogin')).click();
    // browser.sleep(1000);
    await expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/portal/display-auctions');
    // browser.sleep(1000);


  });

  /*it('should create a new product', () => {
    browser.get('/portal/display-auctions');
    // Count number of auctions
    $$('.example-card').then(function (list) {
      let productCount = list.length;
      // Go to create auction
      browser.get('/portal/create-auction');
      // Fill out fields
      page.getByFormControlName('name').sendKeys('name ipsum');
      page.getByFormControlName('description').sendKeys('description lorem ipsum');
      page.getByFormControlName('startingPrice').sendKeys('100');
      page.getByFormControlName('minimumBid').sendKeys('10');
      page.getByFormControlName('endDate').sendKeys('3/21/2019');
      page.getByFormControlName('location').sendKeys('Loremville');
      element(by.id('btnCreateProduct')).click();
      // Go to display
      element(by.css('[routerLink="/portal/display-auctions"]')).click();
      // Count number of auctions
      $$('.example-card').then(function (newList) {
        let newCount = newList.length
        // Verify that number is 1 larger
        let expectedCount = productCount + 1;
        expect(newCount).toEqual(expectedCount)
      })
    })
  });*/

  it('should create a new product', async () => {
    await browser.get('/portal/display-auctions');
    // Count number of auctions
    let list = await $$('.example-card');
    let productCount = list.length;
    // Go to create auction
    await browser.get('/portal/create-auction');
    // Fill out fields
    await page.getByFormControlName('name').sendKeys('name ipsum');
    await page.getByFormControlName('description').sendKeys('description lorem ipsum');
    await page.getByFormControlName('startingPrice').sendKeys('100');
    await page.getByFormControlName('minimumBid').sendKeys('10');
    await page.getByFormControlName('endDate').sendKeys('3/21/2019');
    await page.getByFormControlName('location').sendKeys('Loremville');
    await element(by.id('btnCreateProduct')).click();
    // Go to display
    await element(by.css('[routerLink="/portal/display-auctions"]')).click();
    // Count number of auctions
    let newList = await $$('.example-card');
    let newCount = newList.length
    // Verify that number is 1 larger
    let expectedCount = productCount + 1;
    await expect(newCount).toEqual(expectedCount)
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
