const { Builder, By, Key, until } = require("selenium-webdriver");

const LOCATORS = {
  XPATH: "xpath",
  NAME: "name",
  ID: "id",
};

class Browser {
  constructor(browserType = "chrome") {
    this.driver = new Builder().forBrowser(browserType).build();
    this.driver.manage().window().maximize();
  }

  async openUrl(url) {
    await this.driver.get(url);
  }

  getDriver() {
    return this.driver;
  }
  getElement(type, locator) {
    // locator: xpath | name | id
    try {
      let element;
      switch (type) {
        case LOCATORS.XPATH:
          element = this.driver.findElement(By.xpath(locator));
          break;
        case LOCATORS.ID:
          element = this.driver.findElement(By.id(locator));
          break;
        case LOCATORS.NAME:
          element = this.driver.findElement(By.name(locator));
          break;

        default:
          element = null;
      }

      return element;
    } catch (err) {
      throw new Error(`Element ${locator} has not been found`);
    }
  }
  async enterText(element, text, isClear = false) {
    isClear && (await element.clear()); // if true then clear the input field

    await element.sendKeys(text);
  }

  async clickElement(element) {
    await element.click();
  }
  async quitDriver() {
    await this.driver.quit();
  }

  async getAttributeData(element, att) {
    return await element.getAttribute(att); // Need to get any attribute of an element
  }
}

module.exports = { Browser, LOCATORS };
