import { launch, Page } from 'puppeteer';

import loginUser from './loginUser';
import gotoRoomSelection from './gotoRoomSelection';
import selectRooms from './selectRooms';
import selectWeek from './selectWeek';
import selectDay from './selectDay';
import selectView from './selectView';
import viewTimetable from './viewTimetable';
import reduceTimetable from './reduceTimetable';

async function getDetails(
  url: string,
  username: string,
  password: string,
  week: string,
  day: number,
  excludedRooms: string[],
) {
  // Open a new browser
  const browser = await launch({
    headless: false,
  });

  // Create a new page
  const page: Page = await browser.newPage();

  // Set the width and height of the viewport of the page to avoid
  // rescaling issues as I don't trust the developers
  await page.setViewport({ width: 1440, height: 1080 });

  // Go to the page to book the room and DO NOT continue until there
  // are at least 2 idle network connections. This makes sure everything
  // is loaded before continuing
  await page.goto(url, { waitUntil: 'networkidle2' });

  await loginUser(page, username, password);
  await gotoRoomSelection(page);

  await selectRooms(page, excludedRooms);
  await selectWeek(page, week);

  // View the timetable on a specific day of the week
  await selectDay(page, day);

  // View the timetable as a list, instead of the default grid view
  await selectView(page, 'list');

  await viewTimetable(page);

  await reduceTimetable(page);
}

export default getDetails;
