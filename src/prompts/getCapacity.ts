import { prompt } from 'prompts';

async function getCapacity() {
  const questions = [
    {
      type: 'number',
      name: 'capacity',
      message: 'How many people?',
    },
  ];

  return await prompt(questions);
}

export default getCapacity;
