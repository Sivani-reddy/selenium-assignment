const { Browser, LOCATORS } = require("./lib/browser");
const FileSystem = require("./lib/file-system");
const path = require("path");
const { wait } = require("./lib/wait");
const config = require("./lib/config");

(async () => {
  let browser;
  try {
    browser = new Browser();
    const fileSystem = new FileSystem(
      path.join(process.cwd(), config.inputDataPath)
    );
    const inputData = await fileSystem.readFile();

    browser.openUrl(config.URL);

    browser.clickElement(
      browser.getElement(LOCATORS.XPATH, "//summary[text()='Table Data']")
    );

    const inputElement = browser.getElement(LOCATORS.ID, "jsondata");

    // Entering the input data into the text field:
    // Providing true as last param in order to clear the input field first
    browser.enterText(inputElement, inputData, true);

    await wait(3000);

    browser.clickElement(
      browser.getElement(LOCATORS.XPATH, "//button[text()='Refresh Table']")
    );

    // Giving an wait for the element to appear
    await wait(3000);

    // Fetching the data from the input field in order to compare with the stored data
    const fetchedData = await browser.getAttributeData(inputElement, "value");

    if (inputData === fetchedData) console.log("Data matched");
    else console.log("Data did not match");
  } catch (err) {
  } finally {
    await browser.quitDriver();
  }
})();
