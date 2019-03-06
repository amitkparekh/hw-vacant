import { prompt } from 'prompts';

const convertArrayToRegExp = async (arr: string[]) => {
  return new RegExp(arr.join('|'), 'gi');
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

  let filters: string[] = ['^locked'];

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
        'Tables & Chairs',
        'Fixed Seating',
        'ffixed seating',
        'in rows',
      ]);
  }

  const regExpFilters = await convertArrayToRegExp(filters);

  return regExpFilters;
};

export default setRooms;
