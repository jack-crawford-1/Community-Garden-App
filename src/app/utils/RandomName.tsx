export function generateRandomName() {
  const firstNames = [
    'Liam',
    'Emma',
    'Noah',
    'Olivia',
    'Oliver',
    'Ava',
    'Elijah',
    'Sophia',
    'James',
    'Isabella',
    'William',
    'Mia',
    'Benjamin',
    'Charlotte',
    'Lucas',
    'Amelia',
    'Henry',
    'Harper',
    'Alexander',
    'Evelyn',
  ];

  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
    'Hernandez',
    'Lopez',
    'Gonzalez',
    'Wilson',
    'Anderson',
    'Thomas',
    'Taylor',
    'Moore',
    'Jackson',
    'Martin',
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${firstName} ${lastName}`;
}
