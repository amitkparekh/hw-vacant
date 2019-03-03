import setCredentials from './setCredentials';
import setDay from './setDay';
import setWeek from './setWeek';

async function askQuestions() {
  const credentials = await setCredentials();
  const day: number = await setDay();

  let week: string;
  if (day === new Date().getDay()) {
    week = 't';
  } else {
    week = await setWeek();
  }

  const response = {
    username: credentials.username,
    password: credentials.password,
    day: day,
    week: week,
  };

  return response;
}

export default askQuestions;
