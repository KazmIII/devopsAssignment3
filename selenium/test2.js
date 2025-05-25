const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Login Flow', function() {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('should display validation error when logging in with empty credentials', async () => {
    await driver.get(process.env.APP_URL || 'http://host.docker.internal:3000/login');
    await driver.findElement(By.css('button[type=submit]')).click();
    const err = await driver.wait(
      until.elementLocated(By.css('.error-message')), 
      5000
    );
    const text = await err.getText();
    assert.strictEqual(text, 'Email and password are required.');
  });
});
