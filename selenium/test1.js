const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Home Page', function() {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('should load and show correct title', async () => {
    await driver.get(process.env.APP_URL || 'http://host.docker.internal:3000');
    await driver.wait(until.titleContains('My MERN App'), 10000);
    const title = await driver.getTitle();
    assert.ok(title.includes('My MERN App'));
  });
});
