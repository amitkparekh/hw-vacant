import { Page } from 'puppeteer';

async function selectWeek(page: Page) {
  await page.select('select#lbWeeks', 't');
}

export default selectWeek;
