import { prompt } from 'prompts';

async function setDay() {
  const questions = [
    {
      type: 'select',
      name: 'day',
      message: 'What day?',
      initial: 0,
      choices: [
        { title: 'Today', value: new Date().getDay() },
        { title: 'Monday', value: 1 },
        { title: 'Tuesday', value: 2 },
        { title: 'Wednesday', value: 3 },
        { title: 'Thursday', value: 4 },
        { title: 'Friday', value: 5 },
        { title: 'Saturday', value: 6 },
        { title: 'Sunday', value: 7 },
      ],
    },
  ];

  const response = await prompt(questions);

  return response.day;
}

export default setDay;
