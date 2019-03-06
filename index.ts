import getParameters from './src/prompts';
import getTimetables from './src/pageInteractions';
/**
 * An array which contains strings.
 *
 * If any one of the strings appears in the list of rooms, it is removed from the selection.
 */
const url: string = 'https://timetable.hw.ac.uk/WebTimetables/LiveED/Login.aspx';

async function run(url: string) {
  const params = await getParameters();
  await getTimetables(
    url,
    params.username,
    params.password,
    params.week,
    params.day,
    params.roomsFilter,
  );
}

run(url);
