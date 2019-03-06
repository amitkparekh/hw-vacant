import { Page } from 'puppeteer';

/**
 * Press the button to view the timetable, then wait until it finished navigating
 * because it can take a while sometimes
 *
 * @param page
 */
async function viewTimetable(page: Page) {
  const button = await page.$('input#bGetTimetable[type=submit]');
  await button.click();
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
}

export default viewTimetable;
