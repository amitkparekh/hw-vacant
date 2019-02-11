import { launch } from 'puppeteer';
import getCredentials from './src/prompts/getCredentials';
import loginUser from './src/pageNavigation/loginUser';
import gotoRoomSelection from './src/pageNavigation/gotoRoomSelection';
import selectRooms from './src/pageNavigation/selectRooms';
import selectWeek from './src/pageNavigation/selectWeek';
import selectDay from './src/pageNavigation/selectDay';
import viewTimetable from './src/pageNavigation/viewTimetable';
/**
 * An array which contains strings.
 *
 * If any one of the strings appears in the list of rooms, it is removed from the selection.
 */
const excludedRooms = [
  'laboratory',
  'lab',
  'hp studio',
  'stirling university',
  'library',
  'crush',
  'jncrush',
  'wacrush',
  'gh heriot meeting room',
  'pg top floor',
  'elsewhere',
  'sports academy',
  'study area',
  'locked',
  'quiet study',
  'office',
  'robotarium',
  'HP',
  'jng59b',
  'wind tunnel',
  'lb1',
  'moyen house',
  'tom patton',
  'computer',
  'hn',
  'em223',
  'workshop',
  'bloomberg',
  'ebs',
  'ssc',
  'engine cell',
  'rotating house',
  '3d printing',
  'project',
  'jng61-node1',
  'jng61-node2',
  'resource',
  'foyer',
  'pg learning commons',
];

const url: string = 'https://timetable.hw.ac.uk/WebTimetables/LiveED/Login.aspx';

async function run(url: string) {
  // Open a new browser
  const browser = await launch({
    headless: false,
  });

  // Create a new page
  const page = await browser.newPage();

  // Set the width and height of the viewport of the page to avoid
  // rescaling issues as I don't trust the developers
  await page.setViewport({ width: 1440, height: 1080 });

  // Go to the page to book the room and DO NOT continue until there
  // are at least 2 idle network connections. This makes sure everything
  // is loaded before continuing
  await page.goto(url, { waitUntil: 'networkidle2' });

  let credentials = await getCredentials();
  await loginUser(page, credentials.username, credentials.password);
  await gotoRoomSelection(page);

  await selectRooms(page, excludedRooms);
  await selectWeek(page);
  await selectDay(page);

  await viewTimetable(page);
}

run(url);
