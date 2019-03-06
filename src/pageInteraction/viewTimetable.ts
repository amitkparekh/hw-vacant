import { Page } from 'puppeteer';

async function viewTimetable(page: Page) {
  const button = await page.$('input#bGetTimetable[type=submit]');
  await button.click();
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
}

export default viewTimetable;
