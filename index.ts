import { launch, Page } from 'puppeteer';
import setCredentials from './src/prompts/setCredentials';
import setDay from './src/prompts/setDay';
import setWeek from './src/prompts/setWeek';
import loginUser from './src/pageInteraction/loginUser';
import gotoRoomSelection from './src/pageInteraction/gotoRoomSelection';
import selectRooms from './src/pageInteraction/selectRooms';
import selectWeek from './src/pageInteraction/selectWeek';
import selectDay from './src/pageInteraction/selectDay';
import selectView from './src/pageInteraction/selectView';
import viewTimetable from './src/pageInteraction/viewTimetable';
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
  // Ask the questions at the start
  const credentials = await setCredentials();
  const day: number = await setDay();
  let week: string = '';

  if (day === new Date().getDay()) {
    week = 't';
  } else {
    week = await setWeek();
  }

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

  await loginUser(page, credentials.username, credentials.password);
  await gotoRoomSelection(page);

  await selectRooms(page, excludedRooms);
  await selectWeek(page, week);

  // View the timetable on a specific day of the week
  await selectDay(page, day);

  // View the timetable as a list, instead of the default grid view
  await selectView(page, 'list');

  await viewTimetable(page);
}

run(url);
