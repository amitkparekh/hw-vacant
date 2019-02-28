import { Page } from 'puppeteer';

async function selectWeek(page: Page, week: string) {
  await page.select('select#lbWeeks', week);
}

export default selectWeek;
