import { prompt } from 'prompts';

async function getCredentials() {
  const questions = [
    {
      type: 'text',
      name: 'username',
      message: 'HW username',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter password',
    },
  ];

  return await prompt(questions);
}

export default getCredentials;
