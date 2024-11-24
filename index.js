const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const searchTerms = [
  'sustainable energy innovations',
  'cutting-edge medical breakthroughs',
  'space technology advancements',
  'mental health awareness',
  'emerging programming languages 2024',
  'climate action initiatives',
  'future of artificial intelligence',
  'green building technologies',
  'global financial trends',
  'world heritage conservation'
]; // Add your words here


(async function() {
  // Set the path to your Chrome user data
  const userDataDir = 'C:/Users/MUDASSAR/AppData/Local/Google/Chrome/User Data'; // Update this path

  // Set Chrome options
  let options = new chrome.Options();
  options.addArguments(`--user-data-dir=${userDataDir}`);  // Use the existing user data directory
  options.addArguments('--profile-directory=Default');  // Use the Default profile (or another one)

  // Initialize WebDriver with Chrome options
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    for (const term of searchTerms) {
      console.log(`Searching for: ${term}`);

      // Navigate to Bing
      await driver.get('https://www.bing.com');

      // Perform a search on Bing
      let searchBox = await driver.findElement(By.name('q')); // Find the search box
      await searchBox.sendKeys(term); // Type the search query
      await searchBox.submit(); // Submit the search form

      // Wait for search results to load
      await driver.wait(until.elementLocated(By.css('.b_algo a')), 10000); // Wait for the first result link

      // Open the first result
      let firstResult = await driver.findElement(By.css('.b_algo a'));
      let link = await firstResult.getAttribute('href'); // Get the href of the first result
      console.log(`Opening link: ${link}`);
      await driver.get(link); // Navigate to the first result

      // Wait for 3 seconds on the page
      await driver.sleep(3000);

      // Go back to Bing for the next search
    }

    console.log('All searches completed.');
  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the browser after the task is done
    // await driver.quit();
  }
})();
