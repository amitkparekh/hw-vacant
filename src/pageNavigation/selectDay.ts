import { Page } from 'puppeteer';

/**
 * Select the day to return the timetable for. If no day is given, check "today"
 *
 * @param page
 * @param day
 */
async function selectDay(page: Page, day: number = new Date().getDay() + 1) {
  console.log('Day:', day);
  const dayString = day.toString();

  await page.select('select#lbDays', dayString);
}

export default selectDay;
