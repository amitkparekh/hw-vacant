import setCredentials from './setCredentials';
import setDay from './setDay';
import setWeek from './setWeek';
import setPurpose from './setPurpose';

async function askQuestions() {
  const credentials = await setCredentials();
  const day: number = await setDay();

  let week: string;
  if (day === new Date().getDay()) {
    week = 't';
  } else {
    week = await setWeek();
  }

  const excludedRooms: string[] = await setPurpose();

  const response = {
    username: credentials.username,
    password: credentials.password,
    day: day,
    week: week,
    excludedRooms: excludedRooms,
  };

  return response;
}

export default askQuestions;
