import { Page } from 'puppeteer';

async function selectMinimumCapacity(page: Page) {
  await page.select('select#dlFilter', '010');
}

export default selectMinimumCapacity;
