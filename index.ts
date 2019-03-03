import getParameters from './src/prompts';
import getTimetables from './src/pageInteraction';
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
  const params = await getParameters();
  await getTimetables(
    url,
    params.username,
    params.password,
    params.week,
    params.day,
    excludedRooms,
  );
}

run(url);
