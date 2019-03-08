import { prompt } from 'prompts';

const convertArrayToRegExp = async (arr: string[]) => {
  return new RegExp(arr.join('|'), 'im');
};

const setRooms = async (preferred_rooms: string[]) => {
  const questions = [
    {
      type: 'select',
      name: 'purpose',
      message: 'What for?',
      initial: 0,
      choices: [
        { title: 'Dresser work', value: 'dresser' },
        { title: 'Classroom', value: 'classroom' },
        { title: 'Computer lab', value: 'computers' },
      ],
    },
  ];

  const response = await prompt(questions);

  let filters: string[] = [
    '^locked',
    '^hn registry services resource',
    '^lb1',
    '^lb108',
  ];

  switch (response.purpose) {
    case 'dresser':
      filters = filters.concat(preferred_rooms);
      break;
    case 'computers':
      filters = filters.concat(['Computer Lab']);
      break;
    case 'classroom':
    default:
      filters = filters.concat([
        'tables &amp; chairs',
        'fixed seating',
        'ffixed seating',
        'in rows',
      ]);
  }

  return await convertArrayToRegExp(filters);
};

export default setRooms;
