import { ColorExample } from './types';

const colorsExamples: ColorExample[] = [
  // Red colors
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
    name: 'Flame',
    color: '#e25822',
    red: 9,
    yellow: 2,
    blue: 0,
    grey: 4,
    white: 0,
    black: 2
  },
  {
    name: 'Rose',
    color: '#ff007f',
    red: 10,
    yellow: 0,
    blue: 5,
    grey: 0,
    white: 2,
    black: 0
  },
  {
    name: 'Fuchsia',
    color: '#ff00ff',
    red: 10,
    yellow: 0,
    blue: 10,
    grey: 0,
    white: 4,
    black: 0
  },
  {
    name: 'Magenta',
    color: '#ff00ff',
    red: 10,
    yellow: 0,
    blue: 10,
    grey: 0,
    white: 3,
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
  },
  
  // Orange colors
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
    name: 'Mango Tango',
    color: '#ff8243',
    red: 7,
    yellow: 5,
    blue: 0,
    grey: 0,
    white: 3,
    black: 0
  },
  
  // Yellow colors
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
    name: 'Goldenrod',
    color: '#daa425',
    red: 3,
    yellow: 7,
    blue: 0,
    grey: 4,
    white: 0,
    black: 0
  },
  
  // Green colors
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
    name: 'Jade',
    color: '#00a86b',
    red: 0,
    yellow: 7,
    blue: 5,
    grey: 3,
    white: 0,
    black: 0
  },
  {
    name: 'Teal',
    color: '#008080',
    red: 0,
    yellow: 5,
    blue: 5,
    grey: 4,
    white: 0,
    black: 2
  },
  {
    name: 'Spring Green',
    color: '#00ff7f',
    red: 0,
    yellow: 5,
    blue: 5,
    grey: 0,
    white: 3,
    black: 0
  },
  {
    name: 'Pistachio',
    color: '#93c572',
    red: 5,
    yellow: 9,
    blue: 5,
    grey: 0,
    white: 2,
    black: 0
  },
  
  // Blue colors
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
    name: 'Azure',
    color: '#007fff',
    red: 0,
    yellow: 0,
    blue: 10,
    grey: 2,
    white: 0,
    black: 1
  },
  {
    name: 'Cyan',
    color: '#00ffff',
    red: 0,
    yellow: 0,
    blue: 10,
    grey: 0,
    white: 4,
    black: 0
  },
  {
    name: 'Turquoise',
    color: '#30d5c8',
    red: 3,
    yellow: 5,
    blue: 7,
    grey: 2,
    white: 3,
    black: 0
  },
  
  // Purple colors
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
    name: 'Amethyst',
    color: '#9966cc',
    red: 6,
    yellow: 0,
    blue: 8,
    grey: 3,
    white: 0,
    black: 0
  },
  
  // Brown colors
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
    name: 'Cinnamon',
    color: '#d0631b',
    red: 6,
    yellow: 4,
    blue: 0,
    grey: 3,
    white: 0,
    black: 1
  },
  
  // Neutral colors
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
    name: 'Beige',
    color: '#f5f5dc',
    red: 9,
    yellow: 9,
    blue: 1,
    grey: 5,
    white: 100,
    black: 0
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
    name: 'Electric Lime',
    color: '#ccff00',
    red: 8,
    yellow: 9,
    blue: 0,
    grey: 0,
    white: 5,
    black: 0
  }
];

export { colorsExamples };
