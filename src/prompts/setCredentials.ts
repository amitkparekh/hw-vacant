import { prompt } from 'prompts';
require('dotenv').config();

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

  let response = { username: '', password: '' };

  if (process.env.HW_USER != null && process.env.HW_PASS != null) {
    console.log('');
    console.log('Connecting with:', process.env.HW_USER);
    response = {
      username: process.env.HW_USER,
      password: process.env.HW_PASS,
    };
  } else {
    response = await prompt(questions);
  }

  return response;
}

export default setCredentials;
