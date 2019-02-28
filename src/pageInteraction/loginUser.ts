import { Page } from 'puppeteer';

/**
 * Login the user using credentials passed as arguments
 *
 * @param page
 * @param username Heriot-Watt username
 * @param password Password for heriot-watt account
 */
async function loginUser(page: Page, username: string, password) {
  // Get the element for the username, and type username
  const inputUser = await page.$('input#tUserName[type=text');
  await inputUser.type(username);

  // Get password input box and type
  const inputPass = await page.$('input#tPassword[type=password]');
  await inputPass.type(password);

  // Get submit button and click it
  const buttonLogin = await page.$('input#bLogin[type=submit]');
  await buttonLogin.click();

  // Wait for navigation to complete before returning promise
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
}

export default loginUser;
