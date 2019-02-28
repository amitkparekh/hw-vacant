import { prompt } from 'prompts';

async function setWeek() {
  const questions = [
    {
      type: 'select',
      name: 'week',
      message: 'What week?',
      initial: 0,
      choices: [
        { title: 'This week', value: 't' },
        { title: 'Next week', value: 'n' },
        { title: 'Last week', value: 'p' },
        { title: 'Semester 1', value: '1;2;3;4;5;6;7;8;9;10;11;12' },
        { title: 'Semester 2', value: '18;19;20;21;22;23;24;25;26;27;28;29' },
      ],
    },
  ];

  const response = await prompt(questions);

  return response.week;
}

export default setWeek;
