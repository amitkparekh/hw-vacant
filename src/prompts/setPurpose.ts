import { prompt } from 'prompts';

async function setPurpose() {
  const global_exclusion = [
    'estates',
    'hp studio',
    'stirling university',
    'chem',
    'library',
    'jng61-node1',
    'jng61-node2',
    'quiet study',
    'moyen',
    'locked',
    'study area',
    'elsewhere',
    'sports academy',
    'robotarium',
    'pg top floor',
    'gh heriot meeting room',
    'hncrush',
    'wacrush',
    'jncrush',
    'jwcrush',
    'crush',
    'workshop',
    '3d printing',
    'testing',
    'prototyping',
    'rotating house',
    'engine cell',
    'engineering',
    'wet',
    'services',
    'acoustics',
    'group study',
    'bloomberg',
    'trading',
    'metrology',
    'high',
    'esso',
    'geo',
    'airflow',
    'languages interpreting',
    'lb1',
    'language',
    'mmedia',
    'formula',
    'dynamics',
    'wind tunnel',
    'eng',
    'proj.',
    'chevron',
    'hydraulics',
    'biological sciences',
    'physics',
    'design studio',
    'light structures',
    'ee machines',
    'events',
    'linux',
    'resource centre',
    'foyer',
    'hn2',
    'hpg08',
    'lbg01',
    'tp',
    'office',
    'ebs room',
  ];

  const excluded_computers = ['lab', 'computer', 'laboratory'];

  const questions = [
    {
      type: 'select',
      name: 'purpose',
      message: 'What for?',
      initial: 0,
      choices: [{ title: 'Classroom', value: 0 }, { title: 'Computer room', value: 1 }],
    },
  ];

  const response = await prompt(questions);

  let excluded_rooms = [];

  switch (response.purpose) {
    case 0:
    default:
      excluded_rooms = global_exclusion.concat(excluded_computers);
      break;
  }

  return excluded_rooms;
}

export default setPurpose;
