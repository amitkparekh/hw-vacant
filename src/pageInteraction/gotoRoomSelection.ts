import { Page } from 'puppeteer';
/**
 * Go to the room selection page
 *
 * @param page
 */
async function gotoRoomSelection(page: Page) {
  const nav_roomButton = await page.$('a#LinkBtn_locations');
  await nav_roomButton.click();
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
}

export default gotoRoomSelection;
