import { Page } from 'puppeteer';

async function viewTimetable(page: Page) {
  const button = await page.$('input#bGetTimetable[type=submit]');
  await button.click();
}

export default viewTimetable;
