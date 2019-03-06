import setCredentials from './setCredentials';
import setDay from './setDay';
import setWeek from './setWeek';
import setPurpose from './setPurpose';

async function prompts() {
  const credentials = await setCredentials();
  const day: number = await setDay();

  let week: string;
  if (day === new Date().getDay()) {
    week = 't';
  } else {
    week = await setWeek();
  }

  const filters: RegExp = await setPurpose(['JW2', 'MBG45']);

  const response = {
    username: credentials.username,
    password: credentials.password,
    day: day,
    week: week,
    roomsFilter: filters,
  };

  return response;
}

export default prompts;
