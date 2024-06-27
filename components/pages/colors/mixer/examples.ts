import { ColorExample } from './types';

const colorsExamples: Record<string, ColorExample[]> = {
  red: [
    {
      name: 'Deep Carmine',
      color: '#b32340',
      red: 9,
      yellow: 0,
      blue: 1,
      grey: 5,
      white: 0,
      black: 3
    },
    {
      name: 'Jazzberry Jam',
      color: '#be0976',
      red: 7,
      yellow: 0,
      blue: 3,
      grey: 1,
      white: 0,
      black: 3
    },
    {
      name: 'Red Salsa',
      color: '#ff2929',
      red: 10,
      yellow: 0,
      blue: 0,
      grey: 0,
      white: 2,
      black: 0
    },
    {
      name: 'Carmine Pink',
      color: '#ec4936',
      red: 9,
      yellow: 1,
      blue: 0,
      grey: 2,
      white: 2,
      black: 0
    },
    {
      name: 'Tomato',
      color: '#ff5d38',
      red: 9,
      yellow: 2,
      blue: 0,
      grey: 0,
      white: 3,
      black: 0
    },
    {
      name: 'Fire Opal',
      color: '#e75646',
      red: 9,
      yellow: 1,
      blue: 0,
      grey: 3,
      white: 3,
      black: 0
    },
    {
      name: 'Antique Ruby',
      color: '#991e37',
      red: 9,
      yellow: 0,
      blue: 1,
      grey: 5,
      white: 0,
      black: 6
    },
    {
      name: 'Copper Red',
      color: '#c9684f',
      red: 8,
      yellow: 2,
      blue: 0,
      grey: 9,
      white: 2,
      black: 0
    },
    {
      name: 'Ruby',
      color: '#d71462',
      red: 8,
      yellow: 0,
      blue: 2,
      grey: 2,
      white: 0,
      black: 1
    },
    {
      name: 'Scarlet',
      color: '#ff1900',
      red: 9,
      yellow: 1,
      blue: 0,
      grey: 0,
      white: 0,
      black: 0
    },
    {
      name: 'Amaranth',
      color: '#e42f54',
      red: 9,
      yellow: 0,
      blue: 1,
      grey: 3,
      white: 1,
      black: 0
    },
    {
      name: 'Spanish Red',
      color: '#e6002e',
      red: 9,
      yellow: 0,
      blue: 1,
      grey: 0,
      white: 0,
      black: 1
    }
  ],
  pink: [
    {
      name: 'Thulian Pink',
      color: '#db6192',
      red: 8,
      yellow: 0,
      blue: 2,
      grey: 6,
      white: 5,
      black: 0
    },
    {
      name: 'Paradise Pink',
      color: '#e63d5f',
      red: 9,
      yellow: 0,
      blue: 1,
      grey: 3,
      white: 2,
      black: 0
    },
    {
      name: 'Misty Rose',
      color: '#ff887a',
      red: 9,
      yellow: 1,
      blue: 0,
      grey: 0,
      white: 9,
      black: 0
    },
    {
      name: 'Tickle Me Pink',
      color: '#f85d96',
      red: 9,
      yellow: 0,
      blue: 2,
      grey: 1,
      white: 6,
      black: 0
    },
    {
      name: 'Piggy Pink',
      color: '#f97b95',
      red: 9,
      yellow: 0,
      blue: 1,
      grey: 1,
      white: 9,
      black: 0
    },
    {
      name: 'Brilliant Rose',
      color: '#ff3d8b',
      red: 8,
      yellow: 0,
      blue: 2,
      grey: 0,
      white: 3,
      black: 0
    },
    {
      name: 'Pink Sherbet',
      color: '#f86381',
      red: 9,
      yellow: 0,
      blue: 1,
      grey: 1,
      white: 6,
      black: 0
    },
    {
      name: 'Cherry Blossom Pink',
      color: '#ff6b89',
      red: 9,
      yellow: 0,
      blue: 1,
      grey: 0,
      white: 7,
      black: 0
    },
    {
      name: 'Blush',
      color: '#db5787',
      red: 9,
      yellow: 0,
      blue: 2,
      grey: 6,
      white: 4,
      black: 0
    },
    {
      name: 'Rose Pink',
      color: '#ff47b6',
      red: 7,
      yellow: 0,
      blue: 3,
      grey: 0,
      white: 4,
      black: 0
    },
    {
      name: 'Pale Dogwood',
      color: '#ea5d79',
      red: 9,
      yellow: 0,
      blue: 1,
      grey: 3,
      white: 5,
      black: 0
    },
    {
      name: 'Spanish Pink',
      color: '#ed7878',
      red: 10,
      yellow: 0,
      blue: 0,
      grey: 3,
      white: 9,
      black: 0
    }
  ],
  orange: [
    {
      name: 'Orange Soda',
      color: '#f55932',
      red: 8,
      yellow: 2,
      blue: 0,
      grey: 1,
      white: 2,
      black: 0
    },
    {
      name: 'Atomic Tangerine',
      color: '#ff7e47',
      red: 7,
      yellow: 3,
      blue: 0,
      grey: 0,
      white: 4,
      black: 0
    },
    {
      name: 'Tangerine',
      color: '#eb8100',
      red: 5,
      yellow: 6,
      blue: 0,
      grey: 0,
      white: 0,
      black: 1
    },
    {
      name: 'Peach',
      color: '#ffa061',
      red: 6,
      yellow: 4,
      blue: 0,
      grey: 0,
      white: 6,
      black: 0
    },
    {
      name: 'Coral',
      color: '#ff773d',
      red: 7,
      yellow: 3,
      blue: 0,
      grey: 0,
      white: 3,
      black: 0
    },
    {
      name: 'Papaya Whip',
      color: '#ffc670',
      red: 4,
      yellow: 6,
      blue: 0,
      grey: 0,
      white: 8,
      black: 0
    },
    {
      name: 'Safety Orange',
      color: '#ff8000',
      red: 5,
      yellow: 5,
      blue: 0,
      grey: 0,
      white: 0,
      black: 0
    },
    {
      name: 'Pastel Orange',
      color: '#ff8b3d',
      red: 6,
      yellow: 4,
      blue: 0,
      grey: 0,
      white: 3,
      black: 0
    },
    {
      name: 'Tomato',
      color: '#ff5d38',
      red: 9,
      yellow: 2,
      blue: 0,
      grey: 0,
      white: 3,
      black: 0
    },
    {
      name: 'Peach Puff',
      color: '#ffb56b',
      red: 5,
      yellow: 5,
      blue: 0,
      grey: 0,
      white: 7,
      black: 0
    },
    {
      name: 'Neon Carrot',
      color: '#ff9e3d',
      red: 5,
      yellow: 5,
      blue: 0,
      grey: 0,
      white: 3,
      black: 0
    },
    {
      name: 'Orange Peel',
      color: '#ff9900',
      red: 4,
      yellow: 6,
      blue: 0,
      grey: 0,
      white: 0,
      black: 0
    },
  ],
  yellow: [
    {
      name: 'Mustard',
      color: '#ffd83d',
      red: 2,
      yellow: 8,
      blue: 0,
      grey: 0,
      white: 3,
      black: 0
    },
    {
      name: 'Maize',
      color: '#f7e54b',
      red: 1,
      yellow: 9,
      blue: 0,
      grey: 1,
      white: 4,
      black: 0
    },
    {
      name: 'Neon Yellow',
      color: '#ffff29',
      red: 0,
      yellow: 10,
      blue: 0,
      grey: 0,
      white: 2,
      black: 0
    },
    {
      name: 'Flavescent',
      color: '#f8e963',
      red: 1,
      yellow: 9,
      blue: 0,
      grey: 1,
      white: 6,
      black: 0
    },
    {
      name: 'Mikado Yellow',
      color: '#ffbb00',
      red: 3,
      yellow: 8,
      blue: 0,
      grey: 0,
      white: 0,
      black: 0
    },
    {
      name: 'Citrine',
      color: '#e0cb0b',
      red: 1,
      yellow: 9,
      blue: 0,
      grey: 1,
      white: 0,
      black: 1
    },
    {
      name: 'Saffron',
      color: '#f6c02c',
      red: 3,
      yellow: 8,
      blue: 0,
      grey: 1,
      white: 2,
      black: 0
    },
    {
      name: 'Cyber Yellow',
      color: '#ffcc00',
      red: 2,
      yellow: 8,
      blue: 0,
      grey: 0,
      white: 0,
      black: 0
    },
    {
      name: 'Yellow Rose',
      color: '#ffe600',
      red: 1,
      yellow: 9,
      blue: 0,
      grey: 0,
      white: 0,
      black: 0
    },
    {
      name: 'Lemon',
      color: '#ffff00',
      red: 0,
      yellow: 10,
      blue: 0,
      grey: 0,
      white: 0,
      black: 0
    },
    {
      name: 'Goldenrod',
      color: '#daa425',
      red: 3,
      yellow: 7,
      blue: 0,
      grey: 4,
      white: 0,
      black: 0
    },
    {
      name: 'School Bus Yellow',
      color: '#ffd000',
      red: 2,
      yellow: 9,
      blue: 0,
      grey: 0,
      white: 0,
      black: 0
    }
  ],
  green: [
    {
      name: 'Olive Drab',
      color: '#7b9e29',
      red: 0,
      yellow: 9,
      blue: 1,
      grey: 7,
      white: 0,
      black: 5
    },
    {
      name: 'June Bud',
      color: '#afd750',
      red: 0,
      yellow: 9,
      blue: 1,
      grey: 6,
      white: 3,
      black: 0
    },
    {
      name: 'Forest Green',
      color: '#309e24',
      red: 0,
      yellow: 7,
      blue: 3,
      grey: 6,
      white: 0,
      black: 5
    },
    {
      name: 'Tea Green',
      color: '#a9e382',
      red: 0,
      yellow: 8,
      blue: 2,
      grey: 6,
      white: 11,
      black: 0
    },
    {
      name: 'Sea Green',
      color: '#309161',
      red: 0,
      yellow: 5,
      blue: 5,
      grey: 10,
      white: 0,
      black: 6
    },
    {
      name: 'Mint',
      color: '#3db87a',
      red: 0,
      yellow: 5,
      blue: 5,
      grey: 10,
      white: 0,
      black: 1
    },
    {
      name: 'Illuminating Emerald',
      color: '#339985',
      red: 0,
      yellow: 4,
      blue: 6,
      grey: 10,
      white: 0,
      black: 5
    },
    {
      name: 'Shamrock Green',
      color: '#00b85c',
      red: 0,
      yellow: 5,
      blue: 5,
      grey: 0,
      white: 0,
      black: 4
    },
    {
      name: 'Emerald',
      color: '#4fc968',
      red: 0,
      yellow: 6,
      blue: 4,
      grey: 9,
      white: 2,
      black: 0
    },
    {
      name: 'Caribbean Green',
      color: '#00d6ab',
      red: 0,
      yellow: 4,
      blue: 6,
      grey: 0,
      white: 0,
      black: 2
    },
    {
      name: 'Nyanza',
      color: '#afff7a',
      red: 0,
      yellow: 8,
      blue: 2,
      grey: 0,
      white: 9,
      black: 0
    },
    {
      name: 'Lime',
      color: '#b3ff00',
      red: 0,
      yellow: 9,
      blue: 1,
      grey: 0,
      white: 0,
      black: 0
    }
  ],
  blue: [
    {
      name: 'Dodger Blue',
      color: '#1aa3ff',
      red: 0,
      yellow: 2,
      blue: 8,
      grey: 0,
      white: 1,
      black: 0
    },
    {
      name: 'Bondi Blue',
      color: '#00aec2',
      red: 0,
      yellow: 3,
      blue: 7,
      grey: 0,
      white: 0,
      black: 3
    },
    {
      name: 'Denim',
      color: '#1671bb',
      red: 0,
      yellow: 2,
      blue: 9,
      grey: 3,
      white: 0,
      black: 3
    },
    {
      name: 'Oxford Blue',
      color: '#005994',
      red: 0,
      yellow: 2,
      blue: 8,
      grey: 0,
      white: 0,
      black: 7
    },
    {
      name: 'Sky Blue',
      color: '#66b2e5',
      red: 0,
      yellow: 2,
      blue: 8,
      grey: 4,
      white: 6,
      black: 0
    },
    {
      name: "B'dazzled Blue",
      color: '#30509c',
      red: 0,
      yellow: 1,
      blue: 9,
      grey: 9,
      white: 0,
      black: 5
    },
    {
      name: 'Iceberg',
      color: '#63a4cf',
      red: 0,
      yellow: 2,
      blue: 8,
      grey: 9,
      white: 5,
      black: 0
    },
    {
      name: 'Azure Mist',
      color: '#7af2ff',
      red: 0,
      yellow: 3,
      blue: 7,
      grey: 0,
      white: 9,
      black: 0
    },
    {
      name: 'Air Superiority Blue',
      color: '#6b9cbd',
      red: 0,
      yellow: 2,
      blue: 8,
      grey: 16,
      white: 5,
      black: 0
    },
    {
      name: 'Cyan',
      color: '#00e5ff',
      red: 0,
      yellow: 3,
      blue: 7,
      grey: 0,
      white: 0,
      black: 0
    },
    {
      name: 'Columbia Blue',
      color: '#98b8cd',
      red: 0,
      yellow: 2,
      blue: 8,
      grey: 19,
      white: 19,
      black: 0
    },
    {
      name: 'Maya Blue',
      color: '#59b8f7',
      red: 0,
      yellow: 2,
      blue: 8,
      grey: 1,
      white: 5,
      black: 0
    }
  ],
  purple: [
    {
      name: 'Lavender',
      color: '#8c8ce8',
      red: 0,
      yellow: 0,
      blue: 10,
      grey: 5,
      white: 13,
      black: 0
    },
    {
      name: 'Violet',
      color: '#eb66eb',
      red: 5,
      yellow: 0,
      blue: 5,
      grey: 3,
      white: 6,
      black: 0
    },
    {
      name: 'Heliotrope',
      color: '#dd57ff',
      red: 4,
      yellow: 0,
      blue: 6,
      grey: 0,
      white: 5,
      black: 0
    },
    {
      name: 'Purple',
      color: '#a800a8',
      red: 5,
      yellow: 0,
      blue: 5,
      grey: 0,
      white: 0,
      black: 5
    },
    {
      name: 'Royal Purple',
      color: '#7251a4',
      red: 2,
      yellow: 0,
      blue: 8,
      grey: 19,
      white: 0,
      black: 1
    },
    {
      name: 'Lavender Blue',
      color: '#7070ff',
      red: 0,
      yellow: 0,
      blue: 10,
      grey: 0,
      white: 8,
      black: 0
    },
    {
      name: 'Lavender Blush',
      color: '#ff7aaf',
      red: 8,
      yellow: 0,
      blue: 2,
      grey: 0,
      white: 9,
      black: 0
    },
    {
      name: 'Twilight Lavender',
      color: '#8c4a72',
      red: 7,
      yellow: 0,
      blue: 3,
      grey: 22,
      white: 0,
      black: 6
    },
    {
      name: 'Orchid',
      color: '#d661d6',
      red: 5,
      yellow: 0,
      blue: 5,
      grey: 7,
      white: 5,
      black: 0
    },
    {
      name: 'Wisteria',
      color: '#b285d1',
      red: 3,
      yellow: 0,
      blue: 7,
      grey: 12,
      white: 11,
      black: 0
    },
    {
      name: 'Mauve',
      color: '#c46bff',
      red: 3,
      yellow: 0,
      blue: 7,
      grey: 0,
      white: 7,
      black: 0
    },
    {
      name: 'Amethyst',
      color: '#995ec9',
      red: 3,
      yellow: 0,
      blue: 8,
      grey: 11,
      white: 4,
      black: 0
    },
  ],
  brown: [
    {
      name: 'Wood Brown',
      color: '#c09868',
      red: 5,
      yellow: 6,
      blue: 0,
      grey: 16,
      white: 5,
      black: 0
    },
    {
      name: 'Seal Brown',
      color: '#924011',
      red: 7,
      yellow: 4,
      blue: 0,
      grey: 3,
      white: 0,
      black: 8
    },
    {
      name: 'Brandy',
      color: '#8e4343',
      red: 10,
      yellow: 0,
      blue: 0,
      grey: 18,
      white: 0,
      black: 6
    },
    {
      name: 'Peru',
      color: '#ce8740',
      red: 5,
      yellow: 5,
      blue: 0,
      grey: 7,
      white: 1,
      black: 0
    },
    {
      name: 'Rosy Brown',
      color: '#b68686',
      red: 10,
      yellow: 0,
      blue: 0,
      grey: 30,
      white: 12,
      black: 0
    },
    {
      name: 'Desert Sand',
      color: '#e2a67e',
      red: 6,
      yellow: 4,
      blue: 0,
      grey: 6,
      white: 10,
      black: 0
    },
    {
      name: 'Windsor Tan',
      color: '#c26100',
      red: 5,
      yellow: 5,
      blue: 0,
      grey: 0,
      white: 0,
      black: 3
    },
    {
      name: 'Sandy Brown',
      color: '#f7a14b',
      red: 5,
      yellow: 5,
      blue: 0,
      grey: 1,
      white: 4,
      black: 0
    },
    {
      name: 'Cedar Chest',
      color: '#c95c4f',
      red: 9,
      yellow: 1,
      blue: 0,
      grey: 9,
      white: 2,
      black: 0
    },
    {
      name: 'Cinnamon',
      color: '#d0631b',
      red: 6,
      yellow: 4,
      blue: 0,
      grey: 3,
      white: 0,
      black: 1
    },
    {
      name: 'Sienna',
      color: '#a3512e',
      red: 7,
      yellow: 3,
      blue: 0,
      grey: 8,
      white: 0,
      black: 4
    },
    {
      name: 'Tumbleweed',
      color: '#d79970',
      red: 6,
      yellow: 4,
      blue: 0,
      grey: 8,
      white: 7,
      black: 0
    }
  ],
  grey: [
    {
      name: 'Battleship Gray',
      color: '#838381',
      red: 0,
      yellow: 10,
      blue: 0,
      grey: 990,
      white: 20,
      black: 0
    },
    {
      name: 'Ash Gray',
      color: '#b2bdb4',
      red: 0,
      yellow: 6,
      blue: 4,
      grey: 115,
      white: 98,
      black: 0
    },
    {
      name: 'Charcoal',
      color: '#36454f',
      red: 0,
      yellow: 2,
      blue: 8,
      grey: 43,
      white: 0,
      black: 49
    },
    {
      name: 'Cadet Grey',
      color: '#92a4b0',
      red: 0,
      yellow: 2,
      blue: 8,
      grey: 53,
      white: 22,
      black: 0
    },
    {
      name: 'Taupe',
      color: '#483c32',
      red: 6,
      yellow: 5,
      blue: 0,
      grey: 50,
      white: 0,
      black: 66
    },
    {
      name: 'Smoke',
      color: '#738777',
      red: 0,
      yellow: 6,
      blue: 4,
      grey: 115,
      white: 0,
      black: 3
    },
    {
      name: 'Cinereous',
      color: '#98817c',
      red: 8,
      yellow: 2,
      blue: 0,
      grey: 73,
      white: 7,
      black: 0
    },
    {
      name: 'Gunmetal',
      color: '#293238',
      red: 0,
      yellow: 2,
      blue: 8,
      grey: 57,
      white: 0,
      black: 109
    },
    {
      name: 'Timberwolf',
      color: '#dbd7d2',
      red: 5,
      yellow: 6,
      blue: 0,
      grey: 89,
      white: 213,
      black: 0
    },
    {
      name: 'Slate Gray',
      color: '#6f8390',
      red: 0,
      yellow: 2,
      blue: 8,
      grey: 67,
      white: 0,
      black: 0
    },
    {
      name: 'Rose Quartz',
      color: '#aa97aa',
      red: 5,
      yellow: 0,
      blue: 5,
      grey: 90,
      white: 35,
      black: 0
    },
    {
      name: 'Cool Gray',
      color: '#8c95ab',
      red: 0,
      yellow: 1,
      blue: 9,
      grey: 53,
      white: 18,
      black: 0
    },
  ],
  white: [
    {
      name: 'Baby Powder',
      color: '#fefefb',
      red: 0,
      yellow: 10,
      blue: 0,
      grey: 5,
      white: 735,
      black: 0
    },
    {
      name: 'Beige',
      color: '#f5f5db',
      red: 0,
      yellow: 10,
      blue: 0,
      grey: 8,
      white: 82,
      black: 0
    },
    {
      name: 'Ivory',
      color: '#fffff0',
      red: 0,
      yellow: 10,
      blue: 0,
      grey: 0,
      white: 157,
      black: 0
    },
    {
      name: 'Seashell',
      color: '#fff6f0',
      red: 6,
      yellow: 4,
      blue: 0,
      grey: 0,
      white: 157,
      black: 0
    },
    {
      name: 'Ghost White',
      color: '#fafaff',
      red: 0,
      yellow: 0,
      blue: 10,
      grey: 0,
      white: 490,
      black: 0
    },
    {
      name: 'Eggshell',
      color: '#f0ebd6',
      red: 2,
      yellow: 8,
      blue: 0,
      grey: 12,
      white: 78,
      black: 0
    },
    {
      name: 'Alice Blue',
      color: '#f0f9ff',
      red: 0,
      yellow: 2,
      blue: 8,
      grey: 0,
      white: 157,
      black: 0
    },
    {
      name: 'Linen',
      color: '#faf0e5',
      red: 5,
      yellow: 5,
      blue: 0,
      grey: 5,
      white: 110,
      black: 0
    },
    {
      name: 'Mint Cream',
      color: '#f5fffa',
      red: 0,
      yellow: 5,
      blue: 5,
      grey: 0,
      white: 240,
      black: 0
    },
    {
      name: 'Floral White',
      color: '#fffaf0',
      red: 3,
      yellow: 7,
      blue: 0,
      grey: 0,
      white: 157,
      black: 0
    },
    {
      name: 'Snow',
      color: '#fffafa',
      red: 10,
      yellow: 0,
      blue: 0,
      grey: 0,
      white: 490,
      black: 0
    },
    {
      name: 'Lavender Blush',
      color: '#fff0f6',
      red: 8,
      yellow: 0,
      blue: 2,
      grey: 0,
      white: 157,
      black: 0
    }
  ],
  black: [
    {
      name: 'Rich Black',
      color: '#003c42',
      red: 0,
      yellow: 3,
      blue: 7,
      grey: 0,
      white: 0,
      black: 28
    },
    {
      name: 'Ebony',
      color: '#555e50',
      red: 0,
      yellow: 8,
      blue: 2,
      grey: 115,
      white: 0,
      black: 59
    },
    {
      name: 'Outer Space',
      color: '#424c4d',
      red: 0,
      yellow: 3,
      blue: 7,
      grey: 115,
      white: 0,
      black: 98
    },
    {
      name: 'Raisin Black',
      color: '#252225',
      red: 5,
      yellow: 0,
      blue: 5,
      grey: 240,
      white: 0,
      black: 643
    },
    {
      name: 'Black Olive',
      color: '#393b35',
      red: 0,
      yellow: 9,
      blue: 1,
      grey: 190,
      white: 0,
      black: 255
    },
    {
      name: 'Onyx',
      color: '#363a3a',
      red: 0,
      yellow: 3,
      blue: 8,
      grey: 264,
      white: 0,
      black: 350
    },
    {
      name: 'Taupe',
      color: '#483c32',
      red: 6,
      yellow: 5,
      blue: 0,
      grey: 50,
      white: 0,
      black: 66
    },
    {
      name: 'Licorice',
      color: '#191010',
      red: 9,
      yellow: 1,
      blue: 0,
      grey: 32,
      white: 0,
      black: 221
    },
  ],
};

export { colorsExamples };
