import { prompt } from 'prompts';

/**
 * Get the username and password and return them
 */
async function setCredentials() {
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

export default setCredentials;
